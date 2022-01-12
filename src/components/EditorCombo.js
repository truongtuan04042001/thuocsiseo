import { useEffect, useState, useRef } from 'react';
import React from 'react';
import { API_URL } from '../constants/constants'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Resizer from "react-image-file-resizer"

export default ({ rowfromtable, parentCallback }) => {

    const [idCombo, setIdCombo] = useState('')
    const [comboName, setComboName] = useState('')
    const [totalPrice, setTotalPrice] = useState(0)
    const [giftBundle, setGiftBundle] = useState('')
    const [loyaltyPoint, setLoyaltyPoint] = useState(0)
    const [boolStatus, setBoolStatus] = useState(true)
    const [defaultCheckedOn, setDefaultCheckedOn] = useState(false)
    const [defaultCheckedOff, setDefaultCheckedOff] = useState(false)
    const [boolStatusCombo, setBoolStatusCombo] = useState(false)

    useEffect(() => {
        if (defaultCheckedOn) {
            setBoolStatusCombo(true)
        }
    }, [defaultCheckedOn])

    useEffect(() => {
        if (defaultCheckedOff) {
            setBoolStatusCombo(true)
        }
    }, [defaultCheckedOff])

    useEffect(() => {
        setIdCombo(rowfromtable.IdCombo)
        setComboName(rowfromtable.ComboName)
        setTotalPrice(rowfromtable.TotalPrice)
        setGiftBundle(rowfromtable.GiftBundle)
        setLoyaltyPoint(rowfromtable.LoyaltyPoint)
        setBoolStatus(rowfromtable.Status)
        if (rowfromtable.Status == 1) {
            setDefaultCheckedOn(true)
            setDefaultCheckedOff(false)
        } else {
            setDefaultCheckedOn(false)
            setDefaultCheckedOff(true)
        }
        setPreviewImageOne(rowfromtable.ImageOne)
        setPreviewImageTwo(rowfromtable.ImageTwo)
        setPreviewImageThree(rowfromtable.ImageThree)
    }, [rowfromtable]);

    const [chooseImageOne, setChooseImageOne] = useState()
    const [previewImageOne, setPreviewImageOne] = useState()
    const imageRefOne = useRef(null)
    const [imageTempOne, setImageTempOne] = useState()

    const funcChooseFileOne = (event) => {
        const file = event.target.files[0]
        if (file != undefined) {
            if (file.size > 5242880) { // file lớn hơn 5MB
                // alert(`File phải nhỏ hơn 5MB`)
                setValueDialog('File phải nhỏ hơn 5MB.')
                setBoolDialogWarning(true)
                setImageTempOne(null)
            } else {
                const reader = new FileReader()
                reader.readAsDataURL(event.target.files[0])
                reader.addEventListener('load', () => setImageTempOne(reader.result))
                setTimeout(() => {
                    // reader.readAsDataURL(event.target.files[0])
                    // reader.addEventListener('load', () => setImageTempOne(reader.result))
                    setImageTempOne(reader.result)
                    resizeFileOne(event.target.files[0])
                }, 40);
            }
        }
    }

    const uploadImageOne = async () => {
        if (chooseImageOne != undefined) {
            const formData = new FormData()
            formData.append('imageOne', chooseImageOne);
            const res1 = await fetch(`${API_URL}/uploadImageOne/${idCombo}`, {
                method: 'POST',
                body: formData,
            }).then(res => res.json())
            if (res1 == `OK`) {
                // alert(`uploadImageOne`)
                // setValueDialog('Tải hình 1 lên thành công.')
                // setBoolDialogSuccess(true)
                // setTimeout(() => {
                //     setBoolDialogSuccess(false)
                // }, 1000);
            }
        }
    }

    const resizeFileOne = (file) =>
        new Promise((resolve) => {
            const width = imageRefOne.current.width
            const height = imageRefOne.current.height
            const val = 1280
            let widthLow = 0
            let heightLow = 0
            if (width >= height) {
                if (width > val) {
                    widthLow = val
                    heightLow = parseInt(val * height / width)
                } else {
                    widthLow = width
                    heightLow = height
                }
            } else {
                if (height > val) {
                    heightLow = val
                    widthLow = parseInt(val * width / height)
                } else {
                    widthLow = width
                    heightLow = height
                }
            }
            if (widthLow != 0 && heightLow != 0) {
                Resizer.imageFileResizer(
                    file,
                    widthLow,
                    heightLow,
                    "JPEG",
                    90,
                    0,
                    (file) => {
                        resolve(file)
                        setChooseImageOne(file)
                        const reader = new FileReader()
                        reader.readAsDataURL(file)
                        reader.addEventListener('load', () => setPreviewImageOne(reader.result))
                    },
                    "file"
                )
            } else {
                // alert(`Lỗi đọc file hình, vui lòng chọn hình khác rồi chọn lại hình trước đó.`)
                setValueDialog('Lỗi đọc file hình, vui lòng chọn hình khác rồi chọn lại hình trước đó.')
                setBoolDialogError(true)
                setImageTempOne(null)
            }
        })

    const [chooseImageTwo, setChooseImageTwo] = useState()
    const [previewImageTwo, setPreviewImageTwo] = useState()
    const imageRefTwo = useRef(null)
    const [imageTempTwo, setImageTempTwo] = useState()

    const funcChooseFileTwo = (event) => {
        const file = event.target.files[0]
        if (file != undefined) {
            if (file.size > 5242880) { // file lớn hơn 5MB
                // alert(`File phải nhỏ hơn 5MB`)
                setValueDialog('File phải nhỏ hơn 5MB.')
                setBoolDialogWarning(true)
                setImageTempTwo(null)
            } else {
                const reader = new FileReader()
                reader.readAsDataURL(event.target.files[0])
                reader.addEventListener('load', () => setImageTempTwo(reader.result))
                setTimeout(() => {
                    // reader.readAsDataURL(event.target.files[0])
                    // reader.addEventListener('load', () => setImageTempTwo(reader.result))
                    setImageTempTwo(reader.result)
                    resizeFileTwo(event.target.files[0])
                }, 40);
            }
        }
    }

    const uploadImageTwo = async () => {
        if (chooseImageTwo != undefined) {
            const formData = new FormData()
            formData.append('imageTwo', chooseImageTwo);
            const res1 = await fetch(`${API_URL}/uploadImageTwo/${idCombo}`, {
                method: 'POST',
                body: formData,
            }).then(res => res.json())
            if (res1 == `OK`) {
                // alert(`uploadImageTwo`)
                // setValueDialog('Tải hình 2 lên thành công.')
                // setBoolDialogSuccess(true)
                // setTimeout(() => {
                //     setBoolDialogSuccess(false)
                // }, 800);
            }
        }
    }

    const resizeFileTwo = (file) =>
        new Promise((resolve) => {
            const width = imageRefTwo.current.width
            const height = imageRefTwo.current.height
            const val = 1280
            let widthLow = 0
            let heightLow = 0
            if (width >= height) {
                if (width > val) {
                    widthLow = val
                    heightLow = parseInt(val * height / width)
                } else {
                    widthLow = width
                    heightLow = height
                }
            } else {
                if (height > val) {
                    heightLow = val
                    widthLow = parseInt(val * width / height)
                } else {
                    widthLow = width
                    heightLow = height
                }
            }
            if (widthLow != 0 && heightLow != 0) {
                Resizer.imageFileResizer(
                    file,
                    widthLow,
                    heightLow,
                    "JPEG",
                    90,
                    0,
                    (file) => {
                        resolve(file)
                        setChooseImageTwo(file)
                        const reader = new FileReader()
                        reader.readAsDataURL(file)
                        reader.addEventListener('load', () => setPreviewImageTwo(reader.result))
                    },
                    "file"
                )
            } else {
                // alert(`Lỗi đọc file hình, vui lòng chọn hình khác rồi chọn lại hình trước đó.`)
                setValueDialog('Lỗi đọc file hình, vui lòng chọn hình khác rồi chọn lại hình trước đó.')
                setBoolDialogError(true)
                setImageTempTwo(null)
            }
        })

    const [chooseImageThree, setChooseImageThree] = useState()
    const [previewImageThree, setPreviewImageThree] = useState()
    const imageRefThree = useRef(null)
    const [imageTempThree, setImageTempThree] = useState()

    const funcChooseFileThree = (event) => {
        const file = event.target.files[0]
        if (file != undefined) {
            if (file.size > 5242880) { // file lớn hơn 5MB
                // alert(`File phải nhỏ hơn 5MB`)
                setValueDialog('File phải nhỏ hơn 5MB.')
                setBoolDialogWarning(true)
                setImageTempThree(null)
            } else {
                const reader = new FileReader()
                reader.readAsDataURL(event.target.files[0])
                reader.addEventListener('load', () => setImageTempThree(reader.result))
                setTimeout(() => {
                    // reader.readAsDataURL(event.target.files[0])
                    // reader.addEventListener('load', () => setImageTempThree(reader.result))
                    setImageTempThree(reader.result)
                    resizeFileThree(event.target.files[0])
                }, 40);
            }
        }
    }

    const uploadImageThree = async () => {
        if (chooseImageThree != undefined) {
            const formData = new FormData()
            formData.append('imageThree', chooseImageThree);
            const res1 = await fetch(`${API_URL}/uploadImageThree/${idCombo}`, {
                method: 'POST',
                body: formData,
            }).then(res => res.json())
            if (res1 == `OK`) {
                // alert(`uploadImageThree`)
                // setValueDialog('Tải hình 3 lên thành công.')
                // setBoolDialogSuccess(true)
                // setTimeout(() => {
                //     setBoolDialogSuccess(false)
                // }, 800);
            }
        }
    }

    const resizeFileThree = (file) =>
        new Promise((resolve) => {
            const width = imageRefThree.current.width
            const height = imageRefThree.current.height
            const val = 1280
            let widthLow = 0
            let heightLow = 0
            if (width >= height) {
                if (width > val) {
                    widthLow = val
                    heightLow = parseInt(val * height / width)
                } else {
                    widthLow = width
                    heightLow = height
                }
            } else {
                if (height > val) {
                    heightLow = val
                    widthLow = parseInt(val * width / height)
                } else {
                    widthLow = width
                    heightLow = height
                }
            }
            if (widthLow != 0 && heightLow != 0) {
                Resizer.imageFileResizer(
                    file,
                    widthLow,
                    heightLow,
                    "JPEG",
                    90,
                    0,
                    (file) => {
                        resolve(file)
                        setChooseImageThree(file)
                        const reader = new FileReader()
                        reader.readAsDataURL(file)
                        reader.addEventListener('load', () => setPreviewImageThree(reader.result))
                    },
                    "file"
                )
            } else {
                // alert(`Lỗi đọc file hình, vui lòng chọn hình khác rồi chọn lại hình trước đó.`)
                setValueDialog('Lỗi đọc file hình, vui lòng chọn hình khác rồi chọn lại hình trước đó.')
                setBoolDialogError(true)
                setImageTempThree(null)
            }
        })

    const [arrComboDetail, setArrComboDetail] = useState([])

    const updateItemComboDetail = async () => {
        if (arrComboDetail.length > 0) {
            const res1 = await fetch(`${API_URL}/comboDetail/${idCombo}`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: arrComboDetail
                })
            }).then(res => res.json())
            if (res1 == `OK`) {
                // alert(`EDIT`)
                setValueDialog(`Cập nhật thành công.`)
                setBoolDialogSuccess(true)
                setTimeout(() => {
                    setBoolDialogSuccess(false)
                }, 1000);
                parentCallback(`refresh`)
            } else {
                // alert(`err arrComboDetail`)
                setValueDialog(`Lỗi cập nhật chi tiết combo.`)
                setBoolDialogError(true)
            }
        } else {
            // alert(`Combo chưa có sản phẩm.`)
            setValueDialog(`Combo chưa có sản phẩm nào.`)
            setBoolDialogError(true)
        }
    }

    const updateCombo = async () => {
        if (comboName != ``) {
            if (totalPrice > 0) {
                // if (giftBundle != ``) {
                if (loyaltyPoint >=0 ) {
                    let statusCombo = 0
                    if (boolStatus) {
                        statusCombo = 1
                    }
                    const data = {
                        IdCombo: idCombo,
                        ComboName: comboName,
                        TotalPrice: totalPrice,
                        GiftBundle: giftBundle,
                        LoyaltyPoint: loyaltyPoint,
                        Status: statusCombo
                    }
                    const res1 = await fetch(`${API_URL}/combo/${idCombo}`, {
                        method: 'PUT',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            data: data
                        })
                    }).then(res => res.json())
                    if (res1 == `OK`) {
                        setIdCombo('')
                        setComboName('')
                        setTotalPrice(0)
                        setGiftBundle('')
                        setLoyaltyPoint(0)
                        setBoolStatus(true)
                        uploadImageOne()
                        uploadImageTwo()
                        uploadImageThree()
                        setChooseImageOne(null)
                        setChooseImageTwo(null)
                        setChooseImageThree(null)
                        setPreviewImageOne(null)
                        setPreviewImageTwo(null)
                        setPreviewImageThree(null)
                        updateItemComboDetail()

                    }
                } else {
                    // alert(`loyaltyPoint`)
                    setValueDialog('Chưa nhập điểm tích lũy combo.')
                    setBoolDialogError(true)
                }
                // } else {
                //     // alert(`giftBundle`)
                //     setValueDialog('Chưa nhập quà tặng kèm.')
                //     setBoolDialogError(true)
                // }
            } else {
                // alert(`totalPrice`)
                setValueDialog('Chưa nhập tổng tiền combo.')
                setBoolDialogError(true)
            }
        } else {
            // alert(`comboName`)
            setValueDialog('Chưa nhập tên combo.')
            setBoolDialogError(true)
        }
    }

    const [boolShowDialogDelCombo, setBoolShowDialogDelCombo] = useState(false)

    const delCombo = async () => {
        console.log(`${new Date().getTime()} idCombo=`, idCombo)
        const res1 = await fetch(`${API_URL}/combo/${idCombo}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())

        if (res1 == `OK`) {
            // alert(`DEL`)
            setBoolShowDialogDelCombo(false)
            setValueDialog(`Xóa thành công.`)
            setBoolDialogSuccess(true)
            parentCallback(`refresh`)
        }
    }

    useEffect(async () => {
        // rowfromtable.IdCombo
        const res1 = await fetch(`${API_URL}/comboDetailWithIdCombo/${rowfromtable.IdCombo}`).then(res => res.json())
        if (res1.length > 0) {
            setArrComboDetail(res1)
        } else {
            // alert(`Không lấy đc chi tiết combo.`)
            setValueDialog(`Không lấy được chi tiết combo.`)
            setBoolDialogError(true)
            setTimeout(() => {
                setBoolDialogError(false)
            }, 1000);
        }
    }, [rowfromtable.IdCombo])

    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }))(TableCell);

    const StyledTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }))(TableRow);

    const useStyles = makeStyles({
        table: {
            minWidth: 700,
        },
    });

    const classes = useStyles();

    const delItemComboDetail = (item) => {
        const newArrComboDetail = arrComboDetail.filter(o => o.MaHang != item.MaHang)
        setArrComboDetail(newArrComboDetail)
    }

    const [btnShowDialogAddComboDetail, setBtnShowDialogAddComboDetail] = useState(false)

    const btnShowAddItemComboDetail = () => {
        setBtnShowDialogAddComboDetail(true)
    }

    const btnHideAddItemComboDetail = () => {
        setBtnShowDialogAddComboDetail(false)
        setMaHang('')
        setTenHang('')
        setGiaBan(0)
        setSoLuong(0)
        setDVT('')
        setQCDG('')
        setHinhAnh('')
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '20px',
            backgroundColor: '#f4f7fc',
            padding: '25px',
            position: 'absolute',
            zIndex: 2
        },
    };

    const testKey2 = (e) => {
        if (e.code === "Enter") {
            addItemComboDetail()
            setBtnShowDialogAddComboDetail(false)
        }
    }

    const addItemComboDetail = () => {
        if (soLuong > 0) {
            const item = {
                IdCombo: idCombo,
                MaHang: maHang,
                TenHang: tenHang,
                GiaBan: giaBan,
                SoLuong: soLuong,
                DVT: dVT,
                QCDG: qCDG,
                HinhAnh: hinhAnh
            }
            let arr = arrComboDetail
            arr.push(item)
            setArrComboDetail(arr)
            setBtnShowDialogAddComboDetail(false)
            setMaHang('')
            setTenHang('')
            setGiaBan(0)
            setSoLuong(0)
            setDVT('')
            setQCDG('')
            setHinhAnh('')
        } else {
            // alert(`soLuong`)
            setValueDialog(`Số lượng phải lớn hơn 0.`)
            setBoolDialogError(true)
        }
    }

    const [maHang, setMaHang] = useState('')
    const [tenHang, setTenHang] = useState('')
    const [giaBan, setGiaBan] = useState(0)
    const [soLuong, setSoLuong] = useState(0)
    const [dVT, setDVT] = useState('')
    const [qCDG, setQCDG] = useState('')
    const [hinhAnh, setHinhAnh] = useState('')

    const [arrMaHang, setArrMaHang] = useState([])
    const [arrTenHang, setArrTenHang] = useState([])

    const onChangeMaHang = async (event, value) => {
        event.preventDefault();
        if (value != null || value != undefined) {
            await fetch(API_URL + "/chiTietSanPhamTheoMaHang/" + value)
                .then(res => res.json())
                .then(qwe => {
                    if (qwe.code == 0) {
                        const data = qwe.data
                        setMaHang(data.MaHang)
                        setTenHang(data.TenHang)
                        setDVT(data.DVT)
                        setGiaBan(data.GiaBan)
                        setQCDG(data.QCDG)
                        setHinhAnh(data.HinhAnh)
                    } else {
                        setValueDialog(qwe.msg)
                        setBoolDialogWarning(true)
                        setMaHang('')
                        setTenHang('')
                        setGiaBan(0)
                        setSoLuong(0)
                        setDVT('')
                        setQCDG('')
                        setHinhAnh('')
                    }
                })
        } else {
            setMaHang('')
            setTenHang('')
            setGiaBan(0)
            setSoLuong(0)
            setDVT('')
            setQCDG('')
            setHinhAnh('')
        }
    }
    
    const onChangeTenHang = async (event, value) => {
        event.preventDefault();
        if (value != null && value != undefined) {
            await fetch(API_URL + "/chiTietSanPhamTheoTenHang", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: value
                })

            })
                .then(res => res.json())
                .then(qwe => {
                    if (qwe.code == 0) {
                        const data = qwe.data
                        setMaHang(data.MaHang)
                        setTenHang(data.TenHang)
                        setDVT(data.DVT)
                        setGiaBan(data.GiaBan)
                        setQCDG(data.QCDG)
                        setHinhAnh(data.HinhAnh)
                    } else {
                        setValueDialog(qwe.msg)
                        setBoolDialogWarning(true)
                        setTenHang('')
                        setGiaBan(0)
                        setSoLuong(0)
                        setDVT('')
                        setQCDG('')
                        setHinhAnh('')
                    }
                })
        } else {
            setMaHang('')
            setTenHang('')
            setGiaBan(0)
            setSoLuong(0)
            setDVT('')
            setQCDG('')
            setHinhAnh('')
        }
    }


    useEffect(async () => {
        const res1 = await fetch(`${API_URL}/getsuggestadtmh`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
        if (res1.length > 0) {
            setArrMaHang(res1)
        }
        const res2 = await fetch(`${API_URL}/getsuggestadtname`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
        if (res2.length > 0) {
            setArrTenHang(res2)
        }
    }, [])

    const [valueDialog, setValueDialog] = useState('test test test test ')
    const [boolDialogSuccess, setBoolDialogSuccess] = useState(false)
    const [boolDialogWarning, setBoolDialogWarning] = useState(false)
    const [boolDialogError, setBoolDialogError] = useState(false)

    const testKey3 = (e) => {
        if (e.code === "Enter") {
            setValueDialog(``)
            setBoolDialogSuccess(false)
            setBoolDialogWarning(false)
            setBoolDialogError(false)
        }
    }

    const testKey1 = (e) => {
        if (e.code === "Enter") {
            delCombo()
        }
    }

    return (
        <div style={{ width: '100%', marginTop: 5 }}>

            {/* Form edit combo and combo detail */}

            <div style={{ display: 'flex', flexDirection: 'row', background: "#f2f2f2", borderRadius: '5px', flexWrap: 'wrap', width: '100%', }}>
                <div style={{ width: '25%', padding: '10px' }}>
                    <div>
                        <label><b>Tên combo</b></label><br></br>
                        <input
                            className="ip_mh"
                            type="text"
                            value={comboName}
                            onChange={text => { setComboName(text.target.value) }}
                            placeholder="Nhập tên combo">
                        </input>
                    </div>
                    <div>
                        <label><b>Giá combo</b></label><br></br>
                        <input
                            className='ip_nhomhang'
                            type="text"
                            value={totalPrice}
                            onChange={text => { setTotalPrice(text.target.value) }}
                            placeholder="Nhập giá combo">
                        </input>
                    </div>
                    <div>
                        <label><b>Quà tặng kèm theo</b></label><br></br>
                        <input
                            className="ip_mh"
                            type="text"
                            value={giftBundle}
                            onChange={text => { setGiftBundle(text.target.value) }}
                            placeholder="Nhập quà tặng kèm">
                        </input>
                    </div>
                    <div>
                        <label><b>Điểm thưởng</b></label><br></br>
                        <input
                            className="ip_tenhang"
                            type="text"
                            value={loyaltyPoint}
                            onChange={text => { setLoyaltyPoint(text.target.value) }}
                            placeholder="Nhập điểm thưởng">
                        </input>
                    </div>
                    <div>

                        {/* chưa làm đc vụ auto check */}
                        {
                            boolStatusCombo ?
                                <div>
                                    <label><b>Trạng thái combo</b></label><br />
                                    <div style={{ display: 'inline', fontSize: '1.4em' }} >
                                        <input
                                            style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                                            id='on'
                                            className=''
                                            type='radio'
                                            name='radioStatus'
                                            onClick={() => setBoolStatus(true)}
                                            defaultChecked={defaultCheckedOn}
                                        >
                                        </input>
                                        <label style={{ marginLeft: '.2em' }} onClick={() => setBoolStatus(true)}>Bật</label>

                                        <input
                                            style={{ marginLeft: '20px', width: '20px', height: '20px', cursor: 'pointer' }}
                                            id='off'
                                            className=''
                                            type='radio'
                                            name='radioStatus'
                                            onClick={() => setBoolStatus(false)}
                                            defaultChecked={defaultCheckedOff}
                                        />
                                        <label style={{ marginLeft: '.2em' }} onClick={() => setBoolStatus(false)}>Tắt</label>
                                    </div>
                                </div>
                                :
                                null
                        }

                    </div>
                </div>
                <div style={{ width: '75%', padding: '10px', display: 'flex' }}>
                    <div style={{ width: '33%' }}>
                        <label><b>Hình 1</b></label><br></br>
                        <input
                            style={{ fontSize: '1.2em', marginTop: '15px', marginBottom: '20px' }}
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                            onChange={(event) => funcChooseFileOne(event)}
                        >
                        </input><br></br>
                        <div style={{ width: '300px', height: '300px' }}>
                            <img src={previewImageOne} style={{ height: '100%', width: '100%' }} ></img>
                        </div>
                        <img ref={imageRefOne} src={imageTempOne} style={{ display: 'none' }} ></img>
                    </div>
                    <div style={{ width: '33%' }}>
                        <label><b>Hình 2</b></label><br></br>
                        <input
                            style={{ fontSize: '1.2em', marginTop: '15px', marginBottom: '20px' }}
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                            onChange={(event) => funcChooseFileTwo(event)}
                        >
                        </input><br></br>
                        <div style={{ width: '300px', height: '300px' }}>
                            <img src={previewImageTwo} style={{ height: '100%', width: '100%' }} ></img>
                        </div>
                        <img ref={imageRefTwo} src={imageTempTwo} style={{ display: 'none' }} ></img>
                    </div>
                    <div style={{ width: '34%' }}>
                        <label><b>Hình 3</b></label><br></br>
                        <input
                            style={{ fontSize: '1.2em', marginTop: '15px', marginBottom: '20px' }}
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                            onChange={(event) => funcChooseFileThree(event)}
                        >
                        </input><br></br>
                        <div style={{ width: '300px', height: '300px' }}>
                            <img src={previewImageThree} style={{ height: '100%', width: '100%' }} ></img>
                        </div>
                        <img ref={imageRefThree} src={imageTempThree} style={{ display: 'none' }} ></img>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', background: "#f2f2f2", borderRadius: '5px', flexWrap: 'wrap', width: '100%', }}>
                <input className="submit" type="submit" value="Thêm sản phẩm" onClick={btnShowAddItemComboDetail} style={{ width: '10%', padding: '15px', marginRight: '5px' }}></input>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', background: "#f2f2f2", borderRadius: '5px', flexWrap: 'wrap', width: '100%', }}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Mã hàng</StyledTableCell>
                                <StyledTableCell>Tên hàng</StyledTableCell>
                                <StyledTableCell align="right">Giá bán</StyledTableCell>
                                <StyledTableCell align="right">Số lượng</StyledTableCell>
                                <StyledTableCell align="right">Đơn vị tính</StyledTableCell>
                                <StyledTableCell align="right">Quy cách đóng gói</StyledTableCell>
                                <StyledTableCell align="right">Hình ảnh</StyledTableCell>
                                <StyledTableCell align="center">Xóa</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                arrComboDetail.map((row) => {
                                    // console.log(`${new Date().getTime()} row=`, row)
                                    return (
                                        <StyledTableRow key={row.IdCombo}>
                                            <StyledTableCell align="center">{row.MaHang}</StyledTableCell>
                                            <StyledTableCell component="th" scope="row">{row.TenHang}</StyledTableCell>
                                            <StyledTableCell align="right">{row.GiaBan.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</StyledTableCell>
                                            <StyledTableCell align="right">{row.SoLuong}</StyledTableCell>
                                            <StyledTableCell align="right">{row.DVT}</StyledTableCell>
                                            <StyledTableCell align="right">{row.QCDG}</StyledTableCell>
                                            <StyledTableCell align="right">{row.HinhAnh}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                <button style={{ backgroundColor: 'transparent', backgroundRepeat: 'no-repeat', border: 'none', cursor: 'pointer', marginTop: 1 }}
                                                    onClick={() => delItemComboDetail(row)}
                                                >
                                                    <img src='https://img.icons8.com/ios/2x/fa314a/delete-trash.png' width='20' height='20'></img>
                                                </button>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <input className="submit" type="submit" value="Lưu combo" onClick={updateCombo} style={{ width: '10%', padding: '15px', marginRight: '5px' }}></input>
            <input className="submit" type="submit" value="Xóa combo" onClick={() => setBoolShowDialogDelCombo(true)} style={{ width: '10%', padding: '15px', background: 'red' }}></input>

            {/* Dialog confirm del combo */}

            <Dialog
                open={boolShowDialogDelCombo}
                onClose={() => setBoolShowDialogDelCombo(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                onKeyPress={(e) => testKey1(e)}
            >
                <DialogTitle>
                    <div style={{ textAlign: 'center' }}>
                        <div className='GH_DialogTitle'>
                            <p style={{ alignItems: 'center', fontSize: '3.75em', margin: '0' }}>!</p>
                        </div>
                        <p className='GH_XinXacNhan'>Xác nhận</p>
                        Xác nhận xóa combo: {rowfromtable.ComboName}!
                    </div>
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => setBoolShowDialogDelCombo(false)} color="primary" style={{ padding: '6px 16px', backgroundColor: 'rgb(255, 193, 7)', borderRadius: '8px', color: 'rgb(0, 0, 0)', width: '30%', margin: '15px' }}>
                        Không
                    </Button>
                    <Button onClick={delCombo} color="primary" style={{ padding: '6px 16px', backgroundColor: 'rgb(0, 171, 85)', borderRadius: '8px', color: 'white', width: '30%', margin: '15px' }}>
                        Có
                    </Button>
                </DialogActions>
            </Dialog>


            {/* Thêm sản phẩm vào combo */}

            <Dialog
                open={btnShowDialogAddComboDetail}
                onClose={() => btnHideAddItemComboDetail()}
                style={customStyles}
                onKeyPress={(e) => testKey2(e)}
                maxWidth='xl'
            >
                <div style={{ width: '1366px', marginTop: 10 }}>
                    <div style={{ display: 'flex', flexDirection: 'row', background: "#f2f2f2", borderRadius: '5px', maxWidth: '100%', flexWrap: 'wrap', margin: 'auto' }}>
                        <div style={{ width: '70%', padding: '15px', background: '' }}>
                            <div>
                                <label><b>Mã hàng</b></label><br>
                                </br>
                                <Autocomplete
                                    freeSolo
                                    // className="input-text121"
                                    clearOnEscape
                                    clearOnBlur
                                    autoComplete
                                    options={arrMaHang.map((option) => option.value)}
                                    onChange={onChangeMaHang}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            margin="normal"
                                            aria-label="enter search"
                                            name="search"
                                            className='bodi'
                                            placeholder="Nhập mã hàng"
                                        />
                                    )}>
                                </Autocomplete>
                            </div>
                            <div>
                            <label><b>Tên hàng</b></label><br>
                                </br>
                                <Autocomplete
                                    freeSolo
                                    // className="input-text121"
                                    clearOnEscape
                                    clearOnBlur
                                    autoComplete
                                    options={arrTenHang.map((option) => option.value)}
                                    onChange={onChangeTenHang}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            margin="normal"
                                            aria-label="enter search"
                                            name="search"
                                            className='bodi'
                                            placeholder="Nhập tên hàng"
                                        />
                                    )}>
                                </Autocomplete>
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
                            <div>
                                <label><b>Đơn giá</b></label><br></br>
                                <input
                                    disabled
                                    className="ip_tenhang"
                                    type="number"
                                    value={giaBan}
                                    placeholder="Giá bán">
                                </input>
                            </div>
                        </div>
                        <div style={{ width: '30%', padding: '15px', background: '' }}>

                            <form action="">
                                <div>
                                    <label><b>Đơn vị tính</b></label><br></br>
                                    <input
                                        disabled
                                        className='ip_sodk'
                                        type="text"
                                        value={dVT}
                                        // onChange={text => { setDVT(text.target.value) }}
                                        placeholder="Đơn vị tính">
                                    </input>
                                </div>
                                <div>
                                    <label><b>QCDG</b></label><br></br>
                                    <input
                                        className='ip_hoatchat'
                                        type="text"
                                        value={qCDG}
                                        // onChange={text => { setMaLH(text.target.value) }}
                                        placeholder="Quy cách đóng gói">
                                    </input>
                                </div>
                                <div>
                                    <label><b>Hình ảnh</b></label><br></br>
                                    <input
                                        className='ip_hangsx'
                                        type="text"
                                        value={hinhAnh}
                                        // onChange={text => { setHanSD(text.target.value) }}
                                        placeholder="Hình ảnh">
                                    </input>
                                </div>
                            </form>
                        </div>

                    </div>
                    <input className="submit" type="submit" value="Thêm sản phẩm" onClick={addItemComboDetail}></input>
                </div>
            </Dialog>

            {/* Dialog show alert success waring error */}

            <Dialog
                open={boolDialogSuccess}
                onClose={() => setBoolDialogSuccess(false)}
                onKeyPress={(e) => testKey3(e)}
            >
                <DialogTitle>
                    <div className='dA01TitleSuccess'>
                        <p className='dA02p'>✔</p>
                    </div>
                    <p className='dA03ps' >
                        {valueDialog}
                    </p>
                </DialogTitle>
                <DialogActions >
                    <Button onClick={() => {
                        setBoolDialogSuccess(false)
                        setValueDialog(``)
                    }} style={{ fontWeight: 'bold', fontSize: '1em', color: '#00af00' }}  >OK</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={boolDialogWarning}
                onClose={() => setBoolDialogWarning(false)}
                onKeyPress={(e) => testKey3(e)}
            >
                <DialogTitle>
                    <div className='dA01TitleWarning'>
                        <p className='dA02p'>!</p>
                    </div>
                    <p className='dA03pw' >
                        {valueDialog}
                    </p>
                </DialogTitle>
                <DialogActions >
                    <Button onClick={() => {
                        setBoolDialogWarning(false)
                        setValueDialog(``)
                    }} style={{ fontWeight: 'bold', fontSize: '1em', color: '#ffaf00' }}  >OK</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={boolDialogError}
                onClose={() => setBoolDialogError(false)}
                onKeyPress={(e) => testKey3(e)}
            >
                <DialogTitle>
                    <div className='dA01TitleError'>
                        <p className='dA02p'>✘</p>
                    </div>
                    <p className='dA03pe' >
                        {valueDialog}
                    </p>
                </DialogTitle>
                <DialogActions >
                    <Button onClick={() => {
                        setBoolDialogError(false)
                        setValueDialog(``)
                    }} style={{ fontWeight: 'bold', fontSize: '1em', color: '#ff0000' }}  >OK</Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}