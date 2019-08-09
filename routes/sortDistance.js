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

//-------------------------------------------------------------

const Sort = function(eudistance, latih){
	this.eudistance = eudistance;
	this.latih = latih;
};

Sort.prototype.Sorting = function(){
	// console.log(this.eudistance);
	// console.log(this.latih.kelas);
	var dataq = [];
	for (var i = 0; i < this.eudistance.length; i++) {
		dataq.push({Distance: this.eudistance[i], posisi: this.latih[i].kelas})
	}
	var sorted = arraySort(dataq, 'Distance');
	return sorted;
}


module.exports = {
	Sort: Sort
};
