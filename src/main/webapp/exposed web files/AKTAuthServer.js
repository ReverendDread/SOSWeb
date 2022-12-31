//	var wsUri = "ws://www.uiscan.com:8080/websocket/endpoint";
		//var wsUri = "ws://www.uiscan.com:8080/Activate/auth";
//	var proxy = AKTProxy(wsUri);
/*	
async function sleepHere(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
 */	  
	
function sleep(ms) {
      return new Promise(resolve =>setTimeout(resolve, ms));
}


function setupServer(server, socket){
	ppp.setAKTLocal("server", server, 8);
	ppp.setAKTLocal("socket", socket, 8);
	console.log("8 server=" + server);
}

function setupServerAndPort(server){
	var sp = servers[server].split(",");
	console.log("23 sp=" + sp);
	if(sp.length >1){
		ppp.setAKTLocal("server", sp[0], 8);
		ppp.setAKTLocal("socket", sp[1], 8);
	    document.getElementById('server03').value = ppp.getAKTLocal("server");
	    document.getElementById('port03').value = ppp.getAKTLocal("socket");
	}
}
function setupRegisterServer(server, socket){
	ppp.setAKTLocal("regserver", server, 8);
	ppp.setAKTLocal("regsocket", socket, 8);
	AKTPPP01("register");
}

function registerStart(){
	var aktapiid = "register";
	AKTPPP01(aktapiid);
//	document.getElementById("register").style.display='table-row';
//	document.getElementById("demopart").style.display='none';
	reset();
	setDOMStyle("main", 'none');
	setDOMStyle("user", 'table-row');
	setDOMStyle("register", 'table-row');
	setDOMStyle("demopart", 'none');
	setDOMStyle("actions", 'none');
}

function deleteUsersForm(){
	reset();
	setDOMStyle("main", 'none');
	setDOMStyle("admin", 'table-row');
	setDOMStyle("deleteUser", 'table-row');
}

function changeSecurityForm(){
	reset();
	setDOMStyle("main", 'none');
	setDOMStyle("admin", 'table-row');
	setDOMStyle("changeSecurity", 'table-row');
}

function cancel()
{
	reset();
}	
//
//*****  outgoing or setup routines
//

function AKTPPP01(aktapiid){
	var variables = [], values = [];
	variables[0] 	= "AKTRequestID";
	variables[1] 	= "PING";
	variables[2] 	= "AKTAPIID";
	values[0] 		= "GR8PPP01"
    var pingTo      = ppp.pingData();
	values[1] 		= pingTo;
	values[2] 		= aktapiid;
	var server;
	var port;
	if(aktapiid.localeCompare("register") == 0){
		server 	= ppp.getAKTLocal("regserver");
		port	= ppp.getAKTLocal("regsocket");
	}else{
		server 	= ppp.getAKTLocal("server");
		port	= ppp.getAKTLocal("socket");
	}
	sendToWebSocket(variables, values, server, port);

	//-->|AKTRequestID=GR8PPP02|PONG=pongTo|AKTAPIID=apiaktid|	
}


function AKTPPP03(aktapiid) {
	var variables = [], values = [];
	variables[0] 	= "AKTRequestID";
	variables[1] 	= "PING";
	variables[2] 	= "EMAIL";
	variables[3] 	= "PHONE";
	variables[4] 	= "TODECRYPT";
	variables[5] 	= "AKTAPIID";
//		 
// *****  first, set up the return variables	    
//
   var pong            	  = ppp.getAKTLocal("pong");    
//   console.log("45 pong=" + pong);
   var pingTo             = ppp.secondPing(pong);  // *****  compute the final ping
//   document.getElementById('server03').value = ppp.getAKTLocal("local");
//   document.getElementById('socket03').value = ppp.getAKTLocal("localsocket");
   var emailRaw           = document.getElementById("email03").value;
   var email              = emailRaw.toLowerCase();
   var phone              = document.getElementById("phone03").value;
   var pppdec             = document.getElementById("pppcheck03").value;
   var pppeMail           = ppp.pingUserData(email);
   var pppPhone           = ppp.pingUserData(phone);
   var pppCheck           = ppp.pingUserData(pppdec);
   document.getElementById("email03").value     = pppeMail;
   document.getElementById("phone03").value     = pppPhone;
   console.log("72 email=" + email + " phone=" + phone);
   ppp.setAKTLocal("email", email, 8);                  // *****  save email for later
   ppp.setAKTLocal("phone", phone, 8);                  // *****  save phone for later
//   document.getElementById("emailg").value      = email;  
//   document.getElementById("phoneg").value      = phone;  
//   document.getElementById("ping03").value      = pingTo;
//   document.getElementById("pppcheck03").value  = pppCheck;
//   document.getElementById("SecLevel") = parent.document.getElementById("SecLevel").value;
//	console.log("742 server=" + ppp.getAKTLocal("local") + " port=" + ppp.getAKTLocal("localsocket"));
	console.log("80 pong=" + pong);
   if(x=validateEmail(email)){
	   values[0]    	= "GR8PPP03";
	   values[1]    = pingTo;
	   values[2]    = pppeMail;
	   values[3]    = pppPhone;
	   values[4]    = pppCheck;
	   values[5] 	= aktapiid;
		var server 	= ppp.getAKTLocal("regserver");
		var port	= ppp.getAKTLocal("regsocket");
	   sendToWebSocket(variables,values, server, port);
//-->|AKTRequestID=GR8PPP04|PONG=Q|KPPP=Kppp|AKTAPIID=aktapiid|
   } 
}

