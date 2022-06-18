import {openPopupView} from './index.js'

export class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
  };

  //Метод создания новой карточки
  _getTemplate() {
    this._element = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return this._element;
  };

  _fillData() {
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__place-name').textContent = this._name;
  }

  //Метод добавления лайка карточке
  _handleLikeClick = () => {
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  };

  //Метод удаления карточки
  _handleDeleteClick = () => {
    this._element.remove();
  };

  //Метод открытия попапа просмотра катринки
  _handleOpenView = () => {
    openPopupView({name: this._name, link: this._link});
  };

  //Метод установки слушателей лайка и удаления карточки
  _setEventListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', this._handleLikeClick);
    this._element.querySelector('.element__delete-button').addEventListener('click', this._handleDeleteClick);
    this._element.querySelector('.element__image').addEventListener('click', this._handleOpenView);
  };

  generateCard() {
    this._getTemplate();
    this._fillData();
    this._setEventListeners();

    return this._element;
  }
};
