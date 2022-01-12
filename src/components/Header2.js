import logo from '../images/user-icon.svg';
import menu_tag from '../images/tag-menu.png';
import menu_home from '../images/home-menu.png';
import shopping_bag from '../images/shopping-bag.png';
import Article from '../images/Article.png';
import Recommend from '../images/recommend.png';
import Aboutus from '../images/aboutus.png';
import logothuocsi from '../images/Logo.png';
import messenger_icon from '../images/messenger-icon.gif';
import zalo_icon from '../images/zalo-icon.png';
import up from '../images/up.png';
import sale from '../images/sale.png';
import get_a_discount from '../images/get-a-discount.png';
import fast_cart from '../images/fast-cart.png';
import { NavLink, Link } from 'react-router-dom';
import React from 'react'
import { useEffect, useState } from 'react';
import '../css/Header.css';
import Modal from 'react-modal';
import ModalDangNhap from './modaldangnhap';
import ModalKhachHang from './modalkhachhang';
import PopupMenu from './PopupMenu';
import NavMenu from './NavMenu';

//import { async } from 'C:/Users/Admin/AppData/Local/Microsoft/TypeScript/3.8/node_modules/rxjs/index';

import { API_URL } from '../constants/constants'
import {  useHistory } from 'react-router-dom';

