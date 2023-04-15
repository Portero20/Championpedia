import React from 'react'
import { useParams } from 'react-router-dom'
import './_categoriesView.scss';
import { A11y, Autoplay, Scrollbar, Thumbs, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import futbol from '../../img/category/futbol.png'
import uefaTrophy from '../../img/category/uefa-trophy.webp'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import CardsCategory from '../../components/Cards/CardsCategory';
import Slider from '../../components/Slider/Slider';

const CategoriesView = () => {

    const { id } = useParams();

    let category;

    if (id === 'copas') {

        category = 'Copas';

    } else if (id === 'equipos') {

        category = 'Equipos';

    } else if (id === 'jugadores') {

        category = 'Jugadores';

    } else {

        return <h1>Categoría inválida</h1>;
    }

    const tarjetas = Array(12).fill({imagen: futbol, titulo: 'El mundial más tecnológico'});

    const slider = Array(6).fill({image: uefaTrophy, title: 'Zinedide Zidane',  category: 'Jugadores', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, harum animi quae illo dolorem quo sint, explicabo assumenda expedita nihil reiciendis itaque distinctio praesentium'});

    return (

        <>

            <div className='containerCategories'>

                <div className='hijoCategories'>

                    <div className='containerTitle'>

                        <h1 className='titleCategories'>{category}</h1>

                    </div>

                    <div className='containerSlider'>


                        <Swiper
                            spaceBetween={50}
                            slidesPerView={1}
                            pagination= {{

                                el: '.swiper-pagination',
                                clickable: true,

                            }}
                            modules={[Thumbs, Scrollbar, A11y, Autoplay,Pagination]}
                            loop={true}
                            autoplay={{

                                delay: 5000,
                                disableOnInteraction: false,

                            }}
                            breakpoints={{

                                768: {

                                    slidesPerView: 3

                                }

                            }}
                            centeredSlides={true}
                        >
                            {slider.map((slider, i) => (
                                <SwiperSlide className="containerCard__slider" key={i}>

                                    <div className='hijoCards'>


                                        <Slider slider={slider} />


                                    </div>

                                </SwiperSlide>
                            ))}

                            <div className="swiper-pagination"></div>

                        </Swiper>


                    </div>

                    <div className='hijoLeido'>

                        <h1 className='tituloLeido'>Lo más leído</h1>

                    </div>

                    <div className='containerLeido'>    

                        <div className='containerCard__leido'>

                            {tarjetas.map((tarjeta, index) => (
                                
                                <CardsCategory key={index} tarjeta={tarjeta}/>

                            ))}

                        </div>


                    </div>

                    <div className='containerPaginacion'>

                        <div className='hijoPaginacion'>

                            <ul className='ulPaginacion'>


                                <li><a>1</a></li>
                                <li><a>2</a></li>
                                <li><a>3</a></li>
                                <li><a>4</a></li>
                                <li><a>5</a></li>

                            </ul>

                        </div>

                    </div>

                </div>


            </div>

        </>

    )
}

export default CategoriesView;