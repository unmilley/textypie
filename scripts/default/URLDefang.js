/**
  {
    "name":"Defang",
    "description":"Defangs dangerous URLs and other IOCs",
    "author":"Ross",
    "icon":"bx:link",
    "tags":"defang,url,ioc"
  }
**/

export function main(input) {
	let url = input
	url = url.replace(/\./g, '[.]')
	url = url.replace(/http/gi, 'hXXp')
	url = url.replace(/:\/\//g, '[://]')
	return { data: url }
}
