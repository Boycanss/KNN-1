// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()
const mysql = require('mysql')
const useragent = require('express-useragent');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const busboy = require('then-busboy');
const fileUpload = require('express-fileupload');
const formidable = require('formidable');
const fs = require('fs');
var http = require('http');
const path = require('path');
const csrf = require('csurf');
const notifier = require('node-notifier');
var arraySort = require('array-sort');
//_________________________________________
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'knn'
});
connection.connect(function(err){
	if(!err) {
		console.log("Go on! db is connected");
	} else {
		console.log("Can't get through! db isn't there");
	}
});

	connection.query('SELECT * FROM coldata', (err,rows,fs)=>{
		if (err) {res.send(err)} 
			else {
				console.log(rows);
				}
		})