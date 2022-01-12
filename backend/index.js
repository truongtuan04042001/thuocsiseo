﻿// const fs = require('fs');
const mysql = require('mysql');
const cors = require('cors')
const multer = require('multer');
const express = require('express');
const readXlsxFile = require('read-excel-file/node');
const app = express();
const md5 = require('./md5/md5')
const download = require('image-downloader')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const redis = require("redis");
const PORT_REDIS = process.env.PORT || 6379;
const redisClient = redis.createClient(PORT_REDIS);

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

// const port = 3001
const { port, host, user, password, database } = require('./constants/constants')
app.use(cors())
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(express.json({ limit: '10mb', extended: true }))
app.use(express.static(__dirname + '/public'));
//
let routes = require('./api/routes'); //importing route
routes(app)
//
global.__basedir = __dirname;

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads')
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + "-" + file.originalname)
	}
})
var storagetrangthai = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads_TrangThai')
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + "-" + file.originalname)
	}
})
var storagethongtin = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads_ThongTin')
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + "-" + file.originalname)
	}
})
var storageImgDevice = multer.diskStorage({
	destination: async function (req, file, cb) {
		await cb(null, './public/uploads_Images')
	},
	filename: async function (req, file, cb) {
		await cb(null, req.params.MaHang + ".jpg")
	}
})
var storageImgBnDevice = multer.diskStorage({
	destination: async function (req, file, cb) {
		await cb(null, './public/uploads_Images')
	},
	filename: async function (req, file, cb) {
		await cb(null, req.params.TenBanner + req.params.Id + ".jpg")
	}
})
var storageImgVcDevice = multer.diskStorage({
	destination: async function (req, file, cb) {
		await cb(null, './public/uploads_Images')
	},
	filename: async function (req, file, cb) {
		await cb(null, req.params.TenQua + req.params.Id + ".jpg")
	}
})
var storageImgHdDevice = multer.diskStorage({
	destination: async function (req, file, cb) {
		await cb(null, './public/uploads_Images/Description_Images')
	},
	filename: async function (req, file, cb) {
		await cb(null, req.params.Name + ".jpg")
	}
})
var storageImgArticles = multer.diskStorage({
	destination: async function (req, file, cb) {
		await cb(null, './public/uploads_Images/Article_Images')
	},
	filename: async function (req, file, cb) {
		await cb(null, req.params.Name + ".jpg")
	}
})
var storageImgThumbnails = multer.diskStorage({
	destination: async function (req, file, cb) {
		await cb(null, './public/uploads_Images/Thumbnail_Images')
	},
	filename: async function (req, file, cb) {
		await cb(null, req.params.title + ".jpg")
	}
})
var upload = multer({ storage: storage })
var uploadtt = multer({ storage: storagetrangthai })
var uploadttin = multer({ storage: storagethongtin })
var uploadImgDevice = multer({ storage: storageImgDevice })
var uploadImgBnDevice = multer({ storage: storageImgBnDevice })
var uploadImgVcDevice = multer({ storage: storageImgVcDevice })
var uploadImgHdDevice = multer({ storage: storageImgHdDevice })
var uploadImgArticles = multer({ storage: storageImgArticles })
var uploadImgThumbnail = multer({ storage: storageImgThumbnails })
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

// app.get('/', function (req, res) {
// 	res.sendFile(__dirname + '/hack.html');
// });

//middleware xac nhan token
function authenToken(req, res, next) {
	var authohd = req.body.test
	var token = ""
	if (authohd != undefined) {
		token = authohd.split(' ')[1];
	}
	if (!token) res.sendStatus(401);
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
		//console.log(err,data);
		if (err) res.sendStatus(403);
		next();
	})
}

app.post('/log', (req, res) => {
	const logs = req.body.log
	const sql = `insert into log (Log) values (?)`;
	con.query(sql, [logs], (err, result) => {
		if (err) throw err;
		res.json(result);
	});
})

// app.post('/log',(req, res) => {
// 	var logs = req.body.log
// 	let sql = "insert into log (Log) values ('" + logs + "')";
// 	con.query(sql, function (err, result) {
// 		if (err) throw err;
// 		res.json(result);
// 	});
// })

