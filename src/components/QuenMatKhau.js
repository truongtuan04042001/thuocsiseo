import { useEffect, useState } from 'react';

import Modal from 'react-modal';
import { API_URL } from '../constants/constants'
import firebase from './firebase';




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
const QuenMK = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalDoiMk, setModalMK] = useState(false);
    const [sdt, setSdt] = useState();
    const [mk, setMk] = useState();
    const [hiencaptcha, setCaptCha] = useState(false);
    useEffect(() => {
        Modal.setAppElement('body')
        // if (!firebase.apps.length) {
        //     firebase.initializeApp(firebaseConfig);
        //   }
    }, [])
    useEffect(() => {
        let vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        if (vnf_regex.test(sdt)) {
            fetch(API_URL + '/checksdt', {
                method: 'POST',
                headers: {
                  
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sdt: sdt,
                })
            })
                .then((response) => response.json())
                .then(data => {
                    if (data == '0') {
                        setCaptCha(false);
                        alert("Tài khoản không tồn tại")
                    }
                    else {
                        setCaptCha(true);
                    }
                });
        }
        else {

        }
    }, [sdt]);
    useEffect(() => {
        if (hiencaptcha) {
            console.log(hiencaptcha)
            CaptchaCall();
        }
    }, [hiencaptcha])
    const CaptchaCall = () => {
        var recaptcha = new firebase.auth.RecaptchaVerifier('captcha');
        var number = '+84' + sdt.slice(1, 10);
        firebase.auth().signInWithPhoneNumber(number, recaptcha).then(function (e) {
            var code = prompt("Nhập mã OTP", '');
            e.confirm(code).then(function (result) {
                // alert("Mã otp chính xác")
                setCaptCha(false);
                setModalMK(true);
                setIsOpen(false)
            }).catch(function (error) {
                // console.error(error);
                alert("Lỗi : Mã otp không chính xác vui lòng nhập lại !")
                // setCaptCha(false);

            });
        })
            .catch(function (error) {
                // console.error(error);
                alert(error)
                setCaptCha(false);
            });
    };
    const MKMoi = async () => {
        fetch(API_URL + '/thaydoimatkhau', {
            method: 'POST',
            headers: {
             
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                matkhaucu: 'n3ChQ"Rj5K8S<SY',
                matkhau: mk,
                key: sdt
            })
        })
            .then((response) => response.json())
            .then(data => {

            });
        alert('Thay đổi thành công');
        setModalMK(false);
        setMk();
        setSdt();
    };
    const toggleModal = () => {
        setIsOpen(!modalIsOpen);
        setSdt();
    }
    const toggleModalMK = () => {
        setModalMK(!modalDoiMk);
    }
    return (
        <div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 15 }}>
                <button id="btn_quenmk" onClick={toggleModal}><b>Quên Mật Khẩu ?</b></button>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={toggleModal}
                style={customStyles}
                contentLabel="Quên mật khẩu"
            >
                <div style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h4>Khôi phục mật khẩu</h4>
                        <button onClick={toggleModal} className="closeModal">
                            <svg width="22px" height="22px" viewBox="-4 -4 24 24"><line x1="2" x2="14" y1="2" y2="14" stroke-linecap="round" stroke-width="2" stroke="#bec2c9"></line><line x1="2" x2="14" y1="14" y2="2" stroke-linecap="round" stroke-width="2" stroke="#bec2c9"></line></svg>
                        </button>
                    </div>
                    <hr></hr>
                    <div>
                        <div>Nhập số điện thoại cần khôi phục</div>
                        <div id="input_container">
                            <input style={{ fontSize: 18 }} type="text" value={sdt} onChange={text => { setSdt(text.target.value) }} className="input_modalMK" placeholder="Nhập Số Điện Thoại" />
                        </div>
                        {hiencaptcha ?
                            <div style={{ justifyContent: 'center' }}>
                                <div style={{ color: 'red' }}>* Vui lòng tích vào captcha để nhận mã otp</div>
                                <div id="captcha"></div>
                            </div>
                            : null}
                        {/* <button id="btn_gui" onClick={toggleModal} >
                            <b>
                                Gửi
                            </b>
                        </button> */}
                    </div>
                </div>
            </Modal>
            <Modal
                isOpen={modalDoiMk}
                onRequestClose={toggleModalMK}
                style={customStyles}
                contentLabel="Thay đổi mật khẩu"
            >
                <div style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h4>Thay đổi mật khẩu</h4>
                        <button onClick={toggleModalMK} className="closeModal">
                            <svg width="22px" height="22px" viewBox="-4 -4 24 24"><line x1="2" x2="14" y1="2" y2="14" stroke-linecap="round" stroke-width="2" stroke="#bec2c9"></line><line x1="2" x2="14" y1="14" y2="2" stroke-linecap="round" stroke-width="2" stroke="#bec2c9"></line></svg>
                        </button>
                    </div>
                    <hr></hr>
                    <div>
                        <div>Nhập mật khẩu mới</div>
                        <div id="input_container">
                            <input type="text" value={mk} onChange={text => { setMk(text.target.value) }} className="input_modal" placeholder="Nhập mật khẩu mới" />
                        </div>
                    </div>
                    <button id="btn_gui" onClick={MKMoi}><b>Gửi</b></button>
                </div>
            </Modal>
        </div>
    );
};
export default QuenMK;