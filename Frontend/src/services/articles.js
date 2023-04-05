export async function newArticle(category, formData) {
    try {
        let query = await fetch(`http://localhost:3000/article/${category}/create`, {
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
