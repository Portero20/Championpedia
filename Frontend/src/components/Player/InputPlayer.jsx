import '../Player/_player.scss';
import '../../scss/utilities/_utilities.scss';

import React from 'react'

const InputPlayer = ({ showValue, article }) => {

  let InputAuthor;

  if (showValue != true) {

    InputAuthor = <div className='inputs-second'><label>Autor:</label><input type="text" name="author" id="author" placeholder='Nombre del autor de este 
      artículo' className='inputJugadores' />
      <p className="msg-error"></p></div>
  }

  return (
    <div className='div-jugadores'>

      <div className='containerJugadores'>

        <div className='flexJugadores'>
          <div className='inputs-first'>
            <label>Título:</label>
            <input type="text" name="title" id="title" placeholder='Título del artículo...' className='inputJugadores' value={showValue ? article.title : null} />
            <p className="msg-error"></p>

            <label>Nombre completo:</label>
            <input type="text" name="fullName" id="fullName" placeholder='Nombre completo del jugador...' className='inputJugadores' value={showValue ? article.fullName : null} />
            <p className="msg-error"></p>

            <label>Apodos: (Opcional)</label>
            <input type="text" name="nickName" id="nickName" placeholder='Apodo(s) del jugador...' className='inputJugadores' value={showValue ? article.nickName : null} />
            <p className="msg-error"></p>

            <label>Nacionalidad:</label>
            <input type="text" name="nationality" id="nationality" placeholder='Nacionalidad(es) del jugador...' className='inputJugadores' value={showValue ? article.nationality : null} />
            <p className="msg-error"></p>

            <label>Fecha de nacimiento:</label>
            <input type="date" name="born" id="born" className='inputJugadores' value={showValue ? article.born.split("T")[0] : null} />
            <p className="msg-error"></p>

            <label>Fecha de fallecimiento: (Opcional)</label>
            <input type="date" name="death" id="death" placeholder='Escribir...' className='inputJugadores' value={showValue ? article.death.split("T")[0] : null} />
            <p className="msg-error"></p>

            <label>Equipo:</label>
            <input type="text" name="team" id="team" placeholder='Equipo actual del jugador...' className='inputJugadores' value={showValue ? article.team : null} />
            <p className="msg-error"></p>

            <label>Dorsales:</label>
            <input type="text" name="numbers" id="numbers" placeholder='Dorsal(es) del jugador...' className='inputJugadores' value={showValue ? article.numbers : null} />
            <p className="msg-error"></p>

          </div>

          <div className='inputs-second'>
            <label>Goles:</label>
            <input type="number" name="goals" id="goals" placeholder='Cantidad de goles del jugador...' className='inputJugadores' value={showValue ? article.goals : null} />
            <p className="msg-error"></p>

            <label>Altura:</label>
            <input type="text" name="height" id="height" placeholder='Altura del jugador...' className='inputJugadores' value={showValue ? article.height : null} />
            <p className="msg-error"></p>

            <label>Peso</label>
            <input type="text" name="weight" id="weight" placeholder='Peso del jugador...' className='inputJugadores' value={showValue ? article.weight : null} />
            <p className="msg-error"></p>

            <label>Posición:</label>
            <input type="text" name="position" id="position" placeholder='Posición(es) del jugador...' className='inputJugadores' value={showValue ? article.position : null} />
            <p className="msg-error"></p>

            <label>Debut:</label>
            <input type="date" name="debut" id="debut" className='inputJugadores' value={showValue ? article.debut.split("T")[0] : null} />
            <p className="msg-error"></p>

            <label>Retiro: (Opcional)</label>
            <input type="date" name="retire" id="retire" className='inputJugadores' value={showValue ? article.retire.split("T")[0] : null} />
            <p className="msg-error"></p>

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