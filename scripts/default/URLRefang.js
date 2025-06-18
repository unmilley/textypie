/**
  {
    "name":"Refang",
    "description":"Removes defanging from dangerous URLs and other IOCs",
    "author":"Ross",
    "icon":"bx:link",
    "tags":"refang,url,ioc"
  }
**/

export function main(input) {
	let url = input
	url = url.replace(/\[\.\]/g, '.')
	url = url.replace(/hXXp/gi, 'http')
	url = url.replace(/\[:\/\/\]/g, '://')
	return { data: url }
}
