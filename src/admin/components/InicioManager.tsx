import React from 'react';
import FormInicio from './FormInicio';
import Hero from '../../components/Hero';

export default function InicioManager() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Sección Inicio</h2>
      <FormInicio />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Vista prvia</h2>
  <div className="h-65 overflow-hidden scale-75 origin-top">
  <Hero />
</div>

      </div>
    </div>
  );
}
