import React, { useState } from 'react';
import Galeria from './Galeria';
import ElijeGaleria from './ElijeGaleria';
import ElijeGaleria2 from './ElijeGaleia2';
import ElijeGaleria3 from './ElijeGaleria3';

export default function GaleriaManager() {
  const [componenteActual, setComponenteActual] = useState<'galeria' | 'principal' | 'secundario' | 'borrar'>('galeria');

  const renderComponente = () => {
    switch (componenteActual) {
      case 'principal':
        return <ElijeGaleria />;
      case 'secundario':
        return <ElijeGaleria2 />;
      case 'borrar':
        return <ElijeGaleria3 />;
      default:
        return <Galeria />;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Galería de Imágenes</h2>
      <div>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded m-6"
          onClick={() => setComponenteActual('principal')}
        >
          Elegir principal
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded m-6"
          onClick={() => setComponenteActual('secundario')}
        >
          Elegir secundarios
        </button>
                <button
          className="bg-red-500 text-white px-4 py-2 rounded m-6"
          onClick={() => setComponenteActual('borrar')}
        >
          Eliminar fotos
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded m-6"
          onClick={() => setComponenteActual('galeria')}
        >
          Galería
        </button>
      </div>

      {renderComponente()}
    </div>
  );
}

