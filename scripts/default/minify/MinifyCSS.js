/**
	{
		"name":"Minify CSS",
		"description":"Cleans and minifies CSS stylesheets.",
		"author":"Ivan",
		"icon":"ph:broom",
		"tags":"css,minify,clean,indent"
	}
**/

import vkBeautify from 'https://cdn.jsdelivr.net/npm/vkbeautify@0.99.3/+esm'

export function main(input) {
	input = vkBeautify.cssmin(input)
	return { data: input }
}
