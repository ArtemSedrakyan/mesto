import Popup from "./Popup.js";
import { userInfo } from "../pages/index.js";

class PopupWithForm extends Popup {
  constructor ( {popupSelector, handleFormSubmit, buttonCaptionConfig} ) {
    super(popupSelector);
    this.form = this._popupElement.querySelector('.popup__form');
    this.inputList = Array.from(this.form.querySelectorAll('.popup__input'));
    this._buttonSignature = this.form.querySelector('.popup__submit-button');

    this._handleFormSubmit = handleFormSubmit;

    this._buttonCaptionConfig = buttonCaptionConfig;
  };

  _getInputValues() {
    this._formValues = {};
    this.inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  };

  setInputValues() {
    const userInfoData = userInfo.getUserInfo()
    this.inputList.forEach((input) => {
      input.value = userInfoData[input.name];
    })
  };

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    })
  };

  close() {
    super.close();
    this.form.reset();
  };

  toggleButtonCaption(isSaving) {
    this._buttonSignature.textContent = isSaving ? this._buttonCaptionConfig.loadingCaption : this._buttonCaptionConfig.defaultCaption
  };

}

export default PopupWithForm;
