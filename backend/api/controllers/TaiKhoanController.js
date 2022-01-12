'use strict'
const db = require('./../db')
const md5 = require('../../md5/md5')
const table = 'nhanvien'
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
module.exports = {

    //hàm đăng nhập (trường làm)
    dangNhap: (req, res) => {
        const maNV = req.body.maNV;
        const mK = md5(req.body.mK);
        const sql = "SELECT MaNV,MK FROM nhanvien WHERE MaNV = ? AND MK = ?";
        db.query(sql, [maNV, mK], function (err, result) {
            if (err) throw err;
            if (result.length == 0) {
                // loaiTaiKhoan = -1
                res.json("loginfail")
            } else {
                if (result[0].MaNV === maNV && result[0].MK === mK) {
                    //console.log(result[0].MaNV)
                    const acctk = jwt.sign({ ID: result[0].MaNV }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '48h' });
                    res.json(acctk)
                } else {
                    res.json("loginfail")
                }
            }
        });
    },

    dangNhap2: (req, res) => {
        const maNV = req.body.maNV;
        const mK = md5(req.body.mK);
        const sql = "SELECT MaNV,ChucVu,Info,MK FROM nhanvien2 WHERE MaNV = ? AND MK = ?";//phần xác nhận tk
        db.query(sql, [maNV, mK], function (err, result) {
            if (err) throw err;
            if (result.length == 0) {
                // loaiTaiKhoan = -1
                res.json("loginfail")
            } else {
                if (result[0].MaNV === maNV && result[0].MK === mK) {
                    //console.log(result[0].MaNV)
                    const acctk = jwt.sign({ ID: result[0].MaNV, CV: result[0].ChucVu, IF: result[0].Info }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '48h' });
                    res.json({ token: acctk, info: result })
                } else {
                    res.json("loginfail")
                }
            }
        });
    },

    //hàm cập nhật thông tin nhân viên (trường làm)
    updateInfo: (req, res) => {
        let data = req.body;
        data.MK = md5(data.MK)
        let sql = "UPDATE nhanvien2 SET ? WHERE MaNV = ?";
        db.query(sql, [data, data.MaNV], function (err, result) {
            if (err) throw err;
            res.send("OK")
        })
    },

    layTenNhanVienChoInDonHang: (req, res) => {
        const { maNV } = req.params
        const sql = "select TenNV from nhanvien2 where MaNV = ?"
        db.query(sql, [maNV], (err, data) => {
            if (err) {
                throw err
            }
            let result = {
                msg: "NOTOK"
            }
            if (data != null || data != undefined) {
                result.msg = data[0].TenNV
            }
            res.json(result)
        })
    },
    getVersion: (req, res) => {
        const sql = "select * from Version"
        db.query(sql, (err, data) => {
            if (err) {
                throw err
            }
            res.json(data)
        })
    }
}