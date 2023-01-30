import React from 'react'
import styled from '@emotion/styled'

import { Box, Flex } from 'app/ui-kit'
import { mediaQueries, MEDIA } from 'app/ui-kit/media'

const Background = styled(Flex)`
	background-image: radial-gradient(#a3a3a3 0.5px, #ffffff 0.5px);
	background-size: 20px 20px;
	background-color: #ffffff;
`

const BoxWithBorder = styled(Box)`
	width: 100%;
	max-width: 1000px;
	margin: ${({ theme }) => `0 ${theme.space[5]} 0 ${theme.space[5]}`};

	border: 1px solid ${({ theme }) => theme.colors.blue_20};
	border-radius: ${({ theme }) => theme.radii.big};

	/* on mobile we want to save some screen space for a user by removing extra margins and border radius */
	${mediaQueries[MEDIA.MOBILE]} {
		margin: 0;
		height: 100%;
		border-radius: 0;
	}
`

const Wrapper = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => (
	<Background alignItems="center" justifyContent="center" height="100vh">
		<BoxWithBorder p={6} bg="blue_10">
			{children}
		</BoxWithBorder>
	</Background>
)

const Header = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => (
	<Flex as="header" flexWrap="wrap" alignItems="center" justifyContent="space-between" gap={4} mb={6}>
		{children}
	</Flex>
)

const Content = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => <Box>{children}</Box>

export const SceneWrapper = Object.assign(Wrapper, {
	Header,
	Content,
})
