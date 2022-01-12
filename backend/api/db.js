'use strict';
const mysql = require('mysql');
const { host, user, password, database } = require('../constants/constants')

const db = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database
});

module.exports = db
