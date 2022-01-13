import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { API_URL } from '../src/constants/constants'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import { useRouter } from 'next/router'
import Select from 'react-select';
import options from '../src/components/options';
import Modal from 'react-modal';
import close_modal from '../public/images/close-modal.png';
import repeatblack from '../public/images/repeatblack.png'
import gift from '../public/images/gift_newuser.gif'
import Clock from '../src/components/Clock'

// let maNV = "null"

const OrderConfirmation = () => {
    const [tenKH, setTenKH] = useState('')
    const [sDT, setSDT] = useState('')
    const [diaChi, setDiaChi] = useState('');
    const [PhuongXa, setPhuongXa] = useState();
    const [Tinh, setTinh] = useState({ value: 'null', label: 'Chọn khu vực' });
    const [maKhachDat, setMaKhachDat] = useState('')
    const [modalIsOpen, setIsOpen] = useState(false);
    const [dataVoucher, setDataVoucher] = useState([]);
    const [dataGift, setDataGift] = useState([]);
    const [dataOrderValue, setDataOrderValue] = useState([]);
    const [valueLastGift, setValueLastGift] = useState();
    const [idVoucher, setIdVoucher] = useState();
    const [tenQuaTang, setTenQuaTang] = useState('*Không có quà tặng*');
    const toggleModal = async () => {
        setIsOpen(!modalIsOpen);

    };

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const [diemthuong, setDiemThuong] = useState([])
    const [tiendiemthuong, setTienDiemThuong] = useState(0)
    const [tienDiemThuongHienThi, setTienDiemThuongHienThi] = useState(0)

    const [loyaltyPoint, setLoyaltyPoint] = useState(0)
    const [loyaltyPointTemp, setLoyaltyPointTemp] = useState(0)
    const [diemdb, setDiemdb] = useState(0)
    const [diemdbHienThi, setDiemdbHienThi] = useState(0)
    const [selectedbtn, setSelectedbtn] = useState()

    let tenDN = "null"
    const ngayTao = '31/07/2021 19:19'
   // const [ghiChu, setGhiChu] = useState(localStorage.getItem('ghiChu'))
    const [email, setEmail] = useState('')
    const [gioHangRoot, setGioHangRoot] = useState([])
    // const [soLuongTrongGio, setSoLuongTrongGio] = useState(0)
    const [strTogTien, setStrTogTien] = useState()
    const [tongTienDH, setTongTienDH] = useState()

    const tongTienDonHang = (listGH) => {
        let tTien = 0
        listGH.forEach(e => {
            tTien += (e.SoLuong * (e.GiaBan - (e.GiaBan * e.PhanTramKM / 100)))
            // tTien += e.SoLuong * e.GiaBan
        });
        setTongTienDH(tTien)
        const vND = tTien.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
        setStrTogTien(vND)
    }

    const layThongTinGiaoHang = (maNV) => {
        fetch(API_URL + '/thongtintaikhoan', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                test: localStorage.getItem('accesstoken'),
                keychinh: maNV,
            })
        })
            .then((response) => response.json())
            .then(data => {
                if (data[0] !== undefined) {
                    setTenKH(data[0].TenNV);
                    setSDT(data[0].SDT);
                    setDiaChi(data[0].DiaChi);
                    setMaKhachDat(data[0].MaNV)
                    if (data[0].PhuongXa != 'undefined') {
                        setPhuongXa(data[0].PhuongXa);
                    }
                    setTinh({ value: data[0].KhuVuc, label: data[0].KhuVuc });
                    setLoyaltyPoint(data[0].DiemThuong)
                    setLoyaltyPointTemp(data[0].DiemThuong)
                }
            })
    }

    const setGioHangRedis = async (listGH) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                gioHang: listGH
            })
        }
        await fetch(API_URL + "/gioHang/" + maNV, requestOptions)
            .then(response => response.json())
          
    }

    const [anNutDatHang, setAnNutDatHang] = useState(true)
    const [openDangKD, setOpenDangKD] = useState(false)
    const [openConLai, setOpenConLai] = useState(false)

    const onCloseDangKD = () => setOpenDangKD(!openDangKD)
    const onCloseConLai = () => setOpenConLai(!openConLai)

    const kiemTraSanPhamCoTheDatHang = async (listGH) => {
        let kTraDangKD = 0
        let kTraConLai = 0
        if (listGH.length > 0) {
            console.log(`${new Date().getTime()} listGH=`, listGH)
            const listCombo = listGH.filter(o => o.MaHang.indexOf('COMBO_') >= 0)

            const dsMaHangTrongGio = listGH.map(o => o.MaHang)
            const dsSanPhamTrongGio = await fetch(`${API_URL}/kiemTraSanPhamTrongGio/`, {
                method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
                    lsMaHang: dsMaHangTrongGio
                })
            }).then(res => res.json())
            let lsGHMoi = []
            listGH.forEach(oo1 => {
                dsSanPhamTrongGio.forEach(oo2 => {
                    if (oo1.MaHang === oo2.MaHang) {
                        oo1.TenHang = oo2.TenHang
                        oo1.GiaBan = oo2.GiaBan
                        oo1.TonKho = oo2.TonKho
                        oo1.DaDat = oo2.DaDat
                        oo1.ConLai = oo2.ConLai
                        oo1.DangKD = oo2.DangKD
                        oo1.PhanTramKM = oo2.PhanTramKM
                        if (oo1.DangKD === 0) {
                            kTraDangKD = 1
                        }
                        if (oo1.SoLuong > oo1.ConLai) {
                            oo1.SoLuong = oo1.ConLai
                            kTraConLai = 1
                        }
                        if (oo1.DangKD === 1 && oo1.SoLuong > 0) {
                            lsGHMoi.push(oo1)
                        }
                    }
                });
            });
            if (kTraDangKD === 1) {
                // alert("Một số sản phẩm hiện KHÔNG KINH DOANH nên bị xóa khỏi giỏ hàng")
                setOpenDangKD(!openDangKD)
            }
            if (kTraConLai === 1) {
                // alert("Có một số sản phẩm ĐÃ HẾT HÀNG nên số lượng bị giảm/bị xóa khỏi giỏ hàng")
                setOpenConLai(!openConLai)
            }

            listCombo.forEach(ee1 => {
                lsGHMoi.push(ee1)
            });
            tongTienDonHang(lsGHMoi)
            setGioHangRoot(lsGHMoi)
            setGioHangRedis(lsGHMoi)
            setAnNutDatHang(false)
        }
    }

    const getGioHangRedis = async (MaNV) => {
        await fetch(API_URL + "/gioHang/" + MaNV)
            .then(response => response.json())
            .then(data => {
                const dsGH = data
                const abc = dsGH.gioHang
                if (dsGH != null) {
                    kiemTraSanPhamCoTheDatHang(abc)
                } else {
                    const tmp = {
                        gioHang: []
                    }
                    setGioHangRedis(tmp.gioHang)
                }
            })
    }

    const layTenDoanhNghiep = async () => {
        await fetch(API_URL + '/doanhnghiep', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                key: localStorage.getItem('accesstoken'),
            })
        })
            .then((response) => response.json())
            .then(data => {
                if (data[0] !== undefined) {
                    if (data[0].TenDN != '') {
                        tenDN = data[0].TenDN
                    }
                }
            })
    }

    const router = useRouter()

    const layMagg = async (maNV) => {
        ///lấy mã giảm giá
        await fetch(API_URL + '/magiamgia', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                doiTuong: maNV
            })
        })
            .then((response) => response.json())
            .then(data => {
                setDataVoucher(data);
            })
        ///lấy mã giảm giá
    }
    const layListQuaTang = async () => {
        ///lấy mã giảm giá
        await fetch(API_URL + '/doiqua', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

            })
        })
            .then((response) => response.json())
            .then(data => {
                setDataGift(data);
            })
        ///lấy mã giảm giá
    }
    const QuaTangTheoGiaTien = async () => {
        await fetch(API_URL + '/layctkm', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

            })
        })
            .then((response) => response.json())
            .then(data => {
                if (data.length > 0) {
                    setDataOrderValue(data);
                    setValueLastGift(data[data.length - 1].DieuKien)
                }
            })
    }
    const layMaNV = async () => {
        if (localStorage.getItem("accesstoken") !== null) {
            await fetch(API_URL + '/thongtintaikhoan', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    test: localStorage.getItem("accesstoken")
                })
            })
                .then((response) => response.json())
                .then(data => {
                    if (data !== "token not accepted") {
                        // maNV = data[0].MaNV
                        setmaNV(data[0].MaNV)
                        setTimeout(() => {
                            setmaNV(data[0].MaNV)
                            layThongTinGiaoHang(maNV)
                            layTenDoanhNghiep()
                            getGioHangRedis(data[0].MaNV)
                            layMagg(maNV);
                            layListQuaTang();
                        }, 10);
                    } else {
                        router.push("/")
                    }
                })
        } else {
            router.push("/")
        }
    }

    const xoaMggUsed = async () => {
        await fetch(API_URL + '/xoaMggUsed', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                maNV: maNV
            })
        })
            .then((response) => response.json())
           
    }

    const layDiemThuong = async () => {
        await fetch(API_URL + '/doidiem', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            })
        })
            .then((response) => response.json())
            .then(data => {
                setDiemThuong(data)
            })
    }

    const tiendiemThuong = async (item) => {
        if (loyaltyPointTemp < item.Diem) {
            alert(`Không đủ điểm`)
        } else {
            setLoyaltyPointTemp(loyaltyPointTemp - item.Diem)
            setTienDiemThuong(tiendiemthuong + item.Gia)
            setTienDiemThuongHienThi(tiendiemthuong + item.Gia)
            setDiemdb(diemdb + item.Diem)
            setDiemdbHienThi(diemdb + item.Diem)
        }
    }

    useEffect(async () => {
        layMaNV()
        layDiemThuong()
        QuaTangTheoGiaTien()
    }, [])

    const TruDiemThuong = async () => {
        if (tienDiemThuongHienThi > 0 && maNV != null && maNV != undefined && maNV != `null`) {
            const abc = parseFloat(-diemdbHienThi)
            await fetch(API_URL + '/loyaltypoint', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',

                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    point: abc,
                    makh: maNV
                })
            })
        }
    }

    const chiTietDonHang = async (idmdh, dsgh) => {
        let dsctdh = []
        if (idmdh[0].MaDatHang !== null && idmdh[0].MaDatHang !== undefined && idmdh[0].MaDatHang !== "null") {
            dsgh.forEach(e => {
                let item = {}
                item.MaDatHang = idmdh[0].MaDatHang
                item.MaHang = e.MaHang
                item.SoLuong = e.SoLuong
                dsctdh.push(item)
            });
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ctdh: dsctdh
                })
            }
            await fetch(API_URL + "/chiTietDonHang", requestOptions)
                .then(response => response.json())
                .then(async () => {
                    // cập nhật địa chỉ mới của khách hàng
                    const requestOptions2 = {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            DiaChi: diaChi,
                            PhuongXa: PhuongXa,
                            KhuVuc: Tinh.value
                        })
                    }
                    await fetch(API_URL + "/CapNhatDiaChiDatHang/" + maNV, requestOptions2)
                        .then(response => response.json())
                        .then(() => {
                            const nameKey = 'kh' + maNV
                            if (nameKey !== 'khnull' && nameKey !== 'khundefined') {
                                localStorage.removeItem(nameKey)
                                localStorage.removeItem("ghiChu")
                            }
                            const tmp = {
                                gioHang: []
                            }
                            setGioHangRedis(tmp.gioHang)
                            setTenKH('')
                            setSDT('')
                            setDiaChi('')
                            setEmail('')
                            setGioHangRoot([])
                            setStrTogTien('')
                            TruDiemThuong()
                            setOpenDatHang(true)
                            setAnNutDatHang(false)
                        })
                    //
                })
        } else {
            alert("Lỗi tạo đơn hàng, vui lòng đặt hàng vào lúc khác.")
        }
    }
    const tiepTucThanhToan = async () => {
        if (gioHangRoot.length != 0) {
            if (tenKH != '' && sDT != '') {
                // let vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
                // let vnf_regex2 = /((02|02)+([0-9]{9})\b)/g;
                let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (sDT.length == 10 || sDT.length == 11) {
                    if (diaChi != undefined && diaChi != '' && diaChi != 'null') {
                        if (PhuongXa != undefined && PhuongXa != '' && PhuongXa != 'null') {
                            if (Tinh.value != undefined && Tinh.value != '' && Tinh.value != 'null') {
                                if (email.length == 0 || regEmail.test(email)) {
                                    // nếu dùng mã thì nhảy vào cái này
                                    if (idVoucher != undefined) {
                                        await fetch(API_URL + '/magiamgia', {
                                            method: 'POST',
                                            headers: {
                                                Accept: 'application/json',
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({
                                                doiTuong: maNV
                                            })
                                        })
                                            .then((response) => response.json())
                                            .then(async (data) => {
                                                if (data.length > 0) {
                                                    if (tenDN == null || tenDN == "null" || tenDN == undefined || tenDN.length == 0) {
                                                        tenDN = ""
                                                    }
                                                    const requestOptions = {
                                                        method: 'POST',
                                                        headers: { 'Content-Type': 'application/json' },
                                                        body: JSON.stringify({
                                                            ThoiGian: ngayTao,
                                                            KhachHang: tenKH,
                                                            KhachCanTra: (tongTienDH - tienDiemThuongHienThi - tienMaGiamGia),
                                                            // KhachCanTra: tongTienDH,
                                                            KhachDaTra: 0,
                                                            TrangThai: "Đã xác nhận",
                                                            GhiChu: ``,
                                                            MaKhachHang: maKhachDat,
                                                            SoDienThoai: sDT,
                                                            DiaChi: diaChi + ', ' + PhuongXa + ', ' + Tinh.value,
                                                            Email: email,
                                                            TenDN: tenDN,
                                                            MaNguoiBan: 'web',
                                                            MaNgXuLy: '',
                                                            DoiDiem: diemdbHienThi,
                                                            TienMaGiamGia: tienMaGiamGia,
                                                            TienDoiDiem: tienDiemThuongHienThi,
                                                            QuaTang: tenQuaTang,
                                                            CongNo: (tongTienDH - tienDiemThuongHienThi - tienMaGiamGia)
                                                        })
                                                    }
                                                    await fetch(API_URL + "/donHang", requestOptions)
                                                        .then(response => response.json())
                                                        .then(data => {
                                                            chiTietDonHang(data, gioHangRoot);
                                                            xoaMggUsed();
                                                        })
                                                }
                                                else {
                                                    alert('Đã có lỗi xảy ra . Vui lòng kiểm tra lại !');
                                                    window.location.replace('/GioHang');
                                                }
                                            })
                                    }
                                    // nếu không dùng mã thì nhảy vào cái này
                                    else {
                                        if (tenDN == null || tenDN == "null" || tenDN == undefined || tenDN.length == 0) {
                                            tenDN = ""
                                        }
                                        const requestOptions = {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({
                                                ThoiGian: ngayTao,
                                                KhachHang: tenKH,
                                                KhachCanTra: (tongTienDH - tienDiemThuongHienThi - tienMaGiamGia),
                                                // KhachCanTra: tongTienDH,
                                                KhachDaTra: 0,
                                                TrangThai: "Đã xác nhận",
                                                GhiChu: ``,
                                                MaKhachHang: maKhachDat,
                                                SoDienThoai: sDT,
                                                DiaChi: diaChi + ', ' + PhuongXa + ', ' + Tinh.value,
                                                Email: email,
                                                TenDN: tenDN,
                                                MaNguoiBan: 'web',
                                                MaNgXuLy: '',
                                                DoiDiem: diemdbHienThi,
                                                TienMaGiamGia: tienMaGiamGia,
                                                TienDoiDiem: tienDiemThuongHienThi,
                                                QuaTang: tenQuaTang,
                                                CongNo: (tongTienDH - tienDiemThuongHienThi - tienMaGiamGia)
                                            })
                                        }
                                        await fetch(API_URL + "/donHang", requestOptions)
                                            .then(response => response.json())
                                            .then(data => {
                                                chiTietDonHang(data, gioHangRoot)
                                            })
                                    }

                                } else {
                                    alert("Email chưa hợp lệ.")
                                    setAnNutDatHang(false)
                                }
                            }
                            else {
                                alert("Tỉnh / Thành phố chưa điền.")
                                setAnNutDatHang(false)
                            }
                        }
                        else {
                            alert("Phường / xã / huyện chưa điền.")
                            setAnNutDatHang(false)
                        }
                    }
                    else {
                        alert("Địa chỉ giao hàng chưa điền.")
                        setAnNutDatHang(false)
                    }
                } else {
                    alert("Số điện thoại không hợp lệ. Vui lòng kiểm tra lại (chỉ được nhập một số điện thoại giao nhận).")
                    setAnNutDatHang(false)
                }
            } else {
                alert("Chưa nhập đầy đủ thông tin giao hàng.")
                setAnNutDatHang(false)
            }
        } else {
            alert("Chưa có sản phẩm trong giỏ.")
            setAnNutDatHang(false)
        }
    }

    const thanhToan = () => {
        if (maNV != null && maNV != undefined) {
            tiepTucThanhToan()
        } else {
            alert("Lỗi rồi! Vui lòng tải lại website để tiếp tục đặt hàng .")
            setAnNutDatHang(false)
        }
    }

    // console.log(new Date().getTime() + " refresh= " + JSON.stringify(refresh))

    const [opendathang, setOpenDatHang] = useState(false);
    const ClickDatHang = () => {
        kiemTraDiemThuong()
    };

    const kiemTraDiemThuong = async () => {
        if (tienDiemThuongHienThi > 0) {
            const requestOptions = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    test: localStorage.getItem('accesstoken'),
                    keychinh: maNV,
                })
            }
            const res = await fetch(`${API_URL}/thongtintaikhoan`, requestOptions).then(res => res.json())
            if (res[0].DiemThuong * 500 < tienDiemThuongHienThi) {
                setLoyaltyPoint(res[0].DiemThuong)
                setLoyaltyPointTemp(res[0].DiemThuong)
                setTienDiemThuongHienThi(0)
                setDiemdbHienThi(0)
                alert(`Không đủ điểm, vui lòng chọn lại điểm.`)
            } else {
                setAnNutDatHang(true)
                thanhToan()
            }
        } else {
            setAnNutDatHang(true)
            thanhToan()
        }
    }

    const Clicktat = () => {
        setOpenDatHang(false);
    }
    const ClickCo = () => {
        setOpenDatHang(false);
        window.location.replace("http://thuocsionline.vn/")
    }
    const testKey = (e) => {
        if (e.code == "Enter") {
            ClickCo()
        }
    }
    const testKey2 = (e) => {
        if (e.code == "Enter") {
            setOpenDangKD(!openDangKD)
            setOpenConLai(!openConLai)
        }
    }
    const [opendoidiem, setOpenDoiDiem] = useState(false);
    const ClickDoiDiem = () => {
        setOpenDoiDiem(true)
    }
    const ClickDong = () => {
        HuyOK()
        setOpenDoiDiem(false)
    }
    const HuyOK = () => {
        setLoyaltyPointTemp(loyaltyPoint)
        setDiemdb(0)
        setTienDiemThuong(0)
        setOpenDoiDiem(false)
        setDiemdbHienThi(0)
        setTienDiemThuongHienThi(0)
    }

    const NutOK = () => {
        setDiemdb(0)
        setTienDiemThuong(0)
        setLoyaltyPointTemp(loyaltyPoint)
        setOpenDoiDiem(false)
    }

    const [tienMaGiamGia, setTienMaGiamGia] = useState(0)

    const tongTienCuoi = () => {
        if ((tongTienDH - tienDiemThuongHienThi - tienMaGiamGia) > 0) {
            return (tongTienDH - tienDiemThuongHienThi - tienMaGiamGia).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
        }
        return `0 VND`
    }

    const [maNV, setmaNV] = useState(null)

    const MaNVvalue = (value) => {
        setmaNV(value)
        setTimeout(() => {
            setmaNV(value)
            // getGioHangRedis(value)
        }, 10);
    }


    return (
        <div>
            <Header MaNVvalue={MaNVvalue} />
            <div className='phan-giua'>
                {/* <div className='phankhongco-dnhap-dki'>
                    <div className='phan-dki'>
                        <div>Bạn đã có tài khoản ? </div>
                        <Link to='/' className='click btn_nhanqua'>&nbsp;Ấn vào đây để đăng nhập</Link>
                    </div>
                    <div className='phan-dki'>
                        <div>Bạn đã có quà tặng ? </div>
                        <button onClick={() => { toggleModal() }} to='/' className='click btn_nhanqua'>&nbsp;Ấn vào đây để nhận quà</button>
                    </div>
                </div> */}
                <div className='chia-nua'>
                    <div className='nua-trai'>
                        <h3>Thông tin thanh toán</h3>
                        <div className='aa'>
                            <div className='phanchia'>
                                <label for="billing_first_name" className="">Họ và tên&nbsp;
                                    <abbr className="required" title="bắt buộc">*</abbr>
                                </label>
                                <input placeholder="Họ và tên ( bắt buộc )" type="text" className="input-text " value={tenKH} onChange={text => { setTenKH(text.target.value) }} />
                            </div>
                            <div className='phanchia'>
                                <label for="billing_first_name" className="">Số điện thoại&nbsp;
                                    <abbr className="required" title="bắt buộc">*</abbr>
                                </label>
                                <input placeholder="Số điện thoại ( bắt buộc )" type="text" className="input-text " value={sDT} onChange={text => { setSDT(text.target.value) }} />
                            </div>
                        </div>
                        <div className='phanchia2'>
                            <label for="billing_first_name" className="">Địa chỉ&nbsp;
                                <abbr className="required" title="bắt buộc">*</abbr>
                            </label>
                            <input placeholder="Địa chỉ giao hàng ( bắt buộc )" type="text" className="input-text " value={diaChi} onChange={text => { setDiaChi(text.target.value) }} />
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div className='phanchia2'>
                                <label for="billing_first_name" className="">Phường/ Xã/ Huyện&nbsp;
                                    <abbr className="required" title="bắt buộc">*</abbr>
                                </label>
                                <input placeholder='Phường / Xã / Huyện ( bắt buộc )' value={PhuongXa} onChange={text => { setPhuongXa(text.target.value) }} className='input-text'></input>
                            </div>
                            <div className='phanchia2'>
                                <label for="billing_first_name" className="">Tỉnh / Thành phố&nbsp;
                                    <abbr className="required" title="bắt buộc">*</abbr>
                                </label>
                                <Select
                                    className="input1 input-text-select"
                                    value={Tinh}
                                    onChange={(text) => { setTinh(text) }}
                                    options={options}
                                    placeholder="Chọn khu vực"
                                    maxMenuHeight={250}
                                />
                            </div>
                        </div>
                        <div className='phanchia2'>
                            <label for="billing_first_name">Địa chỉ email (tùy chọn) &nbsp;</label>
                            <input placeholder="Địa chỉ email ( không bắt buộc )" type="text" className="input-text " value={email} onChange={text => { setEmail(text.target.value) }} />
                        </div>
                        {/* {tongTienDH > 2000000 ? */}
                        <div>
                            {dataOrderValue.length > 0 ?
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <h4>Quà tặng theo giá trị đơn hàng</h4>
                                    </div>
                                    {valueLastGift < tongTienDH ?
                                        <div style={{ fontSize: 12 }}>CHÚC MỪNG BẠN ĐÃ NHẬN ĐƯỢC PHẦN QUÀ CỦA MÌNH . BẠN HÃY CHỌN <b style={{ color: 'red', fontSize: 14 }}>1</b> MÓN QUÀ YÊU THÍCH CỦA MÌNH .</div>
                                        :
                                        <div style={{ fontSize: 12 }}>ĐƠN HÀNG CỦA BẠN CHƯA ĐỦ ĐIỀU KIỆN NHẬN QUÀ . BẠN HÃY ĐẶT THÊM ĐỂ NHẬN ĐƯỢC QUÀ NHÉ !</div>

                                    }
                                </div>
                                : null
                            }
                            <div style={{ marginRight: 20 }}>
                                <div className="div_scroll_voucher_par">
                                    <div className="div_scroll_voucher" style={{ overflowY: 'auto', overflowX: 'hidden' }}>
                                        {dataOrderValue.map((item, index) => {
                                            let deadline = item.ThoiHan;
                                            var DieuKien = (item.DieuKien).toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
                                            if (item.LoaiKM == 'Tiền') {
                                                var MoneyConvert = Intl.NumberFormat().format(item.TenQua)
                                            }
                                            if (item.DieuKien < tongTienDH) {
                                                return (
                                                    item.Status == 1 ?
                                                        <button className={`btn ${selectedbtn === index ? 'item_time_gift_ttdh_2 item_gift_ttdh_mobile_2' : 'item_time_gift_ttdh item_gift_ttdh_mobile'}`} onClick={() => {
                                                            setSelectedbtn(index)
                                                            if (item.LoaiKM == 'Tiền') {
                                                                setTienMaGiamGia(parseInt(item.TenQua))
                                                                setTenQuaTang('*Không có quà tặng*');
                                                            }
                                                            else {
                                                                setTenQuaTang(item.TenQua);
                                                                if (tienMaGiamGia != undefined) {
                                                                    setTongTienDH(parseInt(tongTienDH));
                                                                    setTienMaGiamGia(0);
                                                                }
                                                            }
                                                            setIdVoucher(undefined)
                                                        }}>
                                                            {/* Điều kiện loại khuyến mãi (tiền hoặc quà) */}
                                                            {/* {item.LoaiKM == 'Tiền' ?
                                                            <p style={{ width: '80%', fontWeight: 'bold' }} className="item_name_gift_ttdh">Giảm <b style={{ color: 'red', fontWeight: 'bolder', textShadow: '0px 1px 1px gray' }}>{MoneyConvert}</b> cho đơn hàng <b style={{ color: 'yellow', fontWeight: 'bolder', fontSize: 18, textShadow: '0px 1px 1px black' }}>{DieuKien}</b></p>
                                                            :
                                                            <p style={{ width: '80%', fontWeight: 'bold' }} className="item_name_gift_ttdh">Tặng <b style={{ color: 'red', fontWeight: 'bolder', textShadow: '0px 1px 1px gray' }}>{(item.TenQua).toUpperCase()}</b> cho đơn hàng <b style={{ color: 'yellow', fontWeight: 'bolder', fontSize: 18, textShadow: '0px 1px 1px black' }}>{DieuKien}</b></p>
                                                        } */}
                                                            <img src={item.LinkVoucher} width='250' height="350" ></img>

                                                            <p className="item_name_gift_ttdh item_clock_gift_ttdh  item_name_gift_ttdh_mb">
                                                                <p className="title_clock_ttdh">Thời hạn còn</p>
                                                                <Clock className="time_count_gift" deadline={deadline} />
                                                            </p>
                                                        </button>
                                                        : null
                                                );
                                            }
                                        })}


                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* : null
                        } */}
                    </div>
                    <div className='nua-phai'>
                        <div className='donthanhtoan'>
                            <div className='don'>
                                <h3 id="order_review_heading">Đơn hàng của bạn</h3>
                                {/* <h4>Tổng điểm của bạn là: {loyaltyPoint}</h4> */}
                                <div className='order_review'>
                                    <div className='sanpham'><h3>Sản phẩm</h3></div>
                                    <div className='tam-tinh3'><h3>SL</h3></div>
                                    <div className='tam-tinh'><h3>Đ.giá</h3></div>
                                    <div className='tam-tinh'><h3>Tạm tính</h3></div>
                                </div>
                                {
                                    gioHangRoot.map((item, i) => {
                                        var vND = (item.GiaBan - (item.GiaBan * item.PhanTramKM / 100)).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                                        var tongTien = (item.GiaBan - (item.GiaBan * item.PhanTramKM / 100)) * item.SoLuong
                                        var vNDTT = tongTien.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                                        return (
                                            <div className='order_review1'>
                                                <p className='sanpham'> {item.TenHang} </p>
                                                <div className='tam-tinh3'><h3>{item.SoLuong}</h3></div>
                                                <div className='tam-tinh'><h3>{vND}</h3></div>
                                                <div className='tam-tinh'><h3> {vNDTT} </h3></div>
                                            </div>
                                        )
                                    })
                                }
                                <div className='order_review1'>
                                    <p className='sanpham'>Tổng</p>
                                    <div className='tam-tinh4'><h3> {strTogTien} </h3></div>
                                </div>
                                <div className='order_review1'>
                                    <p className='sanpham'>Đổi điểm</p>
                                    <div className='tam-tinh4'><h3> {tienDiemThuongHienThi.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} </h3></div>
                                </div>
                                {tienMaGiamGia != 0 ?
                                    <div className='order_review1'>
                                        <p className='sanpham'>Giảm giá</p>
                                        <div className='tam-tinh4'><h3> {tienMaGiamGia.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}  </h3></div>
                                        {/* <div className='tam-tinh4'><h3> {Intl.NumberFormat().format(tienQuaTang)} </h3></div> */}
                                    </div>
                                    : null
                                }

                                <div className='order_review1'>
                                    <p className='sanpham'>Quà Tặng</p>
                                    <div className='tam-tinh4'><h3> {tenQuaTang} </h3></div>
                                </div>
                                <div className='order_review1'>
                                    <p className='sanpham'>Tổng cuối</p>
                                    <div className='tam-tinh4'><h3> {tongTienCuoi()} </h3></div>
                                </div>

                            </div>
                            {/* <div className='tratien'>
                                <p>Trả tiền sau khi nhận hàng</p>
                            </div>

                            <div>Trả tiền sau giao hàng</div> */}
                            {dataGift.length > 0 ?
                                <div>
                                    {dataVoucher.length > 0 ? <div>Bạn đang có Quà Khuyến Mãi cho người mới.</div> : null}
                                </div>
                                : null
                            }
                            <div className="MuiGrid-root style_wrapper__1uBx84 style_promo_border__32Gw7 MuiGrid-container MuiGrid-item1 MuiGrid-grid-xs-12">
                                <div className="style_promo_left__2hC1b">
                                    {dataGift.length > 0 ?
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                            <svg className="MuiSvgIcon-root style_icon_promo__3G0b9" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                                <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"></path>
                                            </svg>
                                            <p onClick={toggleModal} className="dtl_button">Quà tặng của tôi !</p>
                                        </div>
                                        : null
                                    }
                                    <Modal
                                        isOpen={modalIsOpen}
                                        onRequestClose={toggleModal}
                                        style={customStyles}
                                        contentLabel="Khuyên mãi"
                                    >
                                        <div className="style_confirm_modal_wrap__1sw7S" tabindex="-1">
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <h4>Quà tặng của bạn</h4>
                                                <button onClick={toggleModal} className="closeModal">
                                                    <img width="24" src={close_modal}></img>
                                                </button>
                                            </div>
                                            <div>Hãy chọn 1 món quà mà bạn mong muốn.</div>
                                            {dataVoucher.length > 0 ?
                                                <div className="div_scroll_voucher" style={{ height: (window.innerHeight / 2), overflowY: 'auto', overflowX: 'hidden' }}>
                                                    {dataGift.map((x, i) => {
                                                        return (
                                                            <button className="item_gift_ttdh" onClick={() => {
                                                                setTenQuaTang(x.TenQuaTang);
                                                                setIdVoucher(x.Id);
                                                                setIsOpen(false)
                                                            }}>
                                                                <div className="item_gif_gift_ttdh">
                                                                    <img src={gift} width='50%' height="50%" />
                                                                </div>
                                                                <p className="item_name_gift_ttdh">{x.TenQuaTang}</p>
                                                            </button>

                                                            // var tienGiam = (x.tienGiam).toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
                                                            // var date = new Date();
                                                            // date.setDate(date.getDate() + 7);
                                                            // var dd = date.getDate();
                                                            // var mm = date.getMonth() + 1;
                                                            // var yyyy = date.getFullYear();
                                                            // var dateString = dd + '/' + mm + '/' + yyyy;

                                                            // var dateItem = new Date(x.ngayHetHan);
                                                            // var ddItem = dateItem.getDate();
                                                            // var mmItem = dateItem.getMonth() + 1;
                                                            // var yyyyItem = dateItem.getFullYear();
                                                            // var dateStringItem = ddItem + '/' + mmItem + '/' + yyyyItem;

                                                            // <button className='tag-khuyenmai' onClick={() => {
                                                            //     // setTienMaGiamGia(x.tienGiam);
                                                            //     // toggleModal();
                                                            //     // setIdVoucher(x.idVoucher);
                                                            // }}>

                                                            //     {/* <div className='hdkhuyenmai'>
                                                            //         <img className='imgkmm' src={dungkhuyenmai} width='90%' height='90%'></img>
                                                            //     </div> */}
                                                            //     {/* <div className='tongnd'>
                                                            //         <div className='center'>
                                                            //             <div className='ndkhuyenmai'>
                                                            //                 <b className='chu_tieudekm'>Giảm {tienGiam}</b>
                                                            //                 {(dd - ddItem) < 8 && (dd - ddItem) > 0 && (mm - mmItem) == 0 && (yyyy - yyyyItem) == 0 ?
                                                            //                     <div className="saphethan_title" style={{ marginLeft: 5, marginTop: 2, color: 'red' }}>* Sắp hết hạn</div>
                                                            //                     : null
                                                            //                 }
                                                            //             </div>
                                                            //             <div className='ndkhuyenmai'>
                                                            //                 <p className='chu_HSD'>Hạn sử dụng: {dateStringItem}</p>
                                                            //             </div>
                                                            //         </div>

                                                            //     </div> */}
                                                            // </button>
                                                        );
                                                    })}

                                                </div>
                                                :
                                                <div className="style_counpon_list_wapper__W6Ycp">
                                                    <div className="style_counpon_list__3bwbe">
                                                        <div style={{ textAlign: 'center' }} className="style_not_yet__20xBz">Bạn không có quà tặng,<br /> hãy đặt hàng tại thuocsionline.vn để có cơ hội nhận quà nhé .</div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </Modal>
                                </div>
                            </div>
                            <div style={{ width: '100%' }}>
                                <div className='dtl_textTTDH' style={{ color: 'black' }}>Tổng điểm của bạn là&nbsp;
                                    <span style={{ fontWeight: 'bold' }}>{loyaltyPoint}</span>&nbsp;điểm tích lũy. &nbsp;
                                </div>
                                <div className="MuiGrid-root style_wrapper__1uBx84 style_promo_border__32Gw7 MuiGrid-container MuiGrid-item1 MuiGrid-grid-xs-12" >
                                    <div className="style_promo_left__2hC1b">
                                        <svg className="MuiSvgIcon-root style_icon_promo__3G0b9" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"></path>
                                        </svg>
                                        <p className='dtl_button' onClick={() => { ClickDoiDiem() }}>Đổi Điểm Thưởng</p>
                                    </div>
                                </div>
                                <div>
                                    <Dialog
                                        open={opendoidiem}
                                        onClose={ClickDong}
                                    >
                                        <DialogTitle>
                                            <div style={{ width: '100%' }}>
                                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', color: '#00b46e' }}>Đổi Điểm Thưởng</div>
                                                <div style={{ marginBottom: '5px', textAlign: 'center' }}>Điểm tích lũy hiện tại của bạn là <span style={{ fontWeight: 'bold' }}>{loyaltyPoint}</span></div>
                                                <div className='abcttdh'>
                                                    {
                                                        diemthuong.map((item, i) => {
                                                            const giaTienMocDiem = item.Gia.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                                                            return (
                                                                <div className='dtl_khungdialogdtl'>
                                                                    <button className='dtl_adtl' onClick={() => tiendiemThuong(item)} >
                                                                        <div className='khunglogdtl'>
                                                                            <div className='diem'>{item.Diem} điểm</div>
                                                                            <div className='icon'><img width="12" color='black' src={repeatblack}></img></div>
                                                                            <div className='gia'>{giaTienMocDiem}</div>
                                                                        </div>
                                                                    </button>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                <div style={{ marginTop: '10px', }}>Tổng tiền: {tiendiemthuong.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</div>
                                                <div style={{ marginTop: '10px', }}>Tổng điểm: {diemdb}</div>
                                            </div>
                                        </DialogTitle>
                                        <DialogActions>
                                            <Button onClick={HuyOK} className='dtl_Cancel'>Hủy</Button>
                                            <Button onClick={NutOK} className='dtl_Yes'>Đổi Điểm</Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
                            </div>

                            <div className='btn-dathang'>

                                {
                                    anNutDatHang ?
                                        null
                                        :
                                        <button onClick={() => { ClickDatHang() }} type="button" className="dathang" value="Đặt hàng">ĐẶT HÀNG</button>
                                }

                                {/* Dialog đặt hàng thành công */}

                                <Dialog
                                    open={opendathang}
                                    onClose={Clicktat}
                                    onKeyPress={(e) => testKey(e)}
                                >
                                    <DialogTitle>
                                        <div style={{ textAlign: 'center' }}>
                                            <div className='GH_DialogTitleDatHang'>
                                                <p style={{ alignItems: 'center', fontSize: '3.75em', margin: '0' }}>✓</p>
                                            </div>
                                            <p className='GH_XinXacNhan'>Đặt hàng thành công</p>
                                        </div>
                                    </DialogTitle>
                                    <DialogActions>
                                        <Button onClick={ClickCo} autoFocus>OK</Button>
                                    </DialogActions>
                                </Dialog>

                                {/* Dialog sản phẩm hiện KHÔNG KINH DOANH  */}

                                <Dialog
                                    open={openDangKD}
                                    onClose={onCloseDangKD}
                                    onKeyPress={(e) => testKey2(e)}
                                >
                                    <DialogTitle>
                                        <div style={{ textAlign: 'center' }}>
                                            <div className='cssDialogDangKDvsConLai01'>
                                                <p style={{ alignItems: 'center', fontSize: '2.75em', margin: '0' }}>✘</p>
                                            </div>
                                            <p className='cssDialogDangKDvsConLai02'>Một số sản phẩm hiện KHÔNG KINH DOANH nên bị xóa khỏi giỏ hàng</p>
                                        </div>
                                    </DialogTitle>
                                    <DialogActions>
                                        <Button onClick={onCloseDangKD} autoFocus>OK</Button>
                                    </DialogActions>
                                </Dialog>

                                {/* Dialog sản phẩm ĐÃ HẾT HÀNG */}

                                <Dialog
                                    open={openConLai}
                                    onClose={onCloseConLai}
                                    onKeyPress={(e) => testKey2(e)}
                                >
                                    <DialogTitle>
                                        <div style={{ textAlign: 'center' }}>
                                            <div className='cssDialogDangKDvsConLai01'>
                                                <p style={{ alignItems: 'center', fontSize: '2.75em', margin: '0' }}>✘</p>
                                            </div>
                                            <p className='cssDialogDangKDvsConLai02'>Có một số sản phẩm ĐÃ HẾT HÀNG nên số lượng bị giảm/bị xóa khỏi giỏ hàng</p>
                                        </div>
                                    </DialogTitle>
                                    <DialogActions>
                                        <Button onClick={onCloseConLai} autoFocus>OK</Button>
                                    </DialogActions>
                                </Dialog>

                            </div>
                            <div>
                                <p>Thông tin cá nhân của bạn sẽ được sử dụng để xử lý đơn hàng, tăng trải nghiệm sử dụng website, và cho các mục đích cụ thể khác đã được mô tả trong chính sách riêng tư.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div >
    );
};

export default OrderConfirmation;
