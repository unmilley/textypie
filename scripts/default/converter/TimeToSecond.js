/**
  {
    "name":"Time to seconds",
    "description":"Convert hh:mm:ss to seconds",
    "author":"PeteChu",
    "icon":"bx:stopwatch",
    "tags":"transform,convert"
  }
**/

function timeToSeconds(durationText) {
	const [hours = 0, minutes = 0, seconds = 0] = String(durationText).split(':')
	return Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds)
}

export function main(input) {
	input.insert('\n\n' + timeToSeconds(input))
	return { data: input }
}
