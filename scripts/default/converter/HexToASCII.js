/**
	{
		"name":"Hex To ASCII",
		"description":"Converts hexadecimal values into ASCII characters",
		"author":"aWZHY0yQH81uOYvH",
		"icon":"fluent:convert-range-20-regular",
		"tags":"hex,ascii,convert"
	}
**/

export function main(input) {
	input = input.toUpperCase()
	buf = ''
	hexBuf = ''
	for (i = 0; i < input.length; i++) {
		c = input.charAt(i)
		if ('0123456789ABCDEF'.includes(c)) {
			hexBuf += c
			if (hexBuf.length >= 2) {
				buf += String.fromCharCode(parseInt(hexBuf, 16))
				hexBuf = ''
			}
		} else if (c != ' ' && c != '\t' && c != '\n' && c != '\r') {
			state.postError('Text is not hex')
			throw 'Not hex'
		}
	}
	input = buf
	return { data: input }
}
