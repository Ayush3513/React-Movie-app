import axios from '../../Utils/Axios'
import React, { useEffect, useState } from 'react'

const Header = ({data}) => {

    
console.log(data.backdrop_path)
  return (
    <div style={{ background: `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.8)) ,url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path})`, backgroundSize:"cover" ,backgroundPosition:"center"}} className='h-[50vh]  w-full'></div>
  ) 
}

export default Header