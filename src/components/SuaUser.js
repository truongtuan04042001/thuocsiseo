import { useEffect, useState } from 'react';
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { API_URL } from '../constants/constants'
import '../css/themsp.css'
import md5 from './md5';
import options from './options';
import Select from 'react-select';
export default ({ rowfromtable, parentCallback }) => {

    const [MaNV, setMaNV] = useState();
    const [Info, setInfo] = useState();
    const [TenNV, setTenNV] = useState();
    const [SDT, setSDT] = useState();
    const [Email, setEmail] = useState();
    const [MK, setMK] = useState();
    const [Cccd, setCccd] = useState();
    const [DiaChi, setDiaChi] = useState();
    const [PhuongXa, setPhuongXa] = useState();
    const [KhuVuc, setKhuVuc] = useState();
    const [MaKH, setMaKH] = useState();
    
    useEffect(() => {
    setMaNV(rowfromtable.MaNV)
    setInfo(rowfromtable.Info)
    setTenNV(rowfromtable.TenNV)
    setSDT(rowfromtable.SDT)
    setEmail(rowfromtable.Email)
    setMK(rowfromtable.MK)
    setCccd(rowfromtable.Cccd)
    setDiaChi(rowfromtable.DiaChi)
    setPhuongXa(rowfromtable.PhuongXa)
    setKhuVuc({value:rowfromtable.KhuVuc,label:rowfromtable.KhuVuc})
    setMaKH(rowfromtable.MaKH)
    }, [rowfromtable]);
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleClose_Xoa = () => {
        fetch(API_URL + '/deluser', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
             
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                MaNV: rowfromtable.MaNV
            })
        })
        parentCallback(rowfromtable.MaNV);
        setOpen(false);
    };
    const handleClose_KhongXoa = () => {
        setOpen(false);
    };

    const sua = () => {
        if (MaNV == "" || MaNV == null || MaNV == undefined) {
            alert("Tên Đăng Nhập Trống")
        } else {
            if (Info == "" || Info == null || Info == undefined) {
                alert("Info Trống")
            } else {
                if (TenNV == "" || TenNV == null || TenNV == undefined) {
                    alert("Tên Khách Hàng Trống")
                } else {
                    if (SDT == "" || SDT == null || SDT == undefined) {
                        alert("SDT Trống")
                    } else {
                        // if (Email == "" || Email == null || Email == undefined) {
                        //     alert("Email Trống")
                        // } else {
                            if (MK == "" || MK == null || MK == undefined) {
                                alert("Password Trống")
                            } else {
                                // if (Cccd == "" || Cccd == null || Cccd == undefined) {
                                //     alert("Cccd Trống")
                                // } else {
                                
                                        if (DiaChi == "" || DiaChi == null || DiaChi == undefined) {
                                            alert("Địa Chỉ Trống")
                                        } else {
                                            if (KhuVuc.value == "" || KhuVuc.value == null || KhuVuc.value == undefined) {
                                                alert("Khu Vực Trống")
                                            } else {
                                                if (MaKH == "" || MaKH == null || MaKH == undefined) {
                                                    alert("Mã KH Trống")
                                                } else {
                                                    //done
                                                    //CAI KHUVUC phải là KhuVuc.value  'redline'
                                                    var CapNhat = { MaNV:SDT, Info, TenNV, SDT, Email,MK:md5(MK),Cccd,DiaChi,PhuongXa,KhuVuc:KhuVuc.value, MaKH }
                                                    fetch(API_URL + '/fixuser', {
                                                        method: 'POST',
                                                        headers: {
                                                            Accept: 'application/json',
                                                            'Content-Type': 'application/json'
                                                        },
                                                        body: JSON.stringify({
                                                            sermangitem: CapNhat,
                                                            MaNV: MaNV
                                                        })
                                                    })
                                                    parentCallback(rowfromtable.MaNV);
                                                }
                                            }
                                        }
                                    
                           // }
                            }
                        //}
                    }
                }
            }
        }
    }
    return (
        <div style={{ width: '80%', marginTop: 5 }}>
            <div style={{ display: 'flex', flexDirection: 'row', background: "#f2f2f2", borderRadius: '5px', flexWrap: 'wrap', width: '80%', }}>
                <div style={{ width: '45%', padding: '10px' }}>
                    <div>
                        <label><b>Tên Đăng Nhập</b></label><br></br>
                        <input
                            className="ip_mh"
                            disabled
                            type="text"
                            value={MaNV}
                            onChange={text => { setMaNV(text.target.value) }}
                            placeholder="Nhập Mã Khách Hàng">
                        </input>
                    </div>
                    <div>
                        <label><b>Info</b></label><br></br>
                        <input
                            className='ip_nhomhang'
                            type="text"
                            value={Info}
                            onChange={text => { setInfo(text.target.value) }}
                            placeholder="Nhập Info">
                        </input>
                    </div>
                    <div>
                        <label><b>Tên Khách Hàng</b></label><br></br>
                        <input
                            className="ip_mh"
                            type="text"
                            value={TenNV}
                            onChange={text => { setTenNV(text.target.value) }}
                            placeholder="Nhập Tên Khách Hàng">
                        </input>
                    </div>
                    <div>
                        <label><b>SDT</b></label><br></br>
                        <input
                            className="ip_tenhang"
                            type="text"
                            value={SDT}
                            onChange={text => { setSDT(text.target.value) }}
                            placeholder="Nhập SDT">
                        </input>
                    </div>
                    <div>
                        <label><b>Email</b></label><br></br>
                        <input
                            className='ip_sodk'
                            type="text"
                            value={Email}
                            onChange={text => { setEmail(text.target.value) }}
                            placeholder="Nhập email">
                        </input>
                    </div>
                </div>
                <div style={{ width: '45%', padding: '10px' }}>
                    <div>
                        <label><b>Mật Khẩu</b></label><br></br>
                        <input
                            className='ip_hoatchat'
                            type="text"
                            value={MK}
                            onChange={text => { setMK(text.target.value) }}
                            placeholder="Nhập Mật Khẩu">
                        </input>
                    </div>
                    <div>
                        <label><b>CCCD</b></label><br></br>
                        <input
                            className='ip_hamluong'
                            type="text"
                            value={Cccd}
                            onChange={text => { setCccd(text.target.value) }}
                            placeholder="Nhập CCCD">
                        </input>
                    </div>
                  
                    <div>
                        <label><b>Địa Chỉ</b></label><br></br>
                        <input
                            className='ip_nuocsx'
                            type="text"
                            value={DiaChi}
                            onChange={text => { setDiaChi(text.target.value) }}
                            placeholder="Nhập Địa Chỉ">
                        </input>
                    </div>
                    <div>
                        <label><b>Phường /xã</b></label><br></br>
                        <input
                            className='ip_nuocsx'
                            type="text"
                            value={PhuongXa}
                            onChange={text => { setPhuongXa(text.target.value) }}
                            placeholder="Nhập Phường /xã">
                        </input>
                    </div>
                    <div>
                        <label><b>Khu Vực</b></label><br></br>
                        <Select
                                id="input1"
                                value={KhuVuc}
                                onChange={(text) => { setKhuVuc(text) }}
                                options={options}
                                placeholder="Chọn khu vực"
                                maxMenuHeight={250}
                            />
                    </div>
                    <div style={{marginTop:8}}>
                        <label><b>Mã Khách Hàng</b></label><br></br>
                        <input
                            className='ip_giaban'
                            type="text"
                            disabled
                            value={MaKH}
                            onChange={text => { setMaKH(text.target.value) }}
                            placeholder="Nhập Mã Khách Hàng">
                        </input>
                    </div>
                </div>
                
            </div>
            <input className="submit" type="submit" value="LƯU USER" onClick={sua} style={{ width: '10%', padding: '15px', marginRight: '5px' }}></input>
            <input className="submit" type="submit" value="XÓA USER" onClick={handleClickOpen} style={{ width: '10%', padding: '15px', background: 'red' }}></input>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>
                    <div style={{ textAlign: 'center' }}>
                        <div className='GH_DialogTitle'>
                            <p style={{ alignItems: 'center', fontSize: '3.75em', margin: '0' }}>!</p>
                        </div>
                        <p className='GH_XinXacNhan'>Xin xác nhận</p>
                        Xác nhận xóa Khách Hàng tên: {rowfromtable.TenNV}, có mã là: {rowfromtable.MaNV}!
                    </div>
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose_KhongXoa} color="primary" style={{ padding: '6px 16px', backgroundColor: 'rgb(255, 193, 7)', borderRadius: '8px', color: 'rgb(0, 0, 0)', width: '30%', margin: '15px' }}>
                        Không Xóa
                    </Button>
                    <Button onClick={handleClose_Xoa} color="primary" style={{ padding: '6px 16px', backgroundColor: 'rgb(0, 171, 85)', borderRadius: '8px', color: 'white', width: '30%', margin: '15px' }}>
                        Đồng Ý
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}