class Popup {
  constructor (popupSelector) {
    this._popupElement = document.querySelector(`.${popupSelector}`);
  }

  open() {
    this._popupElement.classList.add('popup_opened')
  }

  close = () => {
    this._popupElement.classList.remove('popup_opened')
  }

  _handleEscClose = (evt) => {
      if (evt.key === 'Escape') {
        this.close();
    };
  }

  setEventListeners() {
    document.addEventListener('keydown', this._handleEscClose)
    this._popupElement.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup__close-button') || evt.target === this._popupElement) {
        this.close()
      }
    })
  }
}

export default Popup;
