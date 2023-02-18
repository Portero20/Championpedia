import '../Player/_player.scss';
import '../../scss/utilities/_utilities.scss';

import React from 'react'

const InputPlayer = () => {
  return (
    <div className='div-jugadores'>

      <div className='containerJugadores'>

        <div className='flexJugadores'>
          <div className='inputs-first'>
            <label>Título:</label>
            <input type="text" name="title" id="title" placeholder='Título del artículo...' className='inputJugadores' />

            <label>Nombre completo:</label>
            <input type="text" name="fullName" id="fullName" placeholder='Nombre completo del jugador...' className='inputJugadores' />

            <label>Apodos: (Opcional)</label>
            <input type="text" name="nickName" id="nickName" placeholder='Apodo(s) del jugador...' className='inputJugadores' />

            <label>Nacionalidad:</label>
            <input type="text" name="nationality" id="nationality" placeholder='Nacionalidad(es) del jugador...' className='inputJugadores' />

            <label>Fecha de nacimiento:</label>
            <input type="date" name="born" id="born" className='inputJugadores' />

            <label>Fecha de fallecimiento: (Opcional)</label>
            <input type="date" name="death" id="death" placeholder='Escribir...' className='inputJugadores' />

            <label>Equipo:</label>
            <input type="text" name="team" id="team" placeholder='Equipo actual del jugador...' className='inputJugadores' />

            <label>Dorsales:</label>
            <input type="text" name="numbers" id="numbers" placeholder='Dorsal(es) del jugador...' className='inputJugadores' />
          </div>

          <div className='inputs-second'>
            <label>Goles:</label>
            <input type="number" name="goals" id="goals" placeholder='Cantidad de goles del jugador...' className='inputJugadores' />

            <label>Altura:</label>
            <input type="text" name="height" id="height" placeholder='Altura del jugador...' className='inputJugadores' />

            <label>Peso</label>
            <input type="text" name="weight" id="weight" placeholder='Peso del jugador...' className='inputJugadores' />

            <label>Posición:</label>
            <input type="text" name="position" id="position" placeholder='Posición(es) del jugador...' className='inputJugadores' />

            <label>Debut:</label>
            <input type="date" name="debut" id="debut" className='inputJugadores' />

            <label>Retiro: (Opcional)</label>
            <input type="date" name="retire" id="retire" className='inputJugadores' />

            <label>Imagen:</label>
            <input type="file" name='file' id="file" className='inputFile' />

            <label>Autor:</label>
            <input type="text" name="author" id="author" placeholder='Nombre del autor de este artículo' className='inputJugadores' />
          </div>

        </div>

      </div>

    </div>
  )
}

export default InputPlayer