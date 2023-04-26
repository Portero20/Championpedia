export async function results(userQuery) {
    try {
        let query = await fetch(`${import.meta.env.VITE_API_RESULTS}?search=${userQuery}`)
        let data = await query.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function searchArticle(result) {
    try {
        let query = await fetch(`${import.meta.env.VITE_API_SEARCH}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ result: result })
        })

        let data = await query.json()
        return data
    } catch (error) {
        console.log(error)
    }
}
