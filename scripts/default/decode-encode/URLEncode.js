/**
	{
		"name":"URL Encode",
		"description":"Encodes URL entities in your text.",
		"author":"Ivan",
		"icon":"bx:link",
		"tags":"url,encode,convert"
	}
**/

export function main(input) {
	input = encodeURIComponent(input)
	return { data: input }
}
