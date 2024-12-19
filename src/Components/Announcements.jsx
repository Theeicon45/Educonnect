import React from 'react'

const Announcements = () => {
  return (
    <div className="bg-white p-4  rounded-md">
        <div className='flex items-center justify-between'>
            <h1>Announcements</h1>
            <span className='text-xs text-gray-400'>View all</span>
        </div>
            <div className='flex flex-col gap-4 mt-4'>
             <div className='bg-Orange-100 rounded-md p-4'>
                <div className='flex items-center justify-between'>
                    <h2 className=' font-medium'>Lorem ipsum dolor sit amet.</h2>
                    <span className='text-xs text-gray-400 bg-white rounded-md p-1'>2025-01-01</span>
                </div>
                <p className='text-sm text-gray-400 mt-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, provident?</p>
             </div>
            
            </div>
            <div className='flex flex-col gap-4 mt-4'>
             <div className='bg-cyan-100 rounded-md p-4'>
                <div className='flex items-center justify-between'>
                    <h2 className=' font-medium'>Lorem ipsum dolor sit amet.</h2>
                    <span className='text-xs text-gray-400 bg-white rounded-md p-1'>2025-01-01</span>
                </div>
                <p className='text-sm text-gray-400 mt-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, provident?</p>
             </div>
            
            </div>
            <div className='flex flex-col gap-4 mt-4'>
             <div className='bg-Red-100 rounded-md p-4'>
                <div className='flex items-center justify-between'>
                    <h2 className=' font-medium'>Lorem ipsum dolor sit amet.</h2>
                    <span className='text-xs text-gray-400 bg-white rounded-md p-1'>2025-01-01</span>
                </div>
                <p className='text-sm text-gray-400 mt-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, provident?</p>
             </div>
            
            </div>
      
    </div>
  )
}

export default Announcements
