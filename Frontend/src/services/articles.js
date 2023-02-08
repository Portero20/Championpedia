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