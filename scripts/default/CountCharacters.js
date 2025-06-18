/**
	{
		"name":"Count Characters",
		"description":"Get the length of your text",
		"author":"Ivan",
		"icon":"mdi:counter",
		"tags":"count,length,size,character"
	}
**/

import size from 'https://cdn.jsdelivr.net/npm/lodash.size@4.2/+esm'

export function main(input) {
	const info = `${size(input)} characters`
	return { info }
}
