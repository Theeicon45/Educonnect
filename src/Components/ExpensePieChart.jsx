import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6666"];

const ExpensePieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchExpenseData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/expenseSummary");
        if (!response.ok) {
          throw new Error("Failed to fetch expense summary");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching expense summary:", error);
      }
    };

    fetchExpenseData();
  }, []);

  // Calculate the total value of all expenses
  const totalExpense = data.reduce((acc, entry) => acc + entry.value, 0);

  const TooltipWithPercentage = ({ value, name }) => {
    if (totalExpense === 0) return [`$${value.toFixed(2)}`, `${name} (0%)`];
    const percentage = ((value / totalExpense) * 100).toFixed(2);
    return [`$${value.toFixed(2)}`, `${name} (${percentage}%)`];
  };

  if (data.length === 0) {
    return <div>Loading data...</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name) => TooltipWithPercentage({ value, name })}
          contentStyle={{
            backgroundColor: "#f9f9f9",
            borderRadius: "10px",
            border: "1px solid #ddd",
            padding: "10px",
          }}
        />
        <Legend
          layout="vertical"
          align="right"
          verticalAlign="middle"
          formatter={(value) => <span style={{ color: "#333" }}>{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ExpensePieChart;
