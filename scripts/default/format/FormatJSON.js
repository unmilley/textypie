/**
	{
		"name":"Format JSON",
		"description":"Cleans and format JSON documents.",
		"author":"Milley",
		"icon":"ph:broom",
		"tags":"json,prettify,clean,indent"
	}
**/

import vkBeautify from 'https://cdn.jsdelivr.net/npm/vkbeautify@0.99.3/+esm'

export function main(input) {
	try {
		input = vkBeautify.json(input, 2)
		return { data: input }
	} catch (error) {
		return { error: 'Invalid JSON' }
	}
}
