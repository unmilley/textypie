/**
	{
		"name":"HTML Encode",
		"description":"Encodes HTML entities in your text",
		"author":"See Source",
		"icon":"bx:bxl-html5",
		"tags":"html,encode,web"
	}
**/

import he from 'https://cdn.jsdelivr.net/npm/he@1.2.0/+esm'

export function main(input) {
	input = he.encode(input)
	return { data: input }
}
