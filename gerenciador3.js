/**
 * Pós Graduação Internet das Coisas - CEFET-MG Disciplina: Programação para
 * Sistemas de Computação Exemplo prático de RESTFul com NodeJS e MongoDB
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

require('mongoose-middleware').initialize(mongoose);

mongoose.connect("mongodb://localhost:27017/sensor");
var client = mqtt.connect('tcp://localhost'); //inicia o mqtt

var app = express(); // Cria o app com Express
var router = express.Router();

app.use(cors()); // liberar todos os do app acessos CORS
app.use(bodyParser.urlencoded({ 
	extended : true
})); 
app.use(bodyParser.json()); // configurações do body parser

client.on('connect', function () {
   	 client.subscribe('topic-iot-cefetmg'); //conecta e assina o tópico MQTT
});

client.on('connect', function () {
   	 client.subscribe('topic-iot-cefetmgu'); //conecta e assina o tópico MQTT
});

client.on('connect', function () {
   	 client.subscribe('topic-iot-cefetmgs1'); //conecta e assina o tópico MQTT
});

client.on('connect', function () {
   	 client.subscribe('topic-iot-cefetmga1'); //conecta e assina o tópico MQTT
});

client.on('connect', function () {
   	 client.subscribe('topic-iot-cefetmgs2'); //conecta e assina o tópico MQTT
});

client.on('connect', function () {
   	 client.subscribe('topic-iot-cefetmga2'); //conecta e assina o tópico MQTT
});

client.on('connect', function () {
   	 client.subscribe('topic-iot-cefetmgs3'); //conecta e assina o tópico MQTT
});

client.on('connect', function () {
   	 client.subscribe('topic-iot-cefetmga3'); //conecta e assina o tópico MQTT
});

client.on('connect', function () {
   	 client.subscribe('topic-iot-cefetmgl'); //conecta e assina o tópico MQTT
});

client.on('message', function (topic, message) { //aguarda mensagem do tópico assinado MQTT 
	  console.log(topic.toString());
	  console.log(message.toString());
	  var payload       = message.toString();
	  var message_topic = topic.toString();
	  
	  var temperatura = new Temperatura();
	  var umidade = new Umidade();
	  var sensor1 = new Sensor1();
	  var atuador1 = new Atuador1();
  	  var sensor2 = new Sensor2();
	  var atuador2 = new Atuador2();
  	  var sensor3 = new Sensor3();
	  var atuador3 = new Atuador3();
  	  var luisa = new Luisa();

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
	
});

/* Rota para acompanhar as requisições */
router.use(function(req, res, next) {
	console.log('Entrou na rota ');
	next(); // continua na próxima rota
});

//GET /
router.get('/', function(req, res) {
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
});

router.route('/temperatura/q').get(function(req, res) {
	Temperatura.apiQuery(req.query).exec(function(err, temperatura) {
		if (err)
			res.send(err);

		res.json(temperatura);
	});
	console.log('GET /temperatura/q');
});

//GET /temperatura/recente
router.route('/temperatura/recente').get(function(req, res) {
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
});

//GET /temperatura/elevada
router.route('/temperatura/elevada').get(function(req, res) {
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
});


//GET /temperatura/:id
router.route('/temperatura/:id').get(function(req, res) {
	Temperatura.findById(req.params.id, function(error, temperatura) {
		if(error)
			res.send(error);

		res.json(temperatura);
	});
	console.log('GET /temperatura/:id');
});

/* POST /temperatura {time:"..",valor:"..."} */
router.route('/temperatura').post(function(req, res) {
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
});

//PUT /temperatura/:id {time:"..",valor:"..."}
router.route('/temperatura/:id').put(function(req, res) {
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
});

//DELETE /temperatura/:id
router.route('/temperatura/:id').delete(function(req, res) {
	Temperatura.remove({
		_id: req.params.id
	}, function(error) {
		if(error)
			res.send(error);
		res.json({ message: 'Temperatura excluída com Sucesso! '});
	});
	console.log('DELETE /temperatura/:id');
});



//GET /umidade
router.route('/umidade').get(function(req, res) {
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
});

router.route('/umidade/q').get(function(req, res) {
	Umidade.apiQuery(req.query).exec(function(err, umidade) {
		if (err)
			res.send(err);

		res.json(umidade);
	});
	console.log('GET /umidade/q');
});

