import Popup from './Popup.js'

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open = (evt) => {
    this._popupElement.querySelector('.popup__image').src = evt.target.src;
    this._popupElement.querySelector('.popup__image').alt = evt.target.alt;
    this._popupElement.querySelector('.popup__description').textContent = evt.target.alt;
    super.open();
  }
}

export default PopupWithImage;
