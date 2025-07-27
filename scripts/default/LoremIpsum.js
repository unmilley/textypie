/**
{
  "name":"Lorem Ipsum",
  "description":"Generates Lorem Ipsum placeholder text.",
  "author":"luisfontes19",
  "icon":"ix:data-type-string",
  "tags":"generate,lorem,ipsum,text"
}
**/

export function main(input) {
	const words = [
		'ad',
		'adipisicing',
		'aliqua',
		'aliquip',
		'amet',
		'anim',
		'aute',
		'cillum',
		'commodo',
		'consectetur',
		'consequat',
		'culpa',
		'cupidatat',
		'deserunt',
		'do',
		'dolor',
		'dolore',
		'duis',
		'ea',
		'eiusmod',
		'elit',
		'enim',
		'esse',
		'est',
		'et',
		'eu',
		'ex',
		'excepteur',
		'exercitation',
		'fugiat',
		'id',
		'in',
		'incididunt',
		'ipsum',
		'irure',
		'labore',
		'laboris',
		'laborum',
		'Lorem',
		'magna',
		'minim',
		'mollit',
		'nisi',
		'non',
		'nostrud',
		'nulla',
		'occaecat',
		'officia',
		'pariatur',
		'proident',
		'qui',
		'quis',
		'reprehenderit',
		'sint',
		'sit',
		'sunt',
		'tempor',
		'ullamco',
		'ut',
		'velit',
		'veniam',
		'voluptate',
	]
	let sentence = ''

	input = tryParseInt(input)

	for (let i = 0; i < input; i++) {
		const pos = Math.floor(Math.random() * (words.length - 1))
		sentence += words[pos] + ' '
	}

	sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1).trim() + '.'

	return { data: sentence }
}

function tryParseInt(str, defaultValue = 100) {
	const parsedValue = parseInt(str, 10)
	return isNaN(parsedValue) ? defaultValue : Math.abs(parsedValue)
}
