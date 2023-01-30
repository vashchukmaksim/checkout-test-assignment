import styled from '@emotion/styled'
import { css } from '@emotion/react'
import shouldForwardProp from '@styled-system/should-forward-prop'
import { space, width, height, compose, flexDirection, alignItems, justifyContent, flexWrap } from 'styled-system'
import type {
	SpaceProps,
	WidthProps,
	HeightProps,
	FlexWrapProps,
	FlexDirectionProps,
	AlignItemsProps,
	JustifyContentProps,
} from 'styled-system'

type Props = SpaceProps &
	WidthProps &
	HeightProps &
	FlexWrapProps &
	AlignItemsProps &
	FlexDirectionProps &
	JustifyContentProps & {
		gap?: number
	}

export const Flex = styled('div', { shouldForwardProp })<Props>`
	display: flex;

	${compose(flexDirection, alignItems, justifyContent, flexWrap, space, width, height)}
	${({ gap, theme }) =>
		gap
			? css`
					gap: ${theme.space[gap]};
			  `
			: ''}
`
