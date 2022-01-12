import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
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
import SuaQuaTangKM from './SuaQuaTangKM';
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
// import { isNum } from 'react-toastify/dist/utils';
export default ({ dataFromParent, parentCallback, parentCallback2 }) => {
    const [expandedRowIds, setExpandedRowIds] = useState([]);
    const [soTienKmNew, setsoTienKmNew] = useState('')
    const [soTienKm2Month, setsoTienKm2Month] = useState('')
    const [hanSDNew, setHanSDNew] = useState('')
    const [hanSD2Month, setHanSD2Month] = useState('')
    const [pageSizes] = useState([8, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 0]);
    const [columns] = useState([
        { name: 'Id', title: 'ID' },
        { name: 'DieuKien', title: 'Điều Kiện' },
        { name: 'TenQua', title: 'Tên Quà KM' },
        { name: 'ThoiHan', title: 'Thời Hạn' },
        { name: 'LoaiKM', title: 'Loại KM' },
        { name: 'LinkVoucher', title: 'Link hình voucher' },
        { name: 'Status', title: 'Trạng thái KM' },
    ]);
    const options_km = [
        { value: 'Tiền', label: 'Tiền' },
        { value: 'Quà', label: 'Quà' },

    ];
    const [defaultColumnWidths] = useState([
        { columnName: 'Id', width: 100 },
        { columnName: 'DieuKien', width: 250 },
        { columnName: 'TenQua', width: 250 },
        { columnName: 'ThoiHan', width: 250 },
        { columnName: 'LoaiKM', width: 250 },
        { columnName: 'LinkVoucher', width: 250 },
        { columnName: 'Status', width: 250 },
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
    const [currencyColumns] = useState(['DieuKien', 'TenQua']);
    const [modalIsOpen1, setIsOpen1] = useState(false);
    Modal.setAppElement('#root')

    const [Id, setId] = useState();
    const [dk, setDk] = useState(0);
    const [tenqua, setTenqua] = useState();
    const [thoihan, setThoihan] = useState(0);
    const [loaikm, setLoaikm] = useState();

    const Sub = () => {

        if (dk <= 0 || dk == null || dk == undefined) {
            alert("Điều kiện nhận thưởng trống")
        } else {
            if (tenqua == "" || tenqua == null || tenqua == undefined) {
                alert("Tên quà tặng trống")
            } else {
                if (thoihan <= 0 || thoihan == null || thoihan == undefined) {
                    alert("Thời hạn nhận thưởng trống")
                } else {
                    if (loaikm == "" || loaikm == null || loaikm == undefined) {
                        alert("Loại khuyến mãi trống")
                    } else {
                        if (loaikm.value == "Tiền") {
                            if (!isNaN(tenqua)) {

                                var targetDate = new Date();
                                targetDate.setDate(targetDate.getDate() + (thoihan * 1));
                                var dd = targetDate.getDate();
                                var mm = targetDate.getMonth() + 1;
                                var yyyy = targetDate.getFullYear();
                                var date = yyyy + '-' + mm + '-' + dd;

                                fetch(API_URL + '/themchuongtrinhkm', {
                                    method: 'POST',
                                    headers: {
                                        Accept: 'application/json',

                                        'Content-Type': 'application/json'
                                    },

                                    body: JSON.stringify({
                                        DieuKien: dk,
                                        TenQua: tenqua,
                                        ThoiHan: date,
                                        LoaiKM: loaikm.value
                                    })
                                })
                                parentCallback(dk);
                                toggleModal()
                            } else {
                                alert("Loại khuyến mãi là Tiền nên giá trị thưởng phải là số")
                            }
                        } else {

                            if (isNaN(tenqua)) {
                                var targetDate = new Date();
                                targetDate.setDate(targetDate.getDate() + (thoihan * 1));
                                var dd = targetDate.getDate();
                                var mm = targetDate.getMonth() + 1;
                                var yyyy = targetDate.getFullYear();
                                var date = yyyy + '-' + mm + '-' + dd;

                                fetch(API_URL + '/themchuongtrinhkm', {
                                    method: 'POST',
                                    headers: {
                                        Accept: 'application/json',

                                        'Content-Type': 'application/json'
                                    },

                                    body: JSON.stringify({
                                        DieuKien: dk,
                                        TenQua: tenqua,
                                        ThoiHan: date,
                                        LoaiKM: loaikm.value
                                    })
                                })
                                parentCallback(dk);
                                toggleModal()
                            } else {
                                alert("Loại khuyến mãi là Quà nên giá trị thưởng phải là chữ")
                            }
                        }


                    }

                }

            }
            // }
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
        <SuaQuaTangKM rowfromtable={row} parentCallback={callbackFunction} />
    );


    return (
        <div>

            <Paper>
                <div style={{ width: '100%',  display: 'flex', backgroundColor:'#B8d8e0' }}>
                    <div style={{ width: '30%', textAlign: 'left', alignSelf: 'center', marginLeft: 10 }}>

                    </div>
                    <div style={{ width: '40%', textAlign: 'center', alignSelf: 'center', color: '#197420' }}>
                        <b><h2>Bảng Quản lý Quà Tặng - Giảm Giá</h2></b>
                    </div>
                    <div style={{ width: '30%', textAlign: 'right', alignSelf: 'center' }}>
                        <button className='btn-thongke1' onClick={toggleModal} style={{backgroundColor:'#2de183'}}>
                            <b>Thêm</b>
                        </button>
                        <Link
                            style={{ width: 200 , fontWeight:'bold' }}
                            to={{
                                pathname: '/EditorGift',
                            }}
                            className="btn_ttk btn-thongke1">
                            Chỉnh sửa tiêu đề Quà Tặng
                        </Link>
                        {/* <button className='btn-thongke1' style={{width:150}} onClick={toggleModal1} >
                            <b>Sửa Mã Giảm Giá</b>
                        </button> */}

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
                                <label><b>Điều kiện nhận thưởng</b></label><br></br>
                                <input
                                    className="ip_mh"
                                    type="number"
                                    value={dk}
                                    onChange={text => { setDk(text.target.value) }}
                                    placeholder="Nhập điều kiện nhận thưởng">
                                </input>

                            </div>
                            <div>
                                <label><b>Tên quà tặng/Tiền km</b></label><br></br>
                                <input
                                    className="ip_tenhang"
                                    type="text"
                                    value={tenqua}
                                    onChange={text => { setTenqua(text.target.value) }}
                                    placeholder="Nhập Tên quà tặng">
                                </input>
                            </div>
                            <div>
                                <label><b>Thời hạn của quà (theo ngày)</b></label><br></br>
                                <input
                                    className="ip_tenhang"
                                    type="number"
                                    value={thoihan}
                                    onChange={text => { setThoihan(text.target.value) }}
                                    placeholder="Nhập thời hạn của quà tặng">
                                </input>
                            </div>
                            <div>
                                <label><b>Loại khuyến mãi</b></label><br></br>
                                <Select
                                    id="select1"
                                    value={loaikm}
                                    onChange={(text) => { setLoaikm(text) }}
                                    options={options_km}
                                    placeholder="Chọn loại khuyến mãi"
                                    maxMenuHeight={145}
                                />
                            </div>

                        </div>



                    </div>


                    <input className="submit" type="submit" value="Thêm Banner mới" onClick={Sub}></input>
                </div>
            </Dialog>
        </div>
    );
};