// import { useEffect, useState } from 'react';
import err from '../images/404.png'
import React from 'react';
const NotFoundPage = () => {
  return (
    <div style={{
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      position: 'absolute',
      padding: 20
    }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}><img height='200' src={err}></img></div>
      <h3>Lỗi không tìm thấy trang</h3>
      <div>Nếu bạn cần trợ giúp hãy liên hệ với chúng tôi qua facebook </div>
      <a target="_blank" rel="noreferrer" href='https://www.facebook.com/thuocsionline/'>thuocsionline.vn</a>
      <br></br>
      <div> Hoặc :</div>
      <button id="btn_dky"
        onClick={() => {
          window.location.reload();
        }}>
        <b>Tải lại trang</b>
      </button>
      <button id="btn_dky"
        style={{ marginLeft: 10 }}
        onClick={() => {
          window.location.replace("http://thuocsionline.vn/")
        }}>
        <b>Quay Lại Trang Chủ</b>
      </button>
    </div>
  );
}
export default NotFoundPage;