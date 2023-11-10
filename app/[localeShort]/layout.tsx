import {i18n} from '@i18n/config'
import React from 'react'
import '@app/globals.css'

export async function generateStaticParams() {
    return i18n.locales.map((item) => ({localeShort: item.short}))
}

export default function Root(
    {
        children,
        params
    }: {
        children: React.ReactNode
        params: { localeShort: string }
    }
) {
    return (
        <html lang={params.localeShort}>
        <head>
            <title>NextJS Boilerplate</title>
            <link rel="icon" href="/favicon.ico"/>
            <link rel="shortcut icon" href="/favicon.png" type="image/x-icon"/>
            <link rel="apple-touch-icon" href="/favicon.png"/>
            <link rel="apple-touch-icon" sizes="32x32" href="/favicon_32.png"/>
            <link rel="apple-touch-icon" sizes="48x48" href="/favicon_48.png"/>
            <link rel="apple-touch-icon" sizes="512x512" href="/favicon_512.png"/>
            <link rel="apple-touch-startup-image" href="/favicon_512.png"/>
            <meta name="msapplication-TileColor" content="#FFFFFF"/>
            <meta name="msapplication-TileImage" content="/favicon_512.png"/>
        </head>
        <body>
            {children}
        </body>
        </html>
    )
}
