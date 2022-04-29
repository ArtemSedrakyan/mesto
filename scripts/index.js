// Объявление переменных
const popup = document.querySelector('.popup');
const editProfileBtn = document.querySelector('.profile__edit-button');
const popupCloseBtn = document.querySelector('.popup__close-button');
// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__form_input_name');
let jobInput = document.querySelector('.popup__form_input_job');
// Находим поля профиля в DOM
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

//Обработчик открытия формы
function openPopup() {
  if (popup.classList.contains('popup_opened')) {

  } else {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  }
};
//Обработчик закрытия формы
function closePopup() {
  if (popup.classList.contains('popup_opened')) {
    popup.classList.remove('popup_opened');
  }
};
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
};

//Обработчик события открытия формы
editProfileBtn.addEventListener('click', openPopup);
//Обработчик события закрытия формы
popupCloseBtn.addEventListener('click', closePopup);
//Обработчик события "отпрвки" формы
formElement.addEventListener('submit', formSubmitHandler);

