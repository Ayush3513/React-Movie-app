import React from 'react'
import { Link } from 'react-router-dom'

const Tcards = ({data,title}) => {


  return (
    <div className='h-fit w-full flex flex-wrap items-center justify-center gap-10 p-6  '>
           {data.map((e,i)=>{
            return <Link to={`/${e.media_type || title}/details/${e.id}`} key={i}  className="h-[40vh]  w-[14vw] mb-5 flex-shrink-0  relative">
            <img className='h-[90%] w-screen shadow-[10px_20px_40px_5px_rgb(0,0,0)] object-cover' src={`https://image.tmdb.org/t/p/original/${e.backdrop_path || e.poster_path || e.profile_path}`} alt="" />
            <h1 className='mt-3 text-xl'>{e.original_name || e.name || e.original_title || e.title}</h1>
        
       </Link>
           })}
           
    </div>
  )
}

export default Tcards