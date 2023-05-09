import '../Player/_player.scss';
import '../../scss/utilities/_utilities.scss';

import { results } from '../../services/search'
import { AiOutlineReload } from 'react-icons/ai';
import { React, useState } from 'react'

const InputPlayer = ({ showValue, article, recibirValor }) => {
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = async (event) => {
    const value = event.target.value;

    if (value.length >= 1) {
      const result = await results(value);
      setSearchResults(result);
    } else {
      setSearchResults([]);
    }

    recibirValor(searchResults)
  }


  function funClear(data) {

    document.getElementById(data).value = "";

  }

  let InputAuthor;

  if (showValue != true) {

    InputAuthor = <div className='inputs-second'><label>Autor:</label><input type="text" name="author" id="author" placeholder='Nombre del autor de este artículo' className='inputJugadores' />
      <p className="msg-error"></p></div>
  }

  return (
    <div className='div-jugadores'>

      <div className='containerJugadores'>

        <div className='flexJugadores'>
          <div className='inputs-first'>
            <label>Título:</label>
            <input type="text" name="title" id="title" placeholder='Título del artículo...' className='inputJugadores' defaultValue={showValue ? article.title : null} onChange={handleInputChange} />
            <p className="msg-error"></p>

            <label>Nombre completo:</label>
            <input type="text" name="fullName" id="fullName" placeholder='Nombre completo del jugador...' className='inputJugadores' defaultValue={showValue ? article.fullName : null} />
            <p className="msg-error"></p>

            <label>Apodos: (Opcional)</label>
            <input type="text" name="nickName" id="nickName" placeholder='Apodo(s) del jugador...' className='inputJugadores' defaultValue={showValue ? article.nickName : null} />
            <p className="msg-error"></p>

            <label>Nacionalidad:</label>
            <input type="text" name="nationality" id="nationality" placeholder='Nacionalidad(es) del jugador...' className='inputJugadores' defaultValue={showValue ? article.nationality : null} />
            <p className="msg-error"></p>

            <label>Fecha de nacimiento:</label>
            <input type="date" name="born" id="born" className='inputJugadores' defaultValue={showValue ? article.born.split("T")[0] : null} />
            <p className="msg-error"></p>

            <label>Fecha de fallecimiento: (Opcional)</label>

            <div className='containerDate'>
              <input type="date" name="death" id="death" placeholder='Escribir...' className='inputJugadores inputFunction' defaultValue={showValue && article.death != null ? article.death.split("T")[0] : article.death} />
              <p className="msg-error"></p>
              <AiOutlineReload onClick={() => funClear("death")} size='20' className='iconReload' />
            </div>


            <label>Equipo:</label>
            <input type="text" name="team" id="team" placeholder='Equipo en el que juega o en los que jugó...' className='inputJugadores' defaultValue={showValue ? article.team : null} />
            <p className="msg-error"></p>

            <label>Dorsales:</label>
            <input type="text" name="numbers" id="numbers" placeholder='Dorsal(es) del jugador...' className='inputJugadores' defaultValue={showValue ? article.numbers : null} />
            <p className="msg-error"></p>

          </div>

          <div className='inputs-second'>
            <label>Goles:</label>
            <input type="number" name="goals" id="goals" placeholder='Cantidad de goles del jugador...' className='inputJugadores' defaultValue={showValue ? article.goals : null} />
            <p className="msg-error"></p>

            <label>Altura:</label>
            <input type="text" name="height" id="height" placeholder='Altura del jugador...' className='inputJugadores' defaultValue={showValue ? article.height : null} />
            <p className="msg-error"></p>

            <label>Peso</label>
            <input type="text" name="weight" id="weight" placeholder='Peso del jugador...' className='inputJugadores' defaultValue={showValue ? article.weight : null} />
            <p className="msg-error"></p>

            <label>Posición:</label>
            <input type="text" name="position" id="position" placeholder='Posición(es) del jugador...' className='inputJugadores' defaultValue={showValue ? article.position : null} />
            <p className="msg-error"></p>

            <label>Debut:</label>
            <input type="date" name="debut" id="debut" className='inputJugadores' defaultValue={showValue ? article.debut.split("T")[0] : null} />
            <p className="msg-error"></p>

            <label>Retiro: (Opcional)</label>

            <div className='containerDate'>
              <input type="date" name="retire" id="retire" className='inputJugadores inputFunction' defaultValue={showValue && article.death != null ? article.retire.split("T")[0] : article.death} />
              <p className="msg-error"></p>
              <AiOutlineReload onClick={() => funClear("retire")} size='20' className='iconReload' />
            </div>

            <label>Imagen:</label>
            <input type="file" name='file' id="file" className='inputFile' />
            <p className="msg-error"></p>

            {InputAuthor}


          </div>

        </div>

      </div>

    </div>
  )
}

export default InputPlayer