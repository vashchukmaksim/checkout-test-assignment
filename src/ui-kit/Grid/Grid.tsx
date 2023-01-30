import styled from '@emotion/styled'

type Props = {
	gap: number
	minColumnWidth: string
}

export const Grid = styled.section<Props>`
	position: relative;
	width: 100%;

	display: grid;
	grid-gap: ${({ theme, gap }) => theme.space[gap]};
	grid-template-columns: ${({ minColumnWidth }) => `repeat(auto-fit, minmax(${minColumnWidth}, 1fr))`};
`
