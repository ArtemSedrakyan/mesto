const configList = {
  formSelector: 'popup__form',
  inputSelector: 'popup__input',
  submitButtonSelector: 'popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

const showInputError = (formElement, inputElement, errorMessage, inputErrorModifier, errorModifier) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorModifier);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorModifier);
};

const hideInputError = (formElement, inputElement, inputErrorModifier, errorModifier) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorModifier);
  errorElement.textContent = "";
  errorElement.classList.remove(errorModifier);
};

const checkInputValidity = (formElement, inputElement, inputErrorModifier, errorModifier) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorModifier, errorModifier);
  } else {
    hideInputError(formElement, inputElement, inputErrorModifier, errorModifier);
  };
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonModifier) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonModifier);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonModifier);
    buttonElement.disabled = false;
  };
};

const setEventListeners = (formElement, configListInteraction) => {
  const {inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass} = configListInteraction;
  const inputList = Array.from(formElement.querySelectorAll(`.${inputSelector}`));
  const buttonElement = formElement.querySelector(`.${submitButtonSelector}`);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

const enableValidation = (configListForm) => {
  const {formSelector} = configListForm;
  const formList = Array.from(document.querySelectorAll(`.${formSelector}`));

  formList.forEach ((formElement) => {
    formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    });
    setEventListeners(formElement, configListForm);
  });
};
// включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation(configList);
