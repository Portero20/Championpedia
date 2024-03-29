import '../Navbar/_navbar.scss';
import '../../scss/barrel.scss';
import '../../common/Links/_links.scss'
import '../../common/filter/_filter.scss'
import React, { useEffect, useRef } from 'react';
import { results, searchArticle } from '../../services/search'
import Championpedia from '../../img/logo/Championpedia.png'
import { HiOutlineMenuAlt3 } from 'react-icons/hi'
import { Link } from 'react-router-dom';
import Links from '../../common/Links/Links';
import { useState } from 'react';

const Navbar = () => {
  const inputRef = useRef(null);
  const inputRefNav = useRef(null);

  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [inputNav, setInputNav] = useState('');
  const [searchNav, setSearchNav] = useState([]);

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

  const handleNavChange = async (event) => {
    const value = event.target.value;
    setInputNav(value);

    if (value.length >= 1) {
      const result = await results(value);
      setSearchNav(result);
    } else {
      setSearchNav([]);
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

  useEffect(() => {
    const handKeyPress = async (event) => {
      if (event.key === "Enter") {
        let termino = inputNav
        let data = await searchArticle(termino);
        window.location.href = `/articulo/${data[0].category.toLowerCase()}/${data[0].id}`
      }
    };
    inputRefNav.current.addEventListener("keypress", handKeyPress);

    return () => {
      inputRefNav.current.removeEventListener("keypress", handKeyPress);
    };
  }, [inputNav]);


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
          
          <Link to='/'>

            <img
              src={Championpedia}
              alt="pelota de futbol"
              className="logoChampionpedia"
            />

          </Link>

        </div>

        <div className="containerSearch nav-middle">
          <div className="flexInput">
            <input
              type="text"
              name="options"
              className="search__input"
              placeholder="🔍︎ Buscar..."
              onChange={handleInputChange}
              list="search-results"
              ref={inputRef}
              spellCheck="false"
              autoComplete="off"
            />
            <datalist id="search-results" className="datalist">
              {searchResults.slice(0, 10).map((result, i) => (
                <option key={i} value={result.title} />
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
              onChange={handleNavChange}
              list="search-res"
              ref={inputRefNav}
              spellCheck="false"
              autoComplete="off"
            />

            <datalist id="search-res" className="datalist">
              {searchNav.map((result, i) => (
                <option key={i} value={getOptionValue(result, inputNav)} />
              ))}
            </datalist>
          </div>

          <div className="buttonFlexible">
            <Link to="/articulo/create">
              <button type="button" className="buttonCrear">
                + Contribuir
              </button>
            </Link>
          </div>

          <div className="linksWhite">
            <div className="padreWhite">
              <div className="linksHide">
                <Link to="/">
                  <div className="homeFlex">
                    <h3>Home</h3>
                  </div>
                </Link>

                <Link to="/category/copas">

                  <div className="copasFlex">
                    <h3>Copas</h3>
                  </div>

                </Link>

                <Link to='/category/equipos'>

                  <div className="equiposFlex">
                    <h3>Equipos</h3>
                  </div>

                </Link>


                <Link to='/category/jugadores'>

                  <div className="jugadoresFlex">
                    <h3>Futbolistas</h3>
                  </div>

               </Link>

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