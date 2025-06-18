/**
	{
		"name":"ASCII To Hex",
		"description":"Converts ASCII characters to hexadecimal codes.",
		"author":"aWZHY0yQH81uOYvH",
		"icon":"fluent:convert-range-20-regular",
		"tags":"ascii,hex,convert"
	}
**/

export function main(input) {
	try {
		let buf = ''
		for (i = 0; i < input.length; i++) {
			let code = input.charCodeAt(i).toString(16)
			if (code.length < 2) buf += '0'
			buf += code
		}
		return { data: buf.toUpperCase() }
	} catch (error) {
		return { error: error.message }
	}
}
