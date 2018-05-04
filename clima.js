/**
 * Pós Graduação Internet das Coisas - CEFET-MG Disciplina: Programação para
 * Sistemas de Computação Exemplo prático de RESTFul com NodeJS e MongoDB
 */

/* Módulos Utilizados */
var express = require('express'); 
var cors = require('cors'); 
var bodyParser = require('body-parser'); 
var Temperatura = require('./models/temperatura'); // Modelos definidos 
var Humidade = require('./models/humidade'); // Modelos definidos
var Sensor1 = require('./models/sensor1'); // Modelos definidos
var Sensor2 = require('./models/sensor2'); // Modelos definidos
var Sensor3 = require('./models/sensor3'); // Modelos definidos
var Atuador1 = require('./models/atuador1'); // Modelos definidos
var Atuador2 = require('./models/atuador2'); // Modelos definidos
var Atuador3 = require('./models/atuador3'); // Modelos definidos
var Luisa = require('./models/luisa'); // Modelos definidos 

var mongoose = require('mongoose');

var url = "mongodb://localhost:27017/sensor";
mongoose.connect(url);

var app = express(); // Cria o app com Express
var router = express.Router();

app.use(cors()); // liberar todos os do app acessos CORS
app.use(bodyParser.urlencoded({ 
	extended : true
})); 
app.use(bodyParser.json()); // configurações do body parser

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

// Começando com a temperatura

//GET /temperatura
router.route('/temperatura').get(function(req, res) {
	Temperatura.find(function(err, temperatura) {
		if (err)
			res.send(err);

		res.json(temperatura);
	});
	console.log('GET /temperatura');
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

	temperatura.time = req.body.time;
	temperatura.valor = req.body.valor;

	temperatura.save(function(error) {
		if (error)
			res.send(error);

		res.json({
			message : 'temperatura criada!'
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


// Começando a humidade

//GET /humidade
router.route('/humidade').get(function(req, res) {
	Humidade.find(function(err, humidade) {
		if (err)
			res.send(err);

		res.json(humidade);
	});
	console.log('GET /humidade');
});

//GET /humidade/:id
router.route('/humidade/:id').get(function(req, res) {
	Humidade.findById(req.params.id, function(error, humidade) {
		if(error)
			res.send(error);

		res.json(humidade);
	});
	console.log('GET /humidade/:id');
});

/* POST /humidade {time:"..",valor:"..."} */
router.route('/humidade').post(function(req, res) {
	var humidade = new Humidade();

	humidade.time = req.body.time;
	humidade.valor = req.body.valor;

	humidade.save(function(error) {
		if (error)
			res.send(error);

		res.json({
			message : 'humidade criada!'
		});
	});
	console.log('POST /humidade');
});

//PUT /humidade/:id {time:"..",valor:"..."}
router.route('/humidade/:id').put(function(req, res) {
	Humidade.findById(req.params.id, function(error, humidade) {
		if(error)
			res.send(error);

		humidade.time = req.body.time;
		humidade.valor = req.body.valor;

		humidade.save(function(error) {
			if(error)
				res.send(error);
			res.json({ message: 'Humidade Atualizada!' });
		});
	});
	console.log('PUT /humidade/:id');
});

//DELETE /humidade/:id
router.route('/humidade/:id').delete(function(req, res) {
	Humidade.remove({
		_id: req.params.id
	}, function(error) {
		if(error)
			res.send(error);
		res.json({ message: 'Humidade excluída com Sucesso! '});
	});
	console.log('DELETE /humidade/:id');
});

// Começando com a temperatura

//GET /sensor1
router.route('/sensor1').get(function(req, res) {
	Sensor1.find(function(err, sensor1) {
		if (err)
			res.send(err);

		res.json(sensor1);
	});
	console.log('GET /sensor1');
});

//GET /temperatura/:id
router.route('/sensor1/:id').get(function(req, res) {
	Sensor1.findById(req.params.id, function(error, sensor1) {
		if(error)
			res.send(error);

		res.json(sensor1);
	});
	console.log('GET /sensor1/:id');
});

/* POST /sensnro1 {time:"..",valor:"..."} */
router.route('/sensor1').post(function(req, res) {
	var sensor1 = new Sensor1();

	sensor1.time = req.body.time;
	sensor1.valor = req.body.valor;

	sensor1.save(function(error) {
		if (error)
			res.send(error);

		res.json({
			message : 'sensor1 criada!'
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


// Começando a atuador1

//GET /atuador1
router.route('/atuador1').get(function(req, res) {
	Atuador1.find(function(err, atuador1) {
		if (err)
			res.send(err);

		res.json(atuador1);
	});
	console.log('GET /atuador1');
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

	atuador1.time = req.body.time;
	atuador1.valor = req.body.valor;

	atuador1.save(function(error) {
		if (error)
			res.send(error);

		res.json({
			message : 'atuador1 criada!'
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
			res.json({ message: 'Atuador1 Atualizada!' });
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




app.use('/', router);

app.listen(3000);
console.log('Servidor executando.');
