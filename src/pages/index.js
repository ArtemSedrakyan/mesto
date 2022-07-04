//DOM-элемент кнопки открытия попапа редактировния профиля
const profileEditBtn = document.querySelector('.profile__edit-button');
//DOM-элемент кнопки открытия попапа добавления карточек
const elementAddBtn = document.querySelector('.profile__add-button');

//Импорты переменных и классов
import { initialElements, configFormValidation } from '../constants/elements.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js'

import './index.css'

//Экземпляр класса с данными пользователя
const userInfo = new UserInfo ({
  profileNameSelector: 'profile__name',
  profileJobSelector: 'profile__job'
})

//Создаем попап редактирования профиля
const popupTypeEdit = new PopupWithForm({
  popupSelector: 'popup_type_edit',
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData);
    popupTypeEdit.close();
  }
})
//Устанавливаем слушатели на попап редактирования профиля
popupTypeEdit.setEventListeners();

//Создаем попап добавления карточки
const popupTypeAdd = new PopupWithForm({
  popupSelector: 'popup_type_add',
  handleFormSubmit: (formData) => {
    const newCard = createCard(formData);
    initialSection.addNewItem(newCard);
    initialSection.renderItems();
    popupTypeAdd.close();
  }
})
//Устанавливаем слушатели на попап добавления карточки
popupTypeAdd.setEventListeners();

//Создаем попап просмотра фотогафии
const popupTypeView = new PopupWithImage ('popup_type_view');
//Устанавливаем слушатели на попап просмотра фотографии
popupTypeView.setEventListeners();

//Создаем экземпляры класса FormValidator.
//Включаем валидацию для каждой формы
const formEditValidator = new FormValidator(configFormValidation, popupTypeEdit.form);
formEditValidator.enableValidation();

const formAddValidator = new FormValidator(configFormValidation, popupTypeAdd.form);
formAddValidator.enableValidation();

//Функция создания карточки
function createCard(data) {
  const defaultCard = new Card (data, '.template-element', popupTypeView.open)
  const cardBlock = defaultCard.generateCard();

  return cardBlock;
}

//Обработчик события открытия формы редактироваиня профиля
profileEditBtn.addEventListener('click', () => {
  const userInfoData = userInfo.getUserInfo()
  popupTypeEdit.inputList.forEach( (input) => {
    input.value = userInfoData[input.name]
  });
  formEditValidator.resetValidation();
  popupTypeEdit.open();
});
//Обработчик события открытия формы добавления карточки
elementAddBtn.addEventListener('click', () => {
  formAddValidator.resetValidation();
  popupTypeAdd.open();
});

// Создаем экземпляр класса Section для отрисовки начальных карточек
const initialSection = new Section ({
  items: initialElements,
  renderer:  (item) => {
    const cardElement = createCard(item)
    initialSection.addItem(cardElement)
  }
},
'.elements'
);
//отрисовка начальных карточек
initialSection.renderItems();
