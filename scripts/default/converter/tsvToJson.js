/**
  {
    "name":"TSV to JSON",
    "description":"Converts TSV to JSON",
    "author":"Quddus George",
    "icon":"bx:table",
    "tags":"tab, tsv, json, table"
  }
**/

//credit for tsv function: https://gist.github.com/iwek/7154706#gistcomment-3369283

function tsvJSON(tsv) {
	return tsv
		.split('\n')
		.map((line) => line.split('\t'))
		.reduce((a, c, i, d) => {
			if (i) {
				const item = Object.fromEntries(c.map((val, j) => [d[0][j], val]))
				return a ? [...a, item] : [item]
			}
		}, [])
}

export function main(input) {
	input = JSON.stringify(tsvJSON(input))
	return { data: input }
}
