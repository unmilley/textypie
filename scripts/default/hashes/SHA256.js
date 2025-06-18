/**
{
    "name":"SHA256 Hash",
    "description":"Computes the SHA256 hash of your text (Hex encoded)",
    "icon":"bx:fingerprint",
    "tags":"strip,slashes,remove"
}
**/
import Hashes from 'https://cdn.jsdelivr.net/npm/jshashes@1.0.8/+esm'

export function main(input) {
	var SHA256 = new Hashes.SHA256()
	input = SHA256.hex(input)
	return { data: input }
}
