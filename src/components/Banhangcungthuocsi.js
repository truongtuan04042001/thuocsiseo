// import { useEffect, useState } from 'react';
// import Header2 from '../components/Header2';
// import Footer from '../components/Footer';
// import logothuocsi from '../images/Logo.png';
// import '../css/banhangcungthuocsi.css';
// import { NavLink, Link } from 'react-router-dom';
// import Slider from 'react-slick'
// import 'slick-carousel/slick/slick.css'
// import 'slick-carousel/slick/slick-theme.css'
// const Banhangcungthuocsi = (props) => {
//     const settings = {
//         dots: true,
//         infinite: true,
//         vertical: true,
//         // verticalSwiping: true,
//         fade: true,
//         beforeChange: function (currentSlide, nextSlide) {
//             console.log('before change', currentSlide, nextSlide);
//         },
//         afterChange: function (currentSlide) {
//             console.log('after change', currentSlide);
//         },
//     };
//     return (
//         <div className='tong-ts'>
//             <Header2></Header2>
//             <div className='SECTION512'>
//                 <a href="http://thuocsionline.vn/" className='trai-ts'>
//                     <img width="200" height="36" src={logothuocsi} className="header_logo header-logo" alt="Thuốc sỉ Online"></img>
//                 </a>
//                 <div className='phai-ts'>
//                     <Link to='/' className="ThuocsiSeller">

//                         <p className="ladi-headline">Hotline: 028.7303.7188</p>

//                     </Link>
//                     <Link to='/' className="ThuocsiSeller">

//                         <p className="ladi-headline">Thuocsi Seller Center Support</p>

//                     </Link>
//                 </div>

//             </div>
//             <div className="slider_ts" style={{ marginBottom: 20 }}>
//                 <Slider {...settings}>
//                     <div><img src='https://w.ladicdn.com/s1300x850/5eb3844d6b12637b2bd2a375/11-20210512062940.jpg' width='100%' height='500'></img ></div>
//                     <div><img src='http://anh.khampha.vn/upload/2-2020/images/2020-04-27/1587974941-100.jpg' width='100%' height='500'></img></div>

//                 </Slider>
//             </div>

//             <div className="image-background">
//                 <div className='anh-ts'>
//                     <img src='https://w.ladicdn.com/s600x400/5eb3844d6b12637b2bd2a375/dang-ky-ngay-copy-20210517022708.png' width='30%' height='30%'></img>
//                 </div>
//             </div>
//             <div className="image-background">
//                 <div className='anh-ts'>
//                     <img src='https://w.ladicdn.com/s1150x450/5eb3844d6b12637b2bd2a375/5ly-do-kinh-doanh-copy-20210512091613.png' width='60%' height='60%'></img>
//                 </div>
//             </div>
//             <div className='gioithieu'>
//                 <div className='gioithieu1'>
//                     <div className='anhgthieu'>
//                         <img src='https://w.ladicdn.com/s500x550/5eb3844d6b12637b2bd2a375/2-kho-20210527033954.png' width='100%' height='240' className='botron'></img>
//                     </div>

//                 </div>
//                 <div className='gioithieu1'>
//                     <div className='anhgthieu'>
//                         <img src='https://w.ladicdn.com/s500x550/5eb3844d6b12637b2bd2a375/_30000-20210527033954.png' width='100%' height='240' className='botron'></img>
//                     </div>

//                 </div>
//                 <div className='gioithieu1'>
//                     <div className='anhgthieu'>
//                         <img src='https://w.ladicdn.com/s500x550/5eb3844d6b12637b2bd2a375/27000-20210517034556.png' width='100%' height='240' className='botron'></img>
//                     </div>

//                 </div>
//                 <div className='gioithieu1'>
//                     <div className='anhgthieu'>
//                         <img src='https://w.ladicdn.com/s500x550/5eb3844d6b12637b2bd2a375/8000-khach-hang-20210527033954.png' width='100%' height='240' className='botron'></img>
//                     </div>

//                 </div>
//                 <div className='gioithieu1'>
//                     <div className='anhgthieu'>
//                         <img src='https://w.ladicdn.com/s500x550/5eb3844d6b12637b2bd2a375/2000-nguoi-dung-moi-20210517034556.png' width='100%' height='240' className='botron'></img>
//                     </div>

//                 </div>


