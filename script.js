const mainForm = document.forms['userInfo'];
const inputElements = document.querySelectorAll('input');
const mandatoryFields = document.querySelectorAll('.required');

const regexRules = {
    username: /^[a-zA-Z]+$/,
    age: /^(?:[1-9][0-9]?|100)$/,
    aboutYou: /^[a-zA-Z]+$/,
    emailAddress: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    whatIsJavaScript: /^[a-zA-Z]+$/,
    html: /^[a-zA-Z]+$/,
    css: /^[a-zA-Z]+$/
};

function updateStats() {
    const validFields = document.querySelectorAll('.required.passed');
    const invalidFields = document.querySelectorAll('.required.failed');

    document.getElementById('total').textContent = `All: ${inputElements.length}`;
    document.getElementById('required').textContent = `Need: ${mandatoryFields.length}`;
    document.getElementById('completed').textContent = `Success: ${validFields.length}/${mandatoryFields.length}`;
    document.getElementById('errors').textContent = `Error: ${invalidFields.length}/${mandatoryFields.length}`;
}

function checkInputs(fieldsToCheck) {
    let formIsValid = true;

    fieldsToCheck.forEach((input) => {
        if (!input.classList.contains('required')) return;

        const rule = regexRules[input.name];
        const value = input.value.trim();

        input.classList.remove('passed', 'failed');

        if (value !== '' && rule && rule.test(value)) {
            input.style.border = '2px solid green';
            input.previousElementSibling.style.color = 'green';
            input.nextElementSibling.textContent = '✔ Всё ок';
            input.nextElementSibling.style.color = 'green';
            input.classList.add('passed');
        } else {
            input.style.border = '2px solid red';
            input.previousElementSibling.style.color = 'red';
            input.nextElementSibling.textContent = '✘ Ошибка';
            input.nextElementSibling.style.color = 'red';
            input.classList.add('failed');
            formIsValid = false;
        }
    });

    updateStats();
    return formIsValid;
}

inputElements.forEach((input) => {
    input.addEventListener('input', () => {
        checkInputs([input]);
    });
});

mainForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!checkInputs(mandatoryFields)) return;

    const collected = new FormData(mainForm);
    const result = {};

    for (let [key, value] of collected.entries()) {
        result[key] = value;
    }

    console.log(result);
});

updateStats();
