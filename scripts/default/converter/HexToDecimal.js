/**
 {
   "name": "Hex to Dec",
   "description": "Converts hexadecimal to decimal.",
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
		var decimal = parseInt(text, 16)

		if (isNaN(decimal)) {
			result += text
		} else {
			result += decimal
		}

		result += '\n'
	}

	input = result.trim()
	return { data: input }
}
