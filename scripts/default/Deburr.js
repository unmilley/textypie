/**
	{
		"name":"Deburr",
		"description":"Converts your text to basic latin characters.",
		"author":"Ivan",
		"icon":"hugeicons:colosseum",
		"tags":"burr,special,characters,function,lodash"
	}
**/

import deburr from 'https://cdn.jsdelivr.net/npm/lodash.deburr@4.1.0/+esm'

export function main(input) {
	input = deburr(input)
	return { data: input }
}
