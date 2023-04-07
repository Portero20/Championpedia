import './_footer.scss';
import '../../scss/barrel.scss';

import { AiFillTwitterCircle } from 'react-icons/ai'
import Championpedia from '../../img/logo/Championpedia.png';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { results, searchArticle } from '../../services/search'
import { RxInstagramLogo } from 'react-icons/rx'
import { SiWhatsapp } from 'react-icons/si'

const Footer = () => {
    const inputRef = useRef(null);

    const [inputValue, setInputValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleInputChange = async (event) => {
        const value = event.target.value;
        setInputValue(value);

        if (value.length >= 1) {
            const result = await results(value);
            setSearchResults(result);
        } else {
            setSearchResults([]);
        }
    }

    useEffect(() => {
        const handleKeyPress = async (event) => {
            if (event.key === 'Enter') {
                if (/\(|\)/.test(inputValue)) {
                    let termino = inputValue.match(/\(([^)]+)\)/)[1];
                    let data = await searchArticle(termino);
                    window.location.href = `/articulo/${data[0].category.toLowerCase()}/${data[0].id}`
                } else {
                    let data = await searchArticle(inputValue);
                    window.location.href = `/articulo/${data[0].category.toLowerCase()}/${data[0].id}`
                }
            }
        }

        inputRef.current.addEventListener('keypress', handleKeyPress);

        return () => {
            inputRef.current.removeEventListener('keypress', handleKeyPress);
        }
    }, [inputValue]);

    return (
        <div className="containerFooter">

            <div className="containerFooter__logo">

                <div className='hijoLogo'>


                    <div className='containerEnlaces'>

                        <img src={Championpedia} alt="Championpedia" className='logoChampion' />

                        <div className='enlaceHijo'>

                            <a href="#" className='enlace'>Inicio</a>

                        </div>

                        <div className='enlaceHijo'>

                            <a href="#" className='enlace'>Nosotros</a>

                        </div>

                        <div className='enlaceHijo'>

                            <a href="#" className='enlace'>Copas</a>

                        </div>

                        <div className='enlaceHijo'>

                            <a href="#" className='enlace'>Equipos</a>

                        </div>

                        <div className='enlaceHijo'>

                            <a href="#" className='enlace'>Jugadores</a>

                        </div>

                    </div>
                </div>

                <div className="buscadorContainer">

                    <div className="hijoBuscador">

                        <input
                            type="text"
                            className="inputBurgerr"
                            name="options"
                            placeholder="🔍︎ Buscar..."
                            onChange={handleInputChange}
                            list="search-results"
                            ref={inputRef}
                            spellCheck="false"
                            autoComplete="off"
                        />

                        <datalist id="search-results" className="datalist">
                            {searchResults.map((result, i) => (
                                <option key={i} value={result.title} />
                            ))}
                        </datalist>

                    </div>

                    <div className="socialContainer">

                        <div className="hijoSocial">

                            <a href="#" className='enlaceSocial'><AiFillTwitterCircle className='iconSocial' color='white' /></a>
                            <a href="#" className='enlaceSocial'><RxInstagramLogo className='iconSocial' color='white' /></a>
                            <a href="#" className='enlaceSocial'><SiWhatsapp className='iconSocial' color='white' /></a>


                        </div>

                    </div>

                </div>

            </div>


        </div>
    );
}

export default Footer