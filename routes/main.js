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
//----------------------------------------------------------------------------

const Results = function(position,k){
    this.position = position;
    this.k = k;
}

Results.prototype.getRespon = function(){
    var posisi ={
		0 : 0,
		1 : 0,
		2 : 0
		};		
		for (let i = 0; i <= this.k; i++) {
			var resp = this.position[i].posisi;
			// console.log(resp);
			if (resp == "STRIKER") {
				posisi[0] += 1;
			} else if (resp == "GELANDANG") {
				posisi[1] +=1;
			}else{
				posisi[2] +=1;
			}
		}
		console.log("STRIKER :"+posisi[0]);
		console.log("GELANDANG :"+posisi[1]);
		console.log("BEK :"+posisi[2]);
		console.log("HASIL : ");
		if (posisi[0] > posisi[1] && posisi[0] > posisi[2]) {
            console.log("BEST POSITION : PENYERANG");
			return "STRIKER"; 
		} else if (posisi[1] > posisi[0] && posisi[1] > posisi[2]) {
            console.log("BEST POSITION : PEMAIN TENGAH");
			return "GELANDANG";
		} else {
            console.log("BEST POSITION : BEK");
			return "BEK";
		}
}

module.exports = {
    Results : Results
};
