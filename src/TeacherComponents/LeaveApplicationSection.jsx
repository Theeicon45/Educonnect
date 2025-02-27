export default function LeaveApplicationSection() {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-2">Leave Applications</h2>
        <select className="border p-2 w-full rounded mb-2">
          <option>Sick Leave</option>
          <option>Vacation Leave</option>
          <option>Personal Leave</option>
          <option>Emergency Leave</option>
          <option>Maternity/Paternity Leave</option>
          <option>Study Leave</option>
        </select>
        <textarea className="border p-2 w-full rounded mb-2" placeholder="Enter reason..."></textarea>
        <button className="w-full bg-blue-500 text-white p-2 rounded-md">Submit Leave Request</button>
  
        {/* Previous Applications */}
        <h3 className="text-lg font-semibold mt-4">Previous Applications</h3>
        <div className="p-3 border rounded-md mb-2">Sick Leave - Pending</div>
        <div className="p-3 border rounded-md mb-2">Vacation Leave - Approved</div>
      </div>
    );
  }
  