function registerFinal07(){
	  var kfn                = "ZecureIT.uky";
	  var emailRaw           = ppp.getAKTLocal("email");
	  var phone              = ppp.getAKTLocal("phone");
	  var email              = emailRaw.toLowerCase();
	  var username           = document.getElementById("username").value;
	  var pass               = document.getElementById("pass1").value;
	  var cm                 = AKTCM;

	  var k5                 = cm.makeK5(username, pass);
	  var u5                 = cm.makeU5(username);
	  var u5B64              = AKTBase64.encode(u5);
	  var k5B64              = AKTBase64.encode(k5); 
		ppp.setAKTLocal("u5", u5, 8);  // *****  hold the U5 for 8 hours
		ppp.setAKTLocal("k5", k5, 8);  // *****  hold the K5 for 8 hours
	  var variables=[]; values =[];
		variables[0]  = "AKTRequestID";
		variables[1]  = "EMAIL";
		variables[2]  = "KA";
		variables[3]  = "FN";
		variables[4]  = "QN1";
		variables[5]  = "QN2";
		variables[6]  = "KS";
		variables[7]  = "U5";
		variables[8]  = "PBU5";
		variables[9]  = "PB5K";
		variables[10] = "UPKEY";
		variables[11] = "UPKEYH";
		variables[12] = "PHONE";
		variables[13] = "K5";
		variables[14] = "U";
		variables[15] = "P";
		variables[16] = "AN1";
		variables[17] = "AN2";
		variables[18] = "KPPP";
		variables[19] = "PSK";     // *****  may not be needed with new version
		variables[20] = "SECURITYLEVEL";     // *****  may not be needed with new version
		variables[21] = "AKTAPIID";
//		variables[22] = "FIRST";   // *****  reserved for later
//		variables[23] = "LAST";    // *****  reserved for later
	//
	// *****  here we have a problem if we are replicating
	//  
	  if(document.getElementById("replicate").value == "true"){
		  var pb = ppp.getAKTLocal("pb");
	  }else {
		  var pbraw  = getRandomKey(32);
		  var hexnorm 	= AKT.HEXFormat(pbraw);
		  var pb 		= AKTSha256.fromHex(hexnorm);	
	  }
	  var qn1 = document.getElementById("Q1").value;  // *****  exclude the first question selected
	  var an1 = document.getElementById("Q1Answer").value;  // *****  exclude the first question selected
	  var qn2 = document.getElementById("Q2").value;  // *****  exclude the first question selected
	  var an2 = document.getElementById("Q2Answer").value;  // *****  exclude the first question selected
	  var sec = document.getElementById("SecLevel").value;
	  var ks     = makeKS(pb, an1, an2);  // *****  ks is text encrypted
	  console.log("1035 ks=" + ks );
	  if(document.getElementById("qact").value =="1"){
		  updateKS(ks, qn1, an1, qn2, an2, "local");
	  } else {
		  var pbrev 	= reverse(pb);
		  var pbB64     = AKTBase64.encode(pb); 
		  var hexu5 	= AKT.HEXFormat(u5);
		  var hexk5 	= AKT.HEXFormat(k5);
		  var hexnorm 	= AKT.HEXFormat(pb);
		  var hexrev 	= AKT.HEXFormat(pbrev);
		  sha256     	= AKTSha256;
		  var pbu5   	= AKTSha1.GetHash(pb);		// *****  pbu5 is sha1 to be consistent with u5
		  var pbu5B64 	= AKTBase64.encode(pbu5);
	  var revWord = "";
	  revWord += pbrev;
	  var bitArray   = sjcl.hash.sha256.hash(revWord);
	  var pb5kHex    = sjcl.codec.hex.fromBits(bitArray); 
	  var pb5k		 = AKTSha256.fromHex(pb5kHex);
	  var pb5kB64 = AKTBase64.encode(pb5k);
	  var hexpb5k 	= AKT.HEXFormat(pb5k);
	//  console.log("457 pb5k=" + pb5kHex );
	  var ka     = makeKA(pb, username, pass);
	  var upkeyword = "";
	  var error = false;
	  var upkey  = getRandomKey(32);
	  upkeyword += upkey;
	  var bitArray   = sjcl.hash.sha256.hash(upkeyword); // ***** bitData is an object
	  var hashHex = sjcl.codec.hex.fromBits(bitArray);
	  var upkeyhash = AKTSha256.fromHex(hashHex);
	  var psk    = getRandomKey(32);
	  ppp.setAKTLocal("username",username, 8); 
	  ppp.setAKTLocal("email",email, 8); 
	  ppp.setAKTLocal("password",pass, 8);
	  
	  var Uppp               = ppp.pingUserData(username);
	  var EMAILppp           = ppp.pingUserData(email);
	  var phoneppp           = ppp.pingUserData(phone);
	  var Pppp               = ppp.pingUserData(pass);
	  var U5ppp              = ppp.pingUserData(u5);
	  var K5ppp              = ppp.pingUserData(k5);
	  var pbU5ppp            = ppp.pingUserData(pbu5);
	  var pb5Kppp            = ppp.pingUserData(pb5k);
	  var upKeyppp           = ppp.pingUserData(upkey);
	  var upKeyHashppp       = ppp.pingUserData(upkeyhash);
	  var KAppp              = ppp.pingUserData(ka);
	  var KSppp              = ppp.pingUserData(ks);
	  var KFNppp             = ppp.pingUserData(kfn);
	  var QN1ppp             = ppp.pingUserData(qn1);
	  var QN2ppp             = ppp.pingUserData(qn2);
	  var secppp             = ppp.pingUserData(sec);
	  var an1ppp             = ppp.pingUserData(an1);
	  var an2ppp             = ppp.pingUserData(an2);
	  var pppPsk             = ppp.pingUserData(psk);
	  var kppp               = ppp.getAKTLocal("kppp");
	  values[0]        		 = "GR8Reg01";
		values[1]        = EMAILppp;
		values[2]        = KAppp;
		values[3]        = KFNppp;
		values[4]        = QN1ppp;
		values[5]        = QN2ppp;
		values[6]        = KSppp;
		values[7]        = U5ppp;
		values[8]        = pbU5ppp;
		values[9]        = pb5Kppp;
		values[10]       = upKeyppp;
		values[11]       = upKeyHashppp;
		values[12]       = phoneppp;
		values[13]       = K5ppp;
		values[14]       = Uppp;
		values[15]       = Pppp;
		values[16]       = an1ppp;
		values[17]       = an2ppp;
		values[18]       = kppp; // ***** kppp-->mk
		values[19]       = pppPsk; 
		values[20]       = secppp; 
		values[21]       = "GR8Reg01"; 
		var server 	= ppp.getAKTLocal("regserver");
		var port	= ppp.getAKTLocal("regsocket");
	    sendToWebSocket(variables,values, server, port);
		//|AKTRequestID=AKTReg02|PONG=NAK| AKTAPIID="GR8Reg01"|
	  }
}

function AKTAuthUser(aktapiid){
	var variables = [], values = [];
	var user			= document.getElementById("username").value; 
	var p 				= document.getElementById("password").value; 
	var token			= document.getElementById("phantomcode").value;
	var cm             	= AKTCM;
	var k5             	= cm.makeK5(user, p);
	var u5             	= cm.makeU5(user);
	var u5B64          	= AKTBase64.encode(u5);
	var k5B64          	= AKTBase64.encode(k5);
	ppp.setAKTLocal("u5", u5, 8);
	ppp.setAKTLocal("k5", k5, 8);
	variables[0]  			= "AKTRequestID";
	variables[1]  			= "U5";
	variables[2] 			= "AKTAPIID";
	values[0]    			= "AKTAUTHUSER";
	values[1]   			= u5B64;
	values[2]   			= aktapiid;
	console.log("24 u5=" + u5B64);
	document.getElementById("u5auth").value       		= u5B64;
	document.getElementById("serverauth").value  		= (ppp.getAKTLocal("local"));
	document.getElementById("socketauth").value  		= (ppp.getAKTLocal("localsocket"));
	var server 	= ppp.getAKTLocal("server");
	var port	= ppp.getAKTLocal("socket");
	sendToWebSocket(variables,values, server, port);  		// ***** AKTProxy.js
//-->|AKTRequestID=AKTAUTHUSER|PSK=psk|EMAIL=email|CONTACTSHASH=hashB64|SVSQUOTABYTES=x|SVSQUOTABYTESUSED=y|
	
}

