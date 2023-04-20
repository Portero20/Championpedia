import './_footer.scss';
import '../../scss/barrel.scss';

import { Link } from 'react-router-dom';
import { AiFillTwitterCircle } from 'react-icons/ai'
import Championpedia from '../../img/logo/Championpedia.png';
import React from 'react';
import { RxInstagramLogo } from 'react-icons/rx'
import { SiWhatsapp } from 'react-icons/si'

const Footer = () => {

    return (
       <>
       
        <div className="containerFooter">

            <div className="containerFooter__logo">

                <div className='hijoLogo'>

                    <div className='containerEnlaces'>

                        <img src={Championpedia} alt="Championpedia" className='logoChampion' />

                        <div className='enlaceHijo'>

                            <Link to="/" className='enlace'>Inicio</Link>

                        </div>

                        <div className='enlaceHijo'>

                            <Link to="#" className='enlace'>Nosotros</Link>

                        </div>

                        <div className='enlaceHijo'>

                            <Link to="/category/copas" className='enlace'>Copas</Link>

                        </div>

                        <div className='enlaceHijo'>

                            <Link to="/category/equipos" className='enlace'>Equipos</Link>

                        </div>

                        <div className='enlaceHijo'>

                            <Link to="/category/jugadores" className='enlace'>Jugadores</Link>

                        </div>

                    </div>
                </div>

                <div className="buscadorContainer">

                    <div className="socialContainer">

                        <div className="hijoSocial">

                            <Link to="#" className='enlaceSocial'><AiFillTwitterCircle className='iconSocial' color='white' /></Link>
                            <Link to="#" className='enlaceSocial'><RxInstagramLogo className='iconSocial' color='white' /></Link>
                            <Link to="#" className='enlaceSocial'><SiWhatsapp className='iconSocial' color='white' /></Link>


                        </div>

                    </div>

                </div>

            </div>


        </div>

       </>
    );
}

export default Footer