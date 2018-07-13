/**
 * Pós Graduação Internet das Coisas - CEFET-MG 
 * RESTFul com NodeJS e MongoDB
 */

/* Módulos Utilizados */
var express = require('express'); 
var cors = require('cors'); 
var bodyParser = require('body-parser'); 
var Temperatura = require('./models/temperatura'); // Modelos definidos
var Umidade = require('./models/umidade'); // Modelos definidos
var Sensor1 = require('./models/sensor1'); // Modelos definidos
var Atuador1 = require('./models/atuador1'); // Modelos definidos
var Sensor2 = require('./models/sensor2'); // Modelos definidos
var Atuador2 = require('./models/atuador2'); // Modelos definidos
var Sensor3 = require('./models/sensor3'); // Modelos definidos
var Atuador3 = require('./models/atuador3'); // Modelos definidos
var Luisa = require('./models/luisa'); // Modelos definidos
var mongoose = require('mongoose');
var mqtt = require('mqtt');

//var express = require('express');
var session = require('express-session');	//necessários para criar cook
var app = express();						//
var multer  = require('multer');			//
var upload = multer();						//até aqui

'use strict'

//var mqtt = require('mqtt')
var fs = require('fs')
var path = require('path')
var PORT = 3000  // troque p/ 8883 quando usar SSL/TLS
var HOST = '35.229.57.208'

var options = {
  port: PORT,
  host: HOST,
  username: 'fabiano',
  password: 'teste',
 // rejectUnauthorized: false,          // se o certificado fosse legítimo, poderia mudar pra true
 // ca: [ fs.readFileSync('ca.crt') ],  // seria o certificado da autoridade, mas o node esta ignorando
 // protocol: 'ssl'
}

var client = mqtt.connect(options)

client.subscribe('iot')
client.publish('iot', 'Current time is: ' + new Date())
client.on('message', function (topic, message) {
  console.log(message.toString())
})

client.on('connect', function () {
  console.log('Connected')
})

app.set('trust proxy', 1);					//criar set
app.use(session({							//
  secret: 'keyboard cat',					//capturar teclado
  resave: false,							//
  saveUninitialized: true,					//
  cookie: { secure: false }					//
}))											//

app.post('/login', upload.array(), function (req, res, next) {  //Onde se verifica a senha
  console.log(req.body);

const crypto = require('crypto');
buf = Buffer.alloc(10);//criar um buffet para cifrar a senha
salt = crypto.randomFillSync(buf).toString('hex');//gerar um valor aleatório
console.log(salt);
key1 = crypto.pbkdf2Sync('teste', salt, 100000, 64, 'sha512');//armazana o salt senha é secret1 - chama a crypto tava esperando
key1a = crypto.pbkdf2Sync(key1, salt, 100000, 64, 'sha512');//estou usando bcrypt sobre o sha512.
key2 = crypto.pbkdf2Sync(req.body.senha, salt, 100000, 64, 'sha512');//10000 fator de trabalho armazena em key
key2a = crypto.pbkdf2Sync(key2, salt, 100000, 64, 'sha512');
console.log(key1.toString('hex'));
console.log(key2.toString('hex'));
console.log(key1a.toString('hex'));
console.log(key2a.toString('hex'));
console.log(key1a.toString('hex') == key2a.toString('hex'));

  if (req.session.auth==true) {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html><head><meta charset="utf-8"></head><body><p>Você já está logado</p></body></html>');
    res.end();

  } else if(req.body.nome=="fabiano" && key1a.toString('hex') == key2a.toString('hex')) {
  //else if(req.body.nome=="fabiano" && req.body.senha=="teste") {
		req.session.auth= true;
    	res.end('welcome to the session demo. refresh!');
  } else {
		res.end('try again');
  }
});



require('mongoose-middleware').initialize(mongoose);

mongoose.connect("mongodb://localhost:27017/sensor");//criar outro user

//mongoose.connect("mongodb://localhost:27017/user");//com isso irá se criar um novo banco

var client = mqtt.connect('tcp://localhost'); //inicia o mqtt

//var app = express(); // Cria o app com Express
var router = express.Router();

app.use(cors()); // liberar todos os do app acessos CORS
app.use(bodyParser.urlencoded({ 
	extended : true
})); 
app.use(bodyParser.json()); // configurações do body parser

client.on('connect', function () {
   	 client.subscribe('topic-iot-cefetmg'); //conecta e assina o tópico MQTT
   	 client.subscribe('topic1-iot-cefetmg'); //conecta e assina o tópico MQTT
   	 client.subscribe('topic2-iot-cefetmg'); //conecta e assina o tópico MQTT
   	 client.subscribe('topic3-iot-cefetmg'); //conecta e assina o tópico MQTT
   	 client.subscribe('topic4-iot-cefetmg'); //conecta e assina o tópico MQTT
   	 client.subscribe('topic5-iot-cefetmg'); //conecta e assina o tópico MQTT
   	 client.subscribe('topic6-iot-cefetmg'); //conecta e assina o tópico MQTT
   	 client.subscribe('topic7-iot-cefetmg'); //conecta e assina o tópico MQTT
   	 client.subscribe('topic8-iot-cefetmg'); //conecta e assina o tópico MQTT
});

client.on('message', function (topic, message) { //aguarda mensagem do tópico assinado MQTT 
	
	  console.log(topic.toString());
	  if(topic.toString()=='topic-iot-cefetmg'){
	  		if (req.session.auth==true) { 
	  console.log(message.toString());
	  var payload       = message.toString();
	  var message_topic = topic.toString();
	  
	  var temperatura = new Temperatura();

	  var d = new Date();
	 
	  temperatura.time = d.getFullYear() + "-"
		+ ("00" + (d.getMonth() + 1)).slice(-2) + "-"
		+ ("00" + (d.getDate())).slice(-2) + " "
		+ d.toLocaleTimeString();
	 
	  temperatura.valor = payload;

		temperatura.save(function(error) { // insere no db
			if (error)
				console.log(error);

			console.log("Inserido com Sucesso!")

		});
	}else {console.log(error);}
	}
});

