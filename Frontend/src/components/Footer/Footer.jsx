import './_footer.scss';
import '../../scss/barrel.scss';

import {AiFillTwitterCircle} from 'react-icons/ai'
import Championpedia  from '../../img/logo/Championpedia.png';
import React from 'react'
import {RxInstagramLogo} from 'react-icons/rx'
import {SiWhatsapp} from 'react-icons/si'

const Footer = () => {
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
                        placeholder="🔍︎ Buscar..."
                        list="search-res"
                        spellCheck="false"
                        autoComplete="off"
                    />

                </div>

                <div className="socialContainer">

                <div className="hijoSocial">

                    <a href="#" className='enlaceSocial'><AiFillTwitterCircle className='iconSocial' color='white'/></a>
                    <a href="#" className='enlaceSocial'><RxInstagramLogo className='iconSocial' color='white'/></a>
                    <a href="#" className='enlaceSocial'><SiWhatsapp className='iconSocial' color='white'/></a>


                </div>

            </div>

            </div>

        </div>

      
    </div>
  );
}

export default Footer