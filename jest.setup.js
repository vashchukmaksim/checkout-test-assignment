import React from 'react'
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import enableHooks from 'jest-react-hooks-shallow'
import { cleanup } from '@testing-library/react'
import { toMatchImageSnapshot } from 'jest-image-snapshot'
import '@testing-library/jest-dom/extend-expect'
import { enableFetchMocks } from 'jest-fetch-mock'

expect.extend({ toMatchImageSnapshot })
enableHooks(jest)
enableFetchMocks()
global.ResizeObserver = require('resize-observer-polyfill')

beforeAll(() => {
	jest.useFakeTimers()
})

afterAll(() => {
	jest.useRealTimers()
})

afterEach(() => {
	jest.clearAllMocks()
	jest.clearAllTimers()
	jest.resetAllMocks()
	cleanup()
})

i18next
	.use(LanguageDetector)
	.init({
		lng: 'en',
		fallbackLng: 'en',
		ns: ['common'],
		defaultNS: 'common',
		debug: false,
		resources: { en: { common: {} } },
		interpolation: {
			escapeValue: false, // not needed for react
		},
	})
	.catch(console.error)

jest.mock('react-i18next', () => ({
	// From: https://react.i18next.com/misc/testing
	// this mock makes sure any components using the translate hook can use it without a warning being shown
	Trans: ({ children }) => children,
	withTranslation: () => Component => {
		Component.defaultProps = {
			...Component.defaultProps,
			t: children => children,
		}
		return Component
	},
	useTranslation: () => {
		return {
			t: (key, defaultTranslation) => defaultTranslation,
			i18n: {
				changeLanguage: () => new Promise(() => null),
			},
		}
	},
	initReactI18next: {
		type: '3rdParty',
		init: jest.fn(),
	},
}))

// https://dev.to/adxmcollins/comment/1jen0
jest.mock('framer-motion', () => ({
	...jest.requireActual('framer-motion'),
	useReducedMotion: () => true,
}))

jest.mock('use-media', () => ({
	...jest.requireActual('use-media'),
	useMedia: () => false,
}))

jest.mock('recharts', () => {
	const OriginalModule = jest.requireActual('recharts')
	return {
		...OriginalModule,
		ResponsiveContainer: ({ children }) => (
			<OriginalModule.ResponsiveContainer width={800} height={800}>
				{children}
			</OriginalModule.ResponsiveContainer>
		),
	}
})
