import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { moredark } from "../Utils/images";

const data = [
  { name: "School 0", value: 60 },
  { name: "School 1", value: 50 },
  { name: "School 2", value: 44 },
  { name: "School 3", value: 57 },
  { name: "School 4", value: 49 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF0000"];

const DistributionChart = () => {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div
        className="chart-container  p-2 "
        style={{ width: 350, height: 400 }}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Employee Distribution</h1>
          <img src={moredark} alt="" width={20} height={20} className="cursor-pointer"/>
        </div>
        <ResponsiveContainer>
          <PieChart>
            <Tooltip
              contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
            />
            <Legend
              align="left"
              verticalAlign="bottom"
              wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
            />
            {/* First Pie Chart */}
            <Pie
              data={data}
              cx="30%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            {/* Second Pie Chart */}
            {/* <Pie
            data={data}
            cx="70%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie> */}
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DistributionChart;
