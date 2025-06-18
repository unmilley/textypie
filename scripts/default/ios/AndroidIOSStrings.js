/**
  {
    "name":"Android Strings to iOS Localizables",
    "description":"Converts Android Strings to iOS localizables.",
    "author":"Manuel Kunz (https://github.com/KunzManuel)",
    "icon":"hugeicons:translation",
    "tags":"string,android,ios"
  }
**/

export function main(input) {
	try {
		const lines = input.split('\n')
		let result = []
		lines.forEach((element) => {
			let temp = element
			temp = temp.replace('<string name=', '')
			temp = temp.replace('</string>', '";')
			temp = temp.replace('>', ' = "')
			result.push(temp)
		})

		return { data: result.join('\n') }
	} catch (error) {
		return { error: error.message }
	}
}
