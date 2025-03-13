import { useState, useEffect } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";

const PerformanceChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/performance", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const result = await response.json();
        console.log(result)
        if (result.success) {
          setData(result.data);
        } else {
          console.error("No performance data found");
        }
      } catch (error) {
        console.error("Error fetching performance data:", error);
      }
    };

    fetchPerformanceData();
  }, []);

  return (
    <div className="w-full h-80">
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <Tooltip contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }} />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />
            <Radar name="Performance" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-gray-500">No performance data available.</p>
      )}
    </div>
  );
};

export default PerformanceChart;
