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
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { API_URL } from '../constants/constants'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
export default ({ dataFromParent, parentCallback, parentCallback2, props }) => {
    const [expandedRowIds, setExpandedRowIds] = useState([]);
    const [soTienKmNew, setsoTienKmNew] = useState('')
    const [soTienKm2Month, setsoTienKm2Month] = useState('')
    const [hanSDNew, setHanSDNew] = useState('')
    const [hanSD2Month, setHanSD2Month] = useState('')
    const [pageSizes] = useState([8, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 0]);
    const history = useHistory();
    const [columns] = useState([
        { name: 'Id', title: 'ID' },
        { name: 'Title', title: 'Tiêu đề bài viết' },
        { name: 'PostDate', title: 'Ngày đăng' },
        { name: 'Author', title: 'Tác giả' },
        { name: 'Content', title: 'Nội dung' },
        { name: 'ThumbNail', title: 'Hình' },
        { name: 'AltThumbnail', title: 'ALT hình' },
        { name: 'CanonicalTag', title: 'Thẻ bài viết' },
        { name: 'MetaDescription', title: 'Meta description' },


    ]);

    const [defaultColumnWidths] = useState([
        { columnName: 'Id', width: 80 },
        { columnName: 'Title', width: 350 },
        { columnName: 'PostDate', width: 100 },
        { columnName: 'Author', width: 250 },
        { columnName: 'Content', width: 600 },
        { columnName: 'ThumbNail', width: 200 },
        { columnName: 'AltThumbnail', width: 200 },
        { columnName: 'CanonicalTag', width: 200 },
        { columnName: 'MetaDescription', width: 200 },

    ]);
    const [editingStateColumnExtensions] = useState([
        { columnName: 'Id', editingEnabled: false },
        { columnName: 'Title', editingEnabled: true },
        { columnName: 'PostDate', editingEnabled: true },
        { columnName: 'Author', editingEnabled: true },
        { columnName: 'Content', editingEnabled: true },
        { columnName: 'ThumbNail', editingEnabled: true },
        { columnName: 'AltThumbnail', editingEnabled: false },
        { columnName: 'CanonicalTag', editingEnabled: false },
        { columnName: 'MetaDescription', editingEnabled: false },

    ]);
    const CurrencyFormatter = ({ value }) => (
        value != null ?
            value.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
            : null
    );
    const getRowId = row => row.Id;
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
    const [toolbaredRowVisible, setToolbaredRowVisible] = useState(true);//biến ẩn hiện Toolbar
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
    const [startEditAction, setStartEditAction] = useState("doubleClick");
    const editColumnMessages = {
        editCommand: 'Sửa',
        commitCommand: 'Lưu',
        cancelCommand: 'Hủy',
        deleteCommand: 'Fix',
    };
    //end hàm cho sort
    const commitChanges = async ({ added, changed, deleted }) => {


        if (deleted) {
            console.log(deleted)
            history.push(`/EditArticles/${deleted}`);
        }

    };


    return (
        <div>

            <Paper>
                <div style={{ width: '100%', display: 'flex', backgroundColor: '#B8d8e0' }}>
                    <div style={{ width: '30%', textAlign: 'left', alignSelf: 'center', marginLeft: 10 }}>
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
                        <b><h2>Bảng Quản Lý Bài Viết</h2></b>
                    </div>
                    <div style={{ width: '30%', textAlign: 'right', alignSelf: 'center' }}>


                        <Link
                            style={{ width: 200, fontWeight: 'bold' }}
                            to={{
                                pathname: '/EditorArticles',
                            }}
                            className="btn_ttk btn-thongke1">
                            Thêm Bài Viết
                        </Link>


                    </div>
                </div>
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
                        defaultPageSize={20}
                    />
                    <IntegratedPaging />
                    <CurrencyTypeProvider
                        for={currencyColumns}
                    />
                    <FilteringState onFiltersChange={(x) => handleChange(x)} />
                    <VirtualTable tableComponent={TableComponent} columnExtensions={defaultColumnWidths} height={window.innerHeight - 100} />
                    {/* <Table/> */}
                    <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                    <TableHeaderRow showSortingControls
                        sortLabelComponent={SortLabel} />
                    <TableEditRow

                    />
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
                    {toolbaredRowVisible ?

                        <TableEditColumn
                            // showEditCommand
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