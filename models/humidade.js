/** Pós Graduação Internet das Coisas - CEFET-MG
	Disciplina: Programação para Sistemas de Computação
	Exemplo prático de RESTFul com NodeJS e MongoDB
	Modelo Humidade
 */
 
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment'); 
var mongooseApiQuery = require('mongoose-api-query'); 

var HumidadeSchema = new Schema({
    time: String,
    valor: String
});

autoIncrement.initialize(mongoose.connection);
HumidadeSchema.plugin(autoIncrement.plugin, 'humidade');
HumidadeSchema.plugin(mongooseApiQuery); 
module.exports = mongoose.model('humidade', HumidadeSchema);

