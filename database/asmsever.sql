-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th4 06, 2022 lúc 10:41 AM
-- Phiên bản máy phục vụ: 10.4.22-MariaDB
-- Phiên bản PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `asmsever`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `loaiphong`
--

CREATE TABLE `loaiphong` (
  `idLoaiPhong` int(11) NOT NULL,
  `tenLoaiPhong` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `loaiphong`
--

INSERT INTO `loaiphong` (`idLoaiPhong`, `tenLoaiPhong`) VALUES
(1, 'Chung Cư'),
(2, 'Phòng Trọ'),
(3, 'Ký Túc Xá'),
(4, 'Nhà Nguyên Căn');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `room`
--

CREATE TABLE `room` (
  `idroom` int(8) NOT NULL,
  `image` varchar(50) NOT NULL,
  `tenPhong` varchar(100) NOT NULL,
  `giaPhong` int(10) NOT NULL,
  `idLoaiPhong` varchar(50) NOT NULL,
  `chieuDai` int(3) NOT NULL,
  `chieuRong` int(3) NOT NULL,
  `giaNuoc` int(10) NOT NULL,
  `giaDien` int(10) NOT NULL,
  `moTa` text NOT NULL,
  `tinh` varchar(20) NOT NULL,
  `quan` varchar(20) NOT NULL,
  `phuong` varchar(20) NOT NULL,
  `duong` varchar(100) NOT NULL,
  `idUser` varchar(8) NOT NULL,
  `idTienIch` varchar(50) NOT NULL,
  `xacThuc` varchar(5) NOT NULL,
  `kiemDuyet` varchar(5) NOT NULL,
  `gioiTinh` varchar(50) NOT NULL,
  `ngayTao` varchar(50) NOT NULL,
  `luotXem` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `room`
--

INSERT INTO `room` (`idroom`, `image`, `tenPhong`, `giaPhong`, `idLoaiPhong`, `chieuDai`, `chieuRong`, `giaNuoc`, `giaDien`, `moTa`, `tinh`, `quan`, `phuong`, `duong`, `idUser`, `idTienIch`, `xacThuc`, `kiemDuyet`, `gioiTinh`, `ngayTao`, `luotXem`) VALUES
(25, '1649064477782.jpg', 'Phòng trọ An', 2000000, 'Chung cư', 6, 4, 5000, 3000, 'Thông tin mô tả\nCăn hộ Studio Full NT Quận 7\n️Địa chỉ: đường số 8 , Phường Tân Thuận Đông, Quận 7\nGiá chỉ từ :8tr -- 10tr', 'DakLak', 'Eakar', 'Eapal', 'Nguyễn Tất thành', '02', 'undefined', 'false', 'false', 'Nam', '3/4/2022', 0),
(26, '1649064495272.jpg', 'Phòng trọ An', 2000000, 'Chung cư', 6, 4, 567567, 3000, 'giá rẻ', 'DakLak', 'Eakar', 'Eapal', 'Nguyễn Tất thành', '02', 'undefined', 'false', 'false', 'Nữ', '3/4/2022', 0),
(27, '1649064508846.jpg', 'Phòng trọ Ánh', 300000, 'Chung cư', 6, 7, 567567, 3000, 'Ngày đăng:	Thứ 2, 14:50 04/04/2022\nNgày hết hạn:	Thứ 7, 14:50 09/04/2022\nThông tin liên hệ\nLiên hệ:	Lê Thị Hồng Thảo\nĐiện thoại:	0378592546\nZalo	0378592546', 'HCM', 'Quận 1', 'Tân An', 'Nguyễn Tất thành', '02', 'undefined', 'false', 'false', 'Nam', '4/4/2022', 0),
(28, '1649063614159.jpg', 'Chung cư Hòa', 900000, 'Chung cư', 4, 5, 4000, 2000, 'Ngày đăng:	Thứ 2, 14:50 04/04/2022\nNgày hết hạn:	Thứ 7, 14:50 09/04/2022\nThông tin liên hệ\n', 'HCM', 'Quận 2', 'Tân Hòa', 'Nguyễn Xuân Nguyên', '02', '', 'false', 'false', 'Cả Hai', '4/4/2022', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tienich`
--

CREATE TABLE `tienich` (
  `idTienIch` int(11) NOT NULL,
  `tenTienIch` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tienich`
--

INSERT INTO `tienich` (`idTienIch`, `tenTienIch`) VALUES
(1, 'Tivi'),
(2, 'An Ninh'),
(3, 'WC Riêng'),
(4, 'Tủ Lạnh'),
(5, 'Máy Lạnh'),
(6, 'Thú Cưng'),
(7, 'Tủ Đồ'),
(8, 'Gác Lửng');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `idUser` int(11) NOT NULL,
  `avartar` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `thanhVien` varchar(10) NOT NULL,
  `matKhau` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`idUser`, `avartar`, `email`, `thanhVien`, `matKhau`) VALUES
(1, '', 'admin@gmail.com', 'admin', 'admin'),
(4, '', 'tai@gmail.com', 'host', '123456'),
(6, '', 'lengochuyc2130220002@gmail.com', 'host', 'd62a14d1d2ceed00d4cbc708c2746d2a');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `loaiphong`
--
ALTER TABLE `loaiphong`
  ADD PRIMARY KEY (`idLoaiPhong`);

--
-- Chỉ mục cho bảng `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`idroom`);

--
-- Chỉ mục cho bảng `tienich`
--
ALTER TABLE `tienich`
  ADD PRIMARY KEY (`idTienIch`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`idUser`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `loaiphong`
--
ALTER TABLE `loaiphong`
  MODIFY `idLoaiPhong` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `room`
--
ALTER TABLE `room`
  MODIFY `idroom` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT cho bảng `tienich`
--
ALTER TABLE `tienich`
  MODIFY `idTienIch` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
