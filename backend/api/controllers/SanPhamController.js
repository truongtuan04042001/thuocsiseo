'use strict'
const db = require('../db')
const table = 'sanpham'
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const redis = require("redis")
const PORT_REDIS = process.env.PORT || 6379
const redisClient = redis.createClient(PORT_REDIS)
const download = require('image-downloader')
module.exports = {

    themSanPham: async (req, res) => {
        let i
        var loaihang = req.body.loaihang;
        var nhomhang = req.body.nhomhang;
        var nhanhhang = req.body.nhanhhang;
        var mahang = req.body.mahang;
        var tenhang = req.body.tenhang;
        var sodangky = req.body.sodk;
        var hoatchat = req.body.hoatchat;
        var hamluong = req.body.hamluong;
        var hangsx = req.body.hangsx;
        var nuocsx = req.body.nuocsx;
        var qcdg = req.body.quycachdonggoi;
        var giaban = req.body.giaban;
        var giavon = req.body.giavon;
        var dvt = req.body.donvitinh;
        var hinhanh = req.body.hinhanh;
        var mota = req.body.mota;

        let sql = "select MaHang from sanpham";
        db.query(sql, async function (err, result) {
            let mangMH = [];
            mangMH = result;
            let checktrung;
            if (mangMH.length == 0) {
                let sqlsp = "insert into sanpham ( LoaiHang,NhomHang,NhanhHang,MaHang,TenHang,SoDangKy,HoatChat,HamLuong,HangSX,NuocSX,QCDG,GiaBan,GiaVon,DVT,HinhAnh,MoTa,TonKho,ConLai) VALUES ('" + loaihang + "', '" + nhomhang + "', '" + nhanhhang + "','" + mahang + "', '" + tenhang + "', '" + sodangky + "', '" + hoatchat + "', '" + hamluong + "', '" + hangsx + "', '" + nuocsx + "', '" + qcdg + "', " + giaban + ", " + giavon + ",'" + dvt + "','" + hinhanh + "','" + mota + "',1000,1000)";
                db.query(sqlsp, async function (err, result) {
                    if (err) throw err;
                    res.json("da them san pham " + mahang);
                    redisClient.del('Sanpham')
                    redisClient.del('/getsuggest')
                    redisClient.del('/getsuggestkm')
                    redisClient.del('/getsuggestfront')
                    redisClient.del('/searchkhuyenmai')
                    ////////////////////////////////////////////////////
                    //h??m check t??n v?? th??m n?????c s???n xu???t
                    let isnsx = "INSERT INTO nuocsanxuat (TenNuocSX) VALUES ('" + nuocsx + "')";
                    db.query(isnsx, (error, result) => {
                    });
                    //end h??m check v?? th??m t??n n?????c s???n xu???t
                    //////////////////////////////////////////////////////////
                    //h??m check v?? th??m h??ng s???n xu???t
                    let ishsx = "INSERT INTO hangsanxuat (TenHangSX) VALUES ('" + hangsx + "')";
                    db.query(ishsx, (error, result) => {
                    });
                    //end h??m check v?? th??m h??ng s???n xu???t
                    ///////////////////////////////////////////////////////////
                    //h??m check v?? th??m ho???t ch???t
                    let ishc = "INSERT INTO hoatchat (TenHC) VALUES ('" + hoatchat + "')";
                    db.query(ishc, (error, result) => {
                    });
                    //end h??m check v?? th??m ho???t ch???t
                    ///////////////////////////////////////////////////////////
                    //h??m check v?? th??m nh??m h??ng
                    let isnh = "INSERT INTO nhomhang (TenNH) VALUES ('" + nhomhang + "')";
                    db.query(isnh, (error, result) => {
                    });
                    //end h??m check v?? th??m nh??m h??ng
                    ///////////////////////////////////////////////////////////
                    // th??m 1 l?? h???n tr???ng s??? l?????ng v??o kho
                    const rand = parseInt(Math.random(2) * 10000)
                    const sql99 = "insert into chitietlohang set MaHang = ?, TenHang = ?, SoLuong = 1000, DonGia = ?, DVT = ?, MaLH = ?, HanSD = null, NgayNhapHang = CURRENT_DATE();"
                    // const sql99 = "insert into chitietlohang set MaHang = ?, TenHang = ?, SoLuong = 0, DonGia = ?, DVT = ?, MaLH = ?, HanSD = DATE_ADD(CURRENT_DATE(), INTERVAL 5 YEAR);"
                    db.query(sql99, [mahang, tenhang, giavon, dvt, rand], async (err99, res99) => {
                        if (err99) {
                            throw err99
                        }
                        await capNhatSoLuongTonKhoTheoMH(mahang)
                    })
                });
            } else {
                for (i = 0; i < mangMH.length; i++) {
                    if (mahang == mangMH[i].MaHang) {
                        checktrung = 1;
                        break;
                    } else {
                        checktrung = 0;
                    }
                }
                if (checktrung == 0) {
                    let sqlsp ="insert into sanpham ( LoaiHang,NhomHang,NhanhHang,MaHang,TenHang,SoDangKy,HoatChat,HamLuong,HangSX,NuocSX,QCDG,GiaBan,GiaVon,DVT,HinhAnh,MoTa,TonKho,ConLai) VALUES ('" + loaihang + "', '" + nhomhang + "', '" + nhanhhang + "','" + mahang + "', '" + tenhang + "', '" + sodangky + "', '" + hoatchat + "', '" + hamluong + "', '" + hangsx + "', '" + nuocsx + "', '" + qcdg + "', " + giaban + ", " + giavon + ",'" + dvt + "','" + hinhanh + "','" + mota + "',1000,1000)";
                     db.query(sqlsp, async function (err, result) {
                        if (err) throw err;
                        res.json("da them san pham " + mahang);
                        redisClient.del('Sanpham')
                        redisClient.del('/getsuggest')
                        redisClient.del('/getsuggestkm')
                        redisClient.del('/getsuggestfront')
                        redisClient.del('/searchkhuyenmai')
                        ////////////////////////////////////////////////////
                        //h??m check t??n v?? th??m n?????c s???n xu???t
                        let sqlnsx = "select TenNuocSX from nuocsanxuat";
                         db.query(sqlnsx, async function (err, result) {
                            let mang = [];
                            mang = result;
                            let checktrung;
                            for (i = 0; i < mang.length; i++) {
                                if (nuocsx == mang[i].TenNuocSX) {
                                    checktrung = 1;
                                    break;
                                } else {
                                    checktrung = 0;
                                }
                            }
                            if (checktrung == 0) {
                                let query = "INSERT INTO nuocsanxuat (TenNuocSX) VALUES ('" + nuocsx + "')";
                                 db.query(query, (error, result) => {
                                });
                            } else {
                            }
                        });
                        //end h??m check v?? th??m t??n n?????c s???n xu???t
                        //////////////////////////////////////////////////////////
                        //h??m check v?? th??m h??ng s???n xu???t
                        let sqlhsx = "select TenHangSX from hangsanxuat";
                         db.query(sqlhsx, async function (err, result) {
                            let mang = [];
                            mang = result;
                            let checktrung;
                            for (i = 0; i < mang.length; i++) {
                                if (hangsx == mang[i].TenHangSX) {
                                    checktrung = 1;
                                    break;
                                } else {
                                    checktrung = 0;
                                }
                            }
                            if (checktrung == 0) {
                                let query = "INSERT INTO hangsanxuat (TenHangSX) VALUES ('" + hangsx + "')";
                                 db.query(query, (error, result) => {
                                });
                            } else {
                            }
                        });
                        //end h??m check v?? th??m h??ng s???n xu???t
                        ///////////////////////////////////////////////////////////
                        //h??m check v?? th??m ho???t ch???t
                        let sqlhc = "select TenHC from hoatchat";
                         db.query(sqlhc, async function (err, result) {
                            let mang = [];
                            mang = result;
                            let checktrung;
                            for (i = 0; i < mang.length; i++) {
                                if (hoatchat == mang[i].TenHC) {
                                    checktrung = 1;
                                    break;
                                } else {
                                    checktrung = 0;
                                }
                            }
                            if (checktrung == 0) {
                                let query = "INSERT INTO hoatchat (TenHC) VALUES ('" + hoatchat + "')";
                                 db.query(query, (error, result) => {
                                });
                            } else {
                            }

                        });
                        //end h??m check v?? th??m ho???t ch???t
                        ///////////////////////////////////////////////////////////
                        //h??m check v?? th??m nh??m h??ng
                        let sqlnh = "select TenNH from nhomhang";
                         db.query(sqlnh, async function (err, result) {
                            let mang = [];
                            mang = result;
                            let checktrung;
                            for (i = 0; i < mang.length; i++) {
                                if (nhomhang == mang[i].TenNH) {
                                    checktrung = 1;
                                    break;
                                } else {
                                    checktrung = 0;
                                }
                            }
                            if (checktrung == 0) {
                                let query = "INSERT INTO nhomhang (TenNH) VALUES ('" + nhomhang + "')";
                                await db.query(query, (error, result) => {
                                });
                            } else {
                            }
                        });
                        //end h??m check v?? th??m nh??m h??ng
                        ///////////////////////////////////////////////////////////
                        let sql = 'Select MaHang,HinhAnh from sanpham where MaHang="' + mahang + '"'
                         db.query(sql, async (err, response) => {
                            if (err) throw err

                            try {
                                const options = {
                                    url: response[0].HinhAnh,
                                    dest: './public/uploads_Images/' + (response[0].MaHang) + '.jpg'
                                }
                                await download.image(options)
                                    .then(async ({ filename }) => {
                                        let sql_update = "UPDATE sanpham SET HinhAnh = 'https://api.thuocsionline.vn/uploads_Images/" + (response[0].MaHang) + ".jpg' WHERE MaHang= '" + response[0].MaHang + "' "
                                         db.query(sql_update, (err, response) => {
                                            if (err) throw err
                                        })
                                    })
                                    .catch((err) => {
                                        // console.log(err)
                                    })
                            }
                            catch (error) {

                            }

                        })
                        // th??m 1 l?? h???n tr???ng s??? l?????ng v??o kho
                        const rand = parseInt(Math.random(2) * 10000)
                        const sql99 = "insert into chitietlohang set MaHang = ?, TenHang = ?, SoLuong = 1000, DonGia = ?, DVT = ?, MaLH = ?, HanSD = null, NgayNhapHang = CURRENT_DATE();"
                        // const sql99 = "insert into chitietlohang set MaHang = ?, TenHang = ?, SoLuong = 0, DonGia = ?, DVT = ?, MaLH = ?, HanSD = DATE_ADD(CURRENT_DATE(), INTERVAL 5 YEAR);"
                         db.query(sql99, [mahang, tenhang, giavon, dvt, rand], async (err99, res99) => {
                            if (err99) {
                                throw err99
                            }
                            await capNhatSoLuongTonKhoTheoMH(mahang)
                        })
                    });
                } else {
                    if (err) throw err;
                    res.send("sp n??y ???? c?? trong dtb!");
                }
            }
        });
    },

    xoaSanPham_TheoMaHang: (req, res) => {
        let i
        var mahang = req.body.sermahang;
        let sql = "select MaHang from sanpham";
        db.query(sql, function (err, result) {
            let mangMH = [];
            mangMH = result;
            let checktrung;
            for (i = 0; i < mangMH.length; i++) {
                if (mahang == mangMH[i].MaHang) {
                    checktrung = 1;
                    break;
                } else {
                    checktrung = 0;
                }
            }
            if (checktrung == 1) {
                let sqldsp = "DELETE from sanpham WHERE MaHang='" + mahang + "'";
                db.query(sqldsp, function (err, result) {
                    // console.log(result)
                    if (err) throw err;
                    redisClient.del('Sanpham')
                    redisClient.del('/getsuggest')
                    redisClient.del('/getsuggestkm')
                    redisClient.del('/getsuggestfront')
                    redisClient.del('/searchkhuyenmai')
                    res.send("da xoa san pham " + mahang);
                });
            } else {
                // console.log("mahang " + mahang + " kh??ng c?? trong dtb hoac ma hang da sai,vui long check lai mahang")
                if (err) throw err;
                res.send("mahang " + mahang + " kh??ng c?? trong dtb hoac ma hang da sai,vui long check lai mahang");
            }
        });
    },

    suaSanPham: (req, res) => {
        let i
        var mangitem = req.body.sermangitem;
        var mahang = req.body.sermahang;
        let sql = "select MaHang from sanpham";
        db.query(sql, function (err, result) {
            let mangMH = [];
            mangMH = result;
            let checktrung;
            for (i = 0; i < mangMH.length; i++) {
                if (mahang == mangMH[i].MaHang) {
                    checktrung = 1;
                    break;
                } else {
                    checktrung = 0;
                }
            }
            if (checktrung == 1) {
                let sqlusp = "UPDATE sanpham SET ? WHERE MaHang= ? ";
                db.query(sqlusp, [mangitem, mahang], function (err, result) {
                    // console.log(result)
                    if (err) throw err;
                    redisClient.del('Sanpham')
                    redisClient.del('/getsuggest')
                    redisClient.del('/getsuggestkm')
                    redisClient.del('/getsuggestfront')
                    redisClient.del('/searchkhuyenmai')
                    res.send("da sua san pham " + mahang + " ");
                });
                let sql = 'Select MaHang,HinhAnh from sanpham where MaHang="' + mahang + '"'
                db.query(sql, async (err, response) => {
                    if (err) throw err
                    try {
                        const options = {
                            url: response[0].HinhAnh,
                            dest: './public/uploads_Images/' + (response[0].MaHang) + '.jpg'
                        }
                        await download.image(options)
                            .then(async ({ filename }) => {
                                let sql_update = "UPDATE sanpham SET HinhAnh = 'https://api.thuocsionline.vn/uploads_Images/" + (response[0].MaHang) + ".jpg' WHERE MaHang= '" + response[0].MaHang + "' "
                                await db.query(sql_update, (err, response) => {
                                    if (err) throw err
                                })
                            })
                            .catch((err) => {
                                // console.log(err)
                            })
                    }
                    catch (error) {

                    }

                })
            } else {
                // console.log("mahang " + mahang + " kh??ng c?? trong dtb, hoac ma hang da sai,vui long check lai mahang")
                if (err) throw err;
                res.send("mahang " + mahang + " kh??ng c?? trong dtb hoac ma hang da sai,vui long check lai mahang");
            }
        });
    },

    suaSanPhamExcel: async (req, res) => {
        var mangitem = req.body.sermangitem;

        for (i = 0; i < mangitem.length; i++) {
            let sqlusp = "UPDATE sanpham SET ? WHERE MaHang= ? ";
            await db.query(sqlusp, [mangitem[i], mangitem[i].MaHang], function (err, result) {
                // console.log(result)
                if (err) throw err;
                
                redisClient.del('Sanpham')
                redisClient.del('/getsuggest')
                redisClient.del('/getsuggestkm')
                redisClient.del('/getsuggestfront')
                redisClient.del('/searchkhuyenmai')
                res.json("da sua san pham ");
            });
        }


    },

    chiTietSanPham: (req, res) => {
        const MaHang = req.params.MaHang;
        let sql = 'SELECT NhomHang,MaHang,TenHang,HoatChat,HamLuong,HangSX,NuocSX,QCDG,GiaBan,DVT,HinhAnh,MoTa,TonKho,DaDat,ConLai,DangKD,BanChay,SPmoi,HDnhanh,GHnhanh,SVip,NhiKhoa,NhaKhoa,SanKhoa,DaLieu,NTHop,ThanKinh,BV,FlashSale,PhanTramKM FROM ' + table + ' WHERE MaHang = ?'
        db.query(sql, [MaHang], (err, response) => {
            if (err) throw err
            let magSP = []
            if (response.length > 0) {
                response.forEach(ee2 => {
                    if (ee2.DangKD == 1) {
                        magSP.push({
                            ...ee2,
                            ...{ SoLuong: 0 }
                        })
                    }
                });
            }
            res.json(magSP[0])
        })
    },

    chiTietSanPhamThemLH: (req, res) => {
        const MaHang = req.params.MaHang;
        let sql = 'SELECT MaHang, TenHang, DVT, GiaVon FROM ' + table + ' WHERE MaHang = ?'
        db.query(sql, [MaHang], (err, response) => {
            if (err) throw err
            let reTurn = {
                code: 0,
                msg: 'L???y s???n ph???m th??nh c??ng',
                data: []
            }
            if (response.length > 0) {
                reTurn.data = response[0]
            } else {
                reTurn.code = 1
                reTurn.msg = 'Kh??ng l???y ???????c s???n ph???m, ki???m tra l???i m?? h??ng'
            }
            res.json(reTurn)
        })
    },

    chiTietSanPhamTheoMaHang: (req, res) => {
        const MaHang = req.params.MaHang;
        let sql = 'SELECT MaHang, TenHang, GiaBan, DVT, QCDG, HinhAnh FROM ' + table + ' WHERE MaHang = ?'
        db.query(sql, [MaHang], (err, response) => {
            if (err) throw err
            let reTurn = {
                code: 0,
                msg: 'L???y s???n ph???m th??nh c??ng',
                data: []
            }
            if (response.length > 0) {
                reTurn.data = response[0]
            } else {
                reTurn.code = 1
                reTurn.msg = 'Kh??ng l???y ???????c s???n ph???m, ki???m tra l???i m?? h??ng'
            }
            res.json(reTurn)
        })
    },

    chiTietSanPhamTheoTenHang: (req, res) => {
        const tenHang = req.body.data;
        let sql = 'SELECT MaHang, TenHang, GiaBan, DVT, QCDG, HinhAnh FROM ' + table + ' WHERE TenHang = ?'
        db.query(sql, [tenHang], (err, response) => {
            if (err) throw err
            let reTurn = {
                code: 0,
                msg: 'L???y s???n ph???m th??nh c??ng',
                data: []
            }
            if (response.length > 0) {
                reTurn.data = response[0]
            } else {
                reTurn.code = 1
                reTurn.msg = 'Kh??ng l???y ???????c s???n ph???m, ki???m tra l???i m?? h??ng'
            }
            res.json(reTurn)
        })
    },

    capNhatTonKho1SanPhamKhiDatHang: (req, res) => {
        const maHang = req.params.MaHang
        const tonKho = req.body.TonKho
        // console.log(new Date().getTime() + " maHang= " + JSON.stringify(maHang))
        if (maHang != null && tonKho != null) {
            const sql = "UPDATE sanpham SET TonKho = ? WHERE MaHang = ?"
            db.query(sql, [tonKho, maHang], (err, response) => {
                if (err) {
                    throw err
                }
                res.json({ MaHang: maHang })
            })
        }
    },

    kiemTraSanPhamTrongGio: (req, res) => {
        const lsMaHang = req.body.lsMaHang
        if (lsMaHang.length > 0) {
            let aa1 = `select MaHang, TenHang, GiaBan, TonKho, DaDat, ConLai, DangKD, PhanTramKM from sanpham where MaHang in(`
            for (let i = 0; i < lsMaHang.length; i++) {
                const ee1 = lsMaHang[i];
                if (i == lsMaHang.length - 1) {
                    aa1 += "'" + ee1 + "'"
                } else {
                    aa1 += "'" + ee1 + "',"
                }
            }
            aa1 += `);`
            db.query(aa1, (err, result) => {
                if (err) {
                    throw err
                }
                res.json(result)
            })
        }
    },

    laySPsaphethang: (req, res) => {
        const sql = 'SELECT MaHang, TenHang, ConLai, HangSX FROM sanpham WHERE ConLai <= 1010;'
        db.query(sql, (err, result) => {
            if (err) {
                throw err
            }
            let magSP = []
            if (result.length > 0) {
                // h??ng ph???i tr??? ??i 1000 r???i m???i l???c d?????i 11.
                result.forEach(ee1 => {
                    const conLai = ee1.ConLai
                    const hetHang = 1000 - conLai
                    if (hetHang >= 0 && hetHang != 1000) {
                        ee1.ConLai = hetHang
                    } else {
                        ee1.ConLai = 0
                    }
                });
                result.forEach(ee2 => {
                    if (ee2.ConLai <= 10) {
                        magSP.push({
                            ...ee2,
                            ...{ HetHang: 'C???nh b??o h??ng s???p h???t ??????????????????' }
                        })
                    } else {
                        // magSP.push({
                        //     ...ee2,
                        //     ...{ HetHang: 'Ch?? ???????????' }
                        // })
                    }
                });
            }
            res.json(magSP)
        })
    }
}

// th???ng n??y c???p nh???t s??? l?????ng t???n kho c???a 1 sp. l???y h???t sl trong kho, c???ng d???n l???i r???i update v?? th???ng sanpham
const capNhatSoLuongTonKhoTheoMH = async (maHang) => {
    let queryDSTonKho1SanPham = "SELECT SoLuong FROM chitietlohang WHERE MaHang = ?"
    await db.query(queryDSTonKho1SanPham, maHang, (err2, response2) => {
        if (err2) throw err2
        let tongTonKho1SanPham = 0
        response2.forEach(e => {
            tongTonKho1SanPham += parseFloat(e.SoLuong)
        });
        let queryCapNhatTonKho1SanPham = 'UPDATE sanpham SET TonKho = ? WHERE MaHang = ?'
        db.query(queryCapNhatTonKho1SanPham, [tongTonKho1SanPham, maHang], (err3, respons3) => {
            if (err3) throw err3
            // console.log(new Date().getTime() + " KETTHUCcapNhatSoLuongTonKhoTheoMH= " + JSON.stringify(maHang))
        })
    })
}

