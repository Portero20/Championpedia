import React from 'react';
import './_slider.scss';

const Slider = ({slider}) => {
    return (
        <>

            <div className='containerImage'>

                <img src={slider.image} className='imageCard' />

            </div>

            <div className='contentCard'>

                <h1 className='titleCard'>{slider.title}</h1>
                <h3 className='categoryCard'>{slider.category}</h3>
                <p className='descriptionCard'>{slider.text}</p>

            </div>

        </>
    )
}

export default Slider