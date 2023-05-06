async function getToken() {
    const response = await fetch('https://championpedia-production.up.railway.app/token', {
        headers: {
            "Content-Type": "application/json",
            'X-API-Key': `${import.meta.env.VITE_API_KEY}`,
        }
    })
    const data = await response.json();
    const token = data.token;
    return token
}

export async function newArticle(category, formData) {
    try {
        const token = await getToken();
        let query = await fetch(`${import.meta.env.VITE_APP_URL}/article/${category}/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                'Access-Control-Allow-Origin': '*'
            },
            body: formData
        })

        let data = await query.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function allCategories() {
    try {
        const token = await getToken();
        let query = await fetch(`${import.meta.env.VITE_APP_URL}/article/categories`, {
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

export async function detail(category, id) {
    try {
        const token = await getToken();
        let query = await fetch(`${import.meta.env.VITE_APP_URL}/article/${category}/${id}`, {
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

export async function editArticle(category, formData) {
    try {
        const token = await getToken();
        let query = await fetch(`${import.meta.env.VITE_APP_URL}/article/edit/${category}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                'Access-Control-Allow-Origin': '*'
            },
            body: formData
        })

        let data = await query.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function view(category, id) {
    try {
        const token = await getToken();
        let query = await fetch(`${import.meta.env.VITE_APP_URL}/article/view`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ category: category, id: id })
        })

        let data = await query.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function lastProduct() {
    try {
        const token = await getToken();
        let query = await fetch(`${import.meta.env.VITE_APP_URL}/article/last`, {
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

export async function moreViews() {
    try {
        const token = await getToken();
        let query = await fetch(`${import.meta.env.VITE_APP_URL}/article/moreViews`, {
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

export async function news() {
    try {
        const token = await getToken();
        let query = await fetch(`${import.meta.env.VITE_APP_URL}/article/news`, {
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

export async function lastCategories(category, size) {
    try {
        const token = await getToken();
        let query = await fetch(`${import.meta.env.VITE_APP_URL}/article/last/${category}/${size}`, {
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

export async function moreViewsCategory(category, page, size) {
    try {
        const token = await getToken();
        let query = await fetch(`${import.meta.env.VITE_APP_URL}/article/more/${category}/views?page=${page}&size=${size}`, {
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

export async function deleteArticle(category, id) {
    try {
        const token = await getToken();
        await fetch(`${import.meta.env.VITE_APP_URL}/article/delete/${category}/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                'Access-Control-Allow-Origin': '*'
            },
        })
    } catch (error) {
        console.log(error)
    }
}