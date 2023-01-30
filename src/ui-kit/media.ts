import { useMediaLayout } from 'use-media'

export type CommonMediaVariant = 'MOBILE' | 'TABLET' | 'DESKTOP_WIDE' | 'DESKTOP_NARROW'
type SpecialMediaVariant = CommonMediaVariant | 'DESKTOP' | 'NOT_DESKTOP'
type BreakpointsMap = {
	mobile: number
	tablet: number
	desktop: number
}

// can be used with styled-system if needed
const breakpoints: number[] = [639, 1023, 1366]
;(breakpoints as unknown as BreakpointsMap).mobile = breakpoints[0]
;(breakpoints as unknown as BreakpointsMap).tablet = breakpoints[1]
;(breakpoints as unknown as BreakpointsMap).desktop = breakpoints[2]
const bp = breakpoints as unknown as BreakpointsMap

export const MEDIA: { [key in SpecialMediaVariant]: SpecialMediaVariant } = {
	MOBILE: 'MOBILE',
	TABLET: 'TABLET',
	DESKTOP: 'DESKTOP',
	DESKTOP_WIDE: 'DESKTOP_WIDE',
	DESKTOP_NARROW: 'DESKTOP_NARROW',
	NOT_DESKTOP: 'NOT_DESKTOP',
} as const

// Predefined media queries
export const mediaQueries: Record<string, string> = {
	// Common
	[MEDIA.MOBILE]: `@media screen and (max-width: ${bp.mobile}px)`,
	[MEDIA.TABLET]: `@media screen and (min-width: ${bp.mobile + 1}px) and (max-width: ${bp.tablet}px)`,
	[MEDIA.DESKTOP]: `@media screen and (min-width: ${bp.tablet + 1}px)`,
	// Special
	[MEDIA.DESKTOP_WIDE]: `@media screen and (min-width: ${bp.desktop}px)`,
	[MEDIA.DESKTOP_NARROW]: `@media screen and (min-width: ${bp.tablet + 1}px) and (max-width: ${bp.desktop}px)`,
	[MEDIA.NOT_DESKTOP]: `@media screen and (max-width: ${bp.tablet}px)`,
}

export const useCurrentMedia = (): CommonMediaVariant | undefined => {
	const MOBILE = useMediaLayout(mediaQueries[MEDIA.MOBILE].substring(7))
	const TABLET = useMediaLayout(mediaQueries[MEDIA.TABLET].substring(7))
	const DESKTOP_WIDE = useMediaLayout(mediaQueries[MEDIA.DESKTOP_WIDE].substring(7))
	const DESKTOP_NARROW = useMediaLayout(mediaQueries[MEDIA.DESKTOP_NARROW].substring(7))

	const rules: {
		[key in CommonMediaVariant]: boolean
	} = {
		MOBILE,
		TABLET,
		DESKTOP_NARROW,
		DESKTOP_WIDE,
	}
	return (Object.keys(rules) as CommonMediaVariant[]).filter(k => rules[k])[0]
}
