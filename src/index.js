import './pages/index.css';
import { openModal, closeModal } from './scripts/modal.js'
import { createCard, deleteCard } from './scripts/card.js';
import { initialCards } from './scripts/cards.js';

/*
    В файле index.js описана инициализация приложения и основная логика страницы:
        1. Поиск DOM-элементов на странице и навешивание на них обработчиков событий
        2. Обработчики отправки форм
        3. Функция-обработчик события открытия модального окна для редактирования профиля
        4. Функция открытия модального окна изображения карточки
    Также в index.js находится код, который отвечает за отображение шести карточек при открытии страницы.
*/

// DOM узлы
const cardList = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button')
const placesList = document.querySelector('.places__list');
const editModal = document.querySelector('.popup_type_edit');
const cardModal = document.querySelector('.popup_type_new-card');
const imageModal = document.querySelector('.popup_type_image');
const modals = [editModal, cardModal, imageModal];
const editForm = document.forms['edit-profile'];
const cardForm = document.forms['new-place'];

// Навешивание обработчиков открытия модальных окон
editButton.addEventListener('click', openProfileEditModal);
placesList.addEventListener('click', openImageModal);
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

    cardList.prepend(createCard(cardData, deleteCard, likeCard));

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
    if (!evt.target.classList.contains('card__image')) {
        return;
    }

    const cardImage = evt.target;
    const modalImageElement = imageModal.querySelector('.popup__image');
    const modalCaprionElement = imageModal.querySelector('.popup__caption');

    modalImageElement.src = cardImage.src;
    modalCaprionElement.textContent = cardImage.parentElement.querySelector('.card__title').textContent;
    
    openModal(imageModal);
}

// Вывести карточки на страницу
initialCards.forEach(cardData => cardList.append(createCard(cardData, deleteCard, likeCard)));

// Функция-обработчик события клика на сердечко карточки
function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}





















/*
// Обработчики событий для модального окна
modalsData.forEach(function (modalData) {
    // Открытие модального окна при клике на кнопки
    modalData.targetObj.addEventListener('click', function (evt) {
        // Отобразить модальное окно
        openModal(modalData);
        
        // Закрытие модального онка при клике на крестик или оверлэй
        modalData.modalObj.addEventListener('click', function(evt) {
            let clickToCloseBtn = evt.target.classList.contains('popup__close');
            let clickToOverlay = evt.target.classList.contains('popup');
            
            if (clickToCloseBtn || clickToOverlay) {
                closeModal(modalData.modalObj);
            }
        });

        // Сохранение данных на форме модального окна
        let modalForm = modalData.modalObj.querySelector('.popup__form');
        if (modalForm) {
            modalForm.addEventListener('submit', evt => {
                // Отменить стандартное поведение submit'a
                evt.preventDefault();
        
                // Обновить данные профиля данными из формы модального окна
                let profileTitle = document.querySelector('.profile__title');
                let profileDescription = document.querySelector('.profile__description');
                profileTitle.textContent = modalData.modalObj.querySelector('.popup__input_type_name').value;
                profileDescription.textContent = modalData.modalObj.querySelector('.popup__input_type_description').value;

                // Закрыть модальное окно
                closeModal(modalData.modalObj);
            });
        }
    });
});*/