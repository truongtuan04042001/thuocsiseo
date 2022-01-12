import { DvrTwoTone } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import '../css/themsp.css'

export default () => {
    const [loaihang, setLoaiHang] = useState();
    const [nhomhang, setNhomHang] = useState();
    const [mahang, setMaHang] = useState();
    const [tenhang, setTenHang] = useState();
    const [sodk, setSoDangKy] = useState();
    const [hoatchat, setHoatChat] = useState();
    const [hamluong, setHamLuong] = useState();
    const [hangsx, setHangSX] = useState();
    const [nuocsx, setNuocSX] = useState();
    const [quycachdonggoi, setQuyCachDongGoi] = useState();
    const [giaban, setGiaBan] = useState();
    const [giavon, setGiaVon] = useState();
    const [donvitinh, setDonViTinh] = useState();
    const [hinhanh, setHinhAnh] = useState();
    const [dangkinhdoanh, setDangKinhDoanh] = useState();
    const [mota, setMoTa] = useState();
    const [hoadon, setHoaDon] = useState();
    const [doanhso, setDoanhSo] = useState();

    useEffect(() => {
    });

    const Sub = () => {
        if (loaihang == "" || loaihang == null || loaihang == undefined) {
            alert("Loại Hàng Trống")
        } else {
            if (nhomhang == "" || nhomhang == null || nhomhang == undefined) {
                alert("Nhóm Hàng Trống")
            } else {
                if (mahang == "" || mahang == null || mahang == undefined) {
                    alert("Mã Hàng Trống")
                }
                else {
                    if (tenhang == "" || tenhang == null || tenhang == undefined) {
                        alert("Tên Hàng Trống")
                    }
                    else {
                        if (sodk == "" || sodk == null || sodk == undefined) {
                            alert("Số Đăng Kí Trống")
                        }
                        else {
                            if (hoatchat == "" || hoatchat == null || hoatchat == undefined) {
                                alert("Hoạt Chất Trống")
                            }
                            else {
                                if (hamluong == "" || hamluong == null || hamluong == undefined) {
                                    alert("Hàm Lượng Trống")
                                }
                                else {
                                    if (hangsx == "" || hangsx == null || hangsx == undefined) {
                                        alert("Hãng Sản Xuất Trống")
                                    }
                                    else {
                                        if (nuocsx == "" || nuocsx == null || nuocsx == undefined) {
                                            alert("Nước Sản Xuất Trống")
                                        }
                                        else {
                                            if (quycachdonggoi == "" || quycachdonggoi == null || quycachdonggoi == undefined) {
                                                alert("Quy Cách Đóng Gói Trống")
                                            }
                                            else {
                                                if (giaban == "" || giaban == null || giaban == undefined) {
                                                    alert("Giá Bán Trống")
                                                }
                                                else {
                                                    if (giavon == "" || giavon == null || giavon == undefined) {
                                                        alert("Giá Vốn Trống")
                                                    }
                                                    else {
                                                        if (donvitinh == "" || donvitinh == null || donvitinh == undefined) {
                                                            alert("Đơn Vị Tính Trống")
                                                        }
                                                        else {
                                                            if (dangkinhdoanh == "" || dangkinhdoanh == null || dangkinhdoanh == undefined) {
                                                                alert("Đang Kinh Doanh Trống (0 hoặc 1)")
                                                            }
                                                            else {
                                                                if (hoadon == "" || hoadon == null || hoadon == undefined) {
                                                                    alert("Có Hóa Đơn Trống (0 hoặc 1)")
                                                                }
                                                                else {
                                                                    if (doanhso == "" || doanhso == null || doanhso == undefined) {
                                                                        alert("Tính Doanh Số Trống (0 hoặc 1)")
                                                                    }
                                                                    else {
                                                                        
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return (
        <div style={{ width: '100%', marginTop: 10 }}>

            <div style={{ display: 'flex', flexDirection: 'row', background: "#f2f2f2", borderRadius: '5px', maxWidth: '100%', flexWrap: 'wrap', margin: 'auto' }}>
                <div style={{ maxWidth: '25%', padding: '15px', background: '' }}>
                    <form action="">
                        <div>
                            <label><b>Loại Hàng</b></label><br></br>
                            <input
                                className="ip_mh"
                                type="text"
                                value={loaihang}
                                onChange={text => { setLoaiHang(text.target.value) }}
                                placeholder="Nhập Loại hàng">
                            </input>
                        </div>

                        <div>
                            <label><b>Nhóm Hàng</b></label><br></br>
                            <input
                                className='ip_sodk'
                                type="text"
                                value={nhomhang}
                                onChange={text => { setNhomHang(text.target.value) }}
                                placeholder="Nhập Nhóm Hàng">
                            </input>
                        </div>
                        <div>
                            <label><b>Mã Hàng</b></label><br></br>
                            <input
                                className="ip_mh"
                                type="text"
                                value={mahang}
                                onChange={text => { setMaHang(text.target.value) }}
                                placeholder="Nhập mã hàng">
                            </input>
                        </div>
                        <div>
                            <label><b>Tên Hàng</b></label><br></br>
                            <input
                                className="ip_tenhang"
                                type="text"
                                value={tenhang}
                                onChange={text => { setTenHang(text.target.value) }}
                                placeholder="Nhập tên hàng">
                            </input>
                        </div>
                        <div>
                            <label><b>Số Đăng Ký</b></label><br></br>
                            <input
                                className='ip_sodk'
                                type="text"
                                value={sodk}
                                onChange={text => { setSoDangKy(text.target.value) }}
                                placeholder="Nhập số đăng ký">
                            </input>
                        </div>

                    </form>
                </div>

                <div style={{ width: '25%', padding: '15px', background: '' }}>
                    <form>
                        <div>
                            <label><b>Hoạt Chất</b></label><br></br>
                            <input
                                className='ip_hoatchat'
                                type="text"
                                value={hoatchat}
                                onChange={text => { setHoatChat(text.target.value) }}
                                placeholder="Nhập hoạt chất">
                            </input>
                        </div>
                        <div>
                            <label><b>Hàm Lượng</b></label><br></br>
                            <input
                                className='ip_hamluong'
                                type="text"
                                value={hamluong}
                                onChange={text => { setHamLuong(text.target.value) }}
                                placeholder="Nhập hàm lượng">
                            </input>
                        </div>
                        <div>
                            <label><b>Hãng Sản Xuất</b></label><br></br>
                            <input
                                className='ip_hangsx'
                                type="text"
                                value={hangsx}
                                onChange={text => { setHangSX(text.target.value) }}
                                placeholder="Nhập hãng sản xuất">
                            </input>
                        </div>
                        <div>
                            <label><b>Nước Sản Xuất</b></label><br></br>
                            <input
                                className='ip_nuocsx'
                                type="text"
                                value={nuocsx}
                                onChange={text => { setNuocSX(text.target.value) }}
                                placeholder="Nhập nước sản xuất">
                            </input>
                        </div>

                        <div>
                            <label><b>Quy Cách Đóng Gói</b></label><br></br>
                            <input
                                className='ip_quycachdonggoi'
                                type="text"
                                value={quycachdonggoi}
                                onChange={text => { setQuyCachDongGoi(text.target.value) }}
                                placeholder="Nhập quy cách đóng gói">
                            </input>
                        </div>


                    </form>
                </div>

                <div style={{ width: '25%', padding: '15px', background: '' }}>
                    <form>

                        <div>
                            <label><b>Giá Bán</b></label><br></br>
                            <input
                                className='ip_giaban'
                                type="text"
                                value={giaban}
                                onChange={text => { setGiaBan(text.target.value) }}
                                placeholder="Nhập giá bán">
                            </input>
                        </div>

                        <div>
                            <label><b>Giá Vốn</b></label><br></br>
                            <input
                                className='ip_giavon'
                                type="text"
                                value={giavon}
                                onChange={text => { setGiaVon(text.target.value) }}
                                placeholder="Nhập giá vốn">
                            </input>
                        </div>

                        <div>
                            <label><b>Đơn Vị Tính</b></label><br></br>
                            <input
                                className='ip_dvt'
                                type="text"
                                value={donvitinh}
                                onChange={text => { setDonViTinh(text.target.value) }}
                                placeholder="Nhập đơn vị tính">
                            </input>
                        </div>
                        <div>
                            <label><b>Hình Ảnh</b></label><br></br>
                            <input
                                className='ip_dvt'
                                type="text"
                                value={hinhanh}
                                onChange={text => { setHinhAnh(text.target.value) }}
                                placeholder="Nhập đơn vị tính">
                            </input>
                        </div>

                        <div>
                            <label><b>Đang Kinh Doanh</b></label><br></br>
                            <input
                                className='ip_dangKD'
                                type="text"
                                value={dangkinhdoanh}
                                onChange={text => { setDangKinhDoanh(text.target.value) }}
                                placeholder="Nhập đang kinh doanh">
                            </input>
                        </div>


                    </form>
                </div>

                <div style={{ width: '25%', padding: '15px', background: '' }}>
                    <form>
                        <div>
                            <label><b>Mô Tả</b></label><br></br>
                            <input
                                className='ip_mota'
                                type="text"
                                value={mota}
                                onChange={text => { setMoTa(text.target.value) }}
                                placeholder="Nhập mô tả">
                            </input>
                        </div>
                        <div>
                            <label><b>Hóa Đơn</b></label><br></br>
                            <input
                                className="ip_tenhang"
                                type="text"
                                value={hoadon}
                                onChange={text => { setHoaDon(text.target.value) }}
                                placeholder="Có Hóa Đơn">
                            </input>
                        </div>

                        <div>
                            <label><b>Tính Doanh Số</b></label><br></br>
                            <input
                                className='ip_hoatchat'
                                type="text"
                                value={doanhso}
                                onChange={text => { setDoanhSo(text.target.value) }}
                                placeholder="Tính Doanh Số">
                            </input>
                        </div>


                    </form>
                </div>
            </div>
            <input className="submit" type="submit" value="THÊM SẢN PHẨM" onClick={Sub}></input>
        </div>
    );
}
