#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
 
const char* ssid = "IoTest";
const char* password = "fabitine101";
//float valor=0; 
void setup () {
 
  Serial.begin(115200);
  WiFi.begin(ssid, password);
 
  while (WiFi.status() != WL_CONNECTED) {
 
    delay(1000);
    Serial.print("Connecting..");
 
  }
    pinMode(16, OUTPUT);
 
}
 
void loop() {
 
  if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status

    Serial.println("----POST----");
    
    StaticJsonBuffer<300> JSONbuffer;   //Declaring static JSON buffer
    JsonObject& JSONencoder = JSONbuffer.createObject(); 

    JSONencoder["valor"] = 45;  //leitura do sensor
    
    char JSONmessageBuffer[300];
    JSONencoder.prettyPrintTo(JSONmessageBuffer, sizeof(JSONmessageBuffer));
    Serial.println(JSONmessageBuffer);
 
    HTTPClient http;  //Declare an object of class HTTPClient
    
    http.begin("http://35.229.57.208:3000/atuador1");      //Specify request destination
    http.addHeader("Content-Type", "application/json");  //Specify content-type header

    int httpCode = http.POST(JSONmessageBuffer);   //Send the request
    String payload = http.getString();   
    
    if (httpCode > 0) { //Check the returning code
      Serial.print("Response Code: ");
      Serial.println(httpCode);
      String payload = http.getString();   //Get the request response payload
      Serial.println(payload);            //Print the response payload
 
    }

    Serial.println("----GET----");
    http.begin("http://35.229.57.208:3000/sensor1/recente");  //Specify request destination /recente
    httpCode = http.GET();                                                                  //Send the request

    if (httpCode > 0) { //Check the returning code
      Serial.print("Response Code: ");
      Serial.println(httpCode);
      String payload = http.getString();   //Get the request response payload      
      payload.remove(0, 1);
      
      Serial.println(payload);             //Print the response payload

      // Parsing
      const size_t bufferSize = JSON_OBJECT_SIZE(2) + JSON_OBJECT_SIZE(3) + JSON_OBJECT_SIZE(5) + JSON_OBJECT_SIZE(8) + 370;
      DynamicJsonBuffer jsonBuffer(bufferSize);
      JsonObject& root = jsonBuffer.parseObject(payload);
      // Parameters
      int id = root["_id"]; 
      const char* time = root["time"]; 
      const char* valor = root["valor"]; 

      digitalWrite(16, HIGH);   // turn the LED on (HIGH is the voltage level)
      float val1;
      val1=val1+0.1;
      delay(val1);                       // wait for a second
      digitalWrite(LED_BUILTIN, LOW);    // turn the LED off by making the voltage LOW
      delay(20);   
 
      Serial.print("id:");
      Serial.println(id);
      Serial.print("Time:");
      Serial.println(time);
      Serial.print("valor:");
      Serial.println(valor);
    }
    
    http.end();   //Close connection
 
  }
 
  delay(15000);    //Send a request every 30 seconds
 
}
