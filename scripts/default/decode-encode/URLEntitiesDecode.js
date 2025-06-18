/**
	{
		"name":"URL Entities Decode",
		"description":"URL Decodes all characters in your text.",
		"author":"luisfontes19",
		"icon":"ph:percent",
		"tags":"url,decode,full"
	}
**/

function fullUrlDecode(str) {
	var codes = str.split('%')
	var decoded = ''

	for (var i = 0; i < codes.length; i++) {
		decoded += String.fromCharCode(parseInt(codes[i], 16))
	}

	return decoded
}

export function main(input) {
	input = fullUrlDecode(input)
	return { data: input }
}
