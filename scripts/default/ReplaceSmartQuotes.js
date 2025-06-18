/**
{
	"name":"Replace Smart Quotes",
	"description":"Replace Smart Quotes with their simpler values.",
	"author":"Thomas Bauer (https://github.com/tbauer428)",
	"icon":"ph:broom",
  "tags":"smart,quotes,quotations,quotation,smart-quotes,smart-quotations"
}
**/

export function main(input) {
	input = input
		.replace(/[\u2018\u2019]/g, "'")
		.replace(/[\u201C\u201D]/g, '"')
		.replace(/“”/g, '"')
	return { data: input }
}
