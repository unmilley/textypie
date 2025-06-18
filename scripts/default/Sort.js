/**
 {
     "name":"Sort lines",
     "description":"Sort lines alphabetically.",
     "author":"Sebastiaan Besselsen",
     "icon":"ri:sort-alphabet-asc",
     "tags":"sort,alphabet"
 }
 **/

export function main(input) {
	let sorted = input
		.replace(/\n$/, '')
		.split('\n')
		.sort((a, b) => a.localeCompare(b))
		.join('\n')

	if (sorted === input) {
		sorted = sorted.split('\n').reverse().join('\n')
	}
	input = sorted
	return { data: input }
}
