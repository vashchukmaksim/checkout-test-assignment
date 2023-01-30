import styled from '@emotion/styled'
import { useTranslation } from 'react-i18next'
import type { SpaceProps } from 'styled-system'

import { Box, Text, VStack } from 'app/ui-kit'
import { mediaQueries, MEDIA } from 'app/ui-kit/media'
import type { FeedbackMessage } from 'app/domains/Feedback'

import { NoReviewsPlaceholder, ReviewListItem } from './components'

type Props = SpaceProps & {
	reviews: FeedbackMessage[]
}

const ScrollableContainer = styled(VStack)`
	max-height: calc(100vh - 500px);
	overflow: hidden;
	overflow-y: scroll;

	${mediaQueries[MEDIA.MOBILE]} {
		max-height: calc(100vh - 320px);
	}
`

export const ReviewsList = ({ reviews, ...spaceProps }: Props) => {
	const { t } = useTranslation()
	return (
		<Box {...spaceProps}>
			<Text variant="heading" h={2}>
				{t('content:latestReviews.title', 'Latest reviews')}
			</Text>
			{reviews.length === 0 ? (
				<Box mt={5}>
					<NoReviewsPlaceholder />
				</Box>
			) : (
				<ScrollableContainer mt={5} space={3}>
					{reviews
						.sort((a, b) => b.createdAt - a.createdAt)
						.map(review => (
							<ReviewListItem key={review.createdAt} review={review} />
						))}
				</ScrollableContainer>
			)}
		</Box>
	)
}
