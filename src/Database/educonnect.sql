-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 02, 2024 at 04:07 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `educonnect`
--

-- --------------------------------------------------------

--
-- Table structure for table `application`
--

CREATE TABLE `application` (
  `Application_ID` int(20) NOT NULL,
  `Student_ID` int(20) NOT NULL,
  `School_ID` int(20) NOT NULL,
  `Applicant_Name` varchar(100) NOT NULL,
  `Date_of_Birth` date NOT NULL,
  `Gender` varchar(100) NOT NULL,
  `Grade_Level_Applied` int(20) NOT NULL,
  `Guardian_Name` varchar(100) NOT NULL,
  `Guardian_Contact` int(100) NOT NULL,
  `Previous_School` varchar(100) NOT NULL,
  `Application_Date` date NOT NULL,
  `Status` tinyint(1) NOT NULL,
  `Admission_Date` date NOT NULL,
  `Remarks` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `class`
--

CREATE TABLE `class` (
  `Class_ID` int(20) NOT NULL,
  `Class_Name` varchar(100) NOT NULL,
  `Year_Level` int(20) NOT NULL,
  `School_ID` int(20) NOT NULL,
  `Teacher_ID` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `finance_record`
--

CREATE TABLE `finance_record` (
  `Finance_Record_ID` int(20) NOT NULL,
  `Student_ID` int(20) NOT NULL,
  `School_ID` int(20) NOT NULL,
  `Term` int(20) NOT NULL,
  `Fee_Amount` int(100) NOT NULL,
  `Amount_Paid` int(100) NOT NULL,
  `Outstanding_Balance` int(100) NOT NULL,
  `Payment_Date` date NOT NULL,
  `Payment_Status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `grades`
--

CREATE TABLE `grades` (
  `Grade_ID` int(20) NOT NULL,
  `Student_ID` int(20) NOT NULL,
  `Term_Record_ID` int(20) NOT NULL,
  `Subject_ID` int(20) NOT NULL,
  `Grade` varchar(20) NOT NULL,
  `Exam_Type` varchar(50) NOT NULL,
  `Comments` varchar(1000) NOT NULL,
  `Grade_Date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `school`
--

CREATE TABLE `school` (
  `School_ID` int(20) NOT NULL,
  `School_Name` varchar(100) NOT NULL,
  `Location` varchar(100) NOT NULL,
  `Address` varchar(100) NOT NULL,
  `Contact_Number` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Principal_Name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student_record`
--

CREATE TABLE `student_record` (
  `Student_Record_ID` int(20) NOT NULL,
  `Student_ID` int(20) NOT NULL,
  `School_ID` int(20) NOT NULL,
  `Full_Name` varchar(100) NOT NULL,
  `Enrollment_Year` year(4) NOT NULL,
  `Year_Level` int(20) NOT NULL,
  `Term_Average_Grade` varchar(50) NOT NULL,
  `Guardian_ID` int(20) NOT NULL,
  `Status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE `subject` (
  `Subject_ID` int(20) NOT NULL,
  `Subject_Name` varchar(20) NOT NULL,
  `Subject_Code` varchar(100) NOT NULL,
  `Year_Level` int(100) NOT NULL,
  `Term` int(20) NOT NULL,
  `Teacher_ID` int(20) NOT NULL,
  `School_ID` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `teacher`
--

CREATE TABLE `teacher` (
  `Teacher_ID` int(20) NOT NULL,
  `First_Name` varchar(100) NOT NULL,
  `Last_Name` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Phone_Number` varchar(20) NOT NULL,
  `Subject_Specialty` varchar(100) NOT NULL,
  `School_ID` int(20) NOT NULL,
  `Employment_Status` varchar(50) NOT NULL,
  `Hire_Date` date NOT NULL,
  `Status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `term_record`
--

CREATE TABLE `term_record` (
  `Term_Record_ID` int(20) NOT NULL,
  `Student_ID` int(20) NOT NULL,
  `Year_Level` year(4) NOT NULL,
  `Term` int(50) NOT NULL,
  `Term_Start_Date` date NOT NULL,
  `Term_End_Date` date NOT NULL,
  `Term_Average_Grade` varchar(50) NOT NULL,
  `Term_Remarks` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_credentials`
--

CREATE TABLE `user_credentials` (
  `User_ID` varchar(20) NOT NULL,
  `Username` varchar(100) NOT NULL,
  `Password_Hash` varchar(255) NOT NULL,
  `Role` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `application`
--
ALTER TABLE `application`
  ADD PRIMARY KEY (`Application_ID`),
  ADD KEY `School_ID` (`School_ID`);

--
-- Indexes for table `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`Class_ID`),
  ADD KEY `Teacher_ID` (`Teacher_ID`);

--
-- Indexes for table `finance_record`
--
ALTER TABLE `finance_record`
  ADD PRIMARY KEY (`Finance_Record_ID`),
  ADD KEY `Student_ID` (`Student_ID`),
  ADD KEY `School_ID` (`School_ID`);

--
-- Indexes for table `grades`
--
ALTER TABLE `grades`
  ADD PRIMARY KEY (`Grade_ID`),
  ADD KEY `Student_ID` (`Student_ID`);

--
-- Indexes for table `school`
--
ALTER TABLE `school`
  ADD PRIMARY KEY (`School_ID`);

--
-- Indexes for table `student_record`
--
ALTER TABLE `student_record`
  ADD PRIMARY KEY (`Student_Record_ID`),
  ADD UNIQUE KEY `student-id` (`Student_ID`),
  ADD KEY `school-id` (`School_ID`);

--
-- Indexes for table `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`Subject_ID`),
  ADD KEY `School_ID` (`School_ID`),
  ADD KEY `Teacher_ID` (`Teacher_ID`);

--
-- Indexes for table `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`Teacher_ID`),
  ADD KEY `School_ID` (`School_ID`);

--
-- Indexes for table `term_record`
--
ALTER TABLE `term_record`
  ADD PRIMARY KEY (`Term_Record_ID`),
  ADD KEY `Student_ID` (`Student_ID`);

--
-- Indexes for table `user_credentials`
--
ALTER TABLE `user_credentials`
  ADD PRIMARY KEY (`User_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `application`
--
ALTER TABLE `application`
  MODIFY `Application_ID` int(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `student_record`
--
ALTER TABLE `student_record`
  MODIFY `Student_Record_ID` int(20) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `application`
--
ALTER TABLE `application`
  ADD CONSTRAINT `application_ibfk_1` FOREIGN KEY (`School_ID`) REFERENCES `school` (`School_ID`);

--
-- Constraints for table `class`
--
ALTER TABLE `class`
  ADD CONSTRAINT `class_ibfk_1` FOREIGN KEY (`Teacher_ID`) REFERENCES `teacher` (`Teacher_ID`);

--
-- Constraints for table `finance_record`
--
ALTER TABLE `finance_record`
  ADD CONSTRAINT `finance_record_ibfk_1` FOREIGN KEY (`Student_ID`) REFERENCES `student_record` (`Student_Record_ID`),
  ADD CONSTRAINT `finance_record_ibfk_2` FOREIGN KEY (`School_ID`) REFERENCES `school` (`School_ID`);

--
-- Constraints for table `grades`
--
ALTER TABLE `grades`
  ADD CONSTRAINT `grades_ibfk_1` FOREIGN KEY (`Student_ID`) REFERENCES `student_record` (`Student_Record_ID`);

--
-- Constraints for table `student_record`
--
ALTER TABLE `student_record`
  ADD CONSTRAINT `school-id` FOREIGN KEY (`School_ID`) REFERENCES `school` (`School_ID`),
  ADD CONSTRAINT `student_record_ibfk_1` FOREIGN KEY (`Student_ID`) REFERENCES `student_record` (`Student_Record_ID`);

--
-- Constraints for table `subject`
--
ALTER TABLE `subject`
  ADD CONSTRAINT `subject_ibfk_1` FOREIGN KEY (`School_ID`) REFERENCES `school` (`School_ID`),
  ADD CONSTRAINT `subject_ibfk_2` FOREIGN KEY (`Teacher_ID`) REFERENCES `teacher` (`Teacher_ID`);

--
-- Constraints for table `teacher`
--
ALTER TABLE `teacher`
  ADD CONSTRAINT `teacher_ibfk_1` FOREIGN KEY (`School_ID`) REFERENCES `school` (`School_ID`);

--
-- Constraints for table `term_record`
--
ALTER TABLE `term_record`
  ADD CONSTRAINT `term_record_ibfk_1` FOREIGN KEY (`Student_ID`) REFERENCES `student_record` (`Student_Record_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
