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

const CreateArticle = ({placeholder}) => {
  const navigate = useNavigate();

  const editor = useRef(null);

  const [content, setContent] = useState('');

  const [selected, setSelected] = useState('');

  const [categories, setCategories] = useState('');

  const config = {

    readonly: false,
    height: 600,
    placeholder: placeholder || 'Escribe tu artículo...',

    "uploader": {
      "insertImageAsBase64URI": true
    },

    "disablePlugins": "video"

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
      navigate(`/articulo/${selected}/${result}`)
    }

    if (selected == "copas") {

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
      navigate(`/articulo/${selected}/${result}`)
    }

    if (selected == "equipos") {
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
      navigate(`/articulo/${selected}/${result}`)
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

        <div className="moverInputs">

          <div className="inputsEtiquetas">


            <label className='agregarEtiqueta'>Agregar etiquetas</label>
            <input type="text" placeholder='Escribe las etiquetas...' className='inputComas' name='tags' id="tags" />
            <div className='tooltip-container'>
              <i className="fa-solid fa-question questionIcon"></i>

              <span className='tooltip'>No te olvides de poner comas y espacios.</span>

            </div>

          </div>

          <div className="moverButtons">

            <button type="submit" className='agregarArticulo botonLink'>Crear</button>
            <button className='agregarArticulo'>Cancelar</button>

          </div>

        </div>

        </form>

        </div>

  )
}

export default CreateArticle