import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/admin/inicio', label: 'Inicio' },
  { to: '/admin/cultura', label: 'Cultura' },
  { to: '/admin/experiencias', label: 'Experiencias' },
  { to: '/admin/eventos', label: 'Eventos' },
  { to: '/admin/productos', label: 'Productos' },
  { to: '/admin/contactos', label: 'Contactos' },
  { to: '/admin/galeria', label: 'Galería' }
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<{ nombre?: string } | null>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const res = await fetch('http://localhost:3001/usuario_logeado', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        if (data.estado === 'ok') {
          setUser(data.usuario);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('❌ Error al consultar usuario logeado:', error);
        setUser(null);
      }
    };

    obtenerUsuario();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/login');
  };

  return (
    <>
      {/* Botón hamburguesa solo en móvil */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded"
        onClick={() => setOpen(true)}
        aria-label="Abrir menú"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-72 bg-gradient-to-b from-blue-600 to-blue-400 shadow-xl p-6 flex flex-col justify-between
          transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'}
          md:static md:translate-x-0 md:flex md:min-h-screen
        `}
      >
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center text-blue-600 font-bold text-xl shadow">
              {user?.nombre?.[0]?.toUpperCase() || 'U'}
            </div>
            <div>
              <h2 className="text-white text-xl font-bold">Panel Admin</h2>
              <p className="text-blue-100 text-sm">{user?.nombre || 'Usuario'}</p>
            </div>
          </div>
          <nav className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  pathname.startsWith(link.to)
                    ? 'bg-white text-blue-700 font-semibold shadow'
                    : 'text-white hover:bg-blue-500 hover:text-white'
                }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="mt-8 w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
        >
          Cerrar sesión
        </button>
      </aside>
    </>
  );
}
