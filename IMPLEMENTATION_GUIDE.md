# ByteNodes Frontend Implementation Guide

## Overview
Your React frontend is now fully configured to integrate with a PHP/MySQL backend. After successful registration, users are automatically redirected to the login page.

## What's Been Implemented

### 1. Authentication System ✅
- **AuthContext** (`src/contexts/AuthContext.tsx`)
  - Manages user authentication state
  - Handles login, register, logout
  - Auto-redirects based on user role (admin/user)
  - Stores JWT token in localStorage
  - Auto-redirects to login after successful signup

- **Login Page** (`src/pages/client/Login.tsx`)
  - Email/password authentication
  - Calls PHP backend `/api/auth/login`
  - Redirects admin to `/admin`, users to `/client/dashboard`
  - Auto-redirects if already logged in

- **Register Page** (`src/pages/client/Register.tsx`)
  - User registration with name, email, password
  - Password confirmation validation
  - Calls PHP backend `/api/auth/register`
  - **Auto-redirects to login page after successful signup**

### 2. Protected Routes ✅
- **ProtectedRoute Component** (`src/components/ProtectedRoute.tsx`)
  - Prevents unauthorized access
  - Redirects non-authenticated users to login
  - Supports admin-only routes with `requireAdmin` prop

### 3. User Dashboard ✅
- Active services display
- Statistics cards
- Quick actions (tickets, invoices, add funds)
- Link to order new servers
- Protected by authentication

### 4. Admin Dashboard ✅
- Ticket management (view all, create, reply)
- Blog post management (create, edit, delete)
- Order management (view all orders)
- Admin-only access with role check

### 5. Server Ordering ✅
- **OrderServer Page** (`src/pages/client/OrderServer.tsx`)
  - Browse available server products
  - Select billing cycle (monthly, quarterly, semi-annually, annually)
  - Create order and redirect to Stripe checkout
  - Protected route (login required)

### 6. API Service Layer ✅
- **API Module** (`src/lib/api.ts`)
  - Centralized API calls
  - Automatic JWT token handling
  - Error handling
  - Functions for:
    - Authentication (login, register, getMe)
    - Services (getUserServices, getAvailableProducts, createOrder)
    - Tickets (getTickets, createTicket, getTicketReplies, replyToTicket)
    - Payments (createPaymentIntent, getInvoices)
    - Blog (getPosts, getPost)
    - Admin (getAllTickets, getAllOrders, blog management)

### 7. Navigation ✅
- **Updated Navbar** (`src/components/Navbar.tsx`)
  - Shows user name when logged in
  - Logout button
  - Different links for admin/user
  - Responsive mobile menu

## Next Steps for Backend Implementation

### 1. Set Up Your PHP Backend

Replace the API URL in these files:
- `src/lib/api.ts` (line 4)
- `src/contexts/AuthContext.tsx` (line 23)

Change `https://your-vps-domain.com/api` to your actual VPS domain.

### 2. Database Setup

Run the SQL commands from `API_DOCUMENTATION.md` to create:
- users
- products
- services
- orders
- tickets
- ticket_replies
- blog_posts
- invoices

### 3. Implement PHP Endpoints

Refer to `API_DOCUMENTATION.md` for complete specifications of all required endpoints:

**Authentication Endpoints:**
- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login
- GET `/api/auth/me` - Get current user

**User Endpoints:**
- GET `/api/products` - List server products
- GET `/api/services` - User's active services
- POST `/api/orders` - Create new order
- GET `/api/tickets` - User's tickets
- POST `/api/tickets` - Create ticket
- GET `/api/invoices` - User's invoices

**Payment Endpoints:**
- POST `/api/payments/create-intent` - Stripe payment

**Blog Endpoints:**
- GET `/api/blog/posts` - All blog posts
- GET `/api/blog/posts/{id}` - Single post

**Admin Endpoints:**
- GET `/api/admin/tickets` - All tickets
- GET `/api/admin/orders` - All orders
- POST `/api/admin/blog/posts` - Create post
- PUT `/api/admin/blog/posts/{id}` - Update post
- DELETE `/api/admin/blog/posts/{id}` - Delete post

### 4. JWT Authentication

Your PHP backend must:
1. Generate JWT tokens on successful login
2. Include user data (id, name, email, role, balance) in response
3. Validate JWT tokens on protected endpoints
4. Check `Authorization: Bearer {token}` header

Example PHP JWT validation:
```php
<?php
require_once 'vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function validateToken() {
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? '';
    
    if (!preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
        http_response_code(401);
        echo json_encode(['message' => 'No token provided']);
        exit;
    }
    
    $token = $matches[1];
    
    try {
        $decoded = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));
        return $decoded;
    } catch (Exception $e) {
        http_response_code(401);
        echo json_encode(['message' => 'Invalid token']);
        exit;
    }
}
?>
```

