import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loading from './assets/Components/Loading';
import AllWorks from './assets/Components/AllWorks';
import Contact from './assets/Components/Contact';
import AboutUs from './assets/Components/AboutUs';

// Lazy load components
const Home = lazy(() => import('./assets/Components/Home'));
const Trending = lazy(() => import('./assets/Components/Trending'));
const Popular = lazy(() => import('./assets/Components/Popular'));
const Movies = lazy(() => import('./assets/Components/Movies'));
const Tvshows = lazy(() => import('./assets/Components/Tvshows'));
const People = lazy(() => import('./assets/Components/People'));
const MovieDetails = lazy(() => import('./assets/Components/MovieDetails'));
const TvDetails = lazy(() => import('./assets/Components/TvDetails'));
const PersonDetails = lazy(() => import('./assets/Components/PersonDetails'));
const Trailer = lazy(() => import('./assets/Components/Trailer'));
const Notfound = lazy(() => import('./assets/Components/Notfound'));

const App = () => {
  return (
    <div className='h-screen w-full bg-[#1F1E24] flex'>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/trending' element={<Trending />} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/AboutUs' element={<AboutUs/>} />
          <Route path="/person/:id/all-works" element={<AllWorks />} />
          <Route path='/popular' element={<Popular />} />
          <Route path='/movie' element={<Movies />} />
          <Route path='/movie/details/:id' element={<MovieDetails />}>
            <Route path='/movie/details/:id/trailer' element={<Trailer />} />
          </Route>
          <Route path='/tv' element={<Tvshows />} />
          <Route path='/tv/details/:id' element={<TvDetails />}>
            <Route path='/tv/details/:id/trailer' element={<Trailer />} />
          </Route>
          <Route path='/person' element={<People />} />
          <Route path='/person/details/:id' element={<PersonDetails />} />
          <Route path='*' element={<Notfound />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;