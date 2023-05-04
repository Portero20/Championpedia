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

export async function newArticle(category, formData) {
    try {
        const token = await getToken();
        let query = await fetch(`https://championpedia-production.up.railway.app/${category}/create`, {
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
        let query = await fetch(`https://championpedia-production.up.railway.app/article/categories`, {
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
        let query = await fetch(`https://championpedia-production.up.railway.app/article/${category}/${id}`, {
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
        let query = await fetch(`https://championpedia-production.up.railway.app/article/edit/${category}`, {
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
        let query = await fetch(`https://championpedia-production.up.railway.app/article/view`, {
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
        let query = await fetch(`https://championpedia-production.up.railway.app/article/last`, {
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
        let query = await fetch(`https://championpedia-production.up.railway.app/article/moreViews`, {
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
        let query = await fetch(`http://localhost:3000/article/news`, {
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
        let query = await fetch(`https://championpedia-production.up.railway.app/${category}/${size}`, {
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
        let query = await fetch(`https://championpedia-production.up.railway.app/article/more/${category}/views?page=${page}&size=${size}`, {
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
        await fetch(`https://championpedia-production.up.railway.app/article/delete/${category}/${id}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
    } catch (error) {
        console.log(error)
    }
}