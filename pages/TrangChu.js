import Image from 'next/image'
import { useEffect, useState } from 'react';
//logo_doitac
// import anthien_png from '/logo_cac_cty_duoc/anthien.png';
// import danapha_png from '/logo_cac_cty_duoc/danapha.png';
// import DHG_png from '/logo_cac_cty_duoc/DHG.png';
// import bepharco_png from '/logo_cac_cty_duoc/bepharco.png';
// import domesco_png from '/logo_cac_cty_duoc/domesco.png';
// import hetaro_png from '/logo_cac_cty_duoc/hetaro.png';
// import ymed_png from '/logo_cac_cty_duoc/ymed.png';
// import mebipha_png from '/logo_cac_cty_duoc/mebiphar.png';
// import Sanofi_png from '/logo_cac_cty_duoc/Sanofi.png';
// import sgk_png from '/logo_cac_cty_duoc/sgk.png';
// import stada_png from '/logo_cac_cty_duoc/stada.png';
// import DBD_png from '/logo_cac_cty_duoc/DBD.png';
// import imexpharm_png from '/logo_cac_cty_duoc/imewpharm.png';
// import LogoOPC_png from '/logo_cac_cty_duoc/OPC.png';
// import stella_png from '/logo_cac_cty_duoc/stella.png';
// import vidipha_png from '/logo_cac_cty_duoc/vidipha.png';
import Header from './Header';
import Footer from './Footer';
//avatar_khach
import CoLanAnh from '../public/avatar_khach/CoLanAnh.jpg'
import CoHang from '../public/avatar_khach/CoHang.jpg'
import ChiHanh from '../public/avatar_khach/ChiHanh.jpg'
import AnhTruong from '../public/avatar_khach/AnhTruong.jpg'
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
// import NavMenu from './NavMenu';
import Link from "next/link"
import { API_URL } from '../src/constants/constants'
import image_default from '../public/image-default.jpg'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { userouter } from 'react-router-dom';
import { useRouter } from 'next/router'
//React-toastify
import React from 'react'
import { Helmet } from "react-helmet";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
const customId = "custom-id-yes";
const notify_themsp = (tensp) => {
  toast.success(`Đã thêm ${tensp} vào giỏ hàng !`, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    toastId: customId
  });
}
const notify_giamsp = (tensp) => {
  toast.error(`Đã xóa ${tensp} khỏi giỏ hàng !`, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    toastId: customId
  });
}
const notify_nhaptaysp2 = (tensp, soluong) => {
  toast.success(`Đã thêm ${tensp} vào giỏ hàng !`, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    toastId: customId
  });
}
const notify_nhaptaysp = (tensp, soluong) => {
  toast.success(`Đã thêm ${tensp} vào giỏ hàng !`, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    toastId: customId
  });
}


<ToastContainer limit={1} />

