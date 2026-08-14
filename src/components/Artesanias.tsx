import { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

interface Producto {
  id: number;
  nombre_producto: string;
  descripcion: string;
  precio: number;
  imagen: string;
  nombre_tienda: string;
  telefono: string; // <-- Aquí se usa el teléfono de la tienda
}

const Artesanias = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const consultarProductos = async () => {
      try {
        const response = await fetch('http://localhost:3001/mostrar_productos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();

        if (data.estado === 'ok') {
          setProductos(data.datos);
        } else {
          console.warn('⚠️ Error en la respuesta:', data.mensaje);
        }
      } catch (error) {
        console.error('❌ Error al consultar los productos:', error);
      } finally {
        setLoading(false);
      }
    };

    consultarProductos();
  }, []);

  const handleWhatsAppClick = (producto: Producto) => {
    const numero = producto.telefono.replace(/\D/g, ''); // Limpiar el número
    const message = `Hola, estoy interesado en el producto: ${producto.nombre_producto} (${producto.descripcion}) por $${producto.precio.toLocaleString()}. ¿Podrías darme más información?`;
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="artesanias" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            Artesanías Zenú
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
          <p className="text-xl text-gray-600 mt-6 max-w-2xl mx-auto">
            Descubre nuestras piezas artesanales únicas, elaboradas con técnicas ancestrales
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-600">Cargando artesanías...</p>
          </div>
        ) : (
          <div className="relative">
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              loop={true}
              centeredSlides={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
            >
              {productos.map((producto) => (
                <SwiperSlide key={producto.id}>
                  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full mx-2">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={`http://localhost:3001/uploads/${producto.imagen}`}
                        alt={producto.nombre_producto}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{producto.nombre_producto}</h3>
                      <p className="text-gray-600 mb-4">{producto.descripcion}</p>
                      <p className="text-gray-600 mb-4">Tienda: {producto.nombre_tienda}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-primary">
                          ${producto.precio.toLocaleString()}
                        </span>
                        <button
                          onClick={() => handleWhatsAppClick(producto)}
                          className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                        >
                          <FaWhatsapp className="mr-2" />
                          Comprar
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
};

export default Artesanias;
