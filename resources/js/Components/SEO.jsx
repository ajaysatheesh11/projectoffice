import { Head, usePage } from '@inertiajs/react';

export default function SEO({ title, description, image = '/images/image.png', robots = 'index, follow' }) {
    const { app, url = '/' } = usePage().props;
    const canonicalUrl = new URL(url, app.url).toString();
    const imageUrl = new URL(image, app.url).toString();

    return (
        <Head title={title}>
            {description ? <meta name="description" content={description} /> : null}
            <meta name="robots" content={robots} />
            <link rel="canonical" href={canonicalUrl} />
            <meta property="og:title" content={title} />
            {description ? <meta property="og:description" content={description} /> : null}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:site_name" content={app.name} />
            <meta property="og:image" content={imageUrl} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            {description ? <meta name="twitter:description" content={description} /> : null}
            <meta name="twitter:image" content={imageUrl} />
        </Head>
    );
}
