//CALL DEPENDECIES
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
const http = require('http');
const path = require('path');
const csrf = require('csurf');
const notifier = require('node-notifier');
const arraySort = require('array-sort');
//___________________________________________________
//CALL CLASSES
const sortclass = require("./sortDistance");
const tetangga = require("./neighbor");
//___________________________________________________
// const Class = new Kelas.Class;

const Distance = function(latih, uji){
	this.latih = latih;
	this.uji= uji;
};

Distance.prototype.jarak = function(){
	const dist = [];
	const datauji = [];
	datauji.push(this.uji);
	// console.log(datauji[0].kelas);
	console.log("______________________________________");
	console.log(this.latih.length);
	console.log(datauji.length);	
	for (var b = 0; b < this.latih.length; b++) {
		for (var o = 0; o < datauji.length; o++) {
			var distance = 0;
			for (var y = 1; y <= 6; y++) {
				distance += (datauji[o][`ability${y}`]-this.latih[b][`ability${y}`])**2;
				// console.log(">>> : ("+datauji[o][`ability${y}`]+"-"+this.latih[b][`ability${y}`]+")**2 = "+(datauji[o][`ability${y}`]-this.latih[b][`ability${y}`])**2);
			}
			dist.push(Math.sqrt(distance));
		}
	}
	const sort = sortclass.Sort;
	const asort = new sort(dist, this.latih);
	const urutan = asort.Sorting();
	console.log(urutan);
	// return urutan;
	const nb = tetangga.Nb;
	const neighbor = new nb(urutan, urutan.length);
	const getNb = neighbor.getNeighbor();

	return getNb;
};


module.exports = {
	Distance: Distance
};