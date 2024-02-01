import './pages/index.css';
import { openModal, closeModal } from './components/modal.js'
import { createCard, deleteCard, likeCard } from './components/card.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getUserData, getCards, saveUserData, saveCard, uploadProfileImage} from './components/api.js';

// DOM узлы
const cardList = document.querySelector('.places__list');
const profileImageButton = document.querySelector('.profile__image__edit-button');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileImageModal = document.querySelector('.popup_type_edit-image');
const editModal = document.querySelector('.popup_type_edit');
const cardModal = document.querySelector('.popup_type_new-card');
const imageModal = document.querySelector('.popup_type_image');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const modalProfileTile = editModal.querySelector('.popup__input_type_name');
const modalProfileDescription = editModal.querySelector('.popup__input_type_description');
const modalImageElement = imageModal.querySelector('.popup__image');
const modalCaptionElement = imageModal.querySelector('.popup__caption');
const editForm = document.forms['edit-profile'];
const cardForm = document.forms['new-place'];
const profileImageForm = document.forms['edit-image'];
const popups = document.querySelectorAll('.popup');
const profileImage = document.querySelector('.profile__image');

const validationConfiguration = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

// Навешивание обработчиков открытия модальных окон
profileImageButton.addEventListener('click', openProfileImageEditModal);
editButton.addEventListener('click', openProfileEditModal);
addButton.addEventListener('click', openNewCardModal);

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

    const imageUrlModal = profileImageForm.querySelector('.popup__input_type_url').value;
    const submitButton = profileForm.querySelector('.popup__button');

    submitButton.textContent = "Сохранение...";

    uploadProfileImage(imageUrlModal)
        .then(() => {
            profileImage.style.backgroundImage = `url(${imageUrlModal})`;
            closeModal(profileImageModal);
        })
        .catch(error => console.log(error))
        .finally(() => submitButton.textContent = "Сохранить");
})

// Обработчик отправки формы редактирования профиля
editForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    const submitButton = editForm.querySelector('.popup__button');

    profileTitle.textContent = modalProfileTile.value;
    profileDescription.textContent = modalProfileDescription.value;

    submitButton.textContent = "Сохранение...";

    saveUserData({
        name: modalProfileTile.value,
        about: modalProfileDescription.value
    })
        .then(() => closeModal(editModal))
        .catch(error => console.log(error))
        .finally(() => submitButton.textContent = "Сохранить");
});

// Обработчик отправки формы добавления новой карточки
cardForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    const submitButton = cardForm.querySelector('.popup__button');
    const cardData = {
        name: cardForm.querySelector('.popup__input_type_card-name').value,
        link: cardForm.querySelector('.popup__input_type_url').value
    }

    submitButton.textContent = "Сохранение...";

    saveCard(cardData)
        .then(response => {
            cardList.prepend(createCard(response, deleteCard, likeCard, openImageModal));

            evt.target.reset();
            closeModal(cardModal);
        })
        .catch(error => console.log(error))
        .finally(() => submitButton.textContent = "Сохранить");
});

// Функция-обработчик события открытия модального окна для редактирования аватарки профиля
function openProfileImageEditModal() {
    profileImageForm.reset();

    openModal(profileImageModal);
    clearValidation(editForm, validationConfiguration);
}

// Функция-обработчик события открытия модального окна для редактирования профиля
function openProfileEditModal() {
    modalProfileTile.value = profileTitle.textContent;
    modalProfileDescription.value = profileDescription.textContent;

    openModal(editModal);
    clearValidation(editForm, validationConfiguration);
}

// Функция-обработчик события открытия модального окна создания новой каточки
function openNewCardModal() {
    cardForm.reset();

    openModal(cardModal);
    clearValidation(cardForm, validationConfiguration);
}

// Функция открытия модального окна изображения карточки
function openImageModal(cardData) {
    modalImageElement.src = cardData.link;
    modalImageElement.alt = cardData.name;
    modalCaptionElement.textContent = cardData.name;
    
    openModal(imageModal);
}

// Включить вализацию полей форм
enableValidation(validationConfiguration);

Promise.all([getUserData(), getCards()]).then(responses => {
    const userData = responses[0];
    const usersCards = responses[1];
    
    // Загружаем пользовательские данные
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;

    // Загружаем карточки
    usersCards.forEach(cardData => {
        let card = createCard(cardData, deleteCard, likeCard, openImageModal, userData._id);

        if (cardData.owner._id != userData._id) {
            const deleteButton = card.querySelector('.card__delete-button');
            deleteButton.remove();
        }

        cardList.append(card);
    });
});