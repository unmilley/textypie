/**
  {
    "name":"Upcase",
    "description":"Converts your text to uppercase.",
    "author":"Dan2552",
    "icon":"tabler:letter-case-upper",
    "tags":"upcase,uppercase,capital,capitalize,capitalization"
  }
**/

export function main(input) {
	input = input.toUpperCase()
	return { data: input }
}
