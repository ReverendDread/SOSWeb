class WebSocketClient {
    constructor(protocol, hostname, port, endpoint) {
        this.webSocket 	= null;
        this.protocol 	= protocol;
        this.hostname 	= hostname;
        this.port     	= port;
        this.endpoint 	= endpoint;
        console.log("8 constructor called");
    }
    
    getServerUrl() {
        return this.protocol + "://" + this.hostname + ":" + this.port + this.endpoint;
    }
    
    connect() {
        try {
            this.webSocket = new WebSocket(this.getServerUrl());
            
            // 
            // Implement WebSocket event handlers!
            //
            this.webSocket.onopen = function(event) {
//                console.log('23 onopen::' + JSON.stringify(event, null, 4));
                console.log('23 onopen::' + event.data);
            }
            
            this.webSocket.onmessage = function(event) {
                var msg = event.data;
//                console.log('28 onmessage::' + JSON.stringify(msg, null, 4));
                console.log('28 onmessage::' + msg);
                parseMessage(msg);
                displayMessage(msg);
            }
            
            this.webSocket.onclose = function(event) {
                console.log('31 onclose::' + JSON.stringify(event, null, 4));                
            }
            
            this.webSocket.onerror = function(event) {
                console.log('34 onerror::' + JSON.stringify(event, null, 4));
            }
            
        } catch (exception) {
            console.error(exception);
        }
    }
    
    getStatus() {
        return this.webSocket.readyState;
    }
    
    send(message) {
    
        if (this.webSocket.readyState == WebSocket.OPEN) {
            this.webSocket.send(message);
            console.log('49 WEB toSend=' + message);
        } else {
            console.error('51 webSocket is not open. readyState=' + this.webSocket.readyState);
        }
    }
    
    disconnect() {
        if (this.webSocket.readyState == WebSocket.OPEN) {
            this.webSocket.close();
            
        } else {
            console.error('webSocket is not open. readyState=' + this.webSocket.readyState);
        }
    }
}
function sendMessage(){
    var message = document.getElementById("inputText").value;
    websocket.send(message);
	
}
function parseMessage(msg){
    console.log('28 onmessage::' + msg);
	
}

var showMsgPanel = function() {
	elements.loginPanel.style.display = "none";
	elements.msgPanel.style.display = "block";
	elements.txtMsg.focus();
};
	
var hideMsgPanel = function() {
	elements.loginPanel.style.display = "block";
	elements.msgPanel.style.display = "none";
	elements.txtLogin.focus();
};

var displayMessage = function(msg) {
	if (elements.msgContainer.childNodes.length == 100) {
		elements.msgContainer.removeChild(elements.msgContainer.childNodes[0]);
	}
	console.log("32 msg=" + msg);
	var i = msg.indexOf("|");
	if(i > 0){
		var contacts = msg.substring(i+1);
		var j = contacts.lastIndexOf(",");
		contacts = contacts.slice(0, j-1);
		var msg = msg.substring(0, i);
		console.log("37 contacts=" + contacts + "\nmsg=" + msg);
	}
	var div = document.createElement('div');
	div.className = 'msgrow';
	var part = msg.split(",");
	var message = part[2].split("=");
	var name = part[0].split("=");
	if(name[1].localeCompare(myname)==0){
		var textnode = document.createTextNode( message[1]);
		console.log("39 my message found");
		div.style.textAlign="right";
	}
	else{
		var textnode = document.createTextNode(name[1] + " : " + message[1]);
		div.style.textAlign="left";
	}
	div.appendChild(textnode); 
	elements.msgContainer.appendChild(div);

	elements.msgContainer.scrollTop = elements.msgContainer.scrollHeight;
	};

	var clearMessage = function() {
		elements.msgContainer.innerHTML = '';
		};

