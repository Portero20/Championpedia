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

export async function newArticle(category, formData) {
    try {
        const token = await getToken();
        let query = await fetch(`${import.meta.env.VITE_URL_FRONTEND}/article/${category}/create`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
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
        let query = await fetch(`${import.meta.env.VITE_URL_FRONTEND}/article/categories`, {
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

export async function detail(category, id) {
    try {
        const token = await getToken();
        let query = await fetch(`${import.meta.env.VITE_URL_FRONTEND}/article/${category}/${id}`, {
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

export async function editArticle(category, formData) {
    try {
        const token = await getToken();
        let query = await fetch(`${import.meta.env.VITE_URL_FRONTEND}/article/edit/${category}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
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
        let query = await fetch(`${import.meta.env.VITE_URL_FRONTEND}/article/view`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
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
        let query = await fetch(`${import.meta.env.VITE_URL_FRONTEND}/article/last`, {
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

export async function moreViews() {
    try {
        const token = await getToken();
        let query = await fetch(`${import.meta.env.VITE_URL_FRONTEND}/article/moreViews`, {
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

export async function news() {
    try {
        const token = await getToken();
        let query = await fetch(`${import.meta.env.VITE_URL_FRONTEND}/article/news`, {
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

export async function lastCategories(category, size) {
    try {
        const token = await getToken();
        let query = await fetch(`${import.meta.env.VITE_URL_FRONTEND}/article/last/${category}/${size}`, {
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

export async function moreViewsCategory(category, page, size) {
    try {
        const token = await getToken();
        let query = await fetch(`${import.meta.env.VITE_URL_FRONTEND}/article/more/${category}/views?page=${page}&size=${size}`, {
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

export async function deleteArticle(category, id) {
    try {
        const token = await getToken();
        await fetch(`${import.meta.env.VITE_URL_FRONTEND}/article/delete/${category}/${id}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
    } catch (error) {
        console.log(error)
    }
}