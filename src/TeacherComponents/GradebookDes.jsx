import { useState, useEffect } from "react";
import { Table, InputNumber, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const GradebookDes = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/api/teacher/subjects", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("Fetched subjects:", data); // Log the data here
        setSubjects(data);
      } )
      .catch((err) => console.error("Error fetching subjects:", err));
  }, []);

  const fetchStudents = async (subject, grade_level) => {
    setSelectedSubject(`${subject} (Grade ${grade_level})`);
  
    try {
      const token = localStorage.getItem("token");
  
      // 🔹 Fetch students first
      const studentResponse = await fetch(
        `http://localhost:3000/api/fetch/students?subject=${subject}&grade_level=${grade_level}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      if (!studentResponse.ok) throw new Error("Failed to fetch students");
  
      const studentsData = await studentResponse.json();
    //   console.log("Fetched Students:", studentsData); // ✅ Log students
  
      // 🔹 Fetch grades for each student in parallel
      const studentGradesPromises = studentsData.map(async (student) => {
        const gradeResponse = await fetch(
          `http://localhost:3000/grades/fetch/${student.Student_ID}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
  
        if (!gradeResponse.ok) {
          console.warn(`⚠️ Failed to fetch grades for student ${student.Student_ID}`);
          return { ...student, cat1: null, cat2: null, endterm_exam: null };
        }
  
        const grades = await gradeResponse.json();
        // console.log(`✅ Grades for student ${student.Student_ID}:`, grades);
  
        // ✅ **Find the correct grade entry for the selected subject**
        const studentGrade = grades.find((g) => g.subject === subject);
  
        if (!studentGrade) {
          console.warn(`⚠️ No matching grades found for '${subject}'`);
          return { ...student, cat1: null, cat2: null, endterm_exam: null };
        }
  
        // Merge student data with fetched grades
        return {
          ...student,
          cat1: studentGrade.cat1 || null,
          cat2: studentGrade.cat2 || null,
          endterm_exam: studentGrade.endterm_exam || null,
        };
      });
  
      // 🔹 Wait for all grade fetches to complete
      const studentsWithGrades = await Promise.all(studentGradesPromises);
      setStudents(studentsWithGrades);
  
      // 🔹 Initialize grades state correctly
      const initialGrades = {};
      studentsWithGrades.forEach(({ Student_ID, cat1, cat2, endterm_exam }) => {
        initialGrades[Student_ID] = { cat1, cat2, endterm_exam };
      });
  
    //   console.log("🔹 Final Processed Students with Grades:", studentsWithGrades);
  
      setGrades(initialGrades);
    } catch (error) {
    //   console.error("❌ Error fetching students:", error);
    }
  };
  


  

  const handleGradeChange = (studentId, key, value) => {
    setGrades((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [key]: value,
      },
    }));
  };

  const calculateFinalGrade = ({ cat1, cat2, endterm_exam }) => {
    if (cat1 !== undefined && cat2 !== undefined && endterm_exam !== undefined) {
      return (cat1 * 0.2 + cat2 * 0.2 + endterm_exam * 0.6).toFixed(2);
    }
    return "-";
  };

  const submitGrades = async () => {
    if (!selectedSubject) {
      message.error("Please select a subject first!");
      return;
    }

    const formattedGrades = Object.keys(grades).map((studentId) => ({
      student_id: parseInt(studentId),
      cat1: grades[studentId].cat1 || 0,
      cat2: grades[studentId].cat2 || 0,
      endterm_exam: grades[studentId].endterm_exam || 0,
    }));

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/grades", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          subject: selectedSubject,
          term: "Term 1",
          year: new Date().getFullYear(),
          grades: formattedGrades,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        message.success(data.message);
      } else {
        message.error("Error submitting grades");
      }
    } catch (error) {
      message.error("Error submitting grades:", error);
    }
  };

  const columns = [
    { title: "Student Name", dataIndex: "First_Name", key: "First_Name" },
    {
      title: "CAT 1 (20%)",
      dataIndex: "cat1",
      key: "cat1",
      render: (_, record) => (
        <InputNumber
          min={0}
          max={100}
          value={grades[record.Student_ID]?.cat1}
          onChange={(value) => handleGradeChange(record.Student_ID, "cat1", value)}
        />
      ),
    },
    {
      title: "CAT 2 (20%)",
      dataIndex: "cat2",
      key: "cat2",
      render: (_, record) => (
        <InputNumber
          min={0}
          max={100}
          value={grades[record.Student_ID]?.cat2}
          onChange={(value) => handleGradeChange(record.Student_ID, "cat2", value)}
        />
      ),
    },
    {
      title: "Endterm (60%)",
      dataIndex: "endterm_exam",
      key: "endterm_exam",
      render: (_, record) => (
        <InputNumber
          min={0}
          max={100}
          value={grades[record.Student_ID]?.endterm_exam}
          onChange={(value) => handleGradeChange(record.Student_ID, "endterm_exam", value)}
        />
      ),
    },
    {
      title: "Final Grade",
      dataIndex: "final_score",
      key: "final_score",
      render: (_, record) => calculateFinalGrade(grades[record.Student_ID] || {}),
    },
  ];

  const uploadProps = {
    name: "file",
    action: "http://localhost:3000/grades/upload",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    onChange(info) {
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Gradebook</h2>

      <div className="mb-4">
  {subjects.map((subject) => (
    <Button  
      key={`${subject.subject}-${subject.grade_level}`}  
      className="mr-2" 
      onClick={() => fetchStudents(subject.subject, subject.grade_level)}
    >
      {subject.subject} 
      <div>Grade: {subject.grade_level}</div>
    </Button>
  ))}
</div>


      {selectedSubject && (
        <Table dataSource={students} columns={columns} rowKey="Student_ID" pagination={false} />
      )}

      <div className="mt-4">
        <Upload {...uploadProps}>
          {/* <Button icon={<UploadOutlined />}>Upload CSV</Button> */}
        </Upload>
        <Button type="primary" className="ml-2" onClick={submitGrades}>
          Submit Grades
        </Button>
      </div>
    </div>
  );
};

export default GradebookDes;
