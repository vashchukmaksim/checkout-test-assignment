import type { Icon } from 'react-feather'
import type { FieldError } from 'react-hook-form'

import type { Theme } from 'app/ui-kit/theme'

// this helper function manages all the props for an Input component
// that change their values between "normal" and "error" states
export const useFieldErrorProps = <T extends Record<string, unknown>>({
	theme,
	errors,
	clearErrors,
}: {
	theme: Theme
	errors: Partial<Record<keyof T, FieldError | undefined>>
	clearErrors: (name: keyof T) => void
}) => {
	const getFieldErrorProps = <N extends keyof T>(
		name: N,
		icon?: Icon,
		onFocus?: () => void,
	): { state: 'normal' | 'error'; onFocus?: () => void; error?: string; icon?: JSX.Element } => {
		const Ico = icon
		return errors[name]
			? {
					state: 'error',
					error: errors[name]?.message,
					icon: Ico && <Ico size={16} strokeWidth={2} color={theme.colors.red_100} />,
					onFocus: () => {
						clearErrors(name)
						onFocus?.()
					},
			  }
			: {
					state: 'normal',
					icon: Ico && <Ico size={16} strokeWidth={2} color={theme.colors.blue_40} />,
					onFocus,
			  }
	}

	return { getFieldErrorProps }
}
