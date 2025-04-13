var keytext = document.getElementById('key')
var keyDecrypt = document.getElementById('keyDecrypt')
var buttonEncrypt = document.getElementById('encryptBtn')
var keyToBinary = document.getElementsByClassName('keyToBinary')

function stringToBinaryKey(str) {
    const encoder = new TextEncoder(); 
    const binaryKey = encoder.encode(str); 
    return binaryKey;
}

function normalizeKey(keyStr, length = 16) {
    const encoder = new TextEncoder();
    let keyBytes = encoder.encode(keyStr);
    if (keyBytes.length > length) {
        keyBytes = keyBytes.slice(0, length); 
    } else if (keyBytes.length < length) {
        const padded = new Uint8Array(length);
        padded.set(keyBytes); 
        keyBytes = padded;
    }

    return keyBytes;
}

function convertToBinary(inputElement, displayElementIndex) {
    keyToBinary[displayElementIndex].innerHTML = "Nhị phân (128 bit): ";
    const key = inputElement.value;
    const binaryKey = stringToBinaryKey(key);
    keyToBinary[displayElementIndex].innerHTML += Array.from(normalizeKey(binaryKey)).join(' ');
}

keytext.onchange = () => convertToBinary(keytext, 0);
keyDecrypt.onchange = () => convertToBinary(keyDecrypt, 1);
