const { getRandomBytesSync } = require("ethereum-cryptography/random.js");
const { secp256k1 } = require("ethereum-cryptography/secp256k1.js");
const { toHex } = require("ethereum-cryptography/utils.js");

const randomPrivateKeyBytes = getRandomBytesSync(32);
const privateKeyHex = toHex(randomPrivateKeyBytes);

console.log('Private Key:', privateKeyHex);

const publicKeyBytes = secp256k1.getPublicKey(randomPrivateKeyBytes, true);
const publicKeyHex = toHex(publicKeyBytes);

console.log('Public Key:', publicKeyHex);
