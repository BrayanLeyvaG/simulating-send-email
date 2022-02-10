//VARIABLES
const sendBtn = document.querySelector('#send');
const resetBtn = document.querySelector('#reset-btn')
const allform = document.querySelector('#complete-form')

//INPUT VARIABLES
const inputEmail = document.querySelector('#mail');
const inputSubject = document.querySelector('#subject');
const inputMsg = document.querySelector('#msg');
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

eventListeners();
function eventListeners() {
    //When app start
    document.addEventListener('DOMContentLoaded', startApp);

    //Inputs form
    inputEmail.addEventListener('blur', checkForm);
    inputSubject.addEventListener('blur', checkForm);
    inputMsg.addEventListener('blur', checkForm);

    //Form reset
    resetBtn.addEventListener('click', formReset)

    //Send Email
    allform.addEventListener('submit', sendEmail);   
    
}


//FUNCTIONS
function startApp(){
    sendBtn.disabled = true;
    spinner.style.display = 'none'
}

//Check form
function checkForm(e) {
    
    if(e.target.value.length > 0 ){
        
        //Delete errors..
        const error = document.querySelector('p.error');
        if(error){
            error.remove();
        }
        
        e.target.classList.remove('is-invalid');
        e.target.classList.add('is-valid');
    }else{
        e.target.classList.remove('is-valid')
        e.target.classList.add('is-invalid');
        showError('All fields are required');
    }
    
    if(e.target.type === 'email'){
        
        if(re.test(e.target.value)){
            const error = document.querySelector('p.error');
            if(error){
                error.remove();
            }

    
            e.target.classList.remove('is-invalid');
            e.target.classList.add('is-valid');
        }else{
            e.target.classList.remove('is-valid')
            e.target.classList.add('is-invalid');

            showError('Invalid Email');
        }
        
    }

    if(re.test(inputEmail.value) && inputSubject.value !== '' && inputMsg.value !== ''){
        sendBtn.disabled = false;
    }
}

function showError(message){
    const msgError = document.createElement('p');
    msgError.textContent = message;
    msgError.classList.add('text-center', 'fs-2', 'text-danger', 'p-3', 'border', 'border-danger', 'm-3', 'border-2', 'error');

    const errors = document.querySelectorAll('.error');
    if (errors.length === 0 ) {
        allform.appendChild(msgError);
    }

    
}

function sendEmail(e) {
    e.preventDefault();
    
    //Spinner
    const divSpinner = document.querySelector('#div-spinner')
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    //After 3sec spinner hidden
    setTimeout(() => {
        spinner.style.display = 'none';

        //Message
        const paragraph = document.createElement('p');
        paragraph.textContent = 'Your message has been succesfully sent :)'
        paragraph.classList.add('text-center', 'fs-2', 'text-success' )

        allform.insertBefore(paragraph, divSpinner)

        setTimeout(()=>{
            paragraph.remove()
            formReset();
        }, 3000);

    }, 3000);

}

//Function form reset
function formReset() {
    allform.reset();

    startApp();

    deleteColors(inputEmail, inputSubject, inputMsg);    
}

function deleteColors(inputEmail, inputSubject, inputMsg) {
    const class1 = 'is-valid';
    const class2 = 'is-invalid';
    inputEmail.classList.remove(class1, class2);
    inputSubject.classList.remove(class1, class2);
    inputMsg.classList.remove(class1, class2);
    const error = document.querySelector('p.error');
    if (error) {
        error.remove(); 
    }
};