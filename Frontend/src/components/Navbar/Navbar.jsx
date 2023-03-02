import '../Navbar/_navbar.scss';
import '../../scss/barrel.scss';

import {HiOutlineMenuAlt3} from 'react-icons/hi'
import React from 'react'
import pelotaChampionpedia from '../../img/logo/1200px-Balón_Oro.svg.png';

const Navbar = () => {

const toggleMenuOpen = () => {

    document.body.classList.toggle('open');

}

return (
  <>
    <nav className="navbar">
      <div className="navbar-overlay" onClick={toggleMenuOpen}></div>

      <button
        type="button"
        className="navbar-burger buttonEnlace"
        onClick={toggleMenuOpen}
      >
        <HiOutlineMenuAlt3 style={{color: 'white'}}/>
      </button>
      
      <div className='containerLogo'>
        
        <h4 className='textoLogo'><img src={pelotaChampionpedia} alt="pelota de futbol" className="logoChampionpedia" />Championpedia</h4>
      </div>

      <nav className="navbar-menu navbar-menuColor">

        <div className='containerSearch'>
          <input type="search" className='search__input' placeholder='🔍︎ Buscar...'/>
        </div>

        <button type="button" className="buttonEnlace">
          Skills
        </button>
        <button type="button" className="buttonEnlace">
          Awards
        </button>
        <button type="button" className="buttonEnlace">
          Projects
        </button>
      </nav>
    </nav>
  </>
);
}

export default Navbar