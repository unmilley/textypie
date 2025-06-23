/**
  {
      "name":"JS Object to JSON",
      "description":"Converts a javascript object to JSON format",
      "author":"luisfontes19",
      "icon":"material-symbols:data-object",
      "tags":"json,js,object,convert"
  }
**/

import json5 from 'https://cdn.jsdelivr.net/npm/json5@2.2.3/+esm'

export function main(input) {
	try {
		const parsed = json5.parse(input)
		const result = JSON.stringify(parsed)
		return { data: result }
	} catch (e) {
		return { error: e.message }
	}
}
