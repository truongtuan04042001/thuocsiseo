'use strict'
const db = require('./../db')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const redis = require("redis")
const PORT_REDIS = process.env.PORT || 6379
const redisClient = redis.createClient(PORT_REDIS)
const set = (key, value) => {
    redisClient.set(key, JSON.stringify(value),'EX',60*60);
}
module.exports = {
    danhMucNhomHang: (req, res) => {
        let sqlstring = "select * from nhomhang";
        db.query(sqlstring, function (err, result) {
            set("/danhmucnhomhang",result)
            res.json(result);
        })
    },
    danhMucHSX: (req, res) => {
        let sqlstring = "select * from hangsanxuat";
        db.query(sqlstring, function (err, result) {
            set("/danhmuchsx",result)
            res.json(result);
        })
    },
}