app.post('/getredis', (req, res) => {
	var key = req.body.key
	redisClient.get(key, (error, data) => {
		if (error) res.status(400).send(err);
		if (data !== null) {
			//res.status(200).send(JSON.parse(data));
			//else next();
			console.log(data)
			res.json(data)
		} else {
			console.log("nothing")
			res.json("nothing")
		}

	});
})
app.post('/setredis', (req, res) => {
	var tennv = req.body.value
	var key = req.body.key
	var value2 = req.body.value2

	redisClient.set(key, JSON.stringify({ ten: tennv, tt: value2 }), 'EX', 60 * 60);
	res.json("ok")
})
app.post('/clearredis', (req, res) => {
	var key = req.body.key
	redisClient.del(key);
	res.json("ok")
})
//upload Image from Device
app.post("/uploadimgdevice/:MaHang", uploadImgDevice.single('imagedevice'), (req, res) => {
	try {
		const MaHang = req.params.MaHang;
		let sql_update = "UPDATE sanpham SET HinhAnh = 'https://api.thuocsionline.vn/uploads_Images/" + MaHang + ".jpg' WHERE MaHang= ?"
		con.query(sql_update, [MaHang], (err, response) => {
			if (err) throw err
			res.json("ok")
			redisClient.del('Sanpham')
			// console.log("cập nhật ảnh xong");
		})
	}
	catch (error) {

	}
})
//upload Image from Device
app.post("/uploadimgbndevice/:TenBanner/:Id", uploadImgBnDevice.single('imagebndevice'), (req, res) => {

	try {
		const Id = req.params.Id;
		const TenBanner = req.params.TenBanner;
		let tenbn = TenBanner + Id
		const fileImage = req.file.filename;
		// const fileImage = file.split("/");
		let sql_update = "UPDATE banner SET original = 'https://api.thuocsionline.vn/uploads_Images/" + tenbn + ".jpg' WHERE Id= ?"
		con.query(sql_update, [Id], (err, response) => {
			if (err) throw err
			res.json("ok")
			//redisClient.del('Sanpham')
			// console.log("cập nhật ảnh xong");
		})
	}
	catch (error) {

	}
})
//upload Image from Device
app.post("/uploadimgvcdevice/:TenQua/:Id", uploadImgVcDevice.single('imagevcdevice'), (req, res) => {
	try {
		const Id = req.params.Id;
		const TenQua = req.params.TenQua;
		let tenvc = TenQua + Id
		const fileImage = req.file.filename;
		// const fileImage = file.split("/");
		let sql_update = "UPDATE chuongtrinhkm SET LinkVoucher = 'https://api.thuocsionline.vn/uploads_Images/" + tenvc + ".jpg' WHERE Id= ?"
		con.query(sql_update, [Id], (err, response) => {
			if (err) throw err
			res.json("ok")
			//redisClient.del('Sanpham')
			// console.log("cập nhật ảnh xong");
		})
	}
	catch (error) {

	}
})
//upload Image from Device

//upload thumbnai image
app.post("/uploadimgthumbnail/:title/:author", uploadImgThumbnail.single('imagethumbnail'), (req, res) => {
	try {
		const Title = req.params.title;
		const Author = req.params.author;
		
	
		// const fileImage = file.split("/");
		let sql_update = "UPDATE article SET ThumbNail = 'https://api.thuocsionline.vn/uploads_Images/Thumbnail_Images/" + Title + ".jpg' WHERE Title= ? and Author=?"
		con.query(sql_update, [Title,Author], (err, response) => {
			if (err) throw err
			res.json("ok")
		})
	}
	catch (error) {

	}
})
//upload thumbnai image

app.post("/uploadimghddevice/:Name", uploadImgHdDevice.single('imagehddevice'), (req, res) => {
	try {
		const Id = req.params.Id;
		const Name = req.params.Name;
		res.json("https://api.thuocsionline.vn/uploads_Images/Description_Images/" + Name + ".jpg")
	
	}
	catch (error) {

	}
})
//upload Image from Device


//upload Image from articles
app.post("/uploadimagearticles/:Name", uploadImgArticles.single('imagearticles'), (req, res) => {
	try {
		const Id = req.params.Id;
		const Name = req.params.Name;
		res.json("https://api.thuocsionline.vn/uploads_Images/Article_Images/" + Name + ".jpg")
	
		
	}
	catch (error) {

	}
})
//upload Image from articles


