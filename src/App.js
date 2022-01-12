// import { useEffect, useState } from 'react';
import './css/App.css';

// // import DanhMuc from './components/DanhMuc';
// import SanPham from './components/SanPham';
import TrangChu from './components/TrangChu';
// import TrangDangNhap from './components/TrangDangNhap';
// import {Helmet} from "react-helmet";
import React, { useEffect, useState } from 'react';

import './css/index.css';
import SanPham from './components/SanPham';
import QuanLy from './components/QuanLy';
import ThongKesl from './components/ThongKesl';
import GioHang from './components/GioHang';
import KhuyenMai from './components/KhuyenMai';
import qq from './components/qq';
import qq2 from './components/qq2';
import Article from './components/Article';
import Aboutus from './components/Aboutus';
import Introduce from './components/Introduce';
import DetailArticle from './components/DetailArticle';
import DetailCombo from './components/DetailCombo';
import ThongTinTaiKhoan from './components/ThongTinTaiKhoan';
import DonHangCuaToi from './components/DonHangCuaToi';
import DonHangOffline from './components/DonHangOffline'
import MaGiamGia from './components/MaGiamGia';
import ChiTietSanPham from './components/ChiTietSanPham';
import DatHangNhanh from './components/DatHangNhanh';
import OrderConfirmation from './components/OrderConfirmation';
import NotFoundPage from './components/404';
import EditorScreen from './components/EditorScreen';
import { BrowserRouter as  Switch, Route, Redirect } from 'react-router-dom';
import ThongKe2 from './components/ThongKe2';
import DiemTichLuy from './components/DiemTichLuy';
import InHoaDon from './components/InHoaDon';

// import { API_URL } from './constants/constants'
import EditorQTang from './components/EditorQTang';
import EditorArticles from './components/EditorArticles';
import EditArticles from './components/EditArticles';
import { BrowserRouter } from 'react-router-dom'
// import SectionSanPham from './components/SectionSanPham';

