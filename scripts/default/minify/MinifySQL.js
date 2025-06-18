/**
	{
		"name":"Minify SQL",
		"description":"Cleans and minifies SQL queries.",
		"author":"Ivan",
		"icon":"ph:broom",
		"tags":"mysql,sql,minify,clean,indent"
	}
**/

import vkBeautify from 'https://cdn.jsdelivr.net/npm/vkbeautify@0.99.3/+esm'

export function main(input) {
	input = vkBeautify.sqlmin(input)
	return { data: input }
}
