import '../Trophies/_trophies.scss';
import '../../scss/utilities/mixin/_mixin.scss'

import React from 'react'

const Trophies = () => {
    return (
        <div>
            <div className='containerCopas'>
                    <div className='flexTrophies'>

                        <label>Titulo:</label>
                        <input type="text" name="title" id="title" placeholder='Escribir...' className='inputsTrophies' />

                        <label>Nombre completo:</label>
                        <input type="text" name="fullName" id="fullName" placeholder='Escribir...' className='inputsTrophies' />

                        <label>Campus:</label>
                        <input type="text" name="campus" id="campus" placeholder='Escribir...' className='inputsTrophies' />

                        <label>Fundación:</label>
                        <input type="date" name="foundation" id="foundation" placeholder='Escribir...' className='inputsTrophies' />

                        <label>Organizador:</label>
                        <input type="text" name="organizer" id="organizer" placeholder='Escribir...' className='inputsTrophies' />

                        <label>Campeon:</label>
                        <input type="text" name="champion" id="champion" placeholder='Escribir...' className='inputsTrophies' />

                        <label>Subcampeón:</label>
                        <input type="text" name="subchampion" id="subchampion" placeholder='Escribir...' className='inputsTrophies' />

                        <label>Imagen:</label>
                        <input type="file" name='file' id="file" className='inputJugadores' />

                        <label>Autor:</label>
                        <input type="text" name="author" id="author" placeholder='Escribir...' className='inputsTrophies inputFile' />

                    </div>
            
            </div>
        </div>
    )
}

export default Trophies