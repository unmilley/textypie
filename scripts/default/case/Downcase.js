/**
  {
    "name":"Downcase",
    "description":"Converts your text to lowercase.",
    "author":"Dan2552",
    "icon":"tabler:letter-case-lower",
    "tags":"downcase,lowercase"
  }
**/

export function main(input) {
	input = input.toLowerCase()
	return { data: input }
}
