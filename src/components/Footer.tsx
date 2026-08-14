import { FaWhatsapp, FaFacebook, FaInstagram, FaYoutube, FaTiktok, FaPhone, FaEnvelope, FaMapMarkerAlt, FaBars, FaTimes } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Tuchín Artesanal</h3>
            <p className="text-accent mb-4">Corazón del sombrero vueltiao y cuna de la cultura Zenú en Colombia.</p>
            <div className="flex space-x-3">
              <a href="#" className="text-white hover:text-accent"><FaFacebook /></a>
              <a href="#" className="text-white hover:text-accent"><FaInstagram /></a>
              <a href="#" className="text-white hover:text-accent"><FaYoutube /></a>
              <a href="#" className="text-white hover:text-accent"><FaTiktok /></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#inicio" className="text-accent hover:text-white">Inicio</a></li>
              <li><a href="#cultura" className="text-accent hover:text-white">Cultura Zenú</a></li>
              <li><a href="#experiencias" className="text-accent hover:text-white">Experiencias</a></li>
              <li><a href="#visita" className="text-accent hover:text-white">Planifica tu Visita</a></li>
              <li><a href="#eventos" className="text-accent hover:text-white">Eventos</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-accent hover:text-white">Guía Turística (PDF)</a></li>
              <li><a href="#" className="text-accent hover:text-white">Mapa Interactivo</a></li>
              <li><a href="#" className="text-accent hover:text-white">Galería Multimedia</a></li>
              <li><a href="#" className="text-accent hover:text-white">Preguntas Frecuentes</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Contacto Directo</h3>
            <a 
              href="https://wa.me/573205290685" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center bg-secondary text-white px-6 py-3 rounded-full mb-4"
            >
              <FaWhatsapp className="mr-2" /> WhatsApp
            </a>
            <p className="text-accent mb-4">Suscríbete para recibir noticias y ofertas especiales.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Tu correo" 
                className="px-4 py-2 rounded-l-lg w-full focus:outline-none"
              />
              <button className="bg-secondary text-white px-4 py-2 rounded-r-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-accent border-opacity-30 mt-12 pt-8 text-center">
          <p className="text-accent">&copy; {currentYear} Tuchín Artesanal. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;