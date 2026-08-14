import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Eventos = () => {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await fetch('http://localhost:3001/mostrar_eventos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const result = await response.json();
        console.log('📆 Eventos recibidos:', result);

        if (result.estado === 'ok' && Array.isArray(result.datos)) {
          setEvents(result.datos);
        } else {
          console.warn('⚠️ No se recibieron eventos válidos');
        }
      } catch (error) {
        console.error('❌ Error al obtener eventos:', error);
      }
    };

    fetchEventos();
  }, []);

  return (
    <section id="eventos" className="py-20 bg-cover bg-fixed" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/src/assets/images/event-bg.jpg')" }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Eventos Anuales
          </motion.h2>
          <p className="text-xl text-accent max-w-3xl mx-auto">Celebra con nosotros nuestras tradiciones</p>
          <div className="w-24 h-1 bg-accent mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {events.map((event, index) => (
            <motion.div
              key={event.id || index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white bg-opacity-90 rounded-xl shadow-xl p-8 card"
            >
              <div className="text-primary text-4xl mb-4">
                {event.icono || "🎉"}
              </div>
              <h3 className="text-2xl font-bold text-dark mb-2">{event.titulo}</h3>
              <p className="text-gray-700 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                {event.fecha || 'Sin fecha'}
              </p>
              <p className="text-gray-700 mb-6">
                {event.descripcion}
              </p>
              <a href="#" className="text-primary font-semibold hover:text-secondary flex items-center">
                Más información
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Eventos;
