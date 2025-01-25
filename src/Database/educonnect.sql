-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 24, 2025 at 03:53 PM
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
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `Admin_ID` int(11) NOT NULL,
  `User_ID` int(11) NOT NULL,
  `First_Name` varchar(100) NOT NULL,
  `Second_Name` varchar(100) NOT NULL,
  `Role` varchar(50) DEFAULT NULL,
  `Created_At` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`Admin_ID`, `User_ID`, `First_Name`, `Second_Name`, `Role`, `Created_At`) VALUES
(1, 14, 'Lamar', ' Merlin', 'Admin', '2025-01-19 11:29:18');

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
  `Announcement_ID` int(11) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `Content` text NOT NULL,
  `Target_Audience` enum('System','School','Grade','User') NOT NULL,
  `Target_ID` int(11) DEFAULT NULL,
  `Created_By` int(11) NOT NULL,
  `Created_At` datetime DEFAULT current_timestamp(),
  `Expiry_Date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `announcements`
--

INSERT INTO `announcements` (`Announcement_ID`, `Title`, `Content`, `Target_Audience`, `Target_ID`, `Created_By`, `Created_At`, `Expiry_Date`) VALUES
(1, 'Merry Christmas', 'Christmas holidays enjoy', 'System', NULL, 14, '2025-01-02 14:19:01', '2025-01-20 00:00:00'),
(2, 'test', 'test', 'System', NULL, 14, '2025-01-02 19:26:16', '2025-01-02 00:00:00');

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
(1, NULL, 1, 'Me', '0', '2009-02-10', 'Male', 8, 'Eye', '0700003526', 'kac', '2024-12-23', 'Accepted', '2025-01-09', 'Terry and Kay Kisumu', 'mmmh'),
(2, NULL, 0, 'Naruto', 'Uzumaki', '2013-10-15', 'Male', 6, 'Hiruzen', '1212121212', 'leaf', '2024-12-23', 'Accepted', '2025-01-09', 'Terry and Kay Nairobi', 'jkjkj'),
(13, NULL, 2, 'Kiddoh', 'Lamar', '2009-02-11', 'Male', 9, 'Ken', '0700003526', 'kac', '2024-12-27', 'Accepted', '2025-01-09', 'Terry and Kay Makueni', 'Test'),
(44, 101, 0, 'John', 'Doe', '2010-04-15', 'Male', 5, 'Jane Doe', '123456789', 'ABC Elementary', '2025-01-09', 'Accepted', '2025-01-09', 'XYZ School', 'N/A'),
(45, 102, 1, 'Emily', 'Smith', '2011-05-20', 'Female', 6, 'David Smith', '987654321', 'DEF Elementary', '2025-01-09', 'Accepted', '2025-01-09', 'ABC School', 'N/A'),
(46, 103, 2, 'Michael', 'Johnson', '2012-06-25', 'Male', 4, 'Sarah Johnson', '456123789', 'GHI Elementary', '2025-01-09', 'Accepted', '2025-01-09', 'MNO School', 'N/A'),
(47, 104, 3, 'Sophia', 'Brown', '2013-07-30', 'Female', 3, 'James Brown', '789456123', 'JKL Elementary', '2025-01-09', 'Accepted', '2025-01-09', 'PQR School', 'N/A'),
(48, 105, 4, 'Daniel', 'Jones', '2010-08-05', 'Male', 5, 'Linda Jones', '321654987', 'MNO Elementary', '2025-01-09', 'Accepted', '2025-01-09', 'STU School', 'N/A'),
(49, 106, 0, 'Olivia', 'Garcia', '2011-09-10', 'Female', 6, 'Robert Garcia', '654987321', 'PQR Elementary', '2025-01-09', 'Accepted', '2025-01-15', 'VWX School', 'N/A'),
(50, 107, 1, 'Ethan', 'Martinez', '2012-10-15', 'Male', 4, 'Patricia Martinez', '789321456', 'STU Elementary', '2025-01-09', 'Pending', NULL, 'ABC School', 'N/A'),
(51, 108, 2, 'Ava', 'Davis', '2013-11-20', 'Female', 3, 'Charles Davis', '321789654', 'VWX Elementary', '2025-01-09', 'Pending', NULL, 'DEF School', 'N/A'),
(52, 109, 3, 'William', 'Rodriguez', '2010-12-25', 'Male', 5, 'Barbara Rodriguez', '654321789', 'YZA Elementary', '2025-01-09', 'Pending', NULL, 'GHI School', 'N/A'),
(53, 110, 4, 'Isabella', 'Martinez', '2011-01-05', 'Female', 6, 'Matthew Martinez', '987123456', 'BCD Elementary', '2025-01-09', 'Pending', NULL, 'JKL School', 'N/A'),
(54, 111, 0, 'Alexander', 'Hernandez', '2012-02-10', 'Male', 4, 'Sandra Hernandez', '123987654', 'EFG Elementary', '2025-01-09', 'Pending', NULL, 'MNO School', 'N/A'),
(55, 112, 1, 'Mia', 'Lopez', '2013-03-15', 'Female', 3, 'Steven Lopez', '456789321', 'HIJ Elementary', '2025-01-09', 'Pending', NULL, 'PQR School', 'N/A'),
(56, 113, 2, 'James', 'Gonzalez', '2010-04-20', 'Male', 5, 'Laura Gonzalez', '789123654', 'KLM Elementary', '2025-01-09', 'Pending', NULL, 'STU School', 'N/A'),
(57, 114, 3, 'Charlotte', 'Wilson', '2011-05-25', 'Female', 6, 'Frank Wilson', '321456987', 'NOP Elementary', '2025-01-09', 'Pending', NULL, 'VWX School', 'N/A'),
(58, 115, 4, 'Benjamin', 'Clark', '2012-06-30', 'Male', 4, 'Diana Clark', '654123789', 'QRS Elementary', '2025-01-09', 'Pending', NULL, 'ABC School', 'N/A'),
(59, 116, 0, 'Amelia', 'Lewis', '2013-07-05', 'Female', 3, 'George Lewis', '987654123', 'TUV Elementary', '2025-01-09', 'Pending', NULL, 'DEF School', 'N/A'),
(60, 117, 1, 'Henry', 'Young', '2010-08-10', 'Male', 5, 'Nancy Young', '456321789', 'WXY Elementary', '2025-01-09', 'Pending', NULL, 'GHI School', 'N/A'),
(61, 118, 2, 'Evelyn', 'Hall', '2011-09-15', 'Female', 6, 'Paul Hall', '321654123', 'ZAB Elementary', '2025-01-09', 'Pending', NULL, 'JKL School', 'N/A'),
(62, 119, 3, 'Joseph', 'Allen', '2012-10-20', 'Male', 4, 'Elizabeth Allen', '654987789', 'CDE Elementary', '2025-01-09', 'Pending', NULL, 'MNO School', 'N/A'),
(63, 120, 4, 'Grace', 'Young', '2013-11-25', 'Female', 3, 'Christopher Young', '789654123', 'FGH Elementary', '2025-01-09', 'Pending', NULL, 'PQR School', 'N/A'),
(64, 121, 0, 'David', 'Hernandez', '2010-12-05', 'Male', 5, 'Karen Hernandez', '321789456', 'IJK Elementary', '2025-01-09', 'Pending', NULL, 'STU School', 'N/A'),
(65, 122, 1, 'Emma', 'King', '2011-01-10', 'Female', 6, 'Daniel King', '654321123', 'LMN Elementary', '2025-01-09', 'Pending', NULL, 'VWX School', 'N/A'),
(66, 123, 2, 'Samuel', 'Wright', '2012-02-15', 'Male', 4, 'Rebecca Wright', '987123789', 'OPQ Elementary', '2025-01-09', 'Pending', NULL, 'ABC School', 'N/A'),
(67, 124, 3, 'Avery', 'Lopez', '2013-03-20', 'Female', 3, 'Timothy Lopez', '123654987', 'RST Elementary', '2025-01-09', 'Pending', NULL, 'DEF School', 'N/A'),
(68, 125, 4, 'Jack', 'Hernandez', '2010-04-25', 'Male', 5, 'Stephanie Hernandez', '456789123', 'UVW Elementary', '2025-01-09', 'Pending', NULL, 'GHI School', 'N/A'),
(69, 126, 0, 'Sofia', 'Martinez', '2011-05-30', 'Female', 6, 'Gary Martinez', '789321987', 'XYZ Elementary', '2025-01-09', 'Pending', NULL, 'JKL School', 'N/A'),
(70, 127, 1, 'Elijah', 'Johnson', '2012-06-05', 'Male', 4, 'Hannah Johnson', '321987654', 'BCD Elementary', '2025-01-09', 'Pending', NULL, 'MNO School', 'N/A'),
(71, 128, 2, 'Harper', 'Smith', '2013-07-10', 'Female', 3, 'Anthony Smith', '654123321', 'EFG Elementary', '2025-01-09', 'Pending', NULL, 'PQR School', 'N/A'),
(72, 129, 3, 'Mason', 'Brown', '2010-08-15', 'Male', 5, 'Sharon Brown', '987321456', 'HIJ Elementary', '2025-01-09', 'Pending', NULL, 'STU School', 'N/A'),
(73, 130, 4, 'Ella', 'Rodriguez', '2011-09-10', 'Female', 6, 'Peter Rodriguez', '321654789', 'KLM Elementary', '2025-01-09', 'Pending', NULL, 'VWX School', 'N/A'),
(74, 101, 0, 'John', 'Doe', '2010-04-15', 'Male', 5, 'Jane Doe', '123456789', 'ABC Elementary', '2025-01-09', 'Pending', NULL, 'XYZ School', 'N/A'),
(75, 102, 1, 'Emily', 'Smith', '2011-05-20', 'Female', 6, 'David Smith', '987654321', 'DEF Elementary', '2025-01-09', 'Pending', NULL, 'ABC School', 'N/A'),
(76, 103, 2, 'Michael', 'Johnson', '2012-06-25', 'Male', 4, 'Sarah Johnson', '456123789', 'GHI Elementary', '2025-01-09', 'Pending', NULL, 'MNO School', 'N/A'),
(77, 104, 3, 'Sophia', 'Brown', '2013-07-30', 'Female', 3, 'James Brown', '789456123', 'JKL Elementary', '2025-01-09', 'Pending', NULL, 'PQR School', 'N/A'),
(78, 105, 4, 'Daniel', 'Jones', '2010-08-05', 'Male', 5, 'Linda Jones', '321654987', 'MNO Elementary', '2025-01-09', 'Pending', NULL, 'STU School', 'N/A'),
(79, 106, 0, 'Olivia', 'Garcia', '2011-09-10', 'Female', 6, 'Robert Garcia', '654987321', 'PQR Elementary', '2025-01-09', 'Pending', NULL, 'VWX School', 'N/A'),
(80, 107, 1, 'Ethan', 'Martinez', '2012-10-15', 'Male', 4, 'Patricia Martinez', '789321456', 'STU Elementary', '2025-01-09', 'Pending', NULL, 'ABC School', 'N/A'),
(81, 108, 2, 'Ava', 'Davis', '2013-11-20', 'Female', 3, 'Charles Davis', '321789654', 'VWX Elementary', '2025-01-09', 'Accepted', '2025-01-09', 'DEF School', 'N/A'),
(82, 109, 3, 'William', 'Rodriguez', '2010-12-25', 'Male', 5, 'Barbara Rodriguez', '654321789', 'YZA Elementary', '2025-01-09', 'Accepted', '2025-01-09', 'GHI School', 'N/A'),
(83, 110, 4, 'Isabella', 'Martinez', '2011-01-05', 'Female', 6, 'Matthew Martinez', '987123456', 'BCD Elementary', '2025-01-09', 'Accepted', '2025-01-09', 'JKL School', 'N/A'),
(84, 111, 0, 'Alexander', 'Hernandez', '2012-02-10', 'Male', 4, 'Sandra Hernandez', '123987654', 'EFG Elementary', '2025-01-09', 'Accepted', '2025-01-09', 'MNO School', 'N/A'),
(85, 112, 1, 'Mia', 'Lopez', '2013-03-15', 'Female', 3, 'Steven Lopez', '456789321', 'HIJ Elementary', '2025-01-09', 'Accepted', '2025-01-09', 'PQR School', 'N/A'),
(86, 113, 2, 'James', 'Gonzalez', '2010-04-20', 'Male', 5, 'Laura Gonzalez', '789123654', 'KLM Elementary', '2025-01-09', 'Accepted', '2025-01-09', 'STU School', 'N/A'),
(87, 114, 3, 'Charlotte', 'Wilson', '2011-05-25', 'Female', 6, 'Frank Wilson', '321456987', 'NOP Elementary', '2025-01-09', 'Accepted', '2025-01-09', 'VWX School', 'N/A'),
(88, 115, 4, 'Benjamin', 'Clark', '2012-06-30', 'Male', 4, 'Diana Clark', '654123789', 'QRS Elementary', '2025-01-09', 'Accepted', '2025-01-09', 'ABC School', 'N/A'),
(89, 116, 0, 'Amelia', 'Lewis', '2013-07-05', 'Female', 3, 'George Lewis', '987654123', 'TUV Elementary', '2025-01-09', 'Accepted', '2025-01-09', 'DEF School', 'N/A'),
(90, 117, 1, 'Henry', 'Young', '2010-08-10', 'Male', 5, 'Nancy Young', '456321789', 'WXY Elementary', '2025-01-09', 'Accepted', '2025-01-09', 'GHI School', 'N/A'),
(91, 118, 2, 'Evelyn', 'Hall', '2011-09-15', 'Female', 6, 'Paul Hall', '321654123', 'ZAB Elementary', '2025-01-09', 'Pending', NULL, 'JKL School', 'N/A'),
(92, 119, 3, 'Joseph', 'Allen', '2012-10-20', 'Male', 4, 'Elizabeth Allen', '654987789', 'CDE Elementary', '2025-01-09', 'Pending', NULL, 'MNO School', 'N/A'),
(93, 120, 4, 'Grace', 'Young', '2013-11-25', 'Female', 3, 'Christopher Young', '789654123', 'FGH Elementary', '2025-01-09', 'Pending', NULL, 'PQR School', 'N/A'),
(94, 121, 0, 'David', 'Hernandez', '2010-12-05', 'Male', 5, 'Karen Hernandez', '321789456', 'IJK Elementary', '2025-01-09', 'Pending', NULL, 'STU School', 'N/A'),
(95, 122, 1, 'Emma', 'King', '2011-01-10', 'Female', 6, 'Daniel King', '654321123', 'LMN Elementary', '2025-01-09', 'Pending', NULL, 'VWX School', 'N/A'),
(96, 123, 2, 'Samuel', 'Wright', '2012-02-15', 'Male', 4, 'Rebecca Wright', '987123789', 'OPQ Elementary', '2025-01-09', 'Pending', NULL, 'ABC School', 'N/A'),
(97, 124, 3, 'Avery', 'Lopez', '2013-03-20', 'Female', 3, 'Timothy Lopez', '123654987', 'RST Elementary', '2025-01-09', 'Pending', NULL, 'DEF School', 'N/A'),
(98, 125, 4, 'Jack', 'Hernandez', '2010-04-25', 'Male', 5, 'Stephanie Hernandez', '456789123', 'UVW Elementary', '2025-01-09', 'Pending', NULL, 'GHI School', 'N/A'),
(99, 126, 0, 'Sofia', 'Martinez', '2011-05-30', 'Female', 6, 'Gary Martinez', '789321987', 'XYZ Elementary', '2025-01-09', 'Pending', NULL, 'JKL School', 'N/A'),
(100, 127, 1, 'Elijah', 'Johnson', '2012-06-05', 'Male', 4, 'Hannah Johnson', '321987654', 'BCD Elementary', '2025-01-09', 'Pending', NULL, 'MNO School', 'N/A'),
(101, 128, 2, 'Harper', 'Smith', '2013-07-10', 'Female', 3, 'Anthony Smith', '654123321', 'EFG Elementary', '2025-01-09', 'Pending', NULL, 'PQR School', 'N/A'),
(102, 129, 3, 'Mason', 'Brown', '2010-08-15', 'Male', 5, 'Sharon Brown', '987321456', 'HIJ Elementary', '2025-01-09', 'Pending', NULL, 'STU School', 'N/A'),
(103, 130, 4, 'Ella', 'Rodriguez', '2011-09-10', 'Female', 6, 'Peter Rodriguez', '321654789', 'KLM Elementary', '2025-01-09', 'Accepted', '2025-01-15', 'VWX School', 'N/A'),
(104, 113, 2, 'James', 'Gonzalez', '2010-04-20', 'Male', 5, 'Laura Gonzalez', '789123654', 'KLM Elementary', '2025-01-09', 'Pending', NULL, 'STU School', 'N/A'),
(105, 114, 3, 'Charlotte', 'Wilson', '2011-05-25', 'Female', 6, 'Frank Wilson', '321456987', 'NOP Elementary', '2025-01-09', 'Pending', NULL, 'VWX School', 'N/A'),
(106, 115, 4, 'Benjamin', 'Clark', '2012-06-30', 'Male', 4, 'Diana Clark', '654123789', 'QRS Elementary', '2025-01-09', 'Pending', NULL, 'ABC School', 'N/A'),
(107, 116, 0, 'Amelia', 'Lewis', '2013-07-05', 'Female', 3, 'George Lewis', '987654123', 'TUV Elementary', '2025-01-09', 'Pending', NULL, 'DEF School', 'N/A'),
(108, 117, 1, 'Henry', 'Young', '2010-08-10', 'Male', 5, 'Nancy Young', '456321789', 'WXY Elementary', '2025-01-09', 'Pending', NULL, 'GHI School', 'N/A'),
(109, 118, 2, 'Evelyn', 'Hall', '2011-09-15', 'Female', 6, 'Paul Hall', '321654123', 'ZAB Elementary', '2025-01-09', 'Pending', NULL, 'JKL School', 'N/A'),
(110, 119, 3, 'Joseph', 'Allen', '2012-10-20', 'Male', 4, 'Elizabeth Allen', '654987789', 'CDE Elementary', '2025-01-09', 'Pending', NULL, 'MNO School', 'N/A'),
(111, 120, 4, 'Grace', 'Young', '2013-11-25', 'Female', 3, 'Christopher Young', '789654123', 'FGH Elementary', '2025-01-09', 'Pending', NULL, 'PQR School', 'N/A'),
(112, 121, 0, 'David', 'Hernandez', '2010-12-05', 'Male', 5, 'Karen Hernandez', '321789456', 'IJK Elementary', '2025-01-09', 'Pending', NULL, 'STU School', 'N/A'),
(113, 122, 1, 'Emma', 'King', '2011-01-10', 'Female', 6, 'Daniel King', '654321123', 'LMN Elementary', '2025-01-09', 'Pending', NULL, 'VWX School', 'N/A'),
(114, 123, 2, 'Samuel', 'Wright', '2012-02-15', 'Male', 4, 'Rebecca Wright', '987123789', 'OPQ Elementary', '2025-01-09', 'Pending', NULL, 'ABC School', 'N/A'),
(115, 124, 3, 'Avery', 'Lopez', '2013-03-20', 'Female', 3, 'Timothy Lopez', '123654987', 'RST Elementary', '2025-01-09', 'Pending', NULL, 'DEF School', 'N/A'),
(116, 125, 4, 'Jack', 'Hernandez', '2010-04-25', 'Male', 5, 'Stephanie Hernandez', '456789123', 'UVW Elementary', '2025-01-09', 'Pending', NULL, 'GHI School', 'N/A'),
(117, 126, 0, 'Sofia', 'Martinez', '2011-05-30', 'Female', 6, 'Gary Martinez', '789321987', 'XYZ Elementary', '2025-01-09', 'Pending', NULL, 'JKL School', 'N/A'),
(118, 127, 1, 'Elijah', 'Johnson', '2012-06-05', 'Male', 4, 'Hannah Johnson', '321987654', 'BCD Elementary', '2025-01-09', 'Pending', NULL, 'MNO School', 'N/A'),
(119, 128, 2, 'Harper', 'Smith', '2013-07-10', 'Female', 3, 'Anthony Smith', '654123321', 'EFG Elementary', '2025-01-09', 'Pending', NULL, 'PQR School', 'N/A'),
(120, 129, 3, 'Mason', 'Brown', '2010-08-15', 'Male', 5, 'Sharon Brown', '987321456', 'HIJ Elementary', '2025-01-09', 'Pending', NULL, 'STU School', 'N/A'),
(121, 130, 4, 'Ella', 'Rodriguez', '2011-09-10', 'Female', 6, 'Peter Rodriguez', '321654789', 'KLM Elementary', '2025-01-09', 'Accepted', '2025-01-09', 'VWX School', 'N/A'),
(122, 123, 2, 'Samuel', 'Wright', '2012-02-15', 'Male', 4, 'Rebecca Wright', '987123789', 'OPQ Elementary', '2025-01-09', 'Accepted', '2025-01-15', 'ABC School', 'N/A'),
(123, 124, 3, 'Avery', 'Lopez', '2013-03-20', 'Female', 3, 'Timothy Lopez', '123654987', 'RST Elementary', '2025-01-09', 'Accepted', '2025-01-15', 'DEF School', 'N/A'),
(124, 125, 4, 'Jack', 'Hernandez', '2010-04-25', 'Male', 5, 'Stephanie Hernandez', '456789123', 'UVW Elementary', '2025-01-09', 'Pending', NULL, 'GHI School', 'N/A'),
(125, 126, 0, 'Sofia', 'Martinez', '2011-05-30', 'Female', 6, 'Gary Martinez', '789321987', 'XYZ Elementary', '2025-01-09', 'Accepted', '2025-01-15', 'JKL School', 'N/A'),
(126, 127, 1, 'Elijah', 'Johnson', '2012-06-05', 'Male', 4, 'Hannah Johnson', '321987654', 'BCD Elementary', '2025-01-09', 'Pending', NULL, 'MNO School', 'N/A'),
(127, 128, 2, 'Harper', 'Smith', '2013-07-10', 'Female', 3, 'Anthony Smith', '654123321', 'EFG Elementary', '2025-01-09', 'Pending', NULL, 'PQR School', 'N/A'),
(128, 129, 3, 'Mason', 'Brown', '2010-08-15', 'Male', 5, 'Sharon Brown', '987321456', 'HIJ Elementary', '2025-01-09', 'Accepted', '2025-01-09', 'STU School', 'N/A'),
(129, 130, 4, 'Ella', 'Rodriguez', '2011-09-10', 'Female', 6, 'Peter Rodriguez', '321654789', 'KLM Elementary', '2025-01-09', 'Pending', NULL, 'VWX School', 'N/A'),
(130, NULL, 3, 'New', 'Test', '2010-09-09', 'Male', 9, 'NNew', '0123456789', 'none', '2025-12-20', NULL, NULL, 'Terry and Kay Kitengela', 'Test');

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `Blog_ID` int(11) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `Content` text NOT NULL,
  `Author_ID` int(11) NOT NULL,
  `Created_At` datetime DEFAULT current_timestamp(),
  `Updated_At` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Status` enum('Published','Draft') DEFAULT 'Draft'
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
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `Comment_ID` int(11) NOT NULL,
  `Thread_ID` int(11) NOT NULL,
  `Content` text NOT NULL,
  `Created_By` int(11) NOT NULL,
  `Created_At` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`Comment_ID`, `Thread_ID`, `Content`, `Created_By`, `Created_At`) VALUES
