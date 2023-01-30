import React, { useState, useEffect } from 'react'

import { Box, HStack, Text } from 'app/ui-kit'

import { Star } from './Star'

type Props = {
	name: string
	label: string
	error?: string
	defaultRating?: number
	onChange: (rating: number) => void
}

export const Rating = React.forwardRef<HTMLInputElement, Props>(function Rating(
	{ name, defaultRating, label, error, onChange },
	ref,
) {
	const [rating, setRating] = useState<number | undefined>(defaultRating)
	const [hoverOn, setHoverOn] = useState<number | undefined>()

	useEffect(() => {
		if (rating) {
			onChange(rating)
		}
	}, [rating, onChange])

	return (
		<Box height="44px" aria-label="Rating">
			<HStack alignItems="center" space={3} onMouseLeave={() => setHoverOn(undefined)}>
				<input name={name} type="hidden" ref={ref} />
				<Text variant="label" color="blue_40" size={16}>
					{label}
				</Text>
				{[...Array(5).keys()].map(index => {
					const starIndex = hoverOn || rating
					return (
						<Star
							key={index}
							rate={index + 1}
							visibility={starIndex && starIndex > index ? 'highlighted' : 'default'}
							onHover={setHoverOn}
							onClick={setRating}
						/>
					)
				})}
			</HStack>
			{error ? (
				<Box mt={1} ml={1}>
					<Text size={12} variant="label" color="red_100">
						{error}
					</Text>
				</Box>
			) : null}
		</Box>
	)
})
