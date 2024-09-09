import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { loadpersons } from '../store/actions/personaction';
import Loading from './Loading';

const Cards = lazy(() => import('../Partials/Cards'));

const AllWorks = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { info } = useSelector(state => state.person);
  const [works, setWorks] = useState([]);
  const [sortBy, setSortBy] = useState('date');
  const [filterBy, setFilterBy] = useState('all');

  useEffect(() => {
    if (!info) {
      dispatch(loadpersons(id));
    } else {
      const allWorks = [...info.moviecredits.cast, ...info.tvcredits.cast];
      setWorks(allWorks);
    }
  }, [dispatch, id, info]);

  const sortWorks = (works) => {
    switch (sortBy) {
      case 'date':
        return works.sort((a, b) => new Date(b.release_date || b.first_air_date) - new Date(a.release_date || a.first_air_date));
      case 'name':
        return works.sort((a, b) => (a.title || a.name).localeCompare(b.title || b.name));
      case 'popularity':
        return works.sort((a, b) => b.popularity - a.popularity);
      default:
        return works;
    }
  };

  const filterWorks = (works) => {
    switch (filterBy) {
      case 'movie':
        return works.filter(work => work.media_type === 'movie');
      case 'tv':
        return works.filter(work => work.media_type === 'tv');
      default:
        return works;
    }
  };

  const displayWorks = sortWorks(filterWorks(works));

  if (!info) return <Loading />;

  return (
    <div className='min-h-screen w-full overflow-y-auto bg-gray-900 text-white p-4 md:p-8'>
      <nav className='mb-6 flex items-center justify-between'>
        <button onClick={() => navigate(-1)} aria-label="Go back" className="text-2xl">
          <i className="ri-arrow-left-line"></i> Back
        </button>
      </nav>

      <h1 className='text-4xl md:text-6xl font-black mb-6'>All Works of {info.detail.name}</h1>

      {/* <div className="mb-6 flex flex-wrap gap-4">
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-gray-800 text-white p-2 rounded"
        >
          <option value="date">Sort by Date</option>
          <option value="name">Sort by Name</option>
          <option value="popularity">Sort by Popularity</option>
        </select>

        <select 
          value={filterBy} 
          onChange={(e) => setFilterBy(e.target.value)}
          className="bg-gray-800 text-white p-2 rounded"
        >
          <option value="all">All Works</option>
          <option value="movie">Movies Only</option>
          <option value="tv">TV Shows Only</option>
        </select>
      </div> */}

      <Suspense fallback={<Loading />}>
        <Cards data={displayWorks} title="all" />
      </Suspense>
    </div>
  );
};

export default AllWorks;