//             </div>
//             <div className='tuvan'>
//                 <div className='anh-tuvan'>
//                     <div className='anh-tuvan6'>
//                         <img src='https://w.ladicdn.com/s600x550/5eb3844d6b12637b2bd2a375/uu-tien-hien-thi-20210518033516.png' className='a_tuvan'></img>
//                     </div>
//                     <div className='anh-tuvan6'>
//                         <img src='https://w.ladicdn.com/s600x550/5eb3844d6b12637b2bd2a375/ho-tro-24_7-20210518033516.png' className='a_tuvan'></img>
//                     </div>
//                 </div>
//                 <div className='anh-tuvan1'>
//                     <div className='anh-tuvan6'>
//                         <img src='https://w.ladicdn.com/s600x550/5eb3844d6b12637b2bd2a375/mkt-trial--20210518033516.png' className='a_tuvan3'></img>
//                     </div>
//                     <div className='anh-tuvan6'>
//                         <img src='https://w.ladicdn.com/s600x550/5eb3844d6b12637b2bd2a375/tang-banner-20210518033516.png' className='a_tuvan3'></img>
//                     </div>
//                     <div className='anh-tuvan6'>
//                         <img src='https://w.ladicdn.com/s600x550/5eb3844d6b12637b2bd2a375/mien-phi-ban-hang-20210604081339.png' className='a_tuvan3'></img>
//                     </div>

//                 </div>
//             </div>
//             <div className='tuvan'>
//                 <div className='anh-tuvan'>
//                     <a className='anh-tuvan6' href='https://www.facebook.com/thuocsionline'>
//                         <img src='https://w.ladicdn.com/s550x550/5eb3844d6b12637b2bd2a375/trung-tam-ho-tro-20210518070745.png' className='a_tuvan4'></img>
//                     </a>
//                     <a className='anh-tuvan6' href='https://www.facebook.com/thuocsionline'>
//                         <img src='https://w.ladicdn.com/s550x550/5eb3844d6b12637b2bd2a375/doi-ngu-sales-20210518070745.png' className='a_tuvan4'
//                         ></img>
//                     </a>

//                 </div>
//                 <div className='anh-tuvan1'>
//                     <a className='anh-tuvan6' href='https://www.facebook.com/thuocsionline'>
//                         <img src='https://w.ladicdn.com/s550x550/5eb3844d6b12637b2bd2a375/tiep-can-hon-8000-20210527034056.png' className='a_tuvan4'></img>
//                     </a>
//                     <a className='anh-tuvan6' href='https://www.facebook.com/thuocsionline'>
//                         <img src='https://w.ladicdn.com/s550x550/5eb3844d6b12637b2bd2a375/luon-cap-nhat-20210518070745.png' className='a_tuvan4'></img>
//                     </a>
//                     <a className='anh-tuvan6' href='https://www.facebook.com/thuocsionline' s>
//                         <img src='https://w.ladicdn.com/s550x550/5eb3844d6b12637b2bd2a375/van-chuyen-20210518070745.png' className='a_tuvan4'></img>
//                     </a>
//                 </div>
//             </div>
//             <div className="slider_ts" style={{ marginBottom: 20 }}>
//                 <Slider {...settings}>
//                     <div><img src='https://w.ladicdn.com/s1300x850/5eb3844d6b12637b2bd2a375/11-20210512062940.jpg' width='100%' height='500'></img ></div>
//                     <div><img src='http://anh.khampha.vn/upload/2-2020/images/2020-04-27/1587974941-100.jpg' width='100%' height='500'></img></div>

//                 </Slider>
//             </div>
//             <div className='dangki-ts'>
//                 <div className='anhtrongsuot'>
//                     <img src='https://w.ladicdn.com/s800x850/5eb3844d6b12637b2bd2a375/cc7cc438108de0d3b99c-removebg-preview-20210204104659.png'></img>
//                 </div>
//                 <div className='dki-ts'>

//                     <h3 className="ladi-headline3">ĐĂNG KÝ BÁN HÀNG</h3>
//                     <input type="text" className="inputnhap" value='Họ và Tên' />
//                     <input type="text" className="inputnhap" value='Số điện thoại' />
//                     <input type="text" className="inputnhap" value='Email' />
//                     <input type="text" className="inputnhap" value='Địa chỉ' />
//                     <Link to='/'>
//                         <div className='dangkingay-ts'>
//                             <b className='chu-ts'>ĐĂNG KÝ NGAY</b>
//                         </div>
//                     </Link>
//                     <b class="ladi-headline1">Bán hàng cùng thuocsi-Cùng tăng lợi nhuận vượt bậc</b>
//                 </div>
//             </div>
//             <Footer></Footer>
//         </div>
//     )
// }
// export default Banhangcungthuocsi;