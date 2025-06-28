# 🐳 Настройка Domli с Docker

Это руководство поможет вам настроить и запустить приложение Domli с помощью Docker на любой машине.

## 🚀 Быстрый старт (Настройка одной командой)

```bash
# Клонирование репозитория
git clone <url-вашего-репозитория>
cd domli

# Запуск скрипта настройки (Linux/Mac)
./scripts/docker-setup.sh

# Или выполните эти команды вручную:
docker-compose up -d
```

Вот и все! Ваше приложение будет работать по адресам:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

## 📋 Требования

- **Docker** (версия 20.10+)
- **Docker Compose** (версия 2.0+)

### Установка Docker

**Windows/Mac:**
- Скачайте Docker Desktop с [docker.com](https://www.docker.com/products/docker-desktop)

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

**Linux (CentOS/RHEL):**
```bash
sudo yum install -y docker
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
```

## 🛠 Ручная настройка

Если вы предпочитаете настраивать вручную:

### 1. Настройка окружения
```bash
# Окружение backend
cp backend/env.example backend/.env
# Отредактируйте backend/.env с вашими настройками

# Окружение frontend
cp frontend/env.example frontend/.env
# Отредактируйте frontend/.env с вашими настройками
```

### 2. Запуск сервисов
```bash
# Сборка и запуск всех сервисов
docker-compose up -d

# Или запуск конкретных сервисов
docker-compose up -d postgres
docker-compose up -d backend
docker-compose up -d frontend
```

### 3. Настройка базы данных
```bash
# Запуск миграций
docker-compose exec backend npm run migrate

# Заполнение базы данных (опционально)
docker-compose exec backend npm run seed
```

## 🎯 Режим разработки vs продакшен

### Режим разработки
```bash
# Запуск среды разработки
docker-compose up -d

# Просмотр логов
docker-compose logs -f

# Остановка сервисов
docker-compose down
```

### Продакшен режим
```bash
# Запуск продакшен среды
docker-compose -f docker-compose.prod.yml up -d

# Или с пользовательским файлом окружения
docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d
```

## 🔧 Полезные команды

### Управление контейнерами
```bash
# Просмотр запущенных контейнеров
docker-compose ps

# Просмотр логов
docker-compose logs -f
docker-compose logs -f backend
docker-compose logs -f frontend

# Перезапуск сервисов
docker-compose restart
docker-compose restart backend

# Остановка всех сервисов
docker-compose down

# Остановка и удаление томов (⚠️ удаляет базу данных)
docker-compose down -v
```

### Операции с базой данных
```bash
# Доступ к PostgreSQL
docker-compose exec postgres psql -U postgres -d domli_db

# Запуск миграций
docker-compose exec backend npm run migrate

# Заполнение базы данных
docker-compose exec backend npm run seed

# Резервное копирование базы данных
docker-compose exec postgres pg_dump -U postgres domli_db > backup.sql
```

### Операции с приложением
```bash
# Доступ к контейнеру backend
docker-compose exec backend sh

# Доступ к контейнеру frontend
docker-compose exec frontend sh

# Установка новых зависимостей
docker-compose exec backend npm install <пакет>
docker-compose exec frontend npm install <пакет>

# Пересборка контейнеров после изменения зависимостей
docker-compose build backend
docker-compose up -d backend
```

## 🌐 Переход на новые серверы

Для переноса вашего приложения на новый сервер:

### 1. Резервное копирование текущих данных
```bash
# Резервное копирование базы данных
docker-compose exec postgres pg_dump -U postgres domli_db > backup.sql

# Резервное копирование файлов окружения
cp backend/.env backend.env.backup
cp frontend/.env frontend.env.backup
```

### 2. Перенос на новый сервер
```bash
# Копирование папки проекта на новый сервер
scp -r ./domli пользователь@новый-сервер:/путь/к/назначению/

# Или использование git
git clone <url-вашего-репозитория>
```

### 3. Восстановление на новом сервере
```bash
# Копирование файлов окружения
cp backend.env.backup backend/.env
cp frontend.env.backup frontend/.env

# Запуск сервисов
docker-compose up -d

# Восстановление базы данных
docker-compose exec -T postgres psql -U postgres domli_db < backup.sql
```

## 🔒 Переменные окружения

### Backend (.env)
```env
# База данных
DB_HOST=postgres
DB_PORT=5432
DB_NAME=domli_db
DB_USER=postgres
DB_PASSWORD=password

# JWT
JWT_SECRET=ваш_супер_секретный_jwt_ключ_измените_это_в_продакшене
JWT_EXPIRES_IN=7d

# Сервер
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000/api
VITE_NODE_ENV=development
```

## 🐛 Устранение неполадок

### Частые проблемы

**1. Порт уже используется**
```bash
# Проверка того, что использует порт
sudo lsof -i :3000
sudo lsof -i :5173

# Убийство процесса или изменение портов в docker-compose.yml
```

**2. Проблемы подключения к базе данных**
```bash
# Проверка запуска PostgreSQL
docker-compose ps postgres

# Просмотр логов PostgreSQL
docker-compose logs postgres

# Перезапуск PostgreSQL
docker-compose restart postgres
```

**3. Frontend не может подключиться к backend**
```bash
# Проверка запуска backend
docker-compose ps backend

# Проверка логов backend
docker-compose logs backend

# Проверка ответа API
curl http://localhost:3000/health
```

**4. Проблемы с правами доступа**
```bash
# Исправление прав доступа к файлам
sudo chown -R $USER:$USER .

# Исправление прав доступа Docker (Linux)
sudo usermod -aG docker $USER
# Затем выйдите и войдите снова
```

### Сброс всего
```bash
# Остановка и удаление всего
docker-compose down -v

# Удаление всех образов
docker system prune -a

# Свежий старт
./scripts/docker-setup.sh
```

## 📊 Мониторинг

### Проверки здоровья
```bash
# Проверка здоровья приложения
curl http://localhost:3000/health

# Проверка здоровья контейнеров
docker-compose ps
```

### Использование ресурсов
```bash
# Просмотр использования ресурсов
docker stats

# Просмотр использования диска
docker system df
```

## 🔄 Обновления

### Обновление приложения
```bash
# Получение последних изменений
git pull

# Пересборка и перезапуск
docker-compose down
docker-compose build
docker-compose up -d

# Запуск миграций при необходимости
docker-compose exec backend npm run migrate
```

### Обновление зависимостей
```bash
# Обновление зависимостей backend
docker-compose exec backend npm update

# Обновление зависимостей frontend
docker-compose exec frontend npm update

# Пересборка контейнеров
docker-compose build
docker-compose up -d
```

## 📞 Поддержка

Если вы столкнулись с проблемами:

1. Проверьте логи: `docker-compose logs -f`
2. Убедитесь, что переменные окружения установлены правильно
3. Убедитесь, что Docker и Docker Compose обновлены
4. Проверьте раздел устранения неполадок выше

Для поддержки команды создайте issue в вашем репозитории с:
- Вашей операционной системой
- Версией Docker
- Сообщениями об ошибках из логов
- Шагами для воспроизведения проблемы

---

**Удачного кодирования! 🚀** 