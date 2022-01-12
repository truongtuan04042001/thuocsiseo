import React, { useState, useEffect, useCallback } from 'react';
import _ from 'lodash';
import Paper from '@material-ui/core/Paper';
import {
    SummaryState, IntegratedSummary, FilteringState, IntegratedFiltering, EditingState, PagingState, IntegratedPaging, GroupingState,
    IntegratedGrouping, RowDetailState, SortingState, DataTypeProvider, IntegratedSorting,
} from '@devexpress/dx-react-grid';
import { ExportReactCSV } from './ExportReactCSV'
import {
    Grid,
    Table,
    Toolbar,
    TableHeaderRow,
    TableInlineCellEditing,
    TableEditRow,
    TableEditColumn,
    TableColumnResizing,
    TableColumnVisibility,
    TableSummaryRow,
    ColumnChooser,
    VirtualTable,
    PagingPanel,
    TableFilterRow,
    TableGroupRow,
    GroupingPanel,
    DragDropProvider,
    TableRowDetail,
} from '@devexpress/dx-react-grid-material-ui';
import SuaDonHang from './SuaDonHang';
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import next_month_tk from '../images/next_month_tk.png'
import prev_month_tk from '../images/prev_month_tk.png'
import { getMonth, getYear, getDate, getQuarter, formatRelative, subDays } from 'date-fns'
import range from "lodash/range"
import { API_URL } from '../constants/constants'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import '../css/cssThongKe/tK.css'
import { blue, green } from '@material-ui/core/colors';


