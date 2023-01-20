const card_name = document.querySelector('.cardholder-name');
const card_name_input = document.querySelector('.cardholder-name-input');
const name_error = document.querySelector('.name-error');
const card_number = document.querySelector('.card-number');
const card_number_input = document.querySelector('.card-number-input');
const number_error = document.querySelector('.number-error');
const card_month = document.querySelector('.card-month');
const card_month_input = document.querySelector('.card-month-input');
const month_error = document.querySelector('.month-error');
const card_year = document.querySelector('.card-year');
const card_year_input = document.querySelector('.card-year-input');
const year_error = document.querySelector('.year-error');
const card_cvc = document.querySelector('.card-cvc');
const card_cvc_input = document.querySelector('.card-cvc-input');
const cvc_error = document.querySelector('.cvc-error');
const confirm_btn = document.querySelector('.confirm')
const grid = document.querySelector('.d-grid');
const form = document.getElementsByTagName('form');

function writeToCard(input,destination) {
    destination.innerHTML= input;
};

function checkError (check ,input ,error, target) {
    if (check(input)) {
        error.classList.remove('hide');
        target.classList.add('border-clr-error');
    }else {
        error.classList.add('hide');
        target.classList.remove('border-clr-error');
    }
}

card_name_input.addEventListener('input', ()=> {
    let input = card_name_input.value;
    writeToCard(input,card_name);
});

card_name_input.addEventListener('keypress', (event)=> {
    if(event.key.replace(/[^\w\-.]/g,'')=='') {
       event.preventDefault(); 
    };
});

function validName(input) {

    if (input == "") {
        name_error.innerHTML = 'can\'t be blank';
        return true;
    }else {
        for(let i = 0; i < input.length ; i++) {
            if((Number.isInteger(Number(input[i]))) && (input[i] != " ")){
                name_error.innerHTML = 'no numbers allowed';
                return true;
            }
        } 
    }
    return false;
}

card_name_input.addEventListener('blur', (e)=> {
    let input = card_name_input.value;
    checkError (validName ,input ,name_error, e.target);
});

var patternMask = IMask(card_number_input, {
    mask: '**** **** **** ****'
});

card_number_input.addEventListener('input', ()=> {
    let input = card_number_input.value;
    writeToCard(input,card_number);
});

card_number_input.addEventListener('keypress', (event)=> {
    if(event.key.replace(/[\s\-.]/g,'')=='') {
       event.preventDefault(); 
    };
});

function validNumber (og_input) {

    if (og_input == "") {
        number_error.innerHTML = 'can\'t be blank';
        return true;
    }else if(!(Number.isInteger(Number(og_input)))) {
        number_error.innerHTML = 'wrong format numbers only';
        return true;
    }else if ((og_input.length < 16) || (og_input.length > 16)) {
        number_error.innerHTML = 'must be 16 numbers';
        return true;
    }
    return false;
}

card_number_input.addEventListener('blur', (e)=> {
    let input = card_number_input.value;
    let og_input = input.replace(/\s/g, '');
    checkError (validNumber ,og_input ,number_error, e.target);
});

let currentYear = new Date().getFullYear();
    currentYear = currentYear.toString();
    currentYear = currentYear.split("");
    currentYear = currentYear.slice(2,4);
    currentYear = currentYear.join('');
    currentYear = Number(currentYear);

let currentMonth = new Date().getMonth() + 1 ;

card_month_input.addEventListener('input', ()=> {
    let input = card_month_input.value;
    writeToCard(input,card_month);
});

function validMonth(input) {

    if (input == "") {
        month_error.innerHTML = 'month can\'t be blank';
        return true;
    }else if (currentYear == card_year_input.value && input < currentMonth) {
        month_error.innerHTML = 'expired card try another';
        return true;
    }else if ((input == 0)) {
        month_error.innerHTML = 'valid month please';
        return true;
    }else if (!(Number.isInteger(Number(input))) || !(input <= 12)) {
        month_error.innerHTML = 'valid month please';
        return true;
    }else if (input.length !== 2) {
        month_error.innerHTML = 'two numbers minimum';
        return true;
    }
    return false;
}

card_month_input.addEventListener('blur', (e)=> {
    let input = card_month_input.value;
    checkError (validMonth ,input ,month_error, e.target);
});

card_year_input.addEventListener('input', ()=> {
    let input = card_year_input.value;
    writeToCard(input,card_year);
});

function validYear(input) {

    if (input == "") {
        year_error.innerHTML = 'year can\'t be blank';
        return true;
    }else if(input == currentYear && card_month_input.value < currentMonth) {
        year_error.innerHTML = 'expired card try another';
        return true;
    }else if(input < currentYear) {
        year_error.innerHTML = 'expired card try another';
        return true;
    }else if(!(Number.isInteger(Number(input)))) {
        year_error.innerHTML = 'valid year please';
        return true;
    }else if (input.toString().length !== 2) {
        year_error.innerHTML = 'two numbers minimum';
        return true;
    }
    return false;
}

card_year_input.addEventListener('blur', (e)=> {
    let input = card_year_input.value;
    checkError (validYear ,input ,year_error, e.target);
});

card_cvc_input.addEventListener('input', ()=> {
    let input = card_cvc_input.value;
    writeToCard(input,card_cvc);
});

function validCvc(input) {
    if(!(Number.isInteger(Number(input)))) {
        cvc_error.innerHTML = 'it must be a number';
        return true;
    }else if (input == "") {
        cvc_error.innerHTML = 'can\'t be blank';
        return true;
    }else if (input.toString().length !== 3) {
        cvc_error.innerHTML = 'three numbers minimum';
        return true;
    }
    return false;
}

card_cvc_input.addEventListener('blur', (e)=> {
    let input = card_cvc_input.value;
    checkError (validCvc ,input ,cvc_error, e.target);
});

function validateAll () {

    if (validName(card_name_input.value)) {
        checkError (validName ,card_name_input.value ,name_error, card_name_input);
        return true;
    } else if (validNumber(card_number_input.value.replace(/\s/g, ''))) {
        checkError (validNumber ,card_number_input.value.replace(/\s/g, '') ,number_error, card_number_input);
        return true;
    }else if (validMonth(card_month_input.value)) {
        checkError (validMonth ,card_month_input.value ,month_error, card_month_input);
        return true;
    }else if (validYear(card_year_input.value)) {
        checkError (validYear ,card_year_input.value ,year_error, card_year_input);
        return true;
    }else if (validCvc(card_cvc_input.value)) {
        checkError (validCvc ,card_cvc_input.value ,cvc_error, card_cvc_input);
        return true;
    }
    return false;
}

form[0].addEventListener('submit', (e)=> {
    e.preventDefault()
    if (!(validateAll())) {
        let text_fields = document.querySelector('.text-fields');
        grid.removeChild(text_fields);
        let thanks = document.createElement('div');
        thanks.classList.add('thank-you-card');
        thanks.innerHTML =
         `  <img class="complete" src="images/icon-complete.svg" alt="">
            <span class="title">THANK YOU</span>
            <p>We've added your card details</p>
            <a href="interactive-card-details-form-main.html"
            class="continue form-button clr-white bg-clr-very-dark-violet">Continue</a> `
        grid.appendChild(thanks);
        const continue_btn = document.querySelector('.continue');
        continue_btn.addEventListener('click', ()=> {
           window.location.href = 'index.html';
        });
    }
});
