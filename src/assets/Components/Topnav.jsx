import axios from '../../Utils/Axios';
import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import Checkbox from './Checkbox';

const Topnav = ({navOpenHandler}) => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);

  const getSearches = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setSearches([]);
      return;
    }
    try {
      const { data } = await axios.get(`/search/multi?query=${searchQuery}`);
      setSearches(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  // Debounce the search function to avoid excessive API calls
  const debouncedGetSearches = useCallback(debounce(getSearches, 300), []);

  useEffect(() => {
    debouncedGetSearches(query);
    return () => debouncedGetSearches.cancel();
  }, [query, debouncedGetSearches]);

  return (
    <div className='w-full px-4 sm:px-6 lg:px-8 py-2 sm:py-4 flex items-center justify-center relative'>
      <div className='relative w-full max-w-3xl flex items-center'>
        <i className="ri-search-line text-xl sm:text-2xl absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        <input 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          className='w-full rounded-full pl-10 md:w-[90%] pr-10 py-2 sm:py-3 outline-none border-none bg-[#6656cd5b] text-white placeholder-gray-300' 
          placeholder='Search movies, TV shows, and people' 
          type="text" 
        />
        {query.length > 0 && (
          <button 
            onClick={() => setQuery("")} 
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <i className="ri-close-line text-2xl sm:text-3xl text-gray-400"></i>
          </button>
        )}
      </div>
     <button className='w-10 h-10' onClick={navOpenHandler}>
     <Checkbox />
     </button>
      
      {searches.length > 0 && (
        <div className='absolute max-h-[60vh] w-full max-w-3xl z-20 rounded-md top-full left-1/2 transform -translate-x-1/2 bg-zinc-800 overflow-auto mt-2 shadow-lg'>
          {searches.map((item, i) => (
            <Link 
              to={`/${item.media_type}/details/${item.id}`}  
              key={i} 
              className='flex items-center p-4 border-b border-zinc-700 hover:bg-zinc-700 transition-colors duration-200'
            >
              <img 
                className='h-16 w-16 object-cover rounded-md shadow-lg mr-4' 
                src={item.backdrop_path || item.profile_path 
                  ? `https://image.tmdb.org/t/p/w200${item.backdrop_path || item.profile_path}`
                  : "https://via.placeholder.com/200x200?text=No+Image"
                } 
                alt="" 
              />
              <div>
                <p className='text-white font-medium text-lg'>{item.original_name || item.name || item.original_title || item.title}</p>
                <p className='text-gray-400 text-sm'>{item.media_type.charAt(0).toUpperCase() + item.media_type.slice(1)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Topnav;