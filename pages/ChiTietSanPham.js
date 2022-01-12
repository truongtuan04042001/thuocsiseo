import { useEffect, useState } from 'react';
import React from 'react';
import Header from './Header';
// import Footer from '../components/Footer';
import { API_URL } from '../src/constants/constants'
import image_default from '../public/images/image-default.jpg'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
// import { useHistory } from 'react-router-dom';
import { useRouter } from 'next/router'
import { Markup } from 'interweave';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import Helmet from 'react-helmet'
const customId = "custom-id-yes";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
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
    });
}
<ToastContainer limit={1} />
var motLan = 0
const ChiTietSanPham = (props) => {

    const router = useRouter()

    // const [soLuong, setSoLuong] = useState(0)
    // const [item, setItem] = useState()
    // const [Img, setImg] = useState();

    // code truong
    const [gioHang, setGioHang] = useState([])
    const [soLuongTrongGio, setSoLuongTrongGio] = useState(0)
    const [strTogTien, setStrTogTien] = useState()
    const [data, setData] = useState();//mang san pham
    // const history = useHistory();
    const [input, setInput] = useState([]);//mang gợi ý của search
    const [items, setItems] = useState([]);//mang san pham chi tiet

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
    const [openModalDN, setOpenModalDN] = useState(false);
    const [login_check_app, setLoginCheckApp] = useState();

    const OPModalDN = (value) => {
        setOpenModalDN(value)
    }

    const DangNhapApp = () => {
        setLoginCheckApp(!login_check_app)
    };

    const handleImgError = e => {
        e.target.src = image_default;
    };

    const tongTienDonHang = (listGH) => {
        var tTien = 0
        listGH.forEach(e => {
            tTien += (e.SoLuong * (e.GiaBan - (e.GiaBan * e.PhanTramKM / 100)))
        });
        var vND = tTien.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
        setStrTogTien(vND)
    }

    useEffect(async () => {
        // if (local !== null) {
        //     fetch(API_URL + '/verifytoken', {
        //         method: 'POST',
        //         headers: {
        //             Accept: 'application/json',
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             test: local
        //         })
        //     })
        //         .then((response) => response.json())
        //         .then(data => {
        //             if (data.rs === "token accepted") {
        //                 // console.log("token con han")
        //             } else {
        //                 // console.log("token het han")
        //                 localStorage.removeItem("accesstoken")
        //                 history.push("/")
        //             }
        //         })
        // } else {
        //     history.push("/")
        // }
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
                setInput(data)
            })

    }, []);

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

    const getGioHangRedis = async (items, customerCode) => {
        await fetch(API_URL + "/gioHang/" + customerCode)
            .then(response => response.json())
            .then(data => {
                const dsGH = data
                let abc = dsGH.gioHang
                let test = 0
                if (dsGH === null) {
                    const tmp = {
                        gioHang: []
                    }
                    setGioHangRedis(tmp.gioHang)
                }
                if (abc.length != 0) {
                    abc.forEach(f => {
                        if (items.MaHang === f.MaHang) {
                            items.SoLuong = f.SoLuong
                            f.DaDat = items.DaDat
                            f.ConLai = items.ConLai
                            if (f.SoLuong > items.ConLai) {
                                f.SoLuong = items.ConLai
                                items.SoLuong = items.ConLai
                                test = 1
                            }
                        }
                    });

                    //  let tongSoLuong = 0
                    // abc.forEach(e => {
                    //     tongSoLuong += e.SoLuong
                    // });
                    tongTienDonHang(abc)
                    setGioHang(abc)
                }
                setData(items)
                if (test == 1) {
                    alert("Có một số sản phẩm đã hết hàng nên số lượng bị giảm")
                    setGioHangRedis(abc)
                }
            })
    }
    const docGioHangHienSoLuong = (items, customerCode) => {
        getGioHangRedis(items, customerCode)
        //console.log(items)
        setImg(items.HinhAnh)
        setItems(items)
    }

    const getCustomerCode = async (item) => {
        setData(item)
        if (local !== null) {
            await fetch(API_URL + '/thongtintaikhoan', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    test: local
                })
            })
                .then((response) => response.json())
                .then(data => {
                    if (data !== "token not accepted") {
                        setmaNV(data[0].MaNV)
                        setTimeout(() => {
                            setmaNV(data[0].MaNV)
                            docGioHangHienSoLuong(item, data[0].MaNV)
                        }, 10);
                    } else {
                        history.push("/")
                    }
                })
        }
    }

    const [local, setLocal] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjAzNDUzNDUzNDUiLCJpYXQiOjE2NDE5MDY0NjcsImV4cCI6MTY0MjA3OTI2N30.7IsrZlYVysPlQjJMr58OijkwWlHrCRk955PPJWh8YLI')


    useEffect(async () => {
        console.log(`${new Date().getTime()} router.query.item=`, router.query.item)
        await fetch(API_URL + "/ChiTietSanPham/" + router.query.item)
            .then(res => res.json())
            .then(data => {
                getCustomerCode(data)
            })
    }, []);

    // ghép giỏ hàng
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

    const up = () => {
        if (data != undefined) {
            let item = data
            let max = 300
            if (data.ConLai < 300) {
                max = data.ConLai
            }
            let tmpsl = item.SoLuong
            if (tmpsl < max) {
                item.SoLuong = tmpsl + 1
                setData(item)
                themSPvaoGH(item)
                notify_themsp(item.TenHang);
            } else {
                alert("Số lượng đã cao nhất")
                if (max <= 0) {
                    max = 0
                }
                item.SoLuong = max
                setData(item)
                themSPvaoGH(item)
                notify_themsp(item.TenHang);
            }
            const rand = Math.random(2) * 1000
            setLamMoiGH(rand)
        }
    }

    const down = () => {
        if (data != undefined) {
            let item = data
            const tmpsl = item.SoLuong
            if (tmpsl >= 1) {
                item.SoLuong = tmpsl - 1
                setData(item)
                themSPvaoGH(item)
                notify_giamsp(item.TenHang);
            } else {
                alert("Số lượng đã thấp nhất")
            }
            var rand = Math.random(2) * 1000
            setLamMoiGH(rand)
        }
    }

    const nhapTaySoLuong = (value) => {
        if (data != undefined && data != null) {
            let tmp = data
            if (value >= 0 && value.length != 0) {
                let max = 300
                if (data.ConLai < 300) {
                    max = data.ConLai
                }
                if (value <= max) {
                    tmp.SoLuong = value
                    setData(tmp)
                    themSPvaoGH(tmp)
                    notify_nhaptaysp(tmp.TenHang);
                } else {
                    tmp.SoLuong = max
                    setData(tmp)
                    themSPvaoGH(tmp)
                }
            } else {
                tmp.SoLuong = 0
                setData(tmp)
                themSPvaoGH(tmp)
            }
            var rand = Math.random(2) * 1000
            setLamMoiGH(rand)
        } else {
            alert("err")
        }
    }

    const [Img, setImg] = useState();
    const [openimg, setOpenImg] = useState(false);
    const ClickImg = () => {
        setOpenImg(true);
    };
    const ClickClose = () => {
        setOpenImg(false);
    }
    const ImgMax = (text) => {
        setImg(text);
    }

    const [searchString, setSearchString] = useState("");
    const handleOnSearch = (string) => {
        setSearchString(string);

    }
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            //console.log(searchString)

            if (searchString === "") {
                localStorage.setItem("Searchfromtc", "");
            } else {
                localStorage.setItem("Searchfromtc", searchString);
            }
            setSearchString("");

            event.target.blur()
            history.push("/SanPham")
        }
    }
    const handleOnSelect = (item) => {
        localStorage.setItem("Searchfromtc", item.TenHang);
        setSearchString("");
        history.push("/SanPham")
    }

    const handleOnClear = () => {
        setSearchString("");
    };
    // const formatResult = (item) => {
    //     //return item;
    //     console.log(item)
    //     let mangItem = item.split("?")
    //     console.log(item)
    //     return (
    //         <div className="item_search_parent">
    //             <div className="item_search_image">
    //                 <img src={mangItem[0]} style={{ width: 50, height: 50 }} onError={handleImgError}></img>
    //             </div>
    //             <div className="item_search_name">{mangItem[1]} </div>
    //             <div className="item_search_price" style={{ border: 'none', color: 'red' }}> {parseInt(mangItem[2]).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} </div>
    //         </div>
    //     );
    // }

    const [maNV, setmaNV] = useState(null)

    const MaNVvalue = (value) => {
        setmaNV(value)
        setTimeout(() => {
            setmaNV(value)
            if (data != null && data != undefined) {
                getGioHangRedis(data, value)
            }
        }, 10);
    }

    return (
        <div>
            <Helmet>
                <title>{items.TenHang}</title>
                <meta name="description" content={items.MoTa} />
            </Helmet>
            <Header MaNVvalue={MaNVvalue} capNhatSLGH={soLuongTrongGio} capNhatTTGH={strTogTien} OPModalDN={OPModalDN} callBackApp={DangNhapApp} valueOfModal={openModalDN} />
            {
                data != null ?
                    <div className='CTSP_Khung'>
                        <div className='search_trangchu_mobile1'>

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
                                        zIndex: "9999"
                                    }}
                                />
                            </div>
                        </div>
                        <div className='CT_KhungChua'>
                            <div className='CT_Left'>
                                {
                                    // data == null ? <img src={image_default} width='100%' height="100%"></img> : <img src={data.HinhAnh} width='100%' height="100%"></img>
                                }
                                <div className='CT_Left_ImgMin'>
                                    <button className='CT_Left_BtImg' onClick={() => { ImgMax(data.HinhAnh) }}>
                                        {data.HinhAnh == null ? <img src={image_default} width='85%' height="85%"></img> : <img src={data.HinhAnh} width='85%' height="85%"></img>}
                                    </button>
                                    {/* sau nay` la data.HinhAnh1 */}
                                    {data.HinhAnh == null ? null :
                                        <button className='CT_Left_BtImg' onClick={() => { ImgMax(image_default) }}>
                                            <img src={image_default} width='85%' height="85%"></img>
                                        </button>
                                    }

                                    {/* sau nay` la data.HinhAnh2 */}
                                    {data.HinhAnh == null ? null :
                                        <button className='CT_Left_BtImg' onClick={() => { ImgMax(data.HinhAnh) }}>
                                            <img src={data.HinhAnh} width='85%' height="85%"></img>
                                        </button>
                                    }

                                </div>
                                <div className='CT_Left_ImgMax'>
                                    <button onClick={ClickImg} className='CT_Left_BtImgMax'>
                                        {
                                            data.HinhAnh == null ?
                                                <img src={image_default} width='100%' height="100%" ></img>
                                                :
                                                <img src={Img} width='100%' height="100%"></img>
                                        }
                                    </button>
                                    <Dialog open={openimg} onClose={ClickClose}>
                                        <DialogContent>
                                            <img src={Img} width='100%' height="100%"></img>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                            <div className='CT_Right'>
                                <div className='CTR_up'>
                                    <div className='CT_divtensp'>
                                        <h1 className='CT_h1'>{data.TenHang}</h1>
                                        <div className='CT_icon'>
                                            <div className='CT_bticon' >
                                                <svg className='CT_svg' viewBox='0 0 24 24'>
                                                    <path d='M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z'></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ paddingLeft: '15px' }}>
                                        <a className='CT_a'>
                                            <svg className='CT_svgthacmacsp' viewBox='0 0 24 24'>
                                                <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z'></path>
                                            </svg>
                                            <p className='CT_p'>Thắc mắc sản phẩm</p>
                                        </a>
                                    </div>
                                    <div style={{ paddingLeft: '15px', display: 'flex', paddingRight: '15px' }}>
                                        <div className="CT_mobile_title" style={{ minWidth: '60%', paddingRight: '15px' }}>
                                            <small style={{ fontSize: '12.8px', color: '#919aa3' }}>{data.QCDG}</small><br />
                                            {
                                                data.ConLai < 300 ?
                                                    data.ConLai <= 0 ?
                                                        <small style={{ fontSize: '14.8px', color: '#dc3545', fontWeight: 'bold' }}>Sản phẩm tạm hết hàng</small>
                                                        :
                                                        <small style={{ fontSize: '14.8px', color: '#dc3545', fontWeight: 'bold' }}>Đặt tối đa {data.ConLai} sản phẩm</small>
                                                    :
                                                    <small style={{ fontSize: '14.8px', color: '#dc3545', fontWeight: 'bold' }}>Đặt tối đa 300 sản phẩm</small>
                                            }
                                            <hr style={{ width: '100%' }}></hr>
                                            <div className='CT_khunggia'>
                                                <div className='CT_giasp'><h3>{data.GiaBan.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</h3></div>
                                            </div>
                                            {
                                                local != null ?
                                                    <div>
                                                        {
                                                            data.ConLai > 0 ?
                                                                <div className="CT_soLuong MuiCardActions-root8 styles_product_action__1Zos7 MuiCardActions-spacing">
                                                                    <button onClick={() => down()} className="MuiButtonBase-root9 MuiIconButton-root styles_button_root__3mGap styles_button_root_minus__2gTtR styles_minus__ysCNs" tabIndex="0" type="button">
                                                                        <span className="MuiIconButton-label">
                                                                            <svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                                                                <path d="M19 13H5v-2h14v2z"></path>
                                                                            </svg>
                                                                        </span>
                                                                        <span className="MuiTouchRipple-root"></span>
                                                                    </button>
                                                                    <div className="MuiInputBase-root MuiInput-root styles_root_input__2PM1z">
                                                                        <input value={data.SoLuong} onChange={value => {
                                                                            nhapTaySoLuong(parseInt(value.target.value))
                                                                        }} type="number" className="MuiInputBase-input MuiInput-input styles_input__3lyzY" />
                                                                    </div>
                                                                    <button onClick={() => up()} style={{ borderColor: 10 }} className="MuiButtonBase-root MuiIconButton-root styles_button_root__3mGap styles_plus__ia9cs" tabIndex="0" type="button">
                                                                        <span className="MuiIconButton-label">
                                                                            <svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                                                                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                                                                            </svg>
                                                                        </span>
                                                                        <span className="MuiTouchRipple-root"></span>
                                                                    </button>
                                                                </div>
                                                                :
                                                                <div className="CT_soLuong MuiCardActions-root8 styles_product_action__1Zos7 MuiCardActions-spacing">
                                                                    <button disabled style={{ display: "none" }} className="MuiButtonBase-root9 MuiIconButton-root styles_button_root__3mGap styles_button_root_minus__2gTtR styles_minus__ysCNs" tabIndex="0" type="button">
                                                                        <span className="MuiIconButton-label">
                                                                            <svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                                                                <path d="M19 13H5v-2h14v2z"></path>
                                                                            </svg>
                                                                        </span>
                                                                        <span className="MuiTouchRipple-root"></span>
                                                                    </button>
                                                                    <div className="MuiInputBase-root MuiInput-root styles_root_input__2PM1z">
                                                                        <input disabled type="number" className="MuiInputBase-input MuiInput-input styles_input__3lyzY" />
                                                                    </div>
                                                                    <button disabled style={{ borderColor: 10, display: "none" }} className="MuiButtonBase-root MuiIconButton-root styles_button_root__3mGap styles_plus__ia9cs" tabIndex="0" type="button">
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
                                                            data.ConLai > 0 ?
                                                                <div className="CT_soLuong MuiCardActions-root8 styles_product_action__1Zos7 MuiCardActions-spacing">
                                                                    <button onClick={verifytoken} className="MuiButtonBase-root9 MuiIconButton-root styles_button_root__3mGap styles_button_root_minus__2gTtR styles_minus__ysCNs" tabIndex="0" type="button">
                                                                        <span className="MuiIconButton-label">
                                                                            <svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                                                                <path d="M19 13H5v-2h14v2z"></path>
                                                                            </svg>
                                                                        </span>
                                                                        <span className="MuiTouchRipple-root"></span>
                                                                    </button>
                                                                    <div className="MuiInputBase-root MuiInput-root styles_root_input__2PM1z">
                                                                        <input value={data.SoLuong} onChange={verifytoken} type="number" className="MuiInputBase-input MuiInput-input styles_input__3lyzY" />
                                                                    </div>
                                                                    <button onClick={verifytoken} style={{ borderColor: 10 }} className="MuiButtonBase-root MuiIconButton-root styles_button_root__3mGap styles_plus__ia9cs" tabIndex="0" type="button">
                                                                        <span className="MuiIconButton-label">
                                                                            <svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                                                                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                                                                            </svg>
                                                                        </span>
                                                                        <span className="MuiTouchRipple-root"></span>
                                                                    </button>
                                                                </div>
                                                                :
                                                                <div className="CT_soLuong MuiCardActions-root8 styles_product_action__1Zos7 MuiCardActions-spacing">
                                                                    <button disabled style={{ display: "none" }} className="MuiButtonBase-root9 MuiIconButton-root styles_button_root__3mGap styles_button_root_minus__2gTtR styles_minus__ysCNs" tabIndex="0" type="button">
                                                                        <span className="MuiIconButton-label">
                                                                            <svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                                                                <path d="M19 13H5v-2h14v2z"></path>
                                                                            </svg>
                                                                        </span>
                                                                        <span className="MuiTouchRipple-root"></span>
                                                                    </button>
                                                                    <div className="MuiInputBase-root MuiInput-root styles_root_input__2PM1z">
                                                                        <input disabled type="number" className="MuiInputBase-input MuiInput-input styles_input__3lyzY" />
                                                                    </div>
                                                                    <button disabled style={{ borderColor: 10, display: "none" }} className="MuiButtonBase-root MuiIconButton-root styles_button_root__3mGap styles_plus__ia9cs" tabIndex="0" type="button">
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
                            </div>
                        </div>

                        <div className='CT_KhungChiTiet'>
                            <div className='CT_CTLeft'>
                                <div style={{ paddingBottom: '16px' }}>
                                    <div className='CT_label'>Hãng sản xuất</div>
                                    <div>
                                        <a className='CT_CTa'>{data.HangSX}</a>
                                    </div>
                                </div>
                                <div style={{ paddingBottom: '16px' }}>
                                    <div className='CT_label'>Nước sản xuất</div>
                                    <div>
                                        <a className='CT_CTa'>{data.NuocSX}</a>
                                    </div>
                                </div>
                                <div style={{ paddingBottom: '16px' }}>
                                    <div className='CT_label'>Nhóm thuốc</div>
                                    <div>
                                        <a className='CT_CTa'>{data.NhomHang}</a>
                                    </div>
                                </div>
                                <div style={{ paddingBottom: '16px' }}>
                                    <div className='CT_label'>Thành phần</div>
                                    <div className='CT_divtable'>
                                        <table className='CT_table'>
                                            <thead className='CT_thead'>
                                                <tr className='CT_tr'>
                                                    <th className='CT_th'>Tên</th>
                                                    <th className='CT_th'>Hàm lượng</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th className='CT_th'><a className='CT_th_a'>{data.HoatChat}</a></th>
                                                    <th className='CT_th'><a className='CT_th_a'>{data.HamLuong}</a></th>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>
                            <div className='CT_CTRight'>
                                <div className='CT_DanhMucNgang'>
                                    <div className='CT_DM_center'>
                                        <button className='CT_DM_CT_button'>
                                            <span className='CT_DM_CT_span'>Thông tin chung</span>
                                        </button>
                                        <span className='CT_DM_CT_spandiv'></span>
                                    </div>
                                </div>
                                <div className="chitiet_mota" style={{ padding: '10px' }}>
                                    <div>
                                        <Markup content={data.MoTa} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> :
                    <div style={{ textAlign: 'center', margin: 15 }}>
                        <span style={{ color: 'red' }}>Lỗi lấy chi tiết sản phẩm, có thể sản phẩm tạm không kinh doanh. </span>
                    </div>
            }
            {/* <Footer></Footer> */}
        </div >
    );
}
export default ChiTietSanPham;