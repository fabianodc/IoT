/** Pós Graduação Internet das Coisas - CEFET-MG
	Disciplina: Programação para Sistemas de Computação
	Exemplo prático de RESTFul com NodeJS e MongoDB
	Modelo Umidade
 */
 
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment'); 
var mongooseApiQuery = require('mongoose-api-query'); 

var UmidadeSchema = new Schema({
    time: String,
    valor: String
});

autoIncrement.initialize(mongoose.connection);
UmidadeSchema.plugin(autoIncrement.plugin, 'humidade');
UmidadeSchema.plugin(mongooseApiQuery); 
module.exports = mongoose.model('umidade', UmidadeSchema);

