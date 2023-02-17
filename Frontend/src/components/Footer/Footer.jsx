import './_footer.scss';
import '../../scss/barrel.scss';

import {AiFillTwitterCircle} from 'react-icons/ai'
import React from 'react'
import {RxInstagramLogo} from 'react-icons/rx'
import {SiWhatsapp} from 'react-icons/si'
import pelotaChampionpedia from '../../img/logo/1200px-Balón_Oro.svg.png';

const Footer = () => {
  return (
    <div className='containerFooter'>

        <div className='hijoFooter'>

        <div className='containerLogo'>
            <img src={pelotaChampionpedia} alt="pelota de futbol" className="logoChampionpedia" />
            <h4 className='textoLogo'>Championpedia</h4>
        </div>

        </div>

        <div className='hijoEnlacess'>
            <a href="#" className='enlacesFooter'>Home</a>
            <a href="#" className='enlacesFooter'>Agent</a>
            <a href="#" className='enlacesFooter'>About</a>
            <a href="#" className='enlacesFooter'>Listing</a>
            <a href="#" className='enlacesFooter'>Blog</a>
            <a href="#" className='enlacesFooter'>Contact</a>
        </div>

        <div className='hijoIconos'>

            <div className='iconosFooter'>
                <RxInstagramLogo/>
                <AiFillTwitterCircle/>
                <SiWhatsapp/>
            </div>

        </div>

        <div className="copyright">
            <p>© 2021 Championpedia. All rights reserved.</p>
        </div>

    </div>
  )
}

export default Footer