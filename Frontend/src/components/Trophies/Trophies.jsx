import '../Trophies/_trophies.scss';
import '../../scss/utilities/mixin/_mixin.scss'

import React from 'react'

const Trophies = () => {
    return (
        <div>
            <div className='containerCopas'>
                    <div className='flexTrophies'>

                        <label>Titulo:</label>
                        <input type="text" name="title" id="title" placeholder='Título del artículo...' className='inputsTrophies' />

                        <label>Nombre completo:</label>
                        <input type="text" name="fullName" id="fullName" placeholder='Nombre completo de la competición...' className='inputsTrophies' />

                        <label>Sede:</label>
                        <input type="text" name="campus" id="campus" placeholder='Nombre de la sede de la competición...' className='inputsTrophies' />

                        <label>Fundación:</label>
                        <input type="date" name="foundation" id="foundation" className='inputsTrophies' />

                        <label>Organizador:</label>
                        <input type="text" name="organizer" id="organizer"  placeholder='Nombre del organizador de la competición...' className='inputsTrophies' />

                        <label>Campeón:</label>
                        <input type="text" name="champion" id="champion" placeholder='Nombre del último campeón...' className='inputsTrophies' />

                        <label>Subcampeón:</label>
                        <input type="text" name="subchampion" id="subchampion" placeholder='Nombre del último subcampeón...' className='inputsTrophies' />

                        <label>Imagen:</label>
                        <input type="file" name='file' id="file" className='inputJugadores' />

                        <label>Autor:</label>
                        <input type="text" name="author" id="author" placeholder='Nombre del autor de este artículo' className='inputsTrophies inputFile' />

                    </div>
            
            </div>
        </div>
    )
}

export default Trophies