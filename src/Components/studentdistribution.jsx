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

const data = [
  {
    name: "School A",
    boys: 400,
    girls: 350,
  },
  {
    name: "School B",
    boys: 300,
    girls: 280,
  },
  {
    name: "School C",
    boys: 450,
    girls: 420,
  },
  {
    name: "School D",
    boys: 320,
    girls: 310,
  },
  {
    name: "School E",
    boys: 370,
    girls: 330,
  },
  {
    name: "School F",
    boys: 290,
    girls: 260,
  },
  {
    name: "School G",
    boys: 410,
    girls: 390,
  },
];

const StudentDistribution = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full">
        <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Gender Distribution</h1>
        {/* You can optionally include a dynamic icon here */}
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