app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
	const file = req.file
	if (!file) {
		const error = new Error('Please upload a file')
		error.httpStatusCode = 400
		return next(error)
	}
	importExcelData2MySQL(__basedir + '/uploads/' + req.file.filename);
	//	importExcelData3MySQL(__basedir + '/uploads/' + req.file.filename);
	res.json("đã import sản phẩm thành công");
	//res.send(file)
})
app.post('/updatetrangthai', uploadtt.single('updatett'), (req, res, next) => {
	const file = req.file
	if (!file) {
		const error = new Error('Please upload a file')
		error.httpStatusCode = 400
		return next(error)
	}
	//importExcelUpdate(__basedir + '/uploads_TrangThai/' + req.file.filename);
	var start = Date.now();
	readXlsxFile(__basedir + '/uploads_TrangThai/' + req.file.filename).then((rows) => {
		rows.shift();//bỏ dòng đầu của bảng excel
		let sqlstring = "select MaHang,TenHang,DangKD,TinhDS,BanChay,SPmoi,HDnhanh,GHnhanh,SVip,NhiKhoa,NhaKhoa,SanKhoa,DaLieu,NTHop,ThanKinh,BV,FlashSale,PhanTramKM from sanpham";
		con.query(sqlstring, [rows], function (err, result) {
			if (err) throw err
			let mangtudtb = [];
			let mangupdate = [];
			for (i = 0; i < result.length; i++) {
				mangtudtb.push(Object.values(result[i]))
			}
			for (i = 0; i < mangtudtb.length; i++) {
				if (JSON.stringify(mangtudtb[i]) !== JSON.stringify(rows[i])) {
					mangupdate.push(rows[i]);
				}
			}
			res.json(mangupdate)

		});


	})
	var end = Date.now();
	console.log(`Execution time: ${end - start} ms`);
})
app.post('/updatethongtin', uploadttin.single('updatettin'), (req, res, next) => {
	const file = req.file
	if (!file) {
		const error = new Error('Please upload a file')
		error.httpStatusCode = 400
		return next(error)
	}
	readXlsxFile(__basedir + '/uploads_ThongTin/' + req.file.filename).then((rows) => {
		rows.shift();//bỏ dòng đầu của bảng excel

		let sqlstring = "select LoaiHang,NhomHang,NhanhHang,MaHang,TenHang,SoDangKy,HoatChat,HamLuong,HangSX,NuocSX,QCDG,GiaBan,GiaVon,DVT,HinhAnh,DangKD,TinhDS,BanChay,SPmoi,HDnhanh,GHnhanh,SVip,NhiKhoa,NhaKhoa,SanKhoa,DaLieu,NTHop,ThanKinh,BV,FlashSale,PhanTramKM from sanpham";
		con.query(sqlstring, [rows], function (err, result) {

			if (err) throw err
			let mangtudtb = [];
			let mangupdate = [];

			for (i = 0; i < rows.length; i++) {
				rows[i].splice(15, 5);
			}
			for (i = 0; i < result.length; i++) {
				mangtudtb.push(Object.values(result[i]))
			}
			for (i = 0; i < mangtudtb.length; i++) {
				if (JSON.stringify(mangtudtb[i]) !== JSON.stringify(rows[i])) {
					mangupdate.push(rows[i]);
				}
			}
			res.json(mangupdate)
		});
		let sql = 'Select MaHang , HinhAnh from sanpham'
		con.query(sql, (err, response) => {
			if (err) throw err
			for (let i = 0; i < response.length; i++) {
				try {
					const options = {
						url: response[i].HinhAnh,
						dest: './public/uploads_Images/' + (response[i].MaHang) + '.jpg'
					}
					download.image(options)
						.then(({ filename }) => {
							let sql_update = "UPDATE sanpham SET HinhAnh = 'https://api.thuocsionline.vn/uploads_Images/" + (response[i].MaHang) + ".jpg' WHERE MaHang= '" + response[i].MaHang + "' "
							con.query(sql_update, (err, response) => {
								if (err) throw err
							})
						})
						.catch((err) => {
						})
				}
				catch (error) {

				}
			}
		})

	})
	// var end = Date.now();
	// console.log(`Execution time: ${end - start} ms`);
})
// -> Import Excel Data to MySQL database
//hàm thêm
function importExcelImportAccounts(filePath) {
	var start = Date.now();
	readXlsxFile(filePath).then((rows) => {
		rows.shift();//bỏ dòng đầu của bảng excel
		////
		var loaidoanhnghiep = "Nhà thuốc";
		var pass = md5("123456789")

		for (i = 0; i < rows.length; i++) {
			let sql = "INSERT INTO nhanvien (MaNV,ChucVu,TenNV,SDT,Email,MK,Info,DiaChi,MaKH) values ('" + rows[i][0] + "',6,'" + rows[i][1] + "','" + rows[i][0] + "','" + rows[i][2] + "','" + pass + "', 1,'" + rows[i][3] + "','" + rows[i][4] + "')";
			con.query(sql, function (err, result) {
				if (err) throw err;

			});
			let sql1 = "Insert into doanhnghiep (MaUser,LoaiDN) Values('" + rows[i][0] + "','" + loaidoanhnghiep + "')";
			con.query(sql1, function (err, result) {
				if (err) throw err;
			});
		}

		/////


	})
	var end = Date.now();
	console.log(`Execution time: ${end - start} ms`);
}

