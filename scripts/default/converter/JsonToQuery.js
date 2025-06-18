/**
{
		"name":"JSON to Query String",
		"description":"Converts JSON to URL query string.",
		"author":"Ota Mares <ota@mares.one>",
		"icon":"gg:website",
		"tags":"url,query,params,json,convert,encode"
}
**/

/**
 * Credit goes to https://stackoverflow.com/a/1714899
 */
function convertToQuery(obj, prefix) {
	let queryParts = []

	for (param in obj) {
		if (obj.hasOwnProperty(param)) {
			let key = prefix ? prefix + '[]' : param
			let value = obj[param]

			queryParts.push(value !== null && typeof value === 'object' ? convertToQuery(value, key) : key + '=' + value)
		}
	}

	return queryParts.join('&')
}

export function main(input) {
	try {
		input = convertToQuery(JSON.parse(input))
		return { data: input }
	} catch (error) {
		return { error: 'Unable to convert JSON to URL params' }
	}
}
