import React from 'react';
import './_slider.scss';
import { Link } from 'react-router-dom';

const Slider = ({ slider }) => {
    return (
        <>
            <Link to={`/articulo/${slider.category}/${slider.id}`}>
                <div className='containerImage'>

                    <img src={slider.image} className='imageCard' />

                </div>

                <div className='contentCard'>

                    <h1 className='titleCard'>{slider.title}</h1>
                    <h3 className='categoryCard'>{slider.category}</h3>
                    <p className='descriptionCard'>{slider.text}</p>

                </div>
            </Link>
        </>
    )
}

export default Slider