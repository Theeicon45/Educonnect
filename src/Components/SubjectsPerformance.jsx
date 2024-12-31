import ChartComponent from "./ChartComponent";


const subjectData = [
  { name: "Math", KJSEA: 4000, MOCK: 2400 },
  { name: "English", KJSEA: 3000, MOCK: 1398 },
  { name: "Kiswahili", KJSEA: 2000, MOCK: 9800 },
  { name: "Science", KJSEA: 2780, MOCK: 3908 },
  { name: "Social Studies", KJSEA: 1890, MOCK: 4800 },
  { name: "CRE", KJSEA: 2390, MOCK: 3800 },
  { name: "Agriculture and Nutrition", KJSEA: 3490, MOCK: 4300 },
  { name: "Creative Arts and Sports", KJSEA: 3490, MOCK: 4300 },
];

const SubjectsPerformance = () => {
  return (
    <ChartComponent
    title="Subject Performance"
    data={subjectData}
    xKey="name"
    barKeys={["KJSEA", "MOCK"]}
    colors={["#8884d8", "#82ca9d"]}
  />
  );
};

export default SubjectsPerformance;
