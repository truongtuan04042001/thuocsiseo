import React, { useState, useEffect,useCallback } from 'react';
import _ from 'lodash';
import Paper from '@material-ui/core/Paper';
import {
    PagingState,
    IntegratedPaging,
    RowDetailState, 
    SortingState,
    IntegratedSorting,
    FilteringState,
} from '@devexpress/dx-react-grid';
import { ExportReactCSV } from './ExportReactCSV'
import {
    Grid,
    Table,
    TableFilterRow,
    TableHeaderRow,
    TableColumnResizing,
    VirtualTable,
    PagingPanel,

} from '@devexpress/dx-react-grid-material-ui';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Modal from 'react-modal';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

export default ({ dataFromParent, callBackReload, callBackFilterHetHang }) => {
    const [expandedRowIds, setExpandedRowIds] = useState([]);
    const [pageSizes] = useState([8, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 0]);
    Modal.setAppElement('#root')

    const [columns] = useState([
        { name: 'MaHang', title: 'Mã Hàng' },
        { name: 'TenHang', title: 'Tên Hàng' },
        { name: 'HangSX', title: 'Hãng Sản Xuất' },
        { name: 'ConLai', title: 'Số Lượng' },
        { name: 'HetHang', title: 'Hết Hàng' },
    ]);

    const date = "HangSapHet " + new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear();

    const [defaultColumnWidths] = useState([
        { columnName: 'MaHang', width: 150 },
        { columnName: 'TenHang', width: 600 },
        { columnName: 'HangSX', width: 400 },
        { columnName: 'ConLai', width: 150 },
        { columnName: 'HetHang', width: 350 },
    ]);


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

    const TableComponent = withStyles(styles, { name: 'TableComponent' })(TableComponentBase);

    const reLoad = () => {
        const rand = Math.random(2) * 1000
        callBackReload(rand)
    }

    const stylestwo = {
        one: {
            backgroundColor: '#FFEB6A',
        },
        zero: {
            backgroundColor: '#FF4D34',
        },
    };

    // const rowComponent = ({ row, ...restProps }) => {
    //     let temp = 'one'
    //     if (row.HetHang == 'Cảnh báo⚠️⚠️⚠️') {
    //         temp = 'zero'
    //     }
    //     return (
    //         <Table.Row
    //             {...restProps}
    //             style={{ ...stylestwo[temp] }}
    //         >
    //         </Table.Row>
    //     );
    // }

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

    const [filterRowVisible, setFilterRowVisible] = useState(true);//biến ẩn hiện filter
    const [filters, setFilters] = useState([]);

    const debounceFunc = useCallback(
        _.debounce(e => { callBackFilterHetHang(e) }, 300),
        []
      );
    
      const handleChange = e => {
    
        debounceFunc(e);
      };
    return (
        <div>
            <Paper>
                <div style={{ width: '100%', display: 'flex', backgroundColor:'#B8d8e0' }}>
                    <div style={{ width: '30%', height: 50, textAlign: 'left', marginLeft: 10, display: "flex", alignSelf: 'center',color:'#197420' }}>
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
                    <div style={{ width: '40%', textAlign: 'center', alignSelf: 'center', color: '#197420' }}><b><h2> Bảng Thống Kê Hàng Sắp Hết</h2></b></div>
                    <div style={{ width: '30%', textAlign: 'right', alignSelf: 'center' }}>
                        <button className='btn-thongke1' style={{backgroundColor:'#2de183'}} onClick={reLoad}>
                            <b>Reload</b>
                        </button>
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
                    <VirtualTable cellComponent={Cell} tableComponent={TableComponent} columnExtensions={defaultColumnWidths} height={window.innerHeight - 100} />
                    <RowDetailState expandedRowIds={expandedRowIds}
                        onExpandedRowIdsChange={setExpandedRowIds} />
                    <PagingPanel
                        pageSizes={pageSizes}
                    />
                    {/* <Table rowComponent={rowComponent} /> */}
                    {/* <Table cellComponent={Cell} /> */}
                    <FilteringState onFiltersChange={(x)=>handleChange(x)}  />
                    {filterRowVisible ? <TableFilterRow /> : null}

                    <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                    <TableHeaderRow showSortingControls sortLabelComponent={SortLabel} />
                </Grid>
            </Paper>
        </div>
    );

};