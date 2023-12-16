// DOM узлы
let editButton = document.querySelector('.profile__edit-button');
let popupEdit = document.querySelector('.popup_type_edit');
let addButton = document.querySelector('.profile__add-button')
let popupAdd = document.querySelector('.popup_type_new-card');
let placesList = document.querySelector('.places__list');
let popupImage = document.querySelector('.popup_type_image');
let page = document.querySelector('.page');

// Сгруппированные popup окна и их триггеры (кнопки)
let button_popup_type = [
    [editButton, popupEdit, 'form'],
    [addButton, popupAdd, 'form'],
    [placesList, popupImage, 'image']
]

// Функция добавления изображение в popup окно
function insertPopupImage(popupEvt, popup) {
    if (!popupEvt.target.classList.contains('card__image')){
        popupEvt.preventDefault;
        return false;
    }

    let imageElement = popup.querySelector('.popup__image');
    imageElement.src = popupEvt.target.src;

    return true;
}

// Функция открытия popup окна
function popupOpen(popupEvt, popup, popupType) {
    switch (popupType) {
        case 'image':
            if (!insertPopupImage(popupEvt, popup))
                break;
            
        case 'form':
            popup.classList.add('popup_is-opened');
            break;
    }
}

// Обработка события открытия popup'а
button_popup_type.forEach(function (pack) {
    let popubButton = pack[0];
    let popup = pack[1];
    let popupType = pack[2];

    popubButton.addEventListener('click', evt => popupOpen(evt, popup, popupType));
});

// Обработка события закрытия popup'a
page.addEventListener('click', evt => {
    let clickToCloseBtn = evt.target.classList.contains('popup__close');
    let clickToOverlay = evt.target.classList.contains('popup');

    if (clickToCloseBtn || clickToOverlay) {
        let openedPopup = document.querySelector('.popup_is-opened');
        openedPopup.classList.remove('popup_is-opened');
    }
});