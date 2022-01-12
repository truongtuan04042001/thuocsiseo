import React, { useState, useEffect, useCallback } from 'react';
import _ from 'lodash';
import Paper from '@material-ui/core/Paper';
import { SummaryState, IntegratedSummary, FilteringState, IntegratedFiltering, EditingState, PagingState, IntegratedPaging, RowDetailState, SortingState, DataTypeProvider, IntegratedSorting, } from '@devexpress/dx-react-grid';
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
    TableFixedColumns,
    ColumnChooser,
    TableSelection,
    VirtualTable,
    PagingPanel,
    SearchPanel,
    TableFilterRow,
    TableRowDetail,
} from '@devexpress/dx-react-grid-material-ui';
import { ToolbarEditing } from "./toolbar-editing";
// import { API_URL } from '../constants/constants'
// import { generateRows } from './generator';
import SuaDonHangNhap from './SuaDonHangNhap';
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import { Link } from 'react-router-dom';
// import options_years from './options_years.js';
// import options_thongke from './options_thongke.js';
// import Select from 'react-select';
// import range from "lodash/range";
import DatePicker from "react-datepicker";
import calendar_time from '../images/calendar_time.png'
import next_month_tk from '../images/next_month_tk.png'
import prev_month_tk from '../images/prev_month_tk.png'
import { getMonth, getYear, getDate, getQuarter, formatRelative, subDays } from 'date-fns'
import range from "lodash/range"
import refresh_time from '../images/refresh_time.png'
import { API_URL } from '../constants/constants'


