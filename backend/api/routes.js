const multer = require('multer');
const db = require('./db')
'use strict';
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const redis = require("redis");
const CongNoController = require('./controllers/CongNoController');
const NhaCungCapController = require('./controllers/NhaCungCapController');
const PORT_REDIS = process.env.PORT || 6379
const redisClient = redis.createClient(PORT_REDIS)
const set = (key, value) => {
  redisClient.set(key, JSON.stringify(value));
}

const getsg = (req, res, next) => {

  let key = req.route.path;
  redisClient.get(key, (error, data) => {
    if (error) res.status(400).send(err);

    if (data !== null) {
      // console.log("roi" + key)
      res.status(200).send(JSON.parse(data));
    } else {
      console.log("chua" + key)
      next();
    }
  });
}
const getsearch = (req, res, next) => {

  let key = req.body.sercmdarr + req.body.sotrang;
  redisClient.hget("Sanpham", key, (error, data) => {
    if (error) res.status(400).send(err);
    if (data !== null) {
      // console.log("roi" + key)
      res.status(200).send(JSON.parse(data));
    } else {
      console.log("chua" + key)
      next();
    }
  });
}
const getsearchapp = (req, res, next) => {

  let key = req.body.sercmdarr + req.body.sotrang;
  redisClient.hget("Sanphamapp", key, (error, data) => {
    if (error) res.status(400).send(err);
    if (data !== null) {
      // console.log("roi" + key)
      res.status(200).send(JSON.parse(data));
    } else {
      console.log("chua" + key)
      next();
    }
  });
}
const getsearchtags = (req, res, next) => {

  let key = req.body.sertags + req.body.sotrang;
  redisClient.hget("Sanpham", key, (error, data) => {
    if (error) res.status(400).send(err);
    if (data !== null) {
      // console.log("roi" + key)
      res.status(200).send(JSON.parse(data));
    } else {
      console.log("chua" + key)
      next();
    }
  });
}
const getsearchtagsapp = (req, res, next) => {

  let key = req.body.sertags + req.body.sotrang;
  redisClient.hget("Sanphamapp", key, (error, data) => {
    if (error) res.status(400).send(err);
    if (data !== null) {
      // console.log("roi" + key)
      res.status(200).send(JSON.parse(data));
    } else {
      console.log("chua" + key)
      next();
    }
  });
}

// khai báo storage để upload file excel lô hàng
const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads_LoHang2')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + "-" + file.originalname)
  }
})

// khai báo storage để upload file excel lô hàng
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads_LoHang')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + "-" + file.originalname)
  }
})

const upload2 = multer({ storage: storage2 })

const upload = multer({ storage: storage })

const storageImageOne = multer.diskStorage({
  destination: async (req, file, cb) => {
    cb(null, './public/imageCombo')
  },
  filename: async function (req, file, cb) {
    cb(null, req.params.idCombo + "_Hinh1.jpg")
  }
})

const uploadImageOne = multer({ storage: storageImageOne })

const storageImageTwo = multer.diskStorage({
  destination: async (req, file, cb) => {
    cb(null, './public/imageCombo')
  },
  filename: async function (req, file, cb) {
    cb(null, req.params.idCombo + "_Hinh2.jpg")
  }
})

const uploadImageTwo = multer({ storage: storageImageTwo })

const storageImageThree = multer.diskStorage({
  destination: async (req, file, cb) => {
    cb(null, './public/imageCombo')
  },
  filename: async function (req, file, cb) {
    cb(null, req.params.idCombo + "_Hinh3.jpg")
  }
})

const uploadImageThree = multer({ storage: storageImageThree })

