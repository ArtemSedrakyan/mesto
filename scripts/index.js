// Объявление переменных
const initialElements = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
//объявляем переменные для попапа редактировния профиля
const profileEditBtn = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__form_input_name');
let jobInput = document.querySelector('.popup__form_input_job');
// Находим поля профиля в DOM
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
//объявляем переменную для закрытия попапов
const popupCloseBtn = document.querySelectorAll('.popup__close-button');
//переменная-шаблон карточки
const elementTemplate = document.querySelector('.template-element').content;
//Переменная-контейнер с карточками
const elements = document.querySelector('.elements');

//Объявляем переменные для попапа добавления карточек
const elementAddBtn = document.querySelector('.profile__add-button');
const popupTypeAdd = document.querySelector('.popup_type_add');
const elementTitleInput = document.querySelector('.popup__form_input_element_title');
const elementLinkInput = document.querySelector('.popup__form_input_element_link');
const popupFormTypeAdd = document.querySelector('.popup__form_add-element');
//Объявляем переменные попапа просмотра фотографий
const popupTypeView = document.querySelector('.popup_type_view');
const popupDescription = document.querySelector('.popup__description');
const popupImage = document.querySelector('.popup__image');



//Обработчик открытия формы редактирования профиля
function openPopup() {
    popupTypeEdit.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
};

//Обработчик закрытия форм
const closePopup = (evt) => {
  evt.target.closest('.popup').classList.remove('popup_opened');
};
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(evt);
};
//Функция открытия формы добавления карточки
const handleAddElement = (evt) => {
 popupTypeAdd.classList.add('popup_opened');
 elementTitleInput.value = "";
 elementLinkInput.value = "";
};
//Обработчик "отправки" формы на добавление карточки
const formSubmitHandlerAdd = (evt) => {
  evt.preventDefault();
  const element = elementTemplate.cloneNode(true);
  const elementPlaceName = element.querySelector('.element__place-name');
  const elementImage = element.querySelector('.element__image');
  const elementDeleteBtn = element.querySelector('.element__delete-button');
  const elementLikeBtn = element.querySelector('.element__like-button');

  elementLikeBtn.addEventListener('click', handleLikeClick);
  elementDeleteBtn.addEventListener('click', handleDeleteClick);
  elementImage.addEventListener('click', handleImageClick);

  elementPlaceName.textContent = elementTitleInput.value;
  elementImage.src = elementLinkInput.value;
  elementImage.alt = elementTitleInput.value;
  elementPlaceName.textContent = elementTitleInput.value;
  elements.prepend(element);
  closePopup(evt);
};
//Функция добавления лайка карточке
const handleLikeClick = (evt) => {
  evt.target.classList.toggle('element__like-button_active');
};
//Функция удаления карточки
const handleDeleteClick = (evt) => {
  evt.target.closest('.element').remove();
};
//Функция открытия попапа с картинкой
const handleImageClick = (evt) => {
  popupTypeView.classList.add('popup_opened');
  popupDescription.textContent = evt.target.alt;
  popupImage.src = evt.target.src;
};
//Обработчик события открытия формы редактироваиня профиля
profileEditBtn.addEventListener('click', openPopup);
//Обработчик события закрытия форм
for (let i = 0; i < popupCloseBtn.length; ++i) {
  popupCloseBtn[i].addEventListener('click', closePopup)
};
//Обработчик события "отпрвки" формы
formElement.addEventListener('submit', formSubmitHandler);
//Добавление шести карточек из "коробки"
initialElements.forEach(({name, link}) => {
  const element = elementTemplate.cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  const elementPlaceName = element.querySelector('.element__place-name');
  const elementDeleteBtn = element.querySelector('.element__delete-button');
  const elementLikeBtn = element.querySelector('.element__like-button');

  elementAddBtn.addEventListener('click', handleAddElement);
  elementLikeBtn.addEventListener('click', handleLikeClick);
  elementDeleteBtn.addEventListener('click', handleDeleteClick);
  elementImage.addEventListener('click', handleImageClick);
  elementImage.src = link;
  elementImage.alt = name;
  elementPlaceName.textContent = name;
  elements.append(element);
  //Обработчик события добавления карточки
  popupFormTypeAdd.addEventListener('submit', formSubmitHandlerAdd);
});