function importExcelData2MySQL(filePath) {
	var start = Date.now();
	//hàm thêm từ file excel
	// File path.
	readXlsxFile(filePath).then(async (rows) => {
		rows.shift();//bỏ dòng đầu của bảng excel
		let sqlsp = "select MaHang from sanpham";
		con.query(sqlsp, rows, function (err, result) {
			let mangsp = [];
			let rowstest = [];
			rowstest = rows
			mangsp = result;
			for (j = 0; j < mangsp.length; j++) {
				for (i = rowstest.length - 1; i >= 0; i--) {
					//console.log(rowstest[i][2])
					if (rowstest[i][3] == mangsp[j].MaHang) {
						//console.log(rowstest[i])
						rowstest.splice(i, 1)
					}
				}
			}
			rows = rowstest;
			if (rows.length == 0) {
				console.log("không thêm gì cả");
			} else {

				let sqlsp = "insert into sanpham (LoaiHang,NhomHang,NhanhHang,MaHang,TenHang,SoDangKy,HoatChat,HamLuong,HangSX,NuocSX,QCDG,GiaBan,GiaVon,DVT,HinhAnh,MoTa,TonKho,ConLai) VALUES ?";
				con.query(sqlsp, [rows], function (err, result) {
					//hàm check tên và thêm nước sản xuất

					if (err) throw err;
					let sqlnsx = "select TenNuocSX from nuocsanxuat";
					con.query(sqlnsx, rows, function (err, result) {
						let mang = [];
						mang = result//gán kết quả select vào mảng

						//tạo mảng tạm thời cho kết quả từ rows
						var mang2 = [];//mảng từ rows
						for (i = 0; i < rows.length; i++) {
							let test = rows[i][8];
							mang2.push(test)
						}
						//

						//code loại bỏ các tên bị trùng trong mảng từ rows
						let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
						let mang3 = [];
						mang3 = [...new Set(findDuplicates(mang2))]
						if (mang3.length == 0) {
							console.log("không có trùng");
						} else {
							for (i = 0; i < mang3.length; i++) {
								for (j = mang2.length; j >= 0; j--) {//chỗ này vòng for ngược để tránh lỗi index
									if (mang3[i] == mang2[j]) {
										mang2.splice(j, 1)
									}
								}
							}
							for (i = 0; i < mang3.length; i++) {
								mang2.push(mang3[i])
							}

						}
						//

						//tạo mảng tạm thời cho kết quả từ database
						var mang1 = [];//mảng từ database
						for (i = 0; i < mang.length; i++) {
							mang1.push(mang[i].TenNuocSX)
						}
						//

						//code giúp loại các phần từ đã có trang database
						for (i = 0; i < mang1.length; i++) {
							for (j = mang2.length; j >= 0; j--) {//chỗ này vòng for ngược để tránh lỗi index
								if (mang1[i] == mang2[j]) {
									mang2.splice(j, 1)
								}
							}
						}
						//

						//code insert những phần tử chưa có vào database
						// console.log(mang2)
						for (i = 0; i < mang2.length; i++) {
							let query = "INSERT INTO nuocsanxuat (TenNuocSX) VALUES ('" + mang2[i] + "')";
							con.query(query, (error, result) => {

							});
						}
						//
					});
					//end hàm check và thêm tên nước sản xuất
					//////////////////////////////////////////////////////////
					//hàm check và thêm hãng sản xuất
					let sqlhsx = "select TenHangSX from hangsanxuat";
					con.query(sqlhsx, rows, function (err, result) {
						let mang = [];
						mang = result//gán kết quả select vào mảng
						//console.log(result)
						//tạo mảng tạm thời cho kết quả từ rows
						var mang2 = [];//mảng từ rows
						for (i = 0; i < rows.length; i++) {
							let test = rows[i][7];
							mang2.push(test)
						}
						//

						//code loại bỏ các tên bị trùng trong mảng từ rows
						let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
						let mang3 = [];
						mang3 = [...new Set(findDuplicates(mang2))]
						if (mang3.length == 0) {
							console.log("không có trùng");
						} else {
							for (i = 0; i < mang3.length; i++) {
								for (j = mang2.length; j >= 0; j--) {//chỗ này vòng for ngược để tránh lỗi index
									if (mang3[i] == mang2[j]) {
										mang2.splice(j, 1)
									}
								}
							}
							for (i = 0; i < mang3.length; i++) {
								mang2.push(mang3[i])
							}

						}
						//

						//tạo mảng tạm thời cho kết quả từ database
						var mang1 = [];//mảng từ database
						for (i = 0; i < mang.length; i++) {
							mang1.push(mang[i].TenHangSX)
						}
						//

						//code giúp loại các phần từ đã có trang database
						for (i = 0; i < mang1.length; i++) {
							for (j = mang2.length; j >= 0; j--) {//chỗ này vòng for ngược để tránh lỗi index
								if (mang1[i] == mang2[j]) {
									mang2.splice(j, 1)
								}
							}
						}

						//code insert những phần tử chưa có vào database
						// console.log(mang2)
						for (i = 0; i < mang2.length; i++) {
							let query = "INSERT INTO hangsanxuat (TenHangSX) VALUES ('" + mang2[i] + "')";
							con.query(query, (error, result) => {
							});
						}
						//

					});
					//end hàm check và thêm hãng sản xuất
					///////////////////////////////////////////////////////////
					//hàm check và thêm hoạt chất
					let sqlhc = "select TenHC from hoatchat";
					con.query(sqlhc, rows, function (err, result) {
						let mang = [];
						mang = result//gán kết quả select vào mảng
						//console.log(result)
						//tạo mảng tạm thời cho kết quả từ rows
						var mang2 = [];//mảng từ rows
						for (i = 0; i < rows.length; i++) {
							let test = rows[i][5];
							mang2.push(test)
						}
						//

						//code loại bỏ các tên bị trùng trong mảng từ rows
						let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
						let mang3 = [];
						mang3 = [...new Set(findDuplicates(mang2))]
						if (mang3.length == 0) {
							console.log("không có trùng");
						} else {
							for (i = 0; i < mang3.length; i++) {
								for (j = mang2.length; j >= 0; j--) {//chỗ này vòng for ngược để tránh lỗi index
									if (mang3[i] == mang2[j]) {
										mang2.splice(j, 1)
									}
								}
							}
							for (i = 0; i < mang3.length; i++) {
								mang2.push(mang3[i])
							}

						}
						//

						//tạo mảng tạm thời cho kết quả từ database
						var mang1 = [];//mảng từ database
						for (i = 0; i < mang.length; i++) {
							mang1.push(mang[i].TenHC)
						}
						//

						//code giúp loại các phần từ đã có trang database
						for (i = 0; i < mang1.length; i++) {
							for (j = mang2.length; j >= 0; j--) {//chỗ này vòng for ngược để tránh lỗi index
								if (mang1[i] == mang2[j]) {
									mang2.splice(j, 1)
								}
							}
						}

						//code insert những phần tử chưa có vào database
						// console.log(mang2)
						for (i = 0; i < mang2.length; i++) {
							let query = "INSERT INTO hoatchat (TenHC) VALUES ('" + mang2[i] + "')";
							con.query(query, (error, result) => {
							});
						}
						//

					});
					//end hàm check và thêm hoạt chất

					///////////////////////////////////////////////////////////
					//hàm check và thêm nhóm hàng
					let sqlnh = "select TenNH from nhomhang";
					con.query(sqlnh, rows, function (err, result) {
						let mang = [];
						mang = result//gán kết quả select vào mảng
						//console.log(result)
						//tạo mảng tạm thời cho kết quả từ rows
						var mang2 = [];//mảng từ rows
						for (i = 0; i < rows.length; i++) {
							let test = rows[i][1];
							mang2.push(test)
						}
						//

						//code loại bỏ các tên bị trùng trong mảng từ rows
						let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
						let mang3 = [];
						mang3 = [...new Set(findDuplicates(mang2))]
						if (mang3.length == 0) {
							console.log("không có trùng");
						} else {
							for (i = 0; i < mang3.length; i++) {
								for (j = mang2.length; j >= 0; j--) {//chỗ này vòng for ngược để tránh lỗi index
									if (mang3[i] == mang2[j]) {
										mang2.splice(j, 1)
									}
								}
							}
							for (i = 0; i < mang3.length; i++) {
								mang2.push(mang3[i])
							}

						}
						//

						//tạo mảng tạm thời cho kết quả từ database
						var mang1 = [];//mảng từ database
						for (i = 0; i < mang.length; i++) {
							mang1.push(mang[i].TenNH)
						}
						//

						//code giúp loại các phần từ đã có trang database
						for (i = 0; i < mang1.length; i++) {
							for (j = mang2.length; j >= 0; j--) {//chỗ này vòng for ngược để tránh lỗi index
								if (mang1[i] == mang2[j]) {
									mang2.splice(j, 1)
								}
							}
						}

						//code insert những phần tử chưa có vào database
						// console.log(mang2)
						for (i = 0; i < mang2.length; i++) {
							let query = "INSERT INTO nhomhang (TenNH) VALUES ('" + mang2[i] + "')";
							con.query(query, (error, result) => {
							});
						}
						//

					});
					//end hàm check và thêm nhóm hàng
					var end = Date.now();
					console.log(`Execution time: ${end - start} ms`);
					///////////////////////////////////////////////////////////
					// thêm lô hạng trống cho sản phẩm mới
					const rand = parseInt(Math.random(2) * 10000)
					const sql99 = "insert into chitietlohang set MaHang = ?, TenHang = ?, SoLuong = 1000, DonGia = ?, DVT = ?, MaLH = ?, HanSD = null, NgayNhapHang = CURRENT_DATE();"
					rows.forEach(async ee1 => {
						con.query(sql99, [ee1[2], ee1[3], ee1[11], ee1[12], rand], (err99, res99) => {
							if (err99) {
								throw err99
							}
						})
					});
				});
			}
		});
		let sql = 'Select MaHang , HinhAnh from sanpham'
		con.query(sql, async (err, response) => {
			if (err) throw err
			for (let i = 0; i < response.length; i++) {
				try {
					const options = {
						url: response[i].HinhAnh,
						dest: './public/uploads_Images/' + (response[i].MaHang) + '.jpg'
					}
					await download.image(options)
						.then(async ({ filename }) => {
							//var dest = './public/uploads_Images/' + (response[i].MaHang) + '.jpg'
							let sql_update = "UPDATE sanpham SET HinhAnh = 'https://api.thuocsionline.vn/uploads_Images/" + (response[i].MaHang) + ".jpg' WHERE MaHang= '" + response[i].MaHang + "' "
							con.query(sql_update, (err, response) => {
								if (err) throw err
							})
						})
						.catch((err) => {
							// console.log(err)
						})
				}
				catch (error) {
				}
			}
		})
	})
}

