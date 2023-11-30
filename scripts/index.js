// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');


// @todo: Функция создания карточки
function createCard(cardData, deleteCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardElement.querySelector('.card__image').src = cardData.link;

    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);

    return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard() {

}

// @todo: Вывести карточки на страницу
initialCards.forEach(cardData => cardList.append(createCard(cardData, deleteCard)));
