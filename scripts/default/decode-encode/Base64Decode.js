/**
	{
		"name":"Base64 Decode",
		"description":"Decodes your text from Base64",
		"author":"See Source",
		"icon":"gg:website",
		"tags":"base64,btoa,decode"
	}
**/

import jsBase64 from 'https://cdn.jsdelivr.net/npm/js-base64@3.7.7/+esm'

export function main(input) {
	input = jsBase64.decode(input)
	return { data: input }
}
