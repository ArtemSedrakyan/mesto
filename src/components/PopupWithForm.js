import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor ( {popupSelector, handleFormSubmit} ) {
    super(popupSelector);
    this.form = this._popupElement.querySelector('.popup__form');
    this.inputList = Array.from(this.form.querySelectorAll('.popup__input'))

    this._handleFormSubmit = handleFormSubmit
  }

  _getInputValues() {
    this._formValues = {};
    this.inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    })
  }

  close() {
    super.close();
    this.form.reset();
  }
}

export default PopupWithForm;
