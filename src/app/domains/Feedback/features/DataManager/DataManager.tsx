import { createContext, useState, useContext } from 'react'
import { Outlet } from 'react-router-dom'

import type { FeedbackMessage } from 'app/domains/Feedback'

import { testData } from './data'

type DataManagerContextType = {
	reviews: FeedbackMessage[]
	addReview: (review: FeedbackMessage) => void
}

const DataManagerContext = createContext<DataManagerContextType | null>(null)

export const DataManager = () => {
	const [reviews, setReviews] = useState<FeedbackMessage[]>(testData)

	const addReview = (review: FeedbackMessage) => {
		setReviews(prev => [...prev, review])
	}

	return (
		<DataManagerContext.Provider value={{ reviews, addReview }}>
			<Outlet />
		</DataManagerContext.Provider>
	)
}

export const useDataManager = (): DataManagerContextType => {
	const manager = useContext(DataManagerContext)
	if (!manager) {
		throw Error('useDataManager has to be used within <DataManagerContext.Provider>')
	}
	return manager
}
