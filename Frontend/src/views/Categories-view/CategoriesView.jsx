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
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const { id } = useParams();
    const [size, setSize] = useState(() => {
        if (window.innerWidth >= 1240) {
            return 12;
        } else if (window.innerWidth > 1023 && window.innerWidth < 1239) {
            return 10;
        } else {
            return 6;
        }
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (windowWidth >= 1240) {
            setSize(12);
        } else if (windowWidth > 1023 && windowWidth < 1239) {
            setSize(10);
        } else {
            setSize(6);
        }
    }, [windowWidth]);

    let category;
    let categorySelected;

    if (id === 'copas') {
        category = 'Copas';
        categorySelected = "trophies"

    } else if (id === 'equipos') {
        category = 'Equipos';
        categorySelected = "teams"

    } else if (id === 'jugadores') {
        category = 'Futbolistas';
        categorySelected = "players"

    } else {

        return <h1>Categoría inválida</h1>;
    }

    useEffect(() => {
        async function fetchData() {
            const data = await lastCategories(categorySelected, 12);
            setSlider(data);
            setLoading(false);
        }
        fetchData();
    }, [categorySelected])

    useEffect(() => {
        async function fetchData() {
            const data = await moreViewsCategory(categorySelected, page, size);
            setMoreViews(data.data);
            setTotalPages(Math.ceil(data.pagesTotal));
        }
        fetchData();
    }, [categorySelected, page, windowWidth, size])

    const handleClick = (event) => {
        const number = parseInt(event.target.innerHTML);
        setPage(number);
    };

    const handlePrevClick = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextClick = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const paginationNumbers = [];
    let startPage = Math.max(page - 2, 1);
    let endPage = Math.min(page + 1, totalPages);

    if (startPage === 1) {
        endPage = Math.min(startPage + 3, totalPages);
    }

    if (endPage === totalPages) {
        startPage = Math.max(endPage - 3, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        paginationNumbers.push(
            <li key={i} className={i === page ? 'active' : ''} onClick={handleClick}>
                {i}
            </li>
        );
    }

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

                            <ul className="ulPaginacion">
                                {page !== 1 && (
                                    <p className="arrow" onClick={handlePrevClick}>
                                        {'◀'}
                                    </p>
                                )}
                                {paginationNumbers.map((number, i) => (
                                    <p
                                        key={i}
                                        className={page === number ? 'active' : ''}
                                        onClick={handleClick}
                                    >
                                        {number}
                                    </p>
                                ))}
                                {page !== totalPages && (
                                    <p className="arrow" onClick={handleNextClick}>
                                        {'▶'}
                                    </p>
                                )}
                            </ul>


                        </div>

                    </div>

                </div>


            </div>

        </>

    )
}

export default CategoriesView;