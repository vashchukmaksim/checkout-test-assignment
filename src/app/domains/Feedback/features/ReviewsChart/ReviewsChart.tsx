import { useMemo } from 'react'
import { useTheme } from '@emotion/react'
import { BarChart, Bar, ResponsiveContainer, XAxis, LabelList } from 'recharts'

import type { FeedbackMessage } from 'app/domains/Feedback'

type Props = {
	reviews: FeedbackMessage[]
}

const emptyData = {
	1: 0,
	2: 0,
	3: 0,
	4: 0,
	5: 0,
}

export const ReviewsChart = ({ reviews }: Props) => {
	const theme = useTheme()

	const data = useMemo(() => {
		const result = reviews.reduce(
			(groups: Record<number, number>, item: FeedbackMessage) => ({
				...groups,
				[item.rating]: (groups[item.rating] || 0) + 1,
			}),
			{},
		)

		// merge with 0 values to have all possible rating on X axis
		return Object.entries({ ...emptyData, ...result }).map(([rating, count]) => ({ rating, count }))
	}, [reviews])

	return (
		<ResponsiveContainer width="99%" aspect={5}>
			<BarChart width={150} height={40} data={data}>
				<Bar dataKey="count" fill={theme.colors.yellow_100}>
					<LabelList dataKey="name" />
				</Bar>
				<XAxis dataKey="rating" tickLine={false} tickFormatter={(label: string) => `${label}★`} />
			</BarChart>
		</ResponsiveContainer>
	)
}
