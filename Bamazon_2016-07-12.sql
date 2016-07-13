# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.13)
# Database: Bamazon
# Generation Time: 2016-07-13 00:38:11 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table Departments
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Departments`;

CREATE TABLE `Departments` (
  `DepartmentID` int(11) NOT NULL AUTO_INCREMENT,
  `DepartmentName` varchar(99) NOT NULL,
  `OverHeadCosts` int(11) NOT NULL,
  `TotalSales` int(11) NOT NULL,
  PRIMARY KEY (`DepartmentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Departments` WRITE;
/*!40000 ALTER TABLE `Departments` DISABLE KEYS */;

INSERT INTO `Departments` (`DepartmentID`, `DepartmentName`, `OverHeadCosts`, `TotalSales`)
VALUES
	(1,'Electronics',6000,6275),
	(2,'Sports & Outdoors',3000,3300),
	(3,'Home',2000,800),
	(4,'Clothing',2000,0),
	(5,'Books',500,0);

/*!40000 ALTER TABLE `Departments` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Products
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Products`;

CREATE TABLE `Products` (
  `ItemID` int(11) NOT NULL AUTO_INCREMENT,
  `ProductName` varchar(99) NOT NULL,
  `DepartmentName` varchar(99) NOT NULL,
  `Price` int(11) NOT NULL,
  `StockQuantity` int(11) NOT NULL,
  PRIMARY KEY (`ItemID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Products` WRITE;
/*!40000 ALTER TABLE `Products` DISABLE KEYS */;

INSERT INTO `Products` (`ItemID`, `ProductName`, `DepartmentName`, `Price`, `StockQuantity`)
VALUES
	(1,'TV','Electronics',500,2),
	(2,'Laptop','Electronics',400,3),
	(3,'Golf Clubs','Sports & Outdoors',800,8),
	(4,'Hiking Pack','Sports & Outdoors',300,5),
	(5,'Sleeping Bag','Sports & Outdoors',500,8),
	(6,'Tent','Sports & Outdoors',400,20),
	(7,'Xbox One','Electronics',275,13),
	(8,'PlayStation 4','Electronics',350,9),
	(9,'Lawn Mower','Home',200,4),
	(10,'Leaf Blower','Home',75,5),
	(12,'Refrigerator','Home',700,20),
	(13,'Oven','Home',500,20),
	(14,'Dishwasher','Home',500,15);

/*!40000 ALTER TABLE `Products` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