client.on('message', function (topic, message) { //aguarda mensagem do tópico assinado MQTT 
	
	  console.log(topic.toString());
	  if(topic.toString()=='topic1-iot-cefetmg'){
	  	if (req.session.auth==true) {
	  console.log(message.toString());
	  var payload       = message.toString();
	  var message_topic = topic.toString();
	  
	  var umidade = new Umidade();

	  var d = new Date();
	 
	  umidade.time = d.getFullYear() + "-"
		+ ("00" + (d.getMonth() + 1)).slice(-2) + "-"
		+ ("00" + (d.getDate())).slice(-2) + " "
		+ d.toLocaleTimeString();
	 
	  umidade.valor = payload;

		umidade.save(function(error) { // insere no db
			if (error)
				console.log(error);

			console.log("Inserido com Sucesso!")

		});
	}else {console.log(error);}
	}
});

client.on('message', function (topic, message) { //aguarda mensagem do tópico assinado MQTT 
	
	  console.log(topic.toString());
	  if(topic.toString()=='topic2-iot-cefetmg'){
	  	if (req.session.auth==true) {
	  console.log(message.toString());
	  var payload       = message.toString();
	  var message_topic = topic.toString();
	  
	  var sensor1 = new Sensor1();

	  var d = new Date();
	 
	  sensor1.time = d.getFullYear() + "-"
		+ ("00" + (d.getMonth() + 1)).slice(-2) + "-"
		+ ("00" + (d.getDate())).slice(-2) + " "
		+ d.toLocaleTimeString();
	 
	  sensor1.valor = payload;

		sensor1.save(function(error) { // insere no db
			if (error)
				console.log(error);

			console.log("Inserido com Sucesso!")

		});
	}else {console.log(error);}
	}
});

client.on('message', function (topic, message) { //aguarda mensagem do tópico assinado MQTT 
	
	  console.log(topic.toString());
	  if(topic.toString()=='topic3-iot-cefetmg'){
	  	if (req.session.auth==true) {
	  console.log(message.toString());
	  var payload       = message.toString();
	  var message_topic = topic.toString();
	  
	  var sensor2 = new Sensor2();

	  var d = new Date();
	 
	  sensor2.time = d.getFullYear() + "-"
		+ ("00" + (d.getMonth() + 1)).slice(-2) + "-"
		+ ("00" + (d.getDate())).slice(-2) + " "
		+ d.toLocaleTimeString();
	 
	  sensor2.valor = payload;

		sensor2.save(function(error) { // insere no db
			if (error)
				console.log(error);

			console.log("Inserido com Sucesso!")

		});
	}else {console.log(error);}
	}
});

client.on('message', function (topic, message) { //aguarda mensagem do tópico assinado MQTT 
	
	  console.log(topic.toString());
	  if(topic.toString()=='topic4-iot-cefetmg'){
	  	if (req.session.auth==true) {
	  console.log(message.toString());
	  var payload       = message.toString();
	  var message_topic = topic.toString();
	  
	  var sensor3 = new Sensor3();

	  var d = new Date();
	 
	  sensor3.time = d.getFullYear() + "-"
		+ ("00" + (d.getMonth() + 1)).slice(-2) + "-"
		+ ("00" + (d.getDate())).slice(-2) + " "
		+ d.toLocaleTimeString();
	 
	  sensor3.valor = payload;

		sensor3.save(function(error) { // insere no db
			if (error)
				console.log(error);

			console.log("Inserido com Sucesso!")

		});
	}else {console.log(error);}
	}
});

client.on('message', function (topic, message) { //aguarda mensagem do tópico assinado MQTT 
	
	  console.log(topic.toString());
	  if(topic.toString()=='topic5-iot-cefetmg'){
	  	if (req.session.auth==true) {
	  console.log(message.toString());
	  var payload       = message.toString();
	  var message_topic = topic.toString();
	  
	  var atuador1 = new Atuador1();

	  var d = new Date();
	 
	  atuador1.time = d.getFullYear() + "-"
		+ ("00" + (d.getMonth() + 1)).slice(-2) + "-"
		+ ("00" + (d.getDate())).slice(-2) + " "
		+ d.toLocaleTimeString();
	 
	  atuador1.valor = payload;

		atuador1.save(function(error) { // insere no db
			if (error)
				console.log(error);

			console.log("Inserido com Sucesso!")

		});
	}else {console.log(error);}
	}
});

client.on('message', function (topic, message) { //aguarda mensagem do tópico assinado MQTT 
	
	  console.log(topic.toString());
	  if(topic.toString()=='topic6-iot-cefetmg'){
	  	if (req.session.auth==true) {
	  console.log(message.toString());
	  var payload       = message.toString();
	  var message_topic = topic.toString();
	  
	  var atuador2 = new Atuador2();

	  var d = new Date();
	 
	  atuador2.time = d.getFullYear() + "-"
		+ ("00" + (d.getMonth() + 1)).slice(-2) + "-"
		+ ("00" + (d.getDate())).slice(-2) + " "
		+ d.toLocaleTimeString();
	 
	  atuador2.valor = payload;

		atuador2.save(function(error) { // insere no db
			if (error)
				console.log(error);

			console.log("Inserido com Sucesso!")

		});
	}else {console.log(error);}
	}
});

