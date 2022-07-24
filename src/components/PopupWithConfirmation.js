import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor ( {popupSelector, handleFormSubmit}, buttonCaptionConfig ) {
    super(popupSelector);
    this.form = this._popupElement.querySelector('.popup__form');

    this._handleFormSubmit = handleFormSubmit;
  };

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this.cardId, this.removeCard, this.close);
    })
  };

  open = (cardId, removeCard) => {
    this.cardId = cardId;
    this.removeCard = removeCard;
    super.open();
  };

  close = () => {
    super.close()
  };
}

export default PopupWithConfirmation;
