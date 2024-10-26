import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function Dropdown({ options, func, title1 }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(title1);
  const dropdownRef = useRef(null);

  const titleChange = (val) => {
    setTitle(val);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left w-full sm:w-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex justify-between items-center w-full sm:w-auto rounded-md px-4 py-2 bg-[#6556CD] text-sm md:text-base font-medium"
      >
        {title.toUpperCase()}
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-full sm:w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1">
            {options.map((option, index) => (
              <Link
                key={index}
                to="#"
                onClick={() => {
                  titleChange(option);
                  func(option);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-3 text-sm md:text-base text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                {option}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;