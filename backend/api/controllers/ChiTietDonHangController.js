'use strict'
const db = require('../db')
const dotenv = require('dotenv');
const redis = require("redis")
const PORT_REDIS = process.env.PORT || 6379
const redisClient = redis.createClient(PORT_REDIS)
dotenv.config();

const table = 'chitietdonhang'

module.exports = {

    // funcExampleTransaction: async (req, res, next) => {
    //     db.beginTransaction(async (err) => {
    //         if (err) { throw err; }
    //         const sql = 'SELECT TonKho FROM sanpham;'
    //         db.query(sql, async (err2, response) => {
    //             if (err2) {
    //                 return db.rollback(() => {
    //                     throw err2;
    //                 });
    //             }
    //             const sql2 = "SELECT MaHang, SoLuong FROM donhang,chitietdonhang;"
    //             db.query(sql2, async (err3, data) => {
    //                 if (err3) {
    //                     return db.rollback(() => {
    //                         throw err3;
    //                     });
    //                 }
    //                 if (data != null || data != undefined) {
    //                     const sql3 = "update sanpham set DaDat = 12, ConLai = 12 where MaHang = 'an123';"
    //                     db.query(sql3, async (err4, data2) => {
    //                         if (err4) {
    //                             return db.rollback(() => {
    //                                 throw err4;
    //                             });
    //                         }
    //                         db.commit((err5) => {
    //                             if (err5) {
    //                                 return db.rollback(() => {
    //                                     throw err5;
    //                                 });
    //                             }
    //                             // success
    //                         });
    //                     })
    //                 }
    //             })
    //         })
    //     })
    // },

    themCTDH: async (req, res) => {
        const data = req.body.ctdh
        const listCombo = data.filter(o => o.MaHang.indexOf('COMBO_') >= 0)
        if (data.length > 0) {
            const maDatHang = data[0].MaDatHang
            const dsMaHang = data.map(o => o.MaHang)
            const lsMaHang = dsMaHang
            if (lsMaHang.length > 0) {
                let aa1 = `select MaHang, TenHang, DVT, GiaBan, TonKho, DaDat, ConLai, DangKD, PhanTramKM, NhanhHang from sanpham where MaHang in(`
                for (let i = 0; i < lsMaHang.length; i++) {
                    const ee1 = lsMaHang[i];
                    if (i == lsMaHang.length - 1) {
                        aa1 += "'" + ee1 + "'"
                    } else {
                        aa1 += "'" + ee1 + "',"
                    }
                }
                aa1 += `);`
                db.query(aa1, async (err, res2) => {
                    if (err) {
                        throw err
                    }
                    if (res2.length > 0) {
                        let dsctdh = []
                        res2.forEach(e => {
                            data.forEach(ee2 => {
                                if (e.MaHang === ee2.MaHang) {
                                    let item = {}
                                    item.MaDatHang = maDatHang
                                    item.MaHang = e.MaHang
                                    item.TenHang = e.TenHang
                                    item.DVT = e.DVT
                                    item.SoLuong = ee2.SoLuong
                                    item.DonGia = e.GiaBan
                                    item.ChietKhau = e.PhanTramKM
                                    item.ThanhTien = ee2.SoLuong * (e.GiaBan - (e.GiaBan * (e.PhanTramKM / 100)))
                                    item.NhanhHang = e.NhanhHang
                                    dsctdh.push(item)
                                }
                            });
                        })
                        if (dsctdh.length > 0) {
                            const dsMaCombo = listCombo.map(o => o.MaHang)
                            if (dsMaCombo.length > 0) {
                                let aa2 = `select * from combo where IdCombo in(`
                                for (let i = 0; i < dsMaCombo.length; i++) {
                                    const ee1 = dsMaCombo[i];
                                    if (i == dsMaCombo.length - 1) {
                                        aa2 += "'" + ee1 + "'"
                                    } else {
                                        aa2 += "'" + ee1 + "',"
                                    }
                                }
                                aa2 += `);`
                                db.query(aa2, async (err3, res3) => {
                                    if (err3) {
                                        throw err3
                                    }
                                    if (res3.length > 0) {
                                        res3.forEach(ee1 => {
                                            listCombo.forEach(ee2 => {
                                                if (ee1.IdCombo == ee2.MaHang) {
                                                    let item = {}
                                                    item.MaDatHang = maDatHang
                                                    item.MaHang = ee1.IdCombo
                                                    item.TenHang = ee1.ComboName
                                                    item.DVT = ee1.IdCombo
                                                    item.SoLuong = ee2.SoLuong
                                                    item.DonGia = ee1.TotalPrice
                                                    item.ChietKhau = 0
                                                    item.ThanhTien = ee2.SoLuong * ee1.TotalPrice
                                                    item.NhanhHang = ee1.GiftBundle
                                                    dsctdh.push(item)
                                                }
                                            });
                                        });
                                        dsctdh.forEach(async e => {
                                            let sql = 'INSERT INTO ' + table + ' SET ?'
                                            db.query(sql, [e], (err, response) => {
                                                if (err) throw err
                                            })
                                        });
                                        setTimeout(() => {
                                            capNhatDaDatCuaKhachHangTheoMaDatHang(data[0].MaDatHang)
                                        }, 400);
                                        redisClient.del('Sanpham')
                                    }
                                })
                            } else {
                                dsctdh.forEach(async e => {
                                    let sql = 'INSERT INTO ' + table + ' SET ?'
                                    db.query(sql, [e], (err, response) => {
                                        if (err) throw err
                                    })
                                });
                                setTimeout(() => {
                                    capNhatDaDatCuaKhachHangTheoMaDatHang(data[0].MaDatHang)
                                }, 400);
                                redisClient.del('Sanpham')
                            }
                        }
                    } else {
                        if (listCombo.length > 0) {
                            let dsctdh = []
                            const dsMaCombo = listCombo.map(o => o.MaHang)
                            if (dsMaCombo.length > 0) {
                                let aa2 = `select * from combo where IdCombo in(`
                                for (let i = 0; i < dsMaCombo.length; i++) {
                                    const ee1 = dsMaCombo[i];
                                    if (i == dsMaCombo.length - 1) {
                                        aa2 += "'" + ee1 + "'"
                                    } else {
                                        aa2 += "'" + ee1 + "',"
                                    }
                                }
                                aa2 += `);`
                                db.query(aa2, async (err3, res3) => {
                                    if (err3) {
                                        throw err3
                                    }
                                    if (res3.length > 0) {
                                        res3.forEach(ee1 => {
                                            listCombo.forEach(ee2 => {
                                                if (ee1.IdCombo == ee2.MaHang) {
                                                    let item = {}
                                                    item.MaDatHang = maDatHang
                                                    item.MaHang = ee1.IdCombo
                                                    item.TenHang = ee1.ComboName
                                                    item.DVT = ee1.IdCombo
                                                    item.SoLuong = ee2.SoLuong
                                                    item.DonGia = ee1.TotalPrice
                                                    item.ChietKhau = 0
                                                    item.ThanhTien = ee2.SoLuong * ee1.TotalPrice
                                                    item.NhanhHang = ee1.GiftBundle
                                                    dsctdh.push(item)
                                                }
                                            });
                                        });
                                        dsctdh.forEach(async e => {
                                            let sql = 'INSERT INTO ' + table + ' SET ?'
                                            db.query(sql, [e], (err, response) => {
                                                if (err) throw err
                                            })
                                        });
                                        setTimeout(() => {
                                            capNhatDaDatCuaKhachHangTheoMaDatHang(data[0].MaDatHang)
                                        }, 400);
                                        redisClient.del('Sanpham')
                                    }
                                })
                            } else {
                                dsctdh.forEach(async e => {
                                    let sql = 'INSERT INTO ' + table + ' SET ?'
                                    db.query(sql, [e], (err, response) => {
                                        if (err) throw err
                                    })
                                });
                                setTimeout(() => {
                                    capNhatDaDatCuaKhachHangTheoMaDatHang(data[0].MaDatHang)
                                }, 400);
                                redisClient.del('Sanpham')
                            }
                        } else {

                            console.log(`${new Date().getTime()} err ChiTietDonHangController line 123 res2.length <= 0`)
                        }
                    }
                })
            }
            res.json({ msg: 'OK' })
        } else {
            res.json({ msg: 'NOTOK' })
        }
    },

    danhSachTatCaChiTietDonHang: (req, res) => {
        let sql = 'SELECT * FROM ' + table + '  order by TenHang;'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },

    danhSachChiTietDonHangCua1DonHang: (req, res) => {
        let sql = 'SELECT * FROM ' + table + ' WHERE MaDatHang = ? order by TenHang;'
        db.query(sql, [req.params.MaDatHang], (err, result) => {
            if (err) throw err
            let magSP = []
            if (result.length > 0) {
                result.forEach(async ee => {
                    let abc = { ...ee, ...{ DaDat: 0, ConLai: 0 } }
                    magSP.push(abc)
                });

            }
            res.json(magSP)
        })
    },

    sua1ChiTietDonHang: (req, res) => {
        let data = req.body;
        let MaDatHang = req.params.MaDatHang;
        let sql1 = 'DELETE FROM ' + table + ' WHERE MaDatHang = ?'
        db.query(sql1, [MaDatHang], (err, response) => {
            if (err) throw err
            res.json({ msg: 'Thành công!' })
        })

        let sql2 = 'INSERT INTO ' + table + ' SET ?'
        db.query(sql2, [data], (err, response) => {
            if (err) throw err
            res.json({ msg: 'Thành công!' })
        })
    },

    suaNhieuSanPhamCua1DonHang: async (req, res) => {
        const data = req.body.ChiTietDonHang;
        const MaDatHang = req.params.MaDatHang;
        let sql1 = 'DELETE FROM ' + table + ' WHERE MaDatHang = ?'
        db.query(sql1, [MaDatHang], async (err, response) => {
            if (err) throw err
            if (data.length > 0) {
                data.forEach(async e => {
                    let sql2 = 'INSERT INTO ' + table + ' SET ?'
                    db.query(sql2, [e], (err, response) => {
                        if (err) throw err
                    })
                });
            }
            // capNhatDaDatVaConLai()
            redisClient.del('Sanpham')
            res.json({ msg: 'Thành công!' })
        })
    },

    xoa1ChiTietDonHang: async (req, res) => {
        // khi xóa 1 đơn hàng, việc đầu là xóa cái chi tiết đơn hàng cùng mã đơn muốn xóa, xóa xong thì mới xóa cái đơn hàng
        let sql2 = 'DELETE FROM ' + table2 + ' WHERE KhoaChinh = ?'
        db.query(sql2, [req.params.KhoaChinh], (err, response) => {
            if (err) throw err
        })

        let sql = 'DELETE FROM ' + table + ' WHERE KhoaChinh = ?'
        db.query(sql, [req.params.KhoaChinh], (err, response) => {
            if (err) throw err
            res.json({ msg: 'Thành công!' })
        })
    },

    tongSoLuong1SanPhamDaDat: async (req, res) => {
        const maHang = req.params.MaHang
        const sql = "SELECT MaHang, SoLuong FROM donhang,chitietdonhang where ((donhang.MaDatHang = chitietdonhang.MaDatHang and MaHang = ? and TrangThai = 'Đã xác nhận') or (donhang.MaDatHang = chitietdonhang.MaDatHang and MaHang = ? and TrangThai = 'Đã xử lý'));"
        // const sql = "SELECT MaHang, SoLuong FROM donhang,chitietdonhang where ((donhang.MaDatHang = chitietdonhang.MaDatHang and MaHang = ? and TrangThai = 'Chưa xác nhận') or (donhang.MaDatHang = chitietdonhang.MaDatHang and MaHang = ? and TrangThai = 'Đã xác nhận'));"
        db.query(sql, [maHang, maHang], async (err, response) => {
            // await db.query(sql, [maHang, maHang], async (err, response) => {
            if (err) {
                throw err
            }
            if (response != null || response != undefined) {
                res.json(response)
            }
        })
    },

    capNhatSoLuongKhachDatTuFrontEnd: async (req, res) => {
        await capNhatDaDatCuaKhachHang()
        res.json({ msg: `Đang cập nhật! Quá trình cập nhật khoảng 8 giây, vui lòng đợi, không thao tác gì trong lúc đợi để tránh lỗi phát sinh của hệ thống.` })
        // console.log(new Date().getTime() + " BATDAUcapNhatSoLuongKhachDatTuFrontEnd= ")
        // await db.beginTransaction(async (err1) => {
        //     if (err1) {
        //         throw err1;
        //     }
        //     const sql1 = `select distinct MaHang from chitietdonhang, donhang where ((donhang.MaDatHang = chitietdonhang.MaDatHang and donhang.TrangThai = 'Chưa xác nhận') or (donhang.MaDatHang = chitietdonhang.MaDatHang and donhang.TrangThai = 'Đã xác nhận')) order by chitietdonhang.MaHang;`
        //     await db.query(sql1, async (err2, res2) => {
        //         if (err2) {
        //             return db.rollback(() => {
        //                 throw err2
        //             })
        //         }
        //         // console.log(new Date().getTime() + " res2= " + JSON.stringify(res2))
        //         const sql2 = `SELECT MaHang, SoLuong FROM donhang, chitietdonhang where ((donhang.MaDatHang = chitietdonhang.MaDatHang and donhang.TrangThai = 'Chưa xác nhận') or (donhang.MaDatHang = chitietdonhang.MaDatHang and donhang.TrangThai = 'Đã xác nhận')) order by chitietdonhang.MaHang;`
        //         await db.query(sql2, async (err3, res3) => {
        //             if (err3) {
        //                 return db.rollback(() => {
        //                     throw err3
        //                 })
        //             }
        //             res2.forEach(async ee2 => {
        //                 let khachDat = 0
        //                 res3.forEach(ee3 => {
        //                     if (ee2.MaHang == ee3.MaHang) {
        //                         khachDat += ee3.SoLuong
        //                     }
        //                 })
        //                 const sql3 = `update sanpham set KhachDat = ? where MaHang = ?;`
        //                 await db.query(sql3, [khachDat, ee2.MaHang], async (err4, res4) => {
        //                     if (err4) {
        //                         return db.rollback(() => {
        //                             throw err4
        //                         })
        //                     }
        //                     await db.commit((err5) => {
        //                         if (err5) {
        //                             return db.rollback(() => {
        //                                 throw err5
        //                             })
        //                         }
        //                         console.log(new Date().getTime() + " KETTHUCcapNhatSoLuongKhachDatTuFrontEnd= " + JSON.stringify(ee2.MaHang))
        //                     })
        //                 })
        //             })
        //             res.json({ msg: `Đang cập nhật! Quá trình cập nhật khoảng 8 giây, vui lòng đợi, không thao tác gì trong lúc đợi để tránh lỗi phát sinh của hệ thống.` })
        //         })
        //     })
        // })
    },

    layMaHangVaSoLuongTrongCTDH: async (req, res) => {
        // console.log(`Running`);
        const lsMaHang = req.body.lsMaHang
        if (lsMaHang.length > 0) {
            let aa1 = `select MaHang, SoLuong  from chitietdonhang where MaDatHang in(`
            for (let i = 0; i < lsMaHang.length; i++) {
                const ee1 = lsMaHang[i];
                if (i == lsMaHang.length - 1) {
                    aa1 += "'" + ee1 + "'"
                } else {
                    aa1 += "'" + ee1 + "',"
                }
            }
            aa1 += `);`
            db.query(aa1, (err1, res1) => {
                if (err1) {
                    throw err1
                }
                if (res1 != undefined) {
                    if (res1.length > 0) {
                        res.json(res1)
                    }
                } else {
                    res.json([])
                }
            })
        }
    },

    // layMaHangDistinctTrongCTDH: async (req, res) => {
    //     // console.log(`Running`);
    //     const lsMaHang = req.body.lsMaHang
    //     if (lsMaHang.length > 0) {
    //         let aa1 = `select Distinct MaHang from chitietdonhang where MaDatHang in(`
    //         for (let i = 0; i < lsMaHang.length; i++) {
    //             const ee1 = lsMaHang[i];
    //             if (i == lsMaHang.length - 1) {
    //                 aa1 += "'" + ee1 + "'"
    //             } else {
    //                 aa1 += "'" + ee1 + "',"
    //             }
    //         }
    //         aa1 += `);`
    //         // console.log(`${new Date().getTime()} aa1=`, aa1)
    //         db.query(aa1, (err1, res1) => {
    //             if (err1) {
    //                 throw err1
    //             }
    //             res.json(res1)
    //         })
    //     }
    // },

    getIdComboDistinctFromArrProductCode: async (req, res) => {
        const arrCodeOrders = req.body.arrCodeOrders;
        let sql1 = `select distinct MaHang from chitietdonhang where MaHang LIKE 'COMBO_%' and MaDatHang in(`
        for (let i = 0; i < arrCodeOrders.length; i++) {
            const ee1 = arrCodeOrders[i];
            if (i == arrCodeOrders.length - 1) {
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
            if (res1 != undefined) {
                if (res1.length > 0) {
                    res.json(res1)
                } else {
                    res.json([])
                }
            }
        })
    },

    getIdComboAndQuantityFromArrProductCode: async (req, res) => {
        const arrCodeOrders = req.body.arrCodeOrders;
        let sql1 = `select MaHang, SoLuong from chitietdonhang where MaHang LIKE 'COMBO_%' and MaDatHang in(`
        for (let i = 0; i < arrCodeOrders.length; i++) {
            const ee1 = arrCodeOrders[i];
            if (i == arrCodeOrders.length - 1) {
                sql1 += "'" + ee1 + "'"
            } else {
                sql1 += "'" + ee1 + "',"
            }
        }
        sql1 += `) order by MaHang;`
        db.query(sql1, (err1, res1) => {
            if (err1) {
                throw err1
            }
            if (res1 != undefined) {
                if (res1.length > 0) {
                    res.json(res1)
                } else {
                    res.json([])
                }
            }
        })
    },


    getAllProductCodeAndQuantityOfOrderDetail: async (req, res) => {
        const arrStrOrderCode = req.body.arrStrOrderCode;
        let sql1 = `select MaHang, SoLuong from chitietdonhang where MaDatHang in(`
        for (let i = 0; i < arrStrOrderCode.length; i++) {
            const ee1 = arrStrOrderCode[i];
            if (i == arrStrOrderCode.length - 1) {
                sql1 += "'" + ee1 + "'"
            } else {
                sql1 += "'" + ee1 + "',"
            }
        }
        sql1 += `) order by MaHang;`
        db.query(sql1, (err1, res1) => {
            if (err1) {
                throw err1
            }
            res.json(res1)
        })
    }

}

