/**
{
    "name":"SHA1 Hash",
    "description":"Computes the SHA1 hash of your text (Hex encoded)",
    "icon":"bx:fingerprint",
    "tags":"strip,slashes,remove"
}
**/

import Hashes from 'https://cdn.jsdelivr.net/npm/jshashes@1.0.8/+esm'

export function main(input) {
	var SHA1 = new Hashes.SHA1()
	input = SHA1.hex(input)
	return { data: input }
}
