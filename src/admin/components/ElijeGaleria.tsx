import React, { useEffect, useState } from 'react';

interface Imagen {
  id: number;
  ruta_imagen: string;
  descripcion?: string;
  orden?: string;
}

export default function ElijeGaleria() {
  const [imagenes, setImagenes] = useState<Imagen[]>([]);
  const [cargando, setCargando] = useState(true);
  const [seleccionadaId, setSeleccionadaId] = useState<number | null>(null);

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


const confirmarSeleccion = async () => {
  if (seleccionadaId === null) {
    alert('Selecciona una imagen primero');
    return;
  }

  try {


    // 2. Asignar la imagen seleccionada como principal (orden = 'P')
    const actualizarRes = await fetch('http://localhost:3001/actualizar_orden', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: seleccionadaId, orden: 'P' })
    });

    const respuesta = await actualizarRes.json();

    if (actualizarRes.ok) {
      alert('✅ Imagen marcada como Principal');
      // Refrescar galería
      const nuevaConsulta = await fetch('http://localhost:3001/galeria', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const nuevosDatos = await nuevaConsulta.json();
      setImagenes(nuevosDatos.datos);
    } else {
      alert(`❌ Error: ${respuesta.error}`);
    }

  } catch (error) {
    console.error('❌ Error en el proceso:', error);
    alert('❌ Hubo un error al actualizar la imagen principal');
  }
};

  return (
    <>
      {cargando ? (
        <div>Cargando galería...</div>
      ) : (
        <div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px'
          }}>
            {imagenes.map(img => (
              <label key={img.id} style={{
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                background: '#fff',
                transition: 'transform 0.2s',
                cursor: 'pointer',
                border: seleccionadaId === img.id ? '3px solid #f59e0b' : '3px solid transparent'
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

                <div style={{
                  padding: '12px',
                  fontSize: '1rem',
                  color: '#333',
                  background: '#fafafa'
                }}>
                  <input
                    type="radio"
                    name="imagenSeleccionada"
                    value={img.id}
                    checked={seleccionadaId === img.id}
                    onChange={() => setSeleccionadaId(img.id)}
                    style={{ marginRight: '8px' }}
                  />
                </div>
              </label>
            ))}
          </div>

          <div className="text-center mt-6">
            <button
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
              onClick={confirmarSeleccion}
            >
              Confirmar selección
            </button>
          </div>
        </div>
      )}
    </>
  );
}
