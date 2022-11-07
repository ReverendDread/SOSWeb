/*
function login() {
	var server 	 		= document.getElementById('server').value;
	var username		= document.getElementById('user').value;
	var pass 			= document.getElementById('pass').value;
	var cm              = AKTCM;
	var k5              = cm.makeK5(username, pass);
    var aesAKT          = new AKTaes();
    aesAKT.setEDC(true);
    aesAKT.initialize(k5);
	var u5          	= cm.makeU5(username);
	var u5B64       	= AKTBase64.encode(u5);
	var k5B64       	= AKTBase64.encode(k5);
	ppp.setAKTLocal("username", username,8); 
	ppp.setAKTLocal("password", pass,8); 
	ppp.setAKTLocal("u5B64", u5B64,8); 
	ppp.setAKTLocal("k5B64", k5B64,8); 
	ppp.setAKTLocal("server", server,8); 
	var retVar = loginToAKTServer(server, u5B64, k5B64);
}
*/
var storeID="";
var isChecked = false;

function listUsersForm() {
	reset();
	document.getElementById("main").style.display='none';
	document.getElementById("userlist").style.display='table-row';
	document.getElementById("users").style.display='table-row';
}

function credentialsForm() {
	reset();
	document.getElementById("main").style.display		='none';
	document.getElementById("userlist").style.display	='table-row';
	document.getElementById("credentials").style.display='table-row';
}

function personalForm() {
	reset();
	document.getElementById("main").style.display='none';
	document.getElementById("userlist").style.display='table-row';
	document.getElementById("personal").style.display='table-row';
}

function deleteUserForm() {
	reset();
	document.getElementById("main").style.display='none';
	document.getElementById("userlist").style.display='table-row';
	document.getElementById("delete").style.display='table-row';
}

function listUsers() {
	var table = document.getElementById("userTable");
	var rowCount = table.rows.length;
	console.log("52 rows=" + rowCount);
    if(rowCount < 3){	
    	var pbu5 			= ppp.getAKTLocal("pbu5");
    	var todo = "AKTRequestID=LISTALLUSERS|"
    	todo 	+= "PBU5=" + pbu5 + "|COMPRESS=1|";
    	console.log("57 todo=" + todo);
    	makeWork(todo);
    }
	reset();
	document.getElementById("main").style.display='none';
	document.getElementById("userlist").style.display='table-row';
	document.getElementById("users").style.display='table-row';
}

function changeSecurityForm() {
	reset();
	document.getElementById("main").style.display='none';
	document.getElementById("admin").style.display='table-row';
	document.getElementById("changeSecurity").style.display='table-row';
}

function setupForm(todo){
	var email	=document.getElementById("email01").value;
	if(email.length > 0)
		todo += "EMAIL=" + email + "|";
	var uid		=document.getElementById("uid01").value;
	if(uid.length > 0)
		todo += "UID=" + uid + "|";
	console.log("80 email=" + email + " uid=" + uid + " todo=" + todo);
	return todo;
}

function changeSecurity() {
	var todo = "AKTRequestID=UPDATEUSERSECURITYLEVEL|";
	var pbu5B64 = ppp.getAKTLocal("pbu5");
	todo += "PBU5=" + pbu5B64 + "|";
	todo = setupForm(todo);
	var sec		=document.getElementById("sec01").value;
	if(sec.length > 0)
		todo += "SEC=" + sec + "|";
	console.log("92  todo=" + todo);
	makeWork(todo);
	reset();
	document.getElementById("main").style.display='table-row';
}

function deleteUsersForm() {
	reset();
	document.getElementById("main").style.display='none';
	document.getElementById("admin").style.display='table-row';
	document.getElementById("deleteUser").style.display='table-row';
}

function finalDeleteUser() {
	var todo = "AKTRequestID=AKTDELETEUSER|";
	var pbu5B64 = ppp.getAKTLocal("pbu5");
	todo += "PBU5=" + pbu5B64 + "|";
	todo = setupForm(todo);
	console.log("110  todo=" + todo);
	makeWork(todo);
	reset();
	document.getElementById("main").style.display='table-row';
}

function showUsersForm() {
	reset();
	document.getElementById("main").style.display='none';
	document.getElementById("admin").style.display='table-row';
	document.getElementById("showUser").style.display='table-row';
}

function showUser() {
	var todo = "AKTRequestID=AKTSHOWUSER|";
	var pbu5B64 = ppp.getAKTLocal("pbu5");
	todo += "PBU5=" + pbu5B64 + "|";
	todo = setupForm(todo);
	console.log("128  todo=" + todo);
	makeWork(todo);
	reset();
	document.getElementById("main").style.display='table-row';
}

function updateUsersForm() {
	reset();
	document.getElementById("main").style.display='none';
	document.getElementById("admin").style.display='table-row';
	document.getElementById("updateUser").style.display='table-row';
}

function updateUsers() {
	reset();
}
 
