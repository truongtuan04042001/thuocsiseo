import logothuocsi from '../images/Logo.png';
import logoback from '../images/logoback.png';
import print from '../images/print.png';
import { useEffect, useState } from 'react';
import React from 'react'
import { Link } from 'react-router-dom';
// import '../css/Header.css';
import { API_URL } from '../constants/constants'

const InHoaDon = (props) => {
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const [TenNVBH, setTenNVBH] = useState('');
    const [chiTietDonHang, setChiTietDonHang] = useState([]);
    const [DonHang, setDonHang] = useState([]);
    const [tongTien, setTongTien] = useState('')
    const [loyaltyPoints, setLoyaltyPoints] = useState(0)
    const [tienMaGiamGia, setTienMaGiamGia] = useState(0)
    const [tienDoiDiem, setTienDoiDiem] = useState(0)

    const [maDatHang, setMaDatHang] = useState('')
    const [quaTang, setQuaTang] = useState('')

    useEffect(async () => {
        // const rand = Math.random(2) * 1000
        // const strRand = "DH000000" + rand
        // setMaDatHang(strRand)
        // setTenNVBH(strRand)
        // setTimeout(() => {
        setMaDatHang(props.location.state.MaDatHang)
        setTenNVBH(props.location.state.tenNV)
        // }, 400);
    }, []);

    const [loading, setLoading] = useState(true)

    useEffect(async () => {
        setTimeout(async () => {
            await fetch(API_URL + '/chiTietDonHang/' + props.location.state.MaDatHang, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            })
                .then((response) => response.json())
                .then(data => {
                    splitComboAndProduct(data)
                })
        }, 800);
    }, []);
    // }, [maDatHang]);

    useEffect(async () => {
        setTimeout(async () => {
            await fetch(API_URL + '/donHang/' + props.location.state.MaDatHang, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            })
                .then((response) => response.json())
                .then(data => {
                    setDonHang(data)
                    setLoyaltyPoints(data.DoiDiem)
                    setTienMaGiamGia(parseInt(data.TienMaGiamGia))
                    setTienDoiDiem(parseInt(data.TienDoiDiem))
                    setQuaTang(data.QuaTang)
                })
        }, 800);
    }, []);
    // }, [maDatHang]);

    // func split combo and product

    const [arrCombo, setArrCombo] = useState([])
    const [arrComboDetail, setArrComboDetail] = useState([])

    const splitComboAndProduct = (all) => {
        const arrCombo = all.filter(o => o.MaHang.indexOf('COMBO_') >= 0)
        getDetailCombo(arrCombo)
        setChiTietDonHang(all)
        let tongTien = 0
        all.forEach(ee1 => {
            tongTien += (ee1.SoLuong * (ee1.DonGia - (ee1.DonGia * ee1.ChietKhau / 100)))
        });
        setTongTien(parseInt(tongTien))
    }

    const getDetailCombo = async (array) => {
        setArrCombo(array)
        const arrIdCombo = array.map(o => o.MaHang)
        const arrProduct = await fetch(`${API_URL}/getProductsInListIdCombo`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: arrIdCombo
            })
        }).then(res => res.json())
        // console.log(`${new Date().getTime()} arrProduct=`, arrProduct)
        if (arrProduct.length > 0) {
            setArrComboDetail(arrProduct)
        }


        setLoading(false)
    }

    const formatNumber = (num) => {
        // num = parseInt(num)
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    return (
        <div>
            {
                loading ?
                    <div>
                        <h1 style={{ textAlign: 'center' }} >Thuocsionline.vn</h1>
                        <img style={{ margin: '0 auto', width: '100%', height: '750px' }} src='../images/Logo.png' />
                    </div>
                    :
                    <div>
                        <button
                            className="no-print"//Header.css
                            style={{ position: 'absolute', top: 10, left: '50%' }}
                            onClick={() => {
                                if (TenNVBH != "" && TenNVBH != "null" && TenNVBH != undefined) {
                                    window.print()
                                }
                                else {
                                    alert("Tên nhân viên bán hàng trống !")
                                }
                            }}>
                            <img width='22' height='22' src={print}></img>
                            <div>In hóa đơn</div>
                        </button>
                        <Link to={{ pathname: '/ThongKe2', state: { type: 3 } }}
                            className="no-print" type="button" style={{ textTransform: 'capitalize', flexDirection: 'row', flexWrap: 'wrap', marginLeft: 10, display: 'flex', fontSize: 21, alignSelf: 'center', position: 'fixed', top: 5 }}>
                            <img className="no-print" src={logoback} style={{ width: 30, height: 30 }} />
                            <div className="no-print">
                                <b className="no-print" style={{ marginBottom: 5 }} >Trở về</b>
                            </div>
                        </Link>
                        <div style={{ padding: 5, backgroundColor: 'white', margin: 'auto' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                                <div>
                                    <a href="http://thuocsionline.vn/thongke2">
                                        <img width="200" height="60" src={logothuocsi}></img>
                                    </a>
                                </div>
                                <div style={{ marginLeft: 30 }}>
                                    Công ty: TNHH Dược Vật tư y tế Thuốc sỉ ETC Pharma
                                    <br />Địa chỉ: 267/2/10 Nguyễn Văn Cừ - Phường Tân Lập -<br />Thành phố
                                    Buôn Ma Thuột, Đắk Lắk .
                                    <br />Điện thoại: 0844 404047
                                </div>
                            </div>
                            <div style={{ width: '100%', marginTop: 20, textAlign: 'center' }}>
                                <div style={{ fontSize: '22pt', fontWeight: 'bold', margin: 'auto' }}>HÓA ĐƠN BÁN HÀNG</div>
                                <div style={{ fontSize: '14pt', marginTop: 5 }}>Số hóa đơn: {props.location.state.MaDatHang}</div>
                                <div style={{ fontSize: '14pt', marginTop: 3 }}>Ngày {date} tháng {month} năm {year}</div>
                            </div>
                            <div style={{ marginTop: 15, display: 'flex', fontSize: '15pt' }}>
                                <div style={{ width: '70%', wordWrap: 'break-word' }}>
                                    Khách hàng: {DonHang.KhachHang}
                                    <br />
                                    Địa chỉ: {DonHang.DiaChi}
                                    <br />
                                    Khu vực:
                                </div>
                                <div style={{ width: '30%', marginLeft: 100 }}>
                                    <div>
                                        SĐT: {DonHang.MaKhachHang}
                                        <br />
                                        Thanh toán:
                                        <br />
                                        NVBH: {TenNVBH}
                                        <br />
                                        <input className="no-print" placeholder="Tên nhân viên bán hàng" value={TenNVBH} onChange={(text) => { setTenNVBH(text.target.value) }}></input>
                                    </div>
                                </div>
                            </div>

                            <div style={{ width: '100%', marginTop: 20 }}>
                                <table className="table_inhoadon" style={{ width: '100%' }}>
                                    <tr style={{ fontSize: '13pt', fontWeight: 'bold' }}>
                                        <th className='boderinhoadon' style={{ width: '2%', borderColor: 'black' }}>STT</th>
                                        <th className='boderinhoadon' style={{ width: '60%', borderColor: 'black' }}>Tên hàng</th>
                                        <th className='boderinhoadon' style={{ width: '15%', borderWidth: 1, borderColor: 'black' }}>Loại hàng / Quà tặng</th>
                                        <th className='boderinhoadon' style={{ width: '3%', borderWidth: 1, borderColor: 'black' }}>ĐVT</th>
                                        <th className='boderinhoadon' style={{ width: '8%', borderWidth: 1, borderColor: 'black' }}>Số lượng</th>
                                        <th className='boderinhoadon' style={{ width: '15%', borderWidth: 1, borderColor: 'black' }}>Đơn giá</th>
                                        <th className='boderinhoadon' style={{ width: '7%', borderWidth: 1, borderColor: 'black' }}>% CK</th>
                                        <th className='boderinhoadon' style={{ width: '20%', borderWidth: 1, borderColor: 'black' }}>Thành tiền</th>
                                    </tr>
                                    {
                                        chiTietDonHang.map((item, i) => {
                                            let vNDThanhTien = formatNumber(item.SoLuong * (item.DonGia - (item.DonGia * item.ChietKhau / 100)))
                                            let vND = formatNumber(item.DonGia)
                                            if (item.NhanhHang == 'undefined') {
                                                item.NhanhHang = ''
                                            }
                                            return (
                                                <tr key={i} style={{ fontSize: '13pt' }}>
                                                    <td className='boderinhoadon' style={{ textAlign: 'center' }}>{(i + 1)}</td>
                                                    <td className='boderinhoadon' >{item.TenHang}</td>
                                                    <td className='boderinhoadon'>{item.NhanhHang}</td>
                                                    <td className='boderinhoadon' style={{ textAlign: 'center' }}>{item.DVT}</td>
                                                    <td className='boderinhoadon' style={{ textAlign: 'center' }}>{item.SoLuong}</td>
                                                    <td className='boderinhoadon' style={{ textAlign: 'end' }}>{vND}</td>
                                                    <td className='boderinhoadon' style={{ textAlign: 'center' }}>{item.ChietKhau}</td>
                                                    <td className='boderinhoadon' style={{ textAlign: 'end' }}>{vNDThanhTien}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </table>
                            </div>

                            {/* list ComboDetail */}

                            {
                                arrCombo.length > 0 ?
                                    <div style={{ width: '100%', marginTop: 20 }}>
                                        <h3>Danh sách chi tiết combo</h3>
                                        <table className="table_inhoadon" style={{ width: '100%' }}>
                                            <tr style={{ fontSize: '13pt', fontWeight: 'bold' }}>
                                                <th className='boderinhoadon' style={{ width: '2%', borderColor: 'black' }}>STT</th>
                                                <th className='boderinhoadon' style={{ width: '6%', borderColor: 'black' }}>Mã combo</th>
                                                <th className='boderinhoadon' style={{ width: '54%', borderColor: 'black' }}>Tên hàng</th>
                                                <th className='boderinhoadon' style={{ width: '3%', borderWidth: 1, borderColor: 'black' }}>ĐVT</th>
                                                <th className='boderinhoadon' style={{ width: '8%', borderWidth: 1, borderColor: 'black' }}>Số lượng</th>

                                            </tr>
                                            {
                                                arrComboDetail.map((item, i) => {
                                                    return (
                                                        <tr key={i} style={{ fontSize: '13pt' }}>
                                                            <td className='boderinhoadon' style={{ textAlign: 'center' }}>{(i + 1)}</td>
                                                            <td className='boderinhoadon' >{item.IdCombo}</td>
                                                            <td className='boderinhoadon' >{item.TenHang}</td>
                                                            <td className='boderinhoadon' style={{ textAlign: 'center' }}>{item.DVT}</td>
                                                            <td className='boderinhoadon' style={{ textAlign: 'center' }}>{item.SoLuong}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </table>
                                    </div>
                                    :
                                    null
                            }

                            <div style={{ marginTop: 15 }}>
                                <table className="table_inhoadon" style={{ width: '100%' }}>
                                    <tr style={{ fontSize: '13pt', fontWeight: 'bold' }}>
                                        <th style={{ width: '3%', borderWidth: 0 }}></th>
                                        <th style={{ width: '10%', borderWidth: 0, textAlign: 'start' }}>Tổng cộng:</th>
                                        <th style={{ width: '3%', borderWidth: 0 }}></th>
                                        <th style={{ width: '8%', borderWidth: 0 }}></th>
                                        <th style={{ width: '15%', borderWidth: 0 }}></th>
                                        <th style={{ width: '7%', borderWidth: 0 }}></th>
                                        <th style={{ width: '20%', borderWidth: 0, textAlign: 'end' }}> {formatNumber(tongTien)} </th>
                                    </tr>

                                </table>
                            </div>
                            <div style={{ marginTop: 0 }}>
                                <table className="table_inhoadon" style={{ width: '100%' }}>
                                    <tr style={{ fontSize: '13pt', fontWeight: 'bold' }}>
                                        <th style={{ width: '3%', borderWidth: 0 }}></th>
                                        <th style={{ width: '10%', borderWidth: 0, textAlign: 'start' }}>Đổi điểm:</th>
                                        <th style={{ width: '3%', borderWidth: 0 }}></th>
                                        <th style={{ width: '8%', borderWidth: 0 }}></th>
                                        <th style={{ width: '15%', borderWidth: 0 }}></th>
                                        <th style={{ width: '7%', borderWidth: 0 }}></th>
                                        <th style={{ width: '20%', borderWidth: 0, textAlign: 'end' }}>{formatNumber(tienDoiDiem)}</th>
                                    </tr>
                                </table>
                            </div>
                            {tienMaGiamGia != undefined ?
                                <div style={{ marginTop: 0 }}>
                                    <table className="table_inhoadon" style={{ width: '100%' }}>
                                        <tr style={{ fontSize: '13pt', fontWeight: 'bold' }}>
                                            <th style={{ width: '3%', borderWidth: 0 }}></th>
                                            <th style={{ width: '10%', borderWidth: 0, textAlign: 'start' }}>Giảm giá:</th>
                                            <th style={{ width: '3%', borderWidth: 0 }}></th>
                                            <th style={{ width: '8%', borderWidth: 0 }}></th>
                                            <th style={{ width: '15%', borderWidth: 0 }}></th>
                                            <th style={{ width: '7%', borderWidth: 0 }}></th>
                                            <th style={{ width: '20%', borderWidth: 0, textAlign: 'end' }}> {formatNumber(tienMaGiamGia)} </th>
                                        </tr>
                                    </table>
                                </div>
                                : null
                            }
                            {
                                quaTang != '*Không có quà tặng*' && quaTang != '' ?
                                    <div style={{ marginTop: 0 }}>
                                        <table className="table_inhoadon" style={{ width: '100%' }}>
                                            <tr style={{ fontSize: '13pt', fontWeight: 'bold' }}>
                                                <th style={{ width: '3%', borderWidth: 0 }}></th>
                                                <th style={{ width: '10%', borderWidth: 0, textAlign: 'start' }}>Quà tặng:</th>
                                                <th style={{ width: '3%', borderWidth: 0 }}></th>
                                                <th style={{ width: '8%', borderWidth: 0 }}></th>
                                                <th style={{ width: '15%', borderWidth: 0 }}></th>
                                                <th style={{ width: '7%', borderWidth: 0 }}></th>
                                                <th style={{ width: '20%', borderWidth: 0, textAlign: 'end' }}> {quaTang} </th>
                                            </tr>
                                        </table>
                                    </div>
                                    : null
                            }
                            {
                                arrCombo.length > 0 ?
                                    arrCombo.map((item, i) => {

                                        return (
                                            <div key={i} style={{ marginTop: 0 }}>
                                                <table className="table_inhoadon" style={{ width: '100%' }}>
                                                    <tr style={{ fontSize: '13pt', fontWeight: 'bold' }}>
                                                        <th style={{ width: '3%', borderWidth: 0 }}></th>
                                                        <th style={{ width: '10%', borderWidth: 0, textAlign: 'start' }}>Quà tặng từ {item.MaHang}</th>
                                                        <th style={{ width: '3%', borderWidth: 0 }}></th>
                                                        <th style={{ width: '8%', borderWidth: 0 }}></th>
                                                        <th style={{ width: '15%', borderWidth: 0 }}></th>
                                                        <th style={{ width: '7%', borderWidth: 0 }}></th>
                                                        <th style={{ width: '20%', borderWidth: 0, textAlign: 'end' }}> {item.NhanhHang} </th>
                                                    </tr>
                                                </table>
                                            </div>
                                        )
                                    })
                                    :
                                    null
                            }
                            <div style={{ marginTop: 0 }}>
                                <table className="table_inhoadon" style={{ width: '100%' }}>
                                    <tr style={{ fontSize: '13pt', fontWeight: 'bold' }}>
                                        <th style={{ width: '3%', borderWidth: 0 }}></th>
                                        <th style={{ width: '15%', borderWidth: 0, textAlign: 'start' }}>Tiền còn lại:</th>
                                        <th style={{ width: '3%', borderWidth: 0 }}></th>
                                        <th style={{ width: '8%', borderWidth: 0 }}></th>
                                        <th style={{ width: '15%', borderWidth: 0 }}></th>
                                        <th style={{ width: '7%', borderWidth: 0 }}></th>
                                        <th style={{ width: '20%', borderWidth: 0, textAlign: 'end' }}> {formatNumber((tongTien - tienMaGiamGia - tienDoiDiem))} </th>
                                    </tr>
                                </table>
                            </div>
                            <div style={{ marginTop: 20 }}>
                                <div style={{ fontSize: '13pt', width: '80%', margin: 'auto', display: 'flex', justifyContent: 'space-between' }}>
                                    <div>Người mua hàng</div>
                                    <div>
                                        <div>Ngày {date} tháng {month} năm {year}</div>
                                        <div style={{ width: 101, margin: 'auto' }}>Người bán hàng</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }

        </div>
    );
}

export default InHoaDon