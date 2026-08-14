import React, { useState } from 'react';

export default function MediaManager() {
  const [files, setFiles] = useState<File[]>([]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Gestión de Multimedia</h2>
      <input type="file" multiple onChange={handleUpload} />
      <div className="mt-4 grid grid-cols-3 gap-2">
        {files.map((file, index) => (
          <div key={index} className="relative">
            <img
              src={URL.createObjectURL(file)}
              alt="preview"
              className="w-full h-24 object-cover rounded"
            />
            <button
              onClick={() => removeFile(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