const capNhatDaDatCuaKhachHangTheoMaDatHang = async (maDatHang) => {
    // console.log(new Date().getTime() + " BATDAUcapNhatSoLuongKhachDatTuFrontEnd= ")
    db.beginTransaction(async (err1) => {
        if (err1) {
            throw err1;
        }
        const sql1 = `select distinct MaHang from chitietdonhang, donhang where (donhang.MaDatHang = chitietdonhang.MaDatHang and donhang.MaDatHang = ?) order by chitietdonhang.MaHang;`
        db.query(sql1, [maDatHang], async (err2, res2) => {
            // db.query(sql1, [maDatHang, maDatHang], async (err2, res2) => {
            if (err2) {
                return db.rollback(() => {
                    throw err2
                })
            }
            //---- code tối ưu lại
            const lsMaHang = res2.map(o => o.MaHang)
            let sql2 = `SELECT MaHang, SoLuong,donhang.MaDatHang FROM donhang, chitietdonhang where ((donhang.MaDatHang = chitietdonhang.MaDatHang and donhang.TrangThai = 'Chưa xác nhận') or (donhang.MaDatHang = chitietdonhang.MaDatHang and donhang.TrangThai = 'Đã xác nhận')) and MaHang in(`
            for (let i = 0; i < lsMaHang.length; i++) {
                const ee1 = lsMaHang[i];
                if (i == lsMaHang.length - 1) {
                    sql2 += "'" + ee1 + "'"
                } else {
                    sql2 += "'" + ee1 + "',"
                }
            }
            sql2 += `) order by chitietdonhang.MaHang;`
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
                    // console.log(new Date().getTime() + " KETTHUCcapNhatSoLuongKhachDatTuFrontEnd= ", ee2.MaHang)
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


const capNhatDaDatCuaKhachHang = async () => {
    // console.log(new Date().getTime() + " BATDAUcapNhatSoLuongKhachDatTuFrontEnd= ")
    db.beginTransaction(async (err1) => {
        if (err1) {
            throw err1;
        }
        const sql1 = `select distinct MaHang from chitietdonhang, donhang where ((donhang.MaDatHang = chitietdonhang.MaDatHang and donhang.TrangThai = 'Chưa xác nhận') or (donhang.MaDatHang = chitietdonhang.MaDatHang and donhang.TrangThai = 'Đã xác nhận')) order by chitietdonhang.MaHang;`
        db.query(sql1, async (err2, res2) => {
            if (err2) {
                return db.rollback(() => {
                    throw err2
                })
            }
            // console.log(new Date().getTime() + " res2= " + JSON.stringify(res2))
            const sql2 = `SELECT MaHang, SoLuong FROM donhang, chitietdonhang where ((donhang.MaDatHang = chitietdonhang.MaDatHang and donhang.TrangThai = 'Chưa xác nhận') or (donhang.MaDatHang = chitietdonhang.MaDatHang and donhang.TrangThai = 'Đã xác nhận')) order by chitietdonhang.MaHang;`
            db.query(sql2, async (err3, res3) => {
                if (err3) {
                    return db.rollback(() => {
                        throw err3
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
                        db.commit((err5) => {
                            if (err5) {
                                return db.rollback(() => {
                                    throw err5
                                })
                            }
                            // console.log(new Date().getTime() + " KETTHUCcapNhatSoLuongKhachDatTuFrontEnd= ", ee2.MaHang)
                        })
                    })
                })
                // res.json({ msg: `Đang cập nhật! Quá trình cập nhật khoảng 8 giây, vui lòng đợi, không thao tác gì trong lúc đợi để tránh lỗi phát sinh của hệ thống.` })
            })
        })
    })
}