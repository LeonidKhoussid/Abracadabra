import React, { useState } from 'react';

const MODES = [
  { label: 'Купить', value: 'buy' },
  { label: 'Ипотека', value: 'mortgage' },
  { label: 'Рассрочка', value: 'installment' },
];

export default function HeroSection() {
  const [mode, setMode] = useState('buy');

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
        <img
          src="src/assets/firstBlockImg.png"
          alt="ЖК Домли"
          className="hero-section__img"
        />
      </div>
    </section>
  );
} 