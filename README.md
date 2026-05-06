# Auxio Technologies Private Limited

Modern company website foundation built with Laravel, Inertia.js, React, Tailwind CSS, Vite, and MySQL.

## Stack

- Laravel 12
- Inertia.js with React
- Tailwind CSS 4
- Vite 7
- MySQL
- Yarn 1

## Local Setup

```bash
php ../composer.phar install
cp .env.example .env
php artisan key:generate
yarn install
php artisan migrate
yarn dev
```

For a production asset build:

```bash
yarn build
```

For deployment and server configuration, see [DEPLOYMENT.md](/d:/projects/auxio/DEPLOYMENT.md:1).

## Database

The environment is configured for MySQL by default:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=auxio
DB_USERNAME=root
DB_PASSWORD=
```

Update the credentials for the target environment before running migrations.

## Structure

```text
app/
  Http/
    Controllers/
      Admin/
      Web/
    Middleware/
resources/
  js/
    Components/
      Site/
      UI/
    Layouts/
    Pages/
      Admin/
      Company/
      Contact/
      Home/
      Services/
  views/
routes/
  web.php
```

## Routing

- `/` renders the public home shell.
- `/about`, `/services`, and `/contact` are routed placeholders for the future company pages.
- `/admin` is reserved for the next admin phase.

The project uses Laravel MVC controllers returning Inertia responses, keeping the React frontend inside the Laravel request lifecycle rather than a separate API application.
