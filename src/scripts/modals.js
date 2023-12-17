// DOM узлы
let editButton = document.querySelector('.profile__edit-button');
let editModal = document.querySelector('.popup_type_edit');
let addButton = document.querySelector('.profile__add-button')
let addModal = document.querySelector('.popup_type_new-card');
let placesList = document.querySelector('.places__list');
let imageModal = document.querySelector('.popup_type_image');

// Сгруппированные popup окна и их триггеры (кнопки)
export let modalsData = [
    {
        'targetObj': editButton,
        'modalObj': editModal,
        'modalType': 'profile'
    },
    {
        'targetObj': addButton,
        'modalObj': addModal,
        'modalType': 'newCard'
    },
    {
        'targetObj': placesList,
        'modalObj': imageModal,
        'modalType': 'image'
    }
]