function login(){  // *****  will come here only if credentials is NOT set
	var user = document.getElementById("username").value;
	var pass = document.getElementById("password").value;
	var cm          = AKTCM;
	var k5          = cm.makeK5(user, pass);
	var u5          = cm.makeU5(user);
	var u5B64       = AKTBase64.encode(u5);
	var k5B64       = AKTBase64.encode(k5); 
	console.log("321 U5B64=" + u5B64 + " \n   k5b64=" + k5b64);
	var k5uniB64	= AKTBase64.encode(makeK5Uni(user, pass));
	ppp.setAKTLocal("user", user, 8);
	ppp.setAKTLocal("pass", pass, 8);
	ppp.setAKTLocal("u5", u5, 8);
	ppp.setAKTLocal("k5", k5, 8);
	ppp.setAKTLocal("k5unib64", k5uniB64, 8);
	console.log("255 k5uniB64=" + k5uniB64);
	var variables 	= [], values = [];
	variables[0]	= "AKTRequestID";
	variables[1] 	= "U5";
	variables[2] 	= "AKTAPIID";
	values[0]    	= "AKTAUTHUSER";
	values[1]		= u5B64;
	values[2]		= "GetEmail"
	if(!ppp.ifExistsAKTLocal("KA")) 
		values[2]		= "GetKA"		// ***** need to put KA in cookie if not there
	var server 	= ppp.getAKTLocal("server");
	var port	= ppp.getAKTLocal("socket");
	sendToWebSocket(variables,values, server, port);  		// ***** AKTProxy.js
//-->|AKTRequestID=AKTAUTHUSER|PSK=psk|EMAIL=email|CONTACTSHASH=hashB64|SVSQUOTABYTES=x|SVSQUOTABYTESUSED=y|
		
}

function GetKC(){
	var u5			= ppp.getAKTLocal("u5");
	var U5B64 		= AKTBase64.encode(u5);
	var K5B64 		= AKTBase64.encode(ppp.getAKTLocal("k5"));
	var emailRaw 	= ppp.getAKTLocal("email");
	var pong       	= ppp.getAKTLocal("pong");   // ***** expects B64      
	var pingTo     	= ppp.secondPing(pong);  // *****  compute the final ping
	var email      	= emailRaw.toLowerCase();
	var pppU5     	= ppp.pingUserData(u5);
	var pppeMail   	= ppp.pingUserData(email);
	var pppFN      	= ppp.pingUserData("ZecureIT.uky");
	var pppCheck    = ppp.pingUserData("pppDecrypt");
	var variables 	= [], values = [];
	variables[0] 	= "AKTRequestID";
	variables[1] 	= "U5";
	variables[2] 	= "PING";
	variables[3] 	= "TODECRYPT";
	variables[4] 	= "EMAIL";
	variables[5] 	= "FN";
	variables[6] 	= "AKTAPIID";
	values[0]    	= "GETKC";
	values[1]		= pppU5;
	values[2]		= pingTo;
	values[3]		= pppCheck;
	values[4]		= pppeMail;
	values[5]		= pppFN;
	values[6]		= "GetKC";
	var server 	= ppp.getAKTLocal("server");
	var port	= ppp.getAKTLocal("socket");
	sendToWebSocket(variables,values, server, port);  		// ***** AKTProxy.js
}

function getemailhash(aktapiid){
	var variables 	= [], values = [];
	variables[0] 	= "AKTRequestID";
	variables[1] 	= "PBU5";
	variables[2] 	= "EMAIL";
	variables[3] 	= "AKTAPIID";
	values[0] 		= "GETEMAILHASH"
    var pingTo      = ppp.pingData();
	values[1] 		= "Just Testing";
	values[2] 		= "notvalidemail";
	values[3] 		= aktapiid;
	var server 	= ppp.getAKTLocal("server");
	var port	= ppp.getAKTLocal("socket");
	sendToWebSocket(variables,values, server, port);  		// ***** AKTProxy.js
//-->|AKTRequestID=GR8PPP02|PONG=pongTo|	
}

function setupCryptoLogin(){
	var isCrypto = ppp.ifExistsAKTLocal("compositekey");
	var ishere   =document.cookie.indexOf("compositekey".trim() + "=") >=0;
	console.log("177 ishere=" + ishere);
	console.log("178 isCrypto=" + isCrypto);
	if(isCrypto){
		setDOMStyle("demopart", 'table-row');
		setDOMStyle("cryptoLogin", 'none');
		setDOMStyle("actions", 'table-row');
		setDOMStyle("user", 'table-row');
//		document.getElementById("cryptoLogin").style.display='none';
//		document.getElementById("demopart").style.display='table-row';
//		document.getElementById("actions").style.display='table-row';
//		document.getElementById("user").style.display='table-row';
		
	} else {
		setDOMStyle("demopart", 'none');
		setDOMStyle("cryptoLogin", 'table-row');
		setDOMStyle("actions", 'none');
		setDOMStyle("functions", 'none');
//		document.getElementById("cryptoLogin").style.display='table-row';
//		document.getElementById("functions").style.display='none';
//		document.getElementById("actions").style.display='none';
//		document.getElementById("user").style.display='none';
	}
}

function cryptoLogin(){
	var server = document.getElementById("server").value;
	setupServerAndPort(server);
	var user = document.getElementById("cryptouser").value.trim();
	var pass = document.getElementById("cryptopass").value.trim();
	console.log("418 user=" + user + "| pass=" + pass + "|" + user.length);
	var cm          = AKTCM;
	var k5          = cm.makeK5(user, pass);
	var u5          = cm.makeU5(user);
	var k5uniB64    = makeK5Uni(user, pass);
	var u5B64       = AKTBase64.encode(u5);
	var k5B64       = AKTBase64.encode(k5); 
	console.log("433 U5B64=" + u5B64 + " \n   k5b64=" + k5B64);
	ppp.setAKTLocal("u5", u5, 8);
	ppp.setAKTLocal("k5", u5, 8);
	ppp.setAKTLocal("k5unib64", k5uniB64, 8);
	var variables 	= [], values = [];
	variables[0] 	= "AKTRequestID";
	variables[1] 	= "U5";
	variables[2] 	= "AKTAPIID";
	values[0] 		= "AKTAUTHCO"
	values[1] 		= u5B64;
	values[2] 		= "AKTAuthCo";
	var server 	= ppp.getAKTLocal("server");
	var port	= ppp.getAKTLocal("socket");
	console.log("437 server=" + server + " port=" + port);
	sendToWebSocket(variables,values, server, port);  		// ***** AKTProxy.js
	console.log("439 now send to escrow server");
/*	
// *****  will become usable in QT 5.13 forward async await
    (async function() {
    	await sleep(2000);
		sendToWebSocket(variables,values, server, port);    })();	
    })();	

    (async ()=> {
    	sleep(2000);
		sendToWebSocket(variables,values, server, port);    })();	
	
// *****  Anonymous function to run now	
	( function() {
		
	})();
	
	server = "192.168.2.17";
	port = 12314;
	console.log("443 server=" + server + " port=" + port);
	setTimeout(() => { sendToWebSocket(variables,values, server, port); }, 2000);
*/
	
//	sendToWebSocket(variables,values, server, port);  		// ***** AKTProxy.js
 
//-->|AKTRequestID=AKTAUTHCO|SESSIONKEY=A|KA=B|AKTAPIID=AKTAuthCo|	
}

function getUserList(){
	var table 		= document.getElementById('userTable');
	var rowCount = table.rows.length;
	if(rowCount > 1){
		reset();
		setDOMStyle("main", 'none');
		setDOMStyle("userlist", 'table-row');
		setDOMStyle("users", 'table-row');
		
	} else{
//	|AKTRequestID=LISTALLUSERS|PBU5=A|COMPRESS=B|AKTAPIID=ListAllUsers|	
		var pbu5B64		=  AKTBase64.encode(ppp.getAKTLocal("pbu5"));
		var variables 	= [], values = [];
		variables[0] 	= "AKTRequestID";
		variables[1] 	= "PBU5";
		variables[2]	= "COMPRESS";
		variables[3] 	= "AKTAPIID";
		values[0] 		= "LISTALLUSERS"
		values[1] 		= pbu5B64;
		values[2] 		= "1";
		values[3] 		= "ListAllUsers";
		var server 	= ppp.getAKTLocal("server");
		var port	= ppp.getAKTLocal("socket");
		sendToWebSocket(variables,values, server, port);  		// ***** AKTProxy.js
	}
//|AKTRequestID=LISTALLUSERS|SESSIONKEY=A|USERLIST=B| AKTAPIID=ListAllUsers|	
}

