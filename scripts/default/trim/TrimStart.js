/**
	{
		"name":"Trim Start",
		"description":"Trims leading whitespace.",
		"author":"Joshua Nozzi",
		"icon":"ph:scissors",
		"tags":"trim,start,left,leading,beginning,whitespace,empty,space"
	}
**/

export function main(input) {
	input = input.trimStart()
	return { data: input }
}
