/**
	{
		"name":"JSON to CSV",
		"description":"Converts JSON to comma-separated tables.",
		"author":"Ivan",
		"icon":"bx:table",
		"tags":"table,convert"
	}
**/

// Inspired by https://stackoverflow.com/a/31536517/2053038
// Note: it would be good to escape commas, and maybe not just get keys from the first object.

export function main(input) {
	try {
		const delimiter = ','
		const data = JSON.parse(input)
		const replacer = (_, value) => (value === null ? '' : value)
		const header = Object.keys(data[0])
		let csv = data.map((row) => header.map((fieldName) => JSON.stringify(row[fieldName], replacer)).join(delimiter))
		csv.unshift(header.join(delimiter))
		input = csv.join('\r\n')
		return { data: input }
	} catch (error) {
		return { error: 'Invalid JSON.' }
	}
}
