/**
	{
		"name":"Join Lines With Comma",
		"description":"Joins all lines with a comma.",
		"author":"riesentoaster",
		"icon":"bx:collapse-alt",
		"tags":"join, comma"
	}
**/

export function main(input) {
	input = input.replace(/\n/g, ',')
	return { data: input }
}
