import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

// Import organized translations
import { calendarDE } from './components/calendar/de'
import { calendarEN } from './components/calendar/en'
import { calendarES } from './components/calendar/es'
import { calendarFR } from './components/calendar/fr'
import { calendarPT } from './components/calendar/pt'

import { demoDE } from './general/demo/de'
import { demoEN } from './general/demo/en'
import { demoES } from './general/demo/es'
import { demoFR } from './general/demo/fr'
import { demoPT } from './general/demo/pt'

import { languageDE } from './general/language/de'
import { languageEN } from './general/language/en'
import { languageES } from './general/language/es'
import { languageFR } from './general/language/fr'
import { languagePT } from './general/language/pt'

import { searchEN } from './components/search/en'
import { searchES } from './components/search/es'
import { searchFR } from './components/search/fr'
import { searchDE } from './components/search/de'
import { searchPT } from './components/search/pt'

// Organized translation resources
const resources = {
    en: {
        translation: {
            calendar: calendarEN,
            search: searchEN,
            demo: demoEN,
            language: languageEN
        }
    },
    es: {
        translation: {
            calendar: calendarES,
            search: searchES,
            demo: demoES,
            language: languageES
        }
    },
    fr: {
        translation: {
            calendar: calendarFR,
            search: searchFR,
            demo: demoFR,
            language: languageFR
        }
    },
    de: {
        translation: {
            calendar: calendarDE,
            search: searchDE,
            demo: demoDE,
            language: languageDE
        }
    },
    pt: {
        translation: {
            calendar: calendarPT,
            search: searchPT,
            demo: demoPT,
            language: languagePT
        }
    }
}

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        debug: false,

        interpolation: {
            escapeValue: false, // React already escapes values
        },

        detection: {
            order: ['localStorage', 'navigator', 'htmlTag'],
            caches: ['localStorage'],
        },

        // Prevent hydration mismatch and improve SSR compatibility
        react: {
            useSuspense: false,
        },
        
        // Improve hydration by ensuring consistent language detection
        initImmediate: false,
    })

export default i18n