function updateUserSVSForm() {
	reset();
	document.getElementById("main").style.display='none';
	document.getElementById("admin").style.display='table-row';
	document.getElementById("svs").style.display='table-row';
}

function updateUSerSVS() {
	reset();
}

function loginForm()
{
	reset();
	document.getElementById("main").style.display='none';
	document.getElementById("cryptologin").style.display='table-row';
}	

function ZRXppp01( ) {
	var pingTo      = ppp.pingData();
	var kppp		= ppp.getPingKey();
	var kppphex 	= AKT.HEXFormat(kppp);
	console.log("172 kppp=" + kppphex);
	var serverError = false;
	document.getElementById('ping01').value = pingTo;
	console.log("175 ping=" + pingTo);
	$.ajax({
		type : "POST",
		url : "/ZRXAdmin/zrxadmin",
		dataType : "json",
		data : $('#frmzrxping01').serialize(),     // ***** DRONEPPP01

//		***** we are going to get back the action, PONG (or ERROR),
//				KPPP (if not error)
//		
		success : function(response) {
			console.log("186 response=" + JSON.stringify(response));
			var akt = response.akt;
			var retVar = parseReturnVars(akt);
			var error 			= response.error;
			if(retVar[0][1].localeCompare("AKTServerError") == 0) 
			{
				serverError = true;
				processError(error);
				console.log("194 error=" + error);
				document.getElementById("status").value = "142 PPP Error: " + error;
			}
			else
			{
				ppp.setAKTLocal("ping", retVar[1][1]);
				ppp.setAKTLocal("kppp", retVar[1][2]); // ***** this is actually the D1
				console.log("201 kppp=" + retVar[1][2]);
			}	
			ZRXppp03();
			reset();
			document.getElementById("Main").style.display='table-row';
		}
	});
}  

function ZRXppp03( ) {  // *****  only usable currently for user registration
	var pong				= ppp.getAKTLocal('ping');
	var kppp				= ppp.getAKTLocal('kppp');
	console.log("213 kppp=" + kppp);
	var toDec				= "pppDecrypt";
	var pppdec  			= ppp.pingUserData(toDec);
	var pingTo             	= ppp.secondPing(pong);  // ***** compute final ping
	document.getElementById('ping03').value 			= pingTo;
	document.getElementById('kppp03').value 			= kppp;
	document.getElementById('pppcheck03').value 		= pppdec;
	$.ajax({
		type : "POST",
		url : "/ZRXAdmin/zrxadmin",
		dataType : "json",
		data : $('#frmzrxping03').serialize(),  // ***** ZRXPPP03
//
// ***** we are going to get back the action, PONG (or ERROR), 
//			KPPP (if not error)
//
		success : function(response) {
			console.log("229 response=" + JSON.stringify(response));
			var akt = response.akt;
			var retVar = parseReturnVars(akt);
			var error 			= response.error;
			if(error != null) {
				var stat = errorCode(error);
				console.log("235 error=" + stat);
				document.getElementById('status').value = stat;
				reset();
				document.getElementById("Main").style.display='table-row';
				document.getElementById("Status").style.display='table-row';

			} else {
				ppp.setAKTLocal("pong", retVar[1][1]); 
				ppp.setAKTLocal("kppp", retVar[1][2]); 
				console.log("244 kppp=" + retVar[1][2]);
				console.log("245 kppp=" + kppp);
			}
		}
	});
}

