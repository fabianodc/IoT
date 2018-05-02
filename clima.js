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
var sensor1 = require('./models/sensor1'); // Modelos definidos
var sensor2 = require('./models/sensor2'); // Modelos definidos
var sensor3 = require('./models/sensor3'); // Modelos definidos
var atuador1 = require('./models/atuador1'); // Modelos definidos
var atuador2 = require('./models/atuador2'); // Modelos definidos
var atuador3 = require('./models/atuador3'); // Modelos definidos
var luisa = require('./models/luisa'); // Modelos definidos 

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

app.use('/', router);

app.listen(3000);
console.log('Servidor executando.');

//GET /sensor1
router.route('/sensor1').get(function(req, res) {
	sensor1.find(function(err, sensor1) {
		if (err)
			res.send(err);

		res.json(sensor1);
	});
	console.log('GET /sensor1');
});

//GET /sensor1/:id
router.route('/sensor1/:id').get(function(req, res) {
	sensor1.findById(req.params.id, function(error, sensor1) {
		if(error)
			res.send(error);

		res.json(sensor1);
	});
	console.log('GET /sensor1/:id');
});

/* POST /sensor1 {time:"..",valor:"..."} */
router.route('/sensor1').post(function(req, res) {
	var sensor1 = new sensor1();

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
	sensor1.findById(req.params.id, function(error, sensor1) {
		if(error)
			res.send(error);

		sensor1.time = req.body.time;
		sensor1.valor = req.body.valor;

		sensor1.save(function(error) {
			if(error)
				res.send(error);
			res.json({ message: 'sensor1 Atualizado!' });
		});
	});
	console.log('PUT /sensor1/:id');
});

//DELETE /sensor1/:id
router.route('/sensor1/:id').delete(function(req, res) {
	sensor1.remove({
		_id: req.params.id
	}, function(error) {
		if(error)
			res.send(error);
		res.json({ message: 'sensor1 excluída com Sucesso! '});
	});
	console.log('DELETE /sensor1/:id');
});

//GET /sensor2
router.route('/sensor2').get(function(req, res) {
	sensor2.find(function(err, sensor2) {
		if (err)
			res.send(err);

		res.json(sensor2);
	});
	console.log('GET /sensor2');
});

//GET /sensor2/:id
router.route('/sensor2/:id').get(function(req, res) {
	sensor2.findById(req.params.id, function(error, sensor2) {
		if(error)
			res.send(error);

		res.json(sensor2);
	});
	console.log('GET /sensor2/:id');
});

/* POST /sensor2 {time:"..",valor:"..."} */
router.route('/sensor2').post(function(req, res) {
	var sensor2 = new sensor2();

	sensor2.time = req.body.time;
	sensor2.valor = req.body.valor;

	sensor2.save(function(error) {
		if (error)
			res.send(error);

		res.json({
			message : 'sensor2 criada!'
		});
	});
	console.log('POST /sensor2');
});

//PUT /sensor2/:id {time:"..",valor:"..."}
router.route('/sensor2/:id').put(function(req, res) {
	sensor2.findById(req.params.id, function(error, sensor2) {
		if(error)
			res.send(error);

		sensor2.time = req.body.time;
		sensor2.valor = req.body.valor;

		sensor2.save(function(error) {
			if(error)
				res.send(error);
			res.json({ message: 'sensor1 Atualizado!' });
		});
	});
	console.log('PUT /sensor2/:id');
});

//DELETE /sensor2/:id
router.route('/sensor2/:id').delete(function(req, res) {
	sensor2.remove({
		_id: req.params.id
	}, function(error) {
		if(error)
			res.send(error);
		res.json({ message: 'sensor2 excluída com Sucesso! '});
	});
	console.log('DELETE /sensor2/:id');
});

//GET /sensor3
router.route('/sensor3').get(function(req, res) {
	sensor3.find(function(err, sensor3) {
		if (err)
			res.send(err);

		res.json(sensor3);
	});
	console.log('GET /sensor3');
});

