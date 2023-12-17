// Функция открытия модального окна
export function openModal(modalData) {
    switch (modalData.modalType) {
        case 'profile':
            openProfileModal(modalData);
            break;

        case 'newCard':
            openNewCardModal(modalData);
            break;

        case 'image':
            openImageModal(modalData)
            break;
    }
}

// Функция закрытия модального окна
export function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
}

// Открытие модального окна профиля
function openProfileModal(modalData) {
    let profileTitle = document.querySelector('.profile__title');
    let profileDescription = document.querySelector('.profile__description');
    modalData.modalObj.querySelector('.popup__input_type_name').value = profileTitle.textContent;
    modalData.modalObj.querySelector('.popup__input_type_description').value = profileDescription.textContent;

    modalData.modalObj.classList.add('popup_is-opened');
}

// Функция открытия модального окна новой карточки
function openNewCardModal(modalData) {
    modalData.modalObj.classList.add('popup_is-opened');
}

// Функция добавления изображение в модальное окно
function openImageModal(modalData) {
    // Проверить наличие изображения
    let cardImage = modalData.targetObj.querySelector('.card__image');
    if (!cardImage){
        return;
    }

    // Установить изображение в модальном окне
    let imageElement = modalData.modalObj.querySelector('.popup__image');
    imageElement.src = cardImage.src;

    // Установить описание в модальном окне
    let popupCaption = modalData.modalObj.querySelector('.popup__caption');
    popupCaption.textContent = cardImage.parentElement.querySelector('.card__title').textContent;

    // Отобразить модальное окно
    modalData.modalObj.classList.add('popup_is-opened');
}