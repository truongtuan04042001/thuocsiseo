import { useEffect, useState } from 'react';
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { API_URL } from '../constants/constants'
import '../css/themsp.css'
import { Link } from 'react-router-dom';

export default ({ rowfromtable, parentCallback, tenNV }) => {
    const [loaihang, setLoaiHang] = useState();
    const [nhomhang, setNhomHang] = useState();
    const [nhanhhang, setNhanhHang] = useState();
    const [mahang, setMaHang] = useState();
    const [tenhang, setTenHang] = useState();
    const [sodk, setSoDangKy] = useState();
    const [hoatchat, setHoatChat] = useState();
    const [hamluong, setHamLuong] = useState();
    const [hangsx, setHangSX] = useState();
    const [nuocsx, setNuocSX] = useState();
    const [quycachdonggoi, setQuyCachDongGoi] = useState();
    const [giaban, setGiaBan] = useState();
    const [giavon, setGiaVon] = useState();
    const [donvitinh, setDonViTinh] = useState();
    const [hinhanh, setHinhAnh] = useState();
    const [mota, setMoTa] = useState();
    const [tempprice, setTempprice] = useState();

    useEffect(() => {
        setLoaiHang(rowfromtable.LoaiHang)
        setNhomHang(rowfromtable.NhomHang)
        setNhanhHang(rowfromtable.NhanhHang)
        setMaHang(rowfromtable.MaHang)
        setTenHang(rowfromtable.TenHang)
        setSoDangKy(rowfromtable.SoDangKy)
        setHoatChat(rowfromtable.HoatChat)
        setHamLuong(rowfromtable.HamLuong)
        setHangSX(rowfromtable.HangSX)
        setNuocSX(rowfromtable.NuocSX)
        setQuyCachDongGoi(rowfromtable.QCDG)
        setGiaBan(rowfromtable.GiaBan)
        setGiaVon(rowfromtable.GiaVon)
        setDonViTinh(rowfromtable.DVT)
        setHinhAnh(rowfromtable.HinhAnh)
        setMoTa(rowfromtable.MoTa)
        setTempprice(rowfromtable.GiaBan)
    }, [rowfromtable]);

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [change, setChange] = useState([]);

    //biến cho upload file
    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };
    //hàm upload image
    const handleSubmission = async () => {
        console.log("hola")
        const formData = new FormData();
        formData.append('imagedevice', selectedFile);
        await fetch(
            API_URL + "/uploadimgdevice/" + mahang,
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
    //end hàm update bằng excel
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleClose_Xoa = () => {
        fetch(API_URL + '/xoasanpham_theoMaHang', {
            method: 'POST',
            headers: {
                Accept: 'application/json',

                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sermahang: rowfromtable.MaHang
            })
        })
        parentCallback(rowfromtable.MaHang);
        setOpen(false);
    };
    const handleClose_KhongXoa = () => {
        setOpen(false);
    };

    const sua = () => {
        if (loaihang == "" || loaihang == null || loaihang == undefined) {
            alert("Loại Hàng Trống")
        } else {
            if (nhomhang == "" || nhomhang == null || nhomhang == undefined) {
                alert("Nhóm Hàng Trống")
            } else {
                if (mahang == "" || mahang == null || mahang == undefined) {
                    alert("Mã Hàng Trống")
                } else {
                    if (tenhang == "" || tenhang == null || tenhang == undefined) {
                        alert("Tên Hàng Trống")
                    } else {
                        if (sodk == "" || sodk == null || sodk == undefined) {
                            alert("Số Đăng Kí Trống")
                        } else {
                            if (hoatchat == "" || hoatchat == null || hoatchat == undefined) {
                                alert("Hoạt Chất Trống")
                            } else {
                                if (hamluong == "" || hamluong == null || hamluong == undefined) {
                                    alert("Hàm Lượng Trống")
                                } else {
                                    if (hangsx == "" || hangsx == null || hangsx == undefined) {
                                        alert("Hãng Sản Xuất Trống")
                                    } else {
                                        if (nuocsx == "" || nuocsx == null || nuocsx == undefined) {
                                            alert("Nước Sản Xuất Trống")
                                        } else {
                                            if (quycachdonggoi == "" || quycachdonggoi == null || quycachdonggoi == undefined) {
                                                alert("Quy Cách Đóng Gói Trống")
                                            } else {
                                                if (giaban == "" || giaban == null || giaban == undefined) {
                                                    alert("Giá Bán Trống")
                                                } else {
                                                    if (giavon == "" || giavon == null || giavon == undefined) {
                                                        alert("Giá Vốn Trống")
                                                    } else {
                                                        if (donvitinh == "" || donvitinh == null || donvitinh == undefined) {
                                                            alert("Đơn Vị Tính Trống")
                                                        } else {
                                                            var CapNhat = { loaihang, nhomhang, nhanhhang, mahang, tenhang, SoDangKy: sodk, hoatchat, hamluong, hangsx, nuocsx, QCDG: quycachdonggoi, giaban, giavon, DVT: donvitinh, hinhanh, mota }
                                                            fetch(API_URL + '/suasanpham', {
                                                                method: 'POST',
                                                                headers: {
                                                                    Accept: 'application/json',

                                                                    'Content-Type': 'application/json'
                                                                },
                                                                body: JSON.stringify({
                                                                    sermangitem: CapNhat,
                                                                    sermahang: mahang
                                                                })
                                                            })
                                                            ///////////
                                                            if (tempprice != giaban) {
                                                                const date = new Date();
                                                                const ngay7 = date.getDate()
                                                                const thang7 = date.getMonth() + 1
                                                                const nam7 = date.getFullYear()
                                                                const gio7 = date.getHours()
                                                                const phut7 = date.getMinutes()

                                                                let logstring = ngay7 + "-" + thang7 + "-" + nam7 + " - " + gio7 + ":" + phut7 + " - Mã sp: " + mahang + " - Người xử lý :" + tenNV + " - dg1: " + tempprice + " - dg2: " + giaban;

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
                                                            }

                                                            ////////////
                                                            parentCallback(rowfromtable.MaHang);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    const UpdateImgDevice = () => {
        fetch(API_URL + '/uploadimgdevice', {
            method: 'POST',
            headers: {
                Accept: 'application/json',

                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sermahang: mahang
            })
        })
    };
    return (
        <div style={{ width: '80%', marginTop: 5 }}>
            <div style={{ display: 'flex', flexDirection: 'row', background: "#f2f2f2", borderRadius: '5px', flexWrap: 'wrap', width: '80%', }}>
                <div style={{ width: '30%', padding: '10px' }}>
                    <div>
                        <label><b>Loại Hàng</b></label><br></br>
                        <input
                            className="ip_mh"
                            type="text"
                            value={loaihang}
                            onChange={text => { setLoaiHang(text.target.value) }}
                            placeholder="Nhập Loại hàng">
                        </input>
                    </div>
                    <div>
                        <label><b>Nhóm Hàng</b></label><br></br>
                        <input
                            className='ip_nhomhang'
                            type="text"
                            value={nhomhang}
                            onChange={text => { setNhomHang(text.target.value) }}
                            placeholder="Nhập Nhóm Hàng">
                        </input>
                    </div>
                    <div>
                        <label><b>Nhánh Hàng</b></label><br></br>
                        <input
                            className='ip_nhomhang'
                            type="text"
                            value={nhanhhang}
                            onChange={text => { setNhanhHang(text.target.value) }}
                            placeholder="Nhập Nhánh Hàng">
                        </input>
                    </div>
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
                            type="text"
                            value={tenhang}
                            onChange={text => { setTenHang(text.target.value) }}
                            placeholder="Nhập tên hàng">
                        </input>
                    </div>
                    <div>
                        <label><b>Số Đăng Ký</b></label><br></br>
                        <input
                            className='ip_sodk'
                            type="text"
                            value={sodk}
                            onChange={text => { setSoDangKy(text.target.value) }}
                            placeholder="Nhập số đăng ký">
                        </input>
                    </div>
                    <div>
                        <label><b>Đơn Vị Tính</b></label><br></br>
                        <input
                            className='ip_dvt'
                            type="text"
                            value={donvitinh}
                            onChange={text => { setDonViTinh(text.target.value) }}
                            placeholder="Nhập đơn vị tính">
                        </input>
                    </div>
                </div>
                <div style={{ width: '35%', padding: '10px' }}>
                    <div>
                        <label><b>Hoạt Chất</b></label><br></br>
                        <input
                            className='ip_hoatchat'
                            type="text"
                            value={hoatchat}
                            onChange={text => { setHoatChat(text.target.value) }}
                            placeholder="Nhập hoạt chất">
                        </input>
                    </div>
                    <div>
                        <label><b>Hàm Lượng</b></label><br></br>
                        <input
                            className='ip_hamluong'
                            type="text"
                            value={hamluong}
                            onChange={text => { setHamLuong(text.target.value) }}
                            placeholder="Nhập hàm lượng">
                        </input>
                    </div>
                    <div>
                        <label><b>Hãng Sản Xuất</b></label><br></br>
                        <input
                            className='ip_hangsx'
                            type="text"
                            value={hangsx}
                            onChange={text => { setHangSX(text.target.value) }}
                            placeholder="Nhập hãng sản xuất">
                        </input>
                    </div>
                    <div>
                        <label><b>Nước Sản Xuất</b></label><br></br>
                        <input
                            className='ip_nuocsx'
                            type="text"
                            value={nuocsx}
                            onChange={text => { setNuocSX(text.target.value) }}
                            placeholder="Nhập nước sản xuất">
                        </input>
                    </div>

                    <div>
                        <label><b>Quy Cách Đóng Gói</b></label><br></br>
                        <input
                            className='ip_quycachdonggoi'
                            type="text"
                            value={quycachdonggoi}
                            onChange={text => { setQuyCachDongGoi(text.target.value) }}
                            placeholder="Nhập quy cách đóng gói">
                        </input>
                    </div>
                    <div>
                        <label><b>Hình Ảnh</b></label><br></br>
                        <input
                            className='ip_image'
                            type="text"
                            value={hinhanh}
                            onChange={text => { setHinhAnh(text.target.value) }}
                            placeholder="Nhập hình ảnh">
                        </input>
                    </div>
                    <div >
                        <input type="file" enctype="multipart/form-data" onChange={changeHandler} style={{ width: '60%', fontWeight: 'bold', fontSize: 18, padding: 5, backgroundColor: '#fff' }} />
                        <button className="btn-thongke1" style={{backgroundColor:'#2DE183'}} onClick={handleSubmission}>Submit</button>
                    </div>
                </div>
                <div style={{ width: '30%', padding: '10px' }}>
                    <div>
                        <label><b>Giá Bán</b></label><br></br>
                        <input
                            className='ip_giaban'
                            type="text"
                            value={giaban}
                            onChange={text => { setGiaBan(text.target.value) }}
                            placeholder="Nhập giá bán">
                        </input>
                    </div>
                    <div>
                        <label><b>Giá Vốn</b></label><br></br>
                        <input
                            className='ip_giavon'
                            type="text"
                            value={giavon}
                            onChange={text => { setGiaVon(text.target.value) }}
                            placeholder="Nhập giá vốn">
                        </input>
                    </div>

                    <div>
                        <label><b></b></label><br></br>
                        {/* <textarea
                            className='ip_mota'
                            type="textarea"
                            value={mota}
                            onChange={text => { setMoTa(text.target.value) }}
                            placeholder="Nhập mô tả">
                        </textarea> */}
                        <Link to={{
                            pathname: '/editor',
                            item: { mahang: mahang, tenhang: tenhang, mota: mota },
                        }}
                            className="btn_ttk">
                            Cập nhật mô tả
                        </Link>
                    </div>
                </div>
            </div>
            <input className="submit" type="submit" value="SỬA SẢN PHẨM" onClick={sua} style={{ width: '10%', padding: '15px', marginRight: '5px' }}></input>
            <input className="submit" type="submit" value="XÓA SẢN PHẨM" onClick={handleClickOpen} style={{ width: '10%', padding: '15px', background: 'red' }}></input>
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
                        Xác nhận xóa sản phẩm tên: {rowfromtable.TenHang}, có mã hàng là: {rowfromtable.MaHang}!
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