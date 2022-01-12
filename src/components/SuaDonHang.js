import { DvrTwoTone } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
// import Checkbox from '@material-ui/core/Checkbox';
import '../css/themsp.css'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import '../css/dathangnhanh.css'
import image_default from '../images/image-default.jpg'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Pagination from './Pagination';
import search_img from '../images/search.png'
import { ExportReactCSV } from './ExportReactCSV'
import { API_URL } from '../constants/constants'
import { Link, NavLink } from 'react-router-dom';
import { string } from 'prop-types';
import Clock from './Clock'
// document.addEventListener('contextmenu', event => event.preventDefault());
// document.onkeydown = function (e) {
//   if(e.code == "Enter"){
//       alert("ENTER")
//   }
// }

export default ({ rowfromtable, parentCallback, tenNV }) => {

    const [chiTietDonHang, setChiTietDonHang] = useState([]);
    const [manbsg, setManbsg] = useState([]);
    const [tenKH, setTenKH] = useState('')
    const [sDT, setSDT] = useState('')
    const [maNguoiBan, setMaNguoiBan] = useState('')
    const [diaChi, setDiaChi] = useState('')
    const [ghiChu, setGhiChu] = useState('')
    const [ghiChuVanChuyen, setGhiChuVanChuyen] = useState('')
    const [email, setEmail] = useState('')
    const [khachDaTra, setKhachDaTra] = useState(0)
    const [tongSLSPCTDH, setTongSLSPCTDH] = useState(0)
    const [tongTienDonHang, setTongTienDonHang] = useState(0)
    const [strTTCTDH, setStrTTCTDH] = useState('0 VND')
    const [input, setInput] = useState([]);//mang gợi ý của search
    const [input2, setInput2] = useState([]);//mang gợi ý của search
    const [input3, setInput3] = useState([]);//mang gợi ý của search
    const [value, setValue] = useState(null);//giá trị của search box
    const [data, setData] = useState([]);//mang san pham
    const [datasize, setDataSize] = useState([]);//mang san pham
    const [note_tieude, setNoteTieuDe] = useState("Tất Cả Sản Phẩm");
    const [checkdonhang, setCheckdonhang] = useState(0)
    const [checkbutton, setCheckbutton] = useState(true)
    const [checkluu, setCheckluu] = useState(true)
    const [tenNXL, setTenNXL] = useState('')
    const [owner, setOwner] = useState(false)
    const [datakm, setDatakm] = useState([])
    const [tienmagiamgia, setTienmagiamgia] = useState(rowfromtable.TienMaGiamGia)
    const [quatang, setQuatang] = useState(rowfromtable.QuaTang)
    const [selectedbtn, setSelectedbtn] = useState()
    const [checktrangthaikm, setChecktrangthaikm] = useState(0)
    //

    //let date = "C " + newDate.getDate() + "/" + (newDate.getMonth() + 1) + "/" + newDate.getFullYear();
    const capNhatSLVaTTCTDH = (list) => {
        let tSL = 0
        let tongTien = 0
        list.forEach(e => {
            tSL += e.SoLuong
            tongTien += (e.SoLuong * (e.DonGia - (e.DonGia * e.ChietKhau / 100)))
        })
        setTongSLSPCTDH(tSL)
        setTongTienDonHang(parseFloat(tongTien))
        const strtt = tongTien.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
        setStrTTCTDH(strtt)
    }
    const handleImgError = e => {
        e.target.src = image_default;
    };
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
                //  console.log(data)
                setDatakm(data)
                if (data.length > 0) {
                    var result = data.reduce(function (res, obj) {
                        return (obj.DieuKien < res.DieuKien) ? obj : res;
                    });
                    setChecktrangthaikm(result.DieuKien)
                }
            })
    }

    useEffect(async () => {
        fetch(API_URL + '/getsuggestfront', {
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
                // console.log(data)
                setInput(data)
            })

        fetch(API_URL + '/getsuggestoff2', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
            .then((response) => response.json())
            .then(data => {
                // console.log(data)
                setManbsg(data)
            })
        QuaTangTheoGiaTien()
    }, []);

    useEffect(() => {
        if (tongTienDonHang < checktrangthaikm) {
            setTienmagiamgia(0)
            setQuatang("*Không có quà tặng*")
            setSelectedbtn("")
        }
    }, [tongTienDonHang]);

    const [anXacNhanDonKhiLoadDH, setAnXacNhanDonKhiLoadDH] = useState(true)
    const [boolChuaLuuDonHang, setBoolChuaLuuDonHang] = useState(false)
    const [arrCombo, setArrCombo] = useState([]) // arr combo from Detail Order

    const khoiPhucCTDH = async (list, test) => {
        let listGH = list
        if (test == 0) {
            // let kTraDangKD = 0
            // let kTraConLai = 0
            const dsMaHangTrongGio = listGH.map(o => o.MaHang)
            const dsSanPhamTrongGio = await fetch(`${API_URL}/kiemTraSanPhamTrongGio/`, {
                method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
                    lsMaHang: dsMaHangTrongGio
                })
            }).then(res => res.json())
            // console.log(new Date().getTime() + " dsSanPhamTrongGio= ", dsSanPhamTrongGio)
            listGH.forEach(oo1 => {
                dsSanPhamTrongGio.forEach(oo2 => {
                    if (oo1.MaHang === oo2.MaHang) {
                        oo1.TenHang = oo2.TenHang
                        oo1.TonKho = oo2.TonKho
                        oo1.DaDat = oo2.DaDat
                        oo1.ConLai = oo2.ConLai
                    }
                });
            });
            let magSP = []
            listGH.forEach(ee2 => {
                magSP.push({
                    ...ee2,
                    ...{ GiaGoc: ee2.DonGia }
                })
            });
            listGH = magSP
            setTimeout(() => {

                localStorage.setItem("restore", JSON.stringify(listGH))
                const tmp = JSON.parse(localStorage.getItem("tmpCT" + rowfromtable.MaDatHang))
                let arrCombo = [] // arr combo tách ra từ CTDH
                if (tmp != null && tmp != undefined) {
                    if (tmp.MaDatHang === rowfromtable.MaDatHang) {
                        setCheckluu(false)
                        setBoolChuaLuuDonHang(true)
                        let tmpCTDH = tmp.CTDH
                        listGH.forEach(ee2 => {
                            tmpCTDH.forEach(ee1 => {
                                if (ee1.MaHang === ee2.MaHang) {
                                    if (ee2.ConLai > 0) {
                                        ee1.ConLai = ee2.ConLai
                                    } else {
                                        ee1.ConLai = 0
                                    }

                                }
                            });
                        });
                        tmpCTDH.forEach(ee2 => {
                            if (ee2.MaHang.indexOf('COMBO_') >= 0) {
                                ee2.TonKho = 1000
                                ee2.DaDat = 0
                                ee2.ConLai = 1000
                                arrCombo.push(ee2)
                            }
                        });
                        setChiTietDonHang(tmpCTDH)
                        capNhatSLVaTTCTDH(tmpCTDH)
                        setArrCombo(arrCombo)
                        setAnXacNhanDonKhiLoadDH(false)
                    }
                } else {
                    listGH.forEach(ee2 => {
                        if (ee2.MaHang.indexOf('COMBO_') >= 0) {
                            ee2.TonKho = 1000
                            ee2.DaDat = 0
                            ee2.ConLai = 1000
                            arrCombo.push(ee2)
                        }
                    });
                    setChiTietDonHang(listGH)
                    capNhatSLVaTTCTDH(listGH)
                    setArrCombo(arrCombo)
                    setAnXacNhanDonKhiLoadDH(false)
                }
            }, 200);
        }
        // else {
        //     const tmp = JSON.parse(localStorage.getItem("tmpCT" + rowfromtable.MaDatHang))
        //     if (tmp != null && tmp != undefined) {
        //         if (tmp.MaDatHang === rowfromtable.MaDatHang) {
        //             let tmpCTDH = tmp.CTDH
        //             listGH.forEach(ee2 => {
        //                 tmpCTDH.forEach(ee1 => {
        //                     if (ee1.MaHang === ee2.MaHang) {
        //                         if (ee2.ConLai > 0) {
        //                             ee1.ConLai = ee2.ConLai
        //                         } else {
        //                             ee1.ConLai = 0
        //                         }
        //                     }
        //                 });
        //             });
        //             setChiTietDonHang(tmpCTDH)
        //             capNhatSLVaTTCTDH(tmpCTDH)
        //             setAnXacNhanDonKhiLoadDH(false)
        //         }
        //     } else {
        //         setChiTietDonHang(listGH)
        //         capNhatSLVaTTCTDH(listGH)
        //         setAnXacNhanDonKhiLoadDH(false)
        //     }
        // }
    }

    const [hienNutIn, setHienNutIn] = useState(false)
    const [hienNutSuaDonHang, setHienNutSuaDonHang] = useState(true)
    const [hienNutKhoiPhucDon, setHienNutKhoiPhucDon] = useState(false)
    const [tatSuaChiTietDonHang, setTatSuaChiTietDonHang] = useState(false)

    useEffect(async () => {
        await fetch(API_URL + '/chiTietDonHang/' + rowfromtable.MaDatHang, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then(data => {
                if (rowfromtable.TrangThai === "Đã xử lý" || rowfromtable.TrangThai === "Đã hủy" || rowfromtable.TrangThai === "Khách hủy" || rowfromtable.TrangThai === "Hoàn thành") {
                    setHienNutSuaDonHang(false)
                    setTatSuaChiTietDonHang(true)
                    if (rowfromtable.TrangThai === "Đã xử lý") {
                        setHienNutIn(true)
                    }
                    if (rowfromtable.TrangThai === "Đã hủy" || rowfromtable.TrangThai === "Khách hủy") {
                        setHienNutKhoiPhucDon(true)
                    }
                }
                khoiPhucCTDH(data, 0)
            })
        // lấy thông tin đơn hàng
        await fetch(API_URL + '/donHang/' + rowfromtable.MaDatHang)
            .then((response) => response.json())
            .then(datas => {
                setTenKH(datas.KhachHang)
                setSDT(datas.SoDienThoai)
                setDiaChi(datas.DiaChi)
                setGhiChu(datas.GhiChu)
                setEmail(datas.Email)
                setKhachDaTra(datas.KhachDaTra)
                setMaNguoiBan(datas.MaNguoiBan)
            });;
    }, [rowfromtable]);

    const capNhatSoLuongSanPham = async (list, test) => {
        let tmp2 = []
        let tmp = JSON.parse(localStorage.getItem("list"))
        if (tmp != null) {
            tmp2 = tmp.gioHang
        } else {
            let tmp = {
                gioHang: []
            }
            localStorage.setItem("list", JSON.stringify(tmp))
        }
        list.forEach(e => {
            if (tmp2.length != 0) {
                tmp2.forEach(f => {
                    if (f.MaHang == e.MaHang) {
                        e.SoLuong = f.SoLuong
                    }
                });
            }
        });
        setData(list)
    }

    const [sotrang, setSoTrang] = useState(1);
    const LayGiaTriPagination = (childData) => {
        setSoTrang(childData)
    }

    let offset = (sotrang - 1) * 30;

    useEffect(async () => {
        if (sotrang != null && sotrang > 0) {
            fetch(API_URL + '/searchFrontSuaDonHang', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sotrang: sotrang,
                    sercmdarr: note_tieude,
                })
            })
                .then((response) => response.json())
                .then(datas => {
                    capNhatSoLuongSanPham(datas.mang, 0)
                    setDataSize(Object.values(datas.tong[0]))
                })
        }

    }, [note_tieude])

    useEffect(async () => {
        if (sotrang != null && sotrang > 0) {
            fetch(API_URL + '/searchFrontSuaDonHang', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sotrang: sotrang,
                    sercmdarr: note_tieude,
                })
            })
                .then((response) => response.json())
                .then(datas => {
                    capNhatSoLuongSanPham(datas.mang, 0)
                    setDataSize(Object.values(datas.tong[0]))
                })
        }
    }, [sotrang])


    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const [open5, setOpen5] = useState(false);

    const handleClickOpen = async () => {
        const maDatHang = rowfromtable.MaDatHang
        const res = await fetch(`${API_URL}/checkTrangThaiDonHang/${maDatHang}`).then(res => res.json())
        if (res.TrangThai === `Đã xử lý`) {
            alert(`Đơn hàng đã được xử lý bởi ${res.MaNgXuLy}`)
        } else {
            setOpen(true)
        }
    }

    const kiemTraSoLuongVaConLai = () => {
        if (checkluu == false) {
            alert("Vui lòng lưu sửa đổi trước khi xử lý!")
        } else {
            let test = 0
            let maHangTenHang = ''
            chiTietDonHang.forEach(ee1 => {
                if (ee1.SoLuong > ee1.ConLai) {
                    test = 1
                    maHangTenHang = ee1.MaHang + ' - ' + ee1.TenHang
                }
            });
            if (test == 1) {
                alert("Sản phẩm " + maHangTenHang + " không đủ số lượng để xử lý")
            } else {
                handleClickOpen()
            }
        }

    }

    const handleClickOpen2 = () => {
        setOpen2(true);
    };

    const handleClickOpen5 = () => {
        setOpen5(true);
    };

    const handleClickOpen3 = () => {
        setOpen3(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleClose2 = () => {
        setOpen2(false);
    };

    const handleClose5 = () => {
        setOpen5(false);
    };

    const handleClose3 = () => {
        setOpen3(false);
    };

    const handleClose4 = () => {
        setOpen4(false);
    };

    // const capNhatSoLuongTonKho = async (listCTDH) => {
    //     if (listCTDH.length != 0) {
    //         listCTDH.forEach(async e => {
    //             await fetch(API_URL + "/chiTietSanPham/" + e.MaHang).then(res => res.json()).then(async qwe => {
    //                 if (qwe != null || qwe != undefined) {
    //                     let tonKho = qwe.TonKho
    //                     tonKho -= e.SoLuong
    //                     if (tonKho < 0) {
    //                         tonKho = 0
    //                     }
    //                     const requestOptions1 = {
    //                         method: 'PUT',
    //                         headers: { 'Content-Type': 'application/json' },
    //                         body: JSON.stringify({
    //                             TonKho: tonKho,
    //                         })
    //                     }
    //                     await fetch(API_URL + "/chiTietSanPham/" + e.MaHang, requestOptions1).then(res => res.json()).then(async asd => {
    //                         if (asd != null || asd != undefined) {
    //                             const maHang = asd.MaHang
    //                             if (maHang != null || maHang != undefined) {
    //                                 const requestOptions = {
    //                                     method: 'PUT',
    //                                     headers: {
    //                                         'Content-Type': 'application/json'
    //                                     },
    //                                     body: JSON.stringify({
    //                                         SoLuong: e.SoLuong,
    //                                     })
    //                                 }
    //                                 await fetch(API_URL + "/truSoLuongSanPhamTheoHanSD/" + maHang, requestOptions).then(res => res.json()).then(data => {
    //                                     // console.log(`${new Date().getTime()} SuaDonHang line 475 data=`, data)
    //                                 })
    //                             }
    //                         }
    //                     })
    //                 }
    //             })
    //         });
    //         alert("Vui lòng đợi 2 giây cập nhật đơn và lô hạn")
    //         setTimeout(() => {
    //             alert(`Đã cập nhật`)
    //             parentCallback(123);
    //         }, 2300);
    //     } else {
    //         alert("Ôi lỗi rồi :v")
    //     }
    // }

    // func add loyalty point combo for customer. 1 is add point, 0 is del point
    const addLoyaltyPointComboForCustomer = async (customerCode, arrDetailOrdersOfOrders, check) => {
        let arrOnlyIdComboAndQuantity = []
        arrDetailOrdersOfOrders.forEach(ee1 => {
            if (ee1.MaHang.indexOf('COMBO_') >= 0) {
                let item = {}
                item.IdCombo = ee1.MaHang
                item.SoLuong = ee1.SoLuong
                arrOnlyIdComboAndQuantity.push(item)
            }
        });
        if (arrOnlyIdComboAndQuantity.length > 0) {
            let arrIdCombo = []
            arrOnlyIdComboAndQuantity.forEach(ee1 => {
                arrIdCombo.push(ee1.IdCombo)
            });
            const res1 = await fetch(`${API_URL}/getLoyaltyPointForOrders`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    arrIdCombo: arrIdCombo
                })
            }).then(res => res.json())
            let totalLoyaltyPoint = 0
            arrOnlyIdComboAndQuantity.forEach(ee1 => {
                res1.forEach(ee2 => {
                    if (ee1.IdCombo == ee2.IdCombo) {
                        totalLoyaltyPoint += ee1.SoLuong * ee2.LoyaltyPoint
                    }
                });
            });
            if (check == 0) {
                totalLoyaltyPoint = -totalLoyaltyPoint
            }
            const res2 = await fetch(`${API_URL}/plusBonusPointsCombo/${customerCode}`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    totalLoyaltyPoint: totalLoyaltyPoint
                })
            }).then(res => res.json())
        } else {
            // console.log(`${new Date().getTime()} arrOnlyIdComboAndQuantity=`, arrOnlyIdComboAndQuantity)
        }

    }


    const hoanThanhDon = async () => {
        if (chiTietDonHang.length > 0) {
            alert(`Đang bảo trì x_x`)
            // await fetch(API_URL + '/donHang/' + rowfromtable.MaDatHang, {
            //     method: 'PUT',
            //     headers: {
            //         Accept: 'application/json',
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         TrangThai: "Hoàn thành"
            //     })
            // })
            // await capNhatSoLuongTonKho(chiTietDonHang)
        } else {
            alert(`Không có sản phẩm trong đơn hàng.`)
        }
    }

    // func này là xử lý đơn hàng khi ấn có
    // mỗi lần chạy theo kiểu gộp thành 1 lần gọi api
    const handleClose_Sua = async () => {
        setOpen(false);
        if (chiTietDonHang.length != 0) {
            if (tenKH != '' && sDT != '' && diaChi != '') {
                let vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
                let vnf_regex2 = /((02)+([0-9]{9})\b)/g;
                let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (vnf_regex.test(sDT) || vnf_regex2.test(sDT)) {
                    if (email.length == 0 || regEmail.test(email)) {
                        if (parseFloat(khachDaTra) >= 0 || khachDaTra == 'R') {
                            if (maNguoiBan.length == 0) {
                                setMaNguoiBan('')
                            }
                            let tongTienDonHang = 0
                            const tienDoiDiem = parseFloat(rowfromtable.TienDoiDiem)
                            const tienGiamGia = parseFloat(tienmagiamgia)
                            chiTietDonHang.forEach(e => {
                                tongTienDonHang += (e.SoLuong * (e.DonGia - (e.DonGia * e.ChietKhau / 100)))
                            });
                            ////thêm 2 biến km qua tang
                            let congNo = 0
                            if (khachDaTra != 'R') {
                                congNo = (tongTienDonHang - tienDoiDiem - tienGiamGia) - parseFloat(khachDaTra)
                            }
                            const requestOptions1 = {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    KhachCanTra: (tongTienDonHang - tienDoiDiem - tienGiamGia),
                                    KhachHang: tenKH,
                                    SoDienThoai: sDT,
                                    DiaChi: diaChi,
                                    GhiChu: ghiChu,
                                    Email: email,
                                    TienMaGiamGia: tienmagiamgia,
                                    QuaTang: quatang,
                                    MaNguoiBan: maNguoiBan,
                                    KhachDaTra: khachDaTra,
                                    TrangThai: "Đã xử lý",
                                    MaNgXuLy: tenNV,
                                    NgayXuLy: '',
                                    CongNo: congNo
                                })
                            }
                            let listCTDH = []
                            let stringlog = "";
                            chiTietDonHang.forEach(ee1 => {
                                listCTDH.push({
                                    MaDatHang: ee1.MaDatHang, MaHang: ee1.MaHang, TenHang: ee1.TenHang, DVT: ee1.DVT, SoLuong: ee1.SoLuong, DonGia: ee1.DonGia, ChietKhau: ee1.ChietKhau, ThanhTien: ee1.ThanhTien, NhanhHang: ee1.NhanhHang
                                })
                                //chỗ này nhờ trường thêm cái dg1 vào
                                if (ee1.GiaGoc !== ee1.DonGia) {
                                    stringlog = stringlog + "---/changed mh: " + ee1.MaHang + " - dg1: " + ee1.GiaGoc + " - dg2: " + ee1.DonGia
                                }
                            });

                            // addLoyaltyPointComboForCustomer(rowfromtable.MaKhachHang, listCTDH)

                            await fetch(API_URL + "/donHang/" + rowfromtable.MaDatHang, requestOptions1)
                                .then(res => res.json())
                                .then(async () => {
                                    const requestOptions2 = {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({
                                            ChiTietDonHang: listCTDH
                                        })
                                    }
                                    await fetch(API_URL + "/SuaNhieuSanPhamCua1DonHang/" + rowfromtable.MaDatHang, requestOptions2)
                                        .then(response => response.json())
                                        .then(() => {
                                            // func add loyalty point combo for customer
                                            addLoyaltyPointComboForCustomer(rowfromtable.MaKhachHang, listCTDH, 1)
                                            localStorage.removeItem("tmpCT" + rowfromtable.MaDatHang)
                                            parentCallback(123);
                                        })
                                })
                            const locSoLuong0 = chiTietDonHang.filter(item => item.MaHang.indexOf('COMBO_') >= 0)
                            let data = []
                            locSoLuong0.forEach(ee1 => {
                                const comboStatistic = {
                                    MaDatHang: rowfromtable.MaDatHang,
                                    KhachHang: tenKH,
                                    MaKhachHang: rowfromtable.MaKhachHang,
                                    SoDienThoai: sDT,
                                    NgayDatHang: rowfromtable.NgayDatHang,
                                    NgayXuLy: '',
                                    MaNgXuLy: tenNV,
                                    IdCombo: ee1.MaHang,
                                    ComboName: ee1.TenHang,
                                    TotalPrice: ee1.DonGia,
                                    Quantity: ee1.SoLuong
                                }
                                data.push(comboStatistic)
                            });
                            fetch(API_URL + '/comboStatistic/', {
                                method: 'POST',
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    data: data
                                })
                            }).then(res => res.json)

                            //////////////////////
                            // create log for order
                            if (stringlog.length > 0) {
                                const date = new Date();
                                const ngay7 = date.getDate()
                                const thang7 = date.getMonth() + 1
                                const nam7 = date.getFullYear()
                                const gio7 = date.getHours()
                                const phut7 = date.getMinutes()
                                let logstring = ngay7 + "-" + thang7 + "-" + nam7 + " - " + gio7 + ":" + phut7 + " - Mã đặt hàng: " + rowfromtable.MaDatHang + " - Người xử lý :" + tenNV + " - log: " + stringlog;

                                fetch(API_URL + '/log', {
                                    method: 'POST',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        log: logstring,
                                    })
                                })
                            }
                            /////////////////
                        } else {
                            alert("Tiền khách trả chưa hợp lệ")
                        }
                    } else {
                        alert("Email chưa hợp lệ")
                    }
                } else {
                    alert("Số điện thoại không hợp lệ")
                }
            } else {
                alert("Chưa nhập đầy đủ thông tin giao hàng.")
            }
            //////////////////
            const dth = tongTienDonHang;
            const dthuong = (dth / 50000) / 2;
            if (tongTienDonHang >= 50000) {
                fetch(API_URL + '/loyaltypoint', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        point: parseFloat(dthuong.toFixed(2)),
                        makh: rowfromtable.MaKhachHang
                    })
                })
            }
            //////////////
            parentCallback(123);
        } else {
            alert("Đơn hàng trống! Chưa xử lý được. Hủy đơn hoặc thêm sản phẩm vào đơn.")
        }
    };

    // func khách hủy đơn hàng
    const handleClose_Sua2 = async () => {
        if (chiTietDonHang.length == 0) {
            let tongTienDonHang = 0
            const tienDoiDiem = parseFloat(rowfromtable.TienDoiDiem)
            const tienGiamGia = parseFloat(tienmagiamgia)
            chiTietDonHang.forEach(e => {
                tongTienDonHang += (e.SoLuong * (e.DonGia - (e.DonGia * e.ChietKhau / 100)))
            });
            const requestOptions1 = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    KhachCanTra: (tongTienDonHang - tienDoiDiem - tienGiamGia),
                    TrangThai: "Đã hủy",
                    MaNgXuLy: tenNV,
                    CongNo: 0
                })
            }
            let listCTDH = []
            let stringlog = "";
            chiTietDonHang.forEach(ee1 => {
                listCTDH.push({
                    MaDatHang: ee1.MaDatHang, MaHang: ee1.MaHang, TenHang: ee1.TenHang, DVT: ee1.DVT, SoLuong: ee1.SoLuong, DonGia: ee1.DonGia, ChietKhau: ee1.ChietKhau, ThanhTien: ee1.ThanhTien, NhanhHang: ee1.NhanhHang
                })
                //chỗ này nhờ trường thêm cái dg1 vào
                if (ee1.GiaGoc !== ee1.DonGia) {
                    stringlog = stringlog + "---/changed mh: " + ee1.MaHang + " - dg1: " + ee1.GiaGoc + " - dg2: " + ee1.DonGia
                }
            });
            await fetch(API_URL + "/donHang/" + rowfromtable.MaDatHang, requestOptions1)
                .then(response => response.json())
                .then(async data => {
                    const requestOptions2 = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            ChiTietDonHang: listCTDH
                        })
                    }
                    await fetch(API_URL + "/SuaNhieuSanPhamCua1DonHang/" + rowfromtable.MaDatHang, requestOptions2)
                        .then(response => response.json())
                        .then(data2 => {
                            // alert("Đã cập nhật!")
                            localStorage.removeItem("tmpCT" + rowfromtable.MaDatHang)
                            parentCallback(123);
                        })
                })

            //////////////////////
            if (stringlog.length > 0) {
                const date = new Date();
                const ngay7 = date.getDate()
                const thang7 = date.getMonth() + 1
                const nam7 = date.getFullYear()
                const gio7 = date.getHours()
                const phut7 = date.getMinutes()
                let logstring = ngay7 + "-" + thang7 + "-" + nam7 + " - " + gio7 + ":" + phut7 + " - Mã đặt hàng: " + rowfromtable.MaDatHang + " - Người xử lý :" + tenNV + " - log: " + stringlog;

                fetch(API_URL + '/log', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',

                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        log: logstring,

                    })
                })
            }
            /////////////////
        } else {
            fetch(API_URL + '/donHang/' + rowfromtable.MaDatHang, { // gọi 1 lần
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    TrangThai: "Đã hủy",
                    MaNgXuLy: tenNV,
                    CongNo: 0
                })
            })
        }
        //hàm cộng lại điểm sau khi hủy đơn
        if (rowfromtable.DoiDiem > 0) {
            const abc = parseFloat(rowfromtable.DoiDiem)
            await fetch(API_URL + '/loyaltypoint', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',

                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    point: abc,
                    makh: rowfromtable.MaKhachHang
                })
            })
        }
        //hàm cộng lại điểm sau khi hủy đơn
        parentCallback(123);
        setOpen(false);
    };

    const handleClose_Sua3 = () => {
        setOpen3(false);
        // setChucNang(1)
        let tmp1 = chiTietDonHang // ds ctdh cũ
        let tmp2 = [] // ds ctdh thêm
        let tmp = JSON.parse(localStorage.getItem("list"))
        if (tmp != null) {
            tmp2 = tmp.gioHang
        } else {
            let tmp = {
                gioHang: []
            }
            localStorage.setItem("list", JSON.stringify(tmp))
        }
        tmp2.forEach(ee1 => {
            let tmp3 = {
                MaDatHang: rowfromtable.MaDatHang,
                MaHang: ee1.MaHang,
                TenHang: ee1.TenHang,
                DVT: ee1.DVT,
                SoLuong: ee1.SoLuong,
                DonGia: ee1.GiaBan,
                ChietKhau: ee1.PhanTramKM,
                ThanhTien: (ee1.SoLuong * (ee1.GiaBan - (ee1.GiaBan * ee1.PhanTramKM / 100))),
                TonKho: ee1.TonKho,
                DaDat: ee1.DaDat,
                ConLai: ee1.ConLai,
            }
            let ktra = 0
            tmp1.forEach(ee2 => {
                if (ee2.MaHang == tmp3.MaHang) {
                    // const max = tmp3.ConLai + tmp3.DaDat
                    ee2.SoLuong = ee2.SoLuong + tmp3.SoLuong
                    if (ee2.SoLuong >= tmp3.ConLai) {
                        ee2.SoLuong = tmp3.ConLai
                    }
                    ee2.ThanhTien = (ee2.SoLuong * (ee2.DonGia - (ee2.DonGia * ee2.ChietKhau / 100)))
                    ktra = 1
                }
            });
            if (ktra == 0) {
                tmp1.push(tmp3)
            }
        });
        let magSP = []
        tmp1.forEach(ee2 => {
            magSP.push({
                ...ee2,
                ...{ GiaGoc: ee2.DonGia }
            })
        });
        tmp1 = magSP
        setChiTietDonHang(tmp1) // cập nhật chi tiết đơn hàng khi chọn Có
        capNhatSLVaTTCTDH(tmp1)
        localStorage.removeItem('list') // xóa key tạm lúc thao tác thêm xóa sửa sp trong dialog sản phẩm
        setShowSanPhamChon([]) // clear sản phẩm đã chọn
        // thằng dưới này dùng đê lưu bản thảo sửa đơn hàng mà không bị mất khi reload lại data
        const tmp3 = {
            MaDatHang: rowfromtable.MaDatHang,
            CTDH: tmp1
        }
        localStorage.setItem("tmpCT" + rowfromtable.MaDatHang, JSON.stringify(tmp3))
        // 
        fetch(API_URL + '/searchFrontSuaDonHang', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sotrang: sotrang,
                sercmdarr: "Tất Cả Sản Phẩm",
            })
        })
            .then((response) => response.json())
            .then(datas => {
                capNhatSoLuongSanPham(datas.mang, 0)
                setDataSize(Object.values(datas.tong[0]))
                setValue(null)
                setNoteTieuDe("Tất Cả Sản Phẩm")
                setSoTrang(1)
            })
    };

    const handleClose_Sua4 = async () => {
        let tongTienDonHang = 0
        const tienDoiDiem = rowfromtable.TienDoiDiem
        const tienGiamGia = tienmagiamgia
        chiTietDonHang.forEach(e => {
            tongTienDonHang += (e.SoLuong * (e.DonGia - (e.DonGia * e.ChietKhau / 100)))
        });
        let congNo = 0
        if (khachDaTra != 'R') {
            congNo = (tongTienDonHang - tienDoiDiem - tienGiamGia) - parseFloat(khachDaTra)
        }
        const requestOptions1 = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                KhachCanTra: (tongTienDonHang - tienDoiDiem - tienGiamGia),
                KhachHang: tenKH,
                SoDienThoai: sDT,
                DiaChi: diaChi,
                GhiChu: ghiChu,
                Email: email,
                TienMaGiamGia: tienmagiamgia,
                QuaTang: quatang,
                MaNguoiBan: maNguoiBan,
                KhachDaTra: khachDaTra,
                TrangThai: "Đã xác nhận",
                MaNgXuLy: '',
                CongNo: congNo
            })
        }
        await fetch(API_URL + '/donHang/' + rowfromtable.MaDatHang, requestOptions1)
        //hàm trừ lại điểm khi khôi phục đơn
        if (rowfromtable.DoiDiem > 0) {
            const abc = parseFloat(rowfromtable.DoiDiem)
            await fetch(API_URL + '/loyaltypoint', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    point: -abc,
                    makh: rowfromtable.MaKhachHang
                })
            })
        }
        //hàm trừ lại điểm khi khôi phục đơn
        parentCallback(123);
        setOpen4(false);
    };

    // func khách hủy đơn hàng khi chọn có
    const handleClose_Sua5 = async () => {
        await fetch(API_URL + '/donHang/' + rowfromtable.MaDatHang, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                TrangThai: "Khách hủy",
                MaNgXuLy: tenNV,
                CongNo: 0
            })
        }).then(res => res.json()).then(async res => {
            //fetch to delete combo statistic
            fetch(API_URL + '/comboStatisticDelete/', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: rowfromtable.MaDatHang
                })
            }).then(res => res.json)
            //hàm cộng lại điểm sau khi hủy đơn và trừ lại điểm đã cộng
            const dth = tongTienDonHang;
            const dthuong = (dth / 50000) / 2;
            // console.log(dthuong.toFixed(2))
            if (rowfromtable.DoiDiem > 0) {
                const abc = parseFloat((rowfromtable.DoiDiem)) + parseFloat(-dthuong.toFixed(2))
                await fetch(API_URL + '/loyaltypoint', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',

                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        point: abc,
                        makh: rowfromtable.MaKhachHang
                    })
                }).then(res => res.json()).then(res => {
                    setOpen5(false);
                    parentCallback(123);
                })
            } else {
                //////////////////
                //hàm cộng lại điểm sau khi hủy đơn và trừ lại điểm đã cộng
                await fetch(API_URL + '/loyaltypoint', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        point: parseFloat(-dthuong.toFixed(2)),
                        makh: rowfromtable.MaKhachHang
                    })
                }).then(res => res.json()).then(res => {
                    setOpen5(false);
                    parentCallback(123);
                })
                //////////////
            }
            // 
            addLoyaltyPointComboForCustomer(rowfromtable.MaKhachHang, chiTietDonHang,0)
        })
    };

    const handleClose_KhongSua = () => {
        setOpen(false);
    };
    const handleClose_KhongSua2 = () => {
        setOpen2(false);
    };

    const handleClose_KhongSua5 = () => {
        setOpen5(false);
    };

    const handleClose_KhongSua3 = () => {
        setOpen3(false);
        localStorage.removeItem('list')
        setShowSanPhamChon([]) // clear sản phẩm đã chọn
        fetch(API_URL + '/searchFrontSuaDonHang', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sotrang: sotrang,
                sercmdarr: "Tất Cả Sản Phẩm",
            })
        })
            .then((response) => response.json())
            .then(datas => {
                capNhatSoLuongSanPham(datas.mang, 0)
                setDataSize(Object.values(datas.tong[0]))
                setValue(null)
                setNoteTieuDe("Tất Cả Sản Phẩm")
                setSoTrang(1)
            })
    };

    const handleClose_KhongSua4 = () => {
        setOpen4(false);

    };
    const checkSelectItem = (item) => {
    }
    const [checked, setChecked] = useState(false)
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const suaSoLuong = (khoaChinh, soLuong) => {
        const newList = chiTietDonHang.map((item) => {
            if (item.MaHang === khoaChinh) {
                let sLuong = item.SoLuong
                let max = 100
                max = item.ConLai
                const donGia = item.DonGia
                const chietKhau = item.ChietKhau
                if (sLuong <= max && soLuong > 0 && soLuong.length != 0) {
                    sLuong = soLuong
                    if (soLuong <= max) {
                        const tongTien = (sLuong * (donGia - (donGia * chietKhau / 100)))
                        const updatedItem = {
                            ...item,
                            SoLuong: sLuong,
                            ThanhTien: tongTien,
                        };
                        return updatedItem;
                    } else {
                        const tongTien = (max * (donGia - (donGia * chietKhau / 100)))
                        const updatedItem = {
                            ...item,
                            SoLuong: max,
                            ThanhTien: tongTien,
                        };
                        return updatedItem;
                    }
                } else {
                    const tongTien = (sLuong * (donGia - (donGia * chietKhau / 100)))
                    const updatedItem = {
                        ...item,
                        SoLuong: 1,
                        ThanhTien: tongTien,
                    };
                    return updatedItem;
                }
            }
            return item;
        });
        setChiTietDonHang(newList)
        capNhatSLVaTTCTDH(newList)
        // thằng dưới này dùng đê lưu bản thảo sửa đơn hàng mà không bị mất khi reload lại data
        const tmp3 = {
            MaDatHang: rowfromtable.MaDatHang,
            CTDH: newList
        }
        localStorage.setItem("tmpCT" + rowfromtable.MaDatHang, JSON.stringify(tmp3))
    }

    const xoa1SanPhamCuaChiTietDonHang = (obj) => {
        const newList = chiTietDonHang.filter(item => item.KhoaChinh != obj.KhoaChinh)
        setChiTietDonHang(newList)
        capNhatSLVaTTCTDH(newList)
        // thằng dưới này dùng đê lưu bản thảo sửa đơn hàng mà không bị mất khi reload lại data
        const tmp3 = {
            MaDatHang: rowfromtable.MaDatHang,
            CTDH: newList
        }
        localStorage.setItem("tmpCT" + rowfromtable.MaDatHang, JSON.stringify(tmp3))
    }

    const hoanTacSuaChiTietDonHang = async () => {
        // setChucNang(1)
        if (localStorage.getItem("restore") != undefined || localStorage.getItem("restore") != null) {
            setChiTietDonHang(JSON.parse(localStorage.getItem("restore")))
            capNhatSLVaTTCTDH(JSON.parse(localStorage.getItem("restore")))

            // thằng dưới này dùng đê lưu bản thảo sửa đơn hàng mà không bị mất khi reload lại data
            const tmp3 = {
                MaDatHang: rowfromtable.MaDatHang,
                CTDH: JSON.parse(localStorage.getItem("restore"))
            }
            localStorage.setItem("tmpCT" + rowfromtable.MaDatHang, JSON.stringify(tmp3))
            setTienmagiamgia(rowfromtable.TienMaGiamGia)
            setQuatang(rowfromtable.QuaTang)
            setSelectedbtn("")
        } else {

            await fetch(API_URL + '/chiTietDonHang/' + rowfromtable.MaDatHang, {
                headers: {

                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            })
                .then((response) => response.json())
                .then(data => {
                    setChiTietDonHang(data)
                    capNhatSLVaTTCTDH(data)
                    // thằng dưới này dùng đê lưu bản thảo sửa đơn hàng mà không bị mất khi reload lại data
                    const tmp3 = {
                        MaDatHang: rowfromtable.MaDatHang,
                        CTDH: data
                    }
                    localStorage.setItem("tmpCT" + rowfromtable.MaDatHang, JSON.stringify(tmp3))
                    setTienmagiamgia(rowfromtable.TienMaGiamGia)
                    setQuatang(rowfromtable.QuaTang)
                    setSelectedbtn("")

                })
        }
    }

    const themSanPham = () => {
        handleClickOpen3()
        let tmp = {
            gioHang: []
        }
        localStorage.setItem("list", JSON.stringify(tmp))
        setShowSanPhamChon([])
        //
        fetch(API_URL + '/searchFrontSuaDonHang', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sotrang: sotrang,
                sercmdarr: "Tất Cả Sản Phẩm",
            })
        })
            .then((response) => response.json())
            .then(datas => {
                capNhatSoLuongSanPham(datas.mang, 0)
                setDataSize(Object.values(datas.tong[0]))
                setValue(null)
                setNoteTieuDe("Tất Cả Sản Phẩm")
                setSoTrang(1)
            })
    }

    const suaDonGia = (khoaChinh, donGia) => {
        setCheckluu(false)
        if (donGia > 0) {
            const newList = chiTietDonHang.map((item) => {
                const chietKhau = item.ChietKhau
                const sLuong = item.SoLuong
                if (item.MaHang === khoaChinh) {
                    const tongTien = (sLuong * (donGia - (donGia * chietKhau / 100)))
                    const updatedItem = {
                        ...item,
                        DonGia: donGia,
                        ThanhTien: tongTien,
                    };
                    return updatedItem;
                }
                return item;
            });
            setChiTietDonHang(newList)
            capNhatSLVaTTCTDH(newList)
            // thằng dưới này dùng đê lưu bản thảo sửa đơn hàng mà không bị mất khi reload lại data
            const tmp3 = {
                MaDatHang: rowfromtable.MaDatHang,
                CTDH: newList
            }
            localStorage.setItem("tmpCT" + rowfromtable.MaDatHang, JSON.stringify(tmp3))
        } else {
            alert("Giá đã thấp nhất")
        }
    }

    const [showSanPhamChon, setShowSanPhamChon] = useState([])

    const themSPvaoGH = (item) => {
        let gioHang = []
        let nameKey = 'list'
        if (nameKey !== 'khnull') {
            let tmp = JSON.parse(localStorage.getItem(nameKey))
            if (tmp != null) {
                gioHang = tmp.gioHang
            } else {
                let tmp = {
                    gioHang: []
                }
                localStorage.setItem(nameKey, JSON.stringify(tmp))
            }
        }

        if (gioHang.length != 0) {
            let timKiem = 0
            for (let i = 0; i < gioHang.length; i++) {
                if (gioHang[i].MaHang === item.MaHang) {
                    if (item.SoLuong == 0) {
                        gioHang.splice(i, 1)
                    } else {
                        gioHang[i].SoLuong = item.SoLuong
                    }
                    timKiem = 1
                }
            }
            if (timKiem == 0) {
                gioHang.push(item)
            }
            let tmp = {
                gioHang: gioHang
            }
            localStorage.setItem(nameKey, JSON.stringify(tmp))
            setShowSanPhamChon(gioHang)
        } else {
            gioHang.push(item)
            let tmp = {
                gioHang: gioHang
            }
            localStorage.setItem(nameKey, JSON.stringify(tmp))
            setShowSanPhamChon(gioHang)
        }
    }

    const down = (maHang) => {
        const newList = data.map((item) => {
            if (item.MaHang === maHang) {
                let sLuong = item.SoLuong
                // let max = 100
                // max = item.TonKho
                if (sLuong > 1) {
                    sLuong -= 1
                    const updatedItem = {
                        ...item,
                        SoLuong: sLuong,
                    };
                    themSPvaoGH(updatedItem)
                    return updatedItem;
                } else {
                    const updatedItem = {
                        ...item,
                        SoLuong: 0,
                    };
                    themSPvaoGH(updatedItem)
                    // alert("Số lượng đã thấp nhất")
                    return updatedItem;
                }
            }
            return item;
        });
        capNhatSoLuongSanPham(newList, 1)
    }

    const up = (maHang) => {
        const newList = data.map((item) => {
            if (item.MaHang === maHang) {
                let sLuong = item.SoLuong
                let max = 100
                max = item.ConLai
                if (sLuong < max) {
                    sLuong += 1
                    const updatedItem = {
                        ...item,
                        SoLuong: sLuong,
                    };
                    themSPvaoGH(updatedItem)
                    return updatedItem;
                } else {
                    const updatedItem = {
                        ...item,
                        SoLuong: max,
                    };
                    themSPvaoGH(updatedItem)
                    // alert("Số lượng đã cao nhất")
                    return updatedItem;
                }
            }
            return item;
        });
        capNhatSoLuongSanPham(newList, 1)
    }

    const nhapTaySoLuong = (maHang, val) => {
        const newList = data.map((item) => {
            if (item.MaHang === maHang) {
                let sLuong = item.SoLuong
                let max = 100
                max = item.ConLai
                if (sLuong < max && val > 0 && val.length != 0) {
                    if (val <= max) {
                        sLuong = val
                        const updatedItem = {
                            ...item,
                            SoLuong: sLuong,
                        };
                        themSPvaoGH(updatedItem)
                        return updatedItem;
                    } else {
                        const updatedItem = {
                            ...item,
                            SoLuong: max,
                        };
                        themSPvaoGH(updatedItem)
                        return updatedItem;
                    }
                } else {
                    const updatedItem = {
                        ...item,
                        SoLuong: 0,
                    };
                    themSPvaoGH(updatedItem)
                    return updatedItem;
                }
            }
            return item;
        });
        capNhatSoLuongSanPham(newList, 1)
    }

    //  code lụi mà nó hiểu, vl thật =)) này thì enter thì tự động chọn có hả, chuyện này OK =)))
    const testKey = (e) => {
        if (e.code === "Enter") {
            handleClose_Sua3()
        }
    }

    const tangSoLuong = (khoaChinh) => {
        const newList = chiTietDonHang.map((item) => {
            if (item.MaHang === khoaChinh) {
                let sLuong = item.SoLuong
                let max = 100
                max = item.ConLai
                const donGia = item.DonGia
                const chietKhau = item.ChietKhau
                if (sLuong < max && sLuong >= 1) {
                    sLuong += 1
                    const tongTien = (sLuong * (donGia - (donGia * chietKhau / 100)))
                    const updatedItem = {
                        ...item,
                        SoLuong: sLuong,
                        ThanhTien: tongTien,
                    };
                    return updatedItem;
                } else {
                    if (sLuong >= max) {
                        alert("Số lượng đã cao nhất")
                    } else {
                        alert("Số lượng đã thấp nhất")
                    }
                }
            }
            return item;
        });
        setChiTietDonHang(newList)
        capNhatSLVaTTCTDH(newList)
        // thằng dưới này dùng đê lưu bản thảo sửa đơn hàng mà không bị mất khi reload lại data
        const tmp3 = {
            MaDatHang: rowfromtable.MaDatHang,
            CTDH: newList
        }
        localStorage.setItem("tmpCT" + rowfromtable.MaDatHang, JSON.stringify(tmp3))
    }

    const giamSoLuong = (khoaChinh) => {
        const newList = chiTietDonHang.map((item) => {
            if (item.MaHang === khoaChinh) {
                let sLuong = item.SoLuong
                const donGia = item.DonGia
                const chietKhau = item.ChietKhau
                if (sLuong >= 2) {
                    sLuong -= 1
                    const tongTien = (sLuong * (donGia - (donGia * chietKhau / 100)))
                    const updatedItem = {
                        ...item,
                        SoLuong: sLuong,
                        ThanhTien: tongTien,
                    };
                    return updatedItem;
                } else {
                    alert("Số lượng đã thấp nhất")
                }
            }
            return item;
        });
        setChiTietDonHang(newList)
        capNhatSLVaTTCTDH(newList)
        // thằng dưới này dùng đê lưu bản thảo sửa đơn hàng mà không bị mất khi reload lại data
        const tmp3 = {
            MaDatHang: rowfromtable.MaDatHang,
            CTDH: newList
        }
        localStorage.setItem("tmpCT" + rowfromtable.MaDatHang, JSON.stringify(tmp3))
    }

    // mỗi lần chạy theo kiểu gộp thành 1 lần gọi api
    const luuSuaDoi = async (test) => {
        if (tenKH != '' && sDT != '' && diaChi != '') {
            let vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
            let vnf_regex2 = /((02)+([0-9]{9})\b)/g;
            let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (vnf_regex.test(sDT) || vnf_regex2.test(sDT)) {
                if (email.length == 0 || regEmail.test(email)) {
                    if (parseFloat(khachDaTra) >= 0 || khachDaTra == 'R') {
                        if (maNguoiBan.length == 0) {
                            setMaNguoiBan('')
                        }
                        let tongTienDonHang = 0
                        const tienDoiDiem = parseFloat(rowfromtable.TienDoiDiem)
                        const tienGiamGia = parseFloat(tienmagiamgia)
                        chiTietDonHang.forEach(e => {
                            tongTienDonHang += (e.SoLuong * (e.DonGia - (e.DonGia * e.ChietKhau / 100)))
                        });
                        let congNo = 0
                        if (khachDaTra != 'R') {
                            congNo = (tongTienDonHang - tienDoiDiem - tienGiamGia) - parseFloat(khachDaTra)
                        }
                        const requestOptions1 = {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                KhachCanTra: (tongTienDonHang - tienDoiDiem - tienGiamGia),
                                // KhachCanTra: tongTienDonHang,
                                KhachHang: tenKH,
                                SoDienThoai: sDT,
                                DiaChi: diaChi,
                                GhiChu: ghiChu,
                                Email: email,
                                TienMaGiamGia: tienmagiamgia,
                                QuaTang: quatang,
                                MaNguoiBan: maNguoiBan,
                                KhachDaTra: khachDaTra,
                                TrangThai: rowfromtable.TrangThai,
                                CongNo: congNo
                            })
                        }

                        let listCTDH = []
                        let stringlog = "";
                        chiTietDonHang.forEach(ee1 => {
                            listCTDH.push({
                                MaDatHang: ee1.MaDatHang, MaHang: ee1.MaHang, TenHang: ee1.TenHang, DVT: ee1.DVT, SoLuong: ee1.SoLuong, DonGia: ee1.DonGia, ChietKhau: ee1.ChietKhau, ThanhTien: ee1.ThanhTien, NhanhHang: ee1.NhanhHang
                            })
                            //chỗ này nhờ trường thêm cái dg1 vào
                            if (ee1.GiaGoc !== ee1.DonGia) {
                                stringlog = stringlog + "---/changed mh: " + ee1.MaHang + " - dg1: " + ee1.GiaGoc + " - dg2: " + ee1.DonGia
                            }
                        });
                        if (chiTietDonHang.length == 0) { // T hay F đều gọi 1 lần
                            await fetch(API_URL + "/donHang/" + rowfromtable.MaDatHang, {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    KhachCanTra: (tongTienDonHang - tienDoiDiem - tienGiamGia),
                                    // KhachCanTra: tongTienDonHang,
                                    KhachHang: tenKH,
                                    SoDienThoai: sDT,
                                    DiaChi: diaChi,
                                    GhiChu: ghiChu,
                                    Email: email,
                                    MaNguoiBan: maNguoiBan,
                                    KhachDaTra: khachDaTra,
                                    TrangThai: "Đã hủy",
                                    CongNo: 0
                                })
                            })
                                .then(res => res.json())
                                .then(async data => {
                                    const requestOptions2 = {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({
                                            ChiTietDonHang: listCTDH
                                        })
                                    }
                                    await fetch(API_URL + "/SuaNhieuSanPhamCua1DonHang/" + rowfromtable.MaDatHang, requestOptions2)
                                        .then(res => res.json())
                                        .then(data2 => {
                                            // alert("Đã cập nhật!")
                                            localStorage.removeItem("tmpCT" + rowfromtable.MaDatHang)
                                            parentCallback(123);
                                        })
                                })
                            parentCallback(123);
                            alert("Đơn hàng trống nên tự hủy!")
                        } else {
                            await fetch(API_URL + "/donHang/" + rowfromtable.MaDatHang, requestOptions1)
                                .then(res => res.json())
                                .then(async data => {
                                    const requestOptions2 = {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({
                                            ChiTietDonHang: listCTDH
                                        })
                                    }
                                    await fetch(API_URL + "/SuaNhieuSanPhamCua1DonHang/" + rowfromtable.MaDatHang, requestOptions2)
                                        .then(res => res.json())
                                        .then(data2 => {
                                            localStorage.removeItem("tmpCT" + rowfromtable.MaDatHang)
                                            parentCallback(123);
                                        })
                                })
                            parentCallback(123);
                        }
                        //////////////////////
                        if (stringlog.length > 0) {
                            const date = new Date();
                            const ngay7 = date.getDate()
                            const thang7 = date.getMonth() + 1
                            const nam7 = date.getFullYear()
                            const gio7 = date.getHours()
                            const phut7 = date.getMinutes()
                            let logstring = ngay7 + "-" + thang7 + "-" + nam7 + " - " + gio7 + ":" + phut7 + " - Mã đặt hàng: " + rowfromtable.MaDatHang + " - Người xử lý :" + tenNV + " - log: " + stringlog;
                            fetch(API_URL + '/log', {
                                method: 'POST',
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    log: logstring,
                                })
                            })
                        }
                        /////////////////
                    } else {
                        alert("Tiền khách trả chưa hợp lệ")
                    }
                } else {
                    alert("Email chưa hợp lệ")
                }
            } else {
                alert("Số điện thoại không hợp lệ")
            }
        } else {
            alert("Chưa nhập đầy đủ thông tin giao hàng.")
        }
        if (test == 0) {
            alert("Đã lưu")
            setCheckluu(true)
        }
    }

    const hoanTacXuLyDonHang = async () => {
        let tongTienDonHang = 0
        const tienDoiDiem = parseFloat(rowfromtable.TienDoiDiem)
        const tienGiamGia = parseFloat(tienmagiamgia)
        chiTietDonHang.forEach(e => {
            tongTienDonHang += (e.SoLuong * (e.DonGia - (e.DonGia * e.ChietKhau / 100)))
        });
        const requestOptions1 = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                KhachCanTra: (tongTienDonHang - tienDoiDiem - tienGiamGia),
                // KhachCanTra: tongTienDonHang,
                KhachHang: tenKH,
                SoDienThoai: sDT,
                DiaChi: diaChi,
                GhiChu: ghiChu,
                Email: email,
                TienMaGiamGia: tienmagiamgia,
                QuaTang: quatang,
                MaNguoiBan: maNguoiBan,
                KhachDaTra: khachDaTra,
                TrangThai: "Đã xác nhận",
                // NgayXuLy: '',
                MaNgXuLy: '',
            })
        }
        await fetch(API_URL + '/donHang/' + rowfromtable.MaDatHang, requestOptions1)
            .then(response => response.json())
            .then(data => {
                alert(data.msg)
                parentCallback(123);
            })

        // fetch remove combo to combostatistic 
        fetch(API_URL + '/comboStatisticDelete/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: rowfromtable.MaDatHang
            })
        }).then(res => res.json)

        //////////////////
        //hàm cộng trừ lại điểm đã cộng
        const dth = tongTienDonHang;
        const dthuong = (dth / 50000) / 2;
        await fetch(API_URL + '/loyaltypoint', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                point: parseFloat(-dthuong.toFixed(2)),
                makh: rowfromtable.MaKhachHang
            })
        })
        //////////////
    }

    function handleSubmitManv(event, value) {
        event.preventDefault();
        setMaNguoiBan(value)
    }

    const testKey2 = (e) => {
        if (e.code == "Enter") {
            handleClose_Sua()
        }
    }
    const testKey3 = (e) => {
        if (e.code == "Enter") {
            handleClose_Sua2()
        }
    }

    const testKey4 = (e) => {
        if (e.code == "Enter") {
            handleClose_Sua4()
        }
    }

    const testKey5 = (e) => {
        if (e.code == "Enter") {
            handleClose_Sua5()
        }
    }

    const testKey6 = (e) => {
        if (e.code == "Enter") {
            luuSuaDoi(0)
        }
    }

    const [searchString, setSearchString] = useState("");

    const handleOnSearch = (string, results) => {
        if (string !== "") {
            if (string.length <= 1) {
                sessionStorage.removeItem("Searchfromtc")
                fetch(API_URL + '/searchfront', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        sotrang: sotrang,
                        sercmdarr: "Tất Cả Sản Phẩm",
                    })
                })
                    .then((response) => response.json())
                    .then(datas => {
                        capNhatSoLuongSanPham(datas.mang, 0)
                        setDataSize(Object.values(datas.tong[0]))
                        setValue(null)
                        setNoteTieuDe("Tất Cả Sản Phẩm")
                        setSoTrang(1)
                    })
            } else {
                sessionStorage.removeItem("Searchfromtc")
                fetch(API_URL + '/searchfront', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        sotrang: sotrang,
                        sercmdarr: string,
                    })
                })
                    .then((response) => response.json())
                    .then(datas => {
                        capNhatSoLuongSanPham(datas.mang, 0)
                        setDataSize(Object.values(datas.tong[0]))
                        setNoteTieuDe(string)
                        setSoTrang(1)
                    })
            }
        }
        setSearchString(string);
    }

    const handleOnSelect = (item) => {

        fetch(API_URL + '/searchfront', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sotrang: sotrang,
                sercmdarr: item.TenHang,
            })
        })
            .then((response) => response.json())
            .then(datas => {
                capNhatSoLuongSanPham(datas.mang, 0)
                setDataSize(Object.values(datas.tong[0]))
                setNoteTieuDe(item.TenHang)
                setSoTrang(1)
            })
        setSearchString("");
    }

    const handleOnClear = () => {

        fetch(API_URL + '/searchfront', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sotrang: sotrang,
                sercmdarr: "Tất Cả Sản Phẩm",
            })
        })
            .then((response) => response.json())
            .then(datas => {
                capNhatSoLuongSanPham(datas.mang, 0)
                setDataSize(Object.values(datas.tong[0]))
                setValue(null)
                setNoteTieuDe("Tất Cả Sản Phẩm")
                setSoTrang(1)
            })
        setSearchString("");
    };
    const deletetheitem = (index, mahang) => {
        let tempitem = [...showSanPhamChon];
        tempitem.splice(index, 1)
        setShowSanPhamChon(tempitem)
        let tmp = {
            gioHang: tempitem
        }
        localStorage.setItem("list", JSON.stringify(tmp))
        const newList = data.map((item) => {
            if (item.MaHang === mahang) {
                const updatedItem = {
                    ...item,
                    SoLuong: 0,
                }
                return updatedItem
            }
            return item
        })
        setData(newList)
    }
    //let owner=false;
    const check = () => {
        //get redis key với key là mã dat hang
        fetch(API_URL + '/getredis', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                key: rowfromtable.MaDatHang,
            })
        })
            .then((response) => response.json())
            .then(datas => {
                // console.log(datas)
                if (datas === "nothing") {
                    setCheckdonhang(1)
                    setCheckbutton(false)
                    fetch(API_URL + '/setredis', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            key: rowfromtable.MaDatHang,
                            value2: rowfromtable.TrangThai,
                            value: tenNV
                        })
                    })
                    //let owner=true
                    setOwner(true)
                    // console.log(owner)
                } else {
                    let test = JSON.parse(datas)
                    if (test.ten == tenNV) {
                        setOwner(true)
                        setCheckdonhang(1)
                        setCheckbutton(false)
                    } else {
                        setTenNXL(test.ten)
                        // console.log(test.tt)
                        setCheckdonhang(2)
                    }

                }
            })

        //nếu có => render div đơn hàng đang được value của key đó xử lý
        //nếu không => render như bình thường + thêm key redis có key mà madathang, value là mã ng dùng
        //clear redis key ở các bước:xử lý đơn vv.v.v
        //clear redis key ở lúc đóng cửa sổ suadonhang (hơi khó)
    }

    window.onbeforeunload = (event) => {
        const e = event || window.event;
        if (e) {
            parentCallback(123)
            e.returnValue = ''; // Legacy method for cross browser support
        }
    };

    const unsubscribe = async (e) => {
        // console.log(e)
        if (e) {
            await fetch(API_URL + '/clearredis', {
                method: 'POST',

                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    key: rowfromtable.MaDatHang
                })
            })
            setOwner(false)
            // let owner=false
        } else {
            // console.log("donothing")
        }
    };
    useEffect(() => {
        return () => unsubscribe(owner)
    }, [owner])

    const tienConLai = () => {
        const tienDoiDiem = parseFloat(rowfromtable.TienDoiDiem)
        // const tienDoiDiem = rowfromtable.DoiDiem * 1000 / 2
        const tienGiamGia = parseFloat(tienmagiamgia)
        if ((tongTienDonHang - tienDoiDiem - tienGiamGia) > 0) {
            return (tongTienDonHang - tienDoiDiem - tienGiamGia).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
        }
        return `0 VND`
    }

    return (
        <div>
            {(rowfromtable.TrangThai != "Đã xác nhận" && rowfromtable.TrangThai != "Chưa xác nhận") ?
                <div>
                    <div>
                        <div className='DHO_TKDH'>
                            <div className='DHO-nua-trai'>
                                <h3>Thông tin khách hàng</h3>
                                <div className='aa'>
                                    <div className='phanchia'>
                                        <label for="billing_first_name">Tên&nbsp;
                                            <abbr className="required" title="bắt buộc">*</abbr>
                                        </label>
                                        {
                                            hienNutSuaDonHang ?
                                                <input style={{ fontSize: 16 }} type="text" className="input-text " value={tenKH} onChange={text => { setTenKH(text.target.value) }} />
                                                :
                                                <input disabled style={{ fontSize: 16 }} type="text" className="input-text " value={tenKH} />
                                        }
                                    </div>
                                    <div className='phanchia'>
                                        <label for="billing_first_name">Số điện thoại&nbsp;
                                            <abbr className="required" title="bắt buộc">*</abbr>
                                        </label>
                                        {
                                            hienNutSuaDonHang ?
                                                <input style={{ fontSize: 16 }} type="text" className="input-text " value={sDT} onChange={text => { setSDT(text.target.value) }} />
                                                :
                                                <input disabled style={{ fontSize: 16 }} type="text" className="input-text " value={sDT} />
                                        }

                                    </div>
                                    <div className='phanchia'>
                                        <label for="billing_first_name">Địa chỉ email (tùy chọn) &nbsp;</label>
                                        {
                                            hienNutSuaDonHang ?
                                                <input style={{ fontSize: 16 }} type="text" className="input-text " value={email} onChange={text => { setEmail(text.target.value) }} />
                                                :
                                                <input disabled style={{ fontSize: 16 }} type="text" className="input-text " value={email} />
                                        }
                                    </div>
                                </div>
                                <div className='phanchia2'>
                                    <label for="billing_first_name">Địa chỉ&nbsp;
                                        <abbr className="required" title="bắt buộc">*</abbr>
                                    </label>
                                    {
                                        hienNutSuaDonHang ?
                                            <input style={{ fontSize: 16 }} type="text" className="input-text " value={diaChi} onChange={text => { setDiaChi(text.target.value) }} />
                                            :
                                            <input disabled style={{ fontSize: 16 }} type="text" className="input-text " value={diaChi} />
                                    }
                                </div>
                                <div className='input_remove_arrow phanchia2'>
                                    <div className='phanchia'>
                                        <label for="billing_first_name">Khách đã trả&nbsp;
                                            <abbr className="required" title="bắt buộc">*</abbr>
                                        </label>
                                        <div style={{ flexWrap: 'wrap', width: '100%', display: 'flex' }}>
                                            {
                                                hienNutSuaDonHang ?
                                                    <input style={{ fontSize: 16, width: '70%' }} type="number" className="input-text " value={khachDaTra} onChange={text => { setKhachDaTra((text.target.value)) }} />
                                                    :
                                                    <input disabled style={{ fontSize: 16, width: '70%' }} type="number" className="input-text " value={khachDaTra} />
                                            }
                                            <p style={{ fontSize: 16, fontWeight: 'bold', width: '20%', marginLeft: 15, alignSelf: 'center', top: 5 }} >{khachDaTra.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} </p>
                                        </div>
                                    </div>
                                </div>

                                <div className='phanchia12'>
                                    <label for="billing_first_name">Mã người bán&nbsp;
                                        <abbr className="required" title="bắt buộc">*</abbr>
                                    </label>
                                    {
                                        hienNutSuaDonHang ?
                                            <Autocomplete
                                                freeSolo
                                                className="input-text1"
                                                clearOnEscape
                                                clearOnBlur
                                                autoComplete
                                                options={manbsg.map((option) => option.TenQua)}
                                                onChange={handleSubmitManv}
                                                value={maNguoiBan}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        margin="normal"
                                                        aria-label="enter search"
                                                        name="search"
                                                        className='bodi'
                                                    />
                                                )}>
                                            </Autocomplete>
                                            :
                                            <Autocomplete
                                                disabled
                                                freeSolo
                                                className="input-text1"
                                                clearOnEscape
                                                clearOnBlur
                                                autoComplete
                                                options={manbsg.map((option) => option.TenQua)}
                                                value={maNguoiBan}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        margin="normal"
                                                        aria-label="enter search"
                                                        name="search"
                                                        className='bodi'
                                                    />
                                                )}>
                                            </Autocomplete>
                                    }
                                </div>
                                <div className='phanchia12'>
                                    <label for="billing_first_name">Ghi chú đơn hàng&nbsp;
                                    </label>
                                    {
                                        hienNutSuaDonHang ?
                                            <input style={{ fontSize: 16 }} type="text" className="input-text " value={ghiChu} onChange={text => { setGhiChu(text.target.value) }} />
                                            :
                                            <input disabled style={{ fontSize: 16 }} type="text" className="input-text " value={ghiChu} />
                                    }

                                </div>
                                { //
                                    hienNutSuaDonHang ?
                                        <div className='phanchia2'>
                                            {/* <input className="submit" type="button" value="Hoàn tác sửa đổi" onClick={() => hoanTacSuaDoiThongTinKH()} style={{ fontSize: 15, width: 'auto', padding: '15px', background: '#f5af19' }}></input>&nbsp;&nbsp; */}
                                            {/* <input className="submit" type="button" value="Lưu sửa đổi" onClick={() => luuThongTinKH()} style={{ fontSize: 15, width: 'auto', padding: '15px', background: '#4286f4' }}></input> */}
                                            {
                                                boolChuaLuuDonHang ?
                                                    <p style={{ fontSize: 18, fontWeight: 'bold', color: 'red', marginLeft: '600px' }}>Chú ý! Đơn hàng vẫn chưa lưu thay đổi!!!</p>
                                                    :
                                                    null
                                            }
                                        </div> :
                                        null
                                }
                            </div>
                        </div>

                    </div>
                    <div className='don'>
                        <div className='order_review' style={{ width: '75%', height: 50 }}>
                            <div className='tam-tinhsuadon5' style={{ textAlign: 'center' }}><h3>Xóa</h3></div>
                            <div className='tam-tinhsuadon5' style={{ textAlign: 'center' }}><h3>STT</h3></div>
                            <div className='tam-tinhsuadon4' style={{ textAlign: 'center' }}><h3>Mã hàng</h3></div>
                            <div className='tam-tinhsuadon3' style={{ textAlign: 'center' }}><h3>Tên hàng</h3></div>
                            <div className='tam-tinhsuadon3' style={{ textAlign: 'center' }}><h3>Loại hàng</h3></div>
                            <div className='tam-tinhsuadon1' style={{ textAlign: 'center' }}><h3>ĐVT</h3></div>
                            <div className='tam-tinh3' style={{ textAlign: 'center' }}><h3>Số lượng </h3></div>
                            <div className='tam-tinhsuadon1' style={{ textAlign: 'center' }}><h3>Tồn đầu </h3></div>
                            <div className='tam-tinhsuadon1' style={{ textAlign: 'center' }}><h3>Đã xử lý </h3></div>
                            <div className='tam-tinhsuadon1' style={{ textAlign: 'center' }}><h3>Tồn cuối</h3></div>
                            <div className='tam-tinhsuadon2' style={{ textAlign: 'center' }}><h3>Đơn giá</h3></div>
                            <div className='tam-tinhsuadon4' style={{ textAlign: 'center' }}><h3>% CK</h3></div>
                            <div className='tam-tinhsuadon2' style={{ textAlign: 'center' }}><h3>Thành tiền</h3></div>
                        </div>
                        {
                            chiTietDonHang.map((item, i) => {
                                const vNDThanhTien = item.ThanhTien.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                                return (
                                    <div className='order_review1' style={{ width: '75%', fontSize: 12 }}>
                                        {
                                            !tatSuaChiTietDonHang ?
                                                <div className='tam-tinhsuadon5'>
                                                    <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                                        <button style={{ backgroundColor: 'transparent', backgroundRepeat: 'no-repeat', border: 'none', cursor: 'pointer', marginTop: 10 }}
                                                            onClick={() => xoa1SanPhamCuaChiTietDonHang(item)}>
                                                            <img src='https://img.icons8.com/ios/2x/fa314a/delete-trash.png' width='20' height='20'></img>
                                                        </button>
                                                    </div>
                                                </div>
                                                :
                                                <div className='tam-tinhsuadon5'>
                                                    <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                                        <button disabled style={{ backgroundColor: 'transparent', backgroundRepeat: 'no-repeat', border: 'none' }}>
                                                            <img src='https://img.icons8.com/ios/2x/fa314a/delete-trash.png' width='20' height='20'></img>
                                                        </button>
                                                    </div>
                                                </div>
                                        }
                                        <div className='tam-tinhsuadon5'>
                                            <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                                <h3>{(i + 1)}</h3>
                                            </div>
                                        </div>
                                        <div className='tam-tinhsuadon4'>
                                            <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                                <h3>{item.MaHang}</h3>
                                            </div>
                                        </div>
                                        <div className='tam-tinhsuadon3'>
                                            <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                                <h3>{item.TenHang}</h3>
                                            </div>
                                        </div>
                                        <div className='tam-tinhsuadon3'>
                                            <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                                <h3>{item.NhanhHang}</h3>
                                            </div>
                                        </div>
                                        <div className='tam-tinhsuadon1'>
                                            <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                                <h3>{item.DVT}</h3>
                                            </div>
                                        </div>
                                        {
                                            !tatSuaChiTietDonHang ?
                                                <div className='input_remove_arrow tam-tinh3'>
                                                    <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                                        <button onClick={() => giamSoLuong(item.MaHang)} style={{ fontSize: 18, padding: 5, backgroundColor: '#fdbe07', borderRadius: 20, width: 30, height: 30, alignSelf: 'center', textAlign: 'center', border: 'none', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>-</button> &nbsp;
                                                        <input onKeyPress={(e) => testKey6(e)} style={{ border: 'none', fontSize: 15, alignSelf: 'center', textAlign: 'center', fontWeight: 'bold' }} className='so' type='number' value={item.SoLuong} onChange={value => { suaSoLuong(item.MaHang, parseInt(value.target.value)) }} /> &nbsp;
                                                        <button onClick={() => tangSoLuong(item.MaHang)} style={{ fontSize: 18, padding: 5, backgroundColor: '#fdbe07', borderRadius: 20, width: 30, height: 30, alignSelf: 'center', textAlign: 'center', border: 'none', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }} >+</button>
                                                    </div>
                                                </div>
                                                :
                                                <div className='input_remove_arrow tam-tinh3'>
                                                    <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                                        <button disabled style={{ fontSize: 18, padding: 5, backgroundColor: '#fdbe07', borderRadius: 20, width: 30, height: 30, alignSelf: 'center', textAlign: 'center', border: 'none', color: '#fff', fontWeight: 'bold' }}>-</button> &nbsp;
                                                        <input style={{ border: 'none', fontSize: 15, alignSelf: 'center', textAlign: 'center', fontWeight: 'bold' }} className='so' type='number' value={item.SoLuong} disabled /> &nbsp;
                                                        <button disabled style={{ fontSize: 18, padding: 5, backgroundColor: '#fdbe07', borderRadius: 20, width: 30, height: 30, alignSelf: 'center', textAlign: 'center', border: 'none', color: '#fff', fontWeight: 'bold' }} >+</button>
                                                    </div>
                                                </div>
                                        }
                                        <div className='input_remove_arrow tam-tinhsuadon1'>
                                            <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                                <h3>{item.TonKho}</h3>
                                            </div>
                                        </div>
                                        <div className='input_remove_arrow tam-tinhsuadon1'>
                                            <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                                <h3>{item.DaDat}</h3>
                                            </div>
                                        </div>
                                        <div className='input_remove_arrow tam-tinhsuadon1'>
                                            <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                                <h3>{item.ConLai}</h3>
                                            </div>
                                        </div>
                                        {
                                            !tatSuaChiTietDonHang ?
                                                <div className='tam-tinhsuadon2'>
                                                    <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'end', paddingRight: 7 }}>
                                                        <input style={{ border: 'none', textAlign: 'right', fontSize: 15, width: 100, marginBottom: 2, fontWeight: 'bold' }} className='so' type='number' value={item.DonGia} onChange={value => { suaDonGia(item.MaHang, parseFloat(value.target.value)) }} /> &nbsp;&nbsp;&nbsp;
                                                        <b style={{ fontSize: 15, alignSelf: 'center' }}>VND</b>
                                                    </div>
                                                </div>
                                                :
                                                <div className='tam-tinhsuadon2'>
                                                    <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'end', paddingRight: 7 }}>
                                                        <input disabled style={{ border: 'none', textAlign: 'right', fontSize: 15, width: 100, marginBottom: 2, fontWeight: 'bold' }} className='so' type='number' value={item.DonGia} onChange={x => setCheckluu(false)} /> &nbsp;&nbsp;&nbsp;
                                                        <b style={{ fontSize: 15, alignSelf: 'center' }}>VND</b>
                                                    </div>
                                                </div>
                                        }
                                        <div className='tam-tinhsuadon4'>
                                            <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                                <b style={{ fontSize: 15, alignSelf: 'center', fontWeight: 'bold' }}>{item.ChietKhau}</b>
                                            </div>
                                        </div>
                                        <div className='tam-tinhsuadon2'>
                                            <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'end', paddingRight: 7 }}>
                                                <b style={{ fontSize: 15, alignSelf: 'center' }}>{vNDThanhTien}</b>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div className='order_review1' style={{ width: '75%', backgroundColor: '#f2f2f2' }}>
                            <div style={{ width: '38%', textAlign: 'left', flexWrap: 'wrap', padding: 5, margin: 'auto', borderLeftWidth: 3, borderColor: '#ececec', alignSelf: 'center', fontSize: 12, paddingLeft: 7 }}><h3>Tổng tiền hàng</h3></div>
                            <div style={{ width: '17%', textAlign: 'center', flexWrap: 'wrap', padding: 5, margin: 'auto', borderLeftWidth: 3, borderColor: '#ececec', alignSelf: 'center', fontSize: 12 }}><h3>{tongSLSPCTDH}</h3></div>
                            <div style={{ width: '48%', textAlign: 'right', flexWrap: 'wrap', padding: 5, margin: 'auto', borderLeftWidth: 3, borderColor: '#ececec', alignSelf: 'center', fontSize: 12, paddingRight: 7 }}><h3>{strTTCTDH}</h3></div>
                        </div>
                        <div className='order_review1' style={{ width: '75%', backgroundColor: '#f2f2f2' }}>
                            <div style={{ width: '38%', textAlign: 'left', flexWrap: 'wrap', padding: 5, margin: 'auto', borderLeftWidth: 3, borderColor: '#ececec', alignSelf: 'center', fontSize: 12, paddingLeft: 7 }}><h3>Điểm thưởng</h3></div>
                            <div style={{ width: '17%', textAlign: 'center', flexWrap: 'wrap', padding: 5, margin: 'auto', borderLeftWidth: 3, borderColor: '#ececec', alignSelf: 'center', fontSize: 12 }}><h3> </h3></div>
                            <div style={{ width: '48%', textAlign: 'right', flexWrap: 'wrap', padding: 5, margin: 'auto', borderLeftWidth: 3, borderColor: '#ececec', alignSelf: 'center', fontSize: 12, paddingRight: 7 }}><h3>{(rowfromtable.TienDoiDiem).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</h3></div>
                        </div>
                        <div className='order_review1' style={{ width: '75%', backgroundColor: '#f2f2f2' }}>
                            <div style={{ width: '38%', textAlign: 'left', flexWrap: 'wrap', padding: 5, margin: 'auto', borderLeftWidth: 3, borderColor: '#ececec', alignSelf: 'center', fontSize: 12, paddingLeft: 7 }}><h3>Khuyến mãi</h3></div>
                            <div style={{ width: '17%', textAlign: 'center', flexWrap: 'wrap', padding: 5, margin: 'auto', borderLeftWidth: 3, borderColor: '#ececec', alignSelf: 'center', fontSize: 12 }}><h3> </h3></div>
                            <div style={{ width: '48%', textAlign: 'right', flexWrap: 'wrap', padding: 5, margin: 'auto', borderLeftWidth: 3, borderColor: '#ececec', alignSelf: 'center', fontSize: 12, paddingRight: 7 }}><h3>{(tienmagiamgia).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</h3></div>
                        </div>
                        <div className='order_review1' style={{ width: '75%', backgroundColor: '#f2f2f2' }}>
                            <div style={{ width: '38%', textAlign: 'left', flexWrap: 'wrap', padding: 5, margin: 'auto', borderLeftWidth: 3, borderColor: '#ececec', alignSelf: 'center', fontSize: 12, paddingLeft: 7 }}><h3>Quà tặng</h3></div>
                            <div style={{ width: '17%', textAlign: 'center', flexWrap: 'wrap', padding: 5, margin: 'auto', borderLeftWidth: 3, borderColor: '#ececec', alignSelf: 'center', fontSize: 12 }}><h3> </h3></div>
                            <div style={{ width: '48%', textAlign: 'right', flexWrap: 'wrap', padding: 5, margin: 'auto', borderLeftWidth: 3, borderColor: '#ececec', alignSelf: 'center', fontSize: 12, paddingRight: 7 }}><h3>{(quatang)}</h3></div>
                        </div>

                        {/* Rows show gift bunlde of combo */}

                        {
                            arrCombo.map((item) => {

                                return (
                                    <div className='order_review1' style={{ width: '75%', backgroundColor: '#f2f2f2' }}>
                                        <div style={{ width: '38%', textAlign: 'left', flexWrap: 'wrap', padding: 5, margin: 'auto', borderLeftWidth: 3, borderColor: '#ececec', alignSelf: 'center', fontSize: 12, paddingLeft: 7 }}><h3>{item.MaHang}</h3></div>
                                        <div style={{ width: '17%', textAlign: 'center', flexWrap: 'wrap', padding: 5, margin: 'auto', borderLeftWidth: 3, borderColor: '#ececec', alignSelf: 'center', fontSize: 12 }}><h3> </h3></div>
                                        <div style={{ width: '48%', textAlign: 'right', flexWrap: 'wrap', padding: 5, margin: 'auto', borderLeftWidth: 3, borderColor: '#ececec', alignSelf: 'center', fontSize: 12, paddingRight: 7 }}><h3>{item.NhanhHang}</h3></div>
                                    </div>
                                )
                            })
                        }

                        <div className='order_review1' style={{ width: '75%', backgroundColor: '#f2f2f2' }}>
                            <div style={{ width: '38%', textAlign: 'left', flexWrap: 'wrap', padding: 5, margin: 'auto', borderLeftWidth: 3, borderColor: '#ececec', alignSelf: 'center', fontSize: 12, paddingLeft: 7 }}><h3>Tổng tiền phải trả</h3></div>
                            <div style={{ width: '17%', textAlign: 'center', flexWrap: 'wrap', padding: 5, margin: 'auto', borderLeftWidth: 3, borderColor: '#ececec', alignSelf: 'center', fontSize: 12 }}><h3></h3></div>
                            <div style={{ width: '48%', textAlign: 'right', flexWrap: 'wrap', padding: 5, margin: 'auto', borderLeftWidth: 3, borderColor: '#ececec', alignSelf: 'center', fontSize: 12, paddingRight: 7 }}><h3>{tienConLai()}</h3></div>
                        </div>
                        {
                            hienNutSuaDonHang ?
                                <div>
                                    <input className="submit" type="button" value="Hủy đơn hàng" onClick={handleClickOpen2} style={{ fontSize: 15, width: 'auto', padding: '15px', background: '#FF0000' }}></input>&nbsp;
                                    <input className="submit" type="button" value="Hoàn tác sửa đổi" onClick={() => hoanTacSuaChiTietDonHang()} style={{ fontSize: 15, width: 'auto', padding: '15px', background: '#f5af19' }}></input>&nbsp;
                                    <input className="submit" type="button" value="Thêm sản phẩm" onClick={() => themSanPham()} style={{ fontSize: 15, width: 'auto', padding: '15px' }}></input>&nbsp;
                                    <input className="submit" type="button" value="Lưu sửa đổi" onClick={() => luuSuaDoi(0)} style={{ fontSize: 15, width: 'auto', padding: '15px', background: '#4286f4' }}></input>&nbsp;
                                    {
                                        anXacNhanDonKhiLoadDH ?
                                            null
                                            :

                                            <div>
                                                {/* <input className="submit" type="button" value="Xác nhận đơn" onClick={() => xacNhanDon()} style={{ fontSize: 15, width: 'auto', padding: '15px', background: '#1E9600' }}></input>&nbsp; */}
                                                <input className="submit" type="button" value="Xử lý đơn" onClick={kiemTraSoLuongVaConLai} style={{ fontSize: 15, width: 'auto', padding: '15px', background: '#1E9600' }}></input>&nbsp;
                                            </div>
                                    }
                                </div> :
                                hienNutKhoiPhucDon ?
                                    <div>
                                        <input className="submit" type="button" value="Khôi phục đơn" onClick={() => setOpen4(true)} style={{ fontSize: 15, width: 'auto', padding: '15px', background: '#1E9600' }}></input>&nbsp;
                                    </div> : null
                        }
                        {
                            hienNutIn ?
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <input className="submit" type="button" value="Khách hủy đơn" onClick={handleClickOpen5} style={{ fontSize: 15, width: 'auto', padding: '15px', background: '#FF0000' }}></input>&nbsp;
                                    <input className="submit" type="button" value="Hoàn tác xử lý đơn" onClick={() => hoanTacXuLyDonHang()} style={{ fontSize: 15, width: 'auto', padding: '15px', background: '#4286f4' }}></input>&nbsp;
                                    {/* <input className="submit" type="button" value="Đã giao hàng" onClick={hoanThanhDon} style={{ fontSize: 15, width: 'auto', padding: '15px', background: '#1E9600' }}></input>&nbsp; */}
                                    <Link to={{ pathname: '/InHoaDon', state: { MaDatHang: rowfromtable.MaDatHang, tenNV: tenNV }, }}
                                        className="submit" type="button" style={{ fontSize: 15, textTransform: 'capitalize', width: 'auto', padding: '15px', background: '#636363' }}>In hóa đơn</Link>
                                    <div className='nut-inport'>
                                        <ExportReactCSV csvData={chiTietDonHang} fileName={rowfromtable.MaDatHang} />&nbsp;
                                    </div>

                                </div>
                                : null

                        }
                    </div>

                    {/* dialog xủ lý đơn hàng */}

                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        onKeyPress={(e) => testKey2(e)}
                    >
                        <DialogTitle id="alert-dialog-title">{"Bạn có muốn Xử lý đơn hàng này?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description" style={{ textAlign: 'center', color: 'black' }}>Xác nhận xử lý đơn hàng: {rowfromtable.MaDatHang}!</DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose_KhongSua} style={{ padding: '6px 16px', backgroundColor: 'rgb(255, 193, 7)', margin: '15px', borderRadius: '8px', color: 'rgb(0, 0, 0)', width: '50%' }}>Không</Button>
                            <Link onClick={handleClose_Sua} to={{ pathname: '/InHoaDon', state: { MaDatHang: rowfromtable.MaDatHang, tenNV: tenNV } }}
                                className="submit" type="button" style={{ padding: '7px 16px', backgroundColor: 'rgb(0, 171, 85)', margin: '15px', borderRadius: '8px', color: 'white', width: '50%', textAlign: 'center' }}>Có</Link>
                        </DialogActions>
                    </Dialog>

                    {/* dialog hủy đơn hàng */}

                    <Dialog
                        open={open2}
                        onClose={handleClose2}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        onKeyPress={(e) => testKey3(e)}
                    >
                        <DialogTitle id="alert-dialog-title">{"Bạn có muốn hủy đơn hàng này?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description" style={{ textAlign: 'center', color: 'black' }}>Xác nhận hủy đơn hàng: {rowfromtable.MaDatHang}!</DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose_KhongSua2} style={{ padding: '6px 16px', backgroundColor: 'rgb(255, 193, 7)', margin: '15px', borderRadius: '8px', color: 'rgb(0, 0, 0)', width: '50%' }}>Không</Button>
                            <Button onClick={handleClose_Sua2} style={{ padding: '6px 16px', backgroundColor: 'rgb(0, 171, 85)', margin: '15px', borderRadius: '8px', color: 'white', width: '50%' }}>Có</Button>
                        </DialogActions>
                    </Dialog>

                    {/* dialog khách hủy đơn hàng */}

                    <Dialog
                        open={open5}
                        onClose={handleClose5}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        onKeyPress={(e) => testKey5(e)}
                    >
                        <DialogTitle id="alert-dialog-title">{"Xác nhận khách hủy đơn"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description" style={{ textAlign: 'center', color: 'black' }}>Xác nhận hủy đơn hàng: {rowfromtable.MaDatHang}!</DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose_KhongSua5} style={{ padding: '6px 16px', backgroundColor: 'rgb(255, 193, 7)', margin: '15px', borderRadius: '8px', color: 'rgb(0, 0, 0)', width: '50%' }}>
                                Không
                            </Button>
                            <Button onClick={handleClose_Sua5} style={{ padding: '6px 16px', backgroundColor: 'rgb(0, 171, 85)', margin: '15px', borderRadius: '8px', color: 'white', width: '50%' }}>
                                Có
                            </Button>
                        </DialogActions>
                    </Dialog>

                    {/* dialog khôi phục đơn hàng */}

                    <Dialog
                        open={open4}
                        onClose={handleClose4}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        onKeyPress={(e) => testKey4(e)}
                    >
                        <DialogTitle id="alert-dialog-title">{"Bạn có muốn khôi phục đơn hàng này?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description" style={{ textAlign: 'center', color: 'black' }}>Xác nhận khôi phục đơn hàng: {rowfromtable.MaDatHang}!</DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose_KhongSua4} style={{ padding: '6px 16px', backgroundColor: 'rgb(255, 193, 7)', margin: '15px', borderRadius: '8px', color: 'rgb(0, 0, 0)', width: '50%' }}>
                                Không
                            </Button>
                            <Button onClick={handleClose_Sua4} style={{ padding: '6px 16px', backgroundColor: 'rgb(0, 171, 85)', margin: '15px', borderRadius: '8px', color: 'white', width: '50%' }}>
                                Có
                            </Button>
                        </DialogActions>
                    </Dialog>

                    {/* dialog thêm sản phẩm */}

                    <Dialog
                        open={open3}
                        onClose={handleClose3}
                        fullWidth={true}
                        maxWidth={'lg'}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        onKeyPress={(e) => testKey(e)}
                    >
                        <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center' }}>
                            <b>THÊM SẢN PHẨM</b>
                            <div className='phantrang' style={{ height: 60 }}>
                                <Pagination callBackSanPham={LayGiaTriPagination} TongSoSP={datasize} Sotrang={sotrang}></Pagination>
                            </div>
                        </DialogTitle>
                        <DialogContent style={{ height: (window.innerHeight - 150) }}>
                            <div className='giohang'>

                                <div className='chiadoi212'>
                                    <div className='MuiGrid-root style_quick_order_wrapper__Q49yM MuiGrid-item MuiGrid-grid-sm-8'>
                                        <div className='search-product-parent1' >
                                            {/* <img height="22" width="22" src={search_img} className="img_search1"></img> */}

                                            <div  >

                                                <ReactSearchAutocomplete
                                                    items={input}
                                                    id="autocomplete"
                                                    onSearch={handleOnSearch}
                                                    showIcon={false}
                                                    //onHover={handleOnHover}
                                                    onSelect={handleOnSelect}
                                                    //onFocus={handleOnFocus}
                                                    onClear={handleOnClear}
                                                    maxResults={0}
                                                    autoFocus
                                                    placeholder="Tìm Kiếm"
                                                    inputSearchString={searchString}
                                                    fuseOptions={{
                                                        shouldSort: true,
                                                        threshold: 0.0,
                                                        // location: 0,
                                                        // distance: 100,
                                                        ignoreLocation: true,
                                                        maxPatternLength: 32,
                                                        minMatchCharLength: 2,
                                                        keys: ["TenHang", "HoatChat", "HangSX"]
                                                    }}
                                                    resultStringKeyName="linkhinh"
                                                    // formatResult={formatResult}
                                                    formatResult={(item) => {

                                                        let mangItem = item.split("*")

                                                        return (
                                                            <div className="item_search_parent_trangchu">
                                                                <div className="item_search_image">
                                                                    <img src={mangItem[0]} style={{ width: 50, height: 50 }} onError={handleImgError}></img>
                                                                </div>
                                                                <div className="item_search_name">{mangItem[1]} </div>
                                                                <div className="item_search_price" style={{ border: 'none', color: 'red' }}> {parseInt(mangItem[2]).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} </div>
                                                            </div>
                                                        );

                                                    }}
                                                    styling={{
                                                        height: "44px",
                                                        border: "1px solid #dfe1e5",
                                                        borderRadius: "24px",
                                                        backgroundColor: "white",
                                                        boxShadow: "rgba(32, 33, 36, 0.28) 0px 1px 6px 0px",
                                                        hoverBackgroundColor: "#eee",
                                                        color: "#212121",
                                                        fontSize: "16px",
                                                        fontFamily: "Arial",
                                                        iconColor: "grey",
                                                        lineColor: "rgb(232, 234, 237)",
                                                        placeholderColor: "grey",
                                                        clearIconMargin: '3px 14px 0 0',
                                                        searchIconMargin: '0 0 0 16px',
                                                        // zIndex: "9999"
                                                        // zIndex: "9999"
                                                        overflowX: 'hidden'
                                                    }}
                                                />
                                            </div>

                                        </div>
                                        {
                                            data.map((x, i) => {
                                                var vND = x.GiaBan.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                                                return (
                                                    <div className='styles_button_container__XXQXT'>
                                                        <div className='styles_root_card__1L12l'>
                                                            <div className='MuiPaper-root MuiCard-root styles_product_card__2dzJF styles_isdeal__qgZaj MuiPaper-elevation1 MuiPaper-rounded1'>

                                                                <div className="styles_product_image__1xSGk">
                                                                    <button className="MuiButtonBase-root123 MuiCardActionArea-root" type="button">
                                                                        <p className='jss2 jss216'>
                                                                            <div style={{ display: 'inline-block', maxWidth: "100%", overflow: 'hidden', position: 'relative', boxSizing: 'border-box', margin: 0 }}>
                                                                                <div className='tulam'>
                                                                                    <p>
                                                                                        {x.HinhAnh == null ? <img src={image_default} width='120' height='120' ></img> : <img src={x.HinhAnh} onError={handleImgError} width='120' height="120"></img>}
                                                                                        {/* <img src={x.HinhAnh} width='70%' ></img> */}
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </p>
                                                                    </button>
                                                                </div>

                                                                <div className='MuiCardContent-root undefined
styles_product_content__2subj styles_product_content_column__Dwv2P'>
                                                                    <div className='styles_product_title_wrap__2vYiH styles_product_title_column_wrap__1y0Ja'>
                                                                        <div className='styles_product_title__3bXWL'>
                                                                            <p>
                                                                                <h2 className="MuiTypography-root styles_product_name__3QmYl MuiTypography-h5 MuiTypography-gutterBottom">
                                                                                    {x.TenHang}
                                                                                </h2>
                                                                            </p>

                                                                            <div className='an-hien' style={{ display: 'flex', flexWrap: 'wrap' }}>

                                                                                {
                                                                                    x.HDnhanh == 1 ?
                                                                                        <Link to='/'>
                                                                                            <div className='MuiBox-root jss493 tag_tagContainer__1akLh'>
                                                                                                <img src="https://img.icons8.com/material-rounded/2x/26e07f/fast-cart.png" alt="Girl in a jacket" width="20" height="20" />

                                                                                                <p className='MuiTypography-root MuiTypography-body454'>
                                                                                                    Hóa đơn nhanh
                                                                                                </p>
                                                                                            </div>
                                                                                        </Link>
                                                                                        : null
                                                                                }
                                                                                {
                                                                                    x.BanChay == 1 ?
                                                                                        <Link to='/'>
                                                                                            <div className='MuiBox-root jss493 tag_tagContainer__1akLh1'>
                                                                                                <img src="https://img.icons8.com/material-sharp/2x/26e07f/facebook-like.png" alt="Girl in a jacket" width="20" height="20" />
                                                                                                <p className='MuiTypography-root MuiTypography-body11'>Bán chạy</p>
                                                                                            </div>
                                                                                        </Link>
                                                                                        : null
                                                                                }
                                                                                {
                                                                                    x.SPmoi == 1 ?
                                                                                        <Link to='/'>
                                                                                            <div className='MuiBox-root jss493 tag_tagContainer__1akLh12'>
                                                                                                <img src="https://img.icons8.com/fluent-systems-filled/2x/4a90e2/electricity.png" alt="Girl in a jacket" width="20" height="20" />
                                                                                                <p className='MuiTypography-root MuiTypography-body123'>Sản phẩm mới</p>
                                                                                            </div>
                                                                                        </Link>
                                                                                        : null
                                                                                }
                                                                                {
                                                                                    x.GHnhanh == 1 ?
                                                                                        <Link to='/'>
                                                                                            <div className='MuiBox-root jss493 tag_tagContainer__1akLh'>
                                                                                                <img src="https://img.icons8.com/fluent-systems-filled/2x/26e07f/fast-cart.png" alt="Girl in a jacket" width="20" height="20" />
                                                                                                <p className='MuiTypography-root MuiTypography-body454'>Giao nhanh</p>
                                                                                            </div>
                                                                                        </Link>
                                                                                        : null
                                                                                }
                                                                                {
                                                                                    x.SVip == 1 ?
                                                                                        <Link to='/'>
                                                                                            <div className='MuiBox-root jss493 tag_tagContainer__1akLh2'>
                                                                                                <img src="https://img.icons8.com/material-rounded/2x/star.png" alt="Girl in a jacket" width="20" height="20" />
                                                                                                <p className='MuiTypography-root MuiTypography-body2'>Sĩ Vip</p>
                                                                                            </div>
                                                                                        </Link>
                                                                                        : null
                                                                                }
                                                                                {
                                                                                    x.NhiKhoa == 1 ?
                                                                                        <Link to='/'>
                                                                                            <div className='MuiBox-root jss493 tag_tagContainer__1akLh3'>
                                                                                                <img src="https://img.icons8.com/ios-glyphs/2x/fa314a/plus-math.png" alt="Girl in a jacket" width="20" height="20" />
                                                                                                <p className='MuiTypography-root MuiTypography-body3'>Nhi Khoa</p>
                                                                                            </div>
                                                                                        </Link>
                                                                                        : null
                                                                                }
                                                                                {
                                                                                    x.FlashSale == 1 ?
                                                                                        <Link to='/'>
                                                                                            <div className='MuiBox-root jss493 tag_tagContainer__1akLh4'>
                                                                                                <img src="https://pngimg.com/uploads/lightning/lightning_PNG51.png" alt="Girl in a jacket" width="20" height="20" />
                                                                                                <p className='MuiTypography-root MuiTypography-body4'>Flash sale</p>
                                                                                            </div>
                                                                                        </Link>
                                                                                        : null
                                                                                }
                                                                                {
                                                                                    x.NhaKhoa == 1 ?
                                                                                        <Link to='/'>
                                                                                            <div className='MuiBox-root jss493 tag_tagContainer__1akLh5'>
                                                                                                <img src="http://benhviendongdo.com.vn/wp-content/uploads/2018/04/icon-rang-ham-mat.png" alt="Girl in a jacket" width="20" height="20" />
                                                                                                <p className='MuiTypography-root MuiTypography-body5'>Nha Khoa</p>
                                                                                            </div>
                                                                                        </Link>
                                                                                        : null
                                                                                }
                                                                                {
                                                                                    x.SanKhoa == 1 ?
                                                                                        <Link to='/'>
                                                                                            <div className='MuiBox-root jss493 tag_tagContainer__1akLh6'>
                                                                                                <img src="https://goldenhealthcarevn.com/wp-content/uploads/2019/03/ICON-GOLDEN-08.png" alt="Girl in a jacket" width="20" height="20" />
                                                                                                <p className='MuiTypography-root MuiTypography-body6'>Sản Khoa</p>
                                                                                            </div>
                                                                                        </Link>
                                                                                        : null
                                                                                }
                                                                                {
                                                                                    x.DaLieu == 1 ?
                                                                                        <Link to='/'>
                                                                                            <div className='MuiBox-root jss493 tag_tagContainer__1akLh7'>
                                                                                                <img src="http://benhviendongdo.com.vn/wp-content/uploads/2018/04/icon-khoa-da-lieu.png" alt="Girl in a jacket" width="20" height="20" />
                                                                                                <p className='MuiTypography-root MuiTypography-body7'>Da Liễu</p>
                                                                                            </div>
                                                                                        </Link>
                                                                                        : null
                                                                                }
                                                                                {
                                                                                    x.NTHop == 1 ?
                                                                                        <Link to='/'>
                                                                                            <div className='MuiBox-root jss493 tag_tagContainer__1akLh5'>

                                                                                                <p className='MuiTypography-root MuiTypography-body5'>Nội Tổng Hợp</p>
                                                                                            </div>
                                                                                        </Link>
                                                                                        : null
                                                                                }
                                                                                {
                                                                                    x.ThanKinh == 1 ?
                                                                                        <Link to='/'>
                                                                                            <div className='MuiBox-root jss493 tag_tagContainer__1akLh8'>

                                                                                                <img src="http://www.benhvientiengiang.com.vn/Media/images/icons/Noi%20than%20kinh.png" alt="Girl in a jacket" width="20" height="20" />
                                                                                                <p className='MuiTypography-root MuiTypography-body8'>Thần Kinh</p>
                                                                                            </div>
                                                                                        </Link>
                                                                                        : null
                                                                                }
                                                                                {
                                                                                    x.BV == 1 ?
                                                                                        <Link to='/'>
                                                                                            <div className='MuiBox-root jss493 tag_tagContainer__1akLh5'>

                                                                                                <p className='MuiTypography-root MuiTypography-body5'>Bệnh Viện/Phòng Khám</p>
                                                                                            </div>
                                                                                        </Link>
                                                                                        : null
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                        <p className="MuiTypography-root1 styles_product_type__1tqQT styles_muted__2X-Mq styles_align_center__2QUXd MuiTypography-body2 MuiTypography-colorTextSecondary">{x.QCDG}</p>
                                                                        {
                                                                            x.ConLai < 300 ?
                                                                                x.ConLai <= 0 ?
                                                                                    <p className="MuiTypography-root1" style={{ fontSize: 14, fontWeight: 'bold', color: '#dc3545' }}>Sản phẩm tạm hết hàng </p>
                                                                                    :
                                                                                    <p className="MuiTypography-root1" style={{ fontSize: 14, fontWeight: 'bold', color: '#dc3545' }}>Tồn đầu: {x.TonKho}. Đã xử lý: {x.DaDat}. Tồn sau:  {x.ConLai} </p>
                                                                                :
                                                                                <p className="MuiTypography-root1" style={{ fontSize: 14, fontWeight: 'bold', color: '#dc3545' }}>Tồn đầu: {x.TonKho}. Đã xử lý: {x.DaDat}. Tồn sau:  {x.ConLai} </p>
                                                                        }
                                                                        <p className="tien-rps">{vND}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="styles_price_wrapper__1h180 styles_price_wrapper_column__IsTDU3">
                                                                    <p className="MuiTypography-root styles_deal_price__C0JjD1 MuiTypography-body1">{vND}</p>
                                                                </div>
                                                                {
                                                                    x.ConLai > 0 ?
                                                                        <div className='MuiCardActions-root styles_product_action__1Zos7 styles_product_action_column__gjQ3o1 MuiCardActions-spacing'>
                                                                            <button onClick={() => down(x.MaHang)} className="MuiButtonBase-root MuiIconButton-root styles_button_root__3mGap styles_button_root_minus__2gTtR styles_minus__ysCNs" type="button">
                                                                                <span className="MuiIconButton-label">
                                                                                    <svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" >
                                                                                        <path d="M19 13H5v-2h14v2z"></path>
                                                                                    </svg>
                                                                                </span>
                                                                                <span className="MuiTouchRipple-root"></span>
                                                                            </button>
                                                                            <div className="MuiInputBase-root MuiInput-root styles_root_input__2PM1z styles_has_item__tqSHX">
                                                                                <input value={x.SoLuong} onChange={value => { nhapTaySoLuong(x.MaHang, parseInt(value.target.value)) }} name="cart-MEDX.LAC-SAN-009" placeholder="0" width='100%' type="DEAL" className="MuiInputBase-input MuiInput-input styles_input__3lyzY" />
                                                                            </div>
                                                                            <button onClick={() => up(x.MaHang)} className="MuiButtonBase-root MuiIconButton-root styles_button_root__3mGap styles_plus__ia9cs" type="button">
                                                                                <span className="MuiIconButton-label">
                                                                                    <svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                                                                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                                                                                    </svg>
                                                                                </span>
                                                                                <span className="MuiTouchRipple-root"></span>
                                                                            </button>
                                                                        </div>
                                                                        :
                                                                        <div className='MuiCardActions-root styles_product_action__1Zos7 styles_product_action_column__gjQ3o1 MuiCardActions-spacing'>
                                                                            <button disabled style={{ display: "none" }} className="MuiButtonBase-root MuiIconButton-root styles_button_root__3mGap styles_button_root_minus__2gTtR styles_minus__ysCNs" type="button">
                                                                                <span className="MuiIconButton-label">
                                                                                    <svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" >
                                                                                        <path d="M19 13H5v-2h14v2z"></path>
                                                                                    </svg>
                                                                                </span>
                                                                                <span className="MuiTouchRipple-root"></span>
                                                                            </button>
                                                                            <div className="MuiInputBase-root MuiInput-root styles_root_input__2PM1z styles_has_item__tqSHX">
                                                                                <input disabled name="cart-MEDX.LAC-SAN-009" placeholder="0" width='100%' type="DEAL" className="MuiInputBase-input MuiInput-input styles_input__3lyzY" />
                                                                            </div>
                                                                            <button disabled style={{ display: "none" }} className="MuiButtonBase-root MuiIconButton-root styles_button_root__3mGap styles_plus__ia9cs" type="button">
                                                                                <span className="MuiIconButton-label">
                                                                                    <svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                                                                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                                                                                    </svg>
                                                                                </span>
                                                                                <span className="MuiTouchRipple-root"></span>
                                                                            </button>
                                                                        </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>

                                    <div className="MuiGrid-root style_mini_cart_rightside_wrapper__3qGvO MuiGrid-item MuiGrid-grid-sm-4 cvcc">
                                        <div className='neolai'>
                                            <h3>Sản phẩm đã thêm</h3>
                                        </div>
                                        <div className='neolai'>
                                            <div className="neolai_con" style={{ height: (window.innerHeight - 170) }}>
                                                {showSanPhamChon.map((item, i) => {
                                                    var vND = (item.GiaBan - (item.GiaBan * item.PhanTramKM / 100)).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                                                    var tongTien = (item.GiaBan - (item.GiaBan * item.PhanTramKM / 100)) * item.SoLuong
                                                    var vNDTT = tongTien.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                                                    return (
                                                        item.SoLuong > 0 ?
                                                            <div className='order_review1'>

                                                                <button className='hove-xoa' style={{ width: 30, backgroundColor: '#fff', backgroundRepeat: 'no-repeat', border: 'none', cursor: 'pointer', marginTop: 10 }}
                                                                    onClick={() => deletetheitem(i, item.MaHang)}>
                                                                    <img src='https://img.icons8.com/ios/2x/fa314a/delete-trash.png' width='20' height='20'></img>
                                                                </button>
                                                                <p className='sanpham' style={{ textAlign: 'justify', fontSize: 12 }}> {item.TenHang} </p>
                                                                <div className='tam-tinh3' style={{ fontSize: 12 }}><h3>{item.SoLuong}</h3></div>
                                                                <div className='tam-tinh' style={{ fontSize: 12 }}><h3>{vND}</h3></div>
                                                                <div className='tam-tinh' style={{ fontSize: 12 }}><h3> {vNDTT} </h3></div>
                                                            </div>
                                                            : null
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose_KhongSua3} color="primary" style={{ padding: '6px 16px', backgroundColor: 'rgb(255, 193, 7)', borderRadius: '8px', color: 'rgb(0, 0, 0)', margin: '15px' }}>Không</Button>
                            <Button onClick={handleClose_Sua3} color="primary" style={{ padding: '6px 16px', backgroundColor: 'rgb(0, 171, 85)', borderRadius: '8px', color: 'white', margin: '15px' }}>Có</Button>
                        </DialogActions>
                    </Dialog>
                </div>
                :
                <div>
                    {checkbutton ? <button onClick={() => check()} style={{ fontSize: 18 }}>Check Đơn Hàng</button> : null}
                    {checkdonhang === 1 ?
                        <div>
                            <div>
                                <div className='DHO_TKDH'>
                                    <div className='DHO-nua-trai'>
                                        <h3>Thông tin khách hàng</h3>
                                        <div className='aa'>
                                            <div className='phanchia'>
                                                <label for="billing_first_name">Tên&nbsp;
                                                    <abbr className="required" title="bắt buộc">*</abbr>
                                                </label>
                                                {
                                                    hienNutSuaDonHang ?
                                                        <input style={{ fontSize: 16 }} type="text" className="input-text " value={tenKH} onChange={text => { setTenKH(text.target.value) }} />
                                                        :
                                                        <input disabled style={{ fontSize: 16 }} type="text" className="input-text " value={tenKH} />
                                                }


                                            </div>
                                            <div className='phanchia'>
                                                <label for="billing_first_name">Số điện thoại&nbsp;
                                                    <abbr className="required" title="bắt buộc">*</abbr>
                                                </label>
                                                {
                                                    hienNutSuaDonHang ?
                                                        <input style={{ fontSize: 16 }} type="text" className="input-text " value={sDT} onChange={text => { setSDT(text.target.value) }} />
                                                        :
                                                        <input disabled style={{ fontSize: 16 }} type="text" className="input-text " value={sDT} />
                                                }

                                            </div>
                                            <div className='phanchia'>
                                                <label for="billing_first_name">Địa chỉ email (tùy chọn) &nbsp;</label>
                                                {
                                                    hienNutSuaDonHang ?
                                                        <input style={{ fontSize: 16 }} type="text" className="input-text " value={email} onChange={text => { setEmail(text.target.value) }} />
                                                        :
                                                        <input disabled style={{ fontSize: 16 }} type="text" className="input-text " value={email} />
                                                }
                                            </div>
                                        </div>
                                        <div className='phanchia2'>
                                            <label for="billing_first_name">Địa chỉ&nbsp;
                                                <abbr className="required" title="bắt buộc">*</abbr>
                                            </label>
                                            {
                                                hienNutSuaDonHang ?
                                                    <input style={{ fontSize: 16 }} type="text" className="input-text " value={diaChi} onChange={text => { setDiaChi(text.target.value) }} />
                                                    :
                                                    <input disabled style={{ fontSize: 16 }} type="text" className="input-text " value={diaChi} />
                                            }
                                        </div>
                                        <div className='input_remove_arrow phanchia2'>
                                            <div className='phanchia'>
                                                <label for="billing_first_name">Khách đã trả&nbsp;
                                                    <abbr className="required" title="bắt buộc">*</abbr>
                                                </label>
                                                <div style={{ flexWrap: 'wrap', width: '100%', display: 'flex' }}>
                                                    {
                                                        hienNutSuaDonHang ?
                                                            <input style={{ fontSize: 16, width: '70%' }} type="number" className="input-text " value={khachDaTra} onChange={text => { setKhachDaTra(parseFloat(text.target.value)) }} />
                                                            :
                                                            <input disabled style={{ fontSize: 16, width: '70%' }} type="number" className="input-text " value={khachDaTra} />
                                                    }
                                                    <p style={{ fontSize: 16, fontWeight: 'bold', width: '20%', marginLeft: 15, alignSelf: 'center', top: 5 }} >{khachDaTra.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ marginTop: 10 }}>
                                            {datakm.map((item, index) => {
                                                let deadline = item.ThoiHan;
                                                var DieuKien = (item.DieuKien).toLocaleString('it-IT', { style: 'currency', currency: 'VND' });

                                                if (item.LoaiKM == 'Tiền') {
                                                    var MoneyConvert = Intl.NumberFormat().format(item.TenQua)
                                                }
                                                // if(index==0 && (item.DieuKien > tongTienDonHang)){
                                                //     hamgigido()      
                                                // }
                                                if (item.DieuKien < tongTienDonHang) {

                                                    return (

                                                        <button className={`btn ${selectedbtn === index ? 'tien-thuong2' : 'tien-thuong'}`}
                                                            onClick={() => {
                                                                setSelectedbtn(index)

                                                                if (item.LoaiKM == 'Tiền') {
                                                                    setTienmagiamgia(parseInt(item.TenQua))
                                                                    setQuatang("*Không có quà tặng*")


                                                                }
                                                                else {
                                                                    setQuatang(item.TenQua);
                                                                    setTienmagiamgia(0)

                                                                }

                                                            }}
                                                        >
                                                            {item.LoaiKM == 'Tiền' ?
                                                                <div>
                                                                    <b style={{ fontSize: 16 }} >
                                                                        Giảm: <b style={{ color: '#fdbe07', fontWeight: 'bolder', textShadow: '0px 1px 1px gray', marginLeft: 5 }}> {MoneyConvert} </b>
                                                                    </b>
                                                                    <br />
                                                                    <b style={{ fontSize: 16 }} >
                                                                        cho đơn hàng:
                                                                    </b>
                                                                    <br />
                                                                    <b />
                                                                    <b style={{ color: '#00b46e', fontWeight: 'bolder', fontSize: 16, textShadow: '0px 1px 1px black' }} >
                                                                        {DieuKien}
                                                                    </b>
                                                                </div>
                                                                :
                                                                <div>
                                                                    <b style={{ fontSize: 16 }} >
                                                                        Tặng: <b style={{ color: '#fdbe07', fontWeight: 'bolder', textShadow: '0px 1px 1px gray', marginLeft: 5 }}>{(item.TenQua).toUpperCase()}</b>
                                                                    </b>
                                                                    <br />
                                                                    <b style={{ fontSize: 16 }} >
                                                                        cho đơn hàng:
                                                                    </b>
                                                                    <br />
                                                                    <b />
                                                                    <b style={{ color: '#00b46e', fontWeight: 'bolder', fontSize: 16, textShadow: '0px 1px 1px black' }} >
                                                                        {DieuKien}D
                                                                    </b>
                                                                </div>
                                                                //  <p style={{ width: '100%', fontWeight: 'bold' }} className="item_name_gift_ttdh">Tặng <b style={{ color: 'red', fontWeight: 'bolder', textShadow: '0px 1px 1px gray' }}>{(item.TenQua).toUpperCase()}</b> cho đơn hàng <b style={{ color: 'yellow', fontWeight: 'bolder', fontSize: 18, textShadow: '0px 1px 1px black' }}>{DieuKien}</b></p>
                                                            }
                                                        </button>

                                                    );
                                                }

                                            })}
                                        </div>

                                        <div className='phanchia12'>
                                            <label for="billing_first_name">Mã người bán&nbsp;
                                                <abbr className="required" title="bắt buộc">*</abbr>
                                            </label>
                                            {
                                                hienNutSuaDonHang ?
                                                    <Autocomplete
                                                        freeSolo
                                                        className="input-text1"
                                                        clearOnEscape
                                                        clearOnBlur
                                                        autoComplete
                                                        options={manbsg.map((option) => option.value)}
                                                        onChange={handleSubmitManv}
                                                        value={maNguoiBan}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                margin="normal"
                                                                aria-label="enter search"
                                                                name="search"
                                                                className='bodi'
                                                            />
                                                        )}>
                                                    </Autocomplete>
                                                    :
                                                    <Autocomplete
                                                        disabled
                                                        freeSolo
                                                        className="input-text1"
                                                        clearOnEscape
                                                        clearOnBlur
                                                        autoComplete
                                                        options={manbsg.map((option) => option.value)}
                                                        onChange={handleSubmitManv}
                                                        value={maNguoiBan}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                margin="normal"
                                                                aria-label="enter search"
                                                                name="search"
                                                                className='bodi'
                                                            />
                                                        )}>
                                                    </Autocomplete>
                                            }
                                        </div>
                                        <div className='phanchia12'>
                                            <label for="billing_first_name">Ghi chú đơn hàng&nbsp;
                                            </label>
                                            {
                                                hienNutSuaDonHang ?
                                                    <input style={{ fontSize: 16 }} type="text" className="input-text " value={ghiChu} onChange={text => { setGhiChu(text.target.value) }} />
                                                    :
                                                    <input disabled style={{ fontSize: 16 }} type="text" className="input-text " value={ghiChu} />
                                            }
                                        </div>
                                        {
                                            hienNutSuaDonHang ?
                                                <div className='phanchia2'>
                                                    {/* <input className="submit" type="button" value="Hoàn tác sửa đổi" onClick={() => hoanTacSuaDoiThongTinKH()} style={{ fontSize: 15, width: 'auto', padding: '15px', background: '#f5af19' }}></input>&nbsp;&nbsp; */}
                                                    {/* <input className="submit" type="button" value="Lưu sửa đổi" onClick={() => luuThongTinKH()} style={{ fontSize: 15, width: 'auto', padding: '15px', background: '#4286f4' }}></input> */}
                                                    {
                                                        boolChuaLuuDonHang ?
                                                            <p style={{ fontSize: 18, fontWeight: 'bold', color: 'red', marginLeft: '600px' }}>Chú ý! Đơn hàng vẫn chưa lưu thay đổi!!!</p>
                                                            :
                                                            null
                                                    }
                                                </div> :
                                                null
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='don'>
                                <div className='order_review' style={{ width: '75%', height: 50 }}>
                                    <div className='tam-tinhsuadon5' style={{ textAlign: 'center' }}><h3>Xóa</h3></div>
                                    <div className='tam-tinhsuadon5' style={{ textAlign: 'center' }}><h3>STT</h3></div>
                                    <div className='tam-tinhsuadon4' style={{ textAlign: 'center' }}><h3>Mã hàng</h3></div>
                                    <div className='tam-tinhsuadon3' style={{ textAlign: 'center' }}><h3>Tên hàng</h3></div>
                                    <div className='tam-tinhsuadon3' style={{ textAlign: 'center' }}><h3>Loại hàng</h3></div>
                                    <div className='tam-tinhsuadon1' style={{ textAlign: 'center' }}><h3>ĐVT</h3></div>
                                    <div className='tam-tinh3' style={{ textAlign: 'center' }}><h3>Số lượng </h3></div>
                                    <div className='tam-tinhsuadon1' style={{ textAlign: 'center' }}><h3>Tồn đầu </h3></div>
                                    <div className='tam-tinhsuadon1' style={{ textAlign: 'center' }}><h3>Đã xử lý </h3></div>
                                    <div className='tam-tinhsuadon1' style={{ textAlign: 'center' }}><h3>Tồn cuối</h3></div>
                                    <div className='tam-tinhsuadon2' style={{ textAlign: 'center' }}><h3>Đơn giá</h3></div>
                                    <div className='tam-tinhsuadon4' style={{ textAlign: 'center' }}><h3>% CK</h3></div>
                                    <div className='tam-tinhsuadon2' style={{ textAlign: 'center' }}><h3>Thành tiền</h3></div>
                                </div>
                                {
                                    chiTietDonHang.map((item, i) => {
                                        const vNDThanhTien = item.ThanhTien.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                                        let checkCombo = false
                                        if (item.DVT.indexOf('COMBO_') >= 0) {
                                            checkCombo = true
                                        }
                                        return (
                                            <div className='order_review1' style={{ width: '75%', fontSize: 12 }}>
                                                {
                                                    !tatSuaChiTietDonHang ?
                                                        <div className='tam-tinhsuadon5'>
                                                            <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                                                <button style={{ backgroundColor: 'transparent', backgroundRepeat: 'no-repeat', border: 'none', cursor: 'pointer', marginTop: 10 }}
                                                                    onClick={() => xoa1SanPhamCuaChiTietDonHang(item)}>
                                                                    <img src='https://img.icons8.com/ios/2x/fa314a/delete-trash.png' width='20' height='20'></img>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        :
                                                        <div className='tam-tinhsuadon5'>
                                                            <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                                                <button disabled style={{ backgroundColor: 'transparent', backgroundRepeat: 'no-repeat', border: 'none' }}>
                                                                    <img src='https://img.icons8.com/ios/2x/fa314a/delete-trash.png' width='20' height='20'></img>
                                                                </button>
                                                            </div>
                                                        </div>
                                                }
                                                <div className='tam-tinhsuadon5'>
                                                    <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                                        <h3>{(i + 1)}</h3>
                                                    </div>
                                                </div>
                                                <div className='tam-tinhsuadon4'>
                                                    <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                                        <h3>{item.MaHang}</h3>
                                                    </div>
                                                </div>
                                                <div className='tam-tinhsuadon3'>
                                                    <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                                        <h3>{item.TenHang}</h3>
                                                    </div>
                                                </div>
                                                <div className='tam-tinhsuadon3'>
                                                    <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                                        <h3>{item.NhanhHang}</h3>
                                                    </div>
                                                </div>
                                                <div className='tam-tinhsuadon1'>
                                                    <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                                        <h3>{item.DVT}</h3>
                                                    </div>
                                                </div>

                                                {
                                                    !tatSuaChiTietDonHang ?
                                                        <div className='input_remove_arrow tam-tinh3'>
                                                            <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                                                <button onClick={() => giamSoLuong(item.MaHang)} style={{ fontSize: 18, padding: 5, backgroundColor: '#fdbe07', borderRadius: 20, width: 30, height: 30, alignSelf: 'center', textAlign: 'center', border: 'none', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>-</button> &nbsp;
                                                                <input onKeyPress={(e) => testKey6(e)} style={{ border: 'none', fontSize: 15, alignSelf: 'center', textAlign: 'center', fontWeight: 'bold' }} className='so' type='number' value={item.SoLuong} onChange={value => { suaSoLuong(item.MaHang, parseInt(value.target.value)) }} /> &nbsp;
                                                                <button onClick={() => tangSoLuong(item.MaHang)} style={{ fontSize: 18, padding: 5, backgroundColor: '#fdbe07', borderRadius: 20, width: 30, height: 30, alignSelf: 'center', textAlign: 'center', border: 'none', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }} >+</button>
                                                            </div>
                                                        </div>
                                                        :
                                                        <div className='input_remove_arrow tam-tinh3'>
                                                            <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                                                <button disabled style={{ fontSize: 18, padding: 5, backgroundColor: '#fdbe07', borderRadius: 20, width: 30, height: 30, alignSelf: 'center', textAlign: 'center', border: 'none', color: '#fff', fontWeight: 'bold' }}>-</button> &nbsp;
                                                                <input style={{ border: 'none', fontSize: 15, alignSelf: 'center', textAlign: 'center', fontWeight: 'bold' }} className='so' type='number' value={item.SoLuong} disabled /> &nbsp;
                                                                <button disabled style={{ fontSize: 18, padding: 5, backgroundColor: '#fdbe07', borderRadius: 20, width: 30, height: 30, alignSelf: 'center', textAlign: 'center', border: 'none', color: '#fff', fontWeight: 'bold' }} >+</button>
                                                            </div>
                                                        </div>
                                                }
                                                <div className='input_remove_arrow tam-tinhsuadon1'>
                                                    <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                                        <h3>{item.TonKho}</h3>
                                                    </div>
                                                </div>
                                                <div className='input_remove_arrow tam-tinhsuadon1'>
                                                    <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                                        <h3>{item.DaDat}</h3>
                                                    </div>
                                                </div>
                                                <div className='input_remove_arrow tam-tinhsuadon1'>
                                                    <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                                        <h3>{item.ConLai}</h3>
                                                    </div>
                                                </div>
                                                {
                                                    !tatSuaChiTietDonHang ?
                                                        <div className='tam-tinhsuadon2'>
                                                            <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'end', paddingRight: 7 }}>
                                                                <input style={{ border: 'none', textAlign: 'right', fontSize: 15, width: 100, marginBottom: 2, fontWeight: 'bold' }} className='so' type='number' value={item.DonGia} onChange={value => { suaDonGia(item.MaHang, parseFloat(value.target.value)) }} disabled={checkCombo} /> &nbsp;&nbsp;&nbsp;
                                                                <b style={{ fontSize: 15, alignSelf: 'center' }}>VND</b>
                                                            </div>
                                                        </div>
                                                        :
                                                        <div className='tam-tinhsuadon2'>
                                                            <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'end', paddingRight: 7 }}>
                                                                <input disabled style={{ border: 'none', textAlign: 'right', fontSize: 15, width: 100, marginBottom: 2, fontWeight: 'bold' }} className='so' type='number' value={item.DonGia} /> &nbsp;&nbsp;&nbsp;
                                                                <b style={{ fontSize: 15, alignSelf: 'center' }}>VND</b>
                                                            </div>
                                                        </div>
                                                }
                                                <div className='tam-tinhsuadon4'>
                                                    <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                                        <b style={{ fontSize: 15, alignSelf: 'center', fontWeight: 'bold' }}>{item.ChietKhau}</b>
                                                    </div>
                                                </div>
                                                <div className='tam-tinhsuadon2'>
                                                    <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'end', paddingRight: 7 }}>
                                                        <b style={{ fontSize: 15, alignSelf: 'center' }}>{vNDThanhTien}</b>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <div className='order_review1' style={{ width: '75%', backgroundColor: '#f2f2f2' }}>
                                    <div style={{ width: '38%', textAlign: 'left', flexWrap: 'wrap', padding: 5, margin: 'auto', borderLeftWidth: 3, borderColor: '#ececec', alignSelf: 'center', fontSize: 12, paddingLeft: 7 }}><h3>Tổng tiền hàng</h3></div>
                                    <div style={{ width: '17%', textAlign: 'center', flexWrap: 'wrap', padding: 5, margin: 'auto', borderLeftWidth: 3, borderColor: '#ececec', alignSelf: 'center', fontSize: 12 }}><h3>{tongSLSPCTDH}</h3></div>

                                    <div style={{ width: '48%', textAlign: 'right', flexWrap: 'wrap', padding: 5, margin: 'auto', borderLeftWidth: 3, borderColor: '#ececec', alignSelf: 'center', fontSize: 12, paddingRight: 7 }}><h3>{strTTCTDH}</h3></div>
                                </div>
                                <div className='order_review1' style={{ width: '75%', backgroundColor: '#f2f2f2' }}>
                                    <div style={{ width: '38%', textAlign: 'left', flexWrap: 'wrap', padding: 5, margin: 'auto', borderLeftWidth: 3, borderColor: '#ececec', alignSelf: 'center', fontSize: 12, paddingLeft: 7 }}><h3>Điểm thưởng</h3></div>
                                    <div style={{ width: '17%', textAlign: 'center', flexWrap: 'wrap', padding: 5, margin: 'auto', borderLeftWidth: 3, borderColor: '#ececec', alignSelf: 'center', fontSize: 12 }}><h3> </h3></div>
                                    <div style={{ width: '48%', textAlign: 'right', flexWrap: 'wrap', padding: 5, margin: 'auto', borderLeftWidth: 3, borderColor: '#ececec', alignSelf: 'center', fontSize: 12, paddingRight: 7 }}><h3>{(rowfromtable.TienDoiDiem).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</h3></div>
                                </div>
                                <div className='order_review1' style={{ width: '75%', backgroundColor: '#f2f2f2' }}>
                                    <div style={{ width: '38%', textAlign: 'left', flexWrap: 'wrap', padding: 5, margin: 'auto', borderLeftWidth: 3, borderColor: '#ececec', alignSelf: 'center', fontSize: 12, paddingLeft: 7 }}><h3>Khuyến mãi</h3></div>
                                    <div style={{ width: '17%', textAlign: 'center', flexWrap: 'wrap', padding: 5, margin: 'auto', borderLeftWidth: 3, borderColor: '#ececec', alignSelf: 'center', fontSize: 12 }}><h3> </h3></div>
                                    <div style={{ width: '48%', textAlign: 'right', flexWrap: 'wrap', padding: 5, margin: 'auto', borderLeftWidth: 3, borderColor: '#ececec', alignSelf: 'center', fontSize: 12, paddingRight: 7 }}><h3>{(tienmagiamgia).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</h3></div>
                                </div>
                                <div className='order_review1' style={{ width: '75%', backgroundColor: '#f2f2f2' }}>
                                    <div style={{ width: '38%', textAlign: 'left', flexWrap: 'wrap', padding: 5, margin: 'auto', borderLeftWidth: 3, borderColor: '#ececec', alignSelf: 'center', fontSize: 12, paddingLeft: 7 }}><h3>Quà tặng</h3></div>
                                    <div style={{ width: '17%', textAlign: 'center', flexWrap: 'wrap', padding: 5, margin: 'auto', borderLeftWidth: 3, borderColor: '#ececec', alignSelf: 'center', fontSize: 12 }}><h3> </h3></div>
                                    <div style={{ width: '48%', textAlign: 'right', flexWrap: 'wrap', padding: 5, margin: 'auto', borderLeftWidth: 3, borderColor: '#ececec', alignSelf: 'center', fontSize: 12, paddingRight: 7 }}><h3>{(quatang)}</h3></div>
                                </div>

                                {/* Rows show gift bunlde of combo */}

                                {
                                    arrCombo.map((item) => {

                                        return (
                                            <div className='order_review1' style={{ width: '75%', backgroundColor: '#f2f2f2' }}>
                                                <div style={{ width: '38%', textAlign: 'left', flexWrap: 'wrap', padding: 5, margin: 'auto', borderLeftWidth: 3, borderColor: '#ececec', alignSelf: 'center', fontSize: 12, paddingLeft: 7 }}><h3>{item.MaHang}</h3></div>
                                                <div style={{ width: '17%', textAlign: 'center', flexWrap: 'wrap', padding: 5, margin: 'auto', borderLeftWidth: 3, borderColor: '#ececec', alignSelf: 'center', fontSize: 12 }}><h3> </h3></div>
                                                <div style={{ width: '48%', textAlign: 'right', flexWrap: 'wrap', padding: 5, margin: 'auto', borderLeftWidth: 3, borderColor: '#ececec', alignSelf: 'center', fontSize: 12, paddingRight: 7 }}><h3>{item.NhanhHang}</h3></div>
                                            </div>
                                        )
                                    })
                                }

                                <div className='order_review1' style={{ width: '75%', backgroundColor: '#f2f2f2' }}>
                                    <div style={{ width: '38%', textAlign: 'left', flexWrap: 'wrap', padding: 5, margin: 'auto', borderLeftWidth: 3, borderColor: '#ececec', alignSelf: 'center', fontSize: 12, paddingLeft: 7 }}><h3>Tổng tiền phải trả</h3></div>
                                    <div style={{ width: '17%', textAlign: 'center', flexWrap: 'wrap', padding: 5, margin: 'auto', borderLeftWidth: 3, borderColor: '#ececec', alignSelf: 'center', fontSize: 12 }}><h3></h3></div>
                                    <div style={{ width: '48%', textAlign: 'right', flexWrap: 'wrap', padding: 5, margin: 'auto', borderLeftWidth: 3, borderColor: '#ececec', alignSelf: 'center', fontSize: 12, paddingRight: 7 }}><h3>{tienConLai()}</h3></div>
                                </div>
                                {
                                    hienNutSuaDonHang ?
                                        <div>
                                            <input className="submit" type="button" value="Hủy đơn hàng" onClick={handleClickOpen2} style={{ fontSize: 15, width: 'auto', padding: '15px', background: '#FF0000' }}></input>&nbsp;
                                            <input className="submit" type="button" value="Hoàn tác sửa đổi" onClick={() => hoanTacSuaChiTietDonHang()} style={{ fontSize: 15, width: 'auto', padding: '15px', background: '#f5af19' }}></input>&nbsp;
                                            <input className="submit" type="button" value="Thêm sản phẩm" onClick={() => themSanPham()} style={{ fontSize: 15, width: 'auto', padding: '15px' }}></input>&nbsp;
                                            <input className="submit" type="button" value="Lưu sửa đổi" onClick={() => luuSuaDoi(0)} style={{ fontSize: 15, width: 'auto', padding: '15px', background: '#4286f4' }}></input>&nbsp;
                                            {
                                                anXacNhanDonKhiLoadDH ?
                                                    null
                                                    :
                                                    <div>
                                                        <input className="submit" type="button" value="Xử lý đơn" onClick={kiemTraSoLuongVaConLai} style={{ fontSize: 15, width: 'auto', padding: '15px', background: '#1E9600' }}></input>&nbsp;
                                                        {/* <ExportReactCSV csvData={chiTietDonHang} fileName={rowfromtable.MaDatHang} />&nbsp; */}
                                                    </div>
                                            }

                                        </div> :
                                        hienNutKhoiPhucDon ?
                                            <div>
                                                <input className="submit" type="button" value="Khôi phục đơn" onClick={() => setOpen4(true)} style={{ fontSize: 15, width: 'auto', padding: '15px', background: '#1E9600' }}></input>&nbsp;
                                            </div> : null
                                }
                                {
                                    hienNutIn ?
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                            <input className="submit" type="button" value="Khách hủy đơn" onClick={handleClickOpen5} style={{ fontSize: 15, width: 'auto', padding: '15px', background: '#FF0000' }}></input>&nbsp;
                                            <input className="submit" type="button" value="Hoàn tác xử lý đơn" onClick={() => hoanTacXuLyDonHang()} style={{ fontSize: 15, width: 'auto', padding: '15px', background: '#4286f4' }}></input>&nbsp;
                                            {/* <input className="submit" type="button" value="Đã giao hàng" onClick={hoanThanhDon} style={{ fontSize: 15, width: 'auto', padding: '15px', background: '#1E9600' }}></input>&nbsp; */}
                                            <Link to={{ pathname: '/InHoaDon', state: { MaDatHang: rowfromtable.MaDatHang, tenNV: tenNV }, }}
                                                className="submit" type="button" style={{ fontSize: 15, textTransform: 'capitalize', width: 'auto', padding: '15px', background: '#636363' }}>In hóa đơn</Link>
                                            <div className='nut-inport'>
                                                <ExportReactCSV csvData={chiTietDonHang} fileName={rowfromtable.MaDatHang} />&nbsp;
                                            </div>

                                        </div>
                                        : null

                                }
                            </div>

                            {/* dialog xủ lý đơn hàng */}

                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                onKeyPress={(e) => testKey2(e)}
                            >
                                <DialogTitle id="alert-dialog-title">{"Bạn có muốn Xử lý đơn hàng này?"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description" style={{ textAlign: 'center', color: 'black' }}>Xác nhận xử lý đơn hàng: {rowfromtable.MaDatHang}!</DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose_KhongSua} style={{ padding: '6px 16px', backgroundColor: 'rgb(255, 193, 7)', margin: '15px', borderRadius: '8px', color: 'rgb(0, 0, 0)', width: '50%' }}>Không</Button>
                                    <Link onClick={handleClose_Sua} to={{ pathname: '/InHoaDon', state: { MaDatHang: rowfromtable.MaDatHang, tenNV: tenNV } }}
                                        className="submit" type="button" style={{ padding: '7px 16px', backgroundColor: 'rgb(0, 171, 85)', margin: '15px', borderRadius: '8px', color: 'white', width: '50%', textAlign: 'center' }}>Có</Link>
                                </DialogActions>
                            </Dialog>

                            {/* dialog hủy đơn hàng */}

                            <Dialog
                                open={open2}
                                onClose={handleClose2}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                onKeyPress={(e) => testKey3(e)}
                            >
                                <DialogTitle id="alert-dialog-title">{"Bạn có muốn hủy đơn hàng này?"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description" style={{ textAlign: 'center', color: 'black' }}>Xác nhận hủy đơn hàng: {rowfromtable.MaDatHang}!</DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose_KhongSua2} style={{ padding: '6px 16px', backgroundColor: 'rgb(255, 193, 7)', margin: '15px', borderRadius: '8px', color: 'rgb(0, 0, 0)', width: '50%' }}>Không</Button>
                                    <Button onClick={handleClose_Sua2} style={{ padding: '6px 16px', backgroundColor: 'rgb(0, 171, 85)', margin: '15px', borderRadius: '8px', color: 'white', width: '50%' }}>Có</Button>
                                </DialogActions>
                            </Dialog>

                            {/* dialog khách hủy đơn hàng */}

                            <Dialog
                                open={open5}
                                onClose={handleClose5}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                onKeyPress={(e) => testKey5(e)}
                            >
                                <DialogTitle id="alert-dialog-title">{"Xác nhận khách hủy đơn"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description" style={{ textAlign: 'center', color: 'black' }}>Xác nhận hủy đơn hàng: {rowfromtable.MaDatHang}!</DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose_KhongSua5} style={{ padding: '6px 16px', backgroundColor: 'rgb(255, 193, 7)', margin: '15px', borderRadius: '8px', color: 'rgb(0, 0, 0)', width: '50%' }}>
                                        Không
                                    </Button>
                                    <Button onClick={handleClose_Sua5} style={{ padding: '6px 16px', backgroundColor: 'rgb(0, 171, 85)', margin: '15px', borderRadius: '8px', color: 'white', width: '50%' }}>
                                        Có
                                    </Button>
                                </DialogActions>
                            </Dialog>

                            {/* dialog khôi phục đơn hàng */}

                            <Dialog
                                open={open4}
                                onClose={handleClose4}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                onKeyPress={(e) => testKey4(e)}
                            >
                                <DialogTitle id="alert-dialog-title">{"Bạn có muốn khôi phục đơn hàng này?"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description" style={{ textAlign: 'center', color: 'black' }}>Xác nhận khôi phục đơn hàng: {rowfromtable.MaDatHang}!</DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose_KhongSua4} style={{ padding: '6px 16px', backgroundColor: 'rgb(255, 193, 7)', margin: '15px', borderRadius: '8px', color: 'rgb(0, 0, 0)', width: '50%' }}>
                                        Không
                                    </Button>
                                    <Button onClick={handleClose_Sua4} style={{ padding: '6px 16px', backgroundColor: 'rgb(0, 171, 85)', margin: '15px', borderRadius: '8px', color: 'white', width: '50%' }}>
                                        Có
                                    </Button>
                                </DialogActions>
                            </Dialog>

                            {/* dialog thêm sản phẩm */}

                            <Dialog
                                open={open3}
                                onClose={handleClose3}
                                fullWidth={true}
                                maxWidth={'lg'}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                onKeyPress={(e) => testKey(e)}
                            >
                                <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center' }}>
                                    <b>THÊM SẢN PHẨM</b>
                                    <div className='phantrang' style={{ height: 60 }}>
                                        <Pagination callBackSanPham={LayGiaTriPagination} TongSoSP={datasize} Sotrang={sotrang}></Pagination>
                                    </div>
                                </DialogTitle>
                                <DialogContent style={{ height: (window.innerHeight - 150) }}>
                                    <div className='giohang'>

                                        <div className='chiadoi212'>
                                            <div className='MuiGrid-root style_quick_order_wrapper__Q49yM MuiGrid-item MuiGrid-grid-sm-8'>
                                                <div className='search-product-parent1' >
                                                    {/* <img height="22" width="22" src={search_img} className="img_search1"></img> */}

                                                    <div  >

                                                        <ReactSearchAutocomplete
                                                            items={input}
                                                            id="autocomplete"
                                                            onSearch={handleOnSearch}
                                                            showIcon={false}
                                                            //onHover={handleOnHover}
                                                            onSelect={handleOnSelect}
                                                            //onFocus={handleOnFocus}
                                                            onClear={handleOnClear}
                                                            maxResults={0}
                                                            autoFocus
                                                            placeholder="Tìm Kiếm"
                                                            inputSearchString={searchString}
                                                            fuseOptions={{
                                                                shouldSort: true,
                                                                threshold: 0.0,
                                                                // location: 0,
                                                                // distance: 100,
                                                                ignoreLocation: true,
                                                                maxPatternLength: 32,
                                                                minMatchCharLength: 2,
                                                                keys: ["TenHang", "HoatChat", "HangSX"]
                                                            }}
                                                            resultStringKeyName="linkhinh"
                                                            // formatResult={formatResult}
                                                            formatResult={(item) => {

                                                                let mangItem = item.split("*")

                                                                return (
                                                                    <div className="item_search_parent_trangchu">
                                                                        <div className="item_search_image">
                                                                            <img src={mangItem[0]} style={{ width: 50, height: 50 }} onError={handleImgError}></img>
                                                                        </div>
                                                                        <div className="item_search_name">{mangItem[1]} </div>
                                                                        <div className="item_search_price" style={{ border: 'none', color: 'red' }}> {parseInt(mangItem[2]).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} </div>
                                                                    </div>
                                                                );

                                                            }}
                                                            styling={{
                                                                height: "44px",
                                                                border: "1px solid #dfe1e5",
                                                                borderRadius: "24px",
                                                                backgroundColor: "white",
                                                                boxShadow: "rgba(32, 33, 36, 0.28) 0px 1px 6px 0px",
                                                                hoverBackgroundColor: "#eee",
                                                                color: "#212121",
                                                                fontSize: "16px",
                                                                fontFamily: "Arial",
                                                                iconColor: "grey",
                                                                lineColor: "rgb(232, 234, 237)",
                                                                placeholderColor: "grey",
                                                                clearIconMargin: '3px 14px 0 0',
                                                                searchIconMargin: '0 0 0 16px',
                                                                // zIndex: "9999"
                                                                // zIndex: "9999"
                                                                overflowX: 'hidden'
                                                            }}
                                                        />
                                                    </div>

                                                </div>
                                                {
                                                    data.map((x, i) => {
                                                        var vND = x.GiaBan.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                                                        return (

                                                            <div className='styles_button_container__XXQXT'>
                                                                <div className='styles_root_card__1L12l'>
                                                                    <div className='MuiPaper-root MuiCard-root styles_product_card__2dzJF styles_isdeal__qgZaj MuiPaper-elevation1 MuiPaper-rounded1'>

                                                                        <div className="styles_product_image__1xSGk">
                                                                            <button className="MuiButtonBase-root123 MuiCardActionArea-root" type="button">
                                                                                <p className='jss2 jss216'>
                                                                                    <div style={{ display: 'inline-block', maxWidth: "100%", overflow: 'hidden', position: 'relative', boxSizing: 'border-box', margin: 0 }}>
                                                                                        <div className='tulam'>
                                                                                            <p>
                                                                                                {x.HinhAnh == null ? <img src={image_default} width='120' height='120' ></img> : <img src={x.HinhAnh} onError={handleImgError} width='120' height="120"></img>}
                                                                                                {/* <img src={x.HinhAnh} width='70%' ></img> */}
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                </p>
                                                                            </button>
                                                                        </div>

                                                                        <div className='MuiCardContent-root undefined
     styles_product_content__2subj styles_product_content_column__Dwv2P'>
                                                                            <div className='styles_product_title_wrap__2vYiH styles_product_title_column_wrap__1y0Ja'>
                                                                                <div className='styles_product_title__3bXWL'>
                                                                                    <p>
                                                                                        <h2 className="MuiTypography-root styles_product_name__3QmYl MuiTypography-h5 MuiTypography-gutterBottom">
                                                                                            {x.TenHang}
                                                                                        </h2>
                                                                                    </p>

                                                                                    <div className='an-hien' style={{ display: 'flex', flexWrap: 'wrap' }}>

                                                                                        {
                                                                                            x.HDnhanh == 1 ?
                                                                                                <Link to='/'>
                                                                                                    <div className='MuiBox-root jss493 tag_tagContainer__1akLh'>
                                                                                                        <img src="https://img.icons8.com/material-rounded/2x/26e07f/fast-cart.png" alt="Girl in a jacket" width="20" height="20" />

                                                                                                        <p className='MuiTypography-root MuiTypography-body454'>
                                                                                                            Hóa đơn nhanh
                                                                                                        </p>
                                                                                                    </div>
                                                                                                </Link>
                                                                                                : null
                                                                                        }
                                                                                        {
                                                                                            x.BanChay == 1 ?
                                                                                                <Link to='/'>
                                                                                                    <div className='MuiBox-root jss493 tag_tagContainer__1akLh1'>
                                                                                                        <img src="https://img.icons8.com/material-sharp/2x/26e07f/facebook-like.png" alt="Girl in a jacket" width="20" height="20" />
                                                                                                        <p className='MuiTypography-root MuiTypography-body11'>Bán chạy</p>
                                                                                                    </div>
                                                                                                </Link>
                                                                                                : null
                                                                                        }
                                                                                        {
                                                                                            x.SPmoi == 1 ?
                                                                                                <Link to='/'>
                                                                                                    <div className='MuiBox-root jss493 tag_tagContainer__1akLh12'>
                                                                                                        <img src="https://img.icons8.com/fluent-systems-filled/2x/4a90e2/electricity.png" alt="Girl in a jacket" width="20" height="20" />
                                                                                                        <p className='MuiTypography-root MuiTypography-body123'>Sản phẩm mới</p>
                                                                                                    </div>
                                                                                                </Link>
                                                                                                : null
                                                                                        }
                                                                                        {
                                                                                            x.GHnhanh == 1 ?
                                                                                                <Link to='/'>
                                                                                                    <div className='MuiBox-root jss493 tag_tagContainer__1akLh'>
                                                                                                        <img src="https://img.icons8.com/fluent-systems-filled/2x/26e07f/fast-cart.png" alt="Girl in a jacket" width="20" height="20" />
                                                                                                        <p className='MuiTypography-root MuiTypography-body454'>Giao nhanh</p>
                                                                                                    </div>
                                                                                                </Link>
                                                                                                : null
                                                                                        }
                                                                                        {
                                                                                            x.SVip == 1 ?
                                                                                                <Link to='/'>
                                                                                                    <div className='MuiBox-root jss493 tag_tagContainer__1akLh2'>
                                                                                                        <img src="https://img.icons8.com/material-rounded/2x/star.png" alt="Girl in a jacket" width="20" height="20" />
                                                                                                        <p className='MuiTypography-root MuiTypography-body2'>Sĩ Vip</p>
                                                                                                    </div>
                                                                                                </Link>
                                                                                                : null
                                                                                        }
                                                                                        {
                                                                                            x.NhiKhoa == 1 ?
                                                                                                <Link to='/'>
                                                                                                    <div className='MuiBox-root jss493 tag_tagContainer__1akLh3'>
                                                                                                        <img src="https://img.icons8.com/ios-glyphs/2x/fa314a/plus-math.png" alt="Girl in a jacket" width="20" height="20" />
                                                                                                        <p className='MuiTypography-root MuiTypography-body3'>Nhi Khoa</p>
                                                                                                    </div>
                                                                                                </Link>
                                                                                                : null
                                                                                        }
                                                                                        {
                                                                                            x.FlashSale == 1 ?
                                                                                                <Link to='/'>
                                                                                                    <div className='MuiBox-root jss493 tag_tagContainer__1akLh4'>
                                                                                                        <img src="https://pngimg.com/uploads/lightning/lightning_PNG51.png" alt="Girl in a jacket" width="20" height="20" />
                                                                                                        <p className='MuiTypography-root MuiTypography-body4'>Flash sale</p>
                                                                                                    </div>
                                                                                                </Link>
                                                                                                : null
                                                                                        }
                                                                                        {
                                                                                            x.NhaKhoa == 1 ?
                                                                                                <Link to='/'>
                                                                                                    <div className='MuiBox-root jss493 tag_tagContainer__1akLh5'>
                                                                                                        <img src="http://benhviendongdo.com.vn/wp-content/uploads/2018/04/icon-rang-ham-mat.png" alt="Girl in a jacket" width="20" height="20" />
                                                                                                        <p className='MuiTypography-root MuiTypography-body5'>Nha Khoa</p>
                                                                                                    </div>
                                                                                                </Link>
                                                                                                : null
                                                                                        }
                                                                                        {
                                                                                            x.SanKhoa == 1 ?
                                                                                                <Link to='/'>
                                                                                                    <div className='MuiBox-root jss493 tag_tagContainer__1akLh6'>
                                                                                                        <img src="https://goldenhealthcarevn.com/wp-content/uploads/2019/03/ICON-GOLDEN-08.png" alt="Girl in a jacket" width="20" height="20" />
                                                                                                        <p className='MuiTypography-root MuiTypography-body6'>Sản Khoa</p>
                                                                                                    </div>
                                                                                                </Link>
                                                                                                : null
                                                                                        }
                                                                                        {
                                                                                            x.DaLieu == 1 ?
                                                                                                <Link to='/'>
                                                                                                    <div className='MuiBox-root jss493 tag_tagContainer__1akLh7'>
                                                                                                        <img src="http://benhviendongdo.com.vn/wp-content/uploads/2018/04/icon-khoa-da-lieu.png" alt="Girl in a jacket" width="20" height="20" />
                                                                                                        <p className='MuiTypography-root MuiTypography-body7'>Da Liễu</p>
                                                                                                    </div>
                                                                                                </Link>
                                                                                                : null
                                                                                        }
                                                                                        {
                                                                                            x.NTHop == 1 ?
                                                                                                <Link to='/'>
                                                                                                    <div className='MuiBox-root jss493 tag_tagContainer__1akLh5'>

                                                                                                        <p className='MuiTypography-root MuiTypography-body5'>Nội Tổng Hợp</p>
                                                                                                    </div>
                                                                                                </Link>
                                                                                                : null
                                                                                        }
                                                                                        {
                                                                                            x.ThanKinh == 1 ?
                                                                                                <Link to='/'>
                                                                                                    <div className='MuiBox-root jss493 tag_tagContainer__1akLh8'>

                                                                                                        <img src="http://www.benhvientiengiang.com.vn/Media/images/icons/Noi%20than%20kinh.png" alt="Girl in a jacket" width="20" height="20" />
                                                                                                        <p className='MuiTypography-root MuiTypography-body8'>Thần Kinh</p>
                                                                                                    </div>
                                                                                                </Link>
                                                                                                : null
                                                                                        }
                                                                                        {
                                                                                            x.BV == 1 ?
                                                                                                <Link to='/'>
                                                                                                    <div className='MuiBox-root jss493 tag_tagContainer__1akLh5'>

                                                                                                        <p className='MuiTypography-root MuiTypography-body5'>Bệnh Viện/Phòng Khám</p>
                                                                                                    </div>
                                                                                                </Link>
                                                                                                : null
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                                <p className="MuiTypography-root1 styles_product_type__1tqQT styles_muted__2X-Mq styles_align_center__2QUXd MuiTypography-body2 MuiTypography-colorTextSecondary">{x.QCDG}</p>
                                                                                {
                                                                                    x.ConLai < 300 ?
                                                                                        x.ConLai <= 0 ?
                                                                                            <p className="MuiTypography-root1" style={{ fontSize: 14, fontWeight: 'bold', color: '#dc3545' }}>Sản phẩm tạm hết hàng </p>
                                                                                            :
                                                                                            <p className="MuiTypography-root1" style={{ fontSize: 14, fontWeight: 'bold', color: '#dc3545' }}>Tồn đầu: {x.TonKho}. Đã xử lý: {x.DaDat}. Tồn sau:  {x.ConLai} </p>
                                                                                        :
                                                                                        <p className="MuiTypography-root1" style={{ fontSize: 14, fontWeight: 'bold', color: '#dc3545' }}>Tồn đầu: {x.TonKho}. Đã xử lý: {x.DaDat}. Tồn sau:  {x.ConLai} </p>
                                                                                }
                                                                                <p className="tien-rps">{vND}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="styles_price_wrapper__1h180 styles_price_wrapper_column__IsTDU3">
                                                                            <p className="MuiTypography-root styles_deal_price__C0JjD1 MuiTypography-body1">{vND}</p>
                                                                        </div>
                                                                        {
                                                                            x.ConLai > 0 ?
                                                                                <div className='MuiCardActions-root styles_product_action__1Zos7 styles_product_action_column__gjQ3o1 MuiCardActions-spacing'>
                                                                                    <button onClick={() => down(x.MaHang)} className="MuiButtonBase-root MuiIconButton-root styles_button_root__3mGap styles_button_root_minus__2gTtR styles_minus__ysCNs" type="button">
                                                                                        <span className="MuiIconButton-label">
                                                                                            <svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" >
                                                                                                <path d="M19 13H5v-2h14v2z"></path>
                                                                                            </svg>
                                                                                        </span>
                                                                                        <span className="MuiTouchRipple-root"></span>
                                                                                    </button>
                                                                                    <div className="MuiInputBase-root MuiInput-root styles_root_input__2PM1z styles_has_item__tqSHX">
                                                                                        <input value={x.SoLuong} onChange={value => { nhapTaySoLuong(x.MaHang, parseInt(value.target.value)) }} name="cart-MEDX.LAC-SAN-009" placeholder="0" width='100%' type="DEAL" className="MuiInputBase-input MuiInput-input styles_input__3lyzY" />
                                                                                    </div>
                                                                                    <button onClick={() => up(x.MaHang)} className="MuiButtonBase-root MuiIconButton-root styles_button_root__3mGap styles_plus__ia9cs" type="button">
                                                                                        <span className="MuiIconButton-label">
                                                                                            <svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                                                                                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                                                                                            </svg>
                                                                                        </span>
                                                                                        <span className="MuiTouchRipple-root"></span>
                                                                                    </button>
                                                                                </div>
                                                                                :
                                                                                <div className='MuiCardActions-root styles_product_action__1Zos7 styles_product_action_column__gjQ3o1 MuiCardActions-spacing'>
                                                                                    <button disabled style={{ display: "none" }} className="MuiButtonBase-root MuiIconButton-root styles_button_root__3mGap styles_button_root_minus__2gTtR styles_minus__ysCNs" type="button">
                                                                                        <span className="MuiIconButton-label">
                                                                                            <svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" >
                                                                                                <path d="M19 13H5v-2h14v2z"></path>
                                                                                            </svg>
                                                                                        </span>
                                                                                        <span className="MuiTouchRipple-root"></span>
                                                                                    </button>
                                                                                    <div className="MuiInputBase-root MuiInput-root styles_root_input__2PM1z styles_has_item__tqSHX">
                                                                                        <input disabled name="cart-MEDX.LAC-SAN-009" placeholder="0" width='100%' type="DEAL" className="MuiInputBase-input MuiInput-input styles_input__3lyzY" />
                                                                                    </div>
                                                                                    <button disabled style={{ display: "none" }} className="MuiButtonBase-root MuiIconButton-root styles_button_root__3mGap styles_plus__ia9cs" type="button">
                                                                                        <span className="MuiIconButton-label">
                                                                                            <svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                                                                                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                                                                                            </svg>
                                                                                        </span>
                                                                                        <span className="MuiTouchRipple-root"></span>
                                                                                    </button>
                                                                                </div>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                }
                                            </div>

                                            <div className="MuiGrid-root style_mini_cart_rightside_wrapper__3qGvO MuiGrid-item MuiGrid-grid-sm-4 cvcc">
                                                <div className='neolai'>
                                                    <h3>Sản phẩm đã thêm</h3>
                                                </div>
                                                <div className='neolai'>
                                                    <div className="neolai_con" style={{ height: (window.innerHeight - 170) }}>
                                                        {showSanPhamChon.map((item, i) => {
                                                            var vND = (item.GiaBan - (item.GiaBan * item.PhanTramKM / 100)).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                                                            var tongTien = (item.GiaBan - (item.GiaBan * item.PhanTramKM / 100)) * item.SoLuong
                                                            var vNDTT = tongTien.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                                                            return (
                                                                item.SoLuong > 0 ?
                                                                    <div className='order_review1'>
                                                                        <button className='hove-xoa' style={{ width: 30, backgroundColor: '#fff', backgroundRepeat: 'no-repeat', border: 'none', cursor: 'pointer', marginTop: 10 }}
                                                                            onClick={() => deletetheitem(i, item.MaHang)}>
                                                                            <img src='https://img.icons8.com/ios/2x/fa314a/delete-trash.png' width='20' height='20'></img>
                                                                        </button>
                                                                        <p className='sanpham' style={{ textAlign: 'justify', fontSize: 12 }}> {item.TenHang} </p>
                                                                        <div className='tam-tinh3' style={{ fontSize: 12 }}><h3>{item.SoLuong}</h3></div>
                                                                        <div className='tam-tinh' style={{ fontSize: 12 }}><h3>{vND}</h3></div>
                                                                        <div className='tam-tinh' style={{ fontSize: 12 }}><h3> {vNDTT} </h3></div>
                                                                    </div>
                                                                    : null
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose_KhongSua3} color="primary" style={{ padding: '6px 16px', backgroundColor: 'rgb(255, 193, 7)', borderRadius: '8px', color: 'rgb(0, 0, 0)', margin: '15px' }}>Không</Button>
                                    <Button onClick={handleClose_Sua3} color="primary" style={{ padding: '6px 16px', backgroundColor: 'rgb(0, 171, 85)', borderRadius: '8px', color: 'white', margin: '15px' }}>Có</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                        : checkdonhang === 2 ?
                            <div>
                                <h2>Đơn hàng đang được xử lý bởi {tenNXL} </h2>
                            </div>
                            : null
                    }
                </div>
            }
        </div>
    );


}