function makeWork(todo){
  var workForm 	= document.getElementById("workform");
  var vars = todo.split("|");
  console.log("254 todo=" + todo);
  console.log("255 vars=" + vars.toString());
  var key = makeCompositeKey();
  var aesAKT               = new AKTaes();
  aesAKT.setEDC(true);
  aesAKT.initialize(key);
  workForm.innerHTML = '';
  workForm.style.width = "750px";
  var button  		= document.createElement("button"); 
  button.width		= "50px";
  button.height		= "20px";
  button.id			= "but01";
  button.type		= "button";
  button.name		= "but01";
  button.value 		= "Cancel";
  button.onclick	= "cancel()";
  workForm.appendChild(button);
  for(x in vars){
	  console.log("272 x=" + x);
	  var y = vars[x].split("=");
	  console.log("274 y[0]=" + y[0] + " y[1]=" + y[1]);
	  switch(y[0]){
	  case "AKTRequestID":
		  var request  		= document.createElement("input"); 
		  request.setAttribute("type", "text");
		  request.setAttribute("id", "AKTRequestID");
		  request.setAttribute("name", "AKTRequestID");
		  request.setAttribute("value", y[1]);
		  workForm.appendChild(request);
		  var server  	= ppp.getAKTLocal("server"); 
		  var serve  		= document.createElement("input"); 
		  serve.setAttribute("type", "hidden");
		  serve.setAttribute("id", "SERVER");
		  serve.setAttribute("name", "SERVER");
		  serve.setAttribute("value", server);
		  workForm.appendChild(serve);
		  console.log("290 ="+ document.getElementById('AKTRequestID').value);
		  break;
	  case "EMAIL":
		  var email  		= document.createElement("input"); 
		  email.id			= "EMAIL";
		  email.type		= "text";
		  email.name		= "EMAIL";
		  email.value 		= aesAKT.encryptText(y[1]);
		  workForm.appendChild(email);
		  console.log("299 ="+ document.getElementById('EMAIL').value);
		  break;
	  case "UID":
		  var uid  			= document.createElement("input"); 
		  uid.id		= "UID";
		  uid.name		= "UID";
		  uid.value 	= aesAKT.encryptText(y[1]);
		  workForm.appendChild(uid);
		  console.log("307 ="+ document.getElementById('UID').value);
		  break;
	  case "PBU5":
		  var pbu5  			= document.createElement("input"); 
		  pbu5.id		= "PBU5";
		  pbu5.name		= "PBU5";
		  pbu5.value 	= y[1];
		  workForm.appendChild(pbu5);
		  console.log("315 ="+ document.getElementById('PBU5').value);
		  break;
	  case "SEC":
		  var sec  			= document.createElement("input"); 
		  sec.id		= "SECURITYLEVEL";
		  sec.name		= "SECURITYLEVEL";
		  sec.value 	= aesAKT.encryptText(y[1]);
		  workForm.appendChild(sec);
		  console.log("323 ="+ document.getElementById('SECURITYLEVEL').value);
		  break;
	  case "SVS":
		  var svs  			= document.createElement("input"); 
		  svs.id		= "svs";
		  svs.name		= "svs";
		  svs.value 	= aesAKT.encryptText(y[1]);
		  workForm.appendChild(svs);
		  console.log("331 ="+ document.getElementById('svs').value);
		  break;
	  case "COMPRESS":
		  var compress	= document.createElement("input"); 
		  compress.id		= "COMPRESS";
		  compress.name		= "COMPRESS";
		  compress.value 	= y[1];
		  workForm.appendChild(compress);
		  console.log("339 ="+ document.getElementById('COMPRESS').value);
		  break;
	  }
  }
  var KA = null;
  console.log("347 workForm=" + workForm.toString());
	$.ajax({
		type : "POST",
		url : "/ZRXAdmin/zrxadmin",
		dataType : "json",
		data : $('#workform').serialize(),  // ***** go to tomcat
//
// ***** we are going to get back the action, PONG (or ERROR), 
//		KPPP (if not error)
//		
		success : function(response) {
			var akt = response.akt;
			var retVar = parseReturnVars(akt);
			var error 			= response.error;
			console.log("354 response=" + retVar[1][0]);
			if(retVar[1][0].localeCompare("AKTServerError") == 0) {
				var error 			= retVar[1][1];
				var stat = errorCode(error);
				console.log("358 error=" + error + " " + stat);
				reset();
				processErrorForm("error:" + error + " " + stat);
			} else {
				var req = retVar[1][0];
				console.log("363 retVar length=" + retVar[1][0].length);
				console.log("364 req=" + req + " ?=" + retVar[1][1]);
				switch(req){
				case "LISTALLUSERS":
					var table = document.getElementById('userTable');
					table.innerHTML="";
					table.style.width = "700px";
					var cred = document.getElementById('credTable');
					cred.innerHTML="";
					cred.style.width = "700px";
					var Session 	= retVar[1][1];
					var Users		= retVar[1][2];
				    var session     = aesAKT.decryptText(Session);
				    console.log("376 session=" + session );
				    ppp.setAKTLocal("session", session);
				    var usersB64 	= AKTZip.AKTdecryptAndUnzip(Users,key);
				    var users 		= AKTBase64.decode(usersB64);
				    var obj			= JSON.parse(users);
				    k = 0;
				    var keys = Object.keys(obj.userList[0]);
				    console.log("383 keys=" + keys.join(","));
				    var BreakException = {};
				    var listul	 	= document.getElementById("userlistul");
				    reset();
					document.getElementById("userlist").style.display='table-row';
					document.getElementById("users").style.display='table-row';
					document.getElementById("main").style.display='none';
				    try{
				    	setupList();
					    obj.userList.forEach(function(user){
					    	var elements = createUserFromJSON(user);
					        addRow(elements, 1);  // *****  user
					        addRow(elements, 2);  // *****  personal
					        addRow(elements, 3);  // *****  credentials
					        addRow(elements, 4);  // *****  delete
					    });
				    }catch (e){
				    	if(e !== BreakException) throw e;
				    }
				    break;
				case "UPDATEUSERSECURITYLEVEL":
					var Session 	= retVar[1][1];
				    var session     = aesAKT.decryptText(Session);
				    console.log("412 session=" + session );
				    ppp.setAKTLocal("session", session);
					processSuccessForm();
					break;
				case "AKTDELETEUSER":
					var Session 	= retVar[1][1];
				    var session     = aesAKT.decryptText(Session);
				    console.log("419 session=" + session );
				    ppp.setAKTLocal("session", session);
					processSuccessForm();
					break;
				}
			}
      	workForm.innerHTML = '';  // ***** removes html
		}
	});
	  var j = 0;
}

