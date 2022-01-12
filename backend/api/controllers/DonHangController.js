'use strict'
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const db = require('../db')
const table = 'donhang'
const table2 = 'chitietdonhang'
const redis = require("redis")
const PORT_REDIS = process.env.PORT || 6379
const redisClient = redis.createClient(PORT_REDIS)

module.exports = {

    themDonHang: async (req, res) => {
        let data = req.body;
        let ngay = "" + new Date().getDate()
        if (ngay.length == 1) {
            ngay = "0" + ngay
        }
        let thang = "" + (parseInt(new Date().getMonth()) + 1)
        if (thang.length == 1) {
            thang = "0" + thang
        }
        let gio = "" + new Date().getHours()
        if (gio.length == 1) {
            gio = "0" + gio
        }

        let phut = "" + new Date().getMinutes()
        if (phut.length == 1) {
            phut = "0" + phut
        }
        let date = ngay + "-" + thang + "-" + new Date().getFullYear() + " " + gio + ":" + phut
        data.ThoiGian = date
        data.NgayDatHang = new Date().getFullYear() + "-" + thang + "-" + new Date().getDate()
        if (data.TrangThai === `Chưa xác nhận`) {
            data.TrangThai = `Đã xác nhận`
        }
        let sql = 'INSERT INTO ' + table + ' SET ?'
        // console.log(`${new Date().getTime()} data=`, data)
        db.query(sql, [data], async (err, response) => {
            if (err) throw err
            let sql2 = 'SELECT TuTang FROM donhang ORDER BY TuTang DESC LIMIT 1'
            db.query(sql2, async (err, response) => {
                if (err) throw err
                const tuTang = "" + response[0].TuTang
                let maDatHang = ""
                if (tuTang.length == 1) {
                    maDatHang = 'DH00000' + tuTang
                }
                if (tuTang.length == 2) {
                    maDatHang = 'DH0000' + tuTang
                }
                if (tuTang.length == 3) {
                    maDatHang = 'DH000' + tuTang
                }
                if (tuTang.length == 4) {
                    maDatHang = 'DH00' + tuTang
                }
                if (tuTang.length == 5) {
                    maDatHang = 'DH0' + tuTang
                }
                if (tuTang.length >= 6) {
                    maDatHang = 'DH' + tuTang
                }
                if (maDatHang !== null && maDatHang !== undefined) {
                    let sql3 = 'UPDATE donhang SET MaDatHang = ? WHERE TuTang = ?'
                    db.query(sql3, [maDatHang, tuTang], (err, response) => {
                        if (err) throw err
                        res.json([{ MaDatHang: maDatHang }])
                    })
                } else {
                    res.json([{ MaDatHang: `null` }])
                }
            })

        })
        // res.json({ abc: 'abc' })
    },

    danhSachDonHang: (req, res) => {
        let sql = 'SELECT * FROM ' + table + ' ORDER BY MaDatHang DESC';
        db.query(sql, async (err, response) => {
            if (err) throw err
            response.forEach(ee => {
                try {
                    let tmp = ee.NgayXuLy
                    tmp.setDate(tmp.getDate() + 1)
                    ee.NgayXuLy = tmp
                } catch (err) {

                }
            });
            res.json(response)
        })
    },

    danhSachDonHangCongNo: (req, res) => {
        let MaKH = req.body.MaKH;
        let sql = 'SELECT * FROM ' + table + ' where MaKhachHang=? AND CongNo > 0  AND (TrangThai="Đã xử lý" OR TrangThai="Hoàn thành" )';
        db.query(sql, MaKH, async (err, response) => {
            if (err) throw err
            response.forEach(ee => {
                try {
                    let tmp = ee.NgayXuLy
                    tmp.setDate(tmp.getDate() + 1)
                    ee.NgayXuLy = tmp
                } catch (err) {

                }
            });
            res.json(response)
        })
    },

    danhSachDonHangCongNoNCC: (req, res) => {
        let SDT = req.body.SDT;
        let sql = 'SELECT * FROM donhangnhap where SDT="' + SDT + '"  AND CongNo > 0';
        db.query(sql, async (err, response) => {
            if (err) throw err
            response.forEach(ee => {
                try {
                    let tmp = ee.NgayNhapHang
                    tmp.setDate(tmp.getDate() + 1)
                    ee.NgayNhapHang = tmp
                } catch (err) {

                }
            });
            res.json(response)
        })
    },

    danhSachDonHangNhap: (req, res) => {
        let sql = 'SELECT * FROM donhangnhap ORDER BY Id DESC';
        db.query(sql, async (err, response) => {
            if (err) throw err
            await response.forEach(ee => {
                try {
                    let tmp = ee.NgayNhapHang
                    tmp.setDate(tmp.getDate() + 1)
                    ee.NgayNhapHang = tmp
                } catch (err) {

                }
            });
            res.json(response)
        })
    },

    chiTiet1DonHangNhap: (req, res) => {
        let MaDHN = req.body.MaDHN;
        let sql = 'SELECT * FROM chitietdonhangnhap WHERE MaDHN ="' + MaDHN + '"'
        db.query(sql, async (err, response) => {
            if (err) throw err

            res.json(response)
        })
    },

    danhSachDonHangManv: (req, res) => {
        let Manv = req.body.Manv;
        let sql = 'SELECT * FROM ' + table + ' where MaNguoiBan="' + Manv + '" ORDER BY MaDatHang DESC';
        db.query(sql, async (err, response) => {
            if (err) throw err
            await response.forEach(ee => {
                try {
                    let tmp = ee.NgayXuLy
                    tmp.setDate(tmp.getDate() + 1)
                    ee.NgayXuLy = tmp
                } catch (err) {

                }
            });
            res.json(response)
        })
    },

    chiTiet1DonHang: (req, res) => {
        let sql = 'SELECT * FROM ' + table + ' WHERE MaDatHang = ?'
        db.query(sql, [req.params.MaDatHang], async (err, response) => {
            if (err) throw err
            await response.forEach(ee => {
                try {
                    if (ee.NgayXuLy != null) {
                        let tmp = ee.NgayXuLy
                        tmp.setDate(tmp.getDate() + 1)
                        ee.NgayXuLy = tmp
                    }
                } catch (err) {
                    // console.log(`${new Date().getTime()} DonHangController line 127 lỗi lấy ngày xử lý=`)
                }
            });
            res.json(response[0])
        })
    },

    layTongDH: (req, res) => {
        var sotrang = req.params.sotrang;
        const offset = (sotrang - 1) * 5;
        let sql = 'SELECT * FROM ' + table + ' WHERE MaKhachHang = ? ORDER BY MaDatHang DESC LIMIT 5 OFFSET ' + offset + ''
        db.query(sql, [req.params.MaKhachHang], async (err, response) => {
            if (err) throw err
            await response.forEach(ee => {
                try {
                    let tmp = ee.NgayXuLy
                    tmp.setDate(tmp.getDate() + 1)
                    ee.NgayXuLy = tmp
                } catch (err) {

                }
            });
            res.json(response)
        })
    },

    danhSachDonHangTheoMaNV: (req, res) => {
        let sql = 'SELECT * FROM ' + table + ' WHERE MaKhachHang = ? ORDER BY MaDatHang DESC'
        db.query(sql, [req.params.MaKhachHang], async (err, response) => {
            if (err) throw err
            await response.forEach(ee => {
                try {
                    let tmp = ee.NgayXuLy
                    tmp.setDate(tmp.getDate() + 1)
                    ee.NgayXuLy = tmp
                } catch (err) {

                }
            });
            res.json(response)
        })
    },

    //app
    danhSachDonHangTheoTrangThai: (req, res) => {
        // console.log(new Date().getTime() + " req.params.TrangThai= " + JSON.stringify(req.params.TrangThai))
        const trangThai = req.params.TrangThai
        if (trangThai === `Hủy`) {
            const sql = `SELECT * FROM ${table} WHERE ((TrangThai = 'Đã hủy' And MaKhachHang = ?) or (TrangThai = 'Khách hủy' And MaKhachHang = ?)) ORDER BY MaDatHang DESC`
            db.query(sql, [req.params.MaKhachHang, req.params.MaKhachHang], async (err, response) => {
                if (err) throw err
                await response.forEach(ee => {
                    try {
                        let tmp = ee.NgayXuLy
                        tmp.setDate(tmp.getDate() + 1)
                        ee.NgayXuLy = tmp
                    } catch (err) {

                    }
                });
                res.json(response)
            })
        } else {
            const sql = `SELECT * FROM ${table} WHERE TrangThai = ? And MaKhachHang = ? ORDER BY MaDatHang DESC`
            db.query(sql, [trangThai, req.params.MaKhachHang], async (err, response) => {
                if (err) throw err
                await response.forEach(ee => {
                    try {
                        let tmp = ee.NgayXuLy
                        tmp.setDate(tmp.getDate() + 1)
                        ee.NgayXuLy = tmp
                    } catch (err) {

                    }
                });
                res.json(response)
            })
        }
        // res.json({ abc: "abnc" })
    },

    //app
    //web
    danhSachDonHangTheoTrangThai2: (req, res) => {
        // console.log(new Date().getTime() + " req.params.TrangThai= " + JSON.stringify(req.params.TrangThai))
        var sotrang = req.params.sotrang;
        const offset = (sotrang - 1) * 5;
        const trangThai = req.params.TrangThai
        if (trangThai === `Hủy`) {
            const sql = `SELECT * FROM ${table} WHERE ((TrangThai = 'Đã hủy' And MaKhachHang = ?) or (TrangThai = 'Khách hủy' And MaKhachHang = ?)) ORDER BY MaDatHang DESC`
            db.query(sql, [req.params.MaKhachHang, req.params.MaKhachHang], async (err, response) => {
                if (err) throw err
                await response.forEach(ee => {
                    try {
                        let tmp = ee.NgayXuLy
                        tmp.setDate(tmp.getDate() + 1)
                        ee.NgayXuLy = tmp
                    } catch (err) {

                    }
                });
                res.json(response)
            })
        } else {
            const sql = `SELECT * FROM ${table} WHERE TrangThai = ? And MaKhachHang = ? ORDER BY MaDatHang DESC LIMIT 5 OFFSET ${offset}`
            db.query(sql, [trangThai, req.params.MaKhachHang], async (err, response) => {
                if (err) throw err
                await response.forEach(ee => {
                    try {
                        let tmp = ee.NgayXuLy
                        tmp.setDate(tmp.getDate() + 1)
                        ee.NgayXuLy = tmp
                    } catch (err) {

                    }
                });
                res.json(response)
            })
        }
        // res.json({ abc: "abnc" })
    },

    SuaDonHangTheoMaKhachHang: (req, res) => {
        let MaCu = req.body.MaCu;
        let MaMoi = req.body.MaMoi;
        let sql = "Update '" + table + "' SET MaKhachHang = '" + MaMoi + "' Where MaKhachHang = '" + MaCu + "'"
        db.query(sql, (err, response) => {
            if (err) throw err
            // res.json(response)
        })
    },

    checkTrangThaiDonHang: async (req, res) => {
        const maDatHang = req.params.MaDatHang
        const sql = `select TrangThai, MaNgXuLy from donhang where MaDatHang = ?`
        await db.query(sql, [maDatHang], (err1, res1) => {
            if (err1) {
                throw err1
            }
            res.json(res1[0])
        })
    },

    sua1DonHang: async (req, res) => {
        let data = req.body
        if (data.TrangThai == `Đã xử lý`) {
            data.NgayXuLy = new Date()
        }

        // disable orders complete
        if (data.TrangThai == `Hoàn thành`) {
            data.TrangThai = `Đã xử lý`
        }
        
        const maDatHang = req.params.MaDatHang
        redisClient.del(maDatHang)
        if (data.TrangThai === `Đã xử lý`) {
            const sql = `select TrangThai, MaNgXuLy from donhang where MaDatHang = ?`
            db.query(sql, [maDatHang], async (err1, res1) => {
                if (err1) {
                    throw err1
                }
                if (res1[0].TrangThai === `Đã xử lý`) {
                    res.json({ msg: `Đơn này đã được xử lý bởi người ngày ${res1[0].MaNgXuLy}` })
                } else {
                    const sql2 = `UPDATE ${table} SET ? WHERE MaDatHang = ?`
                    db.query(sql2, [data, maDatHang], async (err2, res2) => {
                        if (err2) throw err2
                        if (res2 != null || res2 != undefined) {
                            setTimeout(async () => {
                                await capNhatDaDatVaConLaiTheoMaDatHang(maDatHang)
                            }, 300);
                            setTimeout(async () => {
                                await capNhatDaDatCuaKhachHangTheoMaDatHang(maDatHang)
                            }, 600);
                            res.json({ msg: data.TrangThai })
                        }
                    })
                }
            })
        } else {
            let sql = ``
            if (data.TrangThai == 'Đã xác nhận') {
                sql = `UPDATE ${table} SET ?, NgayXuLy = null WHERE MaDatHang = ?`
            } else {
                sql = `UPDATE ${table} SET ? WHERE MaDatHang = ?`
            }
            db.query(sql, [data, maDatHang], async (err, response) => {
                if (err) throw err
                if (response != null || response != undefined) {
                    setTimeout(async () => {
                        await capNhatDaDatVaConLaiTheoMaDatHang(maDatHang)
                    }, 300);
                    setTimeout(async () => {
                        await capNhatDaDatCuaKhachHangTheoMaDatHang(maDatHang)
                    }, 600);
                    res.json({ msg: data.TrangThai })
                }
            })
        }
    },

    suaDonHang1Row: async (req, res) => {
        const maDatHang = req.params.MaDatHang;
        const data1 = req.body.data;
        const khachCanTra = req.body.KhachCanTra;
        const sql = `update donhang set ? where MaDatHang = ?;`
        db.query(sql, [data1, maDatHang], (err1, res1) => {
            if (err1) {
                throw err1
            }
            let sql2 = 'update donhang set CongNo = ? where MaDatHang = ?;'
            if (data1.KhachDaTra == 'R') {
                sql2 = `update donhang set CongNo = 0 where MaDatHang = ?;`
                db.query(sql2, [maDatHang])
            } else {
                if (data1.KhachDaTra != undefined) {
                    const khachDaTra = parseFloat(data1.KhachDaTra)
                    const congNo = khachCanTra - khachDaTra
                    db.query(sql2, [congNo, maDatHang])
                } else {
                    // console.log(`${new Date().getTime()} abc=`)
                }

            }
        })
        res.json(`12`)
    },

    suaDonHangNhap1Row: async (req, res) => {
        const maDHN = req.params.MaDHN;
        const data1 = req.body.data;
        const daTra = req.body.DaTra;
        const sql = `update donhangnhap set ? where MaDHN = ?;`
        db.query(sql, [data1, maDHN], (err1, res1) => {
            if (err1) {
                throw err1
            }
            let sql2 = 'update donhangnhap set CongNo = ? where MaDHN = ?;'
            if (data1.TongTien != undefined) {
                if (daTra != 'R') {
                    const congNo = data1.TongTien - daTra
                    db.query(sql2, [congNo, maDHN])
                } else {
                    db.query(sql2, [0, maDHN])
                }
            } else {
                // console.log(`${new Date().getTime()} abc=`)
            }
        })
        res.json(`12`)
    },

    suaDonHangNhap1Row2: async (req, res) => {
        const maDHN = req.params.MaDHN;
        const data1 = req.body.data;
        const tongTien = req.body.TongTien;
        const sql = `update donhangnhap set ? where MaDHN = ?;`
        db.query(sql, [data1, maDHN], (err1, res1) => {
            if (err1) {
                throw err1
            }
            let sql2 = 'update donhangnhap set CongNo = ? where MaDHN = ?;'
            if (data1.DaTra == 'R') {
                sql2 = `update donhangnhap set CongNo = '0' where MaDHN = ?;`
                db.query(sql2, [maDHN])
            } else {
                if (data1.DaTra != undefined) {
                    const daTra = parseFloat(data1.DaTra)
                    const congNo = tongTien - daTra
                    db.query(sql2, [congNo, maDHN])
                } else {
                    // console.log(`${new Date().getTime()} abc=`)
                }
            }
        })
        res.json(`12`)
    },

    // Hiện tại thằng này không dùng, thằng này là nút hủy đơn hàng bên front cho khách. Ông thầy chưa cần chức năng này.
    // donHangKhachHuy: async (req, res) => {
    //     let reTurn = {
    //         code: 0,
    //         msg: `Hủy thành công`
    //     }
    //     const data = req.body
    //     const maDatHang = req.params.MaDatHang
    //     redisClient.del(maDatHang)
    //     db.beginTransaction(async (err1) => {
    //         if (err1) {
    //             throw err1
    //         }
    //         const sql = `select TrangThai from donhang where MaDatHang = ?`
    //         db.query(sql, [maDatHang], async (err19, res19) => {
    //             if (err19) {
    //                 throw err19
    //             }
    //             if (res19.TrangThai == `Đã xác nhận`) {
    //                 reTurn.code = 1
    //                 reTurn.msg = `Đơn đã được xác nhận, không thể hủy đơn.`
    //             } else if (res19.TrangThai == `Đã xử lý`) {
    //                 reTurn.code = 2
    //                 reTurn.msg = `Đơn đã được xử lý, không thể hủy đơn.`
    //             } else {
    //                 const sql = `UPDATE ${table} SET ? WHERE MaDatHang = ?`
    //                 db.query(sql, [data, maDatHang], async (err3, res3) => {
    //                     if (err3) throw err3
    //                     if (res3 != null || res3 != undefined) {
    //                         if (data.TrangThai == "Đã xác nhận" || data.TrangThai == "Chưa xác nhận") {
    //                             // await capNhatDaDatCuaKhachHang()
    //                         }
    //                         if (data.TrangThai == `Đã xử lý` || data.TrangThai == "Khách hủy" || data.TrangThai == "Đã hủy") {
    //                             // await capNhatDaDatVaConLaiTheoMaDatHang(maDatHang)
    //                         }
    //                     }
    //                     db.commit((err4) => {
    //                         if (err4) {
    //                             throw err4
    //                         }
    //                         // success
    //                     })
    //                 })
    //             }
    //         })
    //     })
    //     res.json(reTurn)
    // },

    xoa1DonHang: (req, res) => {
        let sql2 = 'DELETE FROM ' + table2 + ' WHERE MaDatHang = ?'
        db.query(sql2, [req.params.MaDatHang], (err, response) => {
            if (err) throw err
            res.json({ message: 'Delete success!' })
        })
        let sql = 'DELETE FROM ' + table + ' WHERE MaDatHang = ?'
        db.query(sql, [req.params.MaDatHang], (err, response) => {
            if (err) throw err
            res.json({ message: 'Delete success!' })
        })
    },

    xoa1DonHangNhap: (req, res) => {
        let maDHN = req.body.maDHN

        let sql2 = "DELETE FROM donhangnhap WHERE MaDHN ='" + maDHN + "'"
        db.query(sql2, (err, response) => {
            if (err) throw err
            res.json({ message: 'Delete success!' })
        })

    },

    donHangYears: (req, res) => {
        let year = req.body.year;
        let sqly = 'select * from ' + table + ' where YEAR(NgayDatHang)=' + year + ' ORDER BY MaDatHang DESC'
        db.query(sqly, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },

    donHangMonths: (req, res) => {
        let month = req.body.month;
        let sqly = 'select * from ' + table + ' where MONTH(NgayDatHang)=' + month + ' ORDER BY MaDatHang DESC'
        db.query(sqly, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },

    donHangXuLyTheoNhanVien: (req, res) => {
        const searchTime = req.body.times;
        if (searchTime != "") {
            switch (searchTime.type) {
                case 1:
                    {
                        const sqly1 = 'select donhang.NgayDatHang, donhang.NgayXuLy, donhang.MaNguoiBan, donhang.MaNgXuLy, donhang.MaDatHang, donhang.TrangThai, KhachHang, MaHang, SoLuong, DonGia, ThanhTien from donhang, chitietdonhang where donhang.MaDatHang = chitietdonhang.MaDatHang and NgayDatHang >= ? and NgayDatHang <= ? ORDER BY NgayDatHang DESC;'
                        db.query(sqly1, [searchTime.time, searchTime.time2], (err, result) => {
                            if (err) throw err
                            res.json(result)
                        })
                        break
                    }
            }
        }
    },

    hoanThanhDonHangTuFontEnd: async (req, res) => {
        const sql = `update donhang set TrangThai = 'Hoàn thành' where TrangThai = 'Đã xử lý'`
        db.query(sql, async (err2, res2) => {
            if (err2) {
                throw err1
            }
            res.json({ msg: `Đang xử lý` })
        })
    },

    layDSMaDatHangDaXuLy: async (req, res) => {
        const sql = `select MaDatHang from donhang where TrangThai = 'Đã xử lý'`
        db.query(sql, (err1, res1) => {
            if (err1) {
                throw err1
            }
            res.json(res1)
        })
    },

    getArrOrderCodeProcessed: async (req, res) => {
        const sql = `select MaDatHang from donhang where TrangThai = 'Đã xử lý'`
        db.query(sql, (err1, res1) => {
            if (err1) {
                throw err1
            }
            res.json(res1)
        })
    }

}

// func này cập nhật cột KhachDat trong bảng sản phẩm của 1 đơn hàng.
const capNhatDaDatCuaKhachHangTheoMaDatHang = async (maDatHang) => {
    // console.log(new Date().getTime() + " BATDAUcapNhatSoLuongKhachDatTuFrontEnd= ")
    db.beginTransaction(async (err1) => {
        if (err1) {
            throw err1;
        }
        const sql1 = `select distinct MaHang from chitietdonhang, donhang where (donhang.MaDatHang = chitietdonhang.MaDatHang and donhang.MaDatHang = ?) order by chitietdonhang.MaHang;`
        db.query(sql1, [maDatHang], async (err2, res2) => {
            if (err2) {
                return db.rollback(() => {
                    throw err2
                })
            }
            //---- code tối ưu lại
            const lsMaHang = res2.map(o => o.MaHang)
            let aa1 = `SELECT MaHang, SoLuong,donhang.MaDatHang FROM donhang, chitietdonhang where ((donhang.MaDatHang = chitietdonhang.MaDatHang and donhang.TrangThai = 'Chưa xác nhận') or (donhang.MaDatHang = chitietdonhang.MaDatHang and donhang.TrangThai = 'Đã xác nhận')) and MaHang in(`
            if (lsMaHang.length > 0) {
                for (let i = 0; i < lsMaHang.length; i++) {
                    const ee1 = lsMaHang[i];
                    if (i == lsMaHang.length - 1) {
                        aa1 += "'" + ee1 + "'"
                    } else {
                        aa1 += "'" + ee1 + "',"
                    }
                }
            } else {
                aa1 += "''"
            }
            aa1 += `) order by chitietdonhang.MaHang;`
            const sql2 = aa1
            //----
            db.query(sql2, async (err3, res3) => {
                if (err3) {
                    return db.rollback(() => {
                        throw err3
                    })
                }

                db.commit((err5) => {
                    if (err5) {
                        return db.rollback(() => {
                            throw err5
                        })
                    }
                    res2.forEach(async ee2 => {
                        let khachDat = 0
                        res3.forEach(ee3 => {
                            if (ee2.MaHang == ee3.MaHang) {
                                khachDat += ee3.SoLuong
                            }
                        })
                        const sql3 = `update sanpham set KhachDat = ? where MaHang = ?;`
                        db.query(sql3, [khachDat, ee2.MaHang], async (err4, res4) => {
                            if (err4) {
                                return db.rollback(() => {
                                    throw err4
                                })
                            }
                        })
                    })
                    updateTheNumberOfComboProductsTheCustomerHasOrdered(maDatHang)
                    // console.log(new Date().getTime() + " KETTHUCcapNhatSoLuongKhachDatTuFrontEnd= " + JSON.stringify(ee2.MaHang))
                })
                // res.json({ msg: `Đang cập nhật! Quá trình cập nhật khoảng 8 giây, vui lòng đợi, không thao tác gì trong lúc đợi để tránh lỗi phát sinh của hệ thống.` })
            })
        })
    })
}

const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
}


// func này cập nhật cột KhachDat trong bảng sản phẩm của 1 đơn hàng có combo.
const updateTheNumberOfComboProductsTheCustomerHasOrdered = async (codeOrders) => {
    db.beginTransaction(async (err0) => {
        if (err0) {
            throw err0;
        }
        const sql1 = `select MaHang, SoLuong from chitietdonhang, donhang where donhang.TrangThai = 'Đã xác nhận' and chitietdonhang.MaDatHang = donhang.MaDatHang and donhang.MaDatHang = ? AND MaHang LIKE 'COMBO_%';`
        db.query(sql1, [codeOrders], (err1, res1) => {
            if (err1) {
                db.rollback(() => {
                    throw err1
                })
            }
            if (res1 != undefined) {
                if (res1.length > 0) {
                    let sql2 = `select IdCombo, MaHang, SoLuong from combo_detail where IdCombo in(`
                    for (let i = 0; i < res1.length; i++) {
                        const ee1 = res1[i].MaHang;
                        if (i == res1.length - 1) {
                            sql2 += "'" + ee1 + "'"
                        } else {
                            sql2 += "'" + ee1 + "',"
                        }
                    }
                    sql2 += `);`
                    db.query(sql2, (err2, res2) => {
                        if (err2) {
                            db.rollback(() => {
                                throw err2
                            })
                        }
                        if (res2 != undefined) {
                            if (res2.length > 0) {
                                // res2
                                res1.forEach(ee1 => {
                                    res2.forEach(ee2 => {
                                        if (ee1.MaHang == ee2.IdCombo) {
                                            ee2.SoLuong = ee2.SoLuong * ee1.SoLuong
                                        }
                                    });
                                });
                                let onlyMaHang = []
                                res2.forEach(ee1 => {
                                    let maHang = ''
                                    maHang = ee1.MaHang
                                    onlyMaHang.push(maHang)
                                });
                                const uniqueMaHang = onlyMaHang.filter(onlyUnique)
                                let arrMHSL = []
                                uniqueMaHang.forEach(ee1 => {
                                    let item = {}
                                    item.MaHang = ee1
                                    item.SoLuong = 0
                                    arrMHSL.push(item)
                                });
                                arrMHSL.forEach(ee1 => {
                                    res2.forEach(ee2 => {
                                        if (ee1.MaHang == ee2.MaHang) {
                                            ee1.SoLuong += ee2.SoLuong
                                        }
                                    });
                                });
                                // console.log(`${new Date().getTime()} arrMHSL=`, arrMHSL)
                                let sql3 = `select MaHang, KhachDat from sanpham where MaHang in(`
                                for (let i = 0; i < arrMHSL.length; i++) {
                                    const ee1 = arrMHSL[i].MaHang;
                                    if (i == arrMHSL.length - 1) {
                                        sql3 += "'" + ee1 + "'"
                                    } else {
                                        sql3 += "'" + ee1 + "',"
                                    }
                                }
                                sql3 += `);`
                                db.query(sql3, (err3, res3) => {
                                    if (err3) {
                                        db.rollback(() => {
                                            throw err3
                                        })
                                    }
                                    if (res3 != undefined) {
                                        if (res3.length > 0) {
                                            db.commit((err99) => {
                                                if (err99) {
                                                    db.rollback(() => {
                                                        throw err99
                                                    })
                                                }
                                                res3.forEach(ee1 => {
                                                    arrMHSL.forEach(ee2 => {
                                                        if (ee1.MaHang == ee2.MaHang) {
                                                            ee1.KhachDat += ee2.SoLuong
                                                        }
                                                    });
                                                    // console.log(`${new Date().getTime()} ee1=`, ee1)
                                                    const sql4 = `update sanpham set KhachDat = ? where MaHang = ?`
                                                    db.query(sql4, [ee1.KhachDat, ee1.MaHang], (err4, res4) => {
                                                        if (err4) {
                                                            db.rollback(() => {
                                                                throw err4
                                                            })
                                                        }
                                                    })
                                                });
                                            })
                                        }
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })
    })
}

// func này là cập nhật cột DaDat (đã xử lý) và cột ConLai (tồn cuối) trong bảng sản phẩm của 1 đơn hàng.
const capNhatDaDatVaConLaiTheoMaDatHang = async (maDatHang) => {
    db.beginTransaction((err) => {
        if (err) { throw err; }
        const sql = `Select sanpham.MaHang, sanpham.TonKho from sanpham, donhang, chitietdonhang where sanpham.MaHang = chitietdonhang.MaHang and donhang.MaDatHang = chitietdonhang.MaDatHang and donhang.MaDatHang = ? order by sanpham.MaHang;`
        db.query(sql, [maDatHang], async (err2, res2) => {
            if (err2) {
                return db.rollback(() => {
                    throw err2;
                });
            }
            if (res2.length > 0) {
                //---- code tối ưu lại
                const lsMaHang = res2.map(o => o.MaHang)
                let aa1 = `SELECT MaHang, SoLuong FROM donhang, chitietdonhang where (donhang.MaDatHang = chitietdonhang.MaDatHang and donhang.TrangThai = 'Đã xử lý') and MaHang in(`
                for (let i = 0; i < lsMaHang.length; i++) {
                    const ee1 = lsMaHang[i];
                    if (i == lsMaHang.length - 1) {
                        aa1 += "'" + ee1 + "'"
                    } else {
                        aa1 += "'" + ee1 + "',"
                    }
                }
                aa1 += `) order by chitietdonhang.MaHang;`
                const sql2 = aa1
                //----
                db.query(sql2, async (err3, res3) => {
                    if (err3) {
                        return db.rollback(() => {
                            throw err3;
                        });
                    }
                    // console.log(`${new Date().getTime()} res3=`, res3)

                    db.commit((err5) => {
                        if (err5) {
                            return db.rollback(() => {
                                throw err5;
                            });
                        }
                        res2.forEach(async ee1 => {
                            const maHang = ee1.MaHang
                            const tonKho = ee1.TonKho
                            let daDat = 0
                            res3.forEach(ee2 => {
                                if (maHang === ee2.MaHang) {
                                    daDat += ee2.SoLuong
                                }
                            });
                            let conLai = tonKho - daDat
                            if (conLai < 0) {
                                conLai = 0
                            }
                            const sql3 = "update sanpham set DaDat = ?, ConLai = ? where MaHang = ?"
                            db.query(sql3, [daDat, conLai, maHang], async (err4, res4) => {
                                if (err4) {
                                    // return db.rollback(() => {
                                    throw err4;
                                    // });
                                }
                                // console.log(new Date().getTime() + " KETTHUCcapNhatDaDatVaConLai= " + JSON.stringify(maHang))
                            })
                        });
                        updateClosedQuantityAndStockLeftOverForComBoWithCodeOrders(maDatHang)
                    })
                })
            }
        });
    })
}

// func này là cập nhật cột DaDat (đã xử lý) và cột ConLai (tồn cuối) trong bảng sản phẩm của 1 đơn hàng có combo.
const updateClosedQuantityAndStockLeftOverForComBoWithCodeOrders = async (codeOrders) => {
    // console.log(`${new Date().getTime()} codeOrders=`, codeOrders)
    db.beginTransaction((err) => {
        if (err) { throw err; }
        // DH003986
        const sql1 = `select MaHang, SoLuong from chitietdonhang, donhang where donhang.TrangThai = 'Đã xử lý' and chitietdonhang.MaDatHang = donhang.MaDatHang and donhang.MaDatHang = ? AND MaHang LIKE 'COMBO_%';`
        db.query(sql1, [codeOrders], (err1, res1) => {
            if (err1) {
                db.rollback(() => {
                    throw err1
                })
            }
            if (res1 != undefined) {
                if (res1.length > 0) {
                    let sql2 = `select IdCombo, MaHang, SoLuong from combo_detail where IdCombo in(`
                    for (let i = 0; i < res1.length; i++) {
                        const ee1 = res1[i].MaHang;
                        if (i == res1.length - 1) {
                            sql2 += "'" + ee1 + "'"
                        } else {
                            sql2 += "'" + ee1 + "',"
                        }
                    }
                    sql2 += `);`
                    db.query(sql2, (err2, res2) => {
                        if (err2) {
                            db.rollback(() => {
                                throw err2
                            })
                        }
                        if (res2 != undefined) {
                            if (res2.length > 0) {
                                // console.log(`${new Date().getTime()} res2 01=`, res2)
                                res1.forEach(ee1 => {
                                    res2.forEach(ee2 => {
                                        if (ee1.MaHang == ee2.IdCombo) {
                                            ee2.SoLuong = ee2.SoLuong * ee1.SoLuong
                                        }
                                    });
                                });
                                // res2
                                // console.log(`${new Date().getTime()} res2 02=`, res2)
                                let sql3 = `select MaHang, TonKho, DaDat, ConLai from sanpham where MaHang in(`
                                for (let i = 0; i < res2.length; i++) {
                                    const ee1 = res2[i].MaHang;
                                    if (i == res2.length - 1) {
                                        sql3 += "'" + ee1 + "'"
                                    } else {
                                        sql3 += "'" + ee1 + "',"
                                    }
                                }
                                sql3 += `);`
                                db.query(sql3, (err3, res3) => {
                                    if (err3) {
                                        db.rollback(() => {
                                            throw err3
                                        })
                                    }
                                    // res3
                                    // console.log(`${new Date().getTime()} res3=`, res3)
                                    if (res3 != undefined) {
                                        if (res3.length > 0) {
                                            res3.forEach(async ee1 => {
                                                const maHang = ee1.MaHang
                                                const tonKho = ee1.TonKho
                                                let daDat = ee1.DaDat
                                                res2.forEach(ee2 => {
                                                    if (maHang === ee2.MaHang) {
                                                        // console.log(`${new Date().getTime()} ee2.MaHang=`, ee2.MaHang)
                                                        daDat += ee2.SoLuong
                                                    }
                                                });
                                                let conLai = tonKho - daDat
                                                if (conLai < 0) {
                                                    conLai = 0
                                                }
                                                const sql4 = "update sanpham set DaDat = ?, ConLai = ? where MaHang = ?"
                                                // console.log(`${new Date().getTime()} maHang=`, maHang)
                                                // console.log(`${new Date().getTime()} tonKho=`, tonKho)
                                                // console.log(`${new Date().getTime()} daDat=`, daDat)
                                                // console.log(`${new Date().getTime()} conLai=`, conLai)
                                                db.query(sql4, [daDat, conLai, maHang], async (err4, res4) => {
                                                    if (err4) {
                                                        // return db.rollback(() => {
                                                        throw err4;
                                                        // });
                                                    }
                                                    // console.log(new Date().getTime() + " KETTHUCcapNhatDaDatVaConLai= " + JSON.stringify(maHang))
                                                })
                                            });
                                            redisClient.del('Sanpham')
                                        }
                                    }
                                })
                            }
                        }
                    })
                }
            }

        })
        redisClient.del('Sanpham')
    })
}
