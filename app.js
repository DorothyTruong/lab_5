var hbs = require('express-handlebars');
var fs = require('fs');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var myFile = './public/file/myFile.json'
var app = express();

// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname+'/views/layouts/' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

//write function from stackoverflow
app.post('/', function(req, res) {
  var artName = req.body.user;
  var artAbout = req.body.aboutUser;
  var artUrl = req.body.userUrl;

  var obj = { 
    user: artName,
    aboutUser: artAbout,
    userUrl: artUrl
  };

  //read the existing file
  fs.readFile(myFile, (err, data) => {
    if (err && err.code === "ENOENT") {
      //if file doesn't exist, write the object and leave
      return fs.writeFile(myFile, JSON.stringify([obj]), error => console.error);
    }
    else if (err) {
      //some other error
      console.error(err);
    }
    //otherwise, get its JSON content
    else {
      try {
        const fileData = JSON.parse(data);
        //append the object you want
        fileData.push(obj);
        //write the file back out
        return fs.writeFile(myFile, JSON.stringify(fileData), error => console.error)
      } catch(exception) {
        console.error(exception);
      }
    }
  });

  res.redirect('/');
  res.end();
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
