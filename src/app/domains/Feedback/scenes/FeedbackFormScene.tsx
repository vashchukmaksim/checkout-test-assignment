import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { Text } from 'app/ui-kit'
import { config } from 'app/config'
import { SceneWrapper } from 'app/domains/Feedback/components'
import { FeedbackForm } from 'app/domains/Feedback/features/FeedbackForm'
import { useDataManager } from 'app/domains/Feedback/features/DataManager'
import type { FeedbackMessage } from 'app/domains/Feedback'

export const FeedbackFormScene = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const dataManager = useDataManager()

	const onSubmitFeedback = (review: FeedbackMessage) => {
		dataManager.addReview(review)
		navigate(config.routes.results)
	}

	return (
		<>
			<Helmet>
				<title>{t('content:scene.title.feedbackForm', 'Customer feedback')}</title>
			</Helmet>

			<SceneWrapper>
				<SceneWrapper.Header>
					<Text variant="heading" h={1}>
						{t('content:feedback.title', 'Customer feedback')}
					</Text>
				</SceneWrapper.Header>
				<SceneWrapper.Content>
					<FeedbackForm onSubmit={onSubmitFeedback} />
				</SceneWrapper.Content>
			</SceneWrapper>
		</>
	)
}
