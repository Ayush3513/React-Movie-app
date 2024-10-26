import { Link, useLocation } from 'react-router-dom'
import axios from '../../Utils/Axios'
import React, { useEffect, useState } from 'react'

const Header = ({data}) => {
  const {pathname} = useLocation()

  return (
    <Link 
      to={`/${data.media_type}/details/${data.id}`} 
      style={{ 
        background: `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.8)) ,url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path})`, 
        backgroundSize: "cover",
        backgroundPosition: "center"
      }} 
      className='min-h-[40vh] md:min-h-[60vh] p-4 md:p-10 w-full flex flex-col items-start justify-end'
    >
      <div className='text-2xl md:text-4xl lg:text-5xl font-semibold mb-2 md:mb-4'>
        {data.original_name || data.name || data.original_title || data.title}
      </div>
      <p className='w-full md:w-[80%] lg:w-[70%] text-sm md:text-base lg:text-lg opacity-[.8] mb-2 md:mb-4'>
        {data.overview.slice(0, 100)}...
        <Link to={`/${data.media_type || title}/details/${data.id}`} className='text-blue-400 ml-1'>
          more
        </Link>
      </p>
      <div className="flex flex-wrap gap-4 md:gap-8 items-center h-fit mb-2 md:mb-4">
        <h3 className="text-sm md:text-base">
          <i className="ri-megaphone-fill text-[#6556CD] font-semibold mr-2 text-lg md:text-xl"></i>
          {data.first_air_date ? data.first_air_date : "No Information"}
        </h3>
        <h3 className="text-sm md:text-base">
          <i className="ri-album-fill text-[#6556CD] font-semibold mr-2 text-lg md:text-xl"></i>
          {data.media_type.toUpperCase()}
        </h3>
      </div>
      <Link 
        to={`/${data.media_type}/details/${data.id}/trailer`} 
        className='py-2 px-4 md:py-3 md:px-6 lg:py-4 lg:px-8 bg-[#6556CD] rounded-md text-base md:text-xl lg:text-2xl'
      >
        Watch Trailer
      </Link>
    </Link>
  ) 
}

export default Header