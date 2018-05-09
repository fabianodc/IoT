/** Pós Graduação Internet das Coisas - CEFET-MG
	Disciplina: Programação para Sistemas de Computação
	Exemplo prático de RESTFul com NodeJS e MongoDB
	Modelo atuador3
 */
 
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment'); 
var mongooseApiQuery = require('mongoose-api-query'); 

var Atuador3Schema = new Schema({
    time: String,
    valor: String
});

autoIncrement.initialize(mongoose.connection);
Atuador3Schema.plugin(autoIncrement.plugin, 'atuador3');
Atuador3Schema.plugin(mongooseApiQuery); 
module.exports = mongoose.model('atuador3', Atuador3Schema);

