import '../Trophies/_trophies.scss';
import '../../scss/utilities/mixin/_mixin.scss';
import '../../scss/base/_medias.scss';

import React from 'react'

const Trophies = ({ showValue, article }) => {
    let InputAuthor;

    if (showValue != true) {

        InputAuthor = <div className='inputs-second'><label>Autor:</label><input type="text" name="author" id="author" placeholder='Nombre del autor de este artículo' className='inputsTrophies' />
            <p className="msg-error"></p></div>
    }
    return (
        <div>
            <div className='containerCopas'>
                <div className='flexTrophies'>

                    <label>Titulo:</label>
                    <input type="text" name="title" id="title" placeholder='Título del artículo...' className='inputsTrophies' defaultValue={showValue ? article.title : null}/>
                    <p className="msg-error"></p>

                    <label>Nombre completo:</label>
                    <input type="text" name="fullName" id="fullName" placeholder='Nombre completo de la competición...' className='inputsTrophies' defaultValue={showValue ? article.fullName : null}/>
                    <p className="msg-error"></p>

                    <label>Sede:</label>
                    <input type="text" name="campus" id="campus" placeholder='Nombre de la sede de la competición...' className='inputsTrophies' defaultValue={showValue ? article.campus : null}/>
                    <p className="msg-error"></p>

                    <label>Fundación:</label>
                    <input type="date" name="foundation" id="foundation" className='inputsTrophies' defaultValue={showValue ? article.foundation.split("T")[0] : null}/>
                    <p className="msg-error"></p>

                    <label>Organizador:</label>
                    <input type="text" name="organizer" id="organizer" placeholder='Nombre del organizador de la competición...' className='inputsTrophies' defaultValue={showValue ? article.organizer : null}/>
                    <p className="msg-error"></p>

                    <label>Campeón:</label>
                    <input type="text" name="champion" id="champion" placeholder='Nombre del último campeón...' className='inputsTrophies' defaultValue={showValue ? article.champion : null}/>
                    <p className="msg-error"></p>

                    <label>Subcampeón:</label>
                    <input type="text" name="subchampion" id="subchampion" placeholder='Nombre del último subcampeón...' className='inputsTrophies' defaultValue={showValue ? article.subchampion : null}/>
                    <p className="msg-error"></p>

                    <label>Imagen:</label>
                    <input type="file" name='file' id="file" className='inputFile2' />
                    <p className="msg-error"></p>

                    {InputAuthor}

                </div>

            </div>
        </div>
    )
}

export default Trophies