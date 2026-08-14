import { motion } from 'framer-motion';
import { FaWhatsapp, FaFacebook, FaInstagram, FaYoutube, FaTiktok, FaPhone, FaEnvelope, FaMapMarkerAlt, FaBars, FaTimes } from 'react-icons/fa';
import React, { useState } from 'react';


const Contacto = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [confirmacion, setConfirmacion] = useState('');
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    // 1. Guardar en la base de datos
    const response = await fetch('http://localhost:3001/contacto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre,
        email,
        celular,
        mensaje
      })
    });

    const result = await response.json();

    if (result.estado === 'ok') {
      console.log('✅ Datos guardados');

      // 2. Consultar número dinámico desde backend
      const numeroRes = await fetch('http://localhost:3001/llamar_numero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      const numeroData = await numeroRes.json();

      if (numeroData.estado === 'ok' && numeroData.datos.length > 0) {
        const numeroDestino = numeroData.datos[0].contacto 

        const textoWhatsApp = `Hola soy ${nombre} y ${mensaje}`;
        const url = `https://wa.me/57${numeroDestino}?text=${encodeURIComponent(textoWhatsApp)}`;
        window.open(url, '_blank');
      } else {
        alert('⚠️ No se pudo obtener el número de destino desde el servidor');
      }

    } else {
      console.warn('⚠️ No se guardó:', result.mensaje);
    }

  } catch (error) {
    console.error('❌ Error al guardar o llamar número:', error);
  }
};

  return (
    <section id="contacto" className="py-20 bg-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Contáctanos
          </motion.h2>
          <p className="text-xl text-accent max-w-3xl mx-auto">¿Listo para vivir la experiencia Tuchín?</p>
          <div className="w-24 h-1 bg-accent mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-xl shadow-xl p-8"
          >
            <h3 className="text-2xl font-bold text-dark mb-6">Envíanos un mensaje</h3>
             <form className="space-y-6" onSubmit={handleSubmit}>

            <div>
              <label htmlFor="name" className="block text-gray-700 mb-2">Nombre completo</label>
              <input 
                type="text" 
                id="name"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Tu nombre"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">Correo electrónico</label>
              <input 
                type="email" 
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="tu@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="celular" className="block text-gray-700 mb-2">Número de celular</label>
              <input 
                type="number"
                id="celular"
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="+57 3205290685"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-700 mb-2">Mensaje</label>
              <textarea 
                id="message"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Cuéntanos sobre tu interés en visitar Tuchín"
                required
              ></textarea>
            </div>

            {confirmacion && (
              <p className={`text-center font-semibold ${confirmacion.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
                {confirmacion}
              </p>
            )}

            <button 
              type="submit" 
              className="w-full bg-primary hover:bg-secondary text-white py-4 rounded-full font-semibold transition duration-300"
            >
              Enviar mensaje
            </button>
          </form>

          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h3 className="text-2xl font-bold mb-6">Información de Contacto</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="text-accent text-2xl mr-4 mt-1">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Dirección</h4>
                  <p>Alcaldía Municipal de Tuchín, Córdoba, Colombia</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-accent text-2xl mr-4 mt-1">
                  <FaPhone />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Teléfono</h4>
                  <p>+57 (4) 789 0123</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-accent text-2xl mr-4 mt-1">
                  <FaEnvelope />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Email</h4>
                  <p>turismo@tuchinartesanal.co</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-accent text-2xl mr-4 mt-1">
                  <FaWhatsapp />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">WhatsApp</h4>
                  <p>+57 320 529 0685</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <h4 className="font-bold text-lg mb-4">Síguenos en redes sociales</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-12 h-12 rounded-full bg-accent flex items-center justify-center hover:bg-primary transition">
                  <FaFacebook className="text-white" />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-accent flex items-center justify-center hover:bg-primary transition">
                  <FaInstagram className="text-white" />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-accent flex items-center justify-center hover:bg-primary transition">
                  <FaYoutube className="text-white" />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-accent flex items-center justify-center hover:bg-primary transition">
                  <FaTiktok className="text-white" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contacto;