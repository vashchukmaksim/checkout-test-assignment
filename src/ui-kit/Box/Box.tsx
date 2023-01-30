import styled from '@emotion/styled'
import shouldForwardProp from '@styled-system/should-forward-prop'
import { space, color, layout, compose, borderRadius, overflow, overflowX, overflowY, position } from 'styled-system'
import type { LayoutProps, OverflowProps, BorderRadiusProps, SpaceProps, PositionProps } from 'styled-system'

import type { Theme } from '../theme'

type Props = LayoutProps &
	SpaceProps &
	OverflowProps &
	BorderRadiusProps &
	PositionProps & {
		bg?: keyof Theme['colors'] | string
		width?: string
		height?: string
	}

export const Box = styled('div', { shouldForwardProp })<Props>`
	display: block;
	width: ${({ width }) => width};
	height: ${({ height }) => height};

	${compose(position, layout, space, color, borderRadius, overflow, overflowX, overflowY)}
`
