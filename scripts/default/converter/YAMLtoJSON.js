/**
	{
		"name":"YAML to JSON",
		"description":"Converts YAML to JSON.",
		"author":"Ivan",
		"icon":"fluent:convert-range-20-regular",
		"tags":"markup,convert"
	}
**/

import yaml from 'https://cdn.jsdelivr.net/npm/js-yaml@3.14.0/+esm'

export function main(input) {
	try {
		input = JSON.stringify(yaml.safeLoad(input), null, 2)
		return { data: input }
	} catch (error) {
		return { error: 'Invalid YAML' }
	}
}
