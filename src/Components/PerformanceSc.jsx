import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { moredark } from '../Utils/images';

const data = [
  
  {
    name: '2020',
    Mock: 89,
    KCSE: 80,
    
  },
  {
    name: '2021',
    Mock: 90,
    KCSE: 70,
    
  },
  {
    name: '2022',
    Mock: 90,
    KCSE: 43,
  },
  {
    name: '2023',
    Mock: 90,
    KCSE: 40,
  },
  {
    name: '2024',
    Mock: 30,
    KCSE: 40,
  },
];

const PerformanceSc = () => {
  return (
    <div className='bg-white rounded-lg p-4 h-full'>
        <div className='flex justify-between items-center'>
            <h1 className='text-lg font-semibold'>Performance</h1>
            <img src={moredark} alt="" width={20} height={20} />
        </div>
        <ResponsiveContainer width="100%" height="90%">
        <BarChart
          width={500}
          height={300}
          data={data}
         barSize={20}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false}  />
          <XAxis dataKey="name" axisLine={false} tickLine={false}/>
          <YAxis axisLine={false}/>
          <Tooltip contentStyle={{ borderRadius:'10px',borderColor:'lightgray'}} />
          <Legend  align='left' verticalAlign='top' wrapperStyle={{paddingTop:'20px', paddingBottom:'40px'}}/>
          <Bar dataKey="Mock" fill="#fca5a5" radius={[10,10,0,0]} legendType='circle' />
          <Bar dataKey="KCSE" fill="#67e8f9" radius={[10,10,0,0]}  legendType='circle'/>
        </BarChart>
      </ResponsiveContainer>
      
    </div>
  )
}

export default PerformanceSc
