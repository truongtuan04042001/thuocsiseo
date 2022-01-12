import { useEffect, useState } from 'react'
import Dialog from '@material-ui/core/Dialog';
import React from 'react'
import '../css/donhangoff.css'
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
// import search_img from '../images/search.png'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { API_URL } from '../constants/constants'
import TextField from '@material-ui/core/TextField';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';
import image_default from '../images/image-default.jpg'
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import logoback from '../images/logoback.png';
import Select from 'react-select';
import options from './options';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
const DonHangOffline = () => {
    const [data, setData] = useState([]);//mang san pham
  
    const [chiTietDonHang, setChiTietDonHang] = useState([]);
 
    const [open3, setOpen3] = useState(false);
    const [input, setInput] = useState([]);//mang gợi ý của search

    const [sdtsg, setSdtsg] = useState([]);
    const [manbsg, setManbsg] = useState([]);
    const [makhsg, setMakhsg] = useState([]);
    const [datasize, setDataSize] = useState([]);//mang san pham
    const [note_tieude, setNoteTieuDe] = useState("Tất Cả Sản Phẩm");
    const [sotrang, setSoTrang] = useState(1);
    const [tongSLSPCTDH, setTongSLSPCTDH] = useState(0)
    const [strTTCTDH, setStrTTCTDH] = useState('0 VND')

    const capNhatSLVaTTCTDH = (list) => {
        let tSL = 0
        let tongTien = 0
        list.forEach(e => {
            tSL += e.SoLuong
            tongTien += (e.SoLuong * (e.GiaBan - (e.GiaBan * e.PhanTramKM / 100)))
        })
        setTongSLSPCTDH(tSL)
        const strtt = tongTien.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
        setStrTTCTDH(strtt)
    }
    
    const handleImgError = e => {
        e.target.src = image_default;
    };
   

    useEffect(async () => {
        await fetch(API_URL + '/getsuggestfront', {
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
                setInput(data)
            })
        await fetch(API_URL + '/getsuggestoff', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
            .then((response) => response.json())
            .then(data => {
                setSdtsg(data)
            });
        await fetch(API_URL + '/getsuggestoff2', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
            .then((response) => response.json())
            .then(data => {
                setManbsg(data)
            })
        await fetch(API_URL + '/getsuggestoff3', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
            .then((response) => response.json())
            .then(data => {
                setMakhsg(data)
            })
    }, []);

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
                    // setData(datas.mang)
                    capNhatSoLuongSanPham(datas.mang, 0)
                    setDataSize(Object.values(datas.tong[0]))
                })
        }
    }, [sotrang])

    const LayGiaTriPagination = (childData) => {
        setSoTrang(childData)
    }

    const handleClose_KhongSua3 = () => {
        setOpen3(false);
        localStorage.removeItem('list')
        // reset data from DB
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
                // setData(datas.mang)
                capNhatSoLuongSanPham(datas.mang, 0)
                setDataSize(Object.values(datas.tong[0]))
                
                setNoteTieuDe("Tất Cả Sản Phẩm")
                setSoTrang(1)
            })
    };

    const handleClose3 = () => {
        setOpen3(false);
    };

    const handleClose_Sua3 = () => {
        setOpen3(false);
     
        let tmp1 = chiTietDonHang
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
        tmp2.forEach(e => {
            let tmp3 = {
                MaHang: e.MaHang,
                TenHang: e.TenHang,
                DVT: e.DVT,
                SoLuong: e.SoLuong,
                GiaBan: e.GiaBan,
                PhanTramKM: e.PhanTramKM,
                ThanhTien: e.SoLuong * (e.GiaBan - (e.GiaBan * e.PhanTramKM / 100))
            }
            let ktra = 0
            tmp1.forEach(e => {
                if (e.MaHang == tmp3.MaHang) {
                    e.SoLuong = e.SoLuong + tmp3.SoLuong
                    ktra = 1
                }
            });
            if (ktra == 0) {
                tmp1.push(tmp3)
            }
        });
        setChiTietDonHang(tmp1)
        tongTienDonHang(tmp1)
        capNhatSLVaTTCTDH(tmp1)
        localStorage.removeItem('list')
        // reset data from DB
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
                setData(datas.mang)
                setDataSize(Object.values(datas.tong[0]))
               
                setNoteTieuDe("Tất Cả Sản Phẩm")
                setSoTrang(1)
            })
    };

    const handleClickOpen3 = () => {
        setOpen3(true);
    };

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
               
                setNoteTieuDe("Tất Cả Sản Phẩm")
                setSoTrang(1)
            })

    }

    const xoa1SanPhamCuaChiTietDonHang = (obj) => {
        const newList = chiTietDonHang.filter(item => item.MaHang != obj.MaHang)
        setChiTietDonHang(newList)
        tongTienDonHang(newList)
        capNhatSLVaTTCTDH(newList)
    }

    const suaSoLuong = (khoaChinh, soLuong) => {
        const newList = chiTietDonHang.map((item) => {
            if (item.MaHang === khoaChinh) {
                let sLuong = item.SoLuong
                let max = 100
                // max = item.TonKho
                if (sLuong <= max && soLuong > 0 && soLuong.length != 0) {
                    sLuong = soLuong
                    if (soLuong <= max) {
                        const updatedItem = {
                            ...item,
                            SoLuong: sLuong,
                        };
                        return updatedItem;
                    } else {
                        const updatedItem = {
                            ...item,
                            SoLuong: max,
                        };
                        return updatedItem;
                    }
                } else {
                    const updatedItem = {
                        ...item,
                        SoLuong: 1,
                    };
                    return updatedItem;
                }
            }
            return item;
        });
        setChiTietDonHang(newList)
        tongTienDonHang(newList)
        capNhatSLVaTTCTDH(newList)
    }

    const suaDonGia = (khoaChinh, donGia) => {
        if (donGia > 0) {
            const newList = chiTietDonHang.map((item) => {
                if (item.MaHang === khoaChinh) {
                    const updatedItem = {
                        ...item,
                        GiaBan: donGia,
                    };
                    return updatedItem;
                }
                return item;
            });
            setChiTietDonHang(newList)
            tongTienDonHang(newList)
            capNhatSLVaTTCTDH(newList)
        } else {
            alert("Giá đã thấp nhất")
        }
    }

    const capNhatSoLuongSanPham = async (list) => {
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
                    alert("Số lượng đã thấp nhất")
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
                let max = 300
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
                    if (max < 0) {
                        max = 0
                    }
                    const updatedItem = {
                        ...item,
                        SoLuong: max,
                    };
                    themSPvaoGH(updatedItem)
                    alert("Số lượng đã cao nhất")
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
                let max = 300
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
                        if (max < 0) {
                            max = 0
                        }
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

    // function handleSubmit(event, value) {
    //     event.preventDefault();
    //     setValue(value)
    //     if (value == null) {
    //         fetch(API_URL + '/searchFrontSuaDonHang', {
    //             method: 'POST',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 sotrang: sotrang,
    //                 sercmdarr: "Tất Cả Sản Phẩm",
    //             })
    //         })
    //             .then((response) => response.json())
    //             .then(datas => {
    //                 capNhatSoLuongSanPham(datas.mang, 0)
    //                 setDataSize(Object.values(datas.tong[0]))
    //                 setValue(null)
    //                 setNoteTieuDe("Tất Cả Sản Phẩm")
    //                 setSoTrang(1)
    //             })

    //     } else {
    //         fetch(API_URL + '/searchFrontSuaDonHang', {
    //             method: 'POST',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 sotrang: sotrang,
    //                 sercmdarr: value,
    //             })
    //         })
    //             .then((response) => response.json())
    //             .then(datas => {
    //                 capNhatSoLuongSanPham(datas.mang, 0)
    //                 setDataSize(Object.values(datas.tong[0]))
    //                 setNoteTieuDe(value)
    //                 setSoTrang(1)
    //             })

    //     }
    // }

    function handleSubmitManv(event, value) {
        event.preventDefault();
        setMaNguoiBan(value)
    }
    function handleSubmitSdt(event, value) {
        event.preventDefault();
        if (value == null) {
            setSDT("");
        } else {
            setSDT(value)
        }
    }
    function handleSubmitMkh(event, value) {
        event.preventDefault();

        if (value == null) {
            setMaKH("");
        } else {

            setMaKH(value)
        }
    }
    const [maNguoiBan, setMaNguoiBan] = useState('')
    const [tenKH, setTenKH] = useState('')
    const [sDT, setSDT] = useState('')
    const [diaChi, setDiaChi] = useState('')
    const [phuongXa, setPhuongXa] = useState('')
    const [khuVuc, setKhuVuc] = useState({ value: 'null', label: 'Chọn khu vực' })
    const [maKH, setMaKH] = useState('') // mã KH00.....
  //  const [maKhachHang, setMaKhachHang] = useState('') // Mã khách hàng chính để liên kết đơn hàng

    let tenDN = "null"
    const ngayTao = '31/07/2021 19:19'
    const [ghiChu, setGhiChu] = useState(localStorage.getItem('ghiChu'))
    if (ghiChu == null || ghiChu == undefined) {
        setGhiChu('')
    }
    const [email, setEmail] = useState('')
    const [tongTienDH, setTongTienDH] = useState(123)
    const tongTienDonHang = (listGH) => {
        let tTien = 0
        listGH.forEach(e => {
            tTien += e.SoLuong * (e.GiaBan - (e.GiaBan * e.PhanTramKM / 100))
        });
        setTongTienDH(tTien)
    }

    const chiTietDonHang2 = async (idmdh, dsgh) => {
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
                .then(() => {
                    const nameKey = 'list'
                    if (nameKey !== 'khnull' && nameKey !== 'khundefined') {
                        localStorage.removeItem(nameKey)
                    }
                    setMaNguoiBan('')
                    setTenKH('')
                    setSDT('')
                    setDiaChi('')
                    setEmail('')
                    setChiTietDonHang([])
                    capNhatSLVaTTCTDH([])
                    setMaKH('')
                    alert("Tạo đơn thành công!")
                })
        } else {
            alert("Chưa lấy được mã đơn hàng")
        }
    }
    const taoDonHang = async () => {
        if (chiTietDonHang.length != 0) {
            if (tenKH != '' && sDT != '' && diaChi != '' && maNguoiBan != '') {
                let vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
                let vnf_regex2 = /((02)+([0-9]{9})\b)/g;
               // let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (vnf_regex.test(sDT) || vnf_regex2.test(sDT)) {
                    if (tenDN == "null" || tenDN == null || tenDN == undefined || tenDN.length == 0) {
                        tenDN = ""
                    }
                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            ThoiGian: ngayTao,
                            KhachHang: tenKH,
                            KhachCanTra: tongTienDH,
                            CongNo: tongTienDH,
                            KhachDaTra: 0,
                            TrangThai: "Đã xác nhận",
                            GhiChu: ghiChu,
                            MaKhachHang: sDT,
                            SoDienThoai: sDT,
                            DiaChi: diaChi + ", " + phuongXa + ", " + khuVuc.value,
                            Email: '',
                            TenDN: tenDN,
                            MaNguoiBan: maNguoiBan,
                            MaNgXuLy: ''
                        })
                    }
                    await fetch(API_URL + "/donHang", requestOptions)
                        .then(response => response.json())
                        .then(data => {
                            chiTietDonHang2(data, chiTietDonHang)
                        })
                } else {
                    alert("Số điện thoại không hợp lệ")
                }
            } else {
                alert("Chưa nhập đầy đủ thông tin giao hàng.")
            }
        } else {
            alert("Chưa có sản phẩm trong đơn")
        }
    }

    useEffect(async () => {
        if (sDT.length >= 9) {
            await fetch(API_URL + '/layTTKHchoDHOffline/' + sDT)
                .then((response) => response.json())
                .then(data => {
                    setTenKH(data.TenNV)
                    if (data.Email === 'null' || data.Email === 'undefined') {
                        setEmail('')
                    } else {
                        setEmail(data.Email)
                    }
                    setDiaChi(data.DiaChi)
                    setPhuongXa(data.PhuongXa)
                    setKhuVuc({ value: data.KhuVuc, label: data.KhuVuc });
                    setMaKH(data.MaKH)
                  //  setMaKhachHang(data.MaNV)
                })
        }
        if (sDT.length == 0) {
            setTenKH('')
            setEmail('')
            setDiaChi('')
            setMaKH('')
            setPhuongXa('')
            setKhuVuc({ value: 'null', label: 'Chọn khu vực' })
           // setMaKhachHang('')
        }
    }, [sDT])

    useEffect(async () => {
        if (maKH.length == 8) {
            await fetch(API_URL + '/layTTKHchoDHOffline2/' + maKH)
                .then((response) => response.json())
                .then(data => {
                    setTenKH(data.TenNV)
                    if (data.Email === 'null' || data.Email === 'undefined') {
                        setEmail('')
                    } else {
                        setEmail(data.Email)
                    }
                    setDiaChi(data.DiaChi)
                    setPhuongXa(data.PhuongXa)
                    setKhuVuc({ value: data.KhuVuc, label: data.KhuVuc });
                    setSDT(data.SDT)
                   // setMaKhachHang(data.MaNV)
                })
        }
        if (maKH.length == 0) {
            setTenKH('')
            setEmail('')
            setDiaChi('')
            setPhuongXa('')
            setSDT('')
            setKhuVuc({ value: 'null', label: 'Chọn khu vực' })
         //   setMaKhachHang('')
        }
    }, [maKH])

    //  code lụi mà nó hiểu, vl thật =)) này thì enter thì tự động chọn có hả, chuyện này OK =)))
    const testKey = (e) => {
        if (e.code === "Enter") {
            handleClose_Sua3()
        }
    }
    const [searchString, setSearchString] = useState("");

    const handleOnSearch = (string) => {
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

    return (
        <div className='DHO_body'>
            <Link to={{ pathname: '/ThongKe2', state: { type: 3 } }}
                type="button" style={{ textTransform: 'capitalize',  width: 100, flexDirection: 'row', flexWrap: 'wrap', marginLeft: -35, display: 'flex', fontSize: 21, alignSelf: 'center', position: 'absolute' }}>

                <img className="no-print" src={logoback} style={{ width: 30, height: 30 }} />

                <div className="no-print">
                    <b className="no-print" style={{ marginBottom: 5 }} >Trở về</b>
                </div>
            </Link>
            <div className='DHO-chia-nua'>
                <div className='DHO-nua-trai'>
                    <h3>Thông tin đơn hàng</h3>
                    <div className='aa'>
                        <div className='phanchia123'>
                            <label className="">Mã người bán&nbsp;
                                <abbr className="required" title="bắt buộc">*</abbr>
                            </label>
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
                        </div>

                        <div className='phanchia123'>
                            <label  className="">Số điện thoại&nbsp;
                                <abbr className="required" title="bắt buộc">*</abbr>
                            </label>
                            <Autocomplete
                                freeSolo
                                className="input-text1"
                                clearOnEscape
                                clearOnBlur
                                autoComplete
                                options={sdtsg.map((option) => option.value)}
                                onChange={handleSubmitSdt}
                                value={sDT}
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
                        </div>

                        <div className='phanchia1'>
                            <label >Mã khách hàng&nbsp;
                            </label>
                            <Autocomplete
                                freeSolo
                                className="input-text1"
                                clearOnEscape
                                clearOnBlur
                                autoComplete
                                options={makhsg.map((option) => option.value)}
                                onChange={handleSubmitMkh}
                                value={maKH}
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
                        </div>
                        <div className='phanchia1'>
                            <label >Tên khách hàng&nbsp;
                                <abbr className="required" title="bắt buộc">*</abbr>
                            </label>
                            <input value={tenKH} onChange={text => { setTenKH(text.target.value) }} type="text" className="input-text1" />
                        </div>

                    </div>
                    <div className='phanchia12'>
                        <label >Địa chỉ email (tùy chọn) &nbsp;
                        </label>
                        <input disabled value={email} type="text" className="input-text1 " />
                    </div>
                    <div className='phanchia2'>
                        <label  className="">Địa chỉ&nbsp;
                            <abbr className="required" title="bắt buộc">*</abbr>
                        </label>
                        <input type="text" className="input-text " value={diaChi} onChange={text => { setDiaChi(text.target.value) }} />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div className='phanchia2'>
                            <label  className="">Phường/ Xã/ Huyện&nbsp;
                                <abbr className="required" title="bắt buộc">*</abbr>
                            </label>
                            <input placeholder='Phường / Xã / Huyện ( bắt buộc )' value={phuongXa} onChange={text => { setPhuongXa(text.target.value) }} className='input-text'></input>
                        </div>
                        <div className='phanchia2'>
                            <label  className="">Tỉnh / Thành phố&nbsp;
                                <abbr className="required" title="bắt buộc">*</abbr>
                            </label>
                            <Select
                                className="input1 input-text-select"
                                value={khuVuc}
                                onChange={(text) => { setKhuVuc(text) }}
                                options={options}
                                placeholder="Chọn khu vực"
                                maxMenuHeight={250}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ width: '80%', margin: 'auto', display: 'flex', flexWrap: 'wrap', padding: 20 }}>
                <div style={{ width: "80%", textAlign: 'right', marginRight: '20px' }}>
                    <button onClick={() => themSanPham()} style={{ width: 'auto', padding: '15px', background: '#FF0000', color: '#fff', borderRadius: '10px', cursor: 'pointer', border: 'none' }}>Thêm sản phẩm</button>
                </div>
                <div style={{ textAlign: 'right', marginRight: '20px' }}>
                    <button onClick={() => taoDonHang()} style={{ width: 'auto', padding: '15px', background: '#1E9600', color: '#fff', borderRadius: '10px', cursor: 'pointer', border: 'none' }}>Tạo đơn hàng</button>
                </div>

            </div>
            <div className='DHO-don'>
                <div className='order_review'>
                    <div className='tam-tinh6'><h3>Xóa</h3></div>
                    <div className='tam-tinh6'><h3>STT</h3></div>
                    <div className='sanpham311'><h3>Tên hàng</h3></div>
                    <div className='tam-tinh2'><h3>ĐVT</h3></div>
                    <div className='tam-tinh5'><h3>Số lượng </h3></div>
                    <div className='tam-tinh5'><h3>Đơn giá</h3></div>
                    <div className='tam-tinh6'><h3>% CK</h3></div>
                    <div className='tam-tinh5'><h3>Thành tiền</h3></div>
                </div>
                {
                    chiTietDonHang.map((item, i) => {
                        // let vNDDonGia = item.DonGia.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                        let vNDThanhTien = (item.SoLuong * (item.GiaBan - (item.GiaBan * item.PhanTramKM / 100))).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                        // let vNDThanhTien = (item.DonGia - (item.DonGia *)      item.SoLuong).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                        return (
                            <div key={i} className='order_review1'>
                                <div className='tam-tinh6'>
                                    <button style={{ backgroundColor: 'transparent', backgroundRepeat: 'no-repeat', border: 'none', cursor: 'pointer', marginTop: 10 }}
                                        onClick={() => xoa1SanPhamCuaChiTietDonHang(item)}>
                                        <img src='https://img.icons8.com/ios/2x/fa314a/delete-trash.png' width='20' height='20'></img>
                                    </button>
                                </div>
                                <div className='tam-tinh6'><h3>{(i + 1)}</h3></div>
                                <div className='sanpham311'><h3>{item.TenHang}</h3></div>
                                <div className='tam-tinh2'><h3>{item.DVT}</h3></div>
                                <div className='tam-tinh5' style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    {/* <h3>{item.SoLuong}</h3> */}
                                    <input style={{ border: 'none', fontSize: '20px' }} className='so' type='number' value={item.SoLuong} onChange={value => { suaSoLuong(item.MaHang, parseInt(value.target.value)) }} />
                                </div>
                                <div className='tam-tinh5' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <input style={{ border: 'none', textAlign: 'right', fontSize: '16px' }} className='so' type='number' value={item.GiaBan} onChange={value => { suaDonGia(item.MaHang, parseFloat(value.target.value)) }} />
                                    <p style={{ fontSize: 15 }}>VND</p>
                                </div>
                                <div className='tam-tinh6'><h3>{item.PhanTramKM}</h3></div>
                                <div className='tam-tinh5'><h3>{vNDThanhTien}</h3></div>
                            </div>
                        )
                    })
                }
                <div className='order_review1'>
                    <div className='tam-tinh6'>
                    </div>
                    <div className='tam-tinh6'><h3>&nbsp;</h3></div>
                    <div className='sanpham311'><h3 style={{ fontSize: 18 }} >Tổng cộng</h3></div>
                    <div className='tam-tinh2'><h3>&nbsp;</h3></div>
                    <div className='tam-tinh5' style={{ textAlign: 'center' }}>
                        <h3 style={{ fontSize: 18 }} > {tongSLSPCTDH} </h3>
                    </div>
                    <div className='tam-tinh5' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    </div>
                    <div className='tam-tinh6'><h3>&nbsp;</h3></div>
                    <div className='tam-tinh5'><h3 style={{ fontSize: 18 }} >{strTTCTDH}</h3></div>
                </div>
            </div>

            {/* dialog them san pham */}

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
                                            onSelect={handleOnSelect}
                                            onClear={handleOnClear}
                                            maxResults={0}
                                            autoFocus
                                            placeholder="Tìm Kiếm"
                                            inputSearchString={searchString}
                                            fuseOptions={{
                                                shouldSort: true,
                                                threshold: 0.0,
                                                ignoreLocation: true,
                                                maxPatternLength: 32,
                                                minMatchCharLength: 2,
                                                keys: ["TenHang", "HoatChat", "HangSX"]
                                            }}
                                            resultStringKeyName="linkhinh"
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

                                            <div key={i} className='styles_button_container__XXQXT'>
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
    )
}
export default DonHangOffline