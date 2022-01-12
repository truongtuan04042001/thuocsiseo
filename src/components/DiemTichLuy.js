import { useEffect, useState } from 'react';
import Header2 from '../components/Header2';
import Footer from '../components/Footer';
import { API_URL } from '../constants/constants'
import React from 'react'
import repeatblack from '../images/repeatblack.png'
const DiemTichLuy = () => {
    const [HovaTen, setHovaTen] = useState();
    const [loyaltyPoint, setLoyaltyPoint] = useState(0)
    const [diemthuong, setDiemThuong] = useState([])

    const layDiemThuong = async () => {
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
                setDiemThuong(data)
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
                    setLoyaltyPoint(data[0].DiemThuong)
                    // console.log(`${new Date().getTime()} soLanChay=`, soLanChay)
                } else {
                    console.log("loi tttk")
                }
            })
        layDiemThuong()
    }, []);


    return (
        <div className='div_body'>
            <Header2></Header2>
            <div className='div_khung'>
                <div className='div_traidtl'>
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
                            <li className='li_styleDH'>
                                <svg className='TTTK_svg'>
                                    <path d='M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z'></path>
                                </svg>
                                Đơn hàng của tôi
                            </li>
                        </a>
                        <a className='a_style' href='/DiemTichLuy'>
                            <li className='li_styleDH1'>
                                <svg className='TTTK_svg'>
                                    <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z'></path>
                                </svg>
                                Điểm tích lũy
                            </li>
                        </a>
                    </ul>
                </div>
                <div className='div_phaidtl'>
                    <div className='dtl_title'>Điểm Tích Lũy</div>
                    <div className='dtl_text'>Bạn đang có&nbsp;
                        <span style={{ fontWeight: 'bold' }}>{loyaltyPoint}</span>
                        &nbsp;điểm tích lũy.
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', paddingLeft: '15px', color: '#00b46e' }}>Đổi Điểm Thưởng</div>
                    <div className='abcDTL'>
                        {
                            diemthuong.map((item, i) => {
                                const giaTienMocDiem = item.Gia.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                                return (
                                    <div key={i} className='dtl_khungdialogdtla'>
                                        <button className='dtl_adtl' >
                                            <div className='khunglogdtl'>
                                                <div className='diem'>{item.Diem} điểm</div>
                                                <div className='icon'><img width="12" color='black' src={repeatblack}></img></div>
                                                <div className='gia'>{giaTienMocDiem}</div>
                                            </div>
                                        </button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}
export default DiemTichLuy;