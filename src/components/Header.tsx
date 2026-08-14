import { useState, useEffect } from 'react';
import { FaWhatsapp, FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'artesanias', 'cultura', 'experiencias', 'visita', 'eventos', 'testimonios', 'contacto'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función para determinar la clase activa
  const getLinkClass = (sectionId: string) => {
    const baseClass = "transition";
    const activeClass = "text-accent font-bold";
    const inactiveClass = "text-white hover:text-accent";
    
    return `${baseClass} ${activeSection === sectionId ? activeClass : inactiveClass}`;
  };

  return (
    <header className="fixed w-full z-50 bg-dark shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img
            src="/images/sombrero.png"
            alt="Logo Tuchín Zenú"
            className="h-10 w-10 object-contain"
          />
          <div className="text-2xl font-bold text-white">
            <span className="text-primary">Tuchín</span>
            <span className="text-secondary">Zenú</span>
          </div>
        </div>
        
        {/* Menú desktop */}
        <nav className="hidden md:flex space-x-8 items-center">
          <a href="#inicio" className={getLinkClass('inicio')}>Inicio</a>
          <a href="#artesanias" className={getLinkClass('artesanias')}>Artesanías</a>
          <a href="#cultura" className={getLinkClass('cultura')}>Cultura</a>
          <a href="#experiencias" className={getLinkClass('experiencias')}>Experiencias</a>
          <a href="#visita" className={getLinkClass('visita')}>Visítanos</a>
          <a href="#eventos" className={getLinkClass('eventos')}>Eventos</a>
          <a href="#testimonios" className={getLinkClass('testimonios')}>Testimonios</a>
          <a 
            href="#contacto" 
            className={`bg-primary hover:bg-secondary text-white px-6 py-2 rounded-full transition flex items-center gap-2 ${
              activeSection === 'contacto' ? 'ring-2 ring-accent' : ''
            }`}
          >
            <FaWhatsapp /> Contacto
          </a>
        </nav>
        
        {/* Menú móvil */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white text-2xl focus:outline-none"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      
      {/* Menú móvil desplegable */}
      <div className={`md:hidden fixed inset-0 bg-dark bg-opacity-95 z-40 transition-all duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="container mx-auto px-4 py-16 flex flex-col space-y-8 text-center">
          <a 
            href="#inicio" 
            className={`text-2xl ${getLinkClass('inicio')}`} 
            onClick={() => setIsOpen(false)}
          >
            Inicio
          </a>
          <a 
            href="#artesanias" 
            className={`text-2xl ${getLinkClass('artesanias')}`} 
            onClick={() => setIsOpen(false)}
          >
            Artesanías
          </a>
          <a 
            href="#cultura" 
            className={`text-2xl ${getLinkClass('cultura')}`} 
            onClick={() => setIsOpen(false)}
          >
            Cultura
          </a>
          <a 
            href="#experiencias" 
            className={`text-2xl ${getLinkClass('experiencias')}`} 
            onClick={() => setIsOpen(false)}
          >
            Experiencias
          </a>
          <a 
            href="#visita" 
            className={`text-2xl ${getLinkClass('visita')}`} 
            onClick={() => setIsOpen(false)}
          >
            Visítanos
          </a>
          <a 
            href="#eventos" 
            className={`text-2xl ${getLinkClass('eventos')}`} 
            onClick={() => setIsOpen(false)}
          >
            Eventos
          </a>
          <a 
            href="#testimonios" 
            className={`text-2xl ${getLinkClass('testimonios')}`} 
            onClick={() => setIsOpen(false)}
          >
            Testimonios
          </a>
          <a 
            href="#contacto" 
            className={`text-2xl bg-primary hover:bg-secondary text-white px-8 py-3 rounded-full mx-auto w-3/4 flex items-center justify-center gap-2 ${
              activeSection === 'contacto' ? 'ring-2 ring-accent' : ''
            }`}
            onClick={() => setIsOpen(false)}
          >
            <FaWhatsapp /> Contacto
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;