import React, { useState } from 'react';
import FormInicio from './FormInicio';

interface Item {
  id: number;
  title: string;
  description: string;
  price: string;
  date: string;
  media: File | null;
}

const GestionContenido: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [selected, setSelected] = useState<Item | null>(null);

  const handleSave = (data: Omit<Item, 'id'>) => {
    if (selected) {
      setItems(items.map((i) => (i.id === selected.id ? { ...selected, ...data } : i)));
      setSelected(null);
    } else {
      setItems([...items, { ...data, id: Date.now() } as Item]);
    }
  };

  const onEdit = (item: Item) => setSelected(item);
  const onDelete = (id: number) => setItems(items.filter((i) => i.id !== id));

  return (
    <div className="space-y-6">
 

      <div className="bg-white p-4 rounded shadow-md overflow-x-auto">
        <h3 className="text-lg font-bold mb-2">Lista</h3>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-1 pr-2 font-medium">Título</th>
              <th className="py-1 pr-2 font-medium">Precio</th>
              <th className="py-1 pr-2 font-medium">Fecha</th>
              <th className="py-1 pr-2 font-medium">Media</th>
              <th className="py-1 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-1 pr-2">{item.title}</td>
                <td className="py-1 pr-2">${item.price}</td>
                <td className="py-1 pr-2">{item.date}</td>
                <td className="py-1 pr-2">
                  {item.media ? (
                    item.media.type.startsWith('video') ? (
                      <video src={URL.createObjectURL(item.media)} className="h-16" controls />
                    ) : (
                      <img src={URL.createObjectURL(item.media)} alt="media" className="h-16 object-cover rounded" />
                    )
                  ) : (
                    '—'
                  )}
                </td>
                <td className="py-1 space-x-2">
                  <button onClick={() => onEdit(item)} className="text-blue-600 hover:underline">Editar</button>
                  <button onClick={() => onDelete(item.id)} className="text-red-600 hover:underline">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GestionContenido;
