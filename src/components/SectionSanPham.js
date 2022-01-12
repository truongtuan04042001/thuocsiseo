import { useEffect, useState } from 'react';
import '../css/App.css';

import DanhMuc from './DanhMuc';
import Sanpham from './Sanpham';

const SectionSanPham = () => {
  useEffect(() => {

  });
  return (
    <div className="section-sp-parent">
      {/* <DanhMuc></DanhMuc> */}
      <Sanpham></Sanpham>
    </div>
  );
}
export default SectionSanPham;