//GET /sensor3/:id
router.route('/sensor3/:id').get(function(req, res) {
	sensor3.findById(req.params.id, function(error, sensor3) {
		if(error)
			res.send(error);

		res.json(sensor3);
	});
	console.log('GET /sensor3/:id');
});

/* POST /sensor3 {time:"..",valor:"..."} */
router.route('/sensor3').post(function(req, res) {
	var sensor3 = new sensor3();

	sensor3.time = req.body.time;
	sensor3.valor = req.body.valor;

	sensor3.save(function(error) {
		if (error)
			res.send(error);

		res.json({
			message : 'sensor3 criada!'
		});
	});
	console.log('POST /sensor3');
});

//PUT /sensor3/:id {time:"..",valor:"..."}
router.route('/sensor3/:id').put(function(req, res) {
	sensor3.findById(req.params.id, function(error, sensor3) {
		if(error)
			res.send(error);

		sensor3.time = req.body.time;
		sensor3.valor = req.body.valor;

		sensor3.save(function(error) {
			if(error)
				res.send(error);
			res.json({ message: 'sensor3 Atualizado!' });
		});
	});
	console.log('PUT /sensor3/:id');
});

//DELETE /sensor3/:id
router.route('/sensor3/:id').delete(function(req, res) {
	sensor3.remove({
		_id: req.params.id
	}, function(error) {
		if(error)
			res.send(error);
		res.json({ message: 'sensor3 excluída com Sucesso! '});
	});
	console.log('DELETE /sensor3/:id');
});

//GET /atuador1
router.route('/atuador1').get(function(req, res) {
	atuador1.find(function(err, atuador1) {
		if (err)
			res.send(err);

		res.json(atuador1);
	});
	console.log('GET /atuador1');
});

//GET /atuador1/:id
router.route('/atuador1/:id').get(function(req, res) {
	atuador1.findById(req.params.id, function(error, atuador1) {
		if(error)
			res.send(error);

		res.json(atuador1);
	});
	console.log('GET /atuador1/:id');
});

/* POST /atuador1 {time:"..",valor:"..."} */
router.route('/atuador1').post(function(req, res) {
	var atuador1 = new atuador1();

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
	atuador1.findById(req.params.id, function(error, atuador1) {
		if(error)
			res.send(error);

		atuador1.time = req.body.time;
		atuador1.valor = req.body.valor;

		atuador1.save(function(error) {
			if(error)
				res.send(error);
			res.json({ message: 'sensor1 Atualizado!' });
		});
	});
	console.log('PUT /atuador1/:id');
});

//DELETE /atuador1/:id
router.route('/atuador1/:id').delete(function(req, res) {
	atuador1.remove({
		_id: req.params.id
	}, function(error) {
		if(error)
			res.send(error);
		res.json({ message: 'atuador1 excluída com Sucesso! '});
	});
	console.log('DELETE /atuador1/:id');
});

//GET /atuador2
router.route('/atuador2').get(function(req, res) {
	atuador2.find(function(err, atuador2) {
		if (err)
			res.send(err);

		res.json(atuador2);
	});
	console.log('GET /atuador2');
});

//GET /atuador2/:id
router.route('/atuador2/:id').get(function(req, res) {
	atuador2.findById(req.params.id, function(error, atuador2) {
		if(error)
			res.send(error);

		res.json(atuador2);
	});
	console.log('GET /atuador2/:id');
});

/* POST /atuador2 {time:"..",valor:"..."} */
router.route('/atuador2').post(function(req, res) {
	var atuador2 = new atuador2();

	atuador2.time = req.body.time;
	atuador2.valor = req.body.valor;

	atuador2.save(function(error) {
		if (error)
			res.send(error);

		res.json({
			message : 'atuador2 criada!'
		});
	});
	console.log('POST /atuador2');
});

