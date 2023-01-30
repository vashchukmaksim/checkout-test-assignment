import styled from '@emotion/styled'

import { Text, VStack } from 'app/ui-kit'
import type { FeedbackMessage } from 'app/domains/Feedback'

type Props = {
	review: FeedbackMessage
}

const Wrapper = styled(VStack)`
	background: ${({ theme }) => theme.colors.white_100};
	border-radius: ${({ theme }) => theme.radii.small};
`

export const ReviewListItem = ({ review }: Props) => {
	return (
		<Wrapper aria-label="Feedback preview" space={2} py={4} px={5}>
			<Text variant="label" color="blue_40" size={14}>
				{review.email}
			</Text>
			<Text variant="paragraph" color="black_80">
				{review.comment}
			</Text>
		</Wrapper>
	)
}
