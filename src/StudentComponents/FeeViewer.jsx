import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import ReceiptDownload from "./RecieptDocument"; // Import the ReceiptDownload component

const FeeViewer = () => {
  const fees = [
    { name: "Tuition Fees" },
    { name: "Sports Fees" },
    { name: "Administrative Fees" },
    { name: "Laboratory Fees" },
    { name: "Technology Fees" },
    { name: "Library Fees" },
    { name: "Accommodation Fees" },
    { name: "Meal Fees" },
  ];

  const paymentMethods = ["Bank Transfer", "Credit Card", "Mpesa"];

  const [payments, setPayments] = useState({});
  const [selectedFeeType, setSelectedFeeType] = useState(fees[0].name);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethods[0]);
  const [statusMessage, setStatusMessage] = useState("");
  const [remainingBalance, setRemainingBalance] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const [allReceipts, setAllReceipts] = useState([]);

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const receiptResponse = await fetch("http://localhost:3000/api/receipt", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const receiptData = await receiptResponse.json();
        // console.log("Receipt data", receiptData);

        if (receiptData.success) {
          // Attach studentName & schoolName to each receipt
          const updatedReceipts = receiptData.receipts.map((receipt) => ({
            ...receipt,
            studentName: receiptData.studentName,
            schoolName: receiptData.schoolName,
            totalPaid: receiptData.totalPaid,

          }));

          setAllReceipts(updatedReceipts);
        }
      } catch (error) {
        console.error("Error fetching receipts:", error);
      }
    };

    fetchReceipts();
  }, []);

  const handleInputChange = (e) => {
    setPayments({
      ...payments,
      [selectedFeeType]: e.target.value,
    });
  };

  const processPayment = async () => {
    const amountPaid = parseFloat(payments[selectedFeeType]);

    if (!amountPaid || amountPaid <= 0) {
      setStatusMessage(`Enter a valid amount for ${selectedFeeType}.`);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          FeeType: selectedFeeType,
          AmountPaid: amountPaid,
          PaymentMethod: selectedPaymentMethod,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setRemainingBalance(data.Balance);
        setStatusMessage(`Payment for ${selectedFeeType} successful!`);
        setPayments({ ...payments, [selectedFeeType]: "" });

        // Fetch the latest receipt after payment
        const receiptResponse = await fetch("http://localhost:3000/api/receipt", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const receiptData = await receiptResponse.json();

        if (receiptData.success && receiptData.receipts.length > 0) {
          const latestReceipt = receiptData.receipts[0]; // Get the latest receipt

          const newReceipt = {
            receiptNumber: latestReceipt.receiptNumber,
            referenceNumber: latestReceipt.referenceNumber,
            studentName: receiptData.studentName,
            schoolName: receiptData.schoolName,
            date: new Date(latestReceipt.date).toLocaleDateString(),
            paymentMethod: latestReceipt.paymentMethod,
            feeType: latestReceipt.feeType,
            totalPaid: receiptData.totalPaid,
            amountPaid: latestReceipt.amountPaid,
            remainingBalance: latestReceipt.remainingBalance,
          };

          // Check if the new receipt is already in the list by receiptNumber to avoid duplicates
          setAllReceipts((prevReceipts) => {
            const isDuplicate = prevReceipts.some(
              (receipt) => receipt.receiptNumber === newReceipt.receiptNumber
            );
            if (isDuplicate) {
              console.log("Duplicate receipt detected, skipping...");
              return prevReceipts; // No need to add this receipt if it's a duplicate
            }
            return [newReceipt, ...prevReceipts]; // Add new receipt to the state
          });

          setReceiptData(newReceipt);
          setIsModalVisible(true); // Open modal after setting receipt data
        } else {
          setStatusMessage("Failed to fetch receipt data.");
        }
      } else {
        setStatusMessage(data.message || "Payment failed. Try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setStatusMessage("Server error. Please try later.");
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="flex flex-col md:flex-row w-full p-6 bg-white shadow-lg rounded-lg">
      {/* Left Section - Fee Payment Form */}
      <div className="w-full md:w-1/2 p-4">
        <h1 className="font-bold text-2xl mb-4 text-center">Fee Payment</h1>

        {remainingBalance !== null && (
          <div className="mb-4 p-2 text-center text-white bg-blue-500 rounded">
            Remaining Balance: Ksh {remainingBalance.toLocaleString()}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Select Fee Type:</label>
          <select
            value={selectedFeeType}
            onChange={(e) => setSelectedFeeType(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            {fees.map((fee, index) => (
              <option key={index} value={fee.name}>
                {fee.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Select Payment Method:</label>
          <select
            value={selectedPaymentMethod}
            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            {paymentMethods.map((method, index) => (
              <option key={index} value={method}>
                {method}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Enter Amount:</label>
          <input
            type="number"
            placeholder="Enter amount"
            value={payments[selectedFeeType] || ""}
            onChange={handleInputChange}
            className="w-full px-2 py-1 border rounded-lg text-right"
          />
        </div>

        <button
          onClick={processPayment}
          className="bg-blue-500 px-6 py-2 rounded-lg text-white font-semibold w-full"
        >
          Pay
        </button>
      </div>

      {/* Right Section - Display Previous Receipts */}
      <div className="w-full md:w-1/2 p-4 border-l">
        <h2 className="font-bold text-lg mb-4">Previous Receipts</h2>
        <div className="overflow-y-auto h-96">
          {allReceipts.length === 0 ? (
            <p className="text-gray-500">No receipts available.</p>
          ) : (
            allReceipts.map((receipt, index) => (
              <div key={index} className="mb-4 p-3 border rounded bg-gray-100">
                <p><strong>Receipt #:</strong> {receipt.receiptNumber}</p>
                <button className="mt-2 bg-green-500 text-white px-4 py-1 rounded" onClick={() => {
                  setReceiptData(receipt);
                  setIsModalVisible(true);
                }}>
                  View Receipt
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Receipt Modal */}
      <Modal title="Receipt Details" visible={isModalVisible} onCancel={handleCloseModal} footer={null}>
        {receiptData && <ReceiptDownload receiptData={receiptData} />}
      </Modal>
    </div>
  );
};

export default FeeViewer;
