import logo from '../assets/logo.png';

export default function Header() {
  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white shadow">
      <div className="flex items-center gap-2">
        <img src={logo} alt="Домли" className="h-8" />
      </div>
      <nav className="flex gap-8">
        <a href="#" className="text-blue-700 font-medium">Новостройки</a>
        <a href="#" className="text-blue-700 font-medium">Ипотека</a>
      </nav>
      <div className="flex items-center gap-4">
        <select className="border rounded px-2 py-1">
          <option>Краснодар</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Войти</button>
      </div>
    </header>
  );
} 