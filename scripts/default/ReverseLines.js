/**
	{
		"name":"Reverse Lines",
		"description":"Flips every line of your text.",
		"author":"@Clarko",
		"icon":"ph:flip-horizontal-fill",
		"tags":"reverse,order,invert,mirror,flip,upside,down"
	}
**/

export function main(input) {
	input = input.split('\n').reverse().join('\n')
	return { data: input }
}
