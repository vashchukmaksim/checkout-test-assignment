import { generateImage } from 'jsdom-screenshot'
import { render, screen, within, fireEvent } from '@testing-library/react'
import { ThemeProvider } from '@emotion/react'

import { theme } from 'app/ui-kit/theme'

import { Rating } from './Rating'

jest.setTimeout(10_000)

describe('Rating', () => {
	it('matches default state snapshot', async () => {
		render(
			<ThemeProvider theme={theme}>
				<Rating name="rating" label="Rating" onChange={jest.fn} />
			</ThemeProvider>,
		)

		const screenshot = await generateImage()
		expect(screenshot).toMatchImageSnapshot()
	})

	it('matches five star state snapshot', async () => {
		render(
			<ThemeProvider theme={theme}>
				<Rating name="rating" label="Rating" defaultRating={5} onChange={jest.fn} />
			</ThemeProvider>,
		)

		const screenshot = await generateImage()
		expect(screenshot).toMatchImageSnapshot()
	})

	it('changes state on clicking a star', async () => {
		render(
			<ThemeProvider theme={theme}>
				<Rating name="rating" label="Rating" defaultRating={3} onChange={jest.fn} />
			</ThemeProvider>,
		)

		// check component and title
		const rating = await screen.findByLabelText('Rating')
		expect(rating).toBeInTheDocument()
		expect(within(rating).getByText('Rating')).toBeInTheDocument()

		// check highlighted starts
		expect(within(rating).getAllByTestId('rating-star-default').length).toBe(2)
		expect(within(rating).getAllByTestId('rating-star-highlighted').length).toBe(3)

		// change rating value to 4
		const forthStart = within(rating).getAllByTestId('rating-star-default')[0]
		fireEvent.click(forthStart)
		expect((await within(rating).findAllByTestId('rating-star-default')).length).toBe(1)
		expect(within(rating).getAllByTestId('rating-star-highlighted').length).toBe(4)
	})

	it('displays error message', async () => {
		render(
			<ThemeProvider theme={theme}>
				<Rating name="rating" label="Rating" error="Rating is required" onChange={jest.fn} />
			</ThemeProvider>,
		)

		const rating = await screen.findByLabelText('Rating')
		expect(rating).toBeInTheDocument()
		expect(within(rating).getByText('Rating is required')).toBeInTheDocument()
	})
})
