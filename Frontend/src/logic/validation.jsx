import { newArticle } from '../services/articles';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const handleSubmit = async (selected, content) => {

    let msgError = document.querySelectorAll(".msgErrorCategory")

    if (selected == "" || selected == "categorias") {
        msgError.forEach((error) => {
            toast.error('Debes seleccionar una categoría');
        });
    }

    msgError.forEach((error) => {
        error.classList.remove("invalid");
    });

    if (selected == "futbolistas") {
        try {
            let file = document.getElementById("file");
            let title = document.getElementById("title").value;
            let text = content
            let author = document.getElementById("author").value;
            let fullName = document.getElementById("fullName").value;
            let nickName = document.getElementById("nickName").value;
            let category = document.getElementById("category").value;
            let born = document.getElementById("born").value;
            let death = document.getElementById("death").value;
            let height = document.getElementById("height").value;
            let weight = document.getElementById("weight").value;
            let nationality = document.getElementById("nationality").value;
            let position = document.getElementById("position").value;
            let team = document.getElementById("team").value;
            let numbers = document.getElementById("numbers").value;
            let goals = document.getElementById("goals").value;
            let debut = document.getElementById("debut").value;
            let retire = document.getElementById("retire").value;
            let tags = document.getElementById("tags").value;

            let msgErrors = document.querySelectorAll(".msg-error");

            let formData = new FormData();

            formData.append("file", file.files[0]);
            formData.append("title", title);
            formData.append("text", text);
            formData.append("author", author);
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

            let result = await newArticle(selected, formData)

            msgErrors.forEach((error) => {
                error.classList.remove("invalid");
            });

            const errorFields = {
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
            };

            if (Array.isArray(result)) {
                result.forEach((error) => {
                    if (error.param in errorFields) {
                        const index = errorFields[error.param];
                        msgErrors[index].innerText = error.msg;
                        msgErrors[index].classList.add("invalid");
                    }
                });

                msgErrors.forEach(error => {
                    if (!error.classList.contains("invalid")) {
                        error.classList.add("invalid")
                        error.innerHTML = "Este campo puede quedar vacío"
                        error.style.color = "green"
                    }
                })
            } else {
                window.location.href = `/articulo/${selected}/${result}`
            }

        } catch (error) {
            console.log(error)
        }
    }
    if (selected == "copas") {

        try {
            let file = document.getElementById("file");
            let title = document.getElementById("title").value;
            let text = content
            let author = document.getElementById("author").value;
            let fullName = document.getElementById("fullName").value;
            let category = document.getElementById("category").value;
            let campus = document.getElementById("campus").value;
            let foundation = document.getElementById("foundation").value;
            let organizer = document.getElementById("organizer").value;
            let champion = document.getElementById("champion").value;
            let subchampion = document.getElementById("subchampion").value
            let tags = document.getElementById("tags").value;

            let msgErrors = document.querySelectorAll(".msg-error");

            let formData = new FormData();

            formData.append("title", title);
            formData.append("text", text);
            formData.append("author", author);
            formData.append("fullName", fullName);
            formData.append("category", category);
            formData.append("file", file.files[0]);
            formData.append("campus", campus);
            formData.append("foundation", foundation);
            formData.append("organizer", organizer);
            formData.append("champion", champion);
            formData.append("subchampion", subchampion);
            formData.append("tags", tags);

            let result = await newArticle(selected, formData)

            msgErrors.forEach((error) => {
                error.classList.remove("invalid");
            });

            const errorMap = {
                "title": 0,
                "fullName": 1,
                "campus": 2,
                "foundation": 3,
                "organizer": 4,
                "champion": 5,
                "subchampion": 6,
                "image": 7,
                "author": 8,
                "text": 9,
                "tags": 10
            };

            if (Array.isArray(result)) {
                result.forEach(error => {
                    const index = errorMap[error.param];
                    if (index !== undefined) {
                        msgErrors[index].innerText = error.msg;
                        msgErrors[index].classList.add("invalid");
                    }
                });
            } else {
                window.location.href = `/articulo/${selected}/${result}`
            }
        } catch (error) {
            console.log(error)
        }
    }
    if (selected == "equipos") {
        try {
            let file = document.getElementById("file");
            let title = document.getElementById("title").value;
            let text = content
            let author = document.getElementById("author").value;
            let fullName = document.getElementById("fullName").value;
            let nickName = document.getElementById("nickName").value;
            let category = document.getElementById("category").value;
            let foundation = document.getElementById("foundation").value;
            let president = document.getElementById("president").value;
            let stadium = document.getElementById("stadium").value;
            let coach = document.getElementById("coach").value
            let tags = document.getElementById("tags").value;

            let msgErrors = document.querySelectorAll(".msg-error");

            let formData = new FormData();

            formData.append("title", title);
            formData.append("text", text);
            formData.append("author", author);
            formData.append("fullName", fullName);
            formData.append("nickName", nickName);
            formData.append("category", category);
            formData.append("file", file.files[0]);
            formData.append("foundation", foundation);
            formData.append("president", president);
            formData.append("stadium", stadium);
            formData.append("coach", coach);
            formData.append("tags", tags);

            let result = await newArticle(selected, formData)

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
                tags: 10
            }

            if (Array.isArray(result)) {
                result.forEach(error => {
                    const index = paramIndex[error.param]
                    if (index !== undefined) {
                        msgErrors[index].innerText = error.msg
                        msgErrors[index].classList.add("invalid")
                    }
                })

                msgErrors.forEach(error => {
                    if (!error.classList.contains("invalid")) {
                        error.classList.add("invalid")
                        error.innerHTML = "Este campo puede quedar vacío"
                        error.style.color = "green"
                    }
                })
            } else {
                window.location.href = `/articulo/${selected}/${result}`
            }
        } catch (error) {
            console.log(error);
        }
    }
}