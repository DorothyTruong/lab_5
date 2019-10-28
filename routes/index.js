var express = require('express');
var router = express.Router();
var fs = require('fs');
var myFile = './public/file/myFile.json'
var contents;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', fileData: contents });
});

fs.readFile(myFile, {"encoding": "utf8"}, function(err, data) {
  if (err && err.code === "ENOENT") {
    contents = '';
  } else if (err) {
    console.log(err);
  } else {
    contents = data;
  }
 });

module.exports = router;
