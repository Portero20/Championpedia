import '../Teams/_team.scss';
import '../../scss/utilities/_utilities.scss';
import { results } from '../../services/search'

import React, { useState } from 'react'

const Team = ({ showValue, article, recibirValor }) => {
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

    let InputAuthor;

    if (showValue != true) {

        InputAuthor = <div className='inputs-second'><label>Autor:</label><input type="text" name="author" id="author" placeholder='Nombre del autor de este artículo'className='inputs__team' />
            <p className="msg-error"></p></div>
    }
    return (
        <div>
            <div className='containerEquipos'>

                <div className='flexTeam'>

                    <label>Título:</label>
                    <input type="text" name="title" id="title" placeholder='Título del artículo...' className='inputs__team' defaultValue={showValue ? article.title : null} onChange={handleInputChange} />
                    <p className="msg-error"></p>

                    <label>Nombre completo:</label>
                    <input type="text" name="fullName" id="fullName" placeholder='Nombre completo del equipo...' className='inputs__team' defaultValue={showValue ? article.fullName : null}/>
                    <p className="msg-error"></p>

                    <label>Apodos: (Opcional)</label>
                    <input type="text" name="nickName" id="nickName" placeholder='Apodo(s) del equipo...' className='inputs__team' defaultValue={showValue ? article.nickName : null}/>
                    <p className="msg-error"></p>

                    <label>Fundación:</label>
                    <input type="date" name="foundation" id="foundation" className='inputs__team' defaultValue={showValue ? article.foundation.split("T")[0] : null}/>
                    <p className="msg-error"></p>

                    <label>Presidente:</label>
                    <input type="text" name="president" id="president" placeholder='Nombre del presidente del equipo...' className='inputs__team' defaultValue={showValue ? article.president : null}/>
                    <p className="msg-error"></p>

                    <label>Estadio:</label>
                    <input type="text" name="stadium" id="stadium" placeholder='Nombre del estadio del equipo...' className='inputs__team' defaultValue={showValue ? article.stadium : null}/>
                    <p className="msg-error"></p>

                    <label>Entrenador:</label>
                    <input type="text" name="coach" id="coach" placeholder='Nombre del entrenador del equipo...' className='inputs__team' defaultValue={showValue ? article.coach : null}/>
                    <p className="msg-error"></p>

                    <label>Imagen:</label>
                    <input type="file" name='file' id="file" className='inputFile3' />
                    <p className="msg-error"></p>

                    {InputAuthor}

                </div>

            </div>
        </div>
    )
}

export default Team