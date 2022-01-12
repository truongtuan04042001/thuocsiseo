import { DvrTwoTone } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { API_URL } from '../constants/constants'
import '../css/themsp.css'

export default ({ rowfromtable, parentCallback }) => {
    const [mahang, setMaHang] = useState();
    const [tenhang, setTenHang] = useState();
    const [dangkinhdoanh, setDangKinhDoanh] = useState();
    const [doanhso, setDoanhSo] = useState();
    const [banchay, setBanChay] = useState();
    const [spmoi, setSPmoi] = useState();
    const [hdnhanh, setHDnhanh] = useState();
    const [ghnhanh, setGHnhanh] = useState();
    const [svip, setSVip] = useState();
    const [nhikhoa, setNhiKhoa] = useState();
    const [nhakhoa, setNhaKhoa] = useState();
    const [sankhoa, setSanKhoa] = useState();
    const [dalieu, setDalieu] = useState();
    const [nthop, setNTHop] = useState();
    const [thankinh, setThanKinh] = useState();
    const [bv, setBV] = useState();
    const [fs, setFS] = useState();
    const [phantram, setPhanTram] = useState();

    useEffect(() => {
        setMaHang(rowfromtable.MaHang)
        setTenHang(rowfromtable.TenHang)
        setDangKinhDoanh(rowfromtable.DangKD)
        setDoanhSo(rowfromtable.TinhDS)
        setBanChay(rowfromtable.BanChay)
        setSPmoi(rowfromtable.SPmoi)
        setHDnhanh(rowfromtable.HDnhanh)
        setGHnhanh(rowfromtable.GHnhanh)
        setSVip(rowfromtable.SVip)
        setNhiKhoa(rowfromtable.NhiKhoa)
        setNhaKhoa(rowfromtable.NhaKhoa)
        setSanKhoa(rowfromtable.SanKhoa)
        setDalieu(rowfromtable.DaLieu)
        setNTHop(rowfromtable.NTHop)
        setThanKinh(rowfromtable.ThanKinh)
        setBV(rowfromtable.BV)
        setFS(rowfromtable.FlashSale)
        setPhanTram(rowfromtable.PhanTramKM)
    }, [rowfromtable]);

    const sua = () => {
        if (mahang == "" || mahang == null || mahang == undefined) {
            alert("Mã Hàng Trống")
        }
        else {
            if (tenhang == "" || tenhang == null || tenhang == undefined) {
                alert("Tên Hàng Trống")
            }
            else {
                if (phantram < 0 || phantram > 100) {
                    alert(`Phần trăm khuyến mãi từ 0 đến 100`)
                } else {
                    var capnhat = { MaHang: mahang, TenHang: tenhang, DangKD: dangkinhdoanh, TinhDS: doanhso, BanChay: banchay, SPmoi: spmoi, HDnhanh: hdnhanh, GHnhanh: ghnhanh, SVip: svip, NhiKhoa: nhikhoa, NhaKhoa: nhakhoa, SanKhoa: sankhoa, DaLieu: dalieu, NTHop: nthop, ThanKinh: thankinh, BV: bv, FlashSale: fs, PhanTramKM: parseInt(phantram) }
                    fetch(API_URL + '/suasanpham', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            sermangitem: capnhat,
                            sermahang: mahang
                        })
                    })
                    const rand = Math.random(2) * 1000
                    const strRand = "str" + rand
                    parentCallback(strRand);
                }
            }
        }
    }

    return (
        <div style={{ width: '100%', marginTop: 10 }}>
            <div style={{ display: 'flex', flexDirection: 'row', background: "#f2f2f2", borderRadius: '5px', maxWidth: '100%', flexWrap: 'wrap', margin: 'auto' }}>
                <div style={{ maxWidth: '25%', padding: '15px', background: '' }}>
                    <form action="">
                        <div>
                            <label><b>Mã Hàng</b></label><br></br>
                            <input
                                className="ip_mh"
                                type="text"
                                disabled
                                value={mahang}
                                onChange={text => { setMaHang(text.target.value) }}
                                placeholder="Nhập mã hàng">
                            </input>
                        </div>
                        <div>
                            <label><b>Tên Hàng</b></label><br></br>
                            <input
                                className="ip_tenhang"
                                disabled
                                type="text"
                                value={tenhang}
                                onChange={text => { setTenHang(text.target.value) }}
                                placeholder="Nhập tên hàng">
                            </input>
                        </div>
                        <div>
                            <label><b>Đang Kinh Doanh</b></label><br></br>
                            <input
                                className="ip_mh"
                                type="text"
                                value={dangkinhdoanh}
                                onChange={text => { setDangKinhDoanh(text.target.value) }}
                                placeholder="Đang Kinh Doanh">
                            </input>
                        </div>
                        <div>
                            <label><b>Tính Doanh Số</b></label><br></br>
                            <input
                                className="ip_tenhang"
                                type="text"
                                value={doanhso}
                                onChange={text => { setDoanhSo(text.target.value) }}
                                placeholder="Tính Doanh Số">
                            </input>
                        </div>
                        <div>
                            <label><b>Bán chạy</b></label><br></br>
                            <input
                                className="ip_tenhang"
                                type="text"
                                value={banchay}
                                onChange={text => { setBanChay(text.target.value) }}
                                placeholder="Bán chạy">
                            </input>
                        </div>

                    </form>
                </div>

                <div style={{ width: '25%', padding: '15px', background: '' }}>
                    <form>
                        <div>
                            <label><b>SP mới</b></label><br></br>
                            <input
                                className="ip_tenhang"
                                type="text"
                                value={spmoi}
                                onChange={text => { setSPmoi(text.target.value) }}
                                placeholder="SP mới">
                            </input>
                        </div>
                        <div>
                            <label><b>Hóa đơn nhanh</b></label><br></br>
                            <input
                                className="ip_tenhang"
                                type="text"
                                value={hdnhanh}
                                onChange={text => { setHDnhanh(text.target.value) }}
                                placeholder="Hóa đơn nhanh">
                            </input>
                        </div>
                        <div>
                            <label><b>Giao hàng nhanh</b></label><br></br>
                            <input
                                className="ip_tenhang"
                                type="text"
                                value={ghnhanh}
                                onChange={text => { setGHnhanh(text.target.value) }}
                                placeholder="Giao hàng nhanh">
                            </input>
                        </div>
                        <div>
                            <label><b>Sỉ vip</b></label><br></br>
                            <input
                                className="ip_tenhang"
                                type="text"
                                value={svip}
                                onChange={text => { setSVip(text.target.value) }}
                                placeholder="Sỉ vip">
                            </input>
                        </div>
                        <div>
                            <label><b>Nhi khoa</b></label><br></br>
                            <input
                                className="ip_tenhang"
                                type="text"
                                value={nhikhoa}
                                onChange={text => { setNhiKhoa(text.target.value) }}
                                placeholder="Nhi khoa">
                            </input>
                        </div>
                    </form>
                </div>

                <div style={{ width: '25%', padding: '15px', background: '' }}>
                    <form>
                        <div>
                            <label><b>Nha khoa</b></label><br></br>
                            <input
                                className="ip_tenhang"
                                type="text"
                                value={nhakhoa}
                                onChange={text => { setNhaKhoa(text.target.value) }}
                                placeholder="Nha khoa">
                            </input>
                        </div>
                        <div>
                            <label><b>Sản khoa</b></label><br></br>
                            <input
                                className="ip_tenhang"
                                type="text"
                                value={sankhoa}
                                onChange={text => { setSanKhoa(text.target.value) }}
                                placeholder="Sản khoa">
                            </input>
                        </div>
                        <div>
                            <label><b>Da liễu</b></label><br></br>
                            <input
                                className="ip_tenhang"
                                type="text"
                                value={dalieu}
                                onChange={text => { setDalieu(text.target.value) }}
                                placeholder="Da liễu">
                            </input>
                        </div>
                        <div>
                            <label><b>Ngoại tổng hợp</b></label><br></br>
                            <input
                                className="ip_tenhang"
                                type="text"
                                value={nthop}
                                onChange={text => { setNTHop(text.target.value) }}
                                placeholder="Ngoại tổng hợp">
                            </input>
                        </div>
                        <div>
                            <label><b>Thần Kinh</b></label><br></br>
                            <input
                                className="ip_tenhang"
                                type="text"
                                value={thankinh}
                                onChange={text => { setThanKinh(text.target.value) }}
                                placeholder="Thần Kinh">
                            </input>
                        </div>
                    </form>
                </div>

                <div style={{ width: '25%', padding: '15px', background: '' }}>
                    <form>
                        <div>
                            <label><b>Bệnh viện/Pkhám</b></label><br></br>
                            <input
                                className="ip_tenhang"
                                type="text"
                                value={bv}
                                setBV
                                onChange={text => { setDalieu(text.target.value) }}
                                placeholder="Bệnh viện/Pkhám">
                            </input>
                        </div>
                        <div>
                            <label><b>Flashsale</b></label><br></br>
                            <input
                                className="ip_tenhang"
                                type="text"
                                value={fs}
                                onChange={text => { setFS(text.target.value) }}
                                placeholder="Flashsale">
                            </input>
                        </div>
                        <div>
                            <label><b>Phần Trăm Khuyến Mãi</b></label><br></br>
                            <input
                                className="ip_tenhang"
                                type="text"
                                value={phantram}
                                onChange={text => { setPhanTram(text.target.value) }}
                                placeholder="Phần Trăm Khuyến Mãi">
                            </input>
                        </div>

                    </form>
                </div>
            </div>
            <input className="submit" type="submit" value="SỬA SẢN PHẨM" onClick={sua} style={{ width: '20%', padding: '15px', background: '#2DE183' }}></input>


        </div>
    );
}
