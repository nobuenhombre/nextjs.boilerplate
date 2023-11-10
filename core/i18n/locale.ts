export interface i18nHome {
    welcome: string
}

export interface i18n {
    home: i18nHome
}

export interface Locale {
    short: string;
    full: string;
    i18n: i18n;
}
