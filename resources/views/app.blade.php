<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="robots" content="index, follow">
        <meta name="description" content="Auxio Technologies Private Limited builds modern digital experiences, custom platforms, and scalable business systems.">
        <meta name="theme-color" content="#091008">
        <meta name="color-scheme" content="dark light">

        <title inertia>{{ config('app.name', 'Auxio Technologies Private Limited') }}</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg">
        <link rel="alternate icon" href="/images/image.png">
        <link rel="canonical" href="{{ config('app.url') }}">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700|space-grotesk:400,500,600,700" rel="stylesheet">

        @routes
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
