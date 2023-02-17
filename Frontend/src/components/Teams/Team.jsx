import '../Teams/_team.scss';
import '../../scss/utilities/_utilities.scss';

import React from 'react'

const Team = () => {
    return (
        <div>
            <div className='containerEquipos'>

                <div className='flexTeam'>

                    <label>Título:</label>
                    <input type="text" name="title" id="title" placeholder='Título del artículo...' className='inputs__team' />

                    <label>Nombre completo:</label>
                    <input type="text" name="fullName" id="fullName" placeholder='Nombre completo del equipo...' className='inputs__team' />

                    <label>Apodos: (Opcional)</label>
                    <input type="text" name="nickName" id="nickName" placeholder='Apodo(s) del equipo...' className='inputs__team' />

                    <label>Fundación:</label>
                    <input type="date" name="foundation" id="foundation" className='inputs__team' />

                    <label>Presidente:</label>
                    <input type="text" name="president" id="president" placeholder='Nombre del presidente del equipo...' className='inputs__team' />

                    <label>Estadio:</label>
                    <input type="text" name="stadium" id="stadium" placeholder='Nombre del estadio del equipo...' className='inputs__team' />

                    <label>Entrenador:</label>
                    <input type="text" name="coach" id="coach" placeholder='Nombre del entrenador del equipo...' className='inputs__team' />

                    <label>Imagen:</label>
                    <input type="file" name='file' id="file" className='inputJugadores inputFile' />

                    <label>Autor:</label>
                    <input type="text" name="author" id="author" placeholder='Nombre del autor de este artículo' className='inputs__team' />

                </div>

            </div>
        </div>
    )
}

export default Team