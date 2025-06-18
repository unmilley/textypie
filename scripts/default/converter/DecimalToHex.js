/**
 {
   "name": "Decimal to Hex",
   "description": "Converts decimal values to hexadecimal.",
   "author": "Maurice",
   "icon": "fluent:convert-range-20-regular",
   "tags": "decimal,hexadecimal,dec,hex"
 }
 **/

export function main(input) {
	var text = input
	var lines = text.split(/\n/)
	var result = ''

	for (const index in lines) {
		var text = lines[index].trim()

		if (isNaN(text)) {
			result += text
		} else {
			result += parseInt(text).toString(16).toUpperCase()
		}

		result += '\n'
	}

	input = result.trim()
	return { data: input }
}
