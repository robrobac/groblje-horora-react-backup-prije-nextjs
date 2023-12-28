import React from 'react'
import { Helmet } from 'react-helmet-async'

export default function HelmetSettings({title, description, url, image}) {
    return (
        <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={image} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta name="robots" content="index, follow" />
    </Helmet>
    )
}
