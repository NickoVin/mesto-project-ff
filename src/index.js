import './pages/index.css';
import './scripts/popups.js'
import {initialCards} from './scripts/cards.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardData, deleteCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');

    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);

    return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(event) {
    event.target.parentNode.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(cardData => cardList.append(createCard(cardData, deleteCard)));

// @todo: Рopup окна
