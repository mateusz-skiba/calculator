const display = document.querySelector(".display");

let score = display.value; // count score
let displayScore = false; // if score is display

// add new number or operator
const add = (e) => {
    if (displayScore == false) {
        // if it's first character, don't let write operators (except for minus)
        if (e.target.classList == "button standard operator" && display.value == "") {
            return;
        }
        // if last character was operator, don't let write next operator
        else if (e.target.classList == "button standard operator" && (display.value[display.value.length - 1] == "+" || display.value[display.value.length - 1] == "÷" || display.value[display.value.length - 1] == "×")) {
            return;
        } else {
            display.value += e.target.textContent;
            score += e.target.textContent;
        }
    }
    // if display is score
    else if (displayScore == true) {
        // for operators
        if (e.target.classList == "button standard operator") {
            display.value += e.target.textContent;
            score += e.target.textContent;
            displayScore = false;
        }
        // for numbers
        else {
            display.value = e.target.textContent;
            score = e.target.textContent;
            displayScore = false;
        }
    }
}

// clear button
const clear = () => {
    score = "";
    display.value = "";
}

// back button
const back = () => {
    display.value = display.value.substring(0, display.value.length - 1);
    score = score.substring(0, score.length - 1);
}

// equal button
const equal = () => {
    // if last character is operator, remove it from score
    if (display.value[display.value.length - 1] == "+" || display.value[display.value.length - 1] == "-" || display.value[display.value.length - 1] == "÷" || display.value[display.value.length - 1] == "×") {
        score = score.substring(0, score.length - 1)
    }
    if (display.value == "") return;

    score = score.split("×").join("*"); // change multiplication sing to possible for read for computer
    score = score.split("÷").join("/"); // change division mark to possible for read for computer
    score = eval(score).toFixed(10); // calculate score and round to 10 digits after point
    display.value = parseFloat(score); // display score
    displayScore = true; // show that score is display
}



document.querySelectorAll(".standard").forEach(btn => btn.addEventListener("click", add))
document.querySelector(".clear").addEventListener("click", clear)
document.querySelector(".back").addEventListener("click", back)
document.querySelector(".equal").addEventListener("click", equal)