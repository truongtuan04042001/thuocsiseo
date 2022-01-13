import { useEffect, useState } from 'react';
import Image from 'next/image'
import Link from "next/link"

import DanhMuc from '../src/components/DanhMuc';
import image_default from '../public/images/image-default.jpg'

import { API_URL } from '../src/constants/constants'

import React from 'react'
import Pagination from '../src/components/Pagination';
// import NavMenu from './NavMenu';
import Header from './Header';
import Footer from './Footer';
import { useRouter } from 'next/router'

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ReactSearchAutocomplete } from 'react-search-autocomplete'

toast.configure()
const customId = "custom-id-yes";
const notify_themsp = (tensp) => {
    toast.success(`Đã thêm ${tensp} vào giỏ hàng !`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        toastId: customId
    });
}
const notify_giamsp = (tensp) => {
    toast.error(`Đã xóa ${tensp} khỏi giỏ hàng !`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        toastId: customId
    });
}
const notify_nhaptaysp = (tensp, soluong) => {
    toast.success(`Đã thêm ${tensp} vào giỏ hàng !`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        toastId: customId
    });
}
<ToastContainer limit={1} />
let maNV = "null"
const SanPham = (props) => {
    const [sotrang, setSoTrang] = useState(1);
    const router = useRouter()
    const [sessionstorage, setSessionstorage] = useState(null);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
        })
        setSessionstorage(sessionStorage.getItem("Searchfromtc"))
        setTimeout(() => {
            setSessionstorage(sessionStorage.getItem("Searchfromtc"))
        }, 10);
    }, []);

    const LayGiaTriPagination = (childData) => {
        setSoTrang(childData)
    }
    const [note_tieude, setNoteTieuDe] = useState("Tất Cả Sản Phẩm");
    const LayGiaTriDanhMuc = (childData) => {
        const min = 1;
        const max = 100;
        const rand = min + Math.random() * (max - min);
        setResetdanhmuc(rand)
        setTags(null)
        setNoteTieuDe(childData)

    };
    const [input, setInput] = useState([]);//mang gợi ý của search
    const [value, setValue] = useState(null);//giá trị của search box
    const [tags, setTags] = useState(null);//giá trị của tags
    const [tagsvalue, setTagsvalue] = useState(null);//giá trị của tags 
    const [data, setData] = useState([]);//mang san pham
    const [datasize, setDataSize] = useState([]);//mang san pham
    const [resetdanhmuc, setResetdanhmuc] = useState(0);
    const [resettags, setResettags] = useState(0);
    const [loading, setLoading] = React.useState(true);
    var offset = (sotrang - 1) * 30;
    var i = 0;
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
                //console.log(data)
                setInput(data)

            })
    }, []);
    const verifytoken = () => {
        toast.error('Bạn vui lòng đăng nhập để vào được trang web!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        // props.OPModalDN(true);
    }
    const [gioHang, setGioHang] = useState([])
    const [soLuongGioHang, setSoLuongGioHang] = useState(0)
    const [strTogTien, setStrTogTien] = useState()
    //const history = useHistory();
    const tongTienDonHang = (listGH) => {
        var tTien = 0
        listGH.forEach(e => {
            tTien += (e.SoLuong * (e.GiaBan - (e.GiaBan * e.PhanTramKM / 100)))
            // tTien += e.SoLuong * e.GiaBan
        });
        var vND = tTien.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
        setStrTogTien(vND)
    }
    const [openModalDN, setOpenModalDN] = useState(false);
    const [login_check_app, setLoginCheckApp] = useState();
    const OPModalDN = (value) => {
        setOpenModalDN(value)
    }
    const DangNhapApp = () => {
        setLoginCheckApp(!login_check_app)
    };

    const setGioHangRedis = async (listGH) => {
        if (listGH.length <= 200) {
            const locSoLuong0 = listGH.filter(item => item.SoLuong > 0)
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    gioHang: locSoLuong0
                })
            }
            await fetch(API_URL + "/gioHang/" + maNV, requestOptions)
                .then(response => response.json())
                .then(data => {
                    // chiTietDonHang(data, gioHangRoot)
                })
        } else {
            alert("Một đơn tối đa 200 sản phẩm")
        }
    }

    const getGioHangRedis = async (items, maNV01) => {
        await fetch(API_URL + "/gioHang/" + maNV01)
            .then(response => response.json())
            .then(data => {
                let abc = data.gioHang
                let test = 0
                if (data == null) {
                    const tmp = {
                        gioHang: []
                    }
                    setGioHangRedis(tmp.gioHang)
                }
                if (abc.length != 0) {
                    items.forEach(e => {
                        abc.forEach(f => {
                            if (e.MaHang === f.MaHang) {
                                e.SoLuong = f.SoLuong
                                f.DaDat = e.DaDat
                                f.ConLai = e.ConLai
                                if (f.SoLuong > e.ConLai) {
                                    f.SoLuong = e.ConLai
                                    e.SoLuong = e.ConLai
                                    test = 1
                                }

                            }
                        });
                    });
                    let tongSoLuong = 0
                    abc.forEach(e => {
                        tongSoLuong += e.SoLuong
                    });
                    setSoLuongGioHang(tongSoLuong)
                    tongTienDonHang(abc)
                    setGioHang(abc)
                }
                setData(items)
                if (test == 1) {
                    alert("Có một số sản phẩm ĐÃ HẾT HÀNG nên số lượng bị giảm")
                    setGioHangRedis(abc)
                }
            })
    }

    const layMaNV = async (items) => {
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
                if (data[0] !== undefined) {
                    setmaNV(data[0].MaNV)
                    setTimeout(() => {
                        setmaNV(data[0].MaNV)
                        getGioHangRedis(items, data[0].MaNV)
                    }, 10);
                } else {
                    router.push("/")
                }
            })
    }

    useEffect(async () => {

        if (tags != null && sotrang != null && sotrang > 0) {
            sessionStorage.removeItem("Searchfromtc")
            setSessionstorage(null)
            fetch(API_URL + '/searchtags', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sotrang: sotrang,
                    sertags: tags,
                })
            })
                .then((response) => response.json())
                .then(datas => {
                    layMaNV(datas.mang, 0)
                    // console.log(datas)
                    setSoTrang(1)
                    if (datas.tong[0] != null) {
                        setDataSize(Object.values(datas.tong[0]))
                    } else {
                        console.log("loi so trang")
                    }
                })
        }

    }, [resettags]);

    useEffect(async () => {
        if (sotrang != null && sotrang > 0) {
            if (localStorage.getItem("Searchfromtc") !== null) {
                sessionStorage.setItem("Searchfromtc", localStorage.getItem("Searchfromtc"))

                fetch(API_URL + '/searchfront', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        sotrang: sotrang,
                        sercmdarr: localStorage.getItem("Searchfromtc"),
                    })
                })
                    .then((response) => response.json())
                    .then(datas => {
                        layMaNV(datas.mang, 0)
                        setDataSize(Object.values(datas.tong[0]))
                        setSoTrang(1)
                        setTagsvalue(null)
                        localStorage.removeItem("Searchfromtc")
                    })


            } else {
                sessionStorage.removeItem("Searchfromtc")
                setSessionstorage(null)
                if (tags != null) {
                    fetch(API_URL + '/searchtags', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            sotrang: sotrang,
                            sertags: tags,
                        })
                    })
                        .then((response) => response.json())
                        .then(datas => {
                            layMaNV(datas.mang, 0)
                            if (datas.tong[0] != null) {
                                setDataSize(Object.values(datas.tong[0]))
                            } else {
                                console.log("loi so trang")
                            }
                        })
                } else {
                    fetch(API_URL + '/searchfront', {
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
                            // var parsestored = JSON.parse(stored)
                            layMaNV(datas.mang, 0)
                            if (datas.tong[0] != null) {
                                setDataSize(Object.values(datas.tong[0]))
                            } else {
                                console.log("loi so trang")
                            }
                        })
                }

            }
        }
    }, [sotrang]);
    useEffect(async () => {
        if (sotrang != null && sotrang > 0) {
            if (localStorage.getItem("Searchfromtc") !== null) {
                sessionStorage.setItem("Searchfromtc", localStorage.getItem("Searchfromtc"))
                fetch(API_URL + '/searchfront', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        sotrang: sotrang,
                        sercmdarr: localStorage.getItem("Searchfromtc"),
                    })
                })
                    .then((response) => response.json())
                    .then(datas => {
                        layMaNV(datas.mang, 0)
                        setDataSize(Object.values(datas.tong[0]))
                        setSoTrang(1)
                        setTagsvalue(null)
                        localStorage.removeItem("Searchfromtc")
                    })
            } else {
                sessionStorage.removeItem("Searchfromtc")
                setSessionstorage(null)
                fetch(API_URL + '/searchfront', {
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
                        layMaNV(datas.mang, 0)
                        setDataSize(Object.values(datas.tong[0]))
                        setSoTrang(1)
                        // setTags(null)
                        setTagsvalue(null)
                    })
            }
        }
    }, [resetdanhmuc]);

    const themSPvaoGH = (ee1) => {
        let item = {
            TenHang: ee1.TenHang,
            MaHang: ee1.MaHang,
            GiaBan: ee1.GiaBan,
            QCDG: ee1.QCDG,
            SoLuong: ee1.SoLuong,
            TonKho: ee1.TonKho,
            DaDat: ee1.DaDat,
            ConLai: ee1.ConLai,
            HinhAnh: ee1.HinhAnh,
            PhanTramKM: ee1.PhanTramKM,
            DangKD: ee1.DangKD
        }
        let dsGH = gioHang
        if (dsGH.length != 0) {
            var timKiem = 0
            for (let i = 0; i < dsGH.length; i++) {
                if (dsGH[i].MaHang === item.MaHang) {
                    if (item.SoLuong == 0) {
                        dsGH.splice(i, 1)
                    } else {
                        dsGH[i].SoLuong = item.SoLuong
                    }
                    timKiem = 1
                }
            }
            if (timKiem == 0) {
                dsGH.push(item)
            }
            const tmp = {
                gioHang: dsGH.filter(item => item.SoLuong != 0)
            }
            setGioHang(tmp.gioHang)
        } else {
            dsGH.push(item)
            const tmp = {
                gioHang: dsGH.filter(item => item.SoLuong != 0)
            }
            setGioHang(tmp.gioHang)
        }
    }

    const [lamMoiGH, setLamMoiGH] = useState(0)
    const [lanDau, setLanDau] = useState(true)

    useEffect(() => {
        let tongSoLuong = 0
        gioHang.forEach(e => {
            tongSoLuong += e.SoLuong
        });
        setSoLuongGioHang(tongSoLuong)
        tongTienDonHang(gioHang)
        if (!lanDau) {
            setGioHangRedis(gioHang)
        }
        setLanDau(false)
    }, [lamMoiGH])

    const up = (maHang) => {
        const newList = data.map((item) => {
            if (item.MaHang === maHang) {
                let sLuong = item.SoLuong
                let max = 300
                if (item.ConLai < 300) {
                    max = item.ConLai
                }
                if (sLuong < max) {
                    sLuong += 1
                    const updatedItem = {
                        ...item,
                        SoLuong: sLuong,
                    };
                    notify_themsp(item.TenHang);
                    themSPvaoGH(updatedItem)
                    return updatedItem;
                } else {
                    //alert("Số lượng đã cao nhất!")
                    if (max <= 0) {
                        max = 0
                    }
                    const updatedItem = {
                        ...item,
                        SoLuong: max,
                    };
                    notify_themsp(item.TenHang);
                    themSPvaoGH(updatedItem)
                    alert("Sản Phẩm Này Trong Kho Chỉ Còn " + max + " " + item.DVT)
                    return updatedItem;
                }
            }
            return item;
        });
        setData(newList) // thằng này cập nhật số lượng hiện lên web
        const rand = Math.random(2) * 1000
        setLamMoiGH(rand)
    }
    const down = (maHang) => {
        const newList = data.map((item) => {
            if (item.MaHang === maHang) {
                var sLuong = item.SoLuong
                if (sLuong >= 1) {
                    sLuong -= 1
                    const updatedItem = {
                        ...item,
                        SoLuong: sLuong,
                    };
                    notify_giamsp(item.TenHang);
                    themSPvaoGH(updatedItem)
                    return updatedItem;
                } else {
                    alert("Số lượng đã thấp nhất!")
                }
            }
            return item;
        });
        setData(newList) // thằng này cập nhật số lượng hiện lên web
        const rand = Math.random(2) * 1000
        setLamMoiGH(rand)
    }

    const nhapTaySoLuong = (maHang, val) => {
        const newList = data.map((item) => {
            if (item.MaHang === maHang) {
                let sLuong = item.SoLuong
                let max = 300
                if (item.ConLai < 300) {
                    max = item.ConLai
                }
                if (sLuong <= max && val > 0 && val.length != 0) {
                    sLuong = val
                    if (val <= max) {
                        const updatedItem = {
                            ...item,
                            SoLuong: sLuong,
                        };
                        notify_nhaptaysp(item.TenHang, val);
                        themSPvaoGH(updatedItem)
                        return updatedItem;
                    } else {
                        const updatedItem = {
                            ...item,
                            SoLuong: max,
                        };
                        alert("Sản Phẩm Này Trong Kho Chỉ Còn " + max + " " + item.DVT)
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
        setData(newList) // thằng này cập nhật số lượng hiện lên web
        const rand = Math.random(2) * 1000
        setLamMoiGH(rand)
    }
    // hết code của trường


    const handleImgError = e => {
        e.target.src = image_default;
    };

    const [searchString, setSearchString] = useState("");
    const handleOnSearch = (string, results) => {
        setSearchString(string);

    }
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {

            setValue(searchString)
            if (searchString === "") {
                sessionStorage.removeItem("Searchfromtc")
                setSessionstorage(null)
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
                        layMaNV(datas.mang, 0)
                        setDataSize(Object.values(datas.tong[0]))
                        setValue(null)
                        setNoteTieuDe("Tất Cả Sản Phẩm")
                        setSoTrang(1)
                    })
            } else {
                sessionStorage.removeItem("Searchfromtc")
                setSessionstorage(null)
                fetch(API_URL + '/searchfront', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        sotrang: sotrang,
                        sercmdarr: searchString,
                    })
                })
                    .then((response) => response.json())
                    .then(datas => {
                        //console.log(datas)
                        layMaNV(datas.mang, 0)
                        setDataSize(Object.values(datas.tong[0]))
                        setNoteTieuDe(searchString)
                        setSoTrang(1)
                    })
            }
            setSearchString("");
            event.target.blur()
        }
    }
    const handleOnSelect = (item) => {

        setValue(item.TenHang)
        sessionStorage.removeItem("Searchfromtc")
        setSessionstorage(null)
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
                layMaNV(datas.mang, 0)
                setDataSize(Object.values(datas.tong[0]))
                setNoteTieuDe(item.TenHang)
                setSoTrang(1)
            })
        setSearchString("");
    }

    const handleOnClear = () => {
        sessionStorage.removeItem("Searchfromtc")
        setSessionstorage(null)
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
                layMaNV(datas.mang, 0)
                setDataSize(Object.values(datas.tong[0]))
                setValue(null)
                setNoteTieuDe("Tất Cả Sản Phẩm")
                setSoTrang(1)
            })
        setSearchString("");
    };
    const formatResult = (item) => {
        //return item;
        console.log(item)
        let mangItem = item.split("?")
        console.log(item)
        return (
            <div className="item_search_parent">
                <div className="item_search_image">
                    <img src={mangItem[0]} style={{ width: 50, height: 50 }} onError={handleImgError}></img>
                </div>
                <div className="item_search_name">{mangItem[1]} </div>
                <div className="item_search_price" style={{ border: 'none', color: 'red' }}> {parseInt(mangItem[2]).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} </div>
            </div>
        );
    }

    const [maNV, setmaNV] = useState(null)

    const MaNVvalue = (value) => {
        setmaNV(value)
        setTimeout(() => {
            setmaNV(value)
            getGioHangRedis(data, value)
        }, 10);
    }

    return (
        <div>
            <Header MaNVvalue={MaNVvalue} capNhatSLGH={soLuongGioHang} capNhatTTGH={strTogTien} OPModalDN={OPModalDN} callBackApp={DangNhapApp} valueOfModal={openModalDN} />
            <div className="section-sp-parent">
                {/* <div className="btn-nav-parent"><NavMenu parentCallback={LayGiaTriDanhMuc} /></div> */}
                <DanhMuc parentCallback={LayGiaTriDanhMuc} className="danh_muc"></DanhMuc>
                <div className="sanpham123">
                    <div className='a'>
                        <div className='tc_sanpham'>
                            <div className='search-product-parent'>

                                <div onKeyPress={handleKeyPress}>
                                    <ReactSearchAutocomplete
                                        items={input}
                                        id="autocomplete"
                                        onSearch={handleOnSearch}
                                        showIcon={false}
                                        //onHover={handleOnHover}
                                        onSelect={handleOnSelect}
                                        //onFocus={handleOnFocus}
                                        onClear={handleOnClear}
                                        maxResults={50}
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
                                            minMatchCharLength: 1,
                                            keys: ["TenHang", "HoatChat", "HangSX"]
                                        }}
                                        resultStringKeyName="linkhinh"
                                        //formatResult={formatResult}
                                        formatResult={(item) => {

                                            let mangItem = item.split("?")

                                            return (
                                                <div className="item_search_parent">
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
                                            zIndex: "202"
                                        }}
                                    />
                                </div>

                            </div>
                            {
                                sessionstorage != null ? <h1>Đang tìm từ khóa :"{sessionstorage}"</h1> : tagsvalue != null ?
                                    <h1>{tagsvalue}</h1>
                                    : value != null ? <h1>Đang tìm từ khóa :"{note_tieude}"</h1> :
                                        <h1>{note_tieude}</h1>
                            }

                        </div>

                        <div className='tong_so_sp_hienthi'>
                            <div>Hiển thị <b>{offset + 1} - {offset + 30 > datasize ? datasize : offset + 30}</b> trên tổng số <b>{datasize}</b> sản phẩm</div>
                        </div>
                    </div>
                    <div className='MuttiBu'>
                        {tagsvalue == "Bán chạy" ?
                            <button className='MuttiBu5' style={{ marginTop: 10 }} onClick={() => {
                                setTags("BanChay")
                                setTagsvalue("Bán chạy")
                                const min = 1;
                                const max = 100;
                                const rand = min + Math.random() * (max - min);
                                //setSoTrang(1)
                                setResettags(rand)

                            }} >
                                <span className='MuttiBu4'>Bán chạy</span>
                            </button>
                            :
                            <button className='MuttiBu1' style={{ marginTop: 10 }} onClick={() => {
                                setTags("BanChay")
                                setTagsvalue("Bán chạy")
                                const min = 1;
                                const max = 100;
                                const rand = min + Math.random() * (max - min);
                                //setSoTrang(1)
                                setResettags(rand)
                            }}>
                                <span className='MuttiBu2'>Bán chạy</span>
                            </button>
                        }
                        {tagsvalue == "Sản phẩm mới" ?
                            <button className='MuttiBu5' style={{ marginTop: 10 }} onClick={() => {
                                setTags("SPmoi")
                                setTagsvalue("Sản phẩm mới")
                                const min = 1;
                                const max = 100;
                                const rand = min + Math.random() * (max - min);
                                setResettags(rand)
                            }}>
                                <span className='MuttiBu4' >Sản phẩm mới</span>
                            </button>
                            :
                            <button className='MuttiBu1' style={{ marginTop: 10 }} onClick={() => {
                                setTags("SPmoi")
                                setTagsvalue("Sản phẩm mới")
                                const min = 1;
                                const max = 100;
                                const rand = min + Math.random() * (max - min);
                                setResettags(rand)
                            }}>
                                <span className='MuttiBu2' >Sản phẩm mới</span>
                            </button>
                        }
                        {tagsvalue == "Hóa đơn nhanh" ?
                            <button className='MuttiBu5' style={{ marginTop: 10 }} onClick={() => {
                                setTags("HDnhanh")
                                setTagsvalue("Hóa đơn nhanh")
                                const min = 1;
                                const max = 100;
                                const rand = min + Math.random() * (max - min);
                                setResettags(rand)
                            }}>
                                <span className='MuttiBu4' >Hóa đơn nhanh</span>
                            </button>
                            :
                            <button className='MuttiBu1' style={{ marginTop: 10 }} onClick={() => {
                                setTags("HDnhanh")
                                setTagsvalue("Hóa đơn nhanh")
                                const min = 1;
                                const max = 100;
                                const rand = min + Math.random() * (max - min);
                                setResettags(rand)
                            }}>
                                <span className='MuttiBu2' >Hóa đơn nhanh</span>
                            </button>
                        }
                        {tagsvalue == "Giao nhanh" ?
                            <button className='MuttiBu5' style={{ marginTop: 10 }} onClick={() => {
                                setTags("GHnhanh")
                                setTagsvalue("Giao nhanh")
                                const min = 1;
                                const max = 100;
                                const rand = min + Math.random() * (max - min);
                                setResettags(rand)
                            }}>
                                <span className='MuttiBu4'>Giao nhanh</span>
                            </button>
                            :
                            <button className='MuttiBu1' style={{ marginTop: 10 }} onClick={() => {
                                setTags("GHnhanh")
                                setTagsvalue("Giao nhanh")
                                const min = 1;
                                const max = 100;
                                const rand = min + Math.random() * (max - min);
                                setResettags(rand)
                            }}>
                                <span className='MuttiBu2'>Giao nhanh</span>
                            </button>
                        }
                        {tagsvalue == "Sĩ Vip" ?
                            <button className='MuttiBu5' style={{ marginTop: 10 }} onClick={() => {
                                setTags("SVip")
                                setTagsvalue("Sĩ Vip")
                                const min = 1;
                                const max = 100;
                                const rand = min + Math.random() * (max - min);
                                setResettags(rand)
                            }}>
                                <span className='MuttiBu4'>Sĩ Vip</span>
                            </button>
                            :
                            <button className='MuttiBu1' style={{ marginTop: 10 }} onClick={() => {
                                setTags("SVip")
                                setTagsvalue("Sĩ Vip")
                                const min = 1;
                                const max = 100;
                                const rand = min + Math.random() * (max - min);
                                setResettags(rand)
                            }}>
                                <span className='MuttiBu2'>Sĩ Vip</span>
                            </button>
                        }
                        {tagsvalue == "Nhi Khoa" ?
                            <button className='MuttiBu5' style={{ marginTop: 10 }} onClick={() => {
                                setTags("NhiKhoa")
                                setTagsvalue("Nhi Khoa")
                                const min = 1;
                                const max = 100;
                                const rand = min + Math.random() * (max - min);
                                setResettags(rand)
                            }}>
                                <span className='MuttiBu4'>Nhi Khoa</span>
                            </button>
                            :
                            <button className='MuttiBu1' style={{ marginTop: 10 }} onClick={() => {
                                setTags("NhiKhoa")
                                setTagsvalue("Nhi Khoa")
                                const min = 1;
                                const max = 100;
                                const rand = min + Math.random() * (max - min);
                                setResettags(rand)
                            }}>
                                <span className='MuttiBu2'>Nhi Khoa</span>
                            </button>
                        }
                        {tagsvalue == "Nha Khoa" ?
                            <button className='MuttiBu5' style={{ marginTop: 10 }} onClick={() => {
                                setTags("NhaKhoa")
                                setTagsvalue("Nha Khoa")
                                const min = 1;
                                const max = 100;
                                const rand = min + Math.random() * (max - min);
                                setResettags(rand)
                            }}>
                                <span className='MuttiBu4'>Nha Khoa</span>
                            </button>
                            :
                            <button className='MuttiBu1' style={{ marginTop: 10 }} onClick={() => {
                                setTags("NhaKhoa")
                                setTagsvalue("Nha Khoa")
                                const min = 1;
                                const max = 100;
                                const rand = min + Math.random() * (max - min);
                                setResettags(rand)
                            }}>
                                <span className='MuttiBu2'>Nha Khoa</span>
                            </button>
                        }
                        {tagsvalue == "Flash sale" ?
                            <button className='MuttiBu5' style={{ marginTop: 10 }} onClick={() => {
                                setTags("FlashSale")
                                setTagsvalue("Flash sale")
                                const min = 1;
                                const max = 100;
                                const rand = min + Math.random() * (max - min);
                                setResettags(rand)
                            }}>
                                <span className='MuttiBu4'>Flash sale</span>
                            </button>
                            :
                            <button className='MuttiBu1' style={{ marginTop: 10 }} onClick={() => {
                                setTags("FlashSale")
                                setTagsvalue("Flash sale")
                                const min = 1;
                                const max = 100;
                                const rand = min + Math.random() * (max - min);
                                setResettags(rand)
                            }}>
                                <span className='MuttiBu2'>Flash sale</span>
                            </button>
                        }
                        {tagsvalue == "Thần Kinh" ?
                            <button className='MuttiBu5' style={{ marginTop: 10 }} onClick={() => {
                                setTags("ThanKinh")
                                setTagsvalue("Thần Kinh")
                                const min = 1;
                                const max = 100;
                                const rand = min + Math.random() * (max - min);
                                setResettags(rand)
                            }}>
                                <span className='MuttiBu4'>Thần Kinh</span>
                            </button>
                            :
                            <button className='MuttiBu1' style={{ marginTop: 10 }} onClick={() => {
                                setTags("ThanKinh")
                                setTagsvalue("Thần Kinh")
                                const min = 1;
                                const max = 100;
                                const rand = min + Math.random() * (max - min);
                                setResettags(rand)
                            }}>
                                <span className='MuttiBu2'>Thần Kinh</span>
                            </button>
                        }
                        {tagsvalue == "Nội Tổng Hợp" ?
                            <button className='MuttiBu5' style={{ marginTop: 10 }} onClick={() => {
                                setTags("NTHop")
                                setTagsvalue("Nội Tổng Hợp")
                                const min = 1;
                                const max = 100;
                                const rand = min + Math.random() * (max - min);
                                setResettags(rand)
                            }}>
                                <span className='MuttiBu4'>Nội Tổng Hợp</span>
                            </button>
                            :
                            <button className='MuttiBu1' style={{ marginTop: 10 }} onClick={() => {
                                setTags("NTHop")
                                setTagsvalue("Nội Tổng Hợp")
                                const min = 1;
                                const max = 100;
                                const rand = min + Math.random() * (max - min);
                                setResettags(rand)
                            }}>
                                <span className='MuttiBu2'>Nội Tổng Hợp</span>
                            </button>
                        }
                        {tagsvalue == "Da Liễu" ?
                            <button className='MuttiBu5' style={{ marginTop: 10 }} onClick={() => {
                                setTags("DaLieu")
                                setTagsvalue("Da Liễu")
                                const min = 1;
                                const max = 100;
                                const rand = min + Math.random() * (max - min);
                                setResettags(rand)
                            }}>
                                <span className='MuttiBu4'>Da Liễu</span>
                            </button>
                            :
                            <button className='MuttiBu1' style={{ marginTop: 10 }} onClick={() => {
                                setTags("DaLieu")
                                setTagsvalue("Da Liễu")
                                const min = 1;
                                const max = 100;
                                const rand = min + Math.random() * (max - min);
                                setResettags(rand)
                            }}>
                                <span className='MuttiBu2'>Da Liễu</span>
                            </button>
                        }
                        {tagsvalue == "Sản Khoa" ?
                            <button className='MuttiBu5' style={{ marginTop: 10 }} onClick={() => {
                                setTags("SanKhoa")
                                setTagsvalue("Sản Khoa")
                                const min = 1;
                                const max = 100;
                                const rand = min + Math.random() * (max - min);
                                setResettags(rand)
                            }}>
                                <span className='MuttiBu4'>Sản Khoa</span>
                            </button>
                            :
                            <button className='MuttiBu1' style={{ marginTop: 10 }} onClick={() => {
                                setTags("SanKhoa")
                                setTagsvalue("Sản Khoa")
                                const min = 1;
                                const max = 100;
                                const rand = min + Math.random() * (max - min);
                                setResettags(rand)
                            }}>
                                <span className='MuttiBu2'>Sản Khoa</span>
                            </button>
                        }
                        {tagsvalue == "Bệnh Viện/Phòng Khám" ?
                            <button className='MuttiBu5' style={{ marginTop: 10 }} onClick={() => {
                                setTags("BV")
                                setTagsvalue("Bệnh Viện/Phòng Khám")
                                const min = 1;
                                const max = 100;
                                const rand = min + Math.random() * (max - min);
                                setResettags(rand)
                            }}>
                                <span className='MuttiBu4'>Bệnh Viện/Phòng Khám</span>
                            </button>
                            :
                            <button className='MuttiBu1' style={{ marginTop: 10 }} onClick={() => {
                                setTags("BV")
                                setTagsvalue("Bệnh Viện/Phòng Khám")
                                const min = 1;
                                const max = 100;
                                const rand = min + Math.random() * (max - min);
                                setResettags(rand)
                            }}>
                                <span className='MuttiBu2'>Bệnh Viện/Phòng Khám</span>
                            </button>
                        }
                    </div>
                    <div className='phantrang'>
                        <Pagination callBackSanPham={LayGiaTriPagination} TongSoSP={datasize} Sotrang={sotrang}></Pagination>
                    </div>
                    <div className='M-Tong M-item MuiGrid-grid-xs-61 MuiGrid-grid-md-4 MuiGrid-grid-lg-3 MuiGrid-grid-xl-2'>
                        <div className='chanqua'>
                            {
                                data.map((x, i) => {
                                    var vND = x.GiaBan.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                                    return (

                                        <div className='styles_root_card__3lCSR' key={i}>
                                            <div className='baongoai_sp1'>
                                                <div className='hinh_sp'>
                                                    {
                                                        x.MaHang.indexOf('COMBO_') >= 0 ?
                                                            <Link
                                                                href={{
                                                                    pathname: `/DetailCombo`,
                                                                    query: { item: x.IdCombo },

                                                                }}
                                                            >
                                                                {x.ImageOne == null ? <img src={image_default} width='100%' height="100%"></img> : <img src={x.ImageOne} onError={handleImgError} width='95%' height="100%"></img>}
                                                            </Link>
                                                            :
                                                            <Link
                                                                href={{
                                                                    pathname: `/ChiTietSanPham`,
                                                                    query: { item: x.MaHang },

                                                                }}
                                                            >
                                                                {
                                                                    x.HinhAnh == null ? <img src={image_default} width='100%' height="100%"></img> : <img src={x.HinhAnh} onError={handleImgError} width='95%' height="100%"></img>
                                                                }
                                                            </Link>
                                                    }

                                                </div>
                                                <div className="section_title_sp">
                                                    <div className='ten_sp' style={{ height: 55 }}>
                                                        <div className='ten_sp1'>
                                                            <Link
                                                                href={{
                                                                    pathname: `/ChiTietSanPham`,
                                                                    query: { item: x.MaHang },

                                                                }}
                                                            >

                                                                <p className="overfl hoverr" style={{ color: 'black', fontWeight: 'bold', fontSize: 14 }}>{x.TenHang}</p>

                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className='tongcls'>
                                                        {
                                                            x.HDnhanh == 1 ?

                                                                <div className='MuiBox-root jss493 tag_tagContainer__1akLh'>
                                                                    <img src="https://img.icons8.com/material-rounded/2x/26e07f/fast-cart.png" alt="Girl in a jacket" width="20" height="20" />
                                                                    <p className='MuiTypography-root MuiTypography-body454'>Hóa đơn nhanh</p>
                                                                </div>

                                                                : null
                                                        }
                                                        {
                                                            x.BanChay == 1 ?

                                                                <div className='MuiBox-root jss493 tag_tagContainer__1akLh1'>
                                                                    <img src="https://img.icons8.com/material-sharp/2x/26e07f/facebook-like.png" alt="Girl in a jacket" width="20" height="20" />
                                                                    <p className='MuiTypography-root MuiTypography-body11'>Bán chạy</p>
                                                                </div>

                                                                : null
                                                        }
                                                        {
                                                            x.GHnhanh == 1 ?

                                                                <div className='MuiBox-root jss493 tag_tagContainer__1akLh'>
                                                                    <img src="https://img.icons8.com/fluent-systems-filled/2x/26e07f/fast-cart.png" alt="Girl in a jacket" width="20" height="20" />
                                                                    <p className='MuiTypography-root MuiTypography-body454'>Giao nhanh</p>
                                                                </div>

                                                                : null
                                                        }
                                                        {
                                                            x.SVip == 1 ?

                                                                <div className='MuiBox-root jss493 tag_tagContainer__1akLh2'>
                                                                    <img src="https://img.icons8.com/material-rounded/2x/star.png" alt="Girl in a jacket" width="20" height="20" />
                                                                    <p className='MuiTypography-root MuiTypography-body2'>Sĩ Vip</p>
                                                                </div>

                                                                : null
                                                        }
                                                        {
                                                            x.NhiKhoa == 1 ?

                                                                <div className='MuiBox-root jss493 tag_tagContainer__1akLh3'>
                                                                    <img src="https://img.icons8.com/ios-glyphs/2x/fa314a/plus-math.png" alt="Girl in a jacket" width="20" height="20" />
                                                                    <p className='MuiTypography-root MuiTypography-body3'>Nhi Khoa</p>
                                                                </div>

                                                                : null
                                                        }
                                                        {
                                                            x.FlashSale == 1 ?

                                                                <div className='MuiBox-root jss493 tag_tagContainer__1akLh4'>
                                                                    <img src="https://pngimg.com/uploads/lightning/lightning_PNG51.png" alt="Girl in a jacket" width="20" height="20" />
                                                                    <p className='MuiTypography-root MuiTypography-body4'>Flash sale</p>
                                                                </div>

                                                                : null
                                                        }
                                                        {
                                                            x.NhaKhoa == 1 ?

                                                                <div className='MuiBox-root jss493 tag_tagContainer__1akLh5'>
                                                                    <img src="http://benhviendongdo.com.vn/wp-content/uploads/2018/04/icon-rang-ham-mat.png" alt="Girl in a jacket" width="20" height="20" />
                                                                    <p className='MuiTypography-root MuiTypography-body5'>Nha Khoa</p>
                                                                </div>

                                                                : null
                                                        }
                                                        {
                                                            x.SanKhoa == 1 ?

                                                                <div className='MuiBox-root jss493 tag_tagContainer__1akLh6'>
                                                                    <img src="https://goldenhealthcarevn.com/wp-content/uploads/2019/03/ICON-GOLDEN-08.png" alt="Girl in a jacket" width="20" height="20" />
                                                                    <p className='MuiTypography-root MuiTypography-body6'>Sản Khoa</p>
                                                                </div>

                                                                : null
                                                        }
                                                        {
                                                            x.DaLieu == 1 ?

                                                                <div className='MuiBox-root jss493 tag_tagContainer__1akLh7'>
                                                                    <img src="http://benhviendongdo.com.vn/wp-content/uploads/2018/04/icon-khoa-da-lieu.png" alt="Girl in a jacket" width="20" height="20" />
                                                                    <p className='MuiTypography-root MuiTypography-body7'>Da Liễu</p>
                                                                </div>

                                                                : null
                                                        }
                                                        {
                                                            x.NTHop == 1 ?

                                                                <div className='MuiBox-root jss493 tag_tagContainer__1akLh5'>

                                                                    <p className='MuiTypography-root MuiTypography-body5'>Nội Tổng Hợp</p>
                                                                </div>

                                                                : null
                                                        }
                                                        {
                                                            x.ThanKinh == 1 ?

                                                                <div className='MuiBox-root jss493 tag_tagContainer__1akLh8'>

                                                                    <img src="http://www.benhvientiengiang.com.vn/Media/images/icons/Noi%20than%20kinh.png" alt="Girl in a jacket" width="20" height="20" />
                                                                    <p className='MuiTypography-root MuiTypography-body8'>Thần Kinh</p>
                                                                </div>

                                                                : null
                                                        }
                                                        {
                                                            x.SPmoi == 1 ?

                                                                <div className='MuiBox-root jss493 tag_tagContainer__1akLh12'>
                                                                    <img src="https://img.icons8.com/fluent-systems-filled/2x/4a90e2/electricity.png" alt="Girl in a jacket" width="20" height="20" />
                                                                    <p className='MuiTypography-root MuiTypography-body123'>Sản phẩm mới</p>
                                                                </div>

                                                                : null
                                                        }
                                                        {
                                                            x.BV == 1 ?

                                                                <div className='MuiBox-root jss493 tag_tagContainer__1akLh5'>

                                                                    <p className='MuiTypography-root MuiTypography-body5'>Bệnh Viện/Phòng Khám</p>
                                                                </div>

                                                                : null
                                                        }
                                                    </div>
                                                    <div className='ten_sp2'>
                                                        <div className='ten_sp1'><p style={{ fontSize: 12, color: 'gray' }}>{x.QCDG}</p></div>
                                                    </div>
                                                    <div className='ten_sp2'>
                                                        <div className='ten_sp1'>
                                                            {
                                                                x.ConLai < 300 ?
                                                                    x.ConLai <= 0 ?
                                                                        <p style={{ fontSize: 13, color: '#dc3545', fontWeight: 'bold' }}>Sản phẩm tạm hết hàng </p>
                                                                        :
                                                                        <p style={{ fontSize: 13, color: '#dc3545', fontWeight: 'bold' }}>Đặt tối đa {x.ConLai} sản phẩm </p>
                                                                    :
                                                                    <p style={{ fontSize: 13, color: '#dc3545', fontWeight: 'bold' }}>Đặt tối đa 300 sản phẩm </p>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className='ten_sp9'><div className='ten_sp1'><h3>{vND} </h3></div></div>
                                                </div>
                                            </div>
                                            {localStorage.getItem("accesstoken") != null ?
                                                <div className="soluong_sp">
                                                    {
                                                        x.ConLai > 0 ?
                                                            <div className="MuiCardActions-root1 styles_product_action__1Zos7 MuiCardActions-spacing">
                                                                <button onClick={() => down(x.MaHang)} className="MuiButtonBase-root9 MuiIconButton-root styles_button_root__3mGap styles_button_root_minus__2gTtR styles_minus__ysCNs" tabIndex="0" type="button">
                                                                    <span className="MuiIconButton-label">
                                                                        <svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                                                            <path d="M19 13H5v-2h14v2z"></path>
                                                                        </svg>
                                                                    </span>
                                                                    <span className="MuiTouchRipple-root"></span>
                                                                </button>
                                                                <div className="MuiInputBase-root MuiInput-root styles_root_input__2PM1z">
                                                                    <input value={x.SoLuong} onChange={value => { nhapTaySoLuong(x.MaHang, parseInt(value.target.value)) }} placeholder="0" type="text" className="MuiInputBase-input MuiInput-input styles_input__3lyzY" />
                                                                </div>
                                                                <button onClick={() => up(x.MaHang)} style={{ borderColor: 10 }} className="MuiButtonBase-root MuiIconButton-root styles_button_root__3mGap styles_plus__ia9cs" tabIndex="0" type="button">
                                                                    <span className="MuiIconButton-label">
                                                                        <svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                                                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                                                                        </svg>
                                                                    </span>
                                                                    <span className="MuiTouchRipple-root"></span>
                                                                </button>
                                                            </div>
                                                            :
                                                            <div className="MuiCardActions-root1 styles_product_action__1Zos7 MuiCardActions-spacing">
                                                                <button style={{ display: 'none' }} disabled className="MuiButtonBase-root9 MuiIconButton-root styles_button_root__3mGap styles_button_root_minus__2gTtR styles_minus__ysCNs" tabIndex="0" type="button">
                                                                    <span className="MuiIconButton-label">
                                                                        <svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                                                            <path d="M19 13H5v-2h14v2z"></path>
                                                                        </svg>
                                                                    </span>
                                                                    <span className="MuiTouchRipple-root"></span>
                                                                </button>
                                                                <div className="MuiInputBase-root MuiInput-root styles_root_input__2PM1z">
                                                                    <input disabled placeholder="0" type="text" className="MuiInputBase-input MuiInput-input styles_input__3lyzY" />
                                                                </div>
                                                                <button disabled style={{ borderColor: 10, display: 'none' }} className="MuiButtonBase-root MuiIconButton-root styles_button_root__3mGap styles_plus__ia9cs" tabIndex="0" type="button">
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
                                                :
                                                <div className="soluong_sp">
                                                    {
                                                        x.ConLai > 0 ?
                                                            <div className="MuiCardActions-root1 styles_product_action__1Zos7 MuiCardActions-spacing">
                                                                <button onClick={verifytoken} className="MuiButtonBase-root9 MuiIconButton-root styles_button_root__3mGap styles_button_root_minus__2gTtR styles_minus__ysCNs" tabIndex="0" type="button">
                                                                    <span className="MuiIconButton-label">
                                                                        <svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                                                            <path d="M19 13H5v-2h14v2z"></path>
                                                                        </svg>
                                                                    </span>
                                                                    <span className="MuiTouchRipple-root"></span>
                                                                </button>
                                                                <div className="MuiInputBase-root MuiInput-root styles_root_input__2PM1z">
                                                                    <input value={x.SoLuong} onChange={verifytoken} placeholder="0" type="text" className="MuiInputBase-input MuiInput-input styles_input__3lyzY" />
                                                                </div>
                                                                <button onClick={verifytoken} className="MuiButtonBase-root MuiIconButton-root styles_button_root__3mGap styles_plus__ia9cs" tabIndex="0" type="button">
                                                                    <span className="MuiIconButton-label">
                                                                        <svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                                                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                                                                        </svg>
                                                                    </span>
                                                                    <span className="MuiTouchRipple-root"></span>
                                                                </button>
                                                            </div>
                                                            :
                                                            <div className="MuiCardActions-root1 styles_product_action__1Zos7 MuiCardActions-spacing">
                                                                <button style={{ display: 'none' }} disabled className="MuiButtonBase-root9 MuiIconButton-root styles_button_root__3mGap styles_button_root_minus__2gTtR styles_minus__ysCNs" tabIndex="0" type="button">
                                                                    <span className="MuiIconButton-label">
                                                                        <svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                                                            <path d="M19 13H5v-2h14v2z"></path>
                                                                        </svg>
                                                                    </span>
                                                                    <span className="MuiTouchRipple-root"></span>
                                                                </button>
                                                                <div className="MuiInputBase-root MuiInput-root styles_root_input__2PM1z">
                                                                    <input disabled placeholder="0" type="text" className="MuiInputBase-input MuiInput-input styles_input__3lyzY" />
                                                                </div>
                                                                <button disabled style={{ borderColor: 10, display: 'none' }} className="MuiButtonBase-root MuiIconButton-root styles_button_root__3mGap styles_plus__ia9cs" tabIndex="0" type="button">
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
                                            }


                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <div className='phantrang'>
                        <Pagination callBackSanPham={LayGiaTriPagination} TongSoSP={datasize} Sotrang={sotrang}></Pagination>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}
export default SanPham;