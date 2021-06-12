-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 25, 2021 at 11:00 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `contacts`
--

-- --------------------------------------------------------

--
-- Table structure for table `contactcards`
--

CREATE TABLE `contactcards` (
  `ID` int(11) NOT NULL,
  `FirstName` varchar(50) NOT NULL DEFAULT '',
  `LastName` varchar(50) NOT NULL DEFAULT '',
  `PhoneNumber` varchar(50) NOT NULL DEFAULT '',
  `Email` varchar(50) NOT NULL DEFAULT '',
  `DateCreated` datetime NOT NULL DEFAULT current_timestamp(),
  `UserID` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contactcards`
--

INSERT INTO `contactcards` (`ID`, `FirstName`, `LastName`, `PhoneNumber`, `Email`, `DateCreated`, `UserID`) VALUES
(5, 'purple', 'bone', '4073324915', 'email@email.com', '2021-05-25 16:00:16', 3),
(6, 'purple', 'bone', '4073324915', 'email@email.com', '2021-05-25 16:04:52', 4);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `DateCreated` datetime NOT NULL DEFAULT current_timestamp(),
  `DateLastLoggedIn` datetime NOT NULL DEFAULT current_timestamp(),
  `FirstName` varchar(50) NOT NULL DEFAULT '',
  `LastName` varchar(50) NOT NULL DEFAULT '',
  `Login` varchar(50) NOT NULL DEFAULT '',
  `Password` varchar(50) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `DateCreated`, `DateLastLoggedIn`, `FirstName`, `LastName`, `Login`, `Password`) VALUES
(1, '2021-05-21 15:17:24', '2021-05-25 09:51:22', 'Rick', 'Leinecker', 'RickL', 'COP4331'),
(2, '2021-05-21 15:17:24', '2021-05-24 23:49:48', 'Sam', 'Hill', 'SamH', 'Test'),
(3, '2021-05-21 15:17:24', '2021-05-21 15:17:24', 'Rick', 'Leinecker', 'RickL', '5832a71366768098cceb7095efb774f2'),
(4, '2021-05-21 15:17:24', '2021-05-21 15:17:24', 'Sam', 'Hill', 'SamH', '0cbc6611f5540bd0809a388dc95a615b'),
(5, '2021-05-24 23:22:29', '2021-05-25 09:49:58', 'Dana', 'Boyd', 'dboyditron', 'password'),
(6, '2021-05-25 10:35:35', '2021-05-25 10:35:35', 'firstname', 'lastname', 'login', 'password'),
(7, '2021-05-25 10:36:24', '2021-05-25 10:36:24', 'clark', 'kent', 'superman', 'kalel'),
(8, '2021-05-25 10:44:48', '2021-05-25 15:41:00', 'bruce', 'wayne', 'batman', 'robin'),
(9, '2021-05-25 15:41:48', '2021-05-25 15:41:48', 'buckey', 'cheese', 'batman', 'robin'),
(10, '2021-05-25 15:51:40', '2021-05-25 15:51:40', 'buckey', 'oHare', 'batman', 'robin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contactcards`
--
ALTER TABLE `contactcards`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contactcards`
--
ALTER TABLE `contactcards`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
