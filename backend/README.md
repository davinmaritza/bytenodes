# ByteNodes Backend API

PHP/MySQL backend for ByteNodes hosting platform.

## Quick Setup

### 1. Install Dependencies

```bash
cd backend
composer install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your database credentials and secrets:
- `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`
- `JWT_SECRET` (generate a secure random key)
- `STRIPE_SECRET_KEY` (your Stripe secret key)
- `FRONTEND_URL` (your frontend URL for CORS)

### 3. Setup Database

```bash
mysql -u root -p < database.sql
```

This creates:
- Database: `bytenodes`
- All required tables
- Sample admin user: `admin@bytenodes.id` / `admin123`
- Sample products

### 4. Load Environment Variables

Add this to the top of your Apache/PHP configuration or use a package like `vlucas/phpdotenv`:

```php
// Load .env file
$lines = file(__DIR__ . '/.env');
foreach ($lines as $line) {
    if (strpos(trim($line), '#') === 0 || empty(trim($line))) continue;
    list($key, $value) = explode('=', $line, 2);
    putenv(trim($key) . '=' . trim($value));
}
```

### 5. Configure Apache

Enable mod_rewrite:
```bash
sudo a2enmod rewrite
sudo systemctl restart apache2
```

Point your VirtualHost to the `backend/` directory.

### 6. Test API

```bash
curl http://your-domain.com/api/products
```

## API Endpoints

See `API_DOCUMENTATION.md` for complete API reference.

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Services
- `GET /api/products` - List all products
- `GET /api/services` - Get user's services
- `POST /api/orders` - Create new order

### Tickets
- `GET /api/tickets` - Get user tickets
- `POST /api/tickets` - Create new ticket
- `GET /api/tickets/{id}/replies` - Get ticket replies
- `POST /api/tickets/{id}/replies` - Reply to ticket

### Admin (requires admin role)
- `GET /api/admin/tickets` - View all tickets
- `GET /api/admin/orders` - View all orders
- `POST /api/admin/blog/posts` - Create blog post
- `PUT /api/admin/blog/posts/{id}` - Update blog post
- `DELETE /api/admin/blog/posts/{id}` - Delete blog post

## Security Notes

1. **Change JWT_SECRET** to a secure random string in production
2. **Use HTTPS** in production (Let's Encrypt)
3. **Update CORS origins** in `config/cors.php` with your actual frontend URL
4. **Change admin password** after first login
5. **Enable rate limiting** on authentication endpoints
6. **Validate and sanitize** all user inputs
7. **Use prepared statements** (already implemented)

## Troubleshooting

### CORS Issues
Check `config/cors.php` and add your frontend URL to `$allowed_origins`

### Database Connection Failed
Verify `.env` database credentials and that MySQL is running

### JWT Token Invalid
Ensure `JWT_SECRET` in `.env` matches between requests

### 500 Error
Check PHP error logs: `tail -f /var/log/apache2/error.log`
