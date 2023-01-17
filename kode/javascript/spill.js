

const boxesDivEl = document.querySelector("#boxes");

const dimentions = [5, 6]

for (let i=1; i <= dimentions[0]; i++) {
    let box = document.createElement("div");
    box.id = "COL" + String(i);
    box.className = "COL";
    
    for (let j=1; j <= dimentions[1]; j++) {
        let innerbox = document.createElement("div");
        innerbox.id = "COL" + String(i) + "_ROW" + String(j);
        innerbox.className = "BOX";
        innerbox.innerHTML = " ";
        box.appendChild(innerbox);
    }
    boxesDivEl.appendChild(box);
}

const boxElList = document.querySelectorAll(".BOX");
const boxElObj = {};

boxElList.forEach(boxEl => {
    Object.assign(boxElObj, {[String(boxEl.id)]: boxEl});
});

console.log(boxElObj);

const charNum = Array.from(Array(26)).map((e, i) => i + 65);
const bigChar = charNum.map((x) => String.fromCharCode(x));
const alphabet = [];
const guess = [];
const oldGuesses = [];
var guesses = 1;

function clearBoxes() {
    boxElList.forEach(element => {
        element.innerHTML = "";
    });
}


function updateBoxes() {

    clearBoxes();

    if (guesses > 1) {
        oldGuesses.forEach(oldGuess => {
            for (let j = 1; j <= oldGuess.length; j++) {
                boxElObj["COL" + String() + "_ROW" + String(guesses)].innerHTML = guess[i - 1];

                // dette funker ikke du må fikse senere simen

            }
        });
    }

    for (let i=1; i <= guess.length; i++) {
        boxElObj["COL" + String(i) + "_ROW" + String(guesses)].innerHTML = guess[i - 1];
    }

}




bigChar.forEach(element => {
    alphabet.push(element);
    alphabet.push(element.toLowerCase());
});

document.addEventListener("keydown", e => {


    if (e.key === ("Backspace" || "Delete")) {
        guess.pop();
        updateBoxes();
        return;
    };
    
    if (guess.length === 5) {
        return;
    };

    if (alphabet.includes(e.key)) {
        guess.push(e.key.toLowerCase());
        updateBoxes();

        return;
    };
});


