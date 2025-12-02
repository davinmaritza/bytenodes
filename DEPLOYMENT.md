# ByteNodes - Panduan Deployment Lengkap

## 📦 Prerequisites

- Node.js 18+ dan npm
- VPS dengan Ubuntu/Debian
- Domain (optional)
- PHP 8.0+ dan MySQL 8.0+ untuk backend

---

## 🚀 Deployment Frontend ke VPS

### Step 1: Persiapan di Local

```bash
# Clone repository
git clone <your-repo-url>
cd bytenodes-frontend

# Install dependencies
npm install

# Edit konfigurasi production
nano .env.production
```

Edit `.env.production`:
```env
VITE_API_URL=https://api.bytenodes.id/api  # Ganti dengan domain API Anda
```

### Step 2: Build Production

```bash
# Build aplikasi
npm run build

# Hasilnya ada di folder 'dist'
ls -la dist/
```

### Step 3: Upload ke VPS

**Option A: Menggunakan SCP**
```bash
# Upload dist folder ke VPS
scp -r dist/* root@your-vps-ip:/var/www/bytenodes

# Atau jika menggunakan SSH key
scp -i ~/.ssh/your-key.pem -r dist/* ubuntu@your-vps-ip:/var/www/bytenodes
```

**Option B: Menggunakan FTP/SFTP Client**
- FileZilla, WinSCP, atau Cyberduck
- Upload isi folder `dist` ke `/var/www/bytenodes`

**Option C: Git Clone di VPS (Recommended)**
```bash
# Di VPS
cd /var/www
git clone <your-repo-url> bytenodes
cd bytenodes
npm install
npm run build

# Copy build ke web root
cp -r dist/* /var/www/html/
```

### Step 4: Install dan Konfigurasi Nginx

```bash
# Install Nginx
sudo apt update
sudo apt install nginx

# Buat konfigurasi site
sudo nano /etc/nginx/sites-available/bytenodes
```

Copy konfigurasi ini:
```nginx
server {
    listen 80;
    server_name bytenodes.id www.bytenodes.id;
    
    root /var/www/bytenodes;
    index index.html;

    # Logging
    access_log /var/log/nginx/bytenodes-access.log;
    error_log /var/log/nginx/bytenodes-error.log;

    # React Router support
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/bytenodes /etc/nginx/sites-enabled/

# Test konfigurasi
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### Step 5: Setup SSL dengan Let's Encrypt (Recommended)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Generate SSL certificate
sudo certbot --nginx -d bytenodes.id -d www.bytenodes.id

# Auto-renewal test
sudo certbot renew --dry-run
```

### Step 6: Setup Firewall

```bash
# Allow HTTP dan HTTPS
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
```

---

## 🔧 Deployment Backend PHP (di VPS yang sama atau terpisah)

### Option A: Backend di VPS yang sama

**Struktur folder:**
```
/var/www/
├── bytenodes/          # Frontend React
└── api/                # Backend PHP
    ├── auth/
    ├── services/
    ├── admin/
    └── config.php
```

**Nginx config untuk API:**
```nginx
server {
    listen 80;
    server_name api.bytenodes.id;
    
    root /var/www/api;
    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    # CORS headers
    add_header 'Access-Control-Allow-Origin' 'https://bytenodes.id' always;
    add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
    add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization' always;
    add_header 'Access-Control-Allow-Credentials' 'true' always;

    if ($request_method = 'OPTIONS') {
        return 204;
    }
}
```

### Setup MySQL Database

```bash
# Login ke MySQL
sudo mysql -u root -p

# Buat database dan user
CREATE DATABASE bytenodes;
CREATE USER 'bytenodes_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON bytenodes.* TO 'bytenodes_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# Import schema
mysql -u bytenodes_user -p bytenodes < /path/to/schema.sql
```

### Setup PHP Environment

```bash
# Install PHP dan extensions
sudo apt install php8.1-fpm php8.1-mysql php8.1-mbstring php8.1-xml php8.1-curl

# Edit PHP-FPM config
sudo nano /etc/php/8.1/fpm/php.ini
```

Set ini:
```ini
upload_max_filesize = 50M
post_max_size = 50M
memory_limit = 256M
max_execution_time = 300
```

```bash
# Restart PHP-FPM
sudo systemctl restart php8.1-fpm
```

---

## 🔄 Update Deployment (CI/CD Manual)

### Script untuk Auto-deploy

Buat file `deploy.sh` di local:
```bash
#!/bin/bash

echo "Building ByteNodes..."
npm run build

echo "Uploading to VPS..."
scp -r dist/* user@your-vps:/var/www/bytenodes

echo "Deployment complete!"
```

```bash
# Make executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

### Alternative: Git-based Deployment

Di VPS, buat script `/var/www/update.sh`:
```bash
#!/bin/bash
cd /var/www/bytenodes
git pull origin main
npm install
npm run build
cp -r dist/* /var/www/html/
echo "Update complete!"
```

```bash
chmod +x /var/www/update.sh

# Run update
/var/www/update.sh
```

---

## 📊 Monitoring dan Maintenance

### Check Nginx Logs
```bash
# Access logs
sudo tail -f /var/log/nginx/bytenodes-access.log

# Error logs
sudo tail -f /var/log/nginx/bytenodes-error.log
```

### Check System Resources
```bash
# CPU dan Memory usage
htop

# Disk usage
df -h

# Nginx status
sudo systemctl status nginx
```

### Backup Script
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
tar -czf /backup/bytenodes_$DATE.tar.gz /var/www/bytenodes
mysqldump -u bytenodes_user -p bytenodes > /backup/db_$DATE.sql
```

---

## 🐛 Troubleshooting

### Issue: Nginx 403 Forbidden
```bash
# Fix permissions
sudo chown -R www-data:www-data /var/www/bytenodes
sudo chmod -R 755 /var/www/bytenodes
```

### Issue: React Router 404 pada refresh
Pastikan nginx config ada `try_files $uri $uri/ /index.html;`

### Issue: CORS errors
Cek CORS headers di PHP backend dan nginx config

### Issue: API tidak terkoneksi
```bash
# Test API connection
curl https://api.bytenodes.id/api/health

# Check PHP-FPM
sudo systemctl status php8.1-fpm

# Check logs
sudo tail -f /var/log/nginx/error.log
```

---

## 📞 Support

Jika ada masalah saat deployment:
1. Cek error logs
2. Pastikan semua services running
3. Verify DNS settings
4. Test API endpoints dengan Postman

Happy deploying! 🚀
