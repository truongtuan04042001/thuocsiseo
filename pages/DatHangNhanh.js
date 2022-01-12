import React from 'react';
import { useEffect, useState } from 'react';
import Header from './Header';
import Image from 'next/image'
import Link from "next/link"

import { API_URL } from '../src/constants/constants'

import image_default from '../public/images/image-default.jpg'

import Pagination from '../src/components/Pagination';
import { useRouter } from 'next/router'

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyLoader from '../src/components/Loading'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import Footer from './Footer';



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

//var maNV = "null"
const DatHangNhanh = (props) => {
    const [sotrang, setSoTrang] = useState(1);
    const LayGiaTriPagination = (childData) => {
        setSoTrang(childData)
    }
    const [input, setInput] = useState([]);//mang gợi ý của search
    //const [value, setValue] = useState(null);//giá trị của search box
    // const [list, setList] = useState([]);
    const [data, setData] = useState([]);//mang san pham
    const [datasize, setDataSize] = useState([]);//mang san pham
    const [note_tieude, setNoteTieuDe] = useState("Tất Cả Sản Phẩm");
    const router = useRouter()
    // var offset = (sotrang - 1) * 30;
    const handleImgError = e => {
        e.target.src = image_default;
    };
    const [openModalDN, setOpenModalDN] = useState(false);
    const [login_check_app, setLoginCheckApp] = useState();
    const OPModalDN = (value) => {
        setOpenModalDN(value)
    }
    const DangNhapApp = () => {
        setLoginCheckApp(!login_check_app)
    };
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

    //code truong
    const [gioHang, setGioHang] = useState([])

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
            // .then(data => {
            //     // chiTietDonHang(data, gioHangRoot)
            // })
        } else {
            alert("Một đơn tối đa 200 sản phẩm")
        }
    }

    const [hieuUngTaiGioHang, setHieuUngTaiGioHang] = useState(true)

    const locMangDangKD = (ls) => {
        if (ls != null) {
            let tongSoLuong = 0
            ls.forEach(e => {
                // if (e.SoLuong > e.ConLai) {
                //     e.SoLuong = e.ConLai
                //     test = 1
                // }
                tongSoLuong += e.SoLuong
            });
            setSoLuongTrongGio(tongSoLuong)
            tongTienDonHang(ls)
            setGioHang(ls)
            setGioHangRedis(ls)
            setHieuUngTaiGioHang(false)
        }
    }

    const getGioHangRedis = async (items, maNV01) => {
        await fetch(API_URL + "/gioHang/" + maNV01).then(res => res.json())
            .then(data => {
                if (data === null) {
                    const tmp = {
                        gioHang: []
                    }
                    setGioHangRedis(tmp.gioHang)
                } else {
                    let abc = data.gioHang
                    let test1 = 0
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
                                        test1 = 1
                                    }
                                }
                            });
                        });

                    }
                    let locSoLuong0 = abc.filter(item => item.SoLuong > 0)
                    locMangDangKD(locSoLuong0)
                    if (test1 == 1) {
                        alert("Có một số sản phẩm ĐÃ HẾT HÀNG nên số lượng bị giảm")
                    }
                }
            })
    }


    const layMaNV = async (items) => {
        setData(items)
        localStorage.setItem("ghiChu", "")
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
       
    }
    ///hàm verifytoken
    useEffect(async () => {
        if (sotrang != null && sotrang > 0) {

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
                    layMaNV(datas.mang)
                    setDataSize(Object.values(datas.tong[0]))
                })

        }
    }, [note_tieude])

    useEffect(async () => {
        if (sotrang != null && sotrang > 0) {

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
                    layMaNV(datas.mang)
                    setDataSize(Object.values(datas.tong[0]))
                })

        }
    }, [sotrang])


    //code trường
    const [soLuongTrongGio, setSoLuongTrongGio] = useState(0)
    const [strTogTien, setStrTogTien] = useState()
    const tongTienDonHang = (listGH) => {
        var tTien = 0
        listGH.forEach(e => {
            tTien += (e.SoLuong * (e.GiaBan - (e.GiaBan * e.PhanTramKM / 100)))
            // tTien += e.SoLuong * e.GiaBan
        });
        // setTongTienDH(tTien)
        var vND = tTien.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
        setStrTogTien(vND)
    }
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
        setSoLuongTrongGio(tongSoLuong)
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
                if (sLuong < max && val > 0 && val.length != 0) {
                    if (val <= max) {
                        sLuong = val
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
                        layMaNV(datas.mang,)
                        setDataSize(Object.values(datas.tong[0]))
                        //setValue(null)
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
                        layMaNV(datas.mang)
                        setDataSize(Object.values(datas.tong[0]))
                        setNoteTieuDe(string)
                        setSoTrang(1)
                    })
            }
        }
        setSearchString(string);
    }
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            //console.log(searchString)
            //setValue(searchString)
            if (searchString === "") {
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
                        layMaNV(datas.mang)
                        setDataSize(Object.values(datas.tong[0]))
                        //setValue(null)
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
                        sercmdarr: searchString,
                    })
                })
                    .then((response) => response.json())
                    .then(datas => {
                        layMaNV(datas.mang)
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
        //var mangItem=item.split("*")
        // the item selected
        // console.log(item.TenHang)
        //setValue(item.TenHang)
        sessionStorage.removeItem("Searchfromtc")
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
                layMaNV(datas.mang)
                setDataSize(Object.values(datas.tong[0]))
                setNoteTieuDe(item.TenHang)
                setSoTrang(1)
            })
        setSearchString("");
    }

    const handleOnClear = () => {
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
                layMaNV(datas.mang)
                setDataSize(Object.values(datas.tong[0]))
                // setValue(null)
                setNoteTieuDe("Tất Cả Sản Phẩm")
                setSoTrang(1)
            })
        setSearchString("");
    };
    // const formatResult = (item) => {
    //     //return item;
    //     // console.log(item)
    //     let mangItem = item.split("*")
    //     //console.log(item)
    //     return (
    //         <div className="item_search_parent">
    //             <div className="item_search_image">
    //                 <img src={mangItem[0]} style={{ width: 50, height: 50 }} onError={handleImgError}></img>
    //             </div>
    //             <div className="item_search_name">{mangItem[1]} </div>
    //             <div className="item_search_price" style={{ color: 'red' }}> {parseInt(mangItem[2]).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} </div>
    //         </div>
    //     );
    // }

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

            <Header MaNVvalue={MaNVvalue} capNhatSLGH={soLuongTrongGio} capNhatTTGH={strTogTien} OPModalDN={OPModalDN} callBackApp={DangNhapApp} valueOfModal={openModalDN} />
            {
                hieuUngTaiGioHang ?
                    <div className='giohang'>
                        <p style={{ textAlign: 'center' }}>Đang tải sản phẩm , vui lòng đợi một lúc</p>
                        <MyLoader /><br />
                        <MyLoader /><br />
                        <MyLoader /><br />
                        <MyLoader />
                    </div>
                    :
                    <div className='giohang'>
                        <div className='phantrang'>
                            {/* <Phantrang1></Phantrang1> */}
                            <Pagination callBackSanPham={LayGiaTriPagination} TongSoSP={datasize} Sotrang={sotrang}></Pagination>
                        </div>
                        <div className='chiadoi1'>
                            <div className='MuiGrid-root style_quick_order_wrapper__Q49yM MuiGrid-item MuiGrid-grid-sm-8'>
                                <div className='search-product-parent1' >
                                    {/* <img height="22" width="22" src={search_img} className="img_search1"></img> */}

                                    <div onKeyPress={handleKeyPress} >

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

                                            <div key={i} className='styles_button_container__XXQXT'>
                                                <div className='styles_root_card__1L12l'>
                                                    <div className='MuiPaper-root MuiCard-root styles_product_card__2dzJF styles_isdeal__qgZaj MuiPaper-elevation1 MuiPaper-rounded1'>

                                                        <div className="styles_product_image__1xSGk">
                                                            <button className="MuiButtonBase-root123 MuiCardActionArea-root" type="button">
                                                                {
                                                                    x.MaHang.indexOf('COMBO_') >= 0 ?
                                                                        <div className='jss2 jss216'>
                                                                            <div style={{ display: 'inline-block', maxWidth: "100%", overflow: 'hidden', position: 'relative', boxSizing: 'border-box', margin: 0 }}>
                                                                                <div className='tulam'>
                                                                                    <Link
                                                                                        href={{
                                                                                            pathname: `/DetailCombo`,
                                                                                            query: { item: x.IdCombo },

                                                                                        }}
                                                                                    >
                                                                                        {x.ImageOne == null ? <img src={image_default} width='100%' height="100%"></img> : <img src={x.ImageOne} onError={handleImgError} width='95%' height="100%"></img>}
                                                                                    </Link>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        :
                                                                        <div className='jss2 jss216'>
                                                                            <div style={{ display: 'inline-block', maxWidth: "100%", overflow: 'hidden', position: 'relative', boxSizing: 'border-box', margin: 0 }}>
                                                                                <div className='tulam'>
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
                                                                            </div>
                                                                        </div>
                                                                }
                                                            </button>
                                                        </div>

                                                        <div className='MuiCardContent-root undefined
      styles_product_content__2subj styles_product_content_column__Dwv2P'>
                                                            <div className='styles_product_title_wrap__2vYiH styles_product_title_column_wrap__1y0Ja'>
                                                                <div className='styles_product_title__3bXWL'>
                                                                    {
                                                                        x.MaHang.indexOf('COMBO_') >= 0 ?
                                                                            <Link
                                                                                href={{
                                                                                    pathname: `/DetailCombo`,
                                                                                    query: { item: x.IdCombo },

                                                                                }}
                                                                            >
                                                                                <h2 className="MuiTypography-root styles_product_name__3QmYl MuiTypography-h5 MuiTypography-gutterBottom">
                                                                                    {x.TenHang}
                                                                                </h2>
                                                                            </Link>

                                                                            :
                                                                            <Link
                                                                                href={{
                                                                                    pathname: `/ChiTietSanPham`,
                                                                                    query: { item: x.MaHang },

                                                                                }}
                                                                            >

                                                                                <h2 className="MuiTypography-root styles_product_name__3QmYl MuiTypography-h5 MuiTypography-gutterBottom">
                                                                                    {x.TenHang}
                                                                                </h2>

                                                                            </Link>

                                                                    }


                                                                    <div className='an-hien' style={{ display: 'flex', flexWrap: 'wrap' }}>

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
                                                                            x.SPmoi == 1 ?
                                                                              
                                                                                    <div className='MuiBox-root jss493 tag_tagContainer__1akLh12'>
                                                                                        <img src="https://img.icons8.com/fluent-systems-filled/2x/4a90e2/electricity.png" alt="Girl in a jacket" width="20" height="20" />
                                                                                        <p className='MuiTypography-root MuiTypography-body123'>Sản phẩm mới</p>
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
                                                                            x.BV == 1 ?
                                                                             
                                                                                    <div className='MuiBox-root jss493 tag_tagContainer__1akLh5'>

                                                                                        <p className='MuiTypography-root MuiTypography-body5'>Bệnh Viện/Phòng Khám</p>
                                                                                    </div>
                                                                       
                                                                                : null
                                                                        }

                                                                    </div>


                                                                </div>
                                                                <p className="MuiTypography-root1 styles_product_type__1tqQT styles_muted__2X-Mq styles_align_center__2QUXd MuiTypography-body2 MuiTypography-colorTextSecondary">{x.QCDG}</p>
                                                                {
                                                                    x.ConLai < 300 ?
                                                                        x.ConLai <= 0 ?
                                                                            <p className="MuiTypography-root1" style={{ fontSize: 12, fontWeight: 'bold', color: '#dc3545' }}>Sản phẩm tạm hết hàng </p>
                                                                            :
                                                                            <p className="MuiTypography-root1" style={{ fontSize: 12, fontWeight: 'bold', color: '#dc3545' }}>Đặt tối đa {x.ConLai} sản phẩm </p>
                                                                        :
                                                                        <p className="MuiTypography-root1" style={{ fontSize: 12, fontWeight: 'bold', color: '#dc3545' }}>Đặt tối đa 300 sản phẩm </p>
                                                                }
                                                                <p className="tien-rps">{vND}</p>
                                                            </div>
                                                        </div>
                                                        <div className="styles_price_wrapper__1h180 styles_price_wrapper_column__IsTDU3">
                                                            <p className="MuiTypography-root styles_deal_price__C0JjD1 MuiTypography-body1">{vND}</p>
                                                        </div>
                                                        {localStorage.getItem("accesstoken") != null ?
                                                            <div>
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
                                                            :
                                                            <div>
                                                                {
                                                                    x.ConLai > 0 ?
                                                                        <div className='MuiCardActions-root styles_product_action__1Zos7 styles_product_action_column__gjQ3o1 MuiCardActions-spacing'>
                                                                            <button onClick={verifytoken} className="MuiButtonBase-root MuiIconButton-root styles_button_root__3mGap styles_button_root_minus__2gTtR styles_minus__ysCNs" type="button">
                                                                                <span className="MuiIconButton-label">
                                                                                    <svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" >
                                                                                        <path d="M19 13H5v-2h14v2z"></path>
                                                                                    </svg>
                                                                                </span>
                                                                                <span className="MuiTouchRipple-root"></span>
                                                                            </button>
                                                                            <div className="MuiInputBase-root MuiInput-root styles_root_input__2PM1z styles_has_item__tqSHX">
                                                                                <input value={x.SoLuong} onChange={verifytoken} name="cart-MEDX.LAC-SAN-009" placeholder="0" width='100%' type="DEAL" className="MuiInputBase-input MuiInput-input styles_input__3lyzY" />
                                                                            </div>
                                                                            <button onClick={verifytoken} className="MuiButtonBase-root MuiIconButton-root styles_button_root__3mGap styles_plus__ia9cs" type="button">
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
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                            {window.location.pathname == "/DatHangNhanh" && window.innerWidth < 800
                                ? null :
                                <div className="MuiGrid-root style_mini_cart_rightside_wrapper__3qGvO MuiGrid-item MuiGrid-grid-sm-4">
                                    <div className="style_card_info__20CB7">
                                        <div className="MuiGrid-root style_container__sxhuc MuiGrid-container">
                                            <div className="MuiGrid-root MuiGrid-container MuiGrid-item MuiGrid-itemss">
                                                <div className="MuiGrid-root style_wrapper__1uBx8 style_text_center__2_QY6 style_quantity_border__2D3kk MuiGrid-item MuiGrid-grid-xs-667">
                                                    <p className="MuiTypography-root style_text__33ksJ MuiTypography-body1">Số lượng</p>
                                                    <p className="MuiTypography-root style_number__2jLSy style_quantity__vyWs8 MuiTypography-body1 sadsa">{soLuongTrongGio}</p>
                                                </div>
                                                <div className="MuiGrid-root style_wrapper__1uBx8 style_text_right__2-EUJ style_total_border__ttvob MuiGrid-item MuiGrid-grid-xs-667">
                                                    <p className="MuiTypography-root style_text__33ksJ MuiTypography-body1">Tổng tiền</p>
                                                    <p className="MuiTypography-root style_number__2jLSy style_price__cRJst MuiTypography-body1">{strTogTien}</p>
                                                </div>
                                            </div>
                                            <div className="MuiGrid-root style_wrapper__1uBx8 MuiGrid-container MuiGrid-item MuiGrid-grid-xs-12">
                                                <b className='tong-tienn'>{strTogTien}</b>
                                                <a title="Qua lại trang giỏ hàng" className="jss2 jss352 style_btn__1UQUf" href="/GioHang" style={{ color: "#fff" }}>Xem giỏ hàng ({soLuongTrongGio})</a>
                                            </div>
                                        </div>
                                        <div className="MuiGrid-root style_wrapper__1uBx84 MuiGrid-container MuiGrid-item1 MuiGrid-grid-xs-12 MuiGrid-containerww">
                                            {/* <Link to='/OrderConfirmation' className='mauchu'><b className="MuiTypography-root MuiTypography-body2"> Thanh toán</b></Link> */}
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className='phantrang'>
                            {/* <Phantrang1></Phantrang1> */}
                            <Pagination callBackSanPham={LayGiaTriPagination} TongSoSP={datasize} Sotrang={sotrang}></Pagination>
                        </div>
                    </div>
            }
            <Footer></Footer>
        </div>
    );
};

export default DatHangNhanh;