# Production Deployment Guide

This project is ready for live hosting on a standard Laravel stack with PHP 8.2+, MySQL/MariaDB, Composer, Node.js, and either Apache or Nginx.

## 1. Server requirements

- PHP 8.2 or newer with `bcmath`, `ctype`, `fileinfo`, `json`, `mbstring`, `openssl`, `pdo`, `pdo_mysql`, `tokenizer`, `xml`
- MySQL or MariaDB
- Composer 2
- Node.js 20+ and Yarn 1
- Web root pointed to the `public/` directory

## 2. Production environment file

Use [.env.production.example](/d:/projects/auxio/.env.production.example:1) as the base for the live `.env`.

Minimum required changes:

- Set `APP_KEY` with `php artisan key:generate --show`
- Set the real `APP_URL`
- Set real database credentials
- Set a strong `ADMIN_PASSWORD`
- Set SMTP credentials for `MAIL_*`
- Keep `APP_DEBUG=false`
- Keep `APP_FORCE_HTTPS=true`

Recommended production values:

```env
APP_ENV=production
APP_DEBUG=false
LOG_STACK=daily
LOG_LEVEL=warning
SESSION_SECURE_COOKIE=true
SESSION_ENCRYPT=true
QUEUE_CONNECTION=database
CACHE_STORE=database
```

## 3. Install and build

Run these commands on the server:

```bash
composer install --no-dev --optimize-autoloader
yarn install --frozen-lockfile
yarn build
php artisan key:generate
php artisan migrate --force
php artisan db:seed --class=AdminUserSeeder --force
php artisan optimize
php artisan queue:restart
```

You can also use the Composer deployment shortcut:

```bash
composer run deploy:production
```

## 4. Database and migration readiness

The project already includes migrations for:

- users
- sessions
- cache and cache locks
- jobs
- CMS content tables
- contact and quote request tables

Before go-live:

- Create the production database
- Verify the DB user has create, alter, index, and update permissions
- Run `php artisan migrate --force`
- Seed the admin user with `php artisan db:seed --class=AdminUserSeeder --force`

The admin seeder now blocks weak default passwords in production.

## 5. Cache optimization

For best production performance:

```bash
php artisan config:cache
php artisan route:cache
php artisan event:cache
php artisan view:cache
```

Or run:

```bash
composer run optimize:production
```

If you need to clear everything before a redeploy:

```bash
php artisan optimize:clear
```

## 6. Apache configuration

Point the document root to `public/`.

Example virtual host:

```apache
<VirtualHost *:80>
    ServerName example.com
    ServerAlias www.example.com
    DocumentRoot /var/www/auxio/public

    <Directory /var/www/auxio/public>
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/auxio-error.log
    CustomLog ${APACHE_LOG_DIR}/auxio-access.log combined
</VirtualHost>
```

If SSL is terminated before Apache, keep `TRUSTED_PROXIES=*` and `APP_FORCE_HTTPS=true`.

## 7. Nginx configuration

Example server block:

```nginx
server {
    listen 80;
    server_name example.com www.example.com;
    root /var/www/auxio/public;
    index index.php;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    location ~ \.php$ {
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        fastcgi_pass unix:/run/php/php8.2-fpm.sock;
        fastcgi_index index.php;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

If you use HTTPS termination through a load balancer or proxy, keep `TRUSTED_PROXIES` configured.

## 8. Queues, sessions, and logs

- Run a queue worker in production if queued jobs are used: `php artisan queue:work --tries=3 --timeout=90`
- Sessions are stored in the database, so migrations must be run before login is available
- Logs should use the `daily` stack in production to keep files rotated
- Keep `LOG_LEVEL=warning` or stricter on live hosting

## 9. Security checklist

- `APP_DEBUG=false`
- `APP_ENV=production`
- `APP_FORCE_HTTPS=true`
- `SESSION_SECURE_COOKIE=true`
- `SESSION_ENCRYPT=true`
- `SESSION_HTTP_ONLY=true`
- Real `APP_KEY`
- Strong `ADMIN_PASSWORD`
- Production DB credentials with least privilege
- Web root set to `public/`
- `storage/` and `bootstrap/cache/` writable by the web user

## 10. Post-deploy verification

Check these after release:

- Homepage loads with built assets
- Admin login works
- Contact and quote forms submit successfully
- `php artisan about` shows the expected production environment
- No stack traces are visible in the browser
- Queue worker is running if background jobs are needed
