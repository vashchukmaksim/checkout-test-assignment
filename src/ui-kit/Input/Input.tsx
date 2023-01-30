import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useMemo } from 'react'
import shouldForwardProp from '@styled-system/should-forward-prop'
import { space, width, compose } from 'styled-system'
import type { SpaceProps, WidthProps } from 'styled-system'

import { notReachable } from 'app/utils/notReachable'

import { Box } from '../Box'
import { Flex } from '../Flex'
import { Text } from '../Text'
import type { Theme } from '../theme'

export type UIInputElement = HTMLInputElement | HTMLTextAreaElement

type StyledProps = SpaceProps & {
	state: 'disabled' | 'normal' | 'error'
}

type InputNativeProps = {
	id?: string
	name: string

	error?: string
	defaultValue?: string
	placeholder?: string

	onChange?: (value: string) => void
	onBlur?: (e: React.FormEvent<UIInputElement>) => void
	onFocus?: (e: React.FormEvent<UIInputElement>) => void
	onKeyDown?: (e: React.FormEvent<UIInputElement>) => void
}

type Props = StyledProps &
	WidthProps &
	InputNativeProps & {
		multiline?: boolean
		icon?: JSX.Element
		className?: string
	}

const StyledInputContainer = styled('div', { shouldForwardProp })<{ state: StyledProps['state']; multiline: boolean }>`
	display: flex;
	align-items: center;

	box-sizing: border-box;

	padding: ${({ theme }) => `${theme.space[3]} ${theme.space[4]}`};
	border-radius: ${({ theme }) => theme.radii.small};

	${({ theme, state }) => {
		switch (state) {
			case 'error':
				return css`
					border: 1px solid ${theme.colors.red_100};
					background: ${theme.colors.red_100}14;
				`
			case 'normal':
				return css`
					border: 1px solid ${theme.colors.blue_20};
					background: ${theme.colors.white_100};
				`
			case 'disabled':
				return css`
					border: 1px solid ${theme.colors.blue_20};
					background: ${theme.colors.blue_10};
				`
			default:
				return notReachable(state)
		}
	}}

	transition: background 250ms ease-in-out;

	> textarea {
		height: 100%;
		min-height: 180px;
		resize: none;
	}

	${compose(width, space)}
`

const placeholderColor = ({ theme, state }: { theme: Theme; state: Props['state'] }): string => {
	return state === 'error' ? theme.colors.red_100 : theme.colors.blue_40
}

const StyledInput = styled.input<StyledProps>`
	border: none;
	outline: none;
	overflow: hidden;

	width: 100%;

	background: none;
	transition: color 250ms ease-in-out, background 250ms ease-in-out;

	${({ state, theme }) => {
		switch (state) {
			case 'disabled':
				return css`
					color: ${theme.colors.blue_40};
				`
			case 'error':
				return css`
					color: ${theme.colors.red_100};
				`
			case 'normal':
			default:
				return css`
					color: ${theme.colors.black_80};
				`
		}
	}}

	&::-webkit-input-placeholder {
		color: ${placeholderColor};
		transition: color 250ms ease-in-out;
	}

	&:-moz-placeholder {
		color: ${placeholderColor};
		transition: color 250ms ease-in-out;
	}

	&::-moz-placeholder {
		color: ${placeholderColor};
		transition: color 250ms ease-in-out;
	}

	&:-ms-input-placeholder {
		color: ${placeholderColor};
		transition: color 250ms ease-in-out;
	}
`

export const Input = React.forwardRef<HTMLInputElement, Props>(function Input(
	{
		placeholder,
		id,
		name,
		icon,
		width,
		error,
		state = 'normal',
		multiline = false,
		className = '',
		onKeyDown,
		...props
	},
	ref,
) {
	const onBlur = (e: React.FormEvent<UIInputElement>) => {
		props.onBlur?.(e)
	}

	const onFocus = (e: React.FormEvent<UIInputElement>) => {
		props.onBlur?.(e)
		props.onFocus?.(e)
	}

	const onChangeValue = (v: string) => {
		props.onChange?.(v)
	}

	const onChange = (e: React.FormEvent<UIInputElement>) => {
		const value = (e.target as UIInputElement).value
		onChangeValue(value)
	}

	const nativeInputProps = useMemo(
		() => ({
			id: id || name,
			name,
			type: 'text',
			placeholder,
			defaultValue: props.defaultValue,
			disabled: state === 'disabled',
			autoComplete: 'off',
			readOnly: false,
			as: multiline ? ('textarea' as const) : ('input' as const),
		}),
		[props],
	)

	const styledProps = {
		multiline,
		className,
		state,
		width,
	}

	return (
		<Box height={multiline ? '230px' : '64px'}>
			<StyledInputContainer {...styledProps} key={props.defaultValue}>
				{icon ? (
					<Flex mr={2} alignItems="center">
						{icon}
					</Flex>
				) : null}
				<StyledInput
					ref={ref}
					state={state}
					onChange={onChange}
					onFocus={onFocus}
					onBlur={onBlur}
					onKeyDown={onKeyDown}
					{...nativeInputProps}
				/>
			</StyledInputContainer>
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
