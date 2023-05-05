async function getToken() {
    const response = await fetch("https://championpedia-production.up.railway.app/token", {
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
        let query = await fetch(`https://championpedia-production.up.railway.app/search/results/?search=${userQuery}`)
        let data = await query.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function searchArticle(result) {
    try {
        const token = await getToken();
        let query = await fetch(`https://championpedia-production.up.railway.app/search/article`, {
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
