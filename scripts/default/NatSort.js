/**
{
   "name":"Natural Sort Lines",
   "description":"Sort lines with smart handling of numbers.",
   "author":"Sebastiaan Besselsen",
   "icon":"ri:sort-number-asc",
   "tags":"sort,natural,natsort"
}
**/

export function main(input) {
	let sorted = input
		.replace(/\n$/, '')
		.split('\n')
		.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
		.join('\n')

	if (sorted === input) {
		sorted = sorted.split('\n').reverse().join('\n')
	}
	input = sorted
	return { data: input }
}
