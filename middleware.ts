import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {Locale} from '@i18n/locale'
import {i18n, getLocaleByShort} from '@i18n/config'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

export const NEXT_PUBLIC_FRONTEND_URL:string =
    process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000';

function getLocale(request: NextRequest): Locale {
    const negotiatorHeaders: Record<string, string> = {}
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))
    const locales: string[] = i18n.locales.map(item=> item.short)
    let languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales)
    const locale = matchLocale(languages, locales, i18n.defaultLocale)

    return getLocaleByShort(locale)
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    const searchParams = request.nextUrl.searchParams.toString()

    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) => !pathname.startsWith(`/${locale.short}/`) && pathname !== `/${locale.short}`
    )

    if (pathnameIsMissingLocale) {
        const locale = getLocale(request)

        return NextResponse.redirect(
            new URL(
                `${NEXT_PUBLIC_FRONTEND_URL}/${locale?.short}${pathname.startsWith('/') ? '' : '/'}${pathname}${searchParams ? '?'+searchParams : ''}`,
                request.url
            )
        )
    }
}

export const config = {
    // Matcher ignoring `/_next/` and `/api/`, etc
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|favicon.png|favicon_48.png|favicon_512.png|manifest.json/monitoring/assets/.well-known).*)'],
}
