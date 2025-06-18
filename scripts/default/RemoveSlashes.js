/**
	{
		"name":"Remove Slashes",
		"description":"Unescapes your text.",
		"author":"Ivan",
		"icon":"bx:bxs-quote-left",
		"tags":"strip,slashes,remove,unescape"
	}
**/

export function main(input) {
	input = (input + '').replace(/\\(.?)/g, function (s, n1) {
		switch (n1) {
			case '\\':
				return '\\'
			case '0':
				return '\u0000'
			case '':
				return ''
			default:
				return n1
		}
	})
	return { data: input }
}
