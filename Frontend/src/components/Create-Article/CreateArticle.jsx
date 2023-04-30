import '../Create-Article/_createArticle.scss';
import '../Tags/_tags.scss';
import '../../scss/base/_font.scss';
import '../../scss/partials/_variables.scss';
import '../../scss/barrel.scss';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";

import InputPlayer from '../Player/InputPlayer';
import JoditEditor from 'jodit-react';
import React from 'react'
import Tags from '../Tags/Tags';
import Team from '../Teams/Team';
import Trophies from '../Trophies/Trophies';
import { allCategories } from '../../services/articles';
import { handleSubmit } from "../../logic/validation"

const CreateArticle = ({ placeholder }) => {
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
    imagesExtensions: ['jpg', 'png', 'jpeg', 'gif', 'webp'],
    activeButtonsInReadOnly: ['source', 'fullsize', 'print', 'about', 'dots'],

    "uploader": {
      "insertImageAsBase64URI": true
    },

    "disablePlugins": "video, about",
  }

  let input;

  if (selected == "futbolistas") {

    input = <InputPlayer showValue={false} />

  } else if (selected == "copas") {

    input = <Trophies showValue={false} />

  } else if (selected == "equipos") {

    input = <Team showValue={false} />

  }

  useEffect(() => {
    allCategories().then(setCategories)
  }, [])

  let categorias;
  if (categories) {
    categorias = categories.map((c, i) => { return <option key={i} value={c}>{c}</option> })
  }

  function handlerChange(e) {
    setSelected((e.target.value.toLowerCase()));

  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit(selected, content);
  }

  return (

    <div className="AppContainer">

      <form method="post" encType='multipart/form-data' className='formularioCategorias' onSubmit={handleFormSubmit}>

        <div className='flexInputs'>
          <div className="flexUbicar">

            <div className='containerCategoria'>

              <label className='labelCategoria'>Selecciona la categoria:</label>


              <select className='selectCat' name='category' id="category" onChange={handlerChange}>


                <option value="categorias">Categorias</option>
                {categorias}


              </select>
              <p className='msgErrorCategory'>Debes seleccionar una categoría</p>

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
                tabIndex={1}
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