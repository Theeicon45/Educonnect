import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ResourceViewer from "../Components/ResourceViewer"
import UploadResource from "../Components/UploadResource"
import UploadSlider from "../Components/UploadSlider"


const ResourceSharing = () => {
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
      <div className=" relative flex items-center h-[400px] gap-8 p-4">
        {/* Left */}
          <div className=" relative flex gap-8  items-end w-1/2 h-full bg-purple-100 rounded-lg over">
          <UploadSlider/>
         <div className="absolute">
         <UploadResource />
         </div>
          </div>
          {/* Right */}
          <div className="w-1/2 h-full bg-white rounded-lg">
          <ResourceViewer/>
          </div>
      </div>
    </div>
  )
}

export default ResourceSharing