const App = () => {

  //const [input, setInput] = useState([]);//mang gợi ý của search
  //const [value, setValue] = useState();//giá trị của search box
  //const [inputValue, setInputValue] = useState('');
  const [openModalDN, setOpenModalDN] = useState(false);
  // const [login_check_app, setLoginCheckApp] = useState();
  useEffect(() => {

  });
  const OPModalDN = (value) => {
    setOpenModalDN(value)
  }

  // const [rand, setRand] = useState(0)

  // const DangNhapApp = (tenNV) => {
  //   setLoginCheckApp(!login_check_app)
  //   var rand = Math.random(2) * 1000
  //   setRand(rand)
  // };

  // const SearchProduct = (input, value, inputValue) => {
  //   setInput(input);
  //   setValue(value);
  //   setInputValue(inputValue);
  // }

  // const [random, setrandom] = useState(0)

  const capNhatGioHang = () => {
    // var rand = Math.random(2) * 1000
    // setrandom(rand)
  }

  // setAbc(2)

  return (

    <BrowserRouter>
      {/* <RouterConfig /> */}
      {/* <Header valueOfModal={openModalDN} OPModalDN={OPModalDN} callBackApp={DangNhapApp} LayGiaTriSearch={SearchProduct} upDate={random} /> */}
      {/* {login_check_app ? <TrangChu capNhatGioHang={capNhatGioHang} /> : <TrangDangNhap OPModalDN={OPModalDN} valueOfModal={openModalDN}/>} */}
      {/* <TrangChu capNhatGioHang={capNhatGioHang} valueOfModal={openModalDN} OPModalDN={OPModalDN} rand={rand} /> */}
      <Switch>
        <Route exact path="/" render={() => {
          // return localStorage.getItem("accesstoken") != null ? <SanPham /> : <Redirect to='/' />
          return <TrangChu capNhatGioHang={capNhatGioHang} valueOfModal={openModalDN} OPModalDN={OPModalDN}  />
        }} />
        <Route exact path="/TrangChu" render={() => {
          // return localStorage.getItem("accesstoken") != null ? <SanPham /> : <Redirect to='/' />
          return <TrangChu capNhatGioHang={capNhatGioHang} valueOfModal={openModalDN} OPModalDN={OPModalDN}  />
        }} />
        <Route exact path="/SanPham" render={() => {
          // return localStorage.getItem("accesstoken") != null ? <SanPham /> : <Redirect to='/' />
          return <SanPham valueOfModal={openModalDN} OPModalDN={OPModalDN} />
        }} />
        {/* {chucVu < 6 ?
                    <Switch> */}
        {/* <Route exact path="/Banhangcungthuocsi" render={() => {
                    return localStorage.getItem("accesstoken") != null ? <Banhangcungthuocsi /> : <Redirect to ='/' />
                }} /> */}
        <Route exact path="/QuanLy" render={() => {
          return <QuanLy />
        }} />
        <Route exact path="/ThongKe2" render={(props) => {
          return <ThongKe2 {...props} />
        }} />
        <Route path="/EditorGift" render={(props) => {
          return <EditorQTang {...props} />
        }} />
         <Route path="/EditorArticles" render={(props) => {
          return <EditorArticles {...props} />
        }} />
        <Route exact path="/ThongKesl" render={() => {
          return <ThongKesl />
        }} />
        <Route exact path="/GioHang" render={() => {
          return localStorage.getItem("accesstoken") != null ? <GioHang /> : <Redirect to='/' />
        }} />
        <Route exact path="/ThongTinTaiKhoan" render={() => {
          return localStorage.getItem("accesstoken") != null ? <ThongTinTaiKhoan /> : <Redirect to='/' />
        }} />
        <Route exact path="/DonHangCuaToi" render={() => {
          return localStorage.getItem("accesstoken") != null ? <DonHangCuaToi /> : <Redirect to='/' />
        }} />
        <Route exact path="/DonHangOffline" render={() => {
          return localStorage.getItem("accesstoken2") != null ? <DonHangOffline /> : <Redirect to='/' />
        }} />
        <Route exact path="/MaGiamGia" render={(props) => {
          // return localStorage.getItem("accesstoken") != null ? <MaGiamGia /> : <Redirect to='/' />
          return <MaGiamGia {...props} valueOfModal={openModalDN} OPModalDN={OPModalDN}/>
        }} />
        <Route exact path="/DiemTichLuy" render={() => {
          return localStorage.getItem("accesstoken") != null ? <DiemTichLuy /> : <Redirect to='/' />
        }} />
        <Route path="/ChiTietSanPham/:MaHang" render={(props) => {
          // return localStorage.getItem("accesstoken") != null ? <ChiTietSanPham {...props} /> : <Redirect to='/' />

          return <ChiTietSanPham {...props} valueOfModal={openModalDN} OPModalDN={OPModalDN} />
        }} />
        <Route exact path="/KhuyenMai" render={() => {
          //  return localStorage.getItem("accesstoken") != null ? <KhuyenMai /> : <Redirect to='/' />
          return <KhuyenMai valueOfModal={openModalDN} OPModalDN={OPModalDN} />
        }} />
        <Route exact path="/DatHangNhanh" render={() => {
          // return localStorage.getItem("accesstoken") != null ? <DatHangNhanh /> : <Redirect to='/' />
          return <DatHangNhanh valueOfModal={openModalDN} OPModalDN={OPModalDN} />
        }} />
        <Route exact path="/OrderConfirmation" render={() => {
          return localStorage.getItem("accesstoken") != null ? <OrderConfirmation /> : <Redirect to='/' />
        }} />
        <Route exact path="/InHoaDon" render={(props) => {
          return localStorage.getItem("accesstoken2") != null ? <InHoaDon {...props} /> : <Redirect to='/' />
        }} />
        <Route exact path="/qq" component={qq} />
        <Route exact path="/qq2" component={qq2} />
        <Route exact path="/Aboutus" component={Aboutus} />
        <Route exact path="/Introduce" component={Introduce} />
        <Route path="/EditArticles/:id" component={EditArticles} />
        <Route path="/DetailCombo/:IdCombo" render={(props) => {
          // return localStorage.getItem("accesstoken") != null ? <ChiTietSanPham {...props} /> : <Redirect to='/' />

          return <DetailCombo {...props} valueOfModal={openModalDN} OPModalDN={OPModalDN} />
        }} />
        <Route exact path="/Article" component={Article} />
        <Route exact path="/DetailArticle" component={DetailArticle} />

        <Route path="/editor" render={(props) => {
          return <EditorScreen {...props} />
        }} />

        {/* <Route exact path="*" component={NotFoundPage} /> */}
      </Switch>
      
    </BrowserRouter>

  );
}
export default App; 