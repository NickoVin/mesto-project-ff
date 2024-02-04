import { checkResponse } from '../utils/checkResponse.js' ;

const config = {
    baseUrl: 'https://nomoreparties.co/v1/cohort-magistr-2',
    headers: {
      authorization: '7d94ca1a-3ca0-4ad0-af4f-3aa495c39809',
      'Content-Type': 'application/json'
    }
}

export const getUserData = () => request(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
});

export const getCards = () => request(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
});

export const saveUserData = (userData) => request(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
        name: userData.name,
        about: userData.about
    })
});

export const saveCard = (cardData) => request(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
    })
});

export const deleteCard = (cardId) => request(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
});

export const likeCard = (cardId) => request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
});

export const dislikeCard = (cardId) => request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
});

export const uploadProfileImage = (url) => request(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
        avatar: url
    })
});

const request = (url, options) => fetch(url, options).then(checkResponse);