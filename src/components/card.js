import {
    deleteCard as deleteCardFromServer,
    likeCard as sendLikeToServer,
    dislikeCard as sendDislikeToServer,
    getUserData
} from './api.js';

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
export function createCard(cardData, deleteCard, likeCard, openImage, userId) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const likeElement = cardElement.querySelector('.card__like-button');
    const likeCounter = cardElement.querySelector('.card__like-counter');

    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    cardElement.querySelector('.card__like-button').addEventListener('click', likeCard);
    cardImage.addEventListener('click', () => openImage(cardData));

    if (cardData.likes.some(user => user._id == userId)) {
        likeElement.classList.add('card__like-button_is-active');
    }
    likeCounter.textContent = cardData.likes.length;

    if (cardData.owner._id != userId) {
        card.querySelector('.card__delete-button').remove();
    }

    cardElement.id = cardData._id;

    return cardElement;
}

// Функция удаления карточки
export function deleteCard(event) {
    const card = event.target.closest('.card');
    console.log(card.id);
    deleteCardFromServer(card.id)
        .then(response => {
            if (response.message == 'Пост удалён') {
                card.remove();
            }
        })
        .catch(error => console.log(error));
}

// Функция-обработчик события клика на сердечко карточки
export function likeCard(evt) {
    const like = evt.target;
    const card = like.closest('.card');
    const likeCounter = card.querySelector('.card__like-counter');

    if (like.classList.contains('card__like-button_is-active')) {
        sendDislikeToServer(card.id)
            .then(response => {
                like.classList.remove('card__like-button_is-active');
                likeCounter.textContent = response.likes.length;
            })
            .catch(error => console.log(error));
    } else {
        sendLikeToServer(card.id)
            .then(response => {
                like.classList.add('card__like-button_is-active');
                likeCounter.textContent = response.likes.length;
            })
            .catch(error => console.log(error));
    }
}