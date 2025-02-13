import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

// Function to convert number to words
const numberToWords = (num) => {
  const a = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const b = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  if (num < 20) return a[num];
  if (num < 100)
    return b[Math.floor(num / 10)] + (num % 10 ? " " + a[num % 10] : "");
  if (num < 1000)
    return (
      a[Math.floor(num / 100)] +
      " Hundred" +
      (num % 100 ? " " + numberToWords(num % 100) : "")
    );
  if (num < 1000000)
    return (
      numberToWords(Math.floor(num / 1000)) +
      " Thousand" +
      (num % 1000 ? " " + numberToWords(num % 1000) : "")
    );
  return num;
};

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 30,
    fontFamily: "Helvetica",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    textDecoration: "underline",
  },
  section: {
    fontSize: 14,
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#D32F2F",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  column: {
    width: "48%",
  },
  divider: {
    borderBottom: "2 solid #000",
    marginVertical: 10,
  },
  thankYou: {
    textAlign: "center",
    fontSize: 14,
    fontStyle: "italic",
    marginTop: 10,
  },
});

// Receipt Document Component
const ReceiptDocument = ({ receiptData }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.heading}>Payment Receipt</Text>

      {/* Two-Column Layout */}
      <View style={styles.row}>
        {/* Left Column */}
        <View style={styles.column}>
          <Text style={styles.section}>
            <Text style={styles.label}>Reciept No:</Text>{" "}
            {receiptData.receiptNumber}
          </Text>
          <Text style={styles.section}>
            <Text style={styles.label}>Student Name:</Text>{" "}
            {receiptData.studentName}
          </Text>
          <Text style={styles.section}>
            <Text style={styles.label}>School:</Text> {receiptData.schoolName}
          </Text>
          <Text style={styles.section}>
            <Text style={styles.label}>Date:</Text> {receiptData.date}
          </Text>
          <Text style={styles.section}>
            <Text style={styles.label}>Payment Method:</Text>{" "}
            {receiptData.paymentMethod}
          </Text>
          <Text style={styles.section}>
            <Text style={styles.label}>Fee Type:</Text> {receiptData.feeType}
          </Text>
        </View>

        {/* Right Column */}
        <View style={styles.column}>
          <Text style={styles.section}>
            <Text style={styles.label}>Reference No:</Text>{" "}
            {receiptData.referenceNumber}
          </Text>

          <Text style={styles.section}>
            <Text style={styles.label}>Amount Paid:</Text>{" "}
            <Text style={styles.amount}>Ksh {receiptData.amountPaid}</Text>
          </Text>
          <Text style={styles.section}>
            <Text style={styles.label}>Amount in Words:</Text>{" "}
            {numberToWords(receiptData.amountPaid)} Shillings
          </Text>
          <Text style={styles.section}>
            <Text style={styles.label}>Total Paid:</Text>{" "}
            <Text style={styles.amount}>Ksh {receiptData.totalPaid}</Text>
          </Text>
          <Text style={styles.section}>
            <Text style={styles.label}>Outstanding Balance:</Text>{" "}
            <Text style={styles.amount}>
              Ksh {receiptData.remainingBalance}
            </Text>
          </Text>
        </View>
      </View>

      {/* Two Divider Lines */}
      <View style={styles.divider} />
      <View style={styles.divider} />

      {/* Thank You Note */}
      <Text style={styles.thankYou}>Thank you for your payment!</Text>
    </Page>
  </Document>
);

// ReceiptDownload Component (handles the PDF download)
const ReceiptDownload = ({ receiptData }) => (
  <div className="mt-4">
    <PDFDownloadLink
      document={<ReceiptDocument receiptData={receiptData} />}
      fileName="receipt.pdf"
    >
      {({ loading }) =>
        loading ? (
          "Loading document..."
        ) : (
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold">
            Download Receipt
          </button>
        )
      }
    </PDFDownloadLink>
  </div>
);

export default ReceiptDownload;
