import { moredark } from "../Utils/images";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Math", KJSEA: 4000, MOCK: 2400 },
  { name: "English", KJSEA: 3000, MOCK: 1398 },
  { name: "Kiswahili", KJSEA: 2000, MOCK: 9800 },
  { name: "Science", KJSEA: 2780, MOCK: 3908 },
  { name: "Social Studies", KJSEA: 1890, MOCK: 4800 },
  { name: "CRE", KJSEA: 2390, MOCK: 3800 },
  { name: "Agriculture and Nutrition", KJSEA: 3490, MOCK: 4300 },
  { name: "Creative Arts and Sports", KJSEA: 3490, MOCK: 4300 },
];

const SubjectsPerformance = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Subject Performance</h1>
        <img
          src={moredark}
          alt="More Options"
          width={20}
          height={20}
          className="cursor-pointer"
        />
      </div>
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f9f9f9",
                borderRadius: "10px",
                border: "1px solid #ddd",
              }}
            />
            <Legend
              align="center"
              verticalAlign="top"
              wrapperStyle={{ paddingBottom: "10px" }}
            />
            <Bar dataKey="KJSEA" fill="#8884d8  " radius={[10, 10, 0, 0]} />
            <Bar dataKey="MOCK" fill="#82ca9d " radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SubjectsPerformance;