function checkGetKC(){  		// *****  will come here only if credentials is NOT set
	var user = document.getElementById("usertest").value;
	var pass = document.getElementById("passtest").value;
	var cm          = AKTCM;
	var k5          = cm.makeK5(user, pass);
	var u5          = cm.makeU5(user);
	var u5B64       = AKTBase64.encode(u5);
	var k5B64       = AKTBase64.encode(k5); 
	ppp.setAKTLocal("u5", u5, 8);
	ppp.setAKTLocal("k5", u5, 8);
	var variables 	= [], values = [];
	variables[0]	= "AKTRequestID";
	variables[1] 	= "U5";
	variables[2] 	= "AKTAPIID";
	values[0]    	= "AKTAUTHUSER";
	values[1]		= u5B64;
	values[2]		= "GetKA"
	var server 	= ppp.getAKTLocal("server");
	var port	= ppp.getAKTLocal("socket");
	sendToWebSocket(variables,values, server, port);  		// ***** AKTProxy.js
}

function deleteUser(uid){
//	var email 	= document.getElementById("uemail").value;
//	var uid		= document.getElementById("uid").value;
	var pbu5	= ppp.getAKTLocal("pbu5");
	var pbu5B64 = AKTBase64.encode(pbu5);
	var key		= ppp.getAKTLocal("compositekey");
	console.log("528 Auth compositeKey=" + AKTBase64.encode(key));
	var variables 	= [], values = [];
	variables[0]	= "AKTRequestID";
	variables[1] 	= "PBU5";
	variables[2] 	= "UID";
	if(uid == null)
		variables[2] 	= "EMAIL";
	variables[3] 	= "AKTAPIID";
	values[0]    	= "AKTDELETEUSER";
	values[1]		= pbu5B64;
	var val2;
//	if(uid == null){
//		values[2]	= encryptText(email, key);
//	} else {
		values[2]	= encryptText(uid, key);
		
//	}
	var enc			= encryptText(uid, ppp.getAKTLocal("pb5k"));
	values[3]		= "coDelete!" + enc;
	var server 	= ppp.getAKTLocal("server");
	var port	= ppp.getAKTLocal("socket");
	sendToWebSocket(variables,values, server, port);  		// ***** AKTProxy.js
//|AKTRequestID=AKTDELETEUSER|SESSIONKEY=A|AKTAPIID="coDelete"|	
}


function deleteOneUser(){
	var email 	= document.getElementById("email01").value;
	var uid		= document.getElementById("uid01").value;
	var pbu5	= ppp.getAKTLocal("pbu5");
	var pbu5B64 = AKTBase64.encode(pbu5);
	var key		= ppp.getAKTLocal("compositekey");
	
	var variables 	= [], values = [];
	variables[0]	= "AKTRequestID";
	variables[1] 	= "PBU5";
	variables[2] 	= "UID";
	if(uid == null)
		variables[2] 	= "EMAIL";
	variables[3] 	= "AKTAPIID";
	values[0]    	= "AKTDELETEUSER";
	values[1]		= pbu5B64;
	var val2;
	if(uid == null){
		values[2]	= encryptText(email, key);
		val2		= email;
	} else {
		values[2]	= encryptText(uid, key);
		val2		= uid;
	}
	var enc			= encryptText(val2, ppp.getAKTLocal("pb5k"));
	values[3]		= "coDelete!" + enc;
	var server 	= ppp.getAKTLocal("server");
	var port	= ppp.getAKTLocal("socket");
	sendToWebSocket(variables,values, server, port);  		// ***** AKTProxy.js
//|AKTRequestID=AKTDELETEUSER|SESSIONKEY=A|AKTAPIID="coDelete"|	
}

function backToListUsers(){
	reset();
 	setDOMStyle("listUsersForm()", 'table-row');
}

function updateSecurity(){
	var uid		= document.getElementById("showUID").innerHTML;
	var sec		= document.getElementById("secLevel").value;
	console.log("596 uid=" + uid + " sec=" + sec);
	var pbu5	= ppp.getAKTLocal("pbu5");
	var pb5k	= ppp.getAKTLocal("pb5k");
	var pbu5B64 = AKTBase64.encode(pbu5);
	var key		= ppp.getAKTLocal("compositekey");
	console.log("601 key=" + key);
	var variables 	= [], values = [];
	variables[0]	= "AKTRequestID";
	variables[1] 	= "PBU5";
	variables[2] 	= "UID";
	if(uid == null)
		variables[2] 	= "EMAIL";
	variables[3] 	= "SECURITYLEVEL";
	variables[4] 	= "AKTAPIID";
	values[0]    	= "UPDATEUSERSECURITYLEVEL";
	values[1]		= pbu5B64;
	values[2]		= encryptText(uid, key);
	values[3]		= encryptText(sec, key);
	var toEnc		= uid + "!" + sec;
	var toRet		= encryptText(toEnc, pb5k);
	values[4]		= "coSec!" + toRet;
	console.log("617 uid=" + uid + " sec=" + sec + " values[4]=" + 	values[4]);
	var server 	= ppp.getAKTLocal("server");
	var port	= ppp.getAKTLocal("socket");
	sendToWebSocket(variables,values, server, port);  		// ***** AKTProxy.js
}

function updateOneSecurity(){
	var email 	= document.getElementById("email01").value;
	var uid		= document.getElementById("uid01").value;
	var sec		= document.getElementById("sec01").value;
	console.log("627 uid=" + uid + " email=" + email + " seclevel=" + sec);
	var pbu5	= ppp.getAKTLocal("pbu5");
	var pbu5B64 = AKTBase64.encode(pbu5);
	var key		= ppp.getAKTLocal("compositekey");
	var keyHex  = 	 AKT.HEXFormat(key);

	console.log("631 key=" + keyHex);
	var variables 	= [], values = [];
	variables[0]	= "AKTRequestID";
	variables[1] 	= "PBU5";
	variables[2] 	= "UID";
	if(uid == null)
		variables[2] 	= "EMAIL";
	variables[3] 	= "SECURITYLEVEL";
	variables[4] 	= "AKTAPIID";
	values[0]    	= "UPDATEUSERSECURITYLEVEL";
	values[1]		= pbu5B64;
	var val2;
	if(uid == null){
		values[2]	= encryptText(email, key);
		var enc 	= encryptText(email, ppp.getAKTLocal("pb5k"));
	} else {
		values[2]	= encryptText(uid, key);
		var enc 	= encryptText(uid, ppp.getAKTLocal("pb5k"));
	}
	values[3]		= encryptText(sec, key);
	values[4]		= "oneSec!" + enc;
	var server 	= ppp.getAKTLocal("server");
	var port	= ppp.getAKTLocal("socket");
	if(server.length <3){
		server = document.getElementById("server03").value;
		port   = document.getElementById("port03").value;
	}
	console.log("658 port=" + port + " server=" + server );
	sendToWebSocket(variables,values, server, port);  		// ***** AKTProxy.js
	
//|AKTRequestID=UPDATEUSERSECURITYLEVEL|SESSIONKEY=A|AKTAPIID="coSecLevel"|	
}

