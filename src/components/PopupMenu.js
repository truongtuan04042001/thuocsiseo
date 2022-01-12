import { useEffect, useState } from 'react';
import menu_icon from '../../public/images/menu-icon.png';
import Button from '@material-ui/core/Button';
import { Dialog } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

const PopupMenu = (props) => {
    const [popup_check, setPopupCheck] = useState(false);
    const callbackFunction = (childData) => {
        setPopupCheck(childData)
    };
    useEffect(() => {

    });
    const dangxuat = () => {
        props.dangxuat();
    }
    const [openDialog, setOpenDialog] = useState(false);
    const ClickOpen = () => {
        setOpenDialog(true)
    }
    const ClickClose = () => {
        setOpenDialog(false)
    }
    const No = () => {
        setOpenDialog(false);
    }
    const Yes = () => {
        setOpenDialog(false);
        const tmp = `NOTLOGIN`
        dangxuat(tmp);
        localStorage.removeItem("accesstoken");
    }

    const testKey = (e) => {
        if (e.code === "Enter") {
            Yes()
        }
    }

    return (
        <div className="popup-menu">
            <button className="menu-b" onClick={() => { setPopupCheck(!popup_check) }}><img width='20' src={menu_icon}></img></button>
            {
                popup_check ?
                    <div className="pop-up-parent">
                        <div className="btn-close-parent">
                            <button className="closeModalPopUp" onClick={() => { setPopupCheck(!popup_check) }}>
                                <svg width="22px" height="22px" viewBox="-4 -4 24 24"><line x1="2" x2="14" y1="2" y2="14" strokeLinecap="round" strokeWidth="2" stroke="#bec2c9"></line><line x1="2" x2="14" y1="14" y2="2" stroke-linecap="round" stroke-width="2" stroke="#bec2c9"></line></svg>
                            </button>
                        </div>
                        <hr style={{ width: '100%' }}></hr>
                        {props.pass == "123"
                            ?
                            <div className="popup-mobile" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                    <Link to='/ThongTinTaiKhoan' className='options_popup'>
                                        <svg className='PM_svg'>
                                            <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'></path>
                                        </svg>
                                        Thông Tin Tài Khoản
                                    </Link>
                                    <Link to='/DonHangCuaToi' className='options_popup'>
                                        <svg className='PM_svg'>
                                            <path d='M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z'></path>
                                        </svg>
                                        Đơn Hàng Của Tôi
                                    </Link>
                                    <Link to='/DiemTichLuy' className='options_popup'>
                                        <svg className='PM_svg'>
                                            <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z'></path>
                                        </svg>
                                        Điểm tích lũy
                                    </Link>
                                    <button
                                        className='options_popup'
                                        onClick={() => { ClickOpen() }}>
                                        <svg className='PM_svg'>
                                            <path d='M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z'></path>
                                        </svg>
                                        Đăng xuất
                                    </button>
                                    <Dialog
                                        open={openDialog}
                                        onClose={ClickClose}
                                        onKeyPress={(e) => testKey(e)}
                                    >
                                        <DialogTitle>
                                            <div style={{ textAlign: 'center' }}>
                                                <div className='GH_DialogTitle'>
                                                    <p style={{ alignItems: 'center', fontSize: '3.75em', margin: '0' }}>!</p>
                                                </div>
                                                <p className='GH_XinXacNhan'>Xin xác nhận</p>
                                                {"Bạn có chắc muốn đăng xuất?"}
                                            </div>
                                        </DialogTitle>
                                        <DialogActions>
                                            <Button onClick={No} style={{ padding: '6px 16px', backgroundColor: 'rgb(255, 193, 7)', margin: '15px', borderRadius: '8px', color: 'white' }}>Không</Button>
                                            <Button onClick={Yes} style={{ padding: '6px 16px', backgroundColor: 'rgb(0, 171, 85)', margin: '15px', borderRadius: '8px', color: 'white' }}>Có</Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
                            </div>
                            : null
                        }
                    </div>
                    : null
            }
        </div>
    );
}
export default PopupMenu;