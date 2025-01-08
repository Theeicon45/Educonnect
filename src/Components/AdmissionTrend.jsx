"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { moredark } from "../Utils/images";

const data = [
  {
    name: "2018",
    applied: 4000,
    admitted: 2400,
  },
  {
    name: "2019",
    applied: 3000,
    admitted: 1398,
  },
  {
    name: "2020",
    applied: 2000,
    admitted: 980,
  },
  {
    name: "2021",
    applied: 2780,
    admitted: 3908,
  },
  {
    name: "2022",
    applied: 1890,
    admitted: 4800,
  },
  {
    name: "2023",
    applied: 2390,
    admitted: 3800,
  },
  {
    name: "2024",
    applied: 3490,
    admitted: 4300,
  },
];

const AdmissionTrend = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Admission Trends</h1>
        {/* You can optionally include a dynamic icon here */}
        <img src={moredark} alt="More options" width={20} height={20} />
      </div>
      <div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              label={{
                value: "Year",
                position: "insideBottomRight",
                offset: -5,
              }}
            />
            <YAxis
              label={{ value: "Number", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Legend
              align="center"
              verticalAlign="top"
              wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
            />
            <Line
              type="monotone"
              dataKey="applied"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              strokeWidth={3}
            />
            <Line
              type="monotone"
              dataKey="admitted"
              stroke="#82ca9d"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdmissionTrend;