function updateUserSVS(){ //***** to be implemented in the future
	var email 	= document.getElementById("email01").value;
	var uid		= document.getElementById("uid01").value;
	var svs		= document.getElementById("svs07").value;
	var pbu5	= ppp.getAKTLocal("pbu5");
	var pbu5B64 = AKTBase64.encode(pbu5);
	var key		= ppp.getAKTLocal("compositekey");
	var variables 	= [], values = [];
	variables[0]	= "AKTRequestID";
	variables[1] 	= "PBU5";
	variables[2] 	= "UID";
	if(uid == null)
		variables[2] 	= "EMAIL";
	variables[3] 	= "SECURITYLEVEL";
	variables[4] 	= "AKTAPIID";
	values[0]    	= "UPDATESVSLEVEL";
	values[1]		= pbu5B64;
	var val2;
	if(uid == null){
		values[2]	= encryptText(email, key);
		var enc 	= encryptText(email, ppp.getAKTLocal("pb5k"));
	} else {
		values[2]	= encryptText(uid, key);
		var enc 	= encryptText(uid, ppp.getAKTLocal("pb5k"));
	}
	values[3]		= encryptText(sec, key);
	values[4]		= "onSVS!" + enc;
	var server 	= ppp.getAKTLocal("server");
	var port	= ppp.getAKTLocal("socket");
	sendToWebSocket(variables,values, server, port);  		// ***** AKTProxy.js
	
//|AKTRequestID=UPDATESVS|SESSIONKEY=A|AKTAPIID="coSecLevel"|	
	
}
function getContacts(){ 
// 	|AKTRequestID=GETCONTACTS|PBU5=pbU5B64|AKTAPIID=xxx| 
	var pbu5	= ppp.getAKTLocal("pbu5");
	var pbu5B64 = AKTBase64.encode(pbu5);
	var key		= ppp.getAKTLocal("compositekey");
	var variables 	= [], values = [];
	variables[0]	= "AKTRequestID";
	variables[1] 	= "PBU5";
	variables[2] 	= "AKTAPIID";
	values[0]    	= "GETCONTACTS";
	values[1]		= pbu5B64;
	values[2]		= "contacts";
	var server 	= ppp.getAKTLocal("server");
	var port	= ppp.getAKTLocal("socket");
	sendToWebSocket(variables,values, server, port);  		// ***** AKTProxy.js

	
//  |AKTRequestID=GETCONTACTS|CONTACTS=c|AKTAPIID=xxx| 
	
}
function getContactHash(){ 
// 	|AKTRequestID=GETCONTACTHASH|PBU5=pbU5B64|AKTAPIID=xxx| 

	
//  |AKTRequestID=GETCONTACTHASH|CONTACTS=c|AKTAPIID=xxx| 
	
}
//
//*****  process ALL incoming messages here
//
function processRequestID(msg){		// ****  0#iii#|AKTRequestID=xxx|.... 
//	proxy.logout();
	if(msg.length < 256)
		console.log("586 msg=" + msg);		
	var i = msg.indexOf("|");
	var left = msg.slice(0, i);
	var msg  = msg.slice(i+1).trim();
//	console.log("590 msg=" + msg);	
	var l = msg.length;
	var j = msg.lastIndexOf("|");    	// ***** js does not like trailing target symbol
	if(i != j) msg = msg.slice(0,j);  	// ****  slice is similar to substring
//	console.log("594 j=" + j + " length=" + msg.length);
	var i=0;
	var actions = msg.split("|");    	// ****  split into key=value components
	var requestID = actions[0].split("=");
//		if(requestID[1].localeCompare("AKTServerError") == 0){
	switch(requestID[1]){
		case "AKTServerError":
			processError(actions);
		break;
		case "GR8PPP02":
			processPong(actions);
		break;
		case "GR8PPP04":
			processFinalPong(actions);
		break;
		case "GR8Reg02":
			processRegister(actions);
		break;
		case "GETSECURITYQUESTIONS":
			processQuestions(actions);
		break;
		case "UPUSERDATEPERSONALINFO":
			processQuestions(actions);
		break;
		case "AKTAUTHUSER":
			processAKTAuthUser(actions);
		break;
		case "AKTAUTHCO":
			processAKTAuthCO(actions);
		break;
		case "UPDATEUSERSECURITYLEVEL":
			processUpdateUserSecurityLevel(actions);
		break;
		case "GETEMAILHASH":
			processGetEmailHash(actions);
		break;
		case "GETKEY02":
			processGetKC(actions);
		break;
		case "AKTDELETEUSER":
			processDeleteUser(actions);
		break;
		case "LISTALLUSERS":
			processListAllUsers(actions);
		break;
		case "UPDATEUSERSECURITYLEVEL":
			processUpdateSVS(actions);
		break;
		case "GETCONTACTS":
			processContacts(actions);
		break;
		default:
			console.log("759 action=" + requestID[1]);	
			break;	
		}

}


function processRegister(actions){
	console.log("257 action=" + actions[1]);
	reset();
//	document.getElementById("complete").style.display='table-row';
//	document.getElementById("initial").style.display='none';
	setDOMStyle("complete", 'table-row');
	setDOMStyle("initial", 'none');
	
}

function processPong(actions){
//-->|AKTRequestID=GR8PPP02|PONG=pongTo|AKTAPIID=api	
//	console.log("175 action[1]=" + actions[1]);
	var pong = actions[1].split("=");
//	console.log("176 pong=" + pong[1]);
	ppp.setAKTLocal("pong", pong[1], 8)
//	document.getElementById("setupSite").style.display='none';
//	document.getElementById("initial").style.display='table-row';
	if(actions.length >2){
		var act = actions[2].split("=");
		if(act[0].localeCompare( "AKTAPIID") == 0){
			console.log("264 AKTAPIID=" + act[1]);
			switch(act[1]){
			case "GetEmail":
				break;
			case "SetupKA": // *****  going to have to do the GETKC here
				GetKC(actions);
				break;
			}
		}
	}
}

function processFinalPong(actions){
	//-->|AKTRequestID=GR8PPP04|PONG=Q|KPPP=Kppp|AKTAPIID=ii
	var decrypted = null;
	console.log("187 length=" + actions.length);
	for(var i = 1; i<actions.length; i++){
		act = actions[i].split("=");
//		console.log("190 act=" + act[0]);
		switch(act[0]){
		case "PONG":
			var pong = act[1];
	        var decrypted          = ppp.decryptUserData(pong);
			break;
		case "KPPP":
	        ppp.setAKTLocal("kppp", act[1], 8);
			break;
		case "AKTAPIID":
			var from = act[1];
			break;
		default:
			console.log("201 should not be here");
			break;
		}
	}
    document.getElementById("decrypted").value  = decrypted;
    document.getElementById("qact").value  = "0";
    getQuestions(1, decrypted );
}