client.on('message', function (topic, message) { //aguarda mensagem do tópico assinado MQTT 
	
	  console.log(topic.toString());
	  if(topic.toString()=='topic7-iot-cefetmg'){
	  	if (req.session.auth==true) {
	  console.log(message.toString());
	  var payload       = message.toString();
	  var message_topic = topic.toString();
	  
	  var atuador3 = new Atuador3();

	  var d = new Date();
	 
	  atuador3.time = d.getFullYear() + "-"
		+ ("00" + (d.getMonth() + 1)).slice(-2) + "-"
		+ ("00" + (d.getDate())).slice(-2) + " "
		+ d.toLocaleTimeString();
	 
	  atuador3.valor = payload;

		atuador3.save(function(error) { // insere no db
			if (error)
				console.log(error);

			console.log("Inserido com Sucesso!")

		});
	}else {console.log(error);}
	}
});



/* Rota para acompanhar as requisições */
router.use(function(req, res, next) {
	console.log('Entrou na rota ');
	next(); // continua na próxima rota
});

//GET /
router.get('/', function(req, res) {//app.get
	res.json({
		message : 'API - IoT'
	});
});

//GET /temperatura
/*router.route('/temperatura').get(function(req, res) {
	Temperatura.find(function(err, temperatura) {
		if (err)
			res.send(err);

		res.json(temperatura);
	});
	console.log('GET /temperatura');
});*/

//GET /temperatura
router.route('/temperatura').get(function(req, res) {
	if (req.session.auth==true) {  										//criei a validação aqui
	var limit = parseInt(req.query._limit) || 20;
	var valor = req.query.valor || {$gte: 0};
	var sort = parseInt(req.query._sort) || -1;
	Temperatura.
	find().
	where({ valor: valor }).
	limit(limit).
	sort({ _id: sort })
	.exec(function(err, temperatura) {
		if (err)
			res.send(err);

		res.json(temperatura);
	});
	console.log('GET /temperatura');
	  } else {
		res.end('try again');
  }
});

router.route('/temperatura/q').get(function(req, res) {
	
	if (req.session.auth==true) {  										//criei a validação aqui
	Temperatura.apiQuery(req.query).exec(function(err, temperatura) {
		if (err)
			res.send(err);

		res.json(temperatura);
	});
	console.log('GET /temperatura/q');
	} else {res.end('try again');}
});

//GET /temperatura/recente
router.route('/temperatura/recente').get(function(req, res) {
	if (req.session.auth==true) {
	var limit =  1;
	var sort  = -1;
	Temperatura.
	find().
	limit(limit).
	sort({ _id: sort })
	.exec(function(err, temperatura) {
		if (err)
			res.send(err);

		res.json(temperatura);
	});
	console.log('GET /temperatura/recente');
	} else {res.end('try again');}
});

//GET /temperatura/elevada
router.route('/temperatura/elevada').get(function(req, res) {
	if (req.session.auth==true) {
	var limit = 10;
	var valor = {$gte: 30};
	var sort =  -1;
	Temperatura.
	find().
	where({ valor: valor }).
	limit(limit).
	sort({ _id: sort })
	.exec(function(err, temperatura) {
		if (err)
			res.send(err);

		res.json(temperatura);
	});
    console.log('GET /temperatura/elevada');
    } else {res.end('try again');}
});


//GET /temperatura/:id
router.route('/temperatura/:id').get(function(req, res) {
	if (req.session.auth==true) {
	Temperatura.findById(req.params.id, function(error, temperatura) {
		if(error)
			res.send(error);

		res.json(temperatura);
	});
	console.log('GET /temperatura/:id');
	} else {res.end('try again');}
});

/* POST /temperatura {time:"..",valor:"..."} */
router.route('/temperatura').post(function(req, res) {
	if (req.session.auth==true) {
	var temperatura = new Temperatura();
	temperatura.time = new Date();
	temperatura.valor = req.body.valor;

	client.publish('topic-iot-cefetmg',  temperatura.valor); //MQTT: publica o valor da temperatura no Tópico
	
	temperatura.save(function(error) {
		if (error)
			res.send(error);

		res.json({
			message : 'temperatura inserida e publicada!'
		});
	});
		
	console.log('POST /temperatura');
	} else {res.end('try again');}
});

//PUT /temperatura/:id {time:"..",valor:"..."}
router.route('/temperatura/:id').put(function(req, res) {
    if (req.session.auth==true) {
	Temperatura.findById(req.params.id, function(error, temperatura) {
		if(error)
			res.send(error);

		temperatura.time = req.body.time;
		temperatura.valor = req.body.valor;

		temperatura.save(function(error) {
			if(error)
				res.send(error);
			res.json({ message: 'Temperatura Atualizado!' });
		});
	});
	console.log('PUT /temperatura/:id');
	} else {res.end('try again');}
});

//DELETE /temperatura/:id
router.route('/temperatura/:id').delete(function(req, res) {
	if (req.session.auth==true) {
	Temperatura.remove({
		_id: req.params.id
	}, function(error) {
		if(error)
			res.send(error);
		res.json({ message: 'Temperatura excluída com Sucesso! '});
	});
	console.log('DELETE /temperatura/:id');
	} else {res.end('try again');}
});



//GET /umidade
router.route('/umidade').get(function(req, res) {
	if (req.session.auth==true) {
	var limit = parseInt(req.query._limit) || 20;
	var valor = req.query.valor || {$gte: 0};
	var sort = parseInt(req.query._sort) || -1;
	Umidade.
	find().
	where({ valor: valor }).
	limit(limit).
	sort({ _id: sort })
	.exec(function(err, umidade) {
		if (err)
			res.send(err);

		res.json(umidade);
	});
	console.log('GET /umidade');
	} else {res.end('try again');}
});

