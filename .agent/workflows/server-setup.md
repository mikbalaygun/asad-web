---
description: ASAD Web projesini yeni bir sunucuya kurma adımları
---

# ASAD Web - Yeni Sunucu Kurulum Rehberi

Bu rehber CentOS/Rocky Linux/AlmaLinux için hazırlanmıştır.

// turbo-all

## 1. Sistem Güncellemesi

```bash
dnf update -y
```

## 2. Node.js 20 Kurulumu

```bash
# NodeSource repo ekle
curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -

# Node.js kur
dnf install -y nodejs

# Versiyon kontrolü
node --version  # v20.x.x olmalı
npm --version
```

## 3. PostgreSQL Kurulumu

```bash
# PostgreSQL 15 kur
dnf install -y postgresql15-server postgresql15

# Veritabanını başlat
postgresql-setup --initdb

# Servisi başlat
systemctl enable postgresql
systemctl start postgresql

# PostgreSQL kullanıcısına geç
sudo -u postgres psql

# SQL komutları:
CREATE USER asad_user WITH PASSWORD 'GucluSifre123!';
CREATE DATABASE asad_db OWNER asad_user;
GRANT ALL PRIVILEGES ON DATABASE asad_db TO asad_user;
\q
```

## 4. PostgreSQL Güvenlik Ayarları

```bash
# pg_hba.conf düzenle
nano /var/lib/pgsql/15/data/pg_hba.conf

# Bu satırı ekle (local bağlantı için):
local   all   all   md5
host    all   all   127.0.0.1/32   md5

# PostgreSQL'i yeniden başlat
systemctl restart postgresql
```

## 5. Nginx Kurulumu

```bash
dnf install -y nginx

systemctl enable nginx
systemctl start nginx
```

## 6. PM2 Kurulumu

```bash
npm install -g pm2
```

## 7. Git Kurulumu ve Proje İndirme

```bash
dnf install -y git

# Proje dizini oluştur
mkdir -p /var/www
cd /var/www

# GitHub'dan klonla
git clone https://github.com/mikbalaygun/asad-web.git
cd asad-web
```

## 8. Environment Değişkenleri

```bash
# .env dosyası oluştur
nano .env
```

**.env içeriği:**
```env
# Veritabanı
DATABASE_URL="postgresql://asad_user:GucluSifre123!@localhost:5432/asad_db"

# NextAuth
AUTH_SECRET="$(openssl rand -base64 32)"
AUTH_URL="https://asad.org.tr"
AUTH_TRUST_HOST=true
NEXTAUTH_URL="https://asad.org.tr"

# Node ortamı
NODE_ENV=production
```

## 9. Bağımlılıkları Kur ve Build Al

```bash
# Bağımlılıkları kur
npm install

# Prisma client oluştur
npx prisma generate

# Veritabanı tablolarını oluştur
npx prisma db push

# Production build al
npm run build
```

## 10. Uploads Klasörü Oluştur

```bash
mkdir -p public/uploads/{news,articles,projects,services,gallery,sponsors,popups,board,pdf}
chmod -R 755 public/uploads
```

## 11. PM2 ile Başlat

```bash
# ecosystem.config.js oluştur
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'asad-web',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/asad-web',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
EOF

# Başlat
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## 12. Nginx Konfigürasyonu

```bash
nano /etc/nginx/conf.d/asad.conf
```

**Nginx config:**
```nginx
server {
    listen 80;
    server_name asad.org.tr www.asad.org.tr;

    # Uploads için static serving
    location /uploads {
        alias /var/www/asad-web/public/uploads;
        expires 30d;
        add_header Cache-Control "public, immutable";
        
        # Script çalıştırmayı engelle
        location ~ \.(php|phtml|sh|py|pl)$ {
            deny all;
            return 403;
        }
    }

    # Next.js uygulaması
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Nginx test et
nginx -t

# Yeniden başlat
systemctl restart nginx
```

## 13. SSL Sertifikası (Let's Encrypt)

```bash
# Certbot kur
dnf install -y certbot python3-certbot-nginx

# SSL al
certbot --nginx -d asad.org.tr -d www.asad.org.tr

# Otomatik yenileme
systemctl enable certbot-renew.timer
```

## 14. Firewall Ayarları

```bash
# Firewall aktif et
systemctl enable firewalld
systemctl start firewalld

# Gerekli portları aç
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https
firewall-cmd --permanent --add-service=ssh
firewall-cmd --reload

# PostgreSQL dışarıya KAPALI kalmalı!
```

## 15. Admin Kullanıcısı Oluştur

```bash
# Prisma seed çalıştır (varsa)
npm run db:seed

# Veya manuel ekle
sudo -u postgres psql asad_db

INSERT INTO "User" (id, name, email, password, role)
VALUES (
  'admin-user-id',
  'Admin',
  'admin@asad.org.tr',
  '$2a$10$...', -- bcrypt hash
  'admin'
);
```

## 16. Logları Kontrol Et

```bash
# PM2 logları
pm2 logs asad-web

# Nginx logları
tail -f /var/log/nginx/error.log
```

---

## ✅ Kurulum Sonrası Kontrol Listesi

- [ ] `https://asad.org.tr` açılıyor mu?
- [ ] `/admin` sayfası login istiyor mu?
- [ ] Admin panelden içerik eklenebiliyor mu?
- [ ] Resim yükleme çalışıyor mu?
- [ ] SSL sertifikası aktif mi? (https://)
- [ ] PM2 restart sonrası site açılıyor mu?

---

## 🔧 Yararlı Komutlar

```bash
# Logları izle
pm2 logs asad-web --lines 50

# Yeniden başlat
pm2 restart asad-web

# Durumu kontrol et
pm2 status

# Kod güncelle
cd /var/www/asad-web
git pull
npm install
npm run build
pm2 restart asad-web
```
