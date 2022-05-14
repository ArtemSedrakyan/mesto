//Переменная-контейнер с карточками
const elements = document.querySelector('.elements');
//переменная-шаблон карточки
const elementTemplate = document.querySelector('.template-element').content;
//объявляем переменную для закрытия попапов
const popupCloseBtn = document.querySelectorAll('.popup__close-button');
//объявляем переменные для попапа редактировния профиля
const profileEditBtn = document.querySelector('.profile__edit-button');
//Находим все попапы на странице, создаем из них массив
const popupList = Array.from(document.querySelectorAll('.popup'));
// Находим форму редактирования в DOM
const popupTypeEdit = document.querySelector('.popup_type_edit');
const formElementEdit = popupTypeEdit.querySelector('.popup__form_edit-profile');
// Находим поля формы редактирования в DOM
const nameInput = formElementEdit.querySelector('.popup__form_input_name');
const jobInput = formElementEdit.querySelector('.popup__form_input_job');
// Находим поля профиля в DOM
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
//Объявляем переменные для попапа добавления карточек
const elementAddBtn = document.querySelector('.profile__add-button');
const popupTypeAdd = document.querySelector('.popup_type_add');
const formElementAdd = popupTypeAdd.querySelector('.popup__form_add-element');
// Находим поля формы добавления в DOM
const elementTitleInput = formElementAdd.querySelector('.popup__form_input_element-title');
const elementLinkInput = formElementAdd.querySelector('.popup__form_input_element-link');
//Объявляем переменные попапа просмотра фотографий
const popupTypeView = document.querySelector('.popup_type_view');
const popupViewFigure = popupTypeView.querySelector('.popup__figure');
const popupDescription = popupTypeView.querySelector('.popup__description');
const popupImage = popupTypeView.querySelector('.popup__image');

//Функция открытия форм
function openPopup(popupType) {
  popupType.classList.add('popup_opened');
};
//Функция закрытия форм
function closePopup(popupType) {
  popupType.classList.remove('popup_opened');
};
// Обработчик «отправки» формы редактирования профиля, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupTypeEdit);
};

//Функция добавления лайка карточке
const handleLikeClick = (evt) => {
  evt.target.classList.toggle('element__like-button_active');
};
//Функция удаления карточки
const handleDeleteClick = (evt) => {
  evt.target.closest('.element').remove();
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
});
//Обработчик события закрытия форм
popupList.forEach(popup => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  });
});

//Обработчик события "отпрвки" формы
formElementEdit.addEventListener('submit', formSubmitHandler);
//Функция создания новой карточки
const createElement = ({name, link}) => {
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const elementPlaceName = element.querySelector('.element__place-name');
  const elementImage = element.querySelector('.element__image');
  const elementDeleteBtn = element.querySelector('.element__delete-button');
  const elementLikeBtn = element.querySelector('.element__like-button');
  elementImage.src = link;
  elementImage.alt = name;
  elementPlaceName.textContent = name;
  elementLikeBtn.addEventListener('click', handleLikeClick);
  elementDeleteBtn.addEventListener('click', handleDeleteClick);
  elementImage.addEventListener('click', (evt) => {
    openPopup(popupTypeView);
    popupDescription.textContent = evt.target.alt;
    popupImage.src = evt.target.src;
  });
  return element;
};
//Добавление шести карточек из "коробки"
initialElements.forEach( (item) => elements.append(createElement(item)));
//Обработчик события добавления карточки
formElementAdd.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newElement = createElement({name: elementTitleInput.value, link: elementLinkInput.value});
  elements.prepend(newElement);
  closePopup(popupTypeAdd);
});
