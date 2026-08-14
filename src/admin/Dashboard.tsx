import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';

// Importa cada sección del panel
import InicioManager from './components/InicioManager';
import CulturaManager from './components/CulturaManager';
import ExperienciasManager from './components/ExperienciasManager';
import EventosManager from './components/EventosManager';
import GaleriaManager from './components/GaleriaManager';
import ProductosManager from './components/ProductosManager';
import ContactosManager from './components/ContactosManager';

export default function Dashboard() {
  return (
    <AdminLayout>
      {/* Rutas internas del panel */}
      <Routes>
        {/* Al entrar a /admin, redirige a /admin/inicio */}
        <Route path="/" element={<Navigate to="inicio" replace />} />

        {/* Secciones */}
        <Route path="inicio" element={<InicioManager />} />
        <Route path="cultura" element={<CulturaManager />} />
        <Route path="experiencias" element={<ExperienciasManager />} />
        <Route path="eventos" element={<EventosManager />} />
        <Route path="productos" element={<ProductosManager />} />
        <Route path="contactos" element={<ContactosManager />} />
        <Route path="galeria" element={<GaleriaManager />} />
      </Routes>
    </AdminLayout>
  );
}
