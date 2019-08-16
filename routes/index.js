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
var KNNfunction = require('./func');
const coba = require('./distance');

//DB
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

//router
const eujarak = coba.Distance;
router.get('/ggwp',(req,res)=>{
	connection.query('SELECT * FROM coldata', (err,rows)=>{
		const latih = rows;
		const uji = rows[17];
		const dist = new eujarak(latih, uji);
		dist.jarak();
	})
});


router.get('/knn', (req,res)=>{
	var knn = new KNNfunction();
	connection.query('SELECT * FROM contohlah', (err,rows)=>{
		knn.runKNN(rows);
	})
})

router.get('/', (req,res)=>{
	connection.query('SELECT * FROM coldata', (err,rows,fs)=>{
		if (err) {res.send(err)} 
			else {
				res.render('index.ejs', {data:rows}
				)}
		})
})

router.post('/ggplayer', (req,res)=>{
	connection.query('SELECT * FROM coldata', (err,rows)=>{
	const latih = rows;
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files){
	var ability1 = fields.Entry1;
	var ability2 = fields.Entry2;
	var ability3 = fields.Entry3;
	var ability4 = fields.Entry4;
	var ability5 = fields.Entry5;
	var ability6 = fields.Entry6;
	var ability7 = fields.Entry7;
	var ability8 = fields.Entry8;
	var ability9 = fields.Entry9;
	// console.log(ability1,ability2,ability3,ability4,ability5,ability6);
	const uji = [];
	uji.push({ability1: ability1, ability2:ability2, ability3:ability3, ability4:ability4, ability5:ability5, ability6:ability6, ability7:ability7, ability8:ability8, ability9:ability9});
	console.log(uji);
	const dist = new eujarak(latih, uji);
	dist.jarak();
})
	})		
})

router.post('/coba', (req,res)=>{
	var qq= req.body.class;
	console.log(qq)
})

//_________________________________________
module.exports = router
