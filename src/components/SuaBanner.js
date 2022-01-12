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
    const [Url, setUrl] = useState();

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    useEffect(() => {
        setId(rowfromtable.Id)
        setTen(rowfromtable.TenBanner)
        setUrl(rowfromtable.original)
    
   
    }, [rowfromtable]);
      //biến cho upload file
      const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };
    //hàm upload image
    const handleSubmission = async () => {
        console.log("hola")
        const formData = new FormData();
        formData.append('imagebndevice', selectedFile);
        await fetch(
            API_URL + "/uploadimgbndevice/" + Ten +"/" + Id,
            {
                method: 'POST',
                body: formData,
                headers: {

                }
            }
        )
            .then((response) => response.json())
            .then((result) => {

                parentCallback(rowfromtable.MaHang);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    ////////////
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleClose_Xoa = () => {
        fetch(API_URL + '/xoaBanner', {
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
      
        if (Ten== "" || Ten == null || Ten == undefined) {
            alert("Tên Banner trống")
        }else{ 
             if (Url== "" || Url == null || Url == undefined) {
            alert("Url Banner trống")
        }else{
                fetch(API_URL + '/suaBanner', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                     
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id:Id,
                        TenBanner: Ten,
                        original:Url
                    
                    })
                })
                parentCallback(Ten);
                setOpen(false);
        }
            
        }
    }
    return (
        <div style={{ width: '80%', marginTop: 5 }}>
            <div style={{ display: 'flex', flexDirection: 'row', background: "#f2f2f2", borderRadius: '5px', flexWrap: 'wrap', width: '80%', }}>
                <div style={{ width: '45%', padding: '10px' }}>
                <div>
                                <label><b>Tên banner</b></label><br></br>
                                <input
                                    className="ip_mh"
                                    type="text"
                                    value={Ten}
                                    onChange={text => { setTen(text.target.value) }}
                                    placeholder="Nhập tên banner">
                                </input>
                                
                            </div>
                            <div>
                                <label><b>Link hình banner</b></label><br></br>
                                <input
                                    className="ip_tenhang"
                                    type="text"
                                    value={Url}
                                    onChange={text => { setUrl(text.target.value) }}
                                    placeholder="Nhập link hình banner">
                                </input>
                            </div>
                            <div >
                        <input type="file" enctype="multipart/form-data" onChange={changeHandler} style={{ width: '60%', fontWeight: 'bold', fontSize: 18, padding: 5, backgroundColor: '#fff' }} />
                        <button className="btn-thongke1" style={{backgroundColor:'#2DE183'}} onClick={handleSubmission}>Submit</button>
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