import '../Trophies/_trophies.scss';
import '../../scss/utilities/mixin/_mixin.scss'

import React from 'react'

const Trophies = ({article}) => {
    return (
        <div>
            <div className='containerCopas'>
                <div className='flexTrophies'>

                    <label>Titulo:</label>
                    <input type="text" name="title" id="title" placeholder='Título del artículo...' className='inputsTrophies' />
                    <p className="msg-error"></p>

                    <label>Nombre completo:</label>
                    <input type="text" name="fullName" id="fullName" placeholder='Nombre completo de la competición...' className='inputsTrophies' />
                    <p className="msg-error"></p>

                    <label>Sede:</label>
                    <input type="text" name="campus" id="campus" placeholder='Nombre de la sede de la competición...' className='inputsTrophies' />
                    <p className="msg-error"></p>

                    <label>Fundación:</label>
                    <input type="date" name="foundation" id="foundation" className='inputsTrophies' />
                    <p className="msg-error"></p>

                    <label>Organizador:</label>
                    <input type="text" name="organizer" id="organizer" placeholder='Nombre del organizador de la competición...' className='inputsTrophies' />
                    <p className="msg-error"></p>

                    <label>Campeón:</label>
                    <input type="text" name="champion" id="champion" placeholder='Nombre del último campeón...' className='inputsTrophies' />
                    <p className="msg-error"></p>

                    <label>Subcampeón:</label>
                    <input type="text" name="subchampion" id="subchampion" placeholder='Nombre del último subcampeón...' className='inputsTrophies' />
                    <p className="msg-error"></p>

                    <label>Imagen:</label>
                    <input type="file" name='file' id="file" className='inputFile2' />
                    <p className="msg-error"></p>

                    <label>Autor:</label>
                    <input type="text" name="author" id="author" placeholder='Nombre del autor de este artículo' className='inputsTrophies inputFile' />
                    <p className="msg-error"></p>

                </div>

            </div>
        </div>
    )
}

export default Trophies