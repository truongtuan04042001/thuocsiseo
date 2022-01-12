import React, { useState, useEffect,useCallback } from 'react';
import Paper from '@material-ui/core/Paper';
import {
    SelectionState, SummaryState, IntegratedSummary, IntegratedSelection, FilteringState, SearchState, IntegratedFiltering, PagingState, IntegratedPaging, RowDetailState, SortingState, DataTypeProvider, IntegratedSorting,
} from '@devexpress/dx-react-grid';
import { ExportReactCSV } from './ExportReactCSV'
import DateRange from '@material-ui/icons/DateRange';
import {
    Grid,
    Table,
    Toolbar,
    TableHeaderRow,
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
// import { API_URL } from '../constants/constants'
// import { generateRows } from './generator';
import SuaDonHang from './SuaDonHang';
import _ from 'lodash';
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import { Link } from 'react-router-dom';
import options_years from './options_years.js';
import options_thongke from './options_thongke.js';
import Select from 'react-select';

import DatePicker from "react-datepicker";
import { getDate, getMonth, getYear } from 'date-fns';
import range from "lodash/range";

export default ({ dataFromParent, parentCallback, parentCallback2, parentCallback3 }) => {
    const [expandedRowIds, setExpandedRowIds] = useState([]);
    const [pageSizes] = useState([8, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 0]);

    const CurrencyFormatter = ({ value }) => (
        value != null ?
            value.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
            : null
    );

    const CurrencyTypeProvider = props => (
        <DataTypeProvider
            formatterComponent={CurrencyFormatter}
            {...props}
        />
    );

    const [columns] = useState([
        { name: 'MaDatHang', title: 'Mã đặt hàng' },
        { name: 'ThoiGian', title: 'Thời gian đặt' },
        { name: 'KhachHang', title: 'Khách hàng' },
        { name: 'KhachCanTra', title: 'Khách cần trả' },
        { name: 'KhachDaTra', title: 'Khách đã trả' },
        { name: 'TrangThai', title: 'Trạng thái' },
        { name: 'TenDN', title: 'Tên doanh nghiệp' },
        { name: 'SoDienThoai', title: 'SĐT' },
        { name: 'DiaChi', title: 'Địa Chỉ' },
        // { name: 'Email', title: 'Email' },
        // { name: 'ChietKhau', title: 'Chiết Khấu' },
        // { name: 'VAT', title: 'VAT' },
        // { name: 'GhiChu', title: 'Ghi Chú' },
    ]);

    const [defaultColumnWidths] = useState([
        { columnName: 'MaDatHang', width: 150 },
        { columnName: 'ThoiGian', width: 150 },
        { columnName: 'KhachHang', width: 150 },
        { columnName: 'KhachCanTra', width: 150 },
        { columnName: 'KhachDaTra', width: 150 },
        { columnName: 'TrangThai', width: 150 },
        { columnName: 'TenDN', width: 150 },
        { columnName: 'SoDienThoai', width: 120 },
        { columnName: 'DiaChi', width: 700 },
        // { columnName: 'Email', width: 120 },
        // { columnName: 'ChietKhau', width: 120},
        // { columnName: 'VAT', width: 120 },
        // { columnName: 'GhiChu', width: 120},

    ]);

    ///////////

    const [totalSummaryItems] = useState([
        { columnName: 'MaDatHang', type: 'count' },
        { columnName: 'KhachCanTra', type: 'max' },
        { columnName: 'KhachCanTra', type: 'sum' },
        { columnName: 'KhachDaTra', type: 'max' },
        { columnName: 'KhachDaTra', type: 'sum' },
    ]);
    const [currencyColumns] = useState(['KhachCanTra', 'KhachDaTra']);

    ///////////////

    let newDate = new Date()
    let date = "DonHang " + newDate.getDate() + "/" + (newDate.getMonth() + 1) + "/" + newDate.getFullYear();

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
 

    //const FilterIcon = ({ type, ...restProps }) => {
    //    if (type === 'month') return <DateRange {...restProps} />;
    //    return <TableFilterRow.Icon type={type} {...restProps} />;
    //};
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
    const RowDetail = ({ row }) => (
        <SuaDonHang rowfromtable={row} parentCallback={callbackFunction} />
    );
 

    return (
        <div>

            <div style={{ width: '100%',  display: 'flex', position: 'relative', backgroundColor:'#B8d8e0' }}>
                <div style={{ width: '30%', textAlign: 'left', marginLeft: 10 ,alignSelf:'center',color:'#197420'}}>
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
                    <b><h2>Bảng Thống Kê Đơn Hàng</h2></b>
                </div>


                <div style={{ width: '30%', textAlign: 'right', alignSelf: 'center' }}>
                    {/* <Link to='/DonHangOffline' className='DHOffline'>Đơn Hàng Offline</Link> */}
                    <ExportReactCSV csvData={dataFromParent} fileName={date} />

                </div>
            </div>
            <Paper >


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
                    <CurrencyTypeProvider
                        for={currencyColumns}
                    />
                    <SummaryState
                        totalItems={totalSummaryItems}
                    />

                    <IntegratedSummary />
                    <FilteringState onFiltersChange={(x)=>handleChange(x)}  />
                    <VirtualTable tableComponent={TableComponent} columnExtensions={defaultColumnWidths} height={window.innerHeight - 100} />
                    {/* <Table/> */}
                    <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                    <TableHeaderRow showSortingControls
                        sortLabelComponent={SortLabel} />
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