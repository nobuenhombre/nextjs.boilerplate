import {getLocaleByShort} from '@i18n/config'

export default async function IndexPage(
    {
        params: {localeShort}
    }: {
        params: { localeShort: string }
    }
) {
    const locale = getLocaleByShort(localeShort)
    const i18n = locale.i18n

    return (
        <h1>
            { i18n.home.welcome }
        </h1>
    )
}
