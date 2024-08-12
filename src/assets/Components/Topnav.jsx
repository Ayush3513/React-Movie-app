import axios from '../../Utils/Axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const Topnav = () => {

const [query, setquery] = useState("");
const [searches, setsearches] = useState([]);

const getSearches = async () =>{
    try {
        const {data} = await axios.get(`/search/multi?query=${query}`)
        setsearches(data.results)
    } catch (error) {
        console.log("Error: " ,error)
    }
}

useEffect(()=>{
    getSearches()
},[query])

    
  return (
    <div className='h-[7vh] w-full flex items-center justify-start ml-[7vw] z-[10] relative'>
        <i className="ri-search-line text-2xl"></i>
        <input value={query} onChange={(e)=>setquery(e.target.value)} className='w-[50vw] mx-10 rounded px-5 py-1 outline-none border-none bg-[#6656cd5b] text-white ' placeholder='Search' type="text" />
        {query.length > 0 && <i onClick={()=>setquery("")} className="ri-close-line text-3xl"></i>}
        
        <div className='absolute max-h-[45vh] w-[50vw] z-[2] rounded-[1px] top-[100%] left-[4.7%] bg-zinc-200 overflow-auto '>
            {searches.map((item,i)=>(
                 <Link to={`/${item.media_type}/details/${item.id}`}  key={i} className='link w-full  py-10 border-b-[1px] border-zinc-400 hover:bg-[#6656cd56] duration-300 flex items-center justify-start p-5 '>
                 <img className='mr-5 ml-10 h-20 w-20 object-cover shadow-lg' src={item.backdrop_path || item.profile_path ? `https://image.tmdb.org/t/p/original/${item.backdrop_path || item.profile_path }` : "https://cdn.vectorstock.com/i/500p/82/99/no-image-available-like-missing-picture-vector-43938299.jpg"} alt="" />
                 <p className='text-zinc-700 font-medium text-1xl ml-5'>{item.original_name || item.name || item.original_title || item.title
 && item.original_name || item.name || item.original_title || item.title}</p>
             </Link>
            ))}
            
            

      </div>

    </div>
  )
}

export default Topnav