import logo from '../images/user-icon.svg';
import menu_tag from '../images/tag-menu.png';
import menu_home from '../images/home-menu.png';
import shopping_bag from '../images/shopping-bag.png';
import messenger_icon from '../images/messenger-icon.gif';
import Article from '../images/Article.png';
import Recommend from '../images/recommend.png';
import Aboutus from '../images/aboutus.png';
import zalo_icon from '../images/zalo-icon.png';
import up from '../images/up.png';
import sale from '../images/sale.png';
import get_a_discount from '../images/get-a-discount.png';
import fast_cart from '../images/fast-cart.png';
import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../css/Header.css';
import Modal from 'react-modal';
import ModalDangNhap from './modaldangnhap';
import ModalKhachHang from './modalkhachhang';
import PopupMenu from './PopupMenu';
import { API_URL } from '../constants/constants'
import { useHistory } from 'react-router-dom';
import React from 'react'
// let maNV = "null"
Modal.setAppElement('#root')
const Header = (props) => {

  const history = useHistory();
  const [ten, setTen] = useState();

  const tenHienThi = async () => {
    if (localStorage.getItem("accesstoken") !== null) {
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
          if (data !== "token not accepted") {
            setTen(data[0].TenNV);
            setTimeout(() => {
              docGioHang(data[0].MaNV)
            }, 10);
          } else {
            history.push('/')
          }
        })
    } else {
      // bla bla
    }
  }

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

  useEffect(async () => {
    if (localStorage.getItem("accesstoken") != null) {
      tenHienThi()
      props.callBackApp();
    }
  }, []);

  const OPModalDN = (value) => {
    props.OPModalDN(value)
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
            props.callBackApp();
          } else {
            console.log("loi roi")
          }
        })
    } else {
      if (tenNV == `NOTLOGIN`) {
        setLoginCheck(!login_check)
        setTen(tenNV)
        tenHienThi()
        props.callBackApp();
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

    }
  };

  const HienThiInfor = () => {
    setInforCheck(true);
  };
  const AnInfor = () => {
    setInforCheck(false);
  };

  const [login_check, setLoginCheck] = useState();
  const [infor_check, setInforCheck] = useState(false);
  const [soLuongGioHang, setSoLuongGioHang] = useState(0);
  const [strTogTien, setStrTogTien] = useState('0 VND');
  const [openModalDky, setopenModalDky] = useState();

  const tongTienDonHang = (listGH) => {
    var tTien = 0
    listGH.forEach(e => {
      tTien += (e.SoLuong * (e.GiaBan - (e.GiaBan * e.PhanTramKM / 100)))
    });
    var vND = tTien.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
    setStrTogTien(vND)
  }

  const getGioHangRedis = async (MaNV) => {
    if (MaNV != null && MaNV != undefined) {
      await fetch(API_URL + "/gioHang/" + MaNV)
        .then(response => response.json())
        .then(data => {
          const dsGH = data.gioHang
          if (dsGH.length != 0) {
            let tongSoLuong = 0
            dsGH.forEach(e => {
              tongSoLuong += e.SoLuong
            });
            setSoLuongGioHang(tongSoLuong)
            tongTienDonHang(dsGH)
          } else {
            setSoLuongGioHang(0)
          }
        })
    }
  }

  const docGioHang = async (MaNV) => {
    getGioHangRedis(MaNV)
  }

  useEffect(() => {
    tenHienThi()
  }, [])

  useEffect(() => {
    tenHienThi()
  }, [props.upDate])

  const openModalDkyFromHeader = () => {
    setopenModalDky(true);
  };

  const closeModalDkyFromHeader = () => {
    setopenModalDky(false);
  };

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
          {window.innerWidth <= 768
            ?
            <a href="" rel="noreferrer" target="_blank">
              <img className="mes_icon" src={messenger_icon} width="100%" height="100%"></img>
            </a>
            :
            <a href="" rel="noreferrer" target="_blank">
              <img className="mes_icon" src={messenger_icon} width="100%" height="100%"></img>
            </a>
          }

        </div>
        <div>
          <a href="https://chat.zalo.me/" rel="noreferrer" target="_blank">
            <img className="zalo_icon" src={zalo_icon} width="100%" height="100%"></img>
          </a>
        </div>
      </div>
      <div className={localStorage.getItem("accesstoken") != null ? "header_child" : "header_child header_child_mobile"}>
        {/* <a href="https://thuocsionline.vn/"> */}
        {window.innerWidth < 800 && localStorage.getItem("accesstoken") != null ? null :
          <a className='thumb7' href="http://thuocsionline.vn/">
            <img width="100%" height="100%" src="images/logo.png" className="header_logo header-logo" alt="Thuốc sỉ Online"></img>
          </a>
        }

        {/* {login_check ?
          <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              props.LayGiaTriSearch(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="search-product"
            options={input}
            getOptionLabel={(option) => option.value}
            renderInput={(params) => <TextField {...params} label="Tìm kiếm" variant="outlined" />}
          />
          : null
        } */}
        {
          localStorage.getItem("accesstoken") != null ?
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
      {/* bỏ comment điều kiện ở đây */}

      <div className="App">
        <div className="menu_parent">

          <NavLink activeClassName="menu-active" to='/' className="menu-a" style={{ textDecoration: 'none' }} onClick={() => { verifytoken() }}>
            <img className='menu-a-img' src={menu_home}></img>
            <div id="san_pham">Trang Chủ</div>
          </NavLink>
          {/* <Link to='/' className="menu-a" style={{ textDecoration: 'none' }}>
            <img width='20' height='20' src={menu_gioithieu}></img>
            <div id="san_pham">Giới Thiệu</div>
          </Link> */}
          <Link to='/SanPham' className="menu-a" style={{ textDecoration: 'none' }} onClick={() => { verifytoken() }}>
            <img className='menu-a-img' src={menu_tag}></img>
            <div id="san_pham">Sản Phẩm</div>
          </Link>
          {/* <Link to='/' className="menu-a" style={{ textDecoration: 'none' }}>
              <img width='20' height='20' src={menu_hoatchat}></img>
              <div id="san_pham">Hoạt Chất</div>
            </Link> */}
          {/* <Link to='/' className="menu-a" style={{ textDecoration: 'none' }}>
            <img width='20' height='20' src={menu_chinhsach}></img>
            <div id="san_pham">Chính Sách</div>
          </Link> */}
          <Link to='/DatHangNhanh' className="menu-a" style={{ textDecoration: 'none' }} onClick={() => { verifytoken() }}>
            <img className='menu-a-img' src={fast_cart}></img>
            <div id="san_pham">Đặt hàng nhanh</div>
          </Link>
          <Link to='/MaGiamGia' className="menu-a" style={{ textDecoration: 'none' }} onClick={() => { verifytoken() }}>
            <img className='menu-a-img' src={get_a_discount}></img>
            <div id="san_pham">Mã giảm giá / Quà tặng</div>
          </Link>
          <Link to='/KhuyenMai' className="menu-a" style={{ textDecoration: 'none' }} onClick={() => { verifytoken() }}>
            <img className='menu-a-img' src={sale}></img>
            <div id="san_pham">Khuyến mãi</div>
          </Link>
          {/* <Link to='/Aboutus' className="menu-a" style={{ textDecoration: 'none' }} onClick={() => { verifytoken() }}>
            <img className='menu-a-img' src={Aboutus}></img>
            <div id="san_pham">Chính sách </div>
          </Link>
          <Link to='/Introduce' className="menu-a" style={{ textDecoration: 'none' }} onClick={() => { verifytoken() }}>
            <img className='menu-a-img' src={Recommend}></img>
            <div id="san_pham">Giới thiệu</div>
          </Link>
          <Link to='/Article' className="menu-a" style={{ textDecoration: 'none' }} onClick={() => { verifytoken() }}>
            <img className='menu-a-img' src={Article}></img>
            <div id="san_pham">Chia sẻ kiến thức</div>
          </Link> */}
        </div>
        {
          localStorage.getItem("accesstoken") != null ?
            <div className="menu_parent1">
              <div className="menu_b_mobile">
                <div className="menu_b1_gia">{strTogTien}</div>
                <Link to='/GioHang' className="menu-b1" style={{ textDecoration: 'none' }} onClick={() => { verifytoken() }}>
                  <img width='20' src={shopping_bag}></img>
                  {
                    soLuongGioHang != 0 ? <span className="MuiBadge-badge MuiBadge-anchorOriginTopRightRectangle MuiBadge-colorSecondary">{soLuongGioHang}</span> : null
                  }
                </Link>
              </div>
              <PopupMenu
                pass={"123"}
                dangxuat={DangNhap}
              />
            </div>
            : null
        }
      </div>

    </div>
  );
}
export default Header;