router.route('/umidade/q').get(function(req, res) {
	if (req.session.auth==true) {
	Umidade.apiQuery(req.query).exec(function(err, umidade) {
		if (err)
			res.send(err);

		res.json(umidade);
	});
	console.log('GET /umidade/q');
	} else {res.end('try again');}
});

//GET /umidade/recente
router.route('/umidade/recente').get(function(req, res) {
	if (req.session.auth==true) {
	var limit =  1;
	var sort  = -1;
	Umidade.
	find().
	limit(limit).
	sort({ _id: sort })
	.exec(function(err, umidade) {
		if (err)
			res.send(err);

		res.json(umidade);
	});
	console.log('GET /umidade/recente');
	} else {res.end('try again');}
});

//GET /umidade/elevada
router.route('/umidade/elevada').get(function(req, res) {
	if (req.session.auth==true) {
	var limit = 10;
	var valor = {$gte: 30};
	var sort =  -1;
	
    Umidade.
	find().
	where({ valor: valor }).
	limit(limit).
	sort({ _id: sort })
	.exec(function(err, umidade) {
		if (err)
			res.send(err);

		res.json(umidade);
	});
    console.log('GET /umidade/elevada');
    } else {res.end('try again');}
});


//GET /umidade/:id
router.route('/umidade/:id').get(function(req, res) {
	if (req.session.auth==true) {
	Umidade.findById(req.params.id, function(error, umidade) {
		if(error)
			res.send(error);

		res.json(umidade);
	});
	console.log('GET /umidade/:id');
	} else {res.end('try again');}
});


/* POST /umidade {time:"..",valor:"..."} */
router.route('/umidade').post(function(req, res) {
	if (req.session.auth==true) {
	var umidade = new Umidade();

	umidade.time = new Date();
	umidade.valor = req.body.valor;

	client.publish('topic1-iot-cefetmg',  umidade.valor); //MQTT: publica o valor da umidade no Tópico
	
	umidade.save(function(error) {
		if (error)
			res.send(error);

		res.json({
			message : 'umidade inserida e publicada!'
		});
	});
		
	console.log('POST /umidade');
	} else {res.end('try again');}
});

//PUT /umidade/:id {time:"..",valor:"..."}
router.route('/umidade/:id').put(function(req, res) {
	if (req.session.auth==true) {
	Umidade.findById(req.params.id, function(error, umidade) {
		if(error)
			res.send(error);

		umidade.time = req.body.time;
		umidade.valor = req.body.valor;

		umidade.save(function(error) {
			if(error)
				res.send(error);
			res.json({ message: 'Umidade Atualizado!' });
		});
	});
	console.log('PUT /umidade/:id');
	} else {res.end('try again');}
});

//DELETE /umidade/:id
router.route('/umidade/:id').delete(function(req, res) {
	if (req.session.auth==true) {
	Umidade.remove({
		_id: req.params.id
	}, function(error) {
		if(error)
			res.send(error);
		res.json({ message: 'Umidade excluída com Sucesso! '});
	});
	console.log('DELETE /umidade/:id');
	} else {res.end('try again');}
});

//GET /sensor1
router.route('/sensor1').get(function(req, res) {
	if (req.session.auth==true) {
	var limit = parseInt(req.query._limit) || 20;
	var valor = req.query.valor || {$gte: 0};
	var sort = parseInt(req.query._sort) || -1;
	Sensor1.
	find().
	where({ valor: valor }).
	limit(limit).
	sort({ _id: sort })
	.exec(function(err, sensor1) {
		if (err)
			res.send(err);

		res.json(sensor1);
	});
	console.log('GET /sensor1');
	} else {res.end('try again');}
});

router.route('/sensor1/q').get(function(req, res) {
	if (req.session.auth==true) {
	Sensor1.apiQuery(req.query).exec(function(err, sensor1) {
		if (err)
			res.send(err);

		res.json(sensor1);
	});
	console.log('GET /sensor1/q');
	} else {res.end('try again');}
});

//GET /sensor1/recente
router.route('/sensor1/recente').get(function(req, res) {
	if (req.session.auth==true) {
	var limit =  1;
	var sort  = -1;
	Sensor1.
	find().
	limit(limit).
	sort({ _id: sort })
	.exec(function(err, sensor1) {
		if (err)
			res.send(err);

		res.json(sensor1);
	});
	console.log('GET /sensor1/recente');
	} else {res.end('try again');}
});

//GET /sensor1/elevada
router.route('/sensor1/elevada').get(function(req, res) {
	if (req.session.auth==true) {
	var limit = 10;
	var valor = {$gte: 30};
	var sort =  -1;
	
    Sensor1.
	find().
	where({ valor: valor }).
	limit(limit).
	sort({ _id: sort })
	.exec(function(err, sensor1) {
		if (err)
			res.send(err);

		res.json(sensor1);
	});
    console.log('GET /sensor1/elevada');
    } else {res.end('try again');}
});


//GET /sensor1/:id
router.route('/sensor1/:id').get(function(req, res) {
	if (req.session.auth==true) {
	Sensor1.findById(req.params.id, function(error, sensor1) {
		if(error)
			res.send(error);

		res.json(sensor1);
	});
	console.log('GET /sensor1/:id');
	} else {res.end('try again');}
});

/* POST /sensor1 {time:"..",valor:"..."} */
router.route('/sensor1').post(function(req, res) {
	if (req.session.auth==true) {
	var sensor1 = new Sensor1();

	sensor1.time = new Date();
	sensor1.valor = req.body.valor;

	client.publish('topic2-iot-cefetmg',  sensor1.valor); //MQTT: publica o valor da sensor1 no Tópico
	
	sensor1.save(function(error) {
		if (error)
			res.send(error);

		res.json({
			message : 'sensor1 inserida e publicada!'
		});
	});
		
	console.log('POST /sensor1');
	} else {res.end('try again');}
});

