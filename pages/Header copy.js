import fast_cart from '../public/images/fast-cart.png';
import menu_tag from '../public/images/tag-menu.png';
import get_a_discount from '../public/images/tag-menu.png';
import sale from '../public/images/sale.png';
import up from '../public/images/up.png';
import messenger_icon from '../public/images/messenger-icon.png';
import zalo_icon from '../public/images/zalo-icon.png';
import logo from '../public/images/logo.png';
import shopping_bag from '../public/images/shopping-bag.png';
import { useEffect, useState } from 'react';

import ModalDangNhap from '../src/components/modaldangnhap';
import ModalKhachHang from '../src/components/modalkhachhang';
import PopupMenu from '../src/components/PopupMenu';

import { API_URL } from '../src/constants/constants'
import { useRouter } from 'next/router'
import Link from "next/link"
import React from 'react'
import Image from 'next/image'


const Header = (props) => {
  const router = useRouter()
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
            router.push('/')
          }
        })
    } else {
      // bla bla
      setLocal(null)
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
            router.push("/")
          }
        })
    } else {
      router.push("/")
    }
  }

  useEffect(async () => {
    if (localStorage.getItem("accesstoken") != null) {
      tenHienThi()
      // props.callBackApp();
    }
  }, []);

  const OPModalDN = (value) => {
    props.OPModalDN(value)
  };

  const DangNhap = (tenNV) => {
    if (localStorage.getItem("accesstoken") !== null) {
      setLocal(localStorage.getItem("accesstoken"))
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
            // props.callBackApp();
          } else {
            console.log("loi roi")
          }
        })
    } else {
      if (tenNV == `NOTLOGIN`) {
        setLoginCheck(!login_check)
        setTen(tenNV)
        tenHienThi()
        setLocal(null)
       // props.callBackApp();
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
              setLocal(null)
              setLocal(localStorage.getItem("accesstoken"))
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

  const [innerWidth, setInnerWidth] = useState(0)
  const [local, setLocal] = useState(null)

  useEffect(() => {
    const abc = window.innerWidth
    // console.log(`${new Date().getTime()} abc=`, abc)
    setInnerWidth(abc)
    setLocal(localStorage.getItem("accesstoken"))
  }, [])


  useEffect(() => {
    setSoLuongGioHang(props.capNhatSLGH)
  }, [props.capNhatSLGH])

  useEffect(() => {
    setStrTogTien(props.capNhatTTGH)
  }, [props.capNhatTTGH])


  return (
    <div className="header">
      <div className='bocwidth'></div>
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
            <Image src={up}></Image>
          </button>
        </div>
        <div>
          {
            innerWidth <= 768
              ?
              <a href="" rel="noreferrer" target="_blank">
                <Image src={messenger_icon} width={50} height={50} ></Image>
              </a>
              :
              <a href="" rel="noreferrer" target="_blank">
                <Image src={zalo_icon} width={50} height={50} ></Image>
              </a>
          }

        </div>
        <div>
          <a href="https://chat.zalo.me/" rel="noreferrer" target="_blank">
            <Image src={zalo_icon} width={50} height={50} ></Image>
          </a>
        </div>
      </div>
     
      <div className="header_child"
      >
        {/* {
          login_check ?
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
          local != null ?
            <div className="header_user">
              <div className="header_user_name">
                {ten}
              </div>
              <Link
                onMouseEnter={HienThiInfor}
                onMouseLeave={AnInfor}
                href={{
                  pathname: `/ThongTinTaiKhoan`,
                }}
              >
                <Image width={32} height={32} src={logo} className="header_user_logo" ></Image>
              </Link>
              {
                infor_check ? <div className="note_thong_tin_tai_khoan">
                  Thông tin tài khoản
                  <div className="square2"></div>
                </div> : null
              }
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

          <Link onClick={() => { verifytoken() }}
            href={{
              pathname: '/TrangChu',
              // query: { name: 'test' },
            }}>
            <a>
              <Image src={fast_cart} width={50} height={50}></Image>
              <div id="san_pham">Trang Chủ</div>
            </a>
          </Link>
          <Link className="menu-a" onClick={() => { verifytoken() }}
            href={{
              pathname: '/SanPham',
              // query: { name: 'test' },
            }}>
            <a>
              <Image src={menu_tag} width={50} height={50}></Image>
              <div id="san_pham">Sản Phẩm</div>
            </a>
          </Link>
          <Link className="menu-a" onClick={() => { verifytoken() }}
            href={{
              pathname: '/DatHangNhanh',
              // query: { name: 'test' },
            }}>
            <a>
              <Image src={fast_cart} width={50} height={50}></Image>
              <div id="san_pham">Đặt Hàng Nhanh</div>
            </a>
          </Link>
          <Link className="menu-a" onClick={() => { verifytoken() }}
            href={{
              pathname: '/MaGiamGia',
              // query: { name: 'test' },
            }}>
            <a>
              <Image src={get_a_discount} width={50} height={50}></Image>
              <div id="san_pham">Mã giảm giá / Quà tặng</div>
            </a>
          </Link>
          <Link className="menu-a" onClick={() => { verifytoken() }}
            href={{
              pathname: '/KhuyenMai',
              // query: { name: 'test' },
            }}>
            <a>
              <Image src={sale} width={50} height={50}></Image>
              <div id="san_pham">Khuyến Mãi</div>
            </a>
          </Link>
         
        </div>

        {
          local != null ?
            <div className="menu_parent1">
              <div className="menu_b_mobile">
                <div className="menu_b1_gia">{strTogTien}</div>
                <Link className="menu-a" onClick={() => { verifytoken() }}
                  href={{
                    pathname: '/Cart',
                  }}>
                  <div>
                    <Image width={20} height={20} src={shopping_bag}></Image>
                    {
                      soLuongGioHang != 0 ? <span className="MuiBadge-badge MuiBadge-anchorOriginTopRightRectangle MuiBadge-colorSecondary">{soLuongGioHang}</span> : null
                    }
                  </div>
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
