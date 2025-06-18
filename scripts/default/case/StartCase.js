/**
	{
		"name":"Start Case",
		"description":"Converts Your Text To Start Case.",
		"author":"Ivan",
		"icon":"lucide-lab:case-snake-upper",
		"tags":"start,case,function,lodash"
	}
**/

import startCase from 'https://cdn.jsdelivr.net/npm/lodash.startcase@4.4.0/+esm'

export function main(input) {
	input = startCase(input)
	return { data: input }
}
