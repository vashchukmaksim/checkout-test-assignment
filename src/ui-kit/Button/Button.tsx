import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { space } from 'styled-system'
import shouldForwardProp from '@styled-system/should-forward-prop'
import type { SpaceProps } from 'styled-system'

import { notReachable } from 'app/utils/notReachable'

type Props = SpaceProps & {
	variant: 'primary' | 'secondary'
	isFullWidth?: boolean
}

export const Button = styled('button', { shouldForwardProp })<Props>`
	display: flex;
	align-items: center;
	justify-content: center;

	padding: ${({ theme }) => `${theme.space[3]} ${theme.space[5]}`};
	width: ${({ isFullWidth }) => (isFullWidth ? '100%' : 'auto')};
	height: 46px;

	border: none;
	border-radius: ${({ theme }) => theme.radii.small};
	cursor: pointer;

	font-weight: 600;

	${space}

	${({ variant, theme }) => {
		switch (variant) {
			case 'primary':
				return css`
					color: ${theme.colors.black_80};
					background: ${theme.colors.yellow_100};
				`
			case 'secondary':
				return css`
					color: ${theme.colors.black_80};
					background: ${theme.colors.blue_20};
				`
			default:
				return notReachable(variant)
		}
	}}
`
