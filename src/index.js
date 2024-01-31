import './pages/index.css';
import { openModal, closeModal } from './components/modal.js'
import { createCard, deleteCard, likeCard } from './components/card.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getUserData, getCards, saveUserData, saveCard } from './components/api.js';

// DOM узлы
const cardList = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
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
const popups = document.querySelectorAll('.popup');

const validationConfiguration = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

// Навешивание обработчиков открытия модальных окон
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

// Обработчик отправки формы редактирования профиля
editForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    profileTitle.textContent = modalProfileTile.value;
    profileDescription.textContent = modalProfileDescription.value;

    saveUserData({
        name: modalProfileTile.value,
        about: modalProfileDescription.value
    })
        .catch(error => console.log(error))

    closeModal(editModal);
});

// Обработчик отправки формы добавления новой карточки
cardForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    const cardData = {
        name: cardForm.querySelector('.popup__input_type_card-name').value,
        link: cardForm.querySelector('.popup__input_type_url').value
    }

    saveCard(cardData)
        .then(response => {
            if ('name' in response)
                cardList.prepend(createCard(response, deleteCard, likeCard, openImageModal));
        })
        .catch(error => console.log(error))

    evt.target.reset();

    closeModal(cardModal);
});

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
    const profileImage = document.querySelector('.profile__image');
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;

    // Загружаем карточки
    usersCards.forEach(cardData => {
        let card = createCard(cardData, deleteCard, likeCard, openImageModal);

        if (cardData.owner._id != userData._id) {
            const deleteButton = card.querySelector('.card__delete-button');
            deleteButton.remove();
        }

        cardList.append(card);
    });
});