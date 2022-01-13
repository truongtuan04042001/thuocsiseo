import { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';

import Modal from 'react-modal';

import { API_URL } from '../src/constants/constants'
import Select from 'react-select';
import options from '../src/components/options';
import { useRouter } from 'next/router'
const ThongTinTaiKhoan = () => {
 
    const [tendangnhap, setTenDangNhap] = useState();
    const [data, setData] = useState();
    const [HovaTen, setHovaTen] = useState();
    const [Sdt, setSdt] = useState();
    const [Email, setEmail] = useState();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [MkCu, setMKCU] = useState();
    const [MKMoi, setMKMoi] = useState();
    const [type_pass_nv, setTypePassNV] = useState('password');
    const [MKMoiConf, setMKMoiConf] = useState();
    const [type_pass_Conf, setTypePassConf] = useState('password');
    const [LoaiDN, setLoaiDn] = useState();
    const [TenDN, setTenDn] = useState();
    const [TenDaiDien, setTenDD] = useState();
    const [MaThue, setMaThue] = useState();
    const [SDTDoanhNghiep, setSDTDoanhNghiep] = useState();
    const [DiaChiDN, setDiaChiDN] = useState();
    const [PhuongXaDN, setPhuongXaDN] = useState();
    const [TinhDN, setTinhDN] = useState({ value: 'null', label: 'Chọn khu vực' });
    const router = useRouter()
    const Modal_ThayDoiMK = () => {
        setIsOpen(!modalIsOpen)
    }

    useEffect(async () => {
        await fetch(API_URL + '/thongtintaikhoan', {
            method: 'POST',
            headers: {
                Accept: 'application/json',

                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                test: localStorage.getItem("accesstoken")
            })
        })
            .then((response) => response.json())
            .then(data => {
                // console.log(data)
                setData(data);
                // setHovaTen(Object.values(data[0]));
                if (data == "token not accepted") {
                    localStorage.removeItem("accesstoken")
                    router.push("/")
                } else if (data[0] !== undefined) {
                    setHovaTen(data[0].TenNV);
                    setSdt(data[0].SDT);
                    if (data[0].Email != 'undefined' && data[0].Email != 'null') {
                        setEmail(data[0].Email);
                    }
                    setTenDangNhap(data[0].MaNV);
                    setDiaChiDN(data[0].DiaChi);
                    if (data[0].PhuongXa != 'undefined') {
                        setPhuongXaDN(data[0].PhuongXa);
                    }
                    setTinhDN({ value: data[0].KhuVuc, label: data[0].KhuVuc });
                } else {
                    console.log("loi tttk")
                }
            })
    }, []);

    useEffect(async () => {
        await fetch(API_URL + '/doanhnghiep', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                key: localStorage.getItem("accesstoken"),
            })
        })
            .then((response) => response.json())
            .then(data => {
                // setData(data);
                // setHovaTen(Object.values(data[0]));
                if (data[0] !== undefined) {
                    setLoaiDn(data[0].LoaiDN);
                    setTenDn(data[0].TenDN);
                    setTenDD(data[0].TenDaiDien);
                    if (data[0].SDTDN != 'null' && data[0].SDTDN != 'undefined') {
                        setSDTDoanhNghiep(data[0].SDTDN);
                    }
                    setMaThue(data[0].MaThue);

                }
            })
    }, []);

    const ThayDoiMatKhau = async () => {
        if (MkCu != undefined || MkCu != null || MkCu != "") {
            if (MKMoi != undefined || MKMoi != null || MKMoi != "") {
                if (MKMoi.length >= 9) {
                    if (MKMoi == MKMoiConf) {
                        await fetch(API_URL + '/thaydoimatkhau', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                matkhaucu: MkCu,
                                matkhau: MKMoi,
                                key: tendangnhap
                            })
                        })
                            .then((response) => response.json())
                            .then(data => {
                                if (data == '1') {
                                    alert('Thay đổi thành công');
                                    setIsOpen(false);
                                    setMKCU();
                                    setMKMoi();
                                    localStorage.removeItem('accesstoken');
                                    window.location.replace("http://thuocsionline.vn/")
                                }
                                else if (data == '0') {
                                    alert('Mật khẩu hiện tại không đúng');
                                }
                            });
                    }
                    else {
                        alert("Mật khẩu mới không trùng với mật khẩu nhập lại")
                    }
                }
                else {
                    alert("Mật khẩu mới quá ngắn")
                }
            }
            else {
                alert("Mật khẩu mới trống")
            }
        }
        else {
            alert("Mật khẩu hiện tại trống")
        }
    };
    const CapNhatThongTin = async () => {
        let vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        let regEmail = /(^\s*$|^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(?:[a-zA-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)$)/;
        // alert(LoaiDN+'/'+TenDN+'/'+TenDaiDien+'/'+MaThue+'/'+DiaChiDN+'/'+PhuongXaDN+'/'+TinhDN.value)
        if (HovaTen != "" && HovaTen != undefined) {
            if (Sdt != "" && Sdt != undefined) {
                if (vnf_regex.test(Sdt)) {
                    // if (regEmail.test(Email)) {
                    if (Sdt != tendangnhap) {
                        alert('Số điện thoại đã bị thay đổi ,  yêu cầu đăng nhập lại')
                    }
                    if (MaThue != "" && MaThue != undefined && MaThue != 'null') {
                        if (DiaChiDN != "" && DiaChiDN != undefined) {
                            if (PhuongXaDN != "" && PhuongXaDN != undefined) {
                                if (TinhDN.value != "" && TinhDN.value != undefined && TinhDN.value != 'null') {
                                    await fetch(API_URL + '/capnhatthongtin', {
                                        method: 'POST',
                                        headers: {
                                            Accept: 'application/json',
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            ten_kh: HovaTen,
                                            sdt_kh: Sdt,
                                            email_kh: Email,
                                            diachi: DiaChiDN,
                                            phuongxa: PhuongXaDN,
                                            tinh: TinhDN.value,
                                            key: tendangnhap
                                        })
                                    })
                                        .then((response) => response.json())
                                        .then(data => {
                                            if (data == '1') {
                                                alert("Số điện thoại đã tồn tại")
                                            }
                                            else {
                                                alert('Thay đổi thành công');
                                                window.scrollTo(0, 0);
                                                window.location.reload();
                                                if (Sdt != tendangnhap) {
                                                    fetch(API_URL + '/SuadonHangMaKhach', {
                                                        method: 'POST',
                                                        headers: {
                                                            Accept: 'application/json',
                                                            'Content-Type': 'application/json'
                                                        },
                                                        body: JSON.stringify({
                                                            MaCu: tendangnhap,
                                                            MaMoi: Sdt,
                                                        })
                                                    })
                                                        .then((response) => response.json())
                                                        .then(data => { });

                                                    localStorage.removeItem("accesstoken");
                                                    window.location.replace("http://thuocsionline.vn/")
                                                }

                                            }
                                        });
                                    await fetch(API_URL + '/thongtindoanhnghiep', {
                                        method: 'POST',
                                        headers: {
                                            Accept: 'application/json',
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            loaidn: LoaiDN,
                                            tendn: TenDN,
                                            tendd: TenDaiDien,
                                            sdtdn: SDTDoanhNghiep,
                                            mathue: MaThue,
                                            diachi: DiaChiDN,
                                            phuongxa: PhuongXaDN,
                                            tinh: TinhDN.value,
                                            key: tendangnhap
                                        })
                                    })
                                        .then((response) => response.json())
                                        .then(data => {
                                            // alert('123');
                                        });

                                }
                                else {
                                    alert("Tỉnh/Thành phố chưa điền");
                                }
                            }
                            else {
                                alert("Phường xã chưa điền");
                            }
                        }

                        else {
                            alert("Địa chỉ giao hàng chưa điền");
                        }
                    }
                    else {
                        alert("Mã thuế của doanh nghiệp trống");
                    }
                    // } else {
                    //     alert('Không đúng định dạng email');
                    // }
                } else {
                    alert('Không đúng định dạng số điện thoại');
                }
            } else {
                alert('Số điện thoại trống');
            }
        } else {
            alert('Họ và tên trống');
        }
    };
    //

    const MaNVvalue = (value) => {
        // setmaNV(value)
        // setTimeout(() => {
        //     setmaNV(value)
        //     getGioHangRedis(data, 0, value)
        // }, 10);
    }

    return (
        <div className='div_body'>
            <Header MaNVvalue={MaNVvalue}  ></Header>
            <div className='div_khung'>

                <div className='div_trai'>
                    <div style={{ paddingBottom: '20px' }}>Tài khoản của<h4 className='h4_ten'>{HovaTen}</h4></div>
                    <ul className='ul_style' role='menu'>
                        <a className='a_style' href='/ThongTinTaiKhoan'>
                            <li className='li_styleTT'>
                                <svg className='TTTK_svg'>
                                    <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'></path>
                                </svg>
                                Thông tin tài khoản
                            </li>
                        </a>
                        <a className='a_style' href='/DonHangCuaToi'>
                            <li className='li_styleDH'>
                                <svg className='TTTK_svg'>
                                    <path d='M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z'></path>
                                </svg>
                                Đơn hàng của tôi
                            </li>
                        </a>
                        <a className='a_style' href='/DiemTichLuy'>
                            <li className='li_styleDTL'>
                                <svg className='TTTK_svg'>
                                    <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z'></path>
                                </svg>
                                Điểm tích lũy
                            </li>
                        </a>
                    </ul>
                </div>
                <div className='div_phai'>
                    <div className='txt_capnhat'>Cập Nhật Hồ Sơ</div>
                    <div className='k_thongtin'>
                        <h2 className='title'>Thông tin tài khoản</h2>
                        <div className='k_input'>
                            <div className='k_form'>
                                <label className='label'><b>Họ tên khách hàng </b></label>
                                <span style={{ color: 'red' }}> *</span>
                            </div>
                            <input className='tk_input' value={HovaTen} onChange={text => { setHovaTen(text.target.value) }}></input>
                        </div>
                        <div className='k_input'>
                            <div className='k_form'>
                                <label className='label'><b>Số Điện Thoại</b></label>
                                <span style={{ color: 'red' }}> *</span>
                            </div>
                            <input className='tk_input' value={Sdt} onChange={text => { setSdt(text.target.value) }}></input>
                        </div>
                        <div className='k_input'>
                            <div className='k_form'>
                                <label className='label'><b>Email</b></label>
                            </div>
                            <input placeholder="Email ( không bắt buộc )" className='tk_input' value={Email} onChange={text => { setEmail(text.target.value) }}></input>
                        </div>
                        <div className='k_diachi'>
                            <div className='k_inputdiachi'>
                                <div className='k_form'>
                                    <label className='label'><b>Địa chỉ giao hàng</b></label>
                                    <span style={{ color: 'red' }}> *</span>
                                </div>
                                <input placeholder='Địa chỉ giao hàng ( bắt buộc )' value={DiaChiDN} onChange={text => { setDiaChiDN(text.target.value) }} className='tk_inputdiachi'></input>
                            </div>
                            <div className='k_inputdiachi'>
                                <div className='k_form'>
                                    <label className='label'><b>Phường / Xã / Huyện</b></label>
                                    <span style={{ color: 'red' }}> *</span>
                                </div>
                                <input placeholder='Phường / Xã / Huyện ( bắt buộc )' value={PhuongXaDN} onChange={text => { setPhuongXaDN(text.target.value) }} className='tk_inputdiachi'></input>
                            </div>
                            <div className='k_tinhTP'>
                                <div className='k_form'>
                                    <label className='label'><b>Tỉnh/Thành phố</b></label>
                                    <span style={{ color: 'red' }}> *</span>
                                </div>
                                <div className='khungchua_select'>
                                    <Select
                                        class="input1"
                                        value={TinhDN}
                                        onChange={(text) => { setTinhDN(text) }}
                                        options={options}
                                        placeholder="Chọn khu vực"
                                        maxMenuHeight={250}
                                    />
                                </div>
                            </div>
                        </div>
                        <div style={{ padding: '7px' }}>
                            <button className='bt_doimk'
                                onClick={() => { Modal_ThayDoiMK() }}>Thay đổi mật khẩu
                            </button>
                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={Modal_ThayDoiMK}
                                className="modal_khungnoidung"
                            >
                                <div>
                                    <div className='modal_header'>
                                        <header className='modal_title'>Thay đổi mật khẩu</header>
                                    </div>
                                    <div className='modal_content'>
                                        <input
                                            className='modal_input'
                                            type="password"
                                            placeholder="Mật khẩu hiện tại"
                                            value={MkCu}
                                            onChange={text => { setMKCU(text.target.value) }}>
                                        </input>
                                        <div className='modal_forminput'>
                                            <div>
                                                <svg className='svg_icon' viewBox='0 0 24 24'>
                                                    <path d='M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z'></path>
                                                </svg>
                                            </div>
                                            <input
                                                className='modal_input2'
                                                type={type_pass_nv}
                                                placeholder="Mật khẩu mới"
                                                value={MKMoi}
                                                onChange={text => { setMKMoi(text.target.value) }}>
                                            </input>
                                            <button style={{ border: 'none', cursor: 'pointer', backgroundColor: 'rgb(255, 255, 255)' }}
                                                onClick={() => {
                                                    if (type_pass_nv == "password") {
                                                        setTypePassNV("text")
                                                    } else {
                                                        setTypePassNV("password")
                                                    }
                                                }}>
                                                <svg className='svg_icon' viewBox='0 0 24 24'>
                                                    <path d='M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z'></path>
                                                </svg>
                                            </button>
                                        </div>
                                        <div className='modal_forminput'>
                                            <div>
                                                <svg className='svg_icon' viewBox='0 0 24 24'>
                                                    <path d='M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z'></path>
                                                </svg>
                                            </div>
                                            <input
                                                className='modal_input2'
                                                type={type_pass_Conf}
                                                placeholder="Nhập lại mật khẩu mới"
                                                value={MKMoiConf}
                                                onChange={text => { setMKMoiConf(text.target.value) }}>
                                            </input>
                                            <button style={{ border: 'none', cursor: 'pointer', backgroundColor: 'rgb(255, 255, 255)' }}
                                                onClick={() => {
                                                    if (type_pass_Conf == "password") {
                                                        setTypePassConf("text")
                                                    } else {
                                                        setTypePassConf("password")
                                                    }
                                                }}>
                                                <svg className='svg_icon' viewBox='0 0 24 24'>
                                                    <path d='M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z'></path>
                                                </svg>
                                            </button>
                                        </div>
                                        <button className='modal_button' onClick={ThayDoiMatKhau}>Gửi</button>
                                    </div>
                                </div>
                            </Modal>
                        </div>
                    </div>
                    <br></br>
                    <div className='k_thongtin'>
                        <h2 className='title'>Thông tin doanh nghiệp</h2>
                        <div className='k_chuattdn'>
                            <div className='k_banla'>
                                <div className='k_form'>
                                    <label className='label'><b>Bạn là</b></label>
                                </div>
                                {/* <input value={LoaiDN} onChange={text => { setLoaiDn(text.target.value) }} className='tk_input_TTDN'></input> */}
                                <select value={LoaiDN} className='tk_input_TTDN' onChange={text => { setLoaiDn(text.target.value) }}>
                                    <option value="Nhà thuốc">Nhà thuốc</option>
                                    <option value="Phòng khám">Phòng khám</option>
                                    <option value="Quầy thuốc">Quầy thuốc</option>
                                    <option value="Bệnh Viện">Bệnh Viện</option>
                                    <option value="Công ty dược">Công ty dược</option>
                                </select>
                            </div>
                            <div className='k_tennhathuoc'>
                                <div className='k_form'>
                                    <label className='label'><b>Tên nhà thuốc/phòng khám</b></label>
                                </div>
                                <input placeholder="Tên nhà thuốc" value={TenDN} onChange={text => { setTenDn(text.target.value) }} className='tk_input_TTDN'></input>
                            </div>
                        </div>
                        <div className='k_input'>
                            <div className='k_form'>
                                <label className='label'><b>Tên người đại diện pháp luật</b></label>
                            </div>
                            <input placeholder="Tên người đại diện" value={TenDaiDien} onChange={text => { setTenDD(text.target.value) }} className='tk_input'></input>
                        </div>
                        <div className='k_input'>
                            <div className='k_form'>
                                <label className='label'><b>Số điện thoại doanh nghiệp</b></label>
                            </div>
                            <input placeholder='Số điện thoại doanh nghiệp' value={SDTDoanhNghiep} onChange={text => { setSDTDoanhNghiep(text.target.value) }} className='tk_input'></input>
                        </div>
                        <div className='k_input'>
                            <div className='k_form'>
                                <label className='label'><b>Mã thuế</b></label>
                            </div>
                            <input placeholder='Mã thuế' value={MaThue} onChange={text => { setMaThue(text.target.value) }} className='tk_input'></input>
                        </div>
                        {/* <div className='k_diachi'>
                            <div className='k_inputdiachi'>
                                <div className='k_form'>
                                    <label className='label'><b>Địa chỉ nhà thuốc/phòng khám</b></label>
                                    <span style={{ color: 'red' }}> *</span>
                                </div>
                                <input placeholder='Địa chỉ ( bắt buộc )' value={DiaChiDN} onChange={text => { setDiaChiDN(text.target.value) }} className='tk_inputdiachi'></input>
                            </div>
                            <div className='k_inputdiachi'>
                                <div className='k_form'>
                                    <label className='label'><b>Phường / Xã / Huyện</b></label>
                                    <span style={{ color: 'red' }}> *</span>
                                </div>
                                <input placeholder='Phường / Xã / Huyện ( bắt buộc )' value={PhuongXaDN} onChange={text => { setPhuongXaDN(text.target.value) }} className='tk_inputdiachi'></input>
                            </div>
                            <div className='k_tinhTP'>
                                <div className='k_form'>
                                    <label className='label'><b>Tỉnh/Thành phố</b></label>
                                    <span style={{ color: 'red' }}> *</span>
                                </div>
                                <div className='khungchua_select'>
                                    <Select
                                        class="input1"
                                        value={TinhDN}
                                        onChange={(text) => { setTinhDN(text) }}
                                        options={options}
                                        placeholder="Chọn khu vực"
                                        maxMenuHeight={250}
                                    />
                                </div>
                            </div>
                        </div> */}
                    </div>
                    <br></br>
                    <div style={{ width: '100%', textAlign: 'center' }}>
                        <button className='bt_submit' onClick={CapNhatThongTin}><b>Cập nhật</b></button>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}
export default ThongTinTaiKhoan;