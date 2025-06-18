/**
  {
    "name":"JWT Decode",
    "description":"Converts JWTs to JSON",
    "author":"Nils Sonemann",
    "icon":"logos:jwt-icon",
    "tags":"decode,jwt,token"
  }
**/

import jsBase64 from 'https://cdn.jsdelivr.net/npm/js-base64@3.7.7/+esm'

export function main(input) {
	var t = input
	var jwtParts = t.split('.')
	if (jwtParts.length != 3) return { error: 'Invalid Token' }

	var header = jsBase64.decode(jwtParts[0])
	var payload = jsBase64.decode(jwtParts[1])
	var signature = jwtParts[2]

	try {
		var fullJson = {
			header: JSON.parse(header),
			payload: JSON.parse(payload),
			signature: signature,
		}

		// Prettyprint the JSOM
		input = JSON.stringify(fullJson, null, 2)
		return { data: input }
	} catch (err) {
		return { error: 'Error while parsing JSON' }
	}
}
