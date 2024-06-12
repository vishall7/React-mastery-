import React from 'react'

function Background() {
  return (
    <div className='w-full h-screen fixed z-[2]'>
      <div className='absolute top-[5%] flex justify-center p-10 w-full text-zinc-600 font-semibold text-xl'>Documents</div>
      <h1 className='absolute left-1/2 top-1/2 -translate-x-[50%] -translate-y-[50%] text-[14vw] leading-none tracking-tighter font-semibold text-zinc-900'>Docs.</h1>
    </div>
  )
}

export default Background
