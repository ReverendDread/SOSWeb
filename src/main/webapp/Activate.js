var wsUri = "ws://www.uiscan.com:8080/websocket/endpoint";
//var wsUri = "ws://www.uiscan.com:8080/AKTChat/chat";
var websocket = null;

function login() {
	websocket = new WebSocketClient('ws', 'www.uiscan.com', 8080, '/websocket/endpoint');
	console.log("7 tyring to connect");
	websocket.connect();
//onopen::{"isTrusted":true}
	console.log("10 state=" + websocket.getStatus());
	websocket.send("hello server");
}

function activate(){
	var pbexists 	= ppp.ifExistsAKTLocal("pb");
	if(pbexists){
		var email 	= ppp.getAKTLocal("email");
		var pb		= ppp.getAKTLocal("pb");
	}else{
//	login();
	var user			= document.getElementById("user12").value; 
	var p 				= document.getElementById("pass12").value; 
	var token			= document.getElementById("token12").value;
	var cm             	= AKTCM;
	var k5             	= cm.makeK5(user, p);
	var u5             	= cm.makeU5(user);
	var u5B64          	= AKTBase64.encode(u5);
	console.log("239 u5=" + u5B64);
	document.getElementById("u5auth").value       		= u5B64;
	document.getElementById("serverauth").value  		= ppp.getAKTLocal("local");
	document.getElementById("socketauth").value  		= ppp.getAKTLocal("localsocket");
	var vars 		= [];
	var vals    		= [];
	vars[0]  			= "AKTRequestID";
	vars[1]  			= "U5";
	vars[2]				= "AKTAPIID"
	vals[0]    			= "AKTAUTHUSER";
	vals[1]   			= u5B64;
	vals[2]				= "ACTIVATE";
	sendToWebSocket(vars,vals);
	}
}


function setup(local, localsocket){
    var serverError = false;
	ppp.setAKTLocal("local",local); 				// ***** lawyer
    ppp.setAKTLocal("localsocket",localsocket); 
}

function debug(message) {
    var debugTextArea = document.getElementById("debugTextArea");
    debugTextArea.value += message + "\n";
    debugTextArea.scrollTop = debugTextArea.scrollHeight;
}

function sendMessage() {
    var msg = document.getElementById("inputText").value;
    if ( websocket != null )
    {
        document.getElementById("inputText").value = "";
        websocket.send( msg );
        console.log( "string sent :", '"'+msg+'"' );
    }
}


function initWebSocket() {
    try {
    		console.log("42 connecting");
        if (typeof MozWebSocket == 'function')
            WebSocket = MozWebSocket;
        if ( websocket && websocket.readyState == 1 )
            websocket.close();
        websocket = new WebSocket( wsUri );
        websocket.onopen = function (evt) {
//            debug("CONNECTED");
            console.log("178 Connected");
        };
        websocket.onclose = function (evt) {
            debug("DISCONNECTED");
        };
        websocket.onmessage = function (evt) {
        	var message = evt.data;
            console.log( "Message received :", evt.data );
            debug( evt.data );
        };
        websocket.onerror = function (evt) {
            debug('ERROR: ' + evt.data);
        };
    } catch (exception) {
        debug('ERROR: ' + exception);
    }
}

function stopWebSocket() {
    if (websocket)
        websocket.close();
}

function checkSocket() {
    if (websocket != null) {
        var stateStr;
        switch (websocket.readyState) {
            case 0: {
                stateStr = "CONNECTING";
                break;
            }
            case 1: {
                stateStr = "OPEN";
                break;
            }
            case 2: {
                stateStr = "CLOSING";
                break;
            }
            case 3: {
                stateStr = "CLOSED";
                break;
            }
            default: {
                stateStr = "UNKNOW";
                break;
            }
        }
        debug("WebSocket state = " + websocket.readyState + " ( " + stateStr + " )");
    } else {
        debug("WebSocket is null");
    }
}

