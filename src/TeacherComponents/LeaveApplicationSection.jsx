import { useState, useEffect } from "react";

const LeaveApplicationSection = () => {
  const [leaveType, setLeaveType] = useState("Sick Leave");
  const [reason, setReason] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previousApplications, setPreviousApplications] = useState([]);

  // Fetch previous leave applications
  useEffect(() => {
    const fetchApplications = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(
          "http://localhost:3000/leave-applications",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        console.log("leave data", data);
        if (response.ok) {
          setPreviousApplications(data);
        } else {
          console.error("Failed to fetch applications:", data.message);
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  const handleSubmit = async () => {
    if (!reason.trim()) {
      setModalMessage("Please enter a reason.");
      setIsModalOpen(true);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setModalMessage("User not authenticated. Please log in.");
      setIsModalOpen(true);
      return;
    }

    const requestBody = {
      leave_type: leaveType,
      reason: reason,
    };

    try {
      const response = await fetch("http://localhost:3000/apply-leave", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (response.ok) {
        setModalMessage("Leave application submitted successfully!");
        setReason("");
        setPreviousApplications((prev) => [
          {
            leave_type: leaveType,
            reason,
            status: "Pending",
            created_at: new Date().toISOString(),
          },
          ...prev,
        ]);
      } else {
        setModalMessage(data.message || "Failed to submit leave request.");
      }
    } catch (error) {
      setModalMessage("Error submitting request. Try again later.");
      console.error("Fetch error:", error);
    }

    setIsModalOpen(true);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Leave Applications</h2>
      <select
        className="border p-2 w-full rounded mb-2"
        value={leaveType}
        onChange={(e) => setLeaveType(e.target.value)}
      >
        <option>Sick Leave</option>
        <option>Vacation Leave</option>
        <option>Personal Leave</option>
        <option>Emergency Leave</option>
        <option>Maternity/Paternity Leave</option>
        <option>Study Leave</option>
      </select>
      <textarea
        className="border p-2 w-full rounded mb-2"
        placeholder="Enter reason..."
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      ></textarea>
      <button
        className="w-[200px] bg-blue-500 text-white p-2 rounded-md"
        onClick={handleSubmit}
      >
        Submit Leave Request
      </button>

      {/* Modal for messages */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg">{modalMessage}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setIsModalOpen(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Previous Applications */}
      <h3 className="text-lg font-semibold mt-4">Previous Applications</h3>
      {previousApplications.length === 0 ? (
        <p className="text-gray-500">No leave applications submitted yet.</p>
      ) : (
        previousApplications.map((app, index) => (
          <div key={index} className="p-3 border rounded-md mb-2">
            <p>
              <strong>{app.leave_type}</strong>
            </p>
            <p className="text-sm text-gray-600">{app.reason}</p>
            <p className="mb-4 text-xs text-gray-400">
              {new Date(app.applied_at).toLocaleString()}
            </p>

            <span
              className={`text-xs font-semibold  p-2 rounded-md border-2 border-gray-100 ${
                app.status === "Pending"
                  ? "border-t-yellow-500 text-yellow-500"
                  : app.status === "Approved"
                  ? "border-t-green-500 text-green-500"
                  : "border-t-Red-500 text-Red-500"
              }`}
            >
              {app.status}
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default LeaveApplicationSection;
