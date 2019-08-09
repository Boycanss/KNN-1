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

// EXAMPLE OF OOP IN JS
const coba = require('./distance');




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

const eujarak = coba.Distance;
router.get('/ggwp',(req,res)=>{
	connection.query('SELECT * FROM coldata', (err,rows)=>{
		const latih = rows;
		const uji = rows[2];
		// for (var i = 0; i <= 4; i++) {
		// 	const ujidata = rows[i];
		// 	// console.log(ujidata);
		// 	uji.push(ujidata);
		// }
		// console.log(uji);
		// console.log(latih);
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

router.post('/submitplayer', (req,res)=>{
	var name = req.body.name;
	var ballskill = req.body.ballskill;
	var mental = req.body.mental;
	var passing = req.body.passing;
	var physical = req.body.physical;
	var shooting = req.body.shooting;
	var defence= req.body.defence;
	var kelas= req.body.kelas;
	console.log("SUBMITTING PLAYER : "+ name,ballskill,mental,passing,physical,shooting,defence,kelas);
	connection.query("INSERT INTO coldata (name, ballskill, mental, passing, physical, shooting, defence, kelas) VALUES ('"+name+"',"+ballskill+","+mental+","+passing+","+physical+","+shooting+","+defence+",'"+kelas+"')", (err,rows)=>{
		if (err) {res.send(err)} else {
			console.log("PLAYER SUBMITTED");
			res.redirect('/')
		}
		
	})
})




router.post('/coba', (req,res)=>{
	var qq= req.body.class;
	console.log(qq)
})

//_________________________________________
module.exports = router
