import './pages/index.css';
import { modalsData } from './scripts/modals.js';
import { openModal, closeModal } from './scripts/modal.js'
import { createCard, deleteCard } from './scripts/card.js';
import { initialCards } from './scripts/cards.js';

// DOM узлы
const cardList = document.querySelector('.places__list');

// Вывести карточки на страницу
initialCards.forEach(cardData => cardList.append(createCard(cardData, deleteCard)));

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
                removeKeydownHandler(modalData);
            }
        });

        // Закрытие модального окна при нажатии на Escape
        const keydownHandler = evt => closeModalByEscape(evt, modalData);
        modalData.modalObj.closest('.page').addEventListener('keydown', keydownHandler);

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
                removeKeydownHandler(modalData);
            });
        }

        // Сохранить обработчик для дальнейшего удаления
        modalData.keydownHandler = keydownHandler;
    });
});

// Функция закрытия модального окна через Escape
function closeModalByEscape(evt, modal) {
    if (evt.key === 'Escape') {
        closeModal(modal.modalObj);
        removeKeydownHandler(modal);
    }
}

// Функция удаление обработчика нажатия клавиши
function removeKeydownHandler(modal) {
    modal.modalObj.closest('.page').removeEventListener('keydown', modal.keydownHandler);
}