function activateJQuery(){
	var user			= document.getElementById("user12").value; 
	var p 				= document.getElementById("pass12").value; 
	var token			= document.getElementById("token12").value;
	var cm             	= AKTCM;
	var k5             	= cm.makeK5(user, p);
	var u5             	= cm.makeU5(user);
	var u5B64          	= AKTBase64.encode(u5);
	console.log("24 u5=" + u5B64);
	document.getElementById("u5auth").value       		= u5B64;
	document.getElementById("serverauth").value  		= ppp.getAKTLocal("local");
	document.getElementById("socketauth").value  		= ppp.getAKTLocal("localsocket");
	$.ajax({
		type : "POST",
		url : "/AKTServer/register",
		dataType : "json",
		data : $('#frmauth').serialize(), // ***** first, need to get the pb, ping done here.
		success : function(response) {
			console.log("33 response=" + JSON.stringify(response));
			var error = response.error;
			console.log("35 error=" + error);
			if(error != null)
			{
				console.log("38 error=" + error);
				
			} else {
				var enc = response.pong;
			    var aesAKT               = new AKTaes();
			    aesAKT.setEDC(true);
			    aesAKT.initialize(k5);
			    var email            = aesAKT.decryptText(enc);
				console.log("46 email=" + email + "\n u5=" + u5B64);
				document.getElementById("u5activate").value       		= u5B64;
				document.getElementById("emailactivate").value     		= enc;
				document.getElementById("tokenactivate").value     		= token;
				document.getElementById("serveractivate").value  		= ppp.getAKTLocal("local");
				document.getElementById("socketactivate").value  		= ppp.getAKTLocal("localsocket");
			    $.ajax({
					type : "POST",
					url : "/AKTServer/signup",
					dataType : "json",
					data : $('#frmactivate').serialize(), // ***** first, need to get the pb, ping done here.
					success : function(response) {
						console.log("58 response=" + JSON.stringify(response));
						var error = response.error;
//						console.log("60 error=" + error);
						if(error != null)
						{
							console.log("63 error=" + error);
						    document.getElementById("Invalid").style.display='table-row';
							
						} else {
						    document.getElementById("Initial").style.display='none';
						    document.getElementById("Complete").style.display='table-row';
						    document.getElementById("Invalid").style.display='none';
							
						}
						
					}
				});
				
				
			}
		}
	});
	
}
			    
          
/*
  	public static LoginResponse activate(HttpServletRequest request) {
		LoginResponse resp=new LoginResponse(GenericResponse.RESULT_SUCCESS);
		String u5B64     		= request.getParameter("u5activate");
		String email     		= request.getParameter("emailactivate");
		String token     		= request.getParameter("tokenactivate");
		String GlobalServer     = request.getParameter("serveractivate");
		String GlobalSocket     = request.getParameter("socketactivate");
		logger.log("info", "2162 globalSocket=" + GlobalSocket + " GlobalServer=" + GlobalServer);
		logger.log("info", "2163 token=" + token + " u5B64=" + u5B64);
//
//*****  first thing is to check if token is in the db
//		
		boolean chk = false;
		chk = checkToken(token);
		String[] variables;
		String[] values;
		if(chk) {
			variables = new String[3];
			values    = new String[3];
			variables[0]  	= "AKTRequestID";
			variables[1]  	= "U5";
			variables[2]	= "EMAIL";
			values[0]    	= "AKTACTIVATEUSER";
			values[1]    	= u5B64;
			values[2]		= email;
			
			logger.log("info", "2179 values=" + values[0]);
			logger.log("info", "2180 globalSocket=" + GlobalSocket + " GlobalServer=" + GlobalServer);
			String[][] retVar = goToAKTServer(GlobalServer, GlobalSocket, variables, values);
			logger.log("info", "2182 ret=" + retVar[1][0] + " " +  retVar[1][1]);
			if(retVar[1][0].startsWith("AKTServerError")) 
				{
					resp.setERROR(retVar[1][1]);
					logger.log("info", "2186 error=" + retVar[1][1]);

				} else {
//***** remove token from db
//				deleteToken(token);
				listTokens();
				resp.setPONG("NAK");
				resp.setKPPP(retVar[1][1]);
				logger.log("info", "2194 Global=" + retVar[1][1]);
				resp.setPONG("NAK");
			}
		    logger.log("info", "2197 Quit");
			return(resp);  // *****  we can safely return from here
		} else {
			logger.log("info", "2200 Quit");
		    resp.setERROR("invalid token");
			return(resp);  // *****  we can safely return from here
		}
	}

 	public static LoginResponse authorize(HttpServletRequest request) {
		LoginResponse resp		=new LoginResponse(GenericResponse.RESULT_SUCCESS);
		String u5B64     		= request.getParameter("u5auth");
		String GlobalServer    	= request.getParameter("serverauth");
		String GlobalSocket    	= request.getParameter("socketauth");
		logger.log("info", "2126 globalSocket=" + GlobalSocket + " GlobalServer=" + GlobalServer);
		String[] variables 		= new String[2];
		String[] values    		= new String[2];
		variables[0]  			= "AKTRequestID";
		variables[1]  			= "U5";
		values[0]    			= "AKTAUTHUSER";
		values[1]   			= u5B64;
		String[][] retVar 		= goToAKTServer(GlobalServer, GlobalSocket, variables, values);
		int i = retVar[0].length;
		for(int j=0; j<i; j++) {
			logger.log("info", "2136 var=" + retVar[0][j] + " value=" + retVar[1][j]);
		}
		if(retVar[1][0].startsWith("AKTServerError"))
		{
			resp.setERROR(retVar[1][1]);
			logger.log("info", "2141 error=" + retVar[1][1]);

		} else {
			for(int j=0; j<i; j++) {
				if(retVar[0][j].compareTo("EMAIL") == 0) {
					resp.setPONG(retVar[1][j]);
				}
			}
			resp.setKPPP(retVar[1][2]);
			logger.log("info", "2150 Global=" + retVar[1][2]);
		}
	    logger.log("info", "2152 Quit");
		return resp;
	}
         
 */
