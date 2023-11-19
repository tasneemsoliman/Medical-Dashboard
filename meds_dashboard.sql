-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 04, 2023 at 09:33 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `meds_dashboard`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id_category` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `description` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id_category`, `name`, `description`) VALUES
(2, 'cold & cough', 'Welcome to our cold and cough section, where we offer a wide range of medicines to relieve your symptoms and help you feel better fast. Our products a'),
(3, 'skin care', 'we offer a wide range of products to help you achieve healthy, radiant skin. Our selection includes creams, lotions, and ointments that are specially '),
(4, 'headache and pain re', 'we offer a range of products to help alleviate your discomfort. Whether you\'re experiencing a headache, muscle pain, or joint pain, we have the right '),
(5, 'cvitamins and supple', 'we offer a wide range of products to support your health and wellness goals. Our selection includes vitamins, minerals, and dietary supplements that a');

-- --------------------------------------------------------

--
-- Table structure for table `medicine`
--

CREATE TABLE `medicine` (
  `id_medicine` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `price` int(11) NOT NULL,
  `expiration_date` text DEFAULT NULL,
  `image` text NOT NULL,
  `fk_id_catagory` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `medicine`
--

INSERT INTO `medicine` (`id_medicine`, `name`, `description`, `price`, `expiration_date`, `image`, `fk_id_catagory`) VALUES
(9, 'Diacerein Capsules', 'Diacerein 50 capsules for the treatment of osteoarthritis, as it works to reduce the severity of the variables associated with osteoarthritis, as it is sometimes used in medicine, and it is sometimes used in some pathological conditions.', 665555, '22/50/2025', 'Diacerein-Capsules.jpg', 2),
(10, 'LOREAL HYALURON EXPERT EYE CREAM', 'LOREAL HYALURON EXPERT EYE CREAM 15ML\nL\'Oreal Paris Hyaluron Expert Moisturizing Eye Cream', 150, '4/1/2025', 'WhatsApp Image 2023-05-04 at 15.01.34.jpeg\n', 3),
(11, 'LOREAL HYALURON EXPERT TISSUES MASK', 'LOREAL HYALURON EXPERT TISSUES MASK\nHyaluron Expert 24 Hour Elasticity Moisturizing Face Mask with Hyaluronic Acid\n', 55, '4/11/2023', 'WhatsApp Image 2023-05-04 at 14.36.30.jpeg\n', 3),
(12, 'LOREAL HYALURON EXPERT DAY CREAM', 'LOREAL HYALURON EXPERT DAY CREAM 50ML\nHyaluron Expert Replenishing and Hydrating Day Cream by L\'Oreal Paris\nAge: 25 to 35', 225, '4/5/2024', 'WhatsApp Image 2023-05-04 at 14.26.59.jpeg\n', 3),
(13, '1,2,3', 'PARACETAMOL (ACETAMINOPHEN) 160 MG + PSEUDOEPHEDRINE HCL 15 MG + CHLORPHENIRAMINE MALEATE 1 MG .... per 5 ml\nRelief Symptoms of Cold/Flu', 40, '1/11/2024', 'WhatsApp Image 2023-05-04 at 14.24.11.jpeg\n', 2),
(14, 'Panadol Extra', 'Panadol Extra is ideal for those who want the benefits of Panadol, plus a little more pain relieving effect on tough pain like tension type headache, toothache and period pain.\n\nThe ingredients in Panadol Extra relieves pain more effective than standard paracetamol while gentle on stomach when used as directed.', 30, '1/10/2027', 'WhatsApp Image 2023-05-04 at 14.15.01.jpeg', 2),
(15, 'Panadol Advance', 'Panadol Advance is an advanced formulation of paracetamol that contains Optizorb. Unlike some pain relievers that can sit in your stomach, Panadol Advance starts to release its medicine in as little as 5 minutes – and still has the safety profile you trust from Panadol.\nPanadol Advance is gentle on stomach when used as directed.', 25, '12/5/2025', '1683205440809.jpeg', 2),
(17, 'Panadol Cold + Flu Day', 'Panadol Cold + Flu Day tablets provide relief from Major Cold and flu symptoms. It is a non- drowsy formulation for day time relief when used as directed.', 27, '4/5/2025', 'WhatsApp Image 2023-05-04 at 14.13.46.jpeg', 2),
(18, 'MADDOX VITAMIN C', 'MADDOX VITAMIN C EFF 240 MG 20 TAB\nVITAMIN C CONTRIBUTES TO A NORMAL ENERGY-YIELDING METABOLISM AND THE NORMAL FUNCTION OF THE IMMUNE SYSTEM.', 110, '4/5/2026', 'WhatsApp Image 2023-05-04 at 15.10.02.jpeg', 5),
(19, 'LIMITLESS LACTOFERRIN', 'LIMITLESS LACTOFERRIN 100 MG 14 SACHETS\nPromotes Iron Absorption & Supports a Healthy Immune System. With Strawberry Flavor. Sweetened with sucralose. Dietary Supplement.', 85, '4/2/2026', 'WhatsApp Image 2023-05-04 at 15.13.27.jpeg', 5),
(20, 'VIDROP', 'VIDROP (Cholecalciferol 2800 IU ml) Oral Drops 15 ml. supplied with a dropper.\n  For The Prevention & Treatment of Rickets & Osteomalacia.', 20, '4/2/2025', 'WhatsApp Image 2023-05-04 at 15.16.01.jpeg', 5),
(21, 'PANADOL MIGRAINE ', 'PANADOL MIGRAINE 30 TAB\nPanadol Migraine For Migraine 30 Tablets\nPANADOL MIGRAINE 30 TAB', 30, '12/8/2026', 'WhatsApp Image 2023-05-04 at 15.21.18.jpeg', 4),
(22, 'Doliprane (Novaldol)', 'Doliprane (Novaldol), Analgesic and Pain Killer , 1000 mg 15 Tablets, Paracetamol, for Pain & Feve', 15, '12/9/2026', 'WhatsApp Image 2023-05-04 at 15.22.36.jpeg', 4),
(23, 'KETOFAN ', 'KETOFAN 50 MG 20 CAP\nAnti-inflammatory – Antirheumatic – Analgesic', 15, '12/9/2027', 'WhatsApp Image 2023-05-04 at 15.23.26.jpeg', 4),
(24, ' BRUFEN 100 MG / 5 ML SYRUP', 'BRUFEN 100 MG / 5 ML SYRUP 150 ML\nBRUFEN (Ibuprofen) 100 mg/5 ml Syrup 150 ml. Antipyretic, Analgesic & Anti-inflammatory Agent. Orange flavored syrup.', 25, '12/10/2024', 'WhatsApp Image 2023-05-04 at 15.24.05.jpeg', 4);

-- --------------------------------------------------------

--
-- Table structure for table `request`
--

CREATE TABLE `request` (
  `id_request` int(11) NOT NULL,
  `name` varchar(25) NOT NULL,
  `description` text NOT NULL,
  `state` int(11) NOT NULL COMMENT '0 -->decline\r\n1 -->accept',
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `request`
--

INSERT INTO `request` (`id_request`, `name`, `description`, `state`, `user_id`) VALUES
(7, 'Perfectil Capsules', 'the description of this medicine contain a wrong information !!!', 1, 4);

-- --------------------------------------------------------

--
-- Table structure for table `search`
--

CREATE TABLE `search` (
  `id_search` int(11) NOT NULL,
  `topic` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `search`
--

INSERT INTO `search` (`id_search`, `topic`, `user_id`) VALUES
(1, 'Perfectil Capsules', 6);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `token` varchar(25) NOT NULL,
  `role` tinyint(1) NOT NULL COMMENT '0 --> normal user\r\n1 --> admin user',
  `status` tinyint(1) NOT NULL,
  `phone` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `name`, `email`, `password`, `token`, `role`, `status`, `phone`) VALUES
(1, '3krljrfr_ahmed', '3kr_ahmdhfjed@gamil.com', '$2b$10$VSQk/4GikcLMKeOWoCKz3.akiA6mENPwCst46SUhWbgUlABgmbOuq', 'da420329077a23af52f11602d', 0, 0, ''),
(3, '3krljljkahmed', '3kr_ahmdhafjed@gamil.com', '$2b$10$tbceUsVxPWn4GKlg6l.A3.jyCCt0/lF1WqYCC50XgTTR4m831SWN.', '53aa9398b024fd1338ccc6919', 0, 0, ''),
(4, 'fatma_alzahraa', 'fatma_alzahraa@gamil.com', '$2b$10$FSG1YWptfO5XEi5khSm.FuQDb8145nE5K52UAcT1QOz54a.Ysjl32', '117312c9827cc295a3adaba89', 1, 0, ''),
(5, 'admin_admin', 'admin_admin@gamil.com', '$2b$10$jsMIAZYOh2kMXdqfVqRy4uuePR/7l3GxzLks/qiXR9DXiVS4Qq3Ky', '828fa3b50609b6da6378199c1', 1, 0, ''),
(6, 'ahmed_adel', 'ahmed_adel@gamil.com', '$2b$10$zNCisiI.839M1Su5FyBoieDBJjTBnSkkLspTFHaYi0BZIWrlLlVXO', '7228685b0be599771627c9e3a', 1, 0, '0115684777');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id_category`) USING BTREE;

--
-- Indexes for table `medicine`
--
ALTER TABLE `medicine`
  ADD PRIMARY KEY (`id_medicine`),
  ADD KEY `medicine_ibfk_1` (`fk_id_catagory`);

--
-- Indexes for table `request`
--
ALTER TABLE `request`
  ADD PRIMARY KEY (`id_request`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `search`
--
ALTER TABLE `search`
  ADD PRIMARY KEY (`id_search`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id_category` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `medicine`
--
ALTER TABLE `medicine`
  MODIFY `id_medicine` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `request`
--
ALTER TABLE `request`
  MODIFY `id_request` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `search`
--
ALTER TABLE `search`
  MODIFY `id_search` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `medicine`
--
ALTER TABLE `medicine`
  ADD CONSTRAINT `medicine_ibfk_1` FOREIGN KEY (`fk_id_catagory`) REFERENCES `category` (`id_category`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `request`
--
ALTER TABLE `request`
  ADD CONSTRAINT `request_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `search`
--
ALTER TABLE `search`
  ADD CONSTRAINT `search_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
