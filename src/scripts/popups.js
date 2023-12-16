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

    addPopupCloseEventHandler(popup);
}

// Функция добавления изображение в popup окно
function insertPopupImage(popupEvt, popup) {
    if (!popupEvt.target.classList.contains('card__image')){
        popupEvt.preventDefault;
        return false;
    }

    let imageElement = popup.querySelector('.popup__image');
    imageElement.src = popupEvt.target.src;

    let popupCaption = popup.querySelector('.popup__caption');
    popupCaption.textContent = popupEvt.target.parentElement.querySelector('.card__title').textContent;

    return true;
}

// Функция добавления popap'у обработки события закрытия
function addPopupCloseEventHandler(popup) {
    popup.addEventListener('click', evt => closePopupByClick(evt, popup));
    page.addEventListener('keydown', evt => closePopupByEscape(evt, popup));
} 

// Функция закрытия popup'a по клику мыши
function closePopupByClick(evt, popup) {
    let clickToCloseBtn = evt.target.classList.contains('popup__close');
    let clickToOverlay = evt.target.classList.contains('popup');
    
    if (clickToCloseBtn || clickToOverlay) {
        popup.classList.remove('popup_is-opened');
    }
}

// Функция закрытия popup'a по нажатию на Escape
function closePopupByEscape(popupEvt, popup) {
    if (popupEvt.key != 'Escape')
        return;
    
    popup.classList.remove('popup_is-opened');

    removePopupCloseEventHandler(popup);
}

// Функция удаления у popap'а обработчиков события закрытия
function removePopupCloseEventHandler(popup) {
    popup.removeEventListener('click', evt => closePopupByClick(evt, popup));
    page.removeEventListener('keydown', evt => closePopupByEscape(evt, popup));
} 

// Обработка события открытия popup'а
button_popup_type.forEach(function (pack) {
    let popubButton = pack[0];
    let popup = pack[1];
    let popupType = pack[2];

    popubButton.addEventListener('click', evt => popupOpen(evt, popup, popupType));
});