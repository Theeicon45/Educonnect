-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 28, 2024 at 06:21 PM
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
  `Student_ID` int(20) DEFAULT NULL,
  `School_ID` int(20) NOT NULL,
  `Applicant_Name` varchar(100) NOT NULL,
  `Second_Name` varchar(100) DEFAULT NULL,
  `Date_of_Birth` date NOT NULL,
  `Gender` varchar(100) NOT NULL,
  `Grade_Level_Applied` int(20) DEFAULT NULL,
  `Guardian_Name` varchar(100) NOT NULL,
  `Guardian_Contact` varchar(100) NOT NULL,
  `Previous_School` varchar(100) NOT NULL,
  `Application_Date` date NOT NULL,
  `Status` varchar(100) DEFAULT NULL,
  `Admission_Date` date DEFAULT NULL,
  `Preferred_School` varchar(255) NOT NULL,
  `Remarks` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `application`
--

INSERT INTO `application` (`Application_ID`, `Student_ID`, `School_ID`, `Applicant_Name`, `Second_Name`, `Date_of_Birth`, `Gender`, `Grade_Level_Applied`, `Guardian_Name`, `Guardian_Contact`, `Previous_School`, `Application_Date`, `Status`, `Admission_Date`, `Preferred_School`, `Remarks`) VALUES
(1, NULL, 1, 'Me', '0', '2009-02-10', 'Male', 8, 'Eye', '0700003526', 'kac', '2024-12-23', 'Accepted', '2024-12-23', 'Terry and Kay Kisumu', 'mmmh'),
(2, NULL, 0, 'Naruto', 'Uzumaki', '2013-10-15', 'Male', 6, 'Hiruzen', '1212121212', 'leaf', '2024-12-23', 'Accepted', '2024-12-27', 'Terry and Kay Nairobi', 'jkjkj'),
(3, NULL, 2, 'Sarada', '0', '2012-07-18', 'Female', 9, 'Sakura', '0734353637', 'None', '2024-12-23', '', NULL, 'Terry and Kay Makueni', ''),
(4, NULL, 3, 'judah', '0', '2011-07-25', 'Male', 10, 'Tabitha', '0734353690', 'kyumbi', '2024-12-23', '', NULL, 'Terry and Kay Kitengela', ''),
(5, NULL, 4, 'Mike', '0', '2012-06-06', 'Male', 7, 'Mosh', '1212121212', 'continental', '2024-12-23', '', NULL, 'Terry and Kay Gatundu', 'haha'),
(6, NULL, 0, 'Neji', '0', '2012-06-19', 'Male', 9, 'Hyuga', '1234567809', 'Leaf', '2024-12-23', NULL, NULL, 'Terry and Kay Nairobi', '😁'),
(7, NULL, 1, 'Hinata', '0', '2012-02-16', 'Female', 7, 'John', '4554446768', 'kac', '2024-12-23', NULL, NULL, 'Terry and Kay Kisumu', 'kjk'),
(8, NULL, 2, 'Tobi', '0', '2014-06-05', 'Male', 8, 'Madar', '1212121212', 'sand', '2024-12-23', NULL, NULL, 'Terry and Kay Makueni', ''),
(9, NULL, 1, 'Chocho', '0', '2015-07-07', 'Female', 6, 'choji', '1212121212', 'Leaf', '2024-12-23', NULL, NULL, 'Terry and Kay Kisumu', ''),
(10, NULL, 0, 'Shikadai', '0', '2012-06-06', 'Male', 11, 'Tamari', '0734353637', 'Leaf', '2024-12-16', NULL, NULL, 'Terry and Kay Nairobi', ''),
(11, NULL, 0, 'Gaara', '0', '2014-07-18', 'Male', 11, 'John', '0988898998', 'sand', '2024-12-23', NULL, NULL, 'Terry and Kay Nairobi', ''),
(12, NULL, 3, 'Jinx', '0', '2015-06-27', 'Female', 4, 'winx', '1234567809', 'Tnk primarry', '2024-12-01', NULL, NULL, 'Terry and Kay Kitengela', 'Good kid'),
(13, NULL, 2, 'Kiddoh', 'Lamar', '2009-02-11', 'Male', 9, 'Ken', '0700003526', 'kac', '2024-12-27', NULL, NULL, 'Terry and Kay Makueni', 'Test');

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
-- Table structure for table `fee_payments`
--

