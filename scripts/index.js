const editProfileBtn = document.querySelector('.profile__info_edit-button');
const popup = document.querySelector('.popup');
const popupCloseBtn = document.querySelector('.popup__close-button');

editProfileBtn.addEventListener('click', function () {
  togglePopup();
});

popupCloseBtn.addEventListener('click', function () {
  togglePopup();
});

function togglePopup() {
  popup.classList.toggle('popup_opened');
};

let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__form_input-name');
let jobInput = document.querySelector('.popup__form_input-job');
let profileName = document.querySelector('.profile__info_name');
let profileJob = document.querySelector('.profile__info_comment');

function formSubmitHandler (evt) {
  evt.preventDefault();
  nameInput.getAttribute('value');
  jobInput.getAttribute('value');
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  togglePopup();
};

formElement.addEventListener('submit', formSubmitHandler);

