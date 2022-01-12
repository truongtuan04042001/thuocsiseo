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
    const [Id, setId] = useState();
    const [Ten, setTen] = useState();

    
    useEffect(() => {
        setId(rowfromtable.Id)
        setTen(rowfromtable.TenQuaTang)
    
   
    }, [rowfromtable]);
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleClose_Xoa = () => {
        fetch(API_URL + '/xoaqua', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
             
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: rowfromtable.Id
            })
        })
        parentCallback(rowfromtable.Id);
        setOpen(false);
    };
    const handleClose_KhongXoa = () => {
        setOpen(false);
    };

    const sua = () => {
      
        if (Ten == "" || Ten == null || Ten == undefined) {
            alert("Tên Trống")
        } else {
           
                fetch(API_URL + '/suaqua', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                     
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: rowfromtable.Id,
                        ten: Ten
                    })
                })
                parentCallback(Ten);
                setOpen(false);
            
        }
    }
    return (
        <div style={{ width: '80%', marginTop: 5 }}>
            <div style={{ display: 'flex', flexDirection: 'row', background: "#f2f2f2", borderRadius: '5px', flexWrap: 'wrap', width: '80%', }}>
                <div style={{ width: '45%', padding: '10px' }}>
                <div>
                                <label><b>Tên quà tặng cho người mới</b></label><br></br>
                                <input
                                    className="ip_mh"
                                    type="text"
                                    value={Ten}
                                    onChange={text => { setTen(text.target.value) }}
                                    placeholder="Vui Lòng Tên quà tặng cho người mới">
                                </input>
                            </div>
                            {/* <div>
                                <label><b>Điểm</b></label><br></br>
                                <input
                                    className="ip_tenhang"
                                    type="text"
                                    value={Diem}
                                    onChange={text => { setDiem(text.target.value) }}
                                    placeholder="Nhập Điểm">
                                </input>
                            </div> */}

                
            </div>
            </div>
            <input className="submit" type="submit" value="LƯU" onClick={sua} style={{ width: '10%', padding: '15px', marginRight: '5px' }}></input>
            <input className="submit" type="submit" value="XÓA" onClick={handleClickOpen} style={{ width: '10%', padding: '15px', background: 'red' }}></input>
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
                        Xác nhận xóa
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