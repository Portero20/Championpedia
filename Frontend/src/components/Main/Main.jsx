import { Route, Routes } from 'react-router-dom'

import CreateArticle from '../Create-Article/CreateArticle'
import React from 'react'
import ViewArticle from '../View-Article/ViewArticle'

const Main = () => {
  return (
    
    <main>
      <Routes>

        <Route path='/' element={<CreateArticle/>}></Route>
        <Route path='/articulo' element={<ViewArticle/>}></Route>

      </Routes>
    </main>

  )
}

export default Main