import { useEffect, useState } from 'react'
import Header2 from './Header2'
import Footer from './Footer'
import { API_URL } from '../constants/constants'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
// import Button from '@material-ui/core/Button';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogTitle from '@material-ui/core/DialogTitle';
import PhantrangDH from './PhantrangDH';
import React from 'react'
const DonHangCuaToi = () => {
    const [HovaTen, setHovaTen] = useState();
    const [MaUser, setMaUser] = useState();
    const [DonHangCuaKhach, setDonHangCuaKhach] = useState([]);
    const [sotrang, setSoTrang] = useState(1);
    const [datasize, setDataSize] = useState();
    const [trangthai, setTrangThai] = useState('Tất cả');

    const LayTongDH = async (maNV) => {
        await fetch(API_URL + '/donHangTheoMaNV/' + maNV)
            .then((response) => response.json())
            .then(data => {
                if (data !== undefined) {
                    setDataSize(data.length)
                } else {
                    // console.log(new Date().getTime() + " funcDonHangCuaKhach= " + JSON.stringify(data))
                }
            })
    }
    const funcDonHangCuaKhach = async (maNV) => {
        await fetch(API_URL + '/layTongDH/' + maNV + '/' + sotrang)
            .then((response) => response.json())
            .then(data => {
                if (data !== undefined) {
                    setDonHangCuaKhach(data);
                } else {
                    // console.log(new Date().getTime() + " funcDonHangCuaKhach= " + JSON.stringify(data))
                }
            })
    }
    useEffect(async () => {
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
                    setHovaTen(data[0].TenNV);
                    setMaUser(data[0].MaNV);
                    funcDonHangCuaKhach(data[0].MaNV)
                    LayTongDH(data[0].MaNV)
                } else {
                    console.log("loi tttk")
                }
            })
    }, []);
    useEffect(() => {
        setTimeout(async () => {
            if (trangthai != 'Tất cả') {
                await fetch(API_URL + '/danhSachDonHangTheoTrangThai2/' + MaUser + '/' + trangthai + '/' + sotrang)
                    .then((response) => response.json())
                    .then(data => {
                        if (data !== undefined) {
                            setDonHangCuaKhach(data);
                        } else {
                            alert("Lỗi hệ thống :(")
                        }
                    })
            }
            else {
                await fetch(API_URL + '/layTongDH/' + MaUser + '/' + sotrang)
                    .then((response) => response.json())
                    .then(data => {
                        if (data !== undefined) {
                            setDonHangCuaKhach(data);
                        } else {
                            // console.log(new Date().getTime() + " funcDonHangCuaKhach= " + JSON.stringify(data))
                        }
                    })
            }
        }, 10);
    }, [trangthai, sotrang]);
    const funcDonHangCuaKhachTheoTrangThai = async (trangthai) => {
        setSoTrang(1);
        setTrangThai(trangthai)
        // await fetch(API_URL + '/danhSachDonHangTheoTrangThai/' + MaUser + '/' + trangthai)
        //     .then((response) => response.json())
        //     .then(data => {
        //         if (data !== undefined) {
        //             setDonHangCuaKhach(data);
        //         } else {
        //             alert("Lỗi hệ thống :(")
        //         }
        //     })
    }



    const [chiTietDonHang, setChiTietDonHang] = useState([]);

    const ChiTietDonHangCuaToi = async (idDonHang) => {
        ClickImg();
        await fetch(API_URL + '/chiTietDonHang/' + idDonHang, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then(data => {
                setChiTietDonHang(data)
            })
    };

    const [openimg, setOpenImg] = useState(false);
    // const [openDialog, setOpenDialog] = useState(false)
    // const [maDH, setMaDH] = useState('')

    // const huyDon = (maDatHang) => {
    //     // alert(`huyDon: ${maDatHang}`)
    //     setMaDH(maDatHang)
    //     setOpenDialog(true)
    // }

    const ClickImg = () => {
        setOpenImg(true);
    };

    const ClickClose = () => {
        setOpenImg(false);
    }

    // const ClickXoa = (maDatHang) => {
    //     setOpenDialog(false);
    //     const requestOptions = {
    //         method: 'PUT',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ TrangThai: `Khách hủy` })
    //     }
    //     fetch(`${API_URL}/donHangKhachHuy/${maDatHang}`, requestOptions).then(res => res.json()).then(qwe => {
    //         if (qwe.code == 0) {
    //             alert(`Đã hủy`)
    //             funcDonHangCuaKhach(MaUser)
    //         } else {
    //             alert(qwe.msg)
    //         }
    //     })
    // }

    // const testKey2 = (e) => {
    //     if (e.code == "Enter") {
    //         ClickXoa(maDH)
    //     }
    // }
    const LayGiaTriPagination = (childData) => {
        setSoTrang(childData)
    }
    return (
        <div className='div_body'>
            <Header2></Header2>
            <div className='div_khung'>
                <div className='div_trai'>
                    <div style={{ paddingBottom: '20px' }}>Tài khoản của<h4 className='h4_ten'>{HovaTen}</h4></div>
                    <ul className='ul_style' role='menu'>
                        <a className='a_style' href='/ThongTinTaiKhoan'>
                            <li className='li_styleTT1'>
                                <svg className='TTTK_svg'>
                                    <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'></path>
                                </svg>
                                Thông tin tài khoản
                            </li>
                        </a>
                        <a className='a_style' href='/DonHangCuaToi'>
                            <li className='li_styleDH1'>
                                <svg className='TTTK_svg'>
                                    <path d='M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z'></path>
                                </svg>
                                Đơn hàng của tôi
                            </li>
                        </a>
                        <a className='a_style' href='/DiemTichLuy'>
                            <li className='li_styleDTL'>
                                <svg className='TTTK_svg'>
                                    <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z'></path>
                                </svg>
                                Điểm tích lũy
                            </li>
                        </a>
                    </ul>
                </div>
                <div className='div_phai'>
                    <div className='txt_capnhat'>Đơn Hàng Của Tôi</div>
                    <div className='DHCT_KhungDH'>
                        <div className='DHCT_Menu'>
                            <button onClick={() => { funcDonHangCuaKhachTheoTrangThai('Tất cả') }} className={trangthai == 'Tất cả' ? 'DHCT_btn_active' : 'DHCT_btn'}>Tất cả</button>
                            <button onClick={() => { funcDonHangCuaKhachTheoTrangThai('Chưa xác nhận') }} className={trangthai == 'Chưa xác nhận' ? 'DHCT_btn_active' : 'DHCT_btn'}>Chưa Xác Nhận</button>
                            <button onClick={() => { funcDonHangCuaKhachTheoTrangThai('Đã xác nhận') }} className={trangthai == 'Đã xác nhận' ? 'DHCT_btn_active' : 'DHCT_btn'}>Đã Xác Nhận</button>
                            <button onClick={() => { funcDonHangCuaKhachTheoTrangThai('Đã xử lý') }} className={trangthai == 'Đã xử lý' ? 'DHCT_btn_active' : 'DHCT_btn'}>Đã Xử Lý</button>
                            <button onClick={() => { funcDonHangCuaKhachTheoTrangThai('Hủy') }} className={trangthai == 'Hủy' ? 'DHCT_btn_active' : 'DHCT_btn'}>Đã Hủy</button>
                        </div>
                        <div>
                            {
                                DonHangCuaKhach.map((item, i) => {
                                    let vND = (item.KhachCanTra).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                                    let color_text;
                                    if (item.TrangThai == 'Chưa xác nhận') {
                                        color_text = '#a9b427'
                                    }
                                    else if (item.TrangThai == 'Đã xác nhận') {
                                        color_text = '#0058ab'
                                    }
                                    else if (item.TrangThai == 'Đã xử lý') {
                                        color_text = '#00AB55'
                                    }
                                    else if (item.TrangThai == 'Đã hủy') {
                                        color_text = 'red'
                                    }
                                    else if (item.TrangThai == 'Khách hủy') {
                                        color_text = 'red'
                                    }
                                    return (
                                        <div key={i}>
                                            <button className="btn_don_hang"
                                                title='Xem chi tiết đơn hàng'
                                                onClick={() => {
                                                    ChiTietDonHangCuaToi(item.MaDatHang);
                                                }}>
                                                <div className="item_don_hang_par">
                                                    <div className="item_don_hang_head">
                                                        <div style={{ color: 'white', display: 'flex', flexDirection: 'row' }}><b>Mã đơn hàng:&nbsp;</b>{item.MaDatHang}</div>
                                                        <div className="bam_vao_dh" style={{ color: 'yellow', fontSize: 12 }}>* Bấm vào đơn hàng để xem chi tiết</div>
                                                    </div>
                                                    <div className="item_don_hang_body">
                                                        <div style={{ width: '80%' }} className="item_don_hang_body_mobile">
                                                            <div className="mobile_item_don_hang_price" style={{ width: '60%', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>Tổng tiền : &nbsp;
                                                                <div>{vND}</div>
                                                            </div>
                                                            <div className="mobile_item_don_hang_tt" style={{ width: '40%', display: 'flex', flexDirection: 'row' }}>Trạng thái :&nbsp;
                                                                <div style={{ color: color_text }}>{item.TrangThai}</div>
                                                            </div>
                                                        </div>
                                                        {
                                                            item.TrangThai === `Chưa xác nhận` ?
                                                                // <div style={{ width: '20%' }}>
                                                                //     <button title="Huỷ đơn" className="btn_huy_don_hang" onClick={() => huyDon(item.MaDatHang)}>
                                                                //         Hủy đơn
                                                                //     </button>
                                                                // </div>
                                                                null
                                                                : null
                                                            // <div style={{ width: '20%' }}>
                                                            //     <button disabled={true} style={{backgroundColor:'gray', fontSize:14}} title="Không thể hủy sau khi xác nhận" className="btn_huy_don_hang">
                                                            //         {item.TrangThai}
                                                            //     </button>
                                                            // </div>
                                                        }
                                                    </div>
                                                </div>
                                            </button>

                                        </div>
                                    );
                                })
                            }
                        </div>
                        <div className='DHCT_Content' style={{ marginTop: '15px' }}>
                            {DonHangCuaKhach == [] || DonHangCuaKhach == "" || DonHangCuaKhach == undefined ?
                                <div style={{ marginBottom: '15px', marginTop: '15px' }}>Không có đơn hàng</div>
                                :
                                <div className='phantrang'>
                                    <PhantrangDH callBackSanPham={LayGiaTriPagination} TongSoSP={datasize} Sotrang={sotrang}></PhantrangDH>
                                </div>
                            }
                            <div>
                                <a href="/DatHangNhanh" className='DHCT_btnDHN'>Đến trang đặt hàng nhanh</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog open={openimg} onClose={ClickClose}>
                <DialogContent>
                    <div style={{ padding: 10 }}>
                        <table style={{ width: '100%' }}>
                            <tr style={{ fontSize: 14, fontWeight: 'bold' }}>
                                <th style={{ width: '2%', borderWidth: 1, borderColor: 'black' }}>STT</th>
                                <th style={{ width: '45%', borderWidth: 1, borderColor: 'black' }}>Tên hàng</th>
                                <th style={{ width: '3%', borderWidth: 1, borderColor: 'black' }}>ĐVT</th>
                                <th style={{ width: '8%', borderWidth: 1, borderColor: 'black' }}>Số lượng</th>
                                <th style={{ width: '15%', borderWidth: 1, borderColor: 'black' }}>Đơn giá</th>
                                <th style={{ width: '7%', borderWidth: 1, borderColor: 'black' }}>% CK</th>
                                <th style={{ width: '20%', borderWidth: 1, borderColor: 'black' }}>Thành tiền</th>
                            </tr>
                            {
                                chiTietDonHang.map((item, i) => {
                                    // let vNDDonGia = item.DonGia.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                                    let vNDThanhTien = (item.DonGia * item.SoLuong).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                                    let vND = (item.DonGia).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                                    return (
                                        <tr key={i} style={{ fontSize: 14 }}>
                                            <td style={{ textAlign: 'center' }}>{(i + 1)}</td>
                                            <td>{item.TenHang}</td>
                                            <td style={{ textAlign: 'center' }}>{item.DVT}</td>
                                            <td style={{ textAlign: 'center' }}>{item.SoLuong}</td>
                                            <td style={{ textAlign: 'end' }}>{vND}</td>
                                            <td style={{ textAlign: 'center' }}>{item.ChietKhau}</td>
                                            <td style={{ textAlign: 'end' }}>{vNDThanhTien}</td>
                                        </tr>
                                    )
                                })
                            }
                        </table>
                    </div>
                </DialogContent>
            </Dialog>
            <Footer></Footer>

            {/* dialog xác nhận hủy đơn hàng */}

            {/* <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                onKeyPress={(e) => testKey2(e)}
            >
                <DialogTitle>
                    <div style={{ textAlign: 'center' }}>
                        <div className='GH_DialogTitle'>
                            <p style={{ alignItems: 'center', fontSize: '3.75em', margin: '0' }}>!</p>
                        </div>
                        <p className='GH_XinXacNhan'>Xin xác nhận</p>
                        {`Bạn có chắc muốn hủy đơn hàng ${maDH} này?`}
                    </div>
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} style={{ padding: '6px 16px', backgroundColor: 'rgb(255, 193, 7)', margin: '15px', borderRadius: '8px', color: 'rgb(0, 0, 0)' }}>Không</Button>
                    <Button onClick={() => { ClickXoa(maDH) }} style={{ padding: '6px 16px', backgroundColor: 'rgb(0, 171, 85)', margin: '15px', borderRadius: '8px', color: 'white' }} autoFocus>Có</Button>
                </DialogActions>
            </Dialog> */}
        </div>
    )
}
export default DonHangCuaToi