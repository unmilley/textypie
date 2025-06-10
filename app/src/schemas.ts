import { z, type infer } from 'zod/v4-mini'

export const ConfigSchema = z.object({
	name: z.string(),
	description: z._default(z.string(), '-'),
	author: z._default(z.string(), ''),
	icon: z._default(z.string(), 'bx:question-mark'),
	tags: z.string(),
	filename: z._default(z.string(), ''),
})

export type { infer as zInfer }