function processAKTAuthUser(actions){
	console.log("243 action=" + actions[1]);
	for(var i = 1; i<actions.length; i++){
		act = actions[i].split("=");
		console.log("245 act=" + act[0]);
		switch(act[0]){
		case "EMAIL":
		    var aesAKT               = new AKTaes();
		    aesAKT.setEDC(true);
		    var k5 = ppp.getAKTLocal("k5");
		    aesAKT.initialize(k5);
		    var email            = aesAKT.decryptText(act[1]);
			console.log("253 email=" + email);
			ppp.setAKTLocal("email", email, 8);   // *****  we will need this for later
			break;
		case "AKTAPIID":
			console.log("331 AKTAPIID=" + act[1]);
			switch(act[1]){
			case "GetEmail":
				processGetEmail();
				break;
			case "GetKA": // *****  going to have to do a ping here first
				console.log("336 AKTAPIID=" + act[1]);
				AKTPPP01("SetupKA");
				break;
			case "ACTIVATE":
				console.log("341 AKTAPIID=" + act[1]);
				activate();
				break;
			}
			break;
		}	
	}
}

function processGetKC(actions) {
		console.log("347 action=" + actions[1]);
		for(a of actions){
			var act = a.split("=");
			switch(act[0]){
			case "KA":
				var ka = ppp.decryptUserData(act[1]); // ***** this is ppp decryption
				ppp.setAKTLocal("KA", ka, 10000);
				getPBCredentialsUsingKA();
				break;
			case "UPKEY":
				break;
			}
		}
		setDOMStyle("login", 'none');
		setDOMStyle("actions", 'table-row');
		setDOMStyle("demopart", 'table-row');
	}

function processGetEmail(){
	removeLoginForm();
}

function processAKTAuthCO(actions){
	var Session;
	for(a of actions){
		var act = a.split("=");
		console.log("890 " + act[0] + "=" + act[1]);
		switch(act[0]){
		case "KA":
			var KA = act[1];
			ppp.setAKTLocal("KA", KA, 10000);
			console.log("895 KA=" + KA);
			var k5UniB64 	= ppp.getAKTLocal("k5unib64");
			var pbB64 		= getPBUsingK5Uni(KA, k5UniB64);
			var pb			= AKTBase64.decode(pbB64);
			var pbcred		= makePBU5andPB5K(pb);
			console.log("900 pbcred=" + pbcred);
			var creds= pbcred.split(";");
			var pbu5B64		= creds[0].split("=")[1];
			var pb5kB64		= creds[1].split("=")[1];
			var pbu5		= AKTBase64.decode(pbu5B64);
			var pb5k		= AKTBase64.decode(pb5kB64);
			ppp.setAKTLocal("pb5k", pb5k, 8);
			ppp.setAKTLocal("pbu5", pbu5, 8);
			ppp.setAKTLocal("pb", pb, 8);
		    var k5 		= ppp.getAKTLocal("k5");
		  	  setDOMStyle("cryptologin", 'none');
		  	  setDOMStyle("main", 'table-row');
			break;
		case "SESSIONKEY":
			Session = act[1];
			break;
		}
	}
	var pb5k = ppp.getAKTLocal("pb5k");
	console.log("919 session=" + Session + " pb5k=" + AKTBase64.encode(pb5k));   
	setCompositeSession(Session, pb5k);
	setDOMStyle("functions", 'none');
	setDOMStyle("cryptoLogin", 'none');
	setDOMStyle("actions", 'table-row');
	setDOMStyle("demopart", 'table-row');
}

function processUpdateUserSecurityLevel(actions){
	for(a of actions){
		var act = a.split("=");
		console.log("847 " + act[0] + "=" + act[1]);
		var key		= ppp.getAKTLocal("compositekey");
		switch(act[0]){
		case "SESSIONKEY":
			setCompositeSession(act[1], key);
			break;
		case "AKTAPIID":
			var id		= act[1].split("!");
			if(act[1].includes("coSec!") ){ 	// *****  from list delete
				var parts = act[1].split("!");
				var pb5k 	= ppp.getAKTLocal("pb5k");
				var ret = decryptText(parts[1], pb5k);
				console.log("852 parts[1]=" + parts[1] + " ret=" + ret);
				var uidsec = ret.split("!");
				var uid  = parseInt(uidsec[0]);
				var sec  = parseInt(uidsec[1]);
				console.log("856 finalize security uid=" + uid + " sec=" + sec);
				finishSecurityLevel(uid, sec);
			} else {								// ***** from direct delete
		        document.getElementById("status").value = "user " + id[1] + " updated";
			}
			break;
		}
	}
}

function processDeleteUser(actions){
	for(a of actions){
		var act = a.split("=");
		console.log("709 " + act[0] + "=" + act[1]);
		switch(act[0]){
		case "SESSIONKEY":
			var key		= ppp.getAKTLocal("compositekey");
			setCompositeSession(act[1], key);
			break;
		case "AKTAPIID":
			var id		= act[1].split("!");
			if(act[1].indexOf("coDelete!") == 0){ 	// *****  from list delete
				var dec = decryptText(id[1], ppp.getAKTLocal("pb5k"));
				var uid  = parseInt(dec);
				console.log("992 finalize delete uid=" + uid);
				finishDeleteUser(uid);
			} else {								// ***** from direct delete
		        document.getElementById("status").value = "user " + id[1] + " deleted";
			}
			break;
		}
	}
}

function processListAllUsers(actions){
	var newSession;
	var usersB64;
	var key		= ppp.getAKTLocal("compositekey");
	for(a of actions){
		var act = a.split("=");
//		console.log("709 " + act[0] + "=" + act[1]);
		switch(act[0]){
		case "SESSIONKEY":
			console.log("1013 key=" + AKTBase64.encode(key));
			setCompositeSession(act[1], key);
			console.log("1015 " + act[1] + " newSession=" + ppp.getAKTLocal("session"));
			var keyn		= ppp.getAKTLocal("compositekey");
			console.log("1017 compositeKey=" + AKTBase64.encode(keyn));
			break;
		case "USERLIST":
		    usersB64 	= AKTZip.AKTdecryptAndUnzip(act[1],key);
		    var users 		= AKTBase64.decode(usersB64);
			break;
			default:
				break;
		}
	}
    var users 		= AKTBase64.decode(usersB64);
    var obj			= JSON.parse(users);
    k = 0;
    var keys = Object.keys(obj.userList[0]);
//    console.log("383 keys=" + keys.join(","));
    var BreakException = {};
    var listul	 	= document.getElementById("userlistul");
    reset();
    try{
    	setupList();
	    obj.userList.forEach(function(user){
	    	var elements = createUserFromJSON(user);
	        addRow(elements, 1);  // *****  user
	        addRow(elements, 2);  // *****  personal
	        addRow(elements, 3);  // *****  credentials
	        addRow(elements, 4);  // *****  delete
	    });
	    setDOMStyle("userlist", 'table-row');
	    setDOMStyle("users", 'table-row');
	    setDOMStyle("main", 'none');
    }catch (e){
    	if(e !== BreakException) throw e;
    	setDOMStyle("main", 'table-row');
    }
}

function processUpdateSVS(actions){
	var newSession;
	var usersB64;
	var key		= ppp.getAKTLocal("compositekey");
	for(a of actions){
		var act = a.split("=");
//		console.log("709 " + act[0] + "=" + act[1]);
		switch(act[0]){
		case "SESSIONKEY":
			console.log("777 key=" + AKTBase64.encode(key));
			setCompositeSession(act[1], key);
			console.log("783 " + act[1] + " newSession=" + ppp.getAKTLocal("session"));
			break;
		}
	}
}

