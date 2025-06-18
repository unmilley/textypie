/**
	{
		"name":"JSON to YAML",
		"description":"Converts JSON to YAML.",
		"author":"Ivan",
		"icon":"fluent:convert-range-20-regular",
		"tags":"markup,convert"
	}
**/

import yaml from 'https://cdn.jsdelivr.net/npm/js-yaml@3.14.0/+esm'

export function main(input) {
	try {
		input = typeof input === 'string' ? input : JSON.stringify(input)
		input = yaml.safeDump(JSON.parse(input))
		return { data: input }
	} catch (error) {
		return { error: 'Invalid JSON' }
	}
}
