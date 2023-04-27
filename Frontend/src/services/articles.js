export async function newArticle(category, formData) {
    try {
        let query = await fetch(`${import.meta.env.VITE_API_NEWARTICLE}${category}/create`, {
            method: "POST",
            headers: {
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
        let query = await fetch(`${import.meta.env.VITE_API_ALLCATEGORIES}`)
        let data = await query.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function detail(category, id) {
    try {
        let query = await fetch(`${import.meta.env.VITE_API_DETAIL}${category}/${id}`)
        let data = await query.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function editArticle(category, formData) {
    try {
        let query = await fetch(`${import.meta.env.VITE_API_EDITARTICLE}${category}`, {
            method: "POST",
            headers: {
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
        let query = await fetch(`${import.meta.env.VITE_API_VIEW}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
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
        let query = await fetch(`${import.meta.env.VITE_API_LASTPRODUCT}`)
        let data = await query.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function moreViews() {
    try {
        let query = await fetch(`${import.meta.env.VITE_API_MOREVIEWS}`)
        let data = await query.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function news() {
    try {
        let query = await fetch(`${import.meta.env.VITE_API_NEWS}`)
        let data = await query.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function lastCategories(category, size) {
    try {
        let query = await fetch(`${import.meta.env.VITE_API_LASTCATEGORIES}${category}/${size}`)
        let data = await query.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function moreViewsCategory(category, page, size) {
    try {
        let query = await fetch(`${import.meta.env.VITE_API_MOREVIEWCATEGORIE}${category}/views?page=${page}&size=${size}`)
        let data = await query.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function deleteArticle(category, id) {
    try {
        await fetch(`${import.meta.env.VITE_API_DELETE}${category}/${id}`, {
            method: "POST",
            headers: {
            },
        })
    } catch (error) {
        console.log(error)
    }
}