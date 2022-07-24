class Card {
  constructor(data, userId, templateSelector, { handleCardClick, handleCardDelete, handleCardLike} ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this.cardId = data._id
    this._ownerId = data.owner._id;

    this.userId = userId;

    this._templateSelector = templateSelector;

    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleCardDelete;
    this._handleLikeCard = handleCardLike;

    this._isOwner = this.userId === this._ownerId;
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
    this._renderLikes();
  }

  //Метод проверки наличия пользовательского лайка на карточке
  _isLiked() {
    return this._likes.map(item => item._id).includes(this.userId);
  }
  //Метод отрисовки состояния лайков
  _renderLikes() {
    if (this._isLiked()) {
      this._likeBtn.classList.add('element__like-button_active');
    } else {
      this._likeBtn.classList.remove('element__like-button_active');
    }
    this._likesCounter.textContent = this._likes.length;
  }
  //Метод переустановки лайков
  setLikes = (newLikes) => {
    this._likes = newLikes;
    this._renderLikes();
}

  removeCard = () => {
    this._element.remove();
  };

  _checkCardOwner() {
    if (!this._isOwner) {
      this._deleteBtn.remove();
      return this._element;
    }
  }

  //Метод установки слушателей лайка и удаления карточки
  _setEventListeners() {
    this._likeBtn = this._element.querySelector('.element__like-button');
    this._deleteBtn = this._element.querySelector('.element__delete-button');
    this._cardImage = this._element.querySelector('.element__image');
    this._placeName = this._element.querySelector('.element__place-name');
    this._likesCounter = this._likeBtn.querySelector('.element__like-counter');

    this._likeBtn.addEventListener('click', () => {
      this._handleLikeCard(this.cardId, this._isLiked(), this.setLikes)
    });
    this._deleteBtn.addEventListener('click', () => {
      this._handleDeleteClick(this.cardId, this.removeCard)
    });
    this._cardImage.addEventListener('click', this._handleCardClick);
  };

  //Публичный метод получения готовой карточки
  generateCard() {
    this._getTemplate();
    this._setEventListeners();
    this._checkCardOwner();
    this._fillData();

    return this._element;
  }
};

export default Card;
