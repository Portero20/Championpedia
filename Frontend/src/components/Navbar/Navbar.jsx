import '../Navbar/_navbar.scss';
import '../../scss/barrel.scss';
import '../../common/Links/_links.scss'
import '../../common/filter/_filter.scss'

import React, { useEffect, useRef } from 'react';
import { results, searchArticle } from '../../services/search'

import Championpedia from '../../img/logo/Championpedia.png'
import Filter from '../../common/filter/Filter';
import { HiOutlineMenuAlt3 } from 'react-icons/hi'
import Links from '../../common/Links/Links';
import { useState } from 'react';

const Navbar = () => {

  const [searchUser, setSearchUser] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [inputIsEmpty, setInputIsEmpty] = useState(false);

  const searchRef = useRef(null)

  const toggleMenuOpen = () => {
    document.body.classList.toggle('open');
  }

  useEffect(() => {


    document.addEventListener("click", handleClickOutside);

    return () => {

      document.removeEventListener("click", handleClickOutside);

    }


  }),[]

  const handleInputChange = async (event) => {
    const query = event.target.value;
    setSearchUser(query);

    const result = await results(query);
    setSearchResults(result);

    setInputIsEmpty(query.trim() === '');
  }

  const handleClickOutside = (event) => {

    if(searchRef.current && !searchRef.current.contains(event.target)){
      setSearchResults([]);
      setInputIsEmpty(true);
    }

  }

  console.log(searchResults);

  return (
    <>
      <nav className="navbar navbar-container">
        <div className="navbar-overlay" onClick={toggleMenuOpen}></div>

        <button
          type="button"
          className="navbar-burger buttonEnlace"
          onClick={toggleMenuOpen}
        >
          <HiOutlineMenuAlt3 style={{ color: "white" }} />
        </button>

        <div className="containerLogo nav-left">
          <img
            src={Championpedia}
            alt="pelota de futbol"
            className="logoChampionpedia"
          />
        </div>

        <div className="containerSearch nav-middle">
          <div className="flexInput">
            <input
              list="options"
              type="search"
              className="search__input"
              placeholder="🔍︎ Buscar..."
              onChange={handleInputChange}
              value={searchUser}
            />

            
          </div>
          <div id="options" className="search-bar" ref={searchRef}>
              {searchResults.length > 0 && !inputIsEmpty && (
                <ul className="search-results">
                  {searchResults.map((option) => (
                    <Filter key={option.id} option={option} />
                  ))}
                </ul>
              )}
            </div>
        </div>

        <div className="navbar-menu navbar-menuColor nav-right">
          <div>
            <input
              type="text"
              className="inputBurger"
              placeholder="🔍︎ Buscar..."
              onChange={handleInputChange}
              value={searchUser}
            />
          </div>

          <div className="buttonFlexible">
            <button type="button" className="buttonCrear">
              + Contribuir
            </button>
          </div>

          <div className="linksWhite">
            <div className="padreWhite">
              <div className="linksHide">
                <div className="homeFlex">
                  <h3>Home</h3>
                </div>

                <div className="copasFlex">
                  <h3>Copas</h3>
                </div>

                <div className="equiposFlex">
                  <h3>Equipos</h3>
                </div>

                <div className="jugadoresFlex">
                  <h3>Jugadores</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Links />
      </nav>
    </>
  );
}

export default Navbar