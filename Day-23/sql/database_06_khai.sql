CREATE DATABASE IF NOT EXISTS `database_06_khai`;
USE `database_06_khai`;

-- Dumping structure for table database_06_khai.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `users` (`email`, `password`) VALUES
	('admin1@gmail.com', MD5('123456'));
INSERT INTO `users` (`email`, `password`) VALUES
	('nguyenkhai@gmail.com', MD5('123456'));
