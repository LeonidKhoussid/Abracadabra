# 🐳 Domli Docker Setup

This guide will help you set up and run the Domli application using Docker on any machine.

## 🚀 Quick Start (One Command Setup)

```bash
# Clone the repository
git clone <your-repo-url>
cd domli

# Run the setup script (Linux/Mac)
./scripts/docker-setup.sh

# Or manually run these commands:
docker-compose up -d
```

That's it! Your application will be running at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

## 📋 Prerequisites

- **Docker** (version 20.10+)
- **Docker Compose** (version 2.0+)

### Installing Docker

**Windows/Mac:**
- Download Docker Desktop from [docker.com](https://www.docker.com/products/docker-desktop)

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

## 🛠 Manual Setup

If you prefer to set up manually:

### 1. Environment Setup
```bash
# Backend environment
cp backend/env.example backend/.env
# Edit backend/.env with your settings

# Frontend environment  
cp frontend/env.example frontend/.env
# Edit frontend/.env with your settings
```

### 2. Start Services
```bash
# Build and start all services
docker-compose up -d

# Or start specific services
docker-compose up -d postgres
docker-compose up -d backend
docker-compose up -d frontend
```

### 3. Database Setup
```bash
# Run migrations
docker-compose exec backend npm run migrate

# Seed database (optional)
docker-compose exec backend npm run seed
```

## 🎯 Development vs Production

### Development Mode
```bash
# Start development environment
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Mode
```bash
# Start production environment
docker-compose -f docker-compose.prod.yml up -d

# Or with custom environment file
docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d
```

## 🔧 Useful Commands

### Container Management
```bash
# View running containers
docker-compose ps

# View logs
docker-compose logs -f
docker-compose logs -f backend
docker-compose logs -f frontend

# Restart services
docker-compose restart
docker-compose restart backend

# Stop all services
docker-compose down

# Stop and remove volumes (⚠️ deletes database)
docker-compose down -v
```

### Database Operations
```bash
# Access PostgreSQL
docker-compose exec postgres psql -U postgres -d domli_db

# Run migrations
docker-compose exec backend npm run migrate

# Seed database
docker-compose exec backend npm run seed

# Backup database
docker-compose exec postgres pg_dump -U postgres domli_db > backup.sql
```

### Application Operations
```bash
# Access backend container
docker-compose exec backend sh

# Access frontend container
docker-compose exec frontend sh

# Install new dependencies
docker-compose exec backend npm install <package>
docker-compose exec frontend npm install <package>

# Rebuild containers after dependency changes
docker-compose build backend
docker-compose up -d backend
```

## 🌐 Switching Servers

To move your application to a new server:

### 1. Backup Current Data
```bash
# Backup database
docker-compose exec postgres pg_dump -U postgres domli_db > backup.sql

# Backup environment files
cp backend/.env backend.env.backup
cp frontend/.env frontend.env.backup
```

### 2. Transfer to New Server
```bash
# Copy your project folder to the new server
scp -r ./domli user@new-server:/path/to/destination/

# Or use git
git clone <your-repo-url>
```

### 3. Restore on New Server
```bash
# Copy environment files
cp backend.env.backup backend/.env
cp frontend.env.backup frontend/.env

# Start services
docker-compose up -d

# Restore database
docker-compose exec -T postgres psql -U postgres domli_db < backup.sql
```

## 🔒 Environment Variables

### Backend (.env)
```env
# Database
DB_HOST=postgres
DB_PORT=5432
DB_NAME=domli_db
DB_USER=postgres
DB_PASSWORD=password

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d

# Server
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000/api
VITE_NODE_ENV=development
```

## 🐛 Troubleshooting

### Common Issues

**1. Port Already in Use**
```bash
# Check what's using the port
sudo lsof -i :3000
sudo lsof -i :5173

# Kill the process or change ports in docker-compose.yml
```

**2. Database Connection Issues**
```bash
# Check if PostgreSQL is running
docker-compose ps postgres

# View PostgreSQL logs
docker-compose logs postgres

# Restart PostgreSQL
docker-compose restart postgres
```

**3. Frontend Can't Connect to Backend**
```bash
# Check if backend is running
docker-compose ps backend

# Check backend logs
docker-compose logs backend

# Verify API is responding
curl http://localhost:3000/health
```

**4. Permission Issues**
```bash
# Fix file permissions
sudo chown -R $USER:$USER .

# Fix Docker permissions (Linux)
sudo usermod -aG docker $USER
# Then log out and back in
```

### Reset Everything
```bash
# Stop and remove everything
docker-compose down -v

# Remove all images
docker system prune -a

# Start fresh
./scripts/docker-setup.sh
```

## 📊 Monitoring

### Health Checks
```bash
# Check application health
curl http://localhost:3000/health

# Check container health
docker-compose ps
```

### Resource Usage
```bash
# View resource usage
docker stats

# View disk usage
docker system df
```

## 🔄 Updates

### Update Application
```bash
# Pull latest changes
git pull

# Rebuild and restart
docker-compose down
docker-compose build
docker-compose up -d

# Run migrations if needed
docker-compose exec backend npm run migrate
```

### Update Dependencies
```bash
# Update backend dependencies
docker-compose exec backend npm update

# Update frontend dependencies
docker-compose exec frontend npm update

# Rebuild containers
docker-compose build
docker-compose up -d
```

## 📞 Support

If you encounter issues:

1. Check the logs: `docker-compose logs -f`
2. Verify environment variables are set correctly
3. Ensure Docker and Docker Compose are up to date
4. Check the troubleshooting section above

For team support, create an issue in your repository with:
- Your operating system
- Docker version
- Error messages from logs
- Steps to reproduce the issue

---

**Happy coding! 🚀** 