function loginToAKTServer(server, u5B64, k5B64){
	var retVar = null;
	var k5 = AKTBase64.decode(k5B64);
	var aesAKT          = new AKTaes();
	aesAKT.setEDC(true);
	aesAKT.initialize(k5);
	var workForm 	= document.getElementById("workform");
	var request  	= document.createElement("input"); 
	request.setAttribute("type", "hidden");
	request.setAttribute("id", "AKTRequestID");
	request.setAttribute("name", "AKTRequestID");
	request.setAttribute("value", "AKTAUTHCO");
	workForm.appendChild(request);
	var u5  	= document.createElement("input"); 
	u5.setAttribute("type", "hidden");
	u5.setAttribute("id", "U5");
	u5.setAttribute("name", "U5");
	u5.setAttribute("value", u5B64);
	workForm.appendChild(u5);
	var serve  	= document.createElement("input"); 
	serve.setAttribute("type", "hidden");
	serve.setAttribute("id", "SERVER");
	serve.setAttribute("name", "SERVER");
	serve.setAttribute("value", server);
	workForm.appendChild(serve);
	console.log("462 ="+ document.getElementById('AKTRequestID').value);
	var KA = "X";
	var Session = null;
	ppp.setAKTLocal("KA", KA);
		$.ajax({
			type : "POST",
			url : "/ZRXAdmin/zrxadmin",
			dataType : "json",
			data : $('#workform').serialize(),  // ***** go to tomcat
			success : function(response) {
				console.log("388 response=" + JSON.stringify(response));
				var akt = response.akt;
				var retVar = parseReturnVars(akt);
				console.log("475 response length=" + retVar[0].length);
				if(retVar[0][1].localeCompare("AKTServerError") == 0) {
					var stat = errorCode(error);
					console.log("478 error=" + stat);
					KA = "error:" + stat;
					reset();
					ppp.setAKTLocal("pb", KA);
					processErrorForm(KA);
				} else {
					var req = retVar[1][0];
					KA 		= retVar[1][2];
					Session = retVar[1][1];
					console.log("488 req=" + req + " KA=" + KA);
					var username = ppp.getAKTLocal("username");
					var password = ppp.getAKTLocal("password");
					var pb = getPBfromKA(KA, username, password);
					var retVar = makePBu5AndPB5k(pb);
					ppp.setAKTLocal("pbu5", retVar[0]);
					ppp.setAKTLocal("pb5k", retVar[1]);
					var pb5k = AKTBase64.decode(retVar[1]);
				    var aesAKT               = new AKTaes();
				    aesAKT.setEDC(true);
				    aesAKT.initialize(pb5k);
				    var session         = aesAKT.decryptText(Session);
					ppp.setAKTLocal("session", session);
					workForm.innerHTML = '';  // ***** removes html
					console.log("502 session=" + session);
					//processSuccessForm();
					listUsers();
				}
				ppp.setAKTLocal("KA", KA);
			}
		});
}

function processErrorForm(error){
	reset();
	console.log("512 error=" + error);
	var table 		= document.getElementById('errorTable');
	var rowCount = table.rows.length;
	var row = table.insertRow(rowCount);
	var cell0 = row.insertCell(0);
	cell0.style.font= "15px arial,serif";
	cell0.style.width = "350px";
	cell0.innerHTML = error;
	document.getElementById("error").style.display='table-row';
	document.getElementById("main").style.display='none';
}

function processSuccessForm(success){
	reset();
	document.getElementById("success").style.display='table-row';
	document.getElementById("main").style.display='none';
}
/*
function getPBfromKA(KA, username, password) {
	var uniU = getUnicodeString(username);
	var uniP = getUnicodeString(password);
    var cm                   = AKTCM;
    var k5                   = cm.makeK5(uniU, uniP);
    var hexK5		 = AKT.HEXFormat(k5);
	  console.log("535 K5=" + hexK5 );
	  console.log("536 KA=" + KA );
    var aesAKT               = new AKTaes();
    aesAKT.setEDC(true);
    aesAKT.initialize(k5);
    var pb                  = aesAKT.decryptText(KA);
    var hexpb		 = AKT.HEXFormat(pb);
	  console.log("542 pb=" + hexpb );
	ppp.setAKTLocal("pb", pb);  
    return pb;
}
 
function makePBu5AndPB5k(pb){
    var pbu5    = AKTSha1.GetHash(pb);
    var pbu5B64 = AKTBase64.encode(pbu5);
    var revWord = "";
	var pbrev = reverse(pb);
    revWord += pbrev;
	var bitArray   = sjcl.hash.sha256.hash(revWord); // ***** bitData is an object
    var pb5khex = sjcl.codec.hex.fromBits(bitArray);
    var pb5k  	= AKTSha256.fromHex(pb5khex);
    var pb5kB64	= AKTBase64.encode(pb5k);
    var retVar 	= [];
    retVar[0] 	= pbu5B64;
    retVar[1] 	= pb5kB64;
	return retVar;
}  
*/
function addItem(value, UID){
    var ul = document.getElementById("userlist");
    var li = document.createElement("li");
    li.setAttribute('id',UID);
    li.appendChild(document.createTextNode(value));
    ul.appendChild(li);
}

