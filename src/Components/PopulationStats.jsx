import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa6";
import { moredark, User } from "../Utils/images";

const PopulationStats = ({ type }) => {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl;
        switch (type) {
          case "Admins":
            apiUrl = "http://localhost:3000/api/admin-count";
            break;
          case "Students":
            apiUrl = "http://localhost:3000/api/student-counter";
            break;
          case "Teachers":
            apiUrl = "http://localhost:3000/api/teacher-counter";
            break;
          case "Non Teaching Staff":
            apiUrl = "http://localhost:3000/api/non-teaching-staff-count";
            break;
          default:
            console.error(`Invalid type provided: ${type}`);
            return;
        }

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${type} data`);
        }
        const result = await response.json();
        // console.log(result)
        setCount(result.count);
      } catch (error) {
        console.error(`Error fetching ${type} data:`, error);
      }
    };

    fetchData();
  }, [type]);

  if (count === null) {
    return (
      <div className="mt-4 flex flex-col gap-4 rounded-2xl p-4 w-[200px] h-[250px] bg-gray-200">
        Loading...
      </div>
    );
  }

  return (
    <div className="mt-4 odd:bg-green-100 even:bg-purple-100 flex flex-col gap-4 rounded-2xl p-4 w-[200px] h-[250px]">
      {/* Top */}
      <div className="flex items-center justify-between">
        <img src={User} alt="user" width={20} height={20} />
        <img src={moredark} alt="more" width={20} height={20} />
      </div>
      <h1 className="text-2xl font-bold mt-12">{count}</h1>
      <h2 className="font-medium text-sm mb-4">{type || "No Type Provided"}</h2>

      {/* Growth/Drop */}
      <div className="mt-2 flex gap-8 text-green-500 text-xs">
        <FaArrowUp />
        {/* Temporarily hardcoded growth until API is updated */}
        {"N/A"}
      </div>
    </div>
  );
};

export default PopulationStats;
