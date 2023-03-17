import '../Navbar/_navbar.scss';
import '../../scss/barrel.scss';
import '../../common/Links/_links.scss'
import '../../common/filter/_filter.scss'

import React, { useEffect, useRef } from 'react';
import { results, searchArticle } from '../../services/search'

import Championpedia from '../../img/logo/Championpedia.png'
import Filter from '../../common/filter/Filter';
import { HiOutlineMenuAlt3 } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import Links from '../../common/Links/Links';
import { useState } from 'react';

const Navbar = () => {
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

  // para mostrar de manera correcta en el datalist
  function getOptionValue(result, searchTerm) {
    if (result.fullName.toLowerCase().includes(searchTerm.toLowerCase())) {
      return result.fullName;
    } else {
      return `${result.tags} (${result.fullName})`;
    }
  }

  const toggleMenuOpen = () => {
    document.body.classList.toggle('open');
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
              type="search"
              name="options"
              className="search__input"
              placeholder="🔍︎ Buscar..."
              value={inputValue}
              onChange={handleInputChange}
              list="search-results"
              ref={inputRef}
            />
            <datalist id="search-results">
              {searchResults.map((result, i) => (
                <option key={i} value={getOptionValue(result, inputValue)}/>
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
            />
          </div>

          <div className="buttonFlexible">
            <Link to='http://localhost:5173/articulo/create'>
            
              <button type="button" className="buttonCrear">
                + Contribuir
              </button>

            </Link>
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