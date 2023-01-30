import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { color } from 'styled-system'
import shouldForwardProp from '@styled-system/should-forward-prop'

import { mediaQueries, MEDIA } from 'app/ui-kit/media'
import { notReachable } from 'app/utils/notReachable'
import type { Theme } from 'app/ui-kit/theme'

type HeadingHTMLTags = 'h1' | 'h2'
export type Props = {
	h: 1 | 2
	color?: keyof Theme['colors']
	children: string
}

const HeadingComponent = styled('span', { shouldForwardProp })<Props>`
	font-weight: 600;
	white-space: pre-line;
	${color}

	${({ h }) => {
		switch (h) {
			case 1:
				return css`
					font-size: 36px;
					letter-spacing: -1px;
				`
			case 2:
				return css`
					font-size: 28;
					letter-spacing: -0.6px;
				`
			default:
				return notReachable(h)
		}
	}}

	${mediaQueries[MEDIA.TABLET]} {
		${({ h }) => {
			switch (h) {
				case 1:
					return css`
						font-size: 28px;
						letter-spacing: -1px;
					`
				case 2:
					return css`
						font-size: 24;
						letter-spacing: -0.6px;
					`
				default:
					return notReachable(h)
			}
		}}
	}

	${mediaQueries[MEDIA.MOBILE]} {
		${({ h }) => {
			switch (h) {
				case 1:
					return css`
						font-size: 28px;
						letter-spacing: -1px;
					`
				case 2:
					return css`
						font-size: 24;
						letter-spacing: -0.6px;
					`
				default:
					return notReachable(h)
			}
		}}
	}
`

export const Heading = (props: Props) => {
	const { h, children, color = 'black_80' } = props
	return (
		<HeadingComponent as={`h${h}` as HeadingHTMLTags} h={h} color={color}>
			{children}
		</HeadingComponent>
	)
}