### 5. CORS Configuration

Add to your PHP backend:
```php
<?php
header('Access-Control-Allow-Origin: https://bytenodes.com');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
?>
```

### 6. Create Admin User

Manually insert an admin user in your database:
```sql
INSERT INTO users (name, email, password, role, balance) 
VALUES (
  'Admin', 
  'admin@bytenodes.id', 
  '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- password: password
  'admin', 
  0.00
);
```

### 7. Stripe Integration

1. Get Stripe API keys from https://dashboard.stripe.com/apikeys
2. Set up webhook endpoint at `/api/webhooks/stripe`
3. Handle payment confirmation webhooks
4. Update order status after successful payment

### 8. Environment Variables

Create `.env` file for your PHP backend:
```env
DB_HOST=localhost
DB_NAME=bytenodes
DB_USER=root
DB_PASSWORD=your_password

JWT_SECRET=your_random_secret_key_here
JWT_EXPIRY=86400

STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxx

FRONTEND_URL=https://bytenodes.com
```

### 9. Testing Workflow

1. Test registration:
   - Go to `/client/register`
   - Fill form and submit
   - Should redirect to `/client/login`
   - Login with new credentials

2. Test user login:
   - Go to `/client/login`
   - Enter credentials
   - Should redirect to `/client/dashboard`

3. Test admin login:
   - Login with admin credentials
   - Should redirect to `/admin`

4. Test protected routes:
   - Try accessing `/client/dashboard` without login
   - Should redirect to `/client/login`

5. Test server ordering:
   - Login as user
   - Go to "Order New Service"
   - Select product and billing cycle
   - Should create order and redirect to Stripe

## Security Checklist

- ✅ Frontend validates passwords (min 6 characters)
- ✅ JWT tokens stored in localStorage
- ✅ Protected routes check authentication
- ✅ Admin routes check user role
- ✅ API calls include Authorization header
- ⚠️ Backend must validate all inputs
- ⚠️ Backend must use prepared statements
- ⚠️ Backend must hash passwords
- ⚠️ Backend must validate JWT tokens
- ⚠️ Backend must check user roles for admin endpoints

## File Structure

```
src/
├── contexts/
│   └── AuthContext.tsx          # Authentication state management
├── lib/
│   └── api.ts                   # API service layer
├── components/
│   ├── ProtectedRoute.tsx       # Route protection
│   └── Navbar.tsx               # Updated with auth
├── pages/
│   ├── client/
│   │   ├── Login.tsx            # Login page
│   │   ├── Register.tsx         # Registration (redirects to login)
│   │   ├── Dashboard.tsx        # User dashboard
│   │   └── OrderServer.tsx      # Server ordering
│   └── admin/
│       └── AdminDashboard.tsx   # Admin panel
└── App.tsx                      # Updated with AuthProvider and ProtectedRoute

API_DOCUMENTATION.md             # Complete API specs
IMPLEMENTATION_GUIDE.md          # This file
```

## Registration → Login Flow

1. User fills registration form at `/client/register`
2. Frontend validates password match and length
3. Frontend calls `POST /api/auth/register`
4. Backend creates user account
5. Backend returns success message
6. Frontend shows success toast
7. **Frontend automatically redirects to `/client/login`**
8. User can now login with new credentials

## Common Issues & Solutions

### Issue: CORS errors
**Solution:** Make sure your PHP backend has correct CORS headers

### Issue: Token not being sent
**Solution:** Check if token is stored in localStorage after login

### Issue: Can't access protected routes
**Solution:** Make sure user is logged in and token is valid

### Issue: Admin can't access admin panel
**Solution:** Check that user's role is 'admin' in database

### Issue: Redirect after signup not working
**Solution:** Check browser console for errors, ensure navigation is not blocked

## Support

For backend implementation questions, refer to:
- `API_DOCUMENTATION.md` - Complete API specifications
- Database schema suggestions in documentation
- Example PHP code snippets in documentation

## Deployment

### Frontend (React)
1. Build: `npm run build`
2. Upload `dist/` folder to your VPS
3. Configure web server to serve static files
4. Point all routes to `index.html` for React Router

### Backend (PHP)
1. Upload PHP files to your VPS
2. Configure Apache/Nginx to route `/api/*` to PHP
3. Set up SSL certificate
4. Configure environment variables
5. Test all endpoints with Postman

---

**Your frontend is ready!** Now implement the PHP backend using the API documentation and start testing the complete system.
