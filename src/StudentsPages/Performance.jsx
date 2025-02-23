import React from 'react'
import PerformanceChart from '../StudentComponents/PerformanceChart'

const Performance = () => {
  return (
    <div className=''>
     <div className='flex flex-row gap-8 mt-4'>
      {/* Left */}
        <div className='w-1/2  h-[500px] bg-white rounded-lg p-4'>
          <h1 className='font-semibold text-xl '>Student Performance</h1>
          <PerformanceChart/>
        </div>
        {/* Right */}
        <div className='w-1/2   h-[500px] bg-white rounded-lg p-4'>
         Right
        </div>
     </div>
    </div>
  )
}

export default Performance
