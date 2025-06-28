# Domli Backend API

Backend API for the Domli real estate platform built with Node.js, Express, and PostgreSQL.

## 🚀 Features

- **User Authentication**: Registration, login, and JWT token management
- **User Management**: Profile updates and preference management
- **Property Management**: Real estate listings with search and filtering
- **Personalized Recommendations**: Based on user preferences
- **Database Migrations**: Automated schema management
- **Security**: Rate limiting, input validation, and secure password hashing
- **API Documentation**: Comprehensive endpoint documentation

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd domli-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   NODE_ENV=development
   PORT=3000
   FRONTEND_URL=http://localhost:5173
   
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=domli_db
   DB_USER=postgres
   DB_PASSWORD=your-password
   
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRES_IN=7d
   ```

4. **Set up PostgreSQL database**
   ```bash
   # Create database
   createdb domli_db
   
   # Or using psql
   psql -U postgres
   CREATE DATABASE domli_db;
   \q
   ```

5. **Run database migrations**
   ```bash
   npm run migrate
   ```

6. **Seed the database (optional)**
   ```bash
   npm run seed
   ```

7. **Start the development server**
   ```bash
   npm run dev
   ```

## 📚 API Endpoints

### Authentication

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "Иван",
  "lastName": "Иванов",
  "email": "ivan@example.com",
  "phone": "+7 (999) 123-45-67",
  "password": "password123",
  "propertyType": "apartment",
  "rooms": "2",
  "budget": "6–9 млн ₽",
  "moveInDate": "В этом году",
  "livingWith": "С партнёром"
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "ivan@example.com",
  "password": "password123"
}
```

#### Get Current User
```
GET /api/auth/me
Authorization: Bearer <token>
```

#### Logout User
```
POST /api/auth/logout
Authorization: Bearer <token>
```

### User Management

#### Get User Profile
```
GET /api/users/profile
Authorization: Bearer <token>
```

#### Update User Profile
```
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "Иван",
  "lastName": "Петров",
  "phone": "+7 (999) 987-65-43"
}
```

#### Update User Preferences
```
PUT /api/users/preferences
Authorization: Bearer <token>
Content-Type: application/json

{
  "propertyType": "penthouse",
  "rooms": "3",
  "budget": "12–16 млн ₽",
  "moveInDate": "В 2026-2027 году",
  "livingWith": "С семьёй с детьми"
}
```

### Properties

#### Get Properties (with filters)
```
GET /api/properties?page=1&limit=10&propertyType=apartment&city=Краснодар
```

#### Get Property by ID
```
GET /api/properties/1
```

#### Get Personalized Recommendations
```
GET /api/properties/search/recommendations
Authorization: Bearer <token>
```

#### Get Filter Options
```
GET /api/properties/filters/options
```

### Health Check
```
GET /health
```

## 🗄️ Database Schema

### Users Table
- `id` - Primary key
- `first_name` - User's first name
- `last_name` - User's last name
- `email` - Unique email address
- `phone` - Phone number
- `password_hash` - Hashed password
- `is_active` - Account status
- `created_at` - Account creation date
- `updated_at` - Last update date
- `last_login` - Last login timestamp

### User Preferences Table
- `id` - Primary key
- `user_id` - Foreign key to users
- `property_type` - Type of property (apartment, penthouse, commercial)
- `rooms` - Number of rooms
- `area` - Area requirements
- `budget` - Budget range
- `move_in_date` - Preferred move-in date
- `living_with` - Living situation
- `created_at` - Creation date
- `updated_at` - Last update date

### Properties Table
- `id` - Primary key
- `name` - Property name
- `description` - Property description
- `property_type` - Type of property
- `rooms` - Number of rooms
- `area` - Area in square meters
- `price` - Price in rubles
- `city` - City location
- `address` - Full address
- `developer` - Developer company
- `completion_date` - Expected completion date
- `status` - Property status
- `images` - Array of image URLs
- `amenities` - Array of amenities
- `created_at` - Listing creation date
- `updated_at` - Last update date

## 🔧 Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run migrate` - Run database migrations
- `npm run seed` - Seed database with sample data
- `npm test` - Run tests

## 🔒 Security Features

- **Password Hashing**: Using bcrypt with 12 rounds
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Comprehensive validation using express-validator
- **Rate Limiting**: Protection against brute force attacks
- **CORS Protection**: Configured for frontend domain
- **Helmet**: Security headers
- **SQL Injection Protection**: Using parameterized queries

## 🚀 Deployment

### Production Setup

1. **Set environment variables for production**
   ```env
   NODE_ENV=production
   PORT=3000
   DB_HOST=your-production-db-host
   DB_NAME=domli_db
   DB_USER=your-db-user
   DB_PASSWORD=your-secure-password
   JWT_SECRET=your-very-secure-jwt-secret
   ```

2. **Install dependencies**
   ```bash
   npm install --production
   ```

3. **Run migrations**
   ```bash
   npm run migrate
   ```

4. **Start the server**
   ```bash
   npm start
   ```

### Using PM2

```bash
npm install -g pm2
pm2 start server.js --name "domli-backend"
pm2 save
pm2 startup
```

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `3000` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:5173` |
| `DB_HOST` | Database host | `localhost` |
| `DB_PORT` | Database port | `5432` |
| `DB_NAME` | Database name | `domli_db` |
| `DB_USER` | Database user | `postgres` |
| `DB_PASSWORD` | Database password | `password` |
| `JWT_SECRET` | JWT secret key | `your-secret-key` |
| `JWT_EXPIRES_IN` | JWT expiration time | `7d` |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@domli.com or create an issue in the repository. 