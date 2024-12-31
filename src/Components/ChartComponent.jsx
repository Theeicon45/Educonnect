import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const ChartComponent = ({ title, data, xKey, barKeys, colors, legendAlign }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">{title}</h1>
        {/* You can optionally include a dynamic icon here */}
      </div>
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f9f9f9",
                borderRadius: "10px",
                border: "1px solid #ddd",
              }}
            />
            <Legend
              align={legendAlign || "center"}
              verticalAlign="top"
              wrapperStyle={{ paddingBottom: "10px" }}
            />
            {barKeys.map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                fill={colors[index]}
                radius={[10, 10, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartComponent;
