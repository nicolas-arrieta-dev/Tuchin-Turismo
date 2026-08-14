import React, { useState, useEffect } from 'react';
import Notificacion from './notificacion';
import { motion } from 'framer-motion';

interface FormInicioProps {
  onSave?: (data: any) => void;
  initialData?: any;
}

const FormContactos: React.FC<FormInicioProps> = ({ onSave, initialData }) => {
    const [titulo, setTitulo] = useState('');
    const [preview, setPreview] = useState<string | null>(null);
    const [mensaje, setMensaje] = useState('');
    const [estado, setEstado] = useState<'ok' | 'error' | null>(null);
    const [presionado, setPresionado] = useState(false);
    const [numeroDestino, setNumeroDestino] = useState<string>('');

    useEffect(() => {
        if (initialData) {
            setTitulo(initialData.titulo || '');
            if (initialData.ruta_imagen) {
                setPreview(`http://127.0.0.1:3001/uploads/${initialData.ruta_imagen}`);
            }
        }
    }, [initialData]);

  useEffect(() => {
  const fetchNumero = async () => {
    try {
      const numeroRes = await fetch('http://localhost:3001/llamar_numero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const numeroData = await numeroRes.json();
      if (numeroData.estado === 'ok' && numeroData.datos.length > 0) {
        const numero = numeroData.datos[0].contacto;
        setNumeroDestino(numero);
        setTitulo(numero); // <<⬅️ Aquí asignas también el value del input
      }
    } catch (error) {
      console.error('❌ Error al obtener el número:', error);
    }
  };
  fetchNumero();
}, []);


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setPresionado(false);
  setTimeout(() => setPresionado(true), 0);

  try {
    const res = await fetch('http://localhost:3001/actualizar_contacto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ numero: titulo })  
    });

    const result = await res.json();

    if (result.estado === 'ok') {
      setMensaje('Contacto actualizado correctamente ✅');
      setEstado('ok');
      if (onSave) onSave({ titulo });
    } else {
      setMensaje('Error al actualizar el contacto ❌');
      setEstado('error');
    }
  } catch (err) {
    console.error('❌ Error al enviar:', err);
    setMensaje('Error al enviar el contacto ❌');
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
        <h2 className="text-xl font-bold">Agregar / Editar Contacto</h2>

<input
  type="number"
  className="w-full border p-2 mb-3"
  placeholder="Contacto"
  value={titulo}
  onChange={(e) => setTitulo(e.target.value)}
  required
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


    </>
  );
};

export default FormContactos;
