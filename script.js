// Forma de pegar elementos facilmente
let element = (el) => {
    if (el.charAt(0) === '#') return document.querySelector(el) //Conseguir elementos pelo ID (retorna 1 elemento)
    else return document.querySelectorAll(el) //retorna vários elementos
};

let operatorScreen = element('#operator'),
    oldNumberScreen = element('#oldNumber'),
    lastNumberScreen = element('#lastNumber'),
    equals = element('#equals'),
    nums = element('.num'),
    ops = element('.ops'),
    number = '',
    oldNumber, result, operator;

let setNumber = function() {
    if (result) {
        number = this.getAttribute('data-num');
        result = '';
    } else {
        if (number.length < 12) number += this.getAttribute('data-num');
    }
    lastNumberScreen.innerHTML = number;
};

let moveNumber = function() {
    oldNumber = number;
    oldNumberScreen.innerHTML = oldNumber;
    number = '';
    operator = this.getAttribute('data-ops');
    operatorScreen.innerHTML = convertOperator();
    equals.setAttribute('data-result', '');
};

function convertOperator() {
    let op;
    switch (operator) {
        case 'plus':
            op = '+';
            break;
        case 'minus':
            op = '-';
            break;
        case 'times':
            op = '*';
            break;
        case 'divided by':
            op = '/';
            break;
        default:
            op = 404;
    }
    return op;
};

let calc = function() {
    oldNumber = parseFloat(oldNumber);
    number = parseFloat(number);
    switch (operator) {
        case 'plus':
            result = oldNumber + number;
            break;
        case 'minus':
            result = oldNumber - number;
            break;
        case 'times':
            result = oldNumber * number;
            break;
        case 'divided by':
            result = oldNumber / number;
            break;
        default:
            result = number;
    }
    if (!isFinite(result)) {
        if (isNaN(result)) {
            result = 'Tá tudo quebrado!'
        } else {
            result = 'Tudo muito errado!'
        };
    }
    lastNumberScreen.innerHTML = result;
    oldNumberScreen.innerHTML = '';
    operatorScreen.innerHTML = '';
    equals.setAttribute('data-result', result);
    oldNumber = 0;
    number = result;
};

let clear = function() {
    number = '';
    oldNumber = '';
    lastNumberScreen.innerHTML = '';
    oldNumberScreen.innerHTML = '';
    operatorScreen.innerHTML = '';
    equals.setAttribute('data-result', result);
}

for (let i = 0, l = nums.length; i < l; i++) nums[i].onclick = setNumber;

for (let i = 0, l = ops.length; i < l; i++) ops[i].onclick = moveNumber;

equals.onclick = calc;

element('#clear').onclick = clear;