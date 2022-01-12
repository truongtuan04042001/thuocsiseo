'use strict'
const db = require('../db')
const { API_URL } = require('../../constants/apiurl')

module.exports = {

    getLoyaltyPointForOrders: (req, res) => {
        const arrIdCombo = req.body.arrIdCombo
        let sql1 = `select IdCombo, LoyaltyPoint from combo where IdCombo in(`
        for (let i = 0; i < arrIdCombo.length; i++) {
            const ee1 = arrIdCombo[i];
            if (i == arrIdCombo.length - 1) {
                sql1 += "'" + ee1 + "'"
            } else {
                sql1 += "'" + ee1 + "',"
            }
        }
        sql1 += `);`
        db.query(sql1, (err1, res1) => {
            if (err1) {
                throw err1
            }
            res.json(res1)
        })
    },
    getIdComboDesc: (req, res) => {
        const sql = `select Id from combo order by Id desc limit 1`
        db.query(sql, (err1, res1) => {
            if (err1) {
                throw err1
            }
            res.json(res1)
        })
    },
    //get list cho admin
    getListCombo: (req, res) => {
        const sql = `select * from combo`
        db.query(sql, (err1, res1) => {
            if (err1) {
                throw err1
            }
            res.json(res1)
        })
    },

    getListComboOrderId: (req, res) => {
        const sql = `select * from combo where Status = 1 order by Id desc`
        db.query(sql, (err1, res1) => {
            if (err1) {
                throw err1
            }
            res.json(res1)
        })
    },

    getListComboOrderIdLimit: (req, res) => {
        const limit = parseInt(req.params.data)
        // console.log(`${new Date().getTime()} req.params.data=`, req.params.data)
        const sql = `select * from combo where Status = 1 order by Id desc limit ? `
        db.query(sql, [limit], (err1, res1) => {
            if (err1) {
                throw err1
            }
            res.json(res1)
        })
    },

    getComboById: (req, res) => {
        const idCombo = req.params.IdCombo
        const sql = `select * from combo where IdCombo = ? `
        db.query(sql, [idCombo], (err1, res1) => {
            if (err1) {
                throw err1
            }
            res.json(res1)
        })
    },

    uploadImageOne: (req, res) => {
        const idCombo = req.params.idCombo
        const imageOne = `${API_URL}/imageCombo/${idCombo}_Hinh1.jpg`
        const sql = `update combo set ImageOne = ? where IdCombo = ?`
        db.query(sql, [imageOne, idCombo], (err1, res1) => {
            if (err1) {
                throw err1
            }
            const sql2 = `update sanpham set HinhAnh = ? where MaHang = ?`
            db.query(sql2, [imageOne, idCombo], (err2, res2) => {
                if (err2) {
                    throw err2
                }
            })
            res.json(`OK`)
        })
    },

    uploadImageTwo: (req, res) => {
        const idCombo = req.params.idCombo
        const imageTwo = `${API_URL}/imageCombo/${idCombo}_Hinh2.jpg`
        const sql = `update combo set ImageTwo = ? where IdCombo = ?`
        db.query(sql, [imageTwo, idCombo], (err1, res1) => {
            if (err1) {
                throw err1
            }
            const sql2 = `update sanpham set HinhAnh2 = ? where MaHang = ?`
            db.query(sql2, [imageTwo, idCombo], (err2, res2) => {
                if (err2) {
                    throw err2
                }
            })
            res.json(`OK`)
        })
    },

    uploadImageThree: (req, res) => {
        const idCombo = req.params.idCombo
        const imageThree = `${API_URL}/imageCombo/${idCombo}_Hinh3.jpg`
        const sql = `update combo set ImageThree = ? where IdCombo = ?`
        db.query(sql, [imageThree, idCombo], (err1, res1) => {
            if (err1) {
                throw err1
            }
            const sql2 = `update sanpham set HinhAnh3 = ? where MaHang = ?`
            db.query(sql2, [imageThree, idCombo], (err2, res2) => {
                if (err2) {
                    throw err2
                }
            })
            res.json(`OK`)
        })
    },

    addItemCombo: (req, res) => {
        const data = req.body.data
        const sql = `insert into combo set ?`
        db.query(sql, [data], (err1, res1) => {
            if (err1) {
                throw err1
            }
            const product = {
                LoaiHang: `COMBO`,
                NhomHang: `COMBO`,
                MaHang: data.IdCombo,
                TenHang: data.ComboName,
                SoDangKy: `COMBO`,
                HoatChat: `COMBO`,
                HamLuong: `COMBO`,
                HangSX: `COMBO`,
                NuocSX: `COMBO`,
                QCDG: `COMBO`,
                GiaBan: data.TotalPrice,
                GiaVon: data.TotalPrice,
                DVT: `COMBO`,
                HinhAnh: `updating`,
                MoTa: `COMBO`,
                TonKho: 1000,
                DaDat: 0,
                ConLai: 1000,
                KhachDat: 0,
                DangKD: 1,
                TinhDS: 1,
                BanChay: 0,
                SPmoi: 0,
                HDnhanh: 0,
                GHnhanh: 0,
                SVip: 0,
                NhiKhoa: 0,
                NhaKhoa: 0,
                SanKhoa: 0,
                DaLieu: 0,
                NTHop: 0,
                ThanKinh: 0,
                BV: 0,
                FlashSale: 0,
                PhanTramKM: 0,
                NhanhHang: `COMBO`
            }
            const sql2 = `insert into sanpham set ?`
            db.query(sql2, [product], (err2, res2) => {
                if (err2) {
                    throw err2
                }
            })
            res.json(`OK`)
        })
    },

    updateItemCombo: (req, res) => {
        const idCombo = req.params.idCombo
        const data = req.body.data
        const sql = `update combo set ? where IdCombo = ?`
        db.query(sql, [data, idCombo], (err1, res1) => {
            if (err1) {
                throw err1
            }
            const product = {
                LoaiHang: `COMBO`,
                NhomHang: `COMBO`,
                MaHang: data.IdCombo,
                TenHang: data.ComboName,
                SoDangKy: `COMBO`,
                HoatChat: `COMBO`,
                HamLuong: `COMBO`,
                HangSX: `COMBO`,
                NuocSX: `COMBO`,
                QCDG: `COMBO`,
                GiaBan: data.TotalPrice,
                GiaVon: data.TotalPrice,
                DVT: `COMBO`,
                // HinhAnh: `updating`,
                MoTa: `COMBO`,
                TonKho: 1000,
                DaDat: 0,
                ConLai: 1000,
                KhachDat: 0,
                DangKD: 1,
                TinhDS: 1,
                BanChay: 0,
                SPmoi: 0,
                HDnhanh: 0,
                GHnhanh: 0,
                SVip: 0,
                NhiKhoa: 0,
                NhaKhoa: 0,
                SanKhoa: 0,
                DaLieu: 0,
                NTHop: 0,
                ThanKinh: 0,
                BV: 0,
                FlashSale: 0,
                PhanTramKM: 0,
                NhanhHang: `COMBO`
            }
            const sql2 = `update sanpham set ? where MaHang = ?`
            db.query(sql2, [product, idCombo], (err2, res2) => {
                if (err2) {
                    throw err2
                }
            })
            res.json(`OK`)
        })
    },

    deleteItemCombo: (req, res) => {
        const idCombo = req.params.idCombo
        const sql2 = `delete from combo_detail where IdCombo = ?`
        db.query(sql2, [idCombo], (err1, res1) => {
            if (err1) {
                throw err1
            }
        })
        const sql = `delete from combo where IdCombo = ?`
        db.query(sql, [idCombo], (err2, res2) => {
            if (err2) {
                throw err2
            }
            const sql2 = `delete from combo where MaHang = ?`
            db.query(sql2, [idCombo], (err2, res2) => {
                if (err2) {
                    throw err2
                }

            })
            res.json(`OK`)
        })
    },

}