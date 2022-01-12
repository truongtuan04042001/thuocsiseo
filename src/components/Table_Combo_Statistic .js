import React, { useState, useEffect, useCallback } from 'react';
import _ from 'lodash';
import Paper from '@material-ui/core/Paper';
import { SummaryState, IntegratedSummary, FilteringState, SearchState, EditingState, IntegratedFiltering, PagingState, IntegratedPaging, RowDetailState, SortingState, DataTypeProvider, IntegratedSorting, } from '@devexpress/dx-react-grid';
import { ExportReactCSV } from './ExportReactCSV'
import {
    Grid,
    Table,
    Toolbar,
    TableHeaderRow,
    // TableEditRow,
    // TableEditColumn,
    TableColumnResizing,
    TableColumnVisibility,
    TableSummaryRow,
    // TableFixedColumns,
    ColumnChooser,
    // TableSelection,
    VirtualTable,
    PagingPanel,
    // SearchPanel,
    TableFilterRow,
    TableRowDetail,
} from '@devexpress/dx-react-grid-material-ui';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Modal from 'react-modal';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { API_URL } from '../constants/constants';

export default ({ dataFromParent, parentCallback, parentCallback2 }) => {
    const [expandedRowIds, setExpandedRowIds] = useState([]);
    const [pageSizes] = useState([8, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 0]);
    Modal.setAppElement('#root')

    const [columns] = useState([
        { name: 'Id', title: 'ID' },
        { name: 'MaDatHang', title: 'Mã đặt hàng' },
        { name: 'KhachHang', title: 'Khách hàng' },
        { name: 'MaKhachHang', title: 'Mã khách hàng' },
        { name: 'SoDienThoai', title: 'SĐT' },
        { name: 'NgayDatHang', title: 'Ngày đặt hàng' },
        { name: 'NgayXuLy', title: 'Ngày XL' },
        { name: 'MaNgXuLy', title: 'Người xử lý' },
        { name: 'IdCombo', title: 'ID Combo' },
        { name: 'ComboName', title: 'Tên combo' },
        { name: 'Quantity', title: 'Số Lượng' },
        { name: 'TotalPrice', title: 'Tổng giá' },

    ]);

    const date = "HangSapHet " + new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear();

    const [defaultColumnWidths] = useState([
        { columnName: 'Id', width: 100 },
        { columnName: 'MaDatHang', width: 170 },
        { columnName: 'KhachHang', width: 170 },
        { columnName: 'MaKhachHang', width: 170 },
        { columnName: 'SoDienThoai', width: 120 },
        { columnName: 'NgayDatHang', width: 170 },
        { columnName: 'NgayXuLy', width: 170 },
        { columnName: 'MaNgXuLy', width: 150 },
        { columnName: 'IdCombo', width: 150 },
        { columnName: 'ComboName', width: 150 },
        { columnName: 'Quantity', width: 140 },
        { columnName: 'TotalPrice', width: 150 },

    ]);
    const CurrencyFormatter = ({ value }) => (
        value != null ?
            !isNaN(value) ?
                parseInt(value).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                :
                value
            : null
    );
    const messages = {
        counts: "Tổng Quà: ",
        max: "Lớn Nhất",
        sum: "Tổng"
    };
    const CurrencyTypeProvider = props => (
        <DataTypeProvider
            formatterComponent={CurrencyFormatter}
            {...props}
        />
    );
    const [totalSummaryItems] = useState([

        { columnName: 'Quantity', type: 'sum' },
        { columnName: 'TotalPrice', type: 'sum' },

    ]);
    const [currencyColumns] = useState(['TotalPrice']);
    const [filterRowVisible, setFilterRowVisible] = useState(true);//biến ẩn hiện filter
    const [toolbarRowVisible, setToolbarRowVisible] = useState(false);//biến ẩn hiện Toolbar
    // const callBackReload = (childData) => {
    //     parentCallback(childData)
    //     setExpandedRowIds([])
    // };

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

    // style cho các dòng trong table
    const styles = theme => ({
        tableStriped: {
            '& tbody tr:nth-of-type(odd)': {
                backgroundColor: '#c5dfb3',
                //  backgroundColor: fade(theme.palette.primary.main, 0.13),
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


    const HighlightedCell = ({ value, style, ...restProps }) => {
        return (
            <Table.Cell
                {...restProps}
                style={{
                    backgroundColor: value == 'Cảnh báo hàng sắp hết ⚠️⚠️⚠️' ? '#FF4D34' : undefined,
                    ...style,
                }}
            >
                <span
                    style={{
                        color: value == 'Cảnh báo hàng sắp hết ⚠️⚠️⚠️' ? '#FFEB6A' : undefined,
                    }}
                >
                    {value}
                </span>
            </Table.Cell>
        )
    };

    const Cell = (props) => {
        const { column } = props;
        if (column.name === 'HetHang') {
            return <HighlightedCell {...props} />;
        }
        return <Table.Cell {...props} />;
    };
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
    return (
        <div>
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
                    </div>
                    <div style={{ width: '40%', textAlign: 'center', alignSelf: 'center', color: '#197420' }}><b><h2> Bảng Thống Kê Sale Combo</h2></b></div>
                    <div style={{ width: '30%', textAlign: 'right', alignSelf: 'center' }}>
                        {/* <button className='btn-thongke1' style={{ backgroundColor: '#2de183' }} onClick={reLoad}>
                            <b>Reload</b>
                        </button> */}
                        {/* <button className='btn-thongke1' style={{ backgroundColor: '#2de183' }} onClick={reLoad2}>
                            <b>Delete</b>
                        </button> */}
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
                    <CurrencyTypeProvider
                        for={currencyColumns}
                    />
                    <SummaryState
                        totalItems={totalSummaryItems}
                    />
                    <IntegratedSummary />
                    {/* <Table cellComponent={Cell} /> */}
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
                
                    <PagingPanel
                        pageSizes={pageSizes}
                    />
                </Grid>
            </Paper>
        </div>
    );

};