/**
	{
		"name":"Wadsworth Constant",
		"description":"first 30% of your text.",
		"author":"Ivan",
		"icon":"ph:scissors",
		"tags":"snap"
	}
**/

export function main(input) {
	var all = input.split(' ')
	all.splice(0, Math.ceil(all.length * 0.3))
	input = all.join(' ')
	return { data: input }
}
