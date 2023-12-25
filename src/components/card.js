// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
export function createCard(cardData, deleteCard, likeCard, openImage) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');

    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    cardElement.querySelector('.card__like-button').addEventListener('click', likeCard);
    cardImage.addEventListener('click', openImage);

    return cardElement;
}

// Функция удаления карточки
export function deleteCard(event) {
    event.target.closest('.card').remove();
}

// Функция-обработчик события клика на сердечко карточки
export function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}