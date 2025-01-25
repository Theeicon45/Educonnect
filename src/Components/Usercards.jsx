import React, { useEffect, useState } from 'react';
import { more } from "../Utils/images";
import Loader from 'react-loaders'; // Import the Loader

const Usercards = ({ type }) => {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    let url;

    // Determine which API endpoint to hit based on the 'type' prop
    switch (type) {
      case 'Student':
        url = 'http://localhost:3000/api/student-count';
        break;
      case 'Teacher':
        url = 'http://localhost:3000/api/teacher-count';
        break;
      case 'Parent':
        url = 'http://localhost:3000/api/parent-count';
        break;
      case 'Staff':
        url = 'http://localhost:3000/api/staff-count';
        break;
      default:
        console.error('Unknown type:', type);
        return;
    }

    // Fetch data from the appropriate API endpoint
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCount(data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false even if an error occurs
      });
  }, [type]);

  return (
    <div className={`rounded-2xl odd:bg-green-200 even:bg-purple-200 p-4 flex-1 min-w-[130px]`}>
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-cyan-400">2024/25</span>
        <img src={more} alt="More options" width={20} height={20} className="cursor-pointer" />
      </div>

      {/* Show loader while data is loading */}
      {loading ? (
        <div className="flex justify-center items-center h-24 loader-active">
          <Loader type="line-spin-fade-loader" />
        </div>
      ) : (
        <h1 className="text-2xl font-semibold my-4">{count}</h1>
      )}

      <h2 className="font-medium text-sm text-gray-500">
        {type ? `${type}` : "No Type Provided"}
      </h2>
    </div>
  );
};

export default Usercards;
