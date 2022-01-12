import { useEffect, useState, forwardRef } from 'react'
import logothuocsi from '../images/Logo.png'
import search_img from '../images/search.png'
import sort_time from '../images/sort_time.png'
import calendar_time from '../images/calendar_time.png'
import next_month_tk from '../images/next_month_tk.png'
import prev_month_tk from '../images/prev_month_tk.png'
import filter_tk from '../images/filter_tk.png'
import logout from '../images/logoutql.png'
import refresh_time from '../images/refresh_time.png'
import { NavLink, Link } from 'react-router-dom'
import NavMenu from './NavMenu'
import React from 'react';
import Button from '@material-ui/core/Button';
import Table_ThongKe from './Table_ThongKe';
import Table_DonHang from './Table_DonHang';
import Table_DonHangNhap from './Table_DonHangNhap';
import Table_TrangThai from './Table_TrangThai';
import Table_LoHang from './Table_LoHang';
import Table_HetHang from './Table_HetHang';
import Table_User from './Table_User';
import Table_NV from './Table_NV';
import Table_DiemThuong from './Table_DiemThuong';
import Table_QuaTang from './Table_QuaTang';
import Table_Banner from './Table_Banner';
import Table_QuaTangKM from './Table_QuaTangKM';
import Table_CongNoKH from './Table_CongNoKH'
import Table_CongNoNCC from './Table_CongNoNCC'
import Table_NhaCungCap from './Table_NhaCungCap'
import Table_ThuChi from './Table_ThuChi'
import Table_Combo from './Table_Combo'
import Table_Combo_Statistic from './Table_Combo_Statistic '
import Table_Articles from './Table_Articles'
import { API_URL } from '../constants/constants'
import { useHistory } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DatePicker from "react-datepicker";
import { getMonth, getYear, getDate, getQuarter, formatRelative, subDays } from 'date-fns';
import range from "lodash/range";
import "react-datepicker/dist/react-datepicker.css";

