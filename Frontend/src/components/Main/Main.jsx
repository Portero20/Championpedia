import { Route, Routes } from 'react-router-dom'

import CreateArticle from '../Create-Article/CreateArticle'
import Home from '../Home/Home'
import React from 'react'
import ViewArticle from '../View-Article/ViewArticle'

const Main = () => {
  return (
    
    <main>
      <Routes>

        <Route path='/' element={<Home/>}></Route>
        <Route path='/articulo/create' element={<CreateArticle/>}></Route>
        <Route path='/articulo/:category/:id' element={<ViewArticle/>}></Route>

      </Routes>
    </main>

  )
}

export default Main