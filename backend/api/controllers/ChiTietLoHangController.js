'use strict'
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const db = require('../db')
const table = 'chitietlohang'
const readXlsxFile = require('read-excel-file/node');
// const { object } = require('prop-types');
const redis = require("redis")
const PORT_REDIS = process.env.PORT || 6379
const redisClient = redis.createClient(PORT_REDIS)

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

    chiTiet1SPTheoMaSanPhamVaMaLoHang: (req, res) => {
        res.json({ msg: `??ang x??y d???ng...` })
    },

    danhSachTatCaChiTietLoHang: (req, res) => {
        let sql = 'SELECT * FROM ' + table + ' order by NgayNhapHang DESC'
        db.query(sql, async (err, response) => {
            if (err) throw err
            await response.forEach(ee => {
                try {
                    let tmp = ee.HanSD
                    tmp.setDate(tmp.getDate() + 1)
                    ee.HanSD = tmp
                } catch (err) {
                }
                try {
                    let tmp = ee.NgayNhapHang
                    tmp.setDate(tmp.getDate() + 1)
                    ee.NgayNhapHang = tmp
                } catch (err) {
                }
            });
            // console.log(new Date().getTime() + " response[0]= " + JSON.stringify(response[0]))
            res.json(response)
        })
    },

    dSSP1LoHangTheoMaLoHang: (req, res) => {
        let sql = 'SELECT * FROM ' + table + ' WHERE MaLH = ? order by NgayNhapHang DESC'
        db.query(sql, [req.params.MaLH], async (err, response) => {
            if (err) throw err
            await response.forEach(ee => {
                try {
                    let tmp = ee.HanSD
                    tmp.setDate(tmp.getDate() + 1)
                    ee.HanSD = tmp
                } catch (err) {

                }
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

    dS1SPTrongTatCaLoHang: (req, res) => {
        let sql = 'SELECT * FROM ' + table + ' WHERE MaHang = ? order by NgayNhapHang DESC'
        db.query(sql, [req.params.MaHang], async (err, response) => {
            if (err) throw err
            await response.forEach(ee => {
                try {
                    let tmp = ee.HanSD
                    tmp.setDate(tmp.getDate() + 1)
                    ee.HanSD = tmp
                } catch (err) {

                }
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

    // update excel lohang
    capNhatChiTietLoHangTuFileExcel: async (req, res, next) => {
        // console.log(new Date().getTime() + " BATDAUcapNhatChiTietLoHangTuFileExcel= ")
        const { sanPhamThayDoi } = req.body;
        if (err) { throw err; }
        await sanPhamThayDoi.forEach(e => {
            if (e.SoLuong >= 0) {
                let hanSD = ""
                try {
                    const nam = e.HanSD.getFullYear()
                    let thang = (e.HanSD.getMonth() + 1)
                    if (thang.length == 1) {
                        thang = "0" + thang
                    }
                    let ngay = e.HanSD.getDate()
                    if (ngay.length == 1) {
                        ngay = "0" + ngay
                    }
                    hanSD = nam + "-" + thang + "-" + ngay
                } catch (err) {
                    const nam2 = e.HanSD.slice(6, 10)
                    const thang2 = e.HanSD.slice(3, 5)
                    const ngay2 = e.HanSD.slice(0, 2)
                    hanSD = nam2 + "-" + thang2 + "-" + ngay2
                }
                if (hanSD != null || hanSD != undefined) {
                    const sql = "UPDATE chitietlohang SET TenHang = ?, SoLuong = ?, DonGia = ?, DVT = ?,  HanSD = ?, GhiChu = ? WHERE IdSTT = ?"
                    db.query(sql, [e.TenHang, e.SoLuong, e.DonGia, e.DVT, hanSD, e.GhiChu, e.IdSTT], async (err, response) => {
                        if (err) {
                            return db.rollback(() => {
                                throw err
                            })
                        }
                    })
                }
            }
        });
        setTimeout(async () => {
            await capNhatSoLuongTonKho()
        }, 15000);
        setTimeout(async () => {
            await capNhatDaDatVaConLai()
        }, 30000);
        res.json({
            msg: 'C???p nh???t th??nh c??ng! Vui l??ng ?????i. Qu?? tr??nh nh???p excel m???t kho???ng 45 gi??y.'
        });
    },

    // update excel lohang
    danhSachThayDoiSanPhamTrongLoHang: (req, res, next) => {
        const file = req.file
        if (!file) {
            const error = new Error('Please upload a file')
            error.httpStatusCode = 400
            return next(error)
        }
        docFileExcelVaLuuDB2(res, __basedir + '/uploads_LoHang2/' + req.file.filename)
    },

    // import excel lo hang
    nhapChiTietLoHangTuFileExcel: (req, res, next) => {
        // console.log(new Date().getTime() + " nhapChiTietLoHangTuFileExcel= ")
        const file = req.file
        if (!file) {
            const error = new Error('Ch???n l???i file ????? t???i l??n')
            error.httpStatusCode = 400
            return next(error)
        }
        docFileExcelVaLuuDB(__basedir + '/uploads_LoHang/' + req.file.filename, res)
    },

    themChiTietLoHanHangCanDate: async (req, res) => {
        let data = req.body.sanPhamThayDoi;
        data.forEach(ee1 => {
            const nam2 = ee1.HanSD.slice(6, 10)
            const thang2 = ee1.HanSD.slice(3, 5)
            const ngay2 = ee1.HanSD.slice(0, 2)
            ee1.HanSD = nam2 + "-" + thang2 + "-" + ngay2
        });
        db.beginTransaction(async (err) => {
            if (err) {
                throw err
            }
            data.forEach(async ee1 => {
                let query = 'INSERT INTO chitietlohang SET ?';
                db.query(query, [ee1], async (err2, response) => {
                    if (err2) {
                        return db.rollback(() => {
                            throw err2;
                        });
                    }
                    db.commit(async (err) => {
                        if (err) {
                            return db.rollback(() => {
                                throw err;
                            });
                        }
                        await capNhatGiaVonTheoMaHang(ee1.MaHang, ee1.DonGia)

                    });
                });
            });
            await capNhatSoLuongTonKho()
            setTimeout(async () => {
                await capNhatDaDatVaConLai()
            }, 12000);
        })
        res.json({ msg: "Th??m h??ng c???n date th??nh c??ng, qu?? tr??nh nh???p file excel v?? x??? l?? m???t kho???ng 30 gi??y, vui l??ng ?????i, kh??ng thao t??c th??m ????? tr??nh l???i h??? th???ng." })
    },

    themChiTietLoHang: (req, res) => {
        let data = req.body.List;
        data.forEach(ee1 => {
            ee1.NgayNhapHang = new Date()
        });

        // db.beginTransaction((err0) => {
        // if (err0) {
        //     throw err0
        // }
        const sql1 = `select * from nhacungcap where SDT = ? limit 1;`
        db.query(sql1, [data[0].SDT], (err1, res1) => {
            if (err1) {
                throw err1
            }
            if (res1.length == 0) {
                // console.log(`${new Date().getTime()} 1=`, data)
                const sql2 = `insert into nhacungcap(TenNCC, SDT, TenTK, SoTK, TenNH) values (?,?,?,?,?)`
                db.query(sql2, [data[0].TenNCC, data[0].SDT, data[0].TenTK, data[0].SoTK, data[0].TenNH], (err2, res2) => {
                    if (err2) {
                        throw err2
                    }
                    const sql3 = 'SELECT Id FROM nhacungcap where SDT = ?'
                    db.query(sql3, [data[0].SDT], async (err3, res3) => {
                        if (err3) {
                            throw err3
                        }
                        const maNCC = "NCC0" + res3[0].Id
                        if (maNCC !== null && maNCC !== undefined) {
                            const sql4 = 'UPDATE nhacungcap SET MaNCC = ? WHERE Id = ?'
                            db.query(sql4, [maNCC, res3[0].Id], async (err4, res4) => {
                                if (err4) {
                                    throw err4
                                }
                                const rand = makeid(9)
                                const sql5 = `INSERT INTO donhangnhap(MaNCC, TenNCC, SDT, TenTK, SoTK, TenNH, GhiChu, NgayNhapHang, TongTien, MaDHN, CongNo, DaTra) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);`
                                db.query(sql5, [maNCC, data[0].TenNCC, data[0].SDT, data[0].TenTK, data[0].SoTK, data[0].TenNH, data[0].GhiChu, data[0].NgayNhapHang, data[0].TongTien, rand, data[0].CongNo, data[0].DaTra], (err5, res5) => {
                                    if (err5) {
                                        throw err5
                                    }
                                    data.forEach(ee1 => {
                                        db.beginTransaction((err6) => {
                                            if (err6) {
                                                db.rollback(() => { throw err6 })
                                            }
                                            const sql7 = `INSERT INTO chitietdonhangnhap(MaDHN, MaHang, TenHang, SoLuong, DonGia, DVT, MaLH, HanSD) VALUES (?,?,?,?,?,?,?,?);`
                                            db.query(sql7, [rand, ee1.MaHang, ee1.TenHang, ee1.SoLuong, ee1.DonGia, ee1.DVT, ee1.MaLH, ee1.HanSD], (err7, res7) => {
                                                if (err7) {
                                                    throw err7
                                                }
                                            })
                                        })
                                    });
                                    data.forEach(ee1 => {
                                        db.beginTransaction((err6) => {
                                            if (err6) {
                                                throw err6
                                            }
                                            const sql7 = `INSERT INTO chitietlohang(MaHang, TenHang, SoLuong, DonGia, DVT, MaLH, HanSD, NgayNhapHang, GhiChu, TenNCC, SDT, TenTK, SoTK, TenNH) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);`
                                            db.query(sql7, [ee1.MaHang, ee1.TenHang, ee1.SoLuong, ee1.DonGia, ee1.DVT, ee1.MaLH, ee1.HanSD, ee1.NgayNhapHang, ee1.GhiChu, ee1.TenNCC, ee1.SDT, ee1.TenTK, ee1.SoTK, ee1.TenNH], async (err7, res7) => {
                                                if (err7) {
                                                    throw err7
                                                }
                                                // th??m xong th?? c???p nh???t l???i s??? l?????ng t???n kho c???a l?? m???i th??m.
                                                await capNhatSoLuongTonKhoTheoMH(ee1.MaHang)
                                                setTimeout(async () => {
                                                    await capNhatDaDatVaConLai1SanPham(ee1.MaHang)
                                                }, 1000);
                                            })
                                        })
                                    });
                                })
                            })
                        }
                    })
                })
            } else {

                const sql3 = 'SELECT Id FROM nhacungcap where SDT = ?'
                db.query(sql3, [data[0].SDT], async (err3, res3) => {
                    if (err3) {
                        db.rollback(() => { throw err3 })
                    }
                    const maNCC = "NCC0" + res3[0].Id
                    if (maNCC !== null && maNCC !== undefined) {
                        const sql4 = 'UPDATE nhacungcap SET MaNCC = ? WHERE Id = ?'
                        db.query(sql4, [maNCC, res3[0].Id], async (err4, res4) => {
                            if (err4) {
                                db.rollback(() => { throw err4 })
                            }
                            const rand = makeid(9)
                            const sql5 = `INSERT INTO donhangnhap(MaNCC, TenNCC, SDT, TenTK, SoTK, TenNH, GhiChu, NgayNhapHang, TongTien, MaDHN, CongNo, DaTra) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);`
                            db.query(sql5, [maNCC, data[0].TenNCC, data[0].SDT, data[0].TenTK, data[0].SoTK, data[0].TenNH, data[0].GhiChu, data[0].NgayNhapHang, data[0].TongTien, rand, data[0].CongNo, data[0].DaTra], (err5, res5) => {
                                if (err5) {
                                    db.rollback(() => { throw err5 })
                                }
                                data.forEach(ee1 => {
                                    console.log(`${new Date().getTime()} 2=`, data[0])
                                    const sql7 = `INSERT INTO chitietdonhangnhap(MaDHN, MaHang, TenHang, SoLuong, DonGia, DVT, MaLH, HanSD) VALUES (?,?,?,?,?,?,?,?);`
                                    db.query(sql7, [rand, ee1.MaHang, ee1.TenHang, ee1.SoLuong, ee1.DonGia, ee1.DVT, ee1.MaLH, ee1.HanSD], (err7, res7) => {
                                        if (err7) {
                                            throw err7
                                        }
                                    })
                                });
                                data.forEach(ee1 => {
                                    const sql7 = `INSERT INTO chitietlohang(MaHang, TenHang, SoLuong, DonGia, DVT, MaLH, HanSD, NgayNhapHang, GhiChu, TenNCC, SDT, TenTK, SoTK, TenNH) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);`
                                    db.query(sql7, [ee1.MaHang, ee1.TenHang, ee1.SoLuong, ee1.DonGia, ee1.DVT, ee1.MaLH, ee1.HanSD, ee1.NgayNhapHang, ee1.GhiChu, ee1.TenNCC, ee1.SDT, ee1.TenTK, ee1.SoTK, ee1.TenNH], async (err7, res7) => {
                                        if (err7) {
                                            throw err7
                                        }
                                        // th??m xong th?? c???p nh???t l???i s??? l?????ng t???n kho c???a l?? m???i th??m.
                                        await capNhatSoLuongTonKhoTheoMH(ee1.MaHang)
                                        setTimeout(async () => {
                                            await capNhatDaDatVaConLai1SanPham(ee1.MaHang)
                                        }, 1000);
                                    })
                                });
                            })
                        })
                    }
                })
            }
        })
        // })

        res.json({ msg: 'Th??m th??nh c??ng!' })

        //==

        // th??m xong th?? c???p nh???t l???i s??? l?????ng t???n kho c???a l?? m???i th??m.
        // await capNhatSoLuongTonKhoTheoMH(data.MaHang)
        // setTimeout(async () => {
        //     await capNhatDaDatVaConLai1SanPham(data.MaHang)
        // }, 1000);
        // Khi n??o th???y y??u c???u th??m l?? h???n = tay v?? c???p nh???t gi?? v???n th?? m??? code n??y ra
        // setTimeout(async () => {
        //     await capNhatGiaVonTheoMaHang(data.MaHang, 999)
        // }, 0);
        // res.json({ msg: 'Th??m th??nh c??ng!' })
        //     })
        // })

    },

    // th???ng n??y l?? c???p nh???t/s???a 1 s???n ph???m theo m?? sp v?? m?? l?? h??ng, ki???u n???u sp trong l?? b??? l???i hay h?? h???g th?? up l???i t???n kho
    sua1SPTheoMaSanPhamVaMaLoHang: (req, res) => {
        const idSTT = req.params.IdSTT
        if (idSTT !== undefined) {
            let data = req.body
            const sql = "UPDATE chitietlohang SET ? WHERE IdSTT = ?;"
            db.query(sql, [data, idSTT], async (err, response) => {
                if (err) throw err
                // c???p nh???t l?? h??ng xong th?? c???p nh???t lu??n s??? l?????ng t???n kho c???a n?? trong b???ng s???n ph???m
                await capNhatSoLuongTonKhoTheoMH(data.MaHang)
                setTimeout(async () => {
                    await capNhatDaDatVaConLai1SanPham(data.MaHang)
                }, 1000);
                //Khi n??o th???y y??u c???u s???a l?? h???n = tay v?? c???p nh???t gi?? v???n th?? m??? code n??y ra
                // setTimeout(async () => {
                //     await capNhatGiaVonTheoMaHang(data.MaHang, 999)
                // }, 0);
                res.json({ msg: 'Th??nh c??ng!' })
            })
        } else {
            res.json({ msg: 'Th???t b???i!' })
        }
    },

    truSoLuongSanPhamTheoHanSD: async (req, res) => {
        // const maHang = req.params.MaHang
        // let soLuong = req.body.SoLuong
        // if (maHang != null || maHang != undefined) {
        //     db.beginTransaction((err1) => {
        //         if (err1) {
        //             throw err1
        //         }
        //         const sql1 = "SELECT IdSTT, MaHang, SoLuong, HanSD FROM " + table + " WHERE MaHang = ? AND SoLuong > 0 and HanSD > CURRENT_DATE() ORDER BY HanSD;"
        //         db.query(sql1, maHang, async (err2, res2) => {
        //             if (err2) {
        //                 return db.rollback(() => {
        //                     throw err2
        //                 })
        //             }
        //             if (res2 != null || res2 != undefined) {
        //                 await res2.forEach(async ee2 => {
        //                     if (soLuong > 0) {
        //                         if (ee2.SoLuong >= soLuong) {
        //                             ee2.SoLuong -= soLuong
        //                             soLuong = 0
        //                         } else {
        //                             soLuong -= ee2.SoLuong
        //                             ee2.SoLuong = 0
        //                         }
        //                         const sql2 = "UPDATE " + table + " SET SoLuong = ? WHERE IdSTT = ?;"
        //                         await db.query(sql2, [ee2.SoLuong, ee2.IdSTT], async (err3, res3) => {
        //                             if (err3) {
        //                                 return db.rollback(() => {
        //                                     throw err3
        //                                 })
        //                             }
        //                             db.commit(async (err4) => {
        //                                 if (err4) {
        //                                     return db.rollback(() => {
        //                                         throw err4
        //                                     })
        //                                 }
        //                                 // success
        //                                 await capNhatSoLuongTonKho1SanPham(res2[0].MaHang)
        //                             })
        //                         })
        //                     }
        //                 });
        //                 res.json({ msg: maHang })
        //             }
        //         })
        //     })
        // }
        res.json({ msg: `OK` })
        //ok
    },

    // th???ng n??y tr??? v??? ds nh???ng sp c???n date trong kho.
    hangCanDate: (req, res) => {
        let sql = 'SELECT MaHang, TenHang, SoLuong, DonGia, DVT, MaLH, HanSD FROM ' + table + ' WHERE DATEDIFF(HanSD, CURRENT_DATE()) < 365'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },

    // th???ng n??y tr??? v??? c???t s??? l?????ng c???a t???t c??? s???n ph???m trong l??, tr??? v??? l???y t???ng t???n kho
    tongTonKho: (req, res) => {
        let sql = 'SELECT SoLuong FROM ' + table
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },

    // th???ng n??y l?? t???ng t???n kho c???a 1 th???ng sp, n?? l???y h???t s??? l?????ng c???a nhi???u l?? l???i.
    tongTonKho1SanPham: (req, res) => {
        let sql = 'SELECT SoLuong FROM ' + table + ' WHERE MaHang = ?'
        db.query(sql, req.params.MaHang, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },

    // func n??y th???i bay h???t 1 s???n ph???m trong kho, cho d?? nhi???u hay ??t l?? th?? sp x??a n?? s??? bay h???t.
    xoaHet1SPTrongNhieuLoHang: (req, res) => {
        let sql = 'DELETE FROM ' + table + ' WHERE MaHang = ?'
        db.query(sql, [req.params.MaHang], (err, response) => {
            if (err) throw err
            res.json({ msg: 'Delete success!' })
        })
    },

    // func n??y ????n gi???n l?? x??a 1 sp trong 1 l?? c??? th??? h??n.
    xoa1SPTheoMaSanPhamVaMaLoHang: (req, res) => {
        const idSTT = req.params.IdSTT
        // const maLH = req.params.MaLH
        console.log(new Date().getTime() + " idSTT= " + JSON.stringify(idSTT))
        if (idSTT !== undefined) {
            const maHang = req.body.MaHang
            const sql = "DELETE FROM " + table + " WHERE IdSTT = ?;"
            db.query(sql, [idSTT], async (err, response) => {
                if (err) throw err
                await capNhatSoLuongTonKhoTheoMH(maHang)
                setTimeout(async () => {
                    await capNhatDaDatVaConLai1SanPham(maHang)
                    res.json({ msg: 'X??a th??nh c??ng' })
                }, 1000);
            })
            // res.json({ msg: 'X??a th???t b???i' })
        } else {
            res.json({ msg: 'X??a th???t b???i' })
        }
        // const maHang = req.params.MaHang
        // const maLH = req.params.MaLH
        // console.log(new Date().getTime() + " maHang= " + JSON.stringify(maHang))
        // if (maHang !== undefined && maLH !== undefined) {
        //     const maHang = req.body.MaHang
        //     const sql = "DELETE FROM " + table + " WHERE MaHang = ? AND MaLH = ?;"
        //     db.query(sql, [maHang, maLH], async (err, response) => {
        //         if (err) throw err
        //         await capNhatSoLuongTonKhoTheoMH(maHang)
        //         setTimeout(async () => {
        //             await capNhatDaDatVaConLai1SanPham(maHang)
        //             res.json({ msg: 'X??a th??nh c??ng' })
        //         }, 1000);
        //     })
        //     // res.json({ msg: 'X??a th???t b???i' })
        // } else {
        //     res.json({ msg: 'X??a th???t b???i' })
        // }
    },

    // api c???p nh???t kho ?????u, x??? l??, cu???i.
    getAllQuantityProductOnStock: async (req, res) => {
        const sql1 = `select MaHang, SoLuong from chitietlohang where SoLuong > 0 and HanSD > CURRENT_DATE();`
        db.query(sql1, (err1, res1) => {
            if (err1) {
                throw err1
            }
            res.json(res1)
        })
    },

    // front end g???i func c???p nh???t kho
    capNhatSoLuongTonKhoTuFrontEnd: async (req, res) => {
        await capNhatSoLuongTonKho()
        setTimeout(async () => {
            await capNhatDaDatVaConLai()
        }, 8000);
        res.json({ msg: "??ang c???p nh???t! Qu?? tr??nh c???p nh???t kho???ng 25 gi??y, vui l??ng ?????i, kh??ng thao t??c g?? trong l??c ?????i ????? tr??nh l???i ph??t sinh c???a h??? th???ng." })
    },

    guiDSMaHangVaSoLuongDistinct: async (req, res) => {
        const sql3 = `update sanpham set DaDat = 0`
        db.query(sql3, (err5, res5) => {
            if (err5) {
                throw err5
            }
            //
        })
        const ls = req.body.lsMaHangSoLuongDistinct
        // console.log(`${new Date().getTime()} ls=`, ls)
        ls.forEach(ee1 => {
            const maHang = ee1.MaHang
            let soLuong = ee1.SoLuong
            if (maHang != null || maHang != undefined) {
                db.beginTransaction((err1) => {
                    if (err1) {
                        throw err1
                    }
                    const sql1 = "SELECT IdSTT, MaHang, SoLuong, HanSD FROM " + table + " WHERE MaHang = ? AND SoLuong > 0 and HanSD > CURRENT_DATE() ORDER BY HanSD;"
                    db.query(sql1, maHang, async (err2, res2) => {
                        if (err2) {
                            return db.rollback(() => {
                                throw err2
                            })
                        }
                        if (res2 != null || res2 != undefined) {
                            res2.forEach(async ee2 => {
                                if (soLuong > 0) {
                                    if (ee2.SoLuong >= soLuong) {
                                        ee2.SoLuong -= soLuong
                                        soLuong = 0
                                    } else {
                                        soLuong -= ee2.SoLuong
                                        ee2.SoLuong = 0
                                    }
                                    const sql2 = "UPDATE " + table + " SET SoLuong = ? WHERE IdSTT = ?;"
                                    db.query(sql2, [ee2.SoLuong, ee2.IdSTT], async (err3, res3) => {
                                        if (err3) {
                                            return db.rollback(() => {
                                                throw err3
                                            })
                                        }
                                        db.commit(async (err4) => {
                                            if (err4) {
                                                return db.rollback(() => {
                                                    throw err4
                                                })
                                            }
                                            // success
                                            await capNhatSoLuongTonKho1SanPham(res2[0].MaHang)
                                        })
                                    })
                                }
                            });
                        }
                    })
                })
            }
        });
        res.json({ msg: `??ang x??? l??` })
    }
}

// func n??y l?? c???p nh???t c???t DaDat (???? x??? l??) v?? c???t ConLai (t???n cu???i) trong b???ng s???n ph???m.
const capNhatDaDatVaConLai = async () => {
    // console.log(new Date().getTime() + " BATDAUcapNhatDaDatVaConLai= ")
    db.beginTransaction((err) => {
        if (err) { throw err; }
        const sql = "Select MaHang, TonKho from sanpham"
        db.query(sql, async (err2, result) => {
            if (err2) {
                return db.rollback(() => {
                    throw err2;
                });
            }
            if (result.length > 0) {
                // const sql2 = "SELECT MaHang, SoLuong FROM donhang,chitietdonhang where ((donhang.MaDatHang = chitietdonhang.MaDatHang  and TrangThai = '???? x??c nh???n') or (donhang.MaDatHang = chitietdonhang.MaDatHang and TrangThai = '???? x??? l??'));"
                const sql2 = `SELECT MaHang, SoLuong FROM donhang, chitietdonhang where (donhang.MaDatHang = chitietdonhang.MaDatHang and TrangThai = '???? x??? l??');`
                db.query(sql2, async (err3, data) => {
                    if (err3) {
                        return db.rollback(() => {
                            throw err3;
                        });
                    }
                    result.forEach(async ee1 => {
                        const maHang = ee1.MaHang
                        const tonKho = ee1.TonKho
                        let daDat = 0
                        data.forEach(ee2 => {
                            if (maHang === ee2.MaHang) {
                                daDat += ee2.SoLuong
                            }
                        });
                        let conLai = tonKho - daDat
                        if (conLai < 0) {
                            conLai = 0
                        }
                        const sql3 = "update sanpham set DaDat = ?, ConLai = ? where MaHang = ?"
                        db.query(sql3, [daDat, conLai, maHang], async (err2, data2) => {
                            if (err2) {
                                throw err2;
                            }
                            // console.log(new Date().getTime() + " KETTHUCcapNhatDaDatVaConLai= " + JSON.stringify(maHang))
                        })
                    });
                    redisClient.del('Sanpham')
                })
            }
        });
    })
}

// func c???p nh???t c???t TonKho t???t c??? s???n ph???m
const capNhatSoLuongTonKho = async () => {
    // console.log(new Date().getTime() + " BATDAUcapNhatSoLuongTonKho= ")
    db.beginTransaction(async (err1) => {
        if (err1) {
            throw err1;
        }
        const sql = 'update sanpham set TonKho = 0;'
        db.query(sql, async (err2, res2) => {
            if (err2) {
                throw err2
            }
            // l???y h???t m?? h??ng trong l?? h??ng
            let queryLayTatCaMaHang = "SELECT DISTINCT MaHang FROM chitietlohang"
            db.query(queryLayTatCaMaHang, async (err3, res3) => {
                if (err3) {
                    return db.rollback(() => {
                        throw err3;
                    });
                }
                const tatCaMaHang = res3
                ///
                let queryDSTonKho1SanPham = "SELECT MaHang, SoLuong FROM chitietlohang WHERE SoLuong > 0 and HanSD > CURRENT_DATE();"
                db.query(queryDSTonKho1SanPham, (err4, res4) => {
                    if (err4) {
                        return db.rollback(() => {
                            throw err4;
                        });
                    }
                    if (res4.length > 0 && res4 !== null && res4 !== undefined) {
                        tatCaMaHang.forEach(async ee1 => {
                            let tongTonKho1SanPham = 0
                            res4.forEach(ee2 => {
                                if (ee1.MaHang === ee2.MaHang) {
                                    tongTonKho1SanPham += ee2.SoLuong
                                }
                            });
                            const queryCapNhatTonKho1SanPham = 'UPDATE sanpham SET TonKho = ? WHERE MaHang = ?'
                            db.query(queryCapNhatTonKho1SanPham, [tongTonKho1SanPham, ee1.MaHang], async (err5, res5) => {
                                if (err5) {
                                    return db.rollback(() => {
                                        throw err5;
                                    });
                                }
                                db.commit(async (err6) => {
                                    if (err6) {
                                        return db.rollback(() => {
                                            throw err6;
                                        });
                                    }
                                    // console.log(new Date().getTime() + " KETTHUCcapNhatSoLuongTonKho= ", ee1.MaHang)
                                });
                            })
                        });
                    }
                })
            })
        })

    })
}

// func c???p nh???t c???t TonKho 1 s???n ph???m
const capNhatSoLuongTonKho1SanPham = async (maHang) => {
    // console.log(new Date().getTime() + " BATDAUcapNhatSoLuongTonKho1SanPham= ")
    db.beginTransaction(async (err1) => {
        if (err1) {
            throw err1;
        }
        const sql = 'update sanpham set TonKho = 0 where MaHang = ?;'
        db.query(sql, [maHang], async (err2, res2) => {
            if (err2) {
                throw err2
            }
            // l???y h???t m?? h??ng trong l?? h??ng
            // let queryLayTatCaMaHang = "SELECT DISTINCT MaHang FROM chitietlohang where MaHang = ?;"
            // await db.query(queryLayTatCaMaHang,[maHang], async (err3, res3) => {
            //     if (err3) {
            //         return db.rollback(() => {
            //             throw err3;
            //         });
            //     }
            //     const tatCaMaHang = res3
            ///
            let queryDSTonKho1SanPham = "SELECT MaHang, SoLuong FROM chitietlohang WHERE SoLuong > 0 and HanSD > CURRENT_DATE() and MaHang = ?;"
            db.query(queryDSTonKho1SanPham, [maHang], async (err4, res4) => {
                if (err4) {
                    return db.rollback(() => {
                        throw err4;
                    });
                }
                if (res4.length > 0 && res4 !== null && res4 !== undefined) {
                    // tatCaMaHang.forEach(async ee1 => {
                    let tongTonKho1SanPham = 0
                    res4.forEach(ee2 => {
                        if (maHang === ee2.MaHang) {
                            tongTonKho1SanPham += ee2.SoLuong
                        }
                    });
                    const queryCapNhatTonKho1SanPham = 'UPDATE sanpham SET TonKho = ?, DaDat = 0, ConLai = ? WHERE MaHang = ?'
                    db.query(queryCapNhatTonKho1SanPham, [tongTonKho1SanPham, tongTonKho1SanPham, maHang], async (err5, res5) => {
                        if (err5) {
                            return db.rollback(() => {
                                throw err5;
                            });
                        }
                        db.commit(async (err6) => {
                            if (err6) {
                                return db.rollback(() => {
                                    throw err6;
                                });
                            }
                            redisClient.del('Sanpham')
                            // console.log(new Date().getTime() + " KETTHUCcapNhatSoLuongTonKho1SanPham= ", maHang)
                            // console.log(new Date().getTime() + " KETTHUCcapNhatDaDatVaConLai1SanPham= " + JSON.stringify(maHang))
                            // const sql3 = "update sanpham set DaDat = 0, ConLai = ? where MaHang = ?"
                            // await db.query(sql3, [tongTonKho1SanPham, maHang], async (err4, data2) => {
                            //     if (err4) {
                            //         return db.rollback(() => {
                            //             throw err4;
                            //         });
                            //     }
                            //     await db.commit((err5) => {
                            //         if (err5) {
                            //             return db.rollback(() => {
                            //                 throw err5;
                            //             });
                            //         }
                            //     });
                            // })
                        });
                    })
                    // });
                }
            })
            // })
        })

    })
}

const capNhatDaDatVaConLai1SanPham = async (maHang) => {
    db.beginTransaction(async (err) => {
        if (err) { throw err; }
        let tonKho = 0
        const sql = 'SELECT TonKho FROM sanpham WHERE MaHang = ?'
        db.query(sql, [maHang], async (err2, response) => {
            if (err2) throw err2
            tonKho = response[0].TonKho
            // const sql2 = "SELECT MaHang, SoLuong FROM donhang,chitietdonhang where ((donhang.MaDatHang = chitietdonhang.MaDatHang and MaHang = ? and TrangThai = '???? x??c nh???n'));"
            const sql2 = "SELECT MaHang, SoLuong FROM donhang,chitietdonhang where ((donhang.MaDatHang = chitietdonhang.MaDatHang and MaHang = ? and TrangThai = '???? x??? l??'));"
            db.query(sql2, [maHang], async (err3, data) => {
                if (err3) {
                    return db.rollback(() => {
                        throw err3;
                    });
                }
                if (data != null || data != undefined) {
                    let daDat = 0
                    await data.forEach(ee2 => {
                        daDat += ee2.SoLuong
                    });
                    let conLai = tonKho - daDat
                    if (conLai < 0) {
                        conLai = 0
                    }
                    const sql3 = "update sanpham set DaDat = ?, ConLai = ? where MaHang = ?"
                    db.query(sql3, [daDat, conLai, maHang], async (err4, data2) => {
                        if (err4) {
                            return db.rollback(() => {
                                throw err4;
                            });
                        }
                        db.commit((err5) => {
                            if (err5) {
                                return db.rollback(() => {
                                    throw err5;
                                });
                            }
                            redisClient.del('Sanpham')
                            // console.log(new Date().getTime() + " KETTHUCcapNhatDaDatVaConLai1SanPham= " + JSON.stringify(maHang))
                        });
                    })
                }
            })
        })
    })
}

// th???ng n??y c???p nh???t s??? l?????ng t???n kho c???a 1 sp. l???y h???t sl trong kho, c???ng d???n l???i r???i update v?? th???ng sanpham
const capNhatSoLuongTonKhoTheoMH = async (maHang) => {
    let queryDSTonKho1SanPham = "SELECT SoLuong FROM chitietlohang WHERE MaHang = ? and HanSD > CURRENT_DATE();"
    await db.query(queryDSTonKho1SanPham, maHang, async (err2, response2) => {
        if (err2) throw err2
        let tongTonKho1SanPham = 0
        response2.forEach(e => {
            tongTonKho1SanPham += parseFloat(e.SoLuong)
        });
        let queryCapNhatTonKho1SanPham = 'UPDATE sanpham SET TonKho = ? WHERE MaHang = ?'
        await db.query(queryCapNhatTonKho1SanPham, [tongTonKho1SanPham, maHang], (err3, respons3) => {
            if (err3) throw err3
            // console.log(new Date().getTime() + " KETTHUCcapNhatSoLuongTonKhoTheoMH= " + JSON.stringify(maHang))
        })
    })
}

// h??m ?????c file excel v?? c???p nh???t DB
const docFileExcelVaLuuDB2 = async (res, filePath) => {
    let reTurn = {
        code: 0,
        msg: 'Nh???p file excel th??nh c??ng.',
        data: []
    }
    try {
        await readXlsxFile(filePath).then(async (rows) => {
            rows.shift();
            let strCheckNgayThang = ``
            rows.forEach(ee => {
                for (let i = 0; i < ee.length; i++) {
                    if (i < 7) {
                        if (ee[i] === null || ee[i] === undefined) {
                            reTurn.code = 5
                            reTurn.msg = 'C?? ?? tr???ng, ki???m tra l???i file.'
                            break
                        }
                    }
                    if (i == 7) {
                        if (typeof ee[i] === 'object') {
                            try {
                                const dateOK = new Date(ee[i])
                                const nam = dateOK.getFullYear()
                                let thang = (dateOK.getMonth() + 1).toString()
                                if (thang.length == 1) {
                                    thang = "0" + thang
                                }
                                let ngay = dateOK.getDate().toString()
                                if (parseInt(ngay) > 31) {
                                    ngay = 25
                                }
                                if (ngay.length == 1) {
                                    ngay = "0" + ngay
                                }
                                ee[i] = nam + "-" + thang + "-" + ngay
                            } catch (err6) {
                                reTurn.code = 4
                                strCheckNgayThang += `${ee[i]}. `
                            }
                        } else {
                            try {
                                if (ee[i].indexOf("/") > 0) {
                                    const data = ee[i].split("/")
                                    if (data.length == 3) {
                                        let ngay = data[0]
                                        if (ngay.length == 1) {
                                            ngay = "0" + ngay
                                        }
                                        if (parseInt(ngay) > 31) {
                                            ngay = 25
                                        }
                                        let thang = data[1]
                                        if (thang.length == 1) {
                                            thang = "0" + thang
                                        }
                                        if (parseInt(thang) > 12) {
                                            thang = 12
                                        }
                                        const nam = data[2]
                                        ee[i] = nam + "-" + thang + "-" + ngay
                                    } else {
                                        reTurn.code = 4
                                        strCheckNgayThang += `${ee[i]}. `
                                    }
                                } else if (ee[i].indexOf("-") > 0) {
                                    const data = ee[i].split("-")
                                    if (data.length == 3) {
                                        let ngay = data[0]
                                        if (ngay.length == 1) {
                                            ngay = "0" + ngay
                                        }
                                        if (parseInt(ngay) > 31) {
                                            ngay = 25
                                        }
                                        let thang = data[1]
                                        if (thang.length == 1) {
                                            thang = "0" + thang
                                        }
                                        if (parseInt(thang) > 12) {
                                            thang = 12
                                        }
                                        const nam = data[2]
                                        ee[i] = nam + "-" + thang + "-" + ngay
                                    } else {
                                        reTurn.code = 4
                                        strCheckNgayThang += `${ee[i]}. `
                                    }
                                } else if (ee[i].indexOf(".") > 0) {
                                    const data = ee[i].split(".")
                                    if (data.length == 3) {
                                        let ngay = data[0]
                                        if (ngay.length == 1) {
                                            ngay = "0" + ngay
                                        }
                                        if (parseInt(ngay) > 31) {
                                            ngay = 25
                                        }
                                        let thang = data[1]
                                        if (thang.length == 1) {
                                            thang = "0" + thang
                                        }
                                        if (parseInt(thang) > 12) {
                                            thang = 12
                                        }
                                        const nam = data[2]
                                        ee[i] = nam + "-" + thang + "-" + ngay
                                    } else {
                                        reTurn.code = 4
                                        strCheckNgayThang += `${ee[i]}. `
                                    }
                                } else {
                                    reTurn.code = 4
                                    strCheckNgayThang += `${ee[i]}. `
                                }
                            } catch (err3) {
                                reTurn.code = 4
                                strCheckNgayThang += `${ee[i]}. `
                                // res.json(reTurn)
                            }
                        }
                    }
                }
            });
            if (reTurn.code == 4) {
                reTurn.msg = `L???i chuy???n ?????i ng??y th??ng, c?? th??? sai ?????nh d???ng ho???c b??? tr???ng. Ng??y b??? l???i l??: ${strCheckNgayThang}`
            }
            if (reTurn.code == 0) {
                try {
                    const sql = "SELECT IdSTT, MaHang, TenHang, SoLuong, DonGia, DVT, MaLH, HanSD FROM " + table
                    db.query(sql, async (err, response) => {
                        if (err) throw err
                        if (response != null || response != undefined) {
                            response.forEach(e => {
                                if (e.HanSD != null) {
                                    const nam2 = e.HanSD.getFullYear()
                                    let thang2 = "" + parseInt(e.HanSD.getMonth() + 1)
                                    if (thang2.length == 1) {
                                        thang2 = "0" + thang2
                                    }
                                    let ngay2 = "" + parseInt(e.HanSD.getDate())
                                    if (ngay2.length == 1) {
                                        ngay2 = "0" + ngay2
                                    }
                                    e.HanSD = nam2 + "-" + thang2 + "-" + ngay2
                                } else {
                                    e.HanSD = `2039-10-10`
                                }
                            });
                            let listDB = []
                            let i = 0
                            while (i < response.length) {
                                listDB.push(Object.values(response[i]))
                                i++
                            }
                            let data = []
                            i = 0
                            while (i < listDB.length) {
                                if (JSON.stringify(listDB[i]) !== JSON.stringify(rows[i]) && JSON.stringify(rows[i]) !== null) {
                                    data.push(rows[i])
                                }
                                i++
                            }
                            if (data.length > 0) {
                                reTurn.code = 0
                                reTurn.msg = 'L???y d??? li???u c???p nh???t file excel th??nh c??ng.'
                                reTurn.data = data
                            }
                            res.json(reTurn)
                        } else {
                            reTurn.code = 2
                            reTurn.msg = 'L???i query select d??? li???u database.'
                            res.json(reTurn)
                        }
                    })
                } catch (err2) {
                    reTurn.code = 2
                    reTurn.msg = 'L???i ch???y l???nh sql.'
                    res.json(reTurn)
                }
            } else {
                res.json(reTurn)
            }
        })
    } catch (err1) {
        reTurn.code = 3
        reTurn.msg = "File excel kh??ng ????ng ?????nh d???ng."
        res.json(reTurn)
    }
}

// func c???p nh???t gi?? v??n theo m?? h??ng (h??m n??y d??ng khi th??m/s???a l?? h???n = tay, th???y y??u c???u th?? m???i on, hi???n t???i th?? off)
const capNhatGiaVonTheoMaHang = (maHang, donGia) => {
    if (maHang.length > 0) {
        db.beginTransaction(async (err1) => {
            if (err1) {
                throw err1
            }
            const donGiaInt = parseInt(donGia)
            const sql = `update sanpham set GiaVon = ? where MaHang = ?`
            db.query(sql, [donGiaInt, maHang], async (err2, res2) => {
                if (err2) {
                    return db.rollback(() => {
                        throw err2
                    })
                }
                db.commit((err3) => {
                    if (err3) {
                        return db.rollback(() => {
                            throw err3
                        })
                    }
                })
            })
        })
    }
}

// func c???p nh???t gi?? v???n
const capNhatGiaVon = async (list, code) => {
    if (code == 1) {
        if (list.length > 0) {
            // console.log(`${new Date().getTime()} list=`,list)
            await list.forEach(async ee1 => {
                for (let i = 0; i < ee1.length; i++) {
                    if (i == 1) {
                        // console.log(`${new Date().getTime()} ee1[1]=`, ee1[1])
                        // console.log(`${new Date().getTime()} ee1[4]=`, ee1[4])
                        db.beginTransaction(async (err1) => {
                            if (err1) {
                                throw err1
                            }
                            const sql = `update sanpham set GiaVon = ? where MaHang = ?`
                            db.query(sql, [parseInt(ee1[3]), ee1[0]], async (err2, res2) => {
                                if (err2) {
                                    return db.rollback(() => {
                                        throw err2
                                    })
                                }
                                db.commit((err3) => {
                                    if (err3) {
                                        return db.rollback(() => {
                                            throw err3
                                        })
                                    }
                                    // console.log(`${new Date().getTime()} ChiTietLoHangController line 936 ee1[1]=`, ee1[0])
                                    // console.log(`${new Date().getTime()} ChiTietLoHangController line 936 ee1[4]=`, ee1[3])
                                })
                            })
                        })
                    }
                }
            });
        }
    }
}

const makeid = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

// h??m ?????c file excel v?? ?????y v?? DB
const docFileExcelVaLuuDB = async (filePath, res) => {
    let reTurn = {
        code: 0,
        msg: 'Nh???p file excel th??nh c??ng! Vui l??ng ?????i. Qu?? tr??nh nh???p m???t kho???ng 60 gi??y.',
        data: []
    }
    try {
        await readXlsxFile(filePath).then(async (rows) => {
            rows.shift();
            // // code check file
            let strCheckNgayThang = ``
            rows.forEach(ee => {
                for (let i = 0; i < ee.length; i++) {
                    if (i < 6 || i > 6) {
                        if (ee[i] === null || ee[i] === undefined) {
                            reTurn.code = 5
                            reTurn.msg = 'C?? ?? tr???ng, ki???m tra l???i file.'
                            break
                        }
                    }
                    if (i == 6) {
                        if (typeof ee[i] == 'object') {
                            // console.log(`${new Date().getTime()} 1=`)
                            try {
                                const dateOK = new Date(ee[i])
                                const nam = dateOK.getFullYear()
                                let thang = (dateOK.getMonth() + 1).toString()
                                if (thang.length == 1) {
                                    thang = "0" + thang
                                }
                                let ngay = dateOK.getDate().toString()
                                if (parseInt(ngay) > 31) {
                                    ngay = 25
                                }
                                if (ngay.length == 1) {
                                    ngay = "0" + ngay
                                }
                                ee[i] = nam + "-" + thang + "-" + ngay
                                // console.log(`${new Date().getTime()} ee[i]=`, ee[i])
                            } catch (err6) {
                                // console.log(`${new Date().getTime()} err6=`, err6)
                                reTurn.code = 4
                                strCheckNgayThang += `${ee[i]}. `
                            }
                        } else {
                            // console.log(`${new Date().getTime()} 2=`)
                            try {
                                if (ee[i].indexOf("/") > 0) {
                                    const data = ee[i].split("/")
                                    if (data.length == 3) {
                                        let ngay = data[0]
                                        if (ngay.length == 1) {
                                            ngay = "0" + ngay
                                        }
                                        if (parseInt(ngay) > 31) {
                                            ngay = 25
                                        }
                                        let thang = data[1]
                                        if (thang.length == 1) {
                                            thang = "0" + thang
                                        }
                                        if (parseInt(thang) > 12) {
                                            thang = 12
                                        }
                                        const nam = data[2]
                                        ee[i] = nam + "-" + thang + "-" + ngay
                                    } else {
                                        reTurn.code = 4
                                        strCheckNgayThang += `${ee[i]}. `
                                    }
                                } else if (ee[i].indexOf("-") > 0) {
                                    const data = ee[i].split("-")
                                    if (data.length == 3) {
                                        let ngay = data[0]
                                        if (ngay.length == 1) {
                                            ngay = "0" + ngay
                                        }
                                        if (parseInt(ngay) > 31) {
                                            ngay = 25
                                        }
                                        let thang = data[1]
                                        if (thang.length == 1) {
                                            thang = "0" + thang
                                        }
                                        if (parseInt(thang) > 12) {
                                            thang = 12
                                        }
                                        const nam = data[2]
                                        ee[i] = nam + "-" + thang + "-" + ngay
                                    } else {
                                        reTurn.code = 4
                                        strCheckNgayThang += `${ee[i]}. `
                                    }
                                } else if (ee[i].indexOf(".") > 0) {
                                    const data = ee[i].split(".")
                                    if (data.length == 3) {
                                        let ngay = data[0]
                                        if (ngay.length == 1) {
                                            ngay = "0" + ngay
                                        }
                                        if (parseInt(ngay) > 31) {
                                            ngay = 25
                                        }
                                        let thang = data[1]
                                        if (thang.length == 1) {
                                            thang = "0" + thang
                                        }
                                        if (parseInt(thang) > 12) {
                                            thang = 12
                                        }
                                        const nam = data[2]
                                        ee[i] = nam + "-" + thang + "-" + ngay
                                    } else {
                                        reTurn.code = 4
                                        strCheckNgayThang += `${ee[i]}. `
                                    }
                                } else {
                                    reTurn.code = 4
                                    strCheckNgayThang += `${ee[i]}. `
                                }
                            } catch (err3) {
                                // console.log(new Date().getTime() + " err3= " + JSON.stringify(err3))
                                reTurn.code = 4
                                strCheckNgayThang += `${ee[i]}. `
                                // res.json(reTurn)
                            }
                        }
                    }
                }
            });
            if (reTurn.code == 4) {
                reTurn.msg = `L???i chuy???n ?????i ng??y th??ng, c?? th??? sai ?????nh d???ng ho???c b??? tr???ng. Ng??y b??? l???i l??: ${strCheckNgayThang}`
            }
            // console.log(`${new Date().getTime()} reTurn=`, reTurn)
            if (reTurn.code == 0) {
                let arrLoHang = []
                let arrNCC = []
                let arrCTDHN = []
                const ngayNhapHang = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
                rows.forEach(ee1 => {
                    arrCTDHN.push([
                        ee1[8], // sdt
                        ee1[13], // tong tien
                        ee1[14], // da tra
                        ee1[0],
                        ee1[1],
                        ee1[2],
                        ee1[3],
                        ee1[4],
                        ee1[5],
                        ee1[6]
                    ])
                    arrLoHang.push([
                        ee1[0],
                        ee1[1],
                        ee1[2],
                        ee1[3],
                        ee1[4],
                        ee1[5],
                        ee1[6],
                        ee1[7],
                        ee1[8],
                        ee1[9],
                        ee1[10],
                        ee1[11]

                    ])
                    arrNCC.push(
                        ee1[7] + `???` +
                        ee1[8] + `???` +
                        ee1[9] + `???` +
                        ee1[10] + `???` +
                        ee1[11] + `???` +
                        ee1[12] + `???` +
                        ngayNhapHang + `???` +
                        ee1[13] + `???` +
                        ee1[14]
                    )
                });
                let uniqueChars = [...new Set(arrNCC)];
                arrNCC.length = 0
                for (let i = 0; i < uniqueChars.length; i++) {
                    arrNCC.push(uniqueChars[i].split(`???`))
                }
                arrNCC.forEach(async ee1 => {
                    const sDT = ee1[1]
                    db.beginTransaction(err99 => {
                        if (err99) {
                            throw err99
                        }
                        const sql = `select * from nhacungcap where SDT = ?`
                        db.query(sql, [sDT], async (err1, res1) => {
                            if (err1) {
                                db.rollback(() => { throw err1 })
                            }
                            if (res1.length == 0) {
                                if (ee1[0] == ee1[2]) {
                                    ee1[0] = ee1[0] + "."
                                }
                                if (ee1[1] == ee1[3]) {
                                    ee1[3] = ee1[3] + "."
                                }
                                if (ee1[4] == ee1[0] || ee1[4] == ee1[2]) {
                                    ee1[4] = ee1[4] + "."
                                }
                                const sql2 = 'INSERT INTO nhacungcap (TenNCC, SDT, TenTK, SoTK, TenNH, GhiChu) SELECT * FROM (SELECT "' + ee1[0] + '","' + ee1[1] + '","' + ee1[2] + '","' + ee1[3] + '","' + ee1[4] + '","' + ee1[5] + '") AS tmp WHERE NOT EXISTS (SELECT SDT FROM nhacungcap WHERE SDT = "' + sDT + '") LIMIT 1;'
                                db.query(sql2, async (err2, res2) => {
                                    if (err2) {
                                        db.rollback(() => { throw err2 })
                                    }
                                    let sql3 = 'SELECT Id FROM nhacungcap where SDT=?'
                                    db.query(sql3, sDT, async (err3, res3) => {
                                        if (err3) {
                                            db.rollback(() => { throw err3 })
                                        }
                                        const maNCC = "NCC0" + res3[0].Id
                                        if (maNCC !== null && maNCC !== undefined) {
                                            let sql4 = 'UPDATE nhacungcap SET MaNCC = ? WHERE Id = ?'
                                            db.query(sql4, [maNCC, res3[0].Id], async (err4, res4) => {
                                                if (err4) {
                                                    db.rollback(() => { throw err4 })
                                                }
                                                db.commit((err5) => {
                                                    if (err5) {
                                                        db.rollback(() => { throw err5 })
                                                    }
                                                })
                                            })
                                        }
                                    })
                                })
                            }
                        })
                    })
                    //==
                    setTimeout(() => {
                        //
                        const congNo = parseFloat(ee1[7]) - parseFloat(ee1[8])
                        //
                        const rand = makeid(9)
                        const sql3 = `INSERT INTO donhangnhap(TenNCC, SDT, TenTK, SoTK, TenNH, GhiChu, NgayNhapHang, TongTien, MaDHN, CongNo, DaTra) VALUES (?,?,?,?,?,?,?,?,?,?,?);`
                        db.query(sql3, [ee1[0], ee1[1], ee1[2], ee1[3], ee1[4], ee1[5], ee1[6], parseFloat(ee1[7]), rand, congNo, parseFloat(ee1[8])], async (err2, res2) => {
                            if (err2) {
                                throw err2
                            }
                            // console.log(`${new Date().getTime()} rand=`, rand)
                            let sqlmncc4 = 'SELECT MaNCC FROM nhacungcap where SDT=?'
                            db.query(sqlmncc4, ee1[1], async (err3, res3) => {
                                if (err3) {
                                    throw err3
                                }
                                let sql5 = 'UPDATE donhangnhap SET MaNCC = ? WHERE MaDHN = ?'
                                db.query(sql5, [res3[0].MaNCC, rand], async (err4, res4) => {
                                    if (err4) {
                                        throw err4
                                    }
                                })
                            })
                            // // // =======
                            arrCTDHN.forEach(ee2 => {
                                // sdt = sdt && (tongtien = tongtien || datra = datra)
                                if ((ee2[0] == ee1[1] && ee2[1] == ee1[7] && ee2[2] == ee1[8])) {
                                    if (ee2[1] == 0 && ee2[2] == 0) {
                                        console.log(`${new Date().getTime()} NGU TH???, KH??N L??N CH??T =)))`)
                                    } else {
                                        const sql4 = `INSERT INTO chitietdonhangnhap(MaDHN,MaHang,TenHang,SoLuong,DonGia,DVT,MaLH,HanSD) VALUES (?,?,?,?,?,?,?,?);`
                                        db.query(sql4, [rand, ee2[3], ee2[4], ee2[5], ee2[6], ee2[7], ee2[8], ee2[9]], (err3, res3) => {
                                            if (err3) {
                                                throw err3
                                            }
                                        })
                                    }
                                }
                            });

                        })
                    }, 2000);
                });
                // // ==
                let rowsXoaHanSDTruocNgayHienTai = []
                let rowsHanSDCanDate = []
                arrLoHang.forEach(ee => {
                    let test = 0
                    for (let i = 0; i < ee.length; i++) {
                        if (i < 6) {
                            if (ee[i] === null || ee[i] === undefined) {
                                reTurn.code = 5
                                reTurn.msg = 'C?? ?? tr???ng, ki???m tra l???i file.'
                                break
                            }
                        }
                        if (i == 6) {
                            if (reTurn.code === 0) {
                                const ngayHienTai = new Date()
                                const hanSD = new Date(ee[i])
                                if (hanSD <= ngayHienTai) {
                                    test = 1
                                }
                                if (hanSD >= ngayHienTai && soSanhNgay.inDays(ngayHienTai, hanSD) <= 365) {
                                    test = 2
                                }
                            }
                        }
                    }
                    if (reTurn.code === 0) {
                        if (test == 0) {
                            rowsXoaHanSDTruocNgayHienTai.push(ee)
                        }
                        if (test == 2) {
                            rowsHanSDCanDate.push(ee)
                        }
                    }
                });
                if (rowsXoaHanSDTruocNgayHienTai.length > 0) {
                    //--------------------------------------
                    const abc = new Date()
                    for (let i = 0; i < rowsXoaHanSDTruocNgayHienTai.length; i++) {
                        rowsXoaHanSDTruocNgayHienTai[i].push(abc)
                    }
                    // console.log(new Date().getTime() + " rowsXoaHanSDTruocNgayHienTai= ", rowsXoaHanSDTruocNgayHienTai)
                    try {
                        db.beginTransaction(async (err6) => {
                            if (err6) {
                                throw err6
                            }
                            const query = 'INSERT INTO chitietlohang (MaHang, TenHang, SoLuong, DonGia, DVT, MaLH, HanSD,TenNCC, SDT, TenTK, SoTK, TenNH, NgayNhapHang) VALUES ?';
                            db.query(query, [rowsXoaHanSDTruocNgayHienTai], async (err8, response) => {
                                if (err8) {
                                    return db.rollback(() => {
                                        throw err8;
                                    });
                                }
                                db.commit(async (err9) => {
                                    if (err9) {
                                        return db.rollback(() => {
                                            throw err9;
                                        });
                                    }
                                    // console.log(new Date().getTime() + " rowsXoaHanSDTruocNgayHienTai= ")
                                });
                            });
                        })
                        setTimeout(async () => {
                            await capNhatSoLuongTonKho()
                        }, 2000);
                        setTimeout(async () => {
                            await capNhatDaDatVaConLai()
                        }, 12000);
                        setTimeout(async () => {
                            await capNhatGiaVon(rowsXoaHanSDTruocNgayHienTai, 1)
                        }, 24000);
                    } catch (err7) {
                        reTurn.code = 2
                        reTurn.msg = 'L???i th??m/s???a/x??a d??? li???u v??o database.'
                    }
                }
                if (rowsHanSDCanDate.length > 0) {
                    reTurn.code = 6
                    reTurn.msg = 'L???y danh s??ch l?? h???n c???n date th??nh c??ng. Vui l??ng ?????i 60 gi??y ????? x??? l??.'
                    reTurn.data = rowsHanSDCanDate
                }
            }
            res.json(reTurn)
        })
    } catch (err1) {
        // console.log(new Date().getTime() + " err1= " + JSON.stringify(err1))
        reTurn.code = 3
        reTurn.msg = "File excel kh??ng ????ng ?????nh d???ng. Vui l??ng quy v??? d???ng Text cho t???t c??? c??c d??ng v?? ki???m tra c???t H???n s??? d???ng."
        res.json(reTurn)
    }
}

let soSanhNgay = {
    inDays: (d1, d2) => {
        const t2 = d2.getTime();
        const t1 = d1.getTime();
        return Math.abs(parseInt((t2 - t1) / (24 * 3600 * 1000)));
    },

    inWeeks: (d1, d2) => {
        const t2 = d2.getTime();
        const t1 = d1.getTime();
        return Math.abs(parseInt((t2 - t1) / (24 * 3600 * 1000 * 7)));
    },

    inMonths: (d1, d2) => {
        const d1Y = d1.getFullYear();
        const d2Y = d2.getFullYear();
        const d1M = d1.getMonth();
        const d2M = d2.getMonth();
        return Math.abs((d2M + 12 * d2Y) - (d1M + 12 * d1Y));
    },

    inYears: (d1, d2) => {
        return Math.abs(d2.getFullYear() - d1.getFullYear());
    }
}

// comment code example
// const dString = "May, 20, 1984";
// const d1 = new Date(dString);
// const d2 = new Date();
// soSanhNgay.inDays(d1, d2)
// try {
//     const nam = ee[i].getFullYear()
//     let thang = (ee[i].getMonth() + 1).toString()
//     if (thang.length == 1) {
//         thang = "0" + thang
//     }
//     if (parseInt(ngay) > 31) {
//         ngay = 10
//     }
//     let ngay = ee[i].getDate().toString()
//     if (ngay.length == 1) {
//         ngay = "0" + ngay
//     }
//     ee[i] = nam + "-" + thang + "-" + ngay
// } catch (err2) {
//     try {
//         if (ee[i].indexOf("/") > 0) {
//             const data = ee[i].split("/")
//             let ngay = data[0]
//             if (ngay.length == 1) {
//                 ngay = "0" + ngay
//             }
//             if (parseInt(ngay) > 31) {
//                 ngay = 10
//             }
//             let thang = data[1]
//             if (thang.length == 1) {
//                 thang = "0" + thang
//             }
//             if (parseInt(thang) > 12) {
//                 thang = 12
//             }
//             const nam = data[2]
//             ee[i] = nam + "-" + thang + "-" + ngay
//         } else if (ee[i].indexOf("-") > 0) {
//             const data = ee[i].split("-")
//             let ngay = data[0]
//             if (ngay.length == 1) {
//                 ngay = "0" + ngay
//             }
//             if (parseInt(ngay) > 31) {
//                 ngay = 10
//             }
//             let thang = data[1]
//             if (thang.length == 1) {
//                 thang = "0" + thang
//             }
//             if (parseInt(thang) > 12) {
//                 thang = 12
//             }
//             const nam = data[2]
//             ee[i] = nam + "-" + thang + "-" + ngay
//         } else if (ee[i].indexOf(".") > 0) {
//             const data = ee[i].split(".")
//             let ngay = data[0]
//             if (ngay.length == 1) {
//                 ngay = "0" + ngay
//             }
//             let thang = data[1]
//             if (thang.length == 1) {
//                 thang = "0" + thang
//             }
//             if (parseInt(thang) > 12) {
//                 thang = 12
//             }
//             const nam = data[2]
//             ee[i] = nam + "-" + thang + "-" + ngay
//         }
//     } catch (err3) {
//         console.log(new Date().getTime() + " err3= " + JSON.stringify(err3))
//         reTurn.code = 4
//         reTurn.msg = 'L???i chuy???n ?????i ng??y th??ng, c?? th??? sai ?????nh d???ng ho???c b??? tr???ng.'
//         res.json(reTurn)
//     }
// }