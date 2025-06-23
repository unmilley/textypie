/**
	{
		"name":"Eval Javascript",
		"description":"Runs your text as Javascript Code.",
		"author":"Sebastiaan Besselsen",
		"icon":"octicon:command-palette-16",
		"tags":"js,script,run"
	}
**/

export function main(input) {
	const script = input.replace(/\n\n\/\/ Result:[\s\S]*$/, '')

	let output = ''
	try {
		output = eval(script)
		if (typeof output !== 'string') {
			output = JSON.stringify(output, null, 2)
		}
	} catch (e) {
		return { info: e.toString() }
	}

	input = script + '\n\n// Result:\n\n' + output
	return { data: input }
}
