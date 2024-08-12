import React from 'react'
import loader from '/giphy.webp'

const Loading = () => {
  return (
    <div className='h-screen fixed w-full bg-black flex items-center justify-center'>
        <img className='h-[50%] ' src={loader} alt="" />
    </div>
  )
}

export default Loading