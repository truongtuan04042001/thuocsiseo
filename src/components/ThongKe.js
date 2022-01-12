import { useEffect, useState } from 'react';
import ThemSanPham from './ThemSanPham';
import ThemLoHang from './ThemLoHang'
import Table_ThongKe from './Table_ThongKe';
import Table_DonHang from './Table_DonHang';
import Table_TrangThai from './Table_TrangThai';
import Table_LoHang from './Table_LoHang';
import add_query from '../images/add-query.png'
import remove_query from '../images/remove-query.png'
import search_query from '../images/search-query.png'
import axios from "axios";
import '../css/ThongKe.css';
import Select from 'react-select';
import options_tenbang from './options_tenbang.js';
import options_thongke from './options_thongke.js';
import Test from './test.js';
import options_trangthai from './options_trangthai.js';
import { API_URL } from '../constants/constants'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
//tuan
import { ExportReactCSV } from './ExportReactCSV'
import React from 'react'
var caiqq = [];
const options = ['Option 1', 'Option 2'];
const ThongKe = () => {
    const [anthongtin, setAnthongtin] = useState(false)
    const [loaitk, setLoaitk] = useState({ value: '0', label: 'Chọn thống kê' });//mảng chứa giá trị loại thống kê
    const [input, setInput] = useState([]);//mang gợi ý của search
    const [value, setValue] = useState('');//giá trị của search box
    const [inputValue, setInputValue] = useState('');//giá tri thay đổi của search box
    const [inputList, setInputList] = useState([]);//mảng lệnh dua về sql
    const [cmdlist, setCmdlist] = useState([]);//mảng chứa lệnh cho chức năng xóa lệnh
    const [command, setCommand] = useState('Câu Lệnh: Thống kê bảng Sản phẩm theo ');//mảng chứa câu lệnh show ra cho ng dung

    const [antrangthai, setAnTrangthai] = useState(false)
    const [loaitk2, setLoaitk2] = useState({ value: '0', label: 'Chọn thống kê' });//mảng chứa giá trị loại thống kê
    const [input2, setInput2] = useState([]);//mang gợi ý của search
    const [value2, setValue2] = useState('');//giá trị của search box
    const [inputValue2, setInputValue2] = useState('');//giá tri thay đổi của search box
    const [inputList2, setInputList2] = useState([]);//mảng lệnh dua về sql
    const [cmdlist2, setCmdlist2] = useState([]);//mảng chứa lệnh cho chức năng xóa lệnh
    const [command2, setCommand2] = useState('Câu Lệnh: Thống kê bảng Sản phẩm theo ');//mảng chứa câu lệnh show ra cho ng dung

    const [andonhang, setAnDonHang] = useState(false)
    const [loaitk3, setLoaitk3] = useState({ value: '0', label: 'Chọn thống kê' });//mảng chứa giá trị loại thống kê
    const [input3, setInput3] = useState([]);//mang gợi ý của search
    const [value3, setValue3] = useState('');//giá trị của search box
    const [inputValue3, setInputValue3] = useState('');//giá tri thay đổi của search box
    const [inputList3, setInputList3] = useState([]);//mảng lệnh dua về sql
    const [cmdlist3, setCmdlist3] = useState([]);//mảng chứa lệnh cho chức năng xóa lệnh
    const [command3, setCommand3] = useState('Câu Lệnh: Thống kê bảng Sản phẩm theo ');//mảng chứa câu lệnh show ra cho ng dung

    const [tabledata, setTabledata] = useState([]);//mảng chứa giá trị lấy được từ sql đưa vào table-table thông tin
    const [tabledata2, setTabledata2] = useState([]);//mảng chứa giá trị lấy được từ sql đưa vào table-table trạng thái
    const [tabledata3, setTabledata3] = useState([]);//mảng chứa giá trị lấy được từ sql đưa vào table-table don hàng

    const [tableType, setTableType] = useState(0);//mảng chứa loại table(sắp bỏ)
    const [tablechange, setTablechange] = useState('')//dùng để theo dõi thay đổi table-refresh lại

    useEffect(async () => {
        if (loaitk.value == "1" || loaitk.value == "2" || loaitk.value == "3" || loaitk.value == "4") {
            await fetch(API_URL + '/selectall', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
               
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sertable: loaitk.value,
                })
            })
                .then((response) => response.json())
                .then(data => {
                    var items = []
                    var i;
                    for (i = 0; i < data.length; i++) {
                        if (loaitk.value == "1") {
                            items.push(data[i].TenNH)
                        } else if (loaitk.value == "2") {
                            items.push(data[i].TenHC)
                        } else if (loaitk.value == "3") {
                            items.push(data[i].TenHangSX)
                        } else if (loaitk.value == "4") {
                            items.push(data[i].TenNuocSX)
                        }
                    }
                    setInput(items)
                })
        } else if (loaitk.value == "5" || loaitk.value == "6") {
            //chay fetch khac
            await fetch(API_URL + '/selectcol', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sercol: loaitk.value,
                })
            })
                .then((response) => response.json())
                .then(data => {
                    var items = []
                    var i;
                    for (i = 0; i < data.length; i++) {
                        if (loaitk.value == "5") {
                            items.push(data[i].MaHang)
                        } else if (loaitk.value == "6") {
                            items.push(data[i].SoDangKy)
                        }
                    }
                    setInput(items)
                })
        }
    }, [loaitk]);

    useEffect(async () => {
        if (loaitk2.value == "1") {
            //chay fetch khac
            await fetch(API_URL + '/selectcol', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sercol: loaitk2.value,
                })
            })
                .then((response) => response.json())
                .then(data => {
                    var items = []
                    var i;
                    for (i = 0; i < data.length; i++) {
                        items.push(data[i].MaHang)
                    }
                    setInput2(items)

                })
        } else {
            var items = ["Có", "Không"]
            setInput2(items)
            //cho data= yes no
        }
    }, [loaitk2]);

    //api lấy all sanpham theo thông tin+trang thai
    useEffect(async () => {
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
            })
        await fetch(API_URL + '/searchbackall2', {
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
                setTabledata2(datas)
                setTablechange('')
            })
        await fetch(API_URL + '/searchbackall3', {
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
                setTabledata3(datas)
                setTablechange('')
            })
    }, [tablechange]);

    //
    //useEffect(async () => {
    //    await fetch(API_URL + "/danhSachTatCaChiTietLoHang")
    //        .then(response => response.json())
    //        .then(data => {
    //            for (let i = 0; i < data.length; i++) {
    //                const e = data[i];
    //                e.NgaySX = e.NgaySX.slice(0, 10)
    //                e.HanSD = e.HanSD.slice(0, 10)
    //            }
    //            // console.log(new Date().getTime() + " data= " + JSON.stringify(data))
    //            // alert("OK " + JSON.stringify(data))
    //            setTabledata2(data)
    //            //setTableType(1)
    //        })
    //}, [tablechange]);

    useEffect(() => {
        setCmdlist(command.split("-"))
    }, [command]);

    useEffect(() => {
        setCmdlist2(command2.split("-"))
    }, [command2]);

    //useEffect(() => {
    //    setCommand(cmdlist.toString())
    //}, [cmdlist]);
    
    // handle click event of the Remove button
    const handleRemoveClick = () => {
        const list = [...cmdlist]
        if (list.length > 1) {
            list.pop();
        }
        const serlist = [...inputList]
        if (serlist.length >= 1) {
            serlist.pop();
        }

        setInputList(serlist)
        setCmdlist(list)
        setCommand(list.join("-"))
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        if (loaitk.value == 0) {
            console.log("Chưa chọn loại thống kê")
        } else {
            if (value == "") {
                console.log("Chưa chọn giá trị")
            } else {
                setInputList([...inputList, { table: loaitk.value, item: value }]);
                setCommand(command + '- cột ' + loaitk.label + ' tại giá trị ' + value);
                setCmdlist(command.split("-"))
                setLoaitk({ value: '0', label: 'Chọn thống kê' })
                setValue('')
            }

        }

    };
    // handle click event of the Search button
    const handleSearchClick = () => {
        if (inputList.length == 0) {
            console.log("ko có gì để push");
        } else {
            fetch(API_URL + '/selectallsp', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
               
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sercmdarr: inputList,
                })
            })
                .then((response) => response.json())
                .then(data => {

                    setTabledata(data);
                    // console.log(data)
                    // console.log("1")
                })
            setTableType(0)
            setInputList([])
            setCommand('Câu Lệnh: Thống kê bảng Sản phẩm theo ')

        }

    };
    const AnhienThongtin = () => setAnthongtin(!anthongtin)
    const AnhienDonHang = () => setAnDonHang(!andonhang)
    const AnhienTrangthai = () => setAnTrangthai(!antrangthai)
    const handleRemoveClick2 = () => {
        const list = [...cmdlist2]
        if (list.length > 1) {
            list.pop();
        }
        const serlist = [...inputList]
        if (serlist.length >= 1) {
            serlist.pop();
        }

        setInputList2(serlist)
        setCmdlist2(list)
        setCommand2(list.join("-"))
    };

    // handle click event of the Add button
    const handleAddClick2 = () => {
        if (loaitk2.value == 0) {
            console.log("Chưa chọn loại thống kê")
        } else {
            if (value2 == "") {
                console.log("Chưa chọn giá trị")
            } else {
                setInputList2([...inputList2, { table: loaitk2.value, item: value2 }]);
                setCommand2(command2 + '- cột ' + loaitk2.label + ' tại giá trị ' + value2);
                setCmdlist2(command2.split("-"))
                setLoaitk2({ value: '0', label: 'Chọn thống kê' })
                setValue2('')
            }

        }

    };
    // handle click event of the Search button
    const handleSearchClick2 = () => {
        if (inputList2.length == 0) {
            console.log("ko có gì để push");
        } else {
            fetch(API_URL + '/selectallsp2', {
                method: 'POST',
                headers: {
                  
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sercmdarr: inputList2,
                })
            })
                .then((response) => response.json())
                .then(data => {

                    setTabledata2(data);
                    // console.log(data)
                    // console.log("1")
                })
            // setTableType(0)
            setInputList2([])
            setCommand2('Câu Lệnh: Thống kê bảng Sản phẩm theo ')

        }

    };


    //code lo hang

    //
    const callbackFunction = async (childData) => {
        setTablechange(childData)
        // setTableType(0)
    };
    const [toggleThemSP, setToggleThemSP] = useState(false)
    const [toggleThemLH, setToggleThemLH] = useState(false)

    const [searchTheoMaLoHang, setsearchTheoMaLoHang] = useState('1234')
    const [serachTheoMaHang, setSerachTheoMaHang] = useState('SV214')


    let newDate = new Date()
    let date = "thuocsionline " + newDate.getDate() + "/" + (newDate.getMonth() + 1) + "/" + newDate.getFullYear();
    return (
        <div>

            <div className="thong-ke-parent">

                <div className="o-ben-phai">
                    <div id="input_container">
                        <div className="query-parent" style={{ display: 'flex', width: '70%', marginBottom: 15, zIndex: 100, position: 'relative' }}>
                            <div className="query-child" style={{ width: '60%', zIndex: 100, position: 'relative' }}>
                                <Select
                                    id="select1"
                                    value={loaitk}
                                    onChange={(text) => { setLoaitk(text) }}
                                    options={options_thongke}
                                    placeholder="Chọn thống kê"
                                    maxMenuHeight={145}
                                />
                                <Autocomplete
                                    value={value}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                    inputValue={inputValue}
                                    onInputChange={(event, newInputValue) => {
                                        setInputValue(newInputValue);
                                    }}
                                    id="controllable-states-demo"
                                    options={input}
                                    renderInput={(params) => <TextField {...params} label="Tìm kiếm" variant="outlined" />}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }}>
                                <button id="btn-query" onClick={handleAddClick}>
                                    <img id="img-btn-add" width='20' height='20' src={add_query}></img>
                                    &nbsp;Thêm
                                </button>
                                <button id="btn-query" style={{ backgroundColor: 'tomato' }} onClick={handleRemoveClick}>
                                    <img id="img-btn-add" width='20' height='20' src={remove_query}></img>
                                    &nbsp;Xóa
                                </button>
                                {
                                    inputList.length > 0 ?
                                        <button id="btn-query" style={{ backgroundColor: '#FFCC33' }} onClick={handleSearchClick}>
                                            <img id="img-btn-add" width='20' height='20' src={search_query}></img>
                                            &nbsp;Tìm
                                        </button>
                                        : null
                                }

                            </div>
                        </div>
                        <p>Export all:</p>
                        <ExportReactCSV csvData={tabledata} fileName={date} />
                    </div>
                    <div style={{ marginTop: 20 }}>{command}




                    </div>
                    <div className="container-table">

                        <div>

                            <h1>Bảng Đơn Hàng</h1>
                            <button onClick={AnhienDonHang} ><h3>hiện</h3></button>

                            {andonhang ? <div id="input_container">
                                <p>Export Thông tin SP:</p>
                                <ExportReactCSV csvData={tabledata3} fileName="Thongtinsp" />
                                <div style={{ marginTop: 20 }}>{command}</div>
                                <div className="query-parent" style={{ display: 'flex', width: '70%', marginBottom: 15, zIndex: 100, position: 'relative' }}>
                                    <div className="query-child" style={{ width: '60%', zIndex: 100, position: 'relative' }}>
                                        <Select
                                            id="select1"
                                            value={loaitk}
                                            onChange={(text) => { setLoaitk(text) }}
                                            options={options_thongke}
                                            placeholder="Chọn thống kê"
                                            maxMenuHeight={145}
                                        />
                                        <Autocomplete
                                            value={value}
                                            onChange={(event, newValue) => {
                                                setValue(newValue);
                                            }}
                                            inputValue={inputValue}
                                            onInputChange={(event, newInputValue) => {
                                                setInputValue(newInputValue);
                                            }}
                                            id="controllable-states-demo"
                                            options={input}
                                            renderInput={(params) => <TextField {...params} label="Tìm kiếm" variant="outlined" />}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }}>
                                        <button id="btn-query" onClick={handleAddClick}>
                                            <img id="img-btn-add" width='20' height='20' src={add_query}></img>
                                            &nbsp;Thêm
                                        </button>
                                        <button id="btn-query" style={{ backgroundColor: 'tomato' }} onClick={handleRemoveClick}>
                                            <img id="img-btn-add" width='20' height='20' src={remove_query}></img>
                                            &nbsp;Xóa
                                        </button>
                                        {
                                            inputList.length > 0 ?
                                                <button id="btn-query" style={{ backgroundColor: '#FFCC33' }} onClick={handleSearchClick}>
                                                    <img id="img-btn-add" width='20' height='20' src={search_query}></img>
                                                    &nbsp;Tìm
                                                </button>
                                                : null
                                        }

                                    </div>
                                </div>
                                <Table_DonHang dataFromParent={tabledata3} parentCallback={callbackFunction} />

                            </div> : null
                            }

                            <h1>Bảng Thông Tin Sản Phẩm</h1>
                            <button onClick={AnhienThongtin} ><h3>hiện</h3></button>

                            {anthongtin ? <div id="input_container">
                                <p>Export Thông tin SP:</p>
                                <ExportReactCSV csvData={tabledata} fileName="Thongtinsp" />
                                <div style={{ marginTop: 20 }}>{command}</div>
                                <div className="query-parent" style={{ display: 'flex', width: '70%', marginBottom: 15, zIndex: 100, position: 'relative' }}>
                                    <div className="query-child" style={{ width: '60%', zIndex: 100, position: 'relative' }}>
                                        <Select
                                            id="select1"
                                            value={loaitk}
                                            onChange={(text) => { setLoaitk(text) }}
                                            options={options_thongke}
                                            placeholder="Chọn thống kê"
                                            maxMenuHeight={145}
                                        />
                                        <Autocomplete
                                            value={value}
                                            onChange={(event, newValue) => {
                                                setValue(newValue);
                                            }}
                                            inputValue={inputValue}
                                            onInputChange={(event, newInputValue) => {
                                                setInputValue(newInputValue);
                                            }}
                                            id="controllable-states-demo"
                                            options={input}
                                            renderInput={(params) => <TextField {...params} label="Tìm kiếm" variant="outlined" />}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }}>
                                        <button id="btn-query" onClick={handleAddClick}>
                                            <img id="img-btn-add" width='20' height='20' src={add_query}></img>
                                            &nbsp;Thêm
                                        </button>
                                        <button id="btn-query" style={{ backgroundColor: 'tomato' }} onClick={handleRemoveClick}>
                                            <img id="img-btn-add" width='20' height='20' src={remove_query}></img>
                                            &nbsp;Xóa
                                        </button>
                                        {
                                            inputList.length > 0 ?
                                                <button id="btn-query" style={{ backgroundColor: '#FFCC33' }} onClick={handleSearchClick}>
                                                    <img id="img-btn-add" width='20' height='20' src={search_query}></img>
                                                    &nbsp;Tìm
                                                </button>
                                                : null
                                        }

                                    </div>
                                </div>
                                <Table_ThongKe dataFromParent={tabledata} parentCallback={callbackFunction} />

                            </div> : null
                            }

                            <h1>Bảng Trạng Thái Sản Phẩm</h1>

                            <button onClick={AnhienTrangthai} ><h3>hiện</h3></button>
                            {
                                antrangthai ?
                                    <div id="input_container">
                                        <div className="query-parent" style={{ display: 'flex', width: '70%', marginBottom: 15, zIndex: 100, position: 'relative' }}>
                                            <div className="query-child" style={{ width: '60%', zIndex: 100, position: 'relative' }}>
                                                <Select
                                                    id="select1"
                                                    value={loaitk2}
                                                    onChange={(text) => { setLoaitk2(text) }}
                                                    options={options_trangthai}
                                                    placeholder="Chọn thống kê"
                                                    maxMenuHeight={145}
                                                />
                                                <Autocomplete
                                                    value={value2}
                                                    onChange={(event, newValue) => {
                                                        setValue2(newValue);
                                                    }}
                                                    inputValue={inputValue2}
                                                    onInputChange={(event, newInputValue) => {
                                                        setInputValue2(newInputValue);
                                                    }}
                                                    id="controllable-states-demo"
                                                    options={input2}
                                                    renderInput={(params) => <TextField {...params} label="Tìm kiếm" variant="outlined" />}
                                                />
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }}>
                                                <button id="btn-query" onClick={handleAddClick2}>
                                                    <img id="img-btn-add" width='20' height='20' src={add_query}></img>
                                                    &nbsp;Thêm
                                                </button>
                                                <button id="btn-query" style={{ backgroundColor: 'tomato' }} onClick={handleRemoveClick2}>
                                                    <img id="img-btn-add" width='20' height='20' src={remove_query}></img>
                                                    &nbsp;Xóa
                                                </button>
                                                {
                                                    inputList2.length > 0 ?
                                                        <button id="btn-query" style={{ backgroundColor: '#FFCC33' }} onClick={handleSearchClick2}>
                                                            <img id="img-btn-add" width='20' height='20' src={search_query}></img>
                                                            &nbsp;Tìm
                                                        </button>
                                                        : null
                                                }

                                            </div>
                                        </div>
                                        <p>Export Trạng thái SP:</p>
                                        <ExportReactCSV csvData={tabledata2} fileName="trangthaisp" />
                                        <div style={{ marginTop: 20 }}>{command2}</div>
                                        <Table_TrangThai dataFromParent={tabledata2} parentCallback={callbackFunction} />
                                    </div>
                                    : null
                            }



                        </div>

                    </div>


                </div>
            </div>
            {
                toggleThemSP ? <ThemSanPham /> : null
            }
            {
                toggleThemLH ? <ThemLoHang /> : null
            }




        </div>
    );
}
export default ThongKe;