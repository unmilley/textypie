/**
	{
		"name":"JS To PHP",
		"description":"Convert JS Object or Array to PHP.",
		"author":"jtolj",
		"icon":"fluent:convert-range-20-regular",
		"tags":"js,php,convert"
	}
**/

export function main(input) {
	const js = input.replace(/\n\n\/\/ Result:[\s\S]*$/, '')
	let output = ''
	try {
		const result = new Function(`return ${js}`)()
		output = convert(result) + ';'
	} catch (error) {
		return { error: error.message }
	}
	input = js + '\n\n// Result:\n\n' + output
	return { data: input }
}

function toPHP(value, indentation) {
	switch (typeof value) {
		case 'undefined':
			value = null
			break
		case 'object':
			if (value !== null) {
				value = convert(value, indentation + 1)
			}
			break
		case 'string':
			value = value.replace(/"/g, '\\"')
			value = `"${value}"`
			break
	}

	return value
}

function convert(result, indentation = 1) {
	const isArray = Array.isArray(result)
	let str = Object.keys(result).reduce((acc, key) => {
		const value = toPHP(result[key], indentation)
		acc += ' '.repeat(indentation * 4)
		acc += isArray ? value : `'${key}' => ${value}`
		acc += ',\n'
		return acc
	}, '')
	const endingIndentation = ' '.repeat((indentation - 1) * 4)
	return `[\n${str}${endingIndentation}]`
}
