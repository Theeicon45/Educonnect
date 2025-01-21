import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileView from "../Components/ProfileView";


const Settings = () => {
   const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decodedToken = jwtDecode(token); // Decode the token
      if (decodedToken.role !== "Admin") {
        navigate("/login"); // Redirect to login if role is not Admin
      }
    } catch (err) {
      console.error("Failed to decode token:", err);
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div className="flex gap-4 p-4 md:flex-row mt-4">
      {/* Left */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
      <ProfileView/>
      </div>
      {/* Right */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">r</div>
    </div>
  )
}

export default Settings
