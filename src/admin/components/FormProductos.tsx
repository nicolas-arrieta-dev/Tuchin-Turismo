import React, { useState, useEffect } from 'react';
import Notificacion from './notificacion';

interface FormInicioProps {
  onSave?: (data: any) => void;
  initialData?: any;
}
interface Tienda {
  id: number;
  nombre: string;
}
interface Producto {
  id: number;
  nombre_producto: string;
  descripcion: string;
  precio: number;
  imagen: string;
  nombre_tienda: string;
}

const FormProductos: React.FC<FormInicioProps> = ({ onSave, initialData }) => {
  const [nombreProducto, setNombreProducto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [media, setMedia] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState('');
  const [estado, setEstado] = useState<'ok' | 'error' | null>(null);
  const [presionado, setPresionado] = useState(false);
  const [tiendas, setTiendas] = useState<Tienda[]>([]);
  const [selectedTienda, setSelectedTienda] = useState<string>('');
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  const consultarProductos = async () => {
    try {
      const response = await fetch('http://localhost:3001/mostrar_productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (data.estado === 'ok') setProductos(data.datos);
    } catch (error) {
      console.error('❌ Error al consultar los productos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    consultarProductos();
  }, []);

  useEffect(() => {
    const fetchTiendas = async () => {
      try {
        const response = await fetch('http://localhost:3001/mostrar_tiendas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        if (data.estado === 'ok') setTiendas(data.datos);
      } catch (error) {
        console.error('❌ Error al obtener tiendas:', error);
      }
    };
    fetchTiendas();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPresionado(false);
    setTimeout(() => setPresionado(true), 0);

    const formData = new FormData();
    formData.append('artesano_id', selectedTienda);
    formData.append('nombre_producto', nombreProducto);
    formData.append('descripcion', descripcion);
    formData.append('precio', precio);
    if (media) formData.append('imagen', media);

    try {
      const response = await fetch('http://127.0.0.1:3001/producto', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      setMensaje(result.mensaje || 'Producto registrado correctamente ✅');
      setEstado(result.estado === 'ok' ? 'ok' : 'error');

      if (onSave) onSave(result);

      await consultarProductos(); // actualizar lista

      // Limpiar campos
      setNombreProducto('');
      setDescripcion('');
      setPrecio('');
      setMedia(null);
      setPreview(null);
      setSelectedTienda('');

    } catch (err) {
      console.error('❌ Error al enviar:', err);
      setMensaje('Error al enviar el producto ❌');
      setEstado('error');
    }
  };

  const eliminarProducto = async (id: number) => {
    const confirmar = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (!confirmar) return;

    try {
      const response = await fetch('http://localhost:3001/eliminar_producto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      const data = await response.json();
      if (data.estado === 'ok') {
        alert('✅ Producto eliminado correctamente');
        await consultarProductos();
      } else {
        alert(`⚠️ No se pudo eliminar: ${data.mensaje}`);
      }
    } catch (error) {
      console.error('❌ Error al eliminar el producto:', error);
      alert('❌ Error inesperado al eliminar el producto');
    }
  };

  return (
    <>
      {presionado && estado && (
        <Notificacion mensaje={mensaje} tipo={estado} />
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow-md max-w-xl space-y-3"
        encType="multipart/form-data"
      >
        <h2 className="text-xl font-bold">Agregar Producto</h2>

        <input
          type="text"
          className="w-full border p-2"
          placeholder="Nombre del producto"
          value={nombreProducto}
          onChange={(e) => setNombreProducto(e.target.value)}
          required
        />

        <textarea
          className="w-full border p-2"
          placeholder="Descripción"
          rows={3}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />

        <input
          type="number"
          className="w-full border p-2"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
        />

        <select
          className="w-full border p-2"
          value={selectedTienda}
          onChange={(e) => setSelectedTienda(e.target.value)}
          required
        >
          <option value="">-- Elige una tienda --</option>
          {tiendas.map((tienda) => (
            <option key={tienda.id} value={tienda.id}>{tienda.nombre}</option>
          ))}
        </select>

        <input
          type="file"
          accept="image/*"
          name="imagen"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setMedia(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            } else {
              setMedia(null);
              setPreview(null);
            }
          }}
          required
        />

        {preview && (
          <div className="mt-2">
            <img src={preview} alt="preview" className="max-h-40 rounded" />
          </div>
        )}

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Guardar
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-10">
        {productos.map((producto) => (
          <div key={producto.id} className="border rounded shadow p-4">
            <img
              src={`http://localhost:3001/uploads/${producto.imagen}`}
              alt={producto.nombre_producto}
              className="w-full h-40 object-cover mb-2 rounded"
            />
            <h3 className="font-bold">{producto.nombre_producto}</h3>
            <p className="text-sm text-gray-600">{producto.descripcion}</p>
            <p className="text-sm text-gray-500">Tienda: {producto.nombre_tienda}</p>
            <p className="text-lg font-semibold text-primary">${producto.precio.toLocaleString()}</p>
            <button
              onClick={() => eliminarProducto(producto.id)}
              className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default FormProductos;
