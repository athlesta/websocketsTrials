const express = require('express');
const router = express.Router(); //creates a router
const mqtt = require("mqtt"); //set up mqtt

// mqtt data
const brocker_API = "mqtt://broker.hivemq.com"
var MQTT_TOPIC = "room/light/state";
var MQTT_ADDR = brocker_API;
var data ="-"; //to store status
var options = {
	clientId: 'clientId-7OW6XOmZyS',
	port: 1883,
	keepalive : 60
};

client  = mqtt.connect(MQTT_ADDR, options);

client.on('connect', mqtt_connect);
client.on('reconnect', mqtt_reconnect);
client.on('error', mqtt_error);
client.on('message', mqtt_messsageReceived);
client.on('offline', mqtt_offline);
client.on('close', mqtt_close);

 ///////////////////////////MQTT FUNCTIONS SECTION

 function mqtt_connect()
 {
	 console.log("connected to MQTT server!");
	 // subscribe to a topic
	 client.subscribe(MQTT_TOPIC, mqtt_subscribe);
	 // mqtt_publish("hi", "helloWorld");
 }
 
 function mqtt_reconnect(err)
 {
	 console.log("Reconnect MQTT");
	 if (err) {console.log(err);}
	 client  = mqtt.connect(MQTT_ADDR, options);
 }
 
 function mqtt_error(err)
 {
	 console.log("error");
	 console.log(err);
	 client.end();
 }
 
 function mqtt_subscribe(err, granted)
 {
	 console.log("Subscribed to TOPIC=" + MQTT_TOPIC);
	 if (err) {console.log(err);}
 }
 
 function mqtt_messsageReceived(topic, message, packet)
 {
	 data = String(message);
	 console.log("Topic=" +  topic + " &  Message=" + message + " ,  data = " + data + " type = " + typeof(data));
 
 }
 
 function mqtt_offline()
 {
	 console.log("MQTT Server is unavailable");
 }
 
 function mqtt_close()
 {
	 console.log("Close MQTT");
 }
 
 router.get('/status', function(req, res) {
    //get from mqtt
    var obj = {data:data};

    console.log("SENT : "+ JSON.stringify(obj));
    res.json(obj);
    // res.setHeader(200, {"Content-Type": "application/json"});
    // res.write(JSON.stringify(obj));
    // res.write("data: " + data )
    // res.sendStatus(200);
});

//make router acessible to other requirers
module.exports = router;