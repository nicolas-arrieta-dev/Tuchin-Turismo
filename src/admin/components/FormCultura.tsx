import React, { useState, useEffect } from 'react';
import Notificacion from './notificacion';

interface FormInicioProps {
  onSave?: (data: any) => void;
  initialData?: any;
}

const FormCultura: React.FC<FormInicioProps> = ({ onSave, initialData }) => {
  const [media1, setMedia1] = useState<File | null>(null);
  const [media2, setMedia2] = useState<File | null>(null);
  const [preview1, setPreview1] = useState<string | null>(null);
  const [preview2, setPreview2] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState('');
  const [estado, setEstado] = useState<'ok' | 'error' | null>(null);
  const [presionado, setPresionado] = useState(false);

  useEffect(() => {
    if (initialData?.ruta_imagen) {
      setPreview1(`http://127.0.0.1:3001/uploads/${initialData.ruta_imagen}`);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPresionado(false);
    setTimeout(() => setPresionado(true), 0);

    const formData = new FormData();
    if (media1) formData.append('imagen1', media1);
    if (media2) formData.append('imagen2', media2);

    try {
    const response = await fetch('http://127.0.0.1:3001/img_secundarias', {
    method: 'POST',
    body: formData,
    });

      const result = await response.json();
      console.log('✅ Respuesta del servidor:', result);

      setMensaje(result.mensaje || 'Imagen subida correctamente ✅');
      setEstado(result.estado === 'ok' ? 'ok' : 'error');

      if (onSave) onSave(result);

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

        {/* Imagen 1 */}
        <div>
          <label className="font-semibold">Imagen 1</label>
          <input
            type="file"
            accept="image/*,video/*"
            name="imagen1"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                setMedia1(file);
                setPreview1(URL.createObjectURL(file));
              } else {
                setMedia1(null);
                setPreview1(null);
              }
            }}
          />
          {preview1 && (
            <div className="mt-2">
              {media1 && media1.type.startsWith('video') ? (
                <video src={preview1} controls className="max-h-40 rounded" />
              ) : (
                <img src={preview1} alt="preview1" className="max-h-40 rounded" />
              )}
            </div>
          )}
        </div>

        {/* Imagen 2 */}
        <div>
          <label className="font-semibold">Imagen 2</label>
          <input
            type="file"
            accept="image/*,video/*"
            name="imagen2"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                setMedia2(file);
                setPreview2(URL.createObjectURL(file));
              } else {
                setMedia2(null);
                setPreview2(null);
              }
            }}
          />
          {preview2 && (
            <div className="mt-2">
              {media2 && media2.type.startsWith('video') ? (
                <video src={preview2} controls className="max-h-40 rounded" />
              ) : (
                <img src={preview2} alt="preview2" className="max-h-40 rounded" />
              )}
            </div>
          )}
        </div>

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

export default FormCultura;
