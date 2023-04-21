import React from 'react';
import './_loader.scss';
import loader from '../../img/home/spinner.gif';

const Loader = () => {

  return (
    <>
    
      <div className="loaderContainer">

        <div className='loader'>
          <img className='spinner' src={loader} alt="" />
        </div>

      </div>

    </>
  )
}

export default Loader