// CHÚNG TÔI ĐÃ CỐ GẮNG HẾT SỨC //
import { useEffect, useState } from 'react';
import close_modal from '../images/close-modal.png';
import dky_user from '../images/dky-user.png';
import dky_phone from '../images/dky-phone.png';
import dky_mail from '../images/dky-mail.png';
import dky_pass from '../images/dky-pass.png';
import dky_location from '../images/dky-location.png';
import show_pass from '../images/show-pass.png';
import '../css/Header.css';
import Modal from 'react-modal';
// import Select from 'react-select';
// import options_nhanvien from './options_nhanvien.js';
// truong
import { API_URL } from '../constants/constants'
import QuenMK from './QuenMatKhau';
import { Redirect, useHistory } from 'react-router-dom';

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
        zIndex: 2
    },
};
Modal.setAppElement('#root')

var nhanVien = []
const ModalDangNhap = (props) => {
    const [ten_nv, setTenNV] = useState();
    const [pass_nv, setPassNV] = useState();
    const [pass_nv2, setPassNV2] = useState();
    const [sdt_nv, setSdtNV] = useState();
    const [email_nv, setEmailNV] = useState("");
    const [cCCD_nv, setCCCD_nv] = useState()
    const [ngSinh_nv, setNgSinh_nv] = useState()
    const [diaChi_nv, setDiaChi_nv] = useState()
    const [khuVuc_nv, setKhuVuc_nv] = useState()
    const [modalIsOpen, setIsOpen] = useState(true);
    // const [modalIsOpen2, setIsOpen2] = useState(false);
    const [modalThongTinNV, setModalThongTinNV] = useState(false)
    // var modalIsOpen2 = false
    const [type_pass_nv, setTypePassNV] = useState('password');
    const [popup_check, setPopupCheck] = useState(false);
    const [check_dieukhoan, setDieuKhoan] = useState(false);
    // const callbackFunction = (childData) => {
    //     setPopupCheck(childData)
    // };
    // const sendData = () => {
    //     props.parentCallback(false);
    // };  
    const toggleModal = () => {
        setIsOpen(!modalIsOpen)
    }

    const toggleModalThongTinNV = () => {
        console.log(ten_nv)
        setModalThongTinNV(!modalThongTinNV)
    }
    const GiaTriDieuKhoan = () => {
        setDieuKhoan(!check_dieukhoan);
    }
    // Login
    const history = useHistory();
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
                    switch (data.cv) {
                        case 0:
                        case 1:
                        case 2:
                            history.push("/ThongKe2")
                            break;
                        case 3:
                            history.push("/ThongKesl")
                            break;

                    }
                })
        }
    }
    useEffect(async () => {
        verifytoken()
    }, []);

    const dangNhap = async () => {
        // setIsOpen(false);
        // sendDataToHeader();
        // localStorage.setItem("user-inf", ten_nv);
        if (ten_nv == undefined || ten_nv == "" || ten_nv == null) {
            alert("Tên trống")
        } else {
            if (pass_nv == undefined || pass_nv == "" || pass_nv == null) {
                alert("Mật khẩu trống")
            } else {
                await fetch(API_URL + '/dangNhap2', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                    
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        maNV: ten_nv,
                        mK: pass_nv,
                    })
                })
                    .then((response) => response.json())
                    .then(data => {
                        if (data !== "loginfail") {
                            console.log(data)
                            localStorage.setItem("accesstoken2", data.token);
                            //

                            var nhanVien = data.info
                            setTenNV(nhanVien[0].MaNV)
                            if (nhanVien[0].Info == 0) {
                                // 
                                toggleModalThongTinNV()
                                setIsOpen(false);
                            } else {
                                console.log(nhanVien[0].ChucVu)
                                switch (nhanVien[0].ChucVu) {
                                    case 0:
                                    case 1:
                                    case 2:
                                        history.push("/ThongKe2")
                                        break;
                                    case 3:
                                        history.push("/ThongKesl")
                                        break;

                                }

                            }
                        } else {
                            alert("Sai tên đăng nhập hoặc mật khẩu, vui lòng kiểm tra lại.")
                        }
                    })
            }
        }
    }
    //  code lụi mà nó hiểu, vl thật =)) này thì enter thì tự động chọn có hả, chuyện này OK =)))
    const testKey = (e) => {
        if (e.code === "Enter") {
            // alert("OK ENTER")
            dangNhap()
        }
    }

    const thongTinNhanVien = async () => {
        let vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (ten_nv == undefined || ten_nv == "" || ten_nv == null) {
            alert("Tên trống")
        } else {
            if (sdt_nv == undefined || sdt_nv == "" || sdt_nv == null) {
                alert("Số điện thoại trống")
            } else {
                if (!vnf_regex.test(sdt_nv)) {
                    alert("Số điện thoại không hợp lệ")
                } else {
                    if (email_nv.length != 0 && !regEmail.test(email_nv)) {
                        alert("Email không hợp lệ")
                    } else {
                        if (pass_nv == undefined || pass_nv == "" || pass_nv == null) {
                            alert("Mật khẩu trống")
                        } else {
                            if (pass_nv.length < 9) {
                                alert("Mật khẩu quá ngắn")
                            } else {
                                if (pass_nv !== pass_nv2) {
                                    alert("Mật khẩu không khớp")
                                } else {
                                    await fetch(API_URL + '/updateinfo', {
                                        method: 'POST',
                                        headers: {
                                            Accept: 'application/json',
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            MaNV: ten_nv,
                                            SDT: sdt_nv,
                                            Email: email_nv,
                                            Cccd: cCCD_nv,
                                            NgS: ngSinh_nv,
                                            DiaChi: diaChi_nv,
                                            MK: pass_nv,
                                            Info: 1
                                        })
                                    })
                                        .then(res => res.text())
                                        .then(data => {
                                            if (data === "OK") {
                                                toggleModalThongTinNV()
                                                alert("Đã cập nhật")
                                                //sendDataToHeader();
                                                //localStorage.setItem("user-inf", ten_nv);
                                                //localStorage.setItem("chucVu", nhanVien[0].ChucVu);
                                            }
                                        })
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    // end

    return (
        <div style={{
            backgroundImage: "url(" + "https://cdn.hipwallpaper.com/i/56/3/FvjJCg.jpg" + ")",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height: window.innerHeight,
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center'
        }}>
            <div className="section_dangnhap_quanly" style={{ backgroundColor: 'rgba(255,255,255,0.5)', width: '30%', textAlign: 'center', borderRadius: 15 }}>
                <div className='QL_divDN'><h3>ĐĂNG NHẬP</h3></div>
                <div style={{ display: 'flex', flexDirection: 'column', height: 270, width: '100%', justifyContent: 'center', justifyItems: 'center' }}>
                    <div id="input_container" style={{ margin: '10px auto', width: '80%' }}>
                        <input type="text" value={ten_nv} onKeyPress={(e) => testKey(e)} onChange={text => { setTenNV(text.target.value) }} className="input_modalQL" placeholder="Nhập mã nhân viên" />
                        <img src={dky_user} id="input_img" />
                    </div>
                    <div id="input_container" style={{ margin: '0px auto', width: '80%' }}>
                        <input type={type_pass_nv} value={pass_nv} onKeyPress={(e) => testKey(e)} onChange={text => { setPassNV(text.target.value) }} className="input_modalQL" placeholder="Nhập mật khẩu" />
                        <img src={dky_pass} id="input_img" />
                        <button id="show_pass_nv" onClick={() => {
                            if (type_pass_nv == "password") {
                                setTypePassNV("text")
                            } else {
                                setTypePassNV("password")
                            }
                        }}>
                            <img src={show_pass} id="img_show_pass_nv" />
                        </button>
                    </div>
                    {/* <QuenMK></QuenMK> */}
                    <button style={{ margin: '20px auto', width: '80%' }} id="btn_dky" onClick={dangNhap} className='QL_bntDN'><b>Đăng nhập</b></button>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                </div>
            </div>
            <Modal
                isOpen={modalThongTinNV}
                onRequestClose={toggleModalThongTinNV}
                style={customStyles}
                contentLabel="Thông tin NV"
            >
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: 400 }}>
                        <h4>Bổ sung thông tin NV</h4>
                        <button onClick={toggleModalThongTinNV} className="closeModal">
                            <img width="24" src={close_modal}></img>
                        </button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', height: 500 }}>
                        <div id="input_container">
                            <input type="tel" value={sdt_nv} onChange={text => { setSdtNV(text.target.value) }} className="input_modal" placeholder="Nhập số điện thoại (bắt buộc)" />
                            <img src={dky_phone} id="input_img" />
                        </div>
                        <div id="input_container">
                            <input type="text" value={email_nv} onChange={text => { setEmailNV(text.target.value) }} className="input_modal" placeholder="Nhập email" />
                            <img src={dky_mail} id="input_img" />
                        </div>
                        <div id="input_container">
                            <input type="text" value={cCCD_nv} onChange={text => { setCCCD_nv(text.target.value) }} className="input_modal" placeholder="Nhập CMND/CCCD" />
                            <img src={dky_user} id="input_img" />
                        </div>
                        <div id="input_container">
                            <input type="text" value={ngSinh_nv} onChange={text => { setNgSinh_nv(text.target.value) }} className="input_modal" placeholder="Nhập ngày sinh dạng năm/tháng/ngày (yyyy/MM/dd)" />
                            <img src={dky_user} id="input_img" />
                        </div>
                        <div id="input_container">
                            <input type="text" value={diaChi_nv} onChange={text => { setDiaChi_nv(text.target.value) }} className="input_modal" placeholder="Nhập địa chỉ" />
                            <img src={dky_location} id="input_img" />
                        </div>
                        <div id="input_container">
                            <input type={type_pass_nv} onChange={text => { setPassNV(text.target.value) }} className="input_modal" placeholder="Nhập mật khẩu mới (bắt buộc)" />
                            <img src={dky_pass} id="input_img" />
                            <button id="show_pass_nv" onClick={() => {
                                if (type_pass_nv == "password") {
                                    setTypePassNV("text")
                                } else {
                                    setTypePassNV("password")
                                }
                            }}>
                                <img src={show_pass} id="img_show_pass_nv" />
                            </button>
                        </div>
                        <div id="input_container">
                            <input type={type_pass_nv} onChange={text => { setPassNV2(text.target.value) }} className="input_modal" placeholder="Nhập lại mật khẩu mới (bắt buộc)" />
                            <img src={dky_pass} id="input_img" />
                            <button id="show_pass_nv" onClick={() => {
                                if (type_pass_nv == "password") {
                                    setTypePassNV("text")
                                } else {
                                    setTypePassNV("password")
                                }
                            }}>
                                <img src={show_pass} id="img_show_pass_nv" />
                            </button>
                        </div>
                        <button id="btn_dky" onClick={thongTinNhanVien}><b>Hoàn thành thông tin NV</b></button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
export default ModalDangNhap