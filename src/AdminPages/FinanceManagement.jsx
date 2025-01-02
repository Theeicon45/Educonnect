import ExpensePieChart from "../Components/ExpensePieChart";
import FeeData from "../Components/FeeData";
import FeesTable from "../Components/FeesTable";

const FinanceManagement = () => {
  return (
    <div>
      <div className=" flex items-center w-full my-4">
        {/* Right */}
        <div className="w-1/2">
          <FeeData />
        </div>
        {/* Left */}
        <div className="w-1/2 rounded-lg bg-purple-100 h-full p-6">

        <ExpensePieChart/>
        </div>
      </div>
      <FeesTable />
    </div>
  );
};

export default FinanceManagement;
