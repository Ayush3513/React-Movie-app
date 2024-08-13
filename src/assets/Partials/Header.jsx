import { Link, useLocation } from 'react-router-dom'
import axios from '../../Utils/Axios'
import React, { useEffect, useState } from 'react'

const Header = ({data}) => {
 const {pathname} =  useLocation()

  return (
    <Link to={`/${data.media_type}/details/${data.id}`} style={{ background: `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.8)) ,url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path})`, backgroundSize:"cover" ,backgroundPosition:"top"}} className='h-[60vh] p-10 w-full flex flex-col items-start justify-end'>
<div  className='text-5xl font-semibold '>{data.original_name || data.name || data.original_title || data.title}</div>
<p className='w-[70%] text-lg opacity-[.8] '>{data.overview.slice(0,200)}...<Link to={`/${data.media_type || title}/details/${data.id}`} className='text-blue-400'>more</Link></p>
<div className="flex gap-8 items-center h-fit mt-3">
  <h3><i className="ri-megaphone-fill text-[#6556CD] font-semibold mr-2 text-xl"></i>{data.first_air_date ? data.first_air_date : "No Information" }</h3>
  <h3><i className="ri-album-fill  text-[#6556CD] font-semibold mr-2 text-xl"></i>{data.media_type.toUpperCase()}</h3>
</div>
<Link to={`/${data.media_type}/details/${data.id}/trailer`} className='py-5 px-10 bg-[#6556CD] rounded-md text-2xl mt-4'>Watch Trailer</Link>

    </Link>
  ) 
}

export default Header