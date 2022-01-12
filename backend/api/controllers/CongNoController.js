'use strict'
const db = require('./../db')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {

    CongNoKH: (req, res) => {
        let sql = "SELECT * FROM donhang WHERE CongNo > 0  AND (TrangThai='Đã xử lý' OR TrangThai='Hoàn thành' )";
        db.query(sql, function (err, resultfull) {
            if (err) throw err;
            let sql2 = "SELECT * FROM (SELECT * FROM donhang ORDER BY NgayXuLy DESC) as NgayXL WHERE CongNo > 0 AND (TrangThai='Đã xử lý' OR TrangThai='Hoàn thành' ) GROUP BY MaKhachHang  ORDER BY NgayXuLy DESC;";
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
                cnkhArr.forEach(ee => {
                    try {
                        let tmp = ee.NgayXuLy
                        tmp.setDate(tmp.getDate() + 1)
                        ee.NgayXuLy = tmp
                    } catch (err) {

                    }
                });
                res.json(cnkhArr)
            });

        });
    },

    CongNoNCC: (req, res) => {
        let sql = "SELECT * FROM donhangnhap WHERE CongNo > 0 ";
        db.query(sql, function (err, resultfull) {
            if (err) throw err;
            let sql2 = "SELECT * FROM (SELECT * FROM donhangnhap ORDER BY NgayNhapHang DESC) as NgayNH WHERE  CongNo > 0 GROUP BY SDT ORDER BY NgayNhapHang DESC;";
            // let sql2 = "SELECT * FROM donhangnhap WHERE CongNo > 0 GROUP by SDT";
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
                cnnccArr.forEach(ee => {
                    try {
                        let tmp = ee.NgayNhapHang
                        tmp.setDate(tmp.getDate() + 1)
                        ee.NgayNhapHang = tmp
                    } catch (err) {

                    }
                });
                res.json(cnnccArr)
            });

        });
    },

    GetTC: (req, res) => {
        let sql = "SELECT * FROM thuchi ORDER BY NgayTC DESC";
        db.query(sql, function (err, result) {
            if (err) throw err;
            result.forEach(ee => {
                if (ee.NgayTC.length > 0) {
                    try {
                        let tmp = ee.NgayTC
                        tmp.setDate(tmp.getDate() + 1)
                        ee.NgayTC = tmp
                    } catch (err) {

                    }
                }
            });
            res.json(result)

        });
    },

    AddTC: (req, res) => {
        const KhoanTC = req.body.KhoanTC;
        const NoiDungTC = req.body.NoiDungTC;
        const LoaiTC = req.body.LoaiTC;
        const TienTC = req.body.TienTC;
        const TenNguoiTC = req.body.TenNguoiTC;
        const NgayTC = req.body.NgayTC;
        const sql = `insert into thuchi (KhoanTC,NoiDungTC,LoaiTC,TienTC,TenNguoiTC,NgayTC) values (?,?,?,?,?,?);`;
        db.query(sql, [KhoanTC, NoiDungTC, LoaiTC, TienTC, TenNguoiTC, NgayTC], (err, result) => {
            if (err) throw err;
            res.json(result)

        });
    },

    // AddTC: (req, res) => {
    //     var KhoanTC = req.body.KhoanTC;
    //     var NoiDungTC = req.body.NoiDungTC;
    //     var LoaiTC = req.body.LoaiTC;
    //     var TienTC = req.body.TienTC;
    //     var TenNguoiTC = req.body.TenNguoiTC;
    //     var NgayTC = req.body.NgayTC;
    //     let sql = "insert into thuchi (KhoanTC,NoiDungTC,LoaiTC,TienTC,TenNguoiTC,NgayTC) values ('" + KhoanTC + "','" + NoiDungTC + "','" + LoaiTC + "','" + TienTC + "','" + TenNguoiTC + "','" + NgayTC + "')";
    //     db.query(sql,function (err, result) {
    //         if (err) throw err;
    //         res.json(result)
    //     });
    // },

    FixTC: (req, res) => {
        const data = req.body.data;
        var Id = req.body.Id;
        let sql = "update thuchi set ? where Id= ?";
        db.query(sql, [data, Id], function (err, result) {
            if (err) throw err;
            res.json(result)

        });
    },
    DelTC: (req, res) => {
        var Id = req.body.Id;
        let sql = "delete from thuchi where Id = ?";
        db.query(sql, [Id], function (err, result) {
            if (err) throw err;
            res.json(result)

        });
    },

}
