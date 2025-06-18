/**
	{
		"name":"Snake Case",
		"description":"converts_your_text_to_snake_case.",
		"author":"Ivan",
		"icon":"lucide-lab:case-snake-upper",
		"tags":"snake,case,function,lodash"
	}
**/

import snakeCase from 'https://cdn.jsdelivr.net/npm/lodash.snakecase@4.1.1/+esm'

export function main(input) {
	input = snakeCase(input)
	return { data: input }
}
