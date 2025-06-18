/**
	{
		"name":"Join Lines With Space",
		"description":"Joins all lines with a space",
		"author":"riesentoaster",
		"icon":"bx:collapse-alt",
		"tags":"join, space"
	}
**/

export function main(input) {
	input = input.replace(/\n/g, ' ')
	return { data: input }
}
