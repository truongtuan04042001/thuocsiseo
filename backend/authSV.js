// const fs = require('fs');
const mysql = require('mysql');
const cors = require('cors')
const multer = require('multer');
const express = require('express');
const readXlsxFile = require('read-excel-file/node');
const app = express();
const md5 = require('./md5/md5')

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
//const redis = require("redis");
//const PORT_REDIS = process.env.PORT || 6379;
//const redisClient = redis.createClient(PORT_REDIS);
//const set = (key, value) => {
//	redisClient.set(key, JSON.stringify(value));
//}

// const get = (req, res, next) => {
// 	let key = req.route.path;
// 	redisClient.get(key, (error, data) => {
// 		if (error) res.status(400).send(err);
// 		if (data !== null)
// 			res.status(200).send(JSON.parse(data));
// 		else next();
// 	});
// }

const port = 3200;
const {host, user, password, database } = require('./constants/constants')
app.use(cors())
app.use(express.urlencoded({ limit: '10mb', extended: true}))
app.use(express.json({ limit: '10mb', extended: true}))
//
let routes = require('./api/routes'); //importing route
routes(app)
//
global.__basedir = __dirname;


// tạo connection cho database
const con = mysql.createConnection({
	host: host,
	user: user,
	password: password,
	database: database
});
//

// mở connection tới database
con.connect((error) => {
	if (error) {
		console.error(error);
	} else {
		console.error('DB connected!')
	}
});

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/hack.html');
});

app.post('/test', (req, res) => {
	var maNV = "dwqdwqd"
	      const acctk=  jwt.sign(maNV, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'30s'});
	        res.json(acctk)

})

// Create a Server
app.listen(port, () => {
	console.log(`Started at http://localhost:${port}`)
	console.log('RESTful API server started on: ' + port)
});

//
//https://grokonez.com/node-js/nodejs-express-restapi-upload-import-excel-file-to-mysql-using-read-excel-file-multer
//https://viblo.asia/p/file-upload-voi-multer-nodejs-va-express-E375z4VdZGW