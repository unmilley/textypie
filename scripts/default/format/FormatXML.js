/**
	{
		"name":"Format XML",
		"description":"Cleans and format XML/HTML documents.",
		"author":"Ivan",
		"icon":"ph:broom",
		"tags":"html,prettify,clean,indent"
	}
**/

import vkBeautify from 'https://cdn.jsdelivr.net/npm/vkbeautify@0.99.3/+esm'

export function main(input) {
	input = vkBeautify.xml(input)
	return { data: input }
}
