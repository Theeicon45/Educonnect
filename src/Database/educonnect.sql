-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 04, 2025 at 10:11 PM
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
(1, 14, 'Lamar', ' Merlin', 'Admin', '2025-01-19 11:29:18'),
(3, 47, 'Mike', 'Inko', 'Admin', '2025-01-24 16:23:54');

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

INSERT INTO `application` (`Application_ID`, `School_ID`, `Applicant_Name`, `Second_Name`, `Date_of_Birth`, `Gender`, `Grade_Level_Applied`, `Guardian_Name`, `Guardian_Contact`, `Previous_School`, `Application_Date`, `Status`, `Admission_Date`, `Preferred_School`, `Remarks`) VALUES
(1, 1, 'Me', '0', '2009-02-10', 'Male', 8, 'Eye', '0700003526', 'kac', '2024-12-23', 'Accepted', '2025-01-09', 'Terry and Kay Kisumu', 'mmmh'),
(13, 2, 'Kiddoh', 'Lamar', '2009-02-11', 'Male', 9, 'Ken', '0700003526', 'kac', '2024-12-27', 'Accepted', '2025-01-09', 'Terry and Kay Makueni', 'Test'),
(44, 0, 'John', 'Doe', '2010-04-15', 'Male', 5, 'Jane Doe', '123456789', 'ABC Elementary', '2025-01-09', 'Accepted', '2025-01-09', 'XYZ School', 'N/A'),
(45, 1, 'Emily', 'Smith', '2011-05-20', 'Female', 6, 'David Smith', '987654321', 'DEF Elementary', '2025-01-09', 'Accepted', '2025-01-09', 'ABC School', 'N/A'),
(46, 2, 'Michael', 'Johnson', '2012-06-25', 'Male', 4, 'Sarah Johnson', '456123789', 'GHI Elementary', '2025-01-09', 'Accepted', '2025-01-09', 'MNO School', 'N/A'),
(47, 3, 'Sophia', 'Brown', '2013-07-30', 'Female', 3, 'James Brown', '789456123', 'JKL Elementary', '2025-01-09', 'Accepted', '2025-01-09', 'PQR School', 'N/A'),
(48, 4, 'Daniel', 'Jones', '2010-08-05', 'Male', 5, 'Linda Jones', '321654987', 'MNO Elementary', '2025-01-09', 'Accepted', '2025-01-09', 'STU School', 'N/A'),
(50, 1, 'Ethan', 'Martinez', '2012-10-15', 'Male', 4, 'Patricia Martinez', '789321456', 'STU Elementary', '2025-01-09', 'Accepted', '2025-01-27', 'ABC School', 'N/A'),
(51, 2, 'Ava', 'Davis', '2013-11-20', 'Female', 3, 'Charles Davis', '321789654', 'VWX Elementary', '2025-01-09', 'Accepted', '2025-02-02', 'DEF School', 'N/A'),
(52, 3, 'William', 'Rodriguez', '2010-12-25', 'Male', 5, 'Barbara Rodriguez', '654321789', 'YZA Elementary', '2025-01-09', 'Accepted', '2025-02-23', 'GHI School', 'N/A'),
(53, 4, 'Isabella', 'Martinez', '2011-01-05', 'Female', 6, 'Matthew Martinez', '987123456', 'BCD Elementary', '2025-01-09', 'Pending', NULL, 'JKL School', 'N/A'),
(54, 0, 'Alexander', 'Hernandez', '2012-02-10', 'Male', 4, 'Sandra Hernandez', '123987654', 'EFG Elementary', '2025-01-09', 'Pending', NULL, 'MNO School', 'N/A'),
(55, 1, 'Mia', 'Lopez', '2013-03-15', 'Female', 3, 'Steven Lopez', '456789321', 'HIJ Elementary', '2025-01-09', 'Pending', NULL, 'PQR School', 'N/A'),
(56, 2, 'James', 'Gonzalez', '2010-04-20', 'Male', 5, 'Laura Gonzalez', '789123654', 'KLM Elementary', '2025-01-09', 'Pending', NULL, 'STU School', 'N/A'),
(57, 3, 'Charlotte', 'Wilson', '2011-05-25', 'Female', 6, 'Frank Wilson', '321456987', 'NOP Elementary', '2025-01-09', 'Pending', NULL, 'VWX School', 'N/A'),
(58, 4, 'Benjamin', 'Clark', '2012-06-30', 'Male', 4, 'Diana Clark', '654123789', 'QRS Elementary', '2025-01-09', 'Pending', NULL, 'ABC School', 'N/A'),
(59, 0, 'Amelia', 'Lewis', '2013-07-05', 'Female', 3, 'George Lewis', '987654123', 'TUV Elementary', '2025-01-09', 'Pending', NULL, 'DEF School', 'N/A'),
(60, 1, 'Henry', 'Young', '2010-08-10', 'Male', 5, 'Nancy Young', '456321789', 'WXY Elementary', '2025-01-09', 'Accepted', '2025-02-21', 'GHI School', 'N/A'),
(61, 2, 'Evelyn', 'Hall', '2011-09-15', 'Female', 6, 'Paul Hall', '321654123', 'ZAB Elementary', '2025-01-09', 'Pending', NULL, 'JKL School', 'N/A'),
(62, 3, 'Joseph', 'Allen', '2012-10-20', 'Male', 4, 'Elizabeth Allen', '654987789', 'CDE Elementary', '2025-01-09', 'Pending', NULL, 'MNO School', 'N/A'),
(63, 4, 'Grace', 'Young', '2013-11-25', 'Female', 3, 'Christopher Young', '789654123', 'FGH Elementary', '2025-01-09', 'Pending', NULL, 'PQR School', 'N/A'),
(64, 0, 'David', 'Hernandez', '2010-12-05', 'Male', 5, 'Karen Hernandez', '321789456', 'IJK Elementary', '2025-01-09', 'Pending', NULL, 'STU School', 'N/A'),
(65, 1, 'Emma', 'King', '2011-01-10', 'Female', 6, 'Daniel King', '654321123', 'LMN Elementary', '2025-01-09', 'Pending', NULL, 'VWX School', 'N/A'),
(66, 2, 'Samuel', 'Wright', '2012-02-15', 'Male', 4, 'Rebecca Wright', '987123789', 'OPQ Elementary', '2025-01-09', 'Pending', NULL, 'ABC School', 'N/A'),
(67, 3, 'Avery', 'Lopez', '2013-03-20', 'Female', 3, 'Timothy Lopez', '123654987', 'RST Elementary', '2025-01-09', 'Pending', NULL, 'DEF School', 'N/A'),
(68, 4, 'Jack', 'Hernandez', '2010-04-25', 'Male', 5, 'Stephanie Hernandez', '456789123', 'UVW Elementary', '2025-01-09', 'Pending', NULL, 'GHI School', 'N/A'),
(69, 0, 'Sofia', 'Martinez', '2011-05-30', 'Female', 6, 'Gary Martinez', '789321987', 'XYZ Elementary', '2025-01-09', 'Pending', NULL, 'JKL School', 'N/A'),
(70, 1, 'Elijah', 'Johnson', '2012-06-05', 'Male', 4, 'Hannah Johnson', '321987654', 'BCD Elementary', '2025-01-09', 'Pending', NULL, 'MNO School', 'N/A'),
(71, 2, 'Harper', 'Smith', '2013-07-10', 'Female', 3, 'Anthony Smith', '654123321', 'EFG Elementary', '2025-01-09', 'Pending', NULL, 'PQR School', 'N/A'),
(72, 3, 'Mason', 'Brown', '2010-08-15', 'Male', 5, 'Sharon Brown', '987321456', 'HIJ Elementary', '2025-01-09', 'Pending', NULL, 'STU School', 'N/A'),
(73, 4, 'Ella', 'Rodriguez', '2011-09-10', 'Female', 6, 'Peter Rodriguez', '321654789', 'KLM Elementary', '2025-01-09', 'Pending', NULL, 'VWX School', 'N/A'),
(74, 0, 'John', 'Doe', '2010-04-15', 'Male', 5, 'Jane Doe', '123456789', 'ABC Elementary', '2025-01-09', 'Pending', NULL, 'XYZ School', 'N/A'),
(75, 1, 'Emily', 'Smith', '2011-05-20', 'Female', 6, 'David Smith', '987654321', 'DEF Elementary', '2025-01-09', 'Pending', NULL, 'ABC School', 'N/A'),
(76, 2, 'Michael', 'Johnson', '2012-06-25', 'Male', 4, 'Sarah Johnson', '456123789', 'GHI Elementary', '2025-01-09', 'Pending', NULL, 'MNO School', 'N/A'),
(77, 3, 'Sophia', 'Brown', '2013-07-30', 'Female', 3, 'James Brown', '789456123', 'JKL Elementary', '2025-01-09', 'Pending', NULL, 'PQR School', 'N/A'),
(78, 4, 'Daniel', 'Jones', '2010-08-05', 'Male', 5, 'Linda Jones', '321654987', 'MNO Elementary', '2025-01-09', 'Pending', NULL, 'STU School', 'N/A'),
(79, 0, 'Olivia', 'Garcia', '2011-09-10', 'Female', 6, 'Robert Garcia', '654987321', 'PQR Elementary', '2025-01-09', 'Pending', NULL, 'VWX School', 'N/A'),
(80, 1, 'Ethan', 'Martinez', '2012-10-15', 'Male', 4, 'Patricia Martinez', '789321456', 'STU Elementary', '2025-01-09', 'Pending', NULL, 'ABC School', 'N/A'),
(81, 2, 'Ava', 'Davis', '2013-11-20', 'Female', 3, 'Charles Davis', '321789654', 'VWX Elementary', '2025-01-09', 'Accepted', '2025-01-09', 'DEF School', 'N/A'),
(82, 3, 'William', 'Rodriguez', '2010-12-25', 'Male', 5, 'Barbara Rodriguez', '654321789', 'YZA Elementary', '2025-01-09', 'Accepted', '2025-01-09', 'GHI School', 'N/A'),
(83, 4, 'Isabella', 'Martinez', '2011-01-05', 'Female', 6, 'Matthew Martinez', '987123456', 'BCD Elementary', '2025-01-09', 'Accepted', '2025-01-09', 'JKL School', 'N/A'),
(84, 0, 'Alexander', 'Hernandez', '2012-02-10', 'Male', 4, 'Sandra Hernandez', '123987654', 'EFG Elementary', '2025-01-09', 'Accepted', '2025-01-09', 'MNO School', 'N/A'),
(85, 1, 'Mia', 'Lopez', '2013-03-15', 'Female', 3, 'Steven Lopez', '456789321', 'HIJ Elementary', '2025-01-09', 'Accepted', '2025-01-09', 'PQR School', 'N/A'),
(86, 2, 'James', 'Gonzalez', '2010-04-20', 'Male', 5, 'Laura Gonzalez', '789123654', 'KLM Elementary', '2025-01-09', 'Accepted', '2025-01-09', 'STU School', 'N/A'),
(87, 3, 'Charlotte', 'Wilson', '2011-05-25', 'Female', 6, 'Frank Wilson', '321456987', 'NOP Elementary', '2025-01-09', 'Accepted', '2025-01-09', 'VWX School', 'N/A'),
(88, 4, 'Benjamin', 'Clark', '2012-06-30', 'Male', 4, 'Diana Clark', '654123789', 'QRS Elementary', '2025-01-09', 'Accepted', '2025-01-09', 'ABC School', 'N/A'),
(89, 0, 'Amelia', 'Lewis', '2013-07-05', 'Female', 3, 'George Lewis', '987654123', 'TUV Elementary', '2025-01-09', 'Accepted', '2025-01-09', 'DEF School', 'N/A'),
(90, 1, 'Henry', 'Young', '2010-08-10', 'Male', 5, 'Nancy Young', '456321789', 'WXY Elementary', '2025-01-09', 'Accepted', '2025-01-09', 'GHI School', 'N/A'),
(91, 2, 'Evelyn', 'Hall', '2011-09-15', 'Female', 6, 'Paul Hall', '321654123', 'ZAB Elementary', '2025-01-09', 'Pending', NULL, 'JKL School', 'N/A'),
(92, 3, 'Joseph', 'Allen', '2012-10-20', 'Male', 4, 'Elizabeth Allen', '654987789', 'CDE Elementary', '2025-01-09', 'Pending', NULL, 'MNO School', 'N/A'),
(93, 4, 'Grace', 'Young', '2013-11-25', 'Female', 3, 'Christopher Young', '789654123', 'FGH Elementary', '2025-01-09', 'Pending', NULL, 'PQR School', 'N/A'),
(94, 0, 'David', 'Hernandez', '2010-12-05', 'Male', 5, 'Karen Hernandez', '321789456', 'IJK Elementary', '2025-01-09', 'Pending', NULL, 'STU School', 'N/A'),
(95, 1, 'Emma', 'King', '2011-01-10', 'Female', 6, 'Daniel King', '654321123', 'LMN Elementary', '2025-01-09', 'Pending', NULL, 'VWX School', 'N/A'),
(96, 2, 'Samuel', 'Wright', '2012-02-15', 'Male', 4, 'Rebecca Wright', '987123789', 'OPQ Elementary', '2025-01-09', 'Pending', NULL, 'ABC School', 'N/A'),
(97, 3, 'Avery', 'Lopez', '2013-03-20', 'Female', 3, 'Timothy Lopez', '123654987', 'RST Elementary', '2025-01-09', 'Pending', NULL, 'DEF School', 'N/A'),
(98, 4, 'Jack', 'Hernandez', '2010-04-25', 'Male', 5, 'Stephanie Hernandez', '456789123', 'UVW Elementary', '2025-01-09', 'Pending', NULL, 'GHI School', 'N/A'),
(99, 0, 'Sofia', 'Martinez', '2011-05-30', 'Female', 6, 'Gary Martinez', '789321987', 'XYZ Elementary', '2025-01-09', 'Pending', NULL, 'JKL School', 'N/A'),
(100, 1, 'Elijah', 'Johnson', '2012-06-05', 'Male', 4, 'Hannah Johnson', '321987654', 'BCD Elementary', '2025-01-09', 'Pending', NULL, 'MNO School', 'N/A'),
(101, 2, 'Harper', 'Smith', '2013-07-10', 'Female', 3, 'Anthony Smith', '654123321', 'EFG Elementary', '2025-01-09', 'Pending', NULL, 'PQR School', 'N/A'),
(102, 3, 'Mason', 'Brown', '2010-08-15', 'Male', 5, 'Sharon Brown', '987321456', 'HIJ Elementary', '2025-01-09', 'Pending', NULL, 'STU School', 'N/A'),
(103, 4, 'Ella', 'Rodriguez', '2011-09-10', 'Female', 6, 'Peter Rodriguez', '321654789', 'KLM Elementary', '2025-01-09', 'Accepted', '2025-01-15', 'VWX School', 'N/A'),
(104, 2, 'James', 'Gonzalez', '2010-04-20', 'Male', 5, 'Laura Gonzalez', '789123654', 'KLM Elementary', '2025-01-09', 'Pending', NULL, 'STU School', 'N/A'),
(105, 3, 'Charlotte', 'Wilson', '2011-05-25', 'Female', 6, 'Frank Wilson', '321456987', 'NOP Elementary', '2025-01-09', 'Pending', NULL, 'VWX School', 'N/A'),
(106, 4, 'Benjamin', 'Clark', '2012-06-30', 'Male', 4, 'Diana Clark', '654123789', 'QRS Elementary', '2025-01-09', 'Pending', NULL, 'ABC School', 'N/A'),
(107, 0, 'Amelia', 'Lewis', '2013-07-05', 'Female', 3, 'George Lewis', '987654123', 'TUV Elementary', '2025-01-09', 'Pending', NULL, 'DEF School', 'N/A'),
(108, 1, 'Henry', 'Young', '2010-08-10', 'Male', 5, 'Nancy Young', '456321789', 'WXY Elementary', '2025-01-09', 'Pending', NULL, 'GHI School', 'N/A'),
(109, 2, 'Evelyn', 'Hall', '2011-09-15', 'Female', 6, 'Paul Hall', '321654123', 'ZAB Elementary', '2025-01-09', 'Pending', NULL, 'JKL School', 'N/A'),
(110, 3, 'Joseph', 'Allen', '2012-10-20', 'Male', 4, 'Elizabeth Allen', '654987789', 'CDE Elementary', '2025-01-09', 'Pending', NULL, 'MNO School', 'N/A'),
(111, 4, 'Grace', 'Young', '2013-11-25', 'Female', 3, 'Christopher Young', '789654123', 'FGH Elementary', '2025-01-09', 'Pending', NULL, 'PQR School', 'N/A'),
(112, 0, 'David', 'Hernandez', '2010-12-05', 'Male', 5, 'Karen Hernandez', '321789456', 'IJK Elementary', '2025-01-09', 'Pending', NULL, 'STU School', 'N/A'),
(113, 1, 'Emma', 'King', '2011-01-10', 'Female', 6, 'Daniel King', '654321123', 'LMN Elementary', '2025-01-09', 'Pending', NULL, 'VWX School', 'N/A'),
(114, 2, 'Samuel', 'Wright', '2012-02-15', 'Male', 4, 'Rebecca Wright', '987123789', 'OPQ Elementary', '2025-01-09', 'Pending', NULL, 'ABC School', 'N/A'),
(115, 3, 'Avery', 'Lopez', '2013-03-20', 'Female', 3, 'Timothy Lopez', '123654987', 'RST Elementary', '2025-01-09', 'Pending', NULL, 'DEF School', 'N/A'),
(116, 4, 'Jack', 'Hernandez', '2010-04-25', 'Male', 5, 'Stephanie Hernandez', '456789123', 'UVW Elementary', '2025-01-09', 'Pending', NULL, 'GHI School', 'N/A'),
(117, 0, 'Sofia', 'Martinez', '2011-05-30', 'Female', 6, 'Gary Martinez', '789321987', 'XYZ Elementary', '2025-01-09', 'Pending', NULL, 'JKL School', 'N/A'),
(118, 1, 'Elijah', 'Johnson', '2012-06-05', 'Male', 4, 'Hannah Johnson', '321987654', 'BCD Elementary', '2025-01-09', 'Pending', NULL, 'MNO School', 'N/A'),
(119, 2, 'Harper', 'Smith', '2013-07-10', 'Female', 3, 'Anthony Smith', '654123321', 'EFG Elementary', '2025-01-09', 'Pending', NULL, 'PQR School', 'N/A'),
(120, 3, 'Mason', 'Brown', '2010-08-15', 'Male', 5, 'Sharon Brown', '987321456', 'HIJ Elementary', '2025-01-09', 'Pending', NULL, 'STU School', 'N/A'),
(121, 4, 'Ella', 'Rodriguez', '2011-09-10', 'Female', 6, 'Peter Rodriguez', '321654789', 'KLM Elementary', '2025-01-09', 'Accepted', '2025-01-09', 'VWX School', 'N/A'),
(122, 2, 'Samuel', 'Wright', '2012-02-15', 'Male', 4, 'Rebecca Wright', '987123789', 'OPQ Elementary', '2025-01-09', 'Accepted', '2025-01-15', 'ABC School', 'N/A'),
(123, 3, 'Avery', 'Lopez', '2013-03-20', 'Female', 3, 'Timothy Lopez', '123654987', 'RST Elementary', '2025-01-09', 'Accepted', '2025-01-15', 'DEF School', 'N/A'),
(124, 4, 'Jack', 'Hernandez', '2010-04-25', 'Male', 5, 'Stephanie Hernandez', '456789123', 'UVW Elementary', '2025-01-09', 'Pending', NULL, 'GHI School', 'N/A'),
(125, 0, 'Sofia', 'Martinez', '2011-05-30', 'Female', 6, 'Gary Martinez', '789321987', 'XYZ Elementary', '2025-01-09', 'Accepted', '2025-01-15', 'JKL School', 'N/A'),
(126, 1, 'Elijah', 'Johnson', '2012-06-05', 'Male', 4, 'Hannah Johnson', '321987654', 'BCD Elementary', '2025-01-09', 'Pending', NULL, 'MNO School', 'N/A'),
(127, 2, 'Harper', 'Smith', '2013-07-10', 'Female', 3, 'Anthony Smith', '654123321', 'EFG Elementary', '2025-01-09', 'Pending', NULL, 'PQR School', 'N/A'),
(128, 3, 'Mason', 'Brown', '2010-08-15', 'Male', 5, 'Sharon Brown', '987321456', 'HIJ Elementary', '2025-01-09', 'Accepted', '2025-01-09', 'STU School', 'N/A'),
(129, 4, 'Ella', 'Rodriguez', '2011-09-10', 'Female', 6, 'Peter Rodriguez', '321654789', 'KLM Elementary', '2025-01-09', 'Pending', NULL, 'VWX School', 'N/A'),
(130, 3, 'New', 'Test', '2010-09-09', 'Male', 9, 'NNew', '0123456789', 'none', '2025-12-20', NULL, NULL, 'Terry and Kay Kitengela', 'Test'),
(131, 4, 'John ', 'Smith', '2005-05-10', 'Male', 8, 'Guardian1', 'Contact123', 'SchoolA', '2025-02-23', 'Pending', NULL, 'Preferred1', 'Remark1'),
(132, 1, 'Jane ', 'Johnson', '2006-08-15', 'Female', 9, 'Guardian2', 'Contact456', 'SchoolB', '2025-02-23', 'Pending', NULL, 'Preferred2', 'Remark2'),
(133, 0, 'Alex ', 'Brown', '2004-11-22', 'Non-Binary', 10, 'Guardian3', 'Contact789', 'SchoolC', '2025-02-23', 'Accepted', '2025-02-24', 'Preferred3', 'Remark3'),
(134, 0, 'Chris ', 'Williams', '2007-02-18', 'Male', 11, 'Guardian4', 'Contact012', 'SchoolD', '2025-02-23', 'Accepted', '2025-02-24', 'Preferred4', 'Remark4'),
(135, 3, 'Taylor ', 'Jones', '2003-07-30', 'Female', 12, 'Guardian5', 'Contact345', 'SchoolE', '2025-02-23', 'Accepted', '2025-02-24', 'Preferred5', 'Remark5'),
(136, 0, 'Sam ', 'Garcia', '2005-01-25', 'Male', 8, 'Guardian1', 'Contact678', 'SchoolA', '2025-02-23', 'Accepted', '2025-02-24', 'Preferred1', 'Remark1'),
(137, 5, 'Morgan ', 'Miller', '2006-09-08', 'Female', 9, 'Guardian2', 'Contact123', 'SchoolB', '2025-02-23', 'Accepted', '2025-02-24', 'Preferred2', 'Remark2'),
(138, 4, 'Jordan ', 'Davis', '2004-12-03', 'Non-Binary', 10, 'Guardian3', 'Contact456', 'SchoolC', '2025-02-23', 'Accepted', '2025-02-24', 'Preferred3', 'Remark3'),
(139, 2, 'Cameron ', 'Martinez', '2007-03-21', 'Male', 11, 'Guardian4', 'Contact789', 'SchoolD', '2025-02-23', 'Accepted', '2025-02-24', 'Preferred4', 'Remark4'),
(140, 2, 'Riley ', 'Hernandez', '2003-06-27', 'Female', 12, 'Guardian5', 'Contact012', 'SchoolE', '2025-02-23', 'Accepted', '2025-02-24', 'Preferred5', 'Remark5'),
(141, 1, 'Chris ', 'Smith', '2005-05-10', 'Male', 8, 'Guardian1', 'Contact123', 'SchoolA', '2025-02-23', 'Accepted', '2025-02-24', 'Preferred1', 'Remark1'),
(142, 0, 'Taylor ', 'Johnson', '2006-08-15', 'Female', 9, 'Guardian2', 'Contact456', 'SchoolB', '2025-02-23', 'Accepted', '2025-02-24', 'Preferred2', 'Remark2'),
(143, 3, 'Sam ', 'Brown', '2004-11-22', 'Non-Binary', 10, 'Guardian3', 'Contact789', 'SchoolC', '2025-02-23', 'Accepted', '2025-02-24', 'Preferred3', 'Remark3'),
(144, 2, 'Alex ', 'Williams', '2007-02-18', 'Male', 11, 'Guardian4', 'Contact012', 'SchoolD', '2025-02-23', 'Accepted', '2025-02-24', 'Preferred4', 'Remark4'),
(145, 0, 'John ', 'Smith', '2005-05-10', 'Male', 8, 'Guardian1', 'Contact123', 'SchoolA', '2025-02-23', 'Accepted', '2025-02-24', 'Preferred1', 'Remark1'),
(146, 1, 'Jane ', 'Johnson', '2006-08-15', 'Female', 9, 'Guardian2', 'Contact456', 'SchoolB', '2025-02-23', 'Accepted', '2025-02-24', 'Preferred2', 'Remark2'),
(147, 1, 'Alex ', 'Brown', '2004-11-22', 'Non-Binary', 10, 'Guardian3', 'Contact789', 'SchoolC', '2025-02-23', 'Accepted', '2025-02-24', 'Preferred3', 'Remark3'),
(148, 4, 'Chris ', 'Williams', '2007-02-18', 'Male', 11, 'Guardian4', 'Contact012', 'SchoolD', '2025-02-23', 'Accepted', '2025-02-24', 'Preferred4', 'Remark4'),
(149, 4, 'Taylor ', 'Jones', '2003-07-30', 'Female', 12, 'Guardian5', 'Contact345', 'SchoolE', '2025-02-23', 'Accepted', '2025-02-24', 'Preferred5', 'Remark5'),
(150, 2, 'Sam ', 'Garcia', '2005-01-25', 'Male', 8, 'Guardian1', 'Contact678', 'SchoolA', '2025-02-23', 'Accepted', '2025-02-24', 'Preferred1', 'Remark1'),
(151, 5, 'Morgan ', 'Miller', '2006-09-08', 'Female', 9, 'Guardian2', 'Contact123', 'SchoolB', '2025-02-23', 'Accepted', '2025-02-24', 'Preferred2', 'Remark2'),
(152, 2, 'Jordan ', 'Davis', '2004-12-03', 'Non-Binary', 10, 'Guardian3', 'Contact456', 'SchoolC', '2025-02-23', 'Accepted', '2025-02-24', 'Preferred3', 'Remark3'),
(153, 3, 'Cameron ', 'Martinez', '2007-03-21', 'Male', 11, 'Guardian4', 'Contact789', 'SchoolD', '2025-02-23', 'Accepted', '2025-02-24', 'Preferred4', 'Remark4'),
(154, 2, 'Riley ', 'Hernandez', '2003-06-27', 'Female', 12, 'Guardian5', 'Contact012', 'SchoolE', '2025-02-23', 'Accepted', '2025-02-24', 'Preferred5', 'Remark5'),
(155, 0, 'Chris ', 'Smith', '2005-05-10', 'Male', 8, 'Guardian1', 'Contact123', 'SchoolA', '2025-02-23', 'Accepted', '2025-02-24', 'Preferred1', 'Remark1'),
(156, 0, 'Taylor ', 'Johnson', '2006-08-15', 'Female', 9, 'Guardian2', 'Contact456', 'SchoolB', '2025-02-23', 'Accepted', '2025-02-24', 'Preferred2', 'Remark2'),
(157, 0, 'Sumn ', 'Brown', '2004-11-22', 'Non-Binary', 10, 'Guardian3', 'Contact789', 'SchoolC', '2025-02-23', 'Accepted', '2025-02-24', 'Preferred3', 'Remark3'),
(158, 2, 'Alexis ', 'Williams', '2007-02-18', 'Male', 11, 'Guardian4', 'Contact012', 'SchoolD', '2025-02-23', 'Accepted', '2025-02-24', 'Preferred4', 'Remark4'),
(159, 1, 'John', 'Doe', '2008-01-15', 'Male', 10, 'Jane Doe', '123456789', 'Old School', '2025-02-24', 'Accepted', '2025-02-24', 'School A', 'No remarks'),
(160, 2, 'Alice', 'Smith', '2007-11-20', 'Female', 11, 'Bob Smith', '987654321', 'Other School', '2025-02-24', 'Accepted', '2025-02-24', 'School B', 'No remarks'),
(161, 3, 'Michael', 'Johnson', '2008-05-10', 'Male', 9, 'Mary Johnson', '456789123', 'Old School', '2025-02-24', 'Accepted', '2025-02-24', 'School C', 'No remarks'),
(162, 4, 'Emily', 'Williams', '2007-07-22', 'Female', 12, 'John Williams', '321654987', 'Other School', '2025-02-24', 'Accepted', '2025-02-24', 'School D', 'No remarks'),
(163, 5, 'David', 'Brown', '2008-09-05', 'Male', 8, 'Sarah Brown', '789123456', 'Old School', '2025-02-24', 'Accepted', '2025-02-24', 'School E', 'No remarks'),
(164, 0, 'Olivia', 'Jones', '2007-12-15', 'Female', 10, 'Chris Jones', '654321987', 'Other School', '2025-02-24', 'Accepted', '2025-02-24', 'School F', 'No remarks'),
(165, 1, 'Daniel', 'Garcia', '2008-03-25', 'Male', 9, 'Anna Garcia', '123789456', 'Old School', '2025-02-24', 'Accepted', '2025-02-24', 'School G', 'No remarks'),
(166, 2, 'Sophia', 'Martinez', '2007-08-30', 'Female', 11, 'Carlos Martinez', '987321654', 'Other School', '2025-02-24', 'Accepted', '2025-02-24', 'School H', 'No remarks'),
(167, 3, 'James', 'Lopez', '2008-02-12', 'Male', 10, 'Maria Lopez', '456123789', 'Old School', '2025-02-24', 'Accepted', '2025-02-24', 'School I', 'No remarks'),
(168, 4, 'Isabella', 'Gonzalez', '2007-06-18', 'Female', 12, 'Juan Gonzalez', '321987654', 'Other School', '2025-02-24', 'Accepted', '2025-02-24', 'School J', 'No remarks'),
(169, 5, 'Christopher', 'Wilson', '2008-04-07', 'Male', 8, 'Laura Wilson', '789456123', 'Old School', '2025-02-24', 'Accepted', '2025-02-24', 'School K', 'No remarks'),
(170, 0, 'Ava', 'Anderson', '2007-10-22', 'Female', 10, 'Robert Anderson', '654789321', 'Other School', '2025-02-24', 'Accepted', '2025-02-24', 'School L', 'No remarks'),
(171, 1, 'Matthew', 'Thomas', '2008-01-09', 'Male', 9, 'Linda Thomas', '123456321', 'Old School', '2025-02-24', 'Accepted', '2025-02-24', 'School M', 'No remarks'),
(172, 2, 'Mia', 'Taylor', '2007-11-27', 'Female', 11, 'David Taylor', '987654123', 'Other School', '2025-02-24', 'Accepted', '2025-02-24', 'School N', 'No remarks'),
(173, 3, 'Joshua', 'Moore', '2008-06-15', 'Male', 12, 'Lisa Moore', '456789654', 'Old School', '2025-02-24', 'Accepted', '2025-02-24', 'School O', 'No remarks'),
(174, 4, 'Logan', 'Evans', '2008-04-10', 'Male', 9, 'Megan Evans', '123654987', 'Old School', '2025-02-24', 'Accepted', '2025-02-24', 'School P', 'No remarks'),
(175, 5, 'Lily', 'Parker', '2007-09-08', 'Female', 12, 'James Parker', '987321456', 'Other School', '2025-02-24', 'Accepted', '2025-02-24', 'School Q', 'No remarks'),
(176, 0, 'Noah', 'Harris', '2008-07-14', 'Male', 8, 'Emily Harris', '654789123', 'Old School', '2025-02-24', 'Accepted', '2025-02-24', 'School R', 'No remarks'),
(177, 1, 'Aiden', 'Hall', '2007-06-25', 'Male', 10, 'Rebecca Hall', '789123654', 'Other School', '2025-02-24', 'Accepted', '2025-02-24', 'School S', 'No remarks'),
(178, 2, 'Chloe', 'Clark', '2008-03-11', 'Female', 11, 'Joshua Clark', '123456987', 'Old School', '2025-02-24', 'Accepted', '2025-02-24', 'School T', 'No remarks'),
(179, 3, 'Ethan', 'Adams', '2007-10-17', 'Male', 12, 'Sophia Adams', '987654789', 'Other School', '2025-02-24', 'Accepted', '2025-02-24', 'School U', 'No remarks'),
(180, 4, 'Avery', 'Baker', '2008-12-21', 'Female', 8, 'Michael Baker', '321987456', 'Old School', '2025-02-24', 'Accepted', '2025-02-24', 'School V', 'No remarks'),
(181, 5, 'Mason', 'Carter', '2007-08-29', 'Male', 10, 'Elizabeth Carter', '654321789', 'Other School', '2025-02-24', 'Accepted', '2025-02-24', 'School W', 'No remarks'),
(182, 0, 'Ella', 'Lee', '2008-05-06', 'Female', 11, 'David Lee', '123789654', 'Old School', '2025-02-24', 'Accepted', '2025-02-24', 'School X', 'No remarks'),
(183, 1, 'Lucas', 'Young', '2007-07-18', 'Male', 9, 'Karen Young', '987123456', 'Other School', '2025-02-24', 'Accepted', '2025-02-24', 'School Y', 'No remarks'),
(184, 2, 'Grace', 'Allen', '2008-11-09', 'Female', 10, 'Brian Allen', '654987321', 'Old School', '2025-02-24', 'Accepted', '2025-02-24', 'School Z', 'No remarks'),
(185, 3, 'Jayden', 'King', '2007-04-03', 'Male', 12, 'Laura King', '789654123', 'Other School', '2025-02-24', 'Accepted', '2025-02-24', 'School AA', 'No remarks'),
(186, 4, 'Mila', 'Wright', '2008-02-27', 'Female', 8, 'Charles Wright', '321654789', 'Old School', '2025-02-24', 'Accepted', '2025-02-24', 'School BB', 'No remarks'),
(187, 5, 'Carter', 'Scott', '2007-12-12', 'Male', 11, 'Alice Scott', '123456321', 'Other School', '2025-02-24', 'Accepted', '2025-02-24', 'School CC', 'No remarks'),
(188, 0, 'Zoe', 'Green', '2008-08-23', 'Female', 9, 'William Green', '987321789', 'Old School', '2025-02-24', 'Accepted', '2025-02-24', 'School DD', 'No remarks');

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `Attendance_ID` int(11) NOT NULL,
  `Student_ID` int(11) NOT NULL,
  `Teacher_ID` int(11) NOT NULL,
  `Subject` varchar(255) NOT NULL,
  `Lesson_Date` date NOT NULL,
  `Start_Time` time NOT NULL,
  `End_Time` time NOT NULL,
  `Status` enum('Present','Absent','Late','Excused') NOT NULL DEFAULT 'Absent',
  `Recorded_At` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`Attendance_ID`, `Student_ID`, `Teacher_ID`, `Subject`, `Lesson_Date`, `Start_Time`, `End_Time`, `Status`, `Recorded_At`) VALUES
