import React, { useEffect, useState } from 'react';

interface Imagen {
  id: number;
  ruta_imagen: string;
  descripcion?: string;
  orden?: string;
}

export default function Galeria() {
  const [imagenes, setImagenes] = useState<Imagen[]>([]);
  const [cargando, setCargando] = useState(true);

  // Estado para el formulario
  const [archivo, setArchivo] = useState<File | null>(null);
  const [descripcion, setDescripcion] = useState('');
  const [orden, setOrden] = useState<'P' | 'S' | ''>('');

  // Cargar galería
  useEffect(() => {
    fetch('http://localhost:3001/galeria', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        setImagenes(data.datos);
        setCargando(false);
      })
      .catch(err => {
        console.error('❌ Error al consultar galería:', err);
        setCargando(false);
      });
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!archivo) {
      alert('Debes seleccionar una imagen.');
      return;
    }

    const formData = new FormData();
    formData.append('imagen', archivo);
    formData.append('descripcion', descripcion);
    formData.append('orden', orden);

    try {
      const res = await fetch('http://localhost:3001/galeria/nueva', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      alert(data.mensaje || 'Imagen subida');

      // Refrescar galería
      setCargando(true);
      fetch('http://localhost:3001/galeria', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          setImagenes(data.datos);
          setCargando(false);
        });

      // Limpiar formulario
      setArchivo(null);
      setDescripcion('');
      setOrden('');
    } catch (err) {
      console.error('❌ Error al subir imagen:', err);
      alert('Error al subir imagen');
    }
  };

  return (
    <div style={{ padding: '24px' }}>

      
      <h2>➕ Agregar Imagen a la Galería</h2>
      <form onSubmit={handleUpload} style={{ marginBottom: '32px' }}>
        <div>
          <label>Selecciona imagen:</label>
          <input
            type="file"
            accept="image/*"
            onChange={e => setArchivo(e.target.files?.[0] || null)}
            required
          />
        </div>

 
        <button className='bg-green-500 px-4 py-2 rounded m-6' type="submit">Subir Imagen</button>
      </form>

      {cargando ? (
        <div>Cargando galería...</div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px'
        }}>
          {imagenes.map(img => (
            <div key={img.id} style={{
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              background: '#fff',
              transition: 'transform 0.2s',
            }}>
              {/* Etiquetas */}
              {img.orden === 'P' && (
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  backgroundColor: '#FFD700',
                  color: '#000',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontSize: '0.85rem',
                  zIndex: 2
                }}>
                  Principal
                </div>
              )}
              {img.orden === 'S' && (
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontSize: '0.85rem',
                  zIndex: 2
                }}>
                  Secundaria
                </div>
              )}

              <img
                src={`http://localhost:3001/uploads/${img.ruta_imagen}`}
                alt={img.descripcion || 'Imagen de galería'}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />

              {img.descripcion && (
                <div style={{
                  padding: '12px',
                  fontSize: '1rem',
                  color: '#333',
                  background: '#fafafa'
                }}>
                  {img.descripcion}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
