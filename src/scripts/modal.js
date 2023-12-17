/*
    В файле modal.js описаны функции для работы с модальными окнами:
        1. Функция открытия модального окна
        2. Функция закрытия модального окна
        3. Функция-обработчик события нажатия Esc
        4. Функция-обработчик события клика по оверлею
*/

// Функция открытия модального окна
export function openModal(modal) {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeModalByEsc);
    modal.addEventListener('click', closeModalByOverlayClick);
}

// Функция закрытия модального окна
export function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalByEsc);
}

// Функция-обработчик события нажатия Esc
function closeModalByEsc(evt) {
    if (evt.key === 'Escape') {
        let modal = getOpenedModal();
        closeModal(modal);
    }
}

// Функция-обработчик события клика по оверлею
function closeModalByOverlayClick(evt) {        
    if (evt.target.classList.contains('popup')) {
        let modal = getOpenedModal();
        closeModal(modal);
    }
}

// Функция получения открытого модального окна
function getOpenedModal() {
    return document.querySelector('.popup_is-opened');
}

// Функция открытия модального окна новой карточки
function openNewCardModal(modalData) {
    modalData.modalObj.classList.add('popup_is-opened');
}