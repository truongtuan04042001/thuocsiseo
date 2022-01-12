 /* CREATE SCHEMA `thuocsionline` DEFAULT CHARACTER SET utf8mb4 ;
 use thuocsionline;
 CREATE TABLE loaihang (
   IdLoaiHang varchar(10) NOT NULL PRIMARY KEY,
   TenLoaiHang VARCHAR(30)
 ) ENGINE = MyISAM DEFAULT CHARSET = utf8;
 CREATE TABLE sanpham (
   LoaiHang VARCHAR(50),
   NhomHang VARCHAR(100),
   MaHang VARCHAR(50) PRIMARY KEY,
   TenHang VARCHAR(255) NOT NULL DEFAULT 'null',
   SoDangKy VARCHAR(50) NOT NULL DEFAULT 'null',
   HoatChat VARCHAR(255) NOT NULL DEFAULT 'null',
   HamLuong VARCHAR(50),
   HangSX VARCHAR(255) NOT NULL DEFAULT 'null',
   NuocSX VARCHAR(50) NOT NULL DEFAULT 'null',
   QCDG VARCHAR(50),
   GiaBan float(10, 2),
   GiaVon float(10, 2),
   DVT varchar (50),
   HinhAnh text,
   MoTa text,
   TonKho int default 0,
   DangKD tinyint NOT NULL default 1,
   TinhDS tinyint NOT NULL  default 0,
   BanChay tinyint NOT NULL default 0,
   SPmoi tinyint NOT NULL default 0,
   HDnhanh tinyint NOT NULL default 0,
   GHnhanh tinyint NOT NULL default 0,
   SVip tinyint NOT NULL default 0,
   NhiKhoa tinyint NOT NULL default 0,
   NhaKhoa tinyint NOT NULL default 0,
   SanKhoa tinyint NOT NULL default 0,
   DaLieu tinyint NOT NULL default 0,
   NTHop tinyint NOT NULL default 0,
   ThanKinh tinyint NOT NULL default 0,
   BV tinyint NOT NULL default 0,
   FlashSale tinyint NOT NULL default 0,
   PhanTramKM float(3, 2) NOT NULL default 0
 ) ENGINE = MyISAM DEFAULT CHARSET = utf8;
 CREATE TABLE hangsanxuat (
   IdHangSX int auto_increment NOT NULL PRIMARY KEY,
   TenHangSX VARCHAR (100)
 ) ENGINE = MyISAM DEFAULT CHARSET = utf8;
 CREATE TABLE nhomhang (
   IdNH int auto_increment NOT NULL PRIMARY KEY,
   TenNH VARCHAR (50)
 ) ENGINE = MyISAM DEFAULT CHARSET = utf8;
 CREATE TABLE hoatchat (
   IdHC int auto_increment NOT NULL PRIMARY KEY,
   TenHC VARCHAR(255)
 ) ENGINE = MyISAM DEFAULT CHARSET = utf8;
 CREATE TABLE nuocsanxuat (
   IdNuocSX int auto_increment NOT NULL PRIMARY KEY,
   TenNuocSX VARCHAR(50)
 ) ENGINE = MyISAM DEFAULT CHARSET = utf8;
 CREATE TABLE nhanvien (
   ChucVu int default 0,
   MaNV VARCHAR(50) PRIMARY KEY,
   Info tinyint default 0,
   TenNV VARCHAR(50) default '',
   SDT VARCHAR(10) default '',
   Email VARCHAR(100) default '',
   MK VARCHAR(100) default '123456',
   Cccd VARCHAR(20) default '',
   NgS DATE default '1870/01/01',
   DiaChi VARCHAR(255) default ''
 ) ENGINE = MyISAM DEFAULT CHARSET = utf8;
 CREATE TABLE manager (
   Id int auto_increment NOT NULL PRIMARY KEY,
   MaNV varchar(50) default 'mn'
 );
 CREATE TABLE seller (
   Id int auto_increment NOT NULL PRIMARY KEY,
   MaNV varchar(50) default 'slr'
 );
 CREATE TABLE sale (
   Id int auto_increment NOT NULL PRIMARY KEY,
   MaNV varchar(50) default 'sl'
 );
 CREATE TABLE stocker (
   Id int auto_increment NOT NULL PRIMARY KEY,
   MaNV varchar(50) default 'sk'
 );
 CREATE TABLE editor (
   Id int auto_increment NOT NULL PRIMARY KEY,
   MaNV varchar(50) default 'ed'
 );
 CREATE TABLE lohang (
   IdLH INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
   MaLH VARCHAR(30) DEFAULT '',
   TenLH VARCHAR(50) DEFAULT '',
   TSoLuong INT DEFAULT 0,
   TongTien FLOAT(10, 2),
   NgayNhapLo DATE DEFAULT '1870/01/01',
   GhiChu TEXT
 ) ENGINE = MyISAM DEFAULT CHARSET = utf8;
 CREATE TABLE chitietlohang (
   IdSTT INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
   MaHang VARCHAR(50) DEFAULT '',
   TenHang VARCHAR(255) DEFAULT '',
   SoLuong INT DEFAULT 0,
   DonGia FLOAT(10, 2) DEFAULT 0,
   DVT VARCHAR(50) DEFAULT '',
   MaLH VARCHAR(30) DEFAULT '',
   NgaySX DATE  DEFAULT '1870/01/01',
   HanSD DATE DEFAULT '1870/01/01',
   GhiChu TEXT
 ) ENGINE = MyISAM DEFAULT CHARSET = utf8;
 CREATE TABLE danhmuctag (
   IdTag int NOT NULL AUTO_INCREMENT,
   TenTag varchar(50) DEFAULT NULL,
   PRIMARY KEY (IdTag)
 ) ENGINE = MyISAM DEFAULT CHARSET = utf8;
 CREATE TABLE donhang(
   IdMaDH BIGINT AUTO_INCREMENT PRIMARY KEY,
   MaNV VARCHAR(50),
   NgayTao DATE DEFAULT '2021/01/01',
   TongTien FLOAT(15, 2) DEFAULT 0,
   ChietKhau TINYINT DEFAULT 0,
   VAT TINYINT DEFAULT 0,
   GhiChu TEXT,
   TenKH VARCHAR(50),
   SDT VARCHAR(10),
   DiaChi VARCHAR(255),
   Email VARCHAR(100),
   TinhTrangDon tinyint DEFAULT 0,
 ) ENGINE = MyISAM AUTO_INCREMENT = 100 DEFAULT CHARSET = utf8;
 CREATE TABLE chitietdonhang(
   IdCTDH BIGINT AUTO_INCREMENT PRIMARY KEY ,
   IdMaDH BIGINT ,
   MaHang VARCHAR(50) ,
   TenHang VARCHAR(255) ,
   GiaBan FLOAT(10, 2),
   SoLuong INT
 ) ENGINE = MyISAM DEFAULT CHARSET = utf8;
 Create table doanhnghiep(
   MaUser varchar(50),
   MaDN int auto_increment primary key,
   LoaiDN varchar(50),
   TenDN varchar(155),
   TenDaiDien varchar(100),
   SDTDN varchar(12),
   MaThue varchar(50),
   DiaChiDN varchar(255),
   PhuongXaDN varchar(100),
   TinhDN varchar(100)
 ) ENGINE = MyISAM DEFAULT CHARSET = utf8;

 SELECT * FROM danhmuctag

 SELECT * FROM chitietlohang WHERE DATEDIFF(HanSD, CURRENT_DATE()) < 365

 SELECT * FROM nhanvien WHERE MaNV = 'adm' AND MK = 'ssafasf'

 SELECT DISTINCT * FROM chitietlohang WHERE MaHang = 'SV214'

 SELECT SoLuong FROM chitietlohang WHERE MaHang = 'SV214'

 UPDATE chitietlohang SET TenHang = 'abc', SoLuong = 1, DonGia = 100000, DVT = 'Hộp', NgaySX = '2021/01/01', HanSD  = '2023/01/01', GhiChu = 'OK' WHERE MaHang = 'SV214' AND MaLH = '4234'

 UPDATE nhanvien SET ? WHERE MaNV = ?

 SELECT IdMaDH FROM donhang ORDER BY IdMaDH DESC LIMIT 1;

 SELECT MaHang,TenHang,QCDG,GiaBan,HinhAnh,TonKho,PhanTramKM FROM thuocsionline.sanpham;

 select COUNT(*) from sanpham WHERE HangSX LIKE '%Alcon Pharmaceuticals%';

 SELECT MaHang, SoLuong, HanSD FROM thuocsionline.chitietlohang WHERE MaHang = 'TPCN01' AND SoLuong > 0 ORDER BY HanSD;

 UPDATE chitietlohang SET SoLuong = 20 WHERE IdSTT = 1;

 SELECT MaHang, SoLuong, TrangThai FROM donhang,chitietdonhang where ((donhang.MaDatHang = chitietdonhang.MaDatHang and MaHang = 'TPCN01' and TrangThai = 'Chưa xác nhận') or (donhang.MaDatHang = chitietdonhang.MaDatHang and MaHang = 'TPCN01' and TrangThai = 'Đã xác nhận'));

 alter table sanpham add DaDat int default 0 after TonKho;

 alter table sanpham add ConLai int default 0 after DaDat;

 select sanpham.MaHang,TonKho from sanpham, donhang,chitietdonhang where (sanpham.MaHang = chitietdonhang.MaHang and donhang.MaDatHang = chitietdonhang.MaDatHang and chitietdonhang.MaDatHang = 'DH000001');

 câu này lấy thông tin sản phẩm theo sản phẩm trong giỏ hàng
 select MaHang, TenHang, GiaBan, TonKho, DaDat, ConLai, DangKD, PhanTramKM from sanpham where MaHang in('TPCN01','TPCN02');

 insert into chitietlohang set MaHang = 'abc123', TenHang = 'abc123', SoLuong = 0, DonGia = 12000, DVT = 'abc123', MaLH = 'abc123', HanSD = DATE_ADD(CURRENT_DATE(), INTERVAL 5 YEAR);

 select * from sanpham WHERE HoatChat LIKE %vitamin% or HangSX LIKE %vitamin% or TenHang LIKE %vitamin%

 mysqldump -u root -p thuocsionline > thuocSi.sql

 mysql -u root -p thuocsionline > thuocSi.sql

 alter table donhang add MaNgXuLy varchar(50) default '' after MaNguoiBan;

 alter table donhang add NgayXuLy date after NgayDatHang;

 alter table sanpham add KhachDat int after ConLai;

 alter table chitietlohang add NgayNhapHang date after HanSD;

 ALTER TABLE table_name RENAME COLUMN old_col_name TO new_col_name;

 ALTER TABLE sanpham RENAME COLUMN DaDat TO KhachDat;

 SELECT DATE_FORMAT(NgayXuLy, '%d/%m/%Y') FROM thuocsionline.donhang;

 alter table nhanvien add DiemThuong float(10,2) default 0.0;

 alter table donhang add DoiDiem float(10,2) default 0.0;

 alter table donhang add TienMaGiamGia float(10,2) default 0.0;

 alter table donhang add TienDoiDiem float(12,2) default 0.0;

 select MaHang, SoLuong from chitietdonhang where MaDatHang in('DH000125','DH001019','DH001201','DH001177','DH001178','DH001179','DH001181','DH001182','DH001183','DH001185','DH001186','DH001188','DH001189','DH001192','DH001194','DH001195','DH001196','DH001197','DH001198','DH001199','DH001200','DH001202','DH001204','DH001205','DH001206','DH001207','DH001208','DH001209','DH001210','DH001211','DH001212','DH001213','DH001214','DH001215','DH001217','DH001218','DH001219','DH001220','DH001221','DH001222','DH001223','DH001224','DH001226','DH001227','DH001228','DH001229','DH001230','DH001231','DH001232','DH001233','DH001234','DH001236','DH001237','DH001238','DH001239','DH001240','DH001241','DH001243','DH001244','DH001255','DH001245','DH001246','DH001247','DH001249','DH001251','DH001252','DH001253','DH001257','DH001258','DH001259','DH001260','DH001263','DH001264','DH001265','DH001266','DH001267','DH001268','DH001269','DH001270','DH001272','DH001273','DH001274','DH001275','DH001276','DH001278','DH001302','DH001304','DH001305','DH001306','DH001307','DH001308','DH001309','DH001310','DH001313','DH001316','DH001318','DH001317','DH001323','DH001325','DH001326','DH001327','DH001328','DH001329','DH001332','DH001333','DH001334','DH001335','DH001336','DH001338','DH001339','DH001341','DH001342','DH001343','DH001344','DH001345','DH001347','DH001348','DH001349','DH001350','DH001351','DH001352','DH001353','DH001354','DH001355','DH001356','DH001357','DH001358','DH001359','DH001361','DH001363','DH001364','DH001365','DH001366','DH001367','DH001370','DH001371','DH001372','DH001373','DH001375','DH001376','DH001377','DH001378','DH001379','DH001380','DH001381','DH001382','DH001383','DH001384','DH001385','DH001386','DH001389','DH001390','DH001392','DH001394','DH001395') and MaHang = 'Cov002'; má nó phê :v

 INSERT INTO `magiamgia` ( `doiTuong`, `tienGiam`, `ngayHetHan`) VALUES ( '0345345345', '100000', '2022-01-01'), ( '0345345345', '100000', '2022-01-01');

 CREATE TABLE doidiem (
   Id int auto_increment NOT NULL PRIMARY KEY,
   Gia float(10,2),
   Diem float(10,2)
 ) ENGINE = MyISAM DEFAULT CHARSET = utf8;
 alter table nhanvien add DiemThuong float(10,2) default 0.0;
 alter table donhang add DoiDiem float(10,2) default 0.0;
 alter table donhang add TienMaGiamGia float(10,2) default 0.0;
 alter table donhang add TienDoiDiem float(12,2) default 0.0;
 alter table donhang add CongNo float(12,2) default 0.0;

 sửa kiểu dữ liệu cột KhachDaTra là varchar(50)
 CREATE TABLE nhacungcap (
   Id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
   TenNCC VARCHAR(150),
   SDT VARCHAR(11),
   TenTK VARCHAR(50),
   SoTK VARCHAR(30),
   TenNH VARCHAR(100),
   GhiChu TEXT
 ) ENGINE = MyISAM DEFAULT CHARSET = utf8;
 CREATE TABLE donhangnhap (
   Id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
   TenNCC VARCHAR(150),
   SDT VARCHAR(11),
   TenTK VARCHAR(50),
   SoTK VARCHAR(30),
   TenNH VARCHAR(100),
   GhiChu TEXT,
   NgayNhapHang DATE,
   TongTien FLOAT(15,2)
 ) ENGINE = MyISAM DEFAULT CHARSET = utf8;
 CREATE TABLE chitietdonhangnhap (
   Id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
   MaDHN BIGINT,
   MaHang VARCHAR(50),
   TenHang VARCHAR(255),
   SoLuong int,
   DonGia float(15,2),
   DVT VARCHAR(50),
   MaLH varchar(30),
   HanSD DATE
 ) ENGINE = MyISAM DEFAULT CHARSET = utf8;

 alter table donhang modify column KhachDaTra VARCHAR(50);
alter table donhangnhap add MaDHN VARCHAR(12) default '';
alter table chitietdonhangnhap modify column MaDHN VARCHAR(12);
alter table donhangnhap add DaTra VARCHAR(50) default '';
alter table donhangnhap add CongNo FLOAT(12,2) default 0.0;
alter table donhang add GhiChuVanChuyen TEXT;
 alter table nhacungcap add MaNCC VARCHAR(10);
alter table donhangnhap add MaNCC VARCHAR(10);
alter table sanpham add NhanhHang VARCHAR(255);
alter table chitietdonhang add NhanhHang VARCHAR(255);
 */
 
  /* CREATE TABLE thuchi (
    Id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    KhoanTC VARCHAR(100) DEFAULT '',
    NoiDungTC VARCHAR(255) DEFAULT '',
    LoaiTC VARCHAR(10) DEFAULT '',
    TienTC FLOAT(18, 2),
    NgayTC DATE DEFAULT '1870/01/01'
  ) ENGINE = MyISAM DEFAULT CHARSET = utf8; */

 /* CREATE TABLE combo (
   Id int auto_increment NOT NULL PRIMARY KEY,
   IdCombo varchar(10),
   ComboName VARCHAR(255),
   TotalPrice float(20,2),
   GiftBundle varchar(255),
   LoyaltyPoint int,
   ImageOne text,
   ImageTwo text,
   ImageThree text,
   Status tinyint
 ) ENGINE = MyISAM DEFAULT CHARSET = utf8; */
 
