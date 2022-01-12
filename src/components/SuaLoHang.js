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
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

export default ({ rowfromtable, parentCallback }) => {

    const [idSTT, setIdSTT] = useState(0)
    const [maHang, setMaHang] = useState()
    const [tenHang, setTenHang] = useState()
    const [soLuong, setSoLuong] = useState(0)
    const [donGia, setDonGia] = useState(0)
    const [dVT, setDVT] = useState()
    const [maLH, setMaLH] = useState()
    const [tenncc, setTenNCC] = useState('')
    const [sdt, setSDT] = useState('')
    const [tentk, setTenTK] = useState()
    const [sotk, setSoTK] = useState('')
    const [tennh, setTenNH] = useState('')
    const [hanSD, setHanSD] = useState('2023/12/01')
    const [ghiChu, setGhiChu] = useState()

    useEffect(async () => {
        console.log(`${new Date().getTime()} rowfromtable=`, rowfromtable)
        setIdSTT(rowfromtable.IdSTT)
        setMaHang(rowfromtable.MaHang)
        setTenHang(rowfromtable.TenHang)
        setSoLuong(rowfromtable.SoLuong)
        setDonGia(rowfromtable.DonGia)
        setDVT(rowfromtable.DVT)
        setMaLH(rowfromtable.MaLH)
        setHanSD(rowfromtable.HanSD)
        setGhiChu(rowfromtable.GhiChu)
        setTenNCC(rowfromtable.TenNCC)
        setSDT(rowfromtable.SDT)
        setTenTK(rowfromtable.TenTK)
        setSoTK(rowfromtable.SoTK)
        setTenNH(rowfromtable.TenNH)

        // thêm gợi ý sđt nhà cung cấp
        // await fetch(API_URL + '/getSuggestSDTNCC', {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({})
        // })
        //     .then((response) => response.json())
        //     .then(data => {
        //         setInput2(data)
        //     });
    }, [rowfromtable]);

    const [open, setOpen] = React.useState(false);
    const [open3, setOpen3] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClose3 = () => {
        setOpen3(false);
    };

    const handleClose_KhongXoa2 = () => {
        setHanSD('')
        setOpen3(false);
    };

    const testKey4 = (e) => {
        if (e.code === "Enter") {
            handleClose_Xoa2()
        }
    }

    const testKey3 = (e) => {
        if (e.code === "Enter") {
            handleClose_Xoa()
        }
    }

    const testKey2 = (e) => {
        if (e.code === "Enter") {
            suaChiTietLoHang()
        }
    }

    const handleClose_Xoa2 = async () => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                MaHang: maHang,
                TenHang: tenHang,
                SoLuong: parseInt(soLuong),
                DonGia: parseFloat(donGia),
                DVT: dVT,
                MaLH: maLH,
                HanSD: hanSD,
                GhiChu: ghiChu,
                TenNCC: tenncc,
                SDT: sdt,
                TenTK: tentk,
                SoTK: sotk,
                TenNH: tennh,
            })
        }
        if (idSTT !== undefined) {
            await fetch(API_URL + "/chiTiet1SPTheoMaSanPhamVaMaLoHang/" + idSTT, requestOptions).then(response => response.json()).then(data => { })
            const rand = Math.random(2) * 1000
            parentCallback(rand);
        } else {
            alert("Lỗi lấy id của lô hạn")
        }
    };

    const handleClose_Xoa = async () => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                MaHang: maHang
            })
        }
        if (idSTT !== undefined) {
            await fetch(API_URL + "/chiTiet1SPTheoMaSanPhamVaMaLoHang/" + idSTT, requestOptions).then(response => response.json()).then(data => { })
            const rand = Math.random(2) * 1000
            parentCallback(rand);
            setOpen(false);
        } else {
            alert("Lỗi lấy id của lô hạn")
        }
    };

    const handleClose_KhongXoa = () => {
        setOpen(false);
    };

    const suaChiTietLoHang = async () => {
        if (maHang == "" || maHang == null || maHang == undefined) {
            alert("Mã hàng trống")
        } else {
            if (tenHang == "" || tenHang == null || tenHang == undefined) {
                alert("Tên hàng trống")
            } else {
                if (soLuong < 0) {
                    alert("Số lượng phải lớn hơn -1")
                }
                else {
                    if (donGia == "" || donGia == null || donGia == undefined) {
                        alert("Đơn giá")
                    }
                    else {
                        if (dVT == "" || dVT == null || dVT == undefined) {
                            alert("Đơn vị tính trống")
                        }
                        else {
                            if (maLH == "" || maLH == null || maLH == undefined) {
                                alert("Mã lô hàng trống")
                            }
                            else {
                                if (sdt.length < 10) {
                                    alert('Số điện thoại trống')
                                } else {
                                    // full dd/MM/yyyy lọc cả tháng 2 nhưng không thể gõ d/M/yyyy
                                    // const regexDate = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|(([1][26]|[2468][048]|[3579][26])00))))$/g
                                    const regexDate = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
                                    if (hanSD == "" || hanSD == null || hanSD == undefined || !regexDate.test(hanSD)) {
                                        alert("Hạn sử dụng trống hoặc sai định dạng")
                                    }
                                    else {
                                        let hanSDdate = ""
                                        let checkThang2 = ""
                                        if (hanSD.indexOf("/") > 0) {
                                            const data = hanSD.split("/")
                                            let ngay = data[0]
                                            if (ngay.length == 1) {
                                                ngay = "0" + ngay
                                            }
                                            if (parseInt(ngay) > 31) {
                                                ngay = 10
                                            }
                                            let thang = data[1]
                                            if (thang.length == 1) {
                                                thang = "0" + thang
                                            }
                                            if (parseInt(thang) > 12) {
                                                thang = 12
                                            }
                                            const nam = data[2]
                                            hanSDdate = nam + "-" + thang + "-" + ngay
                                            checkThang2 = ngay + "/" + thang + "/" + nam
                                        } else if (hanSD.indexOf("-") > 0) {
                                            const data = hanSD.split("-")
                                            let ngay = data[0]
                                            if (ngay.length == 1) {
                                                ngay = "0" + ngay
                                            }
                                            if (parseInt(ngay) > 31) {
                                                ngay = 10
                                            }
                                            let thang = data[1]
                                            if (thang.length == 1) {
                                                thang = "0" + thang
                                            }
                                            if (parseInt(thang) > 12) {
                                                thang = 12
                                            }
                                            const nam = data[2]
                                            hanSDdate = nam + "-" + thang + "-" + ngay
                                            checkThang2 = ngay + "/" + thang + "/" + nam
                                        } else if (hanSD.indexOf(".") > 0) {
                                            const data = hanSD.split(".")
                                            let ngay = data[0]
                                            if (ngay.length == 1) {
                                                ngay = "0" + ngay
                                            }
                                            if (parseInt(ngay) > 31) {
                                                ngay = 10
                                            }
                                            let thang = data[1]
                                            if (thang.length == 1) {
                                                thang = "0" + thang
                                            }
                                            if (parseInt(thang) > 12) {
                                                thang = 12
                                            }
                                            const nam = data[2]
                                            hanSDdate = nam + "-" + thang + "-" + ngay
                                            checkThang2 = ngay + "/" + thang + "/" + nam
                                        }
                                        // full dd/MM/yyyy lọc cả tháng 2 nhưng không thể gõ d/M/yyyy
                                        const regexDateThang2 = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|(([1][26]|[2468][048]|[3579][26])00))))$/g
                                        if (!regexDateThang2.test(checkThang2)) {
                                            alert("Sai ngày tháng 2 rồi kìa =)))")
                                        } else {
                                            const date = new Date(hanSDdate)
                                            const ngayHienTai = new Date()
                                            if (date <= ngayHienTai) {
                                                alert("Không sửa được. Hạn sử dụng nhỏ hơn hoặc bằng ngày hiện tại")
                                            } else if (date > ngayHienTai && soSanhNgay.inDays(date, ngayHienTai) <= 365) {
                                                // dialog yes no
                                                setHanSD(hanSDdate)
                                                setOpen3(true)
                                            } else {
                                                const requestOptions = {
                                                    method: 'PUT',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({
                                                        MaHang: maHang,
                                                        TenHang: tenHang,
                                                        SoLuong: parseInt(soLuong),
                                                        DonGia: parseFloat(donGia),
                                                        DVT: dVT,
                                                        MaLH: maLH,
                                                        HanSD: hanSDdate,
                                                        TenNCC: tenncc,
                                                        SDT: sdt,
                                                        TenTK: tentk,
                                                        SoTK: sotk,
                                                        TenNH: tennh,
                                                        GhiChu: ghiChu,
                                                    })
                                                }
                                                if (idSTT !== undefined) {
                                                    await fetch(API_URL + "/chiTiet1SPTheoMaSanPhamVaMaLoHang/" + idSTT, requestOptions).then(response => response.json()).then(data => { })
                                                    const rand = Math.random(2) * 1000
                                                    parentCallback(rand);
                                                } else {
                                                    alert("Lỗi lấy id của lô hạn")
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



    // const [input2, setInput2] = useState([]);//mang gợi ý của số điện thoại nhà cung cấp

    // hàm lấy chi tiết nhà cung cấp từ gợi ý số điện thoại nhà cung cấp.
    // const handleSubmit2 = async (event, value) => {
    //     event.preventDefault();
    //     if (value != null || value != undefined) {
    //         const res = await fetch(`${API_URL}/thongTinNCC/${value}`).then(res => res.json())
    //         if (res.length > 0) {
    //             setTenNCC(res[0].TenNCC)
    //             setSDT(res[0].SDT)
    //             setTenTK(res[0].TenTK)
    //             setSoTK(res[0].SoTK)
    //             setTenNH(res[0].TenNH)
    //         } else {
    //             console.log(`${new Date().getTime()} Table_LoHang 787 không tìm thấy nhà cung cấp với sđt nhập vào=`)
    //         }
    //     } else {
    //         setTenNCC('')
    //         setSDT('')
    //         setTenTK('')
    //         setSoTK('')
    //         setTenNH('')
    //     }
    // }

    useEffect(async () => {
        if (sdt.length > 9) {
            const res = await fetch(`${API_URL}/thongTinNCC/${sdt}`).then(res => res.json())
            if (res.length > 0) {
                setTenNCC(res[0].TenNCC)
                setSDT(res[0].SDT)
                setTenTK(res[0].TenTK)
                setSoTK(res[0].SoTK)
                setTenNH(res[0].TenNH)
            }
        }
        // if (sdt.length == 0) {
        //     console.log(`${new Date().getTime()} SuaLoHang 383 không tìm thấy nhà cung cấp với sđt nhập vào=`)
        //     setTenNCC('')
        //     setSDT('')
        //     setTenTK('')
        //     setSoTK('')
        //     setTenNH('')
        // }
    }, [sdt])

    return (
        <div style={{ width: '100%', marginTop: 10 }} onKeyPress={(e) => testKey2(e)} >
            <div style={{ display: 'flex', flexDirection: 'row', background: "#f2f2f2", borderRadius: '5px', maxWidth: '100%', flexWrap: 'wrap', margin: 'auto' }}>
                <div style={{ maxWidth: '25%', padding: '15px', background: '' }}>
                    <form action="">
                        <div>
                            <label><b>Mã hàng</b></label><br></br>
                            <input
                                className="ip_mh"
                                type="text"
                                value={maHang}
                                // onChange={text => { setMaHang(text.target.value) }}
                                placeholder="Nhập mã hàng"
                                disabled
                            >
                            </input>
                        </div>

                        <div>
                            <label><b>Tên hàng</b></label><br></br>
                            <input
                                className='ip_sodk'
                                disabled
                                type="text"
                                value={tenHang}
                                // onChange={text => { setTenHang(text.target.value) }}
                                placeholder="Nhập tên hàng">
                            </input>
                        </div>
                        <div>
                            <label><b>Số lượng</b></label><br></br>
                            <input
                                className="ip_mh"
                                type="number"
                                value={soLuong}
                                onChange={text => { setSoLuong(text.target.value) }}
                                placeholder="Nhập số lượng">
                            </input>
                        </div>

                    </form>
                </div>
                <div style={{ maxWidth: '25%', padding: '15px', background: '' }}>
                    <form action="">
                        <div>
                            <label><b>Đơn giá</b></label><br></br>
                            <input
                                disabled
                                className="ip_tenhang"
                                type="number"
                                value={donGia}
                                // onChange={text => { setDonGia(text.target.value) }}
                                placeholder="Nhập đơn giá">
                            </input>
                        </div>
                        <div>
                            <label><b>Đơn vị tính</b></label><br></br>
                            <input
                                disabled
                                className='ip_sodk'
                                type="text"
                                disabled
                                value={dVT}
                                // onChange={text => { setDVT(text.target.value) }}
                                placeholder="Nhập số đăng ký">
                            </input>
                        </div>
                        <div>
                            <label><b>Mã lô hàng</b></label><br></br>
                            <input
                                // disabled
                                className='ip_hoatchat'
                                type="text"
                                value={maLH}
                                onChange={text => { setMaLH(text.target.value) }}
                                placeholder="Nhập mã lô hàng">
                            </input>
                        </div>
                        <div>
                            <label><b>Hạn sử dụng</b></label><br></br>
                            <input
                                // disabled
                                className='ip_hangsx'
                                type="text"
                                value={hanSD}
                                onChange={text => { setHanSD(text.target.value) }}
                                placeholder="Nhập hạn sử dụng">
                            </input>
                        </div>
                        <div>
                            <label><b>Ghi chú</b></label><br></br>
                            <input
                                className='ip_nuocsx'
                                type="text"
                                value={ghiChu}
                                onChange={text => { setGhiChu(text.target.value) }}
                                placeholder="Nhập ghi chú (không bắt buộc)">
                            </input>
                        </div>
                    </form>
                </div>

                <div style={{ width: '25%', padding: '15px', background: '' }}>
                    <form>
                        <div>
                            <label><b>Tên nhà cung cấp</b></label><br></br>
                            <input
                                className='ip_nuocsx'
                                type="text"
                                value={tenncc}
                                // onChange={text => { setTenNCC(text.target.value) }}
                                disabled
                                placeholder="Nhập Tên nhà cung cấp (không bắt buộc)">
                            </input>
                        </div>
                        <div>
                            {/* <label><b>Số diện thoại</b></label><br>
                            </br>
                            <Autocomplete
                                freeSolo
                                className="input-text121"
                                clearOnEscape
                                clearOnBlur
                                autoComplete
                                options={input2.map((option) => option.value)}
                                onChange={handleSubmit2}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        margin="normal"
                                        aria-label="enter search"
                                        name="search"
                                        className='bodi'
                                        placeholder="Nhập số diện thoại"
                                    // No need to check the onChange here
                                    />
                                )}>
                            </Autocomplete> */}
                            <label><b>Số diện thoại</b></label><br></br>
                            <input
                                className='ip_nuocsx'
                                type="number"
                                value={sdt}
                                onChange={text => { setSDT(text.target.value) }}
                                placeholder="Nhập Số diện thoại (không bắt buộc)">
                            </input>
                        </div>
                        <div>
                            <label><b>Tên tài khoản</b></label><br></br>
                            <input
                                className='ip_nuocsx'
                                type="text"
                                value={tentk}
                                // onChange={text => { setTenTK(text.target.value) }}
                                disabled
                                placeholder="Nhập Tên tài khoản (không bắt buộc)">
                            </input>
                        </div>
                        <div>
                            <label><b>Số tài khoản</b></label><br></br>
                            <input
                                className='ip_nuocsx'
                                type="text"
                                value={sotk}
                                // onChange={text => { setSoTK(text.target.value) }}
                                disabled
                                placeholder="Nhập Số tài khoản (không bắt buộc)">
                            </input>
                        </div>
                        <div>
                            <label><b>Tên ngân hàng</b></label><br></br>
                            <input
                                className='ip_nuocsx'
                                type="text"
                                value={tennh}
                                // onChange={text => { setTenNH(text.target.value) }}
                                disabled
                                placeholder="Nhập Tên ngân hàngú (không bắt buộc)">
                            </input>
                        </div>



                    </form>
                </div>
            </div>
            <input className="submit" type="submit" value="SỬA LÔ HÀNG" onClick={suaChiTietLoHang} style={{ width: '20%', padding: '15px', background: '' }}></input>
            <input className="submit" type="submit" value="XÓA LÔ HÀNG" onClick={handleClickOpen} style={{ width: '20%', padding: '15px', background: 'red' }}></input>

            {/* dialog xác nhận xóa lô hàng */}

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                onKeyPress={(e) => testKey3(e)}
            >
                <DialogTitle id="alert-dialog-title">{"Bạn có muốn xóa lô hàng này không?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Xác nhận xóa sản phẩm có mã là: {rowfromtable.MaHang}, có mã lô hàng là: {rowfromtable.MaLH}!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose_KhongXoa} color="primary">
                        KHÔNG
                    </Button>
                    <Button onClick={handleClose_Xoa} color="primary" autoFocus>
                        ĐỒNG Ý
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog cảnh báo hạn cận date */}

            <Dialog
                open={open3}
                onClose={handleClose3}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                onKeyPress={(e) => testKey4(e)}
            >
                <DialogTitle id="alert-dialog-title">{"Bạn có muốn sửa lô hạn cận date này không?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Xác nhận sửa!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose_KhongXoa2} color="primary">
                        KHÔNG
                    </Button>
                    <Button onClick={handleClose_Xoa2} color="primary" autoFocus>
                        CÓ
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
