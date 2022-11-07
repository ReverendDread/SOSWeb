
var proxy = null;
document.addEventListener("DOMContentLoaded", function(event) {
//	var wsUri = "ws://www.uiscan.com:8080/websocket/endpoint";
//	var wsUri = "ws://www.uiscan.com:12315";
//	var wsUri = "ws://192.168.2.151:12315";
	
//var wsUri = "ws://www.uiscan.com:8080/Activate/auth";
	proxy = AKTProxy(wsUri);	
	console.log("10 loginPanel=" + document.getElementById('loginPanel'));
	proxy.login();
});

var AKTProxy = function(wsUri) {
	var websocket = null;
	var elements = null;
	var status   = 0;
	return {
		login: function() {
			if (websocket == null) {
		    	websocket = new WebSocket(wsUri);
		    	this.websocket = websocket;
		    	websocket.onopen = function() {
		    		console.log("24 connected to host= " + wsUri);
//			        document.getElementById("status").value = "opening socket";
		        };
		        
		        websocket.onmessage = function(e) {
//			        document.getElementById("status").value = e.data;
		    		var msg = e.data;
//		    		console.log("29 msg=" + msg);
		    		if(!msg.startsWith("LSON=")){
//			        	document.getElementById("status").value = "malformed data incoming";
		    		} else {
		    			var message = e.data.substring(5, e.data.length);
		    			console.log("31 message=" + message);
						var iceKey		= iceBerg(localPrivateKey, serPubKey);
						var msg = iceBergDecryptText(iceKey, message);
		    			console.log("34 message=" + msg);
		    			processRequestID(msg);
//		    			this.close();
		    		}
		        };
		        websocket.onerror = function(e) {
		        	console.log("33 websocket error" + e);
		        };
		        websocket.onclose = function(e) {
		        	console.log("36 Close websocket=" + websocket);
		        	websocket = null;
//			        document.getElementById("status").value = "closing socket";
		    		this.close();
		        };
			}
		},  // end of login 

		sendMessage: function(msg) {
				var test = "test case 1";
				var testKey = "abcdefghijklmnopqrstuvwxyz123456";
				console.log("57 localPrivateKey=" + localPrivateKey);
//				if(localPrivateKey.length < 30)               // ***** we need to use same private key for multiple steps
				localPrivateKey = makePrivateKey();
				var publicKey  	= makePublicKey(localPrivateKey);
				console.log("60 publicKey=" + publicKey);
				console.log("61 serpublicKey=" + serPubKey);
				var compressed 	= compressPublicKey(publicKey);
				var iceKey		= iceBerg(localPrivateKey, serPubKey);
				console.log("64 iceKey=" + iceKey);
				console.log("65 compressed=" + compressed);
//				console.log("66 msg=" + msg);
//    console.log("67 typeof msg=" + msg);
				var msgEnc		= iceBergEncryptText(iceKey,msg);
//    console.log("69 typeof msgEnc=" + typeof(msgEnc));
//    console.log("70 msgEnc=" + msgEnc);
//				var msgDec 		= iceBergDecryptText(iceKey, msgEnc);
//				console.log("55 msgDec=" + msgDec);
				var LSON		= compressed +"|LSON=" + msgEnc + "|";
//				console.log("75 LSON=" + LSON);
				websocket.send(LSON);
//		        document.getElementById("status").value = msg;
		},
		
	    getStatus: function() {
	        this.status = this.websocket.readyState;
//	        document.getElementById("status").value = this.status;
	    },
		
		login_keyup: function(e) { 
			if (e.keyCode == 13) { 
				this.login(); 
				} 
			},
			
		sendMessage_keyup: function(e) { 
			if (e.keyCode == 13) { 
				this.sendMessage(); 
				} 
			},
			
		logout: function() {
			if (websocket != null && websocket.readyState == 1) { 
				websocket.close();
			}
		},
		
		initiate: function(e) {
			elements = e;
		}
	}
};

var action = function(){
	
};

function sendToWebSocket(vars, vals, server, port){
	var msg="";
	for(i=0; i<vars.length; i++){
		msg += "|" + vars[i] + "=" + vals[i];
	}
	var server = "port=" +  port + ",server=" + server;
	console.log("93 server=" + server);
    toSend=server + ",00#";
    toSend = toSend.concat(msg.length).concat("#").concat(msg).concat("|");
//	ppp.setAKTLocal("tosend", toSend, 1);
	var j = 0;
	sendOnOpen();
}

function makeForWebSocket(vars, vals, server, port){
	var msg="";
	for(i=0; i<vars.length; i++){
		msg += "|" + vars[i] + "=" + vals[i];
	}
	var server = "port=" +  port + ",server=" + server;
	console.log("93 server=" + server);
    toSend=server + ",00#";
    toSend = toSend.concat(msg.length).concat("#").concat(msg).concat("|");
//	ppp.setAKTLocal("tosend", toSend, 1);
//	var j = 0;
//	sendOnOpen();
	
}

function sendOnOpen(){
	if(proxy == null)
		proxy.login();	
	var j = 0;
	setTimeout(function(){
		if(proxy.websocket.readyState == 1){
//			var toSend = ppp.getAKTLocal("tosend");
			console.log("99 sending=" + toSend);
			proxy.sendMessage(toSend);
//			ppp.deleteAKTLocal("tosend");
//			console.log("103 j=" + j);
			j = 10;
		} else if(j < 10) {
			sendOnOpen();
			j += 1;
		} else {
			console.log("105 should not be here");
		}
	}, 100);

}	

function closeSocket(){
	if(proxy != null)
		proxy.logout();	
}
	
 function sendTestMessage() {
	 var elements = document.getElementById("inputText");
	elements.focus();
	console.log("131 sending=" + input);
		var input = elements.value.trim();
		if (input == '') { return; }
		elements.value = '';
		var message = { messageType: 'MESSAGE', message: input };
		var msg = "AKTRequestID=AKTLogin|U5=" + input + "|";
		proxy.sendMessage(msg);
	
}
 function setupPHCServer(server, port) {
	 ppp.setAKTLocal("server", server, 8);
	 ppp.setAKTLocal("socket", port, 8);
     document.getElementById("server03").value = server;
     document.getElementById("port03").value = port;
		var server = "port=" +  ppp.getAKTLocal("socket") + "!server=" + ppp.getAKTLocal("server");
		console.log("130 server=" + server);
//		readTextFile("file:///c:/00this/testTextFile.txt");
		
 }
	
