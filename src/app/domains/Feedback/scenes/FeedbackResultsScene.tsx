import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { config } from 'app/config'
import { Text, Button } from 'app/ui-kit'
import { useDataManager } from 'app/domains/Feedback/features/DataManager'

import { SceneWrapper } from '../components'
import { ReviewsList } from '../features/ReviewsList'
import { ReviewsChart } from '../features/ReviewsChart'

export const FeedbackResultsScene = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const dataManager = useDataManager()

	const onClickBack = () => {
		navigate(config.routes.index, { state: {} })
	}

	return (
		<>
			<Helmet>
				<title>{t('content:scene.title.reviews', 'Customer reviews')}</title>
			</Helmet>

			<SceneWrapper>
				<SceneWrapper.Header>
					<Text variant="heading" h={1}>
						{t('content:reviews.title', 'Customer reviews')}
					</Text>
					<Button variant="secondary" onClick={onClickBack}>
						{t('content:back.action', 'Go back')}
					</Button>
				</SceneWrapper.Header>
				<SceneWrapper.Content>
					<ReviewsChart reviews={dataManager.reviews} />
					<ReviewsList mt={6} reviews={dataManager.reviews} />
				</SceneWrapper.Content>
			</SceneWrapper>
		</>
	)
}
