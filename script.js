
let previousValue = ``;
let currentValue = ``;
let operator = ``;
let result = 0;
let elements = document.querySelectorAll(`.element`);
let numbers = document.querySelectorAll(`.num`);
let operators = document.querySelectorAll(`.op`);
let equal = document.querySelector(`.eq`);
let clear = document.querySelector(`.clear`);
let del = document.querySelector(`.delete`);
let decimal = document.querySelector(`.decimal`);
let displayCurrent = document.querySelector('.displayCurrent');
let displayPrevious = document.querySelector(`.displayPrevious`);

//FUNCTIONS
function add (num1,num2){
    return num1 + num2
}
function subtract (num1,num2){
    return num1 - num2
}
function divide (num1,num2){
    return num1 / num2
}
function multiply (num1,num2){
    return num1 * num2
}

function operate (op,num1,num2){
    if(op === `+`)
        return add(num1,num2)
    else if(op === `-`)
        return subtract(num1,num2)
    else if(op === `/`)
        return divide(num1,num2)
    else if(op === `X`)
        return multiply(num1,num2)
}
//Handle the Values
function containNum(num){
    currentValue += num;
    
}
function containOp(op){
    operator = op;
    previousValue = currentValue;
    currentValue = ``;
   
}
//Event Listeners

//Display the input number
numbers.forEach( num => num.addEventListener(`click`, e => {
    containNum(e.target.textContent);
    displayCurrent.textContent = currentValue;
}))

//Display the operator
operators.forEach( op => op.addEventListener(`click`, e =>{

        displayCurrent.textContent = currentValue;
        displayPrevious.textContent = previousValue;

    //Check if the current value is empty, if not then operate
       if(displayPrevious.textContent){
        result = operate(e.target.textContent, Number(previousValue),Number(currentValue));
            if(!Number.isInteger(result)){
                currentValue = result.toFixed(2).toString();
                containOp(e.target.textContent);
                displayPrevious.textContent = previousValue + ` `  + operator;
                displayCurrent.textContent = ``;
            }
            else{
                currentValue = result
                containOp(e.target.textContent);
                displayPrevious.textContent = previousValue + ` `  + operator;
                displayCurrent.textContent = ``;
            }
       }
       else{
        containOp(e.target.textContent);
        displayPrevious.textContent = previousValue + ` `  + operator;
        displayCurrent.textContent = ``;
       }
}))

//Display output
equal.addEventListener(`click`, () => {
    result = operate(operator, Number(previousValue),Number(currentValue));
    if(!Number.isInteger(result)){
        displayPrevious.textContent = ``;
        displayCurrent.textContent = result.toFixed(2).toString();
        previousValue = ``;
        currentValue = displayCurrent.textContent;
    }
    else{
        displayPrevious.textContent = ``;
        displayCurrent.textContent = result.toString();
        previousValue = ``;
        currentValue = result;
    }
        
})

//Clear the screen
clear.addEventListener(`click`, () => {
    
    currentValue = ``;
    previousValue = ``;
    displayCurrent.textContent = currentValue;
    displayPrevious.textContent = previousValue;
})

//Delete the last char of the input
del.addEventListener(`click`, () => {
    let remove = displayCurrent.textContent.slice(0,-1);
    displayCurrent.textContent = remove;
    currentValue = remove;
})

//Add decimal
decimal.addEventListener(`click`, () => {
    if(!currentValue.includes(`.`)){
        currentValue += `.`;
        displayCurrent.textContent = currentValue.toString();
    }
})


//Hover Effect
elements.forEach(element => {
        element.addEventListener(`mouseover`, (e) =>{
            setTimeout(function(){
                element.style.cssText = `background-color:black;
                color: white;`
            },5)
            
        });
        element.addEventListener(`mouseout`, (e) =>{
            setTimeout(function(){
                element.style.cssText = `background-color:white;
                color: black;`
            },30)
        });
})
