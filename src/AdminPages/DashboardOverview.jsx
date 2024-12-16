import Usercards from "../Components/Usercards";


const DashboardOverview = () => {

  return (
    // Usercards
   <div className="flex gap-4 p-4 md:flex-row">
    {/* Left */}
    <div className="w-full lg:w-2/3">
        {/* UserCards */}
        <div className="flex gap-4 justify-between pt-5 flex-wrap">
          <Usercards type="Student" />
          <Usercards type="Teacher" />
          <Usercards type="Parent" />
          <Usercards type="Staff" />
          
        </div>

    </div>
    {/* Right */}
    <div className="w-full lg:w-1/3"> 
      r
    </div>
   
   </div>
  );
};

export default DashboardOverview;
