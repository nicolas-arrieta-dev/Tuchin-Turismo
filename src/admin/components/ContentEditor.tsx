import React, { useState } from 'react';

export default function ContentEditor() {
  const [title, setTitle] = useState(localStorage.getItem('siteTitle') || 'Título de prueba');
  const [description, setDescription] = useState(localStorage.getItem('siteDesc') || 'Descripción del contenido...');

  const handleSave = () => {
    localStorage.setItem('siteTitle', title);
    localStorage.setItem('siteDesc', description);
    alert("Contenido guardado correctamente");
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Editor de Contenido</h2>
      <input
        className="w-full border p-2 mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full border p-2 mb-2"
        value={description}
        rows={5}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleSave}
      >
        Guardar
      </button>
    </div>
  );
}