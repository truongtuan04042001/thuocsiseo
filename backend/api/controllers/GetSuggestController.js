﻿﻿﻿'use strict'
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const db = require('../db')


const redis = require("redis")
const PORT_REDIS = process.env.PORT || 6379
const redisClient = redis.createClient(PORT_REDIS)
const set = (key, value) => {
    redisClient.set(key, JSON.stringify(value),'EX',60*60);
}
module.exports = {
    getSuggest: (req, res) => {
        var mangtong = []
        var i=0
        let sql = "select * from hoatchat";
        db.query(sql, function (err, result) {
            if (err) throw err;
            for (i = 0; i < result.length; i++) {
                mangtong.push({ value: result[i].TenHC })
            }
            let sql2 = "select * from hangsanxuat";
            db.query(sql2, function (err, result) {
                for (i = 0; i < result.length; i++) {
                    mangtong.push({ value: result[i].TenHangSX })
                }
                let sql3 = "select TenHang from sanpham where DangKD!=0 ";
                db.query(sql3, function (err, result) {
                    for (i = 0; i < result.length; i++) {
                        mangtong.push({ value: result[i].TenHang })
                    }
                    // console.log(mangtong);
                    // set(req.route.path, result)
                    set("/getsuggest",JSON.stringify(mangtong))
                    res.json(mangtong);
                })
            })
        });
    },
    getSuggestFront: (req, res) => {
        var mangtong = []
        var i=0
        let sql = "select TenHang,HoatChat,HangSX,HinhAnh,GiaBan from sanpham where DangKD!=0";
        db.query(sql, function (err, result) {
            if (err) throw err;
             let mangSG = []
                    if (result.length > 0) {
                        result.forEach(ee2 => {
                                mangSG.push({
                                    ...ee2,
                                    ...{ linkhinh:ee2.HinhAnh+"?"+ee2.TenHang+"?"+ee2.GiaBan,sgapp:ee2.TenHang+ee2.HoatChat+ee2.HangSX}
                                })
                           
                        });
                    }
            set("/getsuggestfront",JSON.stringify(mangSG))
            res.json(mangSG);
        });
    },
    getSuggestKM: (req, res) => {
 
        var i = 0
        let sql = "select TenHang,HoatChat,HangSX,HinhAnh,GiaBan from sanpham where PhanTramKM > 0  OR FlashSale = 1";
        db.query(sql, function (err, result) {
            if (err) throw err;
            let mangSG = []
            if (result.length > 0) {
                result.forEach(ee2 => {
                        mangSG.push({
                            ...ee2,
                            ...{ linkhinh:ee2.HinhAnh+"?"+ee2.TenHang+"?"+ee2.GiaBan,sgapp:ee2.TenHang+ee2.HoatChat+ee2.HangSX}
                        })
                   
                });
            }
                set("/getsuggestkm",JSON.stringify(mangSG))
                res.json(mangSG);
           
        });
    },
    getSuggest2: (req, res) => {
        var mangtong = []
        var i = 0
        let sql = "select * from hoatchat";
        db.query(sql, function (err, result) {
            if (err) throw err;
            for (i = 0; i < result.length; i++) {
                mangtong.push({ value: result[i].TenHC })
            }
            let sql2 = "select * from hangsanxuat";
            db.query(sql2, function (err, result) {
                for (i = 0; i < result.length; i++) {
                    mangtong.push({ value: result[i].TenHangSX })
                }
                let sql3 = "select TenHang from sanpham";
                db.query(sql3, function (err, result) {
                    for (i = 0; i < result.length; i++) {
                        mangtong.push({ value: result[i].TenHang })
                    }
                    let sql4 = "select MaHang from sanpham";
                    db.query(sql4, function (err, result) {
                        for (i = 0; i < result.length; i++) {
                            mangtong.push({ value: result[i].MaHang })
                        }
                        // console.log(mangtong);
                        // set(req.route.path, result)
                        set("/getsuggest2",JSON.stringify(mangtong))
                        res.json(mangtong);
                    })
                })
            })
        });
    },
    getSuggest3: (req, res) => {
        var mangtong = []
        var i = 0
        let sql3 = "select MaDatHang from donhang";
        db.query(sql3, function (err, result) {
            for (i = 0; i < result.length; i++) {
                mangtong.push({ value: result[i].MaDatHang })
            }
            let sql4 = "select KhachHang from donhang";
            db.query(sql4, function (err, result) {
                for (i = 0; i < result.length; i++) {
                    mangtong.push({ value: result[i].KhachHang })
                }
                // console.log(mangtong);
                // set(req.route.path, result)
                set("/getsuggest3",JSON.stringify(mangtong))
                res.json(mangtong);
            })
        })
    },
    getSuggest4: (req, res) => {
        var mangtong = []
        var i = 0
        let sql3 = "select TenHang from chitietlohang";
        db.query(sql3, function (err, result) {
            for (i = 0; i < result.length; i++) {
                mangtong.push({ value: result[i].TenHang })
            }
            let sql4 = "select MaHang from chitietlohang";
            db.query(sql4, function (err, result) {
                for (i = 0; i < result.length; i++) {
                    mangtong.push({ value: result[i].MaHang })
                }
                // console.log(mangtong);
                // set(req.route.path, result)
                set("/getsuggest4",JSON.stringify(mangtong))
                res.json(mangtong);
            })
        })
    },
    getSuggest5: (req, res) => {
        let Manv = req.body.Manv;
        var mangtong = []
        var i = 0
        let sql3 = "select MaDatHang from donhang where MaNguoiBan='"+Manv+"'";
        db.query(sql3, function (err, result) {
            for (i = 0; i < result.length; i++) {
                mangtong.push({ value: result[i].MaDatHang })
            }
            let sql4 = "select KhachHang from donhang where MaNguoiBan='"+Manv+"'";
            db.query(sql4, function (err, result) {
                for (i = 0; i < result.length; i++) {
                    mangtong.push({ value: result[i].KhachHang })
                }
                res.json(mangtong);
            })
        })
    },
    getSuggestDHN: (req, res) => {
        var mangtong = []
        var i = 0
        let sql3 = "select TenNCC from donhangnhap";
        db.query(sql3, function (err, result) {
            for (i = 0; i < result.length; i++) {
                mangtong.push({ value: result[i].TenNCC })
            }
            let sql4 = "select SDT from donhangnhap";
            db.query(sql4, function (err, result) {
                for (i = 0; i < result.length; i++) {
                    mangtong.push({ value: result[i].SDT })
                }
                // console.log(mangtong);
                // set(req.route.path, result)
                set("/getSuggestDHN",JSON.stringify(mangtong))
                res.json(mangtong);
            })
        })
    },
    getSuggest3CongNo: (req, res) => {
        var mangtong = []
        var i = 0
        let sql3 = "select MaDatHang from donhang where CongNo > 0 group by MaDatHang";
        db.query(sql3, function (err, result) {
            for (i = 0; i < result.length; i++) {
                mangtong.push({ value: result[i].MaDatHang })
            }
            let sql4 = "select KhachHang from donhang where CongNo > 0 Group by KhachHang";
            db.query(sql4, function (err, result) {
                for (i = 0; i < result.length; i++) {
                    mangtong.push({ value: result[i].KhachHang })
                }
                // console.log(mangtong);
                // set(req.route.path, result)
                set("/getsuggest3CongNo",JSON.stringify(mangtong))
                res.json(mangtong);
            })
        })
    },
    getSuggestoff: (req, res) => {
        var mangtong = []
        var i = 0

        let sql3 = "select SDT from nhanvien";
        db.query(sql3, function (err, result) {
            for (i = 0; i < result.length; i++) {
                if(result[i].SDT != null){
                mangtong.push({ value: result[i].SDT })
                }
            }
            set("/getsuggestoff",JSON.stringify(mangtong))
            res.json(mangtong);
        })
    },

    getSuggestoff2: (req, res) => {
        var mangtong = []
        var i = 0

        let sql3 = "select MaNV from nhanvien2";
        db.query(sql3, function (err, result) {
            for (i = 0; i < result.length; i++) {
                if(result[i].MaNV != null){
                mangtong.push({ value: result[i].MaNV })
                }
            }
            set("/getsuggestoff2",JSON.stringify(mangtong))
            res.json(mangtong);
        })
    },
    getSuggestoff3: (req, res) => {
        var mangtong = []
        var i = 0

        let sql3 = "select MaKH from nhanvien";
        db.query(sql3, function (err, result) {
            for (i = 0; i < result.length; i++) {
                if(result[i].MaKH != null){
                mangtong.push({ value: result[i].MaKH })
            }
            }
            set("/getsuggestoff3",JSON.stringify(mangtong))
            res.json(mangtong);
        })
    },
    getSuggestadtname: (req, res) => {
        var mangtong = []
        var i = 0
        let sql3 = "select TenHang from sanpham";
        db.query(sql3, function (err, result) {
            for (i = 0; i < result.length; i++) {
                if(result[i].TenHang != null){
                mangtong.push({ value: result[i].TenHang })
                }
            }
            set("/getsuggestadtname",JSON.stringify(mangtong))
            res.json(mangtong);
        })
    },
    getSuggestadthc: (req, res) => {
        var mangtong = []
        var i = 0

        let sql3 = "select HoatChat from sanpham";
        db.query(sql3, function (err, result) {
            for (i = 0; i < result.length; i++) {
                if(result[i].HoatChat != null){
                mangtong.push({ value: result[i].HoatChat })
                }
            }
            set("/getsuggestadthc",JSON.stringify(mangtong))
            res.json(mangtong);
        })
    },
    getSuggestadtmh: (req, res) => {
        var mangtong = []
        var i = 0

        let sql3 = "select MaHang from sanpham";
        db.query(sql3, function (err, result) {
            for (i = 0; i < result.length; i++) {
                if(result[i].MaHang != null){
                mangtong.push({ value: result[i].MaHang })
                }
            }
            set("/getsuggestadtmh",JSON.stringify(mangtong))
            res.json(mangtong);
        })
    },
    getSuggestUS: (req, res) => {
        var mangtong = []
        var i = 0
        let sql3 = "select MaKH from nhanvien";
        db.query(sql3, function (err, result) {
            for (i = 0; i < result.length; i++) {
                mangtong.push({ value: result[i].MaKH })
            }
            let sql4 = "select TenNV from nhanvien";
            db.query(sql4, function (err, result) {
                for (i = 0; i < result.length; i++) {
                    mangtong.push({ value: result[i].TenNV })
                }
                let sql5 = "select SDT from nhanvien";
                db.query(sql5, function (err, result) {
                    for (i = 0; i < result.length; i++) {
                        mangtong.push({ value: result[i].SDT })
                    }
                    res.json(mangtong);
                })
            })
        })
    },
    
    getSuggestSDTNCC: (req, res) => {
        let mangtong = []
        let i = 0
        let sql3 = "select SDT from nhacungcap";
        db.query(sql3, function (err, result) {
            if (err) {
                throw err
            }
            for (i = 0; i < result.length; i++) {
                if(result[i].SDT != null){
                mangtong.push({ value: result[i].SDT })
                }
            }
            set("/getSuggestSDTNCC",JSON.stringify(mangtong))
            res.json(mangtong);
        })
    },
} 
