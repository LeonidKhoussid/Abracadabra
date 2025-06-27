import logo from '../assets/logo.png';

export default function Header() {
  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white shadow-none" style={{fontFamily: 'Nunito, sans-serif'}}>
      <div className="flex items-center gap-2">
        <img src={logo} alt="Домли" className="h-8" />
      </div>
      <nav className="flex gap-8">
        <a href="#" className="text-blue-700 font-bold text-lg">Новостройки</a>
        <a href="#" className="text-blue-700 font-bold text-lg">Ипотека</a>
      </nav>
    </header>
  );
} 