module.exports = function (app) {

  // danh mục
  const DanhMucCtrl = require('./controllers/DanhMucController');
  app.route('/danhmucnhomhang')
    .post(getsg, DanhMucCtrl.danhMucNhomHang)
  app.route('/danhmuchsx')
    .post(getsg, DanhMucCtrl.danhMucHSX)

  // doanh nghiệp
  const doanhNghiepCtrl = require('./controllers/DoanhNghiepController');
  app.route('/doanhnghiep')
    .post(doanhNghiepCtrl.doanhNghiep)
  // app.route('/loaidoanhnghiep')
  //   .post(doanhNghiepCtrl.loaiDoanhNghiep)
  app.route('/thongtindoanhnghiep')
    .post(doanhNghiepCtrl.thongTinDoanhNghiep)

  // nhân viên
  const nhanVienCtrl = require('./controllers/NhanVienController');
  app.route('/themnv')
    .post(nhanVienCtrl.themNV)
  app.route('/themkhachhang')
    .post(nhanVienCtrl.themKhachHang)
  app.route(`/plusBonusPointsCombo/:customerCode`)
    .put(nhanVienCtrl.plusBonusPointsCombo)

  app.route('/thongtintaikhoan')
    .post(nhanVienCtrl.thongTinTaiKhoan)
  app.route('/verifytoken')
    .post(nhanVienCtrl.verifyToken)
  app.route('/capnhatthongtin')
    .post(nhanVienCtrl.capNhatThongTin)
  // update địa chỉ giao hàng/ địa chỉ khách hàng khi đặt hàng
  app.route('/CapNhatDiaChiDatHang/:MaNV')
    .put(nhanVienCtrl.capNhatDiaChiDatHang)
  app.route('/layTTKHchoDHOffline/:soDienThoai')
    .get(nhanVienCtrl.layTTKHchoDHOffline)
  app.route('/layTTKHchoDHOffline2/:maKH')
    .get(nhanVienCtrl.layTTKHchoDHOffline2)
  app.route('/checksdt')
    .post(nhanVienCtrl.checkSDT)
  app.route('/thaydoimatkhau')
    .post(nhanVienCtrl.thayDoiMatKhau)
  app.route('/alluser')
    .post(nhanVienCtrl.allUser)
  app.route('/deluser')
    .post(nhanVienCtrl.delUser)
  app.route('/fixuser')
    .post(nhanVienCtrl.fixUser)
  app.route('/allstaff')
    .post(nhanVienCtrl.allStaff)
  app.route('/delstaff')
    .post(nhanVienCtrl.delStaff)
  app.route('/fixstaff')
    .post(nhanVienCtrl.fixStaff)

  // sản phẩm
  const sanPhamCtrl = require('./controllers/SanPhamController');
  app.route('/themsanpham')
    .post(sanPhamCtrl.themSanPham)
  app.route('/xoasanpham_theoMaHang')
    .post(sanPhamCtrl.xoaSanPham_TheoMaHang)
  app.route('/suasanpham')
    .post(sanPhamCtrl.suaSanPham)
  app.route('/suasanphamexcel')
    .post(sanPhamCtrl.suaSanPhamExcel)
  app.route('/ChiTietSanPham/:MaHang')
    .put(sanPhamCtrl.capNhatTonKho1SanPhamKhiDatHang)
    .get(sanPhamCtrl.chiTietSanPham)
  app.route('/chiTietSanPhamThemLH/:MaHang')
    .get(sanPhamCtrl.chiTietSanPhamThemLH)
  app.route('/chiTietSanPhamTheoMaHang/:MaHang')
    .get(sanPhamCtrl.chiTietSanPhamTheoMaHang)
  app.route('/chiTietSanPhamTheoTenHang')
    .post(sanPhamCtrl.chiTietSanPhamTheoTenHang)
  app.route('/kiemTraSanPhamTrongGio')
    .post(sanPhamCtrl.kiemTraSanPhamTrongGio)
  app.route('/laySPsaphethang')
    .get(sanPhamCtrl.laySPsaphethang)

  // mã giảm giá
  const giamGiaCtrl = require('./controllers/MaGiamGiaController');
  app.route('/checkmggused')
    .post(giamGiaCtrl.checkmggused)
  app.route('/magiamgia')
    .post(giamGiaCtrl.mgg)
  app.route('/loaimagiamgia')
    .post(giamGiaCtrl.loaimgg)
  app.route('/themmggNewUser')
    .post(giamGiaCtrl.themmggNew)
  app.route('/themmgg2Month')
    .post(giamGiaCtrl.themmgg2Month)
  app.route('/suaLoaiMgg')
    .post(giamGiaCtrl.suaLoaiMgg)
  app.route('/xoaMggHetHan')
    .post(giamGiaCtrl.xoaMggHetHan)
  app.route('/xoaMggUsed')
    .post(giamGiaCtrl.xoaMggUsed)
  // Tiêu đề trang Mã Giảm Giá / Quà Tặng
  app.route('/layTieuDe')
    .post(giamGiaCtrl.layTieuDe)
  app.route('/suaTieuDe')
    .post(giamGiaCtrl.suaTieuDe)
  // Tiêu đề trang Mã Giảm Giá / Quà Tặng
  ////
  app.route('/loyaltypoint')
    .post(giamGiaCtrl.loyaltypoint)
  app.route('/doidiem')
    .post(giamGiaCtrl.doidiem)
  app.route('/themdiem')
    .post(giamGiaCtrl.themdiem)
  app.route('/suadiem')
    .post(giamGiaCtrl.suadiem)
  app.route('/xoadiem')
    .post(giamGiaCtrl.xoadiem)
  app.route('/doiqua')
    .post(giamGiaCtrl.doiqua)
  app.route('/themqua')
    .post(giamGiaCtrl.themqua)
  app.route('/suaqua')
    .post(giamGiaCtrl.suaqua)
  app.route('/xoaqua')
    .post(giamGiaCtrl.xoaqua)
  ///////
  app.route('/layBanner')
    .post(giamGiaCtrl.layBanner)
  app.route('/themBanner')
    .post(giamGiaCtrl.themBanner)
  app.route('/suaBanner')
    .post(giamGiaCtrl.suaBanner)
  app.route('/xoaBanner')
    .post(giamGiaCtrl.xoaBanner)
  /////layctkm
  app.route('/layctkm')
    .post(giamGiaCtrl.layctkm)
  app.route('/laychuongtrinhkm')
    .post(giamGiaCtrl.laychuongtrinhkm)
  app.route('/themchuongtrinhkm')
    .post(giamGiaCtrl.themchuongtrinhkm)
  app.route('/suachuongtrinhkm')
    .post(giamGiaCtrl.suachuongtrinhkm)
  app.route('/xoachuongtrinhkm')
    .post(giamGiaCtrl.xoachuongtrinhkm)
  app.route('/deactivechuongtrinhkm')
    .post(giamGiaCtrl.deactivechuongtrinhkm)
  ////
  // đăng nhập, cập nhật thông tin nhân viên
  const taiKhoanCtrl = require('./controllers/TaiKhoanController');
  app.route('/dangNhap')
    .post(taiKhoanCtrl.dangNhap)
  app.route('/dangNhap2')
    .post(taiKhoanCtrl.dangNhap2)
  app.route('/updateinfo')
    .post(taiKhoanCtrl.updateInfo)
  app.route('/layTenNhanVienChoInDonHang/:maNV')
    .get(taiKhoanCtrl.layTenNhanVienChoInDonHang)
  app.route('/getversion')
    .post(taiKhoanCtrl.getVersion)
  // gợi ý tìm kiếm getSuggestCtrl
  const getSuggestCtrl = require('./controllers/GetSuggestController');
  app.route('/getsuggest')
    .post(getsg, getSuggestCtrl.getSuggest)
  app.route('/getsuggestfront')
    .post(getsg, getSuggestCtrl.getSuggestFront)
  app.route('/getsuggest2')
    .post(getsg, getSuggestCtrl.getSuggest2)
  app.route('/getsuggest3')
    .post(getsg, getSuggestCtrl.getSuggest3)
  app.route('/getsuggest4')
    .post(getsg, getSuggestCtrl.getSuggest4)
  app.route('/getSuggest3CongNo')
    .post(getSuggestCtrl.getSuggest3CongNo)
  app.route('/getsuggest3')
    .post(getsg, getSuggestCtrl.getSuggest3)
  app.route('/getsuggestoff')
    .post(getSuggestCtrl.getSuggestoff)
  app.route('/getsuggestoff2')
    .post(getSuggestCtrl.getSuggestoff2)
  app.route('/getsuggestoff3')
    .post(getSuggestCtrl.getSuggestoff3)
  app.route('/getsuggestadtname')
    .post(getsg, getSuggestCtrl.getSuggestadtname)
  app.route('/getsuggestadthc')
    .post(getsg, getSuggestCtrl.getSuggestadthc)
  app.route('/getsuggestadtmh')
    .post(getsg, getSuggestCtrl.getSuggestadtmh)
  app.route('/getsuggestkm')
    .post(getsg, getSuggestCtrl.getSuggestKM)
  app.route('/getSuggestDHN')
    .post(getsg, getSuggestCtrl.getSuggestDHN)
  app.route('/getsuggestuser')
    .post(getsg, getSuggestCtrl.getSuggestUS)
  // gợi ý sdt nhà cung cấp
  app.route('/getSuggestSDTNCC')
    .post(getsg, getSuggestCtrl.getSuggestSDTNCC)
  // func tìm kiếm cho thống kê
  const searchBackAllCtrl = require('./controllers/SearchBackAllController');
  app.route('/searchbackall')
    .post(searchBackAllCtrl.searchBackAll)
  app.route('/searchbackall2')
    .post(searchBackAllCtrl.searchBackAll2)
  app.route('/searchbackall3')
    .post(searchBackAllCtrl.searchBackAll3)
  app.route('/searchfront')
    .post(getsearch, searchBackAllCtrl.searchFront)
  app.route('/searchfrontapp')
    .post(getsearchapp, searchBackAllCtrl.searchFrontapp)
  app.route('/searchFrontSuaDonHang')
    .post(searchBackAllCtrl.searchFrontSuaDonHang)
  app.route('/searchquantri')
    .post(searchBackAllCtrl.searchQuanTri)
  app.route('/searchquantricn')
    .post(searchBackAllCtrl.searchQuanTriCN)
  app.route('/searchquantricnncc')
    .post(searchBackAllCtrl.searchQuanTriCNNCC)
  app.route('/searchfilter')
    .post(searchBackAllCtrl.searchFilter)
  app.route('/searchfiltercn')
    .post(searchBackAllCtrl.searchFilterCN)
  app.route('/searchfiltercnncc')
    .post(searchBackAllCtrl.searchFilterCNNCC)
  app.route('/filterHetHang')
    .post(searchBackAllCtrl.filterHetHang)
  app.route('/searchfiltersl')
    .post(searchBackAllCtrl.searchFilterSl)
  app.route('/searchkhuyenmai')
    .post(getsearch, searchBackAllCtrl.searchKhuyenMai)
  app.route('/searchkhuyenmaiapp')
    .post(getsearchapp, searchBackAllCtrl.searchKhuyenMaiapp)
  app.route('/slidekhuyenmai')
    .post(getsg, searchBackAllCtrl.slideKhuyenMai)
  app.route('/slidebanchay')
    .post(getsg, searchBackAllCtrl.slideBanChay)
  app.route('/slideflashsale')
    .post(getsg, searchBackAllCtrl.slideFlashSale)
  app.route('/searchtags')
    .post(getsearchtags, searchBackAllCtrl.searchTags)
  app.route('/searchtagsapp')
    .post(getsearchtagsapp, searchBackAllCtrl.searchTagsapp)

  // select đủ thứ
  app.route('/selectall')
    .post(searchBackAllCtrl.selectAll)
  app.route('/selectcol')
    .post(searchBackAllCtrl.selectCol)
  app.route('/selectallsp')
    .post(searchBackAllCtrl.selectAllSP)
  app.route('/selectallsp2')
    .post(searchBackAllCtrl.selectAllSP2)
  //công nợ
  app.route('/CongNoKH')
    .post(CongNoController.CongNoKH)
  app.route('/CongNoNCC')
    .post(CongNoController.CongNoNCC)
  // thu chi
  app.route('/GetTC')
    .post(CongNoController.GetTC)
  app.route('/AddTC')
    .post(CongNoController.AddTC)
  app.route('/FixTC')
    .post(CongNoController.FixTC)
  app.route('/DelTC')
    .post(CongNoController.DelTC)
  //nhà cung cấp
  app.route('/DanhSachNCC')
    .post(NhaCungCapController.DanhSachNCC)
  app.route('/SuaDanhSachNCC')
    .post(NhaCungCapController.SuaDanhSachNCC)
  app.route('/XoaDanhSachNCC')
    .post(NhaCungCapController.XoaDanhSachNCC)
  app.route('/thongTinNCC/:SDT')
    .get(NhaCungCapController.thongTinNCC)

  // redis giỏ hàng
  const gioHangCtrl = require('./controllers/GioHangController')
  app.route('/gioHang/:maNV')
    .post(gioHangCtrl.setGioHang)
    .get(gioHangCtrl.getGioHang)

  // khai báo ctrl của đơn hàng và api trỏ đến mấy cái liên quan đến đơn hàng
  const donHangCtrl = require('./controllers/DonHangController')
  app.route('/donHang')
    .post(donHangCtrl.themDonHang)
    .get(donHangCtrl.danhSachDonHang)
  app.route('/danhSachDonHangNhap')
    .post(donHangCtrl.danhSachDonHangNhap)
  app.route('/chiTiet1DonHangNhap')
    .post(donHangCtrl.chiTiet1DonHangNhap)
  app.route('/donHang/:MaDatHang')
    .get(donHangCtrl.chiTiet1DonHang)
    .put(donHangCtrl.sua1DonHang)
    .delete(donHangCtrl.xoa1DonHang)
  app.route('/xoa1DonHangNhap')
    .post(donHangCtrl.xoa1DonHangNhap)
  app.route('/suaDonHang1Row/:MaDatHang')
    .put(donHangCtrl.suaDonHang1Row)
  app.route('/suaDonHangNhap1Row/:MaDHN')
    .put(donHangCtrl.suaDonHangNhap1Row)
  app.route('/suaDonHangNhap1Row2/:MaDHN')
    .put(donHangCtrl.suaDonHangNhap1Row2)
  app.route('/checkTrangThaiDonHang/:MaDatHang')
    .get(donHangCtrl.checkTrangThaiDonHang)
  // app.route('/donHangKhachHuy/:MaDatHang')
  // .put(donHangCtrl.donHangKhachHuy)
  app.route('/layTongDH/:MaKhachHang/:sotrang')
    .get(donHangCtrl.layTongDH)
  app.route('/donHangTheoMaNV/:MaKhachHang')
    .get(donHangCtrl.danhSachDonHangTheoMaNV)
  app.route('/danhSachDonHangTheoTrangThai/:MaKhachHang/:TrangThai')
    .get(donHangCtrl.danhSachDonHangTheoTrangThai)
  app.route('/danhSachDonHangTheoTrangThai2/:MaKhachHang/:TrangThai/:sotrang')
    .get(donHangCtrl.danhSachDonHangTheoTrangThai2)
  app.route('/donHangYears')
    .post(donHangCtrl.donHangYears)
  app.route('/donHangMonths')
    .post(donHangCtrl.donHangMonths)
  app.route('/donHangManv')
    .post(donHangCtrl.danhSachDonHangManv)
  app.route('/SuadonHangMaKhach')
    .post(donHangCtrl.SuaDonHangTheoMaKhachHang)
  app.route('/donHangXuLyTheoNhanVien')
    .post(donHangCtrl.donHangXuLyTheoNhanVien)
  app.route('/hoanThanhDonHangTuFontEnd')
    .get(donHangCtrl.hoanThanhDonHangTuFontEnd)
  app.route('/layDSMaDatHangDaXuLy')
    .get(donHangCtrl.layDSMaDatHangDaXuLy)
  app.route('/danhSachDonHangCongNo')
    .post(donHangCtrl.danhSachDonHangCongNo)
  app.route('/danhSachDonHangCongNoNCC')
    .post(donHangCtrl.danhSachDonHangCongNoNCC)
  app.route('/getArrOrderCodeProcessed')
    .get(donHangCtrl.getArrOrderCodeProcessed)

  // ctrl chi tiết đơn hàng
  const chiTietDonHangCtrl = require('./controllers/ChiTietDonHangController')
  app.route('/chiTietDonHang')
    .post(chiTietDonHangCtrl.themCTDH)
    .get(chiTietDonHangCtrl.danhSachTatCaChiTietDonHang)
  app.route('/chiTietDonHang/:MaDatHang')
    .get(chiTietDonHangCtrl.danhSachChiTietDonHangCua1DonHang)
  app.route('/SuaNhieuSanPhamCua1DonHang/:MaDatHang')
    .post(chiTietDonHangCtrl.suaNhieuSanPhamCua1DonHang)
  app.route('/tongSoLuong1SanPhamDaDat/:MaHang')
    .get(chiTietDonHangCtrl.tongSoLuong1SanPhamDaDat)
  app.route('/capNhatSoLuongKhachDatTuFrontEnd')
    .get(chiTietDonHangCtrl.capNhatSoLuongKhachDatTuFrontEnd)
  app.route('/layMaHangVaSoLuongTrongCTDH')
    .post(chiTietDonHangCtrl.layMaHangVaSoLuongTrongCTDH)
  // app.route('/layMaHangDistinctTrongCTDH')
  //   .post(chiTietDonHangCtrl.layMaHangDistinctTrongCTDH)
  app.route('/getIdComboAndQuantityFromArrProductCode')
    .post(chiTietDonHangCtrl.getIdComboAndQuantityFromArrProductCode)
  app.route('/getIdComboDistinctFromArrProductCode')
    .post(chiTietDonHangCtrl.getIdComboDistinctFromArrProductCode)
  app.route('/getAllProductCodeAndQuantityOfOrderDetail')
    .post(chiTietDonHangCtrl.getAllProductCodeAndQuantityOfOrderDetail)


  // link về lô hàng (ít quan trọng hơn chi tiết lô hàng).
  // chỗ này chủ yếu lấy thông tin về ds và thêm lô hàng.
  // thằng này quan trọng hơn, chi tiết lô hàng.
  // xổ ra chi tiết 1 lô hoặc sửa, xóa lô hàng.
  // khai báo mấy thằng ctrl liên quan đến sản phẩm
  // vả link set tồn kho 1 sản phẩm.
  const loHangCtrl = require('./controllers/LoHangController')
  app.route('/loHang')
    .get(loHangCtrl.danhSachLoHang)
    .post(loHangCtrl.themLoHang);
  app.route('/chiTiet1LoHang/:MaLH')
    .get(loHangCtrl.chiTiet1LoHang)
    .put(loHangCtrl.sua1LoHang)
    .delete(loHangCtrl.xoa1LoHang);
  app.route('/setTongTonKho1SanPham/:MaHang')
    .put(loHangCtrl.setTongTonKho1SanPhamTheoMaHang)


  // chi tiết lô hàng, gồm lấy toàn bộ ds lô hàng có những thằng sp nào.
  // thêm chi tiết lô hàng bằng tay trên web.
  const chiTietLoHangCtrl = require('./controllers/ChiTietLoHangController')
  app.route('/themChiTietLoHanHangCanDate')
    .post(chiTietLoHangCtrl.themChiTietLoHanHangCanDate)
  app.route('/capNhatChiTietLoHangTuFileExcel')
    .post(chiTietLoHangCtrl.capNhatChiTietLoHangTuFileExcel)
  app.route('/danhSachThayDoiSanPhamTrongLoHang')
    .post(upload2.single('CapNhatLoHang'), chiTietLoHangCtrl.danhSachThayDoiSanPhamTrongLoHang)
  app.route('/nhapChiTietLoHangTuFileExcel')
    .post(upload.single('LoHang'), chiTietLoHangCtrl.nhapChiTietLoHangTuFileExcel)
  app.route('/danhSachTatCaChiTietLoHang')
    .post(chiTietLoHangCtrl.themChiTietLoHang)
    .get(chiTietLoHangCtrl.danhSachTatCaChiTietLoHang)
  app.route('/dSSP1LoHangTheoMaLoHang/:MaLH')
    .get(chiTietLoHangCtrl.dSSP1LoHangTheoMaLoHang)
  app.route('/dS1SPTrongTatCaLoHang/:MaHang')
    .get(chiTietLoHangCtrl.dS1SPTrongTatCaLoHang)
    .delete(chiTietLoHangCtrl.xoaHet1SPTrongNhieuLoHang);
  app.route('/chiTiet1SPTheoMaSanPhamVaMaLoHang/:IdSTT')
    .get(chiTietLoHangCtrl.chiTiet1SPTheoMaSanPhamVaMaLoHang)
    .put(chiTietLoHangCtrl.sua1SPTheoMaSanPhamVaMaLoHang)
    .delete(chiTietLoHangCtrl.xoa1SPTheoMaSanPhamVaMaLoHang)
  app.route('/hangCanDate/')
    .get(chiTietLoHangCtrl.hangCanDate)
  app.route('/tongTonKho/')
    .get(chiTietLoHangCtrl.tongTonKho)
  app.route('/tongTonKho1SanPham/:MaHang')
    .get(chiTietLoHangCtrl.tongTonKho1SanPham)
  app.route('/truSoLuongSanPhamTheoHanSD/:MaHang')
    .put(chiTietLoHangCtrl.truSoLuongSanPhamTheoHanSD)
  app.route('/capNhatSoLuongTonKhoTuFrontEnd')
    .get(chiTietLoHangCtrl.capNhatSoLuongTonKhoTuFrontEnd)
  app.route('/getAllQuantityProductOnStock')
    .get(chiTietLoHangCtrl.getAllQuantityProductOnStock)
  app.route('/guiDSMaHangVaSoLuongDistinct')
    .post(chiTietLoHangCtrl.guiDSMaHangVaSoLuongDistinct)

  // manage combo
  const comboCtrl = require('./controllers/ComboController')
  app.route('/getIdComboDesc')
    .get(comboCtrl.getIdComboDesc)
  app.route('/combo')
    .post(comboCtrl.addItemCombo)
    .get(comboCtrl.getListCombo)
  app.route('/getLoyaltyPointForOrders')
    .post(comboCtrl.getLoyaltyPointForOrders)

  //namdeptrai
  app.route('/comboOrderId')
    .get(comboCtrl.getListComboOrderId)
  app.route('/comboOrderIdLimit/:data')
    .get(comboCtrl.getListComboOrderIdLimit)
  app.route('/comboById/:IdCombo')
    .get(comboCtrl.getComboById)

  // manage combo
  app.route('/combo/:idCombo')
    .put(comboCtrl.updateItemCombo)
    .delete(comboCtrl.deleteItemCombo)
  app.route('/uploadImageOne/:idCombo')
    .post(uploadImageOne.single('imageOne'), comboCtrl.uploadImageOne)
  app.route('/uploadImageTwo/:idCombo')
    .post(uploadImageTwo.single('imageTwo'), comboCtrl.uploadImageTwo)
  app.route('/uploadImageThree/:idCombo')
    .post(uploadImageThree.single('imageThree'), comboCtrl.uploadImageThree)

  // manage combodetail
  const comboDetailCtrl = require('./controllers/ComboDetailController')
  app.route('/comboDetailWithIdCombo/:idCombo')
    .get(comboDetailCtrl.getListComboDetailWithIdCombo)
  app.route('/addComboDetail')
    .post(comboDetailCtrl.addItemComboDetail)
  app.route('/comboDetail/:idCombo')
    .put(comboDetailCtrl.updateItemComboDetail)
    .delete(comboDetailCtrl.deleteItemComboDetail)
  app.route('/getProductsInListIdCombo')
    .post(comboDetailCtrl.getProductsInListIdCombo)
  app.route('/getProductsInListIdComboForBtnCompleteOrders')
    .post(comboDetailCtrl.getProductsInListIdComboForBtnCompleteOrders)

  //thống kê sale combo
  const comboStatistic = require('./controllers/ComboStatisticController')
  app.route('/comboStatistic/')
    .get(comboStatistic.getComboStatistic)
    .post(comboStatistic.addComboStatistic)
  app.route('/comboStatisticDelete/')
    .post(comboStatistic.deleteComboStatistic)

  //Bài viết
  const articleCtrl = require('./controllers/ArticleController')
  app.route('/article/')
    .get(articleCtrl.getArticle)
    .post(articleCtrl.addArticle)
    app.route('/updateArticle/')
    .post(articleCtrl.updateArticle)
    app.route('/deleteArticle/')
    .post(articleCtrl.deleteArticle)
    app.route('/getArticleWithId/')
    .post(articleCtrl.getArticleWithId)
    
};


