import './_links.scss'
import { Link } from 'react-router-dom';
import React from 'react'

const Links = () => {
  return (
    <div className="flexLinks">

      <div className='linkPadre'>

        <div className="hijoLinks">

          <Link to="/">
            <div className="homeFlex">
              <h3>Home</h3>
            </div>
          </Link>

          <div className="copasFlex">
            <h3>Copas</h3>
          </div>

          <div className="equiposFlex">
            <h3>Equipos</h3>
          </div>

          <div className="jugadoresFlex">
            <h3>Jugadores</h3>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Links