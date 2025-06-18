/**
	{
		"name":"Join Lines",
		"description":"Joins all lines without any delimiter.",
		"author":"riesentoaster",
		"icon":"bx:collapse-alt",
		"tags":"join"
	}
**/

export function main(input) {
	input = input.replace(/\n/g, '')
	return { data: input }
}
