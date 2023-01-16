

const charNum = Array.from(Array(26)).map((e, i) => i + 65);
const bigChar = charNum.map((x) => String.fromCharCode(x));
const alphabet = [];
const guess = [];

bigChar.forEach(element => {
    alphabet.push(element);
    alphabet.push(element.toLowerCase());
});

console.log(alphabet);

document.addEventListener("keydown", e => {


    if (e.key === ("Backspace" || "Delete")) {
        guess.pop();
        console.log(guess);
        return;
    };
    
    if (guess.length === 5) {
        return;
    };

    if (alphabet.includes(e.key)) {
        guess.push(e.key.toLowerCase());
        console.log(guess);


        return;
    };
});