function createUserFromJSON(user){
	var retVar = [];
	for(i=0; i<11; i++)
		retVar[i] = null;
    var keys = Object.keys(user);
    var k = keys.length;
    var u = "";
    for(i=0; i<k; i++){
    	var key = keys[i];
    	switch(key){
    	case "userID":
    		retVar[0] = user[key];
    		break;
    	case "email":
    		retVar[1] = user[key];
    		break;
    	case "securityLevel":
    		retVar[2] = user[key];
    		break;
    	case "phoneNo":
    		retVar[3] = user[key];
    		break;
    	case "firstName":
    		retVar[4] = user[key];
    		break;
    	case "lastName":
    		retVar[5] = user[key];
    		break;
    	case "svsUsername":
    		retVar[6] = user[key];
    		break;
    	case "username":
    		retVar[7] = user[key];
    		break;
    	case "password":
    		retVar[8] = user[key];
    		break;
    	case "securityAnswer1": 
    		retVar[9] = user[key];
    		break;
    	case "securityAnswer2":
    		retVar[10] = user[key];
    		break;
    	default:
    		break;
    	}
    }
	return retVar;
}

function addRow(user, action) {
	var table 		= document.getElementById('userTable');
	var credentials = document.getElementById('credTable');
	var personal 	= document.getElementById('personalTable');
	var deleteUser	= document.getElementById('deleteTable');
	switch(action){
	case 1:
		var rowCount = table.rows.length;
		var row = table.insertRow(rowCount);
		var cell1 = row.insertCell(0);
		cell1.innerHTML = "";
		var id =  user[0] + "|" + user[2] + "|" + user[1];
		var element1 = document.createElement("input");
		element1.setAttribute('onclick','userchkBox(this)');
		element1.setAttribute('type' , 'checkbox');
		element1.setAttribute('name',"userchkbox" + rowCount);
		element1.setAttribute('id',id);
		cell1.appendChild(element1);
		
		var cell2 = row.insertCell(1);
		cell2.style.font= "15px arial,serif";
		cell2.style.width = "50px";
		cell2.innerHTML = user[0];
		
		var cell3 = row.insertCell(2);
		cell3.style.font= "15px arial,serif";
		cell3.style.width = "50px";
		cell3.innerHTML = user[2];
		
		var cell4 = row.insertCell(3);
		cell4.style.font= "15px arial,serif";
		cell4.style.width = "300px";
		cell4.innerHTML = user[1];
/*		
		var element2 = document.createElement("input");
		element2.style.width = "300px";
		element2.type = "text";
		element2.name = "txtbox" + rowCount;
		element2.value = user[1];
		cell4.appendChild(element2);
 */		
		break;
	case 2:
		if(user[7] != null){
			var rowCount = credentials.rows.length;
			var row = credentials.insertRow(rowCount);
			var id = user[0] + "|" + user[2] + "|" + user[1] + "|C";
			var cell1 = row.insertCell(0);
			var element1 = document.createElement("input");
			element1.setAttribute('onclick','credchkBox()(this)');
			element1.setAttribute('type' , 'checkbox');
			element1.setAttribute('name',"userchkbox" + rowCount);
			element1.setAttribute('id',id);
			
			cell1.appendChild(element1);
			
			var cell2 = row.insertCell(1);
			cell2.style.font= "15px arial,serif";
			cell2.style.width = "50px";
			cell2.innerHTML = user[0];
			
			var cell3 = row.insertCell(2);
			cell3.style.font= "15px arial,serif";
			cell3.style.width = "100px";
			cell3.innerHTML = user[7];
			
			var cell4 = row.insertCell(3);
			cell4.style.font= "15px arial,serif";
			cell4.style.width = "100px";
			cell4.innerHTML = user[8];
			
			var cell5 = row.insertCell(4);
			cell5.style.font= "15px arial,serif";
			cell5.style.width = "100px";
			cell5.innerHTML = user[9];
			
			var cell6 = row.insertCell(5);
			cell6.style.font= "15px arial,serif";
			cell6.style.width = "100px";
			cell6.innerHTML = user[10];
		}
			break;
		case 3:
				if(user[3] != null || user[4] != null || user[5] != null)
				{
				var rowCount = personal.rows.length;
				var row = personal.insertRow(rowCount);
				var id = user[0] + "|" + user[2] + "|" + user[1] + "|P";
				var cell0 = row.insertCell(0);
				var element1 = document.createElement("checkbox");
				element1.setAttribute('onclick','perchkBox()(this)');
				element1.setAttribute('type' , 'checkbox');
				element1.setAttribute('name',"userchkbox" + rowCount);
				element1.setAttribute('id',id);
				
				cell0.appendChild(element1);
				
				var cell1 = row.insertCell(1);
				cell1.style.font= "15px arial,serif";
				cell1.style.width = "20px";
				cell1.innerHTML = user[0]; // uid
				
				var cell2 = row.insertCell(2);
				cell2.style.font= "15px arial,serif";
				cell2.style.width = "100px";
				if(user[4] != null)
					cell2.innerHTML = user[4]; // first name
				else
					cell2.innerHTML = "NA";
				
				var cell3 = row.insertCell(3);
				cell3.style.font= "15px arial,serif";
				cell3.style.width = "100px";
				if(user[5] != null)
					cell3.innerHTML = user[5];
				else
					cell3.innerHTML = "NA";
				
				var cell4 = row.insertCell(4);
				cell4.style.font= "15px arial,serif";
				cell4.style.width = "100px";
				if(user[3] != null)
					cell4.innerHTML = user[3];
				else
					cell4.innerHTML = "NA";
				}
				break;
			case 4:	
				var rowCount = deleteUser.rows.length;
				var row = deleteUser.insertRow(rowCount);
				var cell1 = row.insertCell(0);
				cell1.innerHTML = "";
				var id = user[0] + "|" + user[2] + "|" + user[1] + "|D";
				var element1 = document.createElement("input");
				element1.setAttribute('onclick','deleteUserConfirm(this)');
				element1.setAttribute('type' , 'checkbox');
				element1.setAttribute('name',"deletechkbox" + rowCount);
				element1.setAttribute('id',id);
				cell1.appendChild(element1);
				
				var cell2 = row.insertCell(1);
				cell2.style.font= "15px arial,serif";
				cell2.style.width = "50px";
				cell2.innerHTML = user[0];
				
				var cell3 = row.insertCell(2);
				cell3.style.font= "15px arial,serif";
				cell3.style.width = "50px";
				cell3.innerHTML = user[2];
				
				var cell4 = row.insertCell(3);
				cell4.style.font= "15px arial,serif";
				var element2 = document.createElement("input");
				element2.style.width = "300px";
				element2.type = "text";
				element2.name = "txtbox" + rowCount;
				element2.value = user[1];
				cell4.appendChild(element2);
			break;
		
	}
}

