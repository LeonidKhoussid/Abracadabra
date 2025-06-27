export default function FilterBar() {
  return (
    <div className="flex flex-wrap gap-2 items-center bg-white rounded-lg shadow px-4 py-3 mt-4">
      <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded">Купить</button>
      <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded">Ипотека</button>
      <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded">Рассрочка</button>
      <select className="border rounded px-2 py-1">
        <option>Застройщик</option>
      </select>
      <select className="border rounded px-2 py-1">
        <option>Комнатность</option>
      </select>
      <select className="border rounded px-2 py-1">
        <option>Цена</option>
      </select>
      <select className="border rounded px-2 py-1">
        <option>Сроки</option>
      </select>
      <button className="bg-blue-600 text-white px-4 py-2 rounded ml-2">Найти</button>
    </div>
  );
} 