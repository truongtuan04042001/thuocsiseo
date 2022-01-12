import nav_menu from '../images/nav-menu.png';
import menu_tag from '../images/tag-menu.png';
import menu_home from '../images/home-menu.png';
import menu_chinhsach from '../images/policy-menu.png';
import Article from '../images/Article.png';
import Recommend from '../images/recommend.png';
import Aboutus from '../images/aboutus.png';
import React from 'react'
import { useState } from 'react';
import {useHistory } from 'react-router-dom';
import '../css/Header.css';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import DanhMucMobile from './DanhMucMobile';
import sale from '../images/sale.png';
import get_a_discount from '../images/get-a-discount.png';
import fast_cart from '../images/fast-cart.png';

const customStyles = {
    content: {
        top: '0px',
        left: '-1%',
        right: '15%',
        // bottom: 'auto',
        // marginRight: '-50%',
        // transform: 'translate(-50%, -50%)',
        // borderRadius: '20px',
        // backgroundColor: '#39962f',
        backgroundImage: "linear-gradient(to right, green, #019CAD)",
        padding: '25px',
        height: window.innerHeight - 50,
        // position : 'absolute',
        border: 'none',
        boxShadow: "10px 3px 10px rgba(0, 0, 0, 0.08)",
    },

};
Modal.setAppElement('#root');

const NavMenu = (props) => {
    const [check_screen, setCheckScreen] = useState();
    const history = useHistory();

    const tatModal = () => {
        setCheckScreen(!check_screen);
    }
    const LayGiaTriDanhMuc = (childData) => {
        if (childData != null || childData != undefined) {
            props.parentCallback(childData);
        }
        tatModal();
    };
    const DanhMucTuTrangChu = (childData) => {
        localStorage.setItem("Searchfromtc", childData);
        history.push("/SanPham")
    };

    const chuyenTrangTaiAppAndroid = () => {
        window.location.replace("https://play.google.com/store/apps/details?id=com.Thuocsionline.Thuocsionlinevn")
    }

    return (
        <div>
            <div>
                <div className="btn-nav-parent">
                    <button id="btn-nav" onClick={tatModal}>
                        <img width='20' height='20' src={nav_menu}></img>
                    </button>
                </div>

                <div>
                    <Modal
                        isOpen={check_screen}
                        // onAfterOpen={afterOpenModal}
                        onRequestClose={tatModal}
                        style={customStyles}
                        contentLabel="Đăng kí"
                    >
                        <div className="small_screen_nav">
                            <button onClick={tatModal} className="closeModal_login">
                                <svg width="22px" height="22px" viewBox="-4 -4 24 24"><line x1="2" x2="14" y1="2" y2="14" stroke="#fff"></line><line x1="2" x2="14" y1="14" y2="2" stroke="#fff"></line></svg>
                            </button>
                            <Link to='/' className="menu-a1" style={{ textDecoration: 'none' }}>
                                <img width='20' height='20' src={menu_home}></img>
                                <div id="san_pham1">Trang Chủ</div>
                            </Link>
                            <Link to='/SanPham' className="menu-a1" style={{ textDecoration: 'none' }}>
                                <img width='20' height='20' src={menu_tag}></img>
                                <div id="san_pham1">Sản Phẩm</div>
                            </Link>
                            <Link to='/DatHangNhanh' className="menu-a1" style={{ textDecoration: 'none' }}>
                                <img width='20' height='20' src={fast_cart}></img>
                                <div id="san_pham1">Đặt hàng nhanh</div>
                            </Link>
                            <Link to='/MaGiamGia' className="menu-a1" style={{ textDecoration: 'none' }}>
                                <img width='20' height='20' src={get_a_discount}></img>
                                <div id="san_pham1">Mã giảm giá / Quà tặng</div>
                            </Link>
                            <Link to='/KhuyenMai' className="menu-a1" style={{ textDecoration: 'none' }}>
                                <img width='20' height='20' src={sale}></img>
                                <div id="san_pham1">Khuyến mãi</div>
                            </Link> 
                              {/* <Link to='/Aboutus' className="menu-a1" style={{ textDecoration: 'none' }}>
                                <img width='20' height='20' src={Aboutus}></img>
                                <div id="san_pham1">About us</div>
                            </Link>  
                             <Link to='/Introduce' className="menu-a1" style={{ textDecoration: 'none' }}>
                                <img width='20' height='20' src={Recommend}></img>
                                <div id="san_pham1">Giới thiệu</div>
                            </Link>   
                            <Link to='/Article' className="menu-a1" style={{ textDecoration: 'none' }}>
                                <img width='20' height='20' src={Article}></img>
                                <div id="san_pham1">Tin tức</div>
                            </Link> */}
                            <Link onClick={chuyenTrangTaiAppAndroid} className="menu-a1" style={{ textDecoration: 'none' }}>
                                <img width='20' height='20' src={menu_chinhsach}></img>
                                <div id="san_pham1">Tải App dành cho Android</div>
                            </Link>
                
                            {window.location.pathname == "/SanPham"
                                ?
                                <DanhMucMobile parentCallback={LayGiaTriDanhMuc} />
                                : null
                            }
                            {window.location.pathname == "/"
                                ?
                                <DanhMucMobile parentCallback={DanhMucTuTrangChu} />
                                : null
                            }
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
}
export default NavMenu;