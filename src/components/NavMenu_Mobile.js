import nav_menu from '../images/nav-menu.png';
import menu_tag from '../images/tag-menu.png';
import menu_home from '../images/home-menu.png';
import menu_hoatchat from '../images/menu-hoatchat.png';
import menu_gioithieu from '../images/introduce-menu.png';
import menu_chinhsach from '../images/policy-menu.png';
import Article from '../images/Article.png';
import Recommend from '../images/recommend.png';
import Aboutus from '../images/aboutus.png';
import show_pass from '../images/show-pass.png';
import { useEffect, useState } from 'react';
import '../css/Header.css';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import DanhMucMobile from './DanhMucMobile';

const customStyles = {
    content: {
        top: '33px',
        left: '-1%',
        right: '15%',
        // bottom: 'auto',
        // marginRight: '-50%',
        // transform: 'translate(-50%, -50%)',
        // borderRadius: '20px',
        // backgroundColor: '#39962f',
        backgroundImage: "linear-gradient(to right, green, #019CAD)",
        padding: '25px',
        height: '100%',
        // position : 'absolute',
        border:'none',
        boxShadow: "10px 3px 10px rgba(0, 0, 0, 0.08)",
    },

};
Modal.setAppElement('#root');

const NavMenu = (props) => {
    const [check_screen, setCheckScreen] = useState();
    const tatModal = () => {
        setCheckScreen(!check_screen);
    }
    // const LayGiaTriDanhMuc = (childData) => {
    //     if(childData != null || childData != undefined){
    //         props.parentCallback(childData);
    //     }
    //     tatModal();
    // };
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
                            <Link to='/' className="menu-a1" style={{ textDecoration: 'none' }}>
                                <img width='20' height='20' src={menu_home}></img>
                                <div id="san_pham1">Trang Chủ</div>
                            </Link>
                            <Link to='/SanPham' className="menu-a1" style={{ textDecoration: 'none' }}>
                                <img width='20' height='20' src={menu_tag}></img>
                                <div id="san_pham1">Sản Phẩm</div>
                            </Link>
                            <Link to='/DatHangNhanh' className="menu-a1" style={{ textDecoration: 'none' }}>
                                <img width='20' height='20' src={menu_gioithieu}></img>
                                <div id="san_pham1">Đặt hàng nhanh</div>
                            </Link>
                            <Link to='/MaGiamGia' className="menu-a1" style={{ textDecoration: 'none' }}>
                                <img width='20' height='20' src={menu_hoatchat}></img>
                                <div id="san_pham1">Mã giảm giá</div>
                            </Link>
                            <Link to='/KhuyenMai' className="menu-a1" style={{ textDecoration: 'none' }}>
                                <img width='20' height='20' src={menu_chinhsach}></img>
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
                            {/* <DanhMucMobile parentCallback = {LayGiaTriDanhMuc}/> */}

                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
}
export default NavMenu;