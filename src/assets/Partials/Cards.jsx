import React from 'react'
import { Link } from 'react-router-dom'


const Cards = ({data,title}) => {


  return (
    <div className=' w-full p-8 overflow-x-auto   ' >
     
        <div className="flex gap-7 overflow-x-auto overflow-y-hidden ">
        {data.map((data,i)=>{
          return <Link to={`/${ data.media_type || data.media_type || title }/details/${data.id}`} key={i} className="h-[40vh] mb-10 bg-[#080611] flex-shrink-0 w-[10vw]">
          <img className='h-[55%] shadow-[10px_20px_40px_5px_rgb(0,0,0)] w-full object-cover' src={data.backdrop_path ? `https://image.tmdb.org/t/p/original${data.backdrop_path}` : "https://cdn.vectorstock.com/i/500p/82/99/no-image-available-like-missing-picture-vector-43938299.jpg"} alt="" />
          <div className="mt-2 p-3">
          <h1 className='text-xl font-semibold '>{data.original_name || data.name || data.original_title || data.title}</h1>
          <p className=' text-sm mt-1 opacity-[.7] '>{data.overview.slice(0,20)}...<Link className='text-zinc-500'>more</Link></p>
          </div>
        </Link>
        })}
        </div>
    </div>
  )
}

export default Cards