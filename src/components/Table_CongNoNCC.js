import React, { useState, useEffect, useCallback } from 'react';
import Paper from '@material-ui/core/Paper';
import { SummaryState, IntegratedSummary, FilteringState, SearchState, EditingState, IntegratedFiltering, PagingState, IntegratedPaging, RowDetailState, SortingState, DataTypeProvider, IntegratedSorting, } from '@devexpress/dx-react-grid';
import { ExportReactCSV } from './ExportReactCSV'
import {
    Grid,
    Table,
    Toolbar,
    TableHeaderRow,
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
// import { API_URL } from '../constants/constants'
// import { generateRows } from './generator';
import SuaCongNoNCC from './SuaCongNoNCC';
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
import Modal from 'react-modal';
import prev_month_tk from '../images/prev_month_tk.png'
import { getMonth, getYear, getDate, getQuarter, formatRelative, subDays } from 'date-fns'
import range from "lodash/range"
import refresh_time from '../images/refresh_time.png'
import { API_URL } from '../constants/constants'
import _ from 'lodash';
export default ({ dataFromParent, parentCallback, parentCallback2, tenNV, maNV }) => {
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
        { name: 'Id', title: 'Id' },
        { name: 'TenNCC', title: 'Tên NCC' },
        { name: 'MaNCC', title: 'Mã NCC' },
        { name: 'SDT', title: 'SDT' },
        { name: 'TenTK', title: 'Tên TK' },
        { name: 'SoTK', title: 'Số TK' },
        { name: 'TenNH', title: 'Tên Ngân Hàng' },
        { name: 'GhiChu', title: 'Ghi Chú' },
        { name: 'TongCN', title: 'Tổng Công Nợ' },
        { name: 'MaDHN', title: 'Mã Đơn Hàng Nhập' },
        { name: 'NgayNhapHang', title: 'Ngày Nhập Hàng' },
    ]);

    const [defaultColumnWidths] = useState([
        { columnName: 'Id', width: 100 },
        { columnName: 'TenNCC', width: 120 },
        { columnName: 'MaNCC', width: 120 },
        { columnName: 'SDT', width: 150 },
        { columnName: 'TenTK', width: 130 },
        { columnName: 'SoTK', width: 100 },
        { columnName: 'TenNH', width: 150 },
        { columnName: 'GhiChu', width: 150 },
        { columnName: 'TongCN', width: 150 },
        { columnName: 'MaDHN', width: 150 },
        { columnName: 'NgayNhapHang', width: 150 },
    ]);

    ///////////

    const [totalSummaryItems] = useState([

        { columnName: 'TongCN', type: 'max' },
        { columnName: 'TongCN', type: 'sum' },

    ]);
    const [currencyColumns] = useState(['TongCN']);

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
        <SuaCongNoNCC rowfromtable={row} parentCallback={callbackFunction} tenNV={tenNV} />
    );

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

    const HighlightedCell = ({ value, style, ...restProps }) => {
        const dateA = new Date()
        let dateB
        if (value != undefined) {
            const splitDateB = value.split(`/`)
            dateB = new Date(`${splitDateB[2]}/${splitDateB[1]}/${splitDateB[0]}`)
        } else {
            dateB = new Date(value)
        }
        const dateC = soSanhNgay.inDays(dateB, dateA)
        return (
            <Table.Cell
                {...restProps}
                style={{
                    backgroundColor: dateC >= 15 ? 'red' : dateC < 15 && dateC >= 10 ? 'yellow' : dateC < 10 ? 'green' : undefined,
                    ...style,
                }}
            >
                <span
                    style={{
                        color: dateC >= 15 || (dateC >= 0 && dateC < 10) ? 'white' : 'black',
                    }}
                >
                    {value}
                </span>
            </Table.Cell>
        )
    };

    const Cell = (props) => {
        const { column } = props;
        if (column.name === 'NgayNhapHang') {
            return <HighlightedCell {...props} />;
        }
        return <Table.Cell {...props} />;
    };
    return (

        <div>
            <Paper>
                <div style={{ width: '100%',  display: 'flex', position: 'relative', backgroundColor:'#B8d8e0' }}>
                    <div style={{ width: '30%', textAlign: 'left', marginLeft: 10,alignSelf:'center',color:'#197420' }}>
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
                        <b><h2>Bảng Thống Kê Công Nợ NCC</h2></b>
                    </div>

                    <div style={{ width: '30%', textAlign: 'right', alignSelf: 'center', display: 'flex', flexWrap: 'wrap' }}>
                        {/* <button className='btn-thongke1' onClick={reLoadDonHang} >
                        <b>Reload</b>
                    </button> */}
                    <div style={{width:'100%', alignItems:'end'}}>
                    <ExportReactCSV csvData={dataFromParent} fileName={"CongNo"} />
                    </div>
                       
                    </div>
                    <div>
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
                    <CurrencyTypeProvider
                        for={currencyColumns}
                    />
                    <SummaryState
                        totalItems={totalSummaryItems}
                    />
                    <IntegratedSummary />
                    <FilteringState onFiltersChange={(x) => handleChange(x)} />
                    <VirtualTable cellComponent={Cell} tableComponent={TableComponent} columnExtensions={defaultColumnWidths} height={window.innerHeight - 100} />
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