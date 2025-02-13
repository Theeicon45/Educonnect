import React, { useState } from "react";
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
  const [isFullAmountChecked, setIsFullAmountChecked] = useState(false);
  const [receiptData, setReceiptData] = useState(null); // Store receipt details

  // Handle input change
  const handleInputChange = (e) => {
    setPayments({
      ...payments,
      [selectedFeeType]: e.target.value,
    });
  };

  // Handle Full Amount Checkbox
  const handleFullAmountChange = () => {
    setIsFullAmountChecked(!isFullAmountChecked);
    if (!isFullAmountChecked) {
      setPayments({
        ...payments,
        [selectedFeeType]: remainingBalance,
      });
    } else {
      setPayments({
        ...payments,
        [selectedFeeType]: "",
      });
    }
  };

  // Function to send a payment request
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
        setIsModalVisible(true);


        const receiptResponse = await fetch(`http://localhost:3000/api/receipt`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // Store the receipt details
        const receiptData = await receiptResponse.json();
        if (receiptData.success) {
          // Store the receipt details
          setReceiptData({
            receiptNumber: receiptData.receiptNumber,
            referenceNumber: receiptData.referenceNumber,
            studentName: receiptData.studentName,
            schoolName: receiptData.schoolName,
            date: new Date().toLocaleDateString(),
            paymentMethod: selectedPaymentMethod,
            feeType: selectedFeeType,
            amountPaid,
            totalPaid: receiptData.totalPaid ,
            remainingBalance: data.Balance,
          });
          console.log(receiptData)
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
    <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-lg mx-auto">
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

      {remainingBalance !== null && (
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="fullAmount"
            checked={isFullAmountChecked}
            onChange={handleFullAmountChange}
            className="mr-2"
          />
          <label htmlFor="fullAmount" className="text-gray-700 font-semibold">
            Pay Full Amount ({remainingBalance.toLocaleString()})
          </label>
        </div>
      )}

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

      <Modal
        title="Payment Successful"
        visible={isModalVisible}
        onOk={handleCloseModal}
        onCancel={handleCloseModal}
        okText="Okay"
      >
        <p>{statusMessage}</p>
      </Modal>

      {receiptData && (
        <ReceiptDownload receiptData={receiptData} />
      )}
    </div>
  );
};

export default FeeViewer;
