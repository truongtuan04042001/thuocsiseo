'use strict'
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const db = require('../db')
const table = 'lohang'
const table2 = 'chitietlohang'

const capNhatSoLuongTonKho = async () => {
    let queryLayTatCaMaHang = "SELECT DISTINCT MaHang FROM chitietlohang"
    // lấy hết mã hàng trong lô hàng
    await db.query(queryLayTatCaMaHang, async (err, response) => {
        if (err) throw err
        const tatCaMaHang = response
        for (let i = 0; i < tatCaMaHang.length; i++) {
            const e = tatCaMaHang[i];
            let queryDSTonKho1SanPham = "SELECT SoLuong FROM chitietlohang WHERE MaHang = ?"
            // lấy số lượng sản phẩm trong tất cả lô hàng
            await db.query(queryDSTonKho1SanPham, e.MaHang, async (err2, response2) => {
                if (err2) throw err2
                // lấy xong sl thì cộg dồn lại, cộng đến khi nào hết thì cập nhật số tồn khô vô bảng sản phẩm
                let tongTonKho1SanPham = 0
                response2.forEach(e => {
                    tongTonKho1SanPham += parseFloat(e.SoLuong)
                });
                let queryCapNhatTonKho1SanPham = 'UPDATE sanpham SET TonKho = ? WHERE MaHang = ?'
                // thằng chỗ này là lưu sl tồn kho vô sanpham
                await db.query(queryCapNhatTonKho1SanPham, [tongTonKho1SanPham, e.MaHang], (err3, respons3) => {
                    if (err3) throw err3
                })
            })
        }
    })
}

module.exports = {
    themLoHang: (req, res) => {
        let data = req.body;
        // console.log(new Date().getTime() + " data= " + JSON.stringify(data))
        let sql = 'INSERT INTO ' + table + ' SET ?'
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({ message: 'Insert success!' })
            console.log(new Date().getTime() + " Insert success!= " + JSON.stringify(""))
        })
    },
    danhSachLoHang: (req, res) => {
        let sql = 'SELECT * FROM ' + table
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    chiTiet1LoHang: (req, res) => {
        let sql = 'SELECT * FROM ' + table + ' WHERE MaLH = ?'
        db.query(sql, [req.params.MaLH], (err, response) => {
            if (err) throw err
            res.json(response[0])
        })
    },
    setTongTonKho1SanPhamTheoMaHang: (req, res) => {
        let data = req.body;
        let MaHang = req.params.MaHang;
        let sql = 'UPDATE ' + table + ' SET ? WHERE MaHang = ?'
        db.query(sql, [data, MaHang], (err, response) => {
            if (err) throw err
            res.json({ message: 'Update success!' })
        })
    },
    sua1LoHang: (req, res) => {
        let data = req.body;
        let MaLH = req.params.MaLH;
        let sql = 'UPDATE ' + table + ' SET ? WHERE MaLH = ?'
        db.query(sql, [data, MaLH], (err, response) => {
            if (err) throw err
            res.json({ message: 'Update success!' })
        })
    },
    xoa1LoHang: (req, res) => {
        // khi xóa 1 lô hàng, việc đầu là xóa cái chi tiết lô hàng cùng mã lô muốn xóa, xóa xong thì mới xóa cái lô hàng
        let sql2 = 'DELETE FROM ' + table2 + ' WHERE MaLH = ?'
        db.query(sql2, [req.params.MaLH], async (err, response) => {
            if (err) throw err
            let sql = 'DELETE FROM ' + table + ' WHERE MaLH = ?'
            await db.query(sql, [req.params.MaLH], (err, response) => {
                if (err) throw err
                capNhatSoLuongTonKho()
                res.json({ message: 'Delete success!' })
            })
        })
    }
}

