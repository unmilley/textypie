/**
 {
   "name": "Decimal to Binary",
   "description": "Converts decimal values to binary.",
   "author": "Maurice",
   "icon": "fluent:convert-range-20-regular",
   "tags": "decimal,binary,dec,bin"
 }
 **/

export function main(input) {
	var text = input
	var lines = text.split(/\n/)
	var result = ''

	for (const index in lines) {
		var text = lines[index].trim()
		var bin = parseInt(text).toString(2).toUpperCase()

		if (isNaN(bin)) {
			result += text
		} else {
			result += bin
		}

		result += '\n'
	}

	input = result.trim()
	return { data: input }
}
