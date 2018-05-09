/** Pós Graduação Internet das Coisas - CEFET-MG
	Disciplina: Programação para Sistemas de Computação
	Exemplo prático de RESTFul com NodeJS e MongoDB
	Modelo luisa
 */
 
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment'); 
var mongooseApiQuery = require('mongoose-api-query'); 

var LuisaSchema = new Schema({
    time: String,
    valor: String
});

autoIncrement.initialize(mongoose.connection);
LuisaSchema.plugin(autoIncrement.plugin, 'luisa');
LuisaSchema.plugin(mongooseApiQuery); 
module.exports = mongoose.model('luisa', LuisaSchema);

