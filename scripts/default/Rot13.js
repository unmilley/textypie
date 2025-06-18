/**
  {
    "name":"Rot13",
    "description":"Applies the Rot13 cypher to your text.",
    "author":"Paul Starr",
    "icon":"bx:abacus",
    "tags":"spoilers,encryption,plaintext"
  }
**/

export function main(input) {
	// adapted from Sophie Alpert's solution: https://stackoverflow.com/questions/617647/where-is-my-implementation-of-rot13-in-javascript-going-wrong
	input = input.replace(/[a-z]/gi, function (c) {
		return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26)
	})
	return { data: input }
}
