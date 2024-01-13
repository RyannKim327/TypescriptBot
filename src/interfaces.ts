export interface commands {
	script: string
	name: string
	description: string
	command?: string
	hint?: string
	queries?: string[]
	type?: string[]
	adminCommand?: boolean
}