function deleteRow(tableID) {
	try {
	var table = document.getElementById(tableID);
	var rowCount = table.rows.length;
	for(var i=0; i<rowCount; i++) {
		var row = table.rows[i];
		var chkbox = row.cells[0].childNodes[0];
		if(null != chkbox && true == chkbox.checked) {
			table.deleteRow(i);
			rowCount--;
			i--;
		}
	}
	}catch(e) {
		alert(e);
	}
}

function chkBox(){
	   var boxes = document.getElementById("userlist").getElementsByTagName('checkbox'), vals = [];
	   for(var i = 0; i < boxes.length; ++i){
		      vals.push(boxes[i].value);
		      console.log("796 boxes=" + boxes[i].value);
		   }
	
}


function parseUser(user){
	var i = user.indexOf("|");
	var uid = user.substring(0, i);
	var data = user.substring(i + 1);
	
}

function resetX( ) {
	document.getElementById("main").style.display='table-row';
	document.getElementById("login").style.display='none';
	document.getElementById("admin").style.display='none';
	document.getElementById("changeSecurity").style.display='none';
	document.getElementById("deleteUser").style.display='none';
	document.getElementById("showUser").style.display='none';
	document.getElementById("updateUser").style.display='none';
	document.getElementById("svs").style.display='none';
	document.getElementById("work").style.display='none';
	document.getElementById("error").style.display='none';
	document.getElementById("success").style.display='none';
	document.getElementById("userlist").style.display='none';
	document.getElementById("users").style.display='none';
	document.getElementById("credentials").style.display='none';
	document.getElementById("personal").style.display='none';
	document.getElementById("delete").style.display='none';
}

