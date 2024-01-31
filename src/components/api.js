const config = {
    baseUrl: 'https://nomoreparties.co/v1/cohort-magistr-2',
    headers: {
      authorization: '7d94ca1a-3ca0-4ad0-af4f-3aa495c39809',
      'Content-Type': 'application/json'
    }
}

export function getUserData() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then(res => {
            if (res.ok) return res.json()
        });
}

export function getCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(res => {
            if (res.ok) return res.json();

            return Promise.reject(`Ошибка: ${res.status}`);
        });
}

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

export function deleteCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(res => {
            if (res.ok) return res.json();

            return Promise.reject(`Error: ${res.status}`);
        }); 
}