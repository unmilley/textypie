/**
{
    "name":"Markdown Quote",
    "description":"Adds > to the start of every line of your text.",
    "author":"Dan2552",
    "icon":"bx:bxs-quote-left",
    "tags":"quote,markdown"
}
**/

export function main(input) {
	input = input
		.split('\n')
		.map((line) => '> ' + line)
		.join('\n')
	return { data: input }
}
