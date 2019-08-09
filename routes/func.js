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

//connecting db__________________________________________________________________

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
//________________________________________________________________

// function TrainingData(rows){
// 	var pemain = [];
// 	var contents = [];
// 	var player = [];
// 	rows.forEach(function(elem) {
// 		contents.push(_.toArray(elem));
// 	});
// 	for (var i = 0; i < rows.length; i++) {
// 		for (var j = 2; j <= 7; j++) {
// 			var someValue = contents[i][j];
// 			pemain.push(someValue);				
// 		}
// 	}
// 	var i,j,temparray,chunk = 6;
// 	for (i=0,j=pemain.length; i<j; i+=chunk) {
// 		temparray = pemain.slice(i,i+chunk);
// 		// console.log(temparray);
// 		player.push(temparray);
// 	}
// 	return player;
// }

function getEuDistance(trainSet, testSet){
	var dist = [];
	console.log("______________________________________");
	for (var b = 0; b < trainSet.length; b++) {
		for (var o = 0; o < testSet.length; o++) {
			var distance = 0;
			for (var y = 1; y <= 6; y++) {
				distance += (testSet[o][`ability${y}`]-trainSet[b][`ability${y}`])**2;
				// console.log(">>> : ("+testplr[o][`ability${y}`]+"-"+player[b][`ability${y}`]+")**2 = "+(testplr[o][`ability${y}`]-player[b][`ability${y}`])**2)
			}
			dist.push(Math.sqrt(distance));
		}
	}
	var sort = sortDistance(dist, trainSet);
	return sort;
}

function sortDistance(Euclidian, train){
	var dataq = [];
	for (var i = 0; i < Euclidian.length; i++) {
		dataq.push({Distance: Euclidian[i], posisi: train[i].kelas})
	}
	var sorted = arraySort(dataq, 'Distance');
	return sorted;
}


function akurasiK(TestSet, predict){
	var benar =0;
	for (var k = 0; k < TestSet.length; k++) {	
		if (TestSet[k].kelas === predict) {
			benar += 1;
		}
	}
	return (benar / TestSet.length) * 100.0;
}

function getresp(distance){
	var posisi ={
		0 : 0,
		1 : 0,
		2 : 0
		};		
		for (let i = 0; i < distance.length; i++) {
			var resp = distance[i].posisi;
			console.log(resp);
			if (resp == "PENYERANG") {
				posisi[0] += 1;
			} else if (resp == "PEMAIN TENGAH") {
				posisi[1] +=1;
			}else{
				posisi[2] +=1;
			}
		}
		console.log("PENYERANG :"+posisi[0]);
		console.log("___________");
		console.log("PEMAIN TENGAH :"+posisi[1]);
		console.log("___________");
		console.log("BEK :"+posisi[2]);
		console.log("*********************************");
		console.log("HASIL : ");
		if (posisi[0] > posisi[1] && posisi[0] > posisi[2]) {
			// console.log("PENYERANG");
			return "PENYERANG"; 
		} else if (posisi[1] > posisi[0] && posisi[1] > posisi[2]) {
			// console.log("PEMAIN TENGAH");
			return "PEMAIN TENGAH";
		} else {
			// console.log("BEK");
			return "BEK";
		}
	}

function getNeighbor(distance, k){
	const result = [];
	var predict = [];
	for (let b = 1; b < k; b+=2) {
		console.log("K :"+b);
			// console.log(distance[b]);
			result.push(distance[b])
			var resp = getresp(result);
			predict.push(resp)
	}
	return predict;
}


function readRow(callback){
	connection.query('SELECT * FROM coldata', (err,rows)=>{
		return callback(rows)
	})
}

//MAIN FOR RUNNING THE APPS
// connection.query('SELECT * FROM coldata', (err,rows, fields)=>{
// 	var test = rows[16];
// 	var pushTest = [];
// 	pushTest.push(test)
// 		var Eudistance = getEuDistance(rows, pushTest);
// 		console.log("Eudistance : ");
// 		console.log(Eudistance);
// 		console.log("_____________________");
// 			var nb = getNeighbor(Eudistance, Eudistance.length);
// 			console.log(nb);
		
// })

// module.exports =  readData;