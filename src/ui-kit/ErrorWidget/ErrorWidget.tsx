import { useTranslation } from 'react-i18next'

import { Box } from '../Box'
import { Text } from '../Text'
import { Flex } from '../Flex'
import { Button } from '../Button'

export const ErrorWidget = ({ onReset }: { onReset: () => void }) => {
	const { t } = useTranslation()
	return (
		<Flex flexDirection="column" alignItems="center" justifyContent="center">
			<Box mb={5}>
				<Text variant="heading" h={1}>
					{t('content:error.title', 'Something went wrong!')}
				</Text>
			</Box>
			<Button variant="primary" onClick={onReset}>
				{t('content:error.action', 'Try again')}
			</Button>
		</Flex>
	)
}