/* CREATE TABLE combo_detail (
    Id int auto_increment NOT null primary key,
    IdCombo varchar(10),
    MaHang VARCHAR(255),
    TenHang VARCHAR(255),
    GiaBan float(20,2),
    SoLuong int,
    DVT varchar(255),
    QCDG varchar(255),
    HinhAnh text
) ENGINE = MyISAM DEFAULT CHARSET = utf8; */

 /* CREATE TABLE combostatistic (
  Id int auto_increment NOT NULL PRIMARY KEY,
  MaDatHang varchar(10),
  KhachHang varchar(100),
  MaKhachHang varchar(50),
  SoDienThoai varchar(20),
  NgayDatHang date,
  NgayXuLy date,
  MaNgXuLy varchar(50),
  IdCombo varchar(10),
  ComboName varchar(255),
  TotalPrice float(20,2),
  Quantity int
 ); */

 /* CREATE TABLE article (
  Id int auto_increment NOT NULL PRIMARY KEY,
  ThumbNail text,
  Title text,
  PostDate date,
  Author varchar(100),
  Content text
 ); */

/* alter table nhanvien add DiemCombo int DEFAULT 0; */

 /* select * from combo where Status = 1 order by Id asc */

/* alter table article add AltThumbnail text;
alter table article add CanonicalTag text;
alter table article add MetaDescription text;
alter table sanpham add HinhAnh2 text;
alter table sanpham add HinhAnh3 text; */

