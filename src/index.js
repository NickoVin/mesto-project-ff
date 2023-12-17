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
const modals = [editModal, cardModal, imageModal];
const editForm = document.forms['edit-profile'];
const cardForm = document.forms['new-place'];

// Навешивание обработчиков открытия модальных окон
editButton.addEventListener('click', openProfileEditModal);
addButton.addEventListener('click', () => openModal(cardModal));

// Навешивание обработчиков закрытия модальных окон по нажатию на кнопку закрытия
modals.forEach(modal => {
    modal.addEventListener('click', function(evt) {
        if (evt.target.classList.contains('popup__close')) {
            closeModal(modal);
        }
    })
})

// Обработчик отправки формы редактирования профиля
editForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
        
    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');

    profileTitle.textContent = editModal.querySelector('.popup__input_type_name').value;
    profileDescription.textContent = editModal.querySelector('.popup__input_type_description').value;

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

    closeModal(cardModal);
});

// Функция-обработчик события открытия модального окна для редактирования профиля
function openProfileEditModal(evt) {
    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');

    editModal.querySelector('.popup__input_type_name').value = profileTitle.textContent;
    editModal.querySelector('.popup__input_type_description').value = profileDescription.textContent;

    openModal(editModal);
}

// Функция открытия модального окна изображения карточки
function openImageModal(evt) {
    const cardImage = evt.target;
    const modalImageElement = imageModal.querySelector('.popup__image');
    const modalCaprionElement = imageModal.querySelector('.popup__caption');

    modalImageElement.src = cardImage.src;
    modalCaprionElement.textContent = cardImage.parentElement.querySelector('.card__title').textContent;
    
    openModal(imageModal);
}

// Вывести карточки на страницу
initialCards.forEach(cardData => cardList.append(createCard(cardData, deleteCard, likeCard, openImageModal)));