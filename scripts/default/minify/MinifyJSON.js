/**
	{
		"name":"Minify JSON",
		"description":"Cleans and minifies JSON documents.",
		"author":"Ivan",
		"icon":"ph:broom",
		"tags":"html,minify,clean,indent"
	}
**/

import vkBeautify from 'https://cdn.jsdelivr.net/npm/vkbeautify@0.99.3/+esm'

export function main(input) {
	input = vkBeautify.jsonmin(input)
	return { data: input }
}
