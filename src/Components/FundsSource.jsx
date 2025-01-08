import {
    RadialBarChart,
    RadialBar,
    Legend,
    Tooltip,
    ResponsiveContainer,
  } from 'recharts';
  
  const data = [
    {
        name: 'TOTAL',
        value: 100,
        fill: '#FFF', // White
      },
    {
      name: 'Fees',
      value: 50,
      fill: '#8884d8', // Purple
    },
    {
      name: 'Grants',
      value: 30,
      fill: '#82ca9d', // Green
    },
    {
      name: 'Government Funding',
      value: 20,
      fill: '#ffc658', // Yellow
    },
   
  ];
  
  const style = {
    lineHeight: '24px',
    textAlign: 'center',
  };
  
  const FundsSource = () => {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md w-full">
        <h1 className="text-xl font-semibold mb-4">Finance Sources</h1>
        <ResponsiveContainer width="100%" height={400}>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="10%"
            outerRadius="80%"
            barSize={10}
            data={data}
          >
            <RadialBar
              minAngle={15}
              label={{ position: 'insideStart', fill: '#fff' }}
              background
              clockWise
              dataKey="value"
            />
            <Tooltip />
            <Legend
              iconSize={10}
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={style}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  export default FundsSource;
  