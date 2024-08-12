import React from 'react'
import { Link } from 'react-router-dom'

const Sidenav = () => {
  return (
    <>
    <div className="h-full w-[20%] border-r-[1px] border-zinc-500 p-10">
        <h1 className='text-2xl text-white font-semibold'><i className="ri-tv-fill mr-2 text-[#6556CD]"></i> CineStream</h1>
        <nav  className='mt-16 ml-5'>
            <h1 className='mb-5 text-2xl font-semibold'>New Feeds</h1>
            <div className="flex flex-col gap-3">
            <Link to={"/trending"} className='p-4 hover:bg-[#6556CD] hover:text-white text-zinc-400 duration-300 rounded-lg font-xl font-semibold'><i className="ri-fire-fill text-zinc-400 mr-1 "></i> Trending</Link>
            <Link to={"/popular"} className='p-4 hover:bg-[#6556CD] hover:text-white text-zinc-400 duration-300 rounded-lg font-xl font-semibold'><i className="ri-bard-fill text-zinc-400 mr-3"></i>Popular</Link>
            <Link to={"/movie"} className='p-4 hover:bg-[#6556CD] hover:text-white text-zinc-400 duration-300 rounded-lg font-xl font-semibold'><i className="ri-clapperboard-fill text-zinc-400 mr-3"></i>Movies</Link>
            <Link to={"/tv"} className='p-4 hover:bg-[#6556CD] hover:text-white text-zinc-400 duration-300 rounded-lg font-xl font-semibold'><i className="ri-tv-2-fill text-zinc-400 mr-3"></i>TV Shows</Link>
            <Link to={"/person"} className='p-4 hover:bg-[#6556CD] hover:text-white text-zinc-400 duration-300 rounded-lg font-xl font-semibold'><i className="ri-team-fill text-zinc-400 mr-3"></i>People</Link>
            </div>
        </nav>

        <nav className='mt-16 ml-5'>
            <h1 className='mb-5 text-2xl font-semibold'>Website Info</h1>
            <div className="flex flex-col gap-3">
            <Link className='p-4 hover:bg-[#6556CD] hover:text-white text-zinc-400 duration-300 rounded-lg font-xl font-semibold'><i className="ri-phone-fill text-zinc-400 mr-1"></i> Contact Us</Link>
            <Link className='p-4 hover:bg-[#6556CD] hover:text-white text-zinc-400 duration-300 rounded-lg font-xl font-semibold'><i className="ri-information-fill text-zinc-400 mr-3"></i>About Us</Link>
            </div>
        </nav>
        
    </div>
    </>
  )
}

export default Sidenav