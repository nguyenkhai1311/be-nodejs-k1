CREATE DATABASE database_05_Khai;

use database_05_Khai;
-- Dumping structure for table database_05_khai.phong
CREATE TABLE IF NOT EXISTS `phong` (
  `MaPhong` varchar(50) NOT NULL,
  `LoaiPhong` varchar(50) NOT NULL,
  `SoKhachToiDa` int(11) NOT NULL DEFAULT 0,
  `GiaPhong` float NOT NULL DEFAULT 0,
  `MoTa` text DEFAULT NULL,
  PRIMARY KEY (`MaPhong`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table database_05_khai.phong: ~4 rows (approximately)
INSERT INTO `phong` (`MaPhong`, `LoaiPhong`, `SoKhachToiDa`, `GiaPhong`, `MoTa`) VALUES
	('P0001', 'Loai 1', 20, 70000, NULL),
	('P0002', 'Loai 1', 25, 90000, NULL),
	('P0003', 'Loai 2', 15, 60000, NULL),
	('P0004', 'Loai 3', 20, 60000, NULL);

-- Dumping structure for table database_05_khai.khach_hang
CREATE TABLE IF NOT EXISTS `khach_hang` (
  `MaKH` varchar(50) NOT NULL,
  `TenKH` varchar(100) NOT NULL,
  `DiaChi` varchar(50) DEFAULT NULL,
  `SoDT` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`MaKH`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table database_05_khai.khach_hang: ~4 rows (approximately)
INSERT INTO `khach_hang` (`MaKH`, `TenKH`, `DiaChi`, `SoDT`) VALUES
	('KH0001', 'Nguyen Van A', 'Hoa xuan', '11111111111'),
	('KH0002', 'Nguyen Van B', 'Hoa lai', '11111111112'),
	('KH0003', 'Phan Van A', 'Cam le', '11111111113'),
	('KH0004', 'Phan Van B', 'Hoa xuan', '11111111114');

-- Dumping structure for table database_05_khai.dich_vu_di_kem
CREATE TABLE IF NOT EXISTS `dich_vu_di_kem` (
  `MaDV` varchar(50) NOT NULL,
  `TenDV` varchar(50) NOT NULL,
  `DonViTinh` varchar(50) DEFAULT NULL,
  `DonGia` float NOT NULL,
  PRIMARY KEY (`MaDV`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table database_05_khai.dich_vu_di_kem: ~4 rows (approximately)
INSERT INTO `dich_vu_di_kem` (`MaDV`, `TenDV`, `DonViTinh`, `DonGia`) VALUES
	('DV001', 'Beer', 'lon', 10000),
	('DV002', 'Nuoc ngot', 'lon', 8000),
	('DV003', 'Trai cay', 'dia', 35000),
	('DV004', 'Khan uot', 'cai', 2000);

-- Dumping structure for table database_05khai.dat_phong
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

-- Dumping data for table database_05_khai.dat_phong: ~4 rows (approximately)
INSERT INTO `dat_phong` (`MaDatPhong`, `MaPhong`, `MaKH`, `NgayDat`, `GioBatDau`, `GioKetThuc`, `TienDatCoc`, `GhiChu`, `TrangThaiDat`) VALUES
	('DP0001', 'P0001', 'KH0002', '2018-03-26', '11:00:00', '13:30:00', 100000, NULL, 'Da dat'),
	('DP0002', 'P0001', 'KH0003', '2018-03-27', '17:15:00', '19:15:00', 50000, NULL, 'Da huy'),
	('DP0003', 'P0002', 'KH0002', '2018-03-26', '20:30:00', '22:15:00', 100000, NULL, 'Da dat'),
	('DP0004', 'P0003', 'KH0001', '2018-04-01', '19:30:00', '21:15:00', 200000, NULL, 'Da dat');

-- Dumping structure for table database_05_khai.chi_tiet_su_dung_dich_vu
CREATE TABLE IF NOT EXISTS `chi_tiet_su_dung_dich_vu` (
  `MaDatPhong` varchar(50) NOT NULL,
  `MaDV` varchar(50) NOT NULL,
  `SoLuong` int(11) DEFAULT NULL,
  PRIMARY KEY (`MaDatPhong`,`MaDV`),
  KEY `ctsddv_madv_foreign` (`MaDV`),
  CONSTRAINT `ctsddv_madatphong_foreign` FOREIGN KEY (`MaDatPhong`) REFERENCES `dat_phong` (`MaDatPhong`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `ctsddv_madv_foreign` FOREIGN KEY (`MaDV`) REFERENCES `dich_vu_di_kem` (`MaDV`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table database_05_khai.chi_tiet_su_dung_dich_vu: ~7 rows (approximately)
INSERT INTO `chi_tiet_su_dung_dich_vu` (`MaDatPhong`, `MaDV`, `SoLuong`) VALUES
	('DP0001', 'DV001', 20),
	('DP0001', 'DV002', 10),
	('DP0001', 'DV003', 3),
	('DP0002', 'DV002', 10),
	('DP0002', 'DV003', 1),
	('DP0003', 'DV003', 2),
	('DP0003', 'DV004', 10);
    
-- Câu 1: Hiển thị MaDatPhong, MaPhong, LoaiPhong, GiaPhong, TenKH, NgayDat, TongTienHat, TongTienSuDungDichVu, 
-- TongTienThanhToan tương ứng với từng mã đặt phòng có trong bảng DAT_PHONG. 
SELECT dp.MaDatPhong, dp.MaPhong, p.GiaPhong, kh.TenKH, dp.NgayDat, (ctsddv.SoLuong * (dp.GioKetThuc - dp.GioBatDau)) AS TongTienHat,(ctsddv.SoLuong * dvdk.DonGia) AS TongTienSuDungDichVu,((ctsddv.SoLuong * (dp.GioKetThuc - dp.GioBatDau)) + (ctsddv.SoLuong * dvdk.DonGia)) AS TongTienThanhToan
FROM dat_phong AS dp LEFT JOIN chi_tiet_su_dung_dich_vu AS ctsddv ON dp.MaDatPhong = ctsddv.MaDatPhong
LEFT JOIN phong AS p ON dp.MaPhong = p.MaPhong 
LEFT JOIN khach_hang AS kh ON dp.MaKH = kh.MaKH 
LEFT JOIN dich_vu_di_kem AS dvdk ON ctsddv.MaDV = dvdk.MaDV
GROUP BY dp.MaDatPhong;

-- Câu 2: Hiển thị MaKH, TenKH, DiaChi, SoDT của những khách hàng đã từng đặt phòng karaoke có địa chỉ ở “Hoa xuan”
SELECT kh.*
FROM khach_hang AS kh INNER JOIN dat_phong AS dp ON kh.MaKH = dp.MaKH
WHERE kh.DiaChi = 'Hoa xuan' AND dp.TrangThaiDat = 'Da dat';

-- Câu 3: Hiển thị MaPhong, LoaiPhong, SoKhachToiDa, GiaPhong, SoLanDat của những phòng được khách hàng đặt có số 
-- lần đặt lớn hơn 2 lần và trạng thái đặt là “Da dat”
SELECT phong.MaPhong, phong.LoaiPhong, phong.SoKhachToiDa, phong.GiaPhong, Count(dat_phong.MaPhong) AS SoLanDat
FROM phong Left JOIN dat_phong ON phong.MaPhong = dat_phong.MaPhong 
WHERE dat_phong.TrangThaiDat = 'Da dat'
GROUP BY dat_phong.MaPhong
HAVING Count(dat_phong.MaPhong) > 2;