//PUT /sensor1/:id {time:"..",valor:"..."}
router.route('/sensor1/:id').put(function(req, res) {
	if (req.session.auth==true) {
	Sensor1.findById(req.params.id, function(error, sensor1) {
		if(error)
			res.send(error);

		sensor1.time = req.body.time;
		sensor1.valor = req.body.valor;

		sensor1.save(function(error) {
			if(error)
				res.send(error);
			res.json({ message: 'Sensor1 Atualizado!' });
		});
	});
	console.log('PUT /sensor1/:id');
	} else {res.end('try again');}
});

//DELETE /sensor1/:id
router.route('/sensor1/:id').delete(function(req, res) {
	if (req.session.auth==true) {
	Sensor1.remove({
		_id: req.params.id
	}, function(error) {
		if(error)
			res.send(error);
		res.json({ message: 'Sensor1 excluída com Sucesso! '});
	});
	console.log('DELETE /sensor1/:id');
	} else {res.end('try again');}
});



//GET /atuador1
router.route('/atuador1').get(function(req, res) {
	if (req.session.auth==true) {
	var limit = parseInt(req.query._limit) || 20;
	var valor = req.query.valor || {$gte: 0};
	var sort = parseInt(req.query._sort) || -1;
	Atuador1.
	find().
	where({ valor: valor }).
	limit(limit).
	sort({ _id: sort })
	.exec(function(err, atuador1) {
		if (err)
			res.send(err);

		res.json(atuador1);
	});
	console.log('GET /atuador1');
	} else {res.end('try again');}
});

router.route('/atuador1/q').get(function(req, res) {
	if (req.session.auth==true) {
	Atuador1.apiQuery(req.query).exec(function(err, atuador1) {
		if (err)
			res.send(err);

		res.json(atuador1);
	});
	console.log('GET /atuador1/q');
	} else {res.end('try again');}
});

//GET /atuador1/recente
router.route('/atuador1/recente').get(function(req, res) {
	if (req.session.auth==true) {
	var limit =  1;
	var sort  = -1;
	Atuador1.
	find().
	limit(limit).
	sort({ _id: sort })
	.exec(function(err, atuador1) {
		if (err)
			res.send(err);

		res.json(atuador1);
	});
	console.log('GET /atuador1/recente');
	} else {res.end('try again');}
});

//GET /atuador1/elevada
router.route('/atuador1/elevada').get(function(req, res) {
	if (req.session.auth==true) {
	var limit = 10;
	var valor = {$gte: 30};
	var sort =  -1;
	
    Atuador1.
	find().
	where({ valor: valor }).
	limit(limit).
	sort({ _id: sort })
	.exec(function(err, atuador1) {
		if (err)
			res.send(err);

		res.json(atuador1);
	});
    console.log('GET /atuador1/elevada');
    } else {res.end('try again');}
});


//GET /atuador1/:id
router.route('/atuador1/:id').get(function(req, res) {
	if (req.session.auth==true) {
	Atuador1.findById(req.params.id, function(error, atuador1) {
		if(error)
			res.send(error);

		res.json(atuador1);
	});
	console.log('GET /atuador1/:id');
	} else {res.end('try again');}
});

/* POST /atuador1 {time:"..",valor:"..."} */
router.route('/atuador1').post(function(req, res) {
	if (req.session.auth==true) {
	var atuador1 = new Atuador1();

	atuador1.time = new Date();
	atuador1.valor = req.body.valor;

	client.publish('topic3-iot-cefetmg',  atuador1.valor); //MQTT: publica o valor da atuador1 no Tópico
	
	atuador1.save(function(error) {
		if (error)
			res.send(error);

		res.json({
			message : 'atuador1 inserida e publicada!'
		});
	});
		
	console.log('POST /atuador1');
	} else {res.end('try again');}
});

//PUT /atuador1/:id {time:"..",valor:"..."}
router.route('/atuador1/:id').put(function(req, res) {
	if (req.session.auth==true) {
	Atuador1.findById(req.params.id, function(error, atuador1) {
		if(error)
			res.send(error);

		atuador1.time = req.body.time;
		atuador1.valor = req.body.valor;

		atuador1.save(function(error) {
			if(error)
				res.send(error);
			res.json({ message: 'Atuador1 Atualizado!' });
		});
	});
	console.log('PUT /atuador1/:id');
	} else {res.end('try again');}
});

//DELETE /atuador1/:id
router.route('/atuador1/:id').delete(function(req, res) {
	if (req.session.auth==true) {
	Atuador1.remove({
		_id: req.params.id
	}, function(error) {
		if(error)
			res.send(error);
		res.json({ message: 'Atuador1 excluída com Sucesso! '});
	});
	console.log('DELETE /atuador1/:id');
	} else {res.end('try again');}
});

//GET /sensor2
router.route('/sensor2').get(function(req, res) {
	if (req.session.auth==true) {
	var limit = parseInt(req.query._limit) || 20;
	var valor = req.query.valor || {$gte: 0};
	var sort = parseInt(req.query._sort) || -1;
	Sensor2.
	find().
	where({ valor: valor }).
	limit(limit).
	sort({ _id: sort })
	.exec(function(err, sensor2) {
		if (err)
			res.send(err);

		res.json(sensor2);
	});
	console.log('GET /sensor2');
	} else {res.end('try again');}
});

router.route('/sensor2/q').get(function(req, res) {
	if (req.session.auth==true) {
	Sensor2.apiQuery(req.query).exec(function(err, sensor2) {
		if (err)
			res.send(err);

		res.json(sensor2);
	});
	console.log('GET /sensor2/q');
	} else {res.end('try again');}
});