/* insert into sanpham(LoaiHang,NhomHang,MaHang,TenHang,SoDangKy,HoatChat,HamLuong,HangSX,NuocSX,QCDG,GiaBan,GiaVon,DVT,MoTa,TonKho,DaDat,ConLai,KhachDat,DangKD,TinhDS,BanChay,SPmoi,HDnhanh,GHnhanh,SVip,NhiKhoa,NhaKhoa,SanKhoa,DaLieu,NTHop,ThanKinh,BV,FlashSale,PhanTramKM,NhanhHang) values (`COMBO`,`COMBO`,data.IdCombo, data.ComboName,`COMBO`,`COMBO`,`COMBO`,`COMBO`,`COMBO`,`COMBO`,data.TotalPrice, data.TotalPrice,`COMBO`, `COMBO`, 1000,0,1000, 0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,`COMBO`); */

insert into sanpham(LoaiHang,NhomHang,MaHang,TenHang,SoDangKy,HoatChat,HamLuong,HangSX,NuocSX,QCDG,GiaBan,GiaVon,DVT,MoTa,TonKho,DaDat,ConLai,KhachDat,DangKD,TinhDS,BanChay,SPmoi,HDnhanh,GHnhanh,SVip,NhiKhoa,NhaKhoa,SanKhoa,DaLieu,NTHop,ThanKinh,BV,FlashSale,PhanTramKM,NhanhHang) values ('COMBO','COMBO','COMBO_01', 'Combo 1 - Yêu thương','COMBO','COMBO','COMBO','COMBO','COMBO','COMBO',946500, 946500,'COMBO', 'COMBO', 1000,0,1000, 0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'COMBO');

