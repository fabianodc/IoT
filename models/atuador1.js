/** Pós Graduação Internet das Coisas - CEFET-MG
	Disciplina: Programação para Sistemas de Computação
	Exemplo prático de RESTFul com NodeJS e MongoDB
	Modelo atuador1
 */
 
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment'); 
var mongooseApiQuery = require('mongoose-api-query'); 

var Atuador1Schema = new Schema({
    time: String,
    valor: String
});

autoIncrement.initialize(mongoose.connection);
atuador1Schema.plugin(autoIncrement.plugin, 'atuador1');
atuador1Schema.plugin(mongooseApiQuery); 
module.exports = mongoose.model('atuador1', Atuador1Schema);

