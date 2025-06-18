/**
	{
		"name":"Format SQL",
		"description":"Cleans and format SQL queries.",
		"author":"Ivan",
		"icon":"ph:broom",
		"tags":"mysql,sql,prettify,clean,indent"
	}
**/

import vkBeautify from 'https://cdn.jsdelivr.net/npm/vkbeautify@0.99.3/+esm'

export function main(input) {
	input = vkBeautify.sql(input)
	return { data: input }
}