function processContacts(actions){
	for(a of actions){
		var act = a.split("=");
		console.log("1032 " + act[0] + "=" + act[1]);
		switch(act[0]){
		case "CONTACTS":
			var cB64 	= AKTZip.AKTdecryptAndUnzip(act[1], ppp.getAKTLocal("pb"));
			var contacts 	= AKTBase64.decode(cB64); // ***** contacts is a json object
			var jcontact	= JSON.parse(contacts);
			console.log("1037 contacts=" + contacts);
			Object.keys(jcontact).forEach(function(e){
				console.log("1041 keys=" + e + " =" + jcontact[e]);
				Object.keys(e).forEach(function(f){
					console.log("1041 keys=" + f + " =" + e[f]);
					
				});
				
				
			});
			
			break;
		}
	}
	
}
//
// ***** other routines
//
function showSubmit() {
		document.getElementById("submitIt").style.display='table-row';
	}

function getQuestions(action, decrypted) {
	if(action == 1)
	{
//     var decrypted          = "1=A|2=B|3=C|4=D|5=E|6=F|7=G|";
      if(decrypted.indexOf("|") == 0)
    	  decrypted = decrypted.substring(1);
      if(decrypted.lastIndexOf("|") == decrypted.length-1)
    	  decrypted = decrypted.substring(0, decrypted.length - 1);
      console.log("667 questions=" + decrypted);
      var qanda = decrypted.split("|");  // ***** split into qn=q
      var qNum = [];                     // *****  question numbers
      var questions = [];                // *****  questions
      for(i=0; i<qanda.length; i++)
   	  {
    	  var tmp      = qanda[i].split("=");
    	  qNum[i]      = tmp[0];
    	  questions[i] = tmp[1].trim();
   	  }
      var val   = qNum;
      var txt   = questions;
      var email = ppp.getAKTLocal("email");
      var phone = ppp.getAKTLocal("phone");
      document.getElementById("SASQ1").text = "<-- Select a Security Question -->";
      document.getElementById("ShowCell").innerHTML  = phone;        
      document.getElementById("ShowEmail").innerHTML = email;           
      document.getElementById("Cellx").value = phone;
      document.getElementById("Emailx").value = email;           
  	  setDOMStyle("initial", 'none');
  	  setDOMStyle("complete", 'none');
	  setDOMStyle("credentials", 'table-row');
	  setDOMStyle("credentialPart", 'table-row');
	  setDOMStyle("questionPart", 'table-row');
      for (i = 0; i < 7; i++)
      { 
          document.getElementById("Q1a" + (i + 1)).text  = txt[i];
          document.getElementById("Q1a" + (i + 1)).value = val[i];
      }
   }
   else   // *****  we do this to show the second security questions
   {
      txt = new Array(7);
      val = new Array(7);
	  for (i = 0; i < 7; i++)
      { 
              txt[i] = document.getElementById("Q1a" + (i + 1)).text;
              val[i] = document.getElementById("Q1a" + (i + 1)).value;
      }
           var sel = document.getElementById("Q1").value;  // *****  exclude the first question selected
//           document.getElementById("Q2Q").style.display='table-row';
//           document.getElementById("Q2A").style.display='table-row';
     	   setDOMStyle("Q2Q", 'table-row');
    	   setDOMStyle("Q2A", 'table-row');
           document.getElementById("SASQ2").text = "<-- Select Another Security Question -->";
           for (i = 0; i < 7; i++)
           {
                if (sel != val[i]) {
                   document.getElementById("Q2a" + (i + 1)).text  = txt[i];
                   document.getElementById("Q2a" + (i + 1)).value = val[i];
           }
       }
   }
}

function parseReturnVars(akt) {
	var l = akt.length;
	var retvar =new Array(2);
	retvar[0] = new Array();
	retvar[1] = new Array();
	console.log("6 AKTRequestID=" + akt[0]);
	for(j=0; j<l; j++){
		if(akt[j] !=null){
			var i     = akt[j].indexOf("=");
			var left  = akt[j].substring(0, i);
			var right = akt[j].substring(i+1);
			retvar[0].push(left);
			retvar[1].push(right);
			console.log("16 left=" + left + " right=" + right);
		}
	}
	return retvar;
}




function checkLogin(){
	var credentials = ppp.ifExistsAKTLocal("u5");
	console.log("640 credentials=" + credentials);
	setDOMStyle("complete", 'none');
	if((document.getElementById("credentials")) != undefined)
		document.getElementById("credentials").style.display='none';
	if(credentials){   // *****  KA has been stored today
 	    setDOMStyle("login", 'none');
	    setDOMStyle("actions", 'table-row');
	    setDOMStyle("demopart", 'table-row');
	} else {
//		document.getElementById("initial").style.display='none';
//		document.getElementById("login").style.display='table-row';
	 	setDOMStyle("login", 'table-row');
//		document.getElementById("actions").style.display='none';
	}	
}

function removeLoginForm(){
//	document.getElementById("initial").style.display='none';
//	document.getElementById("login").style.display='none';
//	document.getElementById("actions").style.display='table-row';
 	setDOMStyle("login", 'none');
}

function processError(actions){		
	var error = null;
	for(i=1; i<actions.length; i++){					// ****  iterate over all key=value pairs
		var keyvalue = actions[i].split("="); 
		switch(keyvalue[0]){
		case "ERROR":
			console.log("870 ERROR=" + keyvalue[1]);
			ppp.setAKTLocal("servererror", keyvalue[1], 1);
			break;
		case "ERRORMSG":
			var enc = keyvalue[1];
			var error = decryptText(enc, ppp.getAKTLocal("pb5k"));
			console.log("1088 error=" + error);
			break;
		case "AKTAPIID":
			console.log("734 AKTAPIID=" + keyvalue[1]);
			ppp.setAKTLocal("aktapiid", keyvalue[1], 1);
			var toSwitch=keyvalue[1];
			if(keyvalue[1].includes("!")){
				var i = keyvalue[1].indexOf("!");
				toSwitch = keyvalue[1].substring(0, i);
			}
			console.log("1128 toSwitch=" + toSwitch);
			switch(toSwitch){
			case "GR8PPP01":
				pingError(actions);
				break;
			case "reg03":
				regEmailError(actions);
				break;
			case "reg07":
				regError(actions);
				break;
			case "GetEmail":
				getEmailError(actions);
				break;
			case "GetKA":
				getKAError(actions);
				break;
			case "GetKC":
				getKCError(actions);
				break;
			case "AuthCo":
				getAuthCoError(actions);
				break;
			case "coSec":
				getCoSecLevelError(actions);
				break;
			case "coDelete":
				getCoDeleteError(actions);
				break;
			case "oneSec":
				getOneSecLevelError(actions);
				break;
				
			}
			break;
		}
	}	
	return error;
}
//
// *****  Error functions |AKTRequestID=AKTServerError|ERROR=N|AKTAPIID=xxx
//
function pingError(actions){	
	
}

function regEmailError(actions){	
	var error = ppp.getAKTLocal("servererror");
	document.getElementById("email03").value = ppp.getAKTLocal("email");
	document.getElementById("phone03").value = ppp.getAKTLocal("phone");
	console.log("920 error="+ error + " =" + errorCodes[error]);
 	setDOMStyle("regerror", 'table-row');
}

function regError(actions){		
}

function getEmailError(actions){		
	var error = ppp.getAKTLocal("servererror");
	document.getElementById("username").value = ppp.getAKTLocal("user");
	document.getElementById("password").value = ppp.getAKTLocal("pass");
	console.log("934 error="+ error + " =" + errorCodes[error]);
	document.getElementById("status").value = errorCodes[error];
// 	setDOMStyle("regerror", 'table-row');
}

