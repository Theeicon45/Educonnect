import React from "react";
import { Table } from "antd";

const PerformanceTable = ({ studentName, subjects }) => {
  const columns = [
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "CAT 1",
      dataIndex: "cat1",
      key: "cat1",
    },
    {
      title: "CAT 2",
      dataIndex: "cat2",
      key: "cat2",
    },
    {
      title: "End Term",
      dataIndex: "endTerm",
      key: "endTerm",
    },
    {
      title: "Final Score",
      dataIndex: "final_score",
      key: "final_score",
      
    },
    {
      title: "Final Grade",
      dataIndex: "final_grade",
      key: "final_grade",
      
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">{`${studentName}'s Performance`}</h2>
      <Table columns={columns} dataSource={subjects} pagination={false} />
    </div>
  );
};

export default PerformanceTable;
