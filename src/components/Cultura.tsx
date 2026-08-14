import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Cultura = () => {
  const [imagenes, setImagenes] = useState<string[]>([]);

  useEffect(() => {
    const consultarImagenes = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3001/Consultar_img_secundaria', {
          method: 'POST',
        });

        if (!response.ok) {
          throw new Error('Error al consultar las imágenes');
        }

        const data = await response.json();
        const rutas = data?.datos?.map((img: any) => `http://127.0.0.1:3001/uploads/${img.ruta_imagen}`) || [];
        setImagenes(rutas);
      } catch (error) {
        console.error('❌ Error al consultar las imágenes:', error);
        setImagenes([]); // Vacío si falla
      }
    };

    consultarImagenes();
  }, []);

  // Asignar con fallback
  const imagen1 = imagenes[0] || '/images/vueltiao-hat.jpg';
  const imagen2 = imagenes[1] || '/images/zenu-artisan.jpg';

  return (
    <section id="cultura" className="py-20 bg-white pattern-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-dark mb-4"
          >
            Cultura Zenú Viva
          </motion.h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-primary">La Cuna del Sombrero Vueltiao</h3>
            <p className="text-lg text-gray-700">
              Tuchín, corazón del pueblo Zenú en Córdoba, es reconocido a nivel nacional por la elaboración artesanal del sombrero vueltiao, símbolo cultural de Colombia.
            </p>
            <p className="text-lg text-gray-700">
              Fundado en 1826 por Manuel Talaigua Montalvo, este municipio conserva con orgullo su herencia indígena, donde el 97.53% de sus 34,484 habitantes pertenecen al pueblo Zenú.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-white p-6 rounded-xl shadow-lg card">
                <div className="text-primary text-4xl mb-2">🎩</div>
                <h4 className="font-bold text-lg mb-2">Patrimonio Cultural</h4>
                <p className="text-gray-600">El sombrero vueltiao fue declarado Símbolo Cultural de la Nación en 2004</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg card">
                <div className="text-primary text-4xl mb-2">👨‍👩‍👧‍👦</div>
                <h4 className="font-bold text-lg mb-2">Artesanos Talentosos</h4>
                <p className="text-gray-600">Más de 1,500 artesanos dedicados a preservar la tradición</p>
              </div>
            </div>
          </motion.div>

          {/* Imágenes */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-lg transform rotate-3">
                <img
                  src={imagen1}
                  alt="Imagen 1 Cultura Zenú"
                  className="rounded-lg w-full h-64 object-cover"
                />
              </div>
              <div className="bg-white p-4 rounded-xl shadow-lg transform -rotate-3 mt-8">
                <img
                  src={imagen2}
                  alt="Imagen 2 Cultura Zenú"
                  className="rounded-lg w-full h-64 object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary text-white py-3 px-6 rounded-full font-bold">
              Tradición Milenaria
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Cultura;
