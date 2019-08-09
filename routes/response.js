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
//==============================================================================

const Resp = function(position){
    this.position = position;
};

Resp.prototype.getRespon = function(){
    var posisi ={
		0 : 0,
		1 : 0,
		2 : 0
		};		
		for (let i = 0; i < this.position.length; i++) {
			var resp = this.position[i];
			// console.log(resp);
			if (resp == "PENYERANG") {
				posisi[0] += 1;
			} else if (resp == "PEMAIN TENGAH") {
				posisi[1] +=1;
			}else{
				posisi[2] +=1;
			}
		}
		console.log("PENYERANG :"+posisi[0]);
		console.log("PEMAIN TENGAH :"+posisi[1]);
		console.log("BEK :"+posisi[2]);
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

module.exports = {
	Resp: Resp
};