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
        let query = await fetch(`http://localhost:3000/article/categories`)
        let data = await query.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function detail(category, id) {
    try {
        let query = await fetch(`http://localhost:3000/article/${category}/${id}`)
        let data = await query.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function editArticle(category, formData) {
    try {
        let query = await fetch(`http://localhost:3000/article/edit/${category}`, {
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
        let query = await fetch(`http://localhost:3000/article/view`, {
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
        let query = await fetch(`http://localhost:3000/article/last`)
        let data = await query.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function moreViews() {
    try {
        let query = await fetch(`http://localhost:3000/article/moreViews`)
        let data = await query.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function news() {
    try {
        let query = await fetch(`http://localhost:3000/article/news`)
        let data = await query.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function lastCategories(category, size) {
    try {
        let query = await fetch(`http://localhost:3000/article/last/${category}/${size}`)
        let data = await query.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function moreViewsCategory(category, page, size) {
    try {
        let query = await fetch(`http://localhost:3000/article/more/${category}/views?page=${page}&size=${size}`)
        let data = await query.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function deleteArticle(category, id) {
    try {
        await fetch(`http://localhost:3000/article/delete/${category}/${id}`, {
            method: "POST",
            headers: {
            },
        })
    } catch (error) {
        console.log(error)
    }
}