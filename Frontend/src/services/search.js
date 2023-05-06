async function getToken() {
    const response = await fetch(`${import.meta.env.VITE_APP_URL}/token`, {
        headers: {
            'X-API-Key': `${import.meta.env.VITE_API_KEY}`,
        },
        mode: 'cors'
    })
    const data = await response.json();
    const token = data.token;
    return token
}

export async function results(userQuery) {
    try {
        const token = await getToken();
        let query = await fetch(`${import.meta.env.VITE_APP_URL}/search/results/?search=${userQuery}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                'Access-Control-Allow-Origin': '*'
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
        let query = await fetch(`${import.meta.env.VITE_APP_URL}/search/article`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ result: result })
        })

        let data = await query.json()
        return data
    } catch (error) {
        console.log(error)
    }
}
