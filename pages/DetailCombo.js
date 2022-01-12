import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
// import '../css/chitietCB.css'
import { API_URL } from '../src/constants/constants'
// import { useHistory, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import image_default from '../src/images/image-default.jpg'
import { useRouter } from 'next/router'


toast.configure()

const DetailCombo = (context) => {

    const router = useRouter()

    const [local, setLocal] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjAzNDUzNDUzNDUiLCJpYXQiOjE2NDE5MDY0NjcsImV4cCI6MTY0MjA3OTI2N30.7IsrZlYVysPlQjJMr58OijkwWlHrCRk955PPJWh8YLI')

    const handleImgError = e => {
        e.target.src = image_default;
    };

    const MaNVvalue = (value) => {
        setCustomerCode(value)
        setTimeout(() => {
            setCustomerCode(value)
            if (value != null && value != undefined && dataCombo != null && dataCombo != undefined) {
                getCartRedis(value, dataCombo)
            }
        }, 10);
    }

    //namdeptrai lay du lieu combo truyen vao
    const [dataCombo, setDataCombo] = useState()
    const [dataComboDetail, setDataComboDetail] = useState([])
    const [comboImage, setComboImage] = useState('')
    //lấy combo
    const Combo = async (dataCombo) => {
        const item = {
            ...dataCombo,
            SoLuong: 0
        }
        setDataCombo(item)
        setComboImage(item.ImageOne)
        // cart
        getCustomerCode(item)
        //
        await fetch(API_URL + '/comboDetailWithIdCombo/' + dataCombo.IdCombo)
            .then(res => res.json()).then(data => {
                setDataComboDetail(data)
            })
    }

    const LayCombo = async () => {
        // console.log(`${new Date().getTime()} router.query=`, router.query.item)
        await fetch(API_URL + '/comboById/' + router.query.item)
            .then(res => res.json()).then(dataCombo => { Combo(dataCombo[0]) })
    }

    //lấy combo detail
    useEffect(() => {
        LayCombo()
    }, [])

    const [customerCode, setCustomerCode] = useState()

    const getCustomerCode = async (item) => {
        if (local != null) {
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
                        setCustomerCode(data[0].MaNV)
                        setTimeout(() => {
                            setCustomerCode(data[0].MaNV)
                            getCartRedis(data[0].MaNV, item)
                        }, 10);
                    } else {
                        // history.push("/")
                    }
                })
        } else {
            // history.push("/")
        }
    }

    // const history = useHistory();

    const getCartRedis = async (customerCode01, tmpRes) => {
        console.log(`${new Date().getTime()} customerCode01=`, customerCode01)
        console.log(`${new Date().getTime()} tmpRes=`, tmpRes)
        const listCart = await fetch(`${API_URL}/gioHang/${customerCode01}`).then(res => res.json())
        const itemCart = listCart.gioHang
        let tmpCart = []
        itemCart.forEach(ee1 => {
            let tmpItem = {
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
            tmpCart.push(tmpItem)
        })
        setCart(tmpCart)
        syncCartToProducts(tmpCart, tmpRes)
        totalQuantityProductInCart(tmpCart)
    }

    const syncCartToProducts = async (tmpCart, tmpData) => {
        tmpCart.forEach(ee2 => {
            if (tmpData.IdCombo == ee2.MaHang) {
                tmpData.SoLuong = ee2.SoLuong
            }
        })
        setDataCombo(tmpData)
    }

    const up = (item) => {
        const max = 300
        if (item.SoLuong >= max) {
            alert(`Đã là cao nhất.`)
        } else {
            const newItem = {
                ...item,
                SoLuong: item.SoLuong + 1
            }
            setDataCombo(newItem)
            addProductInCart(newItem)
            const rand = Math.random(2) * 1000
            setRefreshCart(rand)
        }
    }

    const down = (item) => {
        if (item.SoLuong <= 0) {
            alert(`Đã là thấp nhất.`)
        } else {
            const newItem = {
                ...item,
                SoLuong: item.SoLuong - 1
            }
            setDataCombo(newItem)
            addProductInCart(newItem)
            const rand = Math.random(2) * 1000
            setRefreshCart(rand)
        }
    }

    const enterTheQuantity = (item, val) => {
        const max = 300
        if (val.length == 0) {
            val = 1
        }
        if (val >= max) {
            val = max
        }
        if (val <= 0) {
            val = 0
        }
        val = parseInt(val)
        const newItem = {
            ...item,
            SoLuong: val
        }
        setDataCombo(newItem)
        addProductInCart(newItem)
        const rand = Math.random(2) * 1000
        setRefreshCart(rand)
    }

    const addProductInCart = (ee1) => {
        if (cart != null || cart != undefined) {
            let tmpProduct = {
                TenHang: ee1.ComboName,
                MaHang: ee1.IdCombo,
                GiaBan: ee1.TotalPrice,
                QCDG: 0,
                SoLuong: ee1.SoLuong,
                TonKho: 1000,
                DaDat: 0,
                ConLai: 1000,
                HinhAnh: ee1.ImageOne,
                PhanTramKM: 0,
                DangKD: 0
            }
            let inCart = 0
            let newCart = cart
            for (let i = 0; i < newCart.length; i++) {
                if (newCart[i].MaHang === tmpProduct.MaHang) {
                    if (tmpProduct.SoLuong <= 0) {
                        newCart.splice(i, 1)
                    } else {
                        newCart[i].SoLuong = tmpProduct.SoLuong
                    }
                    inCart = 1
                }
            }
            if (inCart === 0) {
                newCart.push(tmpProduct)
            }
            setCart(newCart)
            saveCart(newCart)
            totalQuantityProductInCart(newCart)
        }
    }

    const [cart, setCart] = useState([])
    const [totalProductInCart, setTotalProductInCart] = useState(0)

    const saveCart = async (cartNew) => {
        if (cartNew.length <= 0) {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    gioHang: []
                })
            }
            await fetch(`${API_URL}/gioHang/${customerCode}`, requestOptions).then(res => res.json()).then(qwe => {
                // success
            })
        } else if (cartNew.length <= 200 && cartNew.length > 0) {
            const filterQuantity = cartNew.filter(item => item.SoLuong > 0)
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    gioHang: filterQuantity
                })
            }
            await fetch(`${API_URL}/gioHang/${customerCode}`, requestOptions).then(res => res.json()).then(qwe => {
                // success
            })
        } else {
            alert(`Mỗi đơn tối đa 200 sản phẩm.`)
        }
    }

    const totalQuantityProductInCart = (cart01) => {
        let total = 0
        cart01.forEach(ee1 => {
            total += ee1.SoLuong
        })
        setTotalProductInCart(total)
    }

    const [refreshCart, setRefreshCart] = useState(0)
    const [lanDau, setLanDau] = useState(true)
    const [strTotalPriceOrders, setStrTotalPriceOrders] = useState()

    const totalPriceOrders = (listGH) => {
        let tTien = 0
        listGH.forEach(e => {
            tTien += (e.SoLuong * (e.GiaBan - (e.GiaBan * e.PhanTramKM / 100)))
        });
        const vND = tTien.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
        setStrTotalPriceOrders(vND)
    }

    useEffect(() => {
        let totalQuantity = 0
        cart.forEach(e => {
            totalQuantity += e.SoLuong
        });
        setTotalProductInCart(totalQuantity)
        totalPriceOrders(cart)
        if (!lanDau) {
            saveCart(cart)
        }
        setLanDau(false)
    }, [refreshCart])

    ///hàm verifytoken
    // const verifytoken = () => {
    //     toast.error('Bạn vui lòng đăng nhập để vào được trang web!', {
    //         position: "top-right",
    //         autoClose: 5000,
    //         hideProgressBar: true,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //     });
    //     props.OPModalDN(true);
    // }

    const [openModalDN, setOpenModalDN] = useState(false);
    const [login_check_app, setLoginCheckApp] = useState();

    const OPModalDN = (value) => {
        setOpenModalDN(value)
    }

    const DangNhapApp = () => {
        setLoginCheckApp(!login_check_app)
    };

    //choose image

    const [productImage, setProductImage] = useState('')
    const [openimg2, setOpenImg2] = useState(false);

    const ProductImgMax = (text) => {
        setProductImage(text);
        setOpenImg2(true)
    }

    const ImgMax = (text) => {
        setComboImage(text);
        setOpenImg(true)
    }

    const ImgMax2 = (text) => {
        setComboImage(text);
    }



    const [Img, setImg] = useState();
    const [openimg, setOpenImg] = useState(false);
    const ClickImg = () => {
        setOpenImg(true);
    };

    const ClickClose = () => {
        setOpenImg(false);
        setOpenImg2(false)
    }
    // const ImgMax = (text) => {
    //     setImg(text);
    // }

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


    return (
        <div>
            <Header MaNVvalue={MaNVvalue} capNhatSLGH={totalProductInCart} capNhatTTGH={strTotalPriceOrders} OPModalDN={OPModalDN} callBackApp={DangNhapApp} valueOfModal={openModalDN}   ></Header>
            <div className='anhtenchitiet'>
                {dataCombo != undefined ?
                    <div className='CT_KhungChua'>
                        <div className='CT_Left'>
                            <div className='CT_Left_ImgMin'>
                                <button className='CT_Left_BtImg' onClick={() => { ImgMax2(dataCombo.ImageOne) }}>
                                    <img src={dataCombo.ImageOne} width='85%' height="85%" onError={handleImgError}></img>
                                </button>
                                {/* sau nay` la data.HinhAnh1 */}

                                <button className='CT_Left_BtImg' onClick={() => { ImgMax2(dataCombo.ImageTwo) }}>
                                    <img src={dataCombo.ImageTwo} width='85%' height="85%" onError={handleImgError}></img>
                                </button>

                                {/* sau nay` la data.HinhAnh2 */}

                                <button className='CT_Left_BtImg' onClick={() => { ImgMax2(dataCombo.ImageThree) }}>
                                    <img src={dataCombo.ImageThree} width='85%' height="85%" onError={handleImgError}></img>
                                </button>

                            </div>
                            <div className='CT_Left_ImgMax'>
                                <button onClick={ClickImg} className='CT_Left_BtImgMax'>
                                    <img src={comboImage} width='100%' height="100%" ></img>
                                </button>
                                <Dialog open={openimg} onClose={ClickClose}>
                                    <DialogContent>
                                        <img src={comboImage} width='100%' height="100%"></img>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                        <div className='CT_Right'>
                            <div className='CTR_up'>
                                <div className='CT_divtensp'>
                                    <h1 className='CT_h1'>{dataCombo.ComboName}</h1>
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

                                        {dataCombo.GiftBundle.length > 0 ?
                                            <small style={{ fontSize: '14.8px', color: '#dc3545', fontWeight: 'bold' }}>Tặng kèm {dataCombo.GiftBundle}</small>
                                            : null}
                                        <hr style={{ width: '100%' }}></hr>
                                        <div className='CT_khunggia'>
                                            <div className='CT_giasp'><h3>{dataCombo.TotalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</h3></div>
                                        </div>

                                        {
                                            localStorage.getItem("accesstoken") != null ?
                                                <div className="CT_soLuong MuiCardActions-root8 styles_product_action__1Zos7 MuiCardActions-spacing">
                                                    <button className="MuiButtonBase-root9 MuiIconButton-root styles_button_root__3mGap styles_button_root_minus__2gTtR styles_minus__ysCNs" tabIndex="0" type="button"
                                                        onClick={() => down(dataCombo)}
                                                    >
                                                        <span className="MuiIconButton-label">
                                                            <svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                                                <path d="M19 13H5v-2h14v2z"></path>
                                                            </svg>
                                                        </span>
                                                        <span className="MuiTouchRipple-root"></span>
                                                    </button>
                                                    <div className="MuiInputBase-root MuiInput-root styles_root_input__2PM1z">
                                                        <input type="number" className="MuiInputBase-input MuiInput-input styles_input__3lyzY"
                                                            value={dataCombo.SoLuong}
                                                            onChange={val => enterTheQuantity(dataCombo, val.target.value)}
                                                        />
                                                    </div>
                                                    <button style={{ borderColor: 10 }} className="MuiButtonBase-root MuiIconButton-root styles_button_root__3mGap styles_plus__ia9cs" tabIndex="0" type="button"
                                                        onClick={() => up(dataCombo)}
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
                                                <div className="CT_soLuong MuiCardActions-root8 styles_product_action__1Zos7 MuiCardActions-spacing">
                                                    <button className="MuiButtonBase-root9 MuiIconButton-root styles_button_root__3mGap styles_button_root_minus__2gTtR styles_minus__ysCNs" tabIndex="0" type="button"
                                                        onClick={() => verifytoken()}
                                                    >
                                                        <span className="MuiIconButton-label">
                                                            <svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                                                <path d="M19 13H5v-2h14v2z"></path>
                                                            </svg>
                                                        </span>
                                                        <span className="MuiTouchRipple-root"></span>
                                                    </button>
                                                    <div className="MuiInputBase-root MuiInput-root styles_root_input__2PM1z">
                                                        <input type="number" className="MuiInputBase-input MuiInput-input styles_input__3lyzY"
                                                            value={dataCombo.SoLuong}
                                                            onChange={val => verifytoken()}
                                                        />
                                                    </div>
                                                    <button style={{ borderColor: 10 }} className="MuiButtonBase-root MuiIconButton-root styles_button_root__3mGap styles_plus__ia9cs" tabIndex="0" type="button"
                                                        onClick={() => verifytoken()}
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
                                <div className='BangCTCB'>
                                    <div className='order_review'>
                                        <div className='hinhAnhSpCB'><h3>Hình sản phẩm</h3></div>
                                        <div className='tenSpCB'><h3>Tên sản phẩm</h3></div>
                                        <div className='dvtCB1'><h3>ĐVT</h3></div>
                                        <div className='hinhAnhSpCB'><h3>Giá sản phẩm</h3></div>
                                        <div className='slCB1'><h3>Số lượng</h3></div>
                                    </div>
                                    {/* map detail combo */}
                                    {/* <div className='order_review'>
                                    <div className='tenSpCB1'><h3>Combo 1- Sản Phẩm Chăm Sóc Sức Khỏe Và Sắc Đẹp</h3></div>
                                    <div className='dvtCB'><h3>Hộp</h3></div>
                                    <div className='slCB'><h3>300</h3></div>
                                </div> */}
                                    {
                                        dataComboDetail != undefined ?
                                            dataComboDetail.length > 0 ?
                                                dataComboDetail.map((item) => {
                                                    return (
                                                        <div className='order_review'>
                                                            <div className='hinhAnhSpCB1'>
                                                                <button onClick={() => { ProductImgMax(item.HinhAnh) }} className='CT_Left_BtImgMax_2'>
                                                                    <img src={item.HinhAnh} height='80px' onError={handleImgError}></img>
                                                                </button>
                                                                <Dialog open={openimg2} onClose={ClickClose}>
                                                                    <DialogContent>
                                                                        <img src={productImage} width='100%' height="100%"></img>
                                                                    </DialogContent>
                                                                </Dialog>
                                                            </div>
                                                            <div className='tenSpCB1'>
                                                                <h3> {item.TenHang} </h3>
                                                            </div>
                                                            <div className='dvtCB'><h3> {item.DVT} </h3></div>
                                                            <div className='hinhAnhSpCB1'><h3> {item.GiaBan.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} </h3></div>
                                                            <div className='slCB'><h3> {item.SoLuong} </h3></div>
                                                        </div>
                                                    )
                                                })
                                                :
                                                null
                                            :
                                            null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    : null}

            </div>
            <Footer></Footer>
        </div>
    )
}

export default DetailCombo;