/**
	{
		"name":"Camel Case",
		"description":"convertsYourTextToCamelCase",
		"author":"Ivan",
		"icon":"lucide-lab:case-camel",
		"tags":"camel,case,function,lodash"
	}
**/

import camelCase from 'https://cdn.jsdelivr.net/npm/lodash.camelcase@4.3.0/+esm'

export function main(input) {
	input = camelCase(input)
	return { data: input }
}
