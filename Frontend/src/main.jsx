import './scss/base/_generales.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App'
import { BrowserRouter } from 'react-router-dom';
import React from 'react'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <BrowserRouter>

      <App />
        
    </BrowserRouter>


  </React.StrictMode>
);

