import React, { useState, useEffect, useCallback } from 'react';
import Paper from '@material-ui/core/Paper';
import _ from 'lodash';
import {
    FilteringState,
    PagingState,
    IntegratedPaging,
    RowDetailState,
    SortingState,
    GroupingState,
    IntegratedGrouping,
    IntegratedSorting,
} from '@devexpress/dx-react-grid';
import DateRange from '@material-ui/icons/DateRange';
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { ExportReactCSV } from './ExportReactCSV'
import {
    Grid,
    Table,
    Toolbar,
    TableHeaderRow,
    TableGroupRow,
    GroupingPanel,
    DragDropProvider,
    TableColumnResizing,
    TableColumnVisibility,
    ColumnChooser,
    VirtualTable,
    PagingPanel,
    TableFilterRow,
    TableRowDetail,
} from '@devexpress/dx-react-grid-material-ui';
import SuaLoHang from './SuaLoHang'
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import { API_URL } from '../constants/constants'
import Modal from 'react-modal';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'
import '../css/cssDialogAlert/dialogAlert.css'

export default ({ dataFromParent, parentCallback, parentCallback2, candate }) => {
    const [expandedRowIds, setExpandedRowIds] = useState([]);
    const [pageSizes] = useState([8, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 0]);
    const [selection, setSelection] = useState([]);
    const [thang, setThang] = useState({ value: 'null', label: 'Chọn tháng' });
    useEffect(() => {
        // console.log(selection);
    }, [selection]);
    //modal
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

    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalIsOpen2, setIsOpen2] = useState(false);

    Modal.setAppElement('#root')

    const toggleModal = () => {
        if (sdt == "" || sdt == null || sdt == undefined) {
            // alert("Số điện thoại trống")
            setValueDialog("Số điện thoại trống")
            setBoolDialogError(true)
        } else {
            if (tenncc == "" || tenncc == null || tenncc == undefined) {
                // alert("Tên nhâ cung cấp trống")
                setValueDialog("Tên nhâ cung cấp trống")
                setBoolDialogError(true)
            } else {
                if (tentk == "" || tentk == null || tentk == undefined) {
                    // alert("Tên tài khoản trống")
                    setValueDialog("Tên tài khoản trống")
                    setBoolDialogError(true)
                }
                else {
                    if (sotk == "" || sotk == null || sotk == undefined) {
                        // alert("Số tài khoản trống")
                        setValueDialog("Số tài khoản trống")
                        setBoolDialogError(true)
                    }
                    else {
                        if (tennh == "" || tennh == null || tennh == undefined) {
                            // alert("Tên ngân hàng trống")
                            setValueDialog("Tên ngân hàng trống")
                            setBoolDialogError(true)
                        }
                        else {
                            setIsOpen(!modalIsOpen)
                        }
                    }
                }
            }
        }

    }
    const toggleModal2 = () => {
        setIsOpen2(!modalIsOpen2)
        setTenNCC('')
        setSDT('')
        setTenTK('')
        setSoTK('')
        setTenNH('')
        setTongTien(0)
        setDaTra(0)
    }

    const [columns2] = useState([
        { name: 'IdSTT', title: 'ID' },
        { name: 'MaHang', title: 'Mã Hàng' },
        { name: 'TenHang', title: 'Tên Hàng' },
        { name: 'SoLuong', title: 'Số Lượng' },
        { name: 'DonGia', title: 'Đơn Giá' },
        { name: 'DVT', title: 'Đơn Vị Tính' },
        { name: 'MaLH', title: 'Mã Lô Hàng' },
        { name: 'NgayNhapHang', title: 'Ngày Nhập Hàng' },
        { name: 'TenNCC', title: 'Tên NCC' },
        { name: 'SDT', title: 'SDT' },
        { name: 'TenTK', title: 'Tên TK' },
        { name: 'SoTK', title: 'Số TK' },
        { name: 'TenNH', title: 'Tên NH' },
        { name: 'HanSD', title: 'Hạn Sử Dụng' },
    ]);
    const [columns] = useState([
        { name: 'MaHang', title: 'Mã Hàng' },
        { name: 'TenHang', title: 'Tên Hàng' },
        { name: 'SoLuong', title: 'Số Lượng' },
        { name: 'DonGia', title: 'Đơn Giá' },
        { name: 'DVT', title: 'Đơn Vị Tính' },
        { name: 'MaLH', title: 'Mã Lô Hàng' },
        { name: 'NgayNhapHang', title: 'Ngày Nhập Hàng' },
        { name: 'TenNCC', title: 'Tên NCC' },
        { name: 'SDT', title: 'SDT' },
        { name: 'TenTK', title: 'Tên TK' },
        { name: 'SoTK', title: 'Số TK' },
        { name: 'TenNH', title: 'Tên NH' },
        { name: 'HanSD', title: 'Hạn Sử Dụng' },
    ]);

    let newDate = new Date()
    let date = "LoHang " + newDate.getDate() + "/" + (newDate.getMonth() + 1) + "/" + newDate.getFullYear();

    const [defaultColumnWidths2] = useState([
        { columnName: 'IdSTT', width: 75 },
        { columnName: 'MaHang', width: 150 },
        { columnName: 'TenHang', width: 220 },
        { columnName: 'SoLuong', width: 150 },
        { columnName: 'DonGia', width: 150 },
        { columnName: 'DVT', width: 150 },
        { columnName: 'MaLH', width: 150 },
        { columnName: 'HanSD', width: 150 },
        { columnName: 'NgayNhapHang', width: 150 },
        { columnName: 'TenNCC', width: 100 },
        { columnName: 'SDT', width: 100 },
        { columnName: 'TenTK', width: 100 },
        { columnName: 'SoTK', width: 100 },
        { columnName: 'TenNH', width: 100 },
    ]);
    const [defaultColumnWidths] = useState([
        // { columnName: 'IdSTT', width: 75 },
        { columnName: 'MaHang', width: 150 },
        { columnName: 'TenHang', width: 220 },
        { columnName: 'SoLuong', width: 150 },
        { columnName: 'DonGia', width: 150 },
        { columnName: 'DVT', width: 150 },
        { columnName: 'MaLH', width: 150 },
        { columnName: 'HanSD', width: 150 },
        { columnName: 'NgayNhapHang', width: 150 },
        { columnName: 'TenNCC', width: 100 },
        { columnName: 'SDT', width: 100 },
        { columnName: 'TenTK', width: 100 },
        { columnName: 'SoTK', width: 100 },
        { columnName: 'TenNH', width: 100 },
    ]);
    const [grouping, setGrouping] = useState([{ columnName: 'TenNCC' }]);
    const deleted = () => {
        var i;
        for (i = 0; i < selection.length; i++) {
            console.log("delete")
            console.log(dataFromParent[i])
        }
    };

    const callbackFunction = (childData) => {
        parentCallback(childData)
        setExpandedRowIds([])
    };

    const callbackCandate = (childData) => {
        candate(childData)
    };


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

    //hàm them 1 lo hang
    const [maHang, setMaHang] = useState('')
    const [tenHang, setTenHang] = useState('')
    const [soLuong, setSoLuong] = useState()
    const [donGia, setDonGia] = useState()
    const [dVT, setDVT] = useState('')
    const [maLH, setMaLH] = useState('')
    const [tenncc, setTenNCC] = useState('')
    const [tongTien, setTongTien] = useState(0)
    const [daTra, setDaTra] = useState(0)
    const [sdt, setSDT] = useState('')
    const [tentk, setTenTK] = useState()
    const [sotk, setSoTK] = useState('')
    const [tennh, setTenNH] = useState('')
    // const [ngaySX, setNgaySX] = useState('')
    const [hanSD, setHanSD] = useState('')
    const [ghiChu, setGhiChu] = useState('')


    // const [arrLoHanThem, setArrLoHanThem] = useState([])

    const themLoHang = async () => {
        //========
        if (maHang == "" || maHang == null || maHang == undefined) {
            // alert("Mã hàng trống")
            setValueDialog("Mã hàng trống")
            setBoolDialogError(true)
        } else {
            if (tenHang == "" || tenHang == null || tenHang == undefined) {
                // alert("Tên hàng trống")
                setValueDialog("Tên hàng trống")
                setBoolDialogError(true)
            } else {
                if (soLuong == "" || soLuong == null || soLuong == undefined) {
                    // alert("Số lượng trống")
                    setValueDialog("Số lượng trống")
                    setBoolDialogError(true)
                }
                else {
                    if (donGia == "" || donGia == null || donGia == undefined) {
                        // alert("Đơn giá trống")
                        setValueDialog("Đơn giá trống")
                        setBoolDialogError(true)
                    }
                    else {
                        if (dVT == "" || dVT == null || dVT == undefined) {
                            // alert("Đơn vị tính trống")
                            setValueDialog("Đơn vị tính trống")
                            setBoolDialogError(true)
                        }
                        else {
                            if (maLH == "" || maLH == null || maLH == undefined) {
                                // alert("Mã lô hàng trống")
                                setValueDialog("Mã lô hàng trống")
                                setBoolDialogError(true)
                            }
                            else {
                                if (sdt.length == 0) {
                                    // alert(`Số điện thoại trống`)
                                    setValueDialog(`Số điện thoại trống`)
                                    setBoolDialogError(true)
                                } else {
                                    //==========
                                    // full dd/MM/yyyy lọc cả tháng 2 nhưng không thể gõ d/M/yyyy
                                    // const regexDate = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|(([1][26]|[2468][048]|[3579][26])00))))$/g
                                    const regexDate = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
                                    if (hanSD == "" || hanSD == null || hanSD == undefined || !regexDate.test(hanSD)) {
                                        // alert("Hạn sử dụng trống hoặc sai định dạng")
                                        setValueDialog("Hạn sử dụng trống hoặc sai định dạng")
                                        setBoolDialogError(true)
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
                                            // alert("Sai ngày tháng 2 rồi kìa =)))")
                                            setValueDialog("Sai ngày tháng 2 rồi kìa =)))")
                                            setBoolDialogError(true)
                                        } else {
                                            const date = new Date(hanSDdate)
                                            const ngayHienTai = new Date()
                                            if (date <= ngayHienTai) {
                                                // alert("Không thêm được. Hạn sử dụng nhỏ hơn hoặc bằng ngày hiện tại")
                                                setValueDialog("Không thêm được. Hạn sử dụng nhỏ hơn hoặc bằng ngày hiện tại")
                                                setBoolDialogError(true)
                                            } else if (date > ngayHienTai && soSanhNgay.inDays(date, ngayHienTai) <= 365) {
                                                // dialog yes no
                                                setHanSD(hanSDdate)
                                                setOpen3(true)
                                            } else {
                                                const obj = {
                                                    MaHang: maHang,
                                                    TenHang: tenHang,
                                                    SoLuong: soLuong,
                                                    DonGia: donGia,
                                                    DVT: dVT,
                                                    MaLH: maLH,
                                                    HanSD: hanSDdate,
                                                    GhiChu: ghiChu,
                                                    TenNCC: tenncc,
                                                    SDT: sdt,
                                                    TenTK: tentk,
                                                    SoTK: sotk,
                                                    TenNH: tennh,
                                                    NgayNhapHang: '',
                                                    TongTien: tongTien,
                                                    DaTra: daTra,
                                                    CongNo: tongTien - daTra
                                                }
                                                let arrLH = arrAddLoHan
                                                arrLH.push(obj)
                                                setArrAddLoHan(arrLH)
                                                setMaHang('')
                                                setTenHang('')
                                                setSoLuong(0)
                                                setDonGia(0)
                                                setDVT('')
                                                setMaLH('')
                                                setHanSD('')
                                                setGhiChu('')
                                                toggleModal()
                                            }
                                        }
                                    }
                                    //=======
                                }
                            }
                        }
                    }
                }
            }
        }
        //======
    }
    //end

    //style cho các dòng trong table
    const styles = theme => ({
        tableStriped: {
            '& tbody tr:nth-of-type(odd)': {
                backgroundColor: '#c5dfb3',
                // backgroundColor: fade(theme.palette.primary.main, 0.20),
            },
        },
        toolbar: {
            border: '3px solid',

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
    //end style cho các dòng trong table
    //hàm cho filter 
    const [filterRowVisible, setFilterRowVisible] = useState(true);//biến ẩn hiện filter
    const [toolbarRowVisible, setToolbarRowVisible] = useState(false);//biến ẩn hiện Toolbar
    const [filters, setFilters] = useState([]);

    const callbackFunction2 = (childData2) => {
        parentCallback2(childData2)
    };
    const groupingMessages = {
        groupByColumn: 'Vui lòng kéo header bạn muốn sắp xếp vào đây!',

    };
    const debounceFunc = useCallback(
        _.debounce(e => { callbackFunction2(e) }, 500),
        []
    );

    const handleChange = e => {
        debounceFunc(e);
    };

    const FilterIcon = ({ type, ...restProps }) => {
        if (type === 'month') return <DateRange {...restProps} />;
        return <TableFilterRow.Icon type={type} {...restProps} />;
    };
    const getHiddenColumnsFilteringExtensions = hiddenColumnNames => hiddenColumnNames
        .map(columnName => ({
            columnName,
            predicate: () => false,
        }));
    const [defaultHiddenColumnNames] = useState([]); // ẩn cột IdSTT
    const [filteringColumnExtensions, setFilteringColumnExtensions] = useState(
        getHiddenColumnsFilteringExtensions(defaultHiddenColumnNames),
    );

    const onHiddenColumnNamesChange = hiddenColumnNames => setFilteringColumnExtensions(
        getHiddenColumnsFilteringExtensions(hiddenColumnNames),
    );
    //end hàm cho filter 
    const RowDetail = ({ row }) => (
        <SuaLoHang rowfromtable={row} parentCallback={callbackFunction} />
    );

    //biến cho nút imports
    const [imports, setImports] = useState(false);

    const animports = () => {
        setImports(!imports)
        setImports2(false)
    }

    //biến cho nút imports2
    const [imports2, setImports2] = useState(false);

    const animports2 = () => {
        setImports2(!imports2)
        setImports(false)
    }

    const [selectedFile, setSelectedFile] = useState();
    const [selectedFile2, setSelectedFile2] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [isFilePicked2, setIsFilePicked2] = useState(false);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };


    const changeHandler2 = (event) => {
        setSelectedFile2(event.target.files[0]);
        setIsFilePicked2(true);
    };

    const [change, setChange] = useState([]);
    const [change2, setChange2] = useState([]);

    //hàm cho dialog
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClickOpen2 = () => {
        setOpen2(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };

    const handleClose3 = () => {
        setOpen3(false);
    };

    const handleClose_KhongXoa = () => {
        setOpen3(false);
    };

    const handleClose_Them = async () => {
        const obj = {
            MaHang: maHang,
            TenHang: tenHang,
            SoLuong: soLuong,
            DonGia: donGia,
            DVT: dVT,
            MaLH: maLH,
            HanSD: hanSD,
            GhiChu: ghiChu,
            TenNCC: tenncc,
            SDT: sdt,
            TenTK: tentk,
            SoTK: sotk,
            TenNH: tennh,
            NgayNhapHang: '',
            TongTien: tongTien,
            DaTra: daTra,
            CongNo: tongTien - daTra
        }
        let arrLH = arrAddLoHan
        arrLH.push(obj)
        setArrAddLoHan(arrLH)
        setMaHang('')
        setTenHang('')
        setSoLuong(0)
        setDonGia(0)
        setDVT('')
        setMaLH('')
        setHanSD('')
        setGhiChu('')
        toggleModal()
        setOpen3(false);
    };

    const handleClose_KhongSua = () => {
        setOpen(false);
    };

    const handleClose_KhongSua2 = () => {
        setOpen2(false);
    };

    const handleClose_Sua = () => {
        fetch(API_URL + '/capNhatChiTietLoHangTuFileExcel', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sanPhamThayDoi: change,
            })
        })
            .then((response) => response.json())
            .then((data) => {
                // alert(data.msg)
                setValueDialog(data.msg)
                setBoolDialogSuccess(true)
                setOpen(false);
                setTimeout(() => {
                    const rand = Math.random(2) * 1000
                    callbackFunction(rand)
                    setValueDialog(`Hoàn thành cập nhật`)
                    setBoolDialogSuccess(true)
                }, 45000);
            })
    };

    const handleClose_Sua2 = () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sanPhamThayDoi: change2,
            })
        }
        fetch(API_URL + '/themChiTietLoHanHangCanDate', requestOptions).then((response) => response.json()).then((qwe) => {
            // alert(data.msg)
            setValueDialog(qwe.msg)
            setBoolDialogWarning(true)
        })
        setOpen2(false);
        setTimeout(() => {
            const rand = Math.random(2) * 1000
            callbackFunction(rand)
            // alert(`Hoàn thành cập nhật.`)
            setValueDialog(`Hoàn thành cập nhật.`)
            setBoolDialogSuccess(true)
        }, 30000);
    };

    const handleSubmission = async () => {
        const formData = new FormData();
        formData.append('CapNhatLoHang', selectedFile);
        const requestOptions = {
            method: 'POST',
            body: formData,
            headers: {
            }
        }
        await fetch(API_URL + "/danhSachThayDoiSanPhamTrongLoHang", requestOptions).then(res => res.json())
            .then(qwe => {
                setValueDialog(qwe.msg)
                if (qwe.code == 5 || qwe.code == 4 || qwe.code == 3 || qwe.code == 2) {
                    setBoolDialogError(true)
                }
                if (qwe.code === 0) {
                    const result = qwe.data
                    let list = []
                    let i = 0
                    while (i < result.length) {
                        if (result[i] != null) {
                            let hanSD = ""
                            let strHanSD = result[i][7]
                            if (strHanSD.indexOf("/") > 0) {
                                const data = strHanSD.split("/")
                                let ngay = data[2]
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
                                const nam = data[0]
                                hanSD = ngay + "/" + thang + "/" + nam
                            } else if (strHanSD.indexOf("-") > 0) {
                                const data = strHanSD.split("-")
                                let ngay = data[2]
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
                                const nam = data[0]
                                hanSD = ngay + "/" + thang + "/" + nam
                            } else if (strHanSD.indexOf(".") > 0) {
                                const data = strHanSD.split(".")
                                let ngay = data[2]
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
                                const nam = data[0]
                                hanSD = ngay + "/" + thang + "/" + nam
                            }
                            if (hanSD != null || hanSD != undefined) {
                                list.push({
                                    IdSTT: result[i][0], MaHang: result[i][1], TenHang: result[i][2], SoLuong: result[i][3], DonGia: result[i][4], DVT: result[i][5], MaLH: result[i][6], HanSD: hanSD
                                })
                            }
                        }

                        i++
                    }
                    setChange(list)
                    handleClickOpen();
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleSubmission2 = async () => {
        const formData = new FormData();
        formData.append('LoHang', selectedFile2);
        const requestOptions = {
            method: 'POST',
            body: formData,
            headers: {

            }
        }
        await fetch(API_URL + "/nhapChiTietLoHangTuFileExcel", requestOptions).then(res => res.json())
            .then(qwe => {
                // alert(qwe.msg)
                setValueDialog(qwe.msg)
                if (qwe.code == 0) {
                    setBoolDialogSuccess(true)
                }
                if (qwe.code == 5 || qwe.code == 4 || qwe.code == 3 || qwe.code == 2) {
                    setBoolDialogError(true)
                }
                if (qwe.code === 6) {
                    setBoolDialogWarning(true)
                    setTimeout(() => {
                        let list = []
                        let i = 0
                        const tmp = qwe.data
                        while (i < tmp.length) {
                            let hanSD = ""
                            try {
                                const nam = tmp[i][6].getFullYear()
                                let thang = (tmp[i][6].getMonth() + 1)
                                if (thang.length == 1) {
                                    thang = "0" + thang
                                }
                                let ngay = tmp[i][6].getDate()
                                if (ngay.length == 1) {
                                    ngay = "0" + ngay
                                }
                                hanSD = ngay + "/" + thang + "/" + nam
                            } catch (err) {
                                const nam2 = tmp[i][6].slice(0, 4)
                                const thang2 = tmp[i][6].slice(5, 7)
                                const ngay2 = tmp[i][6].slice(8, 10)
                                hanSD = ngay2 + "/" + thang2 + "/" + nam2
                            }
                            if (hanSD != null || hanSD != undefined) {
                                list.push({
                                    MaHang: tmp[i][0], TenHang: tmp[i][1], SoLuong: tmp[i][2], DonGia: tmp[i][3], DVT: tmp[i][4], MaLH: tmp[i][5], HanSD: hanSD
                                })
                            }
                            i++
                        }
                        setChange2(list)
                        handleClickOpen2();
                    }, 25000);
                }
                if (qwe.code == 0) {
                    setTimeout(() => {
                        const rand = Math.random(2) * 1000
                        parentCallback(rand)
                        // alert(`Hoàn thành cập nhật.`)
                        setValueDialog(`Hoàn thành cập nhật.`)
                        setBoolDialogSuccess(true)
                    }, 60000);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const [input, setInput] = useState([]);//mang gợi ý của search
    const [input2, setInput2] = useState([]);//mang gợi ý của số điện thoại nhà cung cấp
    useEffect(() => {
        fetch(API_URL + '/getsuggestadtmh', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
            .then((response) => response.json())
            .then(data => {
                setInput(data)
            });
        fetch(API_URL + '/getSuggestSDTNCC', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
            .then((response) => response.json())
            .then(data => {
                setInput2(data)
            });
    }, [])

    const handleSubmit = async (event, value) => {
        event.preventDefault();
        if (value != null || value != undefined) {
            await fetch(API_URL + "/chiTietSanPhamThemLH/" + value)
                .then(res => res.json())
                .then(qwe => {
                    // console.log(new Date().getTime() + " qwe= " + JSON.stringify(qwe))
                    if (qwe.code == 0) {
                        const data = qwe.data
                        setMaHang(data.MaHang)
                        setTenHang(data.TenHang)
                        setDVT(data.DVT)
                        setDonGia(data.GiaVon)

                    } else {
                        // alert(qwe.msg)
                        setValueDialog(qwe.msg)
                        setBoolDialogWarning(true)
                        setMaHang('')
                        setTenHang('')
                        setDVT('')
                        setDonGia(0)
                    }
                })
        } else {
            setMaHang('')
            setTenHang('')
            setDVT('')
            setDonGia(0)
        }
    }

    // hàm lấy chi tiết nhà cung cấp từ gợi ý số điện thoại nhà cung cấp.
    const handleSubmit2 = async (event, value) => {
        event.preventDefault();
        if (value != null || value != undefined) {
            if (value.length == 10 || value.length == 11) {
                setSDT(value)
                const res = await fetch(`${API_URL}/thongTinNCC/${value}`).then(res => res.json())
                if (res.length > 0) {
                    setTenNCC(res[0].TenNCC)
                    setTenTK(res[0].TenTK)
                    setSoTK(res[0].SoTK)
                    setTenNH(res[0].TenNH)
                } else {
                    console.log(`${new Date().getTime()} Table_LoHang 920 không tìm thấy nhà cung cấp với sđt nhập vào=`)
                }
            } else {
                setValueDialog(`Số điện thoại dài 10 hoặc 11 số`)
                setBoolDialogError(true)
            }
        } else {
            setTenNCC('')
            setTenTK('')
            setSoTK('')
            setTenNH('')
        }
    }


    //  code lụi mà nó hiểu, vl thật =)) này thì enter thì tự động chọn có hả, chuyện này OK =)))
    const testKey = (e) => {
        if (e.code === "Enter") {
            handleClose_Sua2()
        }
    }

    const testKey2 = (e) => {
        if (e.code === "Enter") {
            handleClose_Sua()
        }
    }

    const testKey3 = (e) => {
        if (e.code === "Enter") {
            themLoHang()
        }
    }
    const testKey5 = (e) => {
        if (e.code === "Enter") {
            themLoHang()
        }
    }

    const testKey4 = (e) => {
        if (e.code === "Enter") {
            handleClose_Them()
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

    const ngayHomNayTranhCanDate = new Date()

    const reLoad = () => {
        const rand = Math.random(2) * 1000
        callbackFunction(rand)
    }

    const [arrAddLoHan, setArrAddLoHan] = useState([])

    const opt_NCC = [
        { value: '0', label: 'NCC cũ' },
        { value: '1', label: 'NCC mới' },

    ];

    const [loaiNCC, setLoaiNCC] = useState([])

    useEffect(() => {
        setTenNCC('')
        setSDT('')
        setTenTK('')
        setSoTK('')
        setTenNH('')
    }, [loaiNCC])


    const xoa1SanPhamCuaChiTietDonHang = (obj) => {
        const newList = arrAddLoHan.filter(item => item.MaHang != obj.MaHang)
        setArrAddLoHan(newList)
    }

    const sendArrLoHan = async () => {
        if (sdt.length <= 0) {
            // alert(`Chưa nhập số điện thoại`)
            setValueDialog(`Chưa nhập số điện thoại`)
            setBoolDialogWarning(true)
        } else {
            if (tongTien <= 0) {
                // alert(`Tổng tiền phải lớn hơn 0`)
                setValueDialog(`Tổng tiền phải lớn hơn 0`)
                setBoolDialogWarning(true)
            } else {
                if (arrAddLoHan.length <= 0) {
                    // alert(`Chưa thêm lô hạn sử dụng`)
                    setValueDialog(`Chưa thêm lô hạn sử dụng`)
                    setBoolDialogWarning(true)
                } else {
                    const requestOptions = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            List: arrAddLoHan,
                        })
                    }
                    await fetch(API_URL + "/danhSachTatCaChiTietLoHang/", requestOptions).then(res => res.json()).then(data => { })
                    const rand = Math.random(2) * 1000
                    parentCallback(rand)
                    setIsOpen2(!modalIsOpen2)
                    setTenNCC('')
                    setSDT('')
                    setTenTK('')
                    setSoTK('')
                    setTenNH('')
                    setTongTien(0)
                    setDaTra(0)
                }
            }
        }
    }

    const [valueDialog, setValueDialog] = useState('test test test test ')
    // const [boolDialog, setBoolDialog] = useState(false)
    const [boolDialogSuccess, setBoolDialogSuccess] = useState(false)
    const [boolDialogWarning, setBoolDialogWarning] = useState(false)
    const [boolDialogError, setBoolDialogError] = useState(false)

    const testKey6 = (e) => {
        if (e.code === "Enter") {
            setBoolDialogSuccess(false)
            setBoolDialogWarning(false)
            setBoolDialogError(false)
            setValueDialog(``)
        }
    }


    return (
        <div>

            {/* paper hiện table lô hạn */}

            <Paper>
                <div style={{ width: '100%', display: 'flex', backgroundColor: '#B8d8e0' }}>
                    <div style={{ width: '30%', height: 50, textAlign: 'left', marginLeft: 10, display: "flex", alignSelf: 'center', color: '#197420' }}>
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
                        <FormControlLabel
                            control={
                                <Switch
                                    disabled
                                    style={{ width: '50%' }}
                                    checked={toolbarRowVisible}
                                    onChange={() => { setToolbarRowVisible(!toolbarRowVisible) }}
                                />
                            }
                            label="Ẩn/Hiện bộ chọn cột"
                        />
                    </div>
                    <div style={{ width: '40%', textAlign: 'center', alignSelf: 'center', color: '#197420' }}><b><h2> Bảng Thống Kê Lô Hạn Sử Dụng</h2></b></div>
                    <div style={{ width: '30%', textAlign: 'right', alignSelf: 'center' }}>
                        {/* <button className='btn-thongke1' onClick={reLoad}>
                            <b>Reload</b>
                        </button> */}

                        <button className='btn-thongke1' style={{ backgroundColor: '#e9311a' }} onClick={() => {
                            const rand = Math.random(2) * 1000
                            candate(`str${rand}`)
                        }} >
                            <b>Cận Date</b>
                        </button>

                        <button className='btn-thongke1' style={{ backgroundColor: '#2de183' }} onClick={toggleModal2} >
                            <b>Add</b>
                        </button>

                        <button className='btn-thongke1' style={{ backgroundColor: '#026c80' }} onClick={animports2}>
                            <b>Update</b>
                        </button>

                        {
                            imports2 ?
                                <div>
                                    <input type="file" enctype="multipart/form-data" onChange={changeHandler} style={{ width: '60%', fontWeight: 'bold', fontSize: 18, padding: 5, backgroundColor: '#fff' }} />
                                    <button onClick={handleSubmission} style={{ padding: 10, borderRadius: 10, backgroundColor: '#fdbe07', color: '#fff', fontWeight: 'bold', border: 'none', margin: 5, cursor: 'pointer' }}>Tải file lên hệ thống</button>
                                </div>
                                : null
                        }
                        <button className='btn-thongke1' style={{ backgroundColor: '#ff9646' }} onClick={animports}>
                            <b>Import</b>
                        </button>
                        {
                            imports ?
                                <div>
                                    <input type="file" enctype="multipart/form-data" onChange={changeHandler2} style={{ width: '60%', fontWeight: 'bold', fontSize: 18, padding: 5, backgroundColor: '#fff' }} />
                                    <button onClick={handleSubmission2} style={{ padding: 10, borderRadius: 10, backgroundColor: '#fdbe07', color: '#fff', fontWeight: 'bold', border: 'none', margin: 5, cursor: 'pointer' }}>Tải file lên hệ thống</button>
                                </div>
                                : null
                        }
                        <ExportReactCSV csvData={dataFromParent} fileName={date} />
                    </div>
                </div>
                <Grid
                    rows={dataFromParent}
                    columns={columns}
                >
                    <SortingState
                        defaultSorting={[]}
                    />
                    <DragDropProvider />
                    <GroupingState

                        grouping={grouping}
                        onGroupingChange={setGrouping}
                    />
                    <IntegratedGrouping />
                    <IntegratedSorting />
                    <PagingState
                        defaultCurrentPage={0}
                        defaultPageSize={50}
                    />
                    <IntegratedPaging />
                    <FilteringState onFiltersChange={(x) => handleChange(x)} />
                    <VirtualTable tableComponent={TableComponent} columnExtensions={defaultColumnWidths} height={window.innerHeight - 100} />
                    {/* <Table tableComponent={TableComponent} columnExtensions={defaultColumnWidths} height={window.innerHeight - 100} /> */}
                    <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                    <RowDetailState expandedRowIds={expandedRowIds}
                        onExpandedRowIdsChange={setExpandedRowIds} />
                    <TableRowDetail
                        contentComponent={RowDetail}
                    />
                    <TableHeaderRow showSortingControls sortLabelComponent={SortLabel} />
                    <TableGroupRow indentColumnWidth={33} contentCellPadding='0.75rem' />
                    <Toolbar rootComponent={Tabletoolbar} />
                    <GroupingPanel showGroupingControls messages={groupingMessages} />
                    <TableColumnVisibility
                        defaultHiddenColumnNames={defaultHiddenColumnNames}
                        onHiddenColumnNamesChange={onHiddenColumnNamesChange}
                    />
                    {filterRowVisible ? <TableFilterRow
                    /> : null}

                    <ColumnChooser />

                    <PagingPanel
                        pageSizes={pageSizes}
                    />
                </Grid>
            </Paper>

            {/* dialog hiện chi tiết lô hàng thay đổi */}

            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth={'lg'}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                onKeyPress={(e) => testKey2(e)}
            >
                <DialogTitle id="alert-dialog-title">{"Bạn Có Muốn Sửa Các Sản Phẩm Này? Lưu ý có thể có hàng cận date. Hôm nay là ngày " + ngayHomNayTranhCanDate.getDate() + "/" + (ngayHomNayTranhCanDate.getMonth() + 1) + "/" + ngayHomNayTranhCanDate.getFullYear()}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">Có sự thay đổi trong các item sau:</DialogContentText>
                    <Paper>
                        <Grid
                            rows={change}
                            columns={columns2}
                        >
                            <PagingState
                                defaultCurrentPage={0}
                                defaultPageSize={8}
                            />
                            <IntegratedPaging />
                            <VirtualTable tableComponent={TableComponent} columnExtensions={defaultColumnWidths2} />
                            {/* <Table/> */}
                            <TableColumnResizing defaultColumnWidths={defaultColumnWidths2} />
                            <TableHeaderRow />
                            <PagingPanel pageSizes={pageSizes} />
                        </Grid>
                    </Paper>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose_KhongSua} color="primary">Không Sửa</Button>
                    <Button onClick={handleClose_Sua} color="primary" autoFocus>Đồng ý</Button>
                </DialogActions>
            </Dialog>

            {/* dialog hiện chi tiết lô hàng cận date */}

            <Dialog
                open={open2}
                onClose={handleClose2}
                fullWidth={true}
                maxWidth={'lg'}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                onKeyPress={(e) => testKey(e)}
            >
                <DialogTitle id="alert-dialog-title">{"Bạn Có Muốn Thêm Các Sản Phẩm CẬN DATE Này?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">Có hàng cận date trong các item sau:</DialogContentText>
                    <Paper>
                        <Grid
                            rows={change2}
                            columns={columns}
                        >
                            <PagingState
                                defaultCurrentPage={0}
                                defaultPageSize={8}
                            />
                            <IntegratedPaging />
                            <VirtualTable tableComponent={TableComponent} columnExtensions={defaultColumnWidths} />
                            {/* <Table/> */}
                            <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                            <TableHeaderRow />
                            <PagingPanel pageSizes={pageSizes} />
                        </Grid>
                    </Paper>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose_KhongSua2} color="primary">Không</Button>
                    <Button onClick={handleClose_Sua2} color="primary" autoFocus>Đồng ý</Button>
                </DialogActions>
            </Dialog>

            {/* Thêm lô hàng thủ công */}

            <Dialog
                open={modalIsOpen}
                onClose={toggleModal}
                style={customStyles}
                contentLabel="Đăng kí"
                onKeyPress={(e) => testKey3(e)}
            >
                <div style={{ width: '100%', marginTop: 10 }}>
                    <div style={{ display: 'flex', flexDirection: 'row', background: "#f2f2f2", borderRadius: '5px', maxWidth: '100%', flexWrap: 'wrap', margin: 'auto' }}>
                        <div style={{ maxWidth: '44%', padding: '15px', background: '' }}>
                            <div>
                                <label><b>Mã hàng</b></label><br>
                                </br>
                                <Autocomplete
                                    freeSolo
                                    className="input-text121"
                                    clearOnEscape
                                    clearOnBlur
                                    autoComplete
                                    options={input.map((option) => option.value)}
                                    onChange={handleSubmit}
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
                                <label><b>Tên hàng</b></label><br></br>
                                <input
                                    disabled
                                    className='ip_sodk'
                                    type="text"
                                    value={tenHang}
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
                            <div>
                                <label><b>Đơn giá</b></label><br></br>
                                <input
                                    disabled
                                    className="ip_tenhang"
                                    type="number"
                                    value={donGia}
                                    placeholder="Nhập đơn giá">
                                </input>
                            </div>
                        </div>
                        <div style={{ maxWidth: '44%', padding: '15px', background: '' }}>

                            <form action="">
                                <div>
                                    <label><b>Đơn vị tính</b></label><br></br>
                                    <input
                                        disabled
                                        className='ip_sodk'
                                        type="text"
                                        value={dVT}
                                        // onChange={text => { setDVT(text.target.value) }}
                                        placeholder="Nhập số đăng ký">
                                    </input>
                                </div>
                                <div>
                                    <label><b>Mã lô hàng</b></label><br></br>
                                    <input
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
                                        className='ip_hangsx'
                                        type="text"
                                        value={hanSD}
                                        onChange={text => { setHanSD(text.target.value) }}
                                        placeholder="HSD dd/MM/yyyy">
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

                    </div>
                    <input className="submit" type="submit" value="THÊM LÔ HẠN" onClick={themLoHang}></input>
                </div>
            </Dialog>

            {/* Thêm lô hàng thủ công nâng cấp */}

            <Dialog
                open={modalIsOpen2}
                style={customStyles}
                contentLabel="Đăng kí"
                onKeyPress={(e) => testKey5(e)}
                fullWidth={true}
                maxWidth={'xl'}
            >
                <div style={{ width: '100%', marginTop: 10, textAlign: 'center' }}>
                    <h2 style={{ textAlign: 'center' }}>Thêm lô hạn</h2>
                </div>
                <Button className='btnthemlohan' id="alert-dialog-title" onClick={toggleModal} >{`Thêm lô hạn`}</Button>
                <DialogContent>
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '43%', padding: '15px', background: '' }}>
                            <div>
                                <label><b style={{ fontSize: '1.5em' }} >Số diện thoại nhà cung cấp (ấn Enter nếu là SĐT mới)</b></label><br>
                                </br>
                                <Autocomplete
                                    freeSolo
                                    className="input-text1222"
                                    clearOnEscape
                                    clearOnBlur
                                    autoComplete
                                    value={sdt}
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
                                </Autocomplete>
                            </div>
                        </div>
                    </div>

                    {
                        sdt.length >= 10 ?
                            <div style={{ display: 'flex' }}>
                                <div style={{ width: '43%', padding: '15px', background: '' }}>
                                    <form>
                                        <div>
                                            <div>
                                                <label><b>Tổng tiền</b></label><br></br>
                                                <input
                                                    className='ip_nuocsx'
                                                    type="text"
                                                    value={tongTien}
                                                    onChange={text => { setTongTien(text.target.value) }}
                                                    placeholder="Nhập tổng tiền"
                                                >
                                                </input>
                                            </div>
                                            <label><b>Tên nhà cung cấp</b></label><br></br>
                                            <input
                                                className='ip_nuocsx'
                                                type="text"
                                                value={tenncc}
                                                onChange={text => { setTenNCC(text.target.value) }}
                                                placeholder="Nhập Tên nhà cung cấp"
                                            >
                                            </input>
                                        </div>

                                        <div style={{ marginTop: '7px' }}>
                                            <label><b>Tên tài khoản</b></label><br></br>
                                            <input
                                                className='ip_nuocsx'
                                                type="text"
                                                value={tentk}
                                                onChange={text => { setTenTK(text.target.value) }}
                                                placeholder="Nhập Tên tài khoản"
                                            >
                                            </input>
                                        </div>
                                    </form>
                                </div>
                                <div style={{ width: '43%', padding: '15px', background: '' }}>
                                    <form>
                                        <div>
                                            <label><b>Đã trả</b></label><br></br>
                                            <input
                                                className='ip_nuocsx'
                                                type="text"
                                                value={daTra}
                                                onChange={text => { setDaTra(text.target.value) }}
                                                placeholder="Nhập đã trả"
                                            >
                                            </input>
                                        </div>
                                        <div style={{}}>
                                            <label><b>Số tài khoản</b></label><br></br>
                                            <input
                                                className='ip_nuocsx'
                                                type="text"
                                                value={sotk}
                                                onChange={text => { setSoTK(text.target.value) }}
                                                placeholder="Nhập Số tài khoản"
                                            >
                                            </input>
                                        </div>
                                        <div style={{ marginTop: '4px' }}>
                                            <label><b>Tên ngân hàng</b></label><br></br>
                                            <input
                                                className='ip_nuocsx'
                                                type="text"
                                                value={tennh}
                                                onChange={text => { setTenNH(text.target.value) }}
                                                placeholder="Nhập Tên ngân hàng"
                                            >
                                            </input>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            :
                            null
                    }
                    <div className='DHO-don'>
                        <div className='order_review'>
                            <div className='tam-tinh6 chubang'><h3>Xóa</h3></div>
                            <div className='tam-tinh6 chubang'><h3>STT</h3></div>
                            <div className='tam-tinh3 chubang'><h3>Ma hàng</h3></div>
                            <div className='sanpham311 chubang'><h3>Tên hàng</h3></div>
                            <div className='tam-tinh5 chubang'><h3>Số lượng </h3></div>
                            <div className='tam-tinh5 chubang'><h3>Đơn giá</h3></div>
                            <div className='tam-tinh6 chubang'><h3>ĐVT</h3></div>
                            <div className='tam-tinh3 chubang'><h3>Mã lô hạn</h3></div>
                            <div className='tam-tinh5 chubang'><h3>Hạn sử dụng</h3></div>
                            <div className='tam-tinh5 chubang'><h3>Ghi chú</h3></div>
                        </div>
                        {
                            arrAddLoHan.map((item, i) => {
                                return (
                                    <div className='order_review1'>
                                        <div className='tam-tinh6 chubang1'>
                                            <button style={{ backgroundColor: 'transparent', backgroundRepeat: 'no-repeat', border: 'none', cursor: 'pointer', marginTop: 10 }}
                                                onClick={() => xoa1SanPhamCuaChiTietDonHang(item)}
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
                                            <p style={{ border: 'none', textAlign: 'right', fontSize: 16 }}>{item.DonGia}</p>
                                            <p style={{ fontSize: 16, top: 2 }}>{` VND`}</p>
                                        </div>
                                        <div className='tam-tinh6 chubang1'><h3>{item.DVT}</h3></div>
                                        <div className='tam-tinh3 chubang1'><h3>{item.MaLH}</h3></div>
                                        <div className='tam-tinh5 chubang1'><h3>{item.HanSD}</h3></div>
                                        <div className='tam-tinh5 chubang1'><h3>{item.GhiChu}</h3></div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleModal2} color="primary">Không Thêm</Button>
                    <Button onClick={sendArrLoHan} color="primary" autoFocus>Đồng ý</Button>
                </DialogActions>
            </Dialog>

            {/* Dialog cảnh báo hạn cận date khi thêm lô thủ công */}

            <Dialog
                open={open3}
                onClose={handleClose3}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                onKeyPress={(e) => testKey4(e)}
            >
                <DialogTitle id="alert-dialog-title">{"Bạn có muốn thêm lô hạn cận date này không?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Xác nhận thêm lô hạn này!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose_KhongXoa} color="primary">
                        KHÔNG
                    </Button>
                    <Button onClick={handleClose_Them} color="primary" autoFocus>
                        ĐỒNG Ý
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog hiện alert success waring error */}

            <Dialog
                open={boolDialogSuccess}
                onClose={() => setBoolDialogSuccess(false)}
                onKeyPress={(e) => testKey6(e)}
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
                onKeyPress={(e) => testKey6(e)}
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
                onKeyPress={(e) => testKey6(e)}
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