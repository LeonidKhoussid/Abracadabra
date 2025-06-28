# 🚀 Руководство по настройке команды - Без Docker

Это руководство поможет вашим товарищам по команде настроить приложение Domli локально без Docker.

## 📋 Требования

Перед началом убедитесь, что у вас установлено следующее:

- **Node.js** (версия 18.0.0 или выше)
- **npm** (версия 8.0.0 или выше)
- **PostgreSQL** (версия 12.0 или выше)

### Установка требований

#### Windows
1. **Node.js**: Скачайте с [nodejs.org](https://nodejs.org/)
2. **PostgreSQL**: Скачайте с [postgresql.org](https://www.postgresql.org/download/windows/)

#### macOS
```bash
# Используя Homebrew
brew install node
brew install postgresql
brew services start postgresql
```

#### Linux (Ubuntu/Debian)
```bash
# Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

## 🛠 Инструкции по настройке

### 1. Клонирование репозитория
```bash
git clone <url-вашего-репозитория>
cd domli
```

### 2. Установка зависимостей
```bash
npm run install:all
```

### 3. Настройка базы данных

#### Создание базы данных PostgreSQL
```bash
# Подключение к PostgreSQL как пользователь postgres
sudo -u postgres psql

# Создание базы данных и пользователя
CREATE DATABASE domli_db;
CREATE USER domli_user WITH PASSWORD 'ваш_пароль';
GRANT ALL PRIVILEGES ON DATABASE domli_db TO domli_user;
\q
```

#### Windows (если используете pgAdmin или psql)
```sql
CREATE DATABASE domli_db;
CREATE USER domli_user WITH PASSWORD 'ваш_пароль';
GRANT ALL PRIVILEGES ON DATABASE domli_db TO domli_user;
```

### 4. Конфигурация окружения

#### Окружение Backend
```bash
cd backend
cp env.example .env
```

Отредактируйте `backend/.env`:
```env
# Конфигурация базы данных
DB_HOST=localhost
DB_PORT=5432
DB_NAME=domli_db
DB_USER=domli_user
DB_PASSWORD=ваш_пароль

# Конфигурация JWT
JWT_SECRET=ваш_супер_секретный_jwt_ключ_измените_это_в_продакшене
JWT_EXPIRES_IN=7d

# Конфигурация сервера
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

#### Окружение Frontend
```bash
cd frontend
cp env.example .env
```

Отредактируйте `frontend/.env`:
```env
# Конфигурация API
VITE_API_URL=http://localhost:3000/api
VITE_NODE_ENV=development
```

### 5. Миграция и заполнение базы данных
```bash
cd backend
npm run migrate
npm run seed
```

### 6. Запуск приложения

#### Вариант A: Запуск frontend и backend вместе
```bash
# Из корневой директории
npm run dev
```

#### Вариант B: Запуск сервисов отдельно
```bash
# Терминал 1 - Backend
cd backend
npm run dev

# Терминал 2 - Frontend
cd frontend
npm run dev
```

## 🌐 Доступ к приложению

После запуска всего вы можете получить доступ к:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Проверка здоровья**: http://localhost:3000/health
- **Документация API**: http://localhost:3000/api

## 🔧 Устранение неполадок

### Частые проблемы

#### 1. Ошибка подключения к базе данных
```bash
# Проверка запуска PostgreSQL
sudo systemctl status postgresql  # Linux
brew services list | grep postgresql  # macOS
```

#### 2. Порт уже используется
```bash
# Проверка того, что использует порт
sudo lsof -i :3000
sudo lsof -i :5173

# Убийство процесса или изменение портов в файлах .env
```

#### 3. Проблемы с node_modules
```bash
# Очистка кэша npm и переустановка
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### 4. Проблемы с правами доступа (Linux/macOS)
```bash
# Исправление прав доступа к файлам
sudo chown -R $USER:$USER .
```

### Сброс всего
```bash
# Остановка всех процессов
npm run stop

# Очистка базы данных
sudo -u postgres psql -c "DROP DATABASE IF EXISTS domli_db;"
sudo -u postgres psql -c "CREATE DATABASE domli_db;"

# Переустановка зависимостей
npm run install:all

# Запуск миграций и заполнения
cd backend && npm run migrate && npm run seed

# Свежий старт
npm run dev
```

## 📝 Рабочий процесс разработки

### Внесение изменений
1. Внесите изменения в код
2. Приложение автоматически перезагрузится (благодаря nodemon и Vite)
3. Протестируйте изменения в браузере

### Добавление новых зависимостей
```bash
# Зависимости backend
cd backend && npm install <имя-пакета>

# Зависимости frontend
cd frontend && npm install <имя-пакета>
```

### Изменения в базе данных
```bash
# Создание новой миграции
cd backend
# Отредактируйте папку migrations/

# Запуск миграций
npm run migrate
```

## 🚀 Продакшен развертывание

Для продакшен развертывания вы можете использовать PM2:

```bash
# Сборка приложения
npm run build

# Запуск с PM2
npm run start:prod

# Мониторинг
npm run monit
```

## 📞 Получение помощи

Если вы столкнулись с проблемами:

1. Проверьте раздел устранения неполадок выше
2. Посмотрите на логи консоли в вашем терминале
3. Проверьте консоль разработчика браузера для ошибок frontend
4. Спросите вашего тимлида или создайте issue в репозитории

## 🎉 Вы готовы!

После выполнения этих шагов у вас должна быть полностью функциональная локальная среда разработки для приложения Domli! 