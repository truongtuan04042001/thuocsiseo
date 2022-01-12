
// import '../css/footer.css';
import logothuocsi from '../src/images/Logo.png';
// import { Link } from 'react-router-dom';
import React from 'react'
const Footer = () => {

  return (
    <div className="footer" style={{ backgroundColor: '#009900' }}>
      <div className='bocngoai'></div>
      <div className='col_iner' style={{ marginLeft: 20 }}>
        <div className='img'>
          <div className='img-inner'>
            <img width="200" height="36" src={logothuocsi} className="header_logo header-logo" alt="Thuốc sỉ Online"></img>
          </div>
          <div className="lienhe" style={{ color: 'white' }}>
            <p>Thuocsionline.vn website cung cấp thuốc sỉ hàng đầu Việt Nam.</p>
          </div>
          <div className="text" style={{ color: 'white', bottom: 50 }}>
            <h3>Liên hệ</h3>
            <ul>
              <li>Địa chỉ: 60 Trần Kiên, TP. Buôn Ma Thuột, Đắk Lắk</li>
              <li>Hotline: 0844 404047</li>
              <li>Email: Thuocsionline.vn@gmail.com</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="lienket">
        <div className="col-inner">
          <div id="text" className="text" style={{ color: 'white' }}>
            <h3>Liên kết</h3>
            {/* <Link to='/'><h5>Trang chủ</h5></Link>
            <Link to='/Sanpham'><h5>Sản phẩm</h5></Link>
            <Link to='/DatHangNhanh'><h5>Đặt hàng nhanh</h5></Link>
            <Link to='/MaGiamGia'><h5>Mã giảm giá</h5></Link>
            <Link to='/KhuyenMai'><h5>Khuyến Mãi</h5></Link> */}
          </div>
        </div>
      </div>
      <div className="ifamefb">
      </div>
    </div>
  );
}
export default Footer;