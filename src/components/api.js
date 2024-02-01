const config = {
    baseUrl: 'https://nomoreparties.co/v1/cohort-magistr-2',
    headers: {
      authorization: '7d94ca1a-3ca0-4ad0-af4f-3aa495c39809',
      'Content-Type': 'application/json'
    }
}

export const getUserData = () => sendSimpleRequest('GET', '/users/me');

export const getCards = () => sendSimpleRequest('GET', '/cards');

export function saveUserData(userData) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: userData.name,
            about: userData.about
        })
    })
        .then(res => {
            if (res.ok) return res.json();

            return Promise.reject(`Error: ${res.status}`);
        }); 
}

export function saveCard(cardData) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: cardData.name,
            link: cardData.link
        })
    })
        .then(res => {
            if (res.ok) return res.json();

            return Promise.reject(`Error: ${res.status}`);
        }); 
}

export const deleteCard = (cardId) => sendSimpleRequest('DELETE', '/cards/', cardId);

export const likeCard = (cardId) => sendSimpleRequest('PUT', '/cards/likes/', cardId);

export const dislikeCard = (cardId) => sendSimpleRequest('DELETE', '/cards/likes/', cardId);

function sendSimpleRequest(method = 'GET', path, param = '') {
    return fetch(`${config.baseUrl}${path}${param}`, {
        method: method,
        headers: config.headers
    })
        .then(res => {
            if (res.ok) return res.json();

            return Promise.reject(`Error: ${res.status}`);
        }); 
}