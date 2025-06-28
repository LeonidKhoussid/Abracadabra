# Domli - Платформа недвижимости

## Быстрая установка через Docker

### 🚀 Для друзей и команды

Если вы хотите запустить приложение локально, выполните следующие шаги:

#### 1. Убедитесь, что у вас установлен Docker
```bash
docker --version
docker-compose --version
```

Если Docker не установлен, скачайте его с [официального сайта](https://docs.docker.com/get-docker/)

#### 2. Запустите приложение
```bash
# Дайте права на выполнение скрипту
chmod +x scripts/docker-setup.sh

# Запустите автоматическую установку
./scripts/docker-setup.sh
```

#### 3. Откройте приложение
После успешной установки откройте браузер и перейдите по адресу:
**http://localhost:5173**

### 📋 Что включено
- ✅ Frontend (React + Vite)
- ✅ Backend (Node.js + Express)
- ✅ База данных (PostgreSQL)
- ✅ Автоматическая настройка
- ✅ Миграции базы данных

### 🛠️ Управление приложением

```bash
# Остановить приложение
docker-compose down

# Перезапустить
docker-compose restart

# Посмотреть логи
docker-compose logs -f

# Проверить статус
docker-compose ps
```

### 🔧 Возможные проблемы

**Порт занят?** Измените порты в `docker-compose.yml`

**Ошибка прав доступа?** 
```bash
sudo chmod +x scripts/docker-setup.sh
```

**Docker не запущен?**
```bash
sudo systemctl start docker
```

### 📞 Поддержка
Если у вас возникли проблемы, обратитесь к администратору проекта.

---

**Приятного использования! 🏠** 