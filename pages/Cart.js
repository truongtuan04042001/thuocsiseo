import React, { useState, useEffect } from 'react';
import image_default from '../public/images/image-default.jpg'
import { API_URL } from '../src/constants/constants'
import Header from './Header';
import Footer from './Footer';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { useRouter } from 'next/router'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyLoader from '../src/components/Loading'
import Link from "next/link"

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

const GioHang = () => {
    const [maNV, setmaNV] = useState(null)
    const [maDialog, setMaDialog] = useState();
    const [hinhDialog, setHinhDialog] = useState();
    const [tenDialog, setTenDialog] = useState();
    const [gioHangRoot, setGioHangRoot] = useState([])
    const [ghiChu, setGhiChu] = useState('')
    const [soLuongTrongGio, setSoLuongTrongGio] = useState(0)
    const [strTogTien, setStrTogTien] = useState()
    const [strTien1SanPhamXoa, setStrTien1SanPhamXoa] = useState()
    const tongTienDonHang = (listGH) => {
        var tTien = 0
        listGH.forEach(e => {
            tTien += (e.SoLuong * (e.GiaBan - (e.GiaBan * e.PhanTramKM / 100)))
        });
        var vND = tTien.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
        setStrTogTien(vND)
    }

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
            if (maNV != null || maNV != undefined) {
                await fetch(API_URL + "/gioHang/" + maNV, requestOptions)
                    .then(response => response.json())

            }
        } else {
            alert("Một đơn tối đa 200 sản phẩm")
        }
    }

    const MaNVvalue = (value) => {
        setmaNV(value)
        setTimeout(() => {
            setmaNV(value)
            getGioHangRedis(value)
        }, 10);
    }

    const [hieuUngDangTaiGioHang, setHieuUngDangTaiGioHang] = useState(true)
    const [dangTaiGioHang, setDangTaiGioHang] = useState(true)

    const hienGioHang = async (data) => {
        if (data != null) {
            // let theoSoLuongGioHang = 0
            // if (data.gioHang.length > 0 && data.gioHang.length <= 30) {
            //     theoSoLuongGioHang = 250
            // }
            // if (data.gioHang.length > 30 && data.gioHang.length <= 60) {
            //     theoSoLuongGioHang = 750
            // }
            // if (data.gioHang.length > 60 && data.gioHang.length <= 95) {
            //     theoSoLuongGioHang = 1188
            // }
            // if (data.gioHang.length > 95 && data.gioHang.length <= 130) {
            //     theoSoLuongGioHang = 1625
            // }
            // if (data.gioHang.length > 130 && data.gioHang.length <= 165) {
            //     theoSoLuongGioHang = 2063
            // }
            // if (data.gioHang.length > 165 && data.gioHang.length <= 200) {
            //     theoSoLuongGioHang = 2500
            // }
            //let test = 0
            let tongSoLuong = 0
            data.gioHang.forEach(e => {
                if (e.ConLai > 300 && e.SoLuong > 300) {
                    e.SoLuong = 300
                } else
                    if (e.SoLuong > e.ConLai) {
                        e.SoLuong = e.ConLai
                        // test = 1
                    }
                tongSoLuong += e.SoLuong
            });

            const locSoLuong0 = data.gioHang.filter(item => item.SoLuong > 0)

            // const combo01 = {
            //     MaHang: 'COMBO_01',
            //     TenHang: 'combo 01',
            //     SoLuong: 3,
            //     GiaBan: 1200000.00,
            //     QCDG: 0,
            //     HinhAnh: 'http://localhost:3001/imageCombo/COMBO_01_Hinh1.jpg',
            //     DangKD: 0,
            //     PhanTramKM: 0,
            //     TonKho: 1000,
            //     DaDat: 0,
            //     ConLai: 1000
            // }

            // const combo02 = {
            //     MaHang: 'COMBO_28',
            //     TenHang: 'combo 02',
            //     SoLuong: 2,
            //     GiaBan: 2400000.00,
            //     QCDG: 0,
            //     HinhAnh: 'http://localhost:3001/imageCombo/COMBO_28_Hinh1.jpg',
            //     DangKD: 0,
            //     PhanTramKM: 0,
            //     TonKho: 1000,
            //     DaDat: 0,
            //     ConLai: 1000
            // }

            // let filter01 = locSoLuong0 
            // filter01.push(combo01)
            // filter01.push(combo02)
            // setGioHangRedis(filter01)
            // tongTienDonHang(filter01)
            // setGioHangRoot(filter01)

            setGioHangRedis(locSoLuong0)
            tongTienDonHang(locSoLuong0)
            setGioHangRoot(locSoLuong0)

            setSoLuongTrongGio(tongSoLuong)
            setHieuUngDangTaiGioHang(false)
            setDangTaiGioHang(false)
        }
    }

    const getGioHangRedis = async (maNV01) => {
        await fetch(API_URL + "/gioHang/" + maNV01)
            .then(response => response.json())
            .then(data => {
                hienGioHang(data, 0)
            })
    }

    // const history = useHistory();
    const router = useRouter()

    const LayMaNV = async () => {
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
                        setmaNV(data[0].MaNV)
                        setTimeout(() => {
                            setmaNV(data[0].MaNV)
                            getGioHangRedis(data[0].MaNV)
                        }, 10);
                    } else {
                        router.push("/")
                    }
                })
        } else {
            router.push("/")
        }
    }

    useEffect(() => {
        LayMaNV()
    }, [])

    const [lamMoiGH, setLamMoiGH] = useState(0)
    const [lanDau, setLanDau] = useState(true)

    useEffect(() => {
        let tongSoLuong = 0
        gioHangRoot.forEach(e => {
            tongSoLuong += e.SoLuong
        });
        setSoLuongTrongGio(tongSoLuong)
        tongTienDonHang(gioHangRoot)
        if (!lanDau) {
            if (gioHangRoot.length >= 0) {
                setGioHangRedis(gioHangRoot)
            }
        }
        setLanDau(false)
    }, [lamMoiGH])

    const up = (maHang) => {
        const newList = gioHangRoot.map((item) => {
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
                    return updatedItem;
                }
            }
            return item;
        });
        setGioHangRoot(newList) // thằng này cập nhật số lượng hiện lên web
        const rand = Math.random(2) * 1000
        setLamMoiGH(rand)
    }

    const down = (maHang) => {
        const newList = gioHangRoot.map((item) => {
            if (item.MaHang === maHang) {
                var sLuong = item.SoLuong
                if (sLuong >= 2) {
                    sLuong -= 1
                    const updatedItem = {
                        ...item,
                        SoLuong: sLuong,
                    };
                    notify_giamsp(item.TenHang);
                    return updatedItem;
                } else {
                    alert("Số lượng đã thấp nhất!")
                }
            }
            return item;
        });
        setGioHangRoot(newList) // thằng này cập nhật số lượng hiện lên web
        const rand = Math.random(2) * 1000
        setLamMoiGH(rand)
    }

    const nhapTaySoLuong = (maHang, val) => {
        const newList = gioHangRoot.map((item) => {
            if (item.MaHang === maHang) {
                let sLuong = item.SoLuong
                let max = 300
                if (item.ConLai < 300) {
                    max = item.ConLai
                }
                if (sLuong <= max && val > 0 && val.length != 0) {
                    if (val <= max) {
                        sLuong = val
                        const updatedItem = {
                            ...item,
                            SoLuong: sLuong,
                        };
                        notify_nhaptaysp(item.TenHang, val);
                        return updatedItem;
                    } else {
                        sLuong = max
                        const updatedItem = {
                            ...item,
                            SoLuong: sLuong,
                        };
                        return updatedItem;
                    }
                } else {
                    sLuong = 1
                    const updatedItem = {
                        ...item,
                        SoLuong: sLuong,
                    };
                    return updatedItem;
                }
            }
            return item;
        });
        setGioHangRoot(newList) // thằng này cập nhật số lượng hiện lên web
        const rand = Math.random(2) * 1000
        setLamMoiGH(rand)
    }

    const del = (maHang) => {
        const newList = gioHangRoot.filter(item => item.MaHang !== maHang)
        setGioHangRoot(newList) // thằng này cập nhật số lượng hiện lên web
        const rand = Math.random(2) * 1000
        setLamMoiGH(rand)
    }

    const luuGhiChu = () => {
        localStorage.setItem("ghiChu", ghiChu)
    }

    const [openDialog, setOpenDialog] = useState(false)

    const ClickOpen = (text) => {
        setOpenDialog(true)
        setMaDialog(text.MaHang)
        setHinhDialog(text.HinhAnh)
        setTenDialog(text.TenHang)
        var tmp = text.GiaBan
        var vND = tmp.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
        setStrTien1SanPhamXoa(vND)
    }
    const ClickClose = () => {
        setOpenDialog(false);
    }
    const ClickXoa = (text) => {
        setOpenDialog(false);
        del(text);
    }
    const ClickKhongXoa = () => {
        setOpenDialog(false);
    }

    const testKey2 = (e) => {
        if (e.code == "Enter") {
            ClickXoa(maDialog)
        }
    }

    const handleImgError = e => {
        e.target.src = image_default;
    };



    return (
        <div>
            <Header MaNVvalue={MaNVvalue} capNhatSLGH={soLuongTrongGio} capNhatTTGH={strTogTien} ></Header>
            <div className='giohang'>

                {/* một số dòng thông báo, chú ý của giỏ hàng */}

                <div style={{ margin: 10 }}>
                    <h3 className='MuiTypography-root style_cart_title__3631z MuiTypography-h5'>Giỏ hàng của tôi</h3>
                    {
                        dangTaiGioHang ?
                            <p>Đang tải giỏ hàng, vui lòng đợi :)</p>
                            :
                            null
                    }
                </div>
                <div className='style_instruction_text__1j5pb'>
                </div>
                {
                    hieuUngDangTaiGioHang ?
                        <div>
                            <MyLoader /><br />
                            <MyLoader /><br />
                            <MyLoader /><br />
                            <MyLoader />

                        </div>
                        :
                        null
                }
                <div className='chiadoi'>
                    {
                        gioHangRoot.length != 0 ?
                            <div className='MuiGrid-root MuiGrid-item1 MuiGrid-grid-sm-81'>

                                {/* list từng item có trong giỏ hàng */}

                                {
                                    gioHangRoot.map((item, i) => {
                                        const vND = item.GiaBan.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                                        const vNDKM = (item.GiaBan - (item.GiaBan * item.PhanTramKM / 100)).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                                        let kM = false
                                        if (item.PhanTramKM != 0) {
                                            kM = true
                                        }
                                        return (
                                            <div key={i}>
                                                <div className='styles_button_container__pcQcI'>
                                                    <div className='styles_root_card__2xUda'>
                                                        <button className="MuiButtonBase-root12 MuiIconButton-root styles_important_item__4O_0G" type="button">
                                                            <span className="MuiIconButton-label">
                                                                <svg className="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z">
                                                                    </path>
                                                                </svg>
                                                            </span>
                                                            <span className="MuiTouchRipple-root"></span>
                                                        </button>
                                                        <div className='MuiPaper-root1 MuiCard-root styles_product_card__LJxda MuiPaper-rounded123'>
                                                            <div className='styles_product_image__3KbWD'>
                                                                {
                                                                    item.MaHang.indexOf('COMBO_') >= 0 ?
                                                                        <Link
                                                                            href={{
                                                                                pathname: `/DetailCombo`,
                                                                                query: { item: item.MaHang }
                                                                            }}
                                                                        >
                                                                            <div style={{ display: 'inline-block', maxWidth: "100%", overflow: 'hidden', position: 'relative', boxSizing: 'border-box', margin: 0 }}>
                                                                                <div style={{ display: 'inline-block', maxWidth: '100%', overflow: 'hidden', boxSizing: 'border-box' }}>
                                                                                    {
                                                                                        item.HinhAnh == null ?
                                                                                            <img src={image_default} width='100%' height='120'></img>
                                                                                            :
                                                                                            <img src={item.HinhAnh} onError={handleImgError} width='100%' height="120"></img>}
                                                                                </div>
                                                                            </div>
                                                                        </Link>
                                                                        :
                                                                        <Link
                                                                            href={{
                                                                                pathname: `/ChiTietSanPham`,
                                                                                query: { item: item.MaHang }
                                                                            }}
                                                                        >
                                                                            <div style={{ display: 'inline-block', maxWidth: "100%", overflow: 'hidden', position: 'relative', boxSizing: 'border-box', margin: 0 }}>
                                                                                <div style={{ display: 'inline-block', maxWidth: '100%', overflow: 'hidden', boxSizing: 'border-box' }}>
                                                                                    {
                                                                                        item.HinhAnh == null ? <img src={image_default} width='100%' height='120'></img>
                                                                                            :
                                                                                            <img src={item.HinhAnh} onError={handleImgError} width='100%' height="120"></img>
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </Link>
                                                                }

                                                            </div>
                                                        </div>
                                                        <div className='MuiCardContent-root1 styles_product_content__EhHRr styles_product_content__2subj2'>
                                                            <div className="styles_product_title_wrap__2vYiH4">
                                                                <div className="styles_product_title__3bXWL">
                                                                    {
                                                                        item.MaHang.indexOf('COMBO_') >= 0 ?
                                                                            <Link className="jss2 jss448" href={{
                                                                                pathname: `/DetailCombo`,
                                                                                query: { item: item.MaHang }
                                                                            }}>
                                                                                <h2 className="MuiTypography-root styles_product_name__3QmYl MuiTypography-h5 MuiTypography 									gutterBottom"> {item.TenHang} </h2>
                                                                            </Link>
                                                                            :
                                                                            <Link className="jss2 jss448" href={{
                                                                                pathname: `/ChiTietSanPham`,
                                                                                query: { item: item.MaHang }
                                                                            }}>
                                                                                <h2 className="MuiTypography-root styles_product_name__3QmYl MuiTypography-h5 MuiTypography 									gutterBottom"> {item.TenHang} </h2>
                                                                                {/* <h2 className="MuiTypography-root styles_product_name__3QmYl MuiTypography-h5 									MuiTypography-gutterBottom">lactacyd soft &amp; silky sanofi (c/150ml)</h2> */}
                                                                            </Link>
                                                                    }
                                                                    <div className="styles_product_tags__wgYZg styles_product_tags_column__38ZQW">
                                                                        <a className="jss2 jss449" href="/KhuyenMai">
                                                                            {
                                                                                item.PhanTramKM != 0 ?
                                                                                    <div className="styles_discount_flag__1uCd7">
                                                                                        <span>Khuyến mãi</span>
                                                                                    </div> :
                                                                                    null
                                                                            }
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                                <p className="MuiTypography-root styles_product_type__1tqQT styles_muted__2X-Mq MuiTypography-body2 								MuiTypography-colorTextSecondary"> {item.QCDG} </p>

                                                                {
                                                                    item.ConLai < 300 ?
                                                                        item.ConLai <= 0 ?
                                                                            <p className="MuiTypography-root" style={{ fontSize: 12, fontWeight: 'bold', color: '#dc3545' }}>Sản phẩm tạm hết hàng </p>
                                                                            :
                                                                            <p className="MuiTypography-root" style={{ fontSize: 12, fontWeight: 'bold', color: '#dc3545' }}>Đặt tối đa {item.ConLai} sản phẩm </p>
                                                                        :
                                                                        <p className="MuiTypography-root" style={{ fontSize: 12, fontWeight: 'bold', color: '#dc3545' }}>Đặt tối đa 300 sản phẩm </p>
                                                                }

                                                                {
                                                                    kM ?
                                                                        <div className="styles_price_wrapper__1h1801 styles_price_wrapper_column__IsTDU1">
                                                                            <div className='ten_sp19'>
                                                                                <div className='ten_sp1'>
                                                                                    <h3>{vNDKM}</h3>
                                                                                </div>
                                                                                <div className='ten_sp1 gia_goc'>
                                                                                    <h3>{vND} </h3>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        :
                                                                        <div className="styles_price_wrapper__1h1801 styles_price_wrapper_column__IsTDU1">
                                                                            <div className='ten_sp19'>
                                                                                <div className='ten_sp1'>
                                                                                    <h3>{vND}</h3>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="styles_price_wrapper__1h1801 styles_price_wrapper_column__IsTDU1">
                                                            {
                                                                kM ?
                                                                    <div className='ten_sp18'>
                                                                        <div className='ten_sp1'>
                                                                            <h3>{vNDKM}</h3>
                                                                        </div>
                                                                        <div className='ten_sp1 gia_goc'>
                                                                            <h3>{vND}</h3>
                                                                        </div>
                                                                    </div>
                                                                    :
                                                                    <div className='ten_sp18'>
                                                                        <div className='ten_sp1'>
                                                                            <h3>{vNDKM}</h3>
                                                                        </div>
                                                                    </div>
                                                            }
                                                        </div>
                                                        <div className='MuiCardActions-root styles_product_action__1Zos7 styles_product_action_column__gjQ3o MuiCardActions-spacing'>
                                                            <button onClick={() => down(item.MaHang)} className="MuiButtonBase-root MuiIconButton-root styles_button_root__3mGap styles_button_root_minus__2gTtR styles_minus__ysCNs" type="button">
                                                                <span className="MuiIconButton-label">
                                                                    <svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" >
                                                                        <path d="M19 13H5v-2h14v2z"></path>
                                                                    </svg>
                                                                </span>
                                                                <span className="MuiTouchRipple-root"></span>
                                                            </button>
                                                            <div className="MuiInputBase-root MuiInput-root styles_root_input__2PM1z styles_has_item__tqSHX">
                                                                <input value={item.SoLuong} onChange={value => { nhapTaySoLuong(item.MaHang, parseInt(value.target.value)) }} name="cart-MEDX.LAC-SAN-009" placeholder="0" type="text" className="MuiInputBase-input MuiInput-input styles_input__3lyzY" />
                                                            </div>
                                                            <button onClick={() => up(item.MaHang)} className="MuiButtonBase-root MuiIconButton-root styles_button_root__3mGap styles_plus__ia9cs" type="button">
                                                                <span className="MuiIconButton-label">
                                                                    <svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                                                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                                                                    </svg>
                                                                </span>
                                                                <span className="MuiTouchRipple-root"></span>
                                                            </button>
                                                            <button onClick={() => { ClickOpen(item) }} className="MuiButtonBase-root MuiIconButton-root styles_remove_icon__hXwXv" type="button">
                                                                <span className="MuiIconButton-label">
                                                                    <svg className="MuiSvgIcon-root styles_icon__et_xm" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                                                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
                                                                    </svg>
                                                                </span>
                                                                <span className="MuiTouchRipple-root"></span>
                                                            </button>

                                                            {/* dialog xác nhận xóa item trong giỏ */}

                                                            <Dialog
                                                                open={openDialog}
                                                                onClose={ClickClose}
                                                                onKeyPress={(e) => testKey2(e)}
                                                            >

                                                                <DialogTitle>
                                                                    <div style={{ textAlign: 'center' }}>
                                                                        <div className='GH_DialogTitle'>
                                                                            <p style={{ alignItems: 'center', fontSize: '3.75em', margin: '0' }}>!</p>
                                                                        </div>
                                                                        <p className='GH_XinXacNhan'>Xin xác nhận</p>
                                                                        {"Bạn có chắc muốn xoá sản phẩm này khỏi giỏ hàng?"}
                                                                    </div>
                                                                </DialogTitle>
                                                                <DialogContent>
                                                                    <div style={{ padding: '10px', display: 'flex', backgroundColor: '#fff', borderRadius: '10px' }}>
                                                                        <div className='GH_DialogKhungHinh'>
                                                                            <img width="100" height="100" src={hinhDialog}></img>
                                                                        </div>
                                                                        <div className='GH_DialogKhungTen'>
                                                                            <div style={{ color: '#343a40', textTransform: 'capitalize', fontWeight: '500', marginBottom: '10px' }}>
                                                                                {tenDialog}
                                                                            </div>
                                                                            <div style={{ color: '#00b46e', fontWeight: '500' }}>{strTien1SanPhamXoa}</div>
                                                                        </div>
                                                                    </div>
                                                                </DialogContent>
                                                                <DialogActions>
                                                                    <Button onClick={ClickKhongXoa} style={{ padding: '6px 16px', backgroundColor: 'rgb(255, 193, 7)', margin: '15px', borderRadius: '8px', color: 'rgb(0, 0, 0)' }}>Không</Button>
                                                                    <Button onClick={() => { ClickXoa(maDialog) }} style={{ padding: '6px 16px', backgroundColor: 'rgb(0, 171, 85)', margin: '15px', borderRadius: '8px', color: 'white' }} autoFocus>Có</Button>
                                                                </DialogActions>
                                                            </Dialog>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                                {/* dòng chú ý để thêm sp vô giỏ hàng thì vào đặt hàng nhanh */}

                                <div className="style_instruction_text__2gOt2">
                                    <svg className="MuiSvgIcon-root style_info_icon__3GcI5" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
                                    </svg>
                                    <p className="MuiTypography-root MuiTypography-body1">
                                        Để thêm sản phẩm vào giỏ hàng, vui lòng quay về trang
                                        <a href="/DatHangNhanh">
                                            <span className="style_quick_order__1wVn6">&nbsp;Đặt hàng nhanh
                                            </span>
                                        </a>
                                    </p>
                                </div>

                                {/* ghi chú của khách hàng */}

                                <div className="style_notes__38oY9">
                                    <div className="style_note_title__3R0sm">
                                        Ghi chú khác
                                    </div>
                                    <div className="style_note_content__1PAdq">
                                        Trường hợp không tìm được thuốc mong muốn, Quý khách vui lòng điền yêu cầu bên dưới. Chúng tôi sẽ liên hệ mua thuốc và báo giá sớm nhất có thể.
                                    </div>
                                    <textarea onChange={event => { setGhiChu(event.target.value) }} rows="1" name="note" className="styles_text_area__2cWNL"
                                        aria-label="Ghi chú của khách hàng" placeholder="Ghi chú của khách hàng" style={{ height: 110, overflow: 'hidden' }}></textarea>
                                </div>
                            </div>
                            :
                            dangTaiGioHang ?
                                null
                                :
                                <div style={{ margin: 'auto' }}>
                                    <p>Chưa có sản phẩm trong giỏ hàng</p>

                                    {/* Tiếp tục đặt hàng */}

                                    <div >
                                        <Link
                                            href={{
                                                pathname: `/SanPham`,
                                            }}
                                        >
                                            <div
                                                className="MuiGrid-root style_wrapper__1uBx84 MuiGrid-container MuiGrid-item1 MuiGrid-grid-xs-12 MuiGrid-containerww"
                                            >
                                                <b className="MuiTypography-root MuiTypography-body2"> Tiếp tục đặt hàng</b>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                    }

                    {/* giao diện tổng số lượng và tổng tiền, nút thanh toán */}

                    {
                        gioHangRoot.length != 0 ?
                            <div className="MuiGrid-root MuiGrid-item1 MuiGrid-grid-sm-4">
                                <div className="style_card_info__yA0ac">
                                    <div className="MuiGrid-root style_container__sxhuc MuiGrid-container">
                                        <div className="MuiGrid-root MuiGrid-container MuiGrid-item1">
                                            <div className="MuiGrid-root style_wrapper__1uBx84 style_text_center__2_QY6 style_quantity_border__2D3kk MuiGrid-item1 MuiGrid-grid-xs-6">
                                                <p className="MuiTypography-root style_text__33ksJ MuiTypography-body1">Số lượng</p>
                                                <p className="MuiTypography-root style_number__2jLSy style_quantity__vyWs8 MuiTypography-body1"> {soLuongTrongGio} </p>
                                            </div>
                                            <div className="MuiGrid-root style_wrapper__1uBx84 style_text_right__2-EUJ style_total_border__ttvob MuiGrid-item1 MuiGrid-grid-xs-6">
                                                <p className="MuiTypography-root style_text__33ksJ MuiTypography-body1">Tổng tiền</p>
                                                <p className="MuiTypography-root style_number__2jLSy style_price__cRJst1 MuiTypography-body1"> {strTogTien} </p>
                                            </div>
                                        </div>

                                        {/* nút tiếp tục thanh toán */}

                                        <div className="MuiGrid-root style_wrapper__1uBx84 MuiGrid-container MuiGrid-item1 MuiGrid-grid-xs-12 MuiGrid-item123">
                                            <p className="MuiTypography-root style_number__2jLSy style_price__cRJst1 MuiTypography-body1 ssss"> {strTogTien} </p>
                                            <Link

                                                href={{
                                                    pathname: `/OrderConfirmation`,
                                                }}
                                            >
                                                <div
                                                    className="MuiButtonBase-root MuiButton-root MuiButton-text Button__StyledButton-sc-1o9oc71-0 Button__ButtonDefault-sc-1o9oc71-2 eCiseD gzPnbw payment_button"
                                                >
                                                    <span className="MuiButton-label">Thanh toán</span>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Tiếp tục đặt hàng */}

                                    <div className="MuiGrid-root style_wrapper__1uBx84 MuiGrid-container MuiGrid-item1 MuiGrid-grid-xs-12 MuiGrid-containerww">
                                        <Link

                                            href={{
                                                pathname: `/SanPham`,
                                            }}
                                        >
                                            <div
                                                className="MuiButtonBase-root MuiButton-root MuiButton-text Button__StyledButton-sc-1o9oc71-0 Button__ButtonDefault-sc-1o9oc71-2 eCiseD gzPnbw payment_button"
                                            >
                                                <b className="MuiTypography-root MuiTypography-body2"> Tiếp tục đặt hàng</b>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            :
                            null
                    }

                </div>

                {/* footer  */}

                <Footer></Footer>
            </div >
        </div >

    );
};

export default GioHang;