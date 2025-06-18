/** 
  {
    "name":"Collapse lines",
    "description":"Removes all linebreaks from your text",
    "author":"Dennis",
    "icon":"bx:collapse-alt",
    "tags":"strip,remove,collapse,join"
  }
**/

export function main(input) {
	let split = input.split(/\r\n|\r|\n/)
	const info = `${split.length} lines collapsed`
	input = split.join(', ')

	return { data: input, info }
}
