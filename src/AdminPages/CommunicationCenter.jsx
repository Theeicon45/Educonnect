import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AnnouncementManager from "../Components/AnnouncementManager";
import DiscussionForums from "../Components/DiscussionForums";
import EventManager from "../Components/EventManager";
import CommunicationSec from "../Components/CommunicationSec";

const CommunicationCenter = () => {
   const navigate = useNavigate();

   useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      navigate("/login");
      return;
    }
  
    try {
      const decodedToken = jwtDecode(token); // Decode the token
      if (decodedToken.role.toLowerCase() !== "admin") {
        navigate("/login"); // Redirect to login if role is not Admin
      }
    } catch (err) {
      console.error("Failed to decode token:", err);
      navigate("/login");
    }
  }, [navigate]);
  
  return (
    <div className="">
      <div className=" p-4 flex items-center w-full">
        {/*Left */}
        <div className=" w-1/2">
          <AnnouncementManager />
        </div>
        {/* Right */}
        <div className="w-1/2">
          <EventManager />
        </div>
      </div>
      <CommunicationSec/>
      <DiscussionForums/>
    </div>
  );
};

export default CommunicationCenter;
