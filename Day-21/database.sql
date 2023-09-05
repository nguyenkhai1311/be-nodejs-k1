CREATE DATABASE database_04_Khai;

use database_04_Khai;
-- Dumping structure for table database_04_khai.phong
CREATE TABLE IF NOT EXISTS `phong` (
  `MaPhong` varchar(50) NOT NULL,
  `LoaiPhong` varchar(50) NOT NULL,
  `SoKhachToiDa` int(11) NOT NULL DEFAULT 0,
  `GiaPhong` float NOT NULL DEFAULT 0,
  `MoTa` text DEFAULT NULL,
  PRIMARY KEY (`MaPhong`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table database_04_khai.phong: ~4 rows (approximately)
INSERT INTO `phong` (`MaPhong`, `LoaiPhong`, `SoKhachToiDa`, `GiaPhong`, `MoTa`) VALUES
	('P0001', 'Loai 1', 20, 70000, NULL),
	('P0002', 'Loai 1', 25, 90000, NULL),
	('P0003', 'Loai 2', 15, 60000, NULL),
	('P0004', 'Loai 3', 20, 60000, NULL);

-- Dumping structure for table database_04_khai.khach_hang
CREATE TABLE IF NOT EXISTS `khach_hang` (
  `MaKH` varchar(50) NOT NULL,
  `TenKH` varchar(100) NOT NULL,
  `DiaChi` varchar(50) DEFAULT NULL,
  `SoDT` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`MaKH`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table database_04_khai.khach_hang: ~4 rows (approximately)
INSERT INTO `khach_hang` (`MaKH`, `TenKH`, `DiaChi`, `SoDT`) VALUES
	('KH0001', 'Nguyen Van A', 'Hoa xuan', '11111111111'),
	('KH0002', 'Nguyen Van B', 'Hoa lai', '11111111112'),
	('KH0003', 'Phan Van A', 'Cam le', '11111111113'),
	('KH0004', 'Phan Van B', 'Hoa xuan', '11111111114');

-- Dumping structure for table database_04_khai.dich_vu_di_kem
CREATE TABLE IF NOT EXISTS `dich_vu_di_kem` (
  `MaDV` varchar(50) NOT NULL,
  `TenDV` varchar(50) NOT NULL,
  `DonViTinh` varchar(50) DEFAULT NULL,
  `DonGia` float NOT NULL,
  PRIMARY KEY (`MaDV`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table database_04_khai.dich_vu_di_kem: ~4 rows (approximately)
INSERT INTO `dich_vu_di_kem` (`MaDV`, `TenDV`, `DonViTinh`, `DonGia`) VALUES
	('DV001', 'Beer', 'lon', 10000),
	('DV002', 'Nuoc ngot', 'lon', 8000),
	('DV003', 'Trai cay', 'dia', 35000),
	('DV004', 'Khan uot', 'cai', 2000);

-- Dumping structure for table database_04_khai.dat_phong
CREATE TABLE IF NOT EXISTS `dat_phong` (
  `MaDatPhong` varchar(50) NOT NULL,
  `MaPhong` varchar(50) DEFAULT NULL,
  `MaKH` varchar(50) DEFAULT NULL,
  `NgayDat` date NOT NULL,
  `GioBatDau` time NOT NULL,
  `GioKetThuc` time NOT NULL,
  `TienDatCoc` float DEFAULT NULL,
  `GhiChu` text DEFAULT NULL,
  `TrangThaiDat` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`MaDatPhong`),
  KEY `dp_maphong_foreign` (`MaPhong`),
  KEY `dp_makh_foreign` (`MaKH`),
  CONSTRAINT `dp_makh_foreign` FOREIGN KEY (`MaKH`) REFERENCES `khach_hang` (`MaKH`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `dp_maphong_foreign` FOREIGN KEY (`MaPhong`) REFERENCES `phong` (`MaPhong`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table database_04_khai.dat_phong: ~4 rows (approximately)
INSERT INTO `dat_phong` (`MaDatPhong`, `MaPhong`, `MaKH`, `NgayDat`, `GioBatDau`, `GioKetThuc`, `TienDatCoc`, `GhiChu`, `TrangThaiDat`) VALUES
	('DP0001', 'P0001', 'KH0002', '2018-03-26', '11:00:00', '13:30:00', 100000, NULL, 'Da dat'),
	('DP0002', 'P0001', 'KH0003', '2018-03-27', '17:15:00', '19:15:00', 50000, NULL, 'Da huy'),
	('DP0003', 'P0002', 'KH0002', '2018-03-26', '20:30:00', '22:15:00', 100000, NULL, 'Da dat'),
	('DP0004', 'P0003', 'KH0001', '2018-04-01', '19:30:00', '21:15:00', 200000, NULL, 'Da dat');

-- Dumping structure for table database_04_khai.chi_tiet_su_dung_dich_vu
CREATE TABLE IF NOT EXISTS `chi_tiet_su_dung_dich_vu` (
  `MaDatPhong` varchar(50) NOT NULL,
  `MaDV` varchar(50) NOT NULL,
  `SoLuong` int(11) DEFAULT NULL,
  PRIMARY KEY (`MaDatPhong`,`MaDV`),
  KEY `ctsddv_madv_foreign` (`MaDV`),
  CONSTRAINT `ctsddv_madatphong_foreign` FOREIGN KEY (`MaDatPhong`) REFERENCES `dat_phong` (`MaDatPhong`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `ctsddv_madv_foreign` FOREIGN KEY (`MaDV`) REFERENCES `dich_vu_di_kem` (`MaDV`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table database_04_khai.chi_tiet_su_dung_dich_vu: ~7 rows (approximately)
INSERT INTO `chi_tiet_su_dung_dich_vu` (`MaDatPhong`, `MaDV`, `SoLuong`) VALUES
	('DP0001', 'DV001', 20),
	('DP0001', 'DV002', 10),
	('DP0001', 'DV003', 3),
	('DP0002', 'DV002', 10),
	('DP0002', 'DV003', 1),
	('DP0003', 'DV003', 2),
	('DP0003', 'DV004', 10);

-- 1. Liệt kê MaDatPhong, MaDV, SoLuong của tất cả các dịch vụ có số lượng lớn hơn 3 và nhỏ hơn 10
SELECT * FROM chi_tiet_su_dung_dich_vu WHERE soluong > 3 AND soluong < 10; 

-- 2. Cập nhật dữ liệu trên trường GiaPhong thuộc bảng PHONG tăng lên 10,000 VNĐ so với giá phòng hiện tại, 
-- chỉ cập nhật giá phòng của những phòng có số khách tối đa lớn hơn 10
UPDATE phong SET giaphong = giaphong + 10000 WHERE sokhachtoida > 10;

-- 3. Xóa tất cả những đơn đặt phòng (từ bảng DAT_PHONG) có trạng thái đặt (TrangThaiDat) là “Da huy”  
SET FOREIGN_KEY_CHECKS= 0;
DELETE FROM dat_phong WHERE trangthaidat = 'Da huy';
SET FOREIGN_KEY_CHECKS= 1;
SELECT * FROM dat_phong;

-- 4. Hiển thị TenKH của những khách hàng có tên bắt đầu là một trong các ký tự “H”, “N”, “M”
-- và có độ dài tối đa là 20 ký tự
SELECT tenkh FROM khach_hang WHERE ((tenkh LIKE 'H%') OR (tenkh LIKE 'N%') OR (tenkh LIKE 'N%')) AND LENGTH(tenkh) <= 20;

-- 5. Hiển thị TenKH của tất cả các khách hàng có trong hệ thống, TenKH nào trùng nhau thì chỉ hiển thị một lần
SELECT tenkh FROM khach_hang GROUP BY tenkh;

-- 6. Hiển thị MaDV, TenDV, DonViTinh, DonGia của những dịch vụ đi kèm có DonViTinh là “lon” và có DonGia lớn hơn 10,000 VNĐ 
-- hoặc những dịch vụ đi kèm có DonViTinh là “Cai” và có DonGia nhỏ hơn 5,000 VNĐ
SELECT * FROM dich_vu_di_kem WHERE (donvitinh = 'lon' AND dongia > 10000) OR (donvitinh = 'cai' AND dongia < 50000);

-- 7. Hiển thị MaDatPhong, MaPhong, LoaiPhong, SoKhachToiDa, GiaPhong, MaKH, TenKH, SoDT, NgayDat, GioBatDau, GioKetThuc, 
-- MaDichVu, SoLuong, DonGia của những đơn đặt phòng có năm đặt phòng là “2016”, “2017” và đặt những phòng có 
-- giá phòng > 50,000 VNĐ/ 1 giờ
SELECT dp.MaDatPhong, p.MaPhong, p.LoaiPhong, p.SoKhachToiDa, p.GiaPhong, kh.MaKH, kh.TenKH, kh.SoDT, dp.NgayDat, 
dp.GioBatDau, dp.GioKetThuc, ctsddv.MaDV, ctsddv.SoLuong, dvdk.DonGia
FROM phong AS p INNER JOIN dat_phong AS dp ON p.MaPhong = dp.MaPhong
INNER JOIN chi_tiet_su_dung_dich_vu AS ctsddv ON ctsddv.MaDatPhong = dp.MaDatPhong
INNER JOIN dich_vu_di_kem AS dvdk ON dvdk.MaDV = ctsddv.MaDV
INNER JOIN khach_hang AS kh ON kh.MaKH = dp.MaKH
WHERE (YEAR(dp.ngaydat) = 2016 OR YEAR(dp.ngaydat) = 2017) AND p.giaphong > 50000;

drop database database_04_Khai;