'use strict'
const db = require('./../db')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    //manv là keychinh đc truyền từ client để hiển thị doanh nghiệp
    doanhNghiep: (req, res) => {
        var manv;
        var authohd = req.body.key;
        if (authohd !== undefined) {
            //var token = authohd.split(' ')[1];
            jwt.verify(authohd, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
                if (data !== undefined) {
                    manv = data.ID;
                    let sql = " Select * from doanhnghiep where MaUser='" + manv + "'";
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
    // loaiDoanhNghiep: (req, res) => {
    //     var manv = req.body.key;
    //     let sql = "Insert into doanhnghiep (MaUser,LoaiDN) Values('" + manv + "','" + manv + "')";
    //     db.query(sql, function (err, result) {
    //         if (err) throw err;
    //     });
    // },
    //manv là keychinh đc truyền từ client để cập nhật doanh nghiệp
    thongTinDoanhNghiep: (req, res) => {
        var manv = req.body.key;
        var loaidn = req.body.loaidn;
        var tendn = req.body.tendn;
        var tendd = req.body.tendd;
        var sdtdn = req.body.sdtdn;
        var mathue = req.body.mathue;
        var diachi = req.body.diachi;
        var phuongxa = req.body.phuongxa;
        var tinh = req.body.tinh;
        let sql = "Update doanhnghiep SET LoaiDN ='" + loaidn + "' ,TenDN =? ,TenDaiDien=? ,SDTDN ='" + sdtdn + "' ,MaThue ='" + mathue + "' ,DiaChiDN =? ,PhuongXaDN =? ,TinhDN ='" + tinh + "' where MaUser = '" + manv + "'";
        db.query(sql,[tendn,tendd,diachi,phuongxa] ,function (err, result) {
            if (err) throw err;
            res.json('')
        });
    },
}