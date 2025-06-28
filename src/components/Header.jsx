import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Header() {
  return (
    <header className="flex justify-between items-center px-4 md:px-8 py-3 md:py-4 bg-white shadow-none" style={{fontFamily: 'Nunito, sans-serif'}}>
      <div className="flex items-center gap-2">
        <Link to="/">
          <img src={logo} alt="Домли" className="h-6 md:h-8" />
        </Link>
      </div>
      <nav className="flex gap-4 md:gap-8 items-center">
        <a href="#" className="text-blue-700 font-bold text-base md:text-lg">Новостройки</a>
        <a href="#" className="text-blue-700 font-bold text-base md:text-lg">Ипотека</a>
      </nav>
    </header>
  );
} 