export default ({ dataFromParent, parentCallback, parentCallback2, parentCallback3, tenNV, maNV }) => {
    const [expandedRowIds, setExpandedRowIds] = useState([]);
    const [pageSizes] = useState([8, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 0]);

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
       // { name: 'Id', title: 'Id' },
        { name: 'TenNCC', title: 'Tên NCC' },
        { name: 'MaNCC', title: 'Mã NCC' },
        { name: 'SDT', title: 'SDT' },
        { name: 'TenTK', title: 'Tên TK' },
        { name: 'SoTK', title: 'Số TK' },
        { name: 'TenNH', title: 'Tên Ngân Hàng' },
        { name: 'GhiChu', title: 'Ghi Chú' },
       
    ]);

    const [defaultColumnWidths] = useState([
       // { columnName: 'Id', width: 100 },
        { columnName: 'TenNCC', width: 300 },
        { columnName: 'MaNCC', width: 120 },
        { columnName: 'SDT', width: 150 },
        { columnName: 'TenTK', width: 200 },
        { columnName: 'SoTK', width: 200 },
        { columnName: 'TenNH', width: 200 },
        { columnName: 'GhiChu', width: 300 },
       
    ]);

    ///////////

    const [totalSummaryItems] = useState([
        { columnName: 'Id', type: 'count' },
  

    ]);
    const [currencyColumns] = useState([]);

    ///////////////
    const getRowId = row => row.MaNCC;
    // const getRowId = row => row.MaDatHang;
    const newDate = new Date()
   // const date = "DonHangNhap " + newDate.getDate() + "/" + (newDate.getMonth() + 1) + "/" + newDate.getFullYear();




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
                //backgroundColor: fade(theme.palette.primary.main, 0.13),
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
    const [toolbarRowVisible, setToolbarRowVisible] = useState(false);//biến ẩn hiện Toolbar
    const [toolbaredRowVisible, setToolbaredRowVisible] = useState(true);//biến ẩn hiện Toolbar

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

    const getHiddenColumnsFilteringExtensions = hiddenColumnNames => hiddenColumnNames
        .map(columnName => ({
            columnName,
            predicate: () => false,
        }));
    const [defaultHiddenColumnNames] = useState([]);
    const [filteringColumnExtensions, setFilteringColumnExtensions] = useState(
        getHiddenColumnsFilteringExtensions(defaultHiddenColumnNames),
    );
    const onHiddenColumnNamesChange = hiddenColumnNames => setFilteringColumnExtensions(
        getHiddenColumnsFilteringExtensions(hiddenColumnNames),
    );
    //end hàm cho filter 
    // const RowDetail = ({ row }) => (
    //     <SuaDonHangNhap rowfromtable={row} parentCallback={callbackFunction} />
    // );

    // console.log(`${new Date().getTime()} soLanChay=`, soLanChay)
    // func commit thay đổi value trên mỗi dòng đơn hàng
    const commitChanges = async ({ added, changed, deleted }) => {
        // console.log(`${new Date().getTime()} Object.values(changed)=`, Object.values(changed)[0])
        
        if (changed) {
           // console.log(changed)
            if (Object.values(changed)[0] != undefined) {
                const maNCC = Object.getOwnPropertyNames(changed)
               // console.log(maNCC)
               // const arrsplit = maDHN[0].split(',')
                const tmpObj = Object.values(changed)
                const obj = tmpObj[0]
                const propertiesObj = Object.getOwnPropertyNames(obj)
                // console.log(obj)
                // console.log(propertiesObj)
              await fetch(API_URL + '/SuaDanhSachNCC', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data:obj,
                    MaNCC: maNCC[0]
                })
            })
                .then((response) => response.json())
                .then(data => {
                    
                });
                callbackFunction("rand")
             }
        }
        if (deleted) {
           // console.log(deleted[0])
            await fetch(API_URL + '/XoaDanhSachNCC', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    MaNCC: deleted[0]
                })
            })
                .then((response) => response.json())
                .then(data => {
                   
                });
                callbackFunction("rand")
        }

    };

    const [editingStateColumnExtensions] = useState([
        { columnName: 'Id', editingEnabled: false },
        { columnName: 'TenNCC', editingEnabled: true },
        { columnName: 'MaNCC', editingEnabled: false },
        { columnName: 'SDT', editingEnabled: true },
        { columnName: 'TenTK', editingEnabled: true },
        { columnName: 'SoTK', editingEnabled: true },
        { columnName: 'TenNH', editingEnabled: true },
        { columnName: 'GhiChu', editingEnabled: true },
     

    ]);
    const [startEditAction, setStartEditAction] = useState("doubleClick");
    const editColumnMessages = {
        editCommand: 'Sửa',
        commitCommand: 'Lưu',
        cancelCommand: 'Hủy',
        deleteCommand: 'Xóa',
    };
    // const reLoadDonHang = () => {
    //     const rand = Math.random(2) * 1000
    //     callbackFunction(rand)
    // }
    return (
        <div>
            <div style={{ width: '100%',  display: 'flex', position: 'relative' , backgroundColor:'#B8d8e0'}}>
                <div style={{ width: '40%', textAlign: 'left', marginLeft: 10,alignSelf:'center',color:'#197420'}}>
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
                    <b><h2>Bảng Thống Kê Nhà Cung Cấp</h2></b>
                </div>

                {/* nhờ nam phá giao diện  */}


                {/* line cuối nhờ nam phá giao diện  */}

                <div style={{ width: '30%', textAlign: 'right', alignSelf: 'center', display: 'flex', flexWrap: 'wrap' }}>
                    {/* <button className='btn-thongke1' onClick={reLoadDonHang} >
                        <b>Reload</b>
                    </button>

                    <ExportReactCSV csvData={dataFromParent} fileName={date} /> */}
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
                    <IntegratedSummary />
                    <FilteringState onFiltersChange={(x) => handleChange(x)} />
                    {/* <IntegratedFiltering /> */}
                    <Table tableComponent={TableComponent} columnExtensions={defaultColumnWidths} height={window.innerHeight - 100} />
                    <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                    <TableHeaderRow showSortingControls
                        sortLabelComponent={SortLabel} />

                    <TableEditRow

                    />

                    <TableSummaryRow />
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
                    {toolbaredRowVisible ?

                        <TableEditColumn
                            showEditCommand
                            showDeleteCommand

                            width={200}
                            messages={editColumnMessages}
                        />
                        : null}
                    {toolbaredRowVisible ?
                        <TableInlineCellEditing
                            startEditAction={startEditAction}

                        />

                        : null}
                    {/* <ToolbarEditing /> */}
                    {toolbarRowVisible ?
                        <ColumnChooser />
                        : null}
                    {/* <RowDetailState expandedRowIds={expandedRowIds}
                        onExpandedRowIdsChange={setExpandedRowIds} /> */}
                    {/* <TableRowDetail
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