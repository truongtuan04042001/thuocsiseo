import { useEffect, useState } from 'react';
import Image from 'next/image'
import Link from "next/link"
import Header from './Header';
import Footer from './Footer';
import { API_URL } from '../src/constants/constants'

import React from 'react'
import { useRouter } from 'next/router'

import Clock from '../src/components/Clock'
import gift from '../public/images/gift_newuser.gif'
import { Markup } from 'interweave';


import { toast, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from "react-image-gallery";

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
const notify_nhaptaysp2 = (tensp, soluong) => {
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

// let limit = 8
const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    pauseOnHover: true,
    autoplay: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 500,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
}

const MaGiamGia = (props) => {
    const [dataVoucher, setDataVoucher] = useState([]);
    const [dataGift, setDataGift] = useState([]);
    const [dataOrderValue, setDataOrderValue] = useState([]);
    const [tieuDe, setTieuDe] = useState();
    const [limit, setLimit] = useState(8);
 
    const [banner, setBanner] = useState([]);
    const router = useRouter()
    //namdeptrai
    const [dataCombo, setDataCombo] = useState([])
    // const listCombo = (data) => {
    //     setDataCombo(data)
    // }

    useEffect(async () => {
        
    
        ///hàm lấy banner
        fetch(API_URL + '/layBanner', {
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
            setBanner(datas)
          })
      }, []);

    useEffect(async () => {
        fetch(API_URL + '/comboOrderIdLimit/' + limit).then(res => res.json()).then(data => {
            // console.log(data.length)
            setDataCombo(data)
        })
    }, [limit])
    const getMoreData = () => {
        // console.log(limit)
        let count = limit;
        count += 4
        setLimit(count)
        console.log(limit)

    }


    //get more

    const [openModalDN, setOpenModalDN] = useState(false);
    const [login_check_app, setLoginCheckApp] = useState();

    const OPModalDN = (value) => {
        setOpenModalDN(value)
    }

    const DangNhapApp = () => {
        setLoginCheckApp(!login_check_app)
        fetch(API_URL + '/comboOrderIdLimit/' + limit).then(res => res.json()).then(data => {
            layMaNV(data)
        })
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
                if (data.length > 0) {
                    setDataOrderValue(data);
                }
            })
    }

    const LayTieuDe = async () => {
        await fetch(API_URL + "/layTieuDe", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data[0].title != null) {
                    setTieuDe(data[0].title)
                }
            })
    };


    const [maNV, setmaNV] = useState(null)

    const MaNVvalue = (value) => {
        setmaNV(value)
        setTimeout(() => {
            setmaNV(value)
            // getGioHangRedis(data, value)
        }, 10);
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
        props.OPModalDN(true);
    }

    // cart
    const down4 = (maHang) => {
        if (maNV != null && maNV != undefined) {
            const newList = dataCombo.map((item) => {
                if (item.IdCombo === maHang) {
                    let sLuong = item.SoLuong
                    if (sLuong >= 1) {
                        sLuong -= 1
                        const updatedItem = {
                            ...item,
                            SoLuong: sLuong,
                        };
                        notify_giamsp(item.ComboName);
                        themSPvaoGH2(updatedItem)
                        return updatedItem;
                    } else {
                        alert("Số lượng đã thấp nhất!")
                    }
                }
                return item;
            });
            setDataCombo(newList) // thằng này cập nhật số lượng hiện lên web
            const rand = Math.random(2) * 1000
            setLamMoiGH(rand)
        } else {
            alert(`Chưa đăng nhập.`)
        }
    }

    const nhapTaySoLuong4 = (maHang, val) => {
        if (val.length == 0) {
            val = 1
        }
        if (val <= 0) {
            val = 0
        }
        val = parseInt(val)
        if (maNV != null && maNV != undefined) {
            const newList = dataCombo.map((item) => {
                if (item.IdCombo === maHang) {
                    let sLuong = item.SoLuong
                    let max = 300
                    // if (item.ConLai < 300) {
                    //   max = item.ConLai
                    // }
                    if (sLuong <= max && val > 0 && val.length != 0) {
                        sLuong = val
                        if (val <= max) {
                            const updatedItem = {
                                ...item,
                                SoLuong: sLuong,
                            };
                            notify_nhaptaysp2(item.ComboName, val);
                            themSPvaoGH2(updatedItem)
                            return updatedItem;
                        } else {
                            const updatedItem = {
                                ...item,
                                SoLuong: max,
                            };
                            themSPvaoGH2(updatedItem)
                            return updatedItem;
                        }
                    } else {
                        const updatedItem = {
                            ...item,
                            SoLuong: 0,
                        };
                        themSPvaoGH2(updatedItem)
                        return updatedItem;
                    }
                }
                return item;
            });
            setDataCombo(newList) // thằng này cập nhật số lượng hiện lên web
            const rand = Math.random(2) * 1000
            setLamMoiGH(rand)
        } else {
            alert(`Chưa đăng nhập.`)
        }
    }

    const up4 = (maHang) => {
        if (maNV != null && maNV != undefined) {
            const newList = dataCombo.map((item) => {
                if (item.IdCombo === maHang) {
                    let sLuong = item.SoLuong
                    let max = 300
                    // if (item.ConLai < 300) {
                    //   max = item.ConLai
                    // }
                    if (sLuong < max) {
                        sLuong += 1
                        const updatedItem = {
                            ...item,
                            SoLuong: sLuong,
                        };
                        notify_themsp(item.ComboName);
                        themSPvaoGH2(updatedItem)
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
                        notify_themsp(item.ComboName);
                        themSPvaoGH2(updatedItem)
                        return updatedItem;
                    }
                }
                return item;
            });
            setDataCombo(newList) // thằng này cập nhật số lượng hiện lên web
            const rand = Math.random(2) * 1000
            setLamMoiGH(rand)
        } else {
            alert(`Chưa đăng nhập.`)
        }
    }

    const [lamMoiGH, setLamMoiGH] = useState(0)

    const themSPvaoGH2 = (ee1) => {
        let item = {
            TenHang: ee1.ComboName,
            MaHang: ee1.IdCombo,
            SoLuong: ee1.SoLuong,
            GiaBan: ee1.TotalPrice,
            QCDG: 0,
            HinhAnh: ee1.ImageOne,
            DangKD: 1,
            PhanTramKM: 0,
            TonKho: 1000,
            DaDat: 0,
            ConLai: 1000,
        }
        let dsGH = gioHang
        if (dsGH.length > 0) {
            let timKiem = 0
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
                gioHang: dsGH.filter(item => item.SoLuong > 0)
            }
            setGioHang(tmp.gioHang)
        } else {
            dsGH.push(item)
            const tmp = {
                gioHang: dsGH.filter(item => item.SoLuong > 0)
            }
            setGioHang(tmp.gioHang)
        }
    }

    const [gioHang, setGioHang] = useState([])
    const [lanDau, setLanDau] = useState(true)
    const [soLuongGioHang, setSoLuongGioHang] = useState(0)
    const [strTogTien, setStrTogTien] = useState()

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

    const tongTienDonHang = (listGH) => {
        var tTien = 0
        listGH.forEach(e => {
            tTien += (e.SoLuong * (e.GiaBan - (e.GiaBan * e.PhanTramKM / 100)))
            // tTien += e.SoLuong * e.GiaBan
        });
        var vND = tTien.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
        setStrTogTien(vND)
    }


    const layMaNV = async (abc) => {
        let items = []
        abc.forEach(ee1 => {
            const item = {
                ...ee1,
                SoLuong: 0
            }
            items.push(item)
        });
        setDataCombo(items)
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
                            if (e.IdCombo === f.MaHang) {
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
                setDataCombo(items)
                if (test == 1) {
                    alert("Có một số sản phẩm ĐÃ HẾT HÀNG nên số lượng bị giảm")
                    setGioHangRedis(abc)
                }
            })
    }

    useEffect(() => {
        let tongSoLuong = 0
        gioHang.forEach(e => {
            tongSoLuong += e.SoLuong
        });
        setSoLuongGioHang(tongSoLuong)
        tongTienDonHang(gioHang)
        if (!lanDau) {
            if (maNV != null && maNV != undefined) {
                setGioHangRedis(gioHang)
            }
        }
        setLanDau(false)
    }, [lamMoiGH])

    useEffect(async () => {
        LayTieuDe();
        QuaTangTheoGiaTien();
        // namdeptrai get combo list

        fetch(API_URL + '/comboOrderIdLimit/' + limit).then(res => res.json()).then(data => {
            layMaNV(data)
        })
    }, [])

    return (
        <div>
            
            <Header OPModalDN={OPModalDN} callBackApp={DangNhapApp} valueOfModal={openModalDN} MaNVvalue={MaNVvalue} capNhatSLGH={soLuongGioHang} capNhatTTGH={strTogTien} />
            <div className="slider_banner_trangchu" style={{ marginBottom: 20, width: "80%", margin: "auto" }}>
                                <ImageGallery
                                    items={banner}
                                    showBullets={false}
                                    showThumbnails={false}
                                    lazyLoad={true}
                                    showPlayButton={false}
                                    autoPlay={true}
                                    showFullscreenButton={false}
                                    slideDuration={300}
                                    slideInterval={5000}
                                />
                            </div>
            <div className='MGG_divcontent1'>
            
                <div className='MGG_Container'>
                    {/* {dataGift.length > 0 && dataOrderValue.length > 0 ?
                        <h4 className='MGG_h4'>Quà Tặng</h4>
                        : null
                    } */}
                    {/*  */}
                    {dataOrderValue.length > 0 ?
                        <div style={{ backgroundColor: 'white', padding: '0px 5px', marginTop: 10 }}>
                            <div className="MGG_title_markup" style={{ padding: '5px 5px' }}>
                                <Markup content={tieuDe} />
                            </div>
                            <div style={{ padding: '5px 0px', marginBottom: 10, borderBottom: '1px solid gray', fontSize: 14 }}></div>
                            
                            <div style={{ marginRight: 0 }}>
                                {/* <div style={{ marginBottom: -10 }} className="div_scroll_voucher" >
                                <button style={{ borderRadius: 0, borderBottom: 0 }} className="item_gift_ttdh item_gift_ttdh_mobile">
                                    <div className='item_gif_ttdh_mobile' style={{ width: '60%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <div style={{ width: '35%' }} className="item_gif_gift_ttdh">
                                            <div style={{ color: 'red', fontWeight: 'bold', fontSize: 12 }}>Giá trị đơn hàng</div>
                                        </div>
                                        <p style={{ width: '65%' }} className="item_name_gift_ttdh">Tên quà tặng</p>
                                    </div>

                                    <p style={{ width: '40%', marginLeft: 5, borderLeft: '1px solid gray' }} className="item_name_gift_ttdh item_name_gift_ttdh_mb">
                                    Thời hạn chương trình khuyến mãi kết thúc
                                    </p>
                                </button>
                            </div> */}
                                {dataOrderValue.length > 0 ?
                                    <div className="div_scroll_voucher_par">
                                        <div className="div_scroll_voucher" style={{ justifyContent: 'center', overflowY: 'auto', overflowX: 'hidden' }}>
                                            {dataOrderValue.map((item, index) => {
                                                let deadline = item.ThoiHan;
                                                var DieuKien = (item.DieuKien).toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
                                                if (item.LoaiKM == 'Tiền') {
                                                    var MoneyConvert = Intl.NumberFormat().format(item.TenQua)
                                                }
                                                // if (item.DieuKien < tongTienDH) {
                                                return (

                                                    item.Status == 1 ?
                                                        <button style={{ margin: '30px 15px 10px 15px' }} className="item_time_gift_ttdh item_gift_ttdh_mobile" >
                                                            {/* Điều kiện loại khuyến mãi (tiền hoặc quà) */}
                                                            {/* {item.LoaiKM == 'Tiền' ?
                                                            <p style={{ width: '80%', fontWeight: 'bold' }} className="item_name_gift_ttdh">Giảm <b style={{ color: 'red', fontWeight: 'bolder', textShadow: '0px 1px 1px gray' }}>{MoneyConvert}</b> cho đơn hàng <b style={{ color: 'yellow', fontWeight: 'bolder', fontSize: 18, textShadow: '0px 1px 1px black' }}>{DieuKien}</b></p>
                                                            :
                                                            <p style={{ width: '80%', fontWeight: 'bold' }} className="item_name_gift_ttdh">Tặng <b style={{ color: 'red', fontWeight: 'bolder', textShadow: '0px 1px 1px gray' }}>{(item.TenQua).toUpperCase()}</b> cho đơn hàng <b style={{ color: 'yellow', fontWeight: 'bolder', fontSize: 18, textShadow: '0px 1px 1px black' }}>{DieuKien}</b></p>
                                                        } */}
                                                            <img src={item.LinkVoucher} width='250' height="350"></img>


                                                            <p className="item_name_gift_ttdh item_clock_gift_ttdh  item_name_gift_ttdh_mb">
                                                                <p className="title_clock_ttdh">Thời hạn còn</p>
                                                                <Clock className="time_count_gift" deadline={deadline} />
                                                            </p>
                                                        </button>
                                                        : null
                                                );
                                                // }
                                            })}


                                        </div>
                                    </div>
                                    :
                                    <div style={{ margin: 'auto', width: 150 }}>* Danh sách trống *</div>
                                }
                            </div>
                        </div>
                        : null
                    }
                    {dataVoucher.length > 0 && dataGift.length > 0 ?
                        <div style={{ backgroundColor: 'white', padding: '0px 5px', marginTop: 10 }}>
                            <div style={{ padding: '10px 0px', marginBottom: 10, color: 'green', borderBottom: '1px solid gray' }}>DANH SÁCH QUÀ TẶNG DÀNH CHO NGƯỜI MỚI</div>
                            <div className="div_scroll_voucher" style={{ overflowY: 'auto', overflowX: 'hidden' }}>
                                {dataGift.map((x, i) => {
                                    return (
                                        <button className="item_gift_ttdh">
                                            <div className="item_gif_gift_ttdh">
                                                <img src={gift} width='50%' height="50%" />
                                            </div>
                                            <p className="item_name_gift_ttdh">{x.TenQuaTang}</p>
                                        </button>
                                    );
                                })}

                            </div>
                        </div>
                        :
                        null
                    }
                </div>

                {/* listcombo */}

                <div style={{ marginTop: 10, backgroundImage: 'linear-gradient(90deg,#00b46e,#17a2b8)', padding: '20px', color: '#fff', textAlign: 'center' }}>
                    <h1> Combo sản phẩm ưu đãi </h1>
                    <div className='combosp'>

                        {/* namdeptrai */}

                        {
                            dataCombo.length > 0 ?
                                dataCombo.map((x, i) => {
                                    const vND = x.TotalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                                    return (
                                        <div className="article" key={i}>

                                            <Link href={{
                                                pathname: `/DetailCombo/${x.IdCombo}`,
                                                query: { item: x.IdCombo },
                                            }} >
                                                <div>
                                                <div className='thumb'>
                                                    <img src={x.ImageOne} width='100%' height="100%"></img>
                                                </div>
                                                <div className="tencombosp">
                                                    <p className='overfl' style={{ fontSize: 14 }}>{x.ComboName}
                                                    </p>
                                                </div>
                                                {x.GiftBundle.length > 0 ?
                                                    <div style={{ color: 'red', textAlign: 'left', fontSize: 14, marginLeft: 7, fontWeight: 'bold' }}>
                                                        <p className='overfl' style={{ fontSize: 12 }}>Quà tặng kèm: {x.GiftBundle}</p>
                                                    </div>
                                                    : <div style={{ minHeight: '19px' }}></div>}
                                                <div className="Giacombo">{vND}</div>
                                                </div>
                                               
                                            </Link>
                                            <hr style={{ width: '90%' }}></hr>
                                            <div className="soluong_spcb">
                                                {
                                                    localStorage.getItem("accesstoken") != null ?
                                                        <div className="MuiCardActions-root1 styles_product_action__1Zos7 MuiCardActions-spacing">
                                                            <button className="MuiButtonBase-root9 MuiIconButton-root styles_button_root__3mGap styles_button_root_minus__2gTtR styles_minus__ysCNs" tabIndex="0" type="button"
                                                                onClick={() => down4(x.IdCombo)}
                                                            >
                                                                <span className="MuiIconButton-label">
                                                                    <svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                                                        <path d="M19 13H5v-2h14v2z"></path>
                                                                    </svg>
                                                                </span>
                                                                <span className="MuiTouchRipple-root"></span>
                                                            </button>
                                                            <div className="MuiInputBase-root MuiInput-root styles_root_input__2PM1z">
                                                                <input placeholder="0" type="text" className="MuiInputBase-input MuiInput-input styles_input__3lyzY"
                                                                    value={x.SoLuong}
                                                                    onChange={val => nhapTaySoLuong4(x.IdCombo, val.target.value)}
                                                                />
                                                            </div>
                                                            <button style={{ borderColor: 10 }} className="MuiButtonBase-root MuiIconButton-root styles_button_root__3mGap styles_plus__ia9cs" tabIndex="0" type="button"
                                                                onClick={() => up4(x.IdCombo)}
                                                            >
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
                                                            <button className="MuiButtonBase-root9 MuiIconButton-root styles_button_root__3mGap styles_button_root_minus__2gTtR styles_minus__ysCNs" tabIndex="0" type="button"
                                                                onClick={verifytoken}
                                                            >
                                                                <span className="MuiIconButton-label">
                                                                    <svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                                                        <path d="M19 13H5v-2h14v2z"></path>
                                                                    </svg>
                                                                </span>
                                                                <span className="MuiTouchRipple-root"></span>
                                                            </button>
                                                            <div className="MuiInputBase-root MuiInput-root styles_root_input__2PM1z">
                                                                <input placeholder="0" type="text" className="MuiInputBase-input MuiInput-input styles_input__3lyzY"
                                                                    onChange={verifytoken}
                                                                />
                                                            </div>
                                                            <button style={{ borderColor: 10 }} className="MuiButtonBase-root MuiIconButton-root styles_button_root__3mGap styles_plus__ia9cs" tabIndex="0" type="button"
                                                                onClick={verifytoken}
                                                            >
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
                                    );
                                })
                                : null
                        }

                    </div>
                    {dataCombo.length >= limit ?
                        <div className="parent_btn_tatca" style={{ margin: '20px' }}>
                         
                                <button onClick={() => getMoreData()} className="btn_tatca btn_khuyenmai_trangchu">
                                    Xem thêm
                                </button>
                            
                        </div>
                        : null}
                </div>

                {/* <video width="100%" height="500" controls loop autoPlay poster="">
                    <source src='https://www.youtube.com/watch?v=UJ7z3Hr0k-M&ab_channel=ProgrammingGeek' type="video/mp4" />
                </video> */}

                {/* <iframe width="100%" height="500" src="https://www.youtube.com/embed/kp006G3lCnA" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}

                {/* bài viết */}

                {/* <div className='articles' style={{ marginTop: 20 }}>
                    <div className='articles_container'>
                        <div className='articles_title'>Tin Tức</div>
                        <Slider {...settings}>
                            <div className='art'>
                                <div className='sub_art'>
                                    <img className='art_thumbnail' src={banner2}></img>
                                    <h2 className='art_title'>Title</h2>
                                    <p className='art_info'>Ngày đăng</p>
                                    <p className='art_info'> - </p>
                                    <p className='art_info'>Người đăng</p>
                                    <br></br>
                                    <div className='art_content'>
                                        <p className='catchu' style={{ textAlign: 'justify' }}>Non Suspendisse Eleifend Nibh Eget amet! Felis! Cras Ac magna! Condimentum Dictum Sit Fringilla Suspendisse sagittis. Elit Magna Accumsan Cursus Nibh Lacus Mollis mattis? Turpis Feugiat Lectus imperdiet; Sit Id Et imperdiet. Aliquet Quis Semper Urna Mauris dignissim; Aenean adipiscing? </p>

                                    </div>
                                    <Link><p className='art_detail' style={{ display: "inline" }}>Xem thêm</p></Link>
                                </div>
                            </div>
                            <div className='art'>
                                <div className='sub_art'>
                                    <img className='art_thumbnail' src={banner2}></img>
                                    <h2 className='art_title'>Title</h2>
                                    <p className='art_info'>Ngày đăng</p>
                                    <p className='art_info'> - </p>
                                    <p className='art_info'>Người đăng</p>
                                    <br></br>
                                    <div className='art_content'>
                                        <p className='catchu' style={{ textAlign: 'justify' }}>Non Suspendisse Eleifend Nibh Eget amet! Felis! Cras Ac magna! Condimentum Dictum Sit Fringilla Suspendisse sagittis. Elit Magna Accumsan Cursus Nibh Lacus Mollis mattis? Turpis Feugiat Lectus imperdiet; Sit Id Et imperdiet. Aliquet Quis Semper Urna Mauris dignissim; Aenean adipiscing? </p>

                                    </div>
                                    <Link><p className='art_detail' style={{ display: "inline" }}>Xem thêm</p></Link>
                                </div>
                            </div>
                            <div className='art'>
                                <div className='sub_art'>
                                    <img className='art_thumbnail' src={banner2}></img>
                                    <h2 className='art_title'>Title</h2>
                                    <p className='art_info'>Ngày đăng</p>
                                    <p className='art_info'> - </p>
                                    <p className='art_info'>Người đăng</p>
                                    <br></br>
                                    <div className='art_content'>
                                        <p className='catchu' style={{ textAlign: 'justify' }}>Non Suspendisse Eleifend Nibh Eget amet! Felis! Cras Ac magna! Condimentum Dictum Sit Fringilla Suspendisse sagittis. Elit Magna Accumsan Cursus Nibh Lacus Mollis mattis? Turpis Feugiat Lectus imperdiet; Sit Id Et imperdiet. Aliquet Quis Semper Urna Mauris dignissim; Aenean adipiscing? </p>

                                    </div>
                                    <Link to='/Article'><p className='art_detail' style={{ display: "inline" }}>Xem thêm</p></Link>
                                </div>
                            </div>

                        </Slider>
                    </div>
                </div> */}

                {/* dk đại lý */}

                {/* <div style={{ padding: '20px 60px', marginBottom: 20, marginTop: 20, backgroundColor: '#fff', boxShadow: 2 }}>
                    <h1 style={{ textAlign: 'center', color: '#009900' }}> Đăng ký đại lý </h1>
                    <div style={{ width: '100%' }}>
                        <div className="thongtindk ">
                            <div className="cangiua">
                                <button class="dkDL type1">
                                    Đăng kí
                                </button>

                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
            <Footer></Footer>
        </div>
    )
}
export default MaGiamGia;