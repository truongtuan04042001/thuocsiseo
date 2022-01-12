import React, { useState, useEffect,useCallback  } from 'react';
import _ from 'lodash';
import Paper from '@material-ui/core/Paper';
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
import { ExportReactCSV } from './ExportReactCSV'
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
import DateRange from '@material-ui/icons/DateRange';
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
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
        { name: 'MaHang', title: 'Mã Hàng' },
        { name: 'TenHang', title: 'Tên Hàng' },
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
        { columnName: 'MaHang', width: 130 },
        { columnName: 'TenHang', width: 200 },
        { columnName: 'DangKD', width: 200 },
        { columnName: 'TinhDS', width: 200 },
        { columnName: 'BanChay', width: 200 },
        { columnName: 'SPmoi', width: 200 },
        { columnName: 'HDnhanh', width: 200 },
        { columnName: 'GHnhanh', width: 200 },
        { columnName: 'SVip', width: 200 },
        { columnName: 'NhiKhoa', width: 200 },
        { columnName: 'NhaKhoa', width: 200 },
        { columnName: 'SanKhoa', width: 200 },
        { columnName: 'DaLieu', width: 200 },
        { columnName: 'NTHop', width: 200 },
        { columnName: 'ThanKinh', width: 200 },
        { columnName: 'BV', width: 200 },
        { columnName: 'FlashSale', width: 200 },
        { columnName: 'PhanTramKM', width: 200 },
    ]);

    let newDate = new Date()
    let date = "ThangThaiSP " + newDate.getDate() + "/" + (newDate.getMonth() + 1) + "/" + newDate.getFullYear();

    const callbackFunction = (childData) => {
        parentCallback(childData)
        setExpandedRowIds([])
    };
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [change, setChange] = useState([]);

    //biến cho nút update
    const [update, setUpdate] = useState(false);
    const anupdate = () => setUpdate(!update)

    //biến cho upload file
    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
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
        formData.append('updatett', selectedFile);
        await fetch(
            API_URL + "/updatetrangthai",
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
                        MaHang: result[i][0], TenHang: result[i][1], DangKD: result[i][2], TinhDS: result[i][3], BanChay: result[i][4],
                        SPmoi: result[i][5], HDnhanh: result[i][6], GHnhanh: result[i][7], SVip: result[i][8], NhiKhoa: result[i][9], NhaKhoa: result[i][10],
                        SanKhoa: result[i][11], DaLieu: result[i][12], NTHop: result[i][13], ThanKinh: result[i][14], BV: result[i][15], FlashSale: result[i][16], PhanTramKM: result[i][17]
                    })
                }
                setChange(temp)
                handleClickOpen();
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
        callbackFunction("hello")
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
    const callbackFunction2 = (childData2) => {
        parentCallback2(childData2)
    };

    const debounceFunc = useCallback(
        _.debounce(e => { callbackFunction2(e) }, 300),
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
   
    const [defaultHiddenColumnNames] = useState(["BanChay","SPmoi","HDnhanh","GHnhanh","SVip","NhiKhoa","NhaKhoa","SanKhoa","DaLieu","NTHop","ThanKinh","BV"]);
    const [filteringColumnExtensions, setFilteringColumnExtensions] = useState(
        getHiddenColumnsFilteringExtensions(defaultHiddenColumnNames),
    );

    const onHiddenColumnNamesChange = hiddenColumnNames => setFilteringColumnExtensions(
        getHiddenColumnsFilteringExtensions(hiddenColumnNames),
    );
    //end hàm cho filter 
    const RowDetail = ({ row }) => (
        <SuaTrangThai rowfromtable={row} parentCallback={callbackFunction} />
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
                            <VirtualTable columnExtensions={defaultColumnWidths} />
                            {/* <Table/> */}
                            <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                            <TableHeaderRow />
                            <PagingPanel
                                pageSizes={pageSizes}
                            />
                        </Grid>
                    </Paper>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose_KhongSua} color="primary">Không Sửa</Button>
                    <Button onClick={handleClose_Sua} color="primary" autoFocus>Đồng ý</Button>
                </DialogActions>
            </Dialog>
            <Paper >
                <div style={{ width: '100%', display: 'flex', backgroundColor:'#B8d8e0' }}>
                    <div style={{ width: '30%', textAlign: 'left', alignSelf:'center', marginLeft: 10,color:'#197420' }}>
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
                    <div style={{ width: '40%', textAlign: 'center', alignSelf: 'center', color: '#197420' }}><b><h2> Bảng Thống Kê Trạng Thái Sản Phẩm</h2></b></div>
                    <div style={{ width: '30%', textAlign: 'right', alignSelf: 'center' }}>
                        <button className='btn-thongke1' style={{backgroundColor:'#2de183'}} onClick={anupdate} >
                            <b>Update</b>
                        </button>
                        {
                            update ?
                                <div className='neophai'>
                                     
                                    <input type="file" enctype="multipart/form-data" onChange={changeHandler} style={{width:'60%', fontWeight:'bold', fontSize:18, padding:5, backgroundColor:'#fff'}}/>
                                    <button className="btn-thongke1" onClick={handleSubmission}>Submit</button>
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
                        defaultPageSize={20}
                    />
                    <IntegratedPaging />
                    <FilteringState onFiltersChange={(x)=>handleChange(x)}  />
                    <VirtualTable tableComponent={TableComponent} columnExtensions={defaultColumnWidths}  height={window.innerHeight - 100}/>
                    {/* <Table/> */}
                    <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                    <TableHeaderRow showSortingControls
                        sortLabelComponent={SortLabel} />
                    <TableColumnVisibility
                        defaultHiddenColumnNames={defaultHiddenColumnNames}
                        onHiddenColumnNamesChange={onHiddenColumnNamesChange}
                    />
                    {filterRowVisible ? <TableFilterRow
                    //showFilterSelector
                    //iconComponent={FilterIcon}
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
        </div>
    );
};