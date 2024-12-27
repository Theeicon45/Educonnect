import DistributionChart from "../Components/DistributionChart";
import EmployeeCards from "../Components/EmployeeCards";
import LeaveRequestsComponent from "../Components/LeaveRequestsComponent";
import Notification from "../Components/Notification";
import SubjectsPerformance from "../Components/SubjectsPerformance";
import TeacherManagement from "../Components/TeacherManagement";
import TeacherTable from "../Components/TeacherTable";

const StaffManagement = () => {
  return (
    <div className="flex  justify-between ">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* user creation */}
        <div className="">
          <TeacherManagement />
        </div>
        {/* cards */}
        <div className="  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <EmployeeCards type="Total Employees" />
          <EmployeeCards type="Job Applicants" />
          <EmployeeCards type="New Employees" />
        </div>

        <div className=" flex flex-col gap-8">
          {/* pie */}
          <div className="flex gap-4">
            <DistributionChart />
            <SubjectsPerformance />
          </div>
          <TeacherTable />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col bg-white gap-8">
        <div className="flex flex-col gap-32  ">
          <LeaveRequestsComponent />
          <Notification />
        </div>
      </div>
    </div>
  );
};

export default StaffManagement;
