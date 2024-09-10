import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Sidenav = ({ isMobile  }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [isMobile]);

  const toggleNav = () => setIsOpen(!isOpen);

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

  const NavLink = ({ to, icon, text }) => (
    <Link 
      to={to} 
      className='p-2 md:p-4 hover:bg-[#6556CD] hover:text-white text-zinc-400 duration-300 rounded-lg text-sm md:text-base font-semibold flex items-center'
      onClick={() => isMobile && setIsOpen(false)}
    >
      <i className={`${icon} text-zinc-400 mr-3`}></i>
      {text}
    </Link>
  );

  return (
    <>
      {isMobile ? (
        <>
          <div className="fixed top-0 left-0 bg-[#1F1F1F] z-50">
            <button 
              onClick={toggleNav}
              className="w-full p-4 text-white bg-[#6556CD] flex items-center justify-center"
            >
              <i className={`ri-menu-line mr-2`}></i> Menu
            </button>
          </div>
          {isOpen && (
            <div className="fixed inset-0 bg-[#1F1F1F] z-[999] p-4 overflow-y-auto">
              <button 
                onClick={toggleNav}
                className="absolute top-4 right-4 text-white text-2xl"
              >
                <i className="ri-close-line"></i>
              </button>
              <NavContent />
            </div>
          )}
        </>
      ) : (
        <div className="w-64 h-full border-r border-zinc-700 p-6 bg-black[#1F1F1F] overflow-y-auto">
          <NavContent />
        </div>
      )}
    </>
  );
};

export default Sidenav;