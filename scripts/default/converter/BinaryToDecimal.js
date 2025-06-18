/**
	{
		"name": "Binary to Decimal",
		"description": "Converts binary values to decimal.",
		"author": "Maurice",
		"icon": "fluent:convert-range-20-regular",
		"tags": "decimal,binary,dec,bin"
	}
**/

export function main(input) {
	try {
		const lines = input.split(/\n/)
		let result = ''

		for (const index in lines) {
			const text = lines[index].trim()
			const decimal = parseInt(text, 2)

			if (isNaN(decimal)) {
				result += text
			} else {
				result += decimal
			}

			result += '\n'
		}

		return { data: result.trim() }
	} catch (error) {
		return { error: error.message }
	}
}
