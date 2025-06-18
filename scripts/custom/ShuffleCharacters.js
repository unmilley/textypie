/**
{
  "name": "Shuffle characters",
  "description": "Shuffles characters randomly",
  "author": "Christian Petersen",
  "icon": "bx:dice-6",
  "tags": "shuffle,random,character,char"
}
**/
function shuffleString(string) {
	const chars = string.split('')

	for (let i = chars.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[chars[i], chars[j]] = [chars[j], chars[i]]
	}

	return chars.join('')
}

export function main(input) {
	input = shuffleString(input)
	return { data: input }
}
