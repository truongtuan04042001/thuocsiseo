import { element } from "prop-types";
import React, { useState } from "react";
import Pagination from "react-pagination-library";
//import '../css/Pagination.css'

const Pagination1 = (props) => {

  const [currentPage, setCurrentPage] = useState(1);


  const changeCurrentPage = (numPage) =>
    setCurrentPage(numPage);
  ;
  const sendPtrang = (text) => {
    props.callBackSanPham(text);
    setCurrentPage(text);
  }
  var tongsotrang = Math.round(props.TongSoSP / 30) + 1;
  // if(props.TongSoSP % 30 != 0){
  //   tongsotrang = Math.round(props.TongSoSP / 30) + 1;
  // }
  // else{
  //   tongsotrang = Math.round(props.TongSoSP / 30);
  // }
  var first = `<<`
  var last = `>>`
  return (
    <div className="pagination-parent">
      <div className="pagination">
        <button
          className="first-pagination"
          onClick={() => { sendPtrang(1) }}>
          {first}
        </button>
      </div>
      <Pagination
        currentPage={props.Sotrang}
        totalPages={tongsotrang}
        changeCurrentPage={sendPtrang}
        theme="Square"
      />
      <div className="pagination">
        <button
          className="first-pagination"
          onClick={() => { sendPtrang(tongsotrang) }}>
          {last}
        </button>
      </div>
      {/* <h2>current Page:{currentPage}</h2> */}
    </div>
  );

}
export default Pagination1;