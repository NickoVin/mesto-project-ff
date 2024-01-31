import { deleteCard as deleteCardFromServer } from './api.js';

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
export function createCard(cardData, deleteCard, likeCard, openImage) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const likeCounter = cardElement.querySelector('.card__like-counter');

    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    cardElement.querySelector('.card__like-button').addEventListener('click', likeCard);
    cardImage.addEventListener('click', () => openImage(cardData));

    likeCounter.textContent = cardData.likes.length;

    cardElement.id = cardData._id;

    return cardElement;
}

// Функция удаления карточки
export function deleteCard(event) {
    const card = event.target.closest('.card');
    console.log(card.id);
    deleteCardFromServer(card.id)
        .then(response => {
            if (response.message == 'Пост удалён')
                card.remove();
        })
        .catch(error => console.log(error));
}

// Функция-обработчик события клика на сердечко карточки
export function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}