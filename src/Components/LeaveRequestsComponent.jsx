"use client";

import { useEffect, useState } from "react";
import { moredark } from "../Utils/images";

const LeaveRequestsComponent = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch("http://localhost:3000/admin/leave-requests", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setLeaveRequests(data);
      } else {
        console.error("Failed to fetch requests:", data.message);
      }
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateLeaveStatus = async (id, status) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:3000/admin/leave-requests/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();
      if (response.ok) {
        setLeaveRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.id === id ? { ...request, status } : request
          )
        );
      } else {
        console.error("Failed to update request:", data.message);
      }
    } catch (error) {
      console.error("Error updating leave request:", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-4">Leave Requests</h1>
        <img src={moredark} alt="" width={20} height={20} />
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading leave requests...</p>
      ) : leaveRequests.length === 0 ? (
        <p className="text-center text-gray-500">No leave requests found.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {leaveRequests.map((request) => (
            <div
              className="p-5 rounded-md border-2 shadow-md border-gray-100 border-t-4 odd:border-t-purple-300 even:border-t-green-300"
              key={request.id}
            >
              <div className="flex items-center justify-between">
                <h1 className="font-semibold text-gray-600">{request.teacher}</h1>
                <span className="text-xs text-gray-300">
                  {new Date(request.applied_at).toLocaleDateString()}
                </span>
              </div>
              <p className="m-2 text-gray-400 text-sm">{request.reason}</p>
              <span
                className={`text-xs font-semibold p-2 rounded-md border-2 border-gray-100 ${
                  request.status === "Pending"
                    ? "border-t-yellow-500 text-yellow-500"
                    : request.status === "Approved"
                    ? "border-t-green-500 text-green-500"
                    : "border-t-Red-500 text-Red-500"
                }`}
              >
                {request.status}
              </span>

              {request.status === "Pending" && (
                <div className="mt-3 flex gap-2">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded-md"
                    onClick={() => updateLeaveStatus(request.id, "Approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-Red-500 text-white px-3 py-1 rounded-md"
                    onClick={() => updateLeaveStatus(request.id, "Rejected")}
                  >
                    Decline
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeaveRequestsComponent;
