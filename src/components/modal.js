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
    modal.removeEventListener('click', closeModalByOverlayClick);
}

// Функция-обработчик события нажатия Esc
function closeModalByEsc(evt) {
    if (evt.key === 'Escape') {
        const modal = getOpenedModal();
        closeModal(modal);
    }
}

// Функция-обработчик события клика по оверлею
function closeModalByOverlayClick(evt) {        
    closeModal(evt.target);
}

// Функция получения открытого модального окна
function getOpenedModal() {
    return document.querySelector('.popup_is-opened');
}