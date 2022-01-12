import { useEffect, useState, forwardRef } from 'react'
import logothuocsi from '../images/Logo.png'
import search_img from '../images/search.png'
import sort_time from '../images/sort_time.png'
import calendar_time from '../images/calendar_time.png'
import next_month_tk from '../images/next_month_tk.png'
import prev_month_tk from '../images/prev_month_tk.png'
import filter_tk from '../images/filter_tk.png'
import refresh_time from '../images/refresh_time.png'
import { NavLink, Link } from 'react-router-dom'
import NavMenu from './NavMenu'


import React from 'react';
import Button from '@material-ui/core/Button';

import Table_ThongKe_Sl from './Table_ThongKe_Sl';
import Table_DonHang_Sl from './Table_DonHang_Sl';


import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { API_URL } from '../constants/constants'
import { ExportReactCSV } from './ExportReactCSV'

import ModalNhanVien2 from './modalnhanviencopy';
import { Redirect, useHistory } from 'react-router-dom';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DatePicker from "react-datepicker";
import { getMonth, getYear, getDate, getQuarter, formatRelative, subDays } from 'date-fns';
import range from "lodash/range";
import NavigateNext from '@material-ui/icons/NavigateNext';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';


import "react-datepicker/dist/react-datepicker.css";
const ThongKesl = () => {
    document.body.style.zoom = "85%";
    const [tabledata, setTabledata] = useState([]);//mảng chứa giá trị lấy được từ sql đưa vào table-table thông tin
    const history = useHistory();
    const [input, setInput] = useState([]);//mang gợi ý của search
    const [value, setValue] = useState(null);//giá trị của search box

    const [tableType, setTableType] = useState(1);//mảng chứa loại table
    const [table, setTable] = useState("sanpham");//mảng chứa loại table
    const [tablechange, setTablechange] = useState('')//dùng để theo dõi thay đổi table-refresh lại
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [open_option, setOpenOption] = useState(false);

    const [open_time_fixed, setOpenTimeFixed] = useState(false);
    const [open_time, setOpenTime] = useState(false);
    const [diaglog_choose_time, setDialogChooseTime] = useState(false);
    const [loaitk, setLoaitk] = useState();//mảng chứa giá trị loại thống kê
    const [date_Fixed, setDateFixed] = useState();
    const [filterarr, setFilterarr] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [startDateTo, setStartDateTo] = useState(new Date());
    const years = range(1990, getYear(new Date()) + 1, 1);
    const [time, setTime] = useState("");
    const [manv, setManv] = useState("");
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
    //fetch(API_URL + '/test2', {
    //    method: 'POST',
    //    headers: {
    //        Accept: 'application/json',
    //        'authorization': 'Bearer ' + localStorage.getItem("accesstoken"),
    //        'Content-Type': 'application/json'
    //    },
    //    body: JSON.stringify({
    //    })

    //})
    //    .then((response) => response.json())
    //    .then(datas => {
    //        if (datas == "ok") {
    //            console.log("ok")
    //        } else {

    //         setIsLoggedIn(false)
    //        }
    //    });
    const verifytoken = async () => {
        if (localStorage.getItem("accesstoken2") !== null) {
            fetch(API_URL + '/verifytoken', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    test: localStorage.getItem("accesstoken2")
                })
            })
                .then((response) => response.json())
                .then(data => {
                    if (data.rs === "token accepted"  && data.cv===3) {
                        //console.log(data.manv)
                        setManv(data.manv)
                    } else {
                        alert("Phiên Làm Việc Hết Hạn, Vui Lòng Đăng Nhập Lại!")
                        //console.log("token het han")
                        localStorage.removeItem("accesstoken2")
                        history.push("/QuanLy")


                    }
                })
        } else {
            history.push("/QuanLy")
        }
    }
    useEffect(async () => {
        verifytoken()
    }, []);

    //if (!isLoggedIn) {
    //    history.push("/QuanLy")
    //}

    useEffect(async () => {
        // verifytoken();
        switch (tableType) {
            case 1: await fetch(API_URL + '/searchbackall', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                })

            })
                .then((response) => response.json())
                .then(datas => {
                    setTabledata(datas)
                    setTablechange('')
                });
                break;

            case 3: await fetch(API_URL + '/donHangManv', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Manv:manv
                })

            })
                .then((response) => response.json())
                .then(datas => {
                    setTabledata(datas)
                    setTablechange('')
                });
      
        }



    }, [tablechange]);

    useEffect(async () => {
        //verifytoken();
        switch (tableType) {
            case 1:
                await fetch(API_URL + '/searchbackall', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                    })

                })
                    .then((response) => response.json())
                    .then(datas => {
                        setTabledata(datas)
                        setTablechange('')
                    });
                await fetch(API_URL + '/getsuggest2', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                    })

                })
                    .then((response) => response.json())
                    .then(data => {
                        setInput(data)
                    });
                break;

           
            case 3:  await fetch(API_URL + '/donHangManv', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Manv:manv
                })

            })
                .then((response) => response.json())
                .then(datas => {
                    setTabledata(datas)
                    setTablechange('')
                });
                await fetch(API_URL + '/getsuggest5', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Manv:manv
                    })

                })
                    .then((response) => response.json())
                    .then(data => {
                        setInput(data)
                    });
                break;

        }



    }, [tableType]);

    const callbackFunction = async (childData) => {
        verifytoken();
        setTablechange(childData)
        // setTableType(0)
    };

    const callbackFunction2 = async (childData2) => {
        verifytoken();
       // console.log(childData2)
        // console.log(childData2)
        if (childData2 == null || childData2[0] == null  || childData2 ==[] && time == "") {
           // console.log(childData2)
            setTablechange('change')
            setFilterarr("")
            setTime("")
        } else {

            switch (tableType) {
                case 1:
                    fetch(API_URL + '/searchfilter', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            searchArr: childData2,
                            tableVar: table,
                            times: time,
                            //columnVar: childData2[0].columnName,
                            //searchVar: childData2[0].value
                        })
        
                    })
                        .then((response) => response.json())
                        .then(datas => {
                            setTabledata(datas)
                            setFilterarr(childData2)
                        })
                    break;
                case 3: 
                fetch(API_URL + '/searchfiltersl', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        //searchArr: null,
                        Manv:manv,
                        searchArr: childData2,
                        tableVar: table,
                        times: time,
    
                    })
    
                })
                    .then((response) => response.json())
                    .then(datas => {
                        setTabledata(datas)
                        setFilterarr(childData2)
                    })
                    break;
            }
            
        }

    };
   

    const changetable = (x) => {
        verifytoken();
        setTableType(x)
        switch (x) {
            case 1:
            case 2: setTable("sanpham");
                break;
            case 3: setTable("donhang");
                break;
        }
        setOpenOption(false)
    };

    const resettime = () => {
        setTime("")
        setTablechange("change2")
    };
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleClose_logout = () => {
        localStorage.removeItem("accesstoken2")
        history.push("/QuanLy")
        setOpen(false);
    };
    const handleClose_nologout = () => {
        setOpen(false);
    };

    function handleSubmit(event, value) {
        verifytoken();
        event.preventDefault();
        setValue(value)
        if (value == null) {
            switch (tableType) {
                case 1: fetch(API_URL + '/searchbackall', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                    })

                })
                    .then((response) => response.json())
                    .then(datas => {
                        setTabledata(datas)
                        setTablechange('')
                    });
                    break;

                case 3: fetch(API_URL + '/donHangManv', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Manv:"sl1"
                    })
    
                })
                    .then((response) => response.json())
                    .then(datas => {
                        setTabledata(datas)
                        setTablechange('')
                    });
                    break;
                
            }


        } else {

            fetch(API_URL + '/searchquantri', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tableVar: table,
                    searchVar: value
                })

            })
                .then((response) => response.json())
                .then(data => {
                    setTabledata(data)
                })

        }

    }


    useEffect(async () => {
        if (time != "") {
            console.log(time)
            fetch(API_URL + '/searchfiltersl', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    searchArr: filterarr,
                    Manv:manv,
                    tableVar: table,
                    times: time,

                })

            })
                .then((response) => response.json())
                .then(datas => {
                    setTabledata(datas)

                })
        }

    }, [time]);

    const dateFixed = (date) => {
        setOpenOption(false);
        switch (date) {
            case 'Homnay':
                var newDate = new Date()
                var dateofweek = newDate.getDate();
                var month = newDate.getMonth() + 1;
                var year = newDate.getFullYear();
                var calendar = year + "-" + month + "-" + dateofweek;
                //alert(calendar);
                setTime({ type: 1, time: calendar, time2: calendar })
                break;
            case 'Homqua':
                var newDate = new Date()
                var dateofweek = subDays(new Date(), 1);
                var yesterday = getDate(dateofweek)
                var month = getMonth(dateofweek) + 1;
                var year = getYear(dateofweek);
                var calendar = year + "-" + month + "-" + yesterday;
                //alert(calendar);
                setTime({ type: 1, time: calendar, time2: calendar })
                break;
            case '7NgayQua':
                var newDate = new Date()
                var dateofweek = newDate.getDate();
                var month = newDate.getMonth() + 1;
                var year = newDate.getFullYear();
                var calendar = year + "-" + month + "-" + dateofweek;

                var last = subDays(new Date(), 7);
                var date7last = getDate(last);
                var month7last = getMonth(last) + 1;
                var year7last = getYear(last);
                var calendar7last = year7last + "-" + month7last + "-" + date7last;

                // alert(calendar7last + " đến " + calendar);
                setTime({ type: 1, time: calendar7last, time2: calendar })
                break;
            case 'TuanNay':
                var newDate = new Date()
                var dayIndex = newDate.getDay();
                var diffToLastMonday = (dayIndex !== 0) ? dayIndex - 1 : 6;
                var dateOfMonday = new Date(newDate.setDate(newDate.getDate() - diffToLastMonday));
                var dateOfSunday = new Date(newDate.setDate(dateOfMonday.getDate() + 6));

                var monday_format = getYear(dateOfMonday) + '-' + (getMonth(dateOfMonday) + 1) + '-' + getDate(dateOfMonday);
                var sunday_format = getYear(dateOfSunday) + '-' + (getMonth(dateOfSunday) + 1) + '-' + getDate(dateOfSunday);
                //var calendar = monday_format + ' đến ' + sunday_format;
                //alert(calendar);
                setTime({ type: 1, time: monday_format, time2: sunday_format })
                break;
            case 'TuanTruoc':
                var newDate = new Date()
                var dayIndex = newDate.getDay();
                var diffToLastMonday = (dayIndex !== 0) ? dayIndex - 1 : 6;
                var dateOfSundayLast = new Date(newDate.setDate(newDate.getDate() - diffToLastMonday - 1));
                var dateOfMondayLast = new Date(newDate.setDate(dateOfSundayLast.getDate() - 6));

                var sunday_format = getYear(dateOfSundayLast) + '-' + (getMonth(dateOfSundayLast) + 1) + '-' + getDate(dateOfSundayLast);
                var monday_format = getYear(dateOfMondayLast) + '-' + (getMonth(dateOfMondayLast) + 1) + '-' + getDate(dateOfMondayLast);
                //var calendar = monday_format + " đến " + sunday_format;
                //alert(calendar);
                setTime({ type: 1, time: monday_format, time2: sunday_format })
                break;
            case 'Thangnay':
                var newDate = new Date()
                var month = newDate.getMonth() + 1;
                var year = newDate.getFullYear();
                //var calendar = month + "/" + year;
                //alert(calendar);
                setTime({ type: 2, time: month, time2: year })
                break;
            case 'Thangtruoc':
                var newDate = new Date()
                var month = newDate.getMonth();
                var year = newDate.getFullYear();
                // var calendar = month + "/" + year;
                // alert(calendar);
                setTime({ type: 2, time: month, time2: year })
                break;
            case 'Quynay':
                var newDate = new Date()
                //var month = newDate.getMonth() + 1;
                var quarter = getQuarter(newDate)
                var year = newDate.getFullYear();
                //var calendar = month + "/" + year;
                //alert(quarter);
                switch (quarter) {
                    case 1:
                        var calendar = year + "-" + '1' + "-" + '1';
                        var calendar2 = year + "-" + '3' + "-" + '31';
                        setTime({ type: 1, time: calendar, time2: calendar2 })
                        break;
                    case 2:
                        var calendar = year + "-" + '4' + "-" + '1';
                        var calendar2 = year + "-" + '6' + "-" + '30';
                        setTime({ type: 1, time: calendar, time2: calendar2 })
                        break;
                    case 3:
                        var calendar = year + "-" + '7' + "-" + '1';
                        var calendar2 = year + "-" + '9' + "-" + '30';
                        setTime({ type: 1, time: calendar, time2: calendar2 })
                        break;
                    case 4:
                        var calendar = year + "-" + '10' + "-" + '1';
                        var calendar2 = year + "-" + '12' + "-" + '31';
                        setTime({ type: 1, time: calendar, time2: calendar2 })
                        break;
                }
                //setTime({ type: 2, time: month, time2: year })
                break;
            case 'Quytruoc':
                var newDate = new Date()
                if (getQuarter(newDate) - 1 == 0) {
                    var quarter = 4
                    var year = newDate.getFullYear() - 1;
                } else {
                    var quarter = getQuarter(newDate) - 1
                    var year = newDate.getFullYear();
                }


                switch (quarter) {
                    case 1:
                        var calendar = year + "-" + '1' + "-" + '1';
                        var calendar2 = year + "-" + '3' + "-" + '31';
                        setTime({ type: 1, time: calendar, time2: calendar2 })
                        break;
                    case 2:
                        var calendar = year + "-" + '4' + "-" + '1';
                        var calendar2 = year + "-" + '6' + "-" + '30';
                        setTime({ type: 1, time: calendar, time2: calendar2 })
                        break;
                    case 3:
                        var calendar = year + "-" + '7' + "-" + '1';
                        var calendar2 = year + "-" + '9' + "-" + '30';
                        setTime({ type: 1, time: calendar, time2: calendar2 })
                        break;
                    case 4:
                        var calendar = year + "-" + '10' + "-" + '1';
                        var calendar2 = year + "-" + '12' + "-" + '31';
                        setTime({ type: 1, time: calendar, time2: calendar2 })
                        break;
                }
                break;
            case '30NgayQua':
                var newDate = new Date()
                var dateofweek = newDate.getDate();
                var month = newDate.getMonth() + 1;
                var year = newDate.getFullYear();
                var calendar = year + "-" + month + "-" + dateofweek;

                var last = subDays(new Date(), 30);
                var date30last = getDate(last);
                var month30last = getMonth(last) + 1;
                var year30last = getYear(last);
                var calendar30last = year30last + "-" + month30last + "-" + date30last;

                // alert(calendar30last + " đến " + calendar);
                setTime({ type: 1, time: calendar30last, time2: calendar })
                break;
            case 'Namnay':
                var newDate = new Date()
                var year = newDate.getFullYear();
                // alert(year);
                setTime({ type: 3, time: year, time2: year })
                break;
            case 'Namtruoc':
                var newDate = new Date()
                var year = newDate.getFullYear() - 1;
                //alert(year);
                setTime({ type: 3, time: year, time2: year })
                break;
        }
    };
    const TimKiemDateFromTo = () => {
        setOpenOption(false);
        switch (loaitk) {
            case '1':
                //alert(getYear(startDate));
                setTime({ type: 3, time: getYear(startDate), time2: getYear(startDate) })
                break;
            case '2':
                var monthYear = (getMonth(startDate) + 1) + '/' + getYear(startDate);
                //alert(monthYear);
                setTime({ type: 2, time: (getMonth(startDate) + 1), time2: getYear(startDate) })
                break;
            case '3':
                //var monthYear = (getQuarter(startDate)) + '/' + getYear(startDate);
                switch (getQuarter(startDate)) {
                    case 1:
                        var calendar = getYear(startDate) + "-" + '1' + "-" + '1';
                        var calendar2 = getYear(startDate) + "-" + '3' + "-" + '31';
                        setTime({ type: 1, time: calendar, time2: calendar2 })
                        break;
                    case 2:
                        var calendar = getYear(startDate) + "-" + '4' + "-" + '1';
                        var calendar2 = getYear(startDate) + "-" + '6' + "-" + '30';
                        setTime({ type: 1, time: calendar, time2: calendar2 })
                        break;
                    case 3:
                        var calendar = getYear(startDate) + "-" + '7' + "-" + '1';
                        var calendar2 = getYear(startDate) + "-" + '9' + "-" + '30';
                        setTime({ type: 1, time: calendar, time2: calendar2 })
                        break;
                    case 4:
                        var calendar = getYear(startDate) + "-" + '10' + "-" + '1';
                        var calendar2 = getYear(startDate) + "-" + '12' + "-" + '31';
                        setTime({ type: 1, time: calendar, time2: calendar2 })
                        break;
                }


                break;
            case '4':
                var dateFrom = getYear(startDate) + '-' + (getMonth(startDate) + 1) + '-' + getDate(startDate);
                var dateTo = getYear(startDateTo) + '-' + (getMonth(startDateTo) + 1) + '-' + getDate(startDateTo);
                //alert(dateFrom + ' đến ' + dateTo);
                setTime({ type: 1, time: dateFrom, time2: dateTo })
                break;
        }

    };
    const ClickOutside = () => {
        setDialogChooseTime(false)
        setOpenTime(false)
        setOpenTimeFixed(false)
    };
    return (
        <div>
      

            <div className='trai-trai'>
                <div className='tong-traii'>
                    <div className='position'>
                        {open_option ?
                            <div className="tong_trai_thongke">
                                {/* <div className='ten'>
                                    <div>{localStorage.getItem("user-inf")}</div>
                                    <div>{localStorage.getItem("chucVu")}</div>
                                </div> */}
                                {tableType == 3 ?
                                    <div>
                                        <br></br>
                                        <br></br>
                                        <div className="date_picker_thongke_par">
                                            <div className="title_time_thongke">Thời gian</div>
                                            <button
                                                onClick={() => {
                                                    setOpenTimeFixed(!open_time_fixed);
                                                    setOpenTime(false)
                                                }}
                                                className="option_fixed">
                                                Thời gian cứng
                                                <img width="18" height="18" src={sort_time}></img>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setOpenTime(!open_time)
                                                    setOpenTimeFixed(false)
                                                }}
                                                className="option_fixed">
                                                Lựa chọn khác
                                                <img width="18" height="18" src={calendar_time}></img>
                                            </button>
                                        </div>


                                        {open_time_fixed ?
                                            <div className="dialog_time_parent">
                                                <div>
                                                    <button onClick={() => {
                                                        setOpenTimeFixed(false);
                                                    }}
                                                        className="closeModal_time_thongke">
                                                        <svg width="22px" height="22px" viewBox="-4 -4 24 24"><line x1="2" x2="14" y1="2" y2="14" stroke-linecap="round" stroke-width="2" stroke="#bec2c9"></line><line x1="2" x2="14" y1="14" y2="2" stroke-linecap="round" stroke-width="2" stroke="#bec2c9"></line></svg>
                                                    </button>
                                                </div>
                                                <div className="dialog_time_fixed">
                                                    <div className="col_time">
                                                        <div className="btn_title">Theo ngày</div>
                                                        <button onClick={() => { dateFixed('Homnay') }} className="btn_time">Hôm nay</button>
                                                        <button onClick={() => { dateFixed('Homqua') }} className="btn_time">Hôm qua</button>
                                                    </div>
                                                    <div className="col_time">
                                                        <div className="btn_title">Theo tuần</div>
                                                        <button onClick={() => { dateFixed('TuanNay') }} className="btn_time">Tuần này</button>
                                                        <button onClick={() => { dateFixed('TuanTruoc') }} className="btn_time">Tuần trước</button>
                                                        <button onClick={() => { dateFixed('7NgayQua') }} className="btn_time">7 ngày qua</button>
                                                    </div>
                                                    <div className="col_time">
                                                        <div className="btn_title">Theo tháng</div>
                                                        <button onClick={() => { dateFixed('Thangnay') }} className="btn_time">Tháng này</button>
                                                        <button onClick={() => { dateFixed('Thangtruoc') }} className="btn_time">Tháng trước</button>
                                                        <button onClick={() => { dateFixed('30NgayQua') }} className="btn_time">30 ngày qua</button>
                                                    </div>
                                                    <div className="col_time">
                                                        <div className="btn_title">Theo quý</div>
                                                        <button onClick={() => { dateFixed('Quynay') }} className="btn_time">Quý này</button>
                                                        <button onClick={() => { dateFixed('Quytruoc') }} className="btn_time">Quý trước</button>
                                                    </div>
                                                    <div className="col_time">
                                                        <div className="btn_title">Theo năm</div>
                                                        <button onClick={() => { dateFixed('Namnay') }} className="btn_time">Năm này</button>
                                                        <button onClick={() => { dateFixed('Namtruoc') }} className="btn_time">Năm trước</button>
                                                    </div>
                                                    <div className="square_time_fixed_thongke"></div>
                                                </div>
                                            </div>
                                            : null
                                        }
                                        {open_time ?
                                            <div className="dialog_time_parent">
                                                <div>
                                                    <button onClick={() => {
                                                        setOpenTime(false);
                                                    }}
                                                        className="closeModal_time_thongke">
                                                        <svg width="22px" height="22px" viewBox="-4 -4 24 24"><line x1="2" x2="14" y1="2" y2="14" stroke-linecap="round" stroke-width="2" stroke="#bec2c9"></line><line x1="2" x2="14" y1="14" y2="2" stroke-linecap="round" stroke-width="2" stroke="#bec2c9"></line></svg>
                                                    </button>
                                                </div>
                                                <div className="dialog_time">
                                                    <div className="col_time">
                                                        <button
                                                            onClick={() => {
                                                                setLoaitk('1')
                                                                setDialogChooseTime(true);
                                                            }}
                                                            className="btn_time_custom">Theo năm</button>
                                                    </div>
                                                    <div
                                                        onClick={() => {
                                                            setLoaitk('2')
                                                            setDialogChooseTime(true);
                                                        }}
                                                        className="col_time">
                                                        <button className="btn_time_custom">Theo tháng</button>
                                                    </div>
                                                    <div
                                                        onClick={() => {
                                                            setLoaitk('3')
                                                            setDialogChooseTime(true);
                                                        }}
                                                        className="col_time">
                                                        <button className="btn_time_custom">Theo quý</button>
                                                    </div>
                                                    <div
                                                        onClick={() => {
                                                            setLoaitk('4')
                                                            setDialogChooseTime(true);
                                                        }}
                                                        className="col_time">
                                                        <button className="btn_time_custom">Tùy chọn</button>
                                                    </div>
                                                    {diaglog_choose_time ?
                                                        <div className="dialog_choose_time">
                                                            <div>
                                                                <button onClick={() => {
                                                                    setDialogChooseTime(false);
                                                                }}
                                                                    className="closeModal_time_thongke">
                                                                    <svg width="22px" height="22px" viewBox="-4 -4 24 24"><line x1="2" x2="14" y1="2" y2="14" stroke-linecap="round" stroke-width="2" stroke="#bec2c9"></line><line x1="2" x2="14" y1="14" y2="2" stroke-linecap="round" stroke-width="2" stroke="#bec2c9"></line></svg>
                                                                </button>
                                                            </div>
                                                            {/* datepicker */}
                                                            {loaitk == 1 ?
                                                                <div className="date_picker_year">
                                                                    <DatePicker
                                                                        inline
                                                                        selected={startDate}
                                                                        onChange={(date) => setStartDate(date)}
                                                                        showYearPicker
                                                                        dateFormat="yyyy"
                                                                        yearItemNumber={9}
                                                                    />
                                                                    <div className="box_btn_filter" >
                                                                        <button
                                                                            title="Tìm kiếm"
                                                                            className="btn_month_tk"
                                                                            onClick={() => { TimKiemDateFromTo() }}
                                                                        >
                                                                            Tìm kiếm
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                : loaitk == 2 ?
                                                                    <div className="date_picker_year">
                                                                        <DatePicker
                                                                            inline
                                                                            selected={startDate}
                                                                            onChange={(date) => setStartDate(date)}
                                                                            dateFormat="MM/yyyy"
                                                                            showMonthYearPicker
                                                                            showFullMonthYearPicker
                                                                            showFourColumnMonthYearPicker
                                                                        />
                                                                        <div className="box_btn_filter" >
                                                                            <button className="btn_month_tk"
                                                                                onClick={() => { TimKiemDateFromTo() }}
                                                                            >
                                                                                Tìm kiếm
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                    : loaitk == 3 ?
                                                                        <div className="date_picker_year">
                                                                            <DatePicker
                                                                                inline
                                                                                selected={startDate}
                                                                                onChange={(date) => setStartDate(date)}
                                                                                dateFormat="yyyy, QQQ"
                                                                                showQuarterYearPicker
                                                                            />
                                                                            <div className="box_btn_filter" >
                                                                                <button className="btn_month_tk"
                                                                                    onClick={() => { TimKiemDateFromTo() }}
                                                                                >
                                                                                    Tìm kiếm
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                        : loaitk == 4 ?
                                                                            <div className="date_picker_range">
                                                                                <div>
                                                                                    <div>Từ ngày: <b style={{ color: 'green' }}>{getDate(startDate) + '/' + (getMonth(startDate) + 1) + '/' + getYear(startDate)}</b></div>
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
                                                                                        selected={startDate}
                                                                                        onChange={(date) => setStartDate(date)}

                                                                                    />
                                                                                </div>
                                                                                <div className="hr_datepicker_tk"></div>
                                                                                <div className="to_date_choose">
                                                                                    <div>Đến ngày: <b style={{ color: 'green' }}>{getDate(startDateTo) + '/' + (getMonth(startDateTo) + 1) + '/' + getYear(startDateTo)}</b></div>
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
                                                                                        selected={startDateTo}
                                                                                        onChange={(date) => setStartDateTo(date)}

                                                                                    />
                                                                                    <div className="box_btn_filter" >
                                                                                        <button className="btn_month_tk"
                                                                                            onClick={() => { TimKiemDateFromTo() }}
                                                                                        >
                                                                                            Tìm kiếm
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            : null}
                                                            {/* datepicker */}
                                                            <div className="square_time_thongke"></div>
                                                        </div>
                                                        : null
                                                    }
                                                    <div className="square_time_thongke"></div>
                                                </div>
                                            </div>
                                            : null
                                        }
                                    </div>
                                    : null
                                }

                                <button className='TK2_btnleft' onClick={() => { changetable(1) }}>Thông Tin Chung</button>
                                <br></br>
                                <button className='TK2_btnleft' onClick={() => { changetable(3) }}>Đơn Hàng</button>
                                <br></br>
                               
                                {/* <br></br> */}
                                <button className='TK2_btnleft' onClick={() => { handleClickOpen() }}>Đăng Xuất</button>
                                <br></br>

                            </div>
                            :
                            <div className="tong_trai_thongke_an"></div>
                        }

                        <button onClick={() => { setOpenOption(!open_option) }}
                            title="Chọn bảng"
                            className="open_option_thongke">
                            {open_option ? <ArrowBackIos style={{ fontSize: 'medium', color: 'white' }} /> : <NavigateNext style={{ color: 'white' }} />}

                        </button>
                    </div>
                </div>
                

                <div className='tong-phaii' onClick={() => { ClickOutside() }}>
                    <div style={{ width: '100%', height: '100%', textAlign: 'center' }}>
                        <div style={{ width: '80%', display: 'flex', flexDirection: 'row', margin: 'auto' }}>
                            {time !== "" ?
                                <div style={{ width: '35%', marginTop: 10 }}>
                                    <div>Bạn đang chọn mốc:&nbsp;
                                        <b style={{ color: 'green' }}>
                                            {time.time}
                                        </b>
                                    </div>
                                    <button className="reset_time_tk" onClick={() => { resettime() }}>
                                        <img width='18' height='18' src={refresh_time}></img>
                                        <div>Reset time</div>
                                    </button>
                                </div> : null}
                            <div className='search-product-parent_thongke'>
                                <img height="22" width="22" src={search_img} className="img_search"></img>

                                <Autocomplete
                                    freeSolo
                                    id="autocomplete"
                                    clearOnEscape
                                    clearOnBlur
                                    autoComplete
                                    options={input.map((option) => option.value)}
                                    onChange={handleSubmit} // This will be called on selection of the country
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            margin="normal"
                                            aria-label="enter search"
                                            name="search"
                                            placeholder="Tìm Kiếm"
                                        // No need to check the onChange here
                                        />
                                    )}
                                >
                                </Autocomplete>
                            </div>
                        </div>
                        <h3 style={{color:'red' }}>mã nhân vien: {manv}</h3>
                        {
                            tableType == 1 ?
                                <Table_ThongKe_Sl dataFromParent={tabledata} parentCallback={callbackFunction} parentCallback2={callbackFunction2} />
                                :  tableType == 3 ?
                                        <Table_DonHang_Sl dataFromParent={tabledata} parentCallback={callbackFunction} parentCallback2={callbackFunction2}/>
                                        
                                            : null
                        }


                    </div>
                </div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Bạn Có Muốn Đăng Xuất?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Đăng Xuất!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose_nologout} color="primary">
                            Hủy
                        </Button>
                        <Button onClick={handleClose_logout} color="primary" autoFocus>
                            Đồng ý
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}
export default ThongKesl