import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Topnav = () => {

const [query, setquery] = useState("");

    
  return (
    <div className='h-[10vh] w-full flex items-center justify-start ml-[7vw] relative'>
        <i className="ri-search-line text-2xl"></i>
        <input value={query} onChange={(e)=>setquery(e.target.value)} className='w-[50vw] mx-10 rounded px-5 py-1 outline-none border-none bg-[#6656cd5b] text-white ' placeholder='Search' type="text" />
        {query.length > 0 && <i onClick={()=>setquery("")} className="ri-close-line text-3xl"></i>}
        
        <div className='absolute max-h-[45vh] w-[50vw] rounded-[1px] top-[100%] left-[4.7%] bg-zinc-200 overflow-auto '>

            {/* <Link className='link w-full h-[4vw] border-b-[1px] border-zinc-400 hover:bg-[#6656cd56] duration-300 flex justify-start p-5 '>
                <img src="" alt="" />
                <p className='text-zinc-700 font-medium'>Hello world</p>
            </Link> */}
            

      </div>

    </div>
  )
}

export default Topnav