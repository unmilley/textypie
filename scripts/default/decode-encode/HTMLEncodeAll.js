/**
{
    "name":"HTML Encode all characters",
    "description":"HTML Encodes every character in your text",
    "author":"Ivan",
    "icon":"bx:bxl-html5",
    "tags":"html,encode,web,email"
}
**/

export function main(input) {
	let str = input
	var out = ''
	for (var i = 0; i < str.length; i++) {
		out += `&#${str.charCodeAt(i)};`
	}
	input = out
	return { data: input }
}
