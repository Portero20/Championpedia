import '../Navbar/_navbar.scss';
import '../../scss/barrel.scss';
import '../../common/Links/_links.scss'
import { useState } from 'react';
import Championpedia from '../../img/logo/Championpedia.png'
import { HiOutlineMenuAlt3 } from 'react-icons/hi'
import Links from '../../common/Links/Links';
import React from 'react';
import { results, searchArticle } from '../../services/search'

const Navbar = () => {
  const [searchResults, setSearchResults] = useState([]);

  const toggleMenuOpen = () => {
    document.body.classList.toggle('open');
  }

  const handleInputChange = async (event) => {
    const query = event.target.value;
    const result = await results(query);
    setSearchResults(result);
  }

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
            />

            <datalist id="options">
              {searchResults.map((option, i) => (
                <option key={i} value={option.fullName} />
              ))}
            </datalist>
          </div>
        </div>

        <div className="navbar-menu navbar-menuColor nav-right">
          <div>
            <input
              type="text"
              className="inputBurger"
              placeholder="🔍︎ Buscar..."
              onChange={handleInputChange}
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