import { render, screen, within, fireEvent, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from '@emotion/react'

import { theme } from 'app/ui-kit/theme'

import { FeedbackForm } from './FeedbackForm'

jest.setTimeout(10_000)

describe('FeedbackForm', () => {
	it('successfully submits review', async () => {
		const onSubmit = jest.fn()
		render(
			<ThemeProvider theme={theme}>
				<FeedbackForm onSubmit={onSubmit} />
			</ThemeProvider>,
		)

		// submit
		const form = await screen.findByLabelText('Feedback form')
		act(() => {
			fireEvent.input(within(form).getByPlaceholderText('Name *'), {
				target: { value: 'Max' },
			})
			fireEvent.input(within(form).getByPlaceholderText('Email *'), {
				target: { value: 'max@gmail.com' },
			})
			fireEvent.input(within(form).getByPlaceholderText(/eave your message here/), {
				target: { value: 'message' },
			})
			userEvent.click(within(form).getAllByLabelText('Rating star')[0])
			userEvent.click(within(form).getByText('Submit feedback'))
			fireEvent.submit(form)
		})

		await waitFor(() => {
			expect(onSubmit).toHaveBeenCalledTimes(1)
			expect(onSubmit).toHaveBeenCalledWith(
				expect.objectContaining({
					userName: 'Max',
					email: 'max@gmail.com',
					comment: 'message',
					rating: 1,
				}),
			)
		})
	})
})
