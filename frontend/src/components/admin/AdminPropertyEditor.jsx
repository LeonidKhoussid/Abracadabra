import React from 'react';

const AdminPropertyEditor = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Редактор объектов</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Добавить объект
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-gray-600 text-center py-8">
          Функционал редактора объектов будет добавлен позже
        </p>
      </div>
    </div>
  );
};

export default AdminPropertyEditor; 