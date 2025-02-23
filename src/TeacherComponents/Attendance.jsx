import React, { useEffect, useState } from "react";
import { Card, Modal, Checkbox, Button } from "antd";

const Attendance = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/teacher/subjects", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        console.log('masomo',data)
        setSubjects(data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  const openModal = async (subject) => {
    setSelectedSubject(subject);
    setIsModalOpen(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/api/teacher/students?subject=${subject.subject}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      console.log('majina ya watoi',data)
      setStudents(data);

      // Initialize attendance state
      const initialAttendance = data.reduce((acc, student) => {
        acc[student.Student_ID] = true; // Default to present
        return acc;
      }, {});
      setAttendance(initialAttendance);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleAttendanceChange = (studentId) => {
    setAttendance({ ...attendance, [studentId]: !attendance[studentId] });
  };

  const submitAttendance = async () => {
    if (!selectedSubject) return;
  
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/teacher/mark-attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          subject: selectedSubject.subject, 
          start_time: selectedSubject.start_time, 
          end_time: selectedSubject.end_time, 
          attendance 
        }),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert("Attendance marked successfully!");
        setIsModalOpen(false);
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error("Error submitting attendance:", error);
    }
  };
  

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Mark Attendance</h2>
      <div className="grid grid-cols-3 gap-4">
        {subjects.map((subject) => (
          <Card
            key={subject.id}
            title={subject.subject}
            className="cursor-pointer hover:shadow-lg h-[250px] even:bg-green-100 odd:bg-purple-100"
            onClick={() => openModal(subject)}
          >
            
           <h2 className="font-semibold text-base">   Grade: {subject.grade_level}</h2>
           <div className="flex flex-row justify-between p-2 mt-12">
           <p className="text-gray-400 font-semibold text-xs ">From: {subject.start_time}</p>
           <p className="text-gray-400 font-semibold text-xs ">To: {subject.end_time}</p>
           </div>
          </Card>
        ))}
      </div>

      <Modal
        title={`Mark Attendance - ${selectedSubject?.name}`}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={submitAttendance}>
            Submit Attendance
          </Button>,
        ]}
      >
        {students.length > 0 ? (
          students.map((student) => (
            <div key={student.Student_ID} className="flex items-center mb-2">
              <Checkbox
                checked={attendance[student.Student_ID]}
                onChange={() => handleAttendanceChange(student.Student_ID)}
              >
                {student.First_Name} {student.Second_Name}
              </Checkbox>
            </div>
          ))
        ) : (
          <p>No students found for this subject.</p>
        )}
      </Modal>
    </div>
  );
};

export default Attendance;
