// CHÚNG TÔI ĐÃ CỐ GẮNG HẾT SỨC //
import { useState } from 'react';
import dky_user from '../images/dky-user.png';
import '../css/Header.css';
import Modal from 'react-modal';
import Select from 'react-select';
import Dialog from '@material-ui/core/Dialog';
import options_nhanvien from './options_nhanvien.js';
import { API_URL } from '../constants/constants'

// const customStyles = {
//     content: {
//         top: '50%',
//         left: '50%',
//         right: 'auto',
//         bottom: 'auto',
//         marginRight: '-50%',
//         transform: 'translate(-50%, -50%)',
//         borderRadius: '20px',
//         backgroundColor: '#f4f7fc',
//         padding: '25px',
//         position: 'absolute',
//         zIndex: 2
//     },
// };
Modal.setAppElement('#root')
const ModalNhanVien2 = (props) => {
    // const sendData = () => {
    //     props.parentCallback(false);
    // };
    // const [ten, setTen] = useState('Hoàng Nam');
    // const [ten, setTen] = useState('admin');
    const [ten_nv, setTenNV] = useState();
    const [chucVu, setChucVuNV] = useState({ value: '0', label: 'Chọn chức vụ' });
    //check
    const [modalIsOpen, setIsOpen] = useState(false);
    // function openModal(text) {
    //     setIsOpen(true);
    // };
    // function afterOpenModal() {
    // };
    // function closeModal() {
    //     setIsOpen(false)
    // };
    const toggleModal = () => {
        setIsOpen(!modalIsOpen)
    }
    // const Show_Ten_Input = () => {
    //     alert(ten_nv + "-" +sdt_nv + "-" +email_nv + "-" +pass_nv+"-"+chucVu.value)
    // }
    // code cua truong
    const Show_Ten_Input = () => {
        if (ten_nv == undefined || ten_nv == "" || ten_nv == null) {
            alert("Tên trống")
        }
        else {
            if (chucVu.value == undefined || chucVu.value == "" || chucVu.value == 0 || chucVu.value == null) {
                alert("Chức vụ trống")
            } else {
                fetch(API_URL + '/themnv', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        serchucvu: chucVu.value,
                        sertennv: ten_nv,
                    })
                }).then((response) => response.json())
                    .then(data => {
                        alert("Bạn đã thêm nhân viên có mã : " + data)
                        //console.log(data)
                    });
                setIsOpen(false);
            }
        }
    }

    return (
        <div>
            <button onClick={() => { toggleModal() }} className='TK2_btnleft121'>Thêm Nhân Viên</button>
            <Dialog
                open={modalIsOpen}
                onClose={toggleModal}
            >
                <div style={{ padding: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h4>Tạo Nhân Viên</h4>
                        <button onClick={toggleModal} className="closeModal">
                            <svg width="22px" height="22px" viewBox="-4 -4 24 24">
                                <line x1="2" x2="14" y1="2" y2="14" stroke-linecap="round" stroke-width="2" stroke="#bec2c9" />
                                <line x1="2" x2="14" y1="14" y2="2" stroke-linecap="round" stroke-width="2" stroke="#bec2c9" />
                            </svg>
                        </button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', height: 280 }}>
                        <div id="input_container">
                            <Select
                                id="input1"
                                value={chucVu}
                                onChange={(text) => { setChucVuNV(text) }}
                                options={options_nhanvien}
                                placeholder="Chọn chức vụ"
                                maxMenuHeight={250}
                            />
                        </div>
                        <div id="input_container">
                            <input type="text" value={ten_nv} onChange={text => { setTenNV(text.target.value) }} className="input_modal" placeholder="Nhập mã nhân viên (bắt buộc)" />
                            <img src={dky_user} id="input_img" />
                        </div>
                        <button id="btn_dky" onClick={Show_Ten_Input}><b>Tạo tài khoản NV</b></button>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
export default ModalNhanVien2;