export default ({ dataFromParent, parentCallback, parentCallback2, parentCallback3, tenNV, maNV }) => {
    const [expandedRowIds, setExpandedRowIds] = useState([]);
    const [pageSizes] = useState([8, 10, 15, 20, 50, 100, 200, 500, 1000, 2000, 5000, 0]);
    const [hienNutExportExcel, setHienNutExportExcel] = useState(false)
    const CurrencyFormatter = ({ value }) => (
        value != null ?
            !isNaN(value) ?
                parseInt(value).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                :
                value
            : null
    );

    const CurrencyTypeProvider = props => (
        <DataTypeProvider
            formatterComponent={CurrencyFormatter}
            {...props}
        />
    );

    const [columns] = useState([
        { name: 'MaNguoiBan', title: 'Mã người bán' },
        { name: 'MaDatHang', title: 'Mã đặt hàng' },
        { name: 'MaNgXuLy', title: 'Người xử lý' },
        { name: 'ThoiGian', title: 'Thời gian đặt' },
        { name: 'NgayXuLy', title: 'Ngày XL' },
        { name: 'KhachHang', title: 'Khách hàng' },
        { name: 'KhachCanTra', title: 'Khách cần trả' },
        { name: 'KhachDaTra', title: 'Khách đã trả' },
        { name: 'CongNo', title: 'Công nợ' },
        { name: 'TrangThai', title: 'Trạng thái' },
        { name: 'GhiChu', title: 'Ghi chú' },
        { name: 'SoDienThoai', title: 'SĐT' },
        { name: 'DiaChi', title: 'Địa Chỉ' },
        { name: 'GhiChuVanChuyen', title: 'Ghi chú vận chuyển' },
        { name: 'DoiDiem', title: 'ĐĐ' },
        { name: 'TienMaGiamGia', title: 'KM' },
        { name: 'QuaTang', title: 'Quà tặng' },
        { name: 'TenDN', title: 'Tên doanh nghiệp' },
    ]);

    const [defaultColumnWidths] = useState([
        { columnName: 'MaNguoiBan', width: 50 },
        { columnName: 'MaDatHang', width: 120 },
        { columnName: 'MaNgXuLy', width: 100 },
        { columnName: 'ThoiGian', width: 100 },
        { columnName: 'NgayXuLy', width: 100 },
        { columnName: 'KhachHang', width: 150 },
        { columnName: 'KhachCanTra', width: 150 },
        { columnName: 'KhachDaTra', width: 150 },
        { columnName: 'CongNo', width: 100 },
        { columnName: 'TrangThai', width: 100 },
        { columnName: 'GhiChu', width: 240 },
        { columnName: 'GhiChuVanChuyen', width: 240 },
        { columnName: 'DoiDiem', width: 100 },
        { columnName: 'TienMaGiamGia', width: 100 },
        { columnName: 'QuaTang', width: 100 },
        { columnName: 'TenDN', width: 50 },
        { columnName: 'SoDienThoai', width: 120 },
        { columnName: 'DiaChi', width: 500 },
    ]);
    const [grouping, setGrouping] = useState([{ columnName: 'TenDN' }]);
    ///////////
    const summaryCalculator = (type, rows, getValue) => {
        if (type === "counts") {
            let temp = [];
            var i;
            for (i = 0; i < rows.length; i++) {
                if (rows[i].QuaTang != "*Không có quà tặng*" && rows[i].QuaTang != "") {
                    temp.push(rows[i]);
                }
            }
            return temp.length;
        }
        return IntegratedSummary.defaultCalculator(type, rows, getValue);
    };
    const messages = {
        counts: "Tổng Quà: ",
        max: "Lớn Nhất",
        sum: "Tổng"
    };
    const [totalSummaryItems] = useState([
        { columnName: 'MaDatHang', type: 'count' },
        { columnName: 'KhachCanTra', type: 'max' },
        { columnName: 'KhachCanTra', type: 'sum' },
        { columnName: 'CongNo', type: 'max' },
        { columnName: 'CongNo', type: 'sum' },
        { columnName: 'DoiDiem', type: 'max' },
        { columnName: 'DoiDiem', type: 'sum' },
        { columnName: 'TienMaGiamGia', type: 'max' },
        { columnName: 'TienMaGiamGia', type: 'sum' },
        { columnName: 'QuaTang', type: 'counts' },
        // { columnName: 'QuaTang', type: 'sum' },
    ]);
    const [currencyColumns] = useState(['KhachCanTra', 'KhachDaTra', 'TienMaGiamGia', 'CongNo']);

    ///////////////
    const getRowId = row => row.MaDatHang + ',' + row.KhachCanTra + ',' + row.KhachDaTra;
    // const getRowId = row => row.MaDatHang;
    const newDate = new Date()
    const date = "DonHang " + newDate.getDate() + "/" + (newDate.getMonth() + 1) + "/" + newDate.getFullYear();
    const date2 = "DonXuLy " + newDate.getDate() + "/" + (newDate.getMonth() + 1) + "/" + newDate.getFullYear();



    const callbackFunction = (childData) => {
        parentCallback(childData)
        setExpandedRowIds([])
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

    //style cho các dòng trong table
    const styles = theme => ({
        tableStriped: {
            '& tbody tr:nth-of-type(odd)': {
                backgroundColor: '#c5dfb3',
                // backgroundColor: fade(theme.palette.primary.main, 0.20),

            },
            '& tbody tr:nth-of-type(even)': {

                //backgroundColor: '#f2f2f2',
                // backgroundColor: fade(theme.palette.primary.main, 0.10),
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
    //hàm cho filter
    const [filterRowVisible, setFilterRowVisible] = useState(true);//biến ẩn hiện filter
    const [toolbarRowVisible, setToolbarRowVisible] = useState(true);//biến ẩn hiện Toolbar
    const [toolbaredRowVisible, setToolbaredRowVisible] = useState(false);//biến ẩn hiện Toolbar

    const callbackFunction2 = (childData2) => {
        parentCallback2(childData2)
    };
    const debounceFunc = useCallback(
        _.debounce(e => { callbackFunction2(e) }, 500),
        []
    );

    const handleChange = e => {

        debounceFunc(e);
    };

    // useEffect(() => {
    //     // console.log(new Date().getTime() + " filters= ", filters)
    //     callbackFunction2(filters)
    // }, [filters]);

    //const FilterIcon = ({ type, ...restProps }) => {
    //    if (type === 'month') return <DateRange {...restProps} />;
    //    return <TableFilterRow.Icon type={type} {...restProps} />;
    //};
    const getHiddenColumnsFilteringExtensions = hiddenColumnNames => hiddenColumnNames
        .map(columnName => ({
            columnName,
            predicate: () => false,
        }));
    const [defaultHiddenColumnNames] = useState(['TenDN']);
    const [filteringColumnExtensions, setFilteringColumnExtensions] = useState(
        getHiddenColumnsFilteringExtensions(defaultHiddenColumnNames),
    );
    const onHiddenColumnNamesChange = hiddenColumnNames => setFilteringColumnExtensions(
        getHiddenColumnsFilteringExtensions(hiddenColumnNames),
    );
    //end hàm cho filter 
    const RowDetail = ({ row }) => (
        <SuaDonHang rowfromtable={row} parentCallback={callbackFunction} tenNV={tenNV} />
    );

    const refreshDonHang = () => {
        const rand = Math.random(2) * 1000
        callbackFunction(rand)
    }


    //=========================================
    //xuất excel đơn đã xử lý của 1 nhân viên bất kỳ

    const [open_option, setOpenOption] = useState(false)
    const [open_time, setOpenTime] = useState(false)
    const [open_time_fixed, setOpenTimeFixed] = useState(false)
    const [loaitk, setLoaitk] = useState() //mảng chứa giá trị loại thống kê
    const [diaglog_choose_time, setDialogChooseTime] = useState(false)
    const [startDate, setStartDate] = useState(new Date())
    const [startDateTo, setStartDateTo] = useState(new Date())
    const years = range(1990, getYear(new Date()) + 1, 1)
    const [time, setTime] = useState("")
    const [tablechange, setTablechange] = useState('') //dùng để theo dõi thay đổi table-refresh lại
    // const [tenNguoiXuLyDon, setTenNguoiXuLyDon] = useState('')
    const [danhSachDonDaXuLy, setDanhSachDonDaXuLy] = useState([])
    const [table, setTable] = useState('donhang') //mảng chứa loại table
    const [filterarr, setFilterarr] = useState('')
    const months = [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12",
    ]

    const resettime = () => {
        setTime("")
        setTablechange("change2")
    }

    const TimKiemDateFromTo = () => {
        setOpenOption(false);
        switch (loaitk) {
            case '1':
                //alert(getYear(startDate));
                setTime({ type: 3, time: getYear(startDate), time2: getYear(startDate) })
                break;
            case '2':
                var monthYear = (getMonth(startDate) + 1) + '/' + getYear(startDate);
                //alert(monthYear);
                setTime({ type: 2, time: (getMonth(startDate) + 1), time2: getYear(startDate) })
                break;
            case '3':
                //var monthYear = (getQuarter(startDate)) + '/' + getYear(startDate);
                switch (getQuarter(startDate)) {
                    case 1:
                        var calendar = getYear(startDate) + "-" + '1' + "-" + '1';
                        var calendar2 = getYear(startDate) + "-" + '3' + "-" + '31';
                        setTime({ type: 1, time: calendar, time2: calendar2 })
                        break;
                    case 2:
                        var calendar = getYear(startDate) + "-" + '4' + "-" + '1';
                        var calendar2 = getYear(startDate) + "-" + '6' + "-" + '30';
                        setTime({ type: 1, time: calendar, time2: calendar2 })
                        break;
                    case 3:
                        var calendar = getYear(startDate) + "-" + '7' + "-" + '1';
                        var calendar2 = getYear(startDate) + "-" + '9' + "-" + '30';
                        setTime({ type: 1, time: calendar, time2: calendar2 })
                        break;
                    case 4:
                        var calendar = getYear(startDate) + "-" + '10' + "-" + '1';
                        var calendar2 = getYear(startDate) + "-" + '12' + "-" + '31';
                        setTime({ type: 1, time: calendar, time2: calendar2 })
                        break;
                }
                break;
            case '4':
                var dateFrom = getYear(startDate) + '-' + (getMonth(startDate) + 1) + '-' + getDate(startDate);
                var dateTo = getYear(startDateTo) + '-' + (getMonth(startDateTo) + 1) + '-' + getDate(startDateTo);
                //alert(dateFrom + ' đến ' + dateTo);
                setTime({ type: 1, time: dateFrom, time2: dateTo })
                break;
        }
    }

    const [duLieu, setDuLieu] = useState([])

    const layDuLieuDonTheoNhanVien = () => {
        // console.log(new Date().getTime() + " time= ", time)
        fetch(API_URL + '/donHangXuLyTheoNhanVien', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                times: time,
            })
        })
            .then((response) => response.json())
            .then(qwe => {
                if (qwe.length != 0) {
                    for (let i = 0; i < qwe.length; i++) {
                        if (qwe[i].NgayDatHang != null) {
                            const nam2 = qwe[i].NgayDatHang.slice(0, 4)
                            const thang2 = qwe[i].NgayDatHang.slice(5, 7)
                            const ngay2 = "" + qwe[i].NgayDatHang.slice(8, 10)
                            qwe[i].NgayDatHang = ngay2 + "/" + thang2 + "/" + nam2
                        }
                        if (qwe[i].NgayXuLy != null) {
                            const nam3 = qwe[i].NgayXuLy.slice(0, 4)
                            const thang3 = qwe[i].NgayXuLy.slice(5, 7)
                            const ngay3 = "" + qwe[i].NgayXuLy.slice(8, 10)
                            qwe[i].NgayXuLy = ngay3 + "/" + thang3 + "/" + nam3
                        }
                    }
                    setDuLieu(qwe)
                    setHienNutExportExcel(true)
                }
            })
    }

    //=========================================

    const [dialogXacNhanHoanThanhDon, setDialogXacNhanHoanThanhDon] = useState(false)

    const testKey2 = (e) => {
        if (e.code == "Enter") {
            hoanThanhDonHang()
        }
    }

    // func hoàn thành đơn hàng
    const hoanThanhDonHang = async () => {
        setDialogXacNhanHoanThanhDon(false)
        if (maNV === "adm") {
            const danhSachMaDatHang = await layMaDatHangDaXuLy()
            const lengthDSMaDatHang = danhSachMaDatHang.length
            let timeOut = 10000
            if (lengthDSMaDatHang > 100 && lengthDSMaDatHang <= 200) {
                timeOut = 20000
            }
            if (lengthDSMaDatHang > 200 && lengthDSMaDatHang <= 300) {
                timeOut = 30000
            }
            if (lengthDSMaDatHang > 300 && lengthDSMaDatHang <= 400) {
                timeOut = 40000
            }
            if (lengthDSMaDatHang > 400 && lengthDSMaDatHang <= 500) {
                timeOut = 50000
            }
            if (lengthDSMaDatHang > 500) {
                timeOut = 60000
            }
            if (lengthDSMaDatHang > 0) {
                alert(`Đang xử lý, vui lòng đợi khoảng ${timeOut / 1000} giây (ước tính cho ${lengthDSMaDatHang} đơn).`)
                const arrDSMaDatHang = danhSachMaDatHang.map(o => o.MaDatHang)
                const arrMaHangVaSoLuongDistinct = await layMaHangVaSoLuongTrongCTDH(arrDSMaDatHang)
                // func gửi thằng arrMaHangVaSoLuongDistinct lên server cho nó xử lý, khôg thể gọi api liên tục thì ta chơi kiểu gửi hết lên cho server nó nhai, nhai không hết thì nuốt, khỏi nhai :v
                await guiDSMaHangVaSoLuongDistinct(arrMaHangVaSoLuongDistinct)
                await fetch(`${API_URL}/hoanThanhDonHangTuFontEnd`).then(res => res.json())
                setTimeout(() => {
                    alert(`Đã xử lý xong.`)
                    const rand = Math.random(2) * 1000
                    callbackFunction(rand)
                }, timeOut);
            } else {
                alert(`Không có đơn nào`)
            }
        } else {
            alert(`Không có quyền hoàn thành đơn.`)
        }

    }

    // func lấy toàn bộ mã đặt hàng có trạng thái là Đã xử lý
    const layMaDatHangDaXuLy = async () => {
        const res = await fetch(`${API_URL}/layDSMaDatHangDaXuLy`).then(res => res.json())
        return res
    }

    // func lọc unique
    const onlyUnique = (value, index, self) => {
        return self.indexOf(value) === index;
    }


    // func lấy toàn bộ mã hàng và số lượng trong chi tiết đơn hàng có trạng thái đã xử lý
    const layMaHangVaSoLuongTrongCTDH = async (arrCodeOrders) => {
        if (arrCodeOrders.length > 0) {
            const requestOptions = {
                method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
                    lsMaHang: arrCodeOrders
                })
            }
            const res = await fetch(`${API_URL}/layMaHangVaSoLuongTrongCTDH`, requestOptions).then(res => res.json())
            const requestOptions2 = {
                method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
                    arrCodeOrders: arrCodeOrders
                })
            }
            const res2 = await fetch(`${API_URL}/getIdComboAndQuantityFromArrProductCode`, requestOptions2).then(res => res.json())
            const res3 = await fetch(`${API_URL}/getIdComboDistinctFromArrProductCode`, requestOptions2).then(res => res.json())
            let arrIdCombo = []
            res3.forEach(ee1 => {
                const item = ee1.MaHang
                arrIdCombo.push(item)
            });
            const requestOptions3 = {
                method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
                    arrStrIdCombo: arrIdCombo
                })
            }
            const res4 = await fetch(`${API_URL}/getProductsInListIdComboForBtnCompleteOrders`, requestOptions3).then(res => res.json())
            let arrIdComboAndTotalQuantity = []
            res3.forEach(ee1 => {
                let item = {}
                item.IdCombo = ee1.MaHang
                item.SoLuong = 0
                res2.forEach(ee2 => {
                    if (ee1.MaHang == ee2.MaHang) {
                        item.SoLuong += ee2.SoLuong
                    }
                });
                arrIdComboAndTotalQuantity.push(item)
            });

            let arrMaHangAndTongSoLuong = []
            res4.forEach(ee1 => {
                let item = {}
                item.MaHang = ee1.MaHang
                item.SoLuong = 0
                arrIdComboAndTotalQuantity.forEach(ee2 => {
                    if (ee1.IdCombo == ee2.IdCombo) {
                        item.SoLuong = ee1.SoLuong * ee2.SoLuong
                    }
                });
                arrMaHangAndTongSoLuong.push(item)
            });
            let merge = []
            res.forEach(ee1 => {
                merge.push(ee1)
            });
            arrMaHangAndTongSoLuong.forEach(ee1 => {
                merge.push(ee1)
            });
            let onlyMaHang = []
            merge.forEach(ee1 => {
                let maHang = ''
                maHang = ee1.MaHang
                onlyMaHang.push(maHang)
            });
            const uniqueMaHang = onlyMaHang.filter(onlyUnique)
            let arrMaHangSoLuong0 = []
            uniqueMaHang.forEach(ee1 => {
                const item = {
                    MaHang: ee1,
                    SoLuong: 0
                }
                arrMaHangSoLuong0.push(item)
            });
            arrMaHangSoLuong0.forEach(ee1 => {
                merge.forEach(ee2 => {
                    if (ee1.MaHang == ee2.MaHang) {
                        ee1.SoLuong += ee2.SoLuong
                    }
                });
            });
            return arrMaHangSoLuong0
        } else {
            return `NOTOK`
        }
    }

    // func lấy mã hàng Distinct trong chi tiết đơn hàng
    // const layMaHangDistinctTrongCTDH = async (danhSachMaDatHang) => {
    //     if (danhSachMaDatHang.length > 0) {
    //         const requestOptions = {
    //             method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
    //                 lsMaHang: danhSachMaDatHang
    //             })
    //         }
    //         const res = await fetch(`${API_URL}/layMaHangDistinctTrongCTDH`, requestOptions).then(res => res.json())
    //         return res
    //     }
    // }

    // func gửi danh sách mã hàng distinct và số lượng lên cho sv xử lý
    const guiDSMaHangVaSoLuongDistinct = async (danhSach) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                lsMaHangSoLuongDistinct: danhSach,
            })
        }
        const res = await fetch(`${API_URL}/guiDSMaHangVaSoLuongDistinct`, requestOptions).then(res => res.json())
        return res
    }

    // func commit thay đổi value trên mỗi dòng đơn hàng
    const commitChanges = async ({ added, changed, deleted }) => {
        if (Object.values(changed)[0] != undefined) {
            const maDatHang = Object.getOwnPropertyNames(changed)
            const arrsplit = maDatHang[0].split(',')
            const tmpObj = Object.values(changed)
            const obj = tmpObj[0]
            const propertiesObj = Object.getOwnPropertyNames(obj)
            let isNan = 0
            let stringlog = "";
            propertiesObj.forEach(ee1 => {
                if (ee1 == `KhachDaTra`) {
                    if (isNaN(obj.KhachDaTra) && obj.KhachDaTra != `R`) {
                        isNan = 1
                        alert(`Khách đã trả không được nhập chữ ngoài chữ R.`)
                    } else {
                        if (parseFloat(obj.KhachDaTra) < 0) {
                            isNan = 1
                            alert(`Khách đã trả phải lớn hơn 0.`)
                        }
                    }
                    stringlog = stringlog + "---/changed CongNo  - datra1: " + arrsplit[2] + " - datra1: " + obj.KhachDaTra

                }
            });
            /////////////
            const date = new Date();
            const ngay7 = date.getDate()
            const thang7 = date.getMonth() + 1
            const nam7 = date.getFullYear()
            const gio7 = date.getHours()
            const phut7 = date.getMinutes()
            let logstring = ngay7 + "-" + thang7 + "-" + nam7 + " - " + gio7 + ":" + phut7 + " - Mã đặt hàng: " + arrsplit[0] + " - Người xử lý :" + tenNV + " - log: " + stringlog;
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
            //////////////
            // console.log(`${new Date().getTime()} isNan=`, isNan)
            if (isNan == 0) {
                await fetch(`${API_URL}/suaDonHang1Row/${arrsplit[0]}`, {
                    method: "PUT", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
                        data: obj,
                        KhachCanTra: parseFloat(arrsplit[1]),
                    })
                })
                const rand = Math.random(2) * 1000
                callbackFunction(rand)
            }
        } else {
            // console.log(`${new Date().getTime()} isNan=`)
        }
    };

    const [editingStateColumnExtensions] = useState([
        { columnName: 'MaNguoiBan', editingEnabled: false },
        { columnName: 'MaDatHang', editingEnabled: false },
        { columnName: 'MaNgXuLy', editingEnabled: false },
        { columnName: 'ThoiGian', editingEnabled: false },
        { columnName: 'NgayXuLy', editingEnabled: false },
        { columnName: 'KhachHang', editingEnabled: false },
        { columnName: 'KhachCanTra', editingEnabled: false },
        { columnName: 'KhachDaTra', editingEnabled: true },
        { columnName: 'CongNo', editingEnabled: false },
        { columnName: 'TrangThai', editingEnabled: false },
        { columnName: 'GhiChu', editingEnabled: true },
        { columnName: 'GhiChuVanChuyen', editingEnabled: true },
        { columnName: 'DoiDiem', editingEnabled: false },
        { columnName: 'TienMaGiamGia', editingEnabled: false },
        { columnName: 'QuaTang', editingEnabled: false },
        { columnName: 'TenDN', editingEnabled: false },
        { columnName: 'SoDienThoai', editingEnabled: false },
        { columnName: 'DiaChi', editingEnabled: false },
    ]);
    const [startEditAction, setStartEditAction] = useState("doubleClick");
    const editColumnMessages = {
        editCommand: 'Sửa',
        commitCommand: 'Lưu',
        cancelCommand: 'Hủy',
    };
    const groupingMessages = {
        groupByColumn: 'Vui lòng kéo header bạn muốn sắp xếp vào đây!',

    };

    // 
    return (
        <div>
            <div style={{ width: '100%', display: 'flex', position: 'relative', backgroundColor: '#B8d8e0' }}>
                <div style={{ width: '40%', textAlign: 'left', marginLeft: 10, alignSelf: 'center' }}>
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
                    <FormControlLabel
                        control={
                            <Switch
                                style={{ width: '50%' }}
                                checked={toolbaredRowVisible}
                                onChange={() => { setToolbaredRowVisible(!toolbaredRowVisible) }}
                            />
                        }
                        label="Ẩn/Hiện Sửa trên dòng"
                    />
                </div>

                <div style={{ width: '30%', textAlign: 'center', alignSelf: 'center', color: '#197420' }}>
                    <b><h2>Bảng Thống Kê Đơn Hàng</h2></b>
                </div>

                {/* nhờ nam phá giao diện  */}

                <div style={{ width: '10%', display: 'flex', justifyContent: 'space-between', alignSelf: 'center' }}>
                    {open_option ?
                        <div className="dialog_choose_time postition_time_donhang">
                            <div className="date_picker_range">
                                <div>
                                    <div>Từ ngày: <b style={{ color: 'green' }}>{getDate(startDate) + '/' + (getMonth(startDate) + 1) + '/' + getYear(startDate)}</b></div>
                                    <DatePicker
                                        inline
                                        renderCustomHeader={({
                                            date,
                                            changeYear,
                                            changeMonth,
                                            decreaseMonth,
                                            increaseMonth,
                                            prevMonthButtonDisabled,
                                            nextMonthButtonDisabled,
                                        }) => (
                                            <div
                                                style={{
                                                    margin: 10,
                                                    display: "flex",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <button title="Tháng trước" className="prev_month_tk" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                                                    <img width='18' height='18' src={prev_month_tk}></img>
                                                </button>
                                                <select
                                                    value={getYear(date)}
                                                    onChange={({ target: { value } }) => changeYear(value)}
                                                >
                                                    {years.map((option) => (
                                                        <option key={option} value={option}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                </select>

                                                <select
                                                    value={months[getMonth(date)]}
                                                    onChange={({ target: { value } }) =>
                                                        changeMonth(months.indexOf(value))
                                                    }
                                                >
                                                    {months.map((option) => (
                                                        <option key={option} value={option}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                </select>
                                                <button title="Tháng kế" className="prev_month_tk" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                                                    <img width='18' height='18' src={next_month_tk}></img>
                                                </button>
                                            </div>
                                        )}
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                    />
                                </div>
                                <div className="hr_datepicker_tk"></div>
                                <div className="to_date_choose">
                                    <div>Đến ngày: <b style={{ color: 'green' }}>{getDate(startDateTo) + '/' + (getMonth(startDateTo) + 1) + '/' + getYear(startDateTo)}</b></div>
                                    <DatePicker
                                        inline
                                        renderCustomHeader={({
                                            date,
                                            changeYear,
                                            changeMonth,
                                            decreaseMonth,
                                            increaseMonth,
                                            prevMonthButtonDisabled,
                                            nextMonthButtonDisabled,
                                        }) => (
                                            <div
                                                style={{
                                                    margin: 10,
                                                    display: "flex",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <button title="Tháng trước" className="prev_month_tk" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                                                    <img width='18' height='18' src={prev_month_tk}></img>
                                                </button>
                                                <select
                                                    value={getYear(date)}
                                                    onChange={({ target: { value } }) => changeYear(value)}
                                                >
                                                    {years.map((option) => (
                                                        <option key={option} value={option}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                </select>
                                                <select
                                                    value={months[getMonth(date)]}
                                                    onChange={({ target: { value } }) =>
                                                        changeMonth(months.indexOf(value))
                                                    }
                                                >
                                                    {months.map((option) => (
                                                        <option key={option} value={option}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                </select>

                                                <button title="Tháng kế" className="prev_month_tk" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                                                    <img width='18' height='18' src={next_month_tk}></img>
                                                </button>
                                            </div>
                                        )}
                                        selected={startDateTo}
                                        onChange={(date) => setStartDateTo(date)}
                                    />
                                    <div className="box_btn_filter" >
                                        <button className="btn_month_tk" style={{ backgroundColor: 'tomato' }}
                                            onClick={() => { setOpenOption(false) }}
                                        >
                                            Hủy
                                        </button>
                                        <button className="btn_month_tk"
                                            onClick={() => { TimKiemDateFromTo() }}
                                        >
                                            Tìm kiếm
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="tong_trai_thongke_an"></div>
                    }
                    {
                        maNV == "adm" ?
                            <button onClick={() => {
                                setLoaitk('4')
                                setOpenOption(!open_option)
                            }} className='btn-thongke1' style={{ backgroundColor: '#ff7235' }}>Chọn thời gian </button>
                            : null

                    }

                    {time !== "" ?
                        <div style={{ marginTop: 10 }}>
                            <div style={{ color: 'white' }}>Bạn đang chọn mốc:&nbsp;<br />
                                <b style={{ color: 'yellow' }}>
                                    {time.time} đến {time.time2}
                                </b>
                            </div>

                        </div> : null}
                    {
                        time != "" ?
                            <button className='btn-thongke1' onClick={() => layDuLieuDonTheoNhanVien()} >
                                <b>Lấy dữ liệu</b>
                            </button>
                            : null
                    }
                    {
                        hienNutExportExcel ?
                            <button style={{ border: 0, backgroundColor: 'transparent' }} onClick={() => {
                                setTimeout(() => {
                                    setHienNutExportExcel(false)
                                    resettime()
                                }, 2000);
                            }}>
                                <ExportReactCSV csvData={duLieu} fileName={date2} />
                            </button>
                            : null
                    }
                </div>

                {/* line cuối nhờ nam phá giao diện  */}

                <div style={{ width: '30%', textAlign: 'right', alignSelf: 'center', display: 'flex', flexWrap: 'wrap' }}>
                    <button className='btn-thongke1TK' style={{ color: 'black' }} onClick={refreshDonHang} >
                        <b>Làm mới đơn hàng</b>
                    </button>
                    {
                        maNV === "adm" ? <button className='btn-thongke1TK' style={{ backgroundColor: 'pink' }}
                            onClick={() => setDialogXacNhanHoanThanhDon(true)}
                        >
                            <b>Hoàn thành các đơn</b>
                        </button> : null
                    }
                    <Link to='/DonHangOffline' className='DHOffline'>Đơn Hàng Offline</Link>
                    <ExportReactCSV csvData={dataFromParent} fileName={date} />
                </div>
                <div>
                </div>
            </div>

            <Paper>
                <Grid
                    rows={dataFromParent}
                    columns={columns}
                    getRowId={getRowId}
                >
                    <EditingState
                        onCommitChanges={commitChanges}
                        columnExtensions={editingStateColumnExtensions}
                    />
                    <SortingState
                        defaultSorting={[]}
                    />
                    <DragDropProvider />
                    <GroupingState
                    />
                    <IntegratedGrouping />
                    <IntegratedSorting />
                    <PagingState
                        defaultCurrentPage={0}
                        defaultPageSize={50}
                    />
                    <IntegratedPaging />
                    <CurrencyTypeProvider
                        for={currencyColumns}
                    />
                    <SummaryState
                        totalItems={totalSummaryItems}
                    />
                    {/* <IntegratedSummary /> */}
                    <FilteringState onFiltersChange={(x) => handleChange(x)} />
                    {/* <IntegratedFiltering /> */}
                    <VirtualTable tableComponent={TableComponent} columnExtensions={defaultColumnWidths} height={window.innerHeight - 100} />
                    {/* <Table/> */}

                    <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                    <RowDetailState expandedRowIds={expandedRowIds}
                        onExpandedRowIdsChange={setExpandedRowIds} />
                    <TableRowDetail
                        contentComponent={RowDetail}
                    />
                    <TableHeaderRow showSortingControls
                        sortLabelComponent={SortLabel} />
                    <TableEditRow
                    />
                    <IntegratedSummary calculator={summaryCalculator} />
                    <TableSummaryRow messages={messages} />
                    <TableColumnVisibility
                        defaultHiddenColumnNames={defaultHiddenColumnNames}
                        onHiddenColumnNamesChange={onHiddenColumnNamesChange}
                    />
                    {filterRowVisible ? <TableFilterRow
                    //showFilterSelector
                    //iconComponent={FilterIcon}
                    /> : null}
                    <TableGroupRow />
                    <Toolbar rootComponent={Tabletoolbar} />
                    <GroupingPanel showGroupingControls messages={groupingMessages} />
                    {/* {toolbarRowVisible ?
                        <Toolbar rootComponent={Tabletoolbar} />
                        : null} */}
                    {
                        toolbaredRowVisible ?

                            <TableEditColumn
                                showEditCommand
                                width={200}
                                messages={editColumnMessages}
                            />
                            : null
                    }
                    {
                        toolbaredRowVisible ?
                            <TableInlineCellEditing
                                startEditAction={startEditAction}

                            />

                            : null
                    }
                    {/* <ToolbarEditing /> */}
                    {
                        toolbarRowVisible ?
                            <ColumnChooser />
                            : null
                    }
                    <PagingPanel
                        pageSizes={pageSizes}
                    />
                </Grid>
            </Paper>

            {/* dialog xác nhận hoàn thành đơn */}

            <Dialog
                open={dialogXacNhanHoanThanhDon}
                onClose={() => setDialogXacNhanHoanThanhDon(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                onKeyPress={(e) => testKey2(e)}
            >
                <DialogTitle id="alert-dialog-title">
                    <div className='GH_DialogTitle'>
                        <p style={{ alignItems: 'center', fontSize: '3.75em', margin: '0' }}>!</p>
                    </div>
                    <p style={{ fontSize: 30, fontWeight: 'bold', color: 'red' }} >
                        Bạn có muốn hoàn thành tất cả đơn hàng?
                    </p>
                </DialogTitle>
                {/* <DialogContent>
                    <DialogContentText id="alert-dialog-description" style={{ textAlign: 'center', color: 'black' }}>Xác nhận hoàn thành tất cả đơn hàng!</DialogContentText>
                </DialogContent> */}
                <DialogActions>
                    <Button onClick={() => setDialogXacNhanHoanThanhDon(false)} style={{ padding: '6px 16px', backgroundColor: 'rgb(255, 193, 7)', margin: '15px', borderRadius: '8px', color: 'rgb(0, 0, 0)', width: '50%' }}>Không</Button>
                    <Button onClick={hoanThanhDonHang} className="submit" type="button" style={{ padding: '7px 16px', backgroundColor: 'rgb(0, 171, 85)', margin: '15px', borderRadius: '8px', color: 'white', width: '50%', textAlign: 'center', fontWeight: 'bold' }}>Có</Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};