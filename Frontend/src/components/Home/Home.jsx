import 'swiper/css';
import '../Home/_home.scss';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { A11y, Autoplay, Navigation, Scrollbar, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { lastProduct, moreViews, news } from '../../services/articles';
import { React, useState, useEffect } from 'react';
import TextoHtml from '../TextoHtml';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

const Home = () => {
  const [lastArticle, setLastArticle] = useState({});
  const [articles, setArticles] = useState([]);
  const [newsArticle, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    async function fetchData() {
      const data = await lastProduct();
      setLastArticle(data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchMore() {
      let data = await moreViews();
      setArticles(data);
      setIsLoading(false);
    }
    fetchMore();
  }, []);

  useEffect(() => {
    async function fetchNews() {
      let data = await news();
      setNews(data);
      setIsLoading(false);
    }
    fetchNews();
  }, []);

  return (
    <>
      <div className="container__articulo">
        <div className="articulo">
          <div className="articulo__hijo">
            <div className="swiper-container">
              <Swiper
                slidesPerView={1}
                pagination={{ clickable: true }}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                modules={[Navigation, Thumbs, Scrollbar, A11y, Autoplay]}
                loop={true}
                autoplay={{

                  delay: 5000,
                  disableOnInteraction: false,

                }}
                centeredSlides={true}
              >
                <SwiperSlide className="containerImagen">

                  <div className="contenedorImagenTexto">

                    <div className="hijoText">

                      <div className="portadaContainer">

                        <div className="containerContenido">

                          <div className="parrafoContainer">

                            <p className="textoImagen">

                              Toda la información de tus Futbolistas Favoritos

                            </p>
                          </div>

                          <div className="buttonContainer">

                            <Link to='/category/jugadores'>

                              <button className="buttonJugadores">

                                Jugadores

                              </button>

                            </Link>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>
                </SwiperSlide>

                <SwiperSlide className="containerImagen2">

                  <div className="contenedorImagenTexto2">

                    <div className="hijoText2">

                      <div className="portadaContainer2">

                        <div className="containerContenido2">

                          <div className="parrafoContainer2">

                            <p className="textoImagen2">

                              Lo que quieras saber de los Torneos y Copas del Mundo

                            </p>
                          </div>

                          <div className="buttonContainer2">

                            <Link to='/category/copas'>

                              <button className="buttonCopas">

                                Copas

                              </button>


                            </Link>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>
                </SwiperSlide>

                <SwiperSlide className="containerImagen3">

                  <div className="contenedorImagenTexto3">

                    <div className="hijoText3">

                      <div className="portadaContainer3">

                        <div className="containerContenido3">

                          <div className="parrafoContainer3">

                            <p className="textoImagen3">

                              Toda la información de tus Equipos Favoritos

                            </p>
                          </div>

                          <div className="buttonContainer3">

                            <Link to='/category/equipos'>

                              <button className="buttonEquipos">

                                Equipos

                              </button>

                            </Link>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>
                </SwiperSlide>

                <div className="swiper-button-next"></div>
                <div className="swiper-button-prev" id='nosotros'></div>
              </Swiper>
            </div>
          </div>
        </div>
        <div className="containerChampion" >

          <div className="hijoChampion">

            <h1 className="hijoChampion__titulo">¿Qué es championpedia?</h1>
            <p className="hijoChampion__parrafo">
            Championpedia es una wiki diseñada especialmente para los apasionados del fútbol, que les brinda la oportunidad de crear y compartir información actualizada sobre los equipos más populares, los jugadores más destacados y los campeonatos más importantes. Championpedia es el lugar ideal para aquellos que desean expandir su conocimiento y profundizar en su pasión por este deporte.
            </p>

            <div className="containerButton">

              <Link to="/articulo/create">
                <button className="containerButton__escribir">Escribir</button>
              </Link>

            </div>

          </div>

        </div>

        <div className='containerPadre'>
          <div className="containerArticulos">
            <div className="containerUltimo">
              <h2 className="tituloUltimo">LO ÚLTIMO</h2>

              {isLoading && <div className='loaderArticles'><ClipLoader /></div>}
              {!isLoading && (
                
                <Link to={`/articulo/${lastArticle.category}/${lastArticle.id}`}>
                <div className="hijoUltimo">
                  <div className='hijoUltimo-div-img'>
                    <img
                      src={lastArticle.image}
                      alt="Argentina campeon del mundo"
                      className="imagenUltimo"
                    />
                  </div>
                  <h2 className="titular">{lastArticle.title}</h2>
                  <div className="descripcion">
                    <TextoHtml texto={lastArticle.text} />
                  </div>
                </div>
              </Link>

              )}
            </div>

            <div className="containerProximo">
              <h2 className="tituloProximo">NOTICIAS</h2>

              {isLoading && <div className='loaderArticles'><ClipLoader /></div>}
              {!isLoading && newsArticle.length > 0 ? newsArticle.map((news, i) => (
                <Link key={i} target="_blank" to={news.url}>
                  <div key={i} className="hijoProximo1">
                    <h3 className="titularProximo">
                      {news.title}
                    </h3>
                    <p className="descripcionProximo">
                      {news.description}
                    </p>
                  </div>
                </Link>
              )) : null}

            </div>
            <div className="containerVisto">
              <h2 className="tituloVisto">LO MÁS VISTO</h2>

              {isLoading && <div className='loaderArticles'><ClipLoader /></div>}
              {!isLoading && articles && articles.length > 0 ? articles.map((article, i) => {
                return (
                  <Link key={i} to={`/articulo/${article.category}/${article.id}`}>
                    <div key={i} className="hijoVisto">
                      <img src={article.image} alt="" className="imagenVisto" />

                      <div className="right-content">
                        <h3 className="titularVisto">{article.title}</h3>
                        <p>
                          {article.text}
                        </p>
                      </div>
                    </div>
                  </Link>
                )
              }) : null}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home