function setupList(){
	var table 				= document.getElementById('userTable');
	var credentials 		= document.getElementById('credTable');
	var personal 			= document.getElementById('personalTable');
	var deleteUser 			= document.getElementById('deleteTable');
	table.innerHTML 		= '';
	credentials.innerHTML 	= '';
	personal.innerHTML 		= '';
	deleteUser.innerHTML 	= '';
	
	var form		= document.getElementById('allusersform');
//
// ***** first set up the users table
//	
	rowCount = table.rows.length;
	var row = table.insertRow(rowCount);
	var cell0 = row.insertCell(0);
	cell0.style.font	= "15px arial,serif";
	cell0.style.width 	= "50px";
	
	var cell1 = row.insertCell(1);
	cell1.style.font= "15px arial,serif";
	cell1.style.width = "50px";
	cell1.innerHTML = "UID";
	
	var cell2 = row.insertCell(2);
	cell2.style.font= "15px arial,serif";
	cell2.style.width = "50px";
	cell2.innerHTML = "Sec";
	
	var cell3 = row.insertCell(3);
	cell3.style.font= "15px arial,serif";
	cell3.style.width = "300px";
	cell3.innerHTML = "Email";
//
// ***** now, setup the users credentials listing
//	
	rowCount = credentials.rows.length;
	row = credentials.insertRow(rowCount);
	cell0 = row.insertCell(0);
	cell0.style.font= "15px arial,serif";
	cell0.style.width = "50px";
	cell0.innerHTML = "Act";

	cell1 = row.insertCell(1);
	cell1.style.font= "15px arial,serif";
	cell1.style.width = "50px";
	cell1.innerHTML = "UID";
	
	cell2 = row.insertCell(2);
	cell2.style.font= "15px arial,serif";
	cell2.style.width = "100px";
	cell2.innerHTML = "username";
	
	cell3 = row.insertCell(3);
	cell3.style.font= "15px arial,serif";
	cell3.style.width = "100px";
	cell3.innerHTML = "password";
	
	cell4 = row.insertCell(4);
	cell4.style.font= "15px arial,serif";
	cell4.style.width = "100px";
	cell4.innerHTML = "Answer 1";
	
	cell5 = row.insertCell(5);
	cell5.style.font= "15px arial,serif";
	cell5.style.width = "100px";
	cell5.innerHTML = "Answer 2";
//
// ***** now, setup the users personal info
//	
	rowCount = personal.rows.length;
	row = personal.insertRow(rowCount);
	cell0 = row.insertCell(0);
	cell0.style.font= "15px arial,serif";
	cell0.style.width = "50px";
	cell0.innerHTML = "Act";

	cell1 = row.insertCell(1);
	cell1.style.font= "15px arial,serif";
	cell1.style.width = "50px";
	cell1.innerHTML = "UID";
	
	cell2 = row.insertCell(2);
	cell2.style.font= "15px arial,serif";
	cell2.style.width = "100px";
	cell2.innerHTML = "First Name";
	
	cell3 = row.insertCell(3);
	cell3.style.font= "15px arial,serif";
	cell3.style.width = "100px";
	cell3.innerHTML = "Last Name";
	
	cell4 = row.insertCell(4);
	cell4.style.font= "15px arial,serif";
	cell4.style.width = "100px";
	cell4.innerHTML = "Phone";
//
// ***** finally set up the delete users table
//	
		rowCount = deleteUser.rows.length;
		var row = deleteUser.insertRow(rowCount);
		var cell0 = row.insertCell(0);
		cell0.style.font	= "15px arial,serif";
		cell0.style.width 	= "50px";
		
		var cell1 = row.insertCell(1);
		cell1.style.font= "15px arial,serif";
		cell1.style.width = "50px";
		cell1.innerHTML = "UID";
		
		var cell2 = row.insertCell(2);
		cell2.style.font= "15px arial,serif";
		cell2.style.width = "50px";
		cell2.innerHTML = "Sec";
		
		var cell3 = row.insertCell(3);
		cell3.style.font= "15px arial,serif";
		cell3.style.width = "300px";
		cell3.innerHTML = "Email";
}

function userchkBox(ths){
	var id = ths.id;
	console.log("955 id=" + id + " =" + document.getElementById(ths.id).checked);
	isChecked = document.getElementById(ths.id).checked;
	if(isChecked)
		storeID = id;
	else
		storeID = "";
	console.log("961 isChecked=" + isChecked + " storeID=" + storeID);
	
//	if(document.getElementById(ths.id).checked === true)
//		document.getElementById(ths.id).checked = false;
//	else
//		document.getElementById(ths.id).checked = true;
}	

function actOnCheck(ths){	
var id = ths.id;
	var user = id.split("|");
	var uid  = parseInt(user[0]);
	try {
		var table = document.getElementById("userTable");
		var rowCount = table.rows.length;
		var rows = table.rows;
		var timeToQuit = false;
		for(var i=1; i<rowCount; i++) {
			var timeToQuit = false;
			var row = table.rows[i];
			var cells = row.cells;
			var id  = cells[0].childNodes[0].id;
			var parts = id.split("|");
			console.log("977 id=" + id);
			var parts = id.split("|");
			var u = parseInt(parts[0]);
			console.log("980 cells=" + cells[0]);
			if(u == uid){
				console.log("982 rowCount=" + rowCount + " uid=" + uid + " cells=" + cells.length);
				document.getElementById(id).checked = false;
				document.getElementById('showUID').innerHTML	= cells[1].innerHTML;
				document.getElementById('showEmail').innerHTML 	= cells[3].innerHTML;
				document.getElementById('secLevel').value  		= cells[2].innerHTML;
				reset();
			 	setDOMStyle("userdisplay", 'table-row');
			 	setDOMStyle("main", 'none');
				
				for(var j=0; j<cells.length; j++){
					
					console.log("993 cell[" + j + "] =" + cells[j].childNodes[0]);
					console.log("994 cell[" + j + "] =" + cells[j].childNodes[0].value);
					console.log("995 cell[" + j + "] =" + cells[j].innerHTML);
				}
 	
				break;
			}
		}		
			console.log("999 i=" + i);
		}catch(e) {
			console.log("1001 error=" + e);
		}
}

