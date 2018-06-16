var express = require('express');
var session = require('express-session');
var app = express();
var multer  = require('multer');
var upload = multer();

app.set('trust proxy', 1);
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.get('/', function (req, res) {
  if(req.session.auth==true) {
	  if (req.session.count) {
		req.session.count++
		res.setHeader('Content-Type', 'text/html')
		res.write('<p>Contador: ' + req.session.count + '</p>')
		res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
		res.end()
	  } else {
		req.session.count = 1
		res.end('welcome to the session demo. refresh!')
	  }
  } else {
	    res.send('you must login first');
  }
});

app.post('/login', upload.array(), function (req, res, next) {
  console.log(req.body);
  if (req.session.auth==true) {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html><head><meta charset="utf-8"></head><body><p>Você já está logado</p></body></html>');
    res.end();
  } else if(req.body.nome=="maicon" && req.body.senha=="teste") {
		req.session.auth= true;
    	res.end('welcome to the session demo. refresh!');
  } else {
		res.end('try again');
  }
});

app.get('/count', function (req, res) {
  if (req.session.count) {
    req.session.count++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>Contador: ' + req.session.count + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    res.end('no session demo, go to root!')
  }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

//req.session.destroy();
