import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Main from './Main'
import VideoList from './VideoList'
import './css/index.css'

ReactDOM.render(
  <HashRouter>
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/favouriteLists/:favouriteListId' element={<VideoList />} />
    </Routes>
  </HashRouter>,
  document.getElementById('root')
)
