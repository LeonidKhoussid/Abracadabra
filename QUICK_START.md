# 🚀 Быстрый старт для членов команды

## Требования
- Node.js 18+ 
- npm 8+
- PostgreSQL 12+

## Настройка одной командой

### Linux/macOS
```bash
git clone <url-вашего-репозитория>
cd domli
chmod +x scripts/team-setup.sh
./scripts/team-setup.sh
```

### Windows
```bash
git clone <url-вашего-репозитория>
cd domli
scripts\team-setup.bat
```

## Ручная настройка (если скрипты не работают)

### 1. Установка зависимостей
```bash
npm run install:all
```

### 2. Настройка базы данных
```sql
CREATE DATABASE domli_db;
CREATE USER domli_user WITH PASSWORD 'domli_password_123';
GRANT ALL PRIVILEGES ON DATABASE domli_db TO domli_user;
```

### 3. Создание файлов окружения

**backend/.env:**
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=domli_db
DB_USER=domli_user
DB_PASSWORD=domli_password_123
JWT_SECRET=ваш_супер_секретный_jwt_ключ_измените_это_в_продакшене
JWT_EXPIRES_IN=7d
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**frontend/.env:**
```env
VITE_API_URL=http://localhost:3000/api
VITE_NODE_ENV=development
```

### 4. Запуск миграций
```bash
cd backend
npm run migrate
npm run seed
cd ..
```

### 5. Запуск приложения
```bash
npm run dev
```

## URL для доступа
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000
- **Проверка здоровья**: http://localhost:3000/health

## Частые команды
```bash
npm run dev          # Запуск серверов разработки
npm run build        # Сборка для продакшена
npm run start        # Запуск с PM2
npm run logs         # Просмотр логов
```

## Нужна помощь?
- Проверьте `TEAM_SETUP.md` для подробных инструкций
- Посмотрите на логи терминала для ошибок
- Спросите вашего тимлида! 