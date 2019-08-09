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
//______________________________________________________________________________
const Accuracy = function(testSet, prediction){
    this.testSet = testSet;
    this.prediction = prediction;
}

Accuracy.prototype.getAccuracy = function(){
    console.log(this.prediction);
    console.log(this.testSet);
    var correct = 0;
    for (let i = 0; i< this.testSet.length; i++) {
        if (this.testSet[i] === this.prediction) {
            correct += 1;
        }
    }
    // console.log((correct / this.testSet.length) * 100.0);
    return (correct / this.testSet.length) * 100.0;
}

module.exports = {
    Accuracy : Accuracy
};