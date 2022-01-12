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
import ModalNhanVien2 from './modalnhanviencopy';
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
import SuaNV from './SuaNV';
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
export default ({ dataFromParent, parentCallback, parentCallback2, maNV }) => {
    const [expandedRowIds, setExpandedRowIds] = useState([]);
    const [pageSizes] = useState([8, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 0]);
    const [columns] = useState([
        { name: 'MaNV', title: 'Tên Đăng Nhập' },
        { name: 'Info', title: 'Info' },
        { name: 'TenNV', title: 'Tên NV' },
        { name: 'SDT', title: 'SDT' },
        { name: 'Email', title: 'Email' },
        { name: 'MK', title: 'Password' },
        { name: 'Cccd', title: 'CCCD' },
        { name: 'DiaChi', title: 'Địa Chỉ' },
        { name: 'KhuVuc', title: 'Khu Vực' },
        { name: 'MaKH', title: 'Mã KH' },

    ]);

    const [defaultColumnWidths] = useState([
        { columnName: 'MaNV', width: 200 },
        { columnName: 'Info', width: 250 },
        { columnName: 'TenNV', width: 210 },
        { columnName: 'SDT', width: 120 },
        { columnName: 'Email', width: 250 },
        { columnName: 'MK', width: 250 },
        { columnName: 'Cccd', width: 250 },
        { columnName: 'DiaChi', width: 250 },
        { columnName: 'KhuVuc', width: 250 },
        { columnName: 'MaKH', width: 250 },

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
    //biến cho nút update/add
    const [update, setUpdate] = useState(false);
    const anupdate = () => setUpdate(!update)
    //const anadd = () =>   handleClickOpen2()
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

    //hàm thêm 1 sp
    const [MaNV, setMaNV] = useState();
    const [Info, setInfo] = useState();
    const [TenNV, setTenNV] = useState();
    const [SDT, setSDT] = useState();
    const [Email, setEmail] = useState();
    const [MK, setMK] = useState();
    const [Cccd, setCccd] = useState();
    const [DiaChi, setDiaChi] = useState();
    const [KhuVuc, setKhuVuc] = useState();
    const [MaKH, setMaKH] = useState();

    const [radio_1, setRadio1] = useState('Nhà thuốc');
    const Sub = () => {
        // if (MaNV == "" || MaNV == null || MaNV == undefined) {
        //     alert("Mã NV Trống")
        // } else {
        // if (Info == "" || Info == null || Info == undefined) {
        //     alert("Info Trống")
        // } else {
        if (TenNV == "" || TenNV == null || TenNV == undefined) {
            alert("Tên NV Trống")
        } else {
            if (SDT == "" || SDT == null || SDT == undefined) {
                alert("SDT Trống")
            } else {
                // if (Email == "" || Email == null || Email == undefined) {
                //     alert("Email Trống")
                // } else {
                if (MK == "" || MK == null || MK == undefined) {
                    alert("Password Trống")
                } else {
                    if (Cccd == "" || Cccd == null || Cccd == undefined) {
                        alert("Cccd Trống")
                    } else {

                        if (DiaChi == "" || DiaChi == null || DiaChi == undefined) {
                            alert("Địa Chỉ Trống")
                        } else {
                            if (KhuVuc == "" || KhuVuc == null || KhuVuc == undefined) {
                                alert("Khu Vực Trống")
                            } else {
                                // if (MaKH == "" || MaKH == null || MaKH == undefined) {
                                //     alert("Mã KH Trống")
                                // } else {
                                //done
                                //}
                                fetch(API_URL + '/themkhachhang', {
                                    method: 'POST',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        ten_kh: TenNV,
                                        sdt_kh: SDT,
                                        email_kh: Email,
                                        pass_kh: MK,
                                        khuvuc_kh: KhuVuc.value,
                                        diachi_kh: DiaChi,
                                        doanhnghiep: radio_1
                                    })
                                })
                                    .then((response) => response.json())
                                    .then(checksdt => {
                                        if (checksdt == '1') {
                                            alert("Số điện thoại đã tồn tại")
                                        }
                                        else if (checksdt == '0') {
                                            alert("Đăng Ký Thành Công")
                                            toggleModal()
                                        }
                                    });
                                callbackFunction("Thêm TK")
                            }
                        }

                    }
                }
                // }
            }
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

    const RowDetail = ({ row }) => (
        <SuaNV rowfromtable={row} parentCallback={callbackFunction} />
    );

    return (
        <div>

            <Paper>
                <div style={{ width: '100%',  display: 'flex', backgroundColor:'#B8d8e0' }}>
                    <div style={{ width: '30%', textAlign: 'left', alignSelf: 'center', marginLeft: 10 ,color:'#197420'}}>
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
                        <b><h2>Bảng Thống Kê Nhân Viên</h2></b>
                    </div>
                    <div style={{ width: '30%', textAlign: 'right', alignSelf: 'center' }}>
                        {maNV === "adm" ? <button className='btn-thongke12' style={{backgroundColor:'#ff7235'}} >
                            <ModalNhanVien2 className='TK2_btnleft1' />
                        </button> : null}

                        {/*                 
                        <button className='btn-thongke1' onClick={animports} >
                            <b>Import</b>
                        </button>
                        {
                            imports ?
                                <form action={API_URL + "/uploadfile"} enctype="multipart/form-data" method="POST">
                                    
                                    <input type="file" name="myFile" title="Chọn file excel lô hàng" style={{width:'60%', fontWeight:'bold', fontSize:18, padding:5, backgroundColor:'#fff'}}/>
                                    <input type="submit" value="Tải file lên DB"  style={{padding:10, borderRadius:10, backgroundColor:'#fdbe07', color:'#fff', fontWeight:'bold', border:'none', margin:5, cursor:'pointer'}}/>
                                </form>
                                : null
                        } */}
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
                    <RowDetailState expandedRowIds={expandedRowIds}
                        onExpandedRowIdsChange={setExpandedRowIds} />
                    {maNV === "adm" ? <TableRowDetail
                        contentComponent={RowDetail}
                    /> : null}

                    <PagingPanel
                        pageSizes={pageSizes}
                    />
                </Grid>
            </Paper>

            <Dialog
                open={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onClose={toggleModal}
            // style={customStyles}
            // contentLabel="Đăng kí"
            >
                <div style={{ width: '100%', marginTop: 10 }}>

                    <div style={{ display: 'flex', flexDirection: 'row', background: "#f2f2f2", borderRadius: '5px', flexWrap: 'wrap', width: '100%', }}>
                        <div style={{ width: '45%', padding: '10px' }}>

                            <div>
                                <label><b>Tên Khách Hàng</b></label><br></br>
                                <input
                                    className="ip_mh"
                                    type="text"
                                    value={TenNV}
                                    onChange={text => { setTenNV(text.target.value) }}
                                    placeholder="Nhập Tên Khách Hàng">
                                </input>
                            </div>
                            <div>
                                <label><b>SDT</b></label><br></br>
                                <input
                                    className="ip_tenhang"
                                    type="text"
                                    value={SDT}
                                    onChange={text => { setSDT(text.target.value) }}
                                    placeholder="Nhập SDT">
                                </input>
                            </div>
                            <div>
                                <label><b>Email</b></label><br></br>
                                <input
                                    className='ip_sodk'
                                    type="text"
                                    value={Email}
                                    onChange={text => { setEmail(text.target.value) }}
                                    placeholder="Nhập email">
                                </input>
                            </div>
                            <div>
                                <label><b>Mật Khẩu</b></label><br></br>
                                <input
                                    className='ip_hoatchat'
                                    type="text"
                                    value={MK}
                                    onChange={text => { setMK(text.target.value) }}
                                    placeholder="Nhập Mật Khẩu">
                                </input>

                            </div>
                        </div>
                        <div style={{ width: '45%', padding: '10px' }}>
                            <div style={{ marginBottom: 8 }}>
                                <label><b>Khu Vực</b></label><br></br>

                                <Select
                                    id="input1"
                                    value={KhuVuc}
                                    onChange={(text) => { setKhuVuc(text) }}
                                    options={options}
                                    placeholder="Chọn khu vực"
                                    maxMenuHeight={250}
                                />

                            </div>
                            <div>


                            </div>
                            <div>
                                <label><b>CCCD</b></label><br></br>
                                <input
                                    className='ip_hamluong'
                                    type="text"
                                    value={Cccd}
                                    onChange={text => { setCccd(text.target.value) }}
                                    placeholder="Nhập CCCD">
                                </input>
                            </div>

                            <div>
                                <label><b>Địa Chỉ</b></label><br></br>
                                <input
                                    className='ip_nuocsx'
                                    type="text"
                                    value={DiaChi}
                                    onChange={text => { setDiaChi(text.target.value) }}
                                    placeholder="Nhập Địa Chỉ">
                                </input>
                            </div>

                        </div>



                    </div>
                    <div style={{ marginTop: 15, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                        <div style={{ marginTop: 5 }}>
                            <input defaultChecked type="radio" id="male1" name="gender" value="Nhà thuốc" onChange={(text) => { setRadio1(text.target.value) }} />
                            <label style={{ marginLeft: 5 }} htmlFor="male1">Nhà thuốc</label>
                        </div>
                        <div style={{ marginTop: 5 }}>
                            <input style={{ marginLeft: 15 }} type="radio" id="male2" name="gender" value="Phòng khám" onChange={(text) => { setRadio1(text.target.value) }} />
                            <label style={{ marginLeft: 5 }} htmlFor="male2">Phòng khám</label>
                        </div>
                        <div style={{ marginTop: 5 }}>
                            <input style={{ marginLeft: 15 }} type="radio" id="male3" name="gender" value="Quầy thuốc" onChange={(text) => { setRadio1(text.target.value) }} />
                            <label style={{ marginLeft: 5 }} htmlFor="male3">Quầy thuốc</label>
                        </div>
                        <div style={{ marginTop: 5 }}>
                            <input style={{ marginLeft: 15 }} type="radio" id="male4" name="gender" value="Bệnh Viện" onChange={(text) => { setRadio1(text.target.value) }} />
                            <label style={{ marginLeft: 5 }} htmlFor="male4">Bệnh Viện</label>
                        </div>
                        <div style={{ marginTop: 5 }}>
                            <input style={{ marginLeft: 15 }} type="radio" id="male5" name="gender" value="Công ty dược" onChange={(text) => { setRadio1(text.target.value) }} />
                            <label style={{ marginLeft: 5 }} htmlFor="male5">Công ty dược</label>
                        </div>
                    </div>

                    <input className="submit" type="submit" value="THÊM USER" onClick={Sub}></input>
                </div>
            </Dialog>
        </div>
    );
};