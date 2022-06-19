export class Card {
  constructor(name, link, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  };

  //Метод создания новой карточки
  _getTemplate() {
    this._element = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return this._element;
  };

  //Метод заполнения карточки данными
  _fillData() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._placeName.textContent = this._name;
  }

  //Метод добавления лайка карточке
  _handleLikeClick = () => {
    this._likeBtn.classList.toggle('element__like-button_active');
  };

  //Метод удаления карточки
  _handleDeleteClick = () => {
    this._element.remove();
  };

  //Метод установки слушателей лайка и удаления карточки
  _setEventListeners() {
    this._likeBtn = this._element.querySelector('.element__like-button');
    this._deleteBtn = this._element.querySelector('.element__delete-button');
    this._cardImage = this._element.querySelector('.element__image');
    this._placeName = this._element.querySelector('.element__place-name');

    this._likeBtn.addEventListener('click', this._handleLikeClick);
    this._deleteBtn.addEventListener('click', this._handleDeleteClick);
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
  };

  //Публичный метод получения готовой карточки
  generateCard() {
    this._getTemplate();
    this._setEventListeners();
    this._fillData();

    return this._element;
  }
};
