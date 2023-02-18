import '../Create-Article/_createArticle.scss';
import '../../scss/base/_font.scss';
import '../../scss/partials/_variables.scss';
import '../../scss/barrel.scss';

import { allCategories, newArticle } from '../../services/articles';
import { useEffect, useMemo, useRef, useState } from 'react';

import InputPlayer from '../Player/InputPlayer';
import JoditEditor from 'jodit-react';
import React from 'react'
import Team from '../Teams/Team';
import Trophies from '../Trophies/Trophies';
import { useNavigate } from "react-router-dom";

const CreateArticle = ({ placeholder }) => {
  const navigate = useNavigate();

  const editor = useRef(null);

  const [content, setContent] = useState('');

  const [selected, setSelected] = useState('');

  const [categories, setCategories] = useState('');

  const config = {

    readonly: false,
    height: 600,
    placeholder: placeholder || 'Escribe tu artículo...',
    toolbarSticky: false,
    showPlaceholder: false,

    "uploader": {
      "insertImageAsBase64URI": true
    },

    "disablePlugins": "video, about",



  }

  //Condicional para categorias

  let input;

  if (selected == "futbolistas") {

    input = <InputPlayer />

  } else if (selected == "copas") {

    input = <Trophies />

  } else if (selected == "equipos") {

    input = <Team />

  }

  // Categories
  useEffect(() => {
    allCategories().then(setCategories)
  }, [])

  let categorias;
  if (categories) {
    categorias = categories.map((c, i) => { return <option key={i} value={c}>{c}</option> })
  }

  //función para cuando cambie el select

  function handlerChange(e) {

    setSelected((e.target.value.toLowerCase()));

  }

  //función para el formulario

  const handleSubmit = async (e) => {

    e.preventDefault();

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

        msgErrors[0].classList.remove("invalid")
        msgErrors[1].classList.remove("invalid")
        msgErrors[2].classList.remove("invalid")
        msgErrors[3].classList.remove("invalid")
        msgErrors[4].classList.remove("invalid")
        msgErrors[5].classList.remove("invalid")
        msgErrors[6].classList.remove("invalid")
        msgErrors[7].classList.remove("invalid")
        msgErrors[8].classList.remove("invalid")
        msgErrors[9].classList.remove("invalid")
        msgErrors[10].classList.remove("invalid")
        msgErrors[11].classList.remove("invalid")
        msgErrors[12].classList.remove("invalid")
        msgErrors[13].classList.remove("invalid")
        msgErrors[14].classList.remove("invalid")
        msgErrors[15].classList.remove("invalid")
        msgErrors[16].classList.remove("invalid")
        msgErrors[17].classList.remove("invalid")

        if (Array.isArray(result)) {
          result.forEach(error => {
            if (error.param === "title") {
              msgErrors[0].innerText = error.msg
              msgErrors[0].classList.add("invalid")
            } else if (error.param === "fullName") {
              msgErrors[1].innerText = error.msg
              msgErrors[1].classList.add("invalid")
            } else if (error.param === "nickName") {
              msgErrors[2].innerText = error.msg
              msgErrors[2].classList.add("invalid")
            } else if (error.param === "nationality") {
              msgErrors[3].innerText = error.msg
              msgErrors[3].classList.add("invalid")
            } else if (error.param === "born") {
              msgErrors[4].innerText = error.msg
              msgErrors[4].classList.add("invalid")
            } else if (error.param === "death") {
              msgErrors[5].innerText = error.msg
              msgErrors[5].classList.add("invalid")
            } else if (error.param === "team") {
              msgErrors[6].innerText = error.msg
              msgErrors[6].classList.add("invalid")
            } else if (error.param === "numbers") {
              msgErrors[7].innerText = error.msg
              msgErrors[7].classList.add("invalid")
            } else if (error.param === "goals") {
              msgErrors[8].innerText = error.msg
              msgErrors[8].classList.add("invalid")
            } else if (error.param === "height") {
              msgErrors[9].innerText = error.msg
              msgErrors[9].classList.add("invalid")
            } else if (error.param === "weight") {
              msgErrors[10].innerText = error.msg
              msgErrors[10].classList.add("invalid")
            } else if (error.param === "position") {
              msgErrors[11].innerText = error.msg
              msgErrors[11].classList.add("invalid")
            } else if (error.param === "debut") {
              msgErrors[12].innerText = error.msg
              msgErrors[12].classList.add("invalid")
            } else if (error.param === "retire") {
              msgErrors[13].innerText = error.msg
              msgErrors[13].classList.add("invalid")
            } else if (error.param === "image") {
              msgErrors[14].innerText = error.msg
              msgErrors[14].classList.add("invalid")
            } else if (error.param === "author") {
              msgErrors[15].innerText = error.msg
              msgErrors[15].classList.add("invalid")
            } else if (error.param === "text") {
              msgErrors[16].innerText = error.msg
              msgErrors[16].classList.add("invalid")
            } else if (error.param === "tags") {
              msgErrors[17].innerText = error.msg
              msgErrors[17].classList.add("invalid")
            }
          })
        } else {
          navigate(`/articulo/${selected}/${result}`)
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

        msgErrors[0].classList.remove("invalid")
        msgErrors[1].classList.remove("invalid")
        msgErrors[2].classList.remove("invalid")
        msgErrors[3].classList.remove("invalid")
        msgErrors[4].classList.remove("invalid")
        msgErrors[5].classList.remove("invalid")
        msgErrors[6].classList.remove("invalid")
        msgErrors[7].classList.remove("invalid")
        msgErrors[8].classList.remove("invalid")
        msgErrors[9].classList.remove("invalid")
        msgErrors[10].classList.remove("invalid")

        if (Array.isArray(result)) {
          result.forEach(error => {
            if (error.param === "title") {
              msgErrors[0].innerText = error.msg
              msgErrors[0].classList.add("invalid")
            } else if (error.param === "fullName") {
              msgErrors[1].innerText = error.msg
              msgErrors[1].classList.add("invalid")
            } else if (error.param === "campus") {
              msgErrors[2].innerText = error.msg
              msgErrors[2].classList.add("invalid")
            } else if (error.param === "foundation") {
              msgErrors[3].innerText = error.msg
              msgErrors[3].classList.add("invalid")
            } else if (error.param === "organizer") {
              msgErrors[4].innerText = error.msg
              msgErrors[4].classList.add("invalid")
            } else if (error.param === "champion") {
              msgErrors[5].innerText = error.msg
              msgErrors[5].classList.add("invalid")
            } else if (error.param === "subchampion") {
              msgErrors[6].innerText = error.msg
              msgErrors[6].classList.add("invalid")
            } else if (error.param === "image") {
              msgErrors[7].innerText = error.msg
              msgErrors[7].classList.add("invalid")
            } else if (error.param === "author") {
              msgErrors[8].innerText = error.msg
              msgErrors[8].classList.add("invalid")
            } else if (error.param === "text") {
              msgErrors[9].innerText = error.msg
              msgErrors[9].classList.add("invalid")
            } else if (error.param === "tags") {
              msgErrors[10].innerText = error.msg
              msgErrors[10].classList.add("invalid")
            }
          })
        } else {
          navigate(`/articulo/${selected}/${result}`)
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

        msgErrors[0].classList.remove("invalid")
        msgErrors[1].classList.remove("invalid")
        msgErrors[2].classList.remove("invalid")
        msgErrors[3].classList.remove("invalid")
        msgErrors[4].classList.remove("invalid")
        msgErrors[5].classList.remove("invalid")
        msgErrors[6].classList.remove("invalid")
        msgErrors[7].classList.remove("invalid")
        msgErrors[8].classList.remove("invalid")
        msgErrors[9].classList.remove("invalid")
        msgErrors[10].classList.remove("invalid")

        if (Array.isArray(result)) {
          result.forEach(error => {
            if (error.param === "title") {
              msgErrors[0].innerText = error.msg
              msgErrors[0].classList.add("invalid")
            } else if (error.param === "fullName") {
              msgErrors[1].innerText = error.msg
              msgErrors[1].classList.add("invalid")
            } else if (error.param === "nickName") {
              msgErrors[2].innerText = error.msg
              msgErrors[2].classList.add("invalid")
            } else if (error.param === "foundation") {
              msgErrors[3].innerText = error.msg
              msgErrors[3].classList.add("invalid")
            } else if (error.param === "president") {
              msgErrors[4].innerText = error.msg
              msgErrors[4].classList.add("invalid")
            } else if (error.param === "stadium") {
              msgErrors[5].innerText = error.msg
              msgErrors[5].classList.add("invalid")
            } else if (error.param === "coach") {
              msgErrors[6].innerText = error.msg
              msgErrors[6].classList.add("invalid")
            } else if (error.param === "image") {
              msgErrors[7].innerText = error.msg
              msgErrors[7].classList.add("invalid")
            } else if (error.param === "author") {
              msgErrors[8].innerText = error.msg
              msgErrors[8].classList.add("invalid")
            } else if (error.param === "text") {
              msgErrors[9].innerText = error.msg
              msgErrors[9].classList.add("invalid")
            } else if (error.param === "tags") {
              msgErrors[10].innerText = error.msg
              msgErrors[10].classList.add("invalid")
            }
          })
        } else {
          navigate(`/articulo/${selected}/${result}`)
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (

    <div className="AppContainer">


      <form method="post" encType='multipart/form-data' className='formularioCategorias' onSubmit={handleSubmit}>

        <div className='flexInputs'>
          <div className="flexUbicar">

            <div className='containerCategoria'>

              <label className='labelCategoria'>Selecciona la categoria:</label>


              <select className='selectCat' name='category' id="category" onChange={handlerChange}>


                <option value="categorias">Categorias</option>
                {categorias}


              </select>

            </div>

            <div className="inputsCategorias">
              {input}
            </div>


          </div>


        </div>

        <div className="joditEditor">

          {useMemo(
            () => (
              <JoditEditor
                ref={editor}
                value={content}
                config={config}
                tabIndex={1} // tabIndex of textarea
                onChange={(newContent) => {
                  setContent(newContent);
                }}
              />
            ),
            []
          )}

        </div>
        <p className="msg-error error-jodit"></p>

        <div className="moverInputs">

          <div className="inputsEtiquetas">


            <label className='agregarEtiqueta'>Agregar etiquetas</label>
            <input type="text" placeholder='Escribe las etiquetas...' className='inputComas' name='tags' id="tags" />

            <div className='tooltip-container'>
              <i className="fa-solid fa-question questionIcon"></i>

              <span className='tooltip'>No te olvides de separar con comas y sin espacios.</span>

            </div>

          </div>

          <div className="moverButtons">

            <button type="submit" className='agregarArticulo botonLink'>Crear</button>
            <button className='agregarArticulo'>Cancelar</button>

          </div>

        </div>
        <p className="msg-error error-tags"></p>

      </form>

    </div>

  )
}

export default CreateArticle