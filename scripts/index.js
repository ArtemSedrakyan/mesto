//Переменная-контейнер с карточками
const elements = document.querySelector('.elements');
//переменная-шаблон карточки
const elementTemplate = document.querySelector('.template-element');
//объявляем переменную для закрытия попапов
const popupCloseBtn = document.querySelectorAll('.popup__close-button');
//объявляем переменные для попапа редактировния профиля
const profileEditBtn = document.querySelector('.profile__edit-button');
//Находим все попапы на странице, создаем из них массив
const popupList = Array.from(document.querySelectorAll('.popup'));
// Находим форму редактирования в DOM
const popupTypeEdit = document.querySelector('.popup_type_edit');
const formElementEdit = popupTypeEdit.querySelector('.popup__form_type_edit');
// Находим поля формы редактирования в DOM
const nameInput = formElementEdit.querySelector('.popup__input_type_name');
const jobInput = formElementEdit.querySelector('.popup__input_type_job');
// Находим поля профиля в DOM
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
//Объявляем переменные для попапа добавления карточек
const elementAddBtn = document.querySelector('.profile__add-button');
const popupTypeAdd = document.querySelector('.popup_type_add');
const formElementAdd = popupTypeAdd.querySelector('.popup__form_type_add');
//Переменная кнопки сохранения на форме добавления карточки
const submitAddFormBtn = formElementAdd.querySelector('.popup__submit-button');
// Находим поля формы добавления в DOM
const elementTitleInput = formElementAdd.querySelector('.popup__input_type_title');
const elementLinkInput = formElementAdd.querySelector('.popup__input_type_link');
//Объявляем переменные попапа просмотра фотографий
const popupTypeView = document.querySelector('.popup_type_view');
const popupViewFigure = popupTypeView.querySelector('.popup__figure');
const popupDescription = popupTypeView.querySelector('.popup__description');
const popupImage = popupTypeView.querySelector('.popup__image');

import { initialElements, configFormValidation} from './elements.js';
import FormValidator from './FormValidator.js';
import { Card } from './Card.js';

//Функция закрытия попапа по нажатию клавиши Escape
const handleEscapePopup = (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  };
};
//Функция скрытия текста ошибки валидации форм
const removeActiveError = (activePopup) => {
  //переменная ошибки валидации на инпуте
  const activeInputList = Array.from(activePopup.querySelectorAll('.popup__input'));
  //сброс ошибки валидации на инпуте
  activeInputList.forEach(inputItem => {
    if (inputItem.classList.contains('popup__input_type_error')) {
      inputItem.classList.remove('popup__input_type_error');
    };
  });
  //Переменная текста ошибки валидации форм
  const activeErrorList = Array.from(activePopup.querySelectorAll('.popup__input-error'));
  //сброс ошибки валидации на тексте
  activeErrorList.forEach(errorItem => {
    if (errorItem.classList.contains('popup__input-error_visible')) {
      errorItem.classList.remove('popup__input-error_visible');
    };
  });
};
//Создаем пустой объект для записи экземпляров класса FormValidator
const formValidators = {};
//Создаем экземпляры класса FormValidator, находя формы по ключу name.
//Включаем валидацию для каждой формы
Array.from(document.forms).forEach(formElement => {
  formValidators[formElement.name] = new FormValidator(configFormValidation, formElement);
  formValidators[formElement.name].enableValidation();
});

//Функция открытия форм
function openPopup(popupType) {
  popupType.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscapePopup)
};
//Функция закрытия форм
function closePopup(popupType) {
  popupType.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscapePopup);
};
//Функция открытия попапа просмотра
export function openPopupView ({name, link}) {
  popupDescription.textContent = name;
  popupImage.src = link
  popupImage.alt = name;
  openPopup(popupTypeView);
}
// Обработчик «отправки» формы редактирования профиля, хотя пока
// она никуда отправляться не будет
function submitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupTypeEdit);
};

//Обработчик события открытия формы редактироваиня профиля
profileEditBtn.addEventListener('click', function() {
  openPopup(popupTypeEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});
//Обработчик события открытия формы добавления карточки
elementAddBtn.addEventListener('click', function() {
  openPopup(popupTypeAdd);
  elementTitleInput.value = "";
  elementLinkInput.value = "";
  if (!submitAddFormBtn.classList.contains('popup__submit-button_disabled')) {
    submitAddFormBtn.classList.add('popup__submit-button_disabled');
    submitAddFormBtn.disabled = true;
  };
});
//Обработчик события закрытия форм
popupList.forEach(popup => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close-button') || evt.target === popup) {
      closePopup(popup);
      const popupElementList = Array.from(popup.children);
      const formInPopup = popupElementList.some(function(form) {
        return form.localName === 'form';
      });
      if (formInPopup) {
        removeActiveError(popup);
      };
    };
  });
});
//Обработчик события "отпрвки" формы
formElementEdit.addEventListener('submit', submitProfileForm);

//Добавление шести карточек из "коробки"
initialElements.forEach( (item) => {
  const defaultCard = new Card (item.name, item.link, '.template-element')
  const cardBlock = defaultCard.generateCard();

  elements.append(cardBlock);
});
//Обработчик события добавления карточки
formElementAdd.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newElement = new Card (elementTitleInput.value, elementLinkInput.value, '.template-element');
  const newCard = newElement.generateCard();
  elements.prepend(newCard);
  closePopup(popupTypeAdd);
});
