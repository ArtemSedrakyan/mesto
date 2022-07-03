import Popup from './Popup.js'

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupElement.querySelector('.popup__image');
    this._description = this._popupElement.querySelector('.popup__description');
  }

  open = (evt) => {
    this._image.src = evt.target.src;
    this._image.alt = evt.target.alt;
    this._description.textContent = evt.target.alt;
    super.open();
  }
}

export default PopupWithImage;
