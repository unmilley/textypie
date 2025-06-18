/**
	{
		"name":"CSV to JSON",
		"description":"Converts comma-separated tables to JSON.",
		"author":"Ivan",
    "icon":"bx:table",
		"tags":"table,convert"
	}
**/
import Papa from 'https://cdn.jsdelivr.net/npm/papaparse@5.5.2/+esm'

export function main(input) {
	input = input.trim()
	try {
		const { data } = Papa.parse(input, { header: true })
		input = JSON.stringify(data, null, 2)
		return { data: input }
	} catch (error) {
		return { error: 'Invalid CSV' }
	}
}
