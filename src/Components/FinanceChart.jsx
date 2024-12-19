"use client"

import { moredark } from '../Utils/images'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Jan',
    Income: 4000,
    Expense: 2400,
    amt: 2400,
  },
  {
    name: 'Feb',
    Income: 3000,
    Expense: 1398,
    amt: 2210,
  },
  {
    name: 'Mar',
    Income: 2000,
    Expense: 800,
    amt: 2290,
  },
  {
    name: 'Apr',
    Income: 2780,
    Expense: 3908,
    amt: 2000,
  },
  {
    name: 'May',
    Income: 1890,
    Expense: 4800,
    amt: 2181,
  },
  {
    name: 'Jun',
    Income: 2390,
    Expense: 3800,
    amt: 2500,
  },
  {
    name: 'Jul',
    Income: 1290,
    Expense: 300,
    amt: 2100,
  },
  {
    name: 'Aug',
    Income: 6490,
    Expense: 3000,
    amt: 2100,
  },
  {
    name: 'Sep',
    Income: 490,
    Expense: 300,
    amt: 2100,
  },
  {
    name: 'Oct',
    Income: 5000,
    Expense: 4300,
    amt: 2100,
  },
  {
    name: 'Nov',
    Income: 7890,
    Expense: 1000,
    amt: 2100,
  },
  {
    name: 'Dec',
    Income: 3490,
    Expense: 4300,
    amt: 2100,
  },
];
const FinanceChart = () => {
  return (
    <div className='bg-white rounded-xl w-full h-full p-4'>
      <div className='flex justify-between items-center'>
            <h1 className='text-lg font-semibold'>
                Finance
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
          <Line type="monotone" dataKey="Expense" stroke="#8884d8" strokeWidth={3}/>
          <Line type="monotone" dataKey="Income" stroke="#82ca9d" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default FinanceChart
