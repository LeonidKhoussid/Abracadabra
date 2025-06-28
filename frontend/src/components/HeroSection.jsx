import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

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

const MODES = [
  { label: 'Купить', value: 'buy' },
  { label: 'Ипотека', value: 'mortgage' },
  { label: 'Рассрочка', value: 'installment' },
];

export default function HeroSection() {
  const [city, setCity] = useState('Краснодар');
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('buy');
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  // Закрытие dropdown при клике вне
  function handleClickOutside(e) {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpen(false);
    }
  }
  // Навешиваем слушатель на документ
  React.useEffect(() => {
    if (open) document.addEventListener('mousedown', handleClickOutside);
    else document.removeEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  return (
    <section
      className="hero-section"
      style={{ fontFamily: 'Nunito, sans-serif' }}
    >
      {/* Левая часть */}
      <div className="hero-section__left">
        <h1 className="hero-section__title">
          Ищете дом?
        </h1>
        <h2 className="hero-section__subtitle">
          Начните с <span className="hero-section__subtitle--accent">Домли</span>
        </h2>
        <p className="hero-section__desc">
          Ваш уютный уголок ближе, чем вы думаете
        </p>
        {/* Фильтры и кнопки */}
        <div className="hero-section__filters">
          <div className="hero-section__switch-group">
            {MODES.map((btn) => (
              <button
                key={btn.value}
                className={`btn-switch${mode === btn.value ? ' btn-switch--active' : ''}`}
                onClick={() => setMode(btn.value)}
                type="button"
              >
                {btn.label}
              </button>
            ))}
          </div>
          <div className="hero-section__select-group">
            <select className="hero-section__select">
              <option>Застройщик</option>
            </select>
            <select className="hero-section__select">
              <option>Комнатность</option>
            </select>
            <select className="hero-section__select">
              <option>Цена</option>
            </select>
            <select className="hero-section__select">
              <option>Сроки</option>
            </select>
            <button className="hero-section__find-btn">Найти</button>
          </div>
        </div>
      </div>
      {/* Правая часть */}
      <div className="hero-section__right">
        {/* Dropdown и кнопка Войти/Личный кабинет */}
        <div className="hero-section__city-login">
          <div ref={dropdownRef} className="hero-section__dropdown">
            <button
              className="hero-section__city-btn"
              onClick={() => setOpen((v) => !v)}
              type="button"
            >
              {city}
              <svg className={`hero-section__city-arrow${open ? ' hero-section__city-arrow--open' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {open && (
              <div className="hero-section__city-list">
                {cities.map((c) => (
                  <div
                    key={c}
                    className={`hero-section__city-item${c === city ? ' hero-section__city-item--active' : ''}`}
                    onClick={() => { setCity(c); setOpen(false); }}
                  >
                    {c}
                  </div>
                ))}
              </div>
            )}
          </div>
          {!isAuthenticated ? (
            <button 
              className="hero-section__login-btn"
              onClick={handleLoginClick}
            >
              Войти
            </button>
          ) : (
            <button 
              className="hero-section__login-btn"
              onClick={handleDashboardClick}
            >
              Личный кабинет
            </button>
          )}
        </div>
        <img
          src="src/assets/firstBlockImg.png"
          alt="ЖК Домли"
          className="hero-section__img"
        />
      </div>
    </section>
  );
} 