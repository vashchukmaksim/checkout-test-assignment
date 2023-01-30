import { generateImage } from 'jsdom-screenshot'
import { render } from '@testing-library/react'
import { ThemeProvider } from '@emotion/react'

import { theme } from 'app/ui-kit/theme'
// in real world we don't have that file and should collect mocks in
// a separate place but here I just import it from our data.ts
import { testData as reviewsMock } from 'app/domains/Feedback/features/DataManager/data'

import { ReviewsChart } from './ReviewsChart'

jest.setTimeout(10_000)

// since chart is SVG we just test it with a visual test
describe('ReviewChart', () => {
	it('matches default state snapshot', async () => {
		render(
			<ThemeProvider theme={theme}>
				<ReviewsChart reviews={reviewsMock} />
			</ThemeProvider>,
		)

		const screenshot = await generateImage()
		expect(screenshot).toMatchImageSnapshot()
	})
})
