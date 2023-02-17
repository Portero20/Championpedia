import '../Player/_player.scss';
import '../../scss/utilities/_utilities.scss';

import React from 'react'

const InputPlayer = () => {
  return (
    <div className='div-jugadores'>

      <div className='containerJugadores'>

        <div className='flexJugadores'>
          <div className='inputs-first'>
            <label>Titulo:</label>
            <input type="text" name="title" id="title" placeholder='Escribir...' className='inputJugadores' />

            <label>Nombre completo:</label>
            <input type="text" name="fullName" id="fullName" placeholder='Escribir...' className='inputJugadores' />

            <label>Apodos:</label>
            <input type="text" name="nickName" id="nickName" placeholder='Escribir...' className='inputJugadores' />

            <label>Nacionalidad:</label>
            <input type="text" name="nationality" id="nationality" placeholder='Escribir...' className='inputJugadores' />

            <label>Fecha de nacimiento:</label>
            <input type="date" name="born" id="born" placeholder='Escribir...' className='inputJugadores' />

            <label>Fecha de fallecimiento:</label>
            <input type="date" name="death" id="death" placeholder='Escribir...' className='inputJugadores' />

            <label>Equipo:</label>
            <input type="text" name="team" id="team" placeholder='Escribir...' className='inputJugadores' />

            <label>Dorsales:</label>
            <input type="text" name="numbers" id="numbers" placeholder='Escribir...' className='inputJugadores' />
          </div>

          <div className='inputs-second'>
            <label>Goles:</label>
            <input type="number" name="goals" id="goals" placeholder='Escribir' className='inputJugadores' />

            <label>Altura:</label>
            <input type="text" name="height" id="height" placeholder='Escribir' className='inputJugadores' />

            <label>Peso</label>
            <input type="text" name="weight" id="weight" placeholder='Escribir' className='inputJugadores' />

            <label>Posicion:</label>
            <input type="text" name="position" id="position" placeholder='Escribir' className='inputJugadores' />

            <label>Debut:</label>
            <input type="date" name="debut" id="debut" placeholder='Escribir' className='inputJugadores' />

            <label>Retiro:</label>
            <input type="date" name="retire" id="retire" placeholder='Escribir' className='inputJugadores' />

            <label>Imagen:</label>
            <input type="file" name='file' id="file" className='inputJugadores inputFile' />

            <label>Autor:</label>
            <input type="text" name="author" id="author" placeholder='Escribir' className='inputJugadores' />
          </div>

        </div>

      </div>

    </div>
  )
}

export default InputPlayer