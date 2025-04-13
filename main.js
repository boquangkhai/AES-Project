var keytext = document.getElementById('key');
var keyDecrypt = document.getElementById('keyDecrypt');
var keyToBinary = document.getElementsByClassName('keyToBinary');

function validateKeyInput(inputElement) {
    const original = inputElement.value;
    const filtered = original.replace(/[^a-zA-Z0-9]/g, '');

    if (original !== filtered) {
        alert("Key chỉ được chứa chữ và số!");
        inputElement.value = filtered;
    }
}

function convertToHex(inputElement, displayElementIndex) {
    keyToBinary[displayElementIndex].innerHTML = "Hexa (128 bit): ";
    const key = inputElement.value;
    const encoder = new TextEncoder();
    let keyBytes = encoder.encode(key);

    if (keyBytes.length > 16) {
        keyBytes = keyBytes.slice(0, 16);
    } else if (keyBytes.length < 16) {
        const padded = new Uint8Array(16);
        padded.set(keyBytes);
        keyBytes = padded;
    }

    const hexString = Array.from(keyBytes)
        .map(b => b.toString(16).padStart(2, '0'))
        .join(' ')
        .toUpperCase();

    keyToBinary[displayElementIndex].innerHTML += hexString;
}

keytext.oninput = () => {
    validateKeyInput(keytext);
    convertToHex(keytext, 0);
};

keyDecrypt.oninput = () => {
    validateKeyInput(keyDecrypt);
    convertToHex(keyDecrypt, 1);
};
