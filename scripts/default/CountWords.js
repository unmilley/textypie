/**
  {
    "name":"Count Words",
    "description":"Get the word count of your text",
    "author":"Daniel Stone",
    "icon":"mdi:counter",
    "tags":"count,length,size,words"
  }
**/
export function main(input) {
	let words = input.trim().match(/\S+/g)
	const info = `${(words && words.length) || 0} words`
	return { info }
}
