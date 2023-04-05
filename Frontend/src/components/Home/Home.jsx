import 'swiper/css';
import '../Home/_home.scss';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { A11y, Autoplay, Navigation, Scrollbar, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { lastProduct, moreViews } from '../../services/articles';
import { React, useState, useEffect } from 'react';
import TextoHtml from '../TextoHtml';
import { Buffer } from 'buffer';

import titularImagen from '../../img/home/titular-imagen.png'

const Home = () => {
  const [lastArticle, setLastArticle] = useState({});
  const [articles, setArticles] = useState([]);


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

  console.log(articles);
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
              Lörem ipsum mipös nungen eufiskade köjöra. Previs kasir. Spedinat
              sung. Dism autoning.
            </p>

            <div className="containerButton">

              <button className="containerButton__escribir">Escribir</button>

            </div>

          </div>

        </div>

        <div className="containerArticulos">
          <div className="containerUltimo">
            <h2 className="tituloUltimo">LO ÚLTIMO</h2>

            <div className="hijoUltimo">
              <img
                src={lastArticle.image}
                alt="Argentina campeon del mundo"
                className="imagenUltimo"
              />
              <h2 className="titular">{lastArticle.title}</h2>
              <p className="descripcion">
                <TextoHtml texto={lastArticle.text} />
              </p>
            </div>
          </div>

          <div className="containerProximo">
            <h2 className="tituloProximo">LO PRÓXIMO</h2>

            <div className="hijoProximo1">
              <h3 className="titularProximo">
                Latino América Unida para el mundial 2023
              </h3>
              <p className="descripcionProximo">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Praesentium earum nisi ab excepturi ex tempora, cupiditate vero
                saepe odit minus reiciendis sequi sit error. Non id tempore
                suscipit molestias cupiditate.
              </p>
            </div>

            <div className="hijoProximo2">
              <h3 className="titularProximo">
                Latino América Unida para el mundial 2023
              </h3>
              <p className="descripcionProximo">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Praesentium earum nisi ab excepturi ex tempora, cupiditate vero
                saepe odit minus reiciendis sequi sit error. Non id tempore
                suscipit molestias cupiditate.
              </p>
            </div>

            <div className="hijoProximo3">
              <h3 className="titularProximo">
                Latino América Unida para el mundial 2023
              </h3>
              <p className="descripcionProximo">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Praesentium earum nisi ab excepturi ex tempora, cupiditate vero
                saepe odit minus reiciendis sequi sit error. Non id tempore
                suscipit molestias cupiditate.
              </p>
            </div>
          </div>

          <div className="containerVisto">
            <h2 className="tituloVisto">LO MÁS VISTO</h2>


            {articles && articles.length > 0 ? articles.map(article => {
              return (
                <div className="hijoVisto">
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
    </>
  );
}

export default Home