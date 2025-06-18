/**
    {
        "name":"Line compare",
        "description":"Check if existing lines have all the same content",
        "author":"Luis Fontes",
        "icon":"ix:data-type-string",
        "tags":"string,match,text,compare,line"
    }
**/

export function main(input) {
	const lines = input.split(/\n/)
	const first = lines[0]
	const differentLines = []

	for (let i = 1; i < lines.length; i++) {
		const line = lines[i]

		if (first !== line) differentLines.push(i + 1)
	}

	if (differentLines.length === 0) return { info: 'Lines are equal' }
	else if (differentLines.length === 1) return { error: `Line ${differentLines[0]} is not equal to the line 1` }
	else return { error: `Lines [${differentLines.join(', ')}] are not equal to line 1` }
}
