class FormValidator {
  constructor (configList, form) {
    this._inputSelector = configList.inputSelector;
    this._submitButtonSelector = configList.submitButtonSelector;
    this._inactiveButtonClass = configList.inactiveButtonClass;
    this._inputErrorClass = configList.inputErrorClass
    this._errorClass = configList.errorClass;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(`.${this._inputSelector}`));
    this._buttonElement = this._form.querySelector(`.${this._submitButtonSelector}`);
  }

  _showInputError (inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError (inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = " ";
    errorElement.classList.remove(this._errorClass);
  };

  _checkInputValidity () {
    this._inputList.forEach ((inputElement) => {
      if (!inputElement.validity.valid) {
        const errorMessage = inputElement.validationMessage;
        this._showInputError(inputElement, errorMessage);
      } else {
        this._hideInputError(inputElement);
      };
    })
  };

  _hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState (buttonElement) {
    if (this._hasInvalidInput(this._inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    };
  };

  resetValidation() {
    this._toggleButtonState(this._buttonElement);

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  };

  _setEventListeners = () => {
    this._checkInputValidity();
    this._toggleButtonState(this._buttonElement);
  };

  enableValidation () {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', this._setEventListeners);
    });
  };
};

export default FormValidator;
