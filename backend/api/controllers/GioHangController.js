'use strict'
const redis = require("redis")
const PORT_REDIS = process.env.PORT || 6379
const redisClient = redis.createClient(PORT_REDIS)


module.exports = {

    setGioHang: (req, res) => {
        const { maNV } = req.params
        const data = req.body
        const key = `KH${maNV}`
        if (key != `KHnull` && key != `KHundefined`) {
            redisClient.set(key, JSON.stringify(data));
        }
        redisClient.del('/KHnull')
        redisClient.del('/KHundefined')
        redisClient.del('/null')
        redisClient.del('/undefined')
        res.json({ OK: "OK" })
    },

    getGioHang: (req, res) => {
        const { maNV } = req.params
        const key = `KH${maNV}`
        if (key != `KHnull` && key != `KHundefined`) {
            // console.log(`${new Date().getTime()} maNV=`, key)
            // console.log(`${new Date().getTime()} typeof=`, typeof key)
            redisClient.get(key, (error, data) => {
                if (error) res.status(400).send(err);
                if (data === null || data === undefined) {
                    redisClient.set(key, JSON.stringify({ gioHang: [] }));
                    res.json({ gioHang: [] })
                } else {
                    let value = JSON.parse(data)
                    if (value.gioHang.length != 0) {
                        res.json(JSON.parse(data))
                    } else {
                        redisClient.set(key, JSON.stringify({ gioHang: [] }));
                        res.json({ gioHang: [] })
                    }
                }
            });
        } else {
            res.json({ gioHang: [] })
        }
    }
}