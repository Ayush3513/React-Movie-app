import React, { useState } from "react";
import Sidenav from "../Partials/Sidenav";

const Checkbox = () => {
    const [menu, setmenu] = useState(false);

    const sidnavHandler = () => {
        setmenu(!menu);
        
    }
        <Sidenav isMobile={menu} />
    
    
   
    
  return (
    <label onClick={sidnavHandler} className="flex md:hidden flex-col gap-2 w-8 ml-10">
      <input className="peer hidden" type="checkbox" />
      <div className="rounded-2xl h-[3px] w-1/2 bg-white duration-500 peer-checked:rotate-[225deg] origin-right peer-checked:-translate-x-[12px] peer-checked:-translate-y-[1px]" />
      <div className="rounded-2xl h-[3px] w-full bg-white duration-500 peer-checked:-rotate-45" />
      <div className="rounded-2xl h-[3px] w-1/2 bg-white duration-500 place-self-end peer-checked:rotate-[225deg] origin-left peer-checked:translate-x-[12px] peer-checked:translate-y-[1px]" />
    </label>
  );
};

export default Checkbox;