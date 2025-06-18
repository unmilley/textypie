/**
	{
		"name":"Count Lines",
		"description":"Get the line count of your text",
		"author":"andipaetzold",
		"icon":"mdi:counter",
		"tags":"count,length,size,line"
	}
**/

export function main(input) {
	input = `${input.split('\n').length} lines`
	return { info: input }
}
