export interface commands {
	script: string
	name: string
	description: string
	command?: string
	queries?: string[]
	adminCommand?: boolean
}