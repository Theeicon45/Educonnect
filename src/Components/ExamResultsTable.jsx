import { useEffect, useState } from 'react';
import { Table, Button, Input, Select, message } from 'antd';

const { Search } = Input;
const { Option } = Select;

const ExamResultsTable = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterExamType, setFilterExamType] = useState('');
  const [filterSchool, setFilterSchool] = useState('');
  const [filterGrade, setFilterGrade] = useState('');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:3000/api/exam-results');
        if (!response.ok) {
          throw new Error('Failed to fetch exam results.');
        }
        const data = await response.json();
        const formattedData = data.map((result) => ({
          key: result.ResultID,
          studentName: result.StudentName,
          school: result.School,
          grade: result.Grade,
          examType: result.ExamType,
          score: result.Score,
          totalMarks: result.TotalMarks,
        }));
        setResults(formattedData);
      } catch (error) {
        console.error('Error fetching exam results:', error);
        message.error('Unable to load exam results.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const filteredResults = results
    .filter((result) =>
      filterExamType ? result.examType === filterExamType : true
    )
    .filter((result) =>
      filterSchool ? result.school === filterSchool : true
    )
    .filter((result) =>
      filterGrade ? result.grade === filterGrade : true
    )
    .filter((result) =>
      searchText
        ? result.studentName.toLowerCase().includes(searchText.toLowerCase())
        : true
    );

  const columns = [
    {
      title: 'Student Name',
      dataIndex: 'studentName',
      key: 'studentName',
      sorter: (a, b) => a.studentName.localeCompare(b.studentName),
    },
    {
      title: 'School',
      dataIndex: 'school',
      key: 'school',
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade',
    },
    {
      title: 'Exam Type',
      dataIndex: 'examType',
      key: 'examType',
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
      sorter: (a, b) => a.score - b.score,
    },
    {
      title: 'Total Marks',
      dataIndex: 'totalMarks',
      key: 'totalMarks',
      sorter: (a, b) => a.totalMarks - b.totalMarks,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button type="default" onClick={() => message.info(`Details for ${record.studentName}`)}>
          View Details
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Exam Results</h1>

      {/* Filters and Search */}
      <div className="mb-4 flex gap-4">
        <Select
          placeholder="Filter by Exam Type"
          onChange={(value) => setFilterExamType(value)}
          allowClear
        >
          <Option value="CAT">CAT</Option>
          <Option value="Main Exam">Main Exam</Option>
          <Option value="Mock Exam">Mock Exam</Option>
        </Select>

        <Select
          placeholder="Filter by School"
          onChange={(value) => setFilterSchool(value)}
          allowClear
        >
            <Option value="Terry and Kay Nairobi"> Nairobi</Option>
          <Option value="Terry and Kay Kisumu"> Kisumu</Option>
          <Option value="Terry and Kay Kitengela">T Kitengela</Option>
          <Option value="Terry and Kay Makueni"> Makueni</Option>
          <Option value="Terry and Kay Gatundu">Gatundu</Option>
        </Select>

        <Select
          placeholder="Filter by Grade"
          onChange={(value) => setFilterGrade(value)}
          allowClear
        >
          <Option value={1}> 1</Option>
          <Option value={2}> 2</Option>
          <Option value={3}> 3</Option>
          <Option value={4}> 4</Option>
          <Option value={5}> 5</Option>
          <Option value={6}> 6</Option>
          <Option value={7}> 7</Option>
          <Option value={8}> 8</Option>
          <Option value={9}> 9</Option>
          <Option value={10}> 10</Option>
          <Option value={11}> 11</Option>
          <Option value={12}> 12</Option>
        </Select>

        <Search
          placeholder="Search by student name"
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 200 }}
        />
      </div>

      <Table
        columns={columns}
        dataSource={filteredResults}
        loading={loading}
        pagination={{ pageSize: 4 }}
      />
    </div>
  );
};

export default ExamResultsTable;
