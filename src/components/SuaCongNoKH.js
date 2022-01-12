import { DvrTwoTone, ImportExport } from '@material-ui/icons';
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
// document.addEventListener('contextmenu', event => event.preventDefault());
// document.onkeydown = function (e) {
//   if(e.code == "Enter"){
//       alert("ENTER")
//   }
// }

export default ({ rowfromtable, parentCallback, tenNV }) => {

    const [DonHang, setDonHang] = useState([]);
    // const [state, setstate] = useState(initialState)
    useEffect(async () => {

        await fetch(API_URL + '/danhSachDonHangCongNo', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                MaKH: rowfromtable.MaKhachHang
            })
        })
            .then((response) => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].NgayXuLy != null) {
                        const nam2 = data[i].NgayXuLy.slice(0, 4)
                        const thang2 = data[i].NgayXuLy.slice(5, 7)
                        const ngay2 = "" + data[i].NgayXuLy.slice(8, 10)
                        data[i].NgayXuLy = ngay2 + "/" + thang2 + "/" + nam2
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
                // console.log(data)
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

    const suaCongNoKH = async (item, index) => {
        let isNan = 0
        let stringlog = "";
        if (isNaN(item.KhachDaTra) && item.KhachDaTra != `R`) {
            isNan = 1
            alert(`Khách đã trả không được nhập chữ ngoài chữ R.`)
        } else {
            if (parseFloat(item.KhachDaTra) < 0) {
                isNan = 1
                alert(`Khách đã trả phải lớn hơn -1.`)
            }
        }
        stringlog = stringlog + "---/changed CongNoKH - datra1: " + item.KhachDaTra
        const date = new Date();
        const ngay7 = date.getDate()
        const thang7 = date.getMonth() + 1
        const nam7 = date.getFullYear()
        const gio7 = date.getHours()
        const phut7 = date.getMinutes()
        let logstring = ngay7 + "-" + thang7 + "-" + nam7 + " - " + gio7 + ":" + phut7 + " - Mã đặt hàng: " + item.MaDatHang + " - Người xử lý :" + tenNV + " - log: " + stringlog;
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
        if (isNan == 0) {
            const khachDaTra = {
                KhachDaTra: item.KhachDaTra
            }
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    data: khachDaTra,
                    KhachCanTra: item.KhachCanTra
                })
            }
            const res = await fetch(API_URL + "/suaDonHang1Row/" + item.MaDatHang, requestOptions).then(res => res.json())
            const newList = DonHang.map((item, i) => {
                if (i == index) {
                    return { ...item, DaSua: 0 }
                }
                return item
            })
            setDonHang(newList)
            parentCallback(`12`);
        }
    }

    const suaKhachDaTra = (khoaChinh, khachDaTra) => {
        const newList = DonHang.map((item) => {
            if (item.MaDatHang === khoaChinh) {
                if (khachDaTra.length == 0) {
                    const updatedItem = {
                        ...item,
                        KhachDaTra: 0,
                        CongNo: item.KhachCanTra,
                        DaSua: 1
                    };
                    return updatedItem;
                } else {
                    if (khachDaTra == 'R' || khachDaTra == 'r' || khachDaTra == '0R' || khachDaTra == '0r' || khachDaTra == 'R0' || khachDaTra == 'r0') {
                        const updatedItem = {
                            ...item,
                            KhachDaTra: 'R',
                            CongNo: 0,
                            DaSua: 1
                        };
                        return updatedItem;
                    } else {
                        if (khachDaTra >= 0) {
                            const updatedItem = {
                                ...item,
                                KhachDaTra: khachDaTra,
                                CongNo: item.KhachCanTra - khachDaTra,
                                DaSua: 1
                            };
                            return updatedItem;
                        } else {
                            const updatedItem = {
                                ...item,
                                KhachDaTra: 0,
                                CongNo: item.KhachCanTra,
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
                    <div className='order_review' style={{ width: '75%', height: 50 }}>
                        <div className='tam-tinhsuadon1' style={{ textAlign: 'center' }}><h3>STT</h3></div>
                        <div className='tam-tinhsuadon4' style={{ textAlign: 'center' }}><h3>Mã người bán</h3></div>
                        <div className='tam-tinhsuadon4' style={{ textAlign: 'center' }}><h3>Mã đặt hàng</h3></div>
                        <div className='tam-tinhsuadon2' style={{ textAlign: 'center' }}><h3>Người XL</h3></div>
                        <div className='tam-tinhsuadon3' style={{ textAlign: 'center' }}><h3>Khách cần trả </h3></div>
                        <div className='tam-tinhsuadon2' style={{ textAlign: 'center' }}><h3>Khách trả trước </h3></div>
                        <div className='tam-tinhsuadon3' style={{ textAlign: 'center' }}><h3>Công nợ</h3></div>
                        <div className='tam-tinhsuadon3' style={{ textAlign: 'center' }}><h3>Ngày XL </h3></div>
                        <div className='tam-tinhsuadon3' style={{ textAlign: 'center' }}><h3>Sửa</h3></div>
                    </div>
                    {
                        DonHang.map((item, i) => {
                            const vNDKhachCanTra = item.KhachCanTra.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                            let khachDaTra = item.KhachDaTra
                            if (khachDaTra.length == 0 || khachDaTra == 0.0) {
                                khachDaTra = 0
                            }
                            const vNDCongNo = item.CongNo.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                            const dateA = new Date()
                            let dateB
                            if (item.NgayXuLy != undefined) {
                                const splitDateB = item.NgayXuLy.split(`/`)
                                dateB = new Date(`${splitDateB[2]}/${splitDateB[1]}/${splitDateB[0]}`)
                            } else {
                                dateB = item.NgayXuLy
                            }
                            const dateC = soSanhNgay.inDays(dateB, dateA)
                            return (
                                <div className='order_review1' style={{ width: '75%', fontSize: 12 }}>

                                    <div className='tam-tinhsuadon1'>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                            <h3>{(i + 1)}</h3>
                                        </div>
                                    </div>
                                    <div className='tam-tinhsuadon4'>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                            <h3>{item.MaNguoiBan}</h3>
                                        </div>
                                    </div>
                                    <div className='tam-tinhsuadon4'>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                            <h3>{item.MaDatHang}</h3>
                                        </div>
                                    </div>
                                    <div className='tam-tinhsuadon2'>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                            <h3>{item.MaNgXuLy}</h3>
                                        </div>
                                    </div>
                                    <div className='input_remove_arrow tam-tinhsuadon3'>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                            <h3>{vNDKhachCanTra}</h3>
                                        </div>
                                    </div>
                                    <div className='input_remove_arrow tam-tinhsuadon2'>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                            <input style={{ border: 'none', fontSize: 15, alignSelf: 'center', textAlign: 'center', fontWeight: 'bold' }} className='so' type='text' value={khachDaTra} onChange={val => { suaKhachDaTra(item.MaDatHang, val.target.value) }} />
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
                                    {
                                        dateC >= 15 ?
                                            <div className='tam-tinhsuadon3'>
                                                <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center', backgroundColor: 'red', color: 'white' }}>
                                                    <h3>{item.NgayXuLy}</h3>
                                                </div>
                                            </div>
                                            :
                                            dateC >= 10 ?
                                                <div className='tam-tinhsuadon3'>
                                                    <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center', backgroundColor: 'yellow' }}>
                                                        <h3>{item.NgayXuLy}</h3>
                                                    </div>
                                                </div>
                                                :
                                                <div className='tam-tinhsuadon3'>
                                                    <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center', backgroundColor: 'green', color: 'white' }}>
                                                        <h3>{item.NgayXuLy}</h3>
                                                    </div>
                                                </div>
                                    }
                                    <button className='tam-tinhsuadon3' onClick={() => suaCongNoKH(item, i)} style={{ cursor: 'pointer' }} >
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
                                        {/* <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center', backgroundColor: 'yellowgreen', color: 'black' }}>
                                            <h3>sửa</h3>
                                        </div> */}
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