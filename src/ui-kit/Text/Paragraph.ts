import styled from '@emotion/styled'
import { color } from 'styled-system'
import shouldForwardProp from '@styled-system/should-forward-prop'

import type { Theme } from 'app/ui-kit/theme'

export type Props = {
	color?: keyof Theme['colors']
}

export const Paragraph = styled('p', { shouldForwardProp })<Props>`
	font-weight: 400;
	font-size: 14px;
	line-height: 20px;
	${color}
`
