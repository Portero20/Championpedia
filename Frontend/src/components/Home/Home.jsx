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
import { Buffer } from 'buffer';
import { Link } from 'react-router-dom';

const Home = () => {
  const [lastArticle, setLastArticle] = useState({});
  const [articles, setArticles] = useState([]);
  const [newsArticle, setNews] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await lastProduct();
      const buffer = data.image;
      const base64 = Buffer.from(buffer).toString('base64');
      const base64String = `data:image/png;base64,${Buffer.from(base64, 'base64').toString()}`;
      data.image = base64String
      setLastArticle(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchMore() {
      let data = await moreViews();

      data = data.map(article => {
        const buffer = article.image;
        const base64 = Buffer.from(buffer).toString('base64');
        const base64String = `data:image/png;base64,${Buffer.from(base64, 'base64').toString()}`;

        return {
          title: article.title,
          text: article.text,
          image: base64String
        }
      })

      setArticles(data);
    }
    fetchMore();
  }, []);

  useEffect(() => {
    async function fetchNews() {
      let data = await news();

      setNews(data);
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

                            <button className="buttonJugadores">

                              Jugadores

                            </button>

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

                            <button className="buttonCopas">

                              Copas

                            </button>

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

                            <button className="buttonEquipos">

                              Equipos

                            </button>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>
                </SwiperSlide>

                <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div>
              </Swiper>
            </div>
          </div>
        </div>

        <div className="containerChampion">

          <div className="hijoChampion">

            <h1 className="hijoChampion__titulo">¿Qué es championpedia?</h1>
            <p className="hijoChampion__parrafo">
              Championpedia es una wiki dedicada a los apasionados del fútbol que permite crear y compartir información actualizada sobre los equipos más populares, copas y campeones.
            </p>

            <div className="containerButton">

              <button className="containerButton__escribir">Escribir</button>

            </div>

          </div>

        </div>

        <div className='containerPadre'>
          <div className="containerArticulos">
            <div className="containerUltimo">
              <h2 className="tituloUltimo">LO ÚLTIMO</h2>

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
                  <p className="descripcion">
                    <TextoHtml texto={lastArticle.text} />
                  </p>
                </div>
              </Link>
            </div>

            <div className="containerProximo">
              <h2 className="tituloProximo">LO PRÓXIMO</h2>

              {newsArticle && newsArticle.length > 0 ? newsArticle.map((news, i) => {
                return (
                  <Link target="_blank" to={news.url}>
                    <div key={i} className="hijoProximo1">
                      <h3 className="titularProximo">
                        {news.title}
                      </h3>
                      <p className="descripcionProximo">
                        {news.description}
                      </p>
                    </div>
                  </Link>
                )
              }) : null}

            </div>
            <div className="containerVisto">
              <h2 className="tituloVisto">LO MÁS VISTO</h2>


              {articles && articles.length > 0 ? articles.map((article, i) => {
                return (
                  <div key={i} className="hijoVisto">
                    <img src={article.image} alt="" className="imagenVisto" />

                    <div className="right-content">
                      <h3 className="titularVisto">{article.title}</h3>
                      <p>
                        {article.text}
                      </p>
                    </div>
                  </div>
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