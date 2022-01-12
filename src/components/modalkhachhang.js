// CHÚNG TÔI ĐÃ CỐ GẮNG HẾT SỨC //
import { useEffect, useState } from 'react';
// import close_modal from '../images/close-modal.png';
import dky_user from '../images/dky-user.png';
import dky_phone from '../images/dky-phone.png';
// import dky_mail from '../images/dky-mail.png';
import dky_pass from '../images/dky-pass.png';
// import dky_location from '../images/dky-location.png';
import show_pass from '../images/show-pass.png';
// import check from '../images/check.png';
import '../css/Header.css';
import Modal from 'react-modal';
import Select from 'react-select';
import { API_URL } from '../constants/constants'
import options from './options';
// import { Toast } from 'bootstrap';
import firebase from './firebase';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

const customStyles = {
    content: {
        // width:window.innerWidth - 70,
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
        // zIndex: 2
    },
};
Modal.setAppElement('#root')

const ModalKhachHang = (props) => {
    // const sendData = () => {
    //     props.parentCallback(false);
    // };
    const [ten_kh, setTenKH] = useState();
    const [sdt_kh, setSdtKH] = useState();
    const [email_kh, setEmailKH] = useState();
    const [cCCD_kh, setCCCD_KH] = useState()
    const [ngSinh_kh, setNgSinh_KH] = useState()
    const [diaChi_kh, setDiaChi_KH] = useState({ value: 'null', label: 'Chọn khu vực' })
    const [pass_kh, setPassKH] = useState();
    const [pass_kh_conf, setPassKHConf] = useState();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [type_pass_nv, setTypePassNV] = useState('password');
    const [radio_1, setRadio1] = useState('Nhà thuốc');
    const [check_dieukhoan, setDieuKhoan] = useState(true);
    const [hienGuiOTP, setGuiOtp] = useState(false);
    const [check_otp, setCheckOtp] = useState(false);
    const [hiencaptcha, setCaptCha] = useState(false);
    const [openCaptchaDl, setOpenCaptchaDl] = useState(false);
    const OpenCaptchaDialog = () => {
        setOpenCaptchaDl(!openCaptchaDl);
    };

    const toggleModal = () => {
        setTenKH();
        setSdtKH();
        setEmailKH();
        setDiaChi_KH();
        setPassKH();
        // setDieuKhoan(false);
        // setIsOpen(!modalIsOpen)
        props.openModalDkyFromHeader();
    }
    const GiaTriDieuKhoan = () => {
        setDieuKhoan(!check_dieukhoan);
    }
    // useEffect(() => {
    //     let vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    //     if (vnf_regex.test(sdt_kh)) {
    //         setGuiOtp(true);
    //     }
    //     else {
    //         setGuiOtp(false);
    //         setCaptCha(false);
    //     }
    //     setCheckOtp(false);
    // }, [sdt_kh]);
    const XacNhanOtp = () => {
        fetch(API_URL + '/checksdt', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sdt: sdt_kh,
            })
        })
            .then((response) => response.json())
            .then(data => {
                if (data == '1') {
                    alert("Số điện thoại đã tồn tại")
                }
                else {
                    setCaptCha(true);
                    setOpenCaptchaDl(true);
                    var recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
                    var number = '+84' + sdt_kh.slice(1, 10);
                    firebase.auth().signInWithPhoneNumber(number, recaptcha).then(function (e) {
                        setCaptCha(false);
                        setOpenCaptchaDl(false);
                        var code = prompt("Nhập mã OTP. Tin nhắn OTP có dạng 'Your Firebase App verification code is xxx', xxx là mã OTP cần nhập", '');
                        e.confirm(code).then(function (result) {
                            setCheckOtp(true);
                            alert("Mã otp chính xác")
                        }).catch(function (error) {
                            // console.error(error);
                            alert("Lỗi : Mã otp không chính xác vui lòng nhập lại !")

                        });
                    })
                        .catch(function (error) {
                            // console.error(error);
                            if (error == "Error: We have blocked all requests from this device due to unusual activity. Try again later.") {
                                alert("Bạn yêu cầu gửi otp quá giới hạn , vì vậy số điện thoại của bạn hiện đang bị tạm khóa. Vui lòng thử lại sau 3 tiếng nữa hoặc có thể thử với số điện thoại khác .")
                            }
                            else {
                                alert(error);
                            }
                            setCaptCha(false);
                            setOpenCaptchaDl(false);
                        });
                }

            });
    };
    const notifyVoucher = () => {
        toast.success('Chào mừng bạn lần đầu tiên đến với Thuốc sỉ online . Thuốc sỉ online xin tặng bạn 1 món quà . Chúc bạn có những trải nghiệm tuyệt vời khi mua hàng . Xin cảm ơn .', {
            position: "top-right",
            autoClose: 10000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    const ThemmggNewUser = () => {
        fetch(API_URL + '/themmggNewUser', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                makh: sdt_kh,
                doiTuong: 'NewUser'
            })
        })
            .then((response) => response.json())
            .then(data => {
                if (data == 'ok') {
                    notifyVoucher()
                }
            })
    };
    const Show_Ten_Input = () => {
        let vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        let vnf_regex2 = /((02)+([0-9]{9})\b)/g;
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (diaChi_kh == undefined || diaChi_kh.value == "" || diaChi_kh.value == 'null') {
            alert("Địa chỉ trống")
        }
        else {
            if (ten_kh == undefined || ten_kh == "" || ten_kh == null) {
                alert("Tên trống");
            }
            else {
                if (sdt_kh == undefined || sdt_kh == "" || sdt_kh == null) {
                    alert("Số điện thoại trống")
                }
                else {
                    if (sdt_kh.length == 10) {
                        if (vnf_regex.test(sdt_kh)) {
                            if (pass_kh == undefined || pass_kh == "" || pass_kh == null) {
                                alert("Mật khẩu trống")
                            }
                            else {
                                if (pass_kh.length < 6) {
                                    alert("Mật khẩu quá ngắn")
                                }
                                else {
                                    if (pass_kh.length < 6) {
                                        alert("Mật khẩu quá ngắn")
                                    }
                                    else {
                                        if (check_dieukhoan != true) {
                                            alert(check_dieukhoan)
                                            alert("Vui lòng đồng ý với Điều khoản sử dụng")
                                        }
                                        else {
                                            fetch(API_URL + '/themkhachhang', {
                                                method: 'POST',
                                                headers: {
                                                    Accept: 'application/json',
                                                    'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify({
                                                    ten_kh: ten_kh,
                                                    sdt_kh: sdt_kh,
                                                    email_kh: email_kh,
                                                    pass_kh: pass_kh,
                                                    khuvuc_kh: diaChi_kh.value,
                                                    diachi_kh: "",
                                                    doanhnghiep: radio_1
                                                })
                                            })
                                                .then((response) => response.json())
                                                .then(checksdt => {
                                                    if (checksdt == '1') {
                                                        alert("Số điện thoại đã tồn tại")
                                                    }
                                                    else if (checksdt == '0') {
                                                        setTenKH();
                                                        setSdtKH();
                                                        setEmailKH();
                                                        setDiaChi_KH();
                                                        setPassKH();
                                                        setDieuKhoan(false);
                                                        // setIsOpen(false);
                                                        props.closeModalDkyFromHeader();
                                                        alert("Tạo tài khoản thành công");
                                                        DangNhapSauKhiDK();
                                                        ThemmggNewUser();
                                                        notify();
                                                        notifyDN();
                                                    }
                                                });
                                        }
                                    }
                                }
                            }
                        } else {
                            alert(`Số di động chưa hợp lệ`)
                        }
                    } else if (sdt_kh.length == 11) {
                        if (vnf_regex2.test(sdt_kh)) {
                            if (pass_kh == undefined || pass_kh == "" || pass_kh == null) {
                                alert("Mật khẩu trống")
                            }
                            else {
                                if (pass_kh.length < 6) {
                                    alert("Mật khẩu quá ngắn")
                                }
                                else {
                                    if (pass_kh.length < 6) {
                                        alert("Mật khẩu quá ngắn")
                                    }
                                    else {
                                        if (check_dieukhoan != true) {
                                            alert(check_dieukhoan)
                                            alert("Vui lòng đồng ý với Điều khoản sử dụng")
                                        }
                                        else {
                                            fetch(API_URL + '/themkhachhang', {
                                                method: 'POST',
                                                headers: {
                                                    Accept: 'application/json',
                                                    'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify({
                                                    ten_kh: ten_kh,
                                                    sdt_kh: sdt_kh,
                                                    email_kh: email_kh,
                                                    pass_kh: pass_kh,
                                                    khuvuc_kh: diaChi_kh.value,
                                                    diachi_kh: "",
                                                    doanhnghiep: radio_1
                                                })
                                            })
                                                .then((response) => response.json())
                                                .then(checksdt => {
                                                    if (checksdt == '1') {
                                                        alert("Số điện thoại đã tồn tại")
                                                    }
                                                    else if (checksdt == '0') {
                                                        setTenKH();
                                                        setSdtKH();
                                                        setEmailKH();
                                                        setDiaChi_KH();
                                                        setPassKH();
                                                        setDieuKhoan(false);
                                                        // setIsOpen(false);
                                                        props.closeModalDkyFromHeader();
                                                        alert("Tạo tài khoản thành công");
                                                        DangNhapSauKhiDK();
                                                        notify();
                                                        notifyDN();
                                                    }
                                                });
                                        }
                                    }
                                }
                            }
                        } else {
                            alert(`Số điện thoại bàn chưa hợp lệ`)
                        }
                    } else {
                        alert(`Số điện thoại chưa hợp lệ. Số điện thoại 10 số hoặc 11 số.`)
                    }
                }
            }
        }
    }
    const notify = () => {
        toast.success('Đăng ký thành công!', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    const notifyDN = () => {
        toast.success('Đăng nhập thành công!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    const sendDataToHeader = (tenNV) => {
        props.callBackParent(tenNV);
    }
    const DangNhapSauKhiDK = async () => {
        await fetch(API_URL + '/dangNhap', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                maNV: sdt_kh,
                mK: pass_kh,
            })
        })
            .then((response) => response.json())
            .then(data => {
                if (data !== "loginfail") {
                    sendDataToHeader(data);
                    localStorage.setItem("accesstoken", data);

                } else {
                    alert("Sai tên đăng nhập hoặc mật khẩu, vui lòng kiểm tra lại.")
                }

            })
    };
    return (
        <div>
            <button className="btn_ttk" onClick={toggleModal} >
                <b>Đăng ký</b>
            </button>
            <Modal
                isOpen={props.openModalDky}
                onRequestClose={props.closeModalDkyFromHeader}
                style={customStyles}
                contentLabel="Đăng kí"
            >
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: 0 }}>
                        <h4 style={{ marginBlockStart: '0.5em', marginBlockEnd: '0.5em' }}>Đăng Ký Thành Viên</h4>
                        <button onClick={() => { props.closeModalDkyFromHeader() }} className="closeModal">
                            <svg width="22px" height="22px" viewBox="-4 -4 24 24"><line x1="2" x2="14" y1="2" y2="14" stroke-linecap="round" stroke-width="2" stroke="#bec2c9"></line><line x1="2" x2="14" y1="14" y2="2" stroke-linecap="round" stroke-width="2" stroke="#bec2c9"></line></svg>
                        </button>
                    </div>
                    {/* <div style={{height:1,backgroundColor:'grey',marginBottom:5}}></div> */}
                    <div className="modal_dky_khachhang">
                        {/* <div style={{ display: 'flex', flexDirection: 'row' }}> */}
                        <div id="input_container">
                            <Select
                                id="input1"
                                value={diaChi_kh}
                                onChange={(text) => { setDiaChi_KH(text) }}
                                options={options}
                                placeholder="Chọn khu vực"
                                maxMenuHeight={250}
                            />
                        </div>
                        <div id="input_container">
                            <input type="text" value={ten_kh} onChange={text => { setTenKH(text.target.value) }} className="input_modalDK" placeholder="Nhập tên (bắt buộc)" />
                            <img src={dky_user} id="input_img" />
                        </div>
                        <div id="input_container">
                            <input type="tel" value={sdt_kh} onChange={text => { setSdtKH(text.target.value) }} className="input_modalDK" placeholder="Nhập số điện thoại (bắt buộc)" />
                            <img src={dky_phone} id="input_img" />
                            {/* {hienGuiOTP ?
                                <button id="gui_ma_otp" onClick={XacNhanOtp}>
                                    Xác thực
                                </button>
                                : null} */}
                        </div>
                        <Dialog open={openCaptchaDl} onClose={OpenCaptchaDialog}>
                            <DialogContent>
                                <div style={{ justifyContent: 'center' }}>
                                    <div style={{ color: 'red' }}>* Vui lòng tích vào captcha để nhận mã otp</div>
                                    <div id="recaptcha"></div>
                                </div>
                            </DialogContent>
                        </Dialog>
                        {/* {hiencaptcha ?
                            <div style={{ justifyContent: 'center' }}>
                                <div style={{ color: 'red' }}>* Vui lòng tích vào captcha để nhận mã otp</div>
                                <div id="recaptcha"></div>
                            </div>
                            : null} */}
                        {/* <div id="recaptcha"></div> */}
                        {/* </div> */}
                        {/* <div style={{ display: 'flex', flexDirection: 'row' }}> */}
                        {/* <div id="input_container">
                            <input type="email" value={email_kh} onChange={text => { setEmailKH(text.target.value) }} className="input_modalDK" placeholder="Nhập email" />
                            <img src={dky_mail} id="input_img" />
                        </div> */}
                        <div id="input_container">
                            <input type={type_pass_nv} value={pass_kh} onChange={text => { setPassKH(text.target.value) }} className="input_modalDK" placeholder="Nhập mật khẩu ( bắt buộc )" />
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
                            <input type={type_pass_nv} value={pass_kh_conf} onChange={text => { setPassKHConf(text.target.value) }} className="input_modalDK" placeholder="Nhập lại mật khẩu ( bắt buộc )" />
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
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 5, justifyContent: 'center' }}>
                            <input checked={check_dieukhoan} type="checkbox" id="checkbox_dieukhoan" value={check_dieukhoan} onChange={() => { GiaTriDieuKhoan() }} />
                            <label htmlFor="checkbox_dieukhoan" id="solgan_dieukhoan">Tôi đã đọc và đồng ý với&nbsp;</label>
                            <a href="https://thuocsionline.vn/chinh-sach/" target="_blank" id="link_dieukhoan"> Điều khoản sử dụng *</a>
                        </div>
                        <div style={{ marginTop: 7, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                            <div>
                                <input defaultChecked type="radio" id="male1" name="gender" value="Nhà thuốc" onChange={(text) => { setRadio1(text.target.value) }} />
                                <label style={{ marginLeft: 5 }} htmlFor="male1">Nhà thuốc</label>
                            </div>
                            <div>
                                <input style={{ marginLeft: 10 }} type="radio" id="male2" name="gender" value="Phòng khám" onChange={(text) => { setRadio1(text.target.value) }} />
                                <label style={{ marginLeft: 5 }} htmlFor="male2">Phòng khám</label>
                            </div>
                            <div>
                                <input style={{ marginLeft: 10 }} type="radio" id="male3" name="gender" value="Quầy thuốc" onChange={(text) => { setRadio1(text.target.value) }} />
                                <label style={{ marginLeft: 5 }} htmlFor="male3">Quầy thuốc</label>
                            </div>
                            <div style={{ marginTop: 5 }}>
                                <input style={{ marginLeft: 10 }} type="radio" id="male4" name="gender" value="Bệnh Viện" onChange={(text) => { setRadio1(text.target.value) }} />
                                <label style={{ marginLeft: 5 }} htmlFor="male4">Bệnh Viện</label>
                            </div>
                            <div style={{ marginTop: 5 }}>
                                <input style={{ marginLeft: 10 }} type="radio" id="male5" name="gender" value="Công ty dược" onChange={(text) => { setRadio1(text.target.value) }} />
                                <label style={{ marginLeft: 5 }} htmlFor="male5">Công ty dược</label>
                            </div>
                        </div>
                        {/* <button id="btn_dky" onClick={Show_Ten_Input} > */}
                        <button id="btn_dky" onClick={Show_Ten_Input}>
                            <b>Tạo tài khoản</b>
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default ModalKhachHang