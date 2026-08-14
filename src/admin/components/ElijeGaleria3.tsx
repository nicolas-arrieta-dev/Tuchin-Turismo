import React, { useEffect, useState } from 'react';

interface Imagen {
  id: number;
  ruta_imagen: string;
  descripcion?: string;
  orden?: string;
}

export default function ElijeGaleria3() {
  const [imagenes, setImagenes] = useState<Imagen[]>([]);
  const [cargando, setCargando] = useState(true);
  const [seleccionadas, setSeleccionadas] = useState<number[]>([]); // 🔁 varios seleccionados

  useEffect(() => {
    cargarGaleria();
  }, []);

  const cargarGaleria = async () => {
    try {
      const res = await fetch('http://localhost:3001/galeria', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      setImagenes(data.datos);
      setCargando(false);
    } catch (err) {
      console.error('❌ Error al consultar galería:', err);
      setCargando(false);
    }
  };

  const toggleSeleccion = (id: number) => {
    setSeleccionadas(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const eliminarSeleccionadas = async () => {
    if (seleccionadas.length === 0) {
      alert('Selecciona al menos una imagen para eliminar');
      return;
    }



    try {
      const res = await fetch('http://localhost:3001/eliminar_imagenes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: seleccionadas })
      });

      const resultado = await res.json();

      if (res.ok) {
        alert('✅ Imágenes eliminadas');
        setSeleccionadas([]); // limpiar selección
        cargarGaleria(); // recargar
      } else {
        alert(`❌ Error: ${resultado.mensaje}`);
      }
    } catch (error) {
      console.error('❌ Error al eliminar:', error);
      alert('❌ Error en el servidor');
    }
  };

  return (
    <>
      {cargando ? (
        <div>Cargando galería...</div>
      ) : (
        <div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px'
            }}
          >
            {imagenes.map(img => (
              <label
                key={img.id}
                style={{
                  position: 'relative',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  background: '#fff',
                  transition: 'transform 0.2s',
                  cursor: 'pointer',
                  border: seleccionadas.includes(img.id)
                    ? '3px solid #dc2626'
                    : '3px solid transparent'
                }}
              >
                {/* Etiquetas */}
                {img.orden === 'P' && (
                  <div
                    style={{
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
                    }}
                  >
                    Principal
                  </div>
                )}
                {img.orden === 'S' && (
                  <div
                    style={{
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
                    }}
                  >
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

                <div
                  style={{
                    padding: '12px',
                    fontSize: '1rem',
                    color: '#333',
                    background: '#fafafa'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={seleccionadas.includes(img.id)}
                    onChange={() => toggleSeleccion(img.id)}
                    style={{ marginRight: '8px' }}
                  />

                </div>
              </label>
            ))}
          </div>

          <div className="text-center mt-6">
            <button
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
              onClick={eliminarSeleccionadas}
            >
              Eliminar seleccionadas
            </button>
          </div>
        </div>
      )}
    </>
  );
}
