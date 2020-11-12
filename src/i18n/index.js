import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import { Locale } from 'vant';

import en from '../i18n/en'
import vantEnUS from 'vant/lib/locale/lang/en-US'

import zh from '../i18n/zh-CN'
import vantZhCN from 'vant/lib/locale/lang/zh-CN'

Vue.use(VueI18n)

const langConfig = {
    "en": {
        ...en, //引入自定义国际化
        ...vantEnUS
    },
    "zh-CN": {
        ...zh, //引入自定义国际化
        ...vantZhCN
    }
}

export function getLanguage() {
    const chooseLanguage = Cookies.get('language')
    if(chooseLanguage) return chooseLanguage

    const language = (navigator.language || navigator.browserLanguage).toLowerCase()
    const locales = Object.keys(langConfig)

    for(const locale of locales) {
        if(language.indexOf(locale) > -1) {
            return locale
        }
    }

    return 'en'
}

const i18n = new VueI18n({
    locale: getLanguage(),
    messages: langConfig
})

// 更新vant组件库本身的语言变化，支持国际化
function vantLocales (lang) {
    if (lang === 'en') {
        Locale.use(lang, vantEnUS)
    } else if (lang === 'zh-CN') {
        Locale.use(lang, vantZhCN)
    }
}
export { i18n, vantLocales }