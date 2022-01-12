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
// document.addEventListener('contextmenu', event => event.preventDefault());
// document.onkeydown = function (e) {
//   if(e.code == "Enter"){
//       alert("ENTER")
//   }
// }

export default ({ rowfromtable, parentCallback, tenNV }) => {

    const [DonHang, setDonHang] = useState([]);
    useEffect(async () => {
       
        await fetch(API_URL + '/chiTiet1DonHangNhap', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                MaDHN:rowfromtable.MaDHN
            })
        })
            .then((response) => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].HanSD != null) {
                        const nam2 = data[i].HanSD.slice(0, 4)
                        const thang2 = data[i].HanSD.slice(5, 7)
                        const ngay2 = "" + data[i].HanSD.slice(8, 10)
                        data[i].HanSD = ngay2 + "/" + thang2 + "/" + nam2
                    }
                }
                setDonHang(data)
                 console.log(data)
            })
    }, []);



    return (
        <div>
           
                <div>
                    <div>
                   

                    </div>
                    <div className='don'>
                        <div className='order_review' style={{ width: '100%', height: 50 }}>
                        <div className='tam-tinhsuadon1' style={{ textAlign: 'center' }}><h3>Id</h3></div>
                            <div className='tam-tinhsuadon2' style={{ textAlign: 'center' }}><h3>Mã DHN</h3></div>
                            <div className='tam-tinhsuadon2' style={{ textAlign: 'center' }}><h3>Mã hàng</h3></div>
                            <div className='tam-tinhsuadon3' style={{ textAlign: 'center' }}><h3>Tên Hàng</h3></div>
                            <div className='tam-tinhsuadon4' style={{ textAlign: 'center' }}><h3>Số Lượng </h3></div>
                            <div className='tam-tinhsuadon2' style={{ textAlign: 'center' }}><h3>Đơn Giá </h3></div>
                            <div className='tam-tinhsuadon4' style={{ textAlign: 'center' }}><h3>DVT </h3></div>
                            <div className='tam-tinhsuadon2' style={{ textAlign: 'center' }}><h3>Mã Lô</h3></div>
                            <div className='tam-tinhsuadon2' style={{ textAlign: 'center' }}><h3>HSD</h3></div>

                        </div>
     
                        {
                            DonHang.map((item, i) => {
                                // const vNDKhachCanTra = item.KhachCanTra.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                                // const vNDKhachDaTra = item.KhachDaTra.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                                // const vNDCongNo = item.CongNo.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                                return (
                               
                                    <div className='order_review1' style={{ width: '100%', fontSize: 12 }}>
                                      
                                        <div className='tam-tinhsuadon1'>
                                            <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                                <h3>{item.Id}</h3>
                                            </div>
                                        </div>
                                        <div className='tam-tinhsuadon2'>
                                            <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                                <h3>{item.MaDHN}</h3>
                                            </div>
                                        </div>
                                        <div className='tam-tinhsuadon2'>
                                            <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                                <h3>{item.MaHang}</h3>
                                            </div>
                                        </div>
                                        <div className='tam-tinhsuadon3'>
                                            <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                                <h3>{item.TenHang}</h3>
                                            </div>
                                        </div>
                                        <div className='tam-tinhsuadon4'>
                                            <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                                <h3>{item.SoLuong}</h3>
                                            </div>
                                        </div>
                                        <div className='input_remove_arrow tam-tinhsuadon2'>
                                            <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                                <h3>{item.DonGia}</h3>
                                            </div>
                                        </div>
                                        <div className='input_remove_arrow tam-tinhsuadon4'>
                                            <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                                <h3>{item.DVT}</h3>
                                            </div>
                                        </div>
                                        <div className='input_remove_arrow tam-tinhsuadon2'>
                                            <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                                <h3>{item.MaLH}</h3>
                                            </div>
                                        </div>
                                        <div className='input_remove_arrow tam-tinhsuadon2'>
                                            <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', margin: 'auto', alignItems: 'center', height: '100%', placeContent: 'center' }}>
                                                <h3>{item.HanSD}</h3>
                                            </div>
                                        </div>
                                       
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