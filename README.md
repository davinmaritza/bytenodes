# ByteNodes - VPS & Hosting Provider

Aplikasi web untuk penyedia layanan VPS, dedicated server, hosting, dan layanan infrastruktur lainnya.

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev
```
Buka: `http://localhost:8080`

### Production Build
```bash
npm install
npm run build
```
File hasil build ada di folder `dist/`

## 📁 Dokumentasi

- **[IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)** - Panduan implementasi frontend & backend
- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Dokumentasi lengkap API endpoints
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Panduan deployment lengkap ke VPS

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Backend**: PHP 8 + MySQL (terpisah, lihat API_DOCUMENTATION.md)
- **Routing**: React Router v6
- **State**: React Context API
- **Icons**: Lucide React

## ⚙️ Konfigurasi

### Environment Variables

Edit `.env.production` sebelum build:
```env
VITE_API_URL=https://api.bytenodes.id/api
```

## 📦 Available Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🎨 Features

- ✅ Authentication (Login/Register)
- ✅ User Dashboard
- ✅ Admin Panel
- ✅ Server Ordering System
- ✅ Payment Gateway Integration (Stripe)
- ✅ Ticketing System
- ✅ Blog/Knowledge Base
- ✅ Responsive Design
- ✅ Role-based Access Control

## 📝 Deployment

Lihat [DEPLOYMENT.md](./DEPLOYMENT.md) untuk panduan lengkap deployment ke VPS.

**Quick Deploy:**
```bash
# 1. Build
npm run build

# 2. Upload 'dist' folder ke VPS
scp -r dist/* user@vps:/var/www/bytenodes
```

## 🔐 Security

- JWT-based authentication
- Protected routes
- Role-based access control
- CORS configuration
- Input validation

## 📞 Support

- Email: support@bytenodes.id
- WhatsApp: [Link]
- Discord: [Link]
- Instagram: @bytenodes

## 👥 Team

Founded by Salman & Davin from SMK Negeri 13 Bandung, VBAP class.

## 📄 License

Private - All rights reserved
