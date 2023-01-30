import { useTranslation } from 'react-i18next'
import { useTheme } from '@emotion/react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Icons from 'react-feather'

import { VStack, Grid, Input, Button } from 'app/ui-kit'
import type { FeedbackMessage } from 'app/domains/Feedback'

import { Rating } from './components'
import { useFeedbackFormSchema, useFieldErrorProps } from './hooks'

export const FeedbackForm = ({ onSubmit }: { onSubmit: (review: FeedbackMessage) => void }) => {
	const { t } = useTranslation()

	const theme = useTheme()
	const schema = useFeedbackFormSchema()

	const {
		control,
		handleSubmit,
		clearErrors,
		formState: { errors },
	} = useForm<Omit<FeedbackMessage, 'createdAt'>>({
		resolver: zodResolver(schema),
	})

	const { getFieldErrorProps } = useFieldErrorProps({ theme, errors, clearErrors })

	return (
		<Grid gap={5} as="form" aria-label="Feedback form" minColumnWidth="300px">
			<VStack space={3} flexDirection="column">
				<Controller
					name="userName"
					control={control}
					render={({ field }) => (
						<Input
							placeholder={t('content:feedback.name.placeholder', 'Name *')}
							{...getFieldErrorProps(field.name, Icons.User)}
							{...field}
						/>
					)}
				/>
				<Controller
					name="email"
					control={control}
					render={({ field }) => (
						<Input
							placeholder={t('content:feedback.email.placeholder', 'Email *')}
							{...getFieldErrorProps(field.name, Icons.Mail)}
							{...field}
						/>
					)}
				/>
				<Controller
					name="rating"
					control={control}
					render={({ field }) => (
						<Rating
							label={t('content:feedback.rating.label', 'Rate us: *')}
							error={errors[field.name]?.message}
							{...field}
						/>
					)}
				/>
			</VStack>
			<Controller
				name="comment"
				control={control}
				render={({ field }) => (
					<Input
						multiline
						placeholder={t('content:feedback.comment.placeholder', 'Please leave your message here *')}
						{...getFieldErrorProps(field.name)}
						{...field}
					/>
				)}
			/>

			{/* empty span for easy positioning of a submit button in a grid */}
			<span />

			<Button
				type="submit"
				variant="primary"
				onClick={e => {
					e.preventDefault()
					handleSubmit(data => onSubmit({ ...data, createdAt: new Date().getTime() }))()
						.then(() => null)
						.catch(console.error)
				}}
			>
				{t('content:feedback.submit.label', 'Submit feedback')}
			</Button>
		</Grid>
	)
}
