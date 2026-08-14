import React, { useState, useEffect } from 'react';
import Notificacion from './notificacion';
import { motion } from 'framer-motion';


interface FormInicioProps {
  onSave?: (data: any) => void;
  initialData?: any;
}

const FormEvento: React.FC<FormInicioProps> = ({ onSave, initialData }) => {
  const [icono, setIcono] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [media, setMedia] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState('');
  const [estado, setEstado] = useState<'ok' | 'error' | null>(null);
  const [presionado, setPresionado] = useState(false);

  useEffect(() => {
    if (initialData) {
      setIcono(initialData.icono || '');
      setTitulo(initialData.titulo || '');
      setDescripcion(initialData.descripcion || '');
      setFecha(initialData.fecha || '');
      if (initialData.ruta_imagen) {
        setPreview(`http://127.0.0.1:3001/uploads/${initialData.ruta_imagen}`);
      }
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPresionado(false);
    setTimeout(() => setPresionado(true), 0);

    const formData = new FormData();
    formData.append('icono', icono);
    formData.append('titulo', titulo);
    formData.append('descripcion', descripcion);
    formData.append('fecha', fecha);
    if (media) formData.append('imagen', media);

    try {
      const response = await fetch('http://127.0.0.1:3001/evento', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      console.log('✅ Respuesta del servidor:', result);

      setMensaje(result.mensaje || 'Evento registrado correctamente ✅');
      setEstado(result.estado === 'ok' ? 'ok' : 'error');

      if (onSave) onSave(result);

    } catch (err) {
      console.error('❌ Error al enviar:', err);
      setMensaje('Error al registrar el evento ❌');
      setEstado('error');
    }
  };
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

// 🔁 CAMBIAMOS EL NOMBRE DE LA FUNCIÓN
const eliminarEvento = async (id: number) => {
  const confirmado = window.confirm('¿Estás seguro de que deseas eliminar este evento?');
  if (!confirmado) return;

  try {
    const response = await fetch('http://localhost:3001/eliminar_evento', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    });

    const result = await response.json();
    console.log('🗑️ Resultado de eliminación:', result);

    if (result.estado === 'ok') {
      setMensaje('Evento eliminado correctamente ✅');
      setEstado('ok');
      setEvents(prev => prev.filter(event => event.id !== id));
      setPresionado(true);
    } else {
      setMensaje(result.mensaje || 'Error al eliminar el evento ❌');
      setEstado('error');
      setPresionado(true);
    }
  } catch (error) {
    console.error('❌ Error al eliminar:', error);
    setMensaje('Error al conectar con el servidor ❌');
    setEstado('error');
    setPresionado(true);
  }
};


  return (
    <>
      {presionado && (
        estado === 'ok' ? (
          <Notificacion mensaje={mensaje} tipo="ok" />
        ) : estado === 'error' ? (
          <Notificacion mensaje={mensaje} tipo="error" />
        ) : null
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow-md max-w-xl space-y-3"
        encType="multipart/form-data"
      >
        <h2 className="text-xl font-bold">Agregar / Editar Evento</h2>

        <input
          type="text"
          className="w-full border p-2 mb-3"
          placeholder="Icono (ej: 🎉)"
          value={icono}
          onChange={(e) => setIcono(e.target.value)}
          required
        />
        <input
          type="text"
          className="w-full border p-2 mb-3"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <textarea
          className="w-full border p-2 mb-3"
          placeholder="Descripción"
          rows={4}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
        <input
          type="text"
          className="w-full border p-2 mb-3"
          placeholder="Fecha (ej: Octubre de cada año)"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />

  

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Guardar
        </button>
      </form>

          <div>
        <h2 className="text-2xl font-bold">
          Vista previa
        </h2>
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
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mt-4"
            onClick={() => eliminarEvento(event.id)} // 👈 asegurarte que sea event.id
          >
            Eliminar
          </button>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
        </div>
    </>
  );
};

export default FormEvento;
