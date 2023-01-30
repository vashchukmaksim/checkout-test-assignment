import { useEffect } from 'react'

const appHeight = (): void => {
	const doc = document.documentElement
	doc.style.setProperty('--app-height', `${window.innerHeight}px`)
}

// https://stackoverflow.com/questions/37112218/css3-100vh-not-constant-in-mobile-browser
export const useAppHeight = () => {
	useEffect(() => {
		window.addEventListener('resize', appHeight)
		window.addEventListener('orientationchange', appHeight)
		appHeight()

		return () => {
			window.removeEventListener('resize', appHeight)
			window.removeEventListener('orientationchange', appHeight)
		}
	}, [])
}