function credchkBox(){
	var cont = document.getElementById('credTable').children;
	
}

function perchkBox(){
	var cont = document.getElementById('personalTable').children;
	
}

function deleteThisUser(){
	console.log("1025 isChecked=" + isChecked + " storeID=" + storeID);
	if(isChecked){
		var parts = storeID.split("|");
		console.log("1028 uid=" + parts[0]);
		var u = parseInt(parts[0]);
		document.getElementById("uid01").value = u;
		deleteOneUser(); // routine is in AKTAuthServer.js
	}
	else
		document.getElementById("uid01").value = "";
}

function deleteUserConfirm(thisUser) {
	console.log("989 id=" + thisUser.id);
	var user = thisUser.id.split("|");
  var txt;
  var r = confirm("990 Confirm Delete User=" + user[0] + " email=" + user[2]);
  if (r == true) {
	  removeRow(thisUser);
  } else {
		document.getElementById(thisUser.id).checked = false;
  }
}

function removeRow(thisDelete) {
	try {
		var id = thisDelete.id;
		var user = id.split("|");
		var uid  = parseInt(user[0]);
		console.log("1005 id=" + id + " uid=" + uid);
		deleteUser(user[0]);
/*		
		var table = document.getElementById('deleteTable');
		var cred = document.getElementById('credTable');
		var per  = document.getElementById('personalTable');
		var user  = document.getElementById('userTable');
		deleteFromTable(table, uid);
		deleteFromTable(cred, uid);
		deleteFromTable(per, uid);
		deleteFromTable(user, uid);
 */		
	}catch(e) {
		console.log("1018 error=" + e.toString());
	}
}

function finishDeleteUser(uid){
	try {
		console.log("1024 delete user uid=" + uid );
		var table = document.getElementById('deleteTable');
		var cred = document.getElementById('credTable');
		var per  = document.getElementById('personalTable');
		var user  = document.getElementById('userTable');
		deleteFromTable(table, uid);
		deleteFromTable(cred, uid);
		deleteFromTable(per, uid);
		deleteFromTable(user, uid);
		listUsersForm();	
	}catch(e) {
		console.log("1035 error=" + e.toString());
	}
	
}

function finishSecurityLevel(uid,sec){
	try {
		console.log("1071 security Level user uid=" + uid + " sec=" + sec);
		var del = document.getElementById('deleteTable');
		var user  = document.getElementById('userTable');
		changeSecurityInTable(del, uid, sec);
		changeSecurityInTable(user, uid, sec);
		
	}catch(e) {
		console.log("1035 error=" + e.toString());
	}
}

function changeSecurityInTable(table, uid, sec){
	var rowCount = table.rows.length;
	var i;
	try{
		for(i=1; i<rowCount; i++) {
			var timeToQuit = false;
			var row = table.rows[i];
			var cells = row.cells;
			var id  = cells[0].childNodes[0].id;
			var parts = id.split("|");
			var uidHere = parseInt(parts[0]);
			if(uidHere == uid){
				var newid =  parts[0] + "|" + sec + "|" + parts[2];
				if(parts.length ==4)
					newid += "|" + parts[3];
				console.log("1094 newid=" + newid);
				cells[0].childNodes[0].id = newid;
				cells[2].innerHTML = sec;
				timeToQuit = true;
			}	
			if(timeToQuit)
				break;
		}
		listUsersForm();
	}catch(e) {
		console.log("1105 i=" + i + " error=" + e.toString());
	}
}

function deleteFromTable(table, uid){
	var rowCount = table.rows.length;
	console.log("1111 rowCount=" + rowCount + " uid=" + uid + 
			" table=" + table.id);
	try{
		for(var i=1; i<rowCount; i++) {
			var timeToQuit = false;
			var row = table.rows[i];
			var cells = row.cells;
			var id  = cells[0].childNodes[0].id;
			var parts = id.split("|");
			var uidHere = parseInt(parts[0]);
			if(uidHere == uid){
				var rowHere = parseInt(parts[0]);
				table.deleteRow(i);
				console.log("1124 table=" + table.id + " " +
						"uid=" + uid + " row=" +rowHere + "  " +
						"id=" + id );
				timeToQuit = true;
			}
			if(timeToQuit)
				break;
		}	
	}catch(e) {
		console.log("1133 i=" + i + " error=" + e.toString());
	}
}

function readTextFile(file)
{
/*	
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                console.log("1139 " + allText);
            }
        }
    }
    rawFile.send(null);
 */
	
    var fr=new FileReader(); 
//    fr.onload=function(){ 
//        file.textContent=fr.result; 
//    } 
      console.log("1151 file=" + file);
      
      console.log("1152 " + fr.readAsText(file)); 

	
	
}