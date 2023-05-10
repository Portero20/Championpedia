import { newArticle, editArticle } from "../../services/articles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const handleSubmit = async (selected, content, view, idCategory) => {
    let msgError = document.querySelectorAll(".msgErrorCategory");

    if (selected == "" || selected == "categorias") {
        msgError.forEach((error) => {
            toast.error("Debes seleccionar una categoría");
        });
    }

    msgError.forEach((error) => {
        error.classList.remove("invalid");
    });

    if (selected == "futbolistas") {
        try {
            let title = document.getElementById("title").value;
            let file = document.getElementById("file");
            let text = content;
            let fullName = document.getElementById("fullName").value;
            let nickName = document.getElementById("nickName").value;
            let born = document.getElementById("born").value;
            let deathValue = document.getElementById("death").value;
            let death = deathValue != "" && deathValue != "null" ? deathValue : null
            let height = document.getElementById("height").value;
            let weight = document.getElementById("weight").value;
            let nationality = document.getElementById("nationality").value;
            let position = document.getElementById("position").value;
            let team = document.getElementById("team").value;
            let numbers = document.getElementById("numbers").value;
            let goals = document.getElementById("goals").value;
            let debut = document.getElementById("debut").value;
            let retireValue = document.getElementById("retire").value;
            let retire = retireValue != "" && retireValue != "null" ? retireValue : null;
            let tags = document.getElementById("tags").value;
            let category;
            let id;
            let author;
            view === "create"
                ? (category = document.getElementById("category").value)
                : (category = selected);
            view === "edit" ? (id = idCategory) : null;
            view === "create"
                ? (author = document.getElementById("author").value)
                : null;

            let msgErrors = document.querySelectorAll(".msg-error");

            let formData = new FormData();

            formData.append("title", title);
            formData.append("file", file.files[0]);
            formData.append("text", text);
            formData.append("fullName", fullName);
            formData.append("nickName", nickName);
            formData.append("category", category);
            formData.append("born", born);
            formData.append("death", death);
            formData.append("height", height);
            formData.append("weight", weight);
            formData.append("nationality", nationality);
            formData.append("position", position);
            formData.append("team", team);
            formData.append("numbers", numbers);
            formData.append("goals", goals);
            formData.append("debut", debut);
            formData.append("retire", retire);
            formData.append("tags", tags);
            view === "edit" ? formData.append("id", id) : null;
            view === "create" ? formData.append("author", author) : null;

            let result;

            view === "create"
                ? (result = await newArticle(selected, formData))
                : (result = await editArticle(selected, formData));

            msgErrors.forEach((error) => {
                error.classList.remove("invalid");
            });

            let errorFields;

            view === "create"
                ? (errorFields = {
                    title: 0,
                    fullName: 1,
                    nickName: 2,
                    nationality: 3,
                    born: 4,
                    death: 5,
                    team: 6,
                    numbers: 7,
                    goals: 8,
                    height: 9,
                    weight: 10,
                    position: 11,
                    debut: 12,
                    retire: 13,
                    image: 14,
                    author: 15,
                    text: 16,
                    tags: 17,
                })
                : (errorFields = {
                    title: 0,
                    fullName: 1,
                    nickName: 2,
                    nationality: 3,
                    born: 4,
                    death: 5,
                    team: 6,
                    numbers: 7,
                    goals: 8,
                    height: 9,
                    weight: 10,
                    position: 11,
                    debut: 12,
                    retire: 13,
                    image: 14,
                    text: 15,
                    tags: 16,
                });

            if (Array.isArray(result)) {
                result.forEach((error) => {
                    if (error.param in errorFields) {
                        const index = errorFields[error.param];
                        msgErrors[index].innerText = error.msg;
                        msgErrors[index].classList.add("invalid");
                    }
                });

                // msgErrors.forEach(error => {
                //     if (!error.classList.contains("invalid")) {
                //         error.classList.add("invalid")
                //         error.innerHTML = "Este campo puede quedar vacío"
                //         error.style.color = "green"
                //     }
                // })
            } else {
                view === "create"
                    ? window.location.replace(`/articulo/Futbolistas/${result}`)
                    : window.location.replace(`/articulo/Futbolistas/${idCategory}`);
            }
        } catch (error) {
            console.log(error);
        }
    }
    if (selected == "copas") {
        try {
            let title = document.getElementById("title").value;
            let file = document.getElementById("file");
            let text = content;
            let fullName = document.getElementById("fullName").value;
            let campus = document.getElementById("campus").value;
            let foundation = document.getElementById("foundation").value;
            let organizer = document.getElementById("organizer").value;
            let champion = document.getElementById("champion").value;
            let subchampion = document.getElementById("subchampion").value;
            let tags = document.getElementById("tags").value;
            let category;
            let author;
            let id;
            view === "create"
                ? (category = document.getElementById("category").value)
                : (category = selected);
            view === "create"
                ? (author = document.getElementById("author").value)
                : null;
            view === "edit" ? (id = idCategory) : null;

            let msgErrors = document.querySelectorAll(".msg-error");

            let formData = new FormData();

            formData.append("title", title);
            formData.append("text", text);
            formData.append("fullName", fullName);
            formData.append("category", category);
            formData.append("file", file.files[0]);
            formData.append("campus", campus);
            formData.append("foundation", foundation);
            formData.append("organizer", organizer);
            formData.append("champion", champion);
            formData.append("subchampion", subchampion);
            formData.append("tags", tags);
            view === "edit" ? formData.append("id", id) : null;
            view === "create" ? formData.append("author", author) : null;

            let result;

            view === "create"
                ? (result = await newArticle(selected, formData))
                : (result = await editArticle(selected, formData));

            msgErrors.forEach((error) => {
                error.classList.remove("invalid");
            });

            let errorMap;

            view === "create"
                ? (errorMap = {
                    title: 0,
                    fullName: 1,
                    campus: 2,
                    foundation: 3,
                    organizer: 4,
                    champion: 5,
                    subchampion: 6,
                    image: 7,
                    author: 8,
                    text: 9,
                    tags: 10,
                })
                : (errorMap = {
                    title: 0,
                    fullName: 1,
                    campus: 2,
                    foundation: 3,
                    organizer: 4,
                    champion: 5,
                    subchampion: 6,
                    image: 7,
                    text: 8,
                    tags: 9,
                });

            if (Array.isArray(result)) {
                result.forEach((error) => {
                    const index = errorMap[error.param];
                    if (index !== undefined) {
                        msgErrors[index].innerText = error.msg;
                        msgErrors[index].classList.add("invalid");
                    }
                });
            } else {
                view === "create"
                    ? window.location.replace(`/articulo/Copas/${result}`)
                    : window.location.replace(`/articulo/Copas/${idCategory}`);
            }
        } catch (error) {
            console.log(error);
        }
    }
    if (selected == "equipos") {
        try {
            let title = document.getElementById("title").value;
            let file = document.getElementById("file");
            let text = content;
            let fullName = document.getElementById("fullName").value;
            let nickName = document.getElementById("nickName").value;
            let foundation = document.getElementById("foundation").value;
            let president = document.getElementById("president").value;
            let stadium = document.getElementById("stadium").value;
            let coach = document.getElementById("coach").value;
            let tags = document.getElementById("tags").value;
            let category;
            let author;
            let id;
            view === "create"
                ? (category = document.getElementById("category").value)
                : (category = selected);
            view === "create"
                ? (author = document.getElementById("author").value)
                : null;
            view === "edit" ? (id = idCategory) : null;

            let msgErrors = document.querySelectorAll(".msg-error");

            let formData = new FormData();

            formData.append("title", title);
            formData.append("text", text);
            formData.append("file", file.files[0]);
            formData.append("fullName", fullName);
            formData.append("nickName", nickName);
            formData.append("foundation", foundation);
            formData.append("category", category);
            formData.append("president", president);
            formData.append("stadium", stadium);
            formData.append("coach", coach);
            formData.append("tags", tags);
            view === "edit" ? formData.append("id", id) : null;
            view === "create" ? formData.append("author", author) : null;

            let result;

            view === "create"
                ? (result = await newArticle(selected, formData))
                : (result = await editArticle(selected, formData));

            msgErrors.forEach((error) => {
                error.classList.remove("invalid");
            });

            const paramIndex = {
                title: 0,
                fullName: 1,
                nickName: 2,
                foundation: 3,
                president: 4,
                stadium: 5,
                coach: 6,
                image: 7,
                author: 8,
                text: 9,
                tags: 10,
            };

            if (Array.isArray(result)) {
                result.forEach((error) => {
                    const index = paramIndex[error.param];
                    if (index !== undefined) {
                        msgErrors[index].innerText = error.msg;
                        msgErrors[index].classList.add("invalid");
                    }
                });

                // msgErrors.forEach(error => {
                //     if (!error.classList.contains("invalid")) {
                //         error.classList.add("invalid")
                //         error.innerHTML = "Este campo puede quedar vacío"
                //         error.style.color = "green"
                //     }
                // })
            } else {
                view === "create"
                    ? window.location.replace(`/articulo/Equipos/${result}`)
                    : window.location.replace(`/articulo/Equipos/${idCategory}`);
            }
        } catch (error) {
            console.log(error);
        }
    }
};
