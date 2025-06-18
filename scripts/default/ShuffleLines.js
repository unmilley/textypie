/**
	{
		"name":"Shuffle Lines",
		"description":"Randomize each line of your text.",
		"author":"@Clarko",
		"icon":"bx:dice-6",
		"tags":"shuffle,random"
	}
**/

export function main(input) {
	let lines = input.split('\n')
	let j = lines.length

	// Fisher-Yates Shuffle
	while (j) {
		i = Math.floor(Math.random() * j--)
		temp = lines[j]
		lines[j] = lines[i]
		lines[i] = temp
	}

	input = lines.join('\n')
	return { data: input }
}