// let maNV = "null"
Modal.setAppElement('#root')
const Header2 = (props) => {
 // const [maNV, setMaNV] = useState(null)
  const history = useHistory();
  const [ten, setTen] = useState();
  const [openModalDky, setopenModalDky] = useState();
  const verifytoken = async () => {
    if (localStorage.getItem("accesstoken") !== null) {
      fetch(API_URL + '/verifytoken', {
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
          if (data.rs === "token accepted") {
            // console.log("token con han")
          } else {
            // console.log("token het han")
            alert("Phiên Đăng Nhập Hết Hạn, Vui Lòng Đăng Nhập Lại!")
            localStorage.removeItem("accesstoken")
            history.push("/")
          }
        })
    } else {
      history.push("/")
    }
  }
  const OPModalDN = (value) => {
    props.OPModalDN(value)
  };
  const MaNVvalue = (value) => {
    props.MaNVvalue(value)
  };
  const openModalDkyFromHeader = () => {
    setopenModalDky(true);
  };
  const closeModalDkyFromHeader = () => {
    setopenModalDky(false);
  };
  const DangNhap = (tenNV) => {
    if (localStorage.getItem("accesstoken") !== null) {
      fetch(API_URL + '/verifytoken', {
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
          if (data.rs === "token accepted") {
            setLoginCheck(!login_check)
            setTen(tenNV)
            tenHienThi()
            // MaNVvalue(data[0].MaNV)
            props.callBackApp();
          } else {
            console.log("loi roi")
          }
        })
    } else {
      fetch(API_URL + '/verifytoken', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          test: tenNV
        })
      })
        .then((response) => response.json())
        .then(data => {
          if (data.rs === "token accepted") {
            setLoginCheck(!login_check)

            setTen(tenNV)
            tenHienThi()
            props.callBackApp();
          } else {
            console.log("loi roi")
          }
        })
    }
  };

  const [soLuongGioHang, setSoLuongGioHang] = useState(0)
  const [strTogTien, setStrTogTien] = useState('0 VND')

  const tongTienDonHang = (listGH) => {
    let tTien = 0
    listGH.forEach(e => {
      tTien += (e.SoLuong * (e.GiaBan - (e.GiaBan * e.PhanTramKM / 100)))
    });
    const vND = tTien.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
    setStrTogTien(vND)
  }

  const getGioHangRedis = async (maNV01) => {
    // console.log(`${new Date().getTime()} maNV01=`, maNV01)
    if (maNV01 != null && maNV01 != undefined) {
      await fetch(API_URL + "/gioHang/" + maNV01)
        .then(response => response.json())
        .then(data => {
          const dsGH = data
          if (dsGH != null) {
            const abc = dsGH.gioHang
            if (abc.length != 0) {
              let tongSoLuong = 0
              abc.forEach(e => {
                tongSoLuong += e.SoLuong
              });
              setSoLuongGioHang(tongSoLuong)
              tongTienDonHang(abc)
            } else {
              setSoLuongGioHang(0)
            }
          }
        })
    } else {
      setSoLuongGioHang(0)
      tongTienDonHang([])
    }
  }

  const tenHienThi = async () => {
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
        if (data[0] !== undefined) {
          setTen(data[0].TenNV);
          //setMaNV(data[0].MaNV)
          setTimeout(() => {
          //  setMaNV(data[0].MaNV)
            MaNVvalue(data[0].MaNV)
            getGioHangRedis(data[0].MaNV)
          }, 10);
        } else {
          console.log("loi hd2")
        }
      })
  }

  useEffect(async () => {
    tenHienThi()
  }, []);

  const DangXuat = () => {
    localStorage.removeItem("accesstoken")
    history.push("/")
  };


  const HienThiInfor = () => {
    setInforCheck(true);
  };
  const AnInfor = () => {
    setInforCheck(false);
  };

  const [login_check, setLoginCheck] = useState(true);

  const [infor_check, setInforCheck] = useState(false);
  //const [ChucVu, setChucVu] = useState();


  useEffect(() => {
    setSoLuongGioHang(props.capNhatSLGH)
  }, [props.capNhatSLGH])

  useEffect(() => {
    setStrTogTien(props.capNhatTTGH)
  }, [props.capNhatTTGH])


  return (
    <div className="header">
      <div className="mes_zalo">
        <div>
          <button className="up_btn"
            onClick={() => {
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
              })
            }}>
            <img className="up_img" src={up}></img>
          </button>
        </div>
        <div>
          <a href="" rel="noreferrer" target="_blank">
            <img className="mes_icon" src={messenger_icon} width="100%" height="100%"></img>
          </a>
        </div>
        <div>
          <a href="https://chat.zalo.me/" rel="noreferrer" target="_blank">
            <img className="zalo_icon" src={zalo_icon} width="100%" height="100%"></img>
          </a>
        </div>
      </div>
      <div className="header_child">
        {window.innerWidth < 800 ? null :
          <a className='thumb7' href="http://thuocsionline.vn/">
            <img width="100%" height="100%" src={logothuocsi} className="header_logo header-logo" alt="Thuốc sỉ Online"></img>
          </a>
        }
        {localStorage.getItem("accesstoken") != null ?
          <div className="header_user">

            {/* <button onMouseEnter={HienThiNoTi} onMouseLeave={AnNoTi} className="header_btn_noti" onClick={() => { alert('thongbao') }}>
              <img width="24" height="24" src={notification} className="header_user_noti" ></img>
            </button>
            {noti_check ?
              <div className="note_thong_bao">
                Thông báo
                <div className="square"></div>
              </div>
              : null} */}
            <div className="header_user_name">
              {ten}
            </div>
            <Link to="/ThongTinTaiKhoan" onMouseEnter={HienThiInfor} onMouseLeave={AnInfor}>
              <img width="32" height="32" src={logo} className="header_user_logo" ></img>
            </Link>
            {infor_check ? <div className="note_thong_tin_tai_khoan">
              Thông tin tài khoản
              <div className="square2"></div>
            </div> : null}
          </div>
          :
          <div className="btn_parent">
            <ModalDangNhap valueOfModal={props.valueOfModal} OPModalDN={OPModalDN} callBackParent={DangNhap} openModalDkyFromHeader={openModalDkyFromHeader} />
            <ModalKhachHang callBackParent={DangNhap} openModalDky={openModalDky} openModalDkyFromHeader={openModalDkyFromHeader} closeModalDkyFromHeader={closeModalDkyFromHeader} />
          </div>
        }
      </div>
      <div className="App">
        <div className="menu_parent">
          <div className="btn-nav-parent">
            <NavMenu />
            {window.location.pathname == "/ThongTinTaiKhoan" && window.innerWidth < 800 || window.location.pathname == "/DonHangCuaToi" && window.innerWidth < 800
              ?
              <a className='thumb7' href="http://thuocsionline.vn/">
                <img src="images/logo.png" className="header_logo_trangchu " alt="Thuốc sỉ Online"></img>
              </a>
              : null
            }
          </div>
          <NavLink exact activeClassName="menu-active" to='/' className="menu-a" style={{ textDecoration: 'none' }}>
            <img className='menu-a-img' src={menu_home}></img>
            <div id="san_pham">Trang Chủ</div>
          </NavLink>
          {/* <Link to='/' className="menu-a" style={{ textDecoration: 'none' }}>
            <img width='20' height='20' src={menu_gioithieu}></img>
            <div id="san_pham">Giới Thiệu</div>
          </Link> */}
          <NavLink exact activeClassName="menu-active" to='/SanPham' className="menu-a" style={{ textDecoration: 'none' }} onClick={() => { verifytoken() }}>
            <img className='menu-a-img' src={menu_tag}></img>
            <div id="san_pham">Sản Phẩm</div>
          </NavLink>
          {/* <Link to='/' className="menu-a" style={{ textDecoration: 'none' }}>
              <img width='20' height='20' src={menu_hoatchat}></img>
              <div id="san_pham">Hoạt Chất</div>
            </Link> */}
          {/* <Link to='/' className="menu-a" style={{ textDecoration: 'none' }}>
            <img width='20' height='20' src={menu_chinhsach}></img>
            <div id="san_pham">Chính Sách</div>
          </Link> */}
          <NavLink activeClassName="menu-active" to='/DatHangNhanh' className="menu-a" style={{ textDecoration: 'none' }} onClick={() => { verifytoken() }}>
            <img className='menu-a-img' src={fast_cart}></img>
            <div id="san_pham">Đặt hàng nhanh</div>
          </NavLink>
          <NavLink activeClassName="menu-active" to='/MaGiamGia' className="menu-a" style={{ textDecoration: 'none' }} onClick={() => { verifytoken() }}>
            <img className='menu-a-img' src={get_a_discount}></img>
            <div id="san_pham">Mã giảm giá / Quà tặng</div>
          </NavLink>
          <NavLink activeClassName="menu-active" to='/KhuyenMai' className="menu-a" style={{ textDecoration: 'none' }} onClick={() => { verifytoken() }}>
            <img className='menu-a-img' src={sale}></img>
            <div id="san_pham">Khuyến mãi</div>
          </NavLink>
          {/* <NavLink activeClassName="menu-active" to='/Aboutus' className="menu-a" style={{ textDecoration: 'none' }} onClick={() => { verifytoken() }}>
            <img className='menu-a-img' src={Aboutus}></img>
            <div id="san_pham">Chính sách</div>
          </NavLink>
          <NavLink activeClassName="menu-active" to='/Introduce' className="menu-a" style={{ textDecoration: 'none' }} onClick={() => { verifytoken() }}>
            <img className='menu-a-img' src={Recommend}></img>
            <div id="san_pham">Giới thiệu</div>
          </NavLink>
          <NavLink activeClassName="menu-active" to='/Article' className="menu-a" style={{ textDecoration: 'none' }} onClick={() => { verifytoken() }}>
            <img className='menu-a-img' src={Article}></img>
            <div id="san_pham">Chia sẻ kiến thức</div>
          </NavLink> */}
          
        </div>
        {localStorage.getItem("accesstoken") != null ?
          <div className="menu_parent1">

            {window.location.pathname == "/GioHang" && window.innerWidth < 800
              ? null :
              <div className="menu_b_mobile">
                <div className="menu_b1_gia">{strTogTien}</div>
                <Link to='/GioHang' className="menu-b1" style={{ textDecoration: 'none' }} onClick={() => { verifytoken() }}>
                  <img width='20' src={shopping_bag}></img>
                  {
                    soLuongGioHang > 0 ? <span className="MuiBadge-badge MuiBadge-anchorOriginTopRightRectangle MuiBadge-colorSecondary">{soLuongGioHang}</span> : null
                  }
                </Link>
              </div>
            }

            <PopupMenu tenDangNhap={"abc"}
              pass={"123"}
              dangxuat={DangXuat}
            />
          </div>
          : null}
      </div>
    </div>
  );
}
export default Header2
