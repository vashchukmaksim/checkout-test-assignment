import styled from '@emotion/styled'
import { color } from 'styled-system'
import shouldForwardProp from '@styled-system/should-forward-prop'

import type { Theme } from 'app/ui-kit/theme'

export type Props = {
	size: 12 | 14 | 16
	color?: keyof Theme['colors']
}

export const Label = styled('span', { shouldForwardProp })<Props>`
	font-weight: 500;
	font-size: ${({ size }) => size}px;
	${color}
`
