import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import * as Icons from 'react-feather'

import { Box } from 'app/ui-kit'
import { notReachable } from 'app/utils/notReachable'

type Props = {
	rate: number
	visibility?: 'highlighted' | 'default'
	onClick: (rate: number) => void
	onHover: (rate: number) => void
}

const iconProps = {
	size: '100%',
	strokeWidth: 2.5,
}

const Container = styled(Box)`
	width: 24px;
	height: 24px;

	transition: transform 250ms ease-in-out;

	&:hover {
		transform: scale(1.3);
	}
`

export const Star = ({ rate, visibility = 'default', onHover, onClick }: Props) => {
	const theme = useTheme()
	return (
		<Container
			aria-label="Rating star"
			data-testid={`rating-star-${visibility}`}
			onClick={() => onClick(rate)}
			onMouseOver={() => onHover(rate)}
		>
			{(() => {
				switch (visibility) {
					case 'default':
						return <Icons.Star {...iconProps} fill={theme.colors.blue_40} color={theme.colors.blue_40} />
					case 'highlighted':
						return (
							<Icons.Star {...iconProps} fill={theme.colors.yellow_100} color={theme.colors.yellow_100} />
						)
					default:
						return notReachable(visibility)
				}
			})()}
		</Container>
	)
}
