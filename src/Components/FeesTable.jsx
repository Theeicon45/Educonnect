import { useEffect, useState } from 'react';
import { Table, Button, Input, Select, message } from 'antd';

const { Search } = Input;
const { Option } = Select;

const FeesTable = () => {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchFees = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:3000/api/fees');
        if (!response.ok) {
          throw new Error('Failed to fetch fees data.');
        }
        const data = await response.json();
        console.log(data);
        const formattedData = data.map((fee) => ({
          key: fee.FeeID,
          studentName: fee.StudentName,
          classGrade: fee.ClassGrade,
          feeType: fee.FeeType,
          amountDue: fee.AmountDue,
          amountPaid: fee.AmountPaid,
          balance: fee.Balance,
          paymentStatus: fee.PaymentStatus || 'Unpaid',
          paymentMethod: fee.PaymentMethod,
          dueDate: fee.DueDate,
          remarks: fee.Remarks,
        }));
        setFees(formattedData);
      } catch (error) {
        console.error('Error fetching fees:', error);
        message.error('Unable to load fee data.');
      } finally {
        setLoading(false);
      }
    };

    fetchFees();
  }, []);

  const handleStatusUpdate = async (key, newStatus) => {
    try {
      const response = await fetch(`http://localhost:3000/api/updateFeeStatus/${key}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentStatus: newStatus }),
      });

      const result = await response.json();

      if (response.ok) {
        message.success(result.message || 'Status updated successfully.');
        const updatedFees = fees.map((fee) =>
          fee.key === key ? { ...fee, paymentStatus: newStatus } : fee
        );
        setFees(updatedFees);
      } else {
        throw new Error(result.message || 'Failed to update status.');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      message.error('Unable to update fee status.');
    }
  };

  const handleReminder = (key) => {
    message.info(`Reminder sent for Fee ID: ${key}`);
    // Implement actual reminder logic here
  };

  const filteredFees = fees
    .filter((fee) =>
      filterStatus ? fee.paymentStatus === filterStatus : true
    )
    .filter((fee) =>
      searchText
        ? fee.studentName.toLowerCase().includes(searchText.toLowerCase()) ||
          fee.classGrade.toLowerCase().includes(searchText.toLowerCase())
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
      title: 'Class/Grade',
      dataIndex: 'classGrade',
      key: 'classGrade',
    },
    {
      title: 'Fee Type',
      dataIndex: 'feeType',
      key: 'feeType',
    },
    {
      title: 'Amount Due',
      dataIndex: 'amountDue',
      key: 'amountDue',
      sorter: (a, b) => a.amountDue - b.amountDue,
      render: (amount) => `$${amount}`,
    },
    {
      title: 'Amount Paid',
      dataIndex: 'amountPaid',
      key: 'amountPaid',
      sorter: (a, b) => a.amountPaid - b.amountPaid,
      render: (amount) => `$${amount}`,
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      sorter: (a, b) => a.balance - b.balance,
      render: (balance) => `$${balance}`,
    },
    {
        title: 'Payment Status',
        dataIndex: 'paymentStatus',
        key: 'paymentStatus',
        render: (text, record) => (
          <div className="grid grid-cols-3 gap-12 items-center">
            {/* Status Text */}
            <div className="flex justify-center">
              <span>{text}</span>
            </div>
            
            {/* Mark as Paid Button */}
            <div className="flex justify-center">
              <Button
                type="primary"
                onClick={() => handleStatusUpdate(record.key, 'Paid')}
                disabled={text === 'Paid'}
                className="w-auto"
              >
               Paid
              </Button>
            </div>
      
            {/* Mark as Unpaid Button */}
            <div className="flex justify-center">
              <Button
                type="danger"
                onClick={() => handleStatusUpdate(record.key, 'Unpaid')}
                disabled={text === 'Unpaid'}
                className="w-auto bg-purple-500 text-white"
              >
               Unpaid
              </Button>
            </div>
          </div>
        ),
      },
      
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button type="default" onClick={() => handleReminder(record.key)}>
          Send Reminder
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Fees Management</h1>

      {/* Filters and Search */}
      <div className="mb-4 flex gap-4">
        <Select
          placeholder="Filter by Status"
          onChange={(value) => setFilterStatus(value)}
          allowClear
        >
          <Option value="Paid">Paid</Option>
          <Option value="Unpaid">Unpaid</Option>
        </Select>

        <Search
          placeholder="Search by name or grade"
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 200 }}
        />
      </div>

      <Table
        columns={columns}
        dataSource={filteredFees}
        loading={loading}
        expandable={{
          expandedRowRender: (record) => (
            <div>
              <p><b>Payment Method:</b> {record.paymentMethod}</p>
              <p><b>Remarks:</b> {record.remarks}</p>
            </div>
          ),
        }}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default FeesTable;
