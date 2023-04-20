import React from 'react'
import { useParams } from 'react-router-dom'
import './_categoriesView.scss';
import { A11y, Autoplay, Scrollbar, Thumbs, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import futbol from '../../img/category/futbol.png'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import CardsCategory from '../../components/Cards/CardsCategory';
import Slider from '../../components/Slider/Slider';
import { useState, useEffect } from 'react';
import { lastCategories, moreViewsCategory } from '../../services/articles';
import ClipLoader from "react-spinners/ClipLoader";
import { HiOutlineTrendingUp } from 'react-icons/hi';

const CategoriesView = () => {
    const [sliderArticles, setSlider] = useState([]);
    const [moreViews, setMoreViews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const { id } = useParams();

    let category;
    let categorySelected;

    if (id === 'copas') {
        category = 'copas';
        categorySelected = "trophies"

    } else if (id === 'equipos') {
        category = 'equipos';
        categorySelected = "teams"

    } else if (id === 'jugadores') {
        category = 'jugadores';
        categorySelected = "players"

    } else {

        return <h1>Categoría inválida</h1>;
    }

    useEffect(() => {
        async function fetchData() {
            const data = await lastCategories(categorySelected, 6);
            setSlider(data);
            setLoading(false);
        }
        fetchData();
    }, [categorySelected])

    useEffect(() => {
        async function fetchData() {
            const data = await moreViewsCategory(categorySelected, page, 6);
            setMoreViews(data);
        }
        fetchData();
    }, [categorySelected, page])

    const handleClick = (event) => {
        const number = parseInt(event.target.innerHTML);
        setPage(number);
    };

    return (

        <>

            <div className='containerCategories'>

                <div className='hijoCategories'>

                    <div className='containerTitle'>

                        <h1 className='titleCategories'>{category}</h1>

                    </div>

                    <div className='containerSlider'>


                        <Swiper
                            spaceBetween={10}
                            slidesPerView={1}
                            pagination={{

                                el: '.swiper-pagination',
                                clickable: true,

                            }}
                            modules={[Thumbs, Scrollbar, A11y, Autoplay, Pagination]}
                            loop={true}
                            autoplay={{

                                delay: 5000,
                                disableOnInteraction: false,

                            }}
                            breakpoints={{

                                768: {

                                    slidesPerView: 4,
                                    centeredSlides: false
                                }

                            }}
                            centeredSlides={true}
                        >
                            {loading ? (

                                <div className='spinnerContainer'>
                                    <ClipLoader size={40} loading={loading} className='spinner' />
                                </div>

                            ) : (

                                sliderArticles.map((slider, i) => (
                                    <SwiperSlide className="containerCard__slider" key={i}>

                                        <div className='hijoCards'>


                                            <Slider slider={slider} />


                                        </div>

                                    </SwiperSlide>
                                ))

                            )}


                            <div className="swiper-pagination"></div>

                        </Swiper>


                    </div>

                    <div className='hijoLeido'>

                        <h1 className='tituloLeido'>Lo más leído</h1>

                    </div>

                    <div className='containerLeido'>

                        <div className='containerCard__leido'>

                            {moreViews.map((tarjeta, index) => (

                                <CardsCategory key={index} tarjeta={tarjeta} />

                            ))}

                        </div>


                    </div>

                    <div className='containerPaginacion'>

                        <div className='hijoPaginacion'>

                            <ul className='ulPaginacion'>


                                <li onClick={handleClick}>1</li>
                                <li onClick={handleClick}>2</li>
                                <li onClick={handleClick}>3</li>
                                <li onClick={handleClick}>4</li>
                                <li onClick={handleClick}>5</li>

                            </ul>

                        </div>

                    </div>

                </div>


            </div>

        </>

    )
}

export default CategoriesView;