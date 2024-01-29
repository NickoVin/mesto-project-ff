const auth = {
    serverUrl: 'https://mesto.nomoreparties.co',
    token: '7d94ca1a-3ca0-4ad0-af4f-3aa495c39809',
    cohortId: 'cohort-magistr-2'
}

export function GetUserData() {
    return fetch(`https://nomoreparties.co/v1/${auth.cohortId}/users/me`, {
        headers: {
            authorization: auth.token
        }
    })
        .then(res => { if (res.ok) return res.json() });
}

export function GetCards() {
    return fetch(`https://nomoreparties.co/v1/${auth.cohortId}/cards`, {
        headers: {
            authorization: auth.token
        }
    })
        .then(res => {
            if (res.ok) return res.json();

            return Promise.reject("An error occurred while retrieving user cards from the server.");
        });
}

export function SaveUserData(userData) {
    return fetch(`https://nomoreparties.co/v1/${auth.cohortId}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: auth.token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: userData.name,
            about: userData.about
        })
    })
        .then(res => {
            if (res.ok) return res.json();

            return Promise.reject("An error occurred while sending user data to the server.");
        }); 
}