//GET /umidade/recente
router.route('/umidade/recente').get(function(req, res) {
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
});

//GET /umidade/elevada
router.route('/umidade/elevada').get(function(req, res) {
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
});


//GET /umidade/:id
router.route('/umidade/:id').get(function(req, res) {
	Umidade.findById(req.params.id, function(error, umidade) {
		if(error)
			res.send(error);

		res.json(umidade);
	});
	console.log('GET /umidade/:id');
});

/* POST /umidade {time:"..",valor:"..."} */
router.route('/umidade').post(function(req, res) {
	var umidade = new Umidade();

	umidade.time = new Date();
	umidade.valor = req.body.valor;

	client.publish('topic-iot-cefetmgu',  umidade.valor); //MQTT: publica o valor da umidade no Tópico
	
	umidade.save(function(error) {
		if (error)
			res.send(error);

		res.json({
			message : 'umidade inserida e publicada!'
		});
	});
		
	console.log('POST /umidade');
});

//PUT /umidade/:id {time:"..",valor:"..."}
router.route('/umidade/:id').put(function(req, res) {
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
});

//DELETE /umidade/:id
router.route('/umidade/:id').delete(function(req, res) {
	Umidade.remove({
		_id: req.params.id
	}, function(error) {
		if(error)
			res.send(error);
		res.json({ message: 'Umidade excluída com Sucesso! '});
	});
	console.log('DELETE /umidade/:id');
});

//GET /sensor1
router.route('/sensor1').get(function(req, res) {
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
});

router.route('/sensor1/q').get(function(req, res) {
	Sensor1.apiQuery(req.query).exec(function(err, sensor1) {
		if (err)
			res.send(err);

		res.json(sensor1);
	});
	console.log('GET /sensor1/q');
});

//GET /sensor1/recente
router.route('/sensor1/recente').get(function(req, res) {
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
});

//GET /sensor1/elevada
router.route('/sensor1/elevada').get(function(req, res) {
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
});


//GET /sensor1/:id
router.route('/sensor1/:id').get(function(req, res) {
	Sensor1.findById(req.params.id, function(error, sensor1) {
		if(error)
			res.send(error);

		res.json(sensor1);
	});
	console.log('GET /sensor1/:id');
});

/* POST /sensor1 {time:"..",valor:"..."} */
router.route('/sensor1').post(function(req, res) {
	var sensor1 = new Sensor1();

	sensor1.time = new Date();
	sensor1.valor = req.body.valor;

	client.publish('topic-iot-cefetmgs1',  sensor1.valor); //MQTT: publica o valor da sensor1 no Tópico
	
	sensor1.save(function(error) {
		if (error)
			res.send(error);

		res.json({
			message : 'sensor1 inserida e publicada!'
		});
	});
		
	console.log('POST /sensor1');
});

//PUT /sensor1/:id {time:"..",valor:"..."}
router.route('/sensor1/:id').put(function(req, res) {
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
});

//DELETE /sensor1/:id
router.route('/sensor1/:id').delete(function(req, res) {
	Sensor1.remove({
		_id: req.params.id
	}, function(error) {
		if(error)
			res.send(error);
		res.json({ message: 'Sensor1 excluída com Sucesso! '});
	});
	console.log('DELETE /sensor1/:id');
});



//GET /atuador1
router.route('/atuador1').get(function(req, res) {
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
});

router.route('/atuador1/q').get(function(req, res) {
	Atuador1.apiQuery(req.query).exec(function(err, atuador1) {
		if (err)
			res.send(err);

		res.json(atuador1);
	});
	console.log('GET /atuador1/q');
});

//GET /atuador1/recente
router.route('/atuador1/recente').get(function(req, res) {
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
});

//GET /atuador1/elevada
router.route('/atuador1/elevada').get(function(req, res) {
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
});


//GET /atuador1/:id
router.route('/atuador1/:id').get(function(req, res) {
	Atuador1.findById(req.params.id, function(error, atuador1) {
		if(error)
			res.send(error);

		res.json(atuador1);
	});
	console.log('GET /atuador1/:id');
});

