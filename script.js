const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let expression = "";

function calculate() {
    if (expression.trim() === "") return;

    try {
        let result = eval(expression);

        if (isNaN(result)) {
            display.value = "Error";
            expression = "";
        } else {
            expression = result.toString();
            display.value = expression;
        }
    } catch {
        display.value = "Error";
        expression = "";
    }
}

buttons.forEach(button => {
    button.addEventListener("click", () => {

        const value = button.dataset.value;

        if (value === "C") {
            expression = "";
            display.value = "";
        }

        else if (value === "DEL") {
            expression = expression.slice(0, -1);
            display.value = expression;
        }

        else if (value === "=") {
            calculate();
        }

        else if (value === "%") {
            expression += "/100";
            display.value = expression;
        }

        else {
            expression += value;
            display.value = expression;
        }
    });
});

document.addEventListener("keydown", (event) => {

    if (!isNaN(event.key) ||
        ["+", "-", "*", "/", "."].includes(event.key)) {

        expression += event.key;
        display.value = expression;
    }

    else if (event.key === "Enter" || event.key === "=") {
        calculate();
    }

    else if (event.key === "Backspace") {
        expression = expression.slice(0, -1);
        display.value = expression;
    }

    else if (event.key === "Escape") {
        expression = "";
        display.value = "";
    }

});
