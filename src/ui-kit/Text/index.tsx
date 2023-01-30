import { notReachable } from 'app/utils/notReachable'

import { Label } from './Label'
import { Heading } from './Heading'
import { Paragraph } from './Paragraph'
import type { Props as PropsLabel } from './Label'
import type { Props as PropsHeading } from './Heading'
import type { Props as PropsParagraph } from './Paragraph'

type Props = { children: string } & (
	| ({ variant: 'label' } & PropsLabel)
	| ({ variant: 'heading' } & PropsHeading)
	| ({ variant: 'paragraph' } & PropsParagraph)
)

export const Text = ({ children, ...props }: Props) => {
	switch (props.variant) {
		case 'label':
			return <Label {...props}>{children}</Label>
		case 'heading':
			return <Heading {...props}>{children}</Heading>
		case 'paragraph':
			return <Paragraph {...props}>{children}</Paragraph>
		default:
			return notReachable(props)
	}
}
