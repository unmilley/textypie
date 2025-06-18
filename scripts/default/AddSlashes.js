/**
	{
		"name":"Add Slashes",
		"description":"Escapes your text.",
		"author":"Ivan",
		"icon":"bx:bxs-quote-left",
		"tags":"add,slashes,escape"
	}
**/

export function main(input) {
	input = (input + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0')

	return { data: input }
}
