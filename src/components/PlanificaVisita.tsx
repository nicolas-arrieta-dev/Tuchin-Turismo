import { motion } from 'framer-motion';

const PlanificaVisita = () => {
  const travelInfo = [
    {
      icon: "🚗",
      title: "Cómo Llegar",
      items: [
        "Desde Montería: 83 km (2 hrs en buseta)",
        "Desde Sincelejo: 48 km (1 hr en transporte rural)",
        "Transporte local: Mototaxis para desplazarse entre veredas"
      ]
    },
    {
      icon: "🏠",
      title: "Alojamiento",
      items: [
        "Hospedajes comunitarios: Desde $40,000 COP/noche",
        "Eco-alojamientos: Cerca del cerro Tofeme con arquitectura Zenú",
        "Recomendado: Hotel Artesanal con vista a los talleres"
      ]
    },
    {
      icon: "🍽️",
      title: "Gastronomía",
      items: [
        "Platos típicos: Bollo de ñame, pescados frescos del río Sinú",
        "Experiencia única: Degustaciones con carne y pescado ahumado",
        "Mercado local: Productos frescos y tradicionales"
      ]
    }
  ];

  return (
    <section id="visita" className="py-20 bg-white pattern-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-dark mb-4"
          >
            Planifica tu Visita
          </motion.h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Todo lo que necesitas saber para disfrutar de Tuchín</p>
          <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {travelInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="card bg-light rounded-xl shadow-xl p-8"
            >
              <div className="text-4xl mb-6">
                {info.icon}
              </div>
              <h3 className="text-2xl font-bold text-dark mb-4">{info.title}</h3>
              <ul className="space-y-4">
                {info.items.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-primary mr-3">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-xl shadow-xl overflow-hidden"
        >
          <div className="h-96 w-full">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.635115434539!2d-75.43661329453124!3d9.187557899999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e592e5e8f4a8aab%3A0x1f0d7b8b8b8b8b8b!2sTuch%C3%ADn%2C%20C%C3%B3rdoba%2C%20Colombia!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PlanificaVisita;