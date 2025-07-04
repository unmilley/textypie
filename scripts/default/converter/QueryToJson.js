/**
	{
		"name":"Query String to JSON",
		"description":"Converts URL query string to JSON.",
		"author":"Ota Mares <ota@mares.one>",
		"icon":"gg:website",
		"tags":"url,query,params,json,convert,decode"
	}
**/

function convertToJson(urlParams) {
	return urlParams
		.replace(/\[\d?\]=/gi, '=')
		.split('&')
		.reduce((result, param) => {
			var [key, value] = param.split('=')
			value = decodeURIComponent(value || '')

			if (!result.hasOwnProperty(key)) {
				result[key] = value

				return result
			}

			result[key] = [...[].concat(result[key]), value]

			return result
		}, {})
}

export function main(input) {
	try {
		input = JSON.stringify(convertToJson(input))
		return { data: input }
	} catch (error) {
		return { error: 'Unable to parse given string' }
	}
}
