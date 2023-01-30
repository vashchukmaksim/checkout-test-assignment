import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import { useTranslation } from 'react-i18next'
import * as Icons from 'react-feather'

import { Flex, Box, Text } from 'app/ui-kit'

const Wrapper = styled(Flex)`
	background: ${({ theme }) => theme.colors.blue_20};
	border-radius: ${({ theme }) => theme.radii.big};
`

export const NoReviewsPlaceholder = () => {
	const theme = useTheme()
	const { t } = useTranslation()
	return (
		<Wrapper p={5} alignItems="center" justifyContent="center">
			<Box mr={2}>
				<Icons.FileText size={18} strokeWidth={2} color={theme.colors.blue_40} />
			</Box>
			<Text variant="label" color="blue_40" size={14}>
				{t('content:reviews.noItemsPlaceholder', 'No reviews have been submitted yet')}
			</Text>
		</Wrapper>
	)
}
