import { useState, useEffect } from "react";
import ChartComponent from "./ChartComponent";

const FeeData = () => {
  const [financeData, setFinanceData] = useState([]);

  useEffect(() => {
    const fetchFinanceData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/financeData");
        if (!response.ok) {
          throw new Error("Failed to fetch finance data");
        }
        const data = await response.json();
        setFinanceData(data);
      } catch (error) {
        console.error("Error fetching finance data:", error);
      }
    };

    fetchFinanceData();
  }, []);

  return (
    <div>
      <ChartComponent
        title="Finance Overview"
        data={financeData}
        xKey="name"
        barKeys={["Expected", "Paid"]}
        colors={["#8884d8", "#82ca9d"]}
        legendAlign="right"
      />
    </div>
  );
};

export default FeeData;
