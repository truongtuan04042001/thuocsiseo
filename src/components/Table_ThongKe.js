import React, { useState, useEffect, useCallback } from 'react';
import Paper from '@material-ui/core/Paper';
import _ from 'lodash';
import {
    SelectionState,
    IntegratedSelection,
    FilteringState,
    SearchState,
    IntegratedFiltering,
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
    TableFixedColumns,
    ColumnChooser,
    TableSelection,
    VirtualTable,
    PagingPanel,
    SearchPanel,
    TableFilterRow,
    TableRowDetail,
} from '@devexpress/dx-react-grid-material-ui';
import { ExportReactCSV } from './ExportReactCSV'
import SuaSanPham from './SuaSanPham';
import { API_URL } from '../constants/constants'
import { generateRows } from './generator';
import SuaTrangThai from './SuaTrangThai';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ThemSanPham from './ThemSanPham'
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
export default ({ dataFromParent, parentCallback, parentCallback2, tenNV }) => {
    const [expandedRowIds, setExpandedRowIds] = useState([]);
    const [pageSizes] = useState([8, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 0]);
    const [columns] = useState([
        { name: 'LoaiHang', title: 'Loại Hàng' },
        { name: 'NhomHang', title: 'Nhóm Hàng' },
        { name: 'NhanhHang', title: 'Nhánh Hàng' },
        { name: 'MaHang', title: 'Mã Hàng' },
        { name: 'TenHang', title: 'Tên Hàng' },
        { name: 'SoDangKy', title: 'Số Đăng Ký' },
        { name: 'HoatChat', title: 'Hoạt Chất' },
        { name: 'HamLuong', title: 'Hàm Lượng' },
        { name: 'HangSX', title: 'Hãng Sản Xuất' },
        { name: 'NuocSX', title: 'Nước Sản Xuất' },
        { name: 'QCDG', title: 'Quy Cách Đóng Gói' },
        { name: 'GiaBan', title: 'Giá Bán' },
        { name: 'GiaVon', title: 'Giá Vốn' },
        { name: 'DVT', title: 'Đơn Vị Tính' },
        { name: 'HinhAnh', title: 'Hình Ảnh' },
        { name: 'MoTa', title: 'Mô Tả' },
        { name: 'TonKho', title: 'Tồn Đầu' },
        { name: 'DaDat', title: 'Đã Xử Lý' },
        { name: 'ConLai', title: 'Tồn Cuối' },
        { name: 'KhachDat', title: 'Đã đặt' },
        { name: 'DangKD', title: 'Đang Kinh Doanh' },
        { name: 'TinhDS', title: 'Tính DS' },
        { name: 'BanChay', title: 'Bán Chạy' },
        { name: 'SPmoi', title: 'Sản Phẩm Mới' },
        { name: 'HDnhanh', title: 'Hóa Đơn Nhanh' },
        { name: 'GHnhanh', title: 'Giao Hàng Nhanh' },
        { name: 'SVip', title: 'Sỉ VIP' },
        { name: 'NhiKhoa', title: 'Nhi Khoa' },
        { name: 'NhaKhoa', title: 'Nha Khoa' },
        { name: 'SanKhoa', title: 'Sản Khoa' },
        { name: 'DaLieu', title: 'Da Liễu' },
        { name: 'NTHop', title: 'Ngoại Tổng Hợp' },
        { name: 'ThanKinh', title: 'Thần Kinh' },
        { name: 'BV', title: 'Bệnh Viên/PKhám' },
        { name: 'FlashSale', title: 'FlashSale' },
        { name: 'PhanTramKM', title: '% Khuyến mãi' },
    ]);

    const [defaultColumnWidths] = useState([
        { columnName: 'LoaiHang', width: 80 },
        { columnName: 'NhomHang', width: 150 },
        { columnName: 'NhanhHang', width: 150 },
        { columnName: 'MaHang', width: 130 },
        { columnName: 'TenHang', width: 200 },
        { columnName: 'SoDangKy', width: 80 },
        { columnName: 'HoatChat', width: 150 },
        { columnName: 'HamLuong', width: 100 },
        { columnName: 'HangSX', width: 200 },
        { columnName: 'NuocSX', width: 100 },
        { columnName: 'QCDG', width: 150 },
        { columnName: 'GiaBan', width: 130 },
        { columnName: 'GiaVon', width: 130 },
        { columnName: 'DVT', width: 80 },
        { columnName: 'HinhAnh', width: 80 },
        { columnName: 'MoTa', width: 100 },
        { columnName: 'TonKho', width: 120 },
        { columnName: 'DaDat', width: 120 },
        { columnName: 'ConLai', width: 130 },
        { columnName: 'KhachDat', width: 130 },
        { columnName: 'DangKD', width: 100 },
        { columnName: 'TinhDS', width: 100 },
        { columnName: 'BanChay', width: 100 },
        { columnName: 'SPmoi', width: 100 },
        { columnName: 'HDnhanh', width: 100 },
        { columnName: 'GHnhanh', width: 130 },
        { columnName: 'SVip', width: 130 },
        { columnName: 'NhiKhoa', width: 130 },
        { columnName: 'NhaKhoa', width: 130 },
        { columnName: 'SanKhoa', width: 130 },
        { columnName: 'DaLieu', width: 130 },
        { columnName: 'NTHop', width: 130 },
        { columnName: 'ThanKinh', width: 130 },
        { columnName: 'BV', width: 150 },
        { columnName: 'FlashSale', width: 130 },
        { columnName: 'PhanTramKM', width: 130 },
    ]);
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
            zIndex: 999,
        },
    };
    const [modalIsOpen, setIsOpen] = useState(false);
    // , wordWrapEnabled: true
    let newDate = new Date()
    let date = "ThongTinSP " + newDate.getDate() + "/" + (newDate.getMonth() + 1) + "/" + newDate.getFullYear();

    const callbackFunction = (childData) => {
        parentCallback(childData)
        setExpandedRowIds([])
    };
    Modal.setAppElement('#root')
    const toggleModal = () => {
        setIsOpen(!modalIsOpen)
    }
    //biến cho nút update/add
    const [update, setUpdate] = useState(false);
    const anupdate = () => setUpdate(!update)
    //const anadd = () =>   handleClickOpen2()
    //biến cho nút update


    //biến cho nút imports
    const [imports, setImports] = useState(false);
    const animports = () => setImports(!imports)
    //biến cho nút imports

    //biến cho upload file
    const [selectedFile2, setSelectedFile2] = useState();
    const [isFilePicked2, setIsFilePicked2] = useState(false);
    const [change2, setChange2] = useState([]);
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [change, setChange] = useState([]);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };
    const changeHandler2 = (event) => {
        setSelectedFile2(event.target.files[0]);
        setIsFilePicked2(true);
    };
    //biến cho upload file

    //hàm thêm 1 sp
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
    const [dangkinhdoanh, setDangKinhDoanh] = useState();
    const [mota, setMoTa] = useState();
    const [hoadon, setHoaDon] = useState();
    const [doanhso, setDoanhSo] = useState();

    const Sub = () => {
        if (loaihang == "" || loaihang == null || loaihang == undefined) {
            alert("Loại Hàng Trống")
        } else {
            if (nhomhang == "" || nhomhang == null || nhomhang == undefined) {
                alert("Nhóm Hàng Trống")
            } else {
                if (mahang == "" || mahang == null || mahang == undefined) {
                    alert("Mã Hàng Trống")
                }
                else {
                    if (tenhang == "" || tenhang == null || tenhang == undefined) {
                        alert("Tên Hàng Trống")
                    }
                    else {
                        if (sodk == "" || sodk == null || sodk == undefined) {
                            alert("Số Đăng Kí Trống")
                        }
                        else {
                            if (hoatchat == "" || hoatchat == null || hoatchat == undefined) {
                                alert("Hoạt Chất Trống")
                            }
                            else {
                                if (hamluong == "" || hamluong == null || hamluong == undefined) {
                                    alert("Hàm Lượng Trống")
                                }
                                else {
                                    if (hangsx == "" || hangsx == null || hangsx == undefined) {
                                        alert("Hãng Sản Xuất Trống")
                                    }
                                    else {
                                        if (nuocsx == "" || nuocsx == null || nuocsx == undefined) {
                                            alert("Nước Sản Xuất Trống")
                                        }
                                        else {
                                            if (quycachdonggoi == "" || quycachdonggoi == null || quycachdonggoi == undefined) {
                                                alert("Quy Cách Đóng Gói Trống")
                                            }
                                            else {
                                                if (giaban == "" || giaban == null || giaban == undefined) {
                                                    alert("Giá Bán Trống")
                                                }
                                                else {
                                                    if (giavon == "" || giavon == null || giavon == undefined) {
                                                        alert("Giá Vốn Trống")
                                                    }
                                                    else {
                                                        if (donvitinh == "" || donvitinh == null || donvitinh == undefined) {
                                                            alert("Đơn Vị Tính Trống")
                                                        }

                                                        else {
                                                            fetch(API_URL + '/themsanpham', {
                                                                method: 'POST',
                                                                headers: {
                                                                    Accept: 'application/json',
                                                                    'Content-Type': 'application/json'
                                                                },
                                                                body: JSON.stringify({
                                                                    loaihang: loaihang,
                                                                    nhomhang: nhomhang,
                                                                    nhanhhang: nhanhhang,
                                                                    mahang: mahang,
                                                                    tenhang: tenhang,
                                                                    sodk: sodk,
                                                                    hoatchat: hoatchat,
                                                                    hamluong: hamluong,
                                                                    hangsx: hangsx,
                                                                    nuocsx: nuocsx,
                                                                    quycachdonggoi: quycachdonggoi,
                                                                    giaban: giaban,
                                                                    giavon: giavon,
                                                                    donvitinh: donvitinh,
                                                                    hinhanh: hinhanh,

                                                                    mota: mota,

                                                                })
                                                            })
                                                                .then((response) => response.json())
                                                                .then(data => {
                                                                    alert(data)
                                                                })
                                                            callbackFunction("helllo")
                                                            toggleModal()
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
    //end hàm thêm 1 sp
    //style cho các dòng trong table
    const styles = theme => ({
        tableStriped: {
            '& tbody tr:nth-of-type(odd)': {
                backgroundColor: '#c5dfb3',
                // backgroundColor: fade(theme.palette.primary.main, 0.13),
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
    //end style cho các dòng trong table

    //hàm update bằng excel
    const handleSubmission = async () => {
        const formData = new FormData();
        formData.append('updatettin', selectedFile);
        await fetch(
            API_URL + "/updatethongtin",
            {
                method: 'POST',
                body: formData,
                headers: {

                }
            }
        )
            .then((response) => response.json())
            .then((result) => {
                let temp = []
                var i;

                for (i = 0; i < result.length; i++) {
                    temp.push({
                        LoaiHang: result[i][0], NhomHang: result[i][1], NhanhHang: result[i][2], MaHang: result[i][3], TenHang: result[i][4], SoDangKy: result[i][5],
                        HoatChat: result[i][6], HamLuong: result[i][7], HangSX: result[i][8], NuocSX: result[i][9], QCDG: result[i][10], GiaBan: result[i][11],
                        GiaVon: result[i][12], DVT: result[i][13], HinhAnh: result[i][14]
                    })
                }
                setChange(temp)
                handleClickOpen();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleSubmission2 = async () => {
        const formData = new FormData();
        formData.append('myFile', selectedFile2);
        await fetch(
            API_URL + "/uploadfile",
            {
                method: 'POST',
                body: formData,
                headers: {
                    //   'authorization': 'Bearer ' + localStorage.getItem("accesstoken")
                }
            }
        )
            .then((response) => response.json())
            .then((result) => {
                alert(result)
                parentCallback('asd')
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    //end hàm update bằng excel

    //hàm cho dialog
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleClose_Sua = () => {
        fetch(API_URL + '/suasanphamexcel', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sermangitem: change,
            })
        }).then((response) => response.json())
            .then((result) => {
                parentCallback("holle")
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        setOpen(false);
    };
    const handleClose_KhongSua = () => {
        setOpen(false);
    };

    //  /////////////////
    //end hàm cho dialog

    //hàm cho filter 
    const [filterRowVisible, setFilterRowVisible] = useState(true);//biến ẩn hiện filter
    const [toolbarRowVisible, setToolbarRowVisible] = useState(false);//biến ẩn hiện Toolbar
    const [filters, setFilters] = useState([]);

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

    const [defaultHiddenColumnNames] = useState(['SoDangKy', 'HamLuong', 'NuocSX', 'DVT', 'MoTa', "BanChay", "SPmoi", "HDnhanh", "GHnhanh", "SVip", "NhiKhoa", "NhaKhoa", "SanKhoa", "DaLieu", "NTHop", "ThanKinh", "BV"]);
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
        <SuaSanPham rowfromtable={row} parentCallback={callbackFunction} tenNV={tenNV} />
    );

    const onlyUnique = (value, index, self) => {
        return self.indexOf(value) === index;
    }

    const updateAllQuantityProductOnStock = async () => {
        // lấy toàn bộ số lượng sản phẩm trong kho còn hạn sử dụng.
        const res1 = await fetch(`${API_URL}/getAllQuantityProductOnStock`).then(res => res.json())
        if (res1.length > 0) {
            // khai báo mảng lưu riêng mã hàng.
            let arrProductCode = []
            res1.forEach(ee1 => {
                arrProductCode.push(ee1.MaHang)
            });
            // filter(onlyUnique) dùng để lọc mã hàng là unique/only.
            let ProductCode = arrProductCode.filter(onlyUnique)
            let arrProductCodeAndQuantity = []
            ProductCode.forEach(ee1 => {
                arrProductCodeAndQuantity.push({
                    MaHang: ee1,
                    TonKho: 0
                })
            });
            arrProductCodeAndQuantity.forEach(ee1 => {
                res1.forEach(ee2 => {
                    if (ee1.MaHang == ee2.MaHang) {
                        ee1.TonKho += ee2.SoLuong
                    }
                });
            });
            // arr mã hàng và tồn đầu.
            // console.log(`${new Date().getTime()} arrProductCodeAndQuantity=`, arrProductCodeAndQuantity)
            const res2 = await fetch(`${API_URL}/getArrOrderCodeProcessed`).then(res => res.json())
            let arrStrOrderCode = []
            res2.forEach(ee1 => {
                arrStrOrderCode.push(ee1.MaDatHang)
            });
            const res3 = await fetch(`${API_URL}/getAllProductCodeAndQuantityOfOrderDetail`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    arrStrOrderCode: arrStrOrderCode
                })
            }).then(res => res.json())
            let arrStrProductCode = []
            res3.forEach(ee1 => {
                arrStrProductCode.push(ee1.MaHang)
            });
            ProductCode.length = 0
            ProductCode = arrStrProductCode.filter(onlyUnique)
            let arrProductCodeAndTotalQuantity = []
            ProductCode.forEach(ee1 => {
                arrProductCodeAndTotalQuantity.push({
                    MaHang: ee1,
                    DaDat: 0
                })
            });
            arrProductCodeAndTotalQuantity.forEach(ee1 => {
                res3.forEach(ee2 => {
                    if (ee1.MaHang == ee2.MaHang) {
                        ee1.DaDat += ee2.SoLuong
                    }
                });
            });
            const arrIdComboAndTotalQuantity = arrProductCodeAndTotalQuantity.filter(item => item.MaHang.indexOf(`COMBO_`) >= 0)
            let arrStrIdCombo = []
            arrIdComboAndTotalQuantity.forEach(ee1 => {
                arrStrIdCombo.push(ee1.MaHang)
            });
            // console.log(`${new Date().getTime()} arrStrIdCombo=`, arrStrIdCombo)
            let res4 = await fetch(`${API_URL}/getProductsInListIdComboForBtnCompleteOrders`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    arrStrIdCombo: arrStrIdCombo
                })
            }).then(res => res.json())
            // đang dừng tại bước lấy chi tiết combo về để cộng dồn số lượng sản phẩm và số lượng combo
            // console.log(`${new Date().getTime()} arrIdComboAndTotalQuantity=`, arrIdComboAndTotalQuantity)

            arrIdComboAndTotalQuantity.forEach(ee1 => {
                res4.forEach(ee2 => {
                    if (ee1.MaHang == ee2.IdCombo) {
                        ee2.SoLuong *= ee1.DaDat
                    }
                });
            });
            let arrProductCodeOfCombo = []
            res4.forEach(ee1 => {
                arrProductCodeOfCombo.push(ee1.MaHang)
            });
            // console.log(`${new Date().getTime()} arrProductCodeOfCombo=`, arrProductCodeOfCombo)
            let arrProductCodeOfComboUnique = arrProductCodeOfCombo.filter(onlyUnique)
            let arrProductCodeAndQuantityOfCombo = []
            arrProductCodeOfComboUnique.forEach(ee1 => {
                arrProductCodeAndQuantityOfCombo.push({
                    MaHang: ee1,
                    DaDat: 0
                })
            });
            // console.log(`${new Date().getTime()} arrProductCodeAndQuantityOfCombo=`, arrProductCodeAndQuantityOfCombo)
            arrProductCodeAndQuantityOfCombo.forEach(ee1 => {
                res4.forEach(ee2 => {
                    if (ee1.MaHang == ee2.MaHang) {
                        ee1.DaDat += ee2.SoLuong
                    }
                });
            });
            // console.log(`${new Date().getTime()} arrProductCodeAndTotalQuantity=`, arrProductCodeAndTotalQuantity)
            // console.log(`${new Date().getTime()} arrProductCodeAndQuantityOfCombo=`, arrProductCodeAndQuantityOfCombo)
            let mergeProductCodeAndProcessedQuantity = []
            arrProductCodeAndTotalQuantity.forEach(ee1 => {
                mergeProductCodeAndProcessedQuantity.push(ee1)
            });
            arrProductCodeAndQuantityOfCombo.forEach(ee1 => {
                mergeProductCodeAndProcessedQuantity.push(ee1)
            });
            let arrOnlyProductCode = []
            mergeProductCodeAndProcessedQuantity.forEach(ee1 => {
                arrOnlyProductCode.push(ee1.MaHang)
            });
            // console.log(`${new Date().getTime()} arrOnlyProductCode=`, arrOnlyProductCode)
            ProductCode.length = 0
            ProductCode = arrOnlyProductCode.filter(onlyUnique)
            let arrProductCodeUniqueAndTotalQuantity = []
            ProductCode.forEach(ee1 => {
                arrProductCodeUniqueAndTotalQuantity.push({
                    MaHang: ee1,
                    DaDat: 0
                })
            });
            arrProductCodeUniqueAndTotalQuantity.forEach(ee1 => {
                mergeProductCodeAndProcessedQuantity.forEach(ee2 => {
                    if (ee1.MaHang == ee2.MaHang) {
                        ee1.DaDat += ee2.DaDat
                    }
                })
            });
            // console.log(`${new Date().getTime()} mergeProductCodeAndProcessedQuantity=`, mergeProductCodeAndProcessedQuantity)
            // console.log(`${new Date().getTime()} arrProductCodeUniqueAndTotalQuantity=`, arrProductCodeUniqueAndTotalQuantity)
            const arrProductCodeUniqueAndTotalQuantityDelIdCombo = arrProductCodeUniqueAndTotalQuantity.filter(item => item.MaHang.indexOf('COMBO_') < 0)
            // console.log(`${new Date().getTime()} arrProductCodeUniqueAndTotalQuantityDelIdCombo=`, arrProductCodeUniqueAndTotalQuantityDelIdCombo)
            let arrProductCodeAndProcessedQuantityFinal = []
            arrProductCodeAndQuantity.forEach(ee1 => {
                arrProductCodeUniqueAndTotalQuantityDelIdCombo.forEach(ee2 => {
                    if (ee1.MaHang == ee2.MaHang) {
                        let item = {}
                        item.MaHang = ee1.MaHang
                        item.TonKho = ee1.TonKho
                        item.DaDat = ee2.DaDat
                        item.ConLai = ee1.TonKho - ee2.DaDat
                        if (item.ConLai < 0) {
                            item.ConLai = 0
                        }
                        arrProductCodeAndProcessedQuantityFinal.push(item)
                    }
                });
            });
            console.log(`${new Date().getTime()} arrProductCodeUniqueAndTotalQuantityDelIdCombo=`, arrProductCodeUniqueAndTotalQuantityDelIdCombo)
            console.log(`${new Date().getTime()} arrProductCodeAndQuantity=`, arrProductCodeAndQuantity)
            console.log(`${new Date().getTime()} arrProductCodeAndProcessedQuantityFinal=`, arrProductCodeAndProcessedQuantityFinal)
            // 1641823306799 arrProductCodeUniqueAndTotalQuantityDelIdCombo= (1106)
            // 1641823306800 arrProductCodeAndQuantity= (1837)
            // 1641823306801 arrProductCodeAndProcessedQuantityFinal= (1099)
            // cần xem xét lại vì lọc lô hạn có hạn sử dụng lớn hơn hiện tại/số lượng âm, sản phẩm không có lô hạn, vật tư y tế không có hạn sử dụng,.....
        } else {
            alert(`Kho không có sản phẩm nào.`)
        }

    }

    const capNhatSoLuongToanBoTrongKho = () => {
        fetch(API_URL + "/capNhatSoLuongTonKhoTuFrontEnd").then(res => res.json()).then(result => alert(result.msg))
        setTimeout(() => {
            alert(`Đã cập nhật`)
            const rand = Math.random(2) * 1000
            parentCallback(rand)
        }, 25000);
    }

    const capNhatSoLuongKhachDat = () => {
        fetch(API_URL + "/capNhatSoLuongKhachDatTuFrontEnd").then(res => res.json()).then(result => alert(result.msg))
        setTimeout(() => {
            alert(`Đã cập nhật`)
            const rand = Math.random(2) * 1000
            parentCallback(rand)
        }, 8000);
    }

    const reLoad = () => {
        const rand = Math.random(2) * 1000
        parentCallback(rand)
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth={'lg'}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Bạn Có Muốn Sửa Các Sản Phẩm Này?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">Có sự thay đổi trong các item sau:</DialogContentText>
                    <Paper>
                        <Grid
                            rows={change}
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
                    <Button onClick={handleClose_KhongSua} color="primary">Không Sửa</Button>
                    <Button onClick={handleClose_Sua} color="primary" autoFocus>Đồng ý</Button>
                </DialogActions>
            </Dialog>
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
                        <FormControlLabel
                            control={
                                <Switch
                                    style={{ width: '50%' }}
                                    checked={toolbarRowVisible}
                                    onChange={() => { setToolbarRowVisible(!toolbarRowVisible) }}
                                />
                            }
                            label="Ẩn/Hiện bộ chọn cột"
                        />
                    </div>
                    <div style={{ width: '30%', textAlign: 'center', alignSelf: 'center', color: '#197420' }}>
                        <b><h2>Bảng Thống Kê Thông Tin Sản Phẩm</h2></b>
                    </div>
                    <div style={{ width: '40%', textAlign: 'right', alignSelf: 'center' }}>
                        {/* <button className='btn-thongke1' onClick={reLoad} >
                            <b>Reload</b>
                        </button> */}
                        {/* <button className='btn-thongke1TK' onClick={updateAllQuantityProductOnStock} style={{ backgroundColor: '#00ab55' }} > */}
                        <button className='btn-thongke1TK' onClick={capNhatSoLuongToanBoTrongKho} style={{ backgroundColor: '#00ab55' }} >
                            <b>ReloadTonKho</b>
                        </button>
                        <button className='btn-thongke1TK' onClick={capNhatSoLuongKhachDat} style={{ backgroundColor: '#e9311a' }}>
                            <b>ReloadKhachDat</b>
                        </button>
                        <button className='btn-thongke1' onClick={toggleModal} style={{ backgroundColor: '#026c80' }}>
                            <b>Add</b>
                        </button>
                        <button className='btn-thongke1' onClick={anupdate} style={{ backgroundColor: '#3c55d1' }}>
                            <b>Update</b>
                        </button>
                        {
                            update ?
                                <div>
                                    <input type="file" enctype="multipart/form-data" onChange={changeHandler} style={{ width: '60%', fontWeight: 'bold', fontSize: 18, padding: 5, backgroundColor: '#fff' }} />
                                    <button className='btn-thongke1' onClick={handleSubmission} style={{ padding: 10, borderRadius: 10, backgroundColor: '#fdbe07', color: '#fff', fontWeight: 'bold', border: 'none', margin: 5 }}>Submit</button>
                                </div>
                                : null
                        }
                        <button className='btn-thongke1' onClick={animports} style={{ backgroundColor: '#026c80' }} >
                            <b>Import</b>
                        </button>
                        {
                            imports ?
                                // <form action={API_URL + "/uploadfile"} enctype="multipart/form-data" method="POST">
                                //     <input type="file" name="myFile" title="Chọn file excel lô hàng" style={{ width: '60%', fontWeight: 'bold', fontSize: 18, padding: 5, backgroundColor: '#fff' }} />
                                //     <input type="submit" value="Tải file lên DB" style={{ padding: 10, borderRadius: 10, backgroundColor: '#fdbe07', color: '#fff', fontWeight: 'bold', border: 'none', margin: 5, cursor: 'pointer' }} />
                                // </form>
                                // : null
                                <div>
                                    <input type="file" enctype="multipart/form-data" onChange={changeHandler2} style={{ width: '60%', fontWeight: 'bold', fontSize: 18, padding: 5, backgroundColor: '#fff' }} />
                                    <button className='btn-thongke1' onClick={handleSubmission2} style={{ padding: 10, borderRadius: 10, backgroundColor: '#fdbe07', color: '#fff', fontWeight: 'bold', border: 'none', margin: 5 }}>Submit</button>
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
                    <IntegratedSorting />
                    <PagingState
                        defaultCurrentPage={0}
                        defaultPageSize={50}
                    />
                    <IntegratedPaging />
                    <FilteringState onFiltersChange={(x) => handleChange(x)} />
                    <VirtualTable tableComponent={TableComponent} columnExtensions={defaultColumnWidths} height={window.innerHeight - 100} />
                    {/* <Table/> */}
                    <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                    <TableHeaderRow showSortingControls
                        sortLabelComponent={SortLabel} />
                    <TableColumnVisibility
                        defaultHiddenColumnNames={defaultHiddenColumnNames}
                        onHiddenColumnNamesChange={onHiddenColumnNamesChange}
                    />
                    {filterRowVisible ? <TableFilterRow
                    /> : null}
                    {toolbarRowVisible ?
                        <Toolbar rootComponent={Tabletoolbar} />
                        : null}
                    {toolbarRowVisible ?
                        <ColumnChooser />
                        : null}
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

            <Dialog
                open={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onClose={toggleModal}
                style={customStyles}
                fullWidth={true}
                maxWidth={'xl'}
                contentLabel="Đăng kí"
            >
                <div style={{ width: '100%', marginTop: 10 }}>
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
                            {/* <form method="POST" action={API_URL + "/uploadimgdevice/" + mahang} encType="multipart/form-data">
                        <input type="file" name="imagedevice"></input>
                        <input type="submit" value="Cập nhật ảnh" onClick={() => {
                            alert('Cập nhật ảnh thành công');
                        }}>
                        </input>
                    </form> */}

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
                    <input className="submit" type="submit" value="THÊM SẢN PHẨM" onClick={Sub}></input>
                </div>
            </Dialog>
        </div>
    );
};