import { useEffect, useState } from 'react';
import Link from "next/link"

import Header from './Header';
import Footer from './Footer';
import image_default from '../public/images/image-default.jpg'
import { API_URL } from '../src/constants/constants'
import React from 'react'
import Pagination from '../src/components/Pagination';
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
const notify_nhaptaysp = (tensp) => {
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


const KhuyenMai = (props) => {
    const [sotrang, setSoTrang] = useState(1);
    const LayGiaTriPagination = (childData) => {
        setSoTrang(childData)
    }
    const [input, setInput] = useState([]);//mang gợi ý của search
    const [maNV, setmaNV] = useState(null)
    // const [list, setList] = useState([]);
    const [data, setData] = useState([]);//mang san pham
    const [datasize, setDataSize] = useState([]);//mang san pham
    const [note_tieude, setNoteTieuDe] = useState("Tất Cả Sản Phẩm KM");
    const router = useRouter()
    const handleImgError = e => {
        e.target.src = image_default;
    };
    ///hàm verifytoken
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
        props.OPModalDN(true);
    }
    ///hàm verifytoken

    useEffect(async () => {
        fetch(API_URL + '/getsuggestkm', {
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
    }, []);

    const [gioHang, setGioHang] = useState([])
    const [soLuongGioHang, setSoLuongGioHang] = useState(0)
    const [strTogTien, setStrTogTien] = useState()

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
            // console.log("setgiohang"+maNV)
            await fetch(API_URL + "/gioHang/" + maNV, requestOptions)
                .then(response => response.json())

        } else {
            alert("Một đơn tối đa 200 sản phẩm")
        }
    }

    const MaNVvalue = (value) => {
        setmaNV(value)
        setTimeout(() => {
            setmaNV(value)
            getGioHangRedis(data, 0, value)
        }, 10);
    }

    useEffect(async () => {
        //console.log(maNV)
    }, [maNV]);

    const getGioHangRedis = async (items, test, maNV01) => {
        // console.log("getgiohang"+maNV)
        // console.log(`${new Date().getTime()} maNV01=`, maNV01)
        if (maNV01 != null || maNV01 != undefined) {
            await fetch(API_URL + "/gioHang/" + maNV01)
                .then(response => response.json())
                .then(data => {
                    const dsGH = data
                    let abc = dsGH.gioHang
                    let test = 0
                    if (dsGH == null) {
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
                        setGioHangRedis(abc)
                        alert("Có một số sản phẩm ĐÃ HẾT HÀNG nên số lượng bị giảm")
                    }
                })
        } else {
            setData(items)
        }
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
                        getGioHangRedis(items, 0, data[0].MaNV)
                    }, 10);
                } else {
                    router.push("/")
                }
            })
    }

    useEffect(async () => {
        if (sotrang != null && sotrang > 0) {
            fetch(API_URL + '/searchkhuyenmai', {
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
                    setData(datas.mang)
                    layMaNV(datas.mang)
                    setDataSize(Object.values(datas.tong[0]))
                })

        }

    }, [note_tieude])

    useEffect(async () => {
        if (sotrang != null && sotrang > 0) {
            fetch(API_URL + '/searchkhuyenmai', {
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
                    setData(datas.mang)
                    layMaNV(datas.mang)
                    setDataSize(Object.values(datas.tong[0]))
                })

        }

    }, [sotrang])


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
                    alert("Số lượng đã cao nhất!")
                    if (max <= 0) {
                        max = 0
                    }
                    const updatedItem = {
                        ...item,
                        SoLuong: max,
                    };
                    notify_themsp(item.TenHang);
                    themSPvaoGH(updatedItem)
                    return updatedItem;
                }
            }
            return item;
        });
        setData(newList) // thằng này cập nhật số lượng hiện lên web
        var rand = Math.random(2) * 1000
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
        var rand = Math.random(2) * 1000
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
        var rand = Math.random(2) * 1000
        setLamMoiGH(rand)
    }
    const [searchString, setSearchString] = useState("");
    const handleOnSearch = (string) => {
        setSearchString(string);

    }
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            if (searchString === "") {
                fetch(API_URL + '/searchkhuyenmai', {
                    method: 'POST',
                    headers: {

                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        sotrang: sotrang,
                        sercmdarr: "Tất Cả Sản Phẩm KM",
                    })

                })
                    .then((response) => response.json())
                    .then(datas => {
                        setData(datas.mang)
                        layMaNV(datas.mang)
                        setDataSize(Object.values(datas.tong[0]))
                        setSoTrang(1)
                    })
            } else {
                fetch(API_URL + '/searchkhuyenmai', {
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
                        setData(datas.mang)
                        layMaNV(datas.mang)
                        setDataSize(Object.values(datas.tong[0]))
                        setSoTrang(1)
                    })
            }
            setSearchString("");
            event.target.blur()
        }
    }
    const handleOnSelect = (item) => {

        fetch(API_URL + '/searchkhuyenmai', {
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
                setData(datas.mang)
                layMaNV(datas.mang)
                setDataSize(Object.values(datas.tong[0]))
                setSoTrang(1)
            })

        setSearchString("");
    }

    const handleOnClear = () => {

        fetch(API_URL + '/searchkhuyenmai', {
            method: 'POST',
            headers: {

                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sotrang: sotrang,
                sercmdarr: "Tất Cả Sản Phẩm KM",
            })

        })
            .then((response) => response.json())
            .then(datas => {
                setData(datas.mang)
                layMaNV(datas.mang)
                setDataSize(Object.values(datas.tong[0]))
                setNoteTieuDe("Tất Cả Sản Phẩm KM")
                setSoTrang(1)
            })
        setSearchString("");
    };

    return (
        <div>
            <Header MaNVvalue={MaNVvalue} capNhatSLGH={soLuongGioHang} capNhatTTGH={strTogTien} OPModalDN={OPModalDN} callBackApp={DangNhapApp} valueOfModal={openModalDN} />
            <div className="section-sp-parent">
                <div className="sanpham1">
                    <div className="styles_text_white__1h0Wv">
                        <h1 style={{ fontSize: 42 }} className="styles_title__Hge1r">Khuyến mãi</h1>

                    </div>
                    <div className='search-product-parent4'>

                        {/* <img height="22" width="22" src={search_img} className="img_search1"></img> */}


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
                                    zIndex: "202"
                                }}
                            />
                        </div>
                    </div>
                    <div className='phantrang'>
                        {/* <Phantrang1></Phantrang1> */}
                        <Pagination callBackSanPham={LayGiaTriPagination} TongSoSP={datasize} Sotrang={sotrang}></Pagination>
                    </div>
                    <div className='M-Tong M-item MuiGrid-grid-xs-61 MuiGrid-grid-md-4 MuiGrid-grid-lg-3 MuiGrid-grid-xl-2'>
                        <div className='sanpham_khuyenmai'>
                            {
                                data.map((x, i) => {
                                    var vND = x.GiaBan.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                                    var giaKhuyenMai = (x.GiaBan - (x.GiaBan * x.PhanTramKM / 100)).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                                    return (
                                        <div className='styles_root_card__3lCSR1' key={i}>
                                            <div className="style_ribbon__25ikq style_price_down__1Hhvc">
                                                <div className="style_ribbon_percent__4fm_G">{x.PhanTramKM}%</div>
                                                <div className="style_ribbon_status__3DLch">Giảm</div>
                                            </div>
                                            <div className='baongoai_sp1'>
                                                <div className='hinh_sp'>
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
                                                </div>
                                                <div className="section_title_sp">
                                                    <div className='ten_sp'>
                                                        <div className='ten_sp1 overfl'>
                                                            <Link
                                                                href={{
                                                                    pathname: `/ChiTietSanPham`,
                                                                    query: { item: x.MaHang },

                                                                }}
                                                            >

                                                                <h1 className="overfl" style={{ fontSize: 13 }}>{x.TenHang}</h1>
                                                            </Link>

                                                        </div>
                                                    </div>
                                                    <div className='tongcls'>
                                                        {
                                                            x.HDnhanh == 1 ?
                                                              
                                                                    <div className='MuiBox-root jss493 tag_tagContainer__1akLh'>
                                                                        <img src="https://img.icons8.com/material-rounded/2x/26e07f/fast-cart.png" alt="Girl in a jacket" width="20" height="20" />

                                                                        <p className='MuiTypography-root MuiTypography-body454'>
                                                                            Hóa đơn nhanh
                                                                        </p>
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
                                                    <div className='ten_sp1'>
                                                        <p className="Mdong" style={{ fontSize: 13 }}>{x.QCDG}</p>
                                                    </div>

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

                                                    <div className='ten_sp9'>
                                                        <div className='ten_sp1'>
                                                            <h3>{giaKhuyenMai} </h3>
                                                        </div>
                                                        <div className='ten_sp1 gia_goc'>
                                                            <h3>{vND} </h3>
                                                        </div>
                                                    </div>

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
                                                                </button><div className="MuiInputBase-root MuiInput-root styles_root_input__2PM1z">
                                                                    <input value={x.SoLuong} onChange={value => { nhapTaySoLuong(x.MaHang, parseInt(value.target.value)) }} placeholder="0" type="text" className="MuiInputBase-input MuiInput-input styles_input__3lyzY" />
                                                                </div>
                                                                <button onClick={() => up(x.MaHang)} style={{ borderColor: 10 }} className="MuiButtonBase-root MuiIconButton-root styles_button_root__3mGap styles_plus__ia9cs" tabIndex="0" type="button">
                                                                    {/* <button style={{ borderColor: 10 }} className="MuiButtonBase-root MuiIconButton-root styles_button_root__3mGap styles_plus__ia9cs" tabIndex="0" type="button"> */}
                                                                    <span className="MuiIconButton-label"><svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                                                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                                                                    </svg>
                                                                    </span>
                                                                    <span className="MuiTouchRipple-root"></span>
                                                                </button>
                                                            </div>
                                                            :
                                                            <div className="MuiCardActions-root1 styles_product_action__1Zos7 MuiCardActions-spacing">
                                                                <button disabled style={{ display: "none" }} className="MuiButtonBase-root9 MuiIconButton-root styles_button_root__3mGap styles_button_root_minus__2gTtR styles_minus__ysCNs" tabIndex="0" type="button">
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
                                                                <button disabled style={{ borderColor: 10, display: "none" }} className="MuiButtonBase-root MuiIconButton-root styles_button_root__3mGap styles_plus__ia9cs" tabIndex="0" type="button">
                                                                    {/* <button style={{ borderColor: 10 }} className="MuiButtonBase-root MuiIconButton-root styles_button_root__3mGap styles_plus__ia9cs" tabIndex="0" type="button"> */}
                                                                    <span className="MuiIconButton-label"><svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                                                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                                                                    </svg>
                                                                    </span>
                                                                    <span className="MuiTouchRipple-root"></span>
                                                                </button>
                                                            </div>
                                                    }
                                                </div>
                                                : <div className="soluong_sp">
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
                                                                </button><div className="MuiInputBase-root MuiInput-root styles_root_input__2PM1z">
                                                                    <input value={x.SoLuong} onChange={verifytoken} placeholder="0" type="text" className="MuiInputBase-input MuiInput-input styles_input__3lyzY" />
                                                                </div>
                                                                <button onClick={verifytoken} className="MuiButtonBase-root MuiIconButton-root styles_button_root__3mGap styles_plus__ia9cs" tabIndex="0" type="button">
                                                                    {/* <button style={{ borderColor: 10 }} className="MuiButtonBase-root MuiIconButton-root styles_button_root__3mGap styles_plus__ia9cs" tabIndex="0" type="button"> */}
                                                                    <span className="MuiIconButton-label"><svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                                                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                                                                    </svg>
                                                                    </span>
                                                                    <span className="MuiTouchRipple-root"></span>
                                                                </button>
                                                            </div>
                                                            :
                                                            <div className="MuiCardActions-root1 styles_product_action__1Zos7 MuiCardActions-spacing">
                                                                <button disabled style={{ display: "none" }} className="MuiButtonBase-root9 MuiIconButton-root styles_button_root__3mGap styles_button_root_minus__2gTtR styles_minus__ysCNs" tabIndex="0" type="button">
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
                                                                <button disabled style={{ borderColor: 10, display: "none" }} className="MuiButtonBase-root MuiIconButton-root styles_button_root__3mGap styles_plus__ia9cs" tabIndex="0" type="button">
                                                                    {/* <button style={{ borderColor: 10 }} className="MuiButtonBase-root MuiIconButton-root styles_button_root__3mGap styles_plus__ia9cs" tabIndex="0" type="button"> */}
                                                                    <span className="MuiIconButton-label"><svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
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
                        {/* <Phantrang1></Phantrang1> */}
                        <Pagination callBackSanPham={LayGiaTriPagination} TongSoSP={datasize} Sotrang={sotrang}></Pagination>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>


    );
}
export default KhuyenMai;