function importExcelData3MySQL(filePath) {
	var start = Date.now();
	//hàm thêm từ file excel
	// File path.
	readXlsxFile(filePath).then((rows) => {
		rows.shift();//bỏ dòng đầu của bảng excel

		let sql = 'Select MaHang , HinhAnh from sanpham'
		con.query(sql, (err, response) => {
			if (err) throw err
			for (let i = 0; i < response.length; i++) {
				try {
					const options = {
						url: response[i].HinhAnh,
						dest: './public/uploads_Images/' + (response[i].MaHang) + '.jpg'
					}
					download.image(options)
						.then(({ filename }) => {
							//var dest = './public/uploads_Images/' + (response[i].MaHang) + '.jpg'
							let sql_update = "UPDATE sanpham SET HinhAnh = 'https://api.thuocsionline.vn/uploads_Images/" + (response[i].MaHang) + ".jpg' WHERE MaHang= '" + response[i].MaHang + "' "
							con.query(sql_update, (err, response) => {
								if (err) throw err
							})
						})
						.catch((err) => {
							// console.log(err)
						})
				}
				catch (error) {

				}
			}
		})
	})
}

const deQuy = () => {
	console.log(`121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212`)
	let sql = "update chuongtrinhkm set Status = 0 WHERE ThoiHan < NOW()";
	con.query(sql, function (err, result) {
		if (err) throw err;
	});

	// clean cart null
	redisClient.del('/KHnull')
	redisClient.del('/KHundefined')
	redisClient.del('/null')
	redisClient.del('/undefined')
	setTimeout(() => {
		deQuy()
	}, 14400000);
}
// Create a Server
app.listen(port, () => {
	console.log(`Started at http://localhost:${port}`)
	console.log('RESTful API server started on: ' + port)
	deQuy()
});

//
//https://grokonez.com/node-js/nodejs-express-restapi-upload-import-excel-file-to-mysql-using-read-excel-file-multer
//https://viblo.asia/p/file-upload-voi-multer-nodejs-va-express-E375z4VdZGW