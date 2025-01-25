"use client";

import { useState, useEffect } from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import { boygirl, moredark } from "../Utils/images";

const CountChart = () => {
  const [boysCount, setBoysCount] = useState(0);
  const [girlsCount, setGirlsCount] = useState(0);

  useEffect(() => {
    // Fetch gender count from the API
    fetch("http://localhost:3000/api/student-gender-count")
      .then((response) => response.json())
      .then((data) => {
        setBoysCount(data.boys || 0);
        setGirlsCount(data.girls || 0);
      })
      .catch((error) => {
        console.error("Error fetching gender count:", error);
      });
  }, []);

  const totalCount = boysCount + girlsCount;

  const data = [
    {
      name: "Total",
      count: totalCount,
      fill: "white",
    },
    {
      name: "Girls",
      count: girlsCount,
      fill: "#d8b4fe",
    },
    {
      name: "Boys",
      count: boysCount,
      fill: "#bbf7d0",
    },
  ];

  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Students</h1>
        <img src={moredark} alt="" width={20} height={20} />
      </div>
      {/* CHART */}
      <div className=" relative w-full h-[75%]">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={32}
            data={data}
          >
            <RadialBar minAngle={15} background dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>
        <img
          src={boygirl}
          alt="Gender Icon"
          width={50}
          height={50}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      {/* BOTTOM */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-green-200 rounded-full" />
          <h1 className="font-bold">{boysCount}</h1>
          <h2 className="text-xs text-gray-300">Boys ({((boysCount / totalCount) * 100).toFixed(2)}%)</h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-purple-200 rounded-full" />
          <h1 className="font-bold">{girlsCount}</h1>
          <h2 className="text-xs text-gray-300">Girls ({((girlsCount / totalCount) * 100).toFixed(2)}%)</h2>
        </div>
      </div>
    </div>
  );
};

export default CountChart;
