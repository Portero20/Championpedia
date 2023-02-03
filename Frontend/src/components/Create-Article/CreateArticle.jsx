import '../Create-Article/_createArticle.scss';
import '../../scss/base/_font.scss';

import { useRef, useState } from 'react';

import InputPlayer from '../Player/InputPlayer';
import JoditEditor from 'jodit-react';
import React from 'react'
import Team from '../Teams/Team';
import Trophies from '../Trophies/Trophies';

const CreateArticle = () => {

  const editor = useRef(null);

  const [content,setContent] = useState('');

  const [selected, setSelected] = useState('');

  console.log(content);

  console.log(selected);

  const config = {

    readonly: false,
    height: 380,

    "uploader":{
      "insertImageAsBase64URI": true
    },

    "disablePlugins": "video"

  }

  //Condicional para categorias

  let input;
  
  if(selected == "futbolistas"){

    input = <InputPlayer/>

  }else if(selected == "copas"){

    input = <Trophies/>

  }else if(selected == "equipos"){

    input = <Team/>

  }else{

    console.log("Error");

  }

  //función para cuando cambie el select
  
  function handlerChange(e){

    setSelected((e.target.value.toLowerCase()));

  }

  return (
    
    <div className="App">


      <form method="post" encType='multipart/form-data' className='formularioCategorias'>

        <div className='flexInputs'>
          <div className="flexUbicar">

            <div className='containerCategoria'>

              <label className='labelCategoria'>Selecciona la categoria:</label>


              <select className='selectCat' name='category' onChange={handlerChange}>
                

                <option value="categorias">Categorias</option>
                <option value="futbolistas">Jugadores</option>
                <option value="copas">Copas</option>
                <option value="equipos">Equipos</option>


              </select>

            </div>

            <div class="inputsCategorias">
              {input}
            </div>
          

          </div>


        </div>

        <div className="joditEditor">

          <JoditEditor ref={editor} value={content} onChange={newContent=>setContent(newContent)} config={config}/>
          
        </div>

        <div className="moverInputs">

          <div className="inputsEtiquetas">      

            <div className='tooltip-container'>

              <i className="fa-solid fa-question questionIcon"></i>
              <span className='tooltip'>No te olvides de poner comas y espacios.</span>
              
            </div>
            
            <label className='agregarEtiqueta'>Agregar etiquetas</label>
            <input type="text" placeholder='Escribe las etiquetas...' className='inputComas' name='tags'/>
            
          </div>

          <div className="moverButtons">

            <input type="submit" value="Agregar" className='agregarArticulo'/>
            <button className='agregarArticulo'>Cancelar</button>

          </div>

        </div>

      </form>

    </div>

  )
}

export default CreateArticle