function getKAError(actions){		
	var error = ppp.getAKTLocal("servererror");
	document.getElementById("username").value = ppp.getAKTLocal("user");
	document.getElementById("password").value = ppp.getAKTLocal("pass");
	console.log("1278 error="+ error + " =" + errorCodes[error]);
	document.getElementById("status").value = errorCodes[error];
	ppp.deleteAKTLocal("u5");
}

function getAuthCoError(actions){	
	var error = ppp.getAKTLocal("servererror");
	console.log("1221 error="+ error + " =" + errorCodes[error]);
	document.getElementById("status").value = "Error=" + errorCodes[error];
 	setDOMStyle("displayArea", 'table-row');
}

function getKCError(actions){
	
}

function getCoSecLevelError(actions){		
	var error = ppp.getAKTLocal("servererror");
	console.log("1211 error="+ error + " =" + errorCodes[error]);
	document.getElementById("status").value = "Error=" + errorCodes[error];
 	setDOMStyle("displayArea", 'table-row');
}

function getOneSecLevelError(actions){		
	var error = ppp.getAKTLocal("servererror");
	console.log("1216 error="+ error + " =" + errorCodes[error]);
	document.getElementById("status").value = "Error=" + errorCodes[error];
 	setDOMStyle("displayArea", 'table-row');
}

function getCoDeleteError(actions){	
	var error = ppp.getAKTLocal("servererror");
	console.log("1310 error="+ error + " =" + errorCodes[error]);
	document.getElementById("status").value = "Error=" + errorCodes[error];
 	setDOMStyle("displayArea", 'table-row');
	
}

function deleteAllAKTLocal()
{		
	  var decodedCookie = decodeURIComponent(document.cookie);
	  console.log("904 cookie=" + decodedCookie);
	  var ca = decodedCookie.split(';');
//	  var i  = 0;
//	  for(var c of ca){
     for (var i = 0; i < ca.length; i ++){
    	 var c = ca[i];
	  	 var parts = c.split("=");
	  	 console.log("95 " + i++ + ": " + parts[0] + "=" + parts[1]);
	  	 document.cookie =  parts[0] + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
	  	 document.cookie =  parts[0] + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
	  }
}
function setDOMStyle(name, value){
//	console.log("928 setting name=" + name + " style=" + value);
	if((document.getElementById(name)) != undefined)
		document.getElementById(name).style.display=value;
}

function resetRegister(){
 	setDOMStyle("actions", 'table-row');
 	setDOMStyle("complete", 'none');
}

function reset(){
//	console.log("968 completed");
 	setDOMStyle("main", 'table-row');
 	setDOMStyle("admin", 'none');
 	setDOMStyle("Initial", 'none');
 	setDOMStyle("regerror", 'none');
 	setDOMStyle("Error", 'none');
 	setDOMStyle("complete", 'none');
 	setDOMStyle("QuestionPart", 'none');
 	setDOMStyle("Q2Q", 'none');
 	setDOMStyle("Q2A", 'none');
 	setDOMStyle("users", 'none');
 	setDOMStyle("credentials", 'none');
 	setDOMStyle("personal", 'none');
 	setDOMStyle("delete", 'none');
 	setDOMStyle("listUsers", 'none');
 	setDOMStyle("deleteUser", 'none');
 	setDOMStyle("changeSecurity", 'none');
 	setDOMStyle("displayArea", 'none');
 	setDOMStyle("userdisplay", 'none');
 	setDOMStyle("userlist", 'none');
}
function buildiFrame(){
	var htmlcode=`src= "http://www.uiscan.com:8080/websocket/cryptoOfficer.html"`;
/*
	var htmlcode=`
	            <button onClick="deleteUser();">delete user</button>
            <button onClick="updateSecurity();">change security level</button>
            <button onClick="ppp.deleteAllAKTLocal();">delete all stored data</button>
`;
	var iframe = document.createElement('iframe');

	// div tag in which iframe will be added should have id attribute with value myDIV
	document.getElementById("iframediv").appendChild(iframe);

	// provide height and width to it
	iframe.setAttribute("style","height:600px;width:600px;top:100px;");
	iframe.contentWindow.document.open();
	iframe.contentWindow.document.write(htmlcode);
	iframe.contentWindow.document.close();
*/	
	ifrm = document.getElementById('iframe');
	ifrm.src ="http://www.uiscan.com:8080/websocket/cryptoOfficer.html";
	ifrm.style = "height:600px;width:100%;top:100px;";
	reset();
	setDOMStyle('iframediv', "table-row");
	setDOMStyle('actions', "none");
	setDOMStyle('displayArea', "none");
}
/*
Send: |AKTRequestID=AKTServerError|ERROR=N|   if an error occurred
Error codes:
*/
	var errorCodes ={
			536870923: "username and or password are incorrect",
			536870924: "there was a database error",
			536870925: "Not a valid security level",
			536870933: "Security level is insufficient (Not CO eg)",
			536870934: "the user's account is disabled",
			536870935: "there was a problem decrypting the data",
			536870936: "the user U5 or PBU5 could not be found",
			536870940: "the server does not find all expected name-value pairs in the received data",
			536870942: "username and password are already in use",
			536870944: "Session key has timed out.",
			536870962: "Missing parameters (email or uid eg)",
			536870971: "KA or UPKEY could not be located for the given U5 or PBU5"
	};

	var servers ={
		Dev: "207.81.189.121,12312",
		Chicago: "67.212.168.34,12312",
		Devlocal: "192.168.2.26,12312",
		STC: "192.168.2.221,12312",
		phc: "69.175.62.83,12312"
	};
	function parseJSON(){
		var obj = JSON.parse(contacts);
		var keys = Object.keys(obj);
		console.log("1403 keys=" + keys);
		
	}
	
	
	
   var contacts=`{"contacts":[
	   {"email":"jmartin@akcode.com","name":"jmartin","phoneNo":""},
	   {"email":"1927olds@gmail.com","name":"1927olds","phoneNo":"","zingmeKey":"WIgRRhLckQjjRfrvCR1I80RX6SRw4nUz625UW7bOSCc]"},
	   {"email":"rspraggs@aegissystems.com","name":"Robert","phoneNo":""},
	   {"email":"blandreth@akcode.com","name":"Bill","phoneNo":""},
	   {"email":"squeakytree@gmail.com","name":"tree","zingmeKey":"7b5gX5P5StCSar45AvPxkyKleJY.A4vV5rw54Vdbl3M]"},
	   {"email":"steve@whoknowsmedia.com","name":"Steve Durham"},
	   {"email":"petergspitzer@gmail.com","name":"Peter"},
	   {"email":"lspraggs@anonomouskey.com","name":"LDS AKT"}
	   ],
	   "groups":[
	   {"AegisTest":[
	   {"email":"1927olds@gmail.com"},
	   {"email":"squeakytree@gmail.com"}
	   ]}
	   ],
	   "unknown":[
	   ]}`;
/*
	for(var key in errorCodes){
		console.log("1026 key=" + key + " =" + errorCodes[key]);
	}
	for(var s in servers){
		var sp = servers[s].split(",");
		console.log("1026 key=" + s + " server=" + sp[0] + " port=" + sp[1]);
	}

*/