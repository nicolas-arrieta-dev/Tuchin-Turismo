import React, { useState, useEffect } from 'react';

interface Props {
  onSave: (data: {
    title: string;
    description: string;
    price: string;
    date: string;
    media: File | null;
  }) => void;
  initialData?: {
    title?: string;
    description?: string;
    price?: string;
    date?: string;
    media?: File | null;
  };
}

const ContentForm: React.FC<Props> = ({ onSave, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [price, setPrice] = useState(initialData?.price || '');
  const [date, setDate] = useState(initialData?.date || '');
  const [media, setMedia] = useState<File | null>(initialData?.media || null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (media) {
      const url = URL.createObjectURL(media);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreview(null);
  }, [media]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, description, price, date, media });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md max-w-xl space-y-3">
      <h2 className="text-xl font-bold">Agregar / Editar Contenido</h2>

      <input
        type="text"
        className="w-full border p-2"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        className="w-full border p-2"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        required
      />

      <input
        type="number"
        className="w-full border p-2"
        placeholder="Precio"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        type="date"
        className="w-full border p-2"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <div>
        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) setMedia(e.target.files[0]);
          }}
        />
        {preview && (
          <div className="mt-2">
            {media && media.type.startsWith('video') ? (
              <video src={preview} controls className="max-h-40 rounded" />
            ) : (
              <img src={preview} alt="preview" className="max-h-40 rounded" />
            )}
          </div>
        )}
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Guardar
      </button>
    </form>
  );
};

export default ContentForm;
