async function getToken() {
    const response = await fetch('https://back-end.up.railway.app/token', {
        headers: {
            'X-API-Key': `${import.meta.env.VITE_API_KEY}`,
            'Access-Control-Allow-Origin': '*'
        },
        mode: 'no-cors'
    })
    const data = await response.json();
    const token = data.token;
    return token
}

export async function newArticle(category, formData) {
    try {
        const token = await getToken();
        let query = await fetch(`https://back-end.up.railway.app/article/${category}/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                'Access-Control-Allow-Origin': '*'
            },
            body: formData,
            mode: 'no-cors'
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
        let query = await fetch(`https://back-end.up.railway.app/article/categories`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'no-cors'
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
        let query = await fetch(`https://back-end.up.railway.app/article/${category}/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'no-cors'
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
        let query = await fetch(`https://back-end.up.railway.app/article/edit/${category}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                'Access-Control-Allow-Origin': '*'
            },
            body: formData,
            mode: 'no-cors'
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
        let query = await fetch(`https://back-end.up.railway.app/article/view`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ category: category, id: id }),
            mode: 'no-cors'
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
        let query = await fetch(`https://back-end.up.railway.app/article/last`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'no-cors'
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
        let query = await fetch(`https://back-end.up.railway.app/article/moreViews`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'no-cors'
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
        let query = await fetch(`https://back-end.up.railway.app/article/news`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'no-cors'
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
        let query = await fetch(`https://back-end.up.railway.app/article/last/${category}/${size}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'no-cors'
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
        let query = await fetch(`https://back-end.up.railway.app/article/more/${category}/views?page=${page}&size=${size}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'no-cors'
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
        await fetch(`https://back-end.up.railway.app/article/delete/${category}/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'no-cors'
        })
    } catch (error) {
        console.log(error)
    }
}