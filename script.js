const submit = document.querySelector(".submit-btn");

// input text fields
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const message = document.querySelector(".message");

// checked fields
const radioButtons = document.querySelectorAll(`input[name="query-type"]`);
const checkedInput = document.querySelector("#consent");

// messages
const required = "This field is required";
const validEmail = "Please enter a valid email address";
const radioMessage = "Please select a query type";
const consentMessage = "To submit this form, please consent to being contacted";

const succesMessage = document.querySelector(".success");

submit.addEventListener("click", (event) => {
    event.preventDefault();

    const isFirstNameValid = checkInput(firstName, required);
    const isLastNameValid = checkInput(lastName, required);
    const isMessageValid = checkInput(message, required);

    const isEmailValid = emailCheck(email, validEmail);
    const isRadioValid = radioCheck(radioButtons, radioMessage);
    const isConsentValid = consentCheck(checkedInput, consentMessage);

    if (isFirstNameValid && isLastNameValid && isMessageValid && isEmailValid && isRadioValid && isConsentValid) {
        succesMessage.style.display = "block";
        clearInputs();
    } else {
        succesMessage.style.display = "none";
    }
});

// checks valid inputs
const checkInput = (input, errorMessage) => {
    const error = input.nextElementSibling;

    if (input.value.trim() === ""){
        error.textContent = errorMessage;
        input.style.borderColor = "red";
        return false;
    } else {
        error.textContent = "";
        input.style.borderColor = "black";
        return true;
    }
};

const emailCheck = (email, errorMessage) => {
    const error = email.nextElementSibling;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.value.trim())) {
        error.textContent = errorMessage;
        email.style.borderColor = "red";
        return false;
    } else {
        error.textContent = "";
        email.style.borderColor = "black";
        return true;
    }
};

const radioCheck = (radios, errorMessage) => {
    const error = radios[0].parentNode.parentNode.nextElementSibling;
    const isChecked = Array.from(radios).some(radio => radio.checked);

    if (!isChecked){
        error.textContent = errorMessage;
        return false;
    } else {
        error.textContent = "";
        return true;
    }
};

const consentCheck = (check, errorMessage) => {
    const error = check.nextElementSibling.nextElementSibling;
    
    if (!check.checked){
        error.textContent = errorMessage;
        return false;
    } else {
        error.textContent = "";
        return true;
    }
};

const clearInputs = () => {
    firstName.value = "";
    lastName.value = "";
    email.value = "";
    message.value = "";
    
    radioButtons.forEach(radio => radio.checked = false);
    checkedInput.checked = false;
};


// controls if smth has changed in the input
[firstName, lastName, email, message].forEach(input => {
    input.addEventListener("input", () => {
        checkInput(input, required);
    });
});

radioButtons.forEach(radio => {
    radio.addEventListener("change", () => {
        radioCheck(radioButtons, radioMessage);
    });
});

checkedInput.addEventListener("change", () => {
    consentCheck(checkedInput, consentMessage);
});

