import React from 'react'
import loader from '/giphy.webp'

const Loading = () => {
  document.title = "Not Found"
  return (
    <div className='h-screen fixed w-full bg-black flex items-center justify-center'>
        <img className='h-[50%] ' src={loader} alt="" />
    </div>
  )
}

export default Loading