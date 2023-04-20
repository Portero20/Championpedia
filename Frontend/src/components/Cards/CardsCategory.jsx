import React from 'react'

const CardsCategory = ({tarjeta}) => {
    return (
        <>

            <div className='card__leido'>
                <div className='imagenLeido'>
                    <img src={tarjeta.image} className='cardImage-leido' />
                </div>
                <div className='containerTitle'>
                    <h1 className='tituloLeido'>{tarjeta.title}</h1>
                </div>
            </div>

        </>
    )
}

export default CardsCategory