/* POST /atuador1 {time:"..",valor:"..."} */
router.route('/atuador1').post(function(req, res) {
	var atuador1 = new Atuador1();

	atuador1.time = new Date();
	atuador1.valor = req.body.valor;

	client.publish('topic-iot-cefetmga1',  atuador1.valor); //MQTT: publica o valor da atuador1 no Tópico
	
	atuador1.save(function(error) {
		if (error)
			res.send(error);

		res.json({
			message : 'atuador1 inserida e publicada!'
		});
	});
		
	console.log('POST /atuador1');
});

//PUT /atuador1/:id {time:"..",valor:"..."}
router.route('/atuador1/:id').put(function(req, res) {
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
});

//DELETE /atuador1/:id
router.route('/atuador1/:id').delete(function(req, res) {
	Atuador1.remove({
		_id: req.params.id
	}, function(error) {
		if(error)
			res.send(error);
		res.json({ message: 'Atuador1 excluída com Sucesso! '});
	});
	console.log('DELETE /atuador1/:id');
});

//GET /sensor2
router.route('/sensor2').get(function(req, res) {
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
});

router.route('/sensor2/q').get(function(req, res) {
	Sensor2.apiQuery(req.query).exec(function(err, sensor2) {
		if (err)
			res.send(err);

		res.json(sensor2);
	});
	console.log('GET /sensor2/q');
});

//GET /sensor2/recente
router.route('/sensor2/recente').get(function(req, res) {
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
});

//GET /sensor2/elevada
router.route('/sensor2/elevada').get(function(req, res) {
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
});


//GET /sensor2/:id
router.route('/sensor2/:id').get(function(req, res) {
	Sensor2.findById(req.params.id, function(error, sensor2) {
		if(error)
			res.send(error);

		res.json(sensor2);
	});
	console.log('GET /sensor2/:id');
});

/* POST /sensor2 {time:"..",valor:"..."} */
router.route('/sensor2').post(function(req, res) {
	var sensor2 = new Sensor2();

	sensor2.time = new Date();
	sensor2.valor = req.body.valor;

	client.publish('topic-iot-cefetmgs2',  sensor2.valor); //MQTT: publica o valor da sensor2 no Tópico
	
	sensor2.save(function(error) {
		if (error)
			res.send(error);

		res.json({
			message : 'sensor2 inserida e publicada!'
		});
	});
		
	console.log('POST /sensor2');
});

//PUT /sensor2/:id {time:"..",valor:"..."}
router.route('/sensor2/:id').put(function(req, res) {
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
});

//DELETE /sensor2/:id
router.route('/sensor2/:id').delete(function(req, res) {
	Sensor2.remove({
		_id: req.params.id
	}, function(error) {
		if(error)
			res.send(error);
		res.json({ message: 'Sensor2 excluída com Sucesso! '});
	});
	console.log('DELETE /sensor2/:id');
});



//GET /atuador2
router.route('/atuador2').get(function(req, res) {
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
});

router.route('/atuador2/q').get(function(req, res) {
	Atuador2.apiQuery(req.query).exec(function(err, atuador2) {
		if (err)
			res.send(err);

		res.json(atuador2);
	});
	console.log('GET /atuador2/q');
});

//GET /atuador2/recente
router.route('/atuador2/recente').get(function(req, res) {
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
});

//GET /atuador2/elevada
router.route('/atuador2/elevada').get(function(req, res) {
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
});


//GET /atuador2/:id
router.route('/atuador2/:id').get(function(req, res) {
	Atuador2.findById(req.params.id, function(error, atuador2) {
		if(error)
			res.send(error);

		res.json(atuador2);
	});
	console.log('GET /atuador2/:id');
});

/* POST /atuador2 {time:"..",valor:"..."} */
router.route('/atuador2').post(function(req, res) {
	var atuador2 = new Atuador2();

	atuador2.time = new Date();
	atuador2.valor = req.body.valor;

	client.publish('topic-iot-cefetmga2',  atuador2.valor); //MQTT: publica o valor da atuador2 no Tópico
	
	atuador2.save(function(error) {
		if (error)
			res.send(error);

		res.json({
			message : 'atuador2 inserida e publicada!'
		});
	});
		
	console.log('POST /atuador2');
});