//PUT /atuador2/:id {time:"..",valor:"..."}
router.route('/atuador2/:id').put(function(req, res) {
	atuador2.findById(req.params.id, function(error, atuador2) {
		if(error)
			res.send(error);

		atuador2.time = req.body.time;
		atuador2.valor = req.body.valor;

		atuador2.save(function(error) {
			if(error)
				res.send(error);
			res.json({ message: 'atuador2 Atualizado!' });
		});
	});
	console.log('PUT /atuador2/:id');
});

//DELETE /atuador2/:id
router.route('/atuador2/:id').delete(function(req, res) {
	atuador2.remove({
		_id: req.params.id
	}, function(error) {
		if(error)
			res.send(error);
		res.json({ message: 'atuador2 excluída com Sucesso! '});
	});
	console.log('DELETE /atuador2/:id');
});

//GET /atuador3
router.route('/atuador3').get(function(req, res) {
	atuador3.find(function(err, atuador3) {
		if (err)
			res.send(err);

		res.json(atuador3);
	});
	console.log('GET /atuador3');
});

//GET /atuador3/:id
router.route('/atuador3/:id').get(function(req, res) {
	atuador3.findById(req.params.id, function(error, atuador3) {
		if(error)
			res.send(error);

		res.json(atuador3);
	});
	console.log('GET /atuador3/:id');
});

/* POST /atuador3 {time:"..",valor:"..."} */
router.route('/atuador3').post(function(req, res) {
	var atuador3 = new atuador3();

	atuador3.time = req.body.time;
	atuador3.valor = req.body.valor;

	atuador3.save(function(error) {
		if (error)
			res.send(error);

		res.json({
			message : 'atuador3 criada!'
		});
	});
	console.log('POST /atuador3');
});

//PUT /atuador3/:id {time:"..",valor:"..."}
router.route('/atuador3/:id').put(function(req, res) {
	atuador3.findById(req.params.id, function(error, atuador3) {
		if(error)
			res.send(error);

		atuador3.time = req.body.time;
		atuador3.valor = req.body.valor;

		atuador3.save(function(error) {
			if(error)
				res.send(error);
			res.json({ message: 'atuador3 Atualizado!' });
		});
	});
	console.log('PUT /atuador3/:id');
});

//DELETE /atuador3/:id
router.route('/atuador3/:id').delete(function(req, res) {
	atuador3.remove({
		_id: req.params.id
	}, function(error) {
		if(error)
			res.send(error);
		res.json({ message: 'atuador3 excluída com Sucesso! '});
	});
	console.log('DELETE /atuador3/:id');
});

//GET /luisa
router.route('/luisa').get(function(req, res) {
	luisa.find(function(err, luisa) {
		if (err)
			res.send(err);

		res.json(luisa);
	});
	console.log('GET /luisa');
});

//GET /luisa/:id
router.route('/luisa/:id').get(function(req, res) {
	luisa.findById(req.params.id, function(error, luisa) {
		if(error)
			res.send(error);

		res.json(luisa);
	});
	console.log('GET /luisa/:id');
});

/* POST /luisa {time:"..",valor:"..."} */
router.route('/luisa').post(function(req, res) {
	var luisa = new luisa();

	luisa.time = req.body.time;
	luisa.valor = req.body.valor;

	luisa.save(function(error) {
		if (error)
			res.send(error);

		res.json({
			message : 'luisa criada!'
		});
	});
	console.log('POST /luisa');
});

//PUT /luisa/:id {time:"..",valor:"..."}
router.route('/luisa/:id').put(function(req, res) {
	luisa.findById(req.params.id, function(error, luisa) {
		if(error)
			res.send(error);

		luisa.time = req.body.time;
		luisa.valor = req.body.valor;

		luisa.save(function(error) {
			if(error)
				res.send(error);
			res.json({ message: 'sensor1 Atualizado!' });
		});
	});
	console.log('PUT /luisa/:id');
});

//DELETE /luisa/:id
router.route('/luisa/:id').delete(function(req, res) {
	luisa.remove({
		_id: req.params.id
	}, function(error) {
		if(error)
			res.send(error);
		res.json({ message: 'luisa excluída com Sucesso! '});
	});
	console.log('DELETE /luisa/:id');
});

