/**
{
    "name":"Remove Duplicate Lines",
    "description":"Ensures each line of your text is unique.",
    "author":"andipaetzold",
    "icon":"bx:filter",
    "tags":"unique,duplicate"
}
**/

export function main(input) {
	let lines = input.split('\n')
	let out = unique(lines)

	input = out.join('\n')
	return { data: input, info: `${lines.length - out.length} lines removed` }
}

function unique(array) {
	return [...new Set(array)]
}
