# ByteNodes PHP/MySQL Backend API Documentation

This document provides complete API specifications for integrating the React frontend with your PHP/MySQL backend.

## Base URL
```
https://your-vps-domain.com/api
```

## Authentication
All authenticated endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer {token}
```

---

## 1. Authentication Endpoints

### POST /auth/register
Register a new user account. After successful registration, user is redirected to login page.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201 Created):**
```json
{
  "message": "Registration successful",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "balance": 0
  }
}
```

**Errors:**
- 400: Email already exists
- 422: Validation errors

---

### POST /auth/login
Authenticate user and return JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "balance": 150.00
  }
}
```

**Errors:**
- 401: Invalid credentials
- 422: Validation errors

---

### GET /auth/me
Get current authenticated user details.

**Headers:** `Authorization: Bearer {token}`

**Response (200 OK):**
```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "balance": 150.00
  }
}
```

**Errors:**
- 401: Unauthorized

---

## 2. Services/Servers Endpoints

### GET /products
Get all available server products (public endpoint).

**Response (200 OK):**
```json
{
  "products": [
    {
      "id": 1,
      "name": "VPS Starter",
      "type": "VPS KVM",
      "description": "Perfect for small projects",
      "specs": {
        "cpu": "2 vCPU",
        "ram": "4GB",
        "storage": "80GB SSD",
        "bandwidth": "1TB"
      },
      "pricing": {
        "monthly": 9.99,
        "quarterly": 28.47,
        "semi_annually": 53.94,
        "annually": 101.89
      }
    }
  ]
}
```

---

### GET /services
Get user's active services/servers.

**Headers:** `Authorization: Bearer {token}`

**Response (200 OK):**
```json
{
  "services": [
    {
      "id": 1,
      "name": "VPS Server - US East",
      "type": "VPS KVM",
      "status": "active",
      "ip": "192.168.1.100",
      "expires": "2024-12-31",
      "product_id": 1
    }
  ]
}
```

---

### POST /orders
Create a new server order.

**Headers:** `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "product_id": 1,
  "billing_cycle": "monthly"
}
```

**Response (201 Created):**
```json
{
  "order_id": 123,
  "amount": 9.99,
  "status": "pending",
  "message": "Order created successfully"
}
```

---

## 3. Payment Endpoints

### POST /payments/create-intent
Create a Stripe payment intent for order or balance top-up.

**Headers:** `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "amount": 50.00,
  "order_id": 123
}
```

**Response (200 OK):**
```json
{
  "client_secret": "pi_xxx_secret_xxx",
  "checkout_url": "https://checkout.stripe.com/xxx",
  "payment_intent_id": "pi_xxx"
}
```

---

### GET /invoices
Get user's invoices.

**Headers:** `Authorization: Bearer {token}`

**Response (200 OK):**
```json
{
  "invoices": [
    {
      "id": 1,
      "service": "VPS Server",
      "amount": "9.99",
      "status": "paid",
      "date": "2025-01-01",
      "due_date": "2025-01-15"
    }
  ]
}
```

---

## 4. Tickets Endpoints

### GET /tickets
Get user's support tickets.

**Headers:** `Authorization: Bearer {token}`

**Response (200 OK):**
```json
{
  "tickets": [
    {
      "id": 1,
      "subject": "Server issue",
      "status": "open",
      "priority": "high",
      "created_at": "2025-01-15 10:30:00",
      "last_reply": "2025-01-15 11:00:00"
    }
  ]
}
```

---

### POST /tickets
Create a new support ticket.

**Headers:** `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "subject": "Server not responding",
  "priority": "high",
  "message": "My server at 192.168.1.100 is not responding..."
}
```

**Response (201 Created):**
```json
{
  "ticket_id": 1,
  "message": "Ticket created successfully"
}
```

---

### GET /tickets/{id}/replies
Get all replies for a specific ticket.

**Headers:** `Authorization: Bearer {token}`

**Response (200 OK):**
```json
{
  "replies": [
    {
      "id": 1,
      "ticket_id": 1,
      "message": "We're looking into this issue...",
      "author": "Support Team",
      "created_at": "2025-01-15 11:00:00"
    }
  ]
}
```

---

### POST /tickets/{id}/replies
Reply to a ticket.

**Headers:** `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "message": "Thank you for the update..."
}
```

**Response (201 Created):**
```json
{
  "reply_id": 2,
  "message": "Reply added successfully"
}
```

---

## 5. Blog Endpoints

### GET /blog/posts
Get all published blog posts (public endpoint).

**Query Parameters:**
- `category` (optional): Filter by category
- `limit` (optional): Number of posts per page (default: 10)
- `page` (optional): Page number (default: 1)

**Response (200 OK):**
```json
{
  "posts": [
    {
      "id": 1,
      "title": "Getting Started with VPS",
      "slug": "getting-started-with-vps",
      "excerpt": "Learn how to set up your first VPS...",
      "category": "Tutorial",
      "author": "Admin",
      "created_at": "2025-01-15",
      "image_url": "https://your-vps-domain.com/uploads/blog/image.jpg"
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 5,
    "total_posts": 48
  }
}
```

