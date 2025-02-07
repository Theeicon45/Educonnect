import { useState } from "react";
import { FaUserCog } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import ProfileForm from "../TeacherComponents/ProfileForm"; // Import ProfileForm
import ProfileEditManagement from "../TeacherComponents/ProfileEditManagement"; // Import ProfileEditManagement
import PasswordForm from "../TeacherComponents/PasswordForm";
import PrivacyPolicyModal from "../TeacherComponents/PrivacyPolicyModal";

const TeachersSettings = () => {
  const [activeSection, setActiveSection] = useState("personalInfo");

  return (
    <div className="flex gap-2 mt-2">
      {/* Left Sidebar */}
      <div className="w-1/5  bg-purple-100 px-2 pt-6 rounded-lg">
        <h1 className="font-semibold text-2xl p-2">Account Settings</h1>
        <div className="mt-4 flex flex-col gap-4">
          <h2
            className={`flex flex-row gap-4 items-center rounded-lg text-xl p-2 cursor-pointer ${
              activeSection === "personalInfo" ? "bg-purple-400 text-white" : "bg-gray-300"
            }`}
            onClick={() => setActiveSection("personalInfo")}
          >
            <FaUserCog />
            Personal Information
          </h2>
          <h2
            className={`flex flex-row gap-4 items-center rounded-lg text-xl p-2 cursor-pointer ${
              activeSection === "security" ? "bg-purple-400 text-white" : "bg-gray-300"
            }`}
            onClick={() => setActiveSection("security")}
          >
            <CiLock />
            Password and Security
          </h2>
        </div>
      </div>

      {/* Right Content */}
      <div className="w-4/5 p-6 bg-white shadow-md rounded-lg">
        {activeSection === "personalInfo" && (
          <div className="flex flex-col gap-16 ">
            {/* Profile Edit Management */}
            <ProfileEditManagement />

            {/* Profile Form */}
            
          </div>
        )}
        {activeSection === "security" && <div>
          <PasswordForm/>
       
          <PrivacyPolicyModal/>
          </div>}
      </div>
    </div>
  );
};

export default TeachersSettings;
