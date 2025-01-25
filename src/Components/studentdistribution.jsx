import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const StudentDistribution = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/gender-distribution");
        if (!response.ok) {
          throw new Error("Failed to fetch gender distribution data");
        }
        const result = await response.json();
        // console.log(result)
        setData(result);
      } catch (error) {
        console.error("Error fetching gender distribution data:", error);
      }
    };

    fetchData();
  }, []);

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Gender Distribution</h1>
      </div>
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="school_name" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f9f9f9",
                borderRadius: "10px",
                border: "1px solid #ddd",
              }}
            />
            <Legend
              align={"center"}
              verticalAlign="top"
              wrapperStyle={{ paddingBottom: "10px" }}
            />
            <Bar dataKey="boys" stackId="a" fill="#8884d8" />
            <Bar
              dataKey="girls"
              stackId="a"
              fill="#82ca9d"
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StudentDistribution;
