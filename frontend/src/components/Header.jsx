import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

const cities = [
  'Краснодар',
  'Москва',
  'Ростов-на-Дону',
  'Саратов',
  'Волгоград',
  'Кисловодск',
  'Сочи',
  'Анапа',
];

export default function Header() {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const [city, setCity] = useState('Краснодар');
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside);
    else document.removeEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const renderNavigation = () => {
    // Show cities dropdown and profile/login button on home page
    if (location.pathname === '/') {
      return (
        <nav className="flex items-center gap-4">
          {/* Cities Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              className="flex items-center gap-2 text-blue-700 font-bold text-base md:text-lg hover:text-blue-800 transition-colors"
              onClick={() => setOpen((v) => !v)}
              type="button"
            >
              {city}
              <svg 
                className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {open && (
              <div className="absolute top-full left-0 mt-2 bg-white/80 backdrop-blur-md border border-white/20 rounded-lg shadow-xl z-50 min-w-[160px]">
                {cities.map((c) => (
                  <button
                    key={c}
                    className={`w-full text-left px-4 py-2 hover:bg-white/30 transition-all duration-200 ${
                      c === city ? 'bg-blue-500/20 text-blue-700 font-semibold' : 'text-gray-700'
                    } ${c === cities[0] ? 'rounded-t-lg' : ''} ${c === cities[cities.length - 1] ? 'rounded-b-lg' : ''}`}
                    onClick={() => { setCity(c); setOpen(false); }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Profile/Login Button */}
          {isAuthenticated ? (
            <Link 
              to="/profile" 
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-xs">
                  {user?.firstName?.charAt(0) || 'U'}
                </span>
              </div>
              <span>Личный профиль</span>
            </Link>
          ) : (
            <Link 
              to="/login" 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Войти
            </Link>
          )}
        </nav>
      );
    }
    
    // Show only "Главная" on profile page
    if (location.pathname === '/profile') {
      return (
        <nav className="flex gap-4 md:gap-8 items-center">
          <Link to="/" className="text-blue-700 font-bold text-base md:text-lg">
            Главная
          </Link>
        </nav>
      );
    }
    
    // Show full navigation on other pages
    return (
      <nav className="flex gap-4 md:gap-8 items-center">
        <a href="#" className="text-blue-700 font-bold text-base md:text-lg">Новостройки</a>
        <a href="#" className="text-blue-700 font-bold text-base md:text-lg">Ипотека</a>
        <Link to="/photos" className="text-blue-700 font-bold text-base md:text-lg">📸 Фото</Link>
        
        {isAuthenticated ? (
          <Link 
            to="/profile" 
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-xs">
                {user?.firstName?.charAt(0) || 'U'}
              </span>
            </div>
            <span className="hidden md:inline">Профиль</span>
          </Link>
        ) : (
          <Link 
            to="/login" 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Войти
          </Link>
        )}
      </nav>
    );
  };

  return (
    <header className="flex justify-between items-center px-4 md:px-8 py-3 md:py-4 bg-white shadow-none" style={{fontFamily: 'Nunito, sans-serif'}}>
      <div className="flex items-center gap-2">
        <Link to="/">
          <img src={logo} alt="Домли" className="h-6 md:h-8" />
        </Link>
      </div>
      {renderNavigation()}
    </header>
  );
} 