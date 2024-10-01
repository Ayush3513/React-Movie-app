import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Sidenav = ({Mobile}) => {
  const [isMobile, setisMobile] = useState(Mobile);

useEffect(()=>{
  setisMobile(window.innerWidth <= 768? true : false)
},[isMobile])

  const NavLink = ({ to, icon, text }) => (
    <Link 
      to={to} 
      className='p-2 md:p-4 hover:bg-[rgb(101,86,205)] hover:text-white text-zinc-400 duration-300 rounded-lg text-sm md:text-base font-semibold flex items-center'
      // onClick={() => isMobile && setisMobile(false)}
    >
      <i className={`${icon} text-zinc-400 mr-3`}></i>
      {text}
    </Link>
  );
  // const toggleNav = () => setismobille(!ismobille);

  const NavContent = () => (
    <>
      <h1 className='text-xl md:text-2xl text-white font-semibold mb-4 md:mb-8'>
        <i className="ri-tv-fill mr-2 text-[#6556CD]"></i> CineStream
      </h1>
      <nav className='mb-8'>
        <h1 className='mb-3 md:mb-5 text-lg md:text-2xl font-semibold'>New Feeds</h1>
        <div className="flex flex-col gap-2 md:gap-3">
          <NavLink to="/trending" icon="ri-fire-fill" text="Trending" />
          <NavLink to="/popular" icon="ri-bard-fill" text="Popular" />
          <NavLink to="/movie" icon="ri-clapperboard-fill" text="Movies" />
          <NavLink to="/tv" icon="ri-tv-2-fill" text="TV Shows" />
          <NavLink to="/person" icon="ri-team-fill" text="People" />
        </div>
      </nav>

      <nav>
        <h1 className='mb-3 md:mb-5 text-lg md:text-2xl font-semibold'>Website Info</h1>
        <div className="flex flex-col gap-2 md:gap-3">
          <NavLink to="/contact" icon="ri-phone-fill" text="Contact Us" />
          <NavLink to="/AboutUs" icon="ri-information-fill" text="About Us" />
        </div>
      </nav>
    </>
  );

  

  return (
    <>
      
        <div className={`${isMobile ? " z-[100] p-20 absolute h-screnn border-r border-zinc-700 bg-black overflow-y-auto" : "w-64 relative h-full border-r border-zinc-700 p-6 bg-black[#1F1F1F] overflow-y-auto"}`}>
          <NavContent />
        </div>

    </>
  );
};

export default Sidenav;