//PUT /atuador2/:id {time:"..",valor:"..."}
router.route('/atuador2/:id').put(function(req, res) {
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
});

//DELETE /atuador2/:id
router.route('/atuador2/:id').delete(function(req, res) {
	Atuador2.remove({
		_id: req.params.id
	}, function(error) {
		if(error)
			res.send(error);
		res.json({ message: 'Atuador2 excluída com Sucesso! '});
	});
	console.log('DELETE /atuador2/:id');
});

//GET /sensor3
router.route('/sensor3').get(function(req, res) {
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
});

router.route('/sensor3/q').get(function(req, res) {
	Sensor3.apiQuery(req.query).exec(function(err, sensor3) {
		if (err)
			res.send(err);

		res.json(sensor3);
	});
	console.log('GET /sensor3/q');
});

//GET /sensor3/recente
router.route('/sensor3/recente').get(function(req, res) {
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
});

//GET /sensor3/elevada
router.route('/sensor3/elevada').get(function(req, res) {
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
});


//GET /sensor3/:id
router.route('/sensor3/:id').get(function(req, res) {
	Sensor3.findById(req.params.id, function(error, sensor3) {
		if(error)
			res.send(error);

		res.json(sensor3);
	});
	console.log('GET /sensor3/:id');
});

/* POST /sensor3 {time:"..",valor:"..."} */
router.route('/sensor3').post(function(req, res) {
	var sensor3 = new Sensor3();

	sensor3.time = new Date();
	sensor3.valor = req.body.valor;

	client.publish('topic-iot-cefetmgs3',  sensor3.valor); //MQTT: publica o valor da sensor3 no Tópico
	
	sensor3.save(function(error) {
		if (error)
			res.send(error);

		res.json({
			message : 'sensor3 inserida e publicada!'
		});
	});
		
	console.log('POST /sensor3');
});

//PUT /sensor3/:id {time:"..",valor:"..."}
router.route('/sensor3/:id').put(function(req, res) {
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
});

//DELETE /sensor3/:id
router.route('/sensor3/:id').delete(function(req, res) {
	Sensor3.remove({
		_id: req.params.id
	}, function(error) {
		if(error)
			res.send(error);
		res.json({ message: 'Sensor3 excluída com Sucesso! '});
	});
	console.log('DELETE /sensor3/:id');
});



//GET /atuador3
router.route('/atuador3').get(function(req, res) {
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
});

router.route('/atuador3/q').get(function(req, res) {
	Atuador3.apiQuery(req.query).exec(function(err, atuador3) {
		if (err)
			res.send(err);

		res.json(atuador3);
	});
	console.log('GET /atuador3/q');
});

//GET /atuador3/recente
router.route('/atuador3/recente').get(function(req, res) {
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
});

//GET /atuador3/elevada
router.route('/atuador3/elevada').get(function(req, res) {
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
});


//GET /atuador3/:id
router.route('/atuador3/:id').get(function(req, res) {
	Atuador3.findById(req.params.id, function(error, atuador3) {
		if(error)
			res.send(error);

		res.json(atuador3);
	});
	console.log('GET /atuador3/:id');
});

/* POST /atuador3 {time:"..",valor:"..."} */
router.route('/atuador3').post(function(req, res) {
	var atuador3 = new Atuador3();

	atuador3.time = new Date();
	atuador3.valor = req.body.valor;

	client.publish('topic-iot-cefetmga3',  atuador3.valor); //MQTT: publica o valor da atuador3 no Tópico
	
	atuador3.save(function(error) {
		if (error)
			res.send(error);

		res.json({
			message : 'atuador3 inserida e publicada!'
		});
	});
		
	console.log('POST /atuador3');
});

//PUT /atuador3/:id {time:"..",valor:"..."}
router.route('/atuador3/:id').put(function(req, res) {
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
});

//DELETE /atuador3/:id
router.route('/atuador3/:id').delete(function(req, res) {
	Atuador3.remove({
		_id: req.params.id
	}, function(error) {
		if(error)
			res.send(error);
		res.json({ message: 'Atuador3 excluída com Sucesso! '});
	});
	console.log('DELETE /atuador3/:id');
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

	client.publish('topic-iot-cefetmgl',  luisa.valor); //MQTT: publica o valor da luisa no Tópico
	
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