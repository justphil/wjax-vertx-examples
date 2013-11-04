var eb = require("vertx/event_bus");
var vertx = require('vertx')
var console = require('vertx/console')
var container = require('vertx/container')


var publishMessageToClients = function(message) {
      console.log("publishing local to " + message.topic + " with " + message.payload);
      var topics = vertx.getSet(message.topic);
      if ( topics != undefined ) {
	      var tarr = topics.toArray();
	      for (var i = 0; i < tarr.length; i++) {
	        eb.send(tarr[i], new vertx.Buffer(message.payload + "\n"));
	      }
      }
};

var unsubscribeTopic = function(topicName,handlerID) {
	  var topics = vertx.getSet(topicName) ;
      topics.remove(handlerID) ;
      if (topics.isEmpty()) {
        vertx.removeSet(topicName) ;
        
      }
};

var unsubscribeHandler= function(topicName,handlerID) {
	  var handlers = vertx.getSet(handlerID);
      handlers.remove(topicName);
	  if(handlers.isEmpty()) {
        vertx.removeSet(handlerID) ;
        eb.unregisterHandler("topics." + topicName);
      }
};     

var unsubscribeSocket = function(handlerID) {
    	  var handlers = vertx.getSet(handlerID);
		  if(handlers != undefined) {	
    	 	 var harr = handlers.toArray();
	      	 for (var i = 0; i < harr.length; i++) {
	        	unsubscribeTopic(harr[i],handlerID);
	         }
		  }
	      vertx.removeSet(handlerID) ;
};

var port;
if(container.config.port == undefined) {
	port = 1234;
} else { 
	port = container.config.port;
}

vertx.createNetServer().connectHandler(function(socket) {
  var parser = vertx.createDelimitedParser("\n", function(line) {
    line = line.toString().replace(/\s+$/,""); // rtrim
    if (line.indexOf("subscribe,") == 0) {
      var topicName = line.split(",", 2)[1];
      console.log("subscribing to " + topicName);
      var topics = vertx.getSet(topicName);
      topics.add(socket.writeHandlerID());      
      var handlers = vertx.getSet(socket.writeHandlerID());
      handlers.add(topicName);
      eb.registerHandler("topics." + topicName, publishMessageToClients);

    } else if (line.indexOf("unsubscribe,") == 0) {
      var topicName = line.split(",", 2)[1]
      console.log("unsubscribing from " + topicName);
      unsubscribeTopic(topicName,socket.writeHandlerID());
      unsubscribeHandler(topicName,socket.writeHandlerID());
	  	
    } else if (line.indexOf("publish,") == 0) {
      var sp = line.split(',', 3)
      console.log("publishing to " + sp[1] + " with " + sp[2]);
      var message = {} ; 
      message.topic = sp[1];
      message.payload =  sp[2]; 
      eb.publish("topics." + message.topic, message);
    } else if (line.indexOf("exit") == 0) {
    	  unsubscribeSocket(socket.writeHandlerID());
		  socket.close();
    }
  });
  
  socket.closeHandler(function(){
  	var s = socket;
    unsubscribeSocket(s.writeHandlerID());	
  });
 
  socket.dataHandler(parser);
}).listen(port);