(1, 14, 'test', 14, '2025-01-03 18:21:57'),
(2, 15, 'Nice', 14, '2025-01-03 18:31:33'),
(3, 15, 'new', 14, '2025-01-03 18:32:03'),
(4, 6, 'yoooo\n', 14, '2025-01-07 18:45:10'),
(5, 14, 'hi', 14, '2025-01-15 15:56:20'),
(6, 7, 'HI', 14, '2025-01-15 15:59:40');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `Event_ID` int(11) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `Description` text DEFAULT NULL,
  `Location` varchar(255) DEFAULT NULL,
  `Event_Date` datetime NOT NULL,
  `Created_At` timestamp NOT NULL DEFAULT current_timestamp(),
  `Created_By` int(11) DEFAULT NULL,
  `Status` enum('active','inactive') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`Event_ID`, `Title`, `Description`, `Location`, `Event_Date`, `Created_At`, `Created_By`, `Status`) VALUES
(1, 'Opening', 'Schools are resuming for new calendar. Students are expected to report on 6th January\nSincerely Admin', NULL, '2025-01-02 07:00:00', '2025-01-02 13:50:47', 14, 'active'),
(2, 'test', 'test', NULL, '2025-01-02 16:26:00', '2025-01-02 16:26:27', 14, 'active');

