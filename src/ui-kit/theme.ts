const colors = {
	black_80: '#2a2a2a',
	white_100: '#ffffff',
	blue_10: '#f7f9ff',
	blue_20: '#dfe6f2',
	yellow_100: '#ffea00',
	red_100: '#ff7070',
	blue_40: '#8298bd',
	green_100: '#3ea31a',
}

const borders = {
	big: '24px',
	small: '8px',
}

const space = ['0px', '4px', '8px', '12px', '16px', '24px', '32px', '44px', '64px'] as const

export type Theme = {
	colors: Record<keyof typeof colors, string>
	radii: Record<keyof typeof borders, string>
	space: Readonly<(typeof space)[number][]>
}

export const theme: Theme = {
	space,
	colors,
	radii: borders,
}
