/**
{
    "name":"SHA512 Hash",
    "description":"Computes the SHA512 hash of your text (Hex encoded)",
    "icon":"bx:fingerprint",
    "tags":"strip,slashes,remove"
}
**/

import Hashes from 'https://cdn.jsdelivr.net/npm/jshashes@1.0.8/+esm'

export function main(input) {
	var SHA512 = new Hashes.SHA512()
	input = SHA512.hex(input)
	return { data: input }
}
