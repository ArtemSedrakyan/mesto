//DOM-элемент кнопки открытия попапа редактировния профиля
const profileEditBtn = document.querySelector(".profile__edit-button");
//DOM-элемент кнопки открытия попапа редактирования аватара
const avatarEditBtn = document.querySelector(".profile__avatar-button")
//DOM-элемент кнопки открытия попапа добавления карточек
const elementAddBtn = document.querySelector(".profile__add-button");

//Импорты переменных и классов
import { configFormValidation, buttonCaptions } from "../constants/elements.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

import "./index.css";

//Создание экземпляра класса с запросами к серверу
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-45",
  headers: {
    authorization: "0e07ca47-16aa-4854-8497-cd212061b1a1",
    "Content-Type": "application/json",
  },
});

//Экземпляр класса с данными пользователя
const userInfo = new UserInfo({
  profileNameSelector: "profile__name",
  profileJobSelector: "profile__about",
  profileAvatarSelector: "profile__avatar",
})

//Создаем попап редактирования профиля
const popupTypeEdit = new PopupWithForm({
  popupSelector: "popup_type_edit",
  handleFormSubmit: (formData) => {
    popupTypeEdit.toggleButtonCaption(true);
    api.patchProfileData(formData)
    .then( () => {
      api.getUserInfo()
      .then((res) => {
        userInfo.setUserInfo(res);
        popupTypeEdit.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupTypeEdit.toggleButtonCaption(false);
      })
    })
    .catch((err) => {
      console.log(err);
    });
  },
  buttonCaptionConfig: buttonCaptions,
  inputValuesSetter: setInputs
});
//Устанавливаем слушатели на попап редактирования профиля
popupTypeEdit.setEventListeners();

//Создаем попап редактирования аватара
const popupTypeAvatar = new PopupWithForm({
  popupSelector: "popup_type_avatar",
  handleFormSubmit: (formData) => {
    popupTypeAvatar.toggleButtonCaption(true);
    api.patchProfileAvatar(formData)
    .then(() => {
      api.getUserInfo()
      .then((res) => {
        userInfo.setUserAvatar(res.avatar);
        popupTypeAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupTypeAvatar.toggleButtonCaption(false);
      });
    });
  },
  buttonCaptionConfig: buttonCaptions,
  inputValuesSetter: setInputs
});
//Устанавливаем слушатели на попап редактирования аватара
popupTypeAvatar.setEventListeners();

//Создаем попап добавления карточки
const popupTypeAdd = new PopupWithForm({
  popupSelector: "popup_type_add",
  handleFormSubmit: (formData) => {
    popupTypeAdd.toggleButtonCaption(true);
    api.addNewCard(formData)
    .then((res) => {
      initialSection.renderItems([res]);
      popupTypeAdd.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupTypeAdd.toggleButtonCaption(false);
    });
  },
  buttonCaptionConfig: buttonCaptions
});
//Устанавливаем слушатели на попап добавления карточки
popupTypeAdd.setEventListeners();

//Создаем попап подтверждения действия
const popupTypeConfirmation = new PopupWithConfirmation({
  popupSelector: "popup_type_confirm",
  handleFormSubmit: (cardId, removeCard, closePopup) => {
    api.deleteCard(cardId)
    .then(() => {
      removeCard();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      closePopup();
    })
  }
})

//Устанавливаем слушатели на попап подтверждения действия
popupTypeConfirmation.setEventListeners();

//Создаем попап просмотра фотогафии
const popupTypeView = new PopupWithImage("popup_type_view");
//Устанавливаем слушатели на попап просмотра фотографии
popupTypeView.setEventListeners();

//Создаем экземпляры класса FormValidator.
//Включаем валидацию для каждой формы
const formEditValidator = new FormValidator(
  configFormValidation,
  popupTypeEdit.form
);
formEditValidator.enableValidation();

const formAvatarValidator = new FormValidator(
  configFormValidation,
  popupTypeAvatar.form
);
formAvatarValidator.enableValidation();

const formAddValidator = new FormValidator(
  configFormValidation,
  popupTypeAdd.form
);
formAddValidator.enableValidation();

//Функция создания карточки
function createCard(data) {
  const defaultCard = new Card(
    data,
    userInfo.getUserId(),
    ".template-element",
    {
      handleCardClick: popupTypeView.open,
      handleCardDelete: popupTypeConfirmation.open,
      handleCardLike: async (cardId, isLiked, setLikes) => {
       await api.toggleLike(cardId, isLiked)
        .then((res) => {
          setLikes(res.likes);
        })
        .catch((err) => {
          console.log(err);
        });
      }
    }
  );
  const cardBlock = defaultCard.generateCard();

  return cardBlock;
};
//--------------------------------------------------------
//Функция установки значений полей профиля в инпуты
function setInputs(popup) {
  const userInfoData = userInfo.getUserInfo();
  popup.inputList.forEach((input) => {
    input.value = userInfoData[input.name];
  });
};

//Создание экземпляра класса Section
const initialSection = new Section({
  renderer: createCard
},
'elements'
);

//Обработчик события открытия формы редактироваиня профиля
profileEditBtn.addEventListener("click", () => {
  //---------------------------------------------------------------
  //const userInfoData = userInfo.getUserInfo();
  // popupTypeEdit.inputList.forEach((input) => {
  //   input.value = userInfoData[input.name];
  // });
  //--------------------------------------------------------------
  popupTypeEdit.setInputValues();
  formEditValidator.resetValidation();
  popupTypeEdit.open();
});
//Обработчик события открытия формы редактироваиня аватара
avatarEditBtn.addEventListener("click", () => {
  popupTypeAvatar.setInputValues();
  formAvatarValidator.resetValidation();
  popupTypeAvatar.open();
})

//Обработчик события открытия формы добавления карточки
elementAddBtn.addEventListener("click", () => {
  formAddValidator.resetValidation();
  popupTypeAdd.open();
});


// //Загрузка информации о пользователе с сервера
// api.getUserInfo()
//   .then((res) => {
//     userInfo.setUserInfo(res);
//     userInfo.setUserAvatar(res.avatar);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// api.getInitialCards()
//   .then((res) => {
//     // Создаем экземпляр класса Section для отрисовки начальных карточек
//     const initialSection = new Section(
//       {
//         items: res,
//         renderer: async (item) => {
//           const cardElement = createCard(item);
//           //Запрос на полуение данных о пользователе для сравнения id пользователя и владельца карточки
//           await api.getUserInfo()
//           .then((userData) => {
//             //Если id не совпадает, убираем DOM-элемент, кнопку удаления карточки
//               if (userData._id !== item.owner._id) {
//                 const deleteCardBtn = cardElement.querySelector('.element__delete-button');
//                 deleteCardBtn.remove();
//                 return cardElement;
//               };
//           })
//           .catch((err) => {
//             console.log(err);
//           });

//           initialSection.addItem(cardElement);
//         },
//       },
//       'elements'
//     );
//     //отрисовка начальных карточек
//     initialSection.renderItems();
//   })
//   .catch((err) => {
//     console.log(err);
//   });

  Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData.avatar);

    initialSection.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });

