import '../Trophies/_trophies.scss';
import '../../scss/utilities/mixin/_mixin.scss'

import React from 'react'

const Trophies = () => {
return (
<div>
    <div>

        <form action="">

            <div className='flexTrophies'>

                <label htmlFor="">Titulo</label>
                <input type="text" name="title" id="title" placeholder='Probando' className='inputsTrophies'/>

                <label>Texto</label>
                <input type="text" name="text" id="text" placeholder='Probando' className='inputsTrophies'/>

                <label>Autor</label>
                <input type="text" name="author" id="author" placeholder='Probando' className='inputsTrophies'/>

                <label>Nombre completo</label>
                <input type="text" name="fullName" id="fullName" placeholder='Probando' className='inputsTrophies'/>

                <label>Campus</label>
                <input type="text" name="campus" id="campus" placeholder='Probando' className='inputsTrophies'/>

                <label>Fundación</label>
                <input type="text" name="foundation" id="foundation" placeholder='Probando' className='inputsTrophies'/>

                <label>Organizador</label>
                <input type="text" name="organizer" id="organizer" placeholder='Probando' className='inputsTrophies'/>

                <label>Campeon</label>
                <input type="text" name="champion" id="champion" placeholder='Probando' className='inputsTrophies'/>

                <label>Subcampeón</label>
                <input type="text" name="subchampion" id="subchampion" placeholder='Probando' className='inputsTrophies'/>


            </div>

        </form>

    </div>
</div>
)
}

export default Trophies