(4, 150, 1, 'Mathematics', '2025-02-24', '11:00:00', '13:00:00', 'Present', '2025-02-23 21:58:19'),
(5, 152, 1, 'Mathematics', '2025-02-24', '11:00:00', '13:00:00', 'Present', '2025-02-23 21:58:19'),
(6, 184, 1, 'Mathematics', '2025-02-24', '11:00:00', '13:00:00', 'Present', '2025-02-23 21:58:19'),
(7, 150, 1, 'Mathematics', '2025-02-24', '08:00:00', '10:00:00', 'Present', '2025-02-23 21:59:28'),
(8, 152, 1, 'Mathematics', '2025-02-24', '08:00:00', '10:00:00', 'Present', '2025-02-23 21:59:28'),
(9, 184, 1, 'Mathematics', '2025-02-24', '08:00:00', '10:00:00', 'Present', '2025-02-23 21:59:28');

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
-- Table structure for table `chats`
--

CREATE TABLE `chats` (
  `id` int(11) NOT NULL,
  `participant1_id` int(11) NOT NULL,
  `participant2_id` int(11) NOT NULL,
  `last_message` text DEFAULT NULL,
  `last_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chats`
--

INSERT INTO `chats` (`id`, `participant1_id`, `participant2_id`, `last_message`, `last_updated`) VALUES
(1, 23, 14, 'Hi ,How may I be of help?', '2025-03-04 20:57:52'),
(2, 23, 15, 'Good Morning', '2025-03-03 13:40:04'),
(3, 23, 23, 'Hi', '2025-02-28 21:18:25');

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
(6, 7, 'HI', 14, '2025-01-15 15:59:40'),
(7, 14, 'Another One', 14, '2025-03-04 22:31:50');

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
(47, 122, 'Samuel Wright', '4', 'Tuition Fees', 35000.00, 8634.00, '2025-02-14', 'Partially Paid', 'Bank Transfer', '2025-01-15 11:56:52', '2025-02-17 19:14:12'),
(48, 123, 'Avery Lopez', '3', 'Tuition Fee', 35000.00, 0.00, '2025-02-14', 'Unpaid', NULL, '2025-01-15 11:56:57', '2025-01-15 11:56:57'),
(49, 103, 'Ella Rodriguez', '6', 'Tuition Fee', 35000.00, 0.00, '2025-02-14', 'Unpaid', NULL, '2025-01-15 11:57:21', '2025-01-15 11:57:21'),
(50, 50, 'Ethan Martinez', '4', 'Tuition Fee', 35000.00, 0.00, '2025-02-26', 'Unpaid', NULL, '2025-01-27 11:51:06', '2025-01-27 11:51:06'),
(51, 51, 'Ava Davis', '3', 'Tuition Fee', 35000.00, 0.00, '2025-03-04', 'Unpaid', NULL, '2025-02-01 21:46:53', '2025-02-01 21:46:53'),
(52, 122, '', '', 'Tuition Fees', 0.00, 8634.00, '0000-00-00', 'Partially Paid', 'Bank Transfer', '2025-02-11 21:16:04', '2025-02-17 19:14:12'),
(53, 60, 'Henry Young', '5', 'Tuition Fee', 35000.00, 0.00, '2025-03-23', 'Unpaid', NULL, '2025-02-21 11:26:43', '2025-02-21 11:26:43'),
(54, 52, 'William Rodriguez', '5', 'Tuition Fee', 35000.00, 0.00, '2025-03-25', 'Unpaid', NULL, '2025-02-23 20:39:11', '2025-02-23 20:39:11'),
(55, 188, 'Zoe Green', '9', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:18:44', '2025-02-23 21:18:44'),
(56, 187, 'Carter Scott', '11', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:18:45', '2025-02-23 21:18:45'),
(57, 186, 'Mila Wright', '8', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:18:46', '2025-02-23 21:18:46'),
(58, 185, 'Jayden King', '12', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:18:46', '2025-02-23 21:18:46'),
(59, 184, 'Grace Allen', '10', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:18:47', '2025-02-23 21:18:47'),
(60, 183, 'Lucas Young', '9', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:18:48', '2025-02-23 21:18:48'),
(61, 180, 'Avery Baker', '8', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:18:52', '2025-02-23 21:18:52'),
(62, 179, 'Ethan Adams', '12', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:18:52', '2025-02-23 21:18:52'),
(63, 178, 'Chloe Clark', '11', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:18:53', '2025-02-23 21:18:53'),
(64, 177, 'Aiden Hall', '10', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:18:54', '2025-02-23 21:18:54'),
(65, 176, 'Noah Harris', '8', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:18:55', '2025-02-23 21:18:55'),
(66, 175, 'Lily Parker', '12', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:18:55', '2025-02-23 21:18:55'),
(67, 174, 'Logan Evans', '9', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:18:56', '2025-02-23 21:18:56'),
(68, 173, 'Joshua Moore', '12', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:18:57', '2025-02-23 21:18:57'),
(69, 182, 'Ella Lee', '11', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:18:59', '2025-02-23 21:18:59'),
(70, 181, 'Mason Carter', '10', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:19:00', '2025-02-23 21:19:00'),
(71, 172, 'Mia Taylor', '11', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:19:02', '2025-02-23 21:19:02'),
(72, 171, 'Matthew Thomas', '9', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:19:03', '2025-02-23 21:19:03'),
(73, 170, 'Ava Anderson', '10', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:19:04', '2025-02-23 21:19:04'),
(74, 169, 'Christopher Wilson', '8', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:19:04', '2025-02-23 21:19:04'),
(75, 168, 'Isabella Gonzalez', '12', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:19:05', '2025-02-23 21:19:05'),
(76, 167, 'James Lopez', '10', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:19:06', '2025-02-23 21:19:06'),
(77, 166, 'Sophia Martinez', '11', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:19:07', '2025-02-23 21:19:07'),
(78, 165, 'Daniel Garcia', '9', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:19:08', '2025-02-23 21:19:08'),
(79, 164, 'Olivia Jones', '10', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:19:08', '2025-02-23 21:19:08'),
(80, 163, 'David Brown', '8', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:19:11', '2025-02-23 21:19:11'),
(81, 162, 'Emily Williams', '12', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:19:14', '2025-02-23 21:19:14'),
(82, 161, 'Michael Johnson', '9', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:19:15', '2025-02-23 21:19:15'),
(83, 160, 'Alice Smith', '11', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:19:16', '2025-02-23 21:19:16'),
(84, 159, 'John Doe', '10', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:19:16', '2025-02-23 21:19:16'),
(85, 158, 'Alexis  Williams', '11', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:19:18', '2025-02-23 21:19:18'),
(86, 157, 'Sumn  Brown', '10', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:19:19', '2025-02-23 21:19:19'),
(87, 156, 'Taylor  Johnson', '9', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:19:19', '2025-02-23 21:19:19'),
(88, 155, 'Chris  Smith', '8', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:19:20', '2025-02-23 21:19:20'),
(89, 154, 'Riley  Hernandez', '12', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:19:21', '2025-02-23 21:19:21'),
(90, 153, 'Cameron  Martinez', '11', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:19:23', '2025-02-23 21:19:23'),
(91, 152, 'Jordan  Davis', '10', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:19:26', '2025-02-23 21:19:26'),
(92, 151, 'Morgan  Miller', '9', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:19:27', '2025-02-23 21:19:27'),
(93, 150, 'Sam  Garcia', '8', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:19:28', '2025-02-23 21:19:28'),
(94, 149, 'Taylor  Jones', '12', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:19:29', '2025-02-23 21:19:29'),
(95, 148, 'Chris  Williams', '11', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:19:29', '2025-02-23 21:19:29'),
(96, 147, 'Alex  Brown', '10', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:19:30', '2025-02-23 21:19:30'),
(97, 146, 'Jane  Johnson', '9', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:19:31', '2025-02-23 21:19:31'),
(98, 145, 'John  Smith', '8', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:19:32', '2025-02-23 21:19:32'),
(99, 144, 'Alex  Williams', '11', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:19:32', '2025-02-23 21:19:32'),
(100, 143, 'Sam  Brown', '10', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:19:34', '2025-02-23 21:19:34'),
(101, 142, 'Taylor  Johnson', '9', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:19:37', '2025-02-23 21:19:37'),
(102, 141, 'Chris  Smith', '8', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:19:39', '2025-02-23 21:19:39'),
(103, 140, 'Riley  Hernandez', '12', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:19:39', '2025-02-23 21:19:39'),
(104, 139, 'Cameron  Martinez', '11', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:19:40', '2025-02-23 21:19:40'),
(105, 138, 'Jordan  Davis', '10', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:19:41', '2025-02-23 21:19:41'),
(106, 137, 'Morgan  Miller', '9', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:19:42', '2025-02-23 21:19:42'),
(107, 136, 'Sam  Garcia', '8', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:19:42', '2025-02-23 21:19:42'),
(108, 135, 'Taylor  Jones', '12', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:19:44', '2025-02-23 21:19:44'),
(109, 134, 'Chris  Williams', '11', 'Tuition Fee', 35000.00, 0.00, '2025-03-26', 'Unpaid', NULL, '2025-02-23 21:19:45', '2025-02-23 21:19:45');

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
-- Table structure for table `gradebook_lock`
--

CREATE TABLE `gradebook_lock` (
  `id` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL,
  `term` varchar(20) NOT NULL,
  `year` int(11) NOT NULL,
  `is_locked` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `grades`
--

CREATE TABLE `grades` (
  `id` int(11) NOT NULL,
  `Student_ID` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL,
  `Teacher_ID` int(11) NOT NULL,
  `cat1` decimal(5,2) DEFAULT NULL CHECK (`cat1` between 0 and 100),
  `cat2` decimal(5,2) DEFAULT NULL CHECK (`cat2` between 0 and 100),
  `endterm_exam` decimal(5,2) DEFAULT NULL CHECK (`endterm_exam` between 0 and 100),
  `final_score` decimal(5,2) GENERATED ALWAYS AS (`cat1` * 0.2 + `cat2` * 0.2 + `endterm_exam` * 0.6) STORED,
  `final_grade` char(1) GENERATED ALWAYS AS (case when `final_score` >= 80 then 'A' when `final_score` >= 70 then 'B' when `final_score` >= 60 then 'C' when `final_score` >= 50 then 'D' when `final_score` >= 40 then 'E' else 'F' end) STORED,
  `term` varchar(20) NOT NULL,
  `year` int(11) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `grades`
--

INSERT INTO `grades` (`id`, `Student_ID`, `subject_id`, `Teacher_ID`, `cat1`, `cat2`, `endterm_exam`, `term`, `year`, `updated_at`) VALUES
(1, 152, 1, 1, 80.00, 70.00, 90.00, 'Term 1', 2025, '2025-02-27 10:03:41'),
(2, 184, 1, 1, 50.00, 40.00, 70.00, 'Term 1', 2025, '2025-02-27 10:03:41'),
(11, 152, 4, 1, 80.00, 55.00, 90.00, 'Term 1', 2025, '2025-02-27 10:06:06'),
(12, 184, 4, 1, 30.00, 30.00, 90.00, 'Term 1', 2025, '2025-02-27 10:06:06');

-- --------------------------------------------------------

--
-- Table structure for table `leave_applications`
--

CREATE TABLE `leave_applications` (
  `id` int(11) NOT NULL,
  `User_ID` int(11) NOT NULL,
  `leave_type` enum('Sick Leave','Vacation Leave','Personal Leave','Emergency Leave','Maternity/Paternity Leave','Study Leave') NOT NULL,
  `reason` text NOT NULL,
  `status` enum('Pending','Approved','Rejected') DEFAULT 'Pending',
  `applied_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `reviewed_at` timestamp NULL DEFAULT NULL,
  `reviewed_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `leave_applications`
--

INSERT INTO `leave_applications` (`id`, `User_ID`, `leave_type`, `reason`, `status`, `applied_at`, `reviewed_at`, `reviewed_by`) VALUES
(2, 23, 'Sick Leave', 'Tired', 'Rejected', '2025-03-04 11:54:19', '2025-03-04 20:49:33', 14),
(3, 23, 'Maternity/Paternity Leave', 'Reqesting Paternity Leave ', 'Approved', '2025-03-04 12:03:04', '2025-03-04 20:48:01', 14),
(4, 14, 'Personal Leave', 'Taking a break', 'Pending', '2025-03-04 19:25:23', '2025-03-04 20:42:20', 14);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `chat_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `chat_id`, `sender_id`, `message`, `timestamp`) VALUES
(1, 1, 23, 'Hi', '2025-02-28 12:52:25'),
(2, 2, 23, 'Good Morning\n', '2025-02-28 14:20:48'),
(3, 2, 23, 'Whats the plan?', '2025-02-28 21:08:40'),
(4, 2, 15, 'Good Morning too ,,aiii deskieee haraka ya nini😭😭😭', '2025-02-28 21:12:02'),
(5, 2, 23, 'waaaaaaa💀💀💀', '2025-02-28 21:13:02'),
(6, 3, 23, 'Hi', '2025-02-28 21:18:25'),
(7, 2, 15, 'ni nini🙄', '2025-02-28 21:27:48'),
(8, 2, 15, '😔', '2025-02-28 21:31:35'),
(9, 2, 15, 'uiui', '2025-02-28 21:31:59'),
(10, 2, 23, 'Good Morning', '2025-03-01 09:24:02'),
(11, 2, 15, 'Good Morning Deskie 😁😁', '2025-03-01 09:25:10'),
(12, 2, 15, 'Good Morning', '2025-03-03 13:39:43'),
(13, 2, 23, 'Good Morning', '2025-03-03 13:40:04'),
(14, 1, 14, 'Hi ,How may I be of help?', '2025-03-04 20:57:52');

-- --------------------------------------------------------

--
-- Table structure for table `non_teaching_staff`
--

CREATE TABLE `non_teaching_staff` (
  `staff_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `position` varchar(255) DEFAULT NULL,
  `contact_info` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `School_ID` int(11) DEFAULT NULL,
  `hire_date` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `non_teaching_staff`
--

INSERT INTO `non_teaching_staff` (`staff_id`, `first_name`, `last_name`, `position`, `contact_info`, `department`, `School_ID`, `hire_date`, `created_at`, `updated_at`) VALUES
(1, 'Mitch', 'Wafula', 'Cheff', '0119733244', 'Catering', 0, NULL, '2025-01-25 12:03:37', '2025-01-25 12:03:37'),
(66, 'John', 'Doe', 'Secretary', '123-456-7890', 'Administration', 3, '2023-01-15', '2025-01-25 13:08:36', '2025-01-25 13:08:36'),
(67, 'Jane', 'Smith', 'Janitor', '987-654-3210', 'Facilities', 4, '2022-06-01', '2025-01-25 13:08:36', '2025-01-25 13:08:36'),
(68, 'Michael', 'Brown', 'Librarian', '555-123-9876', 'Library', 3, '2021-09-21', '2025-01-25 13:08:36', '2025-01-25 13:08:36'),
(69, 'Emily', 'Davis', 'IT Support', '444-222-8888', 'IT', 3, '2020-02-28', '2025-01-25 13:08:36', '2025-01-25 13:08:36'),
(70, 'James', 'Miller', 'Counselor', '555-321-6548', 'Counseling', 2, '2023-03-12', '2025-01-25 13:08:36', '2025-01-25 13:08:36'),
(71, 'Olivia', 'Garcia', 'Receptionist', '333-555-7777', 'Administration', 0, '2022-11-05', '2025-01-25 13:08:36', '2025-01-25 13:08:36'),
(72, 'David', 'Martinez', 'Security Guard', '444-333-2222', 'Security', 0, '2021-08-15', '2025-01-25 13:08:36', '2025-01-25 13:08:36'),
(73, 'Sophia', 'Hernandez', 'Nurse', '555-444-3333', 'Health', 1, '2022-04-10', '2025-01-25 13:08:36', '2025-01-25 13:08:36'),
(74, 'William', 'Lopez', 'Cafeteria Manager', '666-777-8888', 'Catering', 4, '2023-05-18', '2025-01-25 13:08:36', '2025-01-25 13:08:36'),
(75, 'Isabella', 'Wilson', 'Maintenance Worker', '777-888-9999', 'Maintenance', 1, '2021-10-11', '2025-01-25 13:08:36', '2025-01-25 13:08:36'),
(76, 'Daniel', 'Taylor', 'Custodian', '888-999-0000', 'Facilities', 1, '2023-01-20', '2025-01-25 13:08:36', '2025-01-25 13:08:36'),
(77, 'Mia', 'Anderson', 'HR Assistant', '999-111-2222', 'HR', 1, '2022-07-17', '2025-01-25 13:08:36', '2025-01-25 13:08:36'),
(78, 'Alexander', 'Thomas', 'Lab Assistant', '111-222-3333', 'Science', 2, '2020-09-05', '2025-01-25 13:08:36', '2025-01-25 13:08:36'),
(79, 'Charlotte', 'Jackson', 'Administrative Assistant', '222-333-4444', 'Administration', 3, '2021-12-13', '2025-01-25 13:08:36', '2025-01-25 13:08:36'),
(80, 'Benjamin', 'White', 'Tech Support', '333-444-5555', 'IT', 2, '2022-01-22', '2025-01-25 13:08:36', '2025-01-25 13:08:36'),
(81, 'Amelia', 'Harris', 'Cafeteria Staff', '444-555-6666', 'Catering', 1, '2020-11-30', '2025-01-25 13:08:36', '2025-01-25 13:08:36'),
(82, 'Lucas', 'Clark', 'Bus Driver', '555-666-7777', 'Transportation', 1, '2023-02-25', '2025-01-25 13:08:36', '2025-01-25 13:08:36'),
(83, 'Harper', 'Lewis', 'Records Clerk', '666-777-8888', 'Administration', 1, '2021-06-19', '2025-01-25 13:08:36', '2025-01-25 13:08:36'),
(84, 'Sebastian', 'Young', 'Admissions Assistant', '777-888-9999', 'Admissions', 1, '2022-01-03', '2025-01-25 13:08:36', '2025-01-25 13:08:36'),
(85, 'Lily', 'King', 'Head Custodian', '333-444-5555', 'Facilities', 0, '2023-07-08', '2025-01-25 13:08:36', '2025-01-25 13:08:36'),
(86, 'test', 'test', 'test', 'test', 'test', 0, NULL, '2025-03-04 19:56:04', '2025-03-04 19:56:04'),
(87, 'Njugush', 'kemoney', 'yapper', '0234567', 'Yapping', 4, '2025-03-04', '2025-03-04 20:36:09', '2025-03-04 20:36:09');

-- --------------------------------------------------------

--
-- Table structure for table `receipts`
--

CREATE TABLE `receipts` (
  `id` int(11) NOT NULL,
  `receiptNumber` varchar(50) NOT NULL,
  `referenceNumber` varchar(50) NOT NULL,
  `Student_ID` int(11) NOT NULL,
  `School_ID` int(11) NOT NULL,
  `schoolName` varchar(255) NOT NULL,
  `date` datetime DEFAULT current_timestamp(),
  `paymentMethod` varchar(50) NOT NULL,
  `feeType` varchar(100) NOT NULL,
  `amountPaid` decimal(10,2) NOT NULL,
  `totalPaid` decimal(10,2) NOT NULL,
  `remainingBalance` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `receipts`
--

INSERT INTO `receipts` (`id`, `receiptNumber`, `referenceNumber`, `Student_ID`, `School_ID`, `schoolName`, `date`, `paymentMethod`, `feeType`, `amountPaid`, `totalPaid`, `remainingBalance`) VALUES
(1, 'TAKMSW164411', 'REF1739799851131', 122, 2, '', '2025-02-17 16:44:11', 'Bank Transfer', 'Tuition Fees', 3.00, 0.00, 26537.00),
(2, 'TAKMSW164445', 'REF1739799885979', 122, 2, '', '2025-02-17 16:44:45', 'Bank Transfer', 'Tuition Fees', 3.00, 0.00, 26534.00),
(3, 'TAKMSW164514', 'REF1739799914282', 122, 2, '', '2025-02-17 16:45:14', 'Bank Transfer', 'Tuition Fees', 3.00, 0.00, 26531.00),
(4, 'TAKMSW174435', 'REF1739803475014', 122, 2, '', '2025-02-17 17:44:35', 'Bank Transfer', 'Tuition Fees', 3.00, 0.00, 26528.00),
(5, 'TAKMSW205908', 'REF1739815148608', 122, 2, '', '2025-02-17 20:59:08', 'Bank Transfer', 'Tuition Fees', 3.00, 0.00, 26525.00),
(6, 'TAKMSW212616', 'REF1739816776763', 122, 2, '', '2025-02-17 21:26:16', 'Bank Transfer', 'Tuition Fees', 2.00, 0.00, 26523.00),
(7, 'TAKMSW221317', 'REF1739819597627', 122, 2, '', '2025-02-17 22:13:17', 'Bank Transfer', 'Tuition Fees', 67.00, 0.00, 26456.00),
(8, 'TAKMSW221412', 'REF1739819652791', 122, 2, '', '2025-02-17 22:14:12', 'Bank Transfer', 'Tuition Fees', 90.00, 0.00, 26366.00);

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
(4, 'test', 'test pdf', 'Books', '12', 'computer', 'book', 'uploads\\media\\1736868402369-Mzizi School Management ERP Brief Writeup.pdf', 'uploads\\thumbnails\\1736868402451-Screenshot 2024-11-15 181120.png', 'undefined', 14, '2025-01-14 18:26:42'),
(5, 'Test 1', 'Test ingine', 'Books', '8', 'Test', 'book', 'uploads\\media\\1736876621177-JUDAHKINYANJUICV.pdf', NULL, 'undefined', 14, '2025-01-14 20:43:41'),
(6, 'Data', 'Video Test', 'Videos', '5', 'Science', 'video', 'uploads\\media\\1736938211646-Digital Analytics Loopable Blue Technology Big Data Forecasting - 4K stock video - Getty Images.mp4', NULL, 'undefined', 14, '2025-01-15 13:50:11'),
(9, 'teacher aaaaatest', 'test', 'Audios', '4', 'Science', 'audio', 'uploads\\media\\1738404461912-Ayra Starr - Bloody Samaritan (Performance Video).m4a', 'uploads\\thumbnails\\1738404462029-Screenshot 2024-10-16 085124.png', 'undefined', 23, '2025-02-01 13:07:42'),
(10, 'Video', 'Video', 'Videos', '8', 'Changing  the domain from sc.ke to co.ke', 'video', 'uploads\\media\\1738956373587-y2mate.com - MAVERICK CITY MUSIC X KIRK FRANKLIN  My Life Is In Your Hands  Sweet Sweet Spirit Song Session_720pHF.mp4', NULL, 'undefined', 14, '2025-02-07 22:26:15');

-- --------------------------------------------------------

--
-- Table structure for table `school`
--

CREATE TABLE `school` (
  `School_ID` int(11) NOT NULL,
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
(1, 'Terry and Kay Kisumu', 'Kisumu', '10344-0100', '01234567', 'tkaykisumu@gmail.com', 'Riggy'),
(2, 'Terry and Kay Makueni', 'Makueni', '6733-0990', '020098786', 'tkmak@gmail.com', 'Linda'),
(3, 'Terry and Kay Kitengela', 'Kitengela', '11672-00100', '020016761', 'tkkitengela@gmail.com', 'Royal'),
(4, 'Terry and Kay Gatundu', 'Gatundu', '896-0998', '0722898565', 'tkgatundu@gmail.com', 'Kim'),
(5, 'Terry and kay Nakuru', 'Nakuru', '10342-0400', '020-000-3442', 'tknakuru@gmail.com', 'Asta');

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
  `Status` varchar(50) NOT NULL,
  `Gender` varchar(50) NOT NULL,
  `User_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_record`
--

INSERT INTO `student_record` (`Student_Record_ID`, `Student_ID`, `School_ID`, `First_Name`, `Second_Name`, `Enrollment_Year`, `Year_Level`, `Term_Average_Grade`, `Guardian_ID`, `Status`, `Gender`, `User_ID`) VALUES
(33, 1, 1, 'Me', '0', '2024', 8, 'N/A', 69305, 'Active', 'Male', 17),
(1, 3, 2, 'Sarada', '', '2025', 9, 'N/A', 34372, 'Active', 'Female', 24),
(2, 13, 2, 'Kiddoh', 'Lamar', '2025', 9, 'N/A', 51088, 'Active', 'Male', 27),
(3, 44, 0, 'John', 'Doe', '2025', 5, 'N/A', 41795, 'Active', 'Male', 28),
(4, 45, 1, 'Emily', 'Smith', '2025', 6, 'N/A', 6635, 'Active', 'Female', 29),
(5, 46, 2, 'Michael', 'Johnson', '2025', 4, 'N/A', 6778, 'Active', 'Male', 30),
(6, 47, 3, 'Sophia', 'Brown', '2025', 3, 'N/A', 35217, 'Active', 'Female', 31),
(7, 48, 4, 'Daniel', 'Jones', '2025', 5, 'N/A', 42610, 'Active', 'Male', 32),
(40, 50, 1, 'Ethan', 'Martinez', '2025', 4, 'N/A', 609, 'Active', '', 51),
(41, 51, 2, 'Ava', 'Davis', '2025', 3, 'N/A', 54565, 'Active', '', 42),
(43, 52, 3, 'William', 'Rodriguez', '2025', 5, 'N/A', 33400, 'Active', '', 41),
(42, 60, 1, 'Henry', 'Young', '2025', 5, 'N/A', 28832, 'Active', '', 39),
(8, 81, 2, 'Ava', 'Davis', '2025', 3, 'N/A', 95725, 'Active', 'Female', 42),
(9, 82, 3, 'William', 'Rodriguez', '2025', 5, 'N/A', 98080, 'Active', 'Male', 41),
(10, 83, 4, 'Isabella', 'Martinez', '2025', 6, 'N/A', 20043, 'Active', 'Female', 40),
(11, 84, 0, 'Alexander', 'Hernandez', '2025', 4, 'N/A', 66800, 'Active', 'Male', 33),
(12, 85, 1, 'Mia', 'Lopez', '2025', 3, 'N/A', 21083, 'Active', 'Female', 34),
(13, 86, 2, 'James', 'Gonzalez', '2025', 5, 'N/A', 85801, 'Active', 'Male', 35),
(14, 87, 3, 'Charlotte', 'Wilson', '2025', 6, 'N/A', 98711, 'Active', 'Female', 36),
(15, 88, 4, 'Benjamin', 'Clark', '2025', 4, 'N/A', 95678, 'Active', 'Male', 37),
(16, 89, 0, 'Amelia', 'Lewis', '2025', 3, 'N/A', 39123, 'Active', 'Female', 38),
(17, 90, 1, 'Henry', 'Young', '2025', 5, 'N/A', 75345, 'Active', 'Male', 39),
(39, 103, 4, 'Ella', 'Rodriguez', '2025', 6, 'N/A', 99356, 'Active', 'Female', 26),
(18, 121, 4, 'Ella', 'Rodriguez', '2025', 6, 'N/A', 63388, 'Active', 'Female', 26),
(36, 122, 2, 'Samuel', 'Wright', '2025', 4, 'N/A', 87080, 'Active', 'Male', 43),
(37, 123, 3, 'Avery', 'Lopez', '2025', 3, 'N/A', 17458, 'Active', 'Female', 44),
(19, 128, 3, 'Mason', '', '2025', 5, 'N/A', 7851, 'Active', 'Male', NULL),
(98, 134, 0, 'Chris ', 'Williams', '2025', 11, 'N/A', 70174, 'Active', '', 96),
(97, 135, 3, 'Taylor ', 'Jones', '2025', 12, 'N/A', 90822, 'Active', '', 95),
(96, 136, 0, 'Sam ', 'Garcia', '2025', 8, 'N/A', 18650, 'Active', '', 94),
(95, 137, 5, 'Morgan ', 'Miller', '2025', 9, 'N/A', 90418, 'Active', '', 93),
(94, 138, 4, 'Jordan ', 'Davis', '2025', 10, 'N/A', 1853, 'Active', '', 92),
(93, 139, 2, 'Cameron ', 'Martinez', '2025', 11, 'N/A', 37749, 'Active', '', 91),
(92, 140, 2, 'Riley ', 'Hernandez', '2025', 12, 'N/A', 68622, 'Active', '', 90),
(91, 141, 1, 'Chris ', 'Smith', '2025', 8, 'N/A', 83470, 'Active', '', 89),
(90, 142, 0, 'Taylor ', 'Johnson', '2025', 9, 'N/A', 64464, 'Active', '', 88),
(89, 143, 3, 'Sam ', 'Brown', '2025', 10, 'N/A', 57783, 'Active', '', 101),
(88, 144, 2, 'Alex ', 'Williams', '2025', 11, 'N/A', 8934, 'Active', '', 100),
(87, 145, 0, 'John ', 'Smith', '2025', 8, 'N/A', 7738, 'Active', '', 99),
(86, 146, 1, 'Jane ', 'Johnson', '2025', 9, 'N/A', 33951, 'Active', '', 98),
(85, 147, 1, 'Alex ', 'Brown', '2025', 10, 'N/A', 298, 'Active', '', 97),
(84, 148, 4, 'Chris ', 'Williams', '2025', 11, 'N/A', 87651, 'Active', '', 96),
(83, 149, 4, 'Taylor ', 'Jones', '2025', 12, 'N/A', 13147, 'Active', '', 95),
(82, 150, 2, 'Sam ', 'Garcia', '2025', 8, 'N/A', 53318, 'Active', '', 94),
(81, 151, 5, 'Morgan ', 'Miller', '2025', 9, 'N/A', 16745, 'Active', '', 93),
(80, 152, 2, 'Jordan ', 'Davis', '2025', 10, 'N/A', 49287, 'Active', '', 92),
(79, 153, 3, 'Cameron ', 'Martinez', '2025', 11, 'N/A', 88044, 'Active', '', 91),
(78, 154, 2, 'Riley ', 'Hernandez', '2025', 12, 'N/A', 66898, 'Active', '', 90),
(77, 155, 0, 'Chris ', 'Smith', '2025', 8, 'N/A', 86183, 'Active', '', 89),
(76, 156, 0, 'Taylor ', 'Johnson', '2025', 9, 'N/A', 93281, 'Active', '', 88),
(75, 157, 0, 'Sumn ', 'Brown', '2025', 10, 'N/A', 53085, 'Active', '', 87),
(74, 158, 2, 'Alexis ', 'Williams', '2025', 11, 'N/A', 28691, 'Active', '', 86),
(73, 159, 1, 'John', 'Doe', '2025', 10, 'N/A', 41545, 'Active', '', 28),
(72, 160, 2, 'Alice', 'Smith', '2025', 11, 'N/A', 14478, 'Active', '', 84),
(71, 161, 3, 'Michael', 'Johnson', '2025', 9, 'N/A', 77001, 'Active', '', 30),
(70, 162, 4, 'Emily', 'Williams', '2025', 12, 'N/A', 81356, 'Active', '', 82),
(69, 163, 5, 'David', 'Brown', '2025', 8, 'N/A', 90959, 'Active', '', 81),
(68, 164, 0, 'Olivia', 'Jones', '2025', 10, 'N/A', 39140, 'Active', '', 80),
(67, 165, 1, 'Daniel', 'Garcia', '2025', 9, 'N/A', 75534, 'Active', '', 79),
(66, 166, 2, 'Sophia', 'Martinez', '2025', 11, 'N/A', 30873, 'Active', '', 78),
(65, 167, 3, 'James', 'Lopez', '2025', 10, 'N/A', 59536, 'Active', '', 77),
(64, 168, 4, 'Isabella', 'Gonzalez', '2025', 12, 'N/A', 52858, 'Active', '', 76),
(63, 169, 5, 'Christopher', 'Wilson', '2025', 8, 'N/A', 86831, 'Active', '', 75),
(62, 170, 0, 'Ava', 'Anderson', '2025', 10, 'N/A', 71562, 'Active', '', 74),
(61, 171, 1, 'Matthew', 'Thomas', '2025', 9, 'N/A', 4857, 'Active', '', 73),
(60, 172, 2, 'Mia', 'Taylor', '2025', 11, 'N/A', 13023, 'Active', '', 72),
(57, 173, 3, 'Joshua', 'Moore', '2025', 12, 'N/A', 42831, 'Active', '', 69),
(56, 174, 4, 'Logan', 'Evans', '2025', 9, 'N/A', 60255, 'Active', '', 68),
(55, 175, 5, 'Lily', 'Parker', '2025', 12, 'N/A', 20976, 'Active', '', 67),
(54, 176, 0, 'Noah', 'Harris', '2025', 8, 'N/A', 24644, 'Active', '', 66),
(53, 177, 1, 'Aiden', 'Hall', '2025', 10, 'N/A', 98060, 'Active', '', 65),
(52, 178, 2, 'Chloe', 'Clark', '2025', 11, 'N/A', 74406, 'Active', '', 64),
(51, 179, 3, 'Ethan', 'Adams', '2025', 12, 'N/A', 50889, 'Active', '', 63),
(50, 180, 4, 'Avery', 'Baker', '2025', 8, 'N/A', 61184, 'Active', '', 62),
(59, 181, 5, 'Mason', 'Carter', '2025', 10, 'N/A', 79006, 'Active', '', 71),
(58, 182, 0, 'Ella', 'Lee', '2025', 11, 'N/A', 38523, 'Active', '', 70),
(49, 183, 1, 'Lucas', 'Young', '2025', 9, 'N/A', 31705, 'Active', '', 61),
(48, 184, 2, 'Grace', 'Allen', '2025', 10, 'N/A', 31968, 'Active', '', 60),
(47, 185, 3, 'Jayden', 'King', '2025', 12, 'N/A', 85858, 'Active', '', 59),
(46, 186, 4, 'Mila', 'Wright', '2025', 8, 'N/A', 33554, 'Active', '', 58),
(45, 187, 5, 'Carter', 'Scott', '2025', 11, 'N/A', 13584, 'Active', '', 57),
(44, 188, 0, 'Zoe', 'Green', '2025', 9, 'N/A', 41141, 'Active', '', 56);

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
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`id`, `name`, `description`) VALUES
(1, 'Mathematics', 'Covers algebra, geometry, and calculus'),
(2, 'English', 'Includes grammar, literature, and writing skills'),
(3, 'Science', 'Covers physics, chemistry, and biology'),
(4, 'History', 'Studies past events and civilizations'),
(5, 'Geography', 'Covers physical and human geography'),
(6, 'Computer Science', 'Covers programming, algorithms, and computing concepts'),
(7, 'Physics', 'Study of matter, motion, and energy'),
(8, 'Chemistry', 'Study of substances and their interactions'),
(9, 'Biology', 'Study of living organisms'),
(10, 'Economics', 'Study of production, consumption, and wealth distribution'),
(11, 'Business Studies', 'Covers entrepreneurship and business management'),
(12, 'Physical Education', 'Focuses on fitness and sports activities'),
(13, 'Music', 'Study of music theory and performance'),
(14, 'Art', 'Covers painting, drawing, and visual arts'),
(15, 'French', 'Language learning subject');

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
  `Status` varchar(100) NOT NULL,
  `User_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teacher`
--

INSERT INTO `teacher` (`Teacher_ID`, `First_Name`, `Last_Name`, `Email`, `Phone_Number`, `Subject_Specialty`, `School_ID`, `Employment_Status`, `Hire_Date`, `Status`, `User_ID`) VALUES
(1, 'Judah', 'Kinyanjui', 'judahkinyanjui@gmail.com', '0110733243', '', 2, 'Contract', '2024-12-31', 'On Leave', 23),
(2, 'Jackie', 'Chan', 'jackiechan@mail.com', '0123456789', '', 5, 'Full-Time', '2025-02-02', 'Active', 53);

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
-- Table structure for table `timetable`
--

CREATE TABLE `timetable` (
  `id` int(11) NOT NULL,
  `Teacher_ID` int(11) DEFAULT NULL,
  `subject` varchar(100) DEFAULT NULL,
  `grade_level` varchar(50) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `weekday` enum('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday') NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `timetable`
--

INSERT INTO `timetable` (`id`, `Teacher_ID`, `subject`, `grade_level`, `location`, `weekday`, `start_time`, `end_time`) VALUES
(1, 1, 'Mathematics', '8', 'Room 101', 'Monday', '08:00:00', '10:00:00'),
(2, 1, 'Science', '7', 'Lab 2', 'Tuesday', '08:00:00', '10:00:00'),
(3, 1, 'English', '9', 'Room 205', 'Wednesday', '14:00:00', '16:00:00'),
(4, 1, 'History', '10', 'Room 303', 'Thursday', '08:00:00', '10:00:00'),
(5, 1, 'Physics', '11', 'Lab 1', 'Friday', '08:00:00', '10:00:00'),
(6, 2, 'Chemistry', '12', 'Lab 3', 'Monday', '14:00:00', '16:00:00'),
(7, 2, 'Biology', '10', 'Room 102', 'Wednesday', '14:00:00', '16:00:00'),
(9, 1, 'Physics', '12', 'Physics Lab', 'Thursday', '16:00:00', '18:00:00'),
(10, 1, 'Physics', '9', 'Physics Lab', 'Monday', '14:00:00', '17:00:00'),
(11, 1, 'Mathematics', ' 10', 'G10E', 'Wednesday', '11:00:00', '13:00:00');

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
(23, 'judah kinyanjui', '$2a$10$k8pYgA8r882ABUobnTeF0.AE./4hTMXpDB7veu1JQloae5XElNpai', 'teacher', 'judahkinyanjui@gmail.com'),
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
(43, 'samuel.wright', '$2a$10$clsS0r6/98fxmlyDIuwvqeeOudNC/qOkgelLegd0Ji1fTxkuYbgLW', 'student', 'samuel.wright@mail.com'),
(44, 'avery.lopez', '$2a$10$R0I4o9nTm5s1sn655N0HAusuBkXNR38TLjwDV.P70HtTbQXq2IgtO', 'student', 'avery.lopez@mail.com'),
(45, 'ella.rodriguez', '$2a$10$296owSLNzi3CNclbAM9UweDcCVeql170geRNGaJ9BLQxZFifjTS2K', 'student', 'ella.rodriguez@mail.com'),
(47, 'mike.inko', '$2a$10$Qiu3ePP6LgYWz91Bf/ByPOOHakNTexbzHRUf.DcWfvHd2LLvmnNtC', 'admin', 'Inko@mail.com'),
(50, 'mitch.wafula', '$2a$10$rvlsph3F1cNGKFQDQbEXV.B5cnjP2.kZiEeI/RzLAliT2jOt.j.Oi', 'Non-Teaching', 'mitch.wafula@mail.com'),
(51, 'ethan.martinez', '$2a$10$rtk06EkFi.X8yT0MXjBWLe22J.CvA8hL4UwQ7sHdvQOdo2l.eJf2S', 'student', 'ethan.martinez@mail.com'),
(52, 'ava.davis', '$2a$10$5kojt/Bgapziayi6GGfUwO5ZNzK5km0TjtWnd1fk/j62S5/X5USHe', 'student', 'ava.davis@mail.com'),
(53, 'jackie chan', '$2a$10$1PZywSTfQ1hrbvM8rQ6LhOnjkEBHMlk99R/0ccLr17sIk1OO4RMnO', 'teacher', 'jackiechan@mail.com'),
(54, 'henry.young', '$2a$10$.UMGUQII/.neTh7qIiHC5.Rv6SmcvyFxuuXDcszH7A6dqDKfhLaza', 'student', 'henry.young@mail.com'),
(55, 'william.rodriguez', '$2a$10$8Vg99PirzwDM7bKh.hZGyun2MXo1RgpfLCe.RWWyFqA4R80wrRJwe', 'student', 'william.rodriguez@mail.com'),
(56, 'zoe.green', '$2a$10$y6fo6son3I24Vps2V2.FiOrANxMz7tmhOeN9NbrwzYOa31OYlTmby', 'student', 'zoe.green@mail.com'),
(57, 'carter.scott', '$2a$10$Ht2aIRWauNfOGgwnSPTgT.vMfGjtfnNKeP8o49Y.BiRcyMGG1Vksa', 'student', 'carter.scott@mail.com'),
(58, 'mila.wright', '$2a$10$3qIL36CZwTusbniO/hFaIOoEi6CfS2k.iNcreBIwfJJZJCEs7Nx/m', 'student', 'mila.wright@mail.com'),
(59, 'jayden.king', '$2a$10$KJ7OA6gOmGVnca83KuiKMetZhVS4TvHpdaXUVqgnCkibbE54Nk9n.', 'student', 'jayden.king@mail.com'),
(60, 'grace.allen', '$2a$10$SGTb5y8Yf8Txyy1gIUH6GOwdvnMuZdOpVrwnhuxrmFckceF6wySyK', 'student', 'grace.allen@mail.com'),
(61, 'lucas.young', '$2a$10$.ubpY68wKfUBfFPZRtW.PuKeZX2vKTY2r6mJgPTrCfWXTFBvlFXWK', 'student', 'lucas.young@mail.com'),
(62, 'avery.baker', '$2a$10$we.BFCpu8YVk0g5rTFNhoOiLsrlyiqqDu.v2aHZ78YkElSXuxMGfC', 'student', 'avery.baker@mail.com'),
(63, 'ethan.adams', '$2a$10$c1d82BBbAB4y9LkMT7joM.koH3e/wCj7KzYhleaJRzw.IXHuT314G', 'student', 'ethan.adams@mail.com'),
(64, 'chloe.clark', '$2a$10$ZMF88.D6VY7xWaFbppeCO.WD77oPyGv1JTmmodTtwv6mExQ3x5ItO', 'student', 'chloe.clark@mail.com'),
(65, 'aiden.hall', '$2a$10$Hjh56wepC7z7JLIk.Ij.9.FRvs4r9G2TmRcuZ4t3c8lNnTwHWF6tK', 'student', 'aiden.hall@mail.com'),
(66, 'noah.harris', '$2a$10$mlk40VQgGZ1EFlV0OJQiHOVq7RDyNooRzochNfh9o5BfBRb9EYVL2', 'student', 'noah.harris@mail.com'),
(67, 'lily.parker', '$2a$10$zGancdxvpGcCfDB1IZTWxehaDs0XC.ckUZG3EEF/7gQqsoow7RP.i', 'student', 'lily.parker@mail.com'),
(68, 'logan.evans', '$2a$10$0E3AUo36ZCjzZsDe.4PjtOf/3xX8ZXtcvYCFbqWghWBqXm4wAfwaq', 'student', 'logan.evans@mail.com'),
(69, 'joshua.moore', '$2a$10$wBJFnHR6T3gfpKesz6ZdceSMKLqnz42rpQunnBc25VqtoORFeMyx6', 'student', 'joshua.moore@mail.com'),
(70, 'ella.lee', '$2a$10$UJ89ny25RNllMxV09dE9AeaAhx8RhQLKwVmzg3FNhZIZRX.FnlXVy', 'student', 'ella.lee@mail.com'),
(71, 'mason.carter', '$2a$10$yfhiWCf95WZAHaOC4eaS5uzwxwGjMxoxwlrhwBanManEKgcZBqODO', 'student', 'mason.carter@mail.com'),
(72, 'mia.taylor', '$2a$10$pCvl1ROr6g9fgLTw406W.OHMtpUNKsEL8/tsTpkGYl47LkNookKNC', 'student', 'mia.taylor@mail.com'),
(73, 'matthew.thomas', '$2a$10$IU.giUc8xBA2o5/gzXZCkOf1Dtupvt91RbknMe5i5OD4Ac2IrElJa', 'student', 'matthew.thomas@mail.com'),
(74, 'ava.anderson', '$2a$10$PY5um.hn/ViPOX3QUh6DoeizJrg/Bi9qwb2Nivkgz/kYoRPkyI.3u', 'student', 'ava.anderson@mail.com'),
(75, 'christopher.wilson', '$2a$10$9VEEVR4Fw0Pm5/JRBORfYuYm8Cz0/dC3lm9XJ0es68geknpKsPMiy', 'student', 'christopher.wilson@mail.com'),
(76, 'isabella.gonzalez', '$2a$10$4YR33mIwft2mXch9kDEFxeZr6uO7E/1DqQS/9C6uJ668vgv6rH/G2', 'student', 'isabella.gonzalez@mail.com'),
(77, 'james.lopez', '$2a$10$Tu7OLtyXhqvggCNQaoeq8uxtjg8CUSazMiGzN16ielu.jtOlMqDLK', 'student', 'james.lopez@mail.com'),
(78, 'sophia.martinez', '$2a$10$Ug5Tpxnr1YmFst8RuV2OKOEBNUW3BPprzlqtxlXWCdf4dnqho3ptq', 'student', 'sophia.martinez@mail.com'),
(79, 'daniel.garcia', '$2a$10$7TMxWQBco10SDBnKUhur2uDf5xewxtWOVwHDvsCV84uNHuFxlwF1y', 'student', 'daniel.garcia@mail.com'),
(80, 'olivia.jones', '$2a$10$FVlu1ca0JQlsAEQPfuUH9O487UgKtoaPzhvBZpxhHAN3yAPcUW5AO', 'student', 'olivia.jones@mail.com'),
(81, 'david.brown', '$2a$10$rhDSkdZQ7zOtJhji/wwZXOfMtLQMvM8OvR7bGJXHTr4JG.c68TBO6', 'student', 'david.brown@mail.com'),
(82, 'emily.williams', '$2a$10$m9Mi4ImyrJ2ZYw.yBYmhje7MBWTnn000GuKhlP1p20csAiAbyvoZm', 'student', 'emily.williams@mail.com'),
(83, 'michael.johnson', '$2a$10$IhXFdUYQtydTazQLlT6QteVo9sS15PKSVkjD4QGg1Ec9AiwHvWv/O', 'student', 'michael.johnson@mail.com'),
(84, 'alice.smith', '$2a$10$MWeYbhFFsonthkYpuEdsxOIbFtn4vInLQ6IwKRtj4xmYhdm3RlbEe', 'student', 'alice.smith@mail.com'),
(85, 'john.doe', '$2a$10$dXpRi6wFOES4o3PLsY/BUO8Y5LmQqzJg2D4qK9unJoZ6p1Tl1vBaW', 'student', 'john.doe@mail.com'),
(86, 'alexis .williams', '$2a$10$DtKgnBtXScArR0q.0QQhGO51EEjgVyd4izsPFEQe2pypVLQczlXeG', 'student', 'alexis .williams@mail.com'),
(87, 'sumn .brown', '$2a$10$75VJYjEOy43HY/KB0YBQ2.Y.fAJOxD6Eh9UFdIZHEzARbAbu77A2m', 'student', 'sumn .brown@mail.com'),
(88, 'taylor .johnson', '$2a$10$kSM8uxNsjZPJ.FDxlIqJReJyIsJuUezRqQuMgmHdKN8ZGbKJ1BWFO', 'student', 'taylor .johnson@mail.com'),
(89, 'chris .smith', '$2a$10$g8oDEkCaLcSOhytGfsyX9.TEXCruXoO3SDdPs4OTQTnpKPXBOxRAi', 'student', 'chris .smith@mail.com'),
(90, 'riley .hernandez', '$2a$10$cs1f7HI7iwFDiIgOLNHyvuWld7HL0p01yCgWyN0pa5xSkuRoew3Eu', 'student', 'riley .hernandez@mail.com'),
(91, 'cameron .martinez', '$2a$10$6scsxXlsCglAtBDImW1Z0uDndNUozXItd/ay4laKruYfsBVYXeeFS', 'student', 'cameron .martinez@mail.com'),
(92, 'jordan .davis', '$2a$10$0ThtP2DzL.HxZdMKV43ZcO4S0Dzj.SvH4LULwnLdDSBAOTmi09tv.', 'student', 'jordan .davis@mail.com'),
(93, 'morgan .miller', '$2a$10$uJA10X91JcZD/D.69Oyd2umV5Y0XX.fdrcmoSDilIKE9Dobf2l9n2', 'student', 'morgan .miller@mail.com'),
(94, 'sam .garcia', '$2a$10$bX8pIHGjjYXp5ND9NqTTOOvWlFoioFiNitvV5B0wrJO1VIiFSYFaq', 'student', 'sam .garcia@mail.com'),
(95, 'taylor .jones', '$2a$10$D/Lm4u0G6paUfF.NyDiKTOvJgbwr7X2/XzcL6djDr8n4op1MIRfk2', 'student', 'taylor .jones@mail.com'),
(96, 'chris .williams', '$2a$10$0Tm5aHLTWMhh.6stwbkqe.kOvseLZDAmpVCoRHgVYtF9lFU7y.Jw2', 'student', 'chris .williams@mail.com'),
(97, 'alex .brown', '$2a$10$CWifkbPhLSiJ7hlmuvMel.uoHrrriTu7Nch8fToZhGpVfpQECRV5u', 'student', 'alex .brown@mail.com'),
(98, 'jane .johnson', '$2a$10$stbTrHwO2i/.xBFyIbawcutRz.dc3/YGUgKaJIEHx9Eiy/rGgXmTa', 'student', 'jane .johnson@mail.com'),
(99, 'john .smith', '$2a$10$oVAh93lmfTkNVOR5SgfeT..tZT6xOmk1AVFiSMrEv83eHbujKjgJC', 'student', 'john .smith@mail.com'),
(100, 'alex .williams', '$2a$10$RYqMHEjaXzf1NAt1.78mhuGUPenqeNiBl5nvrVM1hi8e/VimyueTe', 'student', 'alex .williams@mail.com'),
(101, 'sam .brown', '$2a$10$dLwPCY1f8bdeVdV0D4aPC.C3rbe2qDKgwJZIPVn2oRgb.FM1zLZ9q', 'student', 'sam .brown@mail.com'),
(102, 'taylor .johnson', '$2a$10$lYkPThvgZU24LsBdlti3Ke8/LfGfcKTBiG2SPUnR5VsXFMJomCrMK', 'student', 'taylor .johnson@mail.com'),
(103, 'chris .smith', '$2a$10$MG9Dv8wNDx.HBI6dMrrn/.GFyn9MdFTiAilEzmft/frpVh/Dyl.R.', 'student', 'chris .smith@mail.com'),
(104, 'riley .hernandez', '$2a$10$OyWUkBmti12jGN.uH6NdnO/nh83YaG5Pz7knI3zKYfmM.q.5d77DK', 'student', 'riley .hernandez@mail.com'),
(105, 'cameron .martinez', '$2a$10$tQWru6a0zMcrSjWhfAJUWOeMPxIie/LQo3GF.klo0zSXXclukDASW', 'student', 'cameron .martinez@mail.com'),
(106, 'jordan .davis', '$2a$10$q3IH3uJbm282FBZq9J3CeO71gxxIvYcqKKvbsUMUGbDhwXnmaX022', 'student', 'jordan .davis@mail.com'),
(107, 'morgan .miller', '$2a$10$fpkfj0Nc8HcWq8J8Gy6pnuc4qaF1dDbSMVbdE0xoT.i4WfR7gqEVC', 'student', 'morgan .miller@mail.com'),
(108, 'sam .garcia', '$2a$10$Pbp5.UxS89QYXr55f82QPOvg8MNuzozmI0T8BkP2xTlShNabUXW62', 'student', 'sam .garcia@mail.com'),
(109, 'taylor .jones', '$2a$10$TaaTR6zODuf5eVOXfUwzR.fXbuZE8jpGDIpenQYWjGtELFj5FiOMO', 'student', 'taylor .jones@mail.com'),
(110, 'chris .williams', '$2a$10$KllTnR9CduyavF0jnp09bOC.aP71T.XeFDIoA0namHq2krCEKk0I2', 'student', 'chris .williams@mail.com'),
(111, 'test.test', '$2a$10$xChLusgQ/YzNaj7jxkzt1.i3.jpD7QNa/KBkj1qPpGejQlW2hEO5a', 'Non-Teaching', 'test.test@mail.com'),
(112, 'njugush.kemoney', '$2a$10$6aAkMRJ4HPEKy9UJzZlp1uecefeXbZHVcB0zdE5QCCaiXdqnzAsxe', 'Non-Teaching', 'njugush.kemoney@mail.com');

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
(1, 14, '/uploads/profile_pictures/1737494656604-profile-pic.jpg', '2025-01-21 20:10:32'),
(2, 23, '/uploads/profile_pictures/1738693251250-profile.jpg', '2025-02-04 18:18:49'),
(3, 43, '/uploads/profile_pictures/1738940221357-profile.jpg', '2025-02-07 13:22:31');

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
  ADD KEY `application_ibfk_1` (`School_ID`);

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`Attendance_ID`),
  ADD KEY `Student_ID` (`Student_ID`),
  ADD KEY `Teacher_ID` (`Teacher_ID`);

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`Blog_ID`),
  ADD KEY `Author_ID` (`Author_ID`);

--
-- Indexes for table `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `participant1_id` (`participant1_id`),
  ADD KEY `participant2_id` (`participant2_id`);

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
  ADD KEY `exams_ibfk_2` (`School_ID`);

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
  ADD KEY `finance_record_ibfk_2` (`School_ID`);

--
-- Indexes for table `forums`
--
ALTER TABLE `forums`
  ADD PRIMARY KEY (`Forum_ID`);

--
-- Indexes for table `gradebook_lock`
--
ALTER TABLE `gradebook_lock`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subject_id` (`subject_id`);

--
-- Indexes for table `grades`
--
ALTER TABLE `grades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Student_ID` (`Student_ID`),
  ADD KEY `subject_id` (`subject_id`),
  ADD KEY `Teacher_ID` (`Teacher_ID`);

--
-- Indexes for table `leave_applications`
--
ALTER TABLE `leave_applications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `User_ID` (`User_ID`),
  ADD KEY `reviewed_by` (`reviewed_by`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `chat_id` (`chat_id`),
  ADD KEY `sender_id` (`sender_id`);

--
-- Indexes for table `non_teaching_staff`
--
ALTER TABLE `non_teaching_staff`
  ADD PRIMARY KEY (`staff_id`),
  ADD KEY `School_ID` (`School_ID`);

--
-- Indexes for table `receipts`
--
ALTER TABLE `receipts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `receiptNumber` (`receiptNumber`),
  ADD UNIQUE KEY `referenceNumber` (`referenceNumber`),
  ADD KEY `Student_ID` (`Student_ID`),
  ADD KEY `School_ID` (`School_ID`);

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
  ADD PRIMARY KEY (`School_ID`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Indexes for table `student_record`
--
ALTER TABLE `student_record`
  ADD PRIMARY KEY (`Student_ID`),
  ADD UNIQUE KEY `Student_Record_ID` (`Student_Record_ID`),
  ADD KEY `School_ID` (`School_ID`) USING BTREE,
  ADD KEY `User_ID` (`User_ID`);

--
-- Indexes for table `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`Subject_ID`),
  ADD KEY `Teacher_ID` (`Teacher_ID`),
  ADD KEY `subject_ibfk_1` (`School_ID`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`Teacher_ID`),
  ADD KEY `teacher_ibfk_1` (`School_ID`),
  ADD KEY `FK_UserID` (`User_ID`);

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
-- Indexes for table `timetable`
--
ALTER TABLE `timetable`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Teacher_ID` (`Teacher_ID`);

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
  MODIFY `Admin_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `announcements`
--
ALTER TABLE `announcements`
  MODIFY `Announcement_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `application`
--
ALTER TABLE `application`
  MODIFY `Application_ID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=189;

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `Attendance_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `Blog_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chats`
--
ALTER TABLE `chats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `Comment_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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
  MODIFY `FeeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- AUTO_INCREMENT for table `forums`
--
ALTER TABLE `forums`
  MODIFY `Forum_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `gradebook_lock`
--
ALTER TABLE `gradebook_lock`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `grades`
--
ALTER TABLE `grades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `leave_applications`
--
ALTER TABLE `leave_applications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `non_teaching_staff`
--
ALTER TABLE `non_teaching_staff`
  MODIFY `staff_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- AUTO_INCREMENT for table `receipts`
--
ALTER TABLE `receipts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `resources`
--
ALTER TABLE `resources`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `school`
--
ALTER TABLE `school`
  MODIFY `School_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `student_record`
--
ALTER TABLE `student_record`
  MODIFY `Student_Record_ID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `teacher`
--
ALTER TABLE `teacher`
  MODIFY `Teacher_ID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `threads`
--
ALTER TABLE `threads`
  MODIFY `Thread_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `timetable`
--
ALTER TABLE `timetable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `user_credentials`
--
ALTER TABLE `user_credentials`
  MODIFY `User_ID` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;

--
-- AUTO_INCREMENT for table `user_profile_pictures`
--
ALTER TABLE `user_profile_pictures`
  MODIFY `Picture_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`Student_ID`) REFERENCES `student_record` (`Student_ID`),
  ADD CONSTRAINT `attendance_ibfk_2` FOREIGN KEY (`Teacher_ID`) REFERENCES `teacher` (`Teacher_ID`);

--
-- Constraints for table `blogs`
--
ALTER TABLE `blogs`
  ADD CONSTRAINT `blogs_ibfk_1` FOREIGN KEY (`Author_ID`) REFERENCES `user_credentials` (`User_ID`);

--
-- Constraints for table `chats`
--
ALTER TABLE `chats`
  ADD CONSTRAINT `chats_ibfk_1` FOREIGN KEY (`participant1_id`) REFERENCES `user_credentials` (`User_ID`),
  ADD CONSTRAINT `chats_ibfk_2` FOREIGN KEY (`participant2_id`) REFERENCES `user_credentials` (`User_ID`);

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
-- Constraints for table `gradebook_lock`
--
ALTER TABLE `gradebook_lock`
  ADD CONSTRAINT `gradebook_lock_ibfk_1` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`);

--
-- Constraints for table `grades`
--
ALTER TABLE `grades`
  ADD CONSTRAINT `grades_ibfk_1` FOREIGN KEY (`Student_ID`) REFERENCES `student_record` (`Student_ID`),
  ADD CONSTRAINT `grades_ibfk_2` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`),
  ADD CONSTRAINT `grades_ibfk_3` FOREIGN KEY (`Teacher_ID`) REFERENCES `teacher` (`Teacher_ID`);

--
-- Constraints for table `leave_applications`
--
ALTER TABLE `leave_applications`
  ADD CONSTRAINT `leave_applications_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user_credentials` (`User_ID`),
  ADD CONSTRAINT `leave_applications_ibfk_2` FOREIGN KEY (`reviewed_by`) REFERENCES `user_credentials` (`User_ID`);

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`chat_id`) REFERENCES `chats` (`id`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`sender_id`) REFERENCES `user_credentials` (`User_ID`);

--
-- Constraints for table `non_teaching_staff`
--
ALTER TABLE `non_teaching_staff`
  ADD CONSTRAINT `non_teaching_staff_ibfk_1` FOREIGN KEY (`School_ID`) REFERENCES `school` (`School_ID`);

--
-- Constraints for table `receipts`
--
ALTER TABLE `receipts`
  ADD CONSTRAINT `receipts_ibfk_1` FOREIGN KEY (`Student_ID`) REFERENCES `student_record` (`Student_ID`),
  ADD CONSTRAINT `receipts_ibfk_2` FOREIGN KEY (`School_ID`) REFERENCES `school` (`School_ID`);

--
-- Constraints for table `resources`
--
ALTER TABLE `resources`
  ADD CONSTRAINT `resources_ibfk_1` FOREIGN KEY (`uploaded_by`) REFERENCES `user_credentials` (`User_ID`) ON DELETE CASCADE;

--
-- Constraints for table `student_record`
--
ALTER TABLE `student_record`
  ADD CONSTRAINT `FK_Student_School` FOREIGN KEY (`School_ID`) REFERENCES `school` (`School_ID`),
  ADD CONSTRAINT `FK_UserID_Student` FOREIGN KEY (`User_ID`) REFERENCES `user_credentials` (`User_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

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
  ADD CONSTRAINT `FK_UserID` FOREIGN KEY (`User_ID`) REFERENCES `user_credentials` (`User_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
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
-- Constraints for table `timetable`
--
ALTER TABLE `timetable`
  ADD CONSTRAINT `timetable_ibfk_1` FOREIGN KEY (`Teacher_ID`) REFERENCES `teacher` (`Teacher_ID`);

--
-- Constraints for table `user_profile_pictures`
--
ALTER TABLE `user_profile_pictures`
  ADD CONSTRAINT `user_profile_pictures_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user_credentials` (`User_ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
