import { useState } from 'react';
import { FaQuoteLeft, FaStar, FaTimes, FaCheck, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useEffect } from 'react';
import usuarioImg from '../assets/images/usuario.png';

interface Testimonio {
  id: number;
  nombre: string;
  origen: string;
  comentario: string;
  calificacion: number;
  fecha: string;
  imagen?: string;
}

const Testimonios = () => {
  const [testimonios, setTestimonios] = useState<Testimonio[]>([]);
const [isModalOpen, setIsModalOpen] = useState(false);
const [formData, setFormData] = useState({
  nombre: '',
  email: '',
  origen: '',
  comentario: '',
  calificacion: 5,
});
const [isSubmitting, setIsSubmitting] = useState(false);
const [submitSuccess, setSubmitSuccess] = useState(false);



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, calificacion: rating }));
  };

const obtenerTestimonios = async () => {
  try {
    const response = await fetch('http://localhost:3001/mostrar_testimonios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (data.estado === 'ok') {
      setTestimonios(data.datos);
    } else {
      console.warn('⚠️ No se pudieron obtener los testimonios:', data.mensaje);
    }
  } catch (error) {
    console.error('❌ Error al obtener testimonios:', error);
  }
};

// 2. Llamar a la función al montar el componente
useEffect(() => {
  obtenerTestimonios();
}, []);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch('http://localhost:3001/agregar_testimonio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre: formData.nombre,
        origen: formData.origen,
        comentario: formData.comentario,
        calificacion: formData.calificacion
      })
    });

    const result = await response.json();

    if (result.estado === 'ok') {
      setSubmitSuccess(true);
      await obtenerTestimonios(); // 👈 Recarga dinámicamente los testimonios
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitSuccess(false);
        setFormData({
          nombre: '',
          email: '',
          origen: '',
          comentario: '',
          calificacion: 5,
        });
      }, 2000);
    } else {
      alert(`❌ Error al registrar testimonio: ${result.mensaje}`);
    }
  } catch (error) {
    console.error('❌ Error al enviar testimonio:', error);
    alert('❌ Error inesperado al enviar testimonio');
  } finally {
    setIsSubmitting(false);
  }
};


  // Componente de estrellas
  const RatingStars = ({ rating }: { rating: number }) => (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <FaStar 
          key={i} 
          className={`${i < rating ? "text-yellow-400" : "text-gray-300"} text-sm`} 
        />
      ))}
    </div>
  );

  return (
    <section id="testimonios" className="py-20 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-dark mb-4"
          >
            Testimonios
          </motion.h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Lo que nuestros visitantes dicen sobre su experiencia en Tuchín
          </motion.p>
        </div>

        {/* Carrusel de testimonios */}
        <div className="relative px-8">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-16"
          >
            {testimonios.map((testimonio) => (
              <SwiperSlide key={testimonio.id}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-gray-50 rounded-xl p-6 shadow-md h-full flex flex-col"
                >
                  <div className="flex justify-between items-start mb-4">
                    <RatingStars rating={testimonio.calificacion} />
                    <FaQuoteLeft className="text-primary text-2xl opacity-20" />
                  </div>
                  <p className="text-gray-700 italic mb-6 flex-grow">"{testimonio.comentario}"</p>
                  <div className="flex items-center border-t border-gray-200 pt-4">
                   
                      <img 
                        src={usuarioImg}
                        alt={testimonio.nombre} 
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                    
                    <div>
                      <h4 className="font-bold text-dark">{testimonio.nombre}</h4>
                      <p className="text-gray-500 text-sm">{testimonio.origen}</p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Controles de navegación */}
          <div className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-primary hover:text-white transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <div className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-primary hover:text-white transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Llamada a la acción */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16 bg-primary bg-opacity-10 rounded-xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-dark mb-4">¿Ya visitaste Tuchín?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Comparte tu experiencia con nosotros y ayuda a otros a descubrir esta maravillosa cultura.
          </p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-primary hover:bg-secondary text-white px-8 py-3 rounded-full font-medium transition-colors flex items-center justify-center mx-auto gap-2"
          >
            <FaQuoteLeft /> Dejar mi testimonio
          </button>
        </motion.div>
      </div>

      {/* Modal para dejar testimonio */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full mx-auto shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-xl font-bold text-dark">Deja tu testimonio</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-dark"
              >
                <FaTimes />
              </button>
            </div>

            {submitSuccess ? (
              <div className="p-8 text-center">
                <div className="bg-green-100 text-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <FaCheck className="text-2xl" />
                </div>
                <h4 className="text-xl font-bold text-dark mb-2">¡Gracias por tu testimonio!</h4>
                <p className="text-gray-600">Tu opinión es muy valiosa para nosotros.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6">
                <div className="mb-4">
                  <label htmlFor="nombre" className="block text-gray-700 mb-2">Nombre completo*</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 mb-2">Email*</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="origen" className="block text-gray-700 mb-2">Ciudad/País*</label>
                  <input
                    type="text"
                    id="origen"
                    name="origen"
                    value={formData.origen}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Calificación*</label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingChange(star)}
                        className={`text-2xl ${star <= formData.calificacion ? 'text-yellow-400' : 'text-gray-300'}`}
                      >
                        <FaStar />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="comentario" className="block text-gray-700 mb-2">Tu testimonio*</label>
                  <textarea
                    id="comentario"
                    name="comentario"
                    value={formData.comentario}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    placeholder="Cuéntanos tu experiencia en Tuchín..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-primary hover:bg-secondary text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <FaQuoteLeft /> Publicar testimonio
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonios;