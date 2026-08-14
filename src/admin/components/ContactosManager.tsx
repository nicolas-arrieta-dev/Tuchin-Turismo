import React from 'react';
import FormExperiencia from './FormExperiencia';
import FormContactos from './FormContactos';

export default function ExperienciasManager() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Sección Contactos</h2>
      <FormContactos />
    </div>
  );
}