-- --------------------------------------------------------

--
-- Table structure for table `exams`
--

CREATE TABLE `exams` (
  `Exam_ID` int(20) NOT NULL,
  `Student_ID` int(20) NOT NULL,
  `School_ID` int(20) NOT NULL,
  `Exam_Type` varchar(50) NOT NULL,
  `Score` int(11) NOT NULL,
  `Total_Marks` int(11) NOT NULL,
  `Exam_Date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `exams`
--

INSERT INTO `exams` (`Exam_ID`, `Student_ID`, `School_ID`, `Exam_Type`, `Score`, `Total_Marks`, `Exam_Date`) VALUES
(1, 1, 1, 'Midterm', 85, 100, '2025-01-15'),
(2, 1, 1, 'Final', 90, 100, '2025-03-20'),
(3, 3, 2, 'Midterm', 88, 100, '2025-01-15'),
(4, 3, 2, 'Final', 92, 100, '2025-03-20'),
(5, 13, 2, 'Midterm', 86, 100, '2025-01-15'),
(6, 13, 2, 'Final', 89, 100, '2025-03-20'),
(7, 44, 0, 'Midterm', 75, 100, '2025-01-15'),
(8, 44, 0, 'Final', 78, 100, '2025-03-20'),
(9, 45, 1, 'Midterm', 90, 100, '2025-01-15'),
(10, 45, 1, 'Final', 93, 100, '2025-03-20'),
(11, 46, 2, 'Midterm', 88, 100, '2025-01-15'),
(12, 46, 2, 'Final', 91, 100, '2025-03-20'),
(13, 47, 3, 'Midterm', 82, 100, '2025-01-15'),
(14, 47, 3, 'Final', 85, 100, '2025-03-20'),
(15, 48, 4, 'Midterm', 87, 100, '2025-01-15'),
(16, 48, 4, 'Final', 90, 100, '2025-03-20'),
(17, 81, 2, 'Midterm', 78, 100, '2025-01-15'),
(18, 81, 2, 'Final', 80, 100, '2025-03-20'),
(19, 82, 3, 'Midterm', 85, 100, '2025-01-15'),
(20, 82, 3, 'Final', 88, 100, '2025-03-20'),
(21, 83, 4, 'Midterm', 92, 100, '2025-01-15'),
(22, 83, 4, 'Final', 95, 100, '2025-03-20'),
(23, 84, 0, 'Midterm', 81, 100, '2025-01-15'),
(24, 84, 0, 'Final', 85, 100, '2025-03-20'),
(25, 85, 1, 'Midterm', 86, 100, '2025-01-15'),
(26, 85, 1, 'Final', 89, 100, '2025-03-20'),
(27, 86, 2, 'Midterm', 84, 100, '2025-01-15'),
(28, 86, 2, 'Final', 87, 100, '2025-03-20'),
(29, 87, 3, 'Midterm', 89, 100, '2025-01-15'),
(30, 87, 3, 'Final', 92, 100, '2025-03-20'),
(31, 88, 4, 'Midterm', 77, 100, '2025-01-15'),
(32, 88, 4, 'Final', 80, 100, '2025-03-20'),
(33, 89, 0, 'Midterm', 91, 100, '2025-01-15'),
(34, 89, 0, 'Final', 94, 100, '2025-03-20'),
(35, 90, 1, 'Midterm', 88, 100, '2025-01-15'),
(36, 90, 1, 'Final', 91, 100, '2025-03-20'),
(37, 121, 4, 'Midterm', 93, 100, '2025-01-15'),
(38, 121, 4, 'Final', 96, 100, '2025-03-20'),
(39, 128, 3, 'Midterm', 75, 100, '2025-01-15'),
(40, 128, 3, 'Final', 78, 100, '2025-03-20');

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

CREATE TABLE `expenses` (
  `ExpenseID` int(11) NOT NULL,
  `ExpenseCategory` varchar(100) NOT NULL,
  `Amount` decimal(10,2) NOT NULL,
  `ExpenseDate` date NOT NULL,
  `Description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `expenses`
--

INSERT INTO `expenses` (`ExpenseID`, `ExpenseCategory`, `Amount`, `ExpenseDate`, `Description`) VALUES
(1, 'Teacher Salaries', 50000.00, '2025-09-01', 'Salaries for September'),
(2, 'Electricity Bills', 8000.00, '2024-09-15', 'Electricity bill for September'),
(3, 'Maintenance', 5000.00, '2024-09-20', 'Routine maintenance'),
(4, 'Miscellaneous', 2000.00, '2024-09-25', 'Miscellaneous expenses'),
(5, 'Teacher Salaries', 52000.00, '2024-10-01', 'Salaries for October'),
(6, 'Electricity Bills', 8500.00, '2024-10-15', 'Electricity bill for October'),
(7, 'Maintenance', 5500.00, '2024-10-20', 'Routine maintenance'),
(8, 'Miscellaneous', 2200.00, '2024-10-25', 'Miscellaneous expenses');

-- --------------------------------------------------------

--
-- Table structure for table `fees`
--

CREATE TABLE `fees` (
  `FeeID` int(11) NOT NULL,
  `StudentID` int(11) NOT NULL,
  `StudentName` varchar(100) NOT NULL,
  `ClassGrade` varchar(50) NOT NULL,
  `FeeType` varchar(50) NOT NULL,
  `AmountDue` decimal(10,2) NOT NULL,
  `AmountPaid` decimal(10,2) DEFAULT 0.00,
  `Balance` decimal(10,2) GENERATED ALWAYS AS (`AmountDue` - `AmountPaid`) STORED,
  `DueDate` date NOT NULL,
  `PaymentStatus` enum('Paid','Partially Paid','Unpaid') NOT NULL,
  `PaymentMethod` varchar(50) DEFAULT NULL,
  `CreatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fees`
--

INSERT INTO `fees` (`FeeID`, `StudentID`, `StudentName`, `ClassGrade`, `FeeType`, `AmountDue`, `AmountPaid`, `DueDate`, `PaymentStatus`, `PaymentMethod`, `CreatedAt`, `UpdatedAt`) VALUES
(1, 101, 'John Doe', 'Grade 5', 'Tuition', 35000.00, 11500.00, '2024-09-15', 'Partially Paid', 'Bank Transfer', '2024-12-31 14:31:57', '2024-12-31 14:31:57'),
(3, 106, 'Daisy White', 'Grade 6', 'Tuition', 35000.00, 20000.00, '2024-11-15', 'Partially Paid', 'Credit Card', '2024-12-31 14:31:57', '2024-12-31 14:31:57'),
(4, 1, 'John Doe', 'Grade 10', 'Tuition', 500.00, 200.00, '2024-01-15', 'Partially Paid', 'Online', '2024-12-28 17:41:43', '2024-12-28 17:41:43'),
(5, 2, 'Jane Smith', 'Grade 8', 'Sports', 150.00, 150.00, '2024-01-10', 'Paid', 'Cash', '2024-12-28 17:41:43', '2024-12-31 07:20:36'),
(6, 3, 'Emily Johnson', 'Grade 12', 'Exam Fee', 300.00, 0.00, '2024-01-20', 'Unpaid', NULL, '2024-12-28 17:41:43', '2024-12-28 18:45:53'),
(7, 2, 'Naruto', '6', 'Tuition Fee', 35000.00, 0.00, '2025-01-30', 'Unpaid', NULL, '2024-12-31 13:51:02', '2024-12-31 13:51:02'),
(8, 108, 'Frank Red', 'Grade 5', 'Tuition', 35000.00, 18000.00, '2024-10-15', 'Partially Paid', 'Cash', '2024-12-31 14:31:57', '2024-12-31 14:31:57'),
(9, 109, 'Grace Yellow', 'Grade 8', 'Tuition', 35000.00, 35000.00, '2024-11-15', 'Paid', 'Bank Transfer', '2024-12-31 14:31:57', '2024-12-31 14:31:57'),
(10, 110, 'Harry Blue', 'Grade 7', 'Tuition', 35000.00, 10000.00, '2024-09-15', 'Partially Paid', 'Credit Card', '2024-12-31 14:31:57', '2024-12-31 14:31:57'),
(11, 104, 'Bob Brown', 'Grade 5', 'Tuition', 35000.00, 5000.00, '2024-09-15', 'Partially Paid', 'Bank Transfer', '2024-12-31 14:31:57', '2024-12-31 14:31:57'),
(12, 105, 'Charlie Black', 'Grade 8', 'Tuition', 35000.00, 0.00, '2024-10-15', 'Unpaid', NULL, '2024-12-31 14:31:57', '2024-12-31 14:31:57'),
(14, 107, 'Eve Green', 'Grade 7', 'Tuition', 35000.00, 35000.00, '2024-09-15', 'Paid', 'Mobile Money', '2024-12-31 14:31:57', '2024-12-31 14:31:57'),
(15, 103, 'Alice Johnson', 'Grade 7', 'Tuition', 35000.00, 35000.00, '2024-11-15', 'Paid', 'Mobile Money', '2024-12-31 14:31:57', '2024-12-31 14:31:57'),
(16, 102, 'Jane Smith', 'Grade 6', 'Tuition', 35000.00, 15000.00, '2024-10-15', 'Partially Paid', 'Cash', '2024-12-31 14:31:57', '2024-12-31 14:31:57'),
(17, 3, 'Sarada', '9', 'Tuition Fee', 35000.00, 0.00, '2025-02-08', 'Unpaid', NULL, '2025-01-09 16:30:01', '2025-01-09 16:30:01'),
(18, 4, 'judah', '10', 'Tuition Fee', 35000.00, 0.00, '2025-02-08', 'Unpaid', NULL, '2025-01-09 16:30:01', '2025-01-09 16:30:01'),
(19, 4, 'judah', '10', 'Tuition Fee', 35000.00, 0.00, '2025-02-08', 'Unpaid', NULL, '2025-01-09 16:30:01', '2025-01-09 16:30:01'),
(20, 5, 'Mike', '7', 'Tuition Fee', 35000.00, 0.00, '2025-02-08', 'Unpaid', NULL, '2025-01-09 16:30:02', '2025-01-09 16:30:02'),
(21, 6, 'Neji', '9', 'Tuition Fee', 35000.00, 0.00, '2025-02-08', 'Unpaid', NULL, '2025-01-09 16:30:03', '2025-01-09 16:30:03'),
(22, 7, 'Hinata', '7', 'Tuition Fee', 35000.00, 0.00, '2025-02-08', 'Unpaid', NULL, '2025-01-09 16:30:04', '2025-01-09 16:30:04'),
(23, 8, 'Tobi', '8', 'Tuition Fee', 35000.00, 0.00, '2025-02-08', 'Unpaid', NULL, '2025-01-09 16:30:05', '2025-01-09 16:30:05'),
(24, 9, 'Chocho', '6', 'Tuition Fee', 35000.00, 0.00, '2025-02-08', 'Unpaid', NULL, '2025-01-09 16:30:07', '2025-01-09 16:30:07'),
(25, 10, 'Shikadai', '11', 'Tuition Fee', 35000.00, 0.00, '2025-02-08', 'Unpaid', NULL, '2025-01-09 16:30:07', '2025-01-09 16:30:07'),
(26, 2, 'Naruto', '6', 'Tuition Fee', 35000.00, 0.00, '2025-02-08', 'Unpaid', NULL, '2025-01-09 16:35:10', '2025-01-09 16:35:10'),
(27, 3, 'Sarada', '9', 'Tuition Fee', 35000.00, 0.00, '2025-02-08', 'Unpaid', NULL, '2025-01-09 17:14:53', '2025-01-09 17:14:53'),
(28, 3, 'Sarada', '9', 'Tuition Fee', 35000.00, 0.00, '2025-02-08', 'Unpaid', NULL, '2025-01-09 17:25:57', '2025-01-09 17:25:57'),
(29, 128, 'Mason', '5', 'Tuition Fee', 35000.00, 0.00, '2025-02-08', 'Unpaid', NULL, '2025-01-09 17:43:07', '2025-01-09 17:43:07'),
(30, 121, 'Ella Rodriguez', '6', 'Tuition Fee', 35000.00, 0.00, '2025-02-08', 'Unpaid', NULL, '2025-01-09 17:54:49', '2025-01-09 17:54:49'),
(31, 13, 'Kiddoh Lamar', '9', 'Tuition Fee', 35000.00, 0.00, '2025-02-08', 'Unpaid', NULL, '2025-01-09 18:00:18', '2025-01-09 18:00:18'),
(32, 44, 'John Doe', '5', 'Tuition Fee', 35000.00, 0.00, '2025-02-08', 'Unpaid', NULL, '2025-01-09 18:00:19', '2025-01-09 18:00:19'),
(33, 45, 'Emily Smith', '6', 'Tuition Fee', 35000.00, 0.00, '2025-02-08', 'Unpaid', NULL, '2025-01-09 18:00:20', '2025-01-09 18:00:20'),
(34, 46, 'Michael Johnson', '4', 'Tuition Fee', 35000.00, 0.00, '2025-02-08', 'Unpaid', NULL, '2025-01-09 18:00:21', '2025-01-09 18:00:21'),
(35, 47, 'Sophia Brown', '3', 'Tuition Fee', 35000.00, 0.00, '2025-02-08', 'Unpaid', NULL, '2025-01-09 18:00:21', '2025-01-09 18:00:21'),
(36, 48, 'Daniel Jones', '5', 'Tuition Fee', 35000.00, 0.00, '2025-02-08', 'Unpaid', NULL, '2025-01-09 18:00:22', '2025-01-09 18:00:22'),
(37, 84, 'Alexander Hernandez', '4', 'Tuition Fee', 35000.00, 0.00, '2025-02-08', 'Unpaid', NULL, '2025-01-09 18:00:28', '2025-01-09 18:00:28'),
(38, 85, 'Mia Lopez', '3', 'Tuition Fee', 35000.00, 0.00, '2025-02-08', 'Unpaid', NULL, '2025-01-09 18:00:29', '2025-01-09 18:00:29'),
(39, 86, 'James Gonzalez', '5', 'Tuition Fee', 35000.00, 0.00, '2025-02-08', 'Unpaid', NULL, '2025-01-09 18:00:30', '2025-01-09 18:00:30'),
(40, 87, 'Charlotte Wilson', '6', 'Tuition Fee', 35000.00, 0.00, '2025-02-08', 'Unpaid', NULL, '2025-01-09 18:00:31', '2025-01-09 18:00:31'),
(41, 88, 'Benjamin Clark', '4', 'Tuition Fee', 35000.00, 0.00, '2025-02-08', 'Unpaid', NULL, '2025-01-09 18:00:32', '2025-01-09 18:00:32'),
(42, 89, 'Amelia Lewis', '3', 'Tuition Fee', 35000.00, 0.00, '2025-02-08', 'Unpaid', NULL, '2025-01-09 18:00:33', '2025-01-09 18:00:33'),
(43, 90, 'Henry Young', '5', 'Tuition Fee', 35000.00, 0.00, '2025-02-08', 'Unpaid', NULL, '2025-01-09 18:00:33', '2025-01-09 18:00:33'),
(44, 83, 'Isabella Martinez', '6', 'Tuition Fee', 35000.00, 0.00, '2025-02-08', 'Unpaid', NULL, '2025-01-09 18:00:35', '2025-01-09 18:00:35'),
(45, 82, 'William Rodriguez', '5', 'Tuition Fee', 35000.00, 0.00, '2025-02-08', 'Unpaid', NULL, '2025-01-09 18:00:35', '2025-01-09 18:00:35'),
(46, 81, 'Ava Davis', '3', 'Tuition Fee', 35000.00, 0.00, '2025-02-08', 'Unpaid', NULL, '2025-01-09 18:00:38', '2025-01-09 18:00:38'),
(47, 122, 'Samuel Wright', '4', 'Tuition Fee', 35000.00, 0.00, '2025-02-14', 'Unpaid', NULL, '2025-01-15 11:56:52', '2025-01-15 11:56:52'),
(48, 123, 'Avery Lopez', '3', 'Tuition Fee', 35000.00, 0.00, '2025-02-14', 'Unpaid', NULL, '2025-01-15 11:56:57', '2025-01-15 11:56:57'),
(49, 103, 'Ella Rodriguez', '6', 'Tuition Fee', 35000.00, 0.00, '2025-02-14', 'Unpaid', NULL, '2025-01-15 11:57:21', '2025-01-15 11:57:21');

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
-- Table structure for table `forums`
--

CREATE TABLE `forums` (
  `Forum_ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Description` text DEFAULT NULL,
  `Created_By` int(11) NOT NULL,
  `Created_At` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `forums`
--

INSERT INTO `forums` (`Forum_ID`, `Name`, `Description`, `Created_By`, `Created_At`) VALUES
(1, 'General Discussion', 'A forum for general discussions on various topics related to education and school activities.', 1, '2025-01-02 18:41:19'),
(2, 'Announcements', 'This forum is for official announcements regarding school events, holidays, and other important information.', 1, '2025-01-02 18:41:19'),
(3, 'Student Support', 'A forum for students to ask questions, seek advice, or share resources related to their academic journey.', 2, '2025-01-02 18:41:19'),
(4, 'Staff Lounge', 'A private forum for teachers and staff to discuss administrative matters and share resources.', 3, '2025-01-02 18:41:19'),
(5, 'Parent-Teacher Interaction', 'A forum where parents can interact with teachers to discuss their child\'s progress and school-related issues.', 4, '2025-01-02 18:41:19'),
(6, 'Event Planning', 'This forum is dedicated to planning and organizing school events such as sports days, festivals, and cultural programs.', 1, '2025-01-02 18:41:19'),
(7, 'Tech Support', 'A forum for troubleshooting technical issues with the school\'s software and hardware.', 5, '2025-01-02 18:41:19'),
(8, 'Library Discussions', 'A forum for students and faculty to discuss books, reading lists, and library resources.', 2, '2025-01-02 18:41:19'),
(9, 'Extracurricular Activities', 'A forum for discussions related to extracurricular activities like sports, clubs, and student organizations.', 3, '2025-01-02 18:41:19'),
(10, 'Alumni Network', 'A forum for former students to stay connected and share opportunities with current students.', 6, '2025-01-02 18:41:19');

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
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `Message_ID` int(11) NOT NULL,
  `Sender_ID` int(11) NOT NULL,
  `Recipient_Type` enum('User','Group') NOT NULL,
  `Recipient_ID` int(11) NOT NULL,
  `Content` text NOT NULL,
  `Created_At` datetime DEFAULT current_timestamp(),
  `Read_Status` enum('Unread','Read') DEFAULT 'Unread'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `resources`
--

CREATE TABLE `resources` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `grade_level` varchar(20) DEFAULT NULL,
  `subject` varchar(100) DEFAULT NULL,
  `resource_type` enum('book','video','audio','other') DEFAULT 'other',
  `file_path` varchar(255) NOT NULL,
  `thumbnail_path` varchar(255) DEFAULT NULL,
  `additional_text` text DEFAULT NULL,
  `uploaded_by` int(11) DEFAULT NULL,
  `uploaded_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `resources`
--

INSERT INTO `resources` (`id`, `title`, `description`, `category`, `grade_level`, `subject`, `resource_type`, `file_path`, `thumbnail_path`, `additional_text`, `uploaded_by`, `uploaded_at`) VALUES
(1, '', '', '', NULL, '', NULL, '/uploads/media/1736783573697-3.Body.Problem.S01E03.720p.NF.WEBRip.x264-GalaxyTV.mkv', '/uploads/thumbnails/1736783583313-IMG_20230131_180607_661.jpg', NULL, NULL, '2025-01-13 18:53:03'),
(2, 'Media', 'ha', 'Videos', NULL, 'science', NULL, '/uploads/media/1736788082676-3.Body.Problem.S01E03.720p.NF.WEBRip.x264-GalaxyTV.mkv', '/uploads/thumbnails/1736788091794-IMG_20230131_180607_661.jpg', NULL, NULL, '2025-01-13 20:08:11'),
(3, 'tii', 'i', 'Books', '7', 'jiii', 'video', 'uploads\\media\\1736796995281-3.Body.Problem.S01E03.720p.NF.WEBRip.x264-GalaxyTV.mkv', 'uploads\\thumbnails\\1736796998181-IMG_20230131_180607_661.jpg', 'uiuiui', 14, '2025-01-13 22:36:38'),
(4, 'test', 'test pdf', 'Books', '12', 'computer', 'book', 'uploads\\media\\1736868402369-Mzizi School Management ERP Brief Writeup.pdf', 'uploads\\thumbnails\\1736868402451-Screenshot 2024-11-15 181120.png', 'undefined', 14, '2025-01-14 18:26:42'),
(5, 'Test 1', 'Test ingine', 'Books', '8', 'Test', 'book', 'uploads\\media\\1736876621177-JUDAHKINYANJUICV.pdf', NULL, 'undefined', 14, '2025-01-14 20:43:41'),
(6, 'Data', 'Video Test', 'Videos', '5', 'Science', 'video', 'uploads\\media\\1736938211646-Digital Analytics Loopable Blue Technology Big Data Forecasting - 4K stock video - Getty Images.mp4', NULL, 'undefined', 14, '2025-01-15 13:50:11'),
(7, 'Big Video ', 'test Big Video', 'Videos', '7', 'entertainment', 'video', 'uploads\\media\\1736938417388-3.Body.Problem.S01E03.720p.NF.WEBRip.x264-GalaxyTV.mkv', NULL, 'undefined', 14, '2025-01-15 13:53:50'),
(8, 'Big Video ', 'test Big Video', 'Videos', '7', 'entertainment', 'video', 'uploads\\media\\1736938420534-3.Body.Problem.S01E03.720p.NF.WEBRip.x264-GalaxyTV.mkv', NULL, 'undefined', 14, '2025-01-15 13:53:52');

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
  `Student_ID` int(20) NOT NULL,
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
(33, 1, 1, 'Me', '0', '2024', 8, 'N/A', 69305, 'Active'),
(1, 3, 2, 'Sarada', '', '2025', 9, 'N/A', 34372, 'Active'),
(2, 13, 2, 'Kiddoh', 'Lamar', '2025', 9, 'N/A', 51088, 'Active'),
(3, 44, 0, 'John', 'Doe', '2025', 5, 'N/A', 41795, 'Active'),
(4, 45, 1, 'Emily', 'Smith', '2025', 6, 'N/A', 6635, 'Active'),
(5, 46, 2, 'Michael', 'Johnson', '2025', 4, 'N/A', 6778, 'Active'),
(6, 47, 3, 'Sophia', 'Brown', '2025', 3, 'N/A', 35217, 'Active'),
(7, 48, 4, 'Daniel', 'Jones', '2025', 5, 'N/A', 42610, 'Active'),
(8, 81, 2, 'Ava', 'Davis', '2025', 3, 'N/A', 95725, 'Active'),
(9, 82, 3, 'William', 'Rodriguez', '2025', 5, 'N/A', 98080, 'Active'),
(10, 83, 4, 'Isabella', 'Martinez', '2025', 6, 'N/A', 20043, 'Active'),
(11, 84, 0, 'Alexander', 'Hernandez', '2025', 4, 'N/A', 66800, 'Active'),
(12, 85, 1, 'Mia', 'Lopez', '2025', 3, 'N/A', 21083, 'Active'),
(13, 86, 2, 'James', 'Gonzalez', '2025', 5, 'N/A', 85801, 'Active'),
(14, 87, 3, 'Charlotte', 'Wilson', '2025', 6, 'N/A', 98711, 'Active'),
(15, 88, 4, 'Benjamin', 'Clark', '2025', 4, 'N/A', 95678, 'Active'),
(16, 89, 0, 'Amelia', 'Lewis', '2025', 3, 'N/A', 39123, 'Active'),
(17, 90, 1, 'Henry', 'Young', '2025', 5, 'N/A', 75345, 'Active'),
(39, 103, 4, 'Ella', 'Rodriguez', '2025', 6, 'N/A', 99356, 'Active'),
(18, 121, 4, 'Ella', 'Rodriguez', '2025', 6, 'N/A', 63388, 'Active'),
(36, 122, 2, 'Samuel', 'Wright', '2025', 4, 'N/A', 87080, 'Active'),
(37, 123, 3, 'Avery', 'Lopez', '2025', 3, 'N/A', 17458, 'Active'),
(19, 128, 3, 'Mason', '', '2025', 5, 'N/A', 7851, 'Active');

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
(1, 'Judah', 'Kinyanjui', 'judahkinyanjui@gmail.com', '0110733243', '', 2, 'Contract', '2024-12-31', 'Active');

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
-- Table structure for table `threads`
--

CREATE TABLE `threads` (
  `Thread_ID` int(11) NOT NULL,
  `Forum_ID` int(11) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `Content` text DEFAULT NULL,
  `Created_By` int(11) NOT NULL,
  `Created_At` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `threads`
--

INSERT INTO `threads` (`Thread_ID`, `Forum_ID`, `Title`, `Content`, `Created_By`, `Created_At`) VALUES
(1, 8, 'Best Books for Beginners in Programming', 'What are the best books for someone new to programming? Share your recommendations!', 14, '2025-01-02 16:00:00'),
(2, 8, 'Recommended Reading List for Computer Science Students', 'I’m looking for a reading list for computer science students. Anyone have a good list?', 15, '2025-01-02 17:15:00'),
(3, 9, 'Join Our Football Team! Sign Up Here', 'We’re forming a new football team and looking for players. Anyone interested?', 16, '2025-01-02 18:00:00'),
(4, 9, 'How to Balance Academics and Extracurricular Activities', 'What tips do you have for managing both schoolwork and extracurriculars effectively?', 16, '2025-01-02 18:45:00'),
(5, 10, 'Opportunities for Alumni Mentorship', 'Any alumni interested in offering mentorship to current students? Let’s connect!', 23, '2025-01-02 19:00:00'),
(6, 10, 'Alumni Networking Events This Month', 'Are there any upcoming alumni networking events? Please share the details!', 15, '2025-01-02 19:30:00'),
(7, 10, 'New School BUS', 'Discussion on fair usage of the prchased bus', 14, '2025-01-03 16:51:06'),
(14, 1, 'y', 'u', 14, '2025-01-03 17:31:06'),
(15, 8, 'Book', 'Study', 14, '2025-01-03 18:31:25');

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
(14, 'Lamar', '$2a$10$3LL7kkQp2yBMrrBK26gE0.le5FfOOsSlkt6ZN32WjwVv0n.Pm8ARe', 'Admin', 'lamar@mail.com'),
(15, 'Kigen', '$2a$10$ri412bT6jnrql893Wkzqc.bq2VxWAFsMep84Pvh3TSsdnoVfWfTJm', 'Teacher', 'kigen@mail.com'),
(16, 'Mosh', '$2a$10$gT4V.mtRsepf8ASUje1FAuF6XLDasqV2QPV.gv1.PcBcoiDmBIUfu', 'Student', 'mosh@mail.com'),
(17, 'Me0', '$2a$10$rDe14AnMRLFnVrug83oC0e0cgagcLP1yTLG3P.4ZwJxIef3qYsG3a', 'Student', 'me.0@school.com'),
(23, 'judah kinyanjui', '$2a$10$rCST/yWeCzRZCkV2nZFfoO.hcICOkALuyiQpmE8Jf82y8e3ifvP.W', 'teacher', 'judahkinyanjui@gmail.com'),
(24, 'sarada', '$2a$10$tV8bs4mtLi.qsshJ1dQNFeHZH6kPWI7vmMA99VDXft1uvizpHesgy', 'student', 'sarada.@mail.com'),
(25, 'mason', '$2a$10$lYyMqkm0CnImwc9qrftgre5sxdKC713iZ.JRcoeH3GQJak1cMSSmS', 'student', 'mason.@mail.com'),
(26, 'ella.rodriguez', '$2a$10$s4xMEQhnkULOZFranRzYiOYjORayZJWKxz5YyXf.V.y6GFU8J5Qe.', 'student', 'ella.rodriguez@mail.com'),
(27, 'kiddoh.lamar', '$2a$10$wx3/pRICyftFyfKYa55F.Od4o9uykIf2GU7tgkBLGkksLyVy7mKpa', 'student', 'kiddoh.lamar@mail.com'),
(28, 'john.doe', '$2a$10$lhdeo5iexkdvzo1RSBNdJe1grBPeplHX85taF9SMQb5s4of8ojXRO', 'student', 'john.doe@mail.com'),
(29, 'emily.smith', '$2a$10$5MU9skFze2.aAxEODaq7pOljyzBugOP0Vq28d0ZSNowE3a4beZYbi', 'student', 'emily.smith@mail.com'),
(30, 'michael.johnson', '$2a$10$btDqm3CQ3btIlC5T4X8Zd.IVvb1CWwZtE7TxveaYvOAUy.iOOvim.', 'student', 'michael.johnson@mail.com'),
(31, 'sophia.brown', '$2a$10$ZX24zbhP0jWQ6uN9tiUaAO6bOF8xWeVN2R2Z31uNCbJhTAUFFFbNa', 'student', 'sophia.brown@mail.com'),
(32, 'daniel.jones', '$2a$10$cvvCyVNVrGfn5/3kg7e2xuYegfXvoZMzbc70nMRzd.YI2CvIUk/gq', 'student', 'daniel.jones@mail.com'),
(33, 'alexander.hernandez', '$2a$10$kn901lQygM0Ggi5tQH7giOqnp9VoVLVwvNUihtAbzovWyGmik5Rnu', 'student', 'alexander.hernandez@mail.com'),
(34, 'mia.lopez', '$2a$10$cPnP7hE4377FJwMAfZh9huE4MNERk9zCEONPMy4pbcU43gNmx0XN.', 'student', 'mia.lopez@mail.com'),
(35, 'james.gonzalez', '$2a$10$RTIqa5zSF0XbtU8Tg6wq.uZPCandPUlfSHM/iOM5uaH/OVQ0vHlTe', 'student', 'james.gonzalez@mail.com'),
(36, 'charlotte.wilson', '$2a$10$/3xdC4RqsOTvbWUnv6OCQeJP6e11q1.KpYOIeO8m.XjTq32MLXkji', 'student', 'charlotte.wilson@mail.com'),
(37, 'benjamin.clark', '$2a$10$fTmsn/BoVgb9HN66y0xZ..175jhZYv5ses7lBZfDrnaxdc6Cd6f5u', 'student', 'benjamin.clark@mail.com'),
(38, 'amelia.lewis', '$2a$10$JXqWeCYBmA2heY2PXIl3iuCOSnDXfkpSdAA9YDIzNhGLUE31TylpK', 'student', 'amelia.lewis@mail.com'),
(39, 'henry.young', '$2a$10$tAZgga7HoS8TPBKmgpavvOqRKcmL3wTTqB9wT2uYYlLEEpSdyxLsu', 'student', 'henry.young@mail.com'),
(40, 'isabella.martinez', '$2a$10$l.2smdzRD981CN7LQVfCxe40o8D1qF66B81K9dMDA2bsGevslFm/G', 'student', 'isabella.martinez@mail.com'),
(41, 'william.rodriguez', '$2a$10$BeuYbsDhHXMxtQJgdxJrmOPkYmxW.5Y4LcMyKoBLaMhDT4TSh56wm', 'student', 'william.rodriguez@mail.com'),
(42, 'ava.davis', '$2a$10$g7/sehYevFITLjrP7Nmhp.BCQ6Qowk5VM.bi7NIyzD3/FtxgUKomm', 'student', 'ava.davis@mail.com'),
(43, 'samuel.wright', '$2a$10$DbhJAV6BQBS8wt2c.pVPdem49oVFmMswfuh.kPCKW91aqnyCiQwwK', 'student', 'samuel.wright@mail.com'),
(44, 'avery.lopez', '$2a$10$R0I4o9nTm5s1sn655N0HAusuBkXNR38TLjwDV.P70HtTbQXq2IgtO', 'student', 'avery.lopez@mail.com'),
(45, 'ella.rodriguez', '$2a$10$296owSLNzi3CNclbAM9UweDcCVeql170geRNGaJ9BLQxZFifjTS2K', 'student', 'ella.rodriguez@mail.com');

-- --------------------------------------------------------

--
-- Table structure for table `user_profile_pictures`
--

CREATE TABLE `user_profile_pictures` (
  `Picture_ID` int(11) NOT NULL,
  `User_ID` int(11) NOT NULL,
  `Picture_Path` varchar(255) NOT NULL,
  `Uploaded_At` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_profile_pictures`
--

INSERT INTO `user_profile_pictures` (`Picture_ID`, `User_ID`, `Picture_Path`, `Uploaded_At`) VALUES
(1, 14, '/uploads/profile_pictures/1737494656604-profile-pic.jpg', '2025-01-21 20:10:32');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`Admin_ID`),
  ADD KEY `User_ID` (`User_ID`);

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`Announcement_ID`),
  ADD KEY `Created_By` (`Created_By`);

--
-- Indexes for table `application`
--
ALTER TABLE `application`
  ADD PRIMARY KEY (`Application_ID`),
  ADD KEY `School_ID` (`School_ID`);

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`Blog_ID`),
  ADD KEY `Author_ID` (`Author_ID`);

