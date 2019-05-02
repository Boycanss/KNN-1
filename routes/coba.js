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

//+++++++++++++++++++++++++++++++++++++++++++++

var k = [{x:2, y:3}];
console.log(k);