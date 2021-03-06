/** Pós Graduação Internet das Coisas - CEFET-MG
	Disciplina: Programação para Sistemas de Computação
	Exemplo prático de RESTFul com NodeJS e MongoDB
	Modelo sensor3
 */
 
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment'); 
var mongooseApiQuery = require('mongoose-api-query'); 

var Sensor3Schema = new Schema({
    time: String,
    valor: String
});

autoIncrement.initialize(mongoose.connection);
Sensor3Schema.plugin(autoIncrement.plugin, 'sensor3');
Sensor3Schema.plugin(mongooseApiQuery); 
module.exports = mongoose.model('sensor3', Sensor3Schema);

