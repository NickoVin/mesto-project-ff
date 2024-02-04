export function checkResponse(response) {
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(`Error: ${response.status}`);
    }    
}