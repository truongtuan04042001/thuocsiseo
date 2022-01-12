'use strict'
const db = require('./../db')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {

    DanhSachNCC: (req, res) => {
        let sql = "SELECT * FROM nhacungcap ";
        db.query(sql, function (err, resultfull) {
            if (err) throw err;
            res.json(resultfull)
        });
    },
    SuaDanhSachNCC: (req, res) => {
        const maNCC = req.body.MaNCC;
        const data1 = req.body.data;
        const sql = `update nhacungcap set ? where MaNCC = ?;`
        db.query(sql, [data1, maNCC], (err1, res1) => {
            if (err1) {
                throw err1
            }
            res.json(res1)
        })

    },
    XoaDanhSachNCC: (req, res) => {
        const maNCC = req.body.MaNCC;
        let sql2 = "DELETE FROM nhacungcap WHERE MaNCC ='" + maNCC + "'"
        db.query(sql2, (err, response) => {
            if (err) throw err
            res.json({ message: 'Delete success!' })
        })
    },

    thongTinNCC: (req, res) => {
        const sDT = req.params.SDT;
        if (sDT.length >= 10) {
            const sql = `SELECT * FROM nhacungcap where SDT = ?`;
            db.query(sql, [sDT], (err1, res1) => {
                if (err1) throw err1;
                res.json(res1)
            });
        }
    }

}
