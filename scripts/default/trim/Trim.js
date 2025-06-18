/**
	{
		"name":"Trim",
		"description":"Trims leading and trailing whitespace.",
		"author":"Joshua Nozzi",
		"icon":"ph:scissors",
		"tags":"trim,whitespace,empty,space"
	}
**/

export function main(input) {
	input = input.trim()
	return { data: input }
}
