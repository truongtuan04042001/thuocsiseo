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
    const [Gia, setGia] = useState();
    const [Diem, setDiem] = useState();
    
    useEffect(() => {
        setId(rowfromtable.Id)
        setGia(rowfromtable.Gia)
        setDiem(rowfromtable.Diem)
   
    }, [rowfromtable]);
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleClose_Xoa = () => {
        fetch(API_URL + '/xoadiem', {
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
      
        if (Gia == "" || Gia == null || Gia == undefined) {
            alert("Giá Trống")
        } else {
            if (Diem == "" || Diem == null || Diem == undefined) {
                alert("Điểm Trống")
            } else{
                fetch(API_URL + '/suadiem', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                     
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: rowfromtable.Id,
                        gia: Gia,
                        diem: Diem
                    })
                })
                parentCallback(Gia);
                setOpen(false);
            }
        }
    }
    return (
        <div style={{ width: '80%', marginTop: 5 }}>
            <div style={{ display: 'flex', flexDirection: 'row', background: "#f2f2f2", borderRadius: '5px', flexWrap: 'wrap', width: '80%', }}>
                <div style={{ width: '45%', padding: '10px' }}>
                <div>
                                <label><b>Tiền giảm giá</b></label><br></br>
                                <input
                                    className="ip_mh"
                                    type="number"
                                    value={Gia}
                                    onChange={text => { setGia(text.target.value) }}
                                    placeholder="Nhập Tiền giảm giá">
                                </input>
                            </div>
                            <div>
                                <label><b>Điểm tích lũy</b></label><br></br>
                                <input
                                    className="ip_tenhang"
                                    type="number"
                                    value={Diem}
                                    onChange={text => { setDiem(text.target.value) }}
                                    placeholder="Nhập Điểm tích lũy">
                                </input>
                            </div>

                
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