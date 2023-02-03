import '../Teams/_team.scss';
import '../../scss/utilities/_utilities.scss';

import React from 'react'

const Team = () => {
  return (
    <div>
        <div>

            <form action="">

                <div className='flexTeam'>

                    <label>Titulo:</label>
                    <input type="text" name="title" id="title" placeholder='Probando' className='inputs__team'/>

                    <label>Texto:</label>
                    <input type="text" name="text" id="text" placeholder='Probando' className='inputs__team'/>

                    <label>Autor:</label>
                    <input type="text" name="author" id="author" placeholder='Probando' className='inputs__team'/>

                    <label>Nombre completo:</label>
                    <input type="text" name="fullName" id="fullName" placeholder='Probando' className='inputs__team'/>

                    <label>Fundación:</label>
                    <input type="text" name="foundation" id="foundation" placeholder='Probando' className='inputs__team'/>

                    <label>Presidente:</label>
                    <input type="text" name="president" id="president" placeholder='Probando' className='inputs__team'/>

                    <label>Estadio:</label>
                    <input type="text" name="stadium" id="stadium" placeholder='Probando' className='inputs__team'/>

                    <label>Entrenador:</label>
                    <input type="text" name="coach" id="coach" placeholder='Probando' className='inputs__team'/>

                    <label>Apodos:</label>
                    <input type="text" name="nickName" id="nickName" placeholder='Probando' className='inputs__team'/>

                    <label>Imagen:</label>
                    <input type="file" name='file' id="file" className='inputJugadores'/>

                </div>

            </form>

        </div>
    </div>
    )
    }

export default Team