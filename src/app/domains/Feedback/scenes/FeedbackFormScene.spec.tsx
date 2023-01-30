import * as router from 'react-router'
import { render, screen, within, fireEvent, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { App } from '../../../App'

jest.setTimeout(20_000)

describe('Feedback form scene', () => {
	const navigate = jest.fn()
	jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)

	beforeEach(() => {
		render(<App />)
	})

	it('shows correct field errors', async () => {
		// try to submit an empty form
		const form = await screen.findByLabelText('Feedback form')
		userEvent.click(within(form).getByText('Submit feedback'))

		// check error messages for "required" errors
		expect(await within(form).findByText('Name is required')).toBeInTheDocument()
		expect(within(form).getByText('Email is required')).toBeInTheDocument()
		expect(within(form).getByText('Rating is required')).toBeInTheDocument()
		expect(within(form).getByText('Message is required')).toBeInTheDocument()

		// try to enter invalid email
		userEvent.type(within(form).getByPlaceholderText('Email *'), 'invalid email')
		expect(await within(form).findByText('Invalid email')).toBeInTheDocument()
	})

	it('submit feedback and go to results', async () => {
		// submit a form
		const form = await screen.findByLabelText('Feedback form')
		act(() => {
			fireEvent.input(within(form).getByPlaceholderText('Name *'), {
				target: { value: 'Max' },
			})
			fireEvent.input(within(form).getByPlaceholderText('Email *'), {
				target: { value: 'max@gmail.com' },
			})
			fireEvent.input(within(form).getByPlaceholderText(/leave your message here/), {
				target: { value: 'message' },
			})
			userEvent.click(within(form).getAllByLabelText('Rating star')[0])
			userEvent.click(within(form).getByText('Submit feedback'))
			fireEvent.submit(form)
		})

		// open list of reviews
		expect(await screen.findByText('Customer reviews')).toBeInTheDocument()

		// find just added review on the top
		expect((await screen.findAllByLabelText('Feedback preview')).length).toBe(8)
		const latestReview = screen.getAllByLabelText('Feedback preview')[0]
		expect(within(latestReview).getByText('max@gmail.com')).toBeInTheDocument()
		expect(within(latestReview).getByText('message')).toBeInTheDocument()

		// go back and see an empty form
		fireEvent.click(screen.getByText('Go back'))
		const emptyForm = await screen.findByLabelText('Feedback form')
		expect(emptyForm).toBeInTheDocument()

		expect(within(emptyForm).getByPlaceholderText('Name *')).toHaveValue('')
		expect(within(emptyForm).getByPlaceholderText('Email *')).toHaveValue('')
		expect(within(emptyForm).getByPlaceholderText(/leave your message here/)).toHaveValue('')
	})
})
