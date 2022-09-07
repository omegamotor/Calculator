const memory = {
    a: "",
    b: "",

    action: "",
    equal: "",

    firstNum: true,
    numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    actions: ["/", "*", "-", "+"],
    count: "=",
    clear: "C",
}

// Action functions
function add(a, b){return a+b;}
function sub(a, b){return a-b;}
function multiplication(a, b){return a*b;}
function division(a, b){return a/b;}

function clear(letter){
    letter == 'a' ? memory.a = '' : null;
    letter == 'b' ? memory.b = '' : null;
    memory.firstNum = true;
    memory.action = '';
    memory.equal = '';

    if(letter == 'ab'){
        memory.a = '';
        memory.b = '';
    }
}

// Screen functions
function setHistory(a,b,action){
    document.getElementById("a").innerHTML = a;
    document.getElementById("b").innerHTML = b;
    document.getElementById("action").innerHTML = action;
}

function onScreen(show){
    document.getElementById("screen").innerHTML = show;
}

// Function for choose action
function chooseAction(a, b, action){
    a = parseFloat(a, 2);
    b = parseFloat(b, 2);

    switch (action) {
        case "/":
            memory.equal = division(a, b);
            break;

        case "*":
            memory.equal = multiplication(a, b);
            break;
        
        case "+":
            memory.equal = add(a, b);
            break;
        
        case "-":
            memory.equal = sub(a, b);
            break;
        
        default:
            memory.equal = "błąd";
    }
}

// Calculator Logic
function WhatToDo(btn){
    // Take value clicked button
    let clicked = btn.target.innerHTML;

    // if btn is number
    if(memory.numbers.includes(parseInt(clicked))){
        // Number
        if(memory.firstNum){
            memory.a += clicked;
            onScreen(memory.a);
        }else{
            memory.b += clicked;
            onScreen(memory.b);
        }

    // if btn is action
    }else if(memory.actions.includes(clicked)){
        memory.firstNum = false;
        memory.action = clicked;

    // if btn is count and user set 2 numbers
    }else if(clicked == memory.count && !memory.firstNum){
        chooseAction(memory.a,memory.b, memory.action)
        onScreen(memory.equal);
        clear('ab')

    // if btn is .
    }else if(clicked == '.'){
        // if user set one num and don't add . before
        if(memory.firstNum && !memory.a.includes('.')){
            memory.a += clicked;
            onScreen(memory.a);

        // if user set one second and don't add . before
        }else if(!memory.firstNum && !memory.b.includes('.')){
            memory.b += clicked;
            onScreen(memory.b);
        }
    // if btn is "C"
    }else if(clicked == memory.clear){
        onScreen("0");
        clear('ab');
    }

    // Set all on screen
    setHistory(memory.a, memory.b, memory.action);
}

document.addEventListener("DOMContentLoaded", function(event) {
    let btns = document.getElementsByClassName("btn");
    
    Array.from(btns).forEach(function(element) {
        element.addEventListener('click', WhatToDo);
    });
});