CREATE TABLE `fee_payments` (
  `Student_ID` int(20) NOT NULL,
  `Student_Name` varchar(100) NOT NULL,
  `Grade` int(20) NOT NULL,
  `Amount_Due` int(100) NOT NULL,
  `Amount_Paid` int(100) NOT NULL,
  `Balance` int(100) NOT NULL,
  `Due_Date` date NOT NULL,
  `Payment_Status` varchar(100) NOT NULL,
  `Payment_Method` varchar(100) NOT NULL
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

--
-- Dumping data for table `school`
--

INSERT INTO `school` (`School_ID`, `School_Name`, `Location`, `Address`, `Contact_Number`, `Email`, `Principal_Name`) VALUES
(0, 'Terry and Kay Nairobi', 'Nairobi', '10342-0100', '01234567', 'tkaynbi@gmail.com', 'Naruto'),
(1, 'Terry and Kay Kisumu', 'Kisumu', '10344-0100', '01234567', 'tkaynbi@gmail.com', 'Riggy'),
(2, 'Terry and Kay Makueni', 'Makueni', '6733-0990', '020098786', 'tkmak@gmail.com', 'Linda'),
(3, 'Terry and Kay Kitengela', 'Kitengela', '11672-00100', '020016761', 'tkkitengela@gmail.com', 'Royal'),
(4, 'Terry and Kay Gatundu', 'Gatundu', '896-0998', '0722898565', 'tkgatundu@gmail.com', 'Kim');

-- --------------------------------------------------------

--
-- Table structure for table `student_record`
--

CREATE TABLE `student_record` (
  `Student_Record_ID` int(20) NOT NULL,
  `Student_ID` int(20) DEFAULT NULL,
  `School_ID` int(20) NOT NULL,
  `First_Name` varchar(100) NOT NULL,
  `Second_Name` varchar(100) DEFAULT NULL,
  `Enrollment_Year` year(4) NOT NULL,
  `Year_Level` int(20) NOT NULL,
  `Term_Average_Grade` varchar(50) NOT NULL,
  `Guardian_ID` int(20) NOT NULL,
  `Status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_record`
--

INSERT INTO `student_record` (`Student_Record_ID`, `Student_ID`, `School_ID`, `First_Name`, `Second_Name`, `Enrollment_Year`, `Year_Level`, `Term_Average_Grade`, `Guardian_ID`, `Status`) VALUES
(17, 1, 1, 'Merlin', 'Kamau', '2024', 7, 'N/A', 61850, 'Active'),
(18, 2, 0, 'Naruto', 'Uzumaki', '2024', 6, 'N/A', 38145, 'Active');

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

--
-- Dumping data for table `teacher`
--

INSERT INTO `teacher` (`Teacher_ID`, `First_Name`, `Last_Name`, `Email`, `Phone_Number`, `Subject_Specialty`, `School_ID`, `Employment_Status`, `Hire_Date`, `Status`) VALUES
(1, 'Judah', 'Kinyanjui', 'judahkinyanjui@gmail.com', '0110733243', '', 2, 'Contract', '2024-12-27', 'Active'),
(2, 'Tabitha ', 'Wakonyo', 'tabitha@gmail.com', '0724933622', '', 0, 'Full-Time', '2024-12-27', 'Active');

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
  `User_ID` int(50) NOT NULL,
  `Username` varchar(100) NOT NULL,
  `Password_Hash` varchar(255) NOT NULL,
  `Role` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_credentials`
--

INSERT INTO `user_credentials` (`User_ID`, `Username`, `Password_Hash`, `Role`, `Email`) VALUES
(1, 'Lamar', '1234', 'Admin', 'lamar@mail.com'),
(2, 'Kigen', '1234', 'Teacher', 'kigen@mail.com'),
(3, 'Mosh', '1234', 'student', 'mosh@mail.com');

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
  ADD KEY `School_ID` (`School_ID`) USING BTREE;

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
  ADD PRIMARY KEY (`User_ID`),
  ADD UNIQUE KEY `User_ID` (`User_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `application`
--
ALTER TABLE `application`
  MODIFY `Application_ID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `student_record`
--
ALTER TABLE `student_record`
  MODIFY `Student_Record_ID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `teacher`
--
ALTER TABLE `teacher`
  MODIFY `Teacher_ID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_credentials`
--
ALTER TABLE `user_credentials`
  MODIFY `User_ID` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
