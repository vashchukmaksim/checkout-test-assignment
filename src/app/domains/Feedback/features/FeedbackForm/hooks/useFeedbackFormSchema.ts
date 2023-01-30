import * as z from 'zod'
import { useTranslation } from 'react-i18next'

import type { FeedbackMessage } from 'app/domains/Feedback'

export const useFeedbackFormSchema = (): z.ZodSchema<Omit<FeedbackMessage, 'createdAt'>, z.ZodTypeDef, unknown> => {
	const { t } = useTranslation()
	return z.object({
		comment: z.string({
			required_error: t('errors:feedback.message.errorRequired', 'Message is required'),
		}),
		email: z
			.string({
				required_error: t('errors:feedback.email.errorRequired', 'Email is required'),
			})
			.email({ message: t('errors:feedback.email.errorInvalid', 'Invalid email') }),
		userName: z
			.string({
				required_error: t('errors:feedback.name.errorRequired', 'Name is required'),
			})
			.max(80, {
				message: t('errors:feedback.name.errorLength', 'Too long name ({{count}} characters max)', {
					count: 80,
				}),
			}),
		rating: z
			.number({
				required_error: t('errors:feedback.rating.errorRequired', 'Rating is required'),
			})
			.min(1)
			.max(5),
	})
}
