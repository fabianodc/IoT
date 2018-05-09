/** Pós Graduação Internet das Coisas - CEFET-MG
	Disciplina: Programação para Sistemas de Computação
	Exemplo prático de RESTFul com NodeJS e MongoDB
	Modelo sensor1
 */
 
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment'); 
var mongooseApiQuery = require('mongoose-api-query'); 

var Sensor2Schema = new Schema({
    time: String,
    valor: String
});

autoIncrement.initialize(mongoose.connection);
sensor2Schema.plugin(autoIncrement.plugin, 'sensor2');
sensor2Schema.plugin(mongooseApiQuery); 
module.exports = mongoose.model('sensor2', Sensor2Schema);

