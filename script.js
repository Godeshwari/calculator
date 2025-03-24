const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let expression = ""; // Stores the full mathematical expression

// Function to evaluate the expression safely
function calculate() {
    if (expression.trim() === "") return; // Prevent evaluating empty input

    try {
        let result = eval(expression);
        if (isNaN(result) || result === undefined || result === null) {
            display.value = "Error"; // Handle invalid calculations
            expression = "";
        } else {
            expression = result.toString(); // Convert result to string
            display.value = expression;
        }
    } catch (error) {
        display.value = "Error"; // Show "Error" on invalid expressions
        expression = "";
    }
}

// Add event listeners to buttons
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-value");

        if (value === "C") {
            expression = "";
            display.value = "";
        } else if (value === "=") {
            calculate();
        } else {
            expression += value;
            display.value = expression;
        }
    });
});

// Keyboard Support
document.addEventListener("keydown", (event) => {
    if (!isNaN(event.key) || ["+", "-", "*", "/", "."].includes(event.key)) {
        expression += event.key;
        display.value = expression;
    } else if (event.key === "Enter") {
        calculate();
    } else if (event.key === "Backspace") {
        expression = expression.slice(0, -1);
        display.value = expression;
    }
});