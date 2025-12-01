# ByteNodes API Integration Guide

This document outlines how to connect the ByteNodes frontend to your PHP/MySQL backend on your VPS.

## Overview

The frontend is built with React and is ready to be deployed to your VPS. All backend connections are marked with `// TODO:` comments in the code, making it easy to find where you need to add your API endpoints.

## Pages with Backend Integration

### 1. Blog Page (`src/pages/Blog.tsx`)

**Endpoints needed:**
- `GET /api/blog/posts` - Fetch all blog posts

**Response format:**
```json
[
  {
    "id": 1,
    "title": "Post title",
    "excerpt": "Short description",
    "content": "Full content",
    "author": "Author name",
    "date": "2025-01-15",
    "category": "Tutorial",
    "image": "https://..."
  }
]
```

**Where to update:** Line 22-27 in `src/pages/Blog.tsx`

---

### 2. Tickets Page (`src/pages/Tickets.tsx`)

**Endpoints needed:**

#### Get all tickets
- `GET /api/tickets`
- Headers: `Authorization: Bearer YOUR_TOKEN`

**Response format:**
```json
[
  {
    "id": 1,
    "subject": "Subject",
    "message": "Message",
    "status": "open",
    "priority": "high",
    "created_at": "2025-01-20T10:30:00Z",
    "updated_at": "2025-01-20T10:30:00Z",
    "replies": []
  }
]
```

**Where to update:** Line 36-44 in `src/pages/Tickets.tsx`

#### Create new ticket
- `POST /api/tickets`
- Headers: `Authorization: Bearer YOUR_TOKEN`
- Body:
```json
{
  "subject": "string",
  "message": "string",
  "priority": "low|medium|high"
}
```

**Where to update:** Line 59-71 in `src/pages/Tickets.tsx`

#### Get ticket replies
- `GET /api/tickets/{id}/replies`
- Headers: `Authorization: Bearer YOUR_TOKEN`

**Response format:**
```json
[
  {
    "id": 1,
    "ticket_id": 1,
    "message": "Reply message",
    "is_admin": false,
    "created_at": "2025-01-20T11:00:00Z"
  }
]
```

#### Add reply to ticket
- `POST /api/tickets/{id}/replies`
- Headers: `Authorization: Bearer YOUR_TOKEN`
- Body:
```json
{
  "message": "string"
}
```

---

### 3. Authentication

**Login endpoint:**
- `POST /api/auth/login`
- Body:
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "token": "JWT_TOKEN",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

**Register endpoint:**
- `POST /api/auth/register`
- Body:
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

---

### 4. Payment Integration (Stripe)

For Stripe integration, you'll need to:

1. Install Stripe PHP SDK on your backend
2. Create payment intent endpoint
3. Handle webhook events

**Create payment intent:**
- `POST /api/payments/create-intent`
- Headers: `Authorization: Bearer YOUR_TOKEN`
- Body:
```json
{
  "amount": 100000,
  "currency": "idr",
  "product_id": 1
}
```

**Response:**
```json
{
  "client_secret": "pi_xxx_secret_xxx"
}
```

---

## Database Schema Suggestions

### tickets table
```sql
CREATE TABLE tickets (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status ENUM('open', 'in-progress', 'closed') DEFAULT 'open',
  priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### ticket_replies table
```sql
CREATE TABLE ticket_replies (
  id INT PRIMARY KEY AUTO_INCREMENT,
  ticket_id INT NOT NULL,
  user_id INT,
  admin_id INT,
  message TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (ticket_id) REFERENCES tickets(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### blog_posts table
```sql
CREATE TABLE blog_posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  author VARCHAR(100),
  category VARCHAR(50),
  image_url VARCHAR(500),
  published_at DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### users table
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## Environment Variables

On your VPS, create a `.env` file with:

```
DB_HOST=localhost
DB_NAME=bytenodes
DB_USER=your_db_user
DB_PASS=your_db_password

JWT_SECRET=your_jwt_secret_key

STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Frontend URL (for CORS)
FRONTEND_URL=https://bytenodes.id
```

---

## CORS Configuration

Make sure your PHP backend allows requests from your frontend domain:

```php
<?php
header('Access-Control-Allow-Origin: https://bytenodes.id');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
```

---

## Deployment Steps

1. **Build the React app:**
   ```bash
   npm run build
   ```

2. **Upload the `dist` folder to your VPS**

3. **Configure Nginx/Apache to serve the React app**

4. **Set up your PHP backend API**

5. **Update all `TODO` comments in the code with your actual API endpoints**

6. **Test all functionality**

---

## Security Checklist

- [ ] Use HTTPS for all API requests
- [ ] Implement JWT token authentication
- [ ] Validate all user inputs on backend
- [ ] Sanitize database queries (use prepared statements)
- [ ] Rate limit API endpoints
- [ ] Set up CORS properly
- [ ] Hash passwords with bcrypt
- [ ] Keep Stripe secret keys secure (never expose in frontend)
- [ ] Implement CSRF protection
- [ ] Set up database backups

---

## Support

If you need help integrating the backend, check the TODO comments in:
- `src/pages/Blog.tsx`
- `src/pages/Tickets.tsx`
- `src/pages/client/Login.tsx`
- `src/pages/client/Register.tsx`
- `src/pages/client/Dashboard.tsx`

Each file has clear markers showing where to add your API endpoints.
