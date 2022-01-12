'use strict'
const db = require('./../db')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    loaimgg: (req, res) => {
        var doiTuong = req.body.doiTuong;

        let sql = "Select * from loaimagiamgia WHERE doiTuong = ?";
        db.query(sql, [doiTuong], function (err, result) {
            if (err) throw err;
            res.json(result);
        });
    },
    checkmggused: (req, res) => {
        var idVoucher = req.body.idVoucher;

        let sql = "Select * from magiamgia WHERE idVoucher = ?";
        db.query(sql, [idVoucher], function (err, result) {
            if (err) throw err;
            if (result.length > 0) {
                res.json('ok')
            }
        });
    },
    
    mgg: (req, res) => {
        var doiTuong = req.body.doiTuong;

        let sql = "Select * from magiamgia WHERE doiTuong = ? ORDER BY tienGiam DESC";
        db.query(sql, [doiTuong], function (err, result) {
            if (err) throw err;
            res.json(result);
        });
    },

    themmggNew: (req, res) => {
        var user = req.body.makh;
        var doiTuong = req.body.doiTuong;
        let sqlcheck = "Select * from magiamgia WHERE doiTuong = ?";
        db.query(sqlcheck, [user], function (err, result) {
            if (err) throw err;
            if (result.length <= 0) {
                let sql = "Select * from loaimagiamgia WHERE doiTuong = ?";
                db.query(sql, [doiTuong], function (err, result) {
                    if (err) throw err;
                    if (result[0].tienGiam > 0) {
                        var targetDate = new Date();
                        targetDate.setDate(targetDate.getDate() + (result[0].ngayHetHan * 1));
                        var dd = targetDate.getDate();
                        var mm = targetDate.getMonth() + 1;
                        var yyyy = targetDate.getFullYear();
                        var date = yyyy + '-' + mm + '-' + dd;

                        let sqladd = "Insert into magiamgia(doiTuong, tienGiam, ngayHetHan) VALUES (?, ?, ?)";
                        db.query(sqladd, [user, result[0].tienGiam, date], function (err, result) {
                            if (err) throw err;
                            res.json('ok')
                        });
                    }
                });
            }
        });
    },
    themmgg2Month: (req, res) => {
        var user = req.body.makh;
        var doiTuong = req.body.doiTuong;
        // Check nếu k có đơn trong vòng 2 tháng đổ lại .
        let sqlcheck = "SELECT * FROM donhang WHERE NgayDatHang >= DATE_SUB(CURDATE(), INTERVAL 2 MONTH) AND SoDienThoai = ?";
        db.query(sqlcheck, [user], function (err, result) {
            if (err) throw err;
            if (result.length <= 0) {
                // Check đã có mã hay chưa .
                let sql = "Select * from magiamgia WHERE doiTuong = ?";
                db.query(sql, [user], function (err, result) {
                    if (err) throw err;
                    if (result.length <= 0) {
                        // Lấy bảng giá , ngày hết hạn Chung
                        let sql = "Select * from loaimagiamgia WHERE doiTuong = ?";
                        db.query(sql, [doiTuong], function (err, result) {
                            if (err) throw err;
                            if (result.length > 0 && result[0].tienGiam > 0) {
                                var targetDate = new Date();
                                targetDate.setDate(targetDate.getDate() + (result[0].ngayHetHan * 1));
                                var dd = targetDate.getDate();
                                var mm = targetDate.getMonth() + 1;
                                var yyyy = targetDate.getFullYear();
                                var date = yyyy + '-' + mm + '-' + dd;

                                let sqladd = "Insert into magiamgia(doiTuong, tienGiam, ngayHetHan) VALUES (?, ?, ?)";
                                db.query(sqladd, [user, result[0].tienGiam, date], function (err, result) {
                                    if (err) throw err;
                                    res.json('ok')
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    suaLoaiMgg: (req, res) => {
        var doiTuong = req.body.doiTuong;
        var ngayhethan = req.body.date;
        var tiengiam = req.body.money;

        let sql = "Update loaimagiamgia SET ngayHetHan = ? , tienGiam = ? WHERE doiTuong = ?";
        db.query(sql, [ngayhethan, tiengiam, doiTuong], function (err, result) {
            if (err) throw err;
            res.json("")
        });

    },
    xoaMggHetHan: (req, res) => {
        let sql = "Delete from magiamgia WHERE ngayHetHan <= DATE_SUB(CURDATE() , INTERVAL 1 DAY)";
        db.query(sql, function (err, result) {
            if (err) throw err;
            res.json("")
        });

    },
    
    xoaMggUsed: (req, res) => {
        var maNV = req.body.maNV;

        let sql = "Delete from magiamgia WHERE doiTuong = ?";
        db.query(sql, [maNV], function (err, result) {
            if (err) throw err;
            res.json("")
        });

    },

    ////diem tich lũy
    loyaltypoint: (req, res) => {
        var point = req.body.point;
        var manv = req.body.makh;
        if (Math.sign(point) == -1) {
            let sql = "select DiemThuong from nhanvien where MaNV = '" + manv + "'";
            db.query(sql, function (err, result) {
                if (err) throw err;
                let dth = result[0].DiemThuong
                // console.log(dth)
                if (Math.sign(dth + point) == -1) {
                    let sql = "Update nhanvien Set DiemThuong = 0  where MaNV = '" + manv + "'";
                    db.query(sql, function (err, result) {
                        if (err) throw err;
                        res.json(result);
                    });
                } else {
                    let sql = "Update nhanvien Set DiemThuong = DiemThuong + " + point + "  where MaNV = '" + manv + "'";
                    db.query(sql, function (err, result) {
                        if (err) throw err;
                        res.json(result);

                    });
                }
            });
        } else {
            let sql = "Update nhanvien Set DiemThuong = DiemThuong + " + point + "  where MaNV = '" + manv + "'";
            db.query(sql, function (err, result) {
                if (err) throw err;
                res.json(result);

            });
        }
    },
    
    doidiem: (req, res) => {
        let sql = "SELECT * FROM doidiem "
        db.query(sql, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
    },
    themdiem: (req, res) => {
        var gia = req.body.gia;
        var diem = req.body.diem;
        let sql = "insert into doidiem (Gia,Diem) Values('" + gia + "','" + diem + "')"
        db.query(sql, function (err, result) {
            if (err) throw err;
            res.json(result);

        });

    },
    xoadiem: (req, res) => {
        var id = req.body.id;

        let sql = "DELETE FROM doidiem where ID = '" + id + "' "
        db.query(sql, function (err, result) {
            if (err) throw err;
            res.json(result);

        });

    },
    suadiem: (req, res) => {
        var id = req.body.id;
        var gia = req.body.gia;
        var diem = req.body.diem;
        let sql = "Update doidiem Set Diem= ?,Gia= ?  where Id = '" + id + "'"
        db.query(sql, [diem, gia], function (err, result) {
            if (err) throw err;
            res.json(result);

        });

    },
    ////diem tich lũy

    ////qua nguoi moi
    doiqua: (req, res) => {
        let sql = "SELECT * FROM quatang "
        db.query(sql, function (err, result) {
            if (err) throw err;
            res.json(result);

        });

    },
    themqua: (req, res) => {
        var ten = req.body.ten;

        let sql = "insert into quatang (TenQuaTang) Values('" + ten + "')"
        db.query(sql, function (err, result) {
            if (err) throw err;
            res.json(result);

        });

    },
    xoaqua: (req, res) => {
        var id = req.body.id;

        let sql = "DELETE FROM quatang where Id = '" + id + "' "
        db.query(sql, function (err, result) {
            if (err) throw err;
            res.json(result);

        });

    },
    suaqua: (req, res) => {
        var id = req.body.id;
        var ten = req.body.ten;
        let sql = "Update quatang Set TenQuaTang= ? where Id = '" + id + "'"
        db.query(sql, [ten], function (err, result) {
            if (err) throw err;
            res.json(result);

        });

    },
    ////qua nguoi moi
    ////bannner
    layBanner: (req, res) => {

        let sql = 'select * from banner'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    themBanner: (req, res) => {
        var TenBanner = req.body.TenBanner;
        var original = req.body.original;
        let sql = "insert into banner (TenBanner,original) Values (?,?)"
        db.query(sql, [TenBanner, original], function (err, result) {
            if (err) throw err;
            res.json(result);

        });

    },
    xoaBanner: (req, res) => {
        var id = req.body.id;
        let sql = "DELETE FROM banner where Id = '" + id + "' "
        db.query(sql, function (err, result) {
            if (err) throw err;
            res.json(result);

        });

    },
    suaBanner: (req, res) => {
        var id = req.body.id;
        var TenBanner = req.body.TenBanner;
        var original = req.body.original;
        let sql = "Update banner Set TenBanner= ?,original=? where Id = '" + id + "'"
        db.query(sql, [TenBanner, original], function (err, result) {
            if (err) throw err;
            res.json(result);

        });

    },
    ////bannner
    ////qua tặng + km
    //Khuyến mãi bên khách
    layctkm: (req, res) => {

        let sql = 'select * from chuongtrinhkm WHERE Status = 1 ORDER BY DieuKien DESC'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    //Khuyến mãi bên quản lý
    laychuongtrinhkm: (req, res) => {

        let sql = 'select * from chuongtrinhkm ORDER BY DieuKien DESC'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    themchuongtrinhkm: (req, res) => {
        var DieuKien = req.body.DieuKien;
        var TenQua = req.body.TenQua;
        var ThoiHan = req.body.ThoiHan;
        var LoaiKM = req.body.LoaiKM;
        let sql = "insert into chuongtrinhkm (DieuKien,TenQua,ThoiHan,LoaiKM) Values (?,?,?,?)"
        db.query(sql, [DieuKien, TenQua, ThoiHan, LoaiKM], function (err, result) {
            if (err) throw err;
            res.json(result);

        });

    },
    xoachuongtrinhkm: (req, res) => {
        var id = req.body.id;
        let sql = "DELETE FROM chuongtrinhkm where Id = '" + id + "' "
        db.query(sql, function (err, result) {
            if (err) throw err;
            res.json(result);

        });

    },
    suachuongtrinhkm: (req, res) => {
        var id = req.body.id;
        var DieuKien = req.body.DieuKien;
        var TenQua = req.body.TenQua;
        var ThoiHan = req.body.ThoiHan;
        var LoaiKM = req.body.LoaiKM;
        var Status = req.body.Status;
        var LinkVoucher = req.body.LinkVoucher;
        let sql = "Update chuongtrinhkm Set DieuKien= ?,TenQua=?,ThoiHan=?,LoaiKM=?,LinkVoucher=?,Status=? where Id = '" + id + "'"
        db.query(sql, [DieuKien, TenQua, ThoiHan, LoaiKM, LinkVoucher, Status], function (err, result) {
            if (err) throw err;
            res.json(result);

        });

    },
    deactivechuongtrinhkm: (req, res) => {
        let sql = "update chuongtrinhkm set Status = 0 WHERE ThoiHan <= DATE_SUB(CURDATE() , INTERVAL 1 DAY)";
        db.query(sql, function (err, result) {
            if (err) throw err;
            res.json("")
        });

    },
    ////qua tặng + km
    // Tiêu đề trang Mã Giảm Giá / Quà Tặng
    layTieuDe: (req, res) => {

        let sql = 'select * from EditTitleQT'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    suaTieuDe: (req, res) => {
        // var id = req.body.id;
        var title = req.body.title;
        let sql = "Update EditTitleQT Set title= ? "
        db.query(sql, [title], function (err, result) {
            if (err) throw err;
            res.json(result);

        });

    },
    // Tiêu đề trang Mã Giảm Giá / Quà Tặng

}