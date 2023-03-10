


function initialize(apiword) {
    function checkGuess(checkingArr, correctStr) {

        let word = checkingArr.join("");
        const checkArr = [];

        /* 
        0  = OK
        5  = ALMOST
        10 = WRONG
        */

        if (word.length !== correctStr.length) {
            return "Not the same length.";
        }

        for (let i=0; i < word.length; i++) {
            
            if (word[i] === correctStr[i]) {
                checkArr.push(0);
                continue;
            }

            let foundOne = false;

            /* NOTE: fint å legge til slik at den sjekker mot ordliste så man ikke kan skrive hva man vil! */

            for (let j=0; j < correctStr.length; j++) {
                if (j === i) {continue;}

                if (word[i] === correctStr[j]) {
                    checkArr.push(5);
                    foundOne = true;
                }
            }

            if (!foundOne) {
                checkArr.push(10);
            }

        }

        return checkArr;

    }


    function saveGuess() {
        let result = checkGuess(guess, word);

        let allCorrect = true;
        result.forEach(checking => {
            if (checking !== 0) {allCorrect = false;}
        });
        
        if (allCorrect) {won = true;}

        const letterAndResult = [];
        guess.forEach((letter, index) => {
            letterAndResult.push([letter, result[index]]);
        });

        oldGuesses.push(letterAndResult);
        guess.length = 0;
        guesses++;
        updateBoxes();
    }


    function clearBoxes() {
        boxElList.forEach(element => {
            element.innerHTML = "";
        });
    }


    function updateBoxes() {

        clearBoxes();

        if (guesses > 1) {
            for (let i = 1; i <= oldGuesses.length; i++) {
                for (let j = 1; j <= oldGuesses[i - 1].length; j++) {
                    boxElObj["COL" + String(j) + "_ROW" + String(i)].innerHTML = oldGuesses[i - 1][j - 1][0].toUpperCase();
                    switch (oldGuesses[i - 1][j - 1][1]) {
                        case 0: {
                            if (!(boxElObj["COL" + String(j) + "_ROW" + String(i)].className.includes("correct"))) {boxElObj["COL" + String(j) + "_ROW" + String(i)].className += " correct";}
                            break;
                        }

                        case 5: {
                            if (!(boxElObj["COL" + String(j) + "_ROW" + String(i)].className.includes("almost"))) {boxElObj["COL" + String(j) + "_ROW" + String(i)].className += " almost";}
                            break;
                        }

                        case 10: {
                            if (!(boxElObj["COL" + String(j) + "_ROW" + String(i)].className.includes("wrong"))) {boxElObj["COL" + String(j) + "_ROW" + String(i)].className += " wrong";}
                            break;
                        }
                    }
                }
            }
        }

        for (let i=1; i <= guess.length; i++) {
            boxElObj["COL" + String(i) + "_ROW" + String(guesses)].innerHTML = guess[i - 1].toUpperCase();
        }

    }


    function endWon() {
        document.removeEventListener("keydown", keydownHandle);
        document.querySelector("#end").innerHTML = "Du vant!!!";
    }

    function endLost() {
        document.removeEventListener("keydown", keydownHandle);
        document.querySelector("#end").innerHTML = `Du tapte. Ordet var ${word}`;
    }


    const keydownHandle = e => {

        async function postWord(posting) {
            const word = posting.toLowerCase();

            const res = await fetch(window.location.origin + "/api/submit", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"word": word})
            });
            const json = await res.json();
            const value = await json.value;
            return value;
        }

        if (e.key === "Enter") {
            if (guess.length !== word.length) {return;};
            postWord(guess.join(""))
            .then(value => {
                if (value === 0) {return;};

                saveGuess();
                if (!(guesses === tries + 1)) {
                    return;
                }
                if (won) {
                    endWon();
                }
                else {
                    endLost();
                }


            })
            

            
        };

        if (e.key === ("Backspace" || "Delete")) {
            guess.pop();
            updateBoxes();
            return;
        };
        
        if (guess.length === word.length) {
            return;
        };

        if (alphabet.includes(e.key)) {
            guess.push(e.key.toLowerCase());
            updateBoxes();

            return;
        };


    }

    const tries = 6;
    const word = apiword;

    const boxesDivEl = document.querySelector("#boxes");

    const dimentions = [word.length, tries];

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
    /* console.log(boxElObj); */

    const charNum = Array.from(Array(26)).map((e, i) => i + 65);
    const bigChar = charNum.map((x) => String.fromCharCode(x));
    const alphabet = [];
    bigChar.forEach(element => {
        alphabet.push(element);
        alphabet.push(element.toLowerCase());
    });
    /* console.log(alphabet); */

    const guess = [];
    /* ["s", "i", "m", "e", "n"] */

    const oldGuesses = [];
    /* [["s", 10], ["i", 5], ["m", 0], ["e", 0], ["n", 10]] */

    var guesses = 1;
    /* increments with each guess */

    var won = false;

    document.addEventListener("keydown", keydownHandle);
}


async function getWord() {
    const res  = await fetch(window.location.origin + "/api/word");
    const json = await res.json();
    const word = await json.word.toLowerCase();
    return word;
}

getWord()
.then(word => {
    initialize(word);
})
.catch(err => {
    console.log(err);
});