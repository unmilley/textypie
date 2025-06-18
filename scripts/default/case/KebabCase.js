/**
	{
		"name":"Kebab Case",
		"description":"converts-your-text-to-kebab-case.",
		"author":"Ivan",
		"icon":"lucide-lab:case-kebab",
		"tags":"kebab,case,function,lodash"
	}
**/

import kebabCase from 'https://cdn.jsdelivr.net/npm/lodash.kebabcase@4.1.1/+esm'

export function main(input) {
	input = kebabCase(input)
	return { data: input }
}
