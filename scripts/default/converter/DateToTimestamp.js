/**
    {
        "name":"Date to Timestamp",
        "description":"Converts dates to Unix timestamp.",
        "author":"Noah Halford",
        "icon":"bx:stopwatch",
        "tags":"date,time,calendar,unix,timestamp"
    }
**/

export function main(input) {
	let parsedDate = Date.parse(input)
	if (!isNaN(parsedDate)) return { data: parsedDate / 1000 }
	return { error: 'Invalid Date' }
}
