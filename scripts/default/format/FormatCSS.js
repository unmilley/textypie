/**
	{
		"name":"Format CSS",
		"description":"Cleans and format CSS stylesheets.",
		"author":"Ivan",
		"icon":"ph:broom",
		"tags":"css,prettify,clean,indent"
	}
**/

import vkBeautify from 'https://cdn.jsdelivr.net/npm/vkbeautify@0.99.3/+esm'

export function main(input) {
	input = vkBeautify.css(input)
	return { data: input }
}
