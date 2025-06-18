/**
	{
		"name":"Minify XML",
		"description":"Cleans and minifies XML/HTML documents.",
		"author":"Ivan",
		"icon":"ph:broom",
		"tags":"html,minify,clean,indent"
	}
**/

import vkBeautify from 'https://cdn.jsdelivr.net/npm/vkbeautify@0.99.3/+esm'

export function main(input) {
	input = vkBeautify.xmlmin(input)
	return { data: input }
}
