/**
	{
		"name":"URL Decode",
		"description":"Decodes URL entities in your text.",
		"author":"Ivan",
		"icon":"gg:website",
		"tags":"url,decode,convert"
	}
**/

export function main(input) {
	input = decodeURIComponent(input)
	return { data: input }
}
