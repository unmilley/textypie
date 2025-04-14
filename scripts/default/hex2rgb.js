/**
	{
		"name":"Hex to RGB",
		"description":"Convert color in hexadecimal to RGB.",
		"author":"Milley",
		"icon":"bx:color",
		"tags":"hex,color,rgb,convert"
	}
**/

export function main(input) {
	try {
		const hexPattern = /^#?([0-9A-Fa-f]{3}){1,2}$/
		if (!hexPattern.test(input)) throw new Error('Please provide a valid hex code')

		input = input.trim().replace(/^#/, '')
		input = input.length === 3 ? input + input : input

		const [r, g, b] = [0, 2, 4].map((startIdx) => {
			return parseInt(input.substring(startIdx, startIdx + 2), 16)
		})

		return { data: `rgb(${r},${g},${b})` }
	} catch (error) {
		return { error: error.message }
	}
}
