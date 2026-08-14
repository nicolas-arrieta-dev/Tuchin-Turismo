import React, { useEffect, useState } from 'react';

interface Imagen {
  id: number;
  ruta_imagen: string;
  descripcion?: string;
  orden?: string;
}

export default function ElijeGaleria2() {
  const [imagenes, setImagenes] = useState<Imagen[]>([]);
  const [cargando, setCargando] = useState(true);
  const [seleccionadas, setSeleccionadas] = useState<number[]>([]);

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

  const toggleSeleccion = (id: number) => {
    if (seleccionadas.includes(id)) {
      setSeleccionadas(seleccionadas.filter(i => i !== id));
    } else {
      if (seleccionadas.length < 2) {
        setSeleccionadas([...seleccionadas, id]);
      } else {
        alert('Solo puedes seleccionar 2 imágenes como secundarias');
      }
    }
  };

  const confirmar = async () => {
    if (seleccionadas.length !== 2) {
      alert('Debes seleccionar exactamente 2 imágenes');
      return;
    }

    try {
      const res = await fetch('http://localhost:3001/actualizar_secundarias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ids: seleccionadas })
      });

      const data = await res.json();

      if (data.estado === 'ok') {
        alert('✅ Secundarias actualizadas correctamente');
        // refrescar
        const nuevas = await fetch('http://localhost:3001/galeria', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
        const r = await nuevas.json();
        setImagenes(r.datos);
        setSeleccionadas([]);
      } else {
        alert('❌ Error al actualizar');
      }
    } catch (e) {
      alert('❌ Error en el servidor');
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
              <div
                key={img.id}
                onClick={() => toggleSeleccion(img.id)}
                style={{
                  position: 'relative',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  background: seleccionadas.includes(img.id) ? '#cce5ff' : '#fff',
                  border: seleccionadas.includes(img.id) ? '3px solid #007bff' : '3px solid transparent',
                  cursor: 'pointer'
                }}
              >
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
                  alt={img.descripcion || 'Imagen'}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover'
                  }}
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-6">
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              onClick={confirmar}
            >
              Confirmar secundarias
            </button>
          </div>
        </div>
      )}
    </>
  );
}