const ThongKe2 = (props) => {
    document.body.style.zoom = "85%";
    const [tabledata, setTabledata] = useState([]);//mảng chứa giá trị lấy được từ sql đưa vào table-table thông tin
    const history = useHistory();
    const [input, setInput] = useState([]);//mang gợi ý của search
    const [tableType, setTableType] = useState();//mảng chứa loại table
    const [table, setTable] = useState();//mảng chứa loại table
    const [tablechange, setTablechange] = useState('')//dùng để theo dõi thay đổi table-refresh lại
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [open_option, setOpenOption] = useState(false);
    const [open_time_fixed, setOpenTimeFixed] = useState(false);
    const [open_time, setOpenTime] = useState(false);
    const [diaglog_choose_time, setDialogChooseTime] = useState(false);
    const [loaitk, setLoaitk] = useState();//mảng chứa giá trị loại thống kê
    const [date_Fixed, setDateFixed] = useState();
    const [filterarr, setFilterarr] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [startDateTo, setStartDateTo] = useState(new Date());
    const years = range(1990, getYear(new Date()) + 1, 1);
    const [time, setTime] = useState("");
    const [manv, setManv] = useState("");

    const months = [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12",
    ];

    const [tenNV, setTenNV] = useState('')

    const layTenNVChoIDH = async (maNV) => {
        await fetch(API_URL + "/layTenNhanVienChoInDonHang/" + maNV).then(res => res.json()).then(data => {
            if (data != null || data != undefined) {
                setTenNV(data.msg)
            }
        })
    }

    const verifytoken = () => {
        if (localStorage.getItem("accesstoken2") !== null) {
            fetch(API_URL + '/verifytoken', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    test: localStorage.getItem("accesstoken2")
                })
            })
                .then((response) => response.json())
                .then(data => {
                    if ((data.rs === "token accepted" && data.cv === 0) || (data.rs === "token accepted" && data.cv === 1) || (data.rs === "token accepted" && data.cv === 2)) {
                        // console.log(`${new Date().getTime()} data.manv=`, data.manv)
                        setManv(data.manv)
                        layTenNVChoIDH(data.manv)
                    } else {
                        localStorage.removeItem("accesstoken2")
                        alert("Phiên Làm Việc Hết Hạn, Vui Lòng Đăng Nhập Lại!")
                        history.push("/QuanLy")
                    }
                })
        } else {
            history.push("/QuanLy")
        }
    }

    useEffect(async () => {
        verifytoken()
        if (props.location.state) {
            switch (props.location.state.type) {
                case 3:
                    setTableType(3)
                    setTable("donhang")
                    window.history.replaceState(null, '')
                    break;
                case 11:
                    setTableType(11)
                    setTable("chuongtrinhkm")
                    window.history.replaceState(null, '')
                    break;
                // console.log(props.location.state.type)
            }
        } else {
            if (sessionStorage.getItem("menu") != null) {
                // setTableType(2)
                // changetable(2)
                setTableType(parseInt(sessionStorage.getItem("menu")))
                changetable(parseInt(sessionStorage.getItem("menu")))
                // console.log(sessionStorage.getItem("menu")+"fewfqwfsaf")

            } else {
                setTableType(1)
                changetable(1)
                // console.log("nothing")
            }

            // console.log("nothing")
        }
        // sessionStorage.setItem("Searchfromtc", localStorage.getItem("Searchfromtc"))

        await fetch(API_URL + '/xoaMggHetHan', {
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

            })
    }, []);


    useEffect(async () => {
        // verifytoken();
        if (filterarr != "" && filterarr != undefined) {
            await fetch(API_URL + '/searchfilter', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    searchArr: filterarr,
                    tableVar: table,
                    times: time,
                    //columnVar: childData2[0].columnName,
                    //searchVar: childData2[0].value
                })
            })
                .then((response) => response.json())
                .then(data => {
                    if (tableType == 3) {
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].NgayDatHang != null) {
                                const nam2 = data[i].NgayDatHang.slice(0, 4)
                                const thang2 = data[i].NgayDatHang.slice(5, 7)
                                const ngay2 = "" + data[i].NgayDatHang.slice(8, 10)
                                let tmp = new Date(nam2 + "-" + thang2 + "-" + ngay2)
                                tmp.setDate(tmp.getDate() + 1)
                                const nam = tmp.getFullYear()
                                let thang = (tmp.getMonth() + 1).toString()
                                if (thang.length == 1) {
                                    thang = "0" + thang
                                }
                                let ngay = tmp.getDate().toString()
                                if (ngay.length == 1) {
                                    ngay = "0" + ngay
                                }
                                data[i].NgayDatHang = ngay + "/" + thang + "/" + nam
                            }
                            if (data[i].NgayXuLy != null) {
                                const nam3 = data[i].NgayXuLy.slice(0, 4)
                                const thang3 = data[i].NgayXuLy.slice(5, 7)
                                const ngay3 = "" + data[i].NgayXuLy.slice(8, 10)
                                let tmp2 = new Date(nam3 + "-" + thang3 + "-" + ngay3)
                                tmp2.setDate(tmp2.getDate() + 1)
                                const nam4 = tmp2.getFullYear()
                                let thang4 = (tmp2.getMonth() + 1).toString()
                                if (thang4.length == 1) {
                                    thang4 = "0" + thang4
                                }
                                let ngay4 = tmp2.getDate().toString()
                                if (ngay4.length == 1) {
                                    ngay4 = "0" + ngay4
                                }
                                data[i].NgayXuLy = ngay4 + "/" + thang4 + "/" + nam4
                            }
                        }
                        setTabledata(data)
                    } else
                        if (tableType == 4) {
                            for (let i = 0; i < data.length; i++) {
                                if (data[i].HanSD != null) {
                                    const nam2 = data[i].HanSD.slice(0, 4)
                                    const thang2 = data[i].HanSD.slice(5, 7)
                                    const ngay2 = "" + data[i].HanSD.slice(8, 10)
                                    let tmp = new Date(nam2 + "-" + thang2 + "-" + ngay2)
                                    tmp.setDate(tmp.getDate() + 1)
                                    const nam = tmp.getFullYear()
                                    let thang = (tmp.getMonth() + 1).toString()
                                    if (thang.length == 1) {
                                        thang = "0" + thang
                                    }
                                    let ngay = tmp.getDate().toString()
                                    if (ngay.length == 1) {
                                        ngay = "0" + ngay
                                    }
                                    data[i].HanSD = ngay + "/" + thang + "/" + nam
                                }
                                if (data[i].NgayNhapHang != null) {
                                    const nam3 = data[i].NgayNhapHang.slice(0, 4)
                                    const thang3 = data[i].NgayNhapHang.slice(5, 7)
                                    const ngay3 = "" + data[i].NgayNhapHang.slice(8, 10)
                                    let tmp2 = new Date(nam3 + "-" + thang3 + "-" + ngay3)
                                    tmp2.setDate(tmp2.getDate() + 1)
                                    const nam4 = tmp2.getFullYear()
                                    let thang4 = (tmp2.getMonth() + 1).toString()
                                    if (thang4.length == 1) {
                                        thang4 = "0" + thang4
                                    }
                                    let ngay4 = tmp2.getDate().toString()
                                    if (ngay4.length == 1) {
                                        ngay4 = "0" + ngay4
                                    }
                                    data[i].NgayNhapHang = ngay4 + "/" + thang4 + "/" + nam4
                                }
                            }
                            let dataNoGhiChu = []
                            data.forEach(ee1 => {
                                dataNoGhiChu.push({
                                    IdSTT: ee1.IdSTT,
                                    MaHang: ee1.MaHang,
                                    TenHang: ee1.TenHang,
                                    SoLuong: ee1.SoLuong,
                                    DonGia: ee1.DonGia,
                                    DVT: ee1.DVT,
                                    MaLH: ee1.MaLH,
                                    HanSD: ee1.HanSD,
                                    NgayNhapHang: ee1.NgayNhapHang,
                                    TenNCC: ee1.TenNCC,
                                    SDT: ee1.SDT,
                                    TenTK: ee1.TenTK,
                                    SoTK: ee1.SoTK,
                                    TenNH: ee1.TenNH
                                })
                            });
                            setTabledata(dataNoGhiChu)
                        } else {
                            setTabledata(data)
                        }
                    setFilterarr(filterarr)
                    setTablechange('')
                })
        } else {
            switch (tableType) {
                case 1: await fetch(API_URL + '/searchbackall', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                    })

                })
                    .then((response) => response.json())
                    .then(datas => {
                        const filterCombo = datas.filter(item => item.MaHang.indexOf('COMBO_') < 0)
                        setTabledata(filterCombo)
                        // setTabledata(datas)
                        setTablechange('')
                    });
                    break;
                case 2: await fetch(API_URL + '/searchbackall2', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                    })
                })
                    .then((response) => response.json())
                    .then(datas => {
                        const filterCombo = datas.filter(item => item.MaHang.indexOf('COMBO_') < 0)
                        setTabledata(filterCombo)
                        // setTabledata(datas)
                        setTablechange('')
                    })
                    break;
                case 3: await fetch(API_URL + '/donHang')
                    .then((response) => response.json())
                    .then(data => {
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].NgayXuLy != null) {
                                const nam2 = data[i].NgayXuLy.slice(0, 4)
                                const thang2 = data[i].NgayXuLy.slice(5, 7)
                                const ngay2 = "" + data[i].NgayXuLy.slice(8, 10)
                                data[i].NgayXuLy = ngay2 + "/" + thang2 + "/" + nam2
                            }
                            if (data[i].NgayNhapHang != null) {
                                const nam2 = data[i].NgayNhapHang.slice(0, 4)
                                const thang2 = data[i].NgayNhapHang.slice(5, 7)
                                const ngay2 = "" + data[i].NgayNhapHang.slice(8, 10)
                                data[i].NgayNhapHang = ngay2 + "/" + thang2 + "/" + nam2
                            }
                        }
                        setTabledata(data)
                        setTablechange('')
                    });;
                    break;
                case 4:
                    await fetch(API_URL + "/danhSachTatCaChiTietLoHang")
                        .then(response => response.json())
                        .then(data => {
                            for (let i = 0; i < data.length; i++) {
                                if (data[i].HanSD != null) {
                                    const nam2 = data[i].HanSD.slice(0, 4)
                                    const thang2 = data[i].HanSD.slice(5, 7)
                                    const ngay2 = "" + data[i].HanSD.slice(8, 10)
                                    data[i].HanSD = ngay2 + "/" + thang2 + "/" + nam2
                                }
                                if (data[i].NgayNhapHang != null) {
                                    const nam3 = data[i].NgayNhapHang.slice(0, 4)
                                    const thang3 = data[i].NgayNhapHang.slice(5, 7)
                                    const ngay3 = "" + data[i].NgayNhapHang.slice(8, 10)
                                    data[i].NgayNhapHang = ngay3 + "/" + thang3 + "/" + nam3
                                }
                            }
                            setTabledata(data)
                            setTablechange('')
                        });
                    break;
                case 5:
                    await fetch(API_URL + '/alluser', {
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
                            setTabledata(data)
                            setTablechange('')
                        });
                    break;
                case 6:
                    await fetch(API_URL + '/allstaff', {
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
                            setTabledata(data)
                            setTablechange('')
                        });
                    break;
                case 7:
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
                            setTabledata(data)
                            setTablechange('')
                        });
                    break;
                case 8:
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
                            setTabledata(data)
                            setTablechange('')
                        });
                    break;
                case 10:
                    await fetch(API_URL + '/layBanner', {
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
                            setTabledata(data)
                            setTablechange('')
                        });

                    break;
                case 11:
                    await fetch(API_URL + '/laychuongtrinhkm', {
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
                            for (let i = 0; i < data.length; i++) {
                                if (data[i].ThoiHan != null) {
                                    const nam2 = data[i].ThoiHan.slice(0, 4)
                                    const thang2 = data[i].ThoiHan.slice(5, 7)
                                    const ngay2 = "" + data[i].ThoiHan.slice(8, 10)
                                    data[i].ThoiHan = ngay2 + "/" + thang2 + "/" + nam2
                                }
                            }
                            setTabledata(data)
                            setTablechange('')
                        });

                    break;
                case 12:
                    await fetch(API_URL + '/CongNoKH', {
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
                            for (let i = 0; i < data.length; i++) {
                                if (data[i].NgayXuLy != null) {
                                    const nam2 = data[i].NgayXuLy.slice(0, 4)
                                    const thang2 = data[i].NgayXuLy.slice(5, 7)
                                    const ngay2 = "" + data[i].NgayXuLy.slice(8, 10)
                                    data[i].NgayXuLy = ngay2 + "/" + thang2 + "/" + nam2
                                }

                            }
                            setTabledata(data)
                            setTablechange('')
                        });

                    break;
                case 13:
                    await fetch(API_URL + '/CongNoNCC', {
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
                            for (let i = 0; i < data.length; i++) {
                                if (data[i].NgayNhapHang != null) {
                                    const nam2 = data[i].NgayNhapHang.slice(0, 4)
                                    const thang2 = data[i].NgayNhapHang.slice(5, 7)
                                    const ngay2 = "" + data[i].NgayNhapHang.slice(8, 10)
                                    data[i].NgayNhapHang = ngay2 + "/" + thang2 + "/" + nam2
                                }
                            }
                            setTabledata(data)
                            setTablechange('')
                        });
                    break;
                case 14:
                    await fetch(API_URL + '/danhSachDonHangNhap', {
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
                            for (let i = 0; i < data.length; i++) {
                                if (data[i].NgayNhapHang != null) {
                                    const nam2 = data[i].NgayNhapHang.slice(0, 4)
                                    const thang2 = data[i].NgayNhapHang.slice(5, 7)
                                    const ngay2 = "" + data[i].NgayNhapHang.slice(8, 10)
                                    data[i].NgayNhapHang = ngay2 + "/" + thang2 + "/" + nam2
                                }
                            }
                            setTabledata(data)
                            setTablechange('')
                        });

                    break;
                case 15:
                    await fetch(API_URL + '/DanhSachNCC', {
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
                            setTabledata(data)
                            setTablechange('')
                        });

                    break;
                case 16:
                    await fetch(API_URL + '/GetTC', {
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
                            for (let i = 0; i < data.length; i++) {
                                if (data[i].NgayTC != null) {
                                    const nam2 = data[i].NgayTC.slice(0, 4)
                                    const thang2 = data[i].NgayTC.slice(5, 7)
                                    const ngay2 = "" + data[i].NgayTC.slice(8, 10)
                                    data[i].NgayTC = ngay2 + "/" + thang2 + "/" + nam2
                                }
                            }
                            setTabledata(data)
                            setTablechange('')
                        });

                    break;
                case 17:
                    const res1 = await fetch(`${API_URL}/combo`).then(res => res.json())
                    if (res1 != null && res1 != undefined) {
                        setTabledata(res1)
                        setTablechange('')
                    }
                    break;
                case 18:
                    let res2 = await fetch(`${API_URL}/comboStatistic`).then(res => res.json())
                    if (res2 != null && res2 != undefined) {
                        for (let i = 0; i < res2.length; i++) {
                            if (res2[i].NgayDatHang != null) {
                                const nam2 = res2[i].NgayDatHang.slice(0, 4)
                                const thang2 = res2[i].NgayDatHang.slice(5, 7)
                                const ngay2 = "" + res2[i].NgayDatHang.slice(8, 10)
                                res2[i].NgayDatHang = ngay2 + "/" + thang2 + "/" + nam2
                            }
                            if (res2[i].NgayXuLy != null) {
                                const nam2 = res2[i].NgayXuLy.slice(0, 4)
                                const thang2 = res2[i].NgayXuLy.slice(5, 7)
                                const ngay2 = "" + res2[i].NgayXuLy.slice(8, 10)
                                res2[i].NgayXuLy = ngay2 + "/" + thang2 + "/" + nam2
                            }
                        }
                        setTabledata(res2)
                        setTablechange('')
                    }
                    break;
                case 19:
                    let res3 = await fetch(API_URL + '/article/')
                        .then(res => res.json())
                    if (res3 != null && res3 != undefined) {
                        for (let i = 0; i < res3.length; i++) {
                            if (res3[i].PostDate != null) {
                                const nam2 = res3[i].PostDate.slice(0, 4)
                                const thang2 = res3[i].PostDate.slice(5, 7)
                                const ngay2 = "" + res3[i].PostDate.slice(8, 10)
                                res3[i].PostDate = ngay2 + "/" + thang2 + "/" + nam2
                            }
                        }
                        setTabledata(res3)
                        setTablechange('')
                    }
                    break;

            }
        }
    }, [tablechange]);

    useEffect(async () => {
        // console.log("nothing 2")
        // console.log(tableType+"dwqd")
        switch (tableType) {
            case 1:
                await fetch(API_URL + '/searchbackall', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                    })
                })
                    .then((response) => response.json())
                    .then(datas => {
                        const filterCombo = datas.filter(item => item.MaHang.indexOf('COMBO_') < 0)
                        setTabledata(filterCombo)
                        // setTabledata(datas)
                        setTablechange('')
                    });
                break;
            case 2: await fetch(API_URL + '/searchbackall2', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                })
            })
                .then((response) => response.json())
                .then(datas => {
                    const filterCombo = datas.filter(item => item.MaHang.indexOf('COMBO_') < 0)
                    setTabledata(filterCombo)
                    // setTabledata(datas)
                    setTablechange('')
                });
                break;
            case 3: await fetch(API_URL + '/donHang')
                .then((response) => response.json())
                .then(data => {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].NgayXuLy != null) {
                            const nam2 = data[i].NgayXuLy.slice(0, 4)
                            const thang2 = data[i].NgayXuLy.slice(5, 7)
                            const ngay2 = "" + data[i].NgayXuLy.slice(8, 10)
                            data[i].NgayXuLy = ngay2 + "/" + thang2 + "/" + nam2
                        }
                        if (data[i].NgayDatHang != null) {
                            const nam2 = data[i].NgayDatHang.slice(0, 4)
                            const thang2 = data[i].NgayDatHang.slice(5, 7)
                            const ngay2 = "" + data[i].NgayDatHang.slice(8, 10)
                            data[i].NgayDatHang = ngay2 + "/" + thang2 + "/" + nam2
                        }
                    }
                    setTabledata(data)
                    setTablechange('')
                    resettime()
                });
                break;
            case 4: await fetch(API_URL + "/danhSachTatCaChiTietLoHang")
                .then(response => response.json())
                .then(data => {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].HanSD != null) {
                            const nam2 = data[i].HanSD.slice(0, 4)
                            const thang2 = data[i].HanSD.slice(5, 7)
                            const ngay2 = "" + data[i].HanSD.slice(8, 10)
                            data[i].HanSD = ngay2 + "/" + thang2 + "/" + nam2
                        }
                        if (data[i].NgayNhapHang != null) {
                            const nam3 = data[i].NgayNhapHang.slice(0, 4)
                            const thang3 = data[i].NgayNhapHang.slice(5, 7)
                            const ngay3 = "" + data[i].NgayNhapHang.slice(8, 10)
                            data[i].NgayNhapHang = ngay3 + "/" + thang3 + "/" + nam3
                        }
                    }

                    setTabledata(data)
                });
                break;
            case 5:
                await fetch(API_URL + '/alluser', {
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
                        setTabledata(data)
                    });
                break;
            case 6:
                await fetch(API_URL + '/allstaff', {
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
                        setTabledata(data)
                    });
                break;
            case 7:
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
                        setTabledata(data)
                    });

                break;
            case 8:
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
                        setTabledata(data)
                    });

                break;
            case 9:
                const res = await fetch(`${API_URL}/laySPsaphethang`).then(res => res.json())
                setTabledata(res)
                break;

            case 10:
                await fetch(API_URL + '/layBanner', {
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
                        setTabledata(data)
                    });

                break;
            case 11:
                await fetch(API_URL + '/laychuongtrinhkm', {
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
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].ThoiHan != null) {
                                const nam2 = data[i].ThoiHan.slice(0, 4)
                                const thang2 = data[i].ThoiHan.slice(5, 7)
                                const ngay2 = "" + data[i].ThoiHan.slice(8, 10)
                                data[i].ThoiHan = ngay2 + "/" + thang2 + "/" + nam2
                            }
                        }
                        setTabledata(data)
                    });

                break;
            case 12:
                await fetch(API_URL + '/CongNoKH', {
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
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].NgayXuLy != null) {
                                const nam2 = data[i].NgayXuLy.slice(0, 4)
                                const thang2 = data[i].NgayXuLy.slice(5, 7)
                                const ngay2 = "" + data[i].NgayXuLy.slice(8, 10)
                                data[i].NgayXuLy = ngay2 + "/" + thang2 + "/" + nam2
                            }

                        }
                        setTabledata(data)
                    });
                break;
            case 13:
                await fetch(API_URL + '/CongNoNCC', {
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
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].NgayNhapHang != null) {
                                const nam2 = data[i].NgayNhapHang.slice(0, 4)
                                const thang2 = data[i].NgayNhapHang.slice(5, 7)
                                const ngay2 = "" + data[i].NgayNhapHang.slice(8, 10)
                                data[i].NgayNhapHang = ngay2 + "/" + thang2 + "/" + nam2
                            }
                        }
                        setTabledata(data)
                    });
                break;
            case 14:
                await fetch(API_URL + '/danhSachDonHangNhap', {
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
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].NgayNhapHang != null) {
                                const nam2 = data[i].NgayNhapHang.slice(0, 4)
                                const thang2 = data[i].NgayNhapHang.slice(5, 7)
                                const ngay2 = "" + data[i].NgayNhapHang.slice(8, 10)
                                data[i].NgayNhapHang = ngay2 + "/" + thang2 + "/" + nam2
                            }
                        }
                        setTabledata(data)
                        resettime()
                    });
                break;
            case 15:
                await fetch(API_URL + '/DanhSachNCC', {
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
                        setTabledata(data)
                        setTablechange('')
                    });

                break;
            case 16:
                await fetch(API_URL + '/GetTC', {
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
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].NgayTC != null) {
                                const nam2 = data[i].NgayTC.slice(0, 4)
                                const thang2 = data[i].NgayTC.slice(5, 7)
                                const ngay2 = "" + data[i].NgayTC.slice(8, 10)
                                data[i].NgayTC = ngay2 + "/" + thang2 + "/" + nam2
                            }
                        }
                        setTabledata(data)
                        setTablechange('')
                    });
                break;
            case 17:
                const res1 = await fetch(`${API_URL}/combo`).then(res => res.json())
                if (res1 != null && res1 != undefined) {
                    setTabledata(res1)
                    setTablechange('')
                }
                break;
            case 18:
                let res2 = await fetch(`${API_URL}/comboStatistic`).then(res => res.json())
                if (res2 != null && res2 != undefined) {
                    for (let i = 0; i < res2.length; i++) {
                        if (res2[i].NgayDatHang != null) {
                            const nam2 = res2[i].NgayDatHang.slice(0, 4)
                            const thang2 = res2[i].NgayDatHang.slice(5, 7)
                            const ngay2 = "" + res2[i].NgayDatHang.slice(8, 10)
                            res2[i].NgayDatHang = ngay2 + "/" + thang2 + "/" + nam2
                        }
                        if (res2[i].NgayXuLy != null) {
                            const nam2 = res2[i].NgayXuLy.slice(0, 4)
                            const thang2 = res2[i].NgayXuLy.slice(5, 7)
                            const ngay2 = "" + res2[i].NgayXuLy.slice(8, 10)
                            res2[i].NgayXuLy = ngay2 + "/" + thang2 + "/" + nam2
                        }
                    }
                    setTabledata(res2)
                    setTablechange('')
                }
                break;
            case 19:
                let res3 = await fetch(API_URL + '/article/')
                    .then(res => res.json())
                if (res3 != null && res3 != undefined) {
                    for (let i = 0; i < res3.length; i++) {
                        if (res3[i].PostDate != null) {
                            const nam2 = res3[i].PostDate.slice(0, 4)
                            const thang2 = res3[i].PostDate.slice(5, 7)
                            const ngay2 = "" + res3[i].PostDate.slice(8, 10)
                            res3[i].PostDate = ngay2 + "/" + thang2 + "/" + nam2
                        }
                    }
                    setTabledata(res3)
                    setTablechange('')
                }
                break;

        }
    }, [tableType]);

    const callbackCandate = async (childData) => {
        // console.log("viet api")
        await fetch(API_URL + "/hangCanDate")
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].HanSD != null) {
                        const nam2 = data[i].HanSD.slice(0, 4)
                        const thang2 = data[i].HanSD.slice(5, 7)
                        const ngay2 = "" + data[i].HanSD.slice(8, 10)
                        let tmp = new Date(nam2 + "-" + thang2 + "-" + ngay2)
                        tmp.setDate(tmp.getDate() + 1)
                        const nam = tmp.getFullYear()
                        let thang = (tmp.getMonth() + 1).toString()
                        if (thang.length == 1) {
                            thang = "0" + thang
                        }
                        let ngay = tmp.getDate().toString()
                        if (ngay.length == 1) {
                            ngay = "0" + ngay
                        }
                        data[i].HanSD = ngay + "/" + thang + "/" + nam
                    }
                    if (data[i].NgayNhapHang != null) {
                        const nam3 = data[i].NgayNhapHang.slice(0, 4)
                        const thang3 = data[i].NgayNhapHang.slice(5, 7)
                        const ngay3 = "" + data[i].NgayNhapHang.slice(8, 10)
                        let tmp2 = new Date(nam3 + "-" + thang3 + "-" + ngay3)
                        tmp2.setDate(tmp2.getDate() + 1)
                        const nam4 = tmp2.getFullYear()
                        let thang4 = (tmp2.getMonth() + 1).toString()
                        if (thang4.length == 1) {
                            thang4 = "0" + thang4
                        }
                        let ngay4 = tmp2.getDate().toString()
                        if (ngay4.length == 1) {
                            ngay4 = "0" + ngay4
                        }
                        data[i].NgayNhapHang = ngay4 + "/" + thang4 + "/" + nam4
                    }
                }
                let dataNoGhiChu = []
                data.forEach(ee1 => {
                    dataNoGhiChu.push({
                        IdSTT: ee1.IdSTT,
                        MaHang: ee1.MaHang,
                        TenHang: ee1.TenHang,
                        SoLuong: ee1.SoLuong,
                        DonGia: ee1.DonGia,
                        DVT: ee1.DVT,
                        MaLH: ee1.MaLH,
                        HanSD: ee1.HanSD,
                        NgayNhapHang: ee1.NgayNhapHang,
                        TenNCC: ee1.TenNCC,
                        SDT: ee1.SDT,
                        TenTK: ee1.TenTK,
                        SoTK: ee1.SoTK,
                        TenNH: ee1.TenNH
                    })
                });
                setTabledata(dataNoGhiChu)
            });

    };

    const callbackFunction = async (childData) => {
        verifytoken();
        setTablechange(childData)
        // setTableType(0)
    };

    const callbackFunction2 = async (childData2) => {
        verifytoken();
        // console.log(childData2)
        if ((childData2 == null || childData2[0] == null || childData2 == [] || childData2.length == 0) && time == "") {
            // console.log("childData2")
            setFilterarr("")
            setTablechange('change')

            //setTime("")
        } else {
            if (tableType == 12 || tableType == 13) {
                // console.log("dwqdwqdsadsad")
                switch (tableType) {
                    case 12:
                        await fetch(API_URL + '/searchfiltercn', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                searchArr: childData2,
                                tableVar: table,
                            })
                        })
                            .then((response) => response.json())
                            .then(data => {
                                for (let i = 0; i < data.length; i++) {
                                    if (data[i].NgayXuLy != null) {
                                        const nam2 = data[i].NgayXuLy.slice(0, 4)
                                        const thang2 = data[i].NgayXuLy.slice(5, 7)
                                        const ngay2 = "" + data[i].NgayXuLy.slice(8, 10)
                                        data[i].NgayXuLy = ngay2 + "/" + thang2 + "/" + nam2
                                    }
                                }
                                setTabledata(data)
                            })
                        break;
                    case 13:
                        await fetch(API_URL + '/searchfiltercnncc', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                searchArr: childData2,
                                tableVar: table,
                            })
                        })
                            .then((response) => response.json())
                            .then(data => {
                                for (let i = 0; i < data.length; i++) {
                                    if (data[i].NgayNhapHang != null) {
                                        const nam2 = data[i].NgayNhapHang.slice(0, 4)
                                        const thang2 = data[i].NgayNhapHang.slice(5, 7)
                                        const ngay2 = "" + data[i].NgayNhapHang.slice(8, 10)
                                        data[i].NgayNhapHang = ngay2 + "/" + thang2 + "/" + nam2
                                    }
                                }
                                setTabledata(data)
                            })
                        break;
                }

            } else {
                // console.log("dwqdwqd")
                await fetch(API_URL + '/searchfilter', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        searchArr: childData2,
                        tableVar: table,
                        times: time,
                        //columnVar: childData2[0].columnName,
                        //searchVar: childData2[0].value
                    })
                })
                    .then((response) => response.json())
                    .then(data => {
                        // console.log(new Date().getTime() + " data= " + JSON.stringify(data))
                        if (tableType == 3) {
                            for (let i = 0; i < data.length; i++) {
                                if (data[i].NgayDatHang != null) {
                                    const nam2 = data[i].NgayDatHang.slice(0, 4)
                                    const thang2 = data[i].NgayDatHang.slice(5, 7)
                                    const ngay2 = "" + data[i].NgayDatHang.slice(8, 10)
                                    let tmp = new Date(nam2 + "-" + thang2 + "-" + ngay2)
                                    tmp.setDate(tmp.getDate() + 1)
                                    const nam = tmp.getFullYear()
                                    let thang = (tmp.getMonth() + 1).toString()
                                    if (thang.length == 1) {
                                        thang = "0" + thang
                                    }
                                    let ngay = tmp.getDate().toString()
                                    if (ngay.length == 1) {
                                        ngay = "0" + ngay
                                    }
                                    data[i].NgayDatHang = ngay + "/" + thang + "/" + nam
                                }
                                if (data[i].NgayXuLy != null) {
                                    const nam3 = data[i].NgayXuLy.slice(0, 4)
                                    const thang3 = data[i].NgayXuLy.slice(5, 7)
                                    const ngay3 = "" + data[i].NgayXuLy.slice(8, 10)
                                    let tmp2 = new Date(nam3 + "-" + thang3 + "-" + ngay3)
                                    tmp2.setDate(tmp2.getDate() + 1)
                                    const nam4 = tmp2.getFullYear()
                                    let thang4 = (tmp2.getMonth() + 1).toString()
                                    if (thang4.length == 1) {
                                        thang4 = "0" + thang4
                                    }
                                    let ngay4 = tmp2.getDate().toString()
                                    if (ngay4.length == 1) {
                                        ngay4 = "0" + ngay4
                                    }
                                    data[i].NgayXuLy = ngay4 + "/" + thang4 + "/" + nam4
                                }
                            }
                            setTabledata(data)
                        } else
                            if (tableType == 4) {
                                for (let i = 0; i < data.length; i++) {
                                    if (data[i].HanSD != null) {
                                        const nam2 = data[i].HanSD.slice(0, 4)
                                        const thang2 = data[i].HanSD.slice(5, 7)
                                        const ngay2 = "" + data[i].HanSD.slice(8, 10)
                                        let tmp = new Date(nam2 + "-" + thang2 + "-" + ngay2)
                                        tmp.setDate(tmp.getDate() + 1)
                                        const nam = tmp.getFullYear()
                                        let thang = (tmp.getMonth() + 1).toString()
                                        if (thang.length == 1) {
                                            thang = "0" + thang
                                        }
                                        let ngay = tmp.getDate().toString()
                                        if (ngay.length == 1) {
                                            ngay = "0" + ngay
                                        }
                                        data[i].HanSD = ngay + "/" + thang + "/" + nam
                                    }
                                    if (data[i].NgayNhapHang != null) {
                                        const nam3 = data[i].NgayNhapHang.slice(0, 4)
                                        const thang3 = data[i].NgayNhapHang.slice(5, 7)
                                        const ngay3 = "" + data[i].NgayNhapHang.slice(8, 10)
                                        let tmp2 = new Date(nam3 + "-" + thang3 + "-" + ngay3)
                                        tmp2.setDate(tmp2.getDate() + 1)
                                        const nam4 = tmp2.getFullYear()
                                        let thang4 = (tmp2.getMonth() + 1).toString()
                                        if (thang4.length == 1) {
                                            thang4 = "0" + thang4
                                        }
                                        let ngay4 = tmp2.getDate().toString()
                                        if (ngay4.length == 1) {
                                            ngay4 = "0" + ngay4
                                        }
                                        data[i].NgayNhapHang = ngay4 + "/" + thang4 + "/" + nam4
                                    }
                                }
                                let dataNoGhiChu = []
                                data.forEach(ee1 => {
                                    dataNoGhiChu.push({
                                        IdSTT: ee1.IdSTT,
                                        MaHang: ee1.MaHang,
                                        TenHang: ee1.TenHang,
                                        SoLuong: ee1.SoLuong,
                                        DonGia: ee1.DonGia,
                                        DVT: ee1.DVT,
                                        MaLH: ee1.MaLH,
                                        HanSD: ee1.HanSD,
                                        NgayNhapHang: ee1.NgayNhapHang,
                                        TenNCC: ee1.TenNCC,
                                        SDT: ee1.SDT,
                                        TenTK: ee1.TenTK,
                                        SoTK: ee1.SoTK,
                                        TenNH: ee1.TenNH
                                    })
                                });
                                setTabledata(dataNoGhiChu)
                            } else {
                                setTabledata(data)
                            }
                        setFilterarr(childData2)
                    })
            }
        }
    };

    const funcFilterHetHang = async (childData2) => {
        verifytoken();
        if (childData2 == null || childData2[0] == null || childData2 == []) {
            setTablechange('change')
            setFilterarr("")
        } else {
            const requestOptions = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    searchArr: childData2,
                    tableVar: 'sanpham',
                })
            }
            const res = await fetch(`${API_URL}/filterHetHang`, requestOptions).then(res => res.json())
            setTabledata(res)
            setFilterarr(childData2)
        }
    }

    const callbackFunction3 = async (childData3) => {
        switch (parseInt(childData3.type)) {
            case 1:
                //console.log("gigi")
                await fetch(API_URL + '/donHangYears', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        year: getYear(childData3.time),
                    })
                })
                    .then((response) => response.json())
                    .then(data => {
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].NgayDatHang != null) {
                                const nam2 = data[i].NgayDatHang.slice(0, 4)
                                const thang2 = data[i].NgayDatHang.slice(5, 7)
                                const ngay2 = "" + data[i].NgayDatHang.slice(8, 10)
                                let tmp = new Date(nam2 + "-" + thang2 + "-" + ngay2)
                                tmp.setDate(tmp.getDate() + 1)
                                const nam = tmp.getFullYear()
                                let thang = (tmp.getMonth() + 1).toString()
                                if (thang.length == 1) {
                                    thang = "0" + thang
                                }
                                let ngay = tmp.getDate().toString()
                                if (ngay.length == 1) {
                                    ngay = "0" + ngay
                                }
                                data[i].NgayDatHang = ngay + "/" + thang + "/" + nam
                            }
                            if (data[i].NgayXuLy != null) {
                                const nam3 = data[i].NgayXuLy.slice(0, 4)
                                const thang3 = data[i].NgayXuLy.slice(5, 7)
                                const ngay3 = "" + data[i].NgayXuLy.slice(8, 10)
                                let tmp2 = new Date(nam3 + "-" + thang3 + "-" + ngay3)
                                tmp2.setDate(tmp2.getDate() + 1)
                                const nam4 = tmp2.getFullYear()
                                let thang4 = (tmp2.getMonth() + 1).toString()
                                if (thang4.length == 1) {
                                    thang4 = "0" + thang4
                                }
                                let ngay4 = tmp2.getDate().toString()
                                if (ngay4.length == 1) {
                                    ngay4 = "0" + ngay4
                                }
                                data[i].NgayXuLy = ngay4 + "/" + thang4 + "/" + nam4
                            }
                        }
                        setTabledata(data)
                    })
                break;
            case 2:
                await fetch(API_URL + '/donHangMonths', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        month: getMonth(childData3.time) + 1,
                    })
                })
                    .then((response) => response.json())
                    .then(data => {
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].NgayDatHang != null) {
                                const nam2 = data[i].NgayDatHang.slice(0, 4)
                                const thang2 = data[i].NgayDatHang.slice(5, 7)
                                const ngay2 = "" + data[i].NgayDatHang.slice(8, 10)
                                let tmp = new Date(nam2 + "-" + thang2 + "-" + ngay2)
                                tmp.setDate(tmp.getDate() + 1)
                                const nam = tmp.getFullYear()
                                let thang = (tmp.getMonth() + 1).toString()
                                if (thang.length == 1) {
                                    thang = "0" + thang
                                }
                                let ngay = tmp.getDate().toString()
                                if (ngay.length == 1) {
                                    ngay = "0" + ngay
                                }
                                data[i].NgayDatHang = ngay + "/" + thang + "/" + nam
                            }
                            if (data[i].NgayXuLy != null) {
                                const nam3 = data[i].NgayXuLy.slice(0, 4)
                                const thang3 = data[i].NgayXuLy.slice(5, 7)
                                const ngay3 = "" + data[i].NgayXuLy.slice(8, 10)
                                let tmp2 = new Date(nam3 + "-" + thang3 + "-" + ngay3)
                                tmp2.setDate(tmp2.getDate() + 1)
                                const nam4 = tmp2.getFullYear()
                                let thang4 = (tmp2.getMonth() + 1).toString()
                                if (thang4.length == 1) {
                                    thang4 = "0" + thang4
                                }
                                let ngay4 = tmp2.getDate().toString()
                                if (ngay4.length == 1) {
                                    ngay4 = "0" + ngay4
                                }
                                data[i].NgayXuLy = ngay4 + "/" + thang4 + "/" + nam4
                            }
                        }
                        setTabledata(data)
                    })
                break;
            case 3:
                console.log(getQuarter(childData3.time))
                //setTable("donhang");
                break;
            case 4:
                console.log(childData3.time)
                // setTable("chitietlohang");
                break;
        }
        // verifytoken();     
        //    

    };

    const changetable = (x) => {
        verifytoken();
        setTableType(x)
        switch (x) {
            case 1: setTable("sanpham");
                break;
            case 2: setTable("sanpham");
                break;
            case 3: setTable("donhang");
                break;
            case 4: setTable("chitietlohang");
                break;
            case 5: setTable("nhanvien");
                break;
            case 6: setTable("nhanvien2");
                break;
            case 7: setTable("doidiem");
                break;
            case 8: setTable("doiqua");
                break;
            case 9: setTable("sanpham");
                break;
            case 10: setTable("banner");
                break;
            case 11: setTable("chuongtrinhkm");
                break;
            case 12: setTable("donhang");
                break;
            case 13: setTable("donhangnhap");
                break;
            case 14: setTable("donhangnhap");
                break;
            case 15: setTable("nhacungcap");
                break;
            case 16: setTable("thuchi");
                break;
            case 17: setTable("combo");
                break;
            case 18: setTable("combostatistic");
                break;
            case 19: setTable("article");
                break;
        }
        sessionStorage.setItem("menu", x)
        setOpenOption(false)
    };

    const resettime = () => {
        setTime("")
        setTablechange("change2")
    };
    /////////////
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleClose_logout = () => {
        localStorage.removeItem("accesstoken2")
        history.push("/QuanLy")
        setOpen(false);
    };
    const handleClose_nologout = () => {
        setOpen(false);
    };


    useEffect(async () => {
        if (tableType == 7 || tableType == 8) {
            console.log("gi dau khong ha`")
        } else {
            if (time != "") {
                // console.log(time)
                await fetch(API_URL + '/searchfilter', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        searchArr: filterarr,
                        tableVar: table,
                        times: time,
                    })
                })
                    .then((response) => response.json())
                    .then(data => {
                        if (table == 'donhang') {
                            for (let i = 0; i < data.length; i++) {
                                if (data[i].NgayDatHang != null) {
                                    const nam2 = data[i].NgayDatHang.slice(0, 4)
                                    const thang2 = data[i].NgayDatHang.slice(5, 7)
                                    const ngay2 = "" + data[i].NgayDatHang.slice(8, 10)
                                    let tmp = new Date(nam2 + "-" + thang2 + "-" + ngay2)
                                    tmp.setDate(tmp.getDate() + 1)
                                    const nam = tmp.getFullYear()
                                    let thang = (tmp.getMonth() + 1).toString()
                                    if (thang.length == 1) {
                                        thang = "0" + thang
                                    }
                                    let ngay = tmp.getDate().toString()
                                    if (ngay.length == 1) {
                                        ngay = "0" + ngay
                                    }
                                    data[i].NgayDatHang = ngay + "/" + thang + "/" + nam
                                }
                                if (data[i].NgayXuLy != null) {
                                    const nam3 = data[i].NgayXuLy.slice(0, 4)
                                    const thang3 = data[i].NgayXuLy.slice(5, 7)
                                    const ngay3 = "" + data[i].NgayXuLy.slice(8, 10)
                                    let tmp2 = new Date(nam3 + "-" + thang3 + "-" + ngay3)
                                    tmp2.setDate(tmp2.getDate() + 1)
                                    const nam4 = tmp2.getFullYear()
                                    let thang4 = (tmp2.getMonth() + 1).toString()
                                    if (thang4.length == 1) {
                                        thang4 = "0" + thang4
                                    }
                                    let ngay4 = tmp2.getDate().toString()
                                    if (ngay4.length == 1) {
                                        ngay4 = "0" + ngay4
                                    }
                                    data[i].NgayXuLy = ngay4 + "/" + thang4 + "/" + nam4
                                }
                            }
                            setTabledata(data)
                        } else
                            if (table == 'lohang') {
                                for (let i = 0; i < data.length; i++) {
                                    if (data[i].HanSD != null) {
                                        const nam2 = data[i].HanSD.slice(0, 4)
                                        const thang2 = data[i].HanSD.slice(5, 7)
                                        const ngay2 = "" + data[i].HanSD.slice(8, 10)
                                        let tmp = new Date(nam2 + "-" + thang2 + "-" + ngay2)
                                        tmp.setDate(tmp.getDate() + 1)
                                        const nam = tmp.getFullYear()
                                        let thang = (tmp.getMonth() + 1).toString()
                                        if (thang.length == 1) {
                                            thang = "0" + thang
                                        }
                                        let ngay = tmp.getDate().toString()
                                        if (ngay.length == 1) {
                                            ngay = "0" + ngay
                                        }
                                        data[i].HanSD = ngay + "/" + thang + "/" + nam
                                    }
                                    if (data[i].NgayNhapHang != null) {
                                        const nam3 = data[i].NgayNhapHang.slice(0, 4)
                                        const thang3 = data[i].NgayNhapHang.slice(5, 7)
                                        const ngay3 = "" + data[i].NgayNhapHang.slice(8, 10)
                                        let tmp2 = new Date(nam3 + "-" + thang3 + "-" + ngay3)
                                        tmp2.setDate(tmp2.getDate() + 1)
                                        const nam4 = tmp2.getFullYear()
                                        let thang4 = (tmp2.getMonth() + 1).toString()
                                        if (thang4.length == 1) {
                                            thang4 = "0" + thang4
                                        }
                                        let ngay4 = tmp2.getDate().toString()
                                        if (ngay4.length == 1) {
                                            ngay4 = "0" + ngay4
                                        }
                                        data[i].NgayNhapHang = ngay4 + "/" + thang4 + "/" + nam4
                                    }
                                }
                                let dataNoGhiChu = []
                                data.forEach(ee1 => {
                                    dataNoGhiChu.push({
                                        IdSTT: ee1.IdSTT,
                                        MaHang: ee1.MaHang,
                                        TenHang: ee1.TenHang,
                                        SoLuong: ee1.SoLuong,
                                        DonGia: ee1.DonGia,
                                        DVT: ee1.DVT,
                                        MaLH: ee1.MaLH,
                                        HanSD: ee1.HanSD,
                                        NgayNhapHang: ee1.NgayNhapHang,
                                        TenNCC: ee1.TenNCC,
                                        SDT: ee1.SDT,
                                        TenTK: ee1.TenTK,
                                        SoTK: ee1.SoTK,
                                        TenNH: ee1.TenNH
                                    })
                                });
                                setTabledata(dataNoGhiChu)
                            } else {
                                setTabledata(data)
                            }
                    })
            }
        }

    }, [time]);

    const dateFixed = (date) => {
        setOpenOption(false);
        switch (date) {
            case 'Homnay':
                var newDate = new Date()
                var dateofweek = newDate.getDate();
                var month = newDate.getMonth() + 1;
                var year = newDate.getFullYear();
                var calendar = year + "-" + month + "-" + dateofweek;
                //alert(calendar);
                setTime({ type: 1, time: calendar, time2: calendar })
                break;
            case 'Homqua':
                var newDate = new Date()
                var dateofweek = subDays(new Date(), 1);
                var yesterday = getDate(dateofweek)
                var month = getMonth(dateofweek) + 1;
                var year = getYear(dateofweek);
                var calendar = year + "-" + month + "-" + yesterday;
                //alert(calendar);
                setTime({ type: 1, time: calendar, time2: calendar })
                break;
            case '7NgayQua':
                var newDate = new Date()
                var dateofweek = newDate.getDate();
                var month = newDate.getMonth() + 1;
                var year = newDate.getFullYear();
                var calendar = year + "-" + month + "-" + dateofweek;
                var last = subDays(new Date(), 7);
                var date7last = getDate(last);
                var month7last = getMonth(last) + 1;
                var year7last = getYear(last);
                var calendar7last = year7last + "-" + month7last + "-" + date7last;
                // alert(calendar7last + " đến " + calendar);
                setTime({ type: 1, time: calendar7last, time2: calendar })
                break;
            case 'TuanNay':
                var newDate = new Date()
                var dayIndex = newDate.getDay();
                var diffToLastMonday = (dayIndex !== 0) ? dayIndex - 1 : 6;
                var dateOfMonday = new Date(newDate.setDate(newDate.getDate() - diffToLastMonday));
                var dateOfSunday = new Date(newDate.setDate(dateOfMonday.getDate() + 6));
                var monday_format = getYear(dateOfMonday) + '-' + (getMonth(dateOfMonday) + 1) + '-' + getDate(dateOfMonday);
                var sunday_format = getYear(dateOfSunday) + '-' + (getMonth(dateOfSunday) + 1) + '-' + getDate(dateOfSunday);
                //var calendar = monday_format + ' đến ' + sunday_format;
                //alert(calendar);
                setTime({ type: 1, time: monday_format, time2: sunday_format })
                break;
            case 'TuanTruoc':
                var newDate = new Date()
                var dayIndex = newDate.getDay();
                var diffToLastMonday = (dayIndex !== 0) ? dayIndex - 1 : 6;
                var dateOfSundayLast = new Date(newDate.setDate(newDate.getDate() - diffToLastMonday - 1));
                var dateOfMondayLast = new Date(newDate.setDate(dateOfSundayLast.getDate() - 6));
                var sunday_format = getYear(dateOfSundayLast) + '-' + (getMonth(dateOfSundayLast) + 1) + '-' + getDate(dateOfSundayLast);
                var monday_format = getYear(dateOfMondayLast) + '-' + (getMonth(dateOfMondayLast) + 1) + '-' + getDate(dateOfMondayLast);
                //var calendar = monday_format + " đến " + sunday_format;
                //alert(calendar);
                setTime({ type: 1, time: monday_format, time2: sunday_format })
                break;
            case 'Thangnay':
                var newDate = new Date()
                var month = newDate.getMonth() + 1;
                var year = newDate.getFullYear();
                //var calendar = month + "/" + year;
                //alert(calendar);
                setTime({ type: 2, time: month, time2: year })
                break;
            case 'Thangtruoc':
                var newDate = new Date()
                var month = newDate.getMonth();
                var year = newDate.getFullYear();
                // var calendar = month + "/" + year;
                // alert(calendar);
                setTime({ type: 2, time: month, time2: year })
                break;
            case 'Quynay':
                var newDate = new Date()
                //var month = newDate.getMonth() + 1;
                var quarter = getQuarter(newDate)
                var year = newDate.getFullYear();
                //var calendar = month + "/" + year;
                //alert(quarter);
                switch (quarter) {
                    case 1:
                        var calendar = year + "-" + '1' + "-" + '1';
                        var calendar2 = year + "-" + '3' + "-" + '31';
                        setTime({ type: 1, time: calendar, time2: calendar2 })
                        break;
                    case 2:
                        var calendar = year + "-" + '4' + "-" + '1';
                        var calendar2 = year + "-" + '6' + "-" + '30';
                        setTime({ type: 1, time: calendar, time2: calendar2 })
                        break;
                    case 3:
                        var calendar = year + "-" + '7' + "-" + '1';
                        var calendar2 = year + "-" + '9' + "-" + '30';
                        setTime({ type: 1, time: calendar, time2: calendar2 })
                        break;
                    case 4:
                        var calendar = year + "-" + '10' + "-" + '1';
                        var calendar2 = year + "-" + '12' + "-" + '31';
                        setTime({ type: 1, time: calendar, time2: calendar2 })
                        break;
                }
                //setTime({ type: 2, time: month, time2: year })
                break;
            case 'Quytruoc':
                var newDate = new Date()
                if (getQuarter(newDate) - 1 == 0) {
                    var quarter = 4
                    var year = newDate.getFullYear() - 1;
                } else {
                    var quarter = getQuarter(newDate) - 1
                    var year = newDate.getFullYear();
                }
                switch (quarter) {
                    case 1:
                        var calendar = year + "-" + '1' + "-" + '1';
                        var calendar2 = year + "-" + '3' + "-" + '31';
                        setTime({ type: 1, time: calendar, time2: calendar2 })
                        break;
                    case 2:
                        var calendar = year + "-" + '4' + "-" + '1';
                        var calendar2 = year + "-" + '6' + "-" + '30';
                        setTime({ type: 1, time: calendar, time2: calendar2 })
                        break;
                    case 3:
                        var calendar = year + "-" + '7' + "-" + '1';
                        var calendar2 = year + "-" + '9' + "-" + '30';
                        setTime({ type: 1, time: calendar, time2: calendar2 })
                        break;
                    case 4:
                        var calendar = year + "-" + '10' + "-" + '1';
                        var calendar2 = year + "-" + '12' + "-" + '31';
                        setTime({ type: 1, time: calendar, time2: calendar2 })
                        break;
                }
                break;
            case '30NgayQua':
                var newDate = new Date()
                var dateofweek = newDate.getDate();
                var month = newDate.getMonth() + 1;
                var year = newDate.getFullYear();
                var calendar = year + "-" + month + "-" + dateofweek;
                var last = subDays(new Date(), 30);
                var date30last = getDate(last);
                var month30last = getMonth(last) + 1;
                var year30last = getYear(last);
                var calendar30last = year30last + "-" + month30last + "-" + date30last;
                // alert(calendar30last + " đến " + calendar);
                setTime({ type: 1, time: calendar30last, time2: calendar })
                break;
            case 'Namnay':
                var newDate = new Date()
                var year = newDate.getFullYear();
                // alert(year);
                setTime({ type: 3, time: year, time2: year })
                break;
            case 'Namtruoc':
                var newDate = new Date()
                var year = newDate.getFullYear() - 1;
                //alert(year);
                setTime({ type: 3, time: year, time2: year })
                break;
        }
    };
    const TimKiemDateFromTo = () => {
        setOpenOption(false);
        switch (loaitk) {
            case '1':
                //alert(getYear(startDate));
                setTime({ type: 3, time: getYear(startDate), time2: getYear(startDate) })
                break;
            case '2':
                var monthYear = (getMonth(startDate) + 1) + '/' + getYear(startDate);
                //alert(monthYear);
                setTime({ type: 2, time: (getMonth(startDate) + 1), time2: getYear(startDate) })
                break;
            case '3':
                //var monthYear = (getQuarter(startDate)) + '/' + getYear(startDate);
                switch (getQuarter(startDate)) {
                    case 1:
                        var calendar = getYear(startDate) + "-" + '1' + "-" + '1';
                        var calendar2 = getYear(startDate) + "-" + '3' + "-" + '31';
                        setTime({ type: 1, time: calendar, time2: calendar2 })
                        break;
                    case 2:
                        var calendar = getYear(startDate) + "-" + '4' + "-" + '1';
                        var calendar2 = getYear(startDate) + "-" + '6' + "-" + '30';
                        setTime({ type: 1, time: calendar, time2: calendar2 })
                        break;
                    case 3:
                        var calendar = getYear(startDate) + "-" + '7' + "-" + '1';
                        var calendar2 = getYear(startDate) + "-" + '9' + "-" + '30';
                        setTime({ type: 1, time: calendar, time2: calendar2 })
                        break;
                    case 4:
                        var calendar = getYear(startDate) + "-" + '10' + "-" + '1';
                        var calendar2 = getYear(startDate) + "-" + '12' + "-" + '31';
                        setTime({ type: 1, time: calendar, time2: calendar2 })
                        break;
                }
                break;
            case '4':
                var dateFrom = getYear(startDate) + '-' + (getMonth(startDate) + 1) + '-' + getDate(startDate);
                var dateTo = getYear(startDateTo) + '-' + (getMonth(startDateTo) + 1) + '-' + getDate(startDateTo);
                //alert(dateFrom + ' đến ' + dateTo);
                setTime({ type: 1, time: dateFrom, time2: dateTo })
                break;
        }
    };
    const ClickOutside = () => {
        setDialogChooseTime(false)
        setOpenTime(false)
        setOpenTimeFixed(false)
    };

    const [searchString, setSearchString] = useState("");
    const handleOnSearch = (string, results) => {
        // if(tableType==7 || tableType==8 || tableType==10 || tableType==11 ){
        //     setSearchString("");  
        // }else{
        setSearchString(string);



    }
    const handleKeyPress = async (event) => {
        verifytoken();
        if (event.key === 'Enter') {
            if (searchString === "") {
                switch (tableType) {
                    case 1: await fetch(API_URL + '/searchbackall', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                        })
                    })
                        .then((response) => response.json())
                        .then(datas => {
                            setTabledata(datas)
                            setTablechange('')
                        });
                        break;
                    case 2: await fetch(API_URL + '/searchbackall2', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                        })
                    })
                        .then((response) => response.json())
                        .then(datas => {
                            const filterCombo = datas.filter(item => item.MaHang.indexOf('COMBO_') < 0)
                            setTabledata(filterCombo)
                            // setTabledata(datas)
                            setTablechange('')
                        })
                        break;
                    case 3: await fetch(API_URL + '/donHang')
                        .then((response) => response.json())
                        .then(data => {
                            for (let i = 0; i < data.length; i++) {
                                if (data[i].NgayDatHang != null) {
                                    const nam2 = data[i].NgayDatHang.slice(0, 4)
                                    const thang2 = data[i].NgayDatHang.slice(5, 7)
                                    const ngay2 = "" + data[i].NgayDatHang.slice(8, 10)
                                    let tmp = new Date(nam2 + "-" + thang2 + "-" + ngay2)
                                    tmp.setDate(tmp.getDate() + 1)
                                    const nam = tmp.getFullYear()
                                    let thang = (tmp.getMonth() + 1).toString()
                                    if (thang.length == 1) {
                                        thang = "0" + thang
                                    }
                                    let ngay = tmp.getDate().toString()
                                    if (ngay.length == 1) {
                                        ngay = "0" + ngay
                                    }
                                    data[i].NgayDatHang = ngay + "/" + thang + "/" + nam
                                }
                                if (data[i].NgayXuLy != null) {
                                    const nam3 = data[i].NgayXuLy.slice(0, 4)
                                    const thang3 = data[i].NgayXuLy.slice(5, 7)
                                    const ngay3 = "" + data[i].NgayXuLy.slice(8, 10)
                                    let tmp2 = new Date(nam3 + "-" + thang3 + "-" + ngay3)
                                    tmp2.setDate(tmp2.getDate() + 1)
                                    const nam4 = tmp2.getFullYear()
                                    let thang4 = (tmp2.getMonth() + 1).toString()
                                    if (thang4.length == 1) {
                                        thang4 = "0" + thang4
                                    }
                                    let ngay4 = tmp2.getDate().toString()
                                    if (ngay4.length == 1) {
                                        ngay4 = "0" + ngay4
                                    }
                                    data[i].NgayXuLy = ngay4 + "/" + thang4 + "/" + nam4
                                }
                            }
                            setTabledata(data)
                            setTablechange('')
                        });;
                        break;
                    case 4: await fetch(API_URL + "/danhSachTatCaChiTietLoHang")
                        .then(response => response.json())
                        .then(data => {
                            for (let i = 0; i < data.length; i++) {
                                if (data[i].HanSD != null) {
                                    const nam2 = data[i].HanSD.slice(0, 4)
                                    const thang2 = data[i].HanSD.slice(5, 7)
                                    const ngay2 = "" + data[i].HanSD.slice(8, 10)
                                    let tmp = new Date(nam2 + "-" + thang2 + "-" + ngay2)
                                    tmp.setDate(tmp.getDate() + 1)
                                    const nam = tmp.getFullYear()
                                    let thang = (tmp.getMonth() + 1).toString()
                                    if (thang.length == 1) {
                                        thang = "0" + thang
                                    }
                                    let ngay = tmp.getDate().toString()
                                    if (ngay.length == 1) {
                                        ngay = "0" + ngay
                                    }
                                    data[i].HanSD = ngay + "/" + thang + "/" + nam
                                }
                                if (data[i].NgayNhapHang != null) {
                                    const nam3 = data[i].NgayNhapHang.slice(0, 4)
                                    const thang3 = data[i].NgayNhapHang.slice(5, 7)
                                    const ngay3 = "" + data[i].NgayNhapHang.slice(8, 10)
                                    let tmp2 = new Date(nam3 + "-" + thang3 + "-" + ngay3)
                                    tmp2.setDate(tmp2.getDate() + 1)
                                    const nam4 = tmp2.getFullYear()
                                    let thang4 = (tmp2.getMonth() + 1).toString()
                                    if (thang4.length == 1) {
                                        thang4 = "0" + thang4
                                    }
                                    let ngay4 = tmp2.getDate().toString()
                                    if (ngay4.length == 1) {
                                        ngay4 = "0" + ngay4
                                    }
                                    data[i].NgayNhapHang = ngay4 + "/" + thang4 + "/" + nam4
                                }
                            }
                            setTabledata(data)
                            setTablechange('')
                        });
                        break;
                    case 5:
                        await fetch(API_URL + '/alluser', {
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
                                setTabledata(data)
                                setTablechange('')
                            });
                        break;
                    case 6:
                        await fetch(API_URL + '/allstaff', {
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
                                setTabledata(data)
                                setTablechange('')
                            });
                        break;
                    case 12:
                        await fetch(API_URL + '/CongNoKH', {
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
                                for (let i = 0; i < data.length; i++) {
                                    if (data[i].NgayXuLy != null) {
                                        const nam2 = data[i].NgayXuLy.slice(0, 4)
                                        const thang2 = data[i].NgayXuLy.slice(5, 7)
                                        const ngay2 = "" + data[i].NgayXuLy.slice(8, 10)
                                        data[i].NgayXuLy = ngay2 + "/" + thang2 + "/" + nam2
                                    }
                                }
                                setTabledata(data)
                            });
                        break;
                    case 13:
                        await fetch(API_URL + '/CongNoNCC', {
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
                                for (let i = 0; i < data.length; i++) {
                                    if (data[i].NgayNhapHang != null) {
                                        const nam2 = data[i].NgayNhapHang.slice(0, 4)
                                        const thang2 = data[i].NgayNhapHang.slice(5, 7)
                                        const ngay2 = "" + data[i].NgayNhapHang.slice(8, 10)
                                        data[i].NgayNhapHang = ngay2 + "/" + thang2 + "/" + nam2
                                    }
                                }
                                setTabledata(data)
                            });
                        break;
                    case 14:
                        await fetch(API_URL + '/danhSachDonHangNhap', {
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
                                for (let i = 0; i < data.length; i++) {
                                    if (data[i].NgayNhapHang != null) {
                                        const nam2 = data[i].NgayNhapHang.slice(0, 4)
                                        const thang2 = data[i].NgayNhapHang.slice(5, 7)
                                        const ngay2 = "" + data[i].NgayNhapHang.slice(8, 10)
                                        data[i].NgayNhapHang = ngay2 + "/" + thang2 + "/" + nam2
                                    }
                                }
                                setTabledata(data)

                            });
                        break;
                    case 15:
                        await fetch(API_URL + '/DanhSachNCC', {
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
                                setTabledata(data)
                                setTablechange('')
                            });

                        break;
                    case 16:
                        await fetch(API_URL + '/GetTC', {
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
                                for (let i = 0; i < data.length; i++) {
                                    if (data[i].NgayTC != null) {
                                        const nam2 = data[i].NgayTC.slice(0, 4)
                                        const thang2 = data[i].NgayTC.slice(5, 7)
                                        const ngay2 = "" + data[i].NgayTC.slice(8, 10)
                                        data[i].NgayTC = ngay2 + "/" + thang2 + "/" + nam2
                                    }
                                }
                                setTabledata(data)
                                setTablechange('')
                            });

                        break;
                }
            } else {
                if (tableType == 12 || tableType == 13) {
                    ///switch case cho trường hợp 12 và 13
                    switch (tableType) {
                        case 12:
                            await fetch(API_URL + '/searchquantricn', {
                                method: 'POST',
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    tableVar: table,
                                    searchVar: searchString
                                })
                            })
                                .then((response) => response.json())
                                .then(data => {
                                    for (let i = 0; i < data.length; i++) {
                                        if (data[i].NgayXuLy != null) {
                                            const nam2 = data[i].NgayXuLy.slice(0, 4)
                                            const thang2 = data[i].NgayXuLy.slice(5, 7)
                                            const ngay2 = "" + data[i].NgayXuLy.slice(8, 10)
                                            data[i].NgayXuLy = ngay2 + "/" + thang2 + "/" + nam2
                                        }
                                    }
                                    setTabledata(data)
                                })
                            break;
                        case 13:
                            await fetch(API_URL + '/searchquantricnncc', {
                                method: 'POST',
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    tableVar: table,
                                    searchVar: searchString
                                })
                            })
                                .then((response) => response.json())
                                .then(data => {
                                    for (let i = 0; i < data.length; i++) {
                                        if (data[i].NgayNhapHang != null) {
                                            const nam2 = data[i].NgayNhapHang.slice(0, 4)
                                            const thang2 = data[i].NgayNhapHang.slice(5, 7)
                                            const ngay2 = "" + data[i].NgayNhapHang.slice(8, 10)
                                            data[i].NgayNhapHang = ngay2 + "/" + thang2 + "/" + nam2
                                        }
                                    }
                                    setTabledata(data)
                                })
                            //hàm search quản trị
                            break;
                    }

                } else {

                    await fetch(API_URL + '/searchquantri', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            tableVar: table,
                            searchVar: searchString
                        })
                    })
                        .then((response) => response.json())
                        .then(data => {
                            if (table == 'donhang') {
                                for (let i = 0; i < data.length; i++) {
                                    if (data[i].NgayDatHang != null) {
                                        const nam2 = data[i].NgayDatHang.slice(0, 4)
                                        const thang2 = data[i].NgayDatHang.slice(5, 7)
                                        const ngay2 = "" + data[i].NgayDatHang.slice(8, 10)
                                        let tmp = new Date(nam2 + "-" + thang2 + "-" + ngay2)
                                        tmp.setDate(tmp.getDate() + 1)
                                        const nam = tmp.getFullYear()
                                        let thang = (tmp.getMonth() + 1).toString()
                                        if (thang.length == 1) {
                                            thang = "0" + thang
                                        }
                                        let ngay = tmp.getDate().toString()
                                        if (ngay.length == 1) {
                                            ngay = "0" + ngay
                                        }
                                        data[i].NgayDatHang = ngay + "/" + thang + "/" + nam
                                    }
                                    if (data[i].NgayXuLy != null) {
                                        const nam3 = data[i].NgayXuLy.slice(0, 4)
                                        const thang3 = data[i].NgayXuLy.slice(5, 7)
                                        const ngay3 = "" + data[i].NgayXuLy.slice(8, 10)
                                        let tmp2 = new Date(nam3 + "-" + thang3 + "-" + ngay3)
                                        tmp2.setDate(tmp2.getDate() + 1)
                                        const nam4 = tmp2.getFullYear()
                                        let thang4 = (tmp2.getMonth() + 1).toString()
                                        if (thang4.length == 1) {
                                            thang4 = "0" + thang4
                                        }
                                        let ngay4 = tmp2.getDate().toString()
                                        if (ngay4.length == 1) {
                                            ngay4 = "0" + ngay4
                                        }
                                        data[i].NgayXuLy = ngay4 + "/" + thang4 + "/" + nam4
                                    }
                                }
                                setTabledata(data)
                            } else if (table == 'lohang') {
                                for (let i = 0; i < data.length; i++) {
                                    if (data[i].HanSD != null) {
                                        const nam2 = data[i].HanSD.slice(0, 4)
                                        const thang2 = data[i].HanSD.slice(5, 7)
                                        const ngay2 = "" + data[i].HanSD.slice(8, 10)
                                        let tmp = new Date(nam2 + "-" + thang2 + "-" + ngay2)
                                        tmp.setDate(tmp.getDate() + 1)
                                        const nam = tmp.getFullYear()
                                        let thang = (tmp.getMonth() + 1).toString()
                                        if (thang.length == 1) {
                                            thang = "0" + thang
                                        }
                                        let ngay = tmp.getDate().toString()
                                        if (ngay.length == 1) {
                                            ngay = "0" + ngay
                                        }
                                        data[i].HanSD = ngay + "/" + thang + "/" + nam
                                    }
                                    if (data[i].NgayNhapHang != null) {
                                        const nam3 = data[i].NgayNhapHang.slice(0, 4)
                                        const thang3 = data[i].NgayNhapHang.slice(5, 7)
                                        const ngay3 = "" + data[i].NgayNhapHang.slice(8, 10)
                                        let tmp2 = new Date(nam3 + "-" + thang3 + "-" + ngay3)
                                        tmp2.setDate(tmp2.getDate() + 1)
                                        const nam4 = tmp2.getFullYear()
                                        let thang4 = (tmp2.getMonth() + 1).toString()
                                        if (thang4.length == 1) {
                                            thang4 = "0" + thang4
                                        }
                                        let ngay4 = tmp2.getDate().toString()
                                        if (ngay4.length == 1) {
                                            ngay4 = "0" + ngay4
                                        }
                                        data[i].NgayNhapHang = ngay4 + "/" + thang4 + "/" + nam4
                                    }
                                }
                                let dataNoGhiChu = []
                                data.forEach(ee1 => {
                                    dataNoGhiChu.push({
                                        IdSTT: ee1.IdSTT,
                                        MaHang: ee1.MaHang,
                                        TenHang: ee1.TenHang,
                                        SoLuong: ee1.SoLuong,
                                        DonGia: ee1.DonGia,
                                        DVT: ee1.DVT,
                                        MaLH: ee1.MaLH,
                                        HanSD: ee1.HanSD,
                                        NgayNhapHang: ee1.NgayNhapHang,
                                        TenNCC: ee1.TenNCC,
                                        SDT: ee1.SDT,
                                        TenTK: ee1.TenTK,
                                        SoTK: ee1.SoTK,
                                        TenNH: ee1.TenNH
                                    })
                                });
                                setTabledata(dataNoGhiChu)
                            } else {
                                setTabledata(data)
                            }
                        })
                }

            }
            setSearchString("");
            event.target.blur()
        }
    }
    const handleOnSelect = async (item) => {
        verifytoken();
        if (tableType == 12 || tableType == 13) {
            switch (tableType) {
                case 12:
                    await fetch(API_URL + '/searchquantricn', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            tableVar: table,
                            searchVar: item.value
                        })
                    })
                        .then((response) => response.json())
                        .then(data => {
                            for (let i = 0; i < data.length; i++) {
                                if (data[i].NgayXuLy != null) {
                                    const nam2 = data[i].NgayXuLy.slice(0, 4)
                                    const thang2 = data[i].NgayXuLy.slice(5, 7)
                                    const ngay2 = "" + data[i].NgayXuLy.slice(8, 10)
                                    data[i].NgayXuLy = ngay2 + "/" + thang2 + "/" + nam2
                                }
                            }
                            setTabledata(data)
                        })
                    break;
                case 13:
                    await fetch(API_URL + '/searchquantricnncc', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            tableVar: table,
                            searchVar: item.value
                        })
                    })
                        .then((response) => response.json())
                        .then(data => {
                            for (let i = 0; i < data.length; i++) {
                                if (data[i].NgayNhapHang != null) {
                                    const nam2 = data[i].NgayNhapHang.slice(0, 4)
                                    const thang2 = data[i].NgayNhapHang.slice(5, 7)
                                    const ngay2 = "" + data[i].NgayNhapHang.slice(8, 10)
                                    data[i].NgayNhapHang = ngay2 + "/" + thang2 + "/" + nam2
                                }
                            }
                            setTabledata(data)
                        })
                    break;
            }

        } else {
            await fetch(API_URL + '/searchquantri', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tableVar: table,
                    searchVar: item.value
                })
            })
                .then((response) => response.json())
                .then(data => {
                    if (table == 'donhang') {
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].NgayDatHang != null) {
                                const nam2 = data[i].NgayDatHang.slice(0, 4)
                                const thang2 = data[i].NgayDatHang.slice(5, 7)
                                const ngay2 = "" + data[i].NgayDatHang.slice(8, 10)
                                let tmp = new Date(nam2 + "-" + thang2 + "-" + ngay2)
                                tmp.setDate(tmp.getDate() + 1)
                                const nam = tmp.getFullYear()
                                let thang = (tmp.getMonth() + 1).toString()
                                if (thang.length == 1) {
                                    thang = "0" + thang
                                }
                                let ngay = tmp.getDate().toString()
                                if (ngay.length == 1) {
                                    ngay = "0" + ngay
                                }
                                data[i].NgayDatHang = ngay + "/" + thang + "/" + nam
                            }
                            if (data[i].NgayXuLy != null) {
                                const nam3 = data[i].NgayXuLy.slice(0, 4)
                                const thang3 = data[i].NgayXuLy.slice(5, 7)
                                const ngay3 = "" + data[i].NgayXuLy.slice(8, 10)
                                let tmp2 = new Date(nam3 + "-" + thang3 + "-" + ngay3)
                                tmp2.setDate(tmp2.getDate() + 1)
                                const nam4 = tmp2.getFullYear()
                                let thang4 = (tmp2.getMonth() + 1).toString()
                                if (thang4.length == 1) {
                                    thang4 = "0" + thang4
                                }
                                let ngay4 = tmp2.getDate().toString()
                                if (ngay4.length == 1) {
                                    ngay4 = "0" + ngay4
                                }
                                data[i].NgayXuLy = ngay4 + "/" + thang4 + "/" + nam4
                            }
                        }
                        setTabledata(data)
                    } else
                        if (table == 'lohang') {
                            for (let i = 0; i < data.length; i++) {
                                if (data[i].HanSD != null) {
                                    const nam2 = data[i].HanSD.slice(0, 4)
                                    const thang2 = data[i].HanSD.slice(5, 7)
                                    const ngay2 = "" + data[i].HanSD.slice(8, 10)
                                    let tmp = new Date(nam2 + "-" + thang2 + "-" + ngay2)
                                    tmp.setDate(tmp.getDate() + 1)
                                    const nam = tmp.getFullYear()
                                    let thang = (tmp.getMonth() + 1).toString()
                                    if (thang.length == 1) {
                                        thang = "0" + thang
                                    }
                                    let ngay = tmp.getDate().toString()
                                    if (ngay.length == 1) {
                                        ngay = "0" + ngay
                                    }
                                    data[i].HanSD = ngay + "/" + thang + "/" + nam
                                }
                                if (data[i].NgayNhapHang != null) {
                                    const nam3 = data[i].NgayNhapHang.slice(0, 4)
                                    const thang3 = data[i].NgayNhapHang.slice(5, 7)
                                    const ngay3 = "" + data[i].NgayNhapHang.slice(8, 10)
                                    let tmp2 = new Date(nam3 + "-" + thang3 + "-" + ngay3)
                                    tmp2.setDate(tmp2.getDate() + 1)
                                    const nam4 = tmp2.getFullYear()
                                    let thang4 = (tmp2.getMonth() + 1).toString()
                                    if (thang4.length == 1) {
                                        thang4 = "0" + thang4
                                    }
                                    let ngay4 = tmp2.getDate().toString()
                                    if (ngay4.length == 1) {
                                        ngay4 = "0" + ngay4
                                    }
                                    data[i].NgayNhapHang = ngay4 + "/" + thang4 + "/" + nam4
                                }
                            }
                            let dataNoGhiChu = []
                            data.forEach(ee1 => {
                                dataNoGhiChu.push({
                                    IdSTT: ee1.IdSTT,
                                    MaHang: ee1.MaHang,
                                    TenHang: ee1.TenHang,
                                    SoLuong: ee1.SoLuong,
                                    DonGia: ee1.DonGia,
                                    DVT: ee1.DVT,
                                    MaLH: ee1.MaLH,
                                    HanSD: ee1.HanSD,
                                    NgayNhapHang: ee1.NgayNhapHang,
                                    TenNCC: ee1.TenNCC,
                                    SDT: ee1.SDT,
                                    TenTK: ee1.TenTK,
                                    SoTK: ee1.SoTK,
                                    TenNH: ee1.TenNH
                                })
                            });
                            setTabledata(dataNoGhiChu)
                        } else {
                            setTabledata(data)
                        }
                })
        }
        setSearchString("");
    }

    const handleOnClear = async () => {
        switch (tableType) {
            case 1: await fetch(API_URL + '/searchbackall', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                })
            })
                .then((response) => response.json())
                .then(datas => {
                    setTabledata(datas)
                    setTablechange('')
                });
                break;
            case 2: await fetch(API_URL + '/searchbackall2', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                })
            })
                .then((response) => response.json())
                .then(datas => {
                    const filterCombo = datas.filter(item => item.MaHang.indexOf('COMBO_') < 0)
                    setTabledata(filterCombo)
                    // setTabledata(datas)
                    setTablechange('')
                })
                break;
            case 3: await fetch(API_URL + '/donHang')
                .then((response) => response.json())
                .then(data => {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].NgayDatHang != null) {
                            const nam2 = data[i].NgayDatHang.slice(0, 4)
                            const thang2 = data[i].NgayDatHang.slice(5, 7)
                            const ngay2 = "" + data[i].NgayDatHang.slice(8, 10)
                            let tmp = new Date(nam2 + "-" + thang2 + "-" + ngay2)
                            tmp.setDate(tmp.getDate() + 1)
                            const nam = tmp.getFullYear()
                            let thang = (tmp.getMonth() + 1).toString()
                            if (thang.length == 1) {
                                thang = "0" + thang
                            }
                            let ngay = tmp.getDate().toString()
                            if (ngay.length == 1) {
                                ngay = "0" + ngay
                            }
                            data[i].NgayDatHang = ngay + "/" + thang + "/" + nam
                        }
                        if (data[i].NgayXuLy != null) {
                            const nam3 = data[i].NgayXuLy.slice(0, 4)
                            const thang3 = data[i].NgayXuLy.slice(5, 7)
                            const ngay3 = "" + data[i].NgayXuLy.slice(8, 10)
                            let tmp2 = new Date(nam3 + "-" + thang3 + "-" + ngay3)
                            tmp2.setDate(tmp2.getDate() + 1)
                            const nam4 = tmp2.getFullYear()
                            let thang4 = (tmp2.getMonth() + 1).toString()
                            if (thang4.length == 1) {
                                thang4 = "0" + thang4
                            }
                            let ngay4 = tmp2.getDate().toString()
                            if (ngay4.length == 1) {
                                ngay4 = "0" + ngay4
                            }
                            data[i].NgayXuLy = ngay4 + "/" + thang4 + "/" + nam4
                        }
                    }
                    setTabledata(data)
                    setTablechange('')
                });;
                break;
            case 4: await fetch(API_URL + "/danhSachTatCaChiTietLoHang")
                .then(response => response.json())
                .then(data => {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].HanSD != null) {
                            const nam2 = data[i].HanSD.slice(0, 4)
                            const thang2 = data[i].HanSD.slice(5, 7)
                            const ngay2 = "" + data[i].HanSD.slice(8, 10)
                            let tmp = new Date(nam2 + "-" + thang2 + "-" + ngay2)
                            tmp.setDate(tmp.getDate() + 1)
                            const nam = tmp.getFullYear()
                            let thang = (tmp.getMonth() + 1).toString()
                            if (thang.length == 1) {
                                thang = "0" + thang
                            }
                            let ngay = tmp.getDate().toString()
                            if (ngay.length == 1) {
                                ngay = "0" + ngay
                            }
                            data[i].HanSD = ngay + "/" + thang + "/" + nam
                        }
                        if (data[i].NgayNhapHang != null) {
                            const nam3 = data[i].NgayNhapHang.slice(0, 4)
                            const thang3 = data[i].NgayNhapHang.slice(5, 7)
                            const ngay3 = "" + data[i].NgayNhapHang.slice(8, 10)
                            let tmp2 = new Date(nam3 + "-" + thang3 + "-" + ngay3)
                            tmp2.setDate(tmp2.getDate() + 1)
                            const nam4 = tmp2.getFullYear()
                            let thang4 = (tmp2.getMonth() + 1).toString()
                            if (thang4.length == 1) {
                                thang4 = "0" + thang4
                            }
                            let ngay4 = tmp2.getDate().toString()
                            if (ngay4.length == 1) {
                                ngay4 = "0" + ngay4
                            }
                            data[i].NgayNhapHang = ngay4 + "/" + thang4 + "/" + nam4
                        }
                    }
                    setTabledata(data)
                    setTablechange('')
                });
                break;
            case 5:
                await fetch(API_URL + '/alluser', {
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
                        setTabledata(data)
                        setTablechange('')
                    });
                break;
            case 6:
                await fetch(API_URL + '/allstaff', {
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
                        setTabledata(data)
                        setTablechange('')
                    });
                break;
            case 12:
                await fetch(API_URL + '/CongNoKH', {
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
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].NgayXuLy != null) {
                                const nam2 = data[i].NgayXuLy.slice(0, 4)
                                const thang2 = data[i].NgayXuLy.slice(5, 7)
                                const ngay2 = "" + data[i].NgayXuLy.slice(8, 10)
                                data[i].NgayXuLy = ngay2 + "/" + thang2 + "/" + nam2
                            }
                        }
                        setTabledata(data)
                    });
                break;
            case 13:
                await fetch(API_URL + '/CongNoNCC', {
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
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].NgayNhapHang != null) {
                                const nam2 = data[i].NgayNhapHang.slice(0, 4)
                                const thang2 = data[i].NgayNhapHang.slice(5, 7)
                                const ngay2 = "" + data[i].NgayNhapHang.slice(8, 10)
                                data[i].NgayNhapHang = ngay2 + "/" + thang2 + "/" + nam2
                            }
                        }
                        setTabledata(data)
                    });
                break;
            case 14:
                await fetch(API_URL + '/danhSachDonHangNhap', {
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
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].NgayNhapHang != null) {
                                const nam2 = data[i].NgayNhapHang.slice(0, 4)
                                const thang2 = data[i].NgayNhapHang.slice(5, 7)
                                const ngay2 = "" + data[i].NgayNhapHang.slice(8, 10)
                                data[i].NgayNhapHang = ngay2 + "/" + thang2 + "/" + nam2
                            }
                        }
                        setTabledata(data)

                    });
                break;
            case 15:
                await fetch(API_URL + '/DanhSachNCC', {
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
                        setTabledata(data)
                        setTablechange('')
                    });

                break;
            case 16:
                await fetch(API_URL + '/GetTC', {
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
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].NgayTC != null) {
                                const nam2 = data[i].NgayTC.slice(0, 4)
                                const thang2 = data[i].NgayTC.slice(5, 7)
                                const ngay2 = "" + data[i].NgayTC.slice(8, 10)
                                data[i].NgayTC = ngay2 + "/" + thang2 + "/" + nam2
                            }
                        }
                        setTabledata(data)
                        setTablechange('')
                    });

                break;
        }
        setSearchString("");
    };

    const formatResult = (item) => {
        return item;
    }

    const callBackReloadHetHang = async (child) => {
        const res = await fetch(`${API_URL}/laySPsaphethang`).then(res => res.json())
        setTabledata(res)
    }

    return (
        <div>
            <div style={{ width: '100%', display: 'flex', height: 55, zIndex: 999, backgroundColor: '#fff' }}>
                <div style={{ width: '80%', display: 'flex' }}>
                    <ul className='submenu'>
                        <li className="dropdown">
                            <div className="dropbtn">Sản phẩm</div>
                            <div className="dropdown-content">
                                <Link onClick={() => { changetable(1) }} className='dropdown-content1' to='#'>Thông tin chung</Link>
                                <Link onClick={() => { changetable(2) }} className='dropdown-content1' to='#'>Trạng thái sản phẩm</Link>
                            </div>
                        </li>
                    </ul>
                    <ul className='submenu'>
                        <li className="dropdown">
                            <div className="dropbtn">Kho-Đơn hàng</div>
                            <div className="dropdown-content">
                                <Link onClick={() => { changetable(3) }} className='dropdown-content1' to='#'>Đơn hàng</Link>
                                {
                                    manv == "adm" || manv.indexOf('mn') > -1 ?
                                        <Link onClick={() => { changetable(14) }} className='dropdown-content1' to='#'>Đơn hàng nhập</Link>
                                        : null

                                }
                                <Link onClick={() => { changetable(4) }} className='dropdown-content1' to='#'>Lô hạng sử dụng</Link>
                                <Link onClick={() => { changetable(9) }} className='dropdown-content1' to='#'>Hàng sắp hết</Link>
                            </div>
                        </li>
                    </ul>
                    <ul className='submenu'>
                        <li className="dropdown">
                            <div className="dropbtn">Tài khoản</div>
                            <div className="dropdown-content">
                                <Link onClick={() => { changetable(5) }} className='dropdown-content1' to='#'>Khách hàng</Link>
                                <Link onClick={() => { changetable(6) }} className='dropdown-content1' to='#'>Nhân viên</Link>
                                <Link onClick={() => { changetable(15) }} className='dropdown-content1' to='#'>Nhà cung cấp</Link>
                            </div>
                        </li>
                    </ul>
                    <ul className='submenu'>
                        <li className="dropdown">
                            <div className="dropbtn">Công nợ</div>
                            <div className="dropdown-content">
                                {
                                    manv == "adm" || manv.indexOf('mn') > -1 ?
                                        <Link onClick={() => { changetable(13) }} className='dropdown-content1' to='#'>Công nợ NCC</Link>
                                        : null
                                }

                                <Link onClick={() => { changetable(12) }} className='dropdown-content1' to='#'>Công nợ khách hàng</Link>
                                <Link onClick={() => { changetable(16) }} className='dropdown-content1' to='#'>Thu chi</Link>
                            </div>
                        </li>
                    </ul>
                    <ul className='submenu'>
                        <li className="dropdown">
                            <div className="dropbtn">Chương trình KM</div>
                            <div className="dropdown-content">
                                <Link onClick={() => { changetable(17) }} className='dropdown-content1' to='#'>Quản lý Combo</Link>
                                <Link onClick={() => { changetable(7) }} className='dropdown-content1' to='#'>Điểm tích lũy</Link>
                                <Link onClick={() => { changetable(8) }} className='dropdown-content1' to='#'>Quà tặng cho người mới</Link>
                                <Link onClick={() => { changetable(11) }} className='dropdown-content1' to='#'>Quà tặng - KM</Link>
                                <Link className='TK2_btnleft' onClick={() => { changetable(10) }} className='dropdown-content1' to='#'>Banner</Link>
                            </div>
                        </li>
                    </ul>
                    <ul className='submenu'>
                        <li className="dropdown">
                            <div className="dropbtn" onClick={() => { changetable(18) }} >Thống kê sale combo</div>
                            {/* <div className="dropdown-content">
                                <Link onClick={() => { changetable(18) }} className='dropdown-content1' to='#'>Thống kê Combo</Link>
                            </div> */}
                        </li>
                    </ul>
                    <ul className='submenu'>
                        <li className="dropdown">
                            <div className="dropbtn" onClick={() => { changetable(19) }} >Quản lý bài viết</div>
                            {/* <div className="dropdown-content">
                                <Link onClick={() => { changetable(19) }} className='dropdown-content1' to='#'>Quản lý bài viết</Link>
                            </div> */}
                        </li>
                    </ul>
                    {
                        tableType == 3 || tableType == 14 ?
                            <ul className='submenu'>
                                <li className="dropdown">
                                    <div className="dropbtn">Chọn thời gian</div>
                                    <div className="dropdown-content" style={{ zIndex: 999, borderRadius: 5 }}>
                                        {
                                            tableType == 3 || tableType == 14 ?
                                                <div className='dropdown-content1 cba' style={{ zIndex: 999, width: 200 }}>
                                                    <div className="date_picker_thongke_par" style={{ zIndex: 999 }}>
                                                        <div className="title_time_thongke">Thời gian</div>
                                                        <button
                                                            onClick={() => {
                                                                setOpenTimeFixed(!open_time_fixed);
                                                                setOpenTime(false)
                                                            }}
                                                            className="option_fixed">
                                                            Thời gian cứng
                                                            <img width="9%" height="9%" src={sort_time}></img>
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setOpenTime(!open_time)
                                                                setOpenTimeFixed(false)
                                                            }}
                                                            className="option_fixed">
                                                            Lựa chọn khác
                                                            <img width="9%" height="9%" src={calendar_time}></img>
                                                        </button>
                                                    </div>
                                                    {open_time_fixed ?
                                                        <div className="dialog_time_parent" style={{ zIndex: 999 }}>
                                                            <div>
                                                                <button onClick={() => {
                                                                    setOpenTimeFixed(false);
                                                                }}
                                                                    className="closeModal_time_thongke">
                                                                    <svg width="22px" height="22px" viewBox="-4 -4 24 24"><line x1="2" x2="14" y1="2" y2="14" stroke-linecap="round" stroke-width="2" stroke="#bec2c9"></line><line x1="2" x2="14" y1="14" y2="2" stroke-linecap="round" stroke-width="2" stroke="#bec2c9"></line></svg>
                                                                </button>
                                                            </div>
                                                            <div className="dialog_time_fixed">
                                                                <div className="col_time">
                                                                    <div className="btn_title">Theo ngày</div>
                                                                    <button onClick={() => { dateFixed('Homnay') }} className="btn_time">Hôm nay</button>
                                                                    <button onClick={() => { dateFixed('Homqua') }} className="btn_time">Hôm qua</button>
                                                                </div>
                                                                <div className="col_time">
                                                                    <div className="btn_title">Theo tuần</div>
                                                                    <button onClick={() => { dateFixed('TuanNay') }} className="btn_time">Tuần này</button>
                                                                    <button onClick={() => { dateFixed('TuanTruoc') }} className="btn_time">Tuần trước</button>
                                                                    <button onClick={() => { dateFixed('7NgayQua') }} className="btn_time">7 ngày qua</button>
                                                                </div>
                                                                <div className="col_time">
                                                                    <div className="btn_title">Theo tháng</div>
                                                                    <button onClick={() => { dateFixed('Thangnay') }} className="btn_time">Tháng này</button>
                                                                    <button onClick={() => { dateFixed('Thangtruoc') }} className="btn_time">Tháng trước</button>
                                                                    <button onClick={() => { dateFixed('30NgayQua') }} className="btn_time">30 ngày qua</button>
                                                                </div>
                                                                <div className="col_time">
                                                                    <div className="btn_title">Theo quý</div>
                                                                    <button onClick={() => { dateFixed('Quynay') }} className="btn_time">Quý này</button>
                                                                    <button onClick={() => { dateFixed('Quytruoc') }} className="btn_time">Quý trước</button>
                                                                </div>
                                                                <div className="col_time">
                                                                    <div className="btn_title">Theo năm</div>
                                                                    <button onClick={() => { dateFixed('Namnay') }} className="btn_time">Năm này</button>
                                                                    <button onClick={() => { dateFixed('Namtruoc') }} className="btn_time">Năm trước</button>
                                                                </div>
                                                                <div className="square_time_fixed_thongke"></div>
                                                            </div>
                                                        </div>
                                                        : null
                                                    }
                                                    {open_time ?
                                                        <div className="dialog_time_parent" style={{ zIndex: 999 }}>
                                                            <div>
                                                                <button onClick={() => {
                                                                    setOpenTime(false);
                                                                }}
                                                                    className="closeModal_time_thongke">
                                                                    <svg width="22px" height="22px" viewBox="-4 -4 24 24"><line x1="2" x2="14" y1="2" y2="14" stroke-linecap="round" stroke-width="2" stroke="#bec2c9"></line><line x1="2" x2="14" y1="14" y2="2" stroke-linecap="round" stroke-width="2" stroke="#bec2c9"></line></svg>
                                                                </button>
                                                            </div>
                                                            <div className="dialog_time">
                                                                <div className="col_time">
                                                                    <button
                                                                        onClick={() => {
                                                                            setLoaitk('1')
                                                                            setDialogChooseTime(true);
                                                                        }}
                                                                        className="btn_time_custom">Theo năm</button>
                                                                </div>
                                                                <div
                                                                    onClick={() => {
                                                                        setLoaitk('2')
                                                                        setDialogChooseTime(true);
                                                                    }}
                                                                    className="col_time">
                                                                    <button className="btn_time_custom">Theo tháng</button>
                                                                </div>
                                                                <div
                                                                    onClick={() => {
                                                                        setLoaitk('3')
                                                                        setDialogChooseTime(true);
                                                                    }}
                                                                    className="col_time">
                                                                    <button className="btn_time_custom">Theo quý</button>
                                                                </div>
                                                                <div
                                                                    onClick={() => {
                                                                        setLoaitk('4')
                                                                        setDialogChooseTime(true);
                                                                    }}
                                                                    className="col_time">
                                                                    <button className="btn_time_custom">Tùy chọn</button>
                                                                </div>
                                                                {diaglog_choose_time ?
                                                                    <div className="dialog_choose_time">
                                                                        <div>
                                                                            <button onClick={() => {
                                                                                setDialogChooseTime(false);
                                                                            }}
                                                                                className="closeModal_time_thongke">
                                                                                <svg width="22px" height="22px" viewBox="-4 -4 24 24"><line x1="2" x2="14" y1="2" y2="14" stroke-linecap="round" stroke-width="2" stroke="#bec2c9"></line><line x1="2" x2="14" y1="14" y2="2" stroke-linecap="round" stroke-width="2" stroke="#bec2c9"></line></svg>
                                                                            </button>
                                                                        </div>
                                                                        {/* datepicker */}
                                                                        {loaitk == 1 ?
                                                                            <div className="date_picker_year">
                                                                                <DatePicker
                                                                                    inline
                                                                                    selected={startDate}
                                                                                    onChange={(date) => setStartDate(date)}
                                                                                    showYearPicker
                                                                                    dateFormat="yyyy"
                                                                                    yearItemNumber={9}
                                                                                />
                                                                                <div className="box_btn_filter" >
                                                                                    <button
                                                                                        title="Tìm kiếm"
                                                                                        className="btn_month_tk"
                                                                                        onClick={() => { TimKiemDateFromTo() }}
                                                                                    >
                                                                                        Tìm kiếm
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                            : loaitk == 2 ?
                                                                                <div className="date_picker_year">
                                                                                    <DatePicker
                                                                                        inline
                                                                                        selected={startDate}
                                                                                        onChange={(date) => setStartDate(date)}
                                                                                        dateFormat="MM/yyyy"
                                                                                        showMonthYearPicker
                                                                                        showFullMonthYearPicker
                                                                                        showFourColumnMonthYearPicker
                                                                                    />
                                                                                    <div className="box_btn_filter" >
                                                                                        <button className="btn_month_tk"
                                                                                            onClick={() => { TimKiemDateFromTo() }}
                                                                                        >
                                                                                            Tìm kiếm
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                                : loaitk == 3 ?
                                                                                    <div className="date_picker_year">
                                                                                        <DatePicker
                                                                                            inline
                                                                                            selected={startDate}
                                                                                            onChange={(date) => setStartDate(date)}
                                                                                            dateFormat="yyyy, QQQ"
                                                                                            showQuarterYearPicker
                                                                                        />
                                                                                        <div className="box_btn_filter" >
                                                                                            <button className="btn_month_tk"
                                                                                                onClick={() => { TimKiemDateFromTo() }}
                                                                                            >
                                                                                                Tìm kiếm
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                    : loaitk == 4 ?
                                                                                        <div className="date_picker_range">
                                                                                            <div>
                                                                                                <div>Từ ngày: <b style={{ color: 'green' }}>{getDate(startDate) + '/' + (getMonth(startDate) + 1) + '/' + getYear(startDate)}</b></div>
                                                                                                <DatePicker
                                                                                                    inline
                                                                                                    renderCustomHeader={({
                                                                                                        date,
                                                                                                        changeYear,
                                                                                                        changeMonth,
                                                                                                        decreaseMonth,
                                                                                                        increaseMonth,
                                                                                                        prevMonthButtonDisabled,
                                                                                                        nextMonthButtonDisabled,
                                                                                                    }) => (
                                                                                                        <div
                                                                                                            style={{
                                                                                                                margin: 10,
                                                                                                                display: "flex",
                                                                                                                justifyContent: "center",
                                                                                                            }}
                                                                                                        >
                                                                                                            <button title="Tháng trước" className="prev_month_tk" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                                                                                                                <img width='18' height='18' src={prev_month_tk}></img>
                                                                                                            </button>
                                                                                                            <select
                                                                                                                value={getYear(date)}
                                                                                                                onChange={({ target: { value } }) => changeYear(value)}
                                                                                                            >
                                                                                                                {years.map((option) => (
                                                                                                                    <option key={option} value={option}>
                                                                                                                        {option}
                                                                                                                    </option>
                                                                                                                ))}
                                                                                                            </select>

                                                                                                            <select
                                                                                                                value={months[getMonth(date)]}
                                                                                                                onChange={({ target: { value } }) =>
                                                                                                                    changeMonth(months.indexOf(value))
                                                                                                                }
                                                                                                            >
                                                                                                                {months.map((option) => (
                                                                                                                    <option key={option} value={option}>
                                                                                                                        {option}
                                                                                                                    </option>
                                                                                                                ))}
                                                                                                            </select>
                                                                                                            <button title="Tháng kế" className="prev_month_tk" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                                                                                                                <img width='18' height='18' src={next_month_tk}></img>
                                                                                                            </button>
                                                                                                        </div>
                                                                                                    )}
                                                                                                    selected={startDate}
                                                                                                    onChange={(date) => setStartDate(date)}
                                                                                                />
                                                                                            </div>
                                                                                            <div className="hr_datepicker_tk"></div>
                                                                                            <div className="to_date_choose">
                                                                                                <div>Đến ngày: <b style={{ color: 'green' }}>{getDate(startDateTo) + '/' + (getMonth(startDateTo) + 1) + '/' + getYear(startDateTo)}</b></div>
                                                                                                <DatePicker
                                                                                                    inline
                                                                                                    renderCustomHeader={({
                                                                                                        date,
                                                                                                        changeYear,
                                                                                                        changeMonth,
                                                                                                        decreaseMonth,
                                                                                                        increaseMonth,
                                                                                                        prevMonthButtonDisabled,
                                                                                                        nextMonthButtonDisabled,
                                                                                                    }) => (
                                                                                                        <div
                                                                                                            style={{
                                                                                                                margin: 10,
                                                                                                                display: "flex",
                                                                                                                justifyContent: "center",
                                                                                                            }}
                                                                                                        >
                                                                                                            <button title="Tháng trước" className="prev_month_tk" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                                                                                                                <img width='18' height='18' src={prev_month_tk}></img>
                                                                                                            </button>
                                                                                                            <select
                                                                                                                value={getYear(date)}
                                                                                                                onChange={({ target: { value } }) => changeYear(value)}
                                                                                                            >
                                                                                                                {years.map((option) => (
                                                                                                                    <option key={option} value={option}>
                                                                                                                        {option}
                                                                                                                    </option>
                                                                                                                ))}
                                                                                                            </select>
                                                                                                            <select
                                                                                                                value={months[getMonth(date)]}
                                                                                                                onChange={({ target: { value } }) =>
                                                                                                                    changeMonth(months.indexOf(value))
                                                                                                                }
                                                                                                            >
                                                                                                                {months.map((option) => (
                                                                                                                    <option key={option} value={option}>
                                                                                                                        {option}
                                                                                                                    </option>
                                                                                                                ))}
                                                                                                            </select>

                                                                                                            <button title="Tháng kế" className="prev_month_tk" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                                                                                                                <img width='18' height='18' src={next_month_tk}></img>
                                                                                                            </button>
                                                                                                        </div>
                                                                                                    )}
                                                                                                    selected={startDateTo}
                                                                                                    onChange={(date) => setStartDateTo(date)}
                                                                                                />
                                                                                                <div className="box_btn_filter" >
                                                                                                    <button className="btn_month_tk"
                                                                                                        onClick={() => { TimKiemDateFromTo() }}
                                                                                                    >
                                                                                                        Tìm kiếm
                                                                                                    </button>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        : null}
                                                                        {/* datepicker */}
                                                                        <div className="square_time_thongke"></div>
                                                                    </div>
                                                                    : null
                                                                }
                                                                <div className="square_time_thongke"></div>
                                                            </div>
                                                        </div>
                                                        : null
                                                    }
                                                </div>
                                                : null
                                        }
                                    </div>
                                </li>
                            </ul>

                            : null
                    }

                </div>
                <div style={{ width: '20%', display: 'flex' }}>
                    <ul className='submenu' style={{ display: 'flex', width: '50%' }}>
                        <div style={{ color: 'red', fontWeight: 'bold' }}>Tài Khoản: {manv}</div>
                    </ul>
                    <ul className='submenu' style={{ display: 'flex', width: '50%' }}>
                        <div onClick={() => { handleClickOpen() }} style={{ justifyContent: 'center', display: 'flex', alignSelf: 'center', cursor: 'pointer' }}>
                            <img src={logout} width='25' height='25' style={{ alignSelf: 'self-end', marginRight: 5, alignSelf: 'center' }}></img>
                            <div style={{ color: '#197420', alignSelf: 'center', fontWeight: 'bold' }}>Đăng xuất</div>
                        </div>
                    </ul>
                </div>
            </div>

            <div className='trai-trai'>
                <div className='tong-phaii' onClick={() => { ClickOutside() }}>
                    <div style={{ width: '100%', height: '100%', textAlign: 'center' }}>

                        {
                            tableType == 1 ?
                                <Table_ThongKe dataFromParent={tabledata} parentCallback={callbackFunction} parentCallback2={callbackFunction2} tenNV={tenNV} />
                                : tableType == 2 ?
                                    <Table_TrangThai dataFromParent={tabledata} parentCallback={callbackFunction} parentCallback2={callbackFunction2} />
                                    : tableType == 3 ?
                                        <Table_DonHang dataFromParent={tabledata} parentCallback={callbackFunction} parentCallback2={callbackFunction2} parentCallback3={callbackFunction3} tenNV={tenNV} maNV={manv} />
                                        : tableType == 4 ?
                                            <Table_LoHang dataFromParent={tabledata} parentCallback={callbackFunction} parentCallback2={callbackFunction2} candate={callbackCandate} />
                                            : tableType == 5 ?
                                                <Table_User dataFromParent={tabledata} parentCallback={callbackFunction} parentCallback2={callbackFunction2} />
                                                : tableType == 6 ?
                                                    <Table_NV dataFromParent={tabledata} parentCallback={callbackFunction} parentCallback2={callbackFunction2} maNV={manv} />
                                                    : tableType == 7 ?
                                                        <Table_DiemThuong dataFromParent={tabledata} parentCallback={callbackFunction} parentCallback2={callbackFunction2} maNV={manv} />
                                                        : tableType == 8 ?
                                                            <Table_QuaTang dataFromParent={tabledata} parentCallback={callbackFunction} parentCallback2={callbackFunction2} maNV={manv} />
                                                            : tableType == 9 ? <Table_HetHang dataFromParent={tabledata} callBackReload={callBackReloadHetHang} callBackFilterHetHang={funcFilterHetHang} />
                                                                : tableType == 10 ? <Table_Banner dataFromParent={tabledata} parentCallback={callbackFunction} />
                                                                    : tableType == 11 ? <Table_QuaTangKM dataFromParent={tabledata} parentCallback={callbackFunction} />
                                                                        : tableType == 12 ? <Table_CongNoKH dataFromParent={tabledata} parentCallback={callbackFunction} parentCallback2={callbackFunction2} tenNV={tenNV} maNV={manv} />
                                                                            : tableType == 13 ? <Table_CongNoNCC dataFromParent={tabledata} parentCallback={callbackFunction} parentCallback2={callbackFunction2} tenNV={tenNV} maNV={manv} />
                                                                                : tableType == 14 ? <Table_DonHangNhap dataFromParent={tabledata} parentCallback={callbackFunction} parentCallback2={callbackFunction2} tenNV={tenNV} maNV={manv} />
                                                                                    : tableType == 15 ? <Table_NhaCungCap dataFromParent={tabledata} parentCallback={callbackFunction} parentCallback2={callbackFunction2} tenNV={tenNV} maNV={manv} />
                                                                                        : tableType == 16 ? <Table_ThuChi dataFromParent={tabledata} parentCallback={callbackFunction} parentCallback2={callbackFunction2} tenNV={tenNV} maNV={manv} />
                                                                                            :
                                                                                            // table 17 quản lý combo
                                                                                            tableType == 17 ? <Table_Combo dataFromParent={tabledata} parentCallback={callbackFunction} parentCallback2={callbackFunction2} tenNV={tenNV} maNV={manv} />
                                                                                                : tableType == 18 ? <Table_Combo_Statistic dataFromParent={tabledata} parentCallback={callbackFunction} parentCallback2={callbackFunction2} tenNV={tenNV} maNV={manv} />
                                                                                                    : tableType == 19 ? <Table_Articles dataFromParent={tabledata} parentCallback={callbackFunction} parentCallback2={callbackFunction2} tenNV={tenNV} maNV={manv} />
                                                                                                        : null
                        }
                    </div>
                </div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle>
                        <div style={{ textAlign: 'center' }}>
                            <div className='GH_DialogTitle'>
                                <p style={{ alignItems: 'center', fontSize: '3.75em', margin: '0' }}>!</p>
                            </div>
                            <p className='GH_XinXacNhan'>Xin xác nhận</p>
                            {"Bạn có chắc muốn đăng xuất?"}
                        </div>
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={handleClose_nologout} style={{ padding: '6px 16px', backgroundColor: 'rgb(255, 193, 7)', margin: '15px', borderRadius: '8px', color: 'rgb(0, 0, 0)' }}>
                            Không
                        </Button>
                        <Button onClick={handleClose_logout} style={{ padding: '6px 16px', backgroundColor: 'rgb(0, 171, 85)', margin: '15px', borderRadius: '8px', color: 'white' }}>
                            Có
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}
export default ThongKe2