import '../Create-Article/_createArticle.scss';
import '../Tags/_tags.scss';
import '../../scss/base/_font.scss';
import '../../scss/partials/_variables.scss';
import '../../scss/barrel.scss';

import { allCategories, newArticle } from '../../services/articles';
import { useEffect, useMemo, useRef, useState } from 'react';

import InputPlayer from '../Player/InputPlayer';
import JoditEditor from 'jodit-react';
import React from 'react'
import Tags from '../Tags/Tags';
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
    toolbarAdaptive: true,
    addNewLineOnDBLClick: false,
    enableDragAndDropFileToEditor: true,
    imagesExtensions: ['jpg', 'png', 'jpeg', 'gif','webp'],
    activeButtonsInReadOnly: ['source', 'fullsize', 'print', 'about', 'dots'],

    "uploader": {
      "insertImageAsBase64URI": true
    },

    "disablePlugins": "video, about",



  }

  //Condicional para categorias

  let input;

  if (selected == "futbolistas") {

    input = <InputPlayer showValue={false} />

  } else if (selected == "copas") {

    input = <Trophies showValue={false} />

  } else if (selected == "equipos") {

    input = <Team showValue={false} />

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
        } else {
          navigate(`/articulo/${selected}/${result}`);
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
          navigate(`/articulo/${selected}/${result}`);
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

          <Tags />

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