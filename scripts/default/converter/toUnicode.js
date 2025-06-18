/**
  {
    "name":"To Unicode Escaped String",
    "description":"Converts a UTF8 string to unicode escape chars(js format)",
    "author":"luisfontes19",
    "icon":"ph:broom",
    "tags":"string,unicode,convert,escape"
  }
**/

export function main(input) {
	input = toUnicode(input)
	return { data: input }
}

function toUnicode(str) {
	return [...str]
		.map((c) => {
			let hex = c.charCodeAt(0).toString(16)
			if (hex.length == 2) hex = '00' + hex
			return ('\\u' + hex).slice(-7)
		})
		.join('')
}
