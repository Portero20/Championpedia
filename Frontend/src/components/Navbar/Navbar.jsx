import '../Navbar/_navbar.scss';
import '../../scss/barrel.scss';

import {BiFootball} from 'react-icons/bi'
import {HiOutlineMenuAlt3} from 'react-icons/hi'
import React from 'react'
import logoChampionpedia from '../../img/logo/logo-championpedia.png'

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
        <HiOutlineMenuAlt3 style={{color: 'black'}}/>
      </button>
      <img src={logoChampionpedia} alt="" className="logoChampionpedia" />
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