---

### GET /blog/posts/{id}
Get a single blog post by ID.

**Response (200 OK):**
```json
{
  "post": {
    "id": 1,
    "title": "Getting Started with VPS",
    "slug": "getting-started-with-vps",
    "content": "<p>Full HTML content...</p>",
    "category": "Tutorial",
    "author": "Admin",
    "created_at": "2025-01-15",
    "updated_at": "2025-01-16",
    "image_url": "https://your-vps-domain.com/uploads/blog/image.jpg"
  }
}
```

---

## 6. Admin Endpoints

All admin endpoints require `role: admin` in JWT token.

### GET /admin/tickets
Get all support tickets (admin only).

**Headers:** `Authorization: Bearer {token}`

**Response (200 OK):**
```json
{
  "tickets": [
    {
      "id": 1,
      "subject": "Server issue",
      "status": "open",
      "priority": "high",
      "customer": "John Doe",
      "customer_email": "john@example.com",
      "created": "2025-01-15"
    }
  ]
}
```

---

### GET /admin/orders
Get all customer orders (admin only).

**Headers:** `Authorization: Bearer {token}`

**Response (200 OK):**
```json
{
  "orders": [
    {
      "id": 1,
      "customer": "John Doe",
      "product": "VPS KVM",
      "amount": "$29.99",
      "status": "paid",
      "date": "2025-01-15"
    }
  ]
}
```

---

### POST /admin/blog/posts
Create a new blog post (admin only).

**Headers:** `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "title": "New Tutorial",
  "category": "Tutorial",
  "content": "<p>HTML content...</p>",
  "status": "published"
}
```

**Response (201 Created):**
```json
{
  "post_id": 5,
  "message": "Blog post created successfully"
}
```

---

### PUT /admin/blog/posts/{id}
Update a blog post (admin only).

**Headers:** `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "title": "Updated Title",
  "content": "<p>Updated content...</p>",
  "status": "published"
}
```

**Response (200 OK):**
```json
{
  "message": "Blog post updated successfully"
}
```

---

### DELETE /admin/blog/posts/{id}
Delete a blog post (admin only).

**Headers:** `Authorization: Bearer {token}`

**Response (200 OK):**
```json
{
  "message": "Blog post deleted successfully"
}
```

---

## Database Schema Suggestions

### users table
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  balance DECIMAL(10, 2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### products table
```sql
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL,
  description TEXT,
  specs JSON,
  pricing JSON,
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### services table
```sql
CREATE TABLE services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  name VARCHAR(255),
  status ENUM('active', 'suspended', 'cancelled') DEFAULT 'active',
  ip VARCHAR(45),
  expires_at DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
```

### orders table
```sql
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  billing_cycle VARCHAR(50),
  status ENUM('pending', 'paid', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
```

### tickets table
```sql
CREATE TABLE tickets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  subject VARCHAR(255) NOT NULL,
  status ENUM('open', 'pending', 'closed') DEFAULT 'open',
  priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### ticket_replies table
```sql
CREATE TABLE ticket_replies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ticket_id INT NOT NULL,
  user_id INT,
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
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category VARCHAR(100),
  author_id INT,
  image_url VARCHAR(500),
  status ENUM('draft', 'published') DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id)
);
```

### invoices table
```sql
CREATE TABLE invoices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  service_id INT,
  amount DECIMAL(10, 2) NOT NULL,
  status ENUM('unpaid', 'paid', 'cancelled') DEFAULT 'unpaid',
  due_date DATE NOT NULL,
  paid_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (service_id) REFERENCES services(id)
);
```

---

## Environment Variables

Your PHP backend should use these environment variables:

```env
DB_HOST=localhost
DB_NAME=bytenodes
DB_USER=root
DB_PASSWORD=your_password

JWT_SECRET=your_secret_key_here
JWT_EXPIRY=86400

STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxx

FRONTEND_URL=https://bytenodes.com
```

---

## CORS Configuration

Your PHP backend must include CORS headers:

```php
header('Access-Control-Allow-Origin: https://bytenodes.com');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
```

---

## Security Checklist

- ✅ Hash passwords using `password_hash()` with `PASSWORD_BCRYPT`
- ✅ Validate and sanitize all inputs
- ✅ Use prepared statements to prevent SQL injection
- ✅ Implement rate limiting on authentication endpoints
- ✅ Use HTTPS only in production
- ✅ Store JWT secret securely
- ✅ Validate JWT tokens on protected routes
- ✅ Check user roles for admin endpoints
- ✅ Implement CSRF protection
- ✅ Set secure session cookies

---

## Integration Notes

1. Replace `https://your-vps-domain.com/api` in:
   - `src/lib/api.ts` (line 4)
   - `src/contexts/AuthContext.tsx` (line 23)

2. Test all endpoints with Postman before connecting frontend

3. Make sure to create at least one admin user in your database for testing admin panel

4. Stripe integration requires webhook endpoint at `/webhooks/stripe` to handle payment confirmations

5. After successful signup, user is automatically redirected to `/client/login`

6. After successful login, user is redirected based on role:
   - Admin → `/admin`
   - User → `/client/dashboard`
