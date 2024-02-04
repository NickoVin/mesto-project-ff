// Функция включения валидации форм
export function enableValidation(config) {
    const formsList = Array.from(document.querySelectorAll(config.formSelector));   

    formsList.forEach(formElement => {
        formElement.addEventListener('submit', evt => evt.preventDefault());
        setEventListeners(formElement, config);
    });
}

// Функция очистки ошибок валидации
export function clearValidation(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    inputList.forEach(inputElement => hideInputError(formElement, inputElement, config));
    
    disableSubmitButton(formElement.querySelector(config.submitButtonSelector), config);
}

// Функция валидации полей формы
function setEventListeners(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    
    toggleButtonState(inputList, buttonElement, config);
    
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
            checkInputValidity(formElement, inputElement, config);
            toggleButtonState(inputList, buttonElement, config);
        });
    });
};

// Функция переключенеия кнопки отправки формы
function toggleButtonState(inputList, buttonElement, config) {
    hasInvalidInput(inputList) ? disableSubmitButton(buttonElement, config) : enableSubmitButton(buttonElement, config);
};

function disableSubmitButton(buttonElement, config) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
}

function enableSubmitButton(buttonElement, config) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
}

// Функция проверки наличия невалидного поля формы
function hasInvalidInput(inputList) {
    return inputList.some((input) => {
        return !input.validity.valid;
    });
};

// Функция проверки валидности поля формы
function checkInputValidity(formElement, inputElement, config) {
    inputElement.setCustomValidity('');

    if (!inputElement.validity.valid) {
        if (inputElement.validity.patternMismatch) {
            inputElement.setCustomValidity(inputElement.dataset.errorMessage);
        }

        showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
        hideInputError(formElement, inputElement, config);
    }
};

// Функция показа текста ошибки валидации
function showInputError(formElement, inputElement, errorMessage, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(config.inputErrorClass);
    errorElement.classList.add(config.errorClass);

    errorElement.textContent = errorMessage;
};

// Функция скрытия текста ошибки валидации
function hideInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);

    errorElement.textContent = '';
};