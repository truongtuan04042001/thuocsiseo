import React, { useState, useEffect,useCallback } from 'react';
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

export default ({ dataFromParent, parentCallback, parentCallback2 }) => {
    const [expandedRowIds, setExpandedRowIds] = useState([]);
    const [pageSizes] = useState([8, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 0]);
    const [columns] = useState([
        { name: 'LoaiHang', title: 'Loại Hàng' },
        { name: 'NhomHang', title: 'Nhóm Hàng' },
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
        { name: 'TonKho', title: 'Tồn Kho' },
        { name: 'DaDat', title: 'Đã đặt' },
        { name: 'ConLai', title: 'Còn lại' },
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
        { columnName: 'LoaiHang', width: 150 },
        { columnName: 'NhomHang', width: 150 },
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
        { columnName: 'HinhAnh', width: 100 },
        { columnName: 'MoTa', width: 100 },
        { columnName: 'TonKho', width: 150 },
        { columnName: 'DaDat',  width: 150 },
        { columnName: 'ConLai',  width: 150  },
        { columnName: 'DangKD', width: 100 },
        { columnName: 'TinhDS', width: 100 },
        { columnName: 'BanChay', width: 100 },
        { columnName: 'SPmoi', width: 100 },
        { columnName: 'HDnhanh', width: 130 },
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
    // , wordWrapEnabled: true
    let newDate = new Date()
    let date = "ThongTinSP " + newDate.getDate() + "/" + (newDate.getMonth() + 1) + "/" + newDate.getFullYear();

    const callbackFunction = (childData) => {
        parentCallback(childData)
        setExpandedRowIds([])
    };

    //biến cho nút update
    const [update, setUpdate] = useState(false);
    const anupdate = () => setUpdate(!update)
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
                        LoaiHang: result[i][0], NhomHang: result[i][1], MaHang: result[i][2], TenHang: result[i][3], SoDangKy: result[i][4],
                        HoatChat: result[i][5], HamLuong: result[i][6], HangSX: result[i][7], NuocSX: result[i][8], QCDG: result[i][9], GiaBan: result[i][10],
                        GiaVon: result[i][11], DVT: result[i][12], HinhAnh: result[i][13], MoTa: result[i][14]
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
        formData.append('myFile', selectedFile);
        await fetch(
            API_URL + "/uploadfile",
            {
                method: 'POST',
                body: formData,
                headers: {
                  
                }
            }
        )
            .then((response) => response.json())
            .then((result) => {
                //let temp = []
                //var i;
                //for (i = 0; i < result.length; i++) {
                //    temp.push({
                //        LoaiHang: result[i][0], NhomHang: result[i][1], MaHang: result[i][2], TenHang: result[i][3], SoDangKy: result[i][4],
                //        HoatChat: result[i][5], HamLuong: result[i][6], HangSX: result[i][7], NuocSX: result[i][8], QCDG: result[i][9], GiaBan: result[i][10],
                //        GiaVon: result[i][11], DVT: result[i][12], HinhAnh: result[i][13], MoTa: result[i][14]
                //    })
                //}
                //setChange(temp)
                //handleClickOpen();
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
        })
        callbackFunction("holle")
        setOpen(false);
    };
    const handleClose_KhongSua = () => {
        setOpen(false);
    };
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

    //const FilterIcon = ({ type, ...restProps }) => {
    //    if (type === 'month') return <DateRange {...restProps} />;
    //    return <TableFilterRow.Icon type={type} {...restProps} />;
    //};
    const getHiddenColumnsFilteringExtensions = hiddenColumnNames => hiddenColumnNames
        .map(columnName => ({
            columnName,
            predicate: () => false,
        }));

    const [defaultHiddenColumnNames] = useState(['SoDangKy', 'HamLuong', 'NuocSX', 'DVT', 'HinhAnh', 'MoTa']);
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
        <SuaSanPham rowfromtable={row} parentCallback={callbackFunction} />
    );

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
                <div style={{ width: '100%',  display: 'flex', backgroundColor:'#B8d8e0' }}>
                    <div style={{ width: '30%', textAlign: 'left', alignSelf: 'center', marginLeft: 10,color:'#197420' }}>
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
                    <div style={{ width: '40%', textAlign: 'center', alignSelf: 'center', color: '#197420' }}>
                        <b><h2>Bảng Thống Kê Thông Tin Sản Phẩm</h2></b>
                    </div>
                    <div style={{ width: '30%', textAlign: 'right', alignSelf: 'center' }}>
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
                        defaultPageSize={20}
                    />
                    <IntegratedPaging />
                    <FilteringState onFiltersChange={(x)=>handleChange(x)} />
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
                    {/* <RowDetailState expandedRowIds={expandedRowIds}
                        onExpandedRowIdsChange={setExpandedRowIds} />
                    <TableRowDetail
                        contentComponent={RowDetail}
                    /> */}
                    <PagingPanel
                        pageSizes={pageSizes}
                    />
                </Grid>
            </Paper>
        </div>
    );
};