# Domli Real Estate Platform

A modern real estate platform built with React frontend and Express.js backend.

## 🚀 Features

- User registration and authentication
- Property search and filtering
- User preferences management
- Responsive design
- Real-time updates

## 🛠 Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router DOM

### Backend
- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- bcryptjs for password hashing

### Process Management
- PM2 for production process management

## 📋 Prerequisites

- Node.js >= 18.0.0
- npm >= 8.0.0
- PostgreSQL >= 12.0
- PM2 (for production)

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone <repository-url>
cd domli
```

### 2. Install dependencies
```bash
npm run install:all
```

### 3. Environment Setup

#### Backend Environment
Copy the example environment file and configure it:
```bash
cd backend
cp env.example .env
```

Edit `.env` with your database and JWT configuration:
```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=domli_db
DB_USER=your_username
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# Server
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

#### Frontend Environment
```bash
cd frontend
cp env.example .env
```

Edit `.env`:
```env
VITE_API_URL=http://localhost:3000/api
VITE_NODE_ENV=development
```

### 4. Database Setup
```bash
cd backend
npm run migrate
npm run seed
```

### 5. Development Mode
```bash
# Start both frontend and backend in development mode
npm run dev
```

Or start them separately:
```bash
# Backend only
cd backend && npm run dev

# Frontend only
cd frontend && npm run dev
```

## 🏭 Production Deployment

### 1. Build the application
```bash
npm run build
```

### 2. Start with PM2
```bash
# Development mode
npm run start

# Production mode
npm run start:prod
```

### 3. PM2 Management Commands
```bash
# View status
npm run status

# View logs
npm run logs

# Monitor processes
npm run monit

# Restart applications
npm run restart

# Stop applications
npm run stop

# Delete applications
npm run delete
```

## 📁 Project Structure

```
domli/
├── backend/                 # Express.js backend
│   ├── config/             # Database and app configuration
│   ├── middleware/         # Custom middleware
│   ├── migrations/         # Database migrations
│   ├── routes/             # API routes
│   ├── seeds/              # Database seed data
│   └── server.js           # Main server file
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # React context providers
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── App.jsx         # Main app component
│   └── package.json
├── ecosystem.config.js     # PM2 configuration
├── package.json            # Root package.json
└── README.md
```

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

- **Registration**: Users can register with email, password, and personal information
- **Login**: Users can login with email and password
- **Protected Routes**: Certain routes require authentication
- **Token Storage**: Tokens are stored in localStorage

## 🗄 Database Schema

### Users Table
- id (Primary Key)
- first_name
- last_name
- email (Unique)
- phone
- password_hash
- is_active
- created_at
- last_login

### User Preferences Table
- id (Primary Key)
- user_id (Foreign Key)
- property_type
- rooms
- area
- budget
- move_in_date
- living_with
- created_at

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Users
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/preferences` - Update user preferences

### Properties
- `GET /api/properties` - Get properties with filters
- `GET /api/properties/:id` - Get property by ID

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check if PostgreSQL is running
   - Verify database credentials in `.env`
   - Ensure database exists

2. **CORS Error**
   - Check `FRONTEND_URL` in backend `.env`
   - Verify frontend is running on the correct port

3. **PM2 Issues**
   - Check PM2 logs: `npm run logs`
   - Restart applications: `npm run restart`

### Logs
- Backend logs: `cd backend && npm run logs`
- Frontend logs: Check browser console
- PM2 logs: `npm run logs`

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support, email support@domli.com or create an issue in the repository. 