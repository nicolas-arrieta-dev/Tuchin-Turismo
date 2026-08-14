import React, { useState, useEffect } from 'react';
import Notificacion from './notificacion';
import { motion } from 'framer-motion';

interface FormInicioProps {
  onSave?: (data: any) => void;
  initialData?: any;
}

const FormExperiencia: React.FC<FormInicioProps> = ({ onSave, initialData }) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [media, setMedia] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState('');
  const [estado, setEstado] = useState<'ok' | 'error' | null>(null);
  const [presionado, setPresionado] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitulo(initialData.titulo || '');
      setDescripcion(initialData.descripcion || '');
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
    formData.append('titulo', titulo);
    formData.append('descripcion', descripcion);
    if (media) formData.append('imagen', media);

    try {
      const response = await fetch('http://127.0.0.1:3001/experiencia', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log('✅ Respuesta del servidor:', result);

      setMensaje(result.mensaje || 'Experiencia registrada correctamente ✅');
      setEstado(result.estado === 'ok' ? 'ok' : 'error');

      if (onSave) onSave(result);

    } catch (err) {
      console.error('❌ Error al enviar:', err);
      setMensaje('Error al enviar la experiencia ❌');
      setEstado('error');
    }
  };
  const [experiences, setExperiences] = useState<any[]>([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch('http://localhost:3001/mostrar_experiencias', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const result = await response.json();
        console.log('🎯 Datos recibidos:', result);

        if (result.estado === 'ok' && Array.isArray(result.datos)) {
          setExperiences(result.datos);
        } else {
          console.warn('⚠️ No se recibieron experiencias válidas');
        }
      } catch (error) {
        console.error('❌ Error al obtener experiencias:', error);
      }
    };

    fetchExperiences();
  }, []);
const eliminarExperiencia = async (id: number) => {
  const confirmado = window.confirm('¿Estás seguro de que deseas eliminar esta experiencia?');
  if (!confirmado) return;

  try {
    const response = await fetch('http://localhost:3001/eliminar_experiencia', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    });

    const result = await response.json();
    console.log('🗑️ Resultado de eliminación:', result);

    if (result.estado === 'ok') {
      setMensaje('Experiencia eliminada correctamente ✅');
      setEstado('ok');
      setExperiences(prev => prev.filter(exp => exp.id !== id));
      setPresionado(true);
    } else {
      setMensaje(result.mensaje || 'Error al eliminar la experiencia ❌');
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
        <h2 className="text-xl font-bold">Agregar / Editar Experiencia</h2>

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
          type="file"
          accept="image/*"
          name="imagen"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              const file = e.target.files[0];
              setMedia(file);
              setPreview(URL.createObjectURL(file));
            } else {
              setMedia(null);
              setPreview(null);
            }
          }}
        />

        {preview && (
          <div className="mt-2">
            <img src={preview} alt="preview" className="max-h-40 rounded" />
          </div>
        )}

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

            <section id="experiencias" className="py-20 bg-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-dark mb-4"
          >
            Experiencias Auténticas
          </motion.h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Vive la cultura Zenú a través de estas experiencias únicas</p>
          <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="card bg-white rounded-xl overflow-hidden shadow-xl"
            >
              <div className="relative overflow-hidden h-64">
                <img 
                  src={`http://localhost:3001/uploads/${exp.imagen}`} 
                  alt={exp.titulo} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold">{exp.titulo}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">{exp.descripcion}</p>
                    <button
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mt-4"
                  onClick={() => eliminarExperiencia(exp.id)}
                >
                  Eliminar
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    </div>
    </>
  );
};

export default FormExperiencia;
