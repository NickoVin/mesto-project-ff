import './pages/index.css';
import { openModal, closeModal } from './components/modal.js'
import { createCard, deleteCard, likeCard } from './components/card.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getUserData, getCards, saveUserData, saveCard, uploadProfileImage} from './components/api.js';

let userId;

// DOM узлы
const popups = document.querySelectorAll('.popup');
const cardList = document.querySelector('.places__list');

const modalProfileEditData = document.querySelector('.popup_type_edit');
const modalProfileEditImage = document.querySelector('.popup_type_edit-image');
const modalCardAdd = document.querySelector('.popup_type_new-card');
const modalImageOpen = document.querySelector('.popup_type_image');

const profileEditImageButton = document.querySelector('.profile__image__edit-button');
const profileEditDataButton = document.querySelector('.profile__edit-button');
const profileAddCardButton = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const profileEditForm = document.forms['edit-profile'];
const profileTileModal = profileEditForm.querySelector('.popup__input_type_name');
const profileDescriptionModal = profileEditForm.querySelector('.popup__input_type_description');

const profileImageForm = document.forms['edit-image'];
const imageUrlModal = profileImageForm.querySelector('.popup__input_type_url');

const cardImageModal = modalImageOpen.querySelector('.popup__image');
const cardCaptionModal = modalImageOpen.querySelector('.popup__caption');

const cardAddForm = document.forms['new-place'];
const cardNameElement = cardAddForm.querySelector('.popup__input_type_card-name');
const cardLinkElement = cardAddForm.querySelector('.popup__input_type_url');

const validationConfiguration = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

// Навешивание обработчиков открытия модальных окон
profileEditImageButton.addEventListener('click', openProfileImageEditModal);
profileEditDataButton.addEventListener('click', openProfileEditModal);
profileAddCardButton.addEventListener('click', openNewCardModal);

// Навешивание обработчиков закрытия модальных окон
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.button != 0) return;

        if (
            evt.target.classList.contains('popup_is-opened') ||
            evt.target.classList.contains('popup__close')
        ) {
            closeModal(popup);
        }
    })
}) 

// Обработчик отправки формы редактирования аватарки профиля
profileImageForm.addEventListener('submit', function(evt) {
    evt.preventDefault();

    evt.submitter.textContent = "Сохранение...";

    uploadProfileImage(imageUrlModal.value)
        .then(() => {
            profileImage.style.backgroundImage = `url(${imageUrlModal.value})`;
            closeModal(modalProfileEditImage);
        })
        .catch(error => console.log(error))
        .finally(() => evt.submitter.textContent = "Сохранить");
})

// Обработчик отправки формы редактирования профиля
profileEditForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    evt.submitter.textContent = "Сохранение...";

    saveUserData({
        name: profileTileModal.value,
        about: profileDescriptionModal.value
    })
        .then(() => {
            profileTitle.textContent = profileTileModal.value;
            profileDescription.textContent = profileDescriptionModal.value;

            closeModal(modalProfileEditData)
        })
        .catch(error => console.log(error))
        .finally(() => evt.submitter.textContent = "Сохранить");
});

// Обработчик отправки формы добавления новой карточки
cardAddForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    evt.submitter.textContent = "Сохранение...";

    saveCard({
        name: cardNameElement.value,
        link: cardLinkElement.value
    })
        .then(response => {
            cardList.prepend(createCard(response, deleteCard, likeCard, openImageModal, userId));

            evt.target.reset();
            closeModal(modalCardAdd);
        })
        .catch(error => console.log(error))
        .finally(() => evt.submitter.textContent = "Сохранить");
});

// Функция-обработчик события открытия модального окна для редактирования аватарки профиля
function openProfileImageEditModal() {
    profileImageForm.reset();

    openModal(modalProfileEditImage);
    clearValidation(profileEditForm, validationConfiguration);
}

// Функция-обработчик события открытия модального окна для редактирования профиля
function openProfileEditModal() {
    profileTileModal.value = profileTitle.textContent;
    profileDescriptionModal.value = profileDescription.textContent;

    openModal(modalProfileEditData);
    clearValidation(profileEditForm, validationConfiguration);
}

// Функция-обработчик события открытия модального окна создания новой каточки
function openNewCardModal() {
    cardAddForm.reset();

    openModal(modalCardAdd);
    clearValidation(cardAddForm, validationConfiguration);
}

// Функция открытия модального окна изображения карточки
function openImageModal(cardData) {
    cardImageModal.src = cardData.link;
    cardImageModal.alt = cardData.name;
    cardCaptionModal.textContent = cardData.name;
    
    openModal(modalImageOpen);
}

// Включить вализацию полей форм
enableValidation(validationConfiguration);

Promise.all([getUserData(), getCards()])
    .then(responses => {
        const userData = responses[0];
        const usersCards = responses[1];

        userId = userData._id;

        // Загружаем пользовательские данные
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileImage.style.backgroundImage = `url(${userData.avatar})`;

        // Загружаем карточки
        usersCards.forEach(cardData => {
            cardList.append(
                createCard(cardData, deleteCard, likeCard, openImageModal, userId)
            );
        });
    })
    .catch(error => console.log(error));