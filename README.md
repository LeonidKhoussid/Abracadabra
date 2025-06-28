# Domli - Платформа Недвижимости

Современная платформа недвижимости, построенная на React frontend и Express.js backend.

## 🚀 Возможности

- Регистрация и аутентификация пользователей
- Поиск и фильтрация недвижимости
- Управление предпочтениями пользователей
- Адаптивный дизайн
- Обновления в реальном времени

## 🛠 Технологический стек

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router DOM

### Backend
- Node.js
- Express.js
- PostgreSQL
- JWT Аутентификация
- bcryptjs для хеширования паролей

### Управление процессами
- PM2 для управления процессами в продакшене

## 📋 Требования

- Node.js >= 18.0.0
- npm >= 8.0.0
- PostgreSQL >= 12.0
- PM2 (для продакшена)

## 🚀 Быстрый старт

### 1. Клонирование репозитория
```bash
git clone <url-репозитория>
cd domli
```

### 2. Установка зависимостей
```bash
npm run install:all
```

### 3. Настройка окружения

#### Окружение Backend
Скопируйте файл примера окружения и настройте его:
```bash
cd backend
cp env.example .env
```

Отредактируйте `.env` с вашей конфигурацией базы данных и JWT:
```env
# База данных
DB_HOST=localhost
DB_PORT=5432
DB_NAME=domli_db
DB_USER=ваш_пользователь
DB_PASSWORD=ваш_пароль

# JWT
JWT_SECRET=ваш_jwt_секретный_ключ
JWT_EXPIRES_IN=7d

# Сервер
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

#### Окружение Frontend
```bash
cd frontend
cp env.example .env
```

Отредактируйте `.env`:
```env
VITE_API_URL=http://localhost:3000/api
VITE_NODE_ENV=development
```

### 4. Настройка базы данных
```bash
cd backend
npm run migrate
npm run seed
```

### 5. Режим разработки
```bash
# Запуск frontend и backend в режиме разработки
npm run dev
```

Или запустите их отдельно:
```bash
# Только backend
cd backend && npm run dev

# Только frontend
cd frontend && npm run dev
```

## 🏭 Продакшен развертывание

### 1. Сборка приложения
```bash
npm run build
```

### 2. Запуск с PM2
```bash
# Режим разработки
npm run start

# Продакшен режим
npm run start:prod
```

### 3. Команды управления PM2
```bash
# Просмотр статуса
npm run status

# Просмотр логов
npm run logs

# Мониторинг процессов
npm run monit

# Перезапуск приложений
npm run restart

# Остановка приложений
npm run stop

# Удаление приложений
npm run delete
```

## 📁 Структура проекта

```
domli/
├── backend/                 # Express.js backend
│   ├── config/             # Конфигурация базы данных и приложения
│   ├── middleware/         # Пользовательские middleware
│   ├── migrations/         # Миграции базы данных
│   ├── routes/             # API маршруты
│   ├── seeds/              # Данные для заполнения базы данных
│   └── server.js           # Главный файл сервера
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React компоненты
│   │   ├── context/        # React context провайдеры
│   │   ├── pages/          # Компоненты страниц
│   │   ├── services/       # API сервисы
│   │   └── App.jsx         # Главный компонент приложения
│   └── package.json
├── ecosystem.config.js     # Конфигурация PM2
├── package.json            # Корневой package.json
└── README.md
```

## 🔐 Аутентификация

Приложение использует JWT (JSON Web Tokens) для аутентификации:

- **Регистрация**: Пользователи могут регистрироваться с email, паролем и личной информацией
- **Вход**: Пользователи могут входить с email и паролем
- **Защищенные маршруты**: Некоторые маршруты требуют аутентификации
- **Хранение токенов**: Токены хранятся в localStorage

## 🗄 Схема базы данных

### Таблица Users
- id (Первичный ключ)
- first_name
- last_name
- email (Уникальный)
- phone
- password_hash
- is_active
- created_at
- last_login

### Таблица User Preferences
- id (Первичный ключ)
- user_id (Внешний ключ)
- property_type
- rooms
- min_price
- max_price
- location
- created_at
- updated_at

### Таблица Properties
- id (Первичный ключ)
- title
- description
- price
- property_type
- rooms
- area
- location
- is_available
- owner_id (Внешний ключ)
- created_at
- updated_at

## 🔌 API Endpoints

### Аутентификация
- `POST /api/auth/register` - Регистрация пользователя
- `POST /api/auth/login` - Вход пользователя
- `POST /api/auth/logout` - Выход пользователя
- `GET /api/auth/me` - Получение информации о текущем пользователе

### Пользователи
- `GET /api/users/profile` - Получение профиля пользователя
- `PUT /api/users/profile` - Обновление профиля пользователя
- `PUT /api/users/preferences` - Обновление предпочтений пользователя

### Недвижимость
- `GET /api/properties` - Получение недвижимости с фильтрами
- `GET /api/properties/:id` - Получение недвижимости по ID

## 🐛 Устранение неполадок

### Частые проблемы

1. **Ошибка подключения к базе данных**
   - Проверьте, запущен ли PostgreSQL
   - Проверьте учетные данные базы данных в `.env`
   - Убедитесь, что база данных существует

2. **Ошибка CORS**
   - Проверьте `FRONTEND_URL` в backend `.env`
   - Убедитесь, что frontend запущен на правильном порту

3. **Проблемы с PM2**
   - Проверьте логи PM2: `npm run logs`
   - Перезапустите приложения: `npm run restart`

### Логи
- Логи backend: `cd backend && npm run logs`
- Логи frontend: Проверьте консоль браузера
- Логи PM2: `npm run logs`

## 📝 Лицензия

Этот проект лицензирован под MIT License.

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для функции
3. Внесите изменения
4. Добавьте тесты, если применимо
5. Отправьте pull request

## 📞 Поддержка

Для поддержки напишите на support@domli.com или создайте issue в репозитории. 