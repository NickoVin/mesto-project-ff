let configuration = null;

// Функция включения валидации форм
export function enableValidation(externalConfig) {
    setConfiguration(externalConfig);

    const formsList = Array.from(document.querySelectorAll(configuration.formSelector));   

    formsList.forEach(formElement => {
        formElement.addEventListener('submit', evt => evt.preventDefault());
        setEventListeners(formElement);
    });
}

// Функция очистки ошибок валидации
export function clearValidation(formElement, externalConfig) {
    setConfiguration(externalConfig);

    const inputList = Array.from(formElement.querySelectorAll(configuration.inputSelector));
    inputList.forEach(inputElement => hideInputError(formElement, inputElement));
    
    disableSubmitButton(formElement.querySelector(configuration.submitButtonSelector));
}

// Функция валидации полей формы
function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(configuration.inputSelector));
    const buttonElement = formElement.querySelector(configuration.submitButtonSelector);
    
    toggleButtonState(inputList, buttonElement);
    
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

// Функция переключенеия кнопки отправки формы
function toggleButtonState(inputList, buttonElement) {
    hasInvalidInput(inputList) ? disableSubmitButton(buttonElement) : enableSubmitButton(buttonElement);
};

function disableSubmitButton(buttonElement) {
    buttonElement.disabled = true;
    buttonElement.classList.add(configuration.inactiveButtonClass);
}

function enableSubmitButton(buttonElement) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(configuration.inactiveButtonClass);
}

// Функция проверки наличия невалидного поля формы
function hasInvalidInput(inputList) {
    return inputList.some((input) => {
        return !input.validity.valid;
    });
};

// Функция проверки валидности поля формы
function checkInputValidity(formElement, inputElement) {
    inputElement.setCustomValidity('');

    if (!inputElement.validity.valid) {
        if (inputElement.validity.patternMismatch) {
            inputElement.setCustomValidity(inputElement.dataset.errorMessage);
        }

        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

// Функция показа текста ошибки валидации
function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(configuration.inputErrorClass);
    errorElement.classList.add(configuration.errorClass);

    errorElement.textContent = errorMessage;
};

// Функция скрытия текста ошибки валидации
function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(configuration.inputErrorClass);
    errorElement.classList.remove(configuration.errorClass);

    errorElement.textContent = '';
};

// Функия проверки корректности конфигурации
function setConfiguration(externalConfig) {
    if (!externalConfig || configuration) return;

    const configurationKeys = [
        'formSelector',
        'inputSelector',
        'submitButtonSelector',
        'inactiveButtonClass',
        'inputErrorClass',
        'errorClass'
    ]

    const isValid = configurationKeys.every( key =>
        key in externalConfig &&
        externalConfig.key != ''
    );

    if (!isValid) return;

    configuration = externalConfig;
}