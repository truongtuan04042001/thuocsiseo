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
    const [Id, setId] = useState(0);
    const [dk, setDk] = useState(0);
    const [tenqua, setTenqua] = useState("");
    const [thoihan, setThoihan] = useState(0);
    const [loaikm, setLoaikm] = useState("");
    const [Url, setUrl] = useState("");
    const [status, setStatus] = useState(1);
    const options_km = [
        { value: 'Tiền', label: 'Tiền' },
        { value: 'Quà', label: 'Quà' },

    ];
    useEffect(() => {
        setId(rowfromtable.Id)
        setDk(rowfromtable.DieuKien)
        setTenqua(rowfromtable.TenQua)
        setUrl(rowfromtable.LinkVoucher)
        setStatus(rowfromtable.Status)
        //setLoaikm(rowfromtable.LoaiKM)
        let targetDate = new Date();

        let futureDate = new Date(rowfromtable.ThoiHan)
        var difference = Math.abs(futureDate.getDate() - targetDate.getDate());
        // let days = difference/(1000 * 3600 * 24)
        setThoihan(difference)

    }, [rowfromtable]);
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    //biến cho upload file
    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };
    //hàm upload image
    const handleSubmission = async () => {
        console.log("hola")
        const formData = new FormData();
        formData.append('imagevcdevice', selectedFile);
        await fetch(
            API_URL + "/uploadimgvcdevice/" + tenqua + "/" + Id,
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
        fetch(API_URL + '/xoachuongtrinhkm', {
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


        if (dk == 0 || dk == null || dk == undefined) {
            alert("Điều kiện nhận thưởng trống")
        } else {
            if (tenqua == "" || tenqua == null || tenqua == undefined) {
                alert("Tên quà tặng trống")
            } else {
                if (thoihan == 0 || thoihan == null || thoihan == undefined) {
                    alert("Thời hạn nhận thưởng trống")
                } else {
                    if (loaikm == "" || loaikm == null || loaikm == undefined) {
                        alert("Loại khuyến mãi trống")
                    } else {
                        if (Url == "" || Url == null || Url == undefined) {
                            alert("Link hình voucher trống")
                        } else {
                            if (loaikm.value == "Tiền") {
                                if (!isNaN(tenqua)) {

                                    var targetDate = new Date();
                                    targetDate.setDate(targetDate.getDate() + (thoihan * 1));
                                    var dd = targetDate.getDate();
                                    var mm = targetDate.getMonth() + 1;
                                    var yyyy = targetDate.getFullYear();
                                    var date = yyyy + '-' + mm + '-' + dd;

                                    fetch(API_URL + '/suachuongtrinhkm', {
                                        method: 'POST',
                                        headers: {
                                            Accept: 'application/json',

                                            'Content-Type': 'application/json'
                                        },

                                        body: JSON.stringify({
                                            id: Id,
                                            DieuKien: dk,
                                            TenQua: tenqua,
                                            ThoiHan: date,
                                            LinkVoucher: Url,
                                            Status: status,
                                            LoaiKM: loaikm.value
                                        })
                                    })
                                    parentCallback(dk);
                                    setOpen(false);
                                } else {
                                    alert("Loại khuyến mãi là Tiền nên giá trị thưởng phải là số")
                                }
                            } else {

                                if (isNaN(tenqua)) {
                                    var targetDate = new Date();
                                    targetDate.setDate(targetDate.getDate() + (thoihan * 1));
                                    var dd = targetDate.getDate();
                                    var mm = targetDate.getMonth() + 1;
                                    var yyyy = targetDate.getFullYear();
                                    var date = yyyy + '-' + mm + '-' + dd;

                                    fetch(API_URL + '/suachuongtrinhkm', {
                                        method: 'POST',
                                        headers: {
                                            Accept: 'application/json',

                                            'Content-Type': 'application/json'
                                        },

                                        body: JSON.stringify({
                                            id: Id,
                                            DieuKien: dk,
                                            TenQua: tenqua,
                                            ThoiHan: date,
                                            Status: status,
                                            LinkVoucher: Url,
                                            LoaiKM: loaikm.value
                                        })
                                    })
                                    parentCallback(dk);
                                    setOpen(false);
                                } else {
                                    alert("Loại khuyến mãi là Quà nên giá trị thưởng phải là chữ")
                                }
                            }


                        }
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
                        <label><b>Điều kiện nhận thưởng</b></label><br></br>
                        <input
                            className="ip_mh"
                            type="number"
                            value={dk}
                            onChange={text => { setDk(text.target.value) }}
                            placeholder="Nhập tên banner">
                        </input>

                    </div>
                    <div>
                        <label><b>Tên quà tặng/Tiền km</b></label><br></br>
                        <input
                            className="ip_tenhang"
                            type="text"
                            value={tenqua}
                            onChange={text => { setTenqua(text.target.value) }}
                            placeholder="Nhập Tên quà tặng">
                        </input>
                    </div>
                    <div>
                        <label><b>Thời hạn của quà (Theo Ngày)</b></label><br></br>
                        <input
                            className="ip_tenhang"
                            type="number"
                            value={thoihan}
                            onChange={text => { setThoihan(text.target.value) }}
                            placeholder="Nhập thời hạn của quà tặng">
                        </input>
                    </div>
                    <div>
                        <label><b>Trạng thái km (0 = unactive,1 = active)</b></label><br></br>
                        <input
                            className="ip_tenhang"
                            type="number"
                            value={status}
                            onChange={text => { setStatus(text.target.value) }}
                            placeholder="Nhập Trạng thái km">
                        </input>
                    </div>
                    
                </div>
                <div style={{ width: '45%', padding: '10px' }}>
                <div>
                        <label><b>Loại khuyến mãi</b></label><br></br>
                        <Select
                            id="select1"
                            value={loaikm}
                            onChange={(text) => { setLoaikm(text) }}
                            options={options_km}
                            placeholder="Chọn loại khuyến mãi"
                            maxMenuHeight={145}
                        />
                    </div>
                    <div>
                        <label><b>Link hình voucher</b></label><br></br>
                        <input
                            className="ip_tenhang"
                            type="text"
                            value={Url}
                            onChange={text => { setUrl(text.target.value) }}
                            placeholder="Nhập link hình voucher">
                        </input>
                    </div>
                    <div >
                        <input type="file" enctype="multipart/form-data" onChange={changeHandler} style={{ width: '60%', fontWeight: 'bold', fontSize: 18, padding: 5, backgroundColor: '#fff' }} />
                        <button className="btn-thongke1" onClick={handleSubmission} style={{backgroundColor:'#2de183'}}>Submit</button>
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