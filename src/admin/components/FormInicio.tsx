import React, { useState, useEffect } from 'react';
import Notificacion from './notificacion';

interface FormInicioProps {
  onSave?: (data: any) => void;
  initialData?: any;
}

const FormInicio: React.FC<FormInicioProps> = ({ onSave, initialData }) => {
  const [media, setMedia] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState('');
  const [estado, setEstado] = useState<'ok' | 'error' | null>(null);
  const [presionado, setPresionado] = useState(false);

  useEffect(() => {
    if (initialData && initialData.ruta_imagen) {
      setPreview(`http://127.0.0.1:3001/uploads/${initialData.ruta_imagen}`);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPresionado(false);
    setTimeout(() => setPresionado(true), 0); // Fuerza re-render

    const formData = new FormData();
    if (media) formData.append('imagen', media);

    try {
      const response = await fetch('http://127.0.0.1:3001/img_principal', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log('✅ Respuesta del servidor:', result);

      setMensaje(result.mensaje || 'Imagen subida correctamente ✅');
      setEstado(result.estado === 'ok' ? 'ok' : 'error');

      if (onSave) onSave(result); // Llama al callback si existe

    } catch (err) {
      console.error('❌ Error al enviar:', err);
      setMensaje('Error al enviar la imagen ❌');
      setEstado('error');
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
        <h2 className="text-xl font-bold">Agregar / Editar Contenidos</h2>

        <div>
          <input
            type="file"
            accept="image/*,video/*"
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
        </div>

        {preview && media instanceof File && (
          <div className="mt-2">
            {media.type.startsWith('video') ? (
              <video src={preview} controls className="max-h-40 rounded" />
            ) : (
              <img src={preview} alt="preview" className="max-h-40 rounded" />
            )}
          </div>
        )}

        {preview && !media && (
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
    </>
  );
};

export default FormInicio;
