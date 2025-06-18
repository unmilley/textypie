/**
	{
		"name":"URL Entity Encode",
		"description":"URL Encodes all characters in your text.",
		"author":"luisfontes19",
		"icon":"ph:percent",
		"tags":"url,encode,full"
	}
**/

function fullUrlEncode(str) {
	var encoded = ''

	for (var i = 0; i < str.length; i++) {
		var h = parseInt(str.charCodeAt(i)).toString(16)
		encoded += '%' + h
	}

	return encoded
}

export function main(input) {
	input = fullUrlEncode(input)
	return { data: input }
}
