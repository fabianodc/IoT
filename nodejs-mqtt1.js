'use strict'

var mqtt = require('mqtt')
var fs = require('fs')
var path = require('path')
var PORT = 8883  // troque p/ 8883 quando usar SSL/TLS
var HOST = 'localhost'

var options = {
  port: PORT,
  host: HOST,
  username: 'fabiano',
  password: 'teste',
  rejectUnauthorized: false,          // se o certificado fosse legítimo, poderia mudar pra true
 // ca: [ fs.readFileSync('ca.crt') ],  // seria o certificado da autoridade, mas o node esta ignorando
  protocol: 'ssl'
}

var client = mqtt.connect(options)

client.subscribe('iot')
client.publish('iot', 'Current time is: ' + new Date())
client.on('message', function (topic, message) {
  console.log(message.toString())
})

client.on('connect', function () {
  console.log('Connected')
})
