import { DvrTwoTone } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import Checkbox from '@material-ui/core/Checkbox';
import '../css/themsp.css'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import '../css/dathangnhanh.css'
import image_default from '../images/image-default.jpg'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Pagination from './Pagination';
import search_img from '../images/search.png'
import { ExportReactCSV } from './ExportReactCSV'
import { API_URL } from '../constants/constants'
import { Link, NavLink } from 'react-router-dom';
import { string } from 'prop-types';
import Clock from './Clock'

export default ({ rowfromtable, parentCallback, tenNV }) => {

    const [DonHang, setDonHang] = useState([]);
    useEffect(async () => {

        await fetch(API_URL + '/danhSachDonHangCongNoNCC', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                SDT: rowfromtable.SDT
            })
        })
            .then((response) => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].NgayNhapHang != null) {
                        const nam2 = data[i].NgayNhapHang.slice(0, 4)
                        const thang2 = data[i].NgayNhapHang.slice(5, 7)
                        const ngay2 = "" + data[i].NgayNhapHang.slice(8, 10)
                        data[i].NgayNhapHang = ngay2 + "/" + thang2 + "/" + nam2
                    }
                }
                let magSP = []
                data.forEach(ee2 => {
                    magSP.push({
                        ...ee2,
                        ...{ DaSua: 0 }
                    })
                });
                setDonHang(magSP)
            })
    }, []);

    let soSanhNgay = {
        inDays: (d1, d2) => {
            const t2 = d2.getTime();
            const t1 = d1.getTime();
            return Math.abs(parseInt((t2 - t1) / (24 * 3600 * 1000)));
        },

        inWeeks: (d1, d2) => {
            const t2 = d2.getTime();
            const t1 = d1.getTime();
            return Math.abs(parseInt((t2 - t1) / (24 * 3600 * 1000 * 7)));
        },

        inMonths: (d1, d2) => {
            const d1Y = d1.getFullYear();
            const d2Y = d2.getFullYear();
            const d1M = d1.getMonth();
            const d2M = d2.getMonth();
            return Math.abs((d2M + 12 * d2Y) - (d1M + 12 * d1Y));
        },

        inYears: (d1, d2) => {
            return Math.abs(d2.getFullYear() - d1.getFullYear());
        }
    }

    const suaCongNoNCC = async (item, index) => {
        let isNan = 0
        let stringlog = "";
        if (isNaN(item.DaTra) && item.DaTra != `R`) {
            isNan = 1
            alert(`Khách đã trả không được nhập chữ ngoài chữ R.`)
        } else {
            if (parseFloat(item.DaTra) < 0) {
                isNan = 1
                alert(`Khách đã trả phải lớn hơn -1.`)
            }
        }
        // console.log(`${new Date().getTime()} isNan=`, isNan)
        if (isNan == 0) {
            const khachDaTra = {
                DaTra: item.DaTra
            }
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    data: khachDaTra,
                    TongTien: item.TongTien
                })
            }
            const res = await fetch(API_URL + "/suaDonHangNhap1Row2/" + item.MaDHN, requestOptions).then(res => res.json())
            // console.log(`${new Date().getTime()} res=`, res)
            const newList = DonHang.map((item, i) => {
                if (i == index) {
                    return { ...item, DaSua: 0 }
                }
                return item
            })
            setDonHang(newList)
            stringlog = stringlog + "---/changed CongNoNCC - datra1: " + item.DaTra
            const date = new Date();
            const ngay7 = date.getDate()
            const thang7 = date.getMonth() + 1
            const nam7 = date.getFullYear()
            const gio7 = date.getHours()
            const phut7 = date.getMinutes()
            let logstring = ngay7 + "-" + thang7 + "-" + nam7 + " - " + gio7 + ":" + phut7 + " - Mã đặt hàng: " + item.MaDHN + " - Người xử lý :" + tenNV + " - log: " + stringlog;
            fetch(API_URL + '/log', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    log: logstring,
                })
            })
            parentCallback(`12`);
        }
    }

    const suaDaTra = (khoaChinh, daTra) => {
        const newList = DonHang.map((item) => {
            if (item.MaDHN === khoaChinh) {
                if (daTra.length == 0) {
                    const updatedItem = {
                        ...item,
                        DaTra: 0,
                        CongNo: item.TongTien,
                        DaSua: 1
                    };
                    return updatedItem;
                } else {
                    if (daTra == 'R' || daTra == 'r' || daTra == '0R' || daTra == '0r'||daTra == 'R0' || daTra == 'r0') {
                        const updatedItem = {
                            ...item,
                            DaTra: 'R',
                            CongNo: 0,
                            DaSua: 1
                        };
                        return updatedItem;
                    } else {
                        if (daTra >= 0) {
                            const updatedItem = {
                                ...item,
                                DaTra: daTra,
                                CongNo: item.TongTien - daTra,
                                DaSua: 1
                            };
                            return updatedItem;
                        } else {
                            const updatedItem = {
                                ...item,
                                DaTra: 0,
                                CongNo: item.TongTien,
                                DaSua: 1
                            };
                            return updatedItem;
                        }
                    }

                }
            }
            return item;
        });
        setDonHang(newList)
    }

    return (
        <div>

            <div>
                <div>
                </div>
                <div className='don'>
                    <div className='order_review' style={{ width: '100%', height: 50 }}>
                        <div className='tam-tinhsuadon1' style={{ textAlign: 'center' }}><h3>Id</h3></div>
                        <div className='tam-tinhsuadon4' style={{ textAlign: 'center' }}><h3>Tên NCC</h3></div>
                        <div className='tam-tinhsuadon2' style={{ textAlign: 'center' }}><h3>SDT</h3></div>
                        <div className='tam-tinhsuadon3' style={{ textAlign: 'center' }}><h3>Tổng tiền</h3></div>
                        <div className='tam-tinhsuadon2' style={{ textAlign: 'center' }}><h3>Khách trả trước </h3></div>
                        <div className='tam-tinhsuadon3' style={{ textAlign: 'center' }}><h3>Công nợ</h3></div>
                        <div className='tam-tinhsuadon4' style={{ textAlign: 'center' }}><h3>Mã Đơn Hàng Nhập</h3></div>
                        <div className='tam-tinhsuadon3' style={{ textAlign: 'center' }}><h3>Ngày Nhập Hàng</h3></div>
                        <div className='tam-tinhsuadon3' style={{ textAlign: 'center' }}><h3>Sửa</h3></div>
                    </div>

                    {
                        DonHang.map((item, i) => {
                            const vNDTongTien = item.TongTien.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                            let daTra = item.DaTra
                            if (daTra.length == 0 || daTra == 0.0) {
                                daTra = 0
                            }
                            const vNDCongNo = item.CongNo.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                            const dateA = new Date()
                            let dateB
                            if (item.NgayNhapHang != undefined) {
                                const splitDateB = item.NgayNhapHang.split(`/`)
                                dateB = new Date(`${splitDateB[2]}/${splitDateB[1]}/${splitDateB[0]}`)
                            } else {
                                dateB = item.NgayNhapHang
                            }
                            const dateC = soSanhNgay.inDays(dateB, dateA)
                            return (
                                <div className='order_review1' style={{ width: '100%', fontSize: 12 }}>

                                    <div className='tam-tinhsuadon1'>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                            <h3>{item.Id}</h3>
                                        </div>
                                    </div>
                                    <div className='tam-tinhsuadon4'>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                            <h3>{item.TenNCC}</h3>
                                        </div>
                                    </div>
                                    <div className='tam-tinhsuadon2'>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                            <h3>{item.SDT}</h3>
                                        </div>
                                    </div>
                                    <div className='input_remove_arrow tam-tinhsuadon3'>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                            <h3>{vNDTongTien}</h3>
                                        </div>
                                    </div>
                                    <div className='input_remove_arrow tam-tinhsuadon2'>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                            <input style={{ border: 'none', fontSize: 15, alignSelf: 'center', textAlign: 'center', fontWeight: 'bold' }} className='so' type='text' value={daTra} onChange={val => { suaDaTra(item.MaDHN, val.target.value) }} />
                                            <p style={{ border: 'none', fontSize: 15, alignSelf: 'center', textAlign: 'center', fontWeight: 'bold' }} className='so'>
                                                VND
                                            </p>
                                        </div>
                                    </div>
                                    <div className='input_remove_arrow tam-tinhsuadon3'>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                            <h3>{vNDCongNo}</h3>
                                        </div>
                                    </div>

                                    <div className='input_remove_arrow tam-tinhsuadon4'>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                            <h3>{item.MaDHN}</h3>
                                        </div>
                                    </div>
                                    {
                                        dateC >= 15 ?
                                            <div className='tam-tinhsuadon3'>
                                                <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center', backgroundColor: 'red', color: 'white' }}>
                                                    <h3>{item.NgayNhapHang}</h3>
                                                </div>
                                            </div>
                                            :
                                            dateC >= 10 ?
                                                <div className='tam-tinhsuadon3'>
                                                    <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center', backgroundColor: 'yellow' }}>
                                                        <h3>{item.NgayNhapHang}</h3>
                                                    </div>
                                                </div>
                                                :
                                                <div className='tam-tinhsuadon3'>
                                                    <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center', backgroundColor: 'green', color: 'white' }}>
                                                        <h3>{item.NgayNhapHang}</h3>
                                                    </div>
                                                </div>
                                    }
                                    <button className='tam-tinhsuadon3' onClick={() => suaCongNoNCC(item, i)} style={{ cursor: 'pointer' }}>
                                        {
                                            item.DaSua == 1 ?
                                                <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center', backgroundColor: 'red', color: 'white' }}>
                                                    <h3>sửa</h3>
                                                </div>
                                                :
                                                <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center', backgroundColor: 'yellowgreen', color: 'black' }}>
                                                    <h3>sửa</h3>
                                                </div>
                                        }
                                    </button>
                                </div>
                            )
                        })
                    }
                    {/* <div className='order_review1' style={{ width: '75%', backgroundColor: '#f2f2f2' }}>
                            <div style={{ width: '38%', textAlign: 'left', flexWrap: 'wrap', padding: 5, margin: 'auto', borderLeftWidth: 3, borderColor: '#ececec', alignSelf: 'center', fontSize: 12, paddingLeft: 7 }}><h3>Tổng tiền hàng</h3></div>
                            <div style={{ width: '17%', textAlign: 'center', flexWrap: 'wrap', padding: 5, margin: 'auto', borderLeftWidth: 3, borderColor: '#ececec', alignSelf: 'center', fontSize: 12 }}><h3>{tongSLSPCTDH}</h3></div>
                            <div style={{ width: '48%', textAlign: 'right', flexWrap: 'wrap', padding: 5, margin: 'auto', borderLeftWidth: 3, borderColor: '#ececec', alignSelf: 'center', fontSize: 12, paddingRight: 7 }}><h3>{strTTCTDH}</h3></div>
                        </div> */}




                </div>

            </div>


        </div>
    );


}