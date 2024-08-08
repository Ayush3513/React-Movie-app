import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './assets/Components/Home'

const App = () => {
  return (
    <div className='h-screen w-full bg-[#1F1E24] flex overflow-hidden'>
      <Routes>
        <Route path='/' element={<Home />}  />
      </Routes>
    </div>
  )
}

export default App