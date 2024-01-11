export interface commands {
	script: string
	name: string
	description: string
	command?: string
	queries?: string[]
	type?: string[]
	adminCommand?: boolean
}