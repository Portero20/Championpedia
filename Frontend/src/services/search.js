async function getToken() {
    const response = await fetch(`${import.meta.env.VITE_URL_FRONTEND}/token`, {
        headers: {
            'X-API-Key': `${import.meta.env.VITE_API_KEY}`
        }
    })
    const data = await response.json();
    const token = data.token;
    return token
}

export async function results(userQuery) {
    try {
        const token = await getToken();
        let query = await fetch(`${import.meta.env.VITE_URL_FRONTEND}/search/results/?search=${userQuery}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        let data = await query.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function searchArticle(result) {
    try {
        const token = await getToken();
        let query = await fetch(`${import.meta.env.VITE_URL_FRONTEND}/search/article`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ result: result })
        })

        let data = await query.json()
        return data
    } catch (error) {
        console.log(error)
    }
}