--
-- Indexes for table `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`Class_ID`),
  ADD KEY `Teacher_ID` (`Teacher_ID`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`Comment_ID`),
  ADD KEY `Thread_ID` (`Thread_ID`),
  ADD KEY `FK_Comments_User` (`Created_By`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`Event_ID`),
  ADD KEY `Created_By` (`Created_By`);

--
-- Indexes for table `exams`
--
ALTER TABLE `exams`
  ADD PRIMARY KEY (`Exam_ID`),
  ADD KEY `Student_ID` (`Student_ID`),
  ADD KEY `School_ID` (`School_ID`);

--
-- Indexes for table `expenses`
--
ALTER TABLE `expenses`
  ADD PRIMARY KEY (`ExpenseID`);

--
-- Indexes for table `fees`
--
ALTER TABLE `fees`
  ADD PRIMARY KEY (`FeeID`);

--
-- Indexes for table `finance_record`
--
ALTER TABLE `finance_record`
  ADD PRIMARY KEY (`Finance_Record_ID`),
  ADD KEY `Student_ID` (`Student_ID`),
  ADD KEY `School_ID` (`School_ID`);

--
-- Indexes for table `forums`
--
ALTER TABLE `forums`
  ADD PRIMARY KEY (`Forum_ID`);

--
-- Indexes for table `grades`
--
ALTER TABLE `grades`
  ADD PRIMARY KEY (`Grade_ID`),
  ADD KEY `Student_ID` (`Student_ID`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`Message_ID`),
  ADD KEY `Sender_ID` (`Sender_ID`);

--
-- Indexes for table `resources`
--
ALTER TABLE `resources`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uploaded_by` (`uploaded_by`);

