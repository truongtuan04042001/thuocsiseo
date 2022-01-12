'use strict'
const { database } = require('../../constants/constants');
const db = require('../db')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const redis = require("redis")
const PORT_REDIS = process.env.PORT || 6379
const redisClient = redis.createClient(PORT_REDIS)
const set = (key, value) => {
    redisClient.hset('Sanpham', key, JSON.stringify(value));
    redisClient.expire('Sanpham', 60 * 60)
}
const setapp = (key, value) => {
    redisClient.hset('Sanphamapp', key, JSON.stringify(value));
    redisClient.expire('Sanphamapp', 60 * 60)
}
module.exports = {
    searchBackAll: (req, res) => {
        let sqlstring = "select LoaiHang,NhomHang,NhanhHang,MaHang,TenHang,SoDangKy,HoatChat,HamLuong,HangSX,NuocSX,QCDG,GiaBan,GiaVon,DVT,HinhAnh,MoTa,TonKho,DaDat,ConLai,KhachDat,DangKD,TinhDS,BanChay,SPmoi,HDnhanh,GHnhanh,SVip,NhiKhoa,NhaKhoa,SanKhoa,DaLieu,NTHop,ThanKinh,BV,FlashSale,PhanTramKM from sanpham";
        db.query(sqlstring, function (err, result) {
            if (err) throw err
            // console.log(result)
            //set(req.route.path, JSON.stringify(result))
            res.json(result);
        });
    },

    searchBackAll2: (req, res) => {
        let sqlstring = "select MaHang,TenHang,DangKD,TinhDS,BanChay,SPmoi,HDnhanh,GHnhanh,SVip,NhiKhoa,NhaKhoa,SanKhoa,DaLieu,NTHop,ThanKinh,BV,FlashSale,PhanTramKM from sanpham";
        db.query(sqlstring, function (err, result) {
            if (err) throw err
            // console.log(result)
            //set(req.route.path, JSON.stringify(result))
            res.json(result);
        });
    },
    searchBackAll3: (req, res) => {
        let sqlstring = "select * from donhang";
        db.query(sqlstring, function (err, result) {
            if (err) throw err
            // console.log(result)
            //set(req.route.path, JSON.stringify(result))
            res.json(result);
        });
    },


    searchTags: (req, res) => {
        var sotrang = req.body.sotrang;
        var tags = req.body.sertags;
        var offset = (sotrang - 1) * 30

        let sqlstring = "select count(*) from sanpham WHERE " + tags + "=1 ";
        db.query(sqlstring, function (err, result) {
            if (err) throw err
            //res.json(result);
            var tsp = result
            let sqlstring = "select NhomHang,MaHang,TenHang,HoatChat,HamLuong,HangSX,NuocSX,QCDG,GiaBan,DVT,HinhAnh,MoTa,TonKho,DaDat,ConLai,KhachDat,DangKD,BanChay,SPmoi,HDnhanh,GHnhanh,SVip,NhiKhoa,NhaKhoa,SanKhoa,DaLieu,NTHop,ThanKinh,BV,FlashSale,PhanTramKM from sanpham  WHERE " + tags + "=1  LIMIT 30 OFFSET " + offset + "";
            db.query(sqlstring, tsp, function (err, result) {
                if (err) throw err
                let magSP = []
                if (result.length > 0) {
                    result.forEach(ee2 => {
                        if (ee2.DangKD == 1) {
                            magSP.push({
                                ...ee2,
                                ...{ SoLuong: 0 }
                            })
                        }
                    });
                }
                // set(key, magSP)
                set(req.body.sertags + req.body.sotrang, JSON.stringify({ tong: tsp, mang: magSP }))
                res.json({ tong: tsp, mang: magSP });
            });
        })
    },
    searchTagsapp: (req, res) => {
        var sotrang = req.body.sotrang;
        var tags = req.body.sertags;
        var offset = (sotrang - 1) * 10
        let sqlstring = "select count(*) from sanpham WHERE " + tags + "=1";
        db.query(sqlstring, function (err, result) {
            if (err) throw err
            //res.json(result);
            var tsp = result
            let sqlstring = "select NhomHang,MaHang,TenHang,HoatChat,HamLuong,HangSX,NuocSX,QCDG,GiaBan,DVT,HinhAnh,MoTa,TonKho,DaDat,ConLai,KhachDat,DangKD,BanChay,SPmoi,HDnhanh,GHnhanh,SVip,NhiKhoa,NhaKhoa,SanKhoa,DaLieu,NTHop,ThanKinh,BV,FlashSale,PhanTramKM from sanpham  WHERE " + tags + "=1  LIMIT 10 OFFSET " + offset + "";
            db.query(sqlstring, tsp, function (err, result) {
                if (err) throw err
                let magSP = []
                if (result.length > 0) {
                    result.forEach(ee2 => {
                        if (ee2.DangKD == 1) {
                            magSP.push({
                                ...ee2,
                                ...{ SoLuong: 0 }
                            })
                        }
                    });
                }
                // set(key, magSP)
                setapp(req.body.sertags + req.body.sotrang, JSON.stringify({ tong: tsp, mang: magSP }))
                res.json({ tong: tsp, mang: magSP });
            });
        })
    },
    searchQuanTri: (req, res) => {
        let i;
        var tables = req.body.tableVar;
        var searchvl = req.body.searchVar;
        let sqlstring = "describe " + tables + "";
        db.query(sqlstring, function (err, result) {
            let columns = "";
            for (i = 0; i < result.length; i++) {
                if (i == result.length - 1) {
                    columns = columns + result[i].Field + " LIKE" + "'%" + searchvl + "%'"
                } else {
                    columns = columns + result[i].Field + " LIKE " + "'%" + searchvl + "%'" + " OR "

                }

            }

            let sqlstring = "select * from " + tables + " where " + columns + " ";
            db.query(sqlstring, function (err, result) {
                if (err) throw err
                res.json(result)
            })

        })
    },
    searchQuanTriCN: (req, res) => {
        let i;
        var tables = req.body.tableVar;
        var searchvl = req.body.searchVar;
        let sqlstring = "describe " + tables + "";
        db.query(sqlstring, function (err, result) {
            let columns = "";
            for (i = 0; i < result.length; i++) {
                if (i == result.length - 1) {
                    columns = columns + result[i].Field + " LIKE" + "'%" + searchvl + "%'"
                } else {
                    columns = columns + result[i].Field + " LIKE " + "'%" + searchvl + "%'" + " OR "

                }

            }
            let sql = "select * from " + tables + " where ( TrangThai='Đã xử lý' AND CongNo > 0) AND ( " + columns + ")";
            db.query(sql, function (err, resultfull) {
                if (err) throw err;
                let sql2 = "SELECT * FROM " + tables + " WHERE  ( TrangThai='Đã xử lý' AND CongNo > 0) AND ( " + columns + ") GROUP by MaKhachHang";
                db.query(sql2, function (err, result) {
                    if (err) throw err;
                    let cnkhArr = [];
                    result.forEach(ee2 => {
                        cnkhArr.push({
                            ...ee2,
                            ...{ TongCN: 0 }
                        })

                    });
                    for (let i = 0; i < cnkhArr.length; i++) {
                        for (let j = 0; j < resultfull.length; j++) {
                            if (cnkhArr[i].MaKhachHang == resultfull[j].MaKhachHang)
                                cnkhArr[i].TongCN += resultfull[j].CongNo
                        }

                    }
                    res.json(cnkhArr)
                });

            });
            // let sqlstring = "select * from " + tables + " where ( TrangThai='Đã xử lý' AND CongNo > 0) AND ( " + columns + ")";
            // db.query(sqlstring, function (err, result) {
            //     if (err) throw err
            //     res.json(result)
            // })

        })
    },
    searchFilterCN: (req, res) => {
        let i;
        var searchArr = req.body.searchArr;
        var searchStr = "";
        var tables = req.body.tableVar;
        /////////////////////
        if (searchArr.length <= 1) {
            searchStr = searchStr + searchArr[0].columnName + " LIKE " + "'%" + searchArr[0].value + "%'";
        } else {
            for (i = 0; i < searchArr.length; i++) {
                if (i == searchArr.length - 1) {
                    searchStr = searchStr + searchArr[i].columnName + " LIKE " + "'%" + searchArr[i].value + "%'";
                } else {
                    searchStr = searchStr + searchArr[i].columnName + " LIKE " + "'%" + searchArr[i].value + "%'" + " AND ";
                }
            }
        }

        let sql = "select * from " + tables + " where (CongNo > 0  AND (TrangThai='Đã xử lý' OR TrangThai='Hoàn thành' )) AND ( " + searchStr + ")";
        db.query(sql, function (err, resultfull) {
            if (err) throw err;
            let sql2 = "SELECT * FROM " + tables + " WHERE  (CongNo > 0  AND (TrangThai='Đã xử lý' OR TrangThai='Hoàn thành' )) AND ( " + searchStr + ") GROUP by MaKhachHang";
            db.query(sql2, function (err, result) {
                if (err) throw err;
                let cnkhArr = [];
                result.forEach(ee2 => {
                    cnkhArr.push({
                        ...ee2,
                        ...{ TongCN: 0 }
                    })

                });
                for (let i = 0; i < cnkhArr.length; i++) {
                    for (let j = 0; j < resultfull.length; j++) {
                        if (cnkhArr[i].MaKhachHang == resultfull[j].MaKhachHang)
                            cnkhArr[i].TongCN += resultfull[j].CongNo
                    }

                }
                res.json(cnkhArr)
            });

        });
        //////////////

    },
    searchQuanTriCNNCC: (req, res) => {
        let i;
        var tables = req.body.tableVar;
        var searchvl = req.body.searchVar;
        let sqlstring = "describe " + tables + "";
        db.query(sqlstring, function (err, result) {
            let columns = "";
            for (i = 0; i < result.length; i++) {
                if (i == result.length - 1) {
                    columns = columns + result[i].Field + " LIKE" + "'%" + searchvl + "%'"
                } else {
                    columns = columns + result[i].Field + " LIKE " + "'%" + searchvl + "%'" + " OR "

                }

            }
            let sql = "select * from " + tables + " where CongNo > 0 AND ( " + columns + ")";
            db.query(sql, function (err, resultfull) {
                if (err) throw err;
                let sql2 = "SELECT * FROM " + tables + " WHERE CongNo > 0 AND ( " + columns + ") GROUP by SDT";
                db.query(sql2, function (err, result) {
                    if (err) throw err;
                    let cnnccArr = [];
                    result.forEach(ee2 => {
                        cnnccArr.push({
                            ...ee2,
                            ...{ TongCN: 0 }
                        })

                    });
                    for (let i = 0; i < cnnccArr.length; i++) {
                        for (let j = 0; j < resultfull.length; j++) {
                            if (cnnccArr[i].SDT == resultfull[j].SDT)
                                cnnccArr[i].TongCN += resultfull[j].CongNo
                        }

                    }
                    res.json(cnnccArr)
                });

            });
            // let sqlstring = "select * from " + tables + " where ( TrangThai='Đã xử lý' AND CongNo > 0) AND ( " + columns + ")";
            // db.query(sqlstring, function (err, result) {
            //     if (err) throw err
            //     res.json(result)
            // })

        })
    },
    searchFilterCNNCC: (req, res) => {
        let i;
        var searchArr = req.body.searchArr;
        var searchStr = "";
        var tables = req.body.tableVar;
        /////////////////////
        if (searchArr.length <= 1) {
            searchStr = searchStr + searchArr[0].columnName + " LIKE " + "'%" + searchArr[0].value + "%'";
        } else {
            for (i = 0; i < searchArr.length; i++) {
                if (i == searchArr.length - 1) {
                    searchStr = searchStr + searchArr[i].columnName + " LIKE " + "'%" + searchArr[i].value + "%'";
                } else {
                    searchStr = searchStr + searchArr[i].columnName + " LIKE " + "'%" + searchArr[i].value + "%'" + " AND ";
                }
            }
        }

        let sql = "select * from " + tables + " where CongNo > 0 AND ( " + searchStr + ")";
        db.query(sql, function (err, resultfull) {
            if (err) throw err;
            let sql2 = "SELECT * FROM " + tables + " WHERE CongNo > 0 AND ( " + searchStr + ") GROUP by SDT";
            db.query(sql2, function (err, result) {
                if (err) throw err;
                let cnnccArr = [];
                result.forEach(ee2 => {
                    cnnccArr.push({
                        ...ee2,
                        ...{ TongCN: 0 }
                    })

                });
                for (let i = 0; i < cnnccArr.length; i++) {
                    for (let j = 0; j < resultfull.length; j++) {
                        if (cnnccArr[i].SDT == resultfull[j].SDT)
                            cnnccArr[i].TongCN += resultfull[j].CongNo
                    }

                }
                res.json(cnnccArr)
            });

        });
        //////////////

    },
    searchFilter: (req, res) => {
        let i;
        var searchTime = req.body.times;
        var searchArr = req.body.searchArr;
        var searchStr = "";
        //var columns = req.body.columnVar;
        var tables = req.body.tableVar;
        //var searchvl = req.body.searchVar;
        console.log("time: " + JSON.stringify(searchTime))
        console.log("arr: " + JSON.stringify(searchArr))
        if (searchTime === "" && searchArr !== undefined) {
            /////////////////////
            if (searchArr.length <= 1) {
                searchStr = searchStr + searchArr[0].columnName + " LIKE " + "'%" + searchArr[0].value + "%'";
            } else {
                for (i = 0; i < searchArr.length; i++) {
                    if (i == searchArr.length - 1) {
                        searchStr = searchStr + searchArr[i].columnName + " LIKE " + "'%" + searchArr[i].value + "%'";
                    } else {
                        searchStr = searchStr + searchArr[i].columnName + " LIKE " + "'%" + searchArr[i].value + "%'" + " AND ";
                    }
                }
            }

            let sqlstring = "select * from " + tables + " where " + searchStr + "";

            db.query(sqlstring, function (err, result) {
                if (err) throw err
                res.json(result)
            })
            //////////////
        } else if (searchTime !== "" && searchArr !== undefined) {

            ///////////////
            //  if (searchArr != null) {

            if (searchArr.length <= 1) {
                searchStr = searchStr + searchArr[0].columnName + " LIKE " + "'%" + searchArr[0].value + "%'";
            } else {
                for (i = 0; i < searchArr.length; i++) {
                    if (i == searchArr.length - 1) {
                        searchStr = searchStr + searchArr[i].columnName + " LIKE " + "'%" + searchArr[i].value + "%'";
                    } else {
                        searchStr = searchStr + searchArr[i].columnName + " LIKE " + "'%" + searchArr[i].value + "%'" + " AND ";
                    }
                }
            }
            switch (tables) {
                case "donhang":

                    switch (searchTime.type) {
                        case 1:
        
                            let sqly1 = 'select * from (select * from donhang where NgayXuLy >= "' + searchTime.time + '" and NgayXuLy <= "' + searchTime.time2 + '"  ) as T  where ' + searchStr + ' ORDER BY MaDatHang DESC'
                            db.query(sqly1, (err, result) => {
                                if (err) throw err
                                res.json(result)
                            })
                            break
        
                        case 2:
                            let sqly2 = 'select * from (select * from donhang where MONTH(NgayXuLy)="' + searchTime.time + '" and YEAR(NgayXuLy)="' + searchTime.time2 + '" ) as T  where ' + searchStr + ' ORDER BY MaDatHang DESC'
                            db.query(sqly2, (err, result) => {
                                if (err) throw err
                                res.json(result)
                            })
                            break;
                        case 3:
                            let sqly3 = 'select * from (select * from donhang where YEAR(NgayXuLy)="' + searchTime.time + '" ) as T  where ' + searchStr + ' ORDER BY MaDatHang DESC'
                            db.query(sqly3, (err, result) => {
                                if (err) throw err
                                res.json(result)
                            })
                            break;
        
                    }
                    break
                case "donhangnhap":
                    switch (searchTime.type) {
                        case 1:
        
                            let sqly1 = 'select * from (select * from donhangnhap where NgayNhapHang >= "' + searchTime.time + '" and NgayNhapHang <= "' + searchTime.time2 + '"  ) as T  where ' + searchStr + ' ORDER BY Id DESC'
                            db.query(sqly1, (err, result) => {
                                if (err) throw err
                                res.json(result)
                            })
                            break
        
                        case 2:
                            let sqly2 = 'select * from (select * from donhangnhap where MONTH(NgayNhapHang)="' + searchTime.time + '" and YEAR(NgayNhapHang)="' + searchTime.time2 + '" ) as T  where ' + searchStr + ' ORDER BY Id DESC'
                            db.query(sqly2, (err, result) => {
                                if (err) throw err
                                res.json(result)
                            })
                            break;
                        case 3:
                            let sqly3 = 'select * from (select * from donhangnhap where YEAR(NgayNhapHang)="' + searchTime.time + '" ) as T  where ' + searchStr + ' ORDER BY Id DESC'
                            db.query(sqly3, (err, result) => {
                                if (err) throw err
                                res.json(result)
                            })
                            break;
        
                    }
                    break
            }
            
            //chay hàm search theo time sau do search like
            //if timetype khac dang year,month,date thi chuyen qua cau lenh sql khac select * from Project where DueDate between '2010-01-01' and LAST_DAY('2010-01-01') 
        } else {
            //chạy hàm search theo time
            switch (tables) {
                case "donhang":

                    switch (searchTime.type) {
                        case 1:
                            let sqly1 = 'select * from donhang where NgayXuLy >= "' + searchTime.time + '" and NgayXuLy <= "' + searchTime.time2 + '" ORDER BY MaDatHang DESC'
                            db.query(sqly1, (err, result) => {
                                if (err) throw err
                                res.json(result)
                            })
                            break;
                        case 2:
                            let sqly2 = 'select * from donhang where MONTH(NgayXuLy)="' + searchTime.time + '" and YEAR(NgayXuLy)="' + searchTime.time2 + '" ORDER BY MaDatHang DESC'
                            db.query(sqly2, (err, result) => {
                                if (err) throw err
                                res.json(result)
                            })
                            break;
                        case 3:
                            let sqly3 = 'select * from donhang where YEAR(NgayXuLy)="' + searchTime.time + '" ORDER BY MaDatHang DESC'
                            db.query(sqly3, (err, result) => {
                                if (err) throw err
                                res.json(result)
                            })
                            break;
                    }
                    break
                case "donhangnhap":
                    switch (searchTime.type) {
                        case 1:
                            let sqly1 = 'select * from donhangnhap where NgayNhapHang >= "' + searchTime.time + '" and NgayNhapHang <= "' + searchTime.time2 + '" ORDER BY Id DESC'
                            db.query(sqly1, (err, result) => {
                                if (err) throw err
                                res.json(result)
                            })
                            break;
                        case 2:
                            let sqly2 = 'select * from donhangnhap where MONTH(NgayNhapHang)="' + searchTime.time + '" and YEAR(NgayNhapHang)="' + searchTime.time2 + '" ORDER BY Id DESC'
                            db.query(sqly2, (err, result) => {
                                if (err) throw err
                                res.json(result)
                            })
                            break;
                        case 3:
                            let sqly3 = 'select * from donhangnhap where YEAR(NgayNhapHang)="' + searchTime.time + '" ORDER BY Id DESC'
                            db.query(sqly3, (err, result) => {
                                if (err) throw err
                                res.json(result)
                            })
                            break;
                    }
                    break
            }
           
        }
    },

    filterHetHang: (req, res) => {
        const searchArr = req.body.searchArr;
        let i;
        let searchStr = "";
        if (searchArr !== undefined) {
            if (searchArr.length <= 1) {
                searchStr += `${searchArr[0].columnName} LIKE '%${searchArr[0].value}%'`
                // searchStr = searchStr + searchArr[0].columnName + " LIKE " + "'%" + searchArr[0].value + "%'";
            } else {
                for (i = 0; i < searchArr.length; i++) {
                    if (i == searchArr.length - 1) {
                        searchStr += `${searchArr[i].columnName} LIKE '%${searchArr[i].value}%'`
                        // searchStr = searchStr + searchArr[i].columnName + " LIKE " + "'%" + searchArr[i].value + "%'";
                    } else {
                        searchStr += `${searchArr[i].columnName} LIKE '%${searchArr[i].value}%' AND `
                        // searchStr = searchStr + searchArr[i].columnName + " LIKE " + "'%" + searchArr[i].value + "%'" + " AND ";
                    }
                }
            }
            let sql = `select MaHang, TenHang, ConLai, HangSX from sanpham where ${searchStr} and ConLai <= 1010;`
            // let sqlstring = "select MaHang, TenHang, ConLai from sanpham where " + searchStr + " AND ConLai <= 100;";
            db.query(sql, function (err, result) {
                if (err) throw err
                let magSP = []
                if (result.length > 0) {
                    // hàng phải trừ đi 1000 rồi mới lọc dưới 11.
                    result.forEach(ee1 => {
                        const conLai = ee1.ConLai
                        const hetHang = 1000 - conLai
                        if (hetHang >= 0 && hetHang != 1000) {
                            ee1.ConLai = hetHang
                        } else {
                            ee1.ConLai = 0
                        }
                    });
                    result.forEach(ee2 => {
                        if (ee2.ConLai <= 10) {
                            magSP.push({
                                ...ee2,
                                ...{ HetHang: 'Cảnh báo⚠️⚠️⚠️' }
                            })
                        } else {
                            // magSP.push({
                            //     ...ee2,
                            //     ...{ HetHang: 'Chú ý❗❗❗' }
                            // })
                        }
                    });
                }
                res.json(magSP)
            })
        } else {
            let magSP = []
            res.json(magSP)
        }
    },

    searchFilterSl: (req, res) => {
        let i;
        var searchTime = req.body.times;
        var searchArr = req.body.searchArr;
        var searchStr = "";
        let Manv = req.body.Manv;
        var tables = req.body.tableVar;

        if (searchTime == "" && searchArr != null) {
            if (searchArr.length <= 1) {
                searchStr = searchStr + searchArr[0].columnName + " LIKE " + "'%" + searchArr[0].value + "%'";
            } else {
                for (i = 0; i < searchArr.length; i++) {
                    if (i == searchArr.length - 1) {
                        searchStr = searchStr + searchArr[i].columnName + " LIKE " + "'%" + searchArr[i].value + "%'";
                    } else {
                        searchStr = searchStr + searchArr[i].columnName + " LIKE " + "'%" + searchArr[i].value + "%'" + " AND ";
                    }
                }
            }

            let sqlstring = "select * from (select * from " + tables + " where " + searchStr + ") as T where MaNguoiBan='" + Manv + "'";

            db.query(sqlstring, function (err, result) {
                if (err) throw err
                res.json(result)
            })

        } else {
            if (searchArr != null) {

                if (searchArr.length <= 1) {
                    searchStr = searchStr + searchArr[0].columnName + " LIKE " + "'%" + searchArr[0].value + "%'";
                } else {
                    for (i = 0; i < searchArr.length; i++) {
                        if (i == searchArr.length - 1) {
                            searchStr = searchStr + searchArr[i].columnName + " LIKE " + "'%" + searchArr[i].value + "%'";
                        } else {
                            searchStr = searchStr + searchArr[i].columnName + " LIKE " + "'%" + searchArr[i].value + "%'" + " AND ";
                        }
                    }
                }

                switch (searchTime.type) {
                    case 1:
                        let sqly1 = 'select * from (select * from (select * from donhang where NgayDatHang >= "' + searchTime.time + '" and NgayDatHang <= "' + searchTime.time2 + '"  ) as T  where ' + searchStr + ') as Y where MaNguoiBan="' + Manv + '" ORDER BY MaDatHang DESC'
                        db.query(sqly1, (err, result) => {
                            if (err) throw err
                            res.json(result)
                        })
                        break;
                    case 2:
                        let sqly2 = 'select * from (select * from (select * from donhang where MONTH(NgayDatHang)="' + searchTime.time + '" and YEAR(NgayDatHang)="' + searchTime.time2 + '" ) as T  where ' + searchStr + ') as Y where MaNguoiBan="' + Manv + '" ORDER BY MaDatHang DESC'
                        db.query(sqly2, (err, result) => {
                            if (err) throw err
                            res.json(result)
                        })
                        break;
                    case 3:
                        let sqly3 = 'select * from (select * from (select * from donhang where YEAR(NgayDatHang)="' + searchTime.time + '" ) as T  where ' + searchStr + ') as Y where MaNguoiBan="' + Manv + '"  ORDER BY MaDatHang DESC'
                        db.query(sqly3, (err, result) => {
                            if (err) throw err
                            res.json(result)
                        })
                        break;

                }

                //chay hàm search theo time sau do search like

                //if timetype khac dang year,month,date thi chuyen qua cau lenh sql khac select * from Project where DueDate between '2010-01-01' and LAST_DAY('2010-01-01') 

            } else {
                //chạy hàm search theo time
                switch (searchTime.type) {
                    case 1:
                        let sqly1 = 'select * from(select * from donhang where NgayDatHang >= "' + searchTime.time + '" and NgayDatHang <= "' + searchTime.time2 + '") as Y where MaNguoiBan="' + Manv + '"  ORDER BY MaDatHang DESC'
                        db.query(sqly1, (err, result) => {
                            if (err) throw err
                            res.json(result)
                        })
                        break;
                    case 2:
                        let sqly2 = 'select * from (select * from donhang where MONTH(NgayDatHang)="' + searchTime.time + '" and YEAR(NgayDatHang)="' + searchTime.time2 + '") as Y where MaNguoiBan="' + Manv + '" ORDER BY MaDatHang DESC'
                        db.query(sqly2, (err, result) => {
                            if (err) throw err
                            res.json(result)
                        })
                        break;
                    case 3:
                        let sqly3 = 'select * from (select * from donhang where YEAR(NgayDatHang)="' + searchTime.time + '" ) as Y where MaNguoiBan="' + Manv + '" ORDER BY MaDatHang DESC'
                        db.query(sqly3, (err, result) => {
                            if (err) throw err
                            res.json(result)
                        })
                        break;

                }
            }


        }

    },

    searchFront: (req, res) => {
        var sotrang = req.body.sotrang;
        var cmdarr = req.body.sercmdarr;
        var offset = (sotrang - 1) * 30
        if (cmdarr == 'Tất Cả Sản Phẩm') {
            let sqlstring = "select count(*) from sanpham";
            db.query(sqlstring, function (err, result) {
                if (err) throw err
                //res.json(result);
                var tsp = result
                let sqlstring = "select NhomHang,MaHang,TenHang,HoatChat,HamLuong,HangSX,NuocSX,QCDG,GiaBan,DVT,HinhAnh,MoTa,TonKho,DaDat,ConLai,KhachDat,DangKD,BanChay,SPmoi,HDnhanh,GHnhanh,SVip,NhiKhoa,NhaKhoa,SanKhoa,DaLieu,NTHop,ThanKinh,BV,FlashSale,PhanTramKM from sanpham  LIMIT 30 OFFSET " + offset + "";
                db.query(sqlstring, tsp, function (err, result) {
                    if (err) throw err
                    // console.log(result)
                    let magSP = []
                    if (result.length > 0) {
                        result.forEach(ee2 => {
                            if (ee2.DangKD == 1) {
                                magSP.push({
                                    ...ee2,
                                    ...{ SoLuong: 0 }
                                })
                            }
                        });
                    }
                    if (magSP.length > 0) {
                        set(req.body.sercmdarr + req.body.sotrang, JSON.stringify({ tong: tsp, mang: magSP }))
                    }

                    res.json({ tong: tsp, mang: magSP });
                });
            });
        } else {
            let sqlstring = "select count(*) from sanpham WHERE NhomHang LIKE '%" + cmdarr + "%' or HoatChat LIKE '%" + cmdarr + "%' or HangSX LIKE '%" + cmdarr + "%' or MaHang LIKE '%" + cmdarr + "%' or TenHang LIKE '%" + cmdarr + "%'";
            db.query(sqlstring, function (err, result) {
                if (err) throw err
                //res.json(result);
                var tsp = result
                let sqlstring = "select NhomHang,MaHang,TenHang,HoatChat,HamLuong,HangSX,NuocSX,QCDG,GiaBan,DVT,HinhAnh,MoTa,TonKho,DaDat,ConLai,KhachDat,DangKD,BanChay,SPmoi,HDnhanh,GHnhanh,SVip,NhiKhoa,NhaKhoa,SanKhoa,DaLieu,NTHop,ThanKinh,BV,FlashSale,PhanTramKM from sanpham WHERE NhomHang LIKE '%" + cmdarr + "%' or HoatChat LIKE '%" + cmdarr + "%' or HangSX LIKE '%" + cmdarr + "%' or MaHang LIKE '%" + cmdarr + "%' or TenHang LIKE '%" + cmdarr + "%' LIMIT 30 OFFSET " + offset + "";
                db.query(sqlstring, tsp, function (err, result) {
                    if (err) throw err
                    let magSP = []
                    if (result.length > 0) {
                        result.forEach(ee2 => {
                            if (ee2.DangKD == 1) {
                                magSP.push({
                                    ...ee2,
                                    ...{ SoLuong: 0 }
                                })
                            }
                        });
                    }
                    set(req.body.sercmdarr + req.body.sotrang, JSON.stringify({ tong: tsp, mang: magSP }))
                    res.json({ tong: tsp, mang: magSP });
                });
            })
        }
    },
    searchFrontapp: (req, res) => {
        var sotrang = req.body.sotrang;
        var cmdarr = req.body.sercmdarr;
        var offset = (sotrang - 1) * 10
        if (cmdarr == 'Tất Cả Sản Phẩm') {
            let sqlstring = "select count(*) from sanpham";
            db.query(sqlstring, function (err, result) {
                if (err) throw err
                //res.json(result);
                var tsp = result
                let sqlstring = "select NhomHang,MaHang,TenHang,HoatChat,HamLuong,HangSX,NuocSX,QCDG,GiaBan,DVT,HinhAnh,MoTa,TonKho,DaDat,ConLai,KhachDat,DangKD,BanChay,SPmoi,HDnhanh,GHnhanh,SVip,NhiKhoa,NhaKhoa,SanKhoa,DaLieu,NTHop,ThanKinh,BV,FlashSale,PhanTramKM from sanpham  LIMIT 10 OFFSET " + offset + "";
                db.query(sqlstring, tsp, function (err, result) {
                    if (err) throw err
                    // console.log(result)
                    let magSP = []
                    if (result.length > 0) {
                        result.forEach(ee2 => {
                            if (ee2.DangKD == 1) {
                                magSP.push({
                                    ...ee2,
                                    ...{ SoLuong: 0 }
                                })
                            }
                        });
                    }
                    if (magSP.length > 0) {
                        setapp(req.body.sercmdarr + req.body.sotrang, JSON.stringify({ tong: tsp, mang: magSP }))
                    }

                    res.json({ tong: tsp, mang: magSP });
                });
            });
        } else {
            let sqlstring = "select count(*) from sanpham WHERE NhomHang LIKE '%" + cmdarr + "%' or HoatChat LIKE '%" + cmdarr + "%' or HangSX LIKE '%" + cmdarr + "%' or MaHang LIKE '%" + cmdarr + "%' or TenHang LIKE '%" + cmdarr + "%'";
            db.query(sqlstring, function (err, result) {
                if (err) throw err
                //res.json(result);
                var tsp = result
                let sqlstring = "select NhomHang,MaHang,TenHang,HoatChat,HamLuong,HangSX,NuocSX,QCDG,GiaBan,DVT,HinhAnh,MoTa,TonKho,DaDat,ConLai,KhachDat,DangKD,BanChay,SPmoi,HDnhanh,GHnhanh,SVip,NhiKhoa,NhaKhoa,SanKhoa,DaLieu,NTHop,ThanKinh,BV,FlashSale,PhanTramKM from sanpham WHERE NhomHang LIKE '%" + cmdarr + "%' or HoatChat LIKE '%" + cmdarr + "%' or HangSX LIKE '%" + cmdarr + "%' or MaHang LIKE '%" + cmdarr + "%' or TenHang LIKE '%" + cmdarr + "%' LIMIT 10 OFFSET " + offset + "";
                db.query(sqlstring, tsp, function (err, result) {
                    if (err) throw err
                    let magSP = []
                    if (result.length > 0) {
                        result.forEach(ee2 => {
                            if (ee2.DangKD == 1) {
                                magSP.push({
                                    ...ee2,
                                    ...{ SoLuong: 0 }
                                })
                            }
                        });
                    }
                    setapp(req.body.sercmdarr + req.body.sotrang, JSON.stringify({ tong: tsp, mang: magSP }))
                    res.json({ tong: tsp, mang: magSP });
                });
            })
        }
    },

    searchFrontSuaDonHang: async (req, res) => {
        var sotrang = req.body.sotrang;
        var cmdarr = req.body.sercmdarr;
        var offset = (sotrang - 1) * 30
        if (cmdarr == 'Tất Cả Sản Phẩm') {
            let sqlstring = "select count(*) from sanpham";
            db.query(sqlstring, async function (err, aa) {
                if (err) throw err
                //res.json(result);
                var tsp = aa
                let sqlstring = "select NhomHang,MaHang,TenHang,HoatChat,HamLuong,HangSX,NuocSX,QCDG,GiaBan,DVT,HinhAnh,MoTa,TonKho,DaDat,ConLai,KhachDat,DangKD,BanChay,SPmoi,HDnhanh,GHnhanh,SVip,NhiKhoa,NhaKhoa,SanKhoa,DaLieu,NTHop,ThanKinh,BV,FlashSale,PhanTramKM from sanpham LIMIT 30 OFFSET " + offset + "";
                db.query(sqlstring, tsp, async function (err, result) {
                    if (err) throw err
                    let magSP = []
                    if (result.length > 0) {
                        result.forEach(async ee => {
                            let abc = { ...ee, ...{ SoLuong: 0 } }
                            magSP.push(abc)
                        });
                    }
                    res.json({ tong: tsp, mang: magSP });
                });
            });
        } else {
            let sqlstring = "select count(*) from sanpham WHERE NhomHang LIKE '%" + cmdarr + "%' or HoatChat LIKE '%" + cmdarr + "%' or HangSX LIKE '%" + cmdarr + "%' or MaHang LIKE '%" + cmdarr + "%' or TenHang LIKE '%" + cmdarr + "%'";
            await db.query(sqlstring, async function (err, aa) {
                if (err) throw err
                //res.json(result);
                var tsp = aa
                let sqlstring = "select NhomHang,MaHang,TenHang,HoatChat,HamLuong,HangSX,NuocSX,QCDG,GiaBan,DVT,HinhAnh,MoTa,TonKho,DaDat,ConLai,KhachDat,DangKD,BanChay,SPmoi,HDnhanh,GHnhanh,SVip,NhiKhoa,NhaKhoa,SanKhoa,DaLieu,NTHop,ThanKinh,BV,FlashSale,PhanTramKM from sanpham WHERE NhomHang LIKE '%" + cmdarr + "%' or HoatChat LIKE '%" + cmdarr + "%' or HangSX LIKE '%" + cmdarr + "%' or MaHang LIKE '%" + cmdarr + "%' or TenHang LIKE '%" + cmdarr + "%' LIMIT 30 OFFSET " + offset + "";
                await db.query(sqlstring, tsp, async function (err, result) {
                    if (err) throw err
                    let magSP = []
                    if (result.length > 0) {
                        result.forEach(async ee => {
                            let abc = { ...ee, ...{ SoLuong: 0 } }
                            magSP.push(abc)
                        });
                    }
                    res.json({ tong: tsp, mang: magSP });
                });
            })
        }
    },

    searchKhuyenMai: (req, res) => {
        var sotrang = req.body.sotrang;
        var cmdarr = req.body.sercmdarr;
        var offset = (sotrang - 1) * 30
        if (cmdarr == 'Tất Cả Sản Phẩm KM') {
            let sqlstring = "select count(*) from sanpham where PhanTramKM > 0 OR FlashSale = 1";
            db.query(sqlstring, function (err, result) {
                if (err) throw err
                //res.json(result);
                var tsp = result
                let sqlstring = "select NhomHang,MaHang,TenHang,HoatChat,HamLuong,HangSX,NuocSX,QCDG,GiaBan,DVT,HinhAnh,MoTa,TonKho,DaDat,ConLai,KhachDat,DangKD,BanChay,SPmoi,HDnhanh,GHnhanh,SVip,NhiKhoa,NhaKhoa,SanKhoa,DaLieu,NTHop,ThanKinh,BV,FlashSale,PhanTramKM from sanpham where PhanTramKM > 0  OR FlashSale = 1 LIMIT 30 OFFSET " + offset + "";
                db.query(sqlstring, tsp, function (err, result) {
                    if (err) throw err
                    // console.log(result)
                    let magSP = []
                    if (result.length > 0) {
                        magSP = result;
                        for (let i = 0; i < result.length; i++) {
                            magSP[i] = {
                                ...magSP[i], ...{ SoLuong: 0 }
                            }
                        }
                    }
                    set(req.body.sercmdarr + req.body.sotrang, JSON.stringify({ tong: tsp, mang: magSP }))
                    res.json({ tong: tsp, mang: magSP });
                });
            });
        } else {
            let sqlstring = "select count(*) FROM (select * from sanpham WHERE PhanTramKM > 0 OR FlashSale = 1)AS T WHERE HoatChat LIKE '%" + cmdarr + "%' or HangSX LIKE '%" + cmdarr + "%' or TenHang LIKE '%" + cmdarr + "%' ";
            db.query(sqlstring, function (err, result) {
                if (err) throw err
                //res.json(result);
                var tsp = result
                let sqlstring = "select NhomHang,MaHang,TenHang,HoatChat,HamLuong,HangSX,NuocSX,QCDG,GiaBan,DVT,HinhAnh,MoTa,TonKho,DaDat,ConLai,KhachDat,DangKD,BanChay,SPmoi,HDnhanh,GHnhanh,SVip,NhiKhoa,NhaKhoa,SanKhoa,DaLieu,NTHop,ThanKinh,BV,FlashSale,PhanTramKM FROM (select * from sanpham WHERE PhanTramKM > 0 OR FlashSale = 1)AS T WHERE HoatChat LIKE '%" + cmdarr + "%' or HangSX LIKE '%" + cmdarr + "%' or TenHang LIKE '%" + cmdarr + "%' LIMIT 30 OFFSET " + offset + "";
                db.query(sqlstring, tsp, function (err, result) {
                    if (err) throw err
                    let magSP = []
                    if (result.length > 0) {
                        magSP = result
                        for (let i = 0; i < result.length; i++) {
                            magSP[i] = {
                                ...magSP[i], ...{ SoLuong: 0 }
                            }
                        }
                    }
                    set(req.body.sercmdarr + req.body.sotrang, JSON.stringify({ tong: tsp, mang: magSP }))
                    res.json({ tong: tsp, mang: magSP });
                });
            })
        }
    },
    searchKhuyenMaiapp: (req, res) => {
        var sotrang = req.body.sotrang;
        var cmdarr = req.body.sercmdarr;
        var offset = (sotrang - 1) * 10
        if (cmdarr == 'Tất Cả Sản Phẩm KM') {
            let sqlstring = "select count(*) from sanpham where PhanTramKM > 0 OR FlashSale = 1";
            db.query(sqlstring, function (err, result) {
                if (err) throw err
                //res.json(result);
                var tsp = result
                let sqlstring = "select NhomHang,MaHang,TenHang,HoatChat,HamLuong,HangSX,NuocSX,QCDG,GiaBan,DVT,HinhAnh,MoTa,TonKho,DaDat,ConLai,KhachDat,DangKD,BanChay,SPmoi,HDnhanh,GHnhanh,SVip,NhiKhoa,NhaKhoa,SanKhoa,DaLieu,NTHop,ThanKinh,BV,FlashSale,PhanTramKM from sanpham where PhanTramKM > 0  OR FlashSale = 1 LIMIT 10 OFFSET " + offset + "";
                db.query(sqlstring, tsp, function (err, result) {
                    if (err) throw err
                    // console.log(result)
                    let magSP = []
                    if (result.length > 0) {
                        magSP = result;
                        for (let i = 0; i < result.length; i++) {
                            magSP[i] = {
                                ...magSP[i], ...{ SoLuong: 0 }
                            }
                        }
                    }
                    setapp(req.body.sercmdarr + req.body.sotrang, JSON.stringify({ tong: tsp, mang: magSP }))
                    res.json({ tong: tsp, mang: magSP });
                });
            });
        } else {
            let sqlstring = "select count(*) FROM (select * from sanpham WHERE PhanTramKM > 0 OR FlashSale = 1)AS T WHERE HoatChat LIKE '%" + cmdarr + "%' or HangSX LIKE '%" + cmdarr + "%' or TenHang LIKE '%" + cmdarr + "%' ";
            db.query(sqlstring, function (err, result) {
                if (err) throw err
                //res.json(result);
                var tsp = result
                let sqlstring = "select NhomHang,MaHang,TenHang,HoatChat,HamLuong,HangSX,NuocSX,QCDG,GiaBan,DVT,HinhAnh,MoTa,TonKho,DaDat,ConLai,KhachDat,DangKD,BanChay,SPmoi,HDnhanh,GHnhanh,SVip,NhiKhoa,NhaKhoa,SanKhoa,DaLieu,NTHop,ThanKinh,BV,FlashSale,PhanTramKM FROM (select * from sanpham WHERE PhanTramKM > 0 OR FlashSale = 1)AS T WHERE HoatChat LIKE '%" + cmdarr + "%' or HangSX LIKE '%" + cmdarr + "%' or TenHang LIKE '%" + cmdarr + "%' LIMIT 10 OFFSET " + offset + "";
                db.query(sqlstring, tsp, function (err, result) {
                    if (err) throw err
                    let magSP = []
                    if (result.length > 0) {
                        magSP = result
                        for (let i = 0; i < result.length; i++) {
                            magSP[i] = {
                                ...magSP[i], ...{ SoLuong: 0 }
                            }
                        }
                    }
                    setapp(req.body.sercmdarr + req.body.sotrang, JSON.stringify({ tong: tsp, mang: magSP }))
                    res.json({ tong: tsp, mang: magSP });
                });
            })
        }
    },
    slideKhuyenMai: (req, res) => {
        let sqlstring = "select NhomHang,MaHang,TenHang,HoatChat,HamLuong,HangSX,NuocSX,QCDG,GiaBan,DVT,HinhAnh,MoTa,TonKho,DaDat,ConLai,KhachDat,DangKD,BanChay,SPmoi,HDnhanh,GHnhanh,SVip,NhiKhoa,NhaKhoa,SanKhoa,DaLieu,NTHop,ThanKinh,BV,FlashSale,PhanTramKM FROM sanpham WHERE PhanTramKM > 0 OR FlashSale = 1 LIMIT 20";
        db.query(sqlstring, function (err, result) {
            if (err) throw err
            let magSP = []
            if (result.length > 0) {
                magSP = result
                for (let i = 0; i < result.length; i++) {
                    magSP[i] = {
                        ...magSP[i], ...{ SoLuong: 0 }
                    }
                }
            }
            // set(key, magSP)
            set("/slidekhuyenmai", JSON.stringify({ mang: magSP }))
            res.json({ mang: magSP });
        });


    },
    slideBanChay: (req, res) => {
        let sqlstring = "select NhomHang,MaHang,TenHang,HoatChat,HamLuong,HangSX,NuocSX,QCDG,GiaBan,DVT,HinhAnh,MoTa,TonKho,DaDat,ConLai,KhachDat,DangKD,BanChay,SPmoi,HDnhanh,GHnhanh,SVip,NhiKhoa,NhaKhoa,SanKhoa,DaLieu,NTHop,ThanKinh,BV,FlashSale,PhanTramKM FROM sanpham WHERE BanChay = 1 LIMIT 20";
        db.query(sqlstring, function (err, result) {
            if (err) throw err
            let magSP = []
            if (result.length > 0) {
                magSP = result;
                for (let i = 0; i < result.length; i++) {
                    magSP[i] = {
                        ...magSP[i], ...{ SoLuong: 0 }
                    }
                }
            }
            // set(key, magSP)
            set("/slidebanchay", JSON.stringify({ mang: magSP }))
            res.json({ mang: magSP });
        });


    },
    slideFlashSale: (req, res) => {
        let sqlstring = "select NhomHang,MaHang,TenHang,HoatChat,HamLuong,HangSX,NuocSX,QCDG,GiaBan,DVT,HinhAnh,MoTa,TonKho,DaDat,ConLai,KhachDat,DangKD,BanChay,SPmoi,HDnhanh,GHnhanh,SVip,NhiKhoa,NhaKhoa,SanKhoa,DaLieu,NTHop,ThanKinh,BV,FlashSale,PhanTramKM FROM sanpham WHERE FlashSale = 1 LIMIT 20";
        db.query(sqlstring, function (err, result) {
            if (err) throw err
            let magSP = []
            if (result.length > 0) {
                magSP = result;
                for (let i = 0; i < result.length; i++) {
                    magSP[i] = {
                        ...magSP[i], ...{ SoLuong: 0 }
                    }
                }
            }
            // set(key, magSP)
            set("/slideflashsale", JSON.stringify({ mang: magSP }))
            res.json({ mang: magSP });
        });


    },
    //hàm tìm theo table
    selectAll: (req, res) => {
        var tencot = req.body.sertable;
        var bang;
        if (parseInt(tencot) == 0) {
        } else {
            switch (parseInt(tencot)) {
                case 1:
                    bang = "nhomhang";
                    break;
                case 2:
                    bang = "hoatchat";
                    break;
                case 3:
                    bang = "hangsanxuat";
                    break;
                case 4:
                    bang = "nuocsanxuat";
                    break;
                default:
                    break;
            }
            let sql = "select * from  " + bang + "";
            db.query(sql, function (err, result) {
                if (err) throw err;
                res.json(result);
            });
        }
    },

    //hàm tìm theo cột trong table sanpham
    selectCol: (req, res) => {
        var tencot = req.body.sercol;
        var col;
        if (parseInt(tencot) == 0) {
        } else {
            switch (parseInt(tencot)) {
                case 1:
                case 5:
                    col = "MaHang";
                    break;
                case 6:
                    col = "SoDangKy";
                    break;
                default:
                    break;
            }
            let sql = "select " + col + " from sanpham";
            db.query(sql, function (err, result) {
                if (err) throw err;
                res.json(result);
            });
        }
    },

    //hàm tìm theo cột
    selectAllSP: (req, res) => {
        var tables;
        var mang = [];
        var cmdarr = req.body.sercmdarr;
        var sqlstring = "select * from sanpham where ";
        for (i = 0; i < cmdarr.length; i++) {
            if (i == 0) {
                switch (parseInt(cmdarr[i].table)) {
                    case 1:
                        tables = "nhomhang";
                        break;
                    case 2:
                        tables = "hoatchat";
                        break;
                    case 3:
                        tables = "HangSX";
                        break;
                    case 4:
                        tables = "NuocSX";
                        break;
                    case 5:
                        tables = "MaHang";
                        break;
                    case 6:
                        tables = "SoDangKy";
                    case 7:
                        tables = "DangKD";
                        break;
                    case 8:
                        tables = "HoaDon";
                        break;
                    case 9:
                        tables = "TinhDS";
                        break;
                    default:
                        break;
                }
            } else {
                switch (parseInt(cmdarr[i].table)) {
                    case 1:
                        tables = " AND nhomhang";
                        break;
                    case 2:
                        tables = " AND hoatchat";
                        break;
                    case 3:
                        tables = " AND HangSX";
                        break;
                    case 4:
                        tables = " AND NuocSX";
                        break;
                    case 5:
                        tables = " AND MaHang";
                        break;
                    case 6:
                        tables = " AND SoDangKy";
                        break;
                    case 7:
                        tables = " AND DangKD";
                        break;
                    case 8:
                        tables = " AND HoaDon";
                        break;
                    case 9:
                        tables = " AND TinhDS";
                        break;
                    default:
                        break;
                }
            }
            if (cmdarr[i].item == "Có") {
                cmdarr[i].item = 1;
            } else if (cmdarr[i].item == "Không") {
                cmdarr[i].item = 0;
            }
            sqlstring = sqlstring + tables + "=" + "'" + cmdarr[i].item + "'";
            mang.push({ tb: tables, it: cmdarr[i].item })
        }
        db.query(sqlstring, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
    },
    selectAllSP2: (req, res) => {
        var tables;
        var mang = [];
        var cmdarr = req.body.sercmdarr;
        var sqlstring = "select * from sanpham where ";
        for (i = 0; i < cmdarr.length; i++) {
            if (i == 0) {
                switch (parseInt(cmdarr[i].table)) {
                    case 1:
                        tables = "MaHang";
                        break;
                    case 2:
                        tables = "DangKD";
                        break;
                    case 3:
                        tables = "TinhDS";
                        break;
                    case 4:
                        tables = "BanChay";
                        break;
                    case 5:
                        tables = "SPmoi";
                        break;
                    case 6:
                        tables = "HDnhanh";
                    case 7:
                        tables = "GHnhanh";
                        break;
                    case 8:
                        tables = "SVip";
                        break;
                    case 9:
                        tables = "NhiKhoa";
                        break;
                    case 10:
                        tables = "NhaKhoa";
                        break;
                    case 11:
                        tables = "SanKhoa";
                        break;
                    case 12:
                        tables = "DaLieu";
                        break;
                    case 13:
                        tables = "NTHop";
                        break;
                    case 14:
                        tables = "ThanKinh";
                        break;
                    case 15:
                        tables = "BV";
                        break;
                    case 16:
                        tables = "FlashSale";
                        break;
                    default:
                        break;
                }
            } else {
                switch (parseInt(cmdarr[i].table)) {
                    case 1:
                        tables = "AND MaHang";
                        break;
                    case 2:
                        tables = "AND DangKD";
                        break;
                    case 3:
                        tables = "AND TinhDS";
                        break;
                    case 4:
                        tables = "AND BanChay";
                        break;
                    case 5:
                        tables = "AND SPmoi";
                        break;
                    case 6:
                        tables = "AND HDnhanh";
                    case 7:
                        tables = "AND GHnhanh";
                        break;
                    case 8:
                        tables = "AND SVip";
                        break;
                    case 9:
                        tables = "AND NhiKhoa";
                        break;
                    case 10:
                        tables = "AND NhaKhoa";
                        break;
                    case 11:
                        tables = "AND SanKhoa";
                        break;
                    case 12:
                        tables = "AND DaLieu";
                        break;
                    case 13:
                        tables = "AND NTHop";
                        break;
                    case 14:
                        tables = "AND ThanKinh";
                        break;
                    case 15:
                        tables = "AND BV";
                        break;
                    case 16:
                        tables = "AND FlashSale";
                        break;
                    default:
                        break;
                }
            }
            if (cmdarr[i].item == "Có") {
                cmdarr[i].item = 1;
            } else if (cmdarr[i].item == "Không") {
                cmdarr[i].item = 0;
            }
            sqlstring = sqlstring + tables + "=" + "'" + cmdarr[i].item + "'";
            mang.push({ tb: tables, it: cmdarr[i].item })
        }
        db.query(sqlstring, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
    }

}