// let maNV = "null"
const TrangChu = (props) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: true,
    swipeToSlide: true,
    touchThreshold: 250,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 930,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 610,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  //namdeptrai
  const settings2 = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: true,
    swipeToSlide: true,
    touchThreshold: 250,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 930,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 610,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  const settings_doitac = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };
  const settings_khachhang = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  // const images = [
  //   {
  //     original: "https://api.thuocsionline.vn/uploads_Images/BANNER-1.jpg",
  //     thumbnail: "http://lorempixel.com/250/150/nature/1/"
  //   },
  //   {
  //     original: "https://api.thuocsionline.vn/uploads_Images/BANNER-2.jpg",
  //     thumbnail: "http://lorempixel.com/250/150/nature/2/"
  //   },
  //   {
  //     original: "https://api.thuocsionline.vn/uploads_Images/BANNER-3.jpg",
  //     thumbnail: "http://lorempixel.com/250/150/nature/3/"
  //   },
  // ];
  const [value, setValue] = useState();//giá trị của search box
  const [inputValue, setInputValue] = useState('');
  const [openModalDN, setOpenModalDN] = useState(false);
  const [login_check_app, setLoginCheckApp] = useState();
  const OPModalDN = (value) => {
    setOpenModalDN(value)
  }


  const DangNhapApp = (tenNV) => {
    setLoginCheckApp(!login_check_app)
    // đăng nhập thành công thì update giỏ vào sản phẩm
    layMaNV()
  };

  const SearchProduct = (input, value, inputValue) => {
    setInput(input);
    setValue(value);
    setInputValue(inputValue);
  }

  const [random, setrandom] = useState(0)


  ///hàm verifytoken
  const verifytoken = () => {
    toast.error('Bạn vui lòng đăng nhập để vào được trang web!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    props.OPModalDN(true);
  }

  const [data, setData] = useState([]);//mang san pham
  const [data2, setData2] = useState([]);//mang san pham
  const [data3, setData3] = useState([]);//mang san pham
  const [gioHang, setGioHang] = useState([])
  const [ten, setTen] = useState();
  const router = useRouter()
  const [banner, setBanner] = useState([]);
  const [input, setInput] = useState([]);//mang gợi ý của search

  const handleImgError = e => {
    e.target.src = image_default;
  };

  useEffect(() => {
    fetch(API_URL + '/xoaMggHetHan', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({

      })
    })
      .then((response) => response.json())
      .then(data => {

      })
  }, []);

  useEffect(async () => {
    if (local !== null) {
      fetch(API_URL + '/verifytoken', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          test: local
        })
      })
        .then((response) => response.json())
        .then(data => {
          if (data.rs === "token accepted") {
            // console.log("token con han")
          } else {
            // console.log("token het han")
            localStorage.removeItem("accesstoken")
            // router.push("/")
          }
        })
    } else {
      // router.push("/")
    }
    fetch(API_URL + '/getsuggestfront', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      })

    })
      .then((response) => response.json())
      .then(data => {
        setInput(data)
      })
    ///hàm lấy banner
    fetch(API_URL + '/layBanner', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({

      })
    })
      .then((response) => response.json())
      .then(datas => {
        setBanner(datas)
      })
  }, []);

  const setGioHangRedis = async (listGH) => {
    if (listGH.length <= 200) {
      const locSoLuong0 = listGH.filter(item => item.SoLuong > 0)
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          gioHang: locSoLuong0
        })
      }
      await fetch(API_URL + "/gioHang/" + maNV, requestOptions)
        .then(response => response.json())
        .then(data => {
          // chiTietDonHang(data, gioHangRoot)
        })
    } else {
      alert("Một đơn tối đa 200 sản phẩm")
    }
  }

  const getGioHangRedis = async (items, MaNV) => {
    // console.log(`${new Date().getTime()} maNV=`, maNV)
    await fetch(API_URL + "/gioHang/" + MaNV)
      .then(response => response.json())
      .then(data => {
        const dsGH = data
        let abc = dsGH.gioHang
        let test = 0
        if (dsGH == null) {
          const tmp = {
            gioHang: []
          }
          setGioHangRedis(tmp.gioHang)
        }
        if (abc.length != 0) {
          items.forEach(e => {
            abc.forEach(f => {
              if (e.MaHang === f.MaHang) {
                e.SoLuong = f.SoLuong
                f.DaDat = e.DaDat
                f.ConLai = e.ConLai
                if (f.SoLuong > e.ConLai) {
                  f.SoLuong = e.ConLai
                  e.SoLuong = e.ConLai
                  test = 1
                }
              }
            });
          });
          let tongSoLuong = 0
          abc.forEach(e => {
            tongSoLuong += e.SoLuong
          });
          setSoLuongGioHang(tongSoLuong)
          tongTienDonHang(abc)
          setGioHang(abc)
        }
        setData(items)
        if (test == 1) {
          setGioHangRedis(abc)
          alert("Có một số sản phẩm ĐÃ HẾT HÀNG nên số lượng bị giảm")
        }
      })
  }

  const getGioHangRedis2 = async (items, MaNV) => {
    await fetch(API_URL + "/gioHang/" + MaNV)
      .then(response => response.json())
      .then(data => {
        const dsGH = data
        let abc = dsGH.gioHang
        let test = 0
        if (dsGH != null) {
        } else {
          const tmp = {
            gioHang: []
          }
          setGioHangRedis(tmp.gioHang)
        }
        if (abc.length != 0) {
          items.forEach(e => {
            abc.forEach(f => {
              if (e.MaHang === f.MaHang) {
                e.SoLuong = f.SoLuong
                f.DaDat = e.DaDat
                f.ConLai = e.ConLai
                if (f.SoLuong > e.ConLai) {
                  f.SoLuong = e.ConLai
                  e.SoLuong = e.ConLai
                  test = 1
                }
              }
            });
          });
          let tongSoLuong = 0
          abc.forEach(e => {
            tongSoLuong += e.SoLuong
          });
          setSoLuongGioHang(tongSoLuong)
          tongTienDonHang(abc)
          setGioHang(abc)
        }
        setData2(items)
        if (test == 1) {
          alert("Có một số sản phẩm đã hết hàng nên số lượng bị giảm")
          setGioHangRedis(abc)
        }
      })
  }

  const getGioHangRedis3 = async (items, MaNV) => {
    await fetch(API_URL + "/gioHang/" + MaNV)
      .then(response => response.json())
      .then(data => {
        const dsGH = data
        let abc = dsGH.gioHang
        let test = 0
        if (dsGH != null) {
        } else {
          const tmp = {
            gioHang: []
          }
          setGioHangRedis(tmp.gioHang)
        }
        if (abc.length != 0) {
          items.forEach(e => {
            abc.forEach(f => {
              if (e.MaHang === f.MaHang) {
                e.SoLuong = f.SoLuong
                f.DaDat = e.DaDat
                f.ConLai = e.ConLai
                if (f.SoLuong > e.ConLai) {
                  f.SoLuong = e.ConLai
                  e.SoLuong = e.ConLai
                  test = 1
                }
              }
            });
          });
          let tongSoLuong = 0
          abc.forEach(e => {
            tongSoLuong += e.SoLuong
          });
          setSoLuongGioHang(tongSoLuong)
          tongTienDonHang(abc)
          setGioHang(abc)
        }
        setData3(items)
        if (test == 1) {
          alert("Có một số sản phẩm đã hết hàng nên số lượng bị giảm")
          setGioHangRedis(abc)
        }
      })
  }

  const [strTogTien, setStrTogTien] = useState()

  const tongTienDonHang = (listGH) => {
    var tTien = 0
    listGH.forEach(e => {
      tTien += (e.SoLuong * (e.GiaBan - (e.GiaBan * e.PhanTramKM / 100)))
    });
    var vND = tTien.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
    setStrTogTien(vND)
  }

  const [soLuongGioHang, setSoLuongGioHang] = useState(0)

  const getGioHangRedis4 = async (items, MaNV) => {

    await fetch(API_URL + "/gioHang/" + MaNV)
      .then(response => response.json())
      .then(data => {
        const dsGH = data
        let abc = dsGH.gioHang
        let test = 0
        if (dsGH != null) {
        } else {
          const tmp = {
            gioHang: []
          }
          setGioHangRedis(tmp.gioHang)
        }
        if (abc.length != 0) {
          items.forEach(e => {
            abc.forEach(f => {
              if (e.IdCombo === f.MaHang) {
                e.SoLuong = f.SoLuong
                f.DaDat = e.DaDat
                f.ConLai = e.ConLai
                if (f.SoLuong > e.ConLai) {
                  f.SoLuong = e.ConLai
                  e.SoLuong = e.ConLai
                  test = 1
                }
              }
            });
          });
          let tongSoLuong = 0
          abc.forEach(e => {
            tongSoLuong += e.SoLuong
          });
          setSoLuongGioHang(tongSoLuong)
          tongTienDonHang(abc)
          setGioHang(abc)
        }
        setDataCombo(items)
        if (test == 1) {
          alert("Có một số sản phẩm đã hết hàng nên số lượng bị giảm")
          setGioHangRedis(abc)
        }
      })
  }

  const [maNV, setmaNV] = useState(null)

  const layMaNV = async () => {
    if (local != null && local != undefined) {
      await fetch(API_URL + '/thongtintaikhoan', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          test: local
        })
      })
        .then((response) => response.json())
        .then(data => {
          // console.log(`${new Date().getTime()} data=`, data)
          if (data[0] !== undefined) {
            setTen(data[0].TenNV)
            setmaNV(data[0].MaNV)
            setTimeout(() => {
              setTen(data[0].TenNV)
              setmaNV(data[0].MaNV)
              getProductsAllSale(data[0].MaNV)
            }, 10);
          } else {
            getProductsAllSale(`NOTLOGIN`)
            console.log("loi tc")
          }
        })
    } else {
      getProductsAllSale(`NOTLOGIN`)
    }
  }

  const getProductsAllSale = async (MaNV) => {
    //namdeptrai combo
    await fetch(API_URL + '/comboOrderId/')
      .then(res => res.json()).then(dataCombo => {
        if (MaNV == `NOTLOGIN`) {
          let arr = []
          dataCombo.forEach(ee1 => {
            const item = {
              ...ee1, SoLuong: 0
            }
            arr.push(item)
          });
          setDataCombo(arr)
        } else {
          let arr = []
          dataCombo.forEach(ee1 => {
            const item = {
              ...ee1, SoLuong: 0
            }
            arr.push(item)
          });
          getGioHangRedis4(arr, MaNV)
          // props.capNhatGioHang() // thằng này sẽ gọi header update
        }
      })

    await fetch(API_URL + '/slideflashsale', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      })
    })
      .then((response) => response.json())
      .then(datas => {
        if (MaNV == `NOTLOGIN`) {
          setData3(datas.mang)
        } else {
          getGioHangRedis3(datas.mang, MaNV)
          // props.capNhatGioHang() // thằng này sẽ gọi header update
        }
      })

    await fetch(API_URL + '/slidekhuyenmai', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      })
    })
      .then((response) => response.json())
      .then(datas => {
        if (MaNV == `NOTLOGIN`) {
          setData(datas.mang)
        } else {
          getGioHangRedis(datas.mang, MaNV)
          // props.capNhatGioHang() // thằng này sẽ gọi header update
        }
      })
  }

  //Lấy combo ra hiển thị: Namdeptrai
  const [dataCombo, setDataCombo] = useState([])
  const [local, setLocal] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjAzNDUzNDUzNDUiLCJpYXQiOjE2NDE5MDY0NjcsImV4cCI6MTY0MjA3OTI2N30.7IsrZlYVysPlQjJMr58OijkwWlHrCRk955PPJWh8YLI')

  // useEffect(() => {
  // localStorage.setItem('accesstoken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjAzNDUzNDUzNDUiLCJpYXQiOjE2NDE5MDY0NjcsImV4cCI6MTY0MjA3OTI2N30.7IsrZlYVysPlQjJMr58OijkwWlHrCRk955PPJWh8YLI')
  // setLocal(localStorage.getItem('accesstoken'))
  // }, [])

  useEffect(() => {
    // console.log(`${new Date().getTime()} local=`, local)
    layMaNV()
  }, [local])

  // cart 
  // const [soLuongTrongGio, setSoLuongTrongGio] = useState(0)
  // const [strTogTien, setStrTogTien] = useState()

  const themSPvaoGH2 = (ee1) => {
    let item = {
      TenHang: ee1.ComboName,
      MaHang: ee1.IdCombo,
      SoLuong: ee1.SoLuong,
      GiaBan: ee1.TotalPrice,
      QCDG: 0,
      HinhAnh: ee1.ImageOne,
      DangKD: 1,
      PhanTramKM: 0,
      TonKho: 1000,
      DaDat: 0,
      ConLai: 1000,
    }
    let dsGH = gioHang
    if (dsGH.length > 0) {
      let timKiem = 0
      for (let i = 0; i < dsGH.length; i++) {
        if (dsGH[i].MaHang === item.MaHang) {
          if (item.SoLuong == 0) {
            dsGH.splice(i, 1)
          } else {
            dsGH[i].SoLuong = item.SoLuong
          }
          timKiem = 1
        }
      }
      if (timKiem == 0) {
        dsGH.push(item)
      }
      const tmp = {
        gioHang: dsGH.filter(item => item.SoLuong > 0)
      }
      setGioHang(tmp.gioHang)
    } else {
      dsGH.push(item)
      const tmp = {
        gioHang: dsGH.filter(item => item.SoLuong > 0)
      }
      setGioHang(tmp.gioHang)
    }
  }

  const themSPvaoGH = (ee1) => {
    let item = {
      TenHang: ee1.TenHang,
      MaHang: ee1.MaHang,
      GiaBan: ee1.GiaBan,
      QCDG: ee1.QCDG,
      SoLuong: ee1.SoLuong,
      TonKho: ee1.TonKho,
      DaDat: ee1.DaDat,
      ConLai: ee1.ConLai,
      HinhAnh: ee1.HinhAnh,
      PhanTramKM: ee1.PhanTramKM,
      DangKD: ee1.DangKD
    }
    let dsGH = gioHang
    if (dsGH.length > 0) {
      let timKiem = 0
      for (let i = 0; i < dsGH.length; i++) {
        if (dsGH[i].MaHang === item.MaHang) {
          if (item.SoLuong == 0) {
            dsGH.splice(i, 1)
          } else {
            dsGH[i].SoLuong = item.SoLuong
          }
          timKiem = 1
        }
      }
      if (timKiem == 0) {
        dsGH.push(item)
      }
      const tmp = {
        gioHang: dsGH.filter(item => item.SoLuong > 0)
      }
      setGioHang(tmp.gioHang)
    } else {
      dsGH.push(item)
      const tmp = {
        gioHang: dsGH.filter(item => item.SoLuong > 0)
      }
      setGioHang(tmp.gioHang)
    }
  }

  const [lamMoiGH, setLamMoiGH] = useState(0)
  const [lanDau, setLanDau] = useState(true)

  useEffect(() => {
    // let tongSoLuong = 0
    // gioHang.forEach(e => {
    //   tongSoLuong += e.SoLuong
    // });
    if (!lanDau) {
      if (maNV != null && maNV != undefined) {
        setGioHangRedis(gioHang)
      }
    }
    setLanDau(false)
    // props.capNhatGioHang()
  }, [lamMoiGH])

  const up4 = (maHang) => {
    if (maNV != null && maNV != undefined) {
      const newList = dataCombo.map((item) => {
        if (item.IdCombo === maHang) {
          let sLuong = item.SoLuong
          let max = 300
          // if (item.ConLai < 300) {
          //   max = item.ConLai
          // }
          if (sLuong < max) {
            sLuong += 1
            const updatedItem = {
              ...item,
              SoLuong: sLuong,
            };
            notify_themsp(item.ComboName);
            themSPvaoGH2(updatedItem)
            return updatedItem;
          } else {
            alert("Số lượng đã cao nhất!")
            if (max <= 0) {
              max = 0
            }
            const updatedItem = {
              ...item,
              SoLuong: max,
            };
            notify_themsp(item.ComboName);
            themSPvaoGH2(updatedItem)
            return updatedItem;
          }
        }
        return item;
      });
      setDataCombo(newList) // thằng này cập nhật số lượng hiện lên web
      const rand = Math.random(2) * 1000
      setLamMoiGH(rand)
    } else {
      alert(`Chưa đăng nhập.`)
    }

  }

  const up3 = (maHang) => {
    const newList = data3.map((item) => {
      if (item.MaHang === maHang) {
        let sLuong = item.SoLuong
        let max = 300
        if (item.ConLai < 300) {
          max = item.ConLai
        }
        if (sLuong < max) {
          sLuong += 1
          const updatedItem = {
            ...item,
            SoLuong: sLuong,
          };
          notify_themsp(item.TenHang);
          themSPvaoGH(updatedItem)
          return updatedItem;
        } else {
          alert("Số lượng đã cao nhất!")
          if (max <= 0) {
            max = 0
          }
          const updatedItem = {
            ...item,
            SoLuong: max,
          };
          notify_themsp(item.TenHang);
          themSPvaoGH(updatedItem)
          return updatedItem;
        }
      }
      return item;
    });
    setData3(newList) // thằng này cập nhật số lượng hiện lên web
    const rand = Math.random(2) * 1000
    setLamMoiGH(rand)
  }

  const up = (maHang) => {
    const newList = data.map((item) => {
      if (item.MaHang === maHang) {
        let sLuong = item.SoLuong
        let max = 300
        if (item.ConLai < 300) {
          max = item.ConLai
        }
        if (sLuong < max) {
          sLuong += 1
          const updatedItem = {
            ...item,
            SoLuong: sLuong,
          };
          notify_themsp(item.TenHang);
          themSPvaoGH(updatedItem)
          return updatedItem;
        } else {
          alert("Số lượng đã cao nhất!")
          if (max <= 0) {
            max = 0
          }
          const updatedItem = {
            ...item,
            SoLuong: max,
          };
          notify_themsp(item.TenHang);
          themSPvaoGH(updatedItem)
          return updatedItem;
        }

      }
      return item;
    });
    setData(newList) // thằng này cập nhật số lượng hiện lên web
    const rand = Math.random(2) * 1000
    setLamMoiGH(rand)
  }

  const down4 = (maHang) => {
    if (maNV != null && maNV != undefined) {
      const newList = dataCombo.map((item) => {
        if (item.IdCombo === maHang) {
          let sLuong = item.SoLuong
          if (sLuong >= 1) {
            sLuong -= 1
            const updatedItem = {
              ...item,
              SoLuong: sLuong,
            };
            notify_giamsp(item.ComboName);
            themSPvaoGH2(updatedItem)
            return updatedItem;
          } else {
            alert("Số lượng đã thấp nhất!")
          }
        }
        return item;
      });
      setDataCombo(newList) // thằng này cập nhật số lượng hiện lên web
      const rand = Math.random(2) * 1000
      setLamMoiGH(rand)
    } else {
      alert(`Chưa đăng nhập.`)
    }
  }

  const down3 = (maHang) => {
    const newList = data3.map((item) => {
      if (item.MaHang === maHang) {
        let sLuong = item.SoLuong
        if (sLuong >= 1) {
          sLuong -= 1
          const updatedItem = {
            ...item,
            SoLuong: sLuong,
          };
          notify_giamsp(item.TenHang);
          themSPvaoGH(updatedItem)
          return updatedItem;
        } else {
          alert("Số lượng đã thấp nhất!")
        }
      }
      return item;
    });
    setData3(newList) // thằng này cập nhật số lượng hiện lên web
    const rand = Math.random(2) * 1000
    setLamMoiGH(rand)
  }

  const down = (maHang) => {
    const newList = data.map((item) => {
      if (item.MaHang === maHang) {
        let sLuong = item.SoLuong
        if (sLuong >= 1) {
          sLuong -= 1
          const updatedItem = {
            ...item,
            SoLuong: sLuong,
          };
          notify_giamsp(item.TenHang);
          themSPvaoGH(updatedItem)
          return updatedItem;
        } else {
          alert("Số lượng đã thấp nhất!")
        }
      }
      return item;
    });
    setData(newList) // thằng này cập nhật số lượng hiện lên web
    const rand = Math.random(2) * 1000
    setLamMoiGH(rand)
  }

  const nhapTaySoLuong4 = (maHang, val) => {
    if (val.length == 0) {
      val = 1
    }
    if (val <= 0) {
      val = 0
    }
    val = parseInt(val)
    if (maNV != null && maNV != undefined) {
      const newList = dataCombo.map((item) => {
        if (item.IdCombo === maHang) {
          let sLuong = item.SoLuong
          let max = 300
          // if (item.ConLai < 300) {
          //   max = item.ConLai
          // }
          if (sLuong <= max && val > 0 && val.length != 0) {
            sLuong = val
            if (val <= max) {
              const updatedItem = {
                ...item,
                SoLuong: sLuong,
              };
              notify_nhaptaysp2(item.ComboName, val);
              themSPvaoGH2(updatedItem)
              return updatedItem;
            } else {
              const updatedItem = {
                ...item,
                SoLuong: max,
              };
              themSPvaoGH2(updatedItem)
              return updatedItem;
            }
          } else {
            const updatedItem = {
              ...item,
              SoLuong: 0,
            };
            themSPvaoGH2(updatedItem)
            return updatedItem;
          }
        }
        return item;
      });
      setDataCombo(newList) // thằng này cập nhật số lượng hiện lên web
      const rand = Math.random(2) * 1000
      setLamMoiGH(rand)
    } else {
      alert(`Chưa đăng nhập.`)
    }

  }

  const nhapTaySoLuong3 = (maHang, val) => {
    const newList = data3.map((item) => {
      if (item.MaHang === maHang) {
        let sLuong = item.SoLuong
        let max = 300
        if (item.ConLai < 300) {
          max = item.ConLai
        }
        if (sLuong <= max && val > 0 && val.length != 0) {
          sLuong = val
          if (val <= max) {
            const updatedItem = {
              ...item,
              SoLuong: sLuong,
            };
            notify_nhaptaysp2(item.TenHang, val);
            themSPvaoGH(updatedItem)
            return updatedItem;
          } else {
            const updatedItem = {
              ...item,
              SoLuong: max,
            };
            themSPvaoGH(updatedItem)
            return updatedItem;
          }
        } else {
          const updatedItem = {
            ...item,
            SoLuong: 0,
          };
          themSPvaoGH(updatedItem)
          return updatedItem;
        }
      }
      return item;
    });
    setData3(newList) // thằng này cập nhật số lượng hiện lên web
    const rand = Math.random(2) * 1000
    setLamMoiGH(rand)
  }

  const nhapTaySoLuong = (maHang, val) => {
    const newList = data.map((item) => {
      if (item.MaHang === maHang) {
        let sLuong = item.SoLuong
        let max = 300
        if (item.ConLai < 300) {
          max = item.ConLai
        }
        if (sLuong <= max && val > 0 && val.length != 0) {
          sLuong = val
          if (val <= max) {
            const updatedItem = {
              ...item,
              SoLuong: sLuong,
            };
            notify_nhaptaysp(item.TenHang, val);
            themSPvaoGH(updatedItem)
            return updatedItem;
          } else {
            const updatedItem = {
              ...item,
              SoLuong: max,
            };
            themSPvaoGH(updatedItem)
            return updatedItem;
          }
        } else {
          const updatedItem = {
            ...item,
            SoLuong: 0,
          };
          themSPvaoGH(updatedItem)
          return updatedItem;
        }
      }
      return item;
    });
    setData(newList) // thằng này cập nhật số lượng hiện lên web
    const rand = Math.random(2) * 1000
    setLamMoiGH(rand)
  }

  const [searchString, setSearchString] = useState("");
  const handleOnSearch = (string, results) => {
    setSearchString(string);

  }
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // verifytoken();
      if (searchString === "") {
        localStorage.setItem("Searchfromtc", "");
      } else {
        localStorage.setItem("Searchfromtc", searchString);
      }
      setSearchString("");

      event.target.blur()
      router.push("/SanPham")
    }
  }
  const handleOnSelect = (item) => {
    localStorage.setItem("Searchfromtc", item.TenHang);
    setSearchString("");
    router.push("/SanPham")
  }

  const handleOnClear = () => {
    setSearchString("");
  };

  useEffect(() => {
    layMaNV()
  }, [props.rand])

  return (
    <div>
      <Helmet>
        <title>Trang Chủ</title>
        <meta name="description" content="Trang chủ 123" />
      </Helmet>
      <Header valueOfModal={openModalDN} OPModalDN={OPModalDN} callBackApp={DangNhapApp} LayGiaTriSearch={SearchProduct} upDate={lamMoiGH} />
      {/* {window.innerWidth < 425 ? */}
      <div className="header_mobile_trangchu">
        {/* <a href="http://thuocsionline.vn/">
          <img width="160" height="28" src="images/logo.png" className="header_logo_trangchu header_logo header-logo" alt="Thuốc sỉ Online"></img>
        </a> */}
        <div className="header_child trangchu_header_infor">

        </div>
      </div>
      {/* : null
      } */}
      <div className="btn-nav-parent">
        {/* <NavMenu /> */}
      </div>
      <div className='search_trangchu_mobile1'>

        <div onKeyPress={handleKeyPress} >
          <ReactSearchAutocomplete
            items={input}
            id="autocomplete"
            onSearch={handleOnSearch}
            showIcon={false}
            //onHover={handleOnHover}
            onSelect={handleOnSelect}
            //onFocus={handleOnFocus}
            onClear={handleOnClear}
            maxResults={50}
            autoFocus
            placeholder="Tìm Kiếm"
            inputSearchString={searchString}
            fuseOptions={{
              shouldSort: true,
              threshold: 0.0,
              // location: 0,
              // distance: 100,
              ignoreLocation: true,
              maxPatternLength: 32,
              minMatchCharLength: 1,
              keys: ["TenHang", "HoatChat", "HangSX"]
            }}
            resultStringKeyName="linkhinh"
            //formatResult={formatResult}
            formatResult={(item) => {

              let mangItem = item.split("?")

              return (
                <div className="item_search_parent_trangchu">
                  <div className="item_search_image">
                    <img src={mangItem[0]} style={{ width: 50, height: 50 }} onError={handleImgError}></img>
                  </div>
                  <div className="item_search_name">{mangItem[1]} </div>
                  <div className="item_search_price" style={{ border: 'none', color: 'red' }}> {parseInt(mangItem[2]).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} </div>
                </div>
              );

            }}

            styling={{
              height: "44px",
              border: "1px solid #dfe1e5",
              borderRadius: "24px",
              backgroundColor: "white",
              boxShadow: "rgba(32, 33, 36, 0.28) 0px 1px 6px 0px",
              hoverBackgroundColor: "#eee",
              color: "#212121",
              fontSize: "16px",
              fontFamily: "Arial",
              iconColor: "grey",
              lineColor: "rgb(232, 234, 237)",
              placeholderColor: "grey",
              clearIconMargin: '3px 14px 0 0',
              searchIconMargin: '0 0 0 16px',
              zIndex: "9999"
            }}
          />
        </div>

      </div>
      <div className="slider_banner_trangchu" style={{ marginBottom: 20, width: "80%", margin: "auto" }}>
        <ImageGallery
          items={banner}
          showBullets={false}
          showThumbnails={false}
          lazyLoad={true}
          showPlayButton={false}
          autoPlay={true}
          showFullscreenButton={false}
          slideDuration={300}
          slideInterval={5000}
        />
      </div>

      {/* namdeptrai */}

      {
        dataCombo.length > 0 ?
          <div className="slider_trangchu khuyenmai_trangchu">
            <div className="title_sp_trangchu khuyenmai_title">COMBO</div>
            <Slider {...settings2}>
              {
                dataCombo.map((x, i) => {
                  // console.log(`${new Date().getTime()} x=`, x)
                  const vND = x.TotalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                  return (
                    <div className='sanpham_trangchu_parent' key={i}>
                      <div className='baongoai_sp4'>
                        <div className='thumb'>
                          <Link
                            href={{
                              pathname: `/DetailCombo`,
                              query: { item: x.IdCombo },

                            }}
                          >
                            {x.ImageOne == null ? <img src={image_default} width='100%' height="100%"></img> : <img src={x.ImageOne} onError={handleImgError} width='95%' height="100%"></img>}
                          </Link>
                        </div>
                        <div className="section_title_sp_trangchu">
                          <div className='ten_sp_trangchu'>
                            <div className='ten_sp1'>
                              <Link
                                href={{
                                  pathname: `/DetailCombo`,
                                  query: { item: x.IdCombo },

                                }}
                              >
                                <h1 style={{ fontSize: 14 }}>{x.ComboName}</h1>
                              </Link>
                            </div>
                          </div>
                          {
                            x.GiftBundle.length > 0 ?
                              <Link
                                href={{
                                  pathname: `/DetailCombo`,
                                  query: { item: x.IdCombo },

                                }}
                              >
                                <div style={{ color: 'red', textAlign: 'left', fontSize: 14, fontWeight: 'bold' }}>
                                  Quà tặng kèm: {x.GiftBundle}
                                </div>
                              </Link>

                              : <div style={{ minHeight: '19px' }}>
                              </div>
                          }
                          <div className='ten_sp9'>
                            <div className='ten_sp1'>
                              <h3>{vND} </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="soluong_sp">
                        {
                          local != null ?
                            <div className="MuiCardActions-root1 styles_product_action__1Zos7 MuiCardActions-spacing">
                              <button className="MuiButtonBase-root9 MuiIconButton-root styles_button_root__3mGap styles_button_root_minus__2gTtR styles_minus__ysCNs" tabIndex="0" type="button"
                                onClick={() => down4(x.IdCombo)}
                              >
                                <span className="MuiIconButton-label">
                                  <svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M19 13H5v-2h14v2z"></path>
                                  </svg>
                                </span>
                                <span className="MuiTouchRipple-root"></span>
                              </button>
                              <div className="MuiInputBase-root MuiInput-root styles_root_input__2PM1z">
                                <input placeholder="0" type="text" className="MuiInputBase-input MuiInput-input styles_input__3lyzY"
                                  value={x.SoLuong}
                                  onChange={val => nhapTaySoLuong4(x.IdCombo, val.target.value)}
                                />
                              </div>
                              <button style={{ borderColor: 10 }} className="MuiButtonBase-root MuiIconButton-root styles_button_root__3mGap styles_plus__ia9cs" tabIndex="0" type="button"
                                onClick={() => up4(x.IdCombo)}
                              >
                                <span className="MuiIconButton-label">
                                  <svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                                  </svg>
                                </span>
                                <span className="MuiTouchRipple-root"></span>
                              </button>
                            </div>
                            :
                            <div className="MuiCardActions-root1 styles_product_action__1Zos7 MuiCardActions-spacing">
                              <button className="MuiButtonBase-root9 MuiIconButton-root styles_button_root__3mGap styles_button_root_minus__2gTtR styles_minus__ysCNs" tabIndex="0" type="button"
                                onClick={() => verifytoken()}
                              >
                                <span className="MuiIconButton-label">
                                  <svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M19 13H5v-2h14v2z"></path>
                                  </svg>
                                </span>
                                <span className="MuiTouchRipple-root"></span>
                              </button>
                              <div className="MuiInputBase-root MuiInput-root styles_root_input__2PM1z">
                                <input placeholder="0" type="text" className="MuiInputBase-input MuiInput-input styles_input__3lyzY"
                                  value={x.SoLuong}
                                  onChange={val => verifytoken()}
                                />
                              </div>
                              <button style={{ borderColor: 10 }} className="MuiButtonBase-root MuiIconButton-root styles_button_root__3mGap styles_plus__ia9cs" tabIndex="0" type="button"
                                onClick={() => verifytoken()}
                              >
                                <span className="MuiIconButton-label">
                                  <svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                                  </svg>
                                </span>
                                <span className="MuiTouchRipple-root"></span>
                              </button>
                            </div>
                        }


                      </div>
                      {/* namdeptrai edit */}
                    </div>
                  );
                })
              }
            </Slider>
            <div className="parent_btn_tatca">
              {/* <Link to="/MaGiamGia" className="btn_tatca btn_khuyenmai_trangchu"
              >Xem tất cả</Link> */}
            </div>
          </div>
          : null
      }


      {/* Flashsale */}

      {
        data3.length > 0 ?
          <div className="slider_trangchu">
            <div className="title_sp_trangchu flashsale_title">FlashSale</div>
            <Slider {...settings}>
              {
                data3.map((x, i) => {
                  const vND = x.GiaBan.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                  return (
                    <div className='sanpham_trangchu_parent' key={i}>
                      <div className='baongoai_sp4'>
                        <div className='hinh_sp_trangchu'>
                          <Link
                            href={{
                              pathname: `/ChiTietSanPham`,
                              query: { item: x.MaHang },

                            }}
                          >
                            {
                              x.HinhAnh == null ? <img src={image_default} width='100%' height="100%"></img> : <img src={x.HinhAnh} onError={handleImgError} width='95%' height="100%"></img>
                            }
                          </Link>

                        </div>
                        <div className="section_title_sp_trangchu">
                          <div className='ten_sp_trangchu'>
                            <div className='ten_sp1'>
                              <Link
                                href={{
                                  pathname: `/ChiTietSanPham`,
                                  query: { item: x.MaHang },

                                }}
                              >
                                <h1 style={{ fontSize: 14 }}>{x.TenHang}</h1>
                              </Link>

                            </div>
                          </div>
                          <div className='tongcls_trangchu'>
                            {
                              x.HDnhanh == 1 ?
                                <div className='MuiBox-root jss493 tag_tagContainer__1akLh'>
                                  <img src="https://img.icons8.com/material-rounded/2x/26e07f/fast-cart.png" alt="Girl in a jacket" width="20" height="20" />

                                  <p className='MuiTypography-root MuiTypography-body454'>
                                    Hóa đơn nhanh
                                  </p>
                                </div>
                                : null
                            }
                            {
                              x.BanChay == 1 ?
                                <div className='MuiBox-root jss493 tag_tagContainer__1akLh1'>
                                  <img src="https://img.icons8.com/material-sharp/2x/26e07f/facebook-like.png" alt="Girl in a jacket" width="20" height="20" />
                                  <p className='MuiTypography-root MuiTypography-body11'>Bán chạy</p>
                                </div>
                                : null
                            }

                            {
                              x.GHnhanh == 1 ?
                                <div className='MuiBox-root jss493 tag_tagContainer__1akLh'>
                                  <img src="https://img.icons8.com/fluent-systems-filled/2x/26e07f/fast-cart.png" alt="Girl in a jacket" width="20" height="20" />
                                  <p className='MuiTypography-root MuiTypography-body454'>Giao nhanh</p>
                                </div>
                                : null
                            }
                            {
                              x.SVip == 1 ?
                                <div className='MuiBox-root jss493 tag_tagContainer__1akLh2'>
                                  <img src="https://img.icons8.com/material-rounded/2x/star.png" alt="Girl in a jacket" width="20" height="20" />
                                  <p className='MuiTypography-root MuiTypography-body2'>Sĩ Vip</p>
                                </div>
                                : null
                            }
                            {
                              x.NhiKhoa == 1 ?
                                <div className='MuiBox-root jss493 tag_tagContainer__1akLh3'>
                                  <img src="https://img.icons8.com/ios-glyphs/2x/fa314a/plus-math.png" alt="Girl in a jacket" width="20" height="20" />
                                  <p className='MuiTypography-root MuiTypography-body3'>Nhi Khoa</p>
                                </div>
                                : null
                            }
                            {
                              x.FlashSale == 1 ?
                                <div className='MuiBox-root jss493 tag_tagContainer__1akLh4'>
                                  <img src="https://pngimg.com/uploads/lightning/lightning_PNG51.png" alt="Girl in a jacket" width="20" height="20" />
                                  <p className='MuiTypography-root MuiTypography-body4'>Flash sale</p>
                                </div>
                                : null
                            }
                            {
                              x.NhaKhoa == 1 ?
                                <div className='MuiBox-root jss493 tag_tagContainer__1akLh5'>
                                  <img src="http://benhviendongdo.com.vn/wp-content/uploads/2018/04/icon-rang-ham-mat.png" alt="Girl in a jacket" width="20" height="20" />
                                  <p className='MuiTypography-root MuiTypography-body5'>Nha Khoa</p>
                                </div>
                                : null
                            }
                            {
                              x.SanKhoa == 1 ?
                                <div className='MuiBox-root jss493 tag_tagContainer__1akLh6'>
                                  <img src="https://goldenhealthcarevn.com/wp-content/uploads/2019/03/ICON-GOLDEN-08.png" alt="Girl in a jacket" width="20" height="20" />
                                  <p className='MuiTypography-root MuiTypography-body6'>Sản Khoa</p>
                                </div>
                                : null
                            }
                            {
                              x.DaLieu == 1 ?
                                <div className='MuiBox-root jss493 tag_tagContainer__1akLh7'>
                                  <img src="http://benhviendongdo.com.vn/wp-content/uploads/2018/04/icon-khoa-da-lieu.png" alt="Girl in a jacket" width="20" height="20" />
                                  <p className='MuiTypography-root MuiTypography-body7'>Da Liễu</p>
                                </div>
                                : null
                            }
                            {
                              x.NTHop == 1 ?
                                <div className='MuiBox-root jss493 tag_tagContainer__1akLh5'>

                                  <p className='MuiTypography-root MuiTypography-body5'>Nội Tổng Hợp</p>
                                </div>
                                : null
                            }
                            {
                              x.ThanKinh == 1 ?
                                <div className='MuiBox-root jss493 tag_tagContainer__1akLh8'>

                                  <img src="http://www.benhvientiengiang.com.vn/Media/images/icons/Noi%20than%20kinh.png" alt="Girl in a jacket" width="20" height="20" />
                                  <p className='MuiTypography-root MuiTypography-body8'>Thần Kinh</p>
                                </div>
                                : null
                            }
                            {
                              x.SPmoi == 1 ?
                                <div className='MuiBox-root jss493 tag_tagContainer__1akLh12'>
                                  <img src="https://img.icons8.com/fluent-systems-filled/2x/4a90e2/electricity.png" alt="Girl in a jacket" width="20" height="20" />
                                  <p className='MuiTypography-root MuiTypography-body123'>Sản phẩm mới</p>
                                </div>
                                : null
                            }
                            {
                              x.BV == 1 ?
                                <div className='MuiBox-root jss493 tag_tagContainer__1akLh5'>

                                  <p className='MuiTypography-root MuiTypography-body5'>Bệnh Viện/Phòng Khám</p>
                                </div>
                                : null
                            }
                          </div>
                          <div className='ten_sp2'>
                            <div className='ten_sp1'>
                              <p style={{ fontSize: 15 }}>{x.QCDG}</p>
                            </div>
                          </div>
                          <div className='ten_sp2'>
                            <div className='ten_sp1'>
                              {
                                x.ConLai < 300 ?
                                  x.ConLai <= 0 ?
                                    <p style={{ fontSize: 16, color: '#dc3545', fontWeight: 'bold' }}>Sản phẩm tạm hết hàng </p>
                                    :
                                    <p style={{ fontSize: 16, color: '#dc3545', fontWeight: 'bold' }}>Đặt tối đa {x.ConLai} sản phẩm </p>
                                  :
                                  <p style={{ fontSize: 16, color: '#dc3545', fontWeight: 'bold' }}>Đặt tối đa 300 sản phẩm </p>
                              }
                            </div>
                          </div>

                          <div className='ten_sp9'>
                            <div className='ten_sp1'>
                              <h3>{vND} </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="soluong_sp">
                        {
                          local != null ?
                            x.ConLai > 0 ?
                              <div className="MuiCardActions-root1 styles_product_action__1Zos7 MuiCardActions-spacing">
                                <button onClick={() => down3(x.MaHang)} className="MuiButtonBase-root9 MuiIconButton-root styles_button_root__3mGap styles_button_root_minus__2gTtR styles_minus__ysCNs" tabIndex="0" type="button">
                                  <span className="MuiIconButton-label">
                                    <svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                      <path d="M19 13H5v-2h14v2z"></path>
                                    </svg>
                                  </span>
                                  <span className="MuiTouchRipple-root"></span>
                                </button><div className="MuiInputBase-root MuiInput-root styles_root_input__2PM1z">
                                  {/* <input value={x.soLuong} placeholder="0" type="text" className="MuiInputBase-input MuiInput-input styles_input__3lyzY" /> */}
                                  <input value={x.SoLuong} onChange={value => { nhapTaySoLuong3(x.MaHang, parseInt(value.target.value)) }} placeholder="0" type="text" className="MuiInputBase-input MuiInput-input styles_input__3lyzY" />
                                </div>
                                <button onClick={() => up3(x.MaHang)} style={{ borderColor: 10 }} className="MuiButtonBase-root MuiIconButton-root styles_button_root__3mGap styles_plus__ia9cs" tabIndex="0" type="button">
                                  {/* <button style={{ borderColor: 10 }} className="MuiButtonBase-root MuiIconButton-root styles_button_root__3mGap styles_plus__ia9cs" tabIndex="0" type="button"> */}
                                  <span className="MuiIconButton-label"><svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                                  </svg>
                                  </span>
                                  <span className="MuiTouchRipple-root"></span>
                                </button>
                              </div>
                              :
                              <div className="MuiCardActions-root1 styles_product_action__1Zos7 MuiCardActions-spacing">
                                <button disabled className="MuiButtonBase-root9 MuiIconButton-root styles_button_root__3mGap styles_button_root_minus__2gTtR styles_minus__ysCNs" tabIndex="0" type="button">
                                  <span className="MuiIconButton-label">
                                    <svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                      <path d="M19 13H5v-2h14v2z"></path>
                                    </svg>
                                  </span>
                                  <span className="MuiTouchRipple-root"></span>
                                </button><div className="MuiInputBase-root MuiInput-root styles_root_input__2PM1z">
                                  {/* <input value={x.soLuong} placeholder="0" type="text" className="MuiInputBase-input MuiInput-input styles_input__3lyzY" /> */}
                                  <input value={0} placeholder="0" type="text" className="MuiInputBase-input MuiInput-input styles_input__3lyzY" />
                                </div>
                                <button disabled style={{ borderColor: 10 }} className="MuiButtonBase-root MuiIconButton-root styles_button_root__3mGap styles_plus__ia9cs" tabIndex="0" type="button">
                                  {/* <button style={{ borderColor: 10 }} className="MuiButtonBase-root MuiIconButton-root styles_button_root__3mGap styles_plus__ia9cs" tabIndex="0" type="button"> */}
                                  <span className="MuiIconButton-label"><svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                                  </svg>
                                  </span>
                                  <span className="MuiTouchRipple-root"></span>
                                </button>
                              </div>
                            :
                            <div className="MuiCardActions-root1 styles_product_action__1Zos7 MuiCardActions-spacing">
                              <button onClick={verifytoken} className="MuiButtonBase-root9 MuiIconButton-root styles_button_root__3mGap styles_button_root_minus__2gTtR styles_minus__ysCNs" tabIndex="0" type="button">
                                <span className="MuiIconButton-label">
                                  <svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M19 13H5v-2h14v2z"></path>
                                  </svg>
                                </span>
                                <span className="MuiTouchRipple-root"></span>
                              </button><div className="MuiInputBase-root MuiInput-root styles_root_input__2PM1z">
                                {/* <input value={x.soLuong} placeholder="0" type="text" className="MuiInputBase-input MuiInput-input styles_input__3lyzY" /> */}
                                <input value={x.SoLuong} onChange={verifytoken} placeholder="0" type="text" className="MuiInputBase-input MuiInput-input styles_input__3lyzY" />
                              </div>
                              <button onClick={verifytoken} style={{ borderColor: 10 }} className="MuiButtonBase-root MuiIconButton-root styles_button_root__3mGap styles_plus__ia9cs" tabIndex="0" type="button">
                                {/* <button style={{ borderColor: 10 }} className="MuiButtonBase-root MuiIconButton-root styles_button_root__3mGap styles_plus__ia9cs" tabIndex="0" type="button"> */}
                                <span className="MuiIconButton-label"><svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                                </svg>
                                </span>
                                <span className="MuiTouchRipple-root"></span>
                              </button>
                            </div>

                        }

                      </div>
                    </div>
                  );
                })
              }
            </Slider>
            <div className="parent_btn_tatca">
              {/* <Link to="/SanPham" className="btn_tatca"
              >Xem tất cả</Link> */}
            </div>
          </div>
          : null}

      {/* khuyến mãi */}

      {
        data.length > 0 ?
          <div className="slider_trangchu khuyenmai_trangchu">
            <div className="title_sp_trangchu khuyenmai_title">Khuyến Mãi</div>
            <Slider {...settings}>
              {
                data.map((x, i) => {
                  const vND = x.GiaBan.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                  const giaKhuyenMai = (x.GiaBan - (x.GiaBan * x.PhanTramKM / 100)).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                  return (
                    <div className='sanpham_trangchu_parent' key={i}>
                      <div className="style_ribbon__25ikq style_price_down__1Hhvc">
                        <div className="style_ribbon_percent__4fm_G">{x.PhanTramKM}%</div>
                        <div className="style_ribbon_status__3DLch">Giảm</div>
                      </div>
                      <div className='baongoai_sp4'>
                        <div className='hinh_sp_trangchu'>
                          <Link
                            href={{
                              pathname: `/ChiTietSanPham`,
                              query: { item: x.MaHang },

                            }}
                          >
                            {x.HinhAnh == null ? <img src={image_default} width='100%' height="100%"></img> : <img src={x.HinhAnh} onError={handleImgError} width='95%' height="100%"></img>}
                          </Link>
                        </div>
                        <div className="section_title_sp_trangchu">
                          <div className='ten_sp_trangchu'>
                            <div className='ten_sp1'>
                              <Link
                                href={{
                                  pathname: `/ChiTietSanPham`,
                                  query: { item: x.MaHang },
                                }}
                              >
                                <h1 style={{ fontSize: 14 }}>{x.TenHang}</h1>
                              </Link>
                            </div>
                          </div>
                          <div className='tongcls_trangchu'>
                            {
                              x.HDnhanh == 1 ?
                                <div className='MuiBox-root jss493 tag_tagContainer__1akLh'>
                                  <img src="https://img.icons8.com/material-rounded/2x/26e07f/fast-cart.png" alt="Girl in a jacket" width="20" height="20" />
                                  <p className='MuiTypography-root MuiTypography-body454'>
                                    Hóa đơn nhanh
                                  </p>
                                </div>
                                : null
                            }
                            {
                              x.BanChay == 1 ?
                                <div className='MuiBox-root jss493 tag_tagContainer__1akLh1'>
                                  <img src="https://img.icons8.com/material-sharp/2x/26e07f/facebook-like.png" alt="Girl in a jacket" width="20" height="20" />
                                  <p className='MuiTypography-root MuiTypography-body11'>Bán chạy</p>
                                </div>
                                : null
                            }
                            {
                              x.GHnhanh == 1 ?
                                <div className='MuiBox-root jss493 tag_tagContainer__1akLh'>
                                  <img src="https://img.icons8.com/fluent-systems-filled/2x/26e07f/fast-cart.png" alt="Girl in a jacket" width="20" height="20" />
                                  <p className='MuiTypography-root MuiTypography-body454'>Giao nhanh</p>
                                </div>
                                : null
                            }
                            {
                              x.SVip == 1 ?
                                <div className='MuiBox-root jss493 tag_tagContainer__1akLh2'>
                                  <img src="https://img.icons8.com/material-rounded/2x/star.png" alt="Girl in a jacket" width="20" height="20" />
                                  <p className='MuiTypography-root MuiTypography-body2'>Sĩ Vip</p>
                                </div>
                                : null
                            }
                            {
                              x.NhiKhoa == 1 ?
                                <div className='MuiBox-root jss493 tag_tagContainer__1akLh3'>
                                  <img src="https://img.icons8.com/ios-glyphs/2x/fa314a/plus-math.png" alt="Girl in a jacket" width="20" height="20" />
                                  <p className='MuiTypography-root MuiTypography-body3'>Nhi Khoa</p>
                                </div>
                                : null
                            }
                            {
                              x.FlashSale == 1 ?
                                <div className='MuiBox-root jss493 tag_tagContainer__1akLh4'>
                                  <img src="https://pngimg.com/uploads/lightning/lightning_PNG51.png" alt="Girl in a jacket" width="20" height="20" />
                                  <p className='MuiTypography-root MuiTypography-body4'>Flash sale</p>
                                </div>
                                : null
                            }
                            {
                              x.NhaKhoa == 1 ?
                                <div className='MuiBox-root jss493 tag_tagContainer__1akLh5'>
                                  <img src="http://benhviendongdo.com.vn/wp-content/uploads/2018/04/icon-rang-ham-mat.png" alt="Girl in a jacket" width="20" height="20" />
                                  <p className='MuiTypography-root MuiTypography-body5'>Nha Khoa</p>
                                </div>
                                : null
                            }
                            {
                              x.SanKhoa == 1 ?
                                <div className='MuiBox-root jss493 tag_tagContainer__1akLh6'>
                                  <img src="https://goldenhealthcarevn.com/wp-content/uploads/2019/03/ICON-GOLDEN-08.png" alt="Girl in a jacket" width="20" height="20" />
                                  <p className='MuiTypography-root MuiTypography-body6'>Sản Khoa</p>
                                </div>
                                : null
                            }
                            {
                              x.DaLieu == 1 ?
                                <div className='MuiBox-root jss493 tag_tagContainer__1akLh7'>
                                  <img src="http://benhviendongdo.com.vn/wp-content/uploads/2018/04/icon-khoa-da-lieu.png" alt="Girl in a jacket" width="20" height="20" />
                                  <p className='MuiTypography-root MuiTypography-body7'>Da Liễu</p>
                                </div>
                                : null
                            }
                            {
                              x.NTHop == 1 ?
                                <div className='MuiBox-root jss493 tag_tagContainer__1akLh5'>

                                  <p className='MuiTypography-root MuiTypography-body5'>Nội Tổng Hợp</p>
                                </div>
                                : null
                            }
                            {
                              x.ThanKinh == 1 ?
                                <div className='MuiBox-root jss493 tag_tagContainer__1akLh8'>

                                  <img src="http://www.benhvientiengiang.com.vn/Media/images/icons/Noi%20than%20kinh.png" alt="Girl in a jacket" width="20" height="20" />
                                  <p className='MuiTypography-root MuiTypography-body8'>Thần Kinh</p>
                                </div>
                                : null
                            }
                            {
                              x.SPmoi == 1 ?
                                <div className='MuiBox-root jss493 tag_tagContainer__1akLh12'>
                                  <img src="https://img.icons8.com/fluent-systems-filled/2x/4a90e2/electricity.png" alt="Girl in a jacket" width="20" height="20" />
                                  <p className='MuiTypography-root MuiTypography-body123'>Sản phẩm mới</p>
                                </div>
                                : null
                            }
                            {
                              x.BV == 1 ?
                                <div className='MuiBox-root jss493 tag_tagContainer__1akLh5'>

                                  <p className='MuiTypography-root MuiTypography-body5'>Bệnh Viện/Phòng Khám</p>
                                </div>
                                : null
                            }
                          </div>
                          <div className='ten_sp2'>
                            <div className='ten_sp1'>
                              <p style={{ fontSize: 15 }}>{x.QCDG}</p>
                            </div>
                          </div>
                          <div className='ten_sp2'>
                            <div className='ten_sp1'>
                              {
                                x.ConLai < 300 ?
                                  x.ConLai <= 0 ?
                                    <p style={{ fontSize: 16, color: '#dc3545', fontWeight: 'bold' }}>Sản phẩm tạm hết hàng </p>
                                    :
                                    <p style={{ fontSize: 16, color: '#dc3545', fontWeight: 'bold' }}>Đặt tối đa {x.ConLai} sản phẩm </p>
                                  :
                                  <p style={{ fontSize: 16, color: '#dc3545', fontWeight: 'bold' }}>Đặt tối đa 300 sản phẩm </p>
                              }
                            </div>
                          </div>
                          <div className='ten_sp9'>
                            <div className='ten_sp1'>
                              <h3>{giaKhuyenMai} </h3>
                            </div>
                            <div className='ten_sp1 gia_goc'>
                              <h3>{vND} </h3>
                            </div>
                          </div>

                        </div>

                      </div>
                      <div className="soluong_sp">
                        {
                          local != null ?
                            x.ConLai > 0 ?
                              <div className="MuiCardActions-root1 styles_product_action__1Zos7 MuiCardActions-spacing">
                                <button onClick={() => down(x.MaHang)} className="MuiButtonBase-root9 MuiIconButton-root styles_button_root__3mGap styles_button_root_minus__2gTtR styles_minus__ysCNs" tabIndex="0" type="button">
                                  <span className="MuiIconButton-label">
                                    <svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                      <path d="M19 13H5v-2h14v2z"></path>
                                    </svg>
                                  </span>
                                  <span className="MuiTouchRipple-root"></span>
                                </button><div className="MuiInputBase-root MuiInput-root styles_root_input__2PM1z">
                                  <input value={x.SoLuong} onChange={value => { nhapTaySoLuong(x.MaHang, parseInt(value.target.value)) }} placeholder="0" type="text" className="MuiInputBase-input MuiInput-input styles_input__3lyzY" />
                                </div>
                                <button onClick={() => up(x.MaHang)} style={{ borderColor: 10 }} className="MuiButtonBase-root MuiIconButton-root styles_button_root__3mGap styles_plus__ia9cs" tabIndex="0" type="button">
                                  <span className="MuiIconButton-label"><svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                                  </svg>
                                  </span>
                                  <span className="MuiTouchRipple-root"></span>
                                </button>
                              </div>
                              :
                              <div className="MuiCardActions-root1 styles_product_action__1Zos7 MuiCardActions-spacing">
                                <button disabled className="MuiButtonBase-root9 MuiIconButton-root styles_button_root__3mGap styles_button_root_minus__2gTtR styles_minus__ysCNs" tabIndex="0" type="button">
                                  <span className="MuiIconButton-label">
                                    <svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                      <path d="M19 13H5v-2h14v2z"></path>
                                    </svg>
                                  </span>
                                  <span className="MuiTouchRipple-root"></span>
                                </button><div className="MuiInputBase-root MuiInput-root styles_root_input__2PM1z">
                                  <input value={0} placeholder="0" type="text" className="MuiInputBase-input MuiInput-input styles_input__3lyzY" />
                                </div>
                                <button disabled style={{ borderColor: 10 }} className="MuiButtonBase-root MuiIconButton-root styles_button_root__3mGap styles_plus__ia9cs" tabIndex="0" type="button">
                                  <span className="MuiIconButton-label"><svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                                  </svg>
                                  </span>
                                  <span className="MuiTouchRipple-root"></span>
                                </button>
                              </div>
                            :
                            <div className="MuiCardActions-root1 styles_product_action__1Zos7 MuiCardActions-spacing">
                              <button onClick={verifytoken} className="MuiButtonBase-root9 MuiIconButton-root styles_button_root__3mGap styles_button_root_minus__2gTtR styles_minus__ysCNs" tabIndex="0" type="button">
                                <span className="MuiIconButton-label">
                                  <svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M19 13H5v-2h14v2z"></path>
                                  </svg>
                                </span>
                                <span className="MuiTouchRipple-root"></span>
                              </button><div className="MuiInputBase-root MuiInput-root styles_root_input__2PM1z">
                                <input value={x.SoLuong} onChange={verifytoken} placeholder="0" type="text" className="MuiInputBase-input MuiInput-input styles_input__3lyzY" />
                              </div>
                              <button onClick={verifytoken} style={{ borderColor: 10 }} className="MuiButtonBase-root MuiIconButton-root styles_button_root__3mGap styles_plus__ia9cs" tabIndex="0" type="button">
                                <span className="MuiIconButton-label"><svg className="MuiSvgIcon-root styles_icon__2W-1N" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                                </svg>
                                </span>
                                <span className="MuiTouchRipple-root"></span>
                              </button>
                            </div>
                        }
                      </div>
                    </div>
                  );
                })
              }
            </Slider>
            <div className="parent_btn_tatca">
              {/* <Link to="/KhuyenMai" className="btn_tatca  btn_khuyenmai_trangchu"
              >Xem tất cả</Link> */}
            </div>
          </div>
          : null}

      {/* doi tac */}

      <div className="doitac_par_trangchu">
        <div className="title_sp_trangchu title_trangchu_mobile">Đối tác của thuocsionline.vn</div>
        {/* <Slider {...settings_doitac}>
          <div className="margin_logo">
            <div className="logo_doitac">
              <img src={anthien_png} width="100%" ></img>
            </div>
          </div>
          <div className="margin_logo">
            <div className="logo_doitac">
              <img src={bepharco_png} width="100%" ></img>
            </div>
          </div>
          <div className="logo_doitac">
            <img src={danapha_png} width="100%"></img>
          </div>
          <div className="logo_doitac">
            <img src={DHG_png} width="100%" ></img>
          </div>
          <div className="logo_doitac">
            <img src={domesco_png} width="100%"></img>
          </div>
          <div className="logo_doitac">
            <img src={sgk_png} width="100%" ></img>
          </div>
          <div className="logo_doitac">
            <img src={hetaro_png} width="100%" ></img>
          </div>
          <div className="logo_doitac">
            <img src={mebipha_png} width="100%"></img>
          </div>
          <div className="logo_doitac">
            <img src={Sanofi_png} width="100%"></img>
          </div>
          <div className="logo_doitac">
            <img src={stada_png} width="100%" ></img>
          </div>
          <div className="logo_doitac">
            <img src={ymed_png} width="100%" ></img>
          </div>
          <div className="logo_doitac">
            <img src={DBD_png} width="100%" ></img>
          </div>
          <div className="logo_doitac">
            <img src={imexpharm_png} width="100%" ></img>
          </div>
          <div className="logo_doitac">
            <img src={LogoOPC_png} width="100%" ></img>
          </div>
          <div className="logo_doitac">
            <img src={stella_png} width="100%" ></img>
          </div>
          <div className="logo_doitac">
            <img src={vidipha_png} width="100%"></img>
          </div>
        </Slider> */}
      </div>

      {/* danh gia khach hang */}
      <div className="title_sp_trangchu title_trangchu_mobile">Khách hàng đánh giá về thuocsionline</div>
      <div className="slider_danhgia">
        <Slider {...settings_khachhang}>
          <div>
            <div className="danhgia_parent">
              <img className="avatar_danhgia" src={CoLanAnh}></img>
              <div className="thongtin_danhgia">
                <div className="danhgia_name">Cô Lan Anh</div>
                <div className="danhgia_drugstore">Chủ nhà thuốc Hòa Bình - Buôn Ma Thuột</div>
                <div className="danhgia_comment">
                  <svg className="MuiSvgIcon-root icon_comment icon_comment_rotate" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"></path></svg>
                  Địa chỉ đáng tin cậy. Đầy đủ hàng, giao hàng nhanh và thuận tiện
                  <svg className="MuiSvgIcon-root icon_comment" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"></path></svg>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="danhgia_parent">
              {/* <img className="" src={ChiHanh}></img> */}
              <Image
                className='avatar_danhgia'
                src="/avatar_khach/CoLanAnh.jpg"
                width={50}
                height={50}

              />
              <div className="thongtin_danhgia">
                <div className="danhgia_name">Chị Hạnh</div>
                <div className="danhgia_drugstore">Nhà thuốc Hạnh - Bình Thạnh</div>
                <div className="danhgia_comment">
                  <svg className="MuiSvgIcon-root icon_comment icon_comment_rotate" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"></path></svg>
                  Chị biết và đặt thuocsionline được hơn 1 năm, chị có thể dễ dàng xem giá các thuốc và cân chỉnh đơn hàng ngoài ra mỗi ngày đều có sản phẩm mới giúp nhà thuốc đa dạng hơn danh mục hàng.
                  <svg className="MuiSvgIcon-root icon_comment" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"></path></svg>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="danhgia_parent">
              <img className="avatar_danhgia" src={AnhTruong}></img>
              <div className="thongtin_danhgia">
                <div className="danhgia_name">Anh Trường</div>
                <div className="danhgia_drugstore">Nhà thuốc tây số 2 - Vĩnh Long</div>
                <div className="danhgia_comment">
                  <svg className="MuiSvgIcon-root icon_comment icon_comment_rotate" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"></path></svg>
                  Hàng hóa đa dạng dễ dàng tra cứu giá và đặt hàng thuốc.
                  <svg className="MuiSvgIcon-root icon_comment" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"></path></svg>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="danhgia_parent">
              <img className="avatar_danhgia" src={CoHang}></img>
              <div className="thongtin_danhgia">
                <div className="danhgia_name">Cô Hằng</div>
                <div className="danhgia_drugstore">Nhà thuốc Vy Vy - Thủ Đức</div>
                <div className="danhgia_comment">
                  <svg className="MuiSvgIcon-root icon_comment icon_comment_rotate" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"></path></svg>
                  Giao hàng nhanh chóng, nhân viên tư vấn nhiệt tình.
                  <svg className="MuiSvgIcon-root icon_comment" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"></path></svg>
                </div>
              </div>
            </div>
          </div>

        </Slider>
      </div>
      <Footer></Footer>
    </div>
  );
}
export default TrangChu;
