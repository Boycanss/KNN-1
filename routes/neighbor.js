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
const Resp = require("./response");
const Accu = require("./accuracy");

const Nb = function(distance, k){
	this.distance = distance;
	this.k = k;
};


Nb.prototype.getNeighbor = function(){
    const spliced = [];
    const res = [];
    const getResp = Resp.Resp;
    const getAccu = Accu.Accuracy;
    
    for (let i = 0; i< this.distance.length; i++) {
        spliced.push(this.distance[i].posisi);
        if (spliced.length%2 === 1) {
            const resp = new getResp(spliced);
            // console.log(resp.getRespon());
            const prediction = resp.getRespon();
            const akurasi = new getAccu(spliced,prediction); 
            const resultAkurasi = akurasi.getAccuracy();
            res.push({k: (i+1), akurasi: resultAkurasi});
        }
        
    }
    console.log(res);
    const hundred = res.splice(1,res.length);
    const maxacc = Math.max.apply(Math, hundred.map(function(maxof) { 
        return maxof.akurasi;
    }));
    console.log(maxacc);

    for (let i = 0; i<= hundred.length; i++) {
        if (hundred[i].akurasi === maxacc) {
            console.log(hundred[i].k);
            return hundred[i].k;
        }
    }
}

module.exports = {
	Nb: Nb
};