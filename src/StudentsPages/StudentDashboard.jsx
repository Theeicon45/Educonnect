import EventCalendar from "../Components/EventCalendar";
import Announcements from "../Components/Announcements";
import WelcomeComponent from "../TeacherComponents/WelcomeComponent";
import { useEffect, useState } from "react";
import { manavatar } from "../Utils/images";
import CourseCards from "./CourseCards";
import TermPerformance from "./TermPerformance";

const StudentDashboard = () => {
  const [ProfilePicture, setProfilePicture] = useState(null); // State for the profile picture

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/get-student-profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          // console.log("Profile Picture Data:", data);
          setProfilePicture(`http://localhost:3000${data.picturePath}`); // Update state with the picture URL
          // console.log(data)
        } else {
          console.error(
            "Failed to fetch profile picture:",
            await response.text()
          );
        }
      } catch (error) {
        console.error("Error fetching profile picture:", error);
      }
    };

    fetchProfilePicture();
  }, []);
  return (
    <div className="">
      <div className=" flex flex-row justify-between  p-8 bg-gradient-to-br from-purple-100 via-green-100 to-pink-500 rounded-md">
        <WelcomeComponent />
        <img
          src={ProfilePicture || manavatar} // Use the fetched profile picture or fallback to manavatar
          alt="Profile"
          width={170}
          height={170}
          className="rounded-full"
        />
      </div>

      <div className="flex gap-4 p-4 md:flex-row  ">
        {/* Left */}
        <div className="flex flex-col gap-8 w-full p-4 lg:w-2/3 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 bg-white rounded-lg p-4">
  <CourseCards type="Courses Enrolled" />
  <CourseCards type="Continuous assessment tests" />
  <CourseCards type="Exams" />
  <CourseCards type="Holiday Assignments" />
</div>

          <TermPerformance/>
        </div>
        {/* Right */}
        <div className="w-full lg:w-1/3 flex flex-col gap-8">
          <EventCalendar />
          <Announcements />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