insert into sanpham(LoaiHang,NhomHang,MaHang,TenHang,SoDangKy,HoatChat,HamLuong,HangSX,NuocSX,QCDG,GiaBan,GiaVon,DVT,MoTa,TonKho,DaDat,ConLai,KhachDat,DangKD,TinhDS,BanChay,SPmoi,HDnhanh,GHnhanh,SVip,NhiKhoa,NhaKhoa,SanKhoa,DaLieu,NTHop,ThanKinh,BV,FlashSale,PhanTramKM,NhanhHang) values ('COMBO','COMBO','COMBO_02', 'Combo 2 - Tri ân','COMBO','COMBO','COMBO','COMBO','COMBO','COMBO',852000, 852000,'COMBO', 'COMBO', 1000,0,1000, 0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'COMBO');

insert into sanpham(LoaiHang,NhomHang,MaHang,TenHang,SoDangKy,HoatChat,HamLuong,HangSX,NuocSX,QCDG,GiaBan,GiaVon,DVT,MoTa,TonKho,DaDat,ConLai,KhachDat,DangKD,TinhDS,BanChay,SPmoi,HDnhanh,GHnhanh,SVip,NhiKhoa,NhaKhoa,SanKhoa,DaLieu,NTHop,ThanKinh,BV,FlashSale,PhanTramKM,NhanhHang) values ('COMBO','COMBO','COMBO_03', 'Combo 3 - Bán chạy','COMBO','COMBO','COMBO','COMBO','COMBO','COMBO',682500, 682500,'COMBO', 'COMBO', 1000,0,1000, 0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'COMBO');

