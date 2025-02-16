"use client"

import { moredark } from '../Utils/images'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: '2024 Term 1',
    CATS: 70,
    MAIN_EXAM: 66,
    
  },
  {
    name: 'Feb',
    CATS: 60,
    MAIN_EXAM: 54,
    
  },
  {
    name: 'Mar',
    CATS: 60,
    MAIN_EXAM: 79,
    
  },
  {
    name: 'Apr',
    CATS: 44,
    MAIN_EXAM: 80,
    
  },
  {
    name: 'May',
    CATS: 56,
    MAIN_EXAM: 86,
    
  },
  {
    name: 'Jun',
    CATS: 80,
    MAIN_EXAM: 78,
    
  },
  {
    name: 'Jul',
    CATS: 78,
    MAIN_EXAM: 65,
    
  },
  {
    name: 'Aug',
    CATS: 87,
    MAIN_EXAM: 64,
    
  },
  {
    name: 'Sep',
    CATS: 90,
    MAIN_EXAM: 74,
    
  },
  {
    name: 'Oct',
    CATS: 64,
    MAIN_EXAM: 80,
    
  },
  {
    name: 'Nov',
    CATS: 64,
    MAIN_EXAM: 70,
    
  },
  {
    name: 'Dec',
    CATS: 79,
    MAIN_EXAM: 82,
    
  },
];
const TermPerformance = () => {
  return (
    <div className='bg-white rounded-xl w-full h-[500px] p-4'>
      <div className='flex justify-between items-center'>
            <h1 className='text-lg font-semibold'>
                Termly Performance Trend
            </h1>
            <img src={moredark} alt="" width={20} height={20} />
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false}/>
          <XAxis dataKey="name"  axisLine={false} tickLine={false} tickMargin={10}/>
          <YAxis  axisLine={false} tickLine={false} tickMargin={10}/>
          <Tooltip
            contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
          />
          <Legend  align='center' verticalAlign='top' wrapperStyle={{paddingTop:'10px', paddingBottom:'30px'}}/>
          <Line type="monotone" dataKey="MAIN_EXAM" stroke="#8884d8" strokeWidth={3}/>
          <Line type="monotone" dataKey="CATS" stroke="#82ca9d" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TermPerformance
