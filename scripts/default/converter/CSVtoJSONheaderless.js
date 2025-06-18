/**
{
    "name":"CSV to JSON (headerless)",
    "description":"Converts comma-separated, headerless tables to JSON.",
    "author":"Flare576",
    "icon":"bx:table",
    "tags":"table,convert"
}
 **/
import Papa from 'https://cdn.jsdelivr.net/npm/papaparse@5.5.2/+esm'

export function main(input) {
	input = input.trim()
	try {
		const { data } = Papa.parse(input, { header: false })
		input = JSON.stringify(data, null, 2)
		return { data: input }
	} catch (error) {
		return { error: 'Invalid CSV' }
	}
}
