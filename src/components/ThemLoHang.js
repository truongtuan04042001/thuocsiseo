import { DvrTwoTone } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import '../css/themsp.css'
import { API_URL } from '../constants/constants'

export default () => {
    // maHang tenHang soLuong donGia dVT maLH ngaySX hanSD ghiChu
    const [maHang, setMaHang] = useState()
    const [tenHang, setTenHang] = useState()
    const [soLuong, setSoLuong] = useState(0)
    const [donGia, setDonGia] = useState(0)
    const [dVT, setDVT] = useState()
    const [maLH, setMaLH] = useState()
    const [ngaySX, setNgaySX] = useState('2021/06/06')
    const [hanSD, setHanSD] = useState('2023/12/01')
    const [ghiChu, setGhiChu] = useState()
    
    const themLoHang = () => {
        if (maHang == "" || maHang == null || maHang == undefined) {
            alert("Mã hàng trống")
        } else {
            if (tenHang == "" || tenHang == null || tenHang == undefined) {
                alert("Tên hàng trống")
            } else {
                if (soLuong == "" || soLuong == null || soLuong == undefined) {
                    alert("Số lượng trống")
                }
                else {
                    if (donGia == "" || donGia == null || donGia == undefined) {
                        alert("Đơn giá")
                    }
                    else {
                        if (dVT == "" || dVT == null || dVT == undefined) {
                            alert("Đơn vị tính trống")
                        }
                        else {
                            if (maLH == "" || maLH == null || maLH == undefined) {
                                alert("Mã lô hàng trống")
                            }
                            else {
                                if (ngaySX == "" || ngaySX == null || ngaySX == undefined) {
                                    alert("Ngày sản xuất trống")
                                }
                                else {
                                    if (hanSD == "" || hanSD == null || hanSD == undefined) {
                                        alert("Hạn sử dụng trống")
                                    }
                                    else {
                                        // ok
                                        themChiTietLoHang()
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    const themChiTietLoHang = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                MaLH: maLH,
                MaHang: maHang,
                TenHang: tenHang,
                SoLuong: parseInt(soLuong),
                DonGia: parseFloat(donGia),
                DVT: dVT,
                NgaySX: ngaySX,
                HanSD: hanSD,
            })
        }
        await fetch(API_URL + "/danhSachTatCaChiTietLoHang", requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log("OK" + data)
                alert("Đã thêm lô hàng")
            })
    }
    return (
        <div style={{ width: '100%', marginTop: 10 }}>
            <div style={{ display: 'flex', flexDirection: 'row', background: "#f2f2f2", borderRadius: '5px', maxWidth: '100%', flexWrap: 'wrap', margin: 'auto' }}>
                <div style={{ maxWidth: '25%', padding: '15px', background: '' }}>
                    <form action="">
                        <div>
                            <label><b>Mã hàng</b></label><br></br>
                            <input
                                className="ip_mh"
                                type="text"
                                value={maHang}
                                onChange={text => { setMaHang(text.target.value) }}
                                placeholder="Nhập mã hàng">
                            </input>
                        </div>

                        <div>
                            <label><b>Tên hàng</b></label><br></br>
                            <input
                                className='ip_sodk'
                                type="text"
                                value={tenHang}
                                onChange={text => { setTenHang(text.target.value) }}
                                placeholder="Nhập tên hàng">
                            </input>
                        </div>
                        <div>
                            <label><b>Số lượng</b></label><br></br>
                            <input
                                className="ip_mh"
                                type="number"
                                value={soLuong}
                                onChange={text => { setSoLuong(text.target.value) }}
                                placeholder="Nhập số lượng">
                            </input>
                        </div>
                        <div>
                            <label><b>Đơn giá</b></label><br></br>
                            <input
                                className="ip_tenhang"
                                type="number"
                                value={donGia}
                                onChange={text => { setDonGia(text.target.value) }}
                                placeholder="Nhập đơn giá">
                            </input>
                        </div>
                        <div>
                            <label><b>Đơn vị tính</b></label><br></br>
                            <input
                                className='ip_sodk'
                                type="text"
                                value={dVT}
                                onChange={text => { setDVT(text.target.value) }}
                                placeholder="Nhập số đăng ký">
                            </input>
                        </div>

                    </form>
                </div>

                <div style={{ width: '25%', padding: '15px', background: '' }}>
                    <form>
                        <div>
                            <label><b>Mã lô hàng</b></label><br></br>
                            <input
                                className='ip_hoatchat'
                                type="text"
                                value={maLH}
                                onChange={text => { setMaLH(text.target.value) }}
                                placeholder="Nhập mã lô hàng">
                            </input>
                        </div>
                        <div>
                            <label><b>Ngày sản xuất</b></label><br></br>
                            <input
                                className='ip_hamluong'
                                type="text"
                                value={ngaySX}
                                onChange={text => { setNgaySX(text.target.value) }}
                                placeholder="Nhập ngày sản xuất">
                            </input>
                        </div>
                        <div>
                            <label><b>Hạn sử dụng</b></label><br></br>
                            <input
                                className='ip_hangsx'
                                type="text"
                                value={hanSD}
                                onChange={text => { setHanSD(text.target.value) }}
                                placeholder="Nhập hạn sử dụng">
                            </input>
                        </div>
                        <div>
                            <label><b>Ghi chú</b></label><br></br>
                            <input
                                className='ip_nuocsx'
                                type="text"
                                value={ghiChu}
                                onChange={text => { setGhiChu(text.target.value) }}
                                placeholder="Nhập ghi chú (không bắt buộc)">
                            </input>
                        </div>


                    </form>
                </div>

            </div>
            <input className="submit" type="submit" value="THÊM LÔ HÀNG" onClick={themLoHang}></input>
        </div>
    );
}
