import './pages/index.css';
import { openModal, closeModal } from './components/modal.js'
import { createCard, deleteCard, likeCard } from './components/card.js';
import { initialCards } from './components/cards.js';

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

// Навешивание обработчиков открытия модальных окон
editButton.addEventListener('click', openProfileEditModal);
addButton.addEventListener('click', () => openModal(cardModal));

// Навешивание обработчиков закрытия модальных окон
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.button != 0) return;

        if (evt.target.classList.contains('popup_is-opened')) {
            closeModal(popup)
        }

        if (evt.target.classList.contains('popup__close')) {
            closeModal(popup)
        }
    })
}) 

// Обработчик отправки формы редактирования профиля
editForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    profileTitle.textContent = modalProfileTile.value;
    profileDescription.textContent = modalProfileDescription.value;

    closeModal(editModal);
});

// Обработчик отправки формы добавления новой карточки
cardForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    const cardData = {
        name: cardForm.querySelector('.popup__input_type_card-name').value,
        link: cardForm.querySelector('.popup__input_type_url').value
    }

    cardList.prepend(createCard(cardData, deleteCard, likeCard, openImageModal));

    evt.target.reset();

    closeModal(cardModal);
});

// Функция-обработчик события открытия модального окна для редактирования профиля
function openProfileEditModal(evt) {
    modalProfileTile.value = profileTitle.textContent;
    modalProfileDescription.value = profileDescription.textContent;

    openModal(editModal);
}

// Функция открытия модального окна изображения карточки
function openImageModal(cardData) {
    modalImageElement.src = cardData.link;
    modalImageElement.alt = cardData.name;
    modalCaptionElement.textContent = cardData.name;
    
    openModal(imageModal);
}

// Вывести карточки на страницу
initialCards.forEach(cardData => cardList.append(createCard(cardData, deleteCard, likeCard, openImageModal)));