insert into sanpham(LoaiHang,NhomHang,MaHang,TenHang,SoDangKy,HoatChat,HamLuong,HangSX,NuocSX,QCDG,GiaBan,GiaVon,DVT,MoTa,TonKho,DaDat,ConLai,KhachDat,DangKD,TinhDS,BanChay,SPmoi,HDnhanh,GHnhanh,SVip,NhiKhoa,NhaKhoa,SanKhoa,DaLieu,NTHop,ThanKinh,BV,FlashSale,PhanTramKM,NhanhHang) values ('COMBO','COMBO','COMBO_04', 'Combo 4 - Sức khỏe','COMBO','COMBO','COMBO','COMBO','COMBO','COMBO',993000, 993000,'COMBO', 'COMBO', 1000,0,1000, 0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'COMBO');

insert into sanpham(LoaiHang,NhomHang,MaHang,TenHang,SoDangKy,HoatChat,HamLuong,HangSX,NuocSX,QCDG,GiaBan,GiaVon,DVT,MoTa,TonKho,DaDat,ConLai,KhachDat,DangKD,TinhDS,BanChay,SPmoi,HDnhanh,GHnhanh,SVip,NhiKhoa,NhaKhoa,SanKhoa,DaLieu,NTHop,ThanKinh,BV,FlashSale,PhanTramKM,NhanhHang) values ('COMBO','COMBO','COMBO_05', 'Combo 5 - Chăm sóc','COMBO','COMBO','COMBO','COMBO','COMBO','COMBO',927000, 927000,'COMBO', 'COMBO', 1000,0,1000, 0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'COMBO');

insert into sanpham(LoaiHang,NhomHang,MaHang,TenHang,SoDangKy,HoatChat,HamLuong,HangSX,NuocSX,QCDG,GiaBan,GiaVon,DVT,MoTa,TonKho,DaDat,ConLai,KhachDat,DangKD,TinhDS,BanChay,SPmoi,HDnhanh,GHnhanh,SVip,NhiKhoa,NhaKhoa,SanKhoa,DaLieu,NTHop,ThanKinh,BV,FlashSale,PhanTramKM,NhanhHang) values ('COMBO','COMBO','COMBO_06', 'Combo 6 - Sản phẩm thiết yếu','COMBO','COMBO','COMBO','COMBO','COMBO','COMBO',1304700, 1304700,'COMBO', 'COMBO', 1000,0,1000, 0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'COMBO');