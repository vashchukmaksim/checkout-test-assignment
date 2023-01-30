import i18n from 'i18next'
import createCache from '@emotion/cache'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import '../resources/styles/base.less'

const emotionCache = createCache({ key: 'app' })

const routes = {
	index: '/',
	results: 'results',
} as const

const i18next = i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: 'en',
		supportedLngs: ['en'],
		returnEmptyString: false,
		ns: ['content', 'aria', 'errors'],
		defaultNS: 'content',
		react: {
			useSuspense: false,
		},
	})
	.catch(console.error)

export const config = {
	emotionCache,
	i18next,
	routes,
}
