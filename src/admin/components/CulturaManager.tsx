import React from 'react';
import FormCultura from './FormCultura';
import Cultura from '../../components/Cultura';

export default function CulturaManager() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Sección Cultura</h2>
      <FormCultura />
           <div className="space-y-4">
        <h2 className="text-2xl font-bold">Vista prvia</h2>
  <div className="h-65 overflow-hidden scale-75 origin-top">
  <Cultura />
</div>

      </div>
    </div>
  );
}
