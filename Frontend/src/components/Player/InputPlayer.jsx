import '../Player/_player.scss';
import '../../scss/utilities/_utilities.scss';

import React from 'react'

const InputPlayer = () => {
  return (
    <div>

        <div className='containerJugadores'>

            <form action="">

                <div className='flexJugadores'>

                    <label>Titulo:</label>
                    <input type="text" name="title" id="title" placeholder='Probando' className='inputJugadores' />

                    <label>Texto:</label>
                    <input type="text" name="text" id="text" placeholder='Probando' className='inputJugadores'/>

                    <label>Autor:</label>
                    <input type="text" name="author" id="author" placeholder='Probando' className='inputJugadores'/>

                    <label>Nombre completo:</label>
                    <input type="text" name="fullName" id="fullName" placeholder='Probando' className='inputJugadores'/>

                    <label>Apodos:</label>
                    <input type="text" name="nickName" id="nickName" placeholder='Probando' className='inputJugadores'/>

                    <label>Fecha de nacimiento:</label>
                    <input type="date" name="born" id="born" placeholder='Probando' className='inputJugadores'/>

                    <label>Fecha de fallecimiento:</label>
                    <input type="date" name="death" id="death" placeholder='Probando' className='inputJugadores'/>

                    <label>Altura:</label>
                    <input type="number" name="height" id="height" placeholder='Probando' className='inputJugadores'/>

                    <label>Peso</label>
                    <input type="number" name="weight" id="weight" placeholder='Probando' className='inputJugadores'/>

                    <label>Nacionalidad:</label>
                    <input type="text" name="nationality" id="nationality" placeholder='Probando' className='inputJugadores'/>

                    <label>Posicion:</label>
                    <input type="text" name="position" id="position" placeholder='Probando' className='inputJugadores'/>

                    <label>Equipo:</label>
                    <input type="text" name="team" id="team" placeholder='Probando' className='inputJugadores'/>

                    <label>Dorsales:</label>
                    <input type="text" name="numbers" id="numbers" placeholder='Probando' className='inputJugadores'/>

                    <label>Goles:</label>
                    <input type="number" name="goals" id="goals" placeholder='Probando' className='inputJugadores'/>

                    <label>Debut:</label>
                    <input type="date" name="debut" id="debut" placeholder='Probando' className='inputJugadores'/>

                    <label>Retiro:</label>
                    <input type="date" name="retire" id="retire" placeholder='Probando' className='inputJugadores'/>

                    <label>Imagen:</label>
                    <input type="file" name='file' id="file" className='inputJugadores'/>

                </div>

            </form>

        </div>

    </div>
  )
}

export default InputPlayer