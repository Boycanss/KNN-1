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
	database : 'contohknn'
});

connection.connect(function(err){
	if(!err) {
		console.log("Go on! db is connected");
	} else {
		console.log("Can't get through! db isn't there");
	}
});



var testSet = [3,5];

function getEuDistance(trainSet, testSet, trainLength, testLength){
	var dist = [];
	var truedist = [];
	console.log(trainSet);
	console.log("testSet : "+testSet);
	for (var i = 0; i < trainSet.length; i++) {
	for (var j = 0; j < testSet.length; j++) {
		var distance = (trainSet[i].x-testSet[j])**2 + (trainSet[i].y-testSet[j+1])**2;
		dist.push(distance);		
	}}
	for (var z=0 ; z < dist.length; z++) {
			if (z%2==0) {
				truedist.push(Math.sqrt(dist[z]));
			}
			
		}
	var SortedDistance = sortDistance(truedist, trainSet);
	return SortedDistance;
}

function sortDistance(Euclidian, train){
	var dataq = [];
	for (var i = 0; i < Euclidian.length; i++) {
		dataq.push({Distance: Euclidian[i],kategori: train[i].klas})
	}
	var sorted = arraySort(dataq, 'Distance');
	return sorted;
}


function akurasiK(dataLength, results){
	for (var k = 1; k < datalength; k++) {	
	}
}

connection.query('SELECT * FROM contohlah', (err,rows)=>{
	var train = rows;
	var Euclidian = getEuDistance(train, testSet, train.length, testSet.length);
	console.log(Euclidian);
});
