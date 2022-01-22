export let SERVER_URL;
if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    SERVER_URL = "http://127.0.0.1:5000";
} else {
    SERVER_URL = ""; //TODO if we deploy
}

export async function apiCall(endpoint, data={}) {
    const response = await fetch(`${SERVER_URL}${endpoint}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    if (response.status !== 200) return null;
    return await response.json();
}