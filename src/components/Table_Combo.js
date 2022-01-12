import React, { useState, useEffect, useCallback, useRef } from 'react';
import Paper from '@material-ui/core/Paper';
import _ from 'lodash';
import {
    FilteringState,
    PagingState,
    IntegratedPaging,
    RowDetailState,
    SortingState,
    IntegratedSorting,
} from '@devexpress/dx-react-grid';
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {
    Grid,
    Table,
    Toolbar,
    TableHeaderRow,
    TableColumnResizing,
    TableColumnVisibility,
    ColumnChooser,
    VirtualTable,
    PagingPanel,
    TableFilterRow,
    TableRowDetail,
} from '@devexpress/dx-react-grid-material-ui';
import EditorCombo from './EditorCombo';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Modal from 'react-modal';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'
import { API_URL } from '../constants/constants';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Resizer from "react-image-file-resizer"

export default ({ dataFromParent, parentCallback, parentCallback2 }) => {
    const [expandedRowIds, setExpandedRowIds] = useState([]);
    const [pageSizes] = useState([8, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 0]);
    const [columns] = useState([
        { name: 'Id', title: 'ID' },
        { name: 'IdCombo', title: 'ID Combo' },
        { name: 'ComboName', title: 'Tên Combo' },
        { name: 'TotalPrice', title: 'Giá Combo' },
        { name: 'GiftBundle', title: 'Quà tặng kèm theo' },
        { name: 'LoyaltyPoint', title: 'Điểm TL Combo' },
        { name: 'ImageOne', title: 'Hình 1' },
        { name: 'ImageTwo', title: 'Hình 2' },
        { name: 'ImageThree', title: 'Hình 3' },
        { name: 'Status', title: 'Trạng Thái' },
    ]);

    const [defaultColumnWidths] = useState([
        { columnName: 'Id', width: 70 },
        { columnName: 'IdCombo', width: 120 },
        { columnName: 'ComboName', width: 250 },
        { columnName: 'TotalPrice', width: 200 },
        { columnName: 'GiftBundle', width: 150 },
        { columnName: 'LoyaltyPoint', width: 150 },
        { columnName: 'ImageOne', width: 150 },
        { columnName: 'ImageTwo', width: 150 },
        { columnName: 'ImageThree', width: 150 },
        { columnName: 'Status', width: 150 },

    ]);

    const callbackFunction = (childData) => {
        parentCallback(childData)
        setExpandedRowIds([])
    };
    Modal.setAppElement('#root')

    //style cho các dòng trong table
    const styles = theme => ({
        tableStriped: {
            '& tbody tr:nth-of-type(odd)': {
                backgroundColor: '#c5dfb3',
            },
        },
        toolbar: {
            border: '2px solid',
            backgroundColor: 'white',
        },
    });

    const TableComponentBase = ({ classes, ...restProps }) => (
        <Table.Table
            {...restProps}
            className={classes.tableStriped}
        />
    );
    const Tabletool = ({ classes, ...restProps }) => (
        <Toolbar.Root
            {...restProps}
            className={classes.toolbar}
        />
    );

    const TableComponent = withStyles(styles, { name: 'TableComponent' })(TableComponentBase);
    const Tabletoolbar = withStyles(styles, { name: 'Tabletoolbar' })(Tabletool);
    const [filterRowVisible, setFilterRowVisible] = useState(true);//biến ẩn hiện filter
    // const [filters, setFilters] = useState([]);

    const callbackFunction2 = (childData2) => { parentCallback2(childData2) };

    const debounceFunc = useCallback(
        _.debounce(e => { callbackFunction2(e) }, 300),
        []
    );

    const handleChange = e => {
        debounceFunc(e);
    };

    const getHiddenColumnsFilteringExtensions = hiddenColumnNames => hiddenColumnNames
        .map(columnName => ({
            columnName,
            predicate: () => false,
        }));

    const [defaultHiddenColumnNames] = useState(['ID']);
    const [filteringColumnExtensions, setFilteringColumnExtensions] = useState(
        getHiddenColumnsFilteringExtensions(defaultHiddenColumnNames),
    );

    const onHiddenColumnNamesChange = hiddenColumnNames => setFilteringColumnExtensions(
        getHiddenColumnsFilteringExtensions(hiddenColumnNames),
    );
    //end hàm cho filter 

    //hàm cho sort
    const SortingIcon = ({ direction }) => (
        direction === 'asc'
            ? <ArrowUpward style={{ fontSize: '18px' }} />
            : <ArrowDownward style={{ fontSize: '18px' }} />
    );

    const SortLabel = ({ onSort, children, direction }) => (
        <Button
            size="medium"
            variant="contained"
            style={{ width: '100%' }}
            onClick={onSort}
        >
            {children}
            {(direction && <SortingIcon direction={direction} />)}
        </Button>
    );
    //end hàm cho sort

    const RowDetail = ({ row }) => (
        <EditorCombo rowfromtable={row} parentCallback={callbackFunction} />
    );

    //========================

    const [boolOpenDialogAddCombo, setBoolOpenDialogAddCombo] = useState(false)

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

    const testKey1 = (e) => {
        if (e.code === "Enter") {
            setBoolOpenDialogAddCombo(false)
        }
    }

    const btnCancelAddCombo = () => {
        setBoolOpenDialogAddCombo(false)
        setMaHang('')
        setTenHang('')
        setGiaBan(0)
        setSoLuong(0)
        setDVT('')
        setQCDG('')
        setHinhAnh('')
        setIdCombo('')
        setComboName('')
        setTotalPrice(0)
        setGiftBundle('')
        setLoyaltyPoint(0)
        setBoolStatus(true)
        setChooseImageOne(null)
        setChooseImageTwo(null)
        setChooseImageThree(null)
        setPreviewImageOne(null)
        setPreviewImageTwo(null)
        setPreviewImageThree(null)

    }

    const [idCombo, setIdCombo] = useState('')

    const btnShowAddCombo = async () => {
        const res1 = await fetch(`${API_URL}/getIdComboDesc`).then(res => res.json())
        let id = `0`
        if (res1.length > 0) {
            if (res1[0].Id < 9) {
                id = `0${res1[0].Id + 1}`
            } else {
                id = `${res1[0].Id + 1}`
            }
        } else {
            id = `01`
        }
        setIdCombo(`COMBO_${id}`)
        setBoolOpenDialogAddCombo(true)
    }

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
                // }, 800);
            }
        } else {
            // alert(`Vui lòng chọn hình cho combo.`)
            setValueDialog('Vui lòng chọn hình cho combo.')
            setBoolDialogWarning(true)
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
                setValueDialog(`Lỗi đọc file hình, vui lòng chọn hình khác rồi chọn lại hình trước đó.`)
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
                setValueDialog(`Lỗi đọc file hình, vui lòng chọn hình khác rồi chọn lại hình trước đó.`)
                setBoolDialogError(true)
                setImageTempThree(null)
            }
        })

    const [comboName, setComboName] = useState('')
    const [totalPrice, setTotalPrice] = useState(0)
    const [giftBundle, setGiftBundle] = useState('')
    const [loyaltyPoint, setLoyaltyPoint] = useState(0)
    const [boolStatus, setBoolStatus] = useState(true)

    const addArrComboDetail = async () => {
        if (arrComboDetail.length > 0) {
            const res1 = await fetch(`${API_URL}/addComboDetail`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: arrComboDetail
                })
            }).then(res => res.json())
            if (res1 == `OK`) {
                setBoolOpenDialogAddCombo(false)
                parentCallback(`refresh`)
                setArrComboDetail([])
                // set
            } else {
                // alert(`err arrComboDetail`)
                setValueDialog(`Combo chưa có sản phẩm.`)
                setBoolDialogError(true)
            }
        }
    }
    // 
    const addProductComboForSearch = () => {
        // làm trên backend rồi
        // const requestOptions = {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         loaihang: loaihang,
        //         nhomhang: nhomhang,
        //         nhanhhang: nhanhhang,
        //         mahang: mahang,
        //         tenhang: tenhang,
        //         sodk: sodk,
        //         hoatchat: hoatchat,
        //         hamluong: hamluong,
        //         hangsx: hangsx,
        //         nuocsx: nuocsx,
        //         quycachdonggoi: quycachdonggoi,
        //         giaban: giaban,
        //         giavon: giavon,
        //         donvitinh: donvitinh,
        //         hinhanh: hinhanh,
        //         mota: mota,
        //     })
        // }
        // const res1 = await fetch(`${API_URL}/themsanpham`, requestOptions).then(res => res.json())
    }

    const btnAddCombo = async () => {
        if (comboName != ``) {
            if (totalPrice > 0) {
                // if (giftBundle != ``) {
                if (loyaltyPoint >= 0) {
                    if (chooseImageOne != undefined) {
                        if (arrComboDetail.length > 0) {
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
                                ImageOne: 'updating',
                                ImageTwo: 'updating',
                                ImageThree: 'updating',
                                Status: statusCombo
                            }
                            const requestOptions = {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    data: data
                                })
                            }
                            if (idCombo != '') {
                                const res1 = await fetch(`${API_URL}/combo`, requestOptions).then(res => res.json())
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
                                    addArrComboDetail()
                                    addProductComboForSearch()
                                }
                            } else {
                                // alert(`idCombo`)
                                setValueDialog('Không lấy được mã combo.')
                                setBoolDialogError(true)
                            }
                        } else {
                            // alert(`arrComboDetail`)
                            setValueDialog('Combo chưa có sản phẩm nào.')
                            setBoolDialogError(true)
                        }
                    } else {
                        // alert(`chooseImageOne`)
                        setValueDialog('Chưa chọn hình 1 cho combo.')
                        setBoolDialogError(true)
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

    const [arrComboDetail, setArrComboDetail] = useState([])

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

    const testKey2 = (e) => {
        if (e.code === "Enter") {
            addItemComboDetail()
            setBtnShowDialogAddComboDetail(false)
        }
    }

    const [maHang, setMaHang] = useState('')
    const [tenHang, setTenHang] = useState('')
    const [giaBan, setGiaBan] = useState(0)
    const [soLuong, setSoLuong] = useState(0)
    const [dVT, setDVT] = useState('')
    const [qCDG, setQCDG] = useState('')
    const [hinhAnh, setHinhAnh] = useState('')

    const [valueDialog, setValueDialog] = useState('test test test test ')
    const [boolDialogSuccess, setBoolDialogSuccess] = useState(false)
    const [boolDialogWarning, setBoolDialogWarning] = useState(false)
    const [boolDialogError, setBoolDialogError] = useState(false)

    const [arrMaHang, setArrMaHang] = useState([])
    const [arrTenHang, setArrTenHang] = useState([])

    const onChangeMaHang = async (event, value) => {
        event.preventDefault();
        if (value != null && value != undefined) {
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
            // alert(`soLuong.`)
            setValueDialog(`Số lượng phải lớn hơn 0.`)
            setBoolDialogError(true)
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

    const delItemComboDetail = (itemComboDetail) => {
        const newArr = arrComboDetail.filter(item => item.MaHang != itemComboDetail.MaHang)
        setArrComboDetail(newArr)
    }

    const testKey3 = (e) => {
        if (e.code === "Enter") {
            setValueDialog(``)
            setBoolDialogSuccess(false)
            setBoolDialogWarning(false)
            setBoolDialogError(false)
        }
    }

    return (
        <div>

            {/* paper hiện table Combo */}

            <Paper>
                <div style={{ width: '100%', display: 'flex', backgroundColor: '#B8d8e0' }}>
                    <div style={{ width: '30%', textAlign: 'left', alignSelf: 'center', marginLeft: 10, color: '#197420' }}>
                        <FormControlLabel
                            control={
                                <Switch
                                    style={{ width: '50%' }}
                                    checked={filterRowVisible}
                                    onChange={() => { setFilterRowVisible(!filterRowVisible) }}
                                />
                            }
                            label="Ẩn/Hiện bộ lọc"
                        />
                    </div>
                    <div style={{ width: '40%', textAlign: 'center', alignSelf: 'center', color: '#197420' }}>
                        <b><h2>Bảng Quản Lý Combo</h2></b>
                    </div>
                    <div style={{ width: '40%', textAlign: 'right', alignSelf: 'center', marginRight: '1vw' }}>
                        <button className='btn-thongke1' onClick={btnShowAddCombo} style={{ backgroundColor: '#2de183' }} >
                            <b>Thêm Combo</b>
                        </button>
                    </div>
                </div>
                <Grid
                    rows={dataFromParent}
                    columns={columns}
                >
                    <SortingState
                        defaultSorting={[]}
                    />
                    <IntegratedSorting />
                    <PagingState
                        defaultCurrentPage={0}
                        defaultPageSize={20}
                    />
                    <IntegratedPaging />
                    <FilteringState onFiltersChange={(x) => handleChange(x)} />
                    <VirtualTable tableComponent={TableComponent} columnExtensions={defaultColumnWidths} height={window.innerHeight - 100} />
                    <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                    <TableHeaderRow showSortingControls
                        sortLabelComponent={SortLabel} />
                    <TableColumnVisibility
                        defaultHiddenColumnNames={defaultHiddenColumnNames}
                        onHiddenColumnNamesChange={onHiddenColumnNamesChange}
                    />
                    {filterRowVisible ? <TableFilterRow
                    /> : null}
                    <RowDetailState expandedRowIds={expandedRowIds}
                        onExpandedRowIdsChange={setExpandedRowIds} />
                    <TableRowDetail
                        contentComponent={RowDetail}
                    />
                    <PagingPanel
                        pageSizes={pageSizes}
                    />
                </Grid>
            </Paper>

            {/* Dialog thêm Combo */}

            <Dialog
                open={boolOpenDialogAddCombo}
                style={customStyles}
                contentLabel="Thêm combo mới"
                onKeyPress={(e) => testKey1(e)}
                fullWidth={true}
                maxWidth={'xl'}
            >
                <DialogTitle style={{ margin: 0, padding: 0, height: '80px' }} >
                    <div style={{ width: '99%', margin: 10, textAlign: 'center' }}>
                        <h2 style={{ textAlign: 'center', fontSize: '2em', marginTop: 0, padding: 0 }}>Thêm combo {idCombo} </h2>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '43%', padding: '15px', background: '' }}>
                            <form>
                                <div style={{ fontSize: '1.2em' }}>
                                    <label><b>Tên combo</b></label><br></br>
                                    <input
                                        style={{ fontSize: '0.8em' }}
                                        className='ip_nuocsx'
                                        type="text"
                                        value={comboName}
                                        onChange={text => { setComboName(text.target.value) }}
                                        placeholder="Nhập tên combo"
                                    >
                                    </input>
                                    <label><b>Giá combo</b></label><br></br>
                                    <input
                                        style={{ fontSize: '0.8em' }}
                                        className='ip_nuocsx'
                                        type="number"
                                        pattern="([0-9]{1,3}).([0-9]{1,3})"
                                        value={totalPrice}
                                        onChange={text => { setTotalPrice(text.target.value) }}
                                        placeholder="Nhập giá combo"
                                    >
                                    </input>
                                </div>

                                <div style={{ marginTop: '7px', fontSize: '1.2em' }}>
                                    <label><b>Quà tặng đi kèm</b></label><br></br>
                                    <input
                                        style={{ fontSize: '0.8em' }}
                                        className='ip_nuocsx'
                                        type="text"
                                        value={giftBundle}
                                        onChange={text => { setGiftBundle(text.target.value) }}
                                        placeholder="Nhập quà tặng đi kèm"
                                    >
                                    </input>
                                </div>
                                <div style={{ marginTop: '7px', fontSize: '1.2em' }}>
                                    <label><b>Điểm thưởng</b></label><br></br>
                                    <input
                                        style={{ fontSize: '0.8em' }}
                                        className='ip_nuocsx'
                                        type="text"
                                        value={loyaltyPoint}
                                        onChange={text => { setLoyaltyPoint(text.target.value) }}
                                        placeholder="Nhập số điểm được tích lũy"
                                    >
                                    </input>
                                </div>
                                <div style={{ marginTop: '7px', fontSize: '1.2em' }}>
                                    <label><b>Trạng thái combo</b></label><br />
                                    <div style={{ display: 'inline', fontSize: '1.4em' }} >
                                        <input
                                            style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                                            id='on'
                                            className=''
                                            type='radio'
                                            name='radioStatus'
                                            onClick={() => setBoolStatus(true)}
                                            defaultChecked={true}
                                        >
                                        </input>
                                        <label for='on' style={{ cursor: 'pointer', marginLeft: '.2em' }} onClick={() => setBoolStatus(true)}>Bật</label>
                                        <input
                                            style={{ marginLeft: '20px', width: '20px', height: '20px', cursor: 'pointer' }}
                                            id='off'
                                            className=''
                                            type='radio'
                                            name='radioStatus'
                                            onClick={() => setBoolStatus(false)}
                                        />
                                        <label for='off' style={{ cursor: 'pointer', marginLeft: '.2em' }} onClick={() => setBoolStatus(false)}>Tắt</label>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div style={{ width: '16%', padding: '15px', background: '' }}>
                            <form>
                                <div style={{ fontSize: '1.2em' }}>
                                    <label><b>Hình ảnh 1</b></label><br></br>
                                    <div style={{ margin: '15px 0px 20px 0px' }}>
                                        <input
                                            style={{ fontSize: '0.8em' }}
                                            type="file"
                                            accept="image/png, image/gif, image/jpeg"
                                            onChange={(event) => funcChooseFileOne(event)}
                                        >
                                        </input>
                                    </div>
                                </div>
                            </form>
                            <img ref={imageRefOne} src={imageTempOne} style={{ display: 'none' }} ></img>
                            <div style={{ width: '250px', height: '250px' }}>
                                <img src={previewImageOne} style={{ height: '100%', width: '100%' }} ></img>
                            </div>
                        </div>
                        <div style={{ width: '16%', padding: '15px', background: '' }}>
                            <form>
                                <div style={{ fontSize: '1.2em' }}>
                                    <label><b>Hình ảnh 2</b> (không bắt buộc)</label><br></br>
                                    <div style={{ margin: '15px 0px 20px 0px' }}>
                                        <input
                                            style={{ fontSize: '0.8em' }}
                                            type="file"
                                            accept="image/png, image/gif, image/jpeg"
                                            onChange={(event) => funcChooseFileTwo(event)}
                                        >
                                        </input>
                                    </div>
                                </div>
                            </form>
                            <img ref={imageRefTwo} src={imageTempTwo} style={{ display: 'none' }} ></img>
                            <div style={{ width: '250px', height: '250px' }}>
                                <img src={previewImageTwo} style={{ height: '100%', width: '100%' }} ></img>
                            </div>
                        </div>
                        <div style={{ width: '16%', padding: '15px', background: '' }}>
                            <form>
                                <div style={{ marginTop: '4px', fontSize: '1.2em' }}>
                                    <label><b>Hình ảnh 3</b> (không bắt buộc)</label><br></br>
                                    <div style={{ margin: '15px 0px 20px 0px' }}>
                                        <input
                                            style={{ fontSize: '0.8em' }}
                                            type="file"
                                            accept="image/png, image/gif, image/jpeg"
                                            onChange={(event) => funcChooseFileThree(event)}
                                        >
                                        </input>
                                    </div>
                                </div>
                            </form>
                            <img ref={imageRefThree} src={imageTempThree} style={{ display: 'none' }} ></img>
                            <div style={{ width: '250px', height: '250px' }}>
                                <img src={previewImageThree} style={{ height: '100%', width: '100%' }} ></img>
                            </div>
                        </div>

                    </div>
                    <div style={{ height: '80px' }} >
                        <button onClick={btnShowAddItemComboDetail} style={{ border: '0em', backgroundColor: '#00ff00', width: '10em', height: '4em', fontSize: '1em', position: 'absolute', right: '0px', marginRight: '14em', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0px 5px 10px 0px #aa0000' }} >Thêm sản phẩm cho Combo</button>
                    </div>
                    <div className='DHO-don'>
                        <div className='order_review'>
                            <div className='tam-tinh6 chubang'><h3>Xóa</h3></div>
                            <div className='tam-tinh6 chubang'><h3>STT</h3></div>
                            <div className='tam-tinh3 chubang'><h3>Mã hàng</h3></div>
                            <div className='sanpham311 chubang'><h3>Tên hàng</h3></div>
                            <div className='tam-tinh5 chubang'><h3>Số lượng </h3></div>
                            <div className='tam-tinh5 chubang'><h3>Giá bán</h3></div>
                            <div className='tam-tinh6 chubang'><h3>ĐVT</h3></div>
                            <div className='tam-tinh3 chubang'><h3>QCDG</h3></div>
                            <div className='tam-tinh5 chubang'><h3>Hình ảnh</h3></div>
                        </div>
                        {
                            arrComboDetail.map((item, i) => {
                                return (
                                    <div className='order_review1'>
                                        <div className='tam-tinh6 chubang1'>
                                            <button style={{ backgroundColor: 'transparent', backgroundRepeat: 'no-repeat', border: 'none', cursor: 'pointer', marginTop: 10 }}
                                                onClick={() => delItemComboDetail(item)}
                                            >
                                                <img src='https://img.icons8.com/ios/2x/fa314a/delete-trash.png' width='20' height='20'></img>
                                            </button>
                                        </div>
                                        <div className='tam-tinh6 chubang1'><h3>{(i + 1)}</h3></div>
                                        <div className='tam-tinh3 chubang1'><h3>{item.MaHang}</h3></div>
                                        <div className='sanpham311 chubang1'><h3>{item.TenHang}</h3></div>
                                        <div className='tam-tinh5 chubang1' style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <p style={{ border: 'none', fontSize: '20px' }} className='so'>{item.SoLuong}</p>

                                        </div>
                                        <div className='tam-tinh5 chubang1' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <p style={{ border: 'none', textAlign: 'right', fontSize: 16 }}>{item.GiaBan}</p>
                                            <p style={{ fontSize: 16, top: 2 }}>{` VND`}</p>
                                        </div>
                                        <div className='tam-tinh6 chubang1'><h3>{item.DVT}</h3></div>
                                        <div className='tam-tinh3 chubang1'><h3>{item.QCDG}</h3></div>
                                        <div className='tam-tinh5 chubang1'><h3>{item.HinhAnh}</h3></div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={btnCancelAddCombo} color="primary">Không Thêm</Button>
                    <Button onClick={btnAddCombo} color="primary" autoFocus>Đồng ý</Button>
                </DialogActions>
            </Dialog>

            {/* Thêm sản phẩm vào combo */}

            <Dialog
                open={btnShowDialogAddComboDetail}
                onClose={() => btnHideAddItemComboDetail()}
                style={customStyles}
                contentLabel="Đăng kí"
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
                                        disabled
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
                                        disabled
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
};