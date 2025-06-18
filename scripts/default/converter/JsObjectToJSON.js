/**
  {
      "name":"JS Object to JSON",
      "description":"Converts a javascript object to JSON format",
      "author":"luisfontes19",
      "icon":"material-symbols:data-object",
      "tags":"json,js,object,convert"
  }
**/

export function main(input) {
	try {
		const data = input
		eval('parsed = ' + data)
		input = JSON.stringify(parsed)
		return { data: input }
	} catch (e) {
		return { error: e.message }
	}
}