//GET /sensor2/recente
router.route('/sensor2/recente').get(function(req, res) {
	if (req.session.auth==true) {
	var limit =  1;
	var sort  = -1;
	Sensor2.
	find().
	limit(limit).
	sort({ _id: sort })
	.exec(function(err, sensor2) {
		if (err)
			res.send(err);

		res.json(sensor2);
	});
	console.log('GET /sensor2/recente');
	} else {res.end('try again');}
});

//GET /sensor2/elevada
router.route('/sensor2/elevada').get(function(req, res) {
	if (req.session.auth==true) {
	var limit = 10;
	var valor = {$gte: 30};
	var sort =  -1;
	
    Sensor2.
	find().
	where({ valor: valor }).
	limit(limit).
	sort({ _id: sort })
	.exec(function(err, sensor2) {
		if (err)
			res.send(err);

		res.json(sensor2);
	});
    console.log('GET /sensor2/elevada');
    } else {res.end('try again');}
});


//GET /sensor2/:id
router.route('/sensor2/:id').get(function(req, res) {
	if (req.session.auth==true) {
	Sensor2.findById(req.params.id, function(error, sensor2) {
		if(error)
			res.send(error);

		res.json(sensor2);
	});
	console.log('GET /sensor2/:id');
	} else {res.end('try again');}
});

/* POST /sensor2 {time:"..",valor:"..."} */
router.route('/sensor2').post(function(req, res) {
	if (req.session.auth==true) {
	var sensor2 = new Sensor2();

	sensor2.time = new Date();
	sensor2.valor = req.body.valor;

	client.publish('topic4-iot-cefetmg',  sensor2.valor); //MQTT: publica o valor da sensor2 no Tópico
	
	sensor2.save(function(error) {
		if (error)
			res.send(error);

		res.json({
			message : 'sensor2 inserida e publicada!'
		});
	});
		
	console.log('POST /sensor2');
	} else {res.end('try again');}
});

//PUT /sensor2/:id {time:"..",valor:"..."}
router.route('/sensor2/:id').put(function(req, res) {
	if (req.session.auth==true) {
	Sensor2.findById(req.params.id, function(error, sensor2) {
		if(error)
			res.send(error);

		sensor2.time = req.body.time;
		sensor2.valor = req.body.valor;

		sensor2.save(function(error) {
			if(error)
				res.send(error);
			res.json({ message: 'Sensor2 Atualizado!' });
		});
	});
	console.log('PUT /sensor2/:id');
	} else {res.end('try again');}
});

//DELETE /sensor2/:id
router.route('/sensor2/:id').delete(function(req, res) {
	if (req.session.auth==true) {
	Sensor2.remove({
		_id: req.params.id
	}, function(error) {
		if(error)
			res.send(error);
		res.json({ message: 'Sensor2 excluída com Sucesso! '});
	});
	console.log('DELETE /sensor2/:id');
	} else {res.end('try again');}
});



//GET /atuador2
router.route('/atuador2').get(function(req, res) {
	if (req.session.auth==true) {
	var limit = parseInt(req.query._limit) || 20;
	var valor = req.query.valor || {$gte: 0};
	var sort = parseInt(req.query._sort) || -1;
	Atuador2.
	find().
	where({ valor: valor }).
	limit(limit).
	sort({ _id: sort })
	.exec(function(err, atuador2) {
		if (err)
			res.send(err);

		res.json(atuador2);
	});
	console.log('GET /atuador2');
	} else {res.end('try again');}
});

router.route('/atuador2/q').get(function(req, res) {
	if (req.session.auth==true) {
	Atuador2.apiQuery(req.query).exec(function(err, atuador2) {
		if (err)
			res.send(err);

		res.json(atuador2);
	});
	console.log('GET /atuador2/q');
	} else {res.end('try again');}
});

//GET /atuador2/recente
router.route('/atuador2/recente').get(function(req, res) {
	if (req.session.auth==true) {
	var limit =  1;
	var sort  = -1;
	Atuador2.
	find().
	limit(limit).
	sort({ _id: sort })
	.exec(function(err, atuador2) {
		if (err)
			res.send(err);

		res.json(atuador2);
	});
	console.log('GET /atuador2/recente');
	} else {res.end('try again');}
});

//GET /atuador2/elevada
router.route('/atuador2/elevada').get(function(req, res) {
	if (req.session.auth==true) {
	var limit = 10;
	var valor = {$gte: 30};
	var sort =  -1;
	
    Atuador2.
	find().
	where({ valor: valor }).
	limit(limit).
	sort({ _id: sort })
	.exec(function(err, atuador2) {
		if (err)
			res.send(err);

		res.json(atuador2);
	});
    console.log('GET /atuador2/elevada');
    } else {res.end('try again');}
});


//GET /atuador2/:id
router.route('/atuador2/:id').get(function(req, res) {
	if (req.session.auth==true) {
	Atuador2.findById(req.params.id, function(error, atuador2) {
		if(error)
			res.send(error);

		res.json(atuador2);
	});
	console.log('GET /atuador2/:id');
	} else {res.end('try again');}
});

/* POST /atuador2 {time:"..",valor:"..."} */
router.route('/atuador2').post(function(req, res) {
	if (req.session.auth==true) {
	var atuador2 = new Atuador2();

	atuador2.time = new Date();
	atuador2.valor = req.body.valor;

	client.publish('topic5-iot-cefetmg',  atuador2.valor); //MQTT: publica o valor da atuador2 no Tópico
	
	atuador2.save(function(error) {
		if (error)
			res.send(error);

		res.json({
			message : 'atuador2 inserida e publicada!'
		});
	});
		
	console.log('POST /atuador2');
	} else {res.end('try again');}
});

