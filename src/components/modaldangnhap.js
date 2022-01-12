import { useEffect, useState } from 'react';
import close_modal from '../../public/images/close-modal.png';
import dky_user from '../../public/images/dky-user.png';
import dky_phone from '../../public/images/dky-phone.png';
import dky_mail from '../../public/images/dky-mail.png';
import dky_pass from '../../public/images/dky-pass.png';
import dky_location from '../../public/images/dky-location.png';
import show_pass from '../../public/images/show-pass.png';
import { API_URL } from '../constants/constants'
// import QuenMK from './QuenMatKhau';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';

toast.configure()

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
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalThongTinNV, setModalThongTinNV] = useState(false)
    const [type_pass_nv, setTypePassNV] = useState('password');
    const [popup_check, setPopupCheck] = useState(false);
    const [check_dieukhoan, setDieuKhoan] = useState(false);
    const sendDataToHeader = (tenNV) => {
        props.callBackParent(tenNV);
    }
    const toggleModal = () => {
        props.OPModalDN(true)
    }
    const closeModal = () => {
        props.OPModalDN(false)
    }
    const toggleModalThongTinNV = () => {
        setModalThongTinNV(!modalThongTinNV)
    }
    const GiaTriDieuKhoan = () => {
        setDieuKhoan(!check_dieukhoan);
    }
    // Login
    const ghiNhoDangNhap = () => {
        var abc = localStorage.getItem("accesstoken");
        if (abc !== null) {
            sendDataToHeader(localStorage.getItem("accesstoken"));
        } 
        // else {
        //     toggleModal()
        // }
    }
    
    useEffect(() => {
        ghiNhoDangNhap();
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
                await fetch(API_URL + '/dangNhap', {
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
                            closeModal();
                            sendDataToHeader(data);
                            localStorage.setItem("accesstoken", data);
                            notify();
                            // notifyVoucher();
                            
                        } else {
                            alert("Sai tên đăng nhập hoặc mật khẩu, vui lòng kiểm tra lại.")
                        }

                    })
                //if (nhanVien[0].ChucVu !== -1) {
                //    setIsOpen(false);
                //    if (nhanVien[0].Info == 0) {
                //        toggleModalThongTinNV()
                //        // console.log(new Date().getTime() + " thongTinNhanVien= " + JSON.stringify(nhanVien))
                //    } else {

                //        // localStorage.setItem("inf-thuocsi", ten_nv);
                //        // if(check_dieukhoan){
                //        //localStorage.setItem("user-inf", ten_nv);
                //       // localStorage.setItem("chucVu", nhanVien[0].ChucVu);
                //        // }
                //    }
                //} else {
                //    alert("Sai tên đăng nhập hoặc mật khẩu, vui lòng kiểm tra lại.")
                //}
            }
        }
    }
    // const handleKeyPress = (event) => {
    //     if (event.key === 'Enter') {
    //         dangNhap()
    //         console.log('enter press here! ')
    //     }
    // }
    // end login
    //  code lụi mà nó hiểu, vl thật =)) này thì enter thì tự động chọn có hả, chuyện này OK =)))
    const testKey = (e) => {
        if (e.code === "Enter") {
            // alert("OK ENTER")
            dangNhap()
        }
    }
    const thongTinNhanVien = async () => {
        // console.log(new Date().getTime() + " thongTinNhanVien= " + JSON.stringify(nhanVien))
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
                                                sendDataToHeader();
                                                localStorage.setItem("user-inf", ten_nv);
                                                localStorage.setItem("chucVu", nhanVien[0].ChucVu);
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
    const notify = () => {
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
    const notifyVoucher = () => {
        toast.success('Bạn được tặng 1 mã giảm giá', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    return (
        <div>
            <button onClick={() => { toggleModal() }} className='btn_test'><b>Đăng Nhập</b></button>
            <Modal
                isOpen={props.valueOfModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Đăng kí"
            >
                <div>
                    <button onClick={closeModal} className="closeModal2">
                        <svg width="22px" height="22px" viewBox="-4 -4 24 24"><line x1="2" x2="14" y1="2" y2="14" stroke-linecap="round" stroke-width="2" stroke="#bec2c9"></line><line x1="2" x2="14" y1="14" y2="2" stroke-linecap="round" stroke-width="2" stroke="#bec2c9"></line></svg>
                    </button>
                    <br></br>
                    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                        <p className='thongbao_dangnhap'>Chào mừng quý khách đã đến với thuocsionline.vn. <br/> Quý khách vui lòng ĐĂNG KÝ nếu chưa có tài khoản tại trang web. <br/> Quý khách vui lòng ĐĂNG NHẬP để tra cứu thông tin và đặt hàng. <br/> Quý khách có thể tải APP để tiện đặt hàng và theo dõi đơn. <br/> Số điện thoại hỗ trợ: 0844 404047. <br/> Trân trọng!</p>
                        {/* <p className='thongbao_dangnhap'>Vui lòng đăng nhập trước khi thao tác !</p> */}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', textAlign: 'center' }}>
                        <h3 style={{ margin: 'auto' }}>Đăng Nhập</h3>

                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', height: 270 }}>
                        <div id="input_container">
                            <input type="number" value={ten_nv} onKeyPress={(e) => testKey(e)} onChange={text => { setTenNV(text.target.value) }} className="input_modal input_modal_dn" placeholder="Nhập Số Điện Thoại" />
                            <img src={dky_user} id="input_img" />
                        </div>
                        <div id="input_container">
                            <input type={type_pass_nv} value={pass_nv} onKeyPress={(e) => testKey(e)} onChange={text => { setPassNV(text.target.value) }} className="input_modal input_modal_dn" placeholder="Nhập mật khẩu" />
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
                        {/* <div style={{ display: 'flex', flexDirection: 'row', marginTop: 15 }}>
                            <input type="checkbox" id="checkbox_dieukhoan" value={check_dieukhoan} onChange={GiaTriDieuKhoan} />
                            <label htmlFor="checkbox_dieukhoan" id="title_ghinho_dnhap">Ghi nhớ đăng nhập</label>
                        </div> */}
                        {/* <ModalKhachHang/> */}
                        {/* <QuenMK></QuenMK> */}
                        <button id="btn_dky" onClick={dangNhap}><b>Đăng nhập</b></button>

                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                        <div style={{ textAlign: 'center' }}>
                            <div className="title_dky">Để nhận Ưu đãi hấp dẫn,
                                <button onClick={() => { props.openModalDkyFromHeader() }} className="btn_dky">Đăng kí thành viên</button>
                            </div>

                        </div>
                    </div>
                </div>
            </Modal>
            <Modal
                isOpen={modalThongTinNV}
                onRequestClose={toggleModalThongTinNV}
                style={customStyles}
                contentLabel="Thông tin NV"
            >
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: 400 }}>
                        <h4>Bổ sung thông tin NV</h4>
                        <button onClick={toggleModalThongTinNV} className="closeModal"><img width="24" src={close_modal}></img></button>
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
export default ModalDangNhap;