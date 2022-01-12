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
import Modal from 'react-modal';
import Dialog from '@material-ui/core/Dialog';
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
import Select from 'react-select';

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
    let newDate = new Date()
    // let datetc =newDate.getDate() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getFullYear();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [KhoanTC, setKhoanTC] = useState('');
    const [NoiDungTC, setNoiDungTC] = useState('');
    const [TienTC, setTienTC] = useState('');
    const [LoaiTC, setLoaiTC] = useState('');
    const [NgayTC, setNgayTC] = useState(newDate);
    const CurrencyTypeProvider = props => (
        <DataTypeProvider
            formatterComponent={CurrencyFormatter}
            {...props}
        />
    );
    const options_tc = [
        { value: 'Thu', label: 'Thu' },
        { value: 'Chi', label: 'Chi' },

    ];
    const years = range(1990, getYear(new Date()) + 1, 1);
    const months = [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12",
    ];

    const [columns] = useState([
        // { name: 'Id', title: 'Id' },
        { name: 'Id', title: 'ID' },
        { name: 'KhoanTC', title: 'Khoản thu/chi' },
        { name: 'NoiDungTC', title: 'Nội dung thu/chi' },
        { name: 'TienTC', title: 'Tiền thu/chi' },
        { name: 'LoaiTC', title: 'Loại thu/chi' },
        { name: 'TenNguoiTC', title: 'Người Thu/Chi' },
        { name: 'NgayTC', title: 'Ngày thu/chi' },


    ]);

    const [defaultColumnWidths] = useState([
        // { columnName: 'Id', width: 100 },
        { columnName: 'Id', width: 100 },
        { columnName: 'KhoanTC', width: 300 },
        { columnName: 'NoiDungTC', width: 300 },
        { columnName: 'TienTC', width: 200 },
        { columnName: 'LoaiTC', width: 200 },
        { columnName: 'TenNguoiTC', width: 200 },
        { columnName: 'NgayTC', width: 200 },


    ]);

    ///////////
    const Sub = () => {

        if (KhoanTC == "" || KhoanTC == null || KhoanTC == undefined) {
            alert("Khoản Thu/Chi Trống")
        } else {
            if (NoiDungTC == "" || NoiDungTC == null || NoiDungTC == undefined) {
                alert("Nội Dung Thu/Chi Trống")
            } else {
                if (TienTC <= 0 || TienTC == null || TienTC == undefined) {
                    alert("Tiền Thu/Chi Trống")
                } else {
                    if (LoaiTC == "" || LoaiTC == null || LoaiTC == undefined) {
                        alert("Loại Thu/Chi Trống")
                    } else {
                        if (NgayTC == "" || NgayTC == null || NgayTC == undefined) {
                            alert("Ngày Thu/Chi Trống")
                        } else {
                            if (!isNaN(TienTC)) {

                                let datetc = NgayTC.getFullYear() + "-" + (NgayTC.getMonth() + 1) + "-" + NgayTC.getDate();
                                fetch(API_URL + '/AddTC', {
                                    method: 'POST',
                                    headers: {
                                        Accept: 'application/json',

                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        KhoanTC: KhoanTC,
                                        NoiDungTC: NoiDungTC,
                                        TienTC: TienTC,
                                        LoaiTC: LoaiTC.value,
                                        TenNguoiTC: tenNV,
                                        NgayTC: datetc
                                    })
                                })
                                parentCallback(KhoanTC);
                                toggleModal()
                            } else {
                                alert("Số Tiền Thu/Chi phải là số")
                            }

                        }
                    }
                }
            }


        }
        // }
        //}
    }

    const [totalSummaryItems] = useState([

        { columnName: 'TienTC', type: 'max' },
        { columnName: 'TienTC', type: 'sum' },

    ]);
    const messages = {
        counts: "Tổng Quà: ",
        max: "Lớn Nhất",
        sum: "Tổng"
    };
    const [currencyColumns] = useState(['TienTC']);

    ///////////////
    const getRowId = row => row.Id;
    // const getRowId = row => row.MaDatHang;

    // const date = "DonHangNhap " + newDate.getDate() + "/" + (newDate.getMonth() + 1) + "/" + newDate.getFullYear();


    // , wordWrapEnabled: true

    let date = "Thu/Chi " + newDate.getDate() + "/" + (newDate.getMonth() + 1) + "/" + newDate.getFullYear();

    const callbackFunction = (childData) => {
        parentCallback(childData)
        setExpandedRowIds([])
    };
    Modal.setAppElement('#root')
    const toggleModal = () => {
        setIsOpen(!modalIsOpen)
    }


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
                const Id = Object.getOwnPropertyNames(changed)
                // console.log(maNCC)
                // const arrsplit = maDHN[0].split(',')
                const tmpObj = Object.values(changed)
                const obj = tmpObj[0]
                const propertiesObj = Object.getOwnPropertyNames(obj)
                // console.log(obj)
                let isNan = 0
                let stringlog = "";
                // console.log(propertiesObj)
                //console.log(dataFromParent)
                dataFromParent.forEach(ee1 => {
                    if (ee1.Id == Id) {
                        stringlog = stringlog + "---/changed ThuChi  - Truoc: " + JSON.stringify(ee1) + " - Sau: " + JSON.stringify(obj)

                    }
                });
                propertiesObj.forEach(ee1 => {
                    if (ee1 == `TienTC`) {
                        // console.log(`${new Date().getTime()} ee1=`, ee1)
                        if (isNaN(obj.TienTC)) {
                            isNan = 1
                            alert("Số Tiền Thu/Chi phải là số")
                        }
                    } else {

                        if (ee1 == `LoaiTC`) {
                            if (obj.LoaiTC != "Thu" && obj.LoaiTC != "Chi") {
                                isNan = 1
                                alert("Loại Thu/Chi phải là 'Thu' hoặc 'Chi'")
                            }
                        }
                    }
                });
                if (isNan == 0) {

                    await fetch(API_URL + '/FixTC', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            data: obj,
                            Id: Id[0]
                        })
                    })
                        .then((response) => response.json())
                        .then(data => {

                        });
                    callbackFunction("rand")

                    /////////////
                    const date = new Date();
                    const ngay7 = date.getDate()
                    const thang7 = date.getMonth() + 1
                    const nam7 = date.getFullYear()
                    const gio7 = date.getHours()
                    const phut7 = date.getMinutes()
                    let logstring = ngay7 + "-" + thang7 + "-" + nam7 + " - " + gio7 + ":" + phut7 + " - Id: " + Id[0] + " - Người Sửa Thu/Chi :" + tenNV + " - log: " + stringlog;

                    fetch(API_URL + '/log', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            log: logstring,
                        })
                    })
                    //////////////
                }



            }
        }
        if (deleted) {
            //    // console.log(deleted[0])
            //         await fetch(API_URL + '/DelTC', {
            //             method: 'POST',
            //             headers: {
            //                 Accept: 'application/json',
            //                 'Content-Type': 'application/json'
            //             },
            //             body: JSON.stringify({
            //                 Id: deleted[0]
            //             })
            //         })
            //             .then((response) => response.json())
            //             .then(data => {

            //             });
            //             callbackFunction("rand")
        }
        /////////////
        // const date = new Date();
        // const ngay7 = date.getDate()
        // const thang7 = date.getMonth() + 1
        // const nam7 = date.getFullYear()
        // const gio7 = date.getHours()
        // const phut7 = date.getMinutes()
        // let logstring = ngay7 + "-" + thang7 + "-" + nam7 + " - " + gio7 + ":" + phut7 + " - Id: " + deleted[0] + " - Người xóa Thu/Chi  :" + tenNV + " - log: " + obj;

        // fetch(API_URL + '/log', {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         log: logstring,
        //     })
        // })         
        //////////////

    };

    const [editingStateColumnExtensions] = useState([
        { columnName: 'Id', editingEnabled: false },
        { columnName: 'KhoanTC', editingEnabled: true },
        { columnName: 'NoiDungTC', editingEnabled: true },
        { columnName: 'TienTC', editingEnabled: true },
        { columnName: 'LoaiTC', editingEnabled: true },
        { columnName: 'NgayTC', editingEnabled: false },
        { columnName: 'TenNguoiTC', editingEnabled: false },
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

                <div style={{ width: '40%', textAlign: 'center', alignSelf: 'center', color: '#197420' }}>
                    <b><h2>Bảng Thống Kê Thu/Chi</h2></b>
                </div>


                {/* nhờ nam phá giao diện  */}


                {/* line cuối nhờ nam phá giao diện  */}

                <div style={{ width: '30%', textAlign: 'right', alignSelf: 'center', display: 'flex', flexWrap: 'wrap' }}>
                <div style={{width:'100%', alignItems:'end'}}>

                    <button className='btn-thongke1' onClick={toggleModal} style={{backgroundColor:'#2de183'}}>
                        <b>Thêm</b>
                    </button>

                    <ExportReactCSV csvData={dataFromParent} fileName={date} />
                </div>
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
                    <VirtualTable tableComponent={TableComponent} columnExtensions={defaultColumnWidths} height={window.innerHeight - 100} />
                    {/* <Table/> */}
                    <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                    <TableHeaderRow showSortingControls
                        sortLabelComponent={SortLabel} />

                    <TableEditRow

                    />

                    <TableSummaryRow messages={messages} />
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
                            //showDeleteCommand

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
            <Dialog
                open={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onClose={toggleModal}
                fullWidth={true}
                maxWidth={'md'}
            // style={customStyles}
            // contentLabel="Đăng kí"
            >
                <div style={{ width: '100%', marginTop: 10 }}>

                    <div style={{ display: 'flex', flexDirection: 'row', background: "#f2f2f2", borderRadius: '5px', flexWrap: 'wrap', width: '100%', }}>
                        <div style={{ width: '100%', padding: '10px' }}>

                            <div>
                                <label><b>Khoản Thu/Chi</b></label><br></br>
                                <input
                                    className="ip_mh"
                                    type="text"
                                    value={KhoanTC}
                                    onChange={text => { setKhoanTC(text.target.value) }}
                                    placeholder="Vui Lòng Nhập Khoản Thu/Chi">
                                </input>
                            </div>
                            <div>
                                <label><b>Nội Dung Thu/Chi</b></label><br></br>
                                <input
                                    className="ip_tenhang"
                                    type="text"
                                    value={NoiDungTC}
                                    onChange={text => { setNoiDungTC(text.target.value) }}
                                    placeholder="Vui Lòng Nhập Nội Dung Thu/Chi">
                                </input>
                            </div>
                            <div>
                                <label><b>Loại Thu/Chi</b></label><br></br>
                                <Select
                                    id="select1"
                                    value={LoaiTC}
                                    onChange={(text) => { setLoaiTC(text) }}
                                    options={options_tc}
                                    placeholder="Chọn Loại Thu/Chi"
                                    maxMenuHeight={145}
                                />

                            </div>
                            <div>
                                <label><b>Tiền Thu/Chi</b></label><br></br>
                                <input
                                    className="ip_tenhang"
                                    type="number"
                                    value={TienTC}
                                    onChange={text => { setTienTC(text.target.value) }}
                                    placeholder="Vui Lòng Nhập Tiền Thu/Chi">
                                </input>
                            </div>
                            <div>
                                <label><b>Ngày Thu/Chi</b></label><br></br>
                                <div className="date_picker_year">
                                    <DatePicker
                                        inline
                                        renderCustomHeader={({
                                            date,
                                            changeYear,
                                            changeMonth,
                                            decreaseMonth,
                                            increaseMonth,
                                            prevMonthButtonDisabled,
                                            nextMonthButtonDisabled,
                                        }) => (
                                            <div
                                                style={{
                                                    margin: 10,
                                                    display: "flex",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <button title="Tháng trước" className="prev_month_tk" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                                                    <img width='18' height='18' src={prev_month_tk}></img>
                                                </button>
                                                <select
                                                    value={getYear(date)}
                                                    onChange={({ target: { value } }) => changeYear(value)}
                                                >
                                                    {years.map((option) => (
                                                        <option key={option} value={option}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                </select>

                                                <select
                                                    value={months[getMonth(date)]}
                                                    onChange={({ target: { value } }) =>
                                                        changeMonth(months.indexOf(value))
                                                    }
                                                >
                                                    {months.map((option) => (
                                                        <option key={option} value={option}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                </select>
                                                <button title="Tháng kế" className="prev_month_tk" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                                                    <img width='18' height='18' src={next_month_tk}></img>
                                                </button>
                                            </div>
                                        )}
                                        selected={NgayTC}
                                        onChange={(date) => setNgayTC(date)}

                                    />

                                </div>
                            </div>

                        </div>



                    </div>


                    <input className="submit" type="submit" value="Thêm Khoản Thu/Chi" onClick={Sub}></input>
                </div>
            </Dialog>
        </div>
    );
};