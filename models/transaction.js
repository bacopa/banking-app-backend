//MODEL


'use strict';

var db = require('../config/db');
var moment = require("moment");

db.run(`CREATE TABLE IF NOT EXISTS transactions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          createdAt DATETIME,
          notes TEXT,
          amount INTEGER,
          transType TEXT
        )`);

exports.get = function (cb) {
	db.all("SELECT * FROM transactions", cb);
};

exports.create = function (obj, cb) {
	if(!obj){
		return cb("Missing stuff!")
	}

	var createdAt = moment().valueOf();

	db.run("INSERT INTO transactions (createdAt, notes, transType, amount) VALUES (?,?,?,?)", createdAt, obj.notes, obj.transType, obj.amount, function (err) {
		if(err){ return cb(err) };

	})
};

exports.removeById = function (id, cb) {
	console.log(" id within MODEL", id)
	if(!id){
		return cb("Can't delete without id");
	}

	db.run("DELETE FROM transactions WHERE id = ?", id, function (err){if(err) { 
		console.log("made it this far")
		return cb(err) };
	})
};

