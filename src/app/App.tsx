import { RouterProvider } from 'react-router-dom'
import { CacheProvider, ThemeProvider } from '@emotion/react'

import { theme } from 'app/ui-kit/theme'
import { useAppHeight } from 'app/hooks'

import '../resources/styles/base.less'

import { config } from './config'
import { router } from './routes'

export const App = () => {
	useAppHeight()
	return (
		<CacheProvider value={config.emotionCache}>
			<ThemeProvider theme={theme}>
				<RouterProvider router={router} />
			</ThemeProvider>
		</CacheProvider>
	)
}