--
-- Indexes for table `school`
--
ALTER TABLE `school`
  ADD PRIMARY KEY (`School_ID`);

--
-- Indexes for table `student_record`
--
ALTER TABLE `student_record`
  ADD PRIMARY KEY (`Student_ID`),
  ADD UNIQUE KEY `Student_Record_ID` (`Student_Record_ID`),
  ADD UNIQUE KEY `Student_Record_ID_2` (`Student_Record_ID`),
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
-- Indexes for table `threads`
--
ALTER TABLE `threads`
  ADD PRIMARY KEY (`Thread_ID`),
  ADD KEY `Forum_ID` (`Forum_ID`),
  ADD KEY `FK_Threads_User` (`Created_By`);

--
-- Indexes for table `user_credentials`
--
ALTER TABLE `user_credentials`
  ADD PRIMARY KEY (`User_ID`),
  ADD UNIQUE KEY `User_ID` (`User_ID`);

--
-- Indexes for table `user_profile_pictures`
--
ALTER TABLE `user_profile_pictures`
  ADD PRIMARY KEY (`Picture_ID`),
  ADD KEY `User_ID` (`User_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `Admin_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `announcements`
--
ALTER TABLE `announcements`
  MODIFY `Announcement_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `application`
--
ALTER TABLE `application`
  MODIFY `Application_ID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=131;

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `Blog_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `Comment_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `Event_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `exams`
--
ALTER TABLE `exams`
  MODIFY `Exam_ID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
  MODIFY `ExpenseID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `fees`
--
ALTER TABLE `fees`
  MODIFY `FeeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `forums`
--
ALTER TABLE `forums`
  MODIFY `Forum_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `Message_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `resources`
--
ALTER TABLE `resources`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `student_record`
--
ALTER TABLE `student_record`
  MODIFY `Student_Record_ID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `teacher`
--
ALTER TABLE `teacher`
  MODIFY `Teacher_ID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `threads`
--
ALTER TABLE `threads`
  MODIFY `Thread_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `user_credentials`
--
ALTER TABLE `user_credentials`
  MODIFY `User_ID` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `user_profile_pictures`
--
ALTER TABLE `user_profile_pictures`
  MODIFY `Picture_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user_credentials` (`User_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `announcements`
--
ALTER TABLE `announcements`
  ADD CONSTRAINT `announcements_ibfk_1` FOREIGN KEY (`Created_By`) REFERENCES `user_credentials` (`User_ID`);

--
-- Constraints for table `application`
--
ALTER TABLE `application`
  ADD CONSTRAINT `application_ibfk_1` FOREIGN KEY (`School_ID`) REFERENCES `school` (`School_ID`);

--
-- Constraints for table `blogs`
--
ALTER TABLE `blogs`
  ADD CONSTRAINT `blogs_ibfk_1` FOREIGN KEY (`Author_ID`) REFERENCES `user_credentials` (`User_ID`);

--
-- Constraints for table `class`
--
ALTER TABLE `class`
  ADD CONSTRAINT `class_ibfk_1` FOREIGN KEY (`Teacher_ID`) REFERENCES `teacher` (`Teacher_ID`);

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `FK_Comments_User` FOREIGN KEY (`Created_By`) REFERENCES `user_credentials` (`User_ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`Thread_ID`) REFERENCES `threads` (`Thread_ID`) ON DELETE CASCADE;

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`Created_By`) REFERENCES `user_credentials` (`User_ID`);

--
-- Constraints for table `exams`
--
ALTER TABLE `exams`
  ADD CONSTRAINT `exams_ibfk_1` FOREIGN KEY (`Student_ID`) REFERENCES `student_record` (`Student_ID`),
  ADD CONSTRAINT `exams_ibfk_2` FOREIGN KEY (`School_ID`) REFERENCES `school` (`School_ID`);

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
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`Sender_ID`) REFERENCES `user_credentials` (`User_ID`);

--
-- Constraints for table `resources`
--
ALTER TABLE `resources`
  ADD CONSTRAINT `resources_ibfk_1` FOREIGN KEY (`uploaded_by`) REFERENCES `user_credentials` (`User_ID`) ON DELETE CASCADE;

--
-- Constraints for table `student_record`
--
ALTER TABLE `student_record`
  ADD CONSTRAINT `school-id` FOREIGN KEY (`School_ID`) REFERENCES `school` (`School_ID`);

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

--
-- Constraints for table `threads`
--
ALTER TABLE `threads`
  ADD CONSTRAINT `FK_Threads_User` FOREIGN KEY (`Created_By`) REFERENCES `user_credentials` (`User_ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `threads_ibfk_1` FOREIGN KEY (`Forum_ID`) REFERENCES `forums` (`Forum_ID`) ON DELETE CASCADE;

--
-- Constraints for table `user_profile_pictures`
--
ALTER TABLE `user_profile_pictures`
  ADD CONSTRAINT `user_profile_pictures_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user_credentials` (`User_ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
