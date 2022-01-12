'use strict'
const db = require('../db')
const table = 'combostatistic'

module.exports = {

    getComboStatistic: async (req, res) => {
        let sql = 'SELECT * FROM ' + table;
        db.query(sql, async (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },



    addComboStatistic: (req, res) => {
        let comboStatistic = req.body.data
        // console.log(comboStatistic)
        let thang = "" + (parseInt(new Date().getMonth()) + 1)
        if (thang.length == 1) {
            thang = "0" + thang
        }
        const toDay = new Date().getFullYear() + "-" + thang + "-" + new Date().getDate()

        comboStatistic.forEach(element => {
            element.NgayXuLy = toDay
            const nam2 = element.NgayDatHang.slice(0, 4)
            const thang2 = element.NgayDatHang.slice(5, 7)
            const ngay2 = "" + element.NgayDatHang.slice(8, 10)
            element.NgayDatHang = nam2 + '-' + thang2 + '-' + ngay2
            const sql = `insert into ` + table + ` set ? `
            db.query(sql, [element], (err1, res1) => {
                if (err1) {
                    throw err1
                } 
            })
        });
        res.json(`OK`)
    },

    deleteComboStatistic: (req, res) => {
        const idToDelete = req.body.data
        const sql2 = `delete from combostatistic where MaDatHang = ?`
        db.query(sql2, [idToDelete], (err1, res1) => {
            if (err1) {
                throw err1
            }
            res.json('OK')
        })
    },

}