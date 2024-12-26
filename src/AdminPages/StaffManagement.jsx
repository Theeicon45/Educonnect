import EmployeeCards from "../Components/EmployeeCards"
import TeacherCreation from "../Components/TeacherCreation"
import TeacherManagement from "../Components/TeacherManagement"


const StaffManagement = () => {
  return (
    <div className="flex items-center justify-between md:flex-row">

      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">

      {/* user creation */}
      <div className="">
        <TeacherManagement/>
      </div>
        {/* cards */}
        <div className="  flex items-center  gap-8">
          <EmployeeCards type="Total Employees"  />
          <EmployeeCards type="Job Applicants" />
          <EmployeeCards type="New Employees" />
          
        </div>
          

      </div>
      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        right
      </div>
      
    </div>
  )
}

export default StaffManagement
