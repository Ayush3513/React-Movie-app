import React from 'react';
import { Link } from 'react-router-dom';

const Cards = ({ data, title, limit }) => {
  const displayData = limit ? data.slice(0, limit) : data;

  return (
    <div className='w-full p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6'>
      {displayData.map((item, index) => (
        <Link 
          to={`/${item.media_type || title}/details/${item.id}`} 
          key={index} 
          className="bg-[#080611] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
        >
          <div className={`relative ${title === 'person' ? 'pb-[150%]' : 'pb-[56.25%]'}`}>
            <img 
              className='absolute top-0 left-0 w-full h-full object-cover'
              src={
                item.poster_path || item.profile_path
                  ? `https://image.tmdb.org/t/p/w500${item.poster_path || item.profile_path}`
                  : "https://via.placeholder.com/500x750?text=No+Image"
              }
              alt={item.title || item.name}
              loading="lazy"
            />
          </div>
          <div className="p-4 flex-grow flex flex-col justify-between">
            <h2 className='text-sm sm:text-base font-semibold mb-2 line-clamp-2'>
              {item.title || item.name}
            </h2>
            {title !== 'person' && (
              <p className='text-xs sm:text-sm mt-1 opacity-[.7] line-clamp-3'>
                {item.release_date || item.first_air_date}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Cards;