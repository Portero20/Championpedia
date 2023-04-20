import React from 'react'
import { Link } from 'react-router-dom'

const CardsCategory = ({ tarjeta }) => {
    return (
        <>
            <Link to={`/articulo/${tarjeta.category}/${tarjeta.id}`}>
                <div className='card__leido'>
                    <div className='imagenLeido'>
                        <img src={tarjeta.image} className='cardImage-leido' />
                    </div>
                    <div className='containerTitle'>
                        <h1 className='tituloLeido'>{tarjeta.title}</h1>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default CardsCategory