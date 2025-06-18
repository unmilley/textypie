/**
	{
		"name":"HTML Decode",
		"description":"Decodes HTML entities in your text",
		"author":"See Source",
		"icon":"bx:bxl-html5",
		"tags":"html,decode,web"
	}
**/

import he from 'https://cdn.jsdelivr.net/npm/he@1.2.0/+esm'

export function main(input) {
	input = he.decode(input)
	return { data: input }
}
