/**
	{
		"name":"MD5 Checksum",
		"description":"Computes the checksum of your text (Hex encoded).",
		"author":"Ivan",
		"icon":"bx:fingerprint",
		"tags":"strip,slashes,remove"
	}
**/

import Hashes from 'https://cdn.jsdelivr.net/npm/jshashes@1.0.8/+esm'

export function main(input) {
	var MD5 = new Hashes.MD5()
	input = MD5.hex(input)
	return { data: input }
}
