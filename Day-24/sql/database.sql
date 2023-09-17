-- Dumping database structure for f8_authentication
CREATE DATABASE IF NOT EXISTS `f8_authentication` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `f8_authentication`;

-- Dumping structure for table f8_authentication.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_authentication.users: ~3 rows (approximately)
INSERT INTO `users` (`id`, `name`, `email`, `password`, `status`, `created_at`, `updated_at`) VALUES
	(1, 'Admin', 'admin@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 1, '2023-09-16 12:26:03', '2023-09-16 12:26:04'),
	(2, 'nguyenkhai', 'nguyenkhai@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 0, '2023-09-16 19:52:53', '2023-09-16 19:53:02'),
	(7, 'Khải', 'nguyenkhai123@gmail.com', '202cb962ac59075b964b07152d234b70', 1, '2023-09-17 03:30:19', '2023-09-17 03:30:19');
