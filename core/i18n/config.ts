import {localeRU} from '@i18n/locales/ru'
import {localeEN} from '@i18n/locales/en'
import {Locale} from '@i18n/locale'

const locales: Locale[] = [
    localeEN,
    localeRU,
]

export const i18n = {
    defaultLocale: localeRU.short,
    locales: locales,
} as const

export function getLocaleByShort(localeShort: string): Locale {
    const indexLocale =  i18n.locales.findIndex(item => item.short === localeShort)

    if (indexLocale == -1) {
        return i18n.locales[0]
    }

    return i18n.locales[indexLocale]
}
