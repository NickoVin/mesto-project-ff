// DOM узлы
let editButton = document.querySelector('.profile__edit-button');
let popupEdit = document.querySelector('.popup_type_edit');
let addButton = document.querySelector('.profile__add-button')
let popupAdd = document.querySelector('.popup_type_new-card');
let placesList = document.querySelector('.places__list');
let popupImage = document.querySelector('.popup_type_image');
let page = document.querySelector('.page');
let profileTitle = document.querySelector('.profile__title');
let profileDescription = document.querySelector('.profile__description');

// Сгруппированные popup окна и их триггеры (кнопки)
let button_popup_type = [
    [editButton, popupEdit, 'profile'],
    [addButton, popupAdd, 'newCard'],
    [placesList, popupImage, 'image']
]

// Функция открытия popup окна
function popupOpen(popupEvt, popup, popupType) {
    switch (popupType) {
        case 'profile': // Открыть форму профиля
            // Установить текущие данные профиля в поля формы
            popup.querySelector('.popup__input_type_name').value = profileTitle.textContent;
            popup.querySelector('.popup__input_type_description').value = profileDescription.textContent;

            // Создать обработчик подтверждения формы
            let popupForm = popup.querySelector('.popup__form');
            popupForm.addEventListener('submit', evt => submitPopupProfileForm(evt, popup));

            // Открыть popup
            popup.classList.add('popup_is-opened');
            break;

        case 'newCard': // Открыть форму добавления новой карточки
            popup.classList.add('popup_is-opened');
            break;

        case 'image': // Открыть изображение карточки
            if (!insertPopupImage(popupEvt, popup))
                break;

            popup.classList.add('popup_is-opened');
            
            break;
    }

    // Создать обработчики для закрытия pop
    popup.addEventListener('click', evt => closePopupByClick(evt, popup));
    page.addEventListener('keydown', evt => closePopupByEscape(evt, popup));
}

// Функция обработки submit'a на форме профиля
function submitPopupProfileForm(evt, popup) {
    evt.preventDefault();
        
    profileTitle.textContent = popup.querySelector('.popup__input_type_name').value;
    profileDescription.textContent = popup.querySelector('.popup__input_type_description').value;

    popupClose(popup);
}

// Функция закрытия popup'a
function popupClose(popup) {
    let popupForm = popup.querySelector('.popup__form');
    if (popupForm)
        popupForm.removeEventListener('submit', evt => submitPopupProfileForm(evt, popup));
    
    popup.removeEventListener('click', evt => closePopupByClick(evt, popup));
    page.removeEventListener('keydown', evt => closePopupByEscape(evt, popup));

    popup.classList.remove('popup_is-opened');
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

// Функция закрытия popup'a по клику мыши
function closePopupByClick(evt, popup) {
    let clickToCloseBtn = evt.target.classList.contains('popup__close');
    let clickToOverlay = evt.target.classList.contains('popup');
    
    if (clickToCloseBtn || clickToOverlay)
        popupClose(popup);
}

// Функция закрытия popup'a по нажатию на Escape
function closePopupByEscape(popupEvt, popup) {
    if (popupEvt.key != 'Escape')
        return;
    
    popupClose(popup);
}

// Обработка события открытия popup'а
button_popup_type.forEach(function (pack) {
    let popubButton = pack[0];
    let popup = pack[1];
    let popupType = pack[2];

    popubButton.addEventListener('click', evt => popupOpen(evt, popup, popupType));
});