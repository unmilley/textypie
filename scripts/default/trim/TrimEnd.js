/**
	{
		"name":"Trim End",
		"description":"Trims trailing whitespace.",
		"author":"Joshua Nozzi",
		"icon":"ph:scissors",
		"tags":"trim,end,right,trailing,whitespace,empty,space"
	}
**/

export function main(input) {
	input = input.trimEnd()
	return { data: input }
}
