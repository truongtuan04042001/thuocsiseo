import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
// import {
//     SelectionState,
//     IntegratedSelection,
//     FilteringState,
//     SearchState,
//     IntegratedFiltering,
//     PagingState,
//     IntegratedPaging,
//     RowDetailState,
//     SortingState,
//     IntegratedSorting,
// } from '@devexpress/dx-react-grid';
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { SummaryState, IntegratedSummary, FilteringState, SearchState, IntegratedFiltering, PagingState, IntegratedPaging, RowDetailState, SortingState, DataTypeProvider, IntegratedSorting, } from '@devexpress/dx-react-grid';
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
import { ExportReactCSV } from './ExportReactCSV'
import SuaBanner from './SuaBanner';
import { API_URL } from '../constants/constants'
import { generateRows } from './generator';
import SuaTrangThai from './SuaTrangThai';
import md5 from './md5';
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
import Modal from 'react-modal';
import options from './options';
import Select from 'react-select';
export default ({ dataFromParent, parentCallback, parentCallback2 }) => {
    const [expandedRowIds, setExpandedRowIds] = useState([]);
    const [soTienKmNew, setsoTienKmNew] = useState('')
    const [soTienKm2Month, setsoTienKm2Month] = useState('')
    const [hanSDNew, setHanSDNew] = useState('')
    const [hanSD2Month, setHanSD2Month] = useState('')
    const [pageSizes] = useState([8, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 0]);
    const [columns] = useState([
        { name: 'Id', title: 'ID' },
        { name: 'TenBanner', title: 'Tên Banner' },
        { name: 'original', title: 'Link Hình Banner' },


    ]);

    const [defaultColumnWidths] = useState([
        { columnName: 'Id', width: 100 },
        { columnName: 'TenBanner', width: 450 },
        { columnName: 'original', width: 550 },
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
    const [currencyColumns] = useState(['Gia']);
    const [modalIsOpen1, setIsOpen1] = useState(false);
    Modal.setAppElement('#root')

    const [Id, setId] = useState();
    const [Ten, setTen] = useState();
    const [Url, setUrl] = useState("default");


    const Sub = () => {

        if (Ten == "" || Ten == null || Ten == undefined) {
            alert("Tên Banner trống")
        } else {
            fetch(API_URL + '/themBanner', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',

                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    TenBanner: Ten,
                    original: Url

                })
            })
            parentCallback(Ten);
            toggleModal()

        }


        // }
        //}
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



    //hàm cho filter 
    const [filterRowVisible, setFilterRowVisible] = useState(false);//biến ẩn hiện filter
    const [toolbarRowVisible, setToolbarRowVisible] = useState(false);//biến ẩn hiện Toolbar
    const [filters, setFilters] = useState([]);

    const callbackFunction2 = (childData2) => { parentCallback2(childData2) };

    // useEffect(() => {
    //     callbackFunction2(filters)
    // }, [filters]);

    const getHiddenColumnsFilteringExtensions = hiddenColumnNames => hiddenColumnNames
        .map(columnName => ({
            columnName,
            predicate: () => false,
        }));

    const [defaultHiddenColumnNames] = useState(['Info']);
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
    const testKey3 = (e) => {
        if (e.code === "Enter") {

        }
    }
    const RowDetail = ({ row }) => (
        <SuaBanner rowfromtable={row} parentCallback={callbackFunction} />
    );

    return (
        <div>

            <Paper>
                <div style={{ width: '100%', display: 'flex', backgroundColor:'#B8d8e0' }}>
                    <div style={{ width: '30%', textAlign: 'left', alignSelf: 'center', marginLeft: 10 }}>

                    </div>
                    <div style={{ width: '40%', textAlign: 'center', alignSelf: 'center', color: '#197420' }}>
                        <b><h2>Bảng Quản lý Banner</h2></b>
                    </div>
                    <div style={{ width: '30%', textAlign: 'right', alignSelf: 'center' }}>
                        <button className='btn-thongke1' onClick={toggleModal} style={{backgroundColor:'#2de183'}} >
                            <b>Thêm</b>
                        </button>


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
                    <CurrencyTypeProvider
                        for={currencyColumns}
                    />
                    <FilteringState defaultFilters={[]} onFiltersChange={setFilters} />
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
            {/* Dialog hiện sủa khuyến mãi */}

            <Dialog
                open={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onClose={toggleModal}
            // style={customStyles}
            // contentLabel="Đăng kí"
            >
                <div style={{ width: '100%', marginTop: 10 }}>

                    <div style={{ display: 'flex', flexDirection: 'row', background: "#f2f2f2", borderRadius: '5px', flexWrap: 'wrap', width: '100%', }}>
                        <div style={{ width: '100%', padding: '10px' }}>

                            <div>
                                <label><b>Tên banner</b></label><br></br>
                                <input
                                    className="ip_mh"
                                    type="text"
                                    value={Ten}
                                    onChange={text => { setTen(text.target.value) }}
                                    placeholder="Nhập tên banner">
                                </input>

                            </div>
                            {/* <div>
                                <label><b>Link hình banner</b></label><br></br>
                                <input
                                    className="ip_tenhang"
                                    type="text"
                                    value={Url}
                                    onChange={text => { setUrl(text.target.value) }}
                                    placeholder="Nhập link hình banner">
                                </input>
                            </div> */}


                        </div>



                    </div>


                    <input className="submit" type="submit" style={{backgroundColor:'#2DE183'}} value="Thêm Banner mới" onClick={Sub}></input>
                </div>
            </Dialog>
        </div>
    );
};