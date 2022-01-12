'use strict'
const db = require('../db')

module.exports = {


    getProductsInListIdComboForBtnCompleteOrders: (req, res) => {
        const arrStrIdCombo = req.body.arrStrIdCombo
        if (arrStrIdCombo.length > 0) {
            let aa1 = `select IdCombo, MaHang, SoLuong from combo_detail where IdCombo in(`
            for (let i = 0; i < arrStrIdCombo.length; i++) {
                const ee1 = arrStrIdCombo[i];
                if (i == arrStrIdCombo.length - 1) {
                    aa1 += "'" + ee1 + "'"
                } else {
                    aa1 += "'" + ee1 + "',"
                }
            }
            aa1 += `) order by IdCombo, MaHang;`
            db.query(aa1, (err1, res1) => {
                if (err1) {
                    throw err1
                }
                res.json(res1)
            })
        } else {
            res.json([])
        }

    },
    
    getProductsInListIdCombo: (req, res) => {
        const data = req.body.data
        if (data.length > 0) {
            let aa1 = `select IdCombo, TenHang, SoLuong, DVT from combo_detail where IdCombo in(`
            for (let i = 0; i < data.length; i++) {
                const ee1 = data[i];
                if (i == data.length - 1) {
                    aa1 += "'" + ee1 + "'"
                } else {
                    aa1 += "'" + ee1 + "',"
                }
            }
            aa1 += `) order by IdCombo, TenHang;`
            // aa1 += `) order by TenHang;`
            db.query(aa1, (err1, res1) => {
                if (err1) {
                    throw err1
                }
                res.json(res1)
            })
        } else {
            res.json(`NOTOK`)
        }

    },

    getListComboDetailWith: (req, res) => {
        const sql = `select * from combo_detail`
        db.query(sql, (err1, res1) => {
            if (err1) {
                throw err1
            }
            res.json(res1)
        })
    },

    getListComboDetailWithIdCombo: (req, res) => {
        const idCombo = req.params.idCombo
        const sql = `select * from combo_detail where IdCombo = ?`
        db.query(sql, [idCombo], (err1, res1) => {
            if (err1) {
                throw err1
            }
            res.json(res1)
        })
    },

    addItemComboDetail: (req, res) => {
        const data = req.body.data
        const sql = `insert into combo_detail set ?`
        if (data.length > 0) {
            data.forEach(ee1 => {
                db.query(sql, [ee1], (err1, res1) => {
                    if (err1) {
                        throw err1
                    }
                })
            });
            res.json(`OK`)
        } else {
            res.json(`NOTOK`)
        }

    },

    updateItemComboDetail: (req, res) => {
        const idCombo = req.params.idCombo
        const data = req.body.data
        const sql = `delete from combo_detail where IdCombo = ?`
        db.query(sql, [idCombo], (err1, res1) => {
            if (err1) {
                throw err1
            }
            if (data.length > 0) {
                const sql2 = `insert into combo_detail set ?`
                data.forEach(ee1 => {
                    db.query(sql2, [ee1], (err2, res2) => {
                        if (err2) {
                            throw err2
                        }
                    })
                });
                res.json(`OK`)
            } else {
                res.json(`NOTOK`)
            }
        })

    },

    deleteItemComboDetail: (req, res) => {
        const id = req.params.id
        const sql = `delete from combo_detail where Id = ?`
        db.query(sql, [id], (err1, res1) => {
            if (err1) {
                throw err1
            }
            res.json(res1)
        })
    },

}