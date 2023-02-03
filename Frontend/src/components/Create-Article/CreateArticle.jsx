import '../Create-Article/_createArticle.scss';
import '../../scss/base/_font.scss';

import { useRef, useState } from 'react';

import InputPlayer from '../Player/InputPlayer';
import JoditEditor from 'jodit-react';
import { Link } from 'react-router-dom';
import React from 'react'
import Team from '../Teams/Team';
import Trophies from '../Trophies/Trophies';
import { newArticle } from '../../services/articles';

const CreateArticle = () => {

  const editor = useRef(null);

  const [content, setContent] = useState('');

  const [selected, setSelected] = useState('');

  console.log(content);

  console.log(selected);

  const config = {

    readonly: false,
    height: 380,

    "uploader": {
      "insertImageAsBase64URI": true
    },

    "disablePlugins": "video"

  }

  //Condicional para categorias

  let input = <h2>Elige una categoria</h2>

  if (selected == "futbolistas") {

    input = <InputPlayer />

  } else if (selected == "copas") {

    input = <Trophies />

  } else if (selected == "equipos") {

    input = <Team />

  }

  //función para cuando cambie el select

  function handlerChange(e) {

    setSelected((e.target.value.toLowerCase()));

  }

  //función para el formulario

  const handleSubmit = async (e) => {

    e.preventDefault();

    let file = document.getElementById("file");
    let title = document.getElementById("title").value;
    let text = document.getElementById("text").value;
    let author = document.getElementById("author").value;
    let fullName = document.getElementById("fullName").value;
    let category = document.getElementById("category").value;
    let nickName = document.getElementById("nickName").value;
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

    let formData = new FormData();

    formData.append("title", title);
    formData.append("text", text);
    formData.append("author", author);
    formData.append("fullName", fullName);
    formData.append("category", category);
    formData.append("file", file.files[0]);
    formData.append("nickName", nickName);
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

    let result = await newArticle(formData)

  }

  return (

    <div className="AppContainer">


      <form method="post" action={`/articulo/${selected}`} encType='multipart/form-data' className='formularioCategorias' onSubmit={handleSubmit}>

        <div className='flexInputs'>
          <div className="flexUbicar">

            <div className='containerCategoria'>

              <label className='labelCategoria'>Selecciona la categoria:</label>


              <select className='selectCat' name='category' id="category" onChange={handlerChange}>


                <option value="categorias">Categorias</option>
                <option value="futbolistas">Jugadores</option>
                <option value="copas">Copas</option>
                <option value="equipos">Equipos</option>


              </select>

            </div>

            <div className="inputsCategorias">
              {input}
            </div>


          </div>


        </div>

        <div className="joditEditor">

          <JoditEditor ref={editor} value={content} onChange={newContent => setContent(newContent)} config={config} />

        </div>

        <div className="moverInputs">

          <div className="inputsEtiquetas">

            <div className='tooltip-container'>

              <i className="fa-solid fa-question questionIcon"></i>
              <span className='tooltip'>No te olvides de poner comas y espacios.</span>

            </div>

            <label className='agregarEtiqueta'>Agregar etiquetas</label>
            <input type="text" placeholder='Escribe las etiquetas...' className='inputComas' name='tags' />

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