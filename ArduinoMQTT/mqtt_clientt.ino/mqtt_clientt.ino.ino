#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include<stdio.h>
#include<stdlib.h>


const char* ssid = "IoTest";//nome da rede
const char* password = "fabitine101";//senha da rede
const char* mqtt_server = "35.229.57.208";//enedereço da instância

int sensorPin = A0;//pino do sensor analógico    
int sensorValue = 0; //variável que receberá
char array[20];//criação da array
String convert; //variavel para conversão

WiFiClient espClient; //criação do acesso wifi 
PubSubClient client(espClient);//criação 
long lastMsg = 0;
char msg[50];
int value = 0;
int i=0;
String str;
void setup_wifi() {

  delay(10);
  
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  randomSeed(micros());

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
}

void reconnect() {
  
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");
    
      client.subscribe("topic-iot-cefetmg");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 3 seconds");
      
      delay(3000);
    }
  }
}

void setup() {
  pinMode(BUILTIN_LED, OUTPUT);   
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

void loop() {

  while(1){

  if (!client.connected()) {
    reconnect();
  }
  client.loop();
  sensorValue = analogRead(sensorPin);
  str=String(sensorValue);
  str.toCharArray(msg,16);
  client.publish("topic-iot-cefetmg",msg);
  delay(10000);
  Serial.println(i);
  i=i+1;
}
}
