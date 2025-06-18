/**
	{
		"name":"Create Project Glossary Markdown File",
		"description":"Type 'help' and run this script for instructions.",
		"author":"Terry L. Lewis",
		"icon":"hugeicons:colosseum",
    "tags":"markdown,glossary"
	}
**/

///
/// Generates a Markdown Glossary file for the project specified in the input parameters.
/// Run the script with no input text to create the input JSON required by the glossary generator.
/// Fill in the required values, and re-run the Boop Script to generate the glossary.
///
export function main(input) {
	try {
		var options = {}
		if (input.trim().toLowerCase() === 'help') {
			input = getHelpText()
		} else if (input.trim() === '') {
			input = JSON.stringify(getDefaultParameters())
		} else {
			options = JSON.parse(input)

			var indexEntries = '0ABCDEFGHIJKLMNOPQRSTUVWXYZ'
			var header = getHeader()
			var sectionTemplate = getSectionTemplate()
			var sampleEntries = getSampleEntries()

			var index = '\r\n'
			var body = ''
			for (var x = 0; x < indexEntries.length; x++) {
				var c = indexEntries.charAt(x)

				// Build Index
				index = index + '[' + c + '](#' + c.toLowerCase() + ') '
				if (c === 'H' || c === 'Q' || c === 'Z') index = index + '\r\n'

				// Build Sections
				var section = sectionTemplate.replace('{idx}', c)
				if (c === 'E' && options.includeSamples) {
					section = section.replace('{samples}', sampleEntries)
				} else {
					section = section.replace('{samples}', '')
				}
				body = body + section
			}

			// Put it all together
			var glossary = header + index + body

			input = glossary.replace('{projectName}', options.projectName)
		}

		return { data: input }
	} catch (error) {
		options = getDefaultParameters()
		options.error = error.toString()
		input = JSON.stringify(options)
		return { data: input, error: error.toString() }
	}
}

function getDefaultParameters() {
	return {
		projectName: 'Project Name',
		includeSamples: false,
	}
}

function getHeader() {
	return `
# {projectName}
## Glossary Of Terms
`.trim()
}

function getSectionTemplate() {
	return `
## {idx}
{samples}
[Back to Top](#glossary-of-terms) 

---
`
}

function getSampleEntries() {
	return `

### Example Entry
This example provides a template for how glossary entries should be formatted.

### Example Entry 2
Sample definition of Example Entry 2. See also [Example Entry](#example-entry).

`
}

function getHelpText() {
	return `
Create Project Glossary Markdown File
=====================================

This script takes a JSON input string and reads its
properties to produce an empty Glossary file. Use this
when starting a new project to ensure that everyone on
the team knows the proper definitions of the jargon used.

Running the script without an input string generates the 
required JSON structure.

You can delete all but the JSON below and run the script 
to see example results.

Input structure:

{
    "projectName" : "--Project Name Here--",
    "includeSamples" : false
}

The "includeSamples" parameter is optional and defaults to [false].
`
}
