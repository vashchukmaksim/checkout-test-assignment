import { useNavigate } from 'react-router-dom'

import { config } from 'app/config'
import { Flex, ErrorWidget } from 'app/ui-kit'

export const SWWErrorScene = () => {
	const navigate = useNavigate()
	const onClick = () => {
		navigate(config.routes.index)
	}

	return (
		<Flex alignItems="center" justifyContent="center" height="100vh" width="100%">
			<ErrorWidget onReset={onClick} />
		</Flex>
	)
}
