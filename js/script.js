const operations = [
    { type: '+', args: [1, 2]},
    { type: '-', args: [7, -2]},
    { type: '*', args: [3, 5]},
    { type: '/', args: [8, 2]}
];

const calculate = (operation) => {
    const [firstNumber, secondNumber] = operation.args;

    switch(operation.type) {
        case '+':
            return firstNumber + secondNumber;
        case '-':
            return firstNumber - secondNumber;
        case '*':
            return firstNumber * secondNumber;
        case '/':
            return firstNumber / secondNumber;
    }
}

function displayCalculation(operation, result) {
    const [firstNumber, secondNumber] = operation.args;

    console.log(`${firstNumber} ${operation.type} ${secondNumber} = ${result}`);
}

for (const operation of operations) {
    displayCalculation(operation, calculate(operation));
}

const formEl = document.createElement('form');

const firstInputEl = document.createElement('input');

firstInputEl.setAttribute('type', 'number');
firstInputEl.setAttribute('placeholder', 'Pierwsza liczba');
firstInputEl.classList.add('form-control');
firstInputEl.style.marginBottom = '1rem';

const operationSelectEl = document.createElement('select');

const addOptionEl = document.createElement('option');

addOptionEl.innerText = '+';

const subtractOptionEL = document.createElement('option');

subtractOptionEL.innerText = '-';

const multiplyOptionEL = document.createElement('option');

multiplyOptionEL.innerText = '*';

const divideOptionEL = document.createElement('option');

divideOptionEL.innerText = '/';

operationSelectEl.appendChild(addOptionEl)
operationSelectEl.appendChild(subtractOptionEL)
operationSelectEl.appendChild(multiplyOptionEL)
operationSelectEl.appendChild(divideOptionEL)

operationSelectEl.classList.add('form-control');
operationSelectEl.style.marginBottom = '1rem';

const secondInputEl = document.createElement('input');

secondInputEl.setAttribute('type', 'number');
secondInputEl.setAttribute('placeholder', 'Druga liczba');
secondInputEl.classList.add('form-control');
secondInputEl.style.marginBottom = '1rem';

const calculateBtn = document.createElement('button');

calculateBtn.innerText = 'Oblicz';
calculateBtn.classList.add('btn');
calculateBtn.classList.add('btn-primary');


formEl.appendChild(firstInputEl);
formEl.appendChild(operationSelectEl);
formEl.appendChild(secondInputEl);
formEl.appendChild(calculateBtn);

document.getElementById('app').appendChild(formEl);

// Modyfikuj tylko ponizej

firstInputEl.setAttribute('name', 'first');
secondInputEl.setAttribute('name', 'second');
operationSelectEl.setAttribute('name', 'operation');

addOptionEl.setAttribute('value', '+');
subtractOptionEL.setAttribute('value', '-');
multiplyOptionEL.setAttribute('value', '*');
divideOptionEL.setAttribute('value', '/');


const validate = (operation) => {
    const [first, second] = operation.args;

    let validOp = operations.find(el => {
        return el.type === operation.type;
    });
    
    if (isNaN(first) || isNaN(second) || !validOp)
        return false;    

    return true;
}

formEl.addEventListener('submit', e =>{
    e.preventDefault();
    for (const child of formEl.children) {
        if(child.classList.contains("alert")){
            formEl.removeChild(child);
            break;
        }
    }
    const form = new FormData(e.target);
    const first = form.get('first');
    const op = form.get('operation');
    const second = form.get('second');

    const operation = { type: op, args: [first == '' ? NaN : Number(first), second == '' ? NaN : Number(second)] };
    const divEl = document.createElement("div");
    divEl.classList.add("alert");
    if(!validate(operation)){
        console.log("Błędne dane");
        divEl.classList.add("alert-danger");
        divEl.innerText = 'Błędne dane!';
        formEl.prepend(divEl);
        return;
    } 
    const result = calculate(operation);
    divEl.classList.add("alert-success");
    divEl.innerText = `${first} ${op} ${second} = ${result}`;
    formEl.prepend(divEl);
});