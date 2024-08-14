import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './assets/Components/Home'
import Trending from './assets/Components/Trending'
import Popular from './assets/Components/Popular'
import Movies from './assets/Components/Movies'
import Tvshows from './assets/Components/Tvshows'
import People from './assets/Components/People'
import MovieDetails from './assets/Components/MovieDetails'
import TvDetails from './assets/Components/TvDetails'
import PersonDetails from './assets/Components/PersonDetails'
import Trailer from './assets/Components/Trailer'
import Notfound from './assets/Components/Notfound'

const App = () => {
  return (
    <div className='h-screen w-full bg-[#1F1E24] flex'>
      <Routes>
        <Route path='/' element={<Home />}  />
        <Route path='/trending' element={<Trending/>}  />
        <Route path='/popular' element={<Popular/>}  />
        <Route path='/movie' element={<Movies />}  />
        <Route path='/movie/details/:id' element={<MovieDetails />} >
        <Route path='/movie/details/:id/trailer' element={<Trailer />} />
        </Route>
        <Route path='/tv' element={<Tvshows />}  />        
        
        <Route path='/tv/details/:id' element={<TvDetails />} >
        <Route path='/tv/details/:id/trailer' element={<Trailer />}/>
        </Route>
        <Route path='/person' element={<People />}  />
        <Route path='/person/details/:id' element={<PersonDetails />} />
        <Route path='*' element={ <Notfound /> } />
      </Routes>
    </div>
  )
}

export default App