//PUT /atuador2/:id {time:"..",valor:"..."}
router.route('/atuador2/:id').put(function(req, res) {
	if (req.session.auth==true) {
	Atuador2.findById(req.params.id, function(error, atuador2) {
		if(error)
			res.send(error);

		atuador2.time = req.body.time;
		atuador2.valor = req.body.valor;

		atuador2.save(function(error) {
			if(error)
				res.send(error);
			res.json({ message: 'Atuador2 Atualizado!' });
		});
	});
	console.log('PUT /atuador2/:id');
	} else {res.end('try again');}
});

//DELETE /atuador2/:id
router.route('/atuador2/:id').delete(function(req, res) {
	if (req.session.auth==true) {
	Atuador2.remove({
		_id: req.params.id
	}, function(error) {
		if(error)
			res.send(error);
		res.json({ message: 'Atuador2 excluída com Sucesso! '});
	});
	console.log('DELETE /atuador2/:id');
	} else {res.end('try again');}
});

//GET /sensor3
router.route('/sensor3').get(function(req, res) {
	if (req.session.auth==true) {
	var limit = parseInt(req.query._limit) || 20;
	var valor = req.query.valor || {$gte: 0};
	var sort = parseInt(req.query._sort) || -1;
	Sensor3.
	find().
	where({ valor: valor }).
	limit(limit).
	sort({ _id: sort })
	.exec(function(err, sensor3) {
		if (err)
			res.send(err);

		res.json(sensor3);
	});
	console.log('GET /sensor3');
	} else {res.end('try again');}
});

router.route('/sensor3/q').get(function(req, res) {
	if (req.session.auth==true) {
	Sensor3.apiQuery(req.query).exec(function(err, sensor3) {
		if (err)
			res.send(err);

		res.json(sensor3);
	});
	console.log('GET /sensor3/q');
	} else {res.end('try again');}
});

//GET /sensor3/recente
router.route('/sensor3/recente').get(function(req, res) {
	if (req.session.auth==true) {
	var limit =  1;
	var sort  = -1;
	Sensor3.
	find().
	limit(limit).
	sort({ _id: sort })
	.exec(function(err, sensor3) {
		if (err)
			res.send(err);

		res.json(sensor3);
	});
	console.log('GET /sensor3/recente');
	} else {res.end('try again');}
});

//GET /sensor3/elevada
router.route('/sensor3/elevada').get(function(req, res) {
	if (req.session.auth==true) {
	var limit = 10;
	var valor = {$gte: 30};
	var sort =  -1;
	
    Sensor3.
	find().
	where({ valor: valor }).
	limit(limit).
	sort({ _id: sort })
	.exec(function(err, sensor3) {
		if (err)
			res.send(err);

		res.json(sensor3);
	});
    console.log('GET /sensor3/elevada');
    } else {res.end('try again');}
});


//GET /sensor3/:id
router.route('/sensor3/:id').get(function(req, res) {
	if (req.session.auth==true) {
	Sensor3.findById(req.params.id, function(error, sensor3) {
		if(error)
			res.send(error);

		res.json(sensor3);
	});
	console.log('GET /sensor3/:id');
	} else {res.end('try again');}
});

/* POST /sensor3 {time:"..",valor:"..."} */
router.route('/sensor3').post(function(req, res) {
	if (req.session.auth==true) {
	var sensor3 = new Sensor3();

	sensor3.time = new Date();
	sensor3.valor = req.body.valor;

	client.publish('topic6-iot-cefetmg',  sensor3.valor); //MQTT: publica o valor da sensor3 no Tópico
	
	sensor3.save(function(error) {
		if (error)
			res.send(error);

		res.json({
			message : 'sensor3 inserida e publicada!'
		});
	});
		
	console.log('POST /sensor3');
	} else {res.end('try again');}
});

//PUT /sensor3/:id {time:"..",valor:"..."}
router.route('/sensor3/:id').put(function(req, res) {
	if (req.session.auth==true) {
	Sensor3.findById(req.params.id, function(error, sensor3) {
		if(error)
			res.send(error);

		sensor3.time = req.body.time;
		sensor3.valor = req.body.valor;

		sensor3.save(function(error) {
			if(error)
				res.send(error);
			res.json({ message: 'Sensor3 Atualizado!' });
		});
	});
	console.log('PUT /sensor3/:id');
	} else {res.end('try again');}
});

//DELETE /sensor3/:id
router.route('/sensor3/:id').delete(function(req, res) {
	if (req.session.auth==true) {
	Sensor3.remove({
		_id: req.params.id
	}, function(error) {
		if(error)
			res.send(error);
		res.json({ message: 'Sensor3 excluída com Sucesso! '});
	});
	console.log('DELETE /sensor3/:id');
	} else {res.end('try again');}
});



//GET /atuador3
router.route('/atuador3').get(function(req, res) {
	if (req.session.auth==true) {
	var limit = parseInt(req.query._limit) || 20;
	var valor = req.query.valor || {$gte: 0};
	var sort = parseInt(req.query._sort) || -1;
	Atuador3.
	find().
	where({ valor: valor }).
	limit(limit).
	sort({ _id: sort })
	.exec(function(err, atuador3) {
		if (err)
			res.send(err);

		res.json(atuador3);
	});
	console.log('GET /atuador3');
	} else {res.end('try again');}
});

router.route('/atuador3/q').get(function(req, res) {
	if (req.session.auth==true) {
	Atuador3.apiQuery(req.query).exec(function(err, atuador3) {
		if (err)
			res.send(err);

		res.json(atuador3);
	});
	console.log('GET /atuador3/q');
	} else {res.end('try again');}
});

//GET /atuador3/recente
router.route('/atuador3/recente').get(function(req, res) {
	if (req.session.auth==true) {
	var limit =  1;
	var sort  = -1;
	Atuador3.
	find().
	limit(limit).
	sort({ _id: sort })
	.exec(function(err, atuador3) {
		if (err)
			res.send(err);

		res.json(atuador3);
	});
	console.log('GET /atuador3/recente');
	} else {res.end('try again');}
});

//GET /atuador3/elevada
router.route('/atuador3/elevada').get(function(req, res) {
	if (req.session.auth==true) {
	var limit = 10;
	var valor = {$gte: 30};
	var sort =  -1;
	
    Atuador3.
	find().
	where({ valor: valor }).
	limit(limit).
	sort({ _id: sort })
	.exec(function(err, atuador3) {
		if (err)
			res.send(err);

		res.json(atuador3);
	});
    console.log('GET /atuador3/elevada');
    } else {res.end('try again');}
});


//GET /atuador3/:id
router.route('/atuador3/:id').get(function(req, res) {
	if (req.session.auth==true) {
	Atuador3.findById(req.params.id, function(error, atuador3) {
		if(error)
			res.send(error);

		res.json(atuador3);
	});
	console.log('GET /atuador3/:id');
	} else {res.end('try again');}
});

/* POST /atuador3 {time:"..",valor:"..."} */
router.route('/atuador3').post(function(req, res) {
	if (req.session.auth==true) {
	var atuador3 = new Atuador3();

	atuador3.time = new Date();
	atuador3.valor = req.body.valor;

	client.publish('topic7-iot-cefetmg',  atuador3.valor); //MQTT: publica o valor da atuador3 no Tópico
	
	atuador3.save(function(error) {
		if (error)
			res.send(error);

		res.json({
			message : 'atuador3 inserida e publicada!'
		});
	});
		
	console.log('POST /atuador3');
	} else {res.end('try again');}
});

//PUT /atuador3/:id {time:"..",valor:"..."}
router.route('/atuador3/:id').put(function(req, res) {
	if (req.session.auth==true) {
	Atuador3.findById(req.params.id, function(error, atuador3) {
		if(error)
			res.send(error);

		atuador3.time = req.body.time;
		atuador3.valor = req.body.valor;

		atuador3.save(function(error) {
			if(error)
				res.send(error);
			res.json({ message: 'Atuador3 Atualizado!' });
		});
	});
	console.log('PUT /atuador3/:id');
	} else {res.end('try again');}
});

//DELETE /atuador3/:id
router.route('/atuador3/:id').delete(function(req, res) {
	if (req.session.auth==true) {
	Atuador3.remove({
		_id: req.params.id
	}, function(error) {
		if(error)
			res.send(error);
		res.json({ message: 'Atuador3 excluída com Sucesso! '});
	});
	console.log('DELETE /atuador3/:id');
	} else {res.end('try again');}
});


//GET /luisa
router.route('/luisa').get(function(req, res) {
	var limit = parseInt(req.query._limit) || 20;
	var valor = req.query.valor || {$gte: 0};
	var sort = parseInt(req.query._sort) || -1;
	Luisa.
	find().
	where({ valor: valor }).
	limit(limit).
	sort({ _id: sort })
	.exec(function(err, luisa) {
		if (err)
			res.send(err);

		res.json(luisa);
	});
	console.log('GET /luisa');
});

router.route('/luisa/q').get(function(req, res) {
	Luisa.apiQuery(req.query).exec(function(err, luisa) {
		if (err)
			res.send(err);

		res.json(luisa);
	});
	console.log('GET /luisa/q');
});

//GET /luisa/recente
router.route('/luisa/recente').get(function(req, res) {
	var limit =  1;
	var sort  = -1;
	Luisa.
	find().
	limit(limit).
	sort({ _id: sort })
	.exec(function(err, luisa) {
		if (err)
			res.send(err);

		res.json(luisa);
	});
	console.log('GET /luisa/recente');
});

//GET /luisa/elevada
router.route('/luisa/elevada').get(function(req, res) {
	var limit = 10;
	var valor = {$gte: 30};
	var sort =  -1;
	
    Luisa.
	find().
	where({ valor: valor }).
	limit(limit).
	sort({ _id: sort })
	.exec(function(err, luisa) {
		if (err)
			res.send(err);

		res.json(luisa);
	});
    console.log('GET /luisa/elevada');
});


//GET /luisa/:id
router.route('/luisa/:id').get(function(req, res) {
	Luisa.findById(req.params.id, function(error, luisa) {
		if(error)
			res.send(error);

		res.json(luisa);
	});
	console.log('GET /luisa/:id');
});

/* POST /luisa {time:"..",valor:"..."} */
router.route('/luisa').post(function(req, res) {
	var luisa = new Luisa();

	luisa.time = new Date();
	luisa.valor = req.body.valor;

	client.publish('topic8-iot-cefetmg',  luisa.valor); //MQTT: publica o valor da luisa no Tópico
	
	luisa.save(function(error) {
		if (error)
			res.send(error);

		res.json({
			message : 'luisa inserida e publicada!'
		});
	});
		
	console.log('POST /luisa');
});

//PUT /luisa/:id {time:"..",valor:"..."}
router.route('/luisa/:id').put(function(req, res) {
	Luisa.findById(req.params.id, function(error, luisa) {
		if(error)
			res.send(error);

		luisa.time = req.body.time;
		luisa.valor = req.body.valor;

		luisa.save(function(error) {
			if(error)
				res.send(error);
			res.json({ message: 'Luisa Atualizado!' });
		});
	});
	console.log('PUT /luisa/:id');
});

//DELETE /luisa/:id
router.route('/luisa/:id').delete(function(req, res) {
	Luisa.remove({
		_id: req.params.id
	}, function(error) {
		if(error)
			res.send(error);
		res.json({ message: 'Luisa excluída com Sucesso! '});
	});
	console.log('DELETE /luisa/:id');
});


app.use('/', router);

app.listen(3000);
console.log('Servidor executando.');