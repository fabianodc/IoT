// Importando as bibliotecas necessarias
#include "ESP8266WiFi.h"
#include "DHT.h"
#include <Adafruit_Sensor.h>


//Nome da sua rede Wifi
const char* ssid = "IoTest";

//Senha da rede
const char* password = "fabitine101";

// Pino do DHT
#define DHTPIN 2

// Definindo o sensor DHT11
#define DHTTYPE DHT11

// Inicializando o sensor DHT
DHT dht(DHTPIN, DHTTYPE, 15);

// Site que receber� os dados
const char* host = "http://35.229.57.208";

void setup() {
  // Iniciando o DHT 
  dht.begin();

  // Conectando na rede wifi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
}

void loop() {
  // Criando uma conexao TCP
  WiFiClient client;
  const int httpPort = 80;
  if (!client.connect(host, httpPort)) {
    return;
  }
  
  // Lendo a umidade
  int u = dht.readHumidity();

  //Verificando se houve falha na leitura
  if(u == 2147483647){
    delay(10);
    return;
  }
  
  // Lendo a temperatura em graus Celsius
  int t = dht.readTemperature();

  // Calculando o indice de calor
  float f = dht.readTemperature(true);
  float ic = dht.computeHeatIndex(f, u);
  float icC = dht.convertFtoC(ic);
  
  // Enviando para o dweet as leituras efetuadas
  client.print(String("GET /http://35.229.57.208/topic-iot-cefetmg?temperatura=") + String(t) +
                "&umidade=" + String(u) + "&indice=" + String(icC) +
                " HTTP/1.1\r\n" + "Host: " + host + "\r\n" + "Connection: close\r\n\r\n");
  
  // Repetindo a cada 6 segundos
  delay(6000);
}

