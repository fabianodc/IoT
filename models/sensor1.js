/** Pós Graduação Internet das Coisas - CEFET-MG
	Disciplina: Programação para Sistemas de Computação
	Exemplo prático de RESTFul com NodeJS e MongoDB
	Modelo sensor1
 */
 
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment'); 
var mongooseApiQuery = require('mongoose-api-query'); 

var Sensor1Schema = new Schema({
    time: String,
    valor: String
});

autoIncrement.initialize(mongoose.connection);
Sensor1Schema.plugin(autoIncrement.plugin, 'sensor1');
Sensor1Schema.plugin(mongooseApiQuery); 
module.exports = mongoose.model('sensor1', Sensor1Schema);

