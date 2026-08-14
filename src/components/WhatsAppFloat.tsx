import { FaWhatsapp, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const WhatsAppFloat = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const phoneNumber = '573205290685'; // Reemplaza con tu número
  const defaultMessage = 'Hola, estoy interesado en información sobre Tuchín';
  
  const openChat = (messageType = '') => {
    let message = defaultMessage;
    if (messageType === 'artesanias') message = 'Hola, estoy interesado en sus artesanías';
    if (messageType === 'visita') message = 'Hola, quiero información para visitar Tuchín';
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-lg shadow-xl overflow-hidden"
          >
            <div className="p-4">
              <h3 className="font-bold text-gray-800 mb-2">¿En qué podemos ayudarte?</h3>
              <button 
                onClick={() => openChat('artesanias')}
                className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded transition"
              >
                Información sobre artesanías
              </button>
              <button 
                onClick={() => openChat('visita')}
                className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded transition"
              >
                Planificar visita
              </button>
              <button 
                onClick={() => openChat()}
                className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded transition"
              >
                Otra consulta
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center space-x-3">
        {isExpanded && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
            className="bg-red-500 text-white p-2 rounded-full shadow-lg"
            aria-label="Cerrar menú"
          >
            <FaTimes />
          </motion.button>
        )}
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => isExpanded ? openChat() : setIsExpanded(true)}
          className={`p-4 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
            isExpanded ? 'bg-green-600' : 'bg-green-500 hover:bg-green-600'
          } text-white`}
          aria-label="Contactar por WhatsApp"
        >
          <FaWhatsapp className="text-2xl md:text-3xl" />
        </motion.button>
      </div>
    </div>
  );
};

export default WhatsAppFloat;