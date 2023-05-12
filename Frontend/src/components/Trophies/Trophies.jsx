import '../Trophies/_trophies.scss';
import '../../scss/utilities/mixin/_mixin.scss';
import '../../scss/base/_medias.scss';
import { results } from '../../services/search'

import React, { useState } from 'react'

const Trophies = ({ showValue, article, recibirValor }) => {
    const [searchResults, setSearchResults] = useState([]);

    const handleInputChange = async (event) => {
        const value = event.target.value;
    
        if (value.length >= 1) {
          const result = await results(value);
          setSearchResults(result);
    
          const lastSearch = result;
          recibirValor(lastSearch);
        } else {
          setSearchResults([]);
          recibirValor([]);
        }
      };
    
    let InputAuthor;

    if (showValue != true) {

        InputAuthor =
            <div className='inputs-second'>
                <label>Autor:</label>
                <div className='div-msg-container'>
                    <input type="text" name="author" id="author" placeholder='Nombre del autor de este artículo' className='inputsTrophies' />
                    <p className="msg-error"></p>
                </div>
            </div>
    }
    return (
        <div>
            <div className='containerCopas'>
                <div className='flexTrophies'>

                    <label>Titulo:</label>
                    <div className='div-msg-container'>
                        <input type="text" name="title" id="title" placeholder='Título del artículo...' className='inputsTrophies' defaultValue={showValue ? article.title : null} onChange={handleInputChange} />
                        <p className="msg-error"></p>
                    </div>

                    <label>Nombre completo:</label>
                    <div className='div-msg-container'>
                        <input type="text" name="fullName" id="fullName" placeholder='Nombre completo de la competición...' className='inputsTrophies' defaultValue={showValue ? article.fullName : null} />
                        <p className="msg-error"></p>
                    </div>

                    <label>Sede:</label>
                    <div className='div-msg-container'>
                        <input type="text" name="campus" id="campus" placeholder='Nombre de la sede de la competición...' className='inputsTrophies' defaultValue={showValue ? article.campus : null} />
                        <p className="msg-error"></p>
                    </div>

                    <label>Fecha que se celebró por primera vez:</label>
                    <div className='div-msg-container'>
                        <input type="date" name="foundation" id="foundation" className='inputsTrophies' defaultValue={showValue ? article.foundation.split("T")[0] : null} />
                        <p className="msg-error"></p>
                    </div>

                    <label>Organizador:</label>
                    <div className='div-msg-container'>
                        <input type="text" name="organizer" id="organizer" placeholder='Nombre del organizador de la competición...' className='inputsTrophies' defaultValue={showValue ? article.organizer : null} />
                        <p className="msg-error"></p>
                    </div>

                    <label>Campeón:</label>
                    <div className='div-msg-container'>
                        <input type="text" name="champion" id="champion" placeholder='Nombre del último campeón...' className='inputsTrophies' defaultValue={showValue ? article.champion : null} />
                        <p className="msg-error"></p>
                    </div>

                    <label>Subcampeón:</label>
                    <div className='div-msg-container'>
                        <input type="text" name="subchampion" id="subchampion" placeholder='Nombre del último subcampeón...' className='inputsTrophies' defaultValue={showValue ? article.subchampion : null} />
                        <p className="msg-error"></p>
                    </div>

                    <label>Imagen:</label>
                    <div className='div-msg-container'>
                        <input type="file" name='file' id="file" className='inputFile2' />
                        <p className="msg-error"></p>
                    </div>

                    {InputAuthor}

                </div>

            </div>
        </div>
    )
}

export default Trophies