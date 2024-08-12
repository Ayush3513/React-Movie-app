import React from 'react'
import loader from '/Position.gif'

const Loading = () => {
  return (
    <div className='h-screen w-full bg-black flex pointer-events-none items-center justify-center'>
        <img className='h-[10%]' src={loader} alt="" />
    </div>
  )
}

export default Loading