/**
	{
		"name":"Base64 Encode",
		"description":"Encodes your text to Base64",
		"author":"See Source",
		"icon":"gg:website",
		"tags":"base64,atob,encode"
	}
**/

import jsBase64 from 'https://cdn.jsdelivr.net/npm/js-base64@3.7.7/+esm'

export function main(input) {
	input = jsBase64.encode(input)
	return { data: input }
}
