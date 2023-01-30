import { createBrowserRouter, Navigate } from 'react-router-dom'

import { SWWErrorScene } from 'app/domains/Error/scenes/SWWErrorScene'
import { DataManager } from 'app/domains/Feedback/features/DataManager'
import { FeedbackFormScene, FeedbackResultsScene } from 'app/domains/Feedback/scenes'

import { config } from './config'

export const router = createBrowserRouter([
	{
		path: config.routes.index,
		element: <DataManager />,
		children: [
			{
				path: config.routes.index,
				element: <FeedbackFormScene />,
				errorElement: <SWWErrorScene />,
			},
			{
				path: config.routes.results,
				element: <FeedbackResultsScene />,
				errorElement: <SWWErrorScene />,
			},
		],
	},
	{
		path: '*',
		element: <Navigate to="/" />,
	},
])
