'use strict'
const db = require('./../db')
const md5 = require('../../md5/md5')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    themNV: (req, res) => {
        var tennv = req.body.sertennv;
        var chucvu = req.body.serchucvu;
        var table;
        var table_rn;
        switch (parseInt(chucvu)) {
            case 1:
                table = "manager";
                table_rn = "mn";
                break;
            case 2:
                table = "seller";
                table_rn = "slr";
                break;
            case 3:
                table = "sale";
                table_rn = "sl";
                break;
            case 4:
                table = "stocker";
                table_rn = "st";
                break;
            case 5:
                table = "editor";
                table_rn = "ed";
                break;
            default:
                break;
        }
        let sql = "INSERT INTO " + table + " values (null,null)";
        db.query(sql, function (err, result) {
            if (err) throw err;
        });
        let slmn = "select * from " + table + " ORDER BY id DESC LIMIT 1";
        db.query(slmn, function (err, result) {
            if (err) throw err;
            let mangid = [];
            mangid = result;
            let udmn = "update " + table + " SET MaNV='" + table_rn + "" + mangid[0].Id + "' WHERE Id='" + mangid[0].Id + "'";
            db.query(udmn, function (err, result) {
                res.json(table_rn + mangid[0].Id);
            });
            let passDef = "123456"
            let addnv = "INSERT INTO nhanvien2 (MaNV,ChucVu,TenNV,MK,Info) values ('" + table_rn + "" + mangid[0].Id + "','" + chucvu + "','" + tennv + "','" + md5(passDef) + "', 0)";
            db.query(addnv, function (err, result) {
                if (err) throw err;
            });
        });
    },

    themKhachHang: (req, res) => {
        const ten = req.body.ten_kh;
        const sdt = req.body.sdt_kh;
        const email = req.body.email_kh;
        const pass = md5(req.body.pass_kh);
        const khuvuc = req.body.khuvuc_kh;
        const phuongxa = req.body.PhuongXa;
        const diachi = req.body.diachi_kh;
        const loaidoanhnghiep = req.body.doanhnghiep;
        let sqlcheck = "Select SDT from nhanvien where SDT = " + sdt + "";
        db.query(sqlcheck, function (err, result) {
            if (err) throw err;
            if (result.length > 0) {
                return res.send('1');
            } else {
                let sql = "INSERT INTO nhanvien (MaNV,ChucVu,TenNV,SDT,Email,MK,KhuVuc,PhuongXa,Info,DiaChi) values (?,6,?,?,?,?,?,?, 1,?)";
                db.query(sql, [sdt, ten, sdt, email, pass, khuvuc, phuongxa, diachi], function (err, result) {
                    if (err) throw err;
                    const sqlTuTang = 'SELECT TuTang FROM nhanvien ORDER BY TuTang DESC LIMIT 1'
                    db.query(sqlTuTang, (err, response) => {
                        if (err) throw err
                        const tuTang = "" + response[0].TuTang
                        let MaKH = ""
                        if (tuTang.length == 1) {
                            MaKH = 'KH00000' + tuTang
                        }
                        if (tuTang.length == 2) {
                            MaKH = 'KH0000' + tuTang
                        }
                        if (tuTang.length == 3) {
                            MaKH = 'KH000' + tuTang
                        }
                        if (tuTang.length == 4) {
                            MaKH = 'KH00' + tuTang
                        }
                        if (tuTang.length == 5) {
                            MaKH = 'KH0' + tuTang
                        }
                        if (tuTang.length >= 6) {
                            MaKH = 'KH' + tuTang
                        }
                        const sqlMaKH = 'UPDATE nhanvien SET MaKH = ? WHERE TuTang = ?'
                        db.query(sqlMaKH, [MaKH, tuTang], (err, response) => {
                            if (err) throw err
                            return res.send('0');
                        })
                    })
                });
                let sql1 = "Insert into doanhnghiep (MaUser,LoaiDN) Values('" + sdt + "','" + loaidoanhnghiep + "')";
                db.query(sql1, function (err, result) {
                    if (err) throw err;
                });
            }
        });
    },

    thongTinTaiKhoan: (req, res) => {
        var keychinh;
        var authohd = req.body.test;
        if (authohd !== undefined) {
            //var token = authohd.split(' ')[1];
            jwt.verify(authohd, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
                if (data !== undefined) {
                    keychinh = data.ID;
                    let sql = "Select TenNV,SDT,Email,MaNV,KhuVuc,DiaChi,PhuongXa,DiemThuong from nhanvien where MaNV = '" + keychinh + "'";
                    db.query(sql, function (err, result) {
                        if (err) throw err;
                        res.json(result);
                    });
                } else {
                    res.json("token not accepted")
                }
            })
        }
        else {
            console.log('loi sv tttk')
            res.json("loi sv tttk")
        }
    },

    allUser: (req, res) => {
        let sql = "Select * from nhanvien";
        db.query(sql, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
    },

    delUser: (req, res) => {
        let i
        var manv = req.body.MaNV
        let sql = "select MaNV from nhanvien";
        db.query(sql, function (err, result) {
            let mangMH = [];
            mangMH = result;
            let checktrung;
            for (i = 0; i < mangMH.length; i++) {
                if (manv == mangMH[i].MaNV) {
                    checktrung = 1;
                    break;
                } else {
                    checktrung = 0;
                }
            }
            if (checktrung == 1) {
                let sqldsp = "DELETE from nhanvien WHERE MaNV='" + manv + "'";
                db.query(sqldsp, function (err, result) {
                    // console.log(result)
                    if (err) throw err;
                    res.send("da xoa nv " + manv);
                });
            } else {
                // console.log("mahang " + mahang + " không có trong dtb hoac ma hang da sai,vui long check lai mahang")
                if (err) throw err;
                // res.send("mahang " + mahang + " không có trong dtb hoac ma hang da sai,vui long check lai mahang");
            }
        });

    },

    fixUser: (req, res) => {
        let i
        var mangitem = req.body.sermangitem;
        var manv = req.body.MaNV;
        let sql = "select MaNV from nhanvien";
        db.query(sql, function (err, result) {
            let mangMH = [];
            mangMH = result;
            let checktrung;
            for (i = 0; i < mangMH.length; i++) {
                if (manv == mangMH[i].MaNV) {
                    checktrung = 1;
                    break;
                } else {
                    checktrung = 0;
                }
            }
            if (checktrung == 1) {
                let sqlusp = "UPDATE nhanvien SET ? WHERE MaNV= ? ";
                db.query(sqlusp, [mangitem, manv], function (err, result) {
                    // console.log(result)
                    if (err) throw err;
                    res.send("da sua nv " + manv + " ");
                });
            } else {
                // console.log("mahang " + mahang + " không có trong dtb, hoac ma hang da sai,vui long check lai mahang")
                if (err) throw err;
                // res.send("mahang " + mahang + " không có trong dtb hoac ma hang da sai,vui long check lai mahang");
            }
        });

    },

    allStaff: (req, res) => {
        let sql = "Select * from nhanvien2";
        db.query(sql, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
    },

    delStaff: (req, res) => {
        let i
        var manv = req.body.MaNV
        let sql = "select MaNV from nhanvien2";
        db.query(sql, function (err, result) {
            let mangMH = [];
            mangMH = result;
            let checktrung;
            for (i = 0; i < mangMH.length; i++) {
                if (manv == mangMH[i].MaNV) {
                    checktrung = 1;
                    break;
                } else {
                    checktrung = 0;
                }
            }
            if (checktrung == 1) {
                let sqldsp = "DELETE from nhanvien2 WHERE MaNV='" + manv + "'";
                db.query(sqldsp, function (err, result) {
                    // console.log(result)
                    if (err) throw err;
                    res.send("da xoa nv " + manv);
                });
            } else {
                // console.log("mahang " + mahang + " không có trong dtb hoac ma hang da sai,vui long check lai mahang")
                if (err) throw err;
                // res.send("mahang " + mahang + " không có trong dtb hoac ma hang da sai,vui long check lai mahang");
            }
        });

    },

    fixStaff: (req, res) => {
        let i
        var mangitem = req.body.sermangitem;
        var manv = req.body.MaNV;
        let sql = "select MaNV from nhanvien2";
        db.query(sql, function (err, result) {
            let mangMH = [];
            mangMH = result;
            let checktrung;
            for (i = 0; i < mangMH.length; i++) {
                if (manv == mangMH[i].MaNV) {
                    checktrung = 1;
                    break;
                } else {
                    checktrung = 0;
                }
            }
            if (checktrung == 1) {
                let sqlusp = "UPDATE nhanvien2 SET ? WHERE MaNV= ? ";
                db.query(sqlusp, [mangitem, manv], function (err, result) {
                    // console.log(result)
                    if (err) throw err;
                    res.send("da sua nv " + manv + " ");
                });
            } else {
                // console.log("mahang " + mahang + " không có trong dtb, hoac ma hang da sai,vui long check lai mahang")
                if (err) throw err;
                // res.send("mahang " + mahang + " không có trong dtb hoac ma hang da sai,vui long check lai mahang");
            }
        });

    },

    verifyToken: (req, res) => {
        var keychinh;
        //ma hoa token
        var authohd = req.body.test;
        if (authohd !== undefined) {
            //var token = authohd.split(' ')[1];
            jwt.verify(authohd, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
                if (data !== undefined) {
                    res.json({ rs: "token accepted", manv: data.ID, cv: data.CV })
                } else {
                    res.json({ rs: "token not accepted" })
                }
            })
        }
        else {
            console.log('loi sv vrf token')
            res.json({ rs: "loi sv vrf token" })
        }
        //if (!token) res.sendStatus(401);

        //end


    },


    capNhatThongTin: (req, res) => {
        // var keychinh = req.body.keychinh;
        var ten = req.body.ten_kh;
        var sdt = req.body.sdt_kh;
        var email = req.body.email_kh;
        var manv = req.body.key;
        var diachi = req.body.diachi;
        var phuongxa = req.body.phuongxa;
        var tinh = req.body.tinh;
        // UPDATE LẠI THÔNG TIN KHI KHÔNG THAY ĐỔI SĐT
        if (manv.length < 10 || sdt == manv) {
            let sql = "Update nhanvien Set TenNV = ? , Email = ?, DiaChi = ?, PhuongXa = ?, KhuVuc = '" + tinh + "'  where MaNV = '" + manv + "'";
            db.query(sql, [ten, email, diachi, phuongxa], function (err, result) {
                if (err) throw err;
                //res.json(result);
                return res.send('0');
            });
        }
        // UPDATE LẠI THÔNG TIN KHI THAY ĐỔI SĐT
        else {
            let sqlcheck = "Select SDT from nhanvien where SDT = '" + sdt + "'";
            db.query(sqlcheck, function (err, result) {
                if (err) throw err;
                if (result.length > 0) {
                    return res.send('1');
                }
                else {
                    let sql = "Update nhanvien Set TenNV = ? , SDT = '" + sdt + "' , Email = ? , MaNV = '" + sdt + "', DiaChi = ?, PhuongXa = ?, KhuVuc = '" + tinh + "' where MaNV = '" + manv + "'";
                    db.query(sql, [ten, email, diachi, phuongxa], function (err, result) {
                        if (err) throw err;
                        // res.json(result);
                        return res.send('0');
                    });
                    let sql1 = "Update doanhnghiep SET MaUser = '" + sdt + "' where MaUser = '" + manv + "'";
                    db.query(sql1, function (err, result) {
                        if (err) throw err;
                    });
                    let sqlVoucher = "Update magiamgia SET doiTuong = ? WHERE doiTuong = ?";
                    db.query(sqlVoucher, [sdt, manv], function (err, result) {
                        if (err) throw err;

                    });
                }
            });
        }
    },

    capNhatDiaChiDatHang: (req, res) => {
        const data = req.body;
        const MaNV = req.params.MaNV;
        let sql = 'UPDATE nhanvien SET ? WHERE MaNV = ?';
        db.query(sql, [data, MaNV], (err, response) => {
            if (err) throw err
            res.json({ message: 'Update success!' })
        })
    },

    layTTKHchoDHOffline: (req, res) => {
        const soDienThoai = req.params.soDienThoai;
        let sql = 'SELECT TenNV, Email, DiaChi, MaKH, PhuongXa, KhuVuc, MaNV FROM nhanvien WHERE SDT = ?';
        db.query(sql, [soDienThoai], (err, response) => {
            if (err) throw err
            if (response[0] != undefined) {
                res.json(response[0])
            }
        })
    },

    layTTKHchoDHOffline2: (req, res) => {
        const maKH = req.params.maKH;
        let sql = 'SELECT TenNV, Email, DiaChi, SDT, PhuongXa, KhuVuc, MaNV FROM nhanvien WHERE MaKH = ?';
        db.query(sql, [maKH], (err, response) => {
            if (err) throw err
            if (response[0] != undefined) {
                res.json(response[0])
            }
        })
    },

    checkSDT: (req, res) => {
        var sdt = req.body.sdt;
        let sql = "Select SDT from nhanvien where SDT = '" + sdt + "'";
        db.query(sql, function (err, result) {
            if (err) throw err;
            // res.json(result);
            if (result.length > 0) {
                return res.send('1');
            }
            else {
                return res.send('0');
            }
        });
    },

    thayDoiMatKhau: (req, res) => {
        // var keychinh = req.body.keychinh;
        var matkhaucu = req.body.matkhaucu;
        var matkhau = md5(req.body.matkhau);
        var manv = req.body.key;
        //QUÊN MẬT KHẨU NGOÀI ĐĂNG NHẬP (n3ChQ"Rj5K8S<SY là set cứng để check quên hay đổi)
        if (matkhaucu == 'n3ChQ"Rj5K8S<SY') {
            let sql = "Update nhanvien Set MK = '" + matkhau + "' where MaNV = '" + manv + "'";
            db.query(sql, function (err, result) {
                if (err) throw err;
                // res.json(result);
            });
        }
        //ĐỔI MẬT KHẨU TRONG THÔNG TIN
        else {
            let sql = "Select MaNV from nhanvien where MK = '" + md5(matkhaucu) + "' AND MaNV = '" + manv + "'";
            db.query(sql, function (err, result) {
                if (err) throw err;
                // res.json(result);
                if (result.length > 0) {
                    let sql = "Update nhanvien Set MK = '" + matkhau + "' where MaNV = '" + manv + "'";
                    db.query(sql, function (err, result) {
                        if (err) throw err;
                        // res.json(result);
                        return res.send('1');
                    });
                }
                else {
                    return res.send('0');
                }
            });
        }
    },

    plusBonusPointsCombo: (req, res) => {
        const customerCode = req.params.customerCode
        const totalLoyaltyPoint = parseInt(req.body.totalLoyaltyPoint)
        console.log(`${new Date().getTime()} customerCode=`, customerCode)
        console.log(`${new Date().getTime()} totalLoyaltyPoint=`, totalLoyaltyPoint)
        const sql1 = `update nhanvien set DiemCombo = DiemCombo + ? where MaNV = ?`
        db.query(sql1, [totalLoyaltyPoint, customerCode], (err1, res1) => {
            if (err1) {
                throw err1
            }
            res.json([])
        })
        // // var keychinh = req.body.keychinh;
        // var matkhaucu = req.body.matkhaucu;
        // var matkhau = md5(req.body.matkhau);
        // var manv = req.body.key;
        // //QUÊN MẬT KHẨU NGOÀI ĐĂNG NHẬP (n3ChQ"Rj5K8S<SY là set cứng để check quên hay đổi)
        // if (matkhaucu == 'n3ChQ"Rj5K8S<SY') {
        //     let sql = "Update nhanvien Set MK = '" + matkhau + "' where MaNV = '" + manv + "'";
        //     db.query(sql, function (err, result) {
        //         if (err) throw err;
        //         // res.json(result);
        //     });
        // }
        // //ĐỔI MẬT KHẨU TRONG THÔNG TIN
        // else {
        //     let sql = "Select MaNV from nhanvien where MK = '" + md5(matkhaucu) + "' AND MaNV = '" + manv + "'";
        //     db.query(sql, function (err, result) {
        //         if (err) throw err;
        //         // res.json(result);
        //         if (result.length > 0) {
        //             let sql = "Update nhanvien Set MK = '" + matkhau + "' where MaNV = '" + manv + "'";
        //             db.query(sql, function (err, result) {
        //                 if (err) throw err;
        //                 // res.json(result);
        //                 return res.send('1');
        //             });
        //         }
        //         else {
        //             return res.send('0');
        //         }
        //     });
        // }
    }
}