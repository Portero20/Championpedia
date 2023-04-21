import './common/Links/_links.scss';

import Footer from "./components/Footer/Footer";
import Links from "./common/Links/Links";
import Main from "./components/Main/Main";
import Navbar from "./components/Navbar/Navbar";
import Loader from './components/Loader/Loader';
import { useState } from 'react';

const App = () => {

  const [isLoading,setIsLoading] = useState(true);


  setTimeout(() => {

    setIsLoading(false)
    
  }, 3000);

  return (
    
    <>

      {isLoading ? (

        <Loader />

      ) : (

        <div className='content'>

          <Navbar />
          <Main />
          <Footer />
          
        </div>

      )}

    </>
    
  )
}

export default App;
