import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

function Dropdown({ options, func, title1 }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(title1);
  const buttonRef = useRef(null); // Create a ref for the button

  const titleChange = (val) => {
    setTitle(val);
  };

 

  return (
    <div className="relative inline-block text-left">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex justify-center w-[5vw]  rounded-md    px-12 py-2 bg-[#6556CD] text-sm font-medium  "
      >
        {title.toUpperCase()}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
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
                className="block font-semibold px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
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