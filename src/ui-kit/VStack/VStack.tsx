import React from 'react'
import styled from '@emotion/styled'
import shouldForwardProp from '@styled-system/should-forward-prop'

import { Flex } from '../Flex'

type Props = Omit<React.ComponentProps<typeof Flex>, 'children'> & {
	space: number
	children: React.ReactNode[] | React.ReactNode | null
}

const FlexChildren = styled(Flex, { shouldForwardProp })<{ space: number }>`
	flex-direction: column;

	> *:not(:last-child) {
		margin-bottom: ${({ theme, space }) => theme.space[space]};
	}
`

export const VStack = ({ space, children, ...flexProps }: Props) => (
	<FlexChildren space={space} {...flexProps}>
		{children}
	</FlexChildren>
)
