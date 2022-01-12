// CHÚNG TÔI ĐÃ CỐ GẮNG HẾT SỨC //
import { useState } from 'react';
import close_modal from '../images/close-modal.png';
import dky_phone from '../images/dky-phone.png';
import dky_mail from '../images/dky-mail.png';
import dky_pass from '../images/dky-pass.png';
import show_pass from '../images/show-pass.png';
import '../css/Header.css';
import Modal from 'react-modal';
// truong
import { API_URL } from '../constants/constants'

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
const ModalNhanVien = (props) => {
    // const sendData = () => {
    //     props.parentCallback(false);
    // };
    // const [ten_nv, setTenNV] = useState();
    const [sdt_nv, setSdtNV] = useState();
    const [email_nv, setEmailNV] = useState();
    const [cCCD_nv, setCCCD_nv] = useState()
    const [ngSinh_nv, setNgSinh_nv] = useState()
    const [diaChi_nv, setDiaChi_nv] = useState()
    const [pass_nv, setPassNV] = useState();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [type_pass_nv, setTypePassNV] = useState('password');
    const toggleModal = () => {
        setIsOpen(!modalIsOpen)
    }
    const Show_Ten_Input = () => {
        let vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // if (ten_nv == undefined || ten_nv == "" || ten_nv == null) {
        //     alert("Tên trống")
        // } else {
        if (sdt_nv == undefined || sdt_nv == "" || sdt_nv == null) {
            alert("Số điện thoại trống")
        } else {
            if (!vnf_regex.test(sdt_nv)) {
                alert("Số điện thoại không hợp lệ")
            } else {
                if (email_nv == undefined || email_nv == "" || email_nv == null) {
                    alert("Email trống")
                } else {
                    if (!regEmail.test(email_nv)) {
                        alert("Email không hợp lệ")
                    } else {
                        if (pass_nv == undefined || pass_nv == "" || pass_nv == null) {
                            alert("Mật khẩu trống")
                        } else {
                            if (pass_nv.length < 9) {
                                alert("Mật khẩu quá ngắn")
                            } else {
                                const requestOptions = {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                        // ChucVu: chucVu.value,
                                        // TenNV: ten_nv,
                                        SDT: sdt_nv,
                                        Email: email_nv,
                                        MK: pass_nv,
                                    })
                                }
                                fetch(API_URL + "/nhanvien", requestOptions)
                                    .then(response => response.json())
                                    .then(data => console.log("OK" + data))
                            }
                        }
                    }
                }
            }
        }
        // }
    }

    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={toggleModal}
                style={customStyles}
                contentLabel="Đăng kí"
            >
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h4>Bổ sung thông tin NV</h4>
                        <button onClick={toggleModal} className="closeModal">
                            <img width="24" src={close_modal}></img>
                        </button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', height: 420 }}>
                        <div id="input_container">
                            <input type="tel" value={sdt_nv} onChange={text => { setSdtNV(text.target.value) }} className="input" placeholder="Nhập số điện thoại (bắt buộc)" />
                            <img src={dky_phone} id="input_img" />
                        </div>
                        <div id="input_container">
                            <input type="text" value={email_nv} onChange={text => { setEmailNV(text.target.value) }} className="input" placeholder="Nhập email" />
                            <img src={dky_mail} id="input_img" />
                        </div>
                        <div id="input_container">
                            <input type="text" value={cCCD_nv} onChange={text => { setCCCD_nv(text.target.value) }} className="input" placeholder="Nhập CCCD" />
                            <img src={dky_mail} id="input_img" />
                        </div>
                        <div id="input_container">
                            <input type="text" value={ngSinh_nv} onChange={text => { setNgSinh_nv(text.target.value) }} className="input" placeholder="Nhập ngày sinh" />
                            <img src={dky_mail} id="input_img" />
                        </div>
                        <div id="input_container">
                            <input type="text" value={diaChi_nv} onChange={text => { setDiaChi_nv(text.target.value) }} className="input" placeholder="Nhập đại chỉ" />
                            <img src={dky_mail} id="input_img" />
                        </div>
                        <div id="input_container">
                            <input type={type_pass_nv} onChange={text => { setPassNV(text.target.value) }} className="input" placeholder="Nhập mật khẩu mới (bắt buộc)" />
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
                            <input type={type_pass_nv} onChange={text => { setPassNV(text.target.value) }} className="input" placeholder="Nhập lại mật khẩu mới (bắt buộc)" />
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

                        <button id="btn_dky" onClick={Show_Ten_Input}><b>Hoàn thành thông tin NV</b></button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default ModalNhanVien