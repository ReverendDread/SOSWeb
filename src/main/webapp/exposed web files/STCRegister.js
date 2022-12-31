function setupIframe(){
    document.getElementById("mainForm").style.display='none';
    document.getElementById("iframeDiv").style.display='table-row';
//    document.getElementById("stcDiv").style.display='table-row';
			document.getElementById("afterUID").style.display='table-row';


}


	

	function CheckPW()
	{
	    //Store the password field objects into variables ...
	    var password = document.getElementById('pass1');
	    var pass2 = document.getElementById('pass2');
	    //Store the Confimation Message Object ...
	    var message = document.getElementById('confirmMessage');
	    //Set the colors we will be using ...
	    var goodColor = "#66cc66";
	    var badColor  = "#ff6666";
	    //Compare the values in the password field 
	    //and the confirmation field
	    if(password.value == pass2.value){
	        //The passwords match. 
	        //Set the color to the good color and inform
	        //the user that they have entered the correct password 
	        pass2.style.backgroundColor = goodColor;
	        message.style.color = goodColor;
	        message.innerHTML = "Passwords Match!"
	    }else{
	        //The passwords do not match.
	        //Set the color to the bad color and
	        //notify the user.
	        pass2.style.backgroundColor = badColor;
	        message.style.color = badColor;
	        message.innerHTML = "Passwords Do Not Match!"
	    }
	}  
	function makeKA(pb, username, password) {
		var uniU = getUnicodeString(username);
		var uniP = getUnicodeString(password);
	    var cm                   = AKTCM;
	    var k5                   = cm.makeK5(uniU, uniP);
	    var aesAKT               = new AKTaes();
	    aesAKT.setEDC(true);
	    aesAKT.initialize(k5);
	    var KA                  = aesAKT.encryptText(pb);
	    return KA;
	}

	function getPBfromKA(KA, username, password) {
		var uniU = getUnicodeString(username);
		var uniP = getUnicodeString(password);
	    var cm                   = AKTCM;
	    var k5                   = cm.makeK5(uniU, uniP);
	    var hexK5		 = AKT.HEXFormat(k5);
		  console.log("1057 K5=" + hexK5 );
		  console.log("1058 KA=" + KA );
	    var aesAKT               = new AKTaes();
	    aesAKT.setEDC(true);
	    aesAKT.initialize(k5);
	    var pb                  = aesAKT.decryptText(KA);
	    var hexpb		 = AKT.HEXFormat(pb);
		  console.log("1064 pb=" + hexpb );
		ppp.setAKTLocal("pb", pb);  
	    return pb;
	}

	function makeKA(pb, username, password) {
		var uniU = getUnicodeString(username);
		var uniP = getUnicodeString(password);
	    var cm                   = AKTCM;
	    var k5                   = cm.makeK5(uniU, uniP);
	    var aesAKT               = new AKTaes();
	    aesAKT.setEDC(true);
	    aesAKT.initialize(k5);
	    var KA                  = aesAKT.encryptText(pb);
	    return KA;
	}

	function getPBfromKA(KA, username, password) {
		var uniU = getUnicodeString(username);
		var uniP = getUnicodeString(password);
	    var cm                   = AKTCM;
	    var k5                   = cm.makeK5(uniU, uniP);
	    var hexK5		 = AKT.HEXFormat(k5);
		  console.log("1057 K5=" + hexK5 );
		  console.log("1058 KA=" + KA );
	    var aesAKT               = new AKTaes();
	    aesAKT.setEDC(true);
	    aesAKT.initialize(k5);
	    var pb                  = aesAKT.decryptText(KA);
	    var hexpb		 = AKT.HEXFormat(pb);
		  console.log("1064 pb=" + hexpb );
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

	function makeKS(pb, ans1In, ans2In) {
	    var ans1 = ans1In.toLowerCase().trim();
	    var ans2 = ans2In.toLowerCase().trim();
		  console.log("1238 ans1=" + ans1 + " ans2=" + ans2 );
		var buffer = "";
	    var buf = "";
		for (i = 0; i < 32; i++)
			if(i < ans1.length)
	  		   buf += String.fromCharCode(0xca ^ ans1.charCodeAt(i));
			else
		  	   buf += String.fromCharCode(0xca);
		
		var bufrev = "";	// *****  protocol says to reverse the string	
		var l = ans2.length; var m = 0;
		for (i = 0; i < 32; i++)
//			if(i < ans2.length)
//	  		   bufrev += String.fromCharCode(buf.charCodeAt(31-i) ^ ans2.charCodeAt(i));
			if(i > (31-ans2.length)){
	  	  		   bufrev += String.fromCharCode(buf.charCodeAt(i) ^ ans2.charCodeAt(l-m-1));
			   m++;
			}
			else
		  	   bufrev += String.fromCharCode(buf.charCodeAt(i));
//		   bufrev += String.fromCharCode(buf.charCodeAt(31-i));
			var prtrev = AKT.HEXFormat(bufrev);
		  console.log("1260 bufrev=" + prtrev );
	    var bitArray   = sjcl.hash.sha256.hash(bufrev); // ***** bitData is an object
	    var hash = sjcl.codec.hex.fromBits(bitArray);
		  console.log("1263 hash=" + hash );
//	    var key  = AKTSha256.fromHex(hash);
//	    var key  = AKTSha256.fromHex(bufrev);
//	    var keyprt = AKT.HEXFormat(key);
//		  console.log("746 key=" + keyprt );

//		    sha256     = AKTSha256;
//		    var serverHex   	= sha256.hasher(bufrev);
//			  console.log("750 serverHex=" + serverHex );
	    var serverHash		= AKTSha256.fromHex(hash);
	    var aesAKT               = new AKTaes();
	    aesAKT.setEDC(true);
//	    aesAKT.initialize(key);
//	    aesAKT.initialize(hash);
	    aesAKT.initialize(serverHash);
	    var ks           = aesAKT.encryptText(pb);
		  console.log("1279 ks=" + ks );
		return (ks);
		}
	
		function verifyUser(KPPP) {
	      var cm                 = AKTCM;
	      var k5B64 = ppp.getAKTLocal("k5");
	      
	      var k5    = AKTBase64.decode(k5B64);
	      cm.initializeCM(k5);
	      var kppp               = KPPP;
	      var checkUser          = cm.decryptTextCM(kppp);
	      var sessHex            = AKT.HEXFormat(checkUser);
	      //console.log("499 session=" + sessHex);
	      document.getElementById("valueRet").innerHTML = "Error: 499 session= " + sessHex;
	      if(checkUser != null)
	    	  {
	             var checkB64           = AKTBase64.encode(checkUser); 
	             localStorage.setItem("session", checkB64);
	    	  }
	      return checkB64;
		}
 		
	function validateForm(email) {
	    var x = email;
	    var x=x.trim();
	    console.log("1224 email=" + x);
	    var atpos = x.indexOf("@");
	    var dotpos = x.lastIndexOf(".");
	    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
	        //alert("Not a valid e-mail address");
	        return false;
	    }
	    return true;
	}
	
	function sleep() {
		  console.log('time= done' + Date.now() );
		/*
		var ret = new Promise(
				function(resolve){
					var setTime = setTimeout(resolve, ms);
					resolve(setTime);
				}
				);
//		  return new Promise(resolve => setTimeout(resolve, ms));
//		};
	*/
	}
	
	function goToSleep(time,func, param) {
		  console.log('time=' + Date.now() + " param=" + param);
//		setTimeout(sleep,time);	
//		var KA = setTimeout(func(param),time);	
		var KA = setTimeout(func,time);	
		/*
		  console.log('Taking a break...');
		  sleep(time);
		  console.log('time=' + time);
		  */
		return(KA);
		}
		
	function getPB5k(){
		var pb5kB64 	= ppp.getAKTLocal("pb5k");
		var pb5k		= AKTBase64.decode(pb5kB64);
	    return pb5k;
	}

	function initializeCM(aesAKT, key, edc)
	{
	   aesAKT.setEDC(edc);
	   aesAKT.initialize(key);
	}

	function encryptTextCM(textIn)
	{
	   var aesAKT          = new AKTaes();
	   var pb5k 			= getPB5k();
	   initializeCM(aesAKT, pb5k, true);
	   var textEnc        = aesAKT.encryptText(textIn);
	   return (textEnc);
	}

	function decryptTextCM(textIn)
	{
	   var aesAKT          = new AKTaes();
	   var pb5k 			= getPB5k();
	   initializeCM(aesAKT, pb5k, true);
	   var clearText        = aesAKT.decryptText(textIn);
	   return (clearText);
	}

	function encryptRawCM( raw)
	{
	   var aesAKT          = new AKTaes();
	   var pb5k 			= getPB5k();
	   initializeCM(aesAKT, pb5k, true);
	   var byteArray  = aesAKT.encryptRaw(raw, raw.length);
	   var encText = toHexFromASCIIArray(byteArray); 
	   return (encText);
	}

	function decryptRawCM( encText)
	{
	   var aesAKT          = new AKTaes();
	   var pb5k 			= getPB5k();
	   initializeCM(aesAKT, pb5k, true);
	   var encRaw = AKTSha256.fromHex(encText);
	   var byteArray  = aesAKT.decryptRaw(encRaw, encRaw.length);
	   var rawHex = toHexFromASCIIArray(byteArray); 
	   var raw   = AKTSha256.fromHex(rawHex);
	   return (raw);
	}

	function base64EncodeCM( b64)   // *****  new file will be created
	{
	  var encoded = AKTBase64.encode(b64);
	//  ppp.setAKTLocal("test","cookie test", 2); 
	  return(encoded);
	}

	function base64DecodeCM( b64)   // *****  new file will be created
	{
	  var decoded = AKTBase64.decode(b64);
	//  ppp.deleteAKTLocal("test"); 
	  return(decoded);
	}

	function logoutCM()   // *****  remove all entries from the AKTLocal Storage except KA
	{
		var cookies = document.cookie.split(';');
		for(var i=1; i <= cookies.length; i++){
			var j = cookies[i-1].indexOf("server=");
			var k = cookies[i-1].indexOf("socket=");
			var l = cookies[i-1].indexOf("p=");
			var m = cookies[i-1].indexOf("e1=");
			var n = cookies[i-1].indexOf("d1=");
			console.log("1280  j=" + j + " k=" + k 
					+ " l=" + l + " m=" + m + " n=" + n + " cookie=" + cookies[i-1]);
//			if((j < 0) && (k < 0) && (l < 0) && (m < 0) && (n < 0)   ){
			if(j < 0) 
				if(k < 0) 
					if (l < 0) 
						if (m < 0) 
							if (n < 0)   {
								console.log("1282 delete=" + cookies[i-1] );
								ppp.deleteAKTLocal(cookies[i-1]);
								}
		}
		var formData = getLoginForm();
		document.getElementById('contacts').innerHTML = formData;
	    return(true);
	}
	
	function testNull() {
	    var maybe = ppp.getAKTLocal("isanull", "");
	    if(maybe == null)
	    	console.log("1055 maybe is null");
	    else
	    	console.log("1057 maybe is NOT null");
	    if(typeof(OKmaybe) == 'undefined')
	    	console.log("1059 VarType OKmaybe is undefined");
	    else
	    	console.log("1061 VarType OKmaybe is NOT undefined");
	    if(maybe == 'undefined')
	    	console.log("1063 maybe is undefined");
	    else
	    	console.log("1065 maybe is NOT undefined");
	    	


	}
	function showSubmit() {
		//document.frmregister.style.visibility=hidden;
		//document.getElementById("frmregister").style.display='none';
		//alert("In showSubmit()");
			document.getElementById("submitIt").style.display='table-row';
		}

		function DoOnload(action) {
			var date = Date.now();
			  console.log("39 Action1=" + action + " index=" + document.cookie.indexOf('logintime') );
			  console.log("40 logintime=" + ppp.ifExistsAKTLocal('logintime'));
			  if (document.cookie.indexOf('logintime') < 0 ) {
				  var dateStr = date.toString();
				  ppp.setAKTLocal("logintime", dateStr);
				  console.log("41 Action2=" + action + " date=" + dateStr );
					var formData = getLoginForm();
					document.getElementById('contacts').innerHTML = formData;
				}	   
			else{
				var oldDateStr = ppp.getAKTLocal("logintime");
				var oldDate = parseInt(oldDateStr);
				var delta = date - oldDate;
				var timeToLog = 2*60*1000;
				var isKA		= document.cookie.indexOf('KA');
				console.log("47 Action3=" + action + " date=" + date + " old=" + oldDate
						+ " delta=" + delta + " logtime=" + timeToLog + " isKA=" + isKA);
				if(delta > timeToLog || isKA < 0){ // *****  login timer to be set larger
					ppp.setAKTLocal("logintime", date.toString());
					var formData = getLoginForm();
					document.getElementById('contacts').innerHTML = formData;
				} else {
					console.log("57 delta=" + delta );
					var formData = getNoLoginForm();
					document.getElementById('contacts').innerHTML = formData;
				}
			}
		    if(action != 1){
		        ppp.setAKTLocal("server","207.81.189.121");  // ***** Dev server
		        action =1;
		    }
		    else
		    	ppp.setAKTLocal("server","67.212.168.34"); // ***** Chicago
		   ppp.setAKTLocal("socket","12312"); 
		   console.log("69 server=" + ppp.getAKTLocal("server"));
		   console.log("70 cookie=" + document.cookie); // *****  retrieves the cookie list
		//
		// *****  if we were doing this correctly, this would trigger the pingfct function to do the 
//		        first ping in the background.
		//   
		//   var formData = getLoginForm();
//			document.getElementById('contacts').innerHTML = formData;
		}

   function getLoginForm() {
		    var formData = '';
		    formData += '<h3>Please Authenticate Yourself</h3>';
		    formData += '<form id="frmlogin" name="secure">';
		    formData += 'UserName  <input type="text" id="username" name="username" value="mugwump"> <br> ';
		    formData += 'Password  <input type="password" id="password"  name="password" value="12345678"><br>';
		    formData += 'ZingPass  <input type="text" id = "zingpassin" name="zingpassin"   value="1"> (optional)<br>';
		    formData += '<input type="hidden" name="AKTRequestID" value="AKTLogin">';
		    formData += '<input type="hidden" id = "serverl" name="serverl"   value="">';
			formData += '<input type="hidden" id = "socketl" name="socketl"   value="">';
			formData += '<input type="hidden" id = "cvalue" name="cvalue"   value="">';
			formData += '<input type="button" value="Authenticate " onclick="login()"><br><br>';
			formData += '<input type="button" value="Secure Logout " onclick="logout()"><br><br>';
			formData += '<input type="button" value="Show Contacts " onclick="contacts()"><br><br>';
		    formData += '</form>';
		    return formData;
		}    

   function getNoLoginForm() {
			    var formData = '';
			    formData += '<h3>Functions Here</h3>'
			    formData += '<form id="frmnologin" name="nologin">'
				formData += '<input type="button" value="Secure Logout " onclick="logout()"><br><br>'
				formData += '<input type="button" value="Show Contacts " onclick="contacts()"><br><br>';
			    formData += '</form>';
			    return formData;
			}    

		   
		function toHexFromASCIIArray(bArray) {
			  return Array.from(bArray, function(bytes) {
			    return ('0' + (bytes & 0xFF).toString(16)).slice(-2);
			  }).join('')
			}

		function getUnicodeString(chx)
		{
		    j = 0;
			var sb="";
			var aNull = 0x7d;
			for (var i = 0; i < chx.length; i++ ){
		    b1 = (chx.charAt(i));
		    sb +=b1;
		    sb += String.fromCharCode(0x00);
			}
			return(sb);
		}

		function reverse (s) {
			var j = s.length-1;
//			var o = [s[j--]];
			var o = '';
			for (var i = s.length - 1 ; i >= 0; o += s[i--]) { }
//			for (var i = 0 ; i < s.length - 2; i++){ o.push( s[j--])  };
		    var hexrev = AKT.HEXFormat(o);
		    var srev = AKT.HEXFormat(s);
//			alert("61 rev 4=" + hexrev + " s=" + srev);
			return o;
			}

		    function getRandomKey(n){
		    	var d = Date.now();
		    	var dstr = d.toString();
		        prng = AKTPRNG;
		    	prng.Zeroize();
		    	var seed                  = prng.FIPS186_2_RNG_SetSeed(dstr, dstr.length);
		        var rnd1                  = prng.GetRandomString();
		        var rnd2                  = prng.GetRandomString();
		        var longKey = rnd1 + rnd2;
		    	var hexkey = AKT.HEXFormat(longKey);
		        var key = longKey.substring(0,n);
		        return key; 		
		    }

		    function getPBfromKS(ks, ans1In, ans2In) {
//		    	function makeKS(pb, ans1In, ans2In) {
		    	    var ans1 = ans1In.toLowerCase().trim();
		    	    var ans2 = ans2In.toLowerCase().trim();
		    		  console.log("1689 ans1=" + ans1 + " ans2=" + ans2 );
		    		var buffer = "";
		    	    var buf = "";
		    		for (i = 0; i < 32; i++)
		    			if(i < ans1.length)
		    	  		   buf += String.fromCharCode(0xca ^ ans1.charCodeAt(i));
		    			else
		    		  	   buf += String.fromCharCode(0xca);
		    		
		    		var bufrev = "";	// *****  protocol says to reverse the string	
		    		var l = ans2.length;
		    		var m = 0;
//		    		for (i=0; i<32; i++){
//		    	  		   buf[31-i]= String.fromCharCode(buf.charCodeAt(31-i) ^ ans2.charCodeAt(i));
//		    		}
		    		
		    		for (i = 0; i < 32; i++)
		    			if(i > (31-ans2.length)){
//		    	  		   bufrev += String.fromCharCode(buf.charCodeAt(31 + m -l) ^ ans2.charCodeAt(l-m));
		    	  		   bufrev += String.fromCharCode(buf.charCodeAt(i) ^ ans2.charCodeAt(l-m-1));
		    	  		   m++;
		    			}
		    			else
		    		  	   bufrev += String.fromCharCode(buf.charCodeAt(i));
		    			var prtrev = AKT.HEXFormat(bufrev);
	 
	    			var prtrev = AKT.HEXFormat(bufrev);
		    		  console.log("1789 l=" + l + " buf=" + prtrev );
		    	    var bitArray   = sjcl.hash.sha256.hash(bufrev); // ***** bitData is an object
		    	    var hash = sjcl.codec.hex.fromBits(bitArray);
		    		  console.log("1708 hash=" + hash );
		    	    var serverHash		= AKT.fromHex(hash);
		    	    var aesAKT               = new AKTaes();
		    	    aesAKT.setEDC(true);
		    	    aesAKT.initialize(serverHash);
		    	    var pb           = aesAKT.decryptText(ks);
		    	    var hexpb		 = AKT.HEXFormat(pb);
		    		  console.log("1728 pb=" + hexpb );
			    	    aesAKT.setEDC(true);
		    		var checkKS = aesAKT.encryptText(ppp.getAKTLocal("pb"))
		    		  console.log("1802 checkKS=" + checkKS );
		    		  console.log("1803      KS=" + ks );
		    		var check2KS = makeKS(ks,ans1In, ans2In );
		    		  console.log("1803   makeKS=" + check2KS );
		    		
		    		return (pb);
		    		}

   function getReturnVars(akt) {
			var l = akt.length;
			console.log("2046 AKTRequestID=" + akt[0]);
			for(j=0; j<l; j++){
				if(akt[j] !=null){
					var i     = akt[j].indexOf("=");
					var left  = akt[j].substring(0, i);
					var right = akt[j].substring(i+1);
					console.log("2052 left=" + left + " right=" + right);
				}
			}
	    }   

//		
//*****  process ALL incoming messages here
//
function processRequestID(msg){		// ****  0#iii#|AKTRequestID=xxx|.... 
	proxy.logout();
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
	var n = actions.length;
	var requestID = actions[0].split("=");
//		if(requestID[1].localeCompare("AKTServerError") == 0){
	switch(requestID[1]){
		case "AKTServerError":
			var aktapiid = actions[n-1].split("=");
			processError(actions, aktapiid[1]);
		break;
		case "GR8PPP02":
			processPong(actions);
		break;
		case "GR8PPP04":
			processFinalPong(actions);
		break;
		case "GR8Reg02":
			STCprocessRegister(actions);
		break;
		default:
			break;	
		}

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
			case "STCppp01": // *****  going to have to do the Second Ping here
				var aktapiid = "STCppp03";
				AKTPPP03(aktapiid);
				break;
			}
		}
	}
	
	
}

function processFinalPong(actions){
	//-->|AKTRequestID=GR8PPP04|PONG=Q|KPPP=Kppp|AKTAPIID=ii
	var decrypted = null;
	console.log("906 length=" + actions.length);
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
	STCRegisterFinal();
}

function STCprocessRegister(actions){
	console.log("619 action=" + actions[1]);
	var l = actions.length;
	var uid = actions[l-1].split("=");
	console.log("619 UID=" + uid[1]);
//	document.getElementById("registeremail").value=ppp.getAKTLocal("email");
//	document.getElementById("valueRet").innerHTML = "uid=" + uid[1];
	document.getElementById('UID').value=uid[1];
	document.getElementById("afterUID").style.display='table-row';
	document.getElementById('regstatus').value 			= "Registration Successful";
	let uids = document.getElementById("UID");
	uids.value = uid[1];
 	let event = new Event('change');
 	uids.dispatchEvent(event);

//	isUID(uid[1]);
	return(uid[1]);
	
}

	function processError(actions, aktapiid){
		var requestID = actions[1].split("=");
		var error = requestID[1];
		if(error.localeCompare("536870942")== 0)  // ***** could be U5, PBU5 or Email
		{
				if(aktapiid.localeCompare("STCppp03") == 0)
						document.getElementById("valueRet").innerHTML = "email=" + ppp.getAKTLocal("email") + " already used for server=" 
								+ ppp.getAKTLocal("server");
				else
						document.getElementById("valueRet").innerHTML = "duplicate credential" +  " for server=" 
								+ ppp.getAKTLocal("server");
				
		}
		if(error.localeCompare("5368709402")== 0)
						document.getElementById("valueRet").innerHTML = "input error";
		if(error.localeCompare("536870935")== 0)
			document.getElementById("valueRet").innerHTML = "server decrypt error";
		if(error.localeCompare("536870923")== 0)
			document.getElementById("valueRet").innerHTML = "user not found";
		
	}
	


/*
function processError(actions){		
	var error = null;
	for(i=1; i<actions.length; i++){					// ****  iterate over all key=value pairs
		var keyvalue = actions[i].split("="); 
		switch(keyvalue[0]){
		case "ERROR":
			console.log("870 ERROR=" + keyvalue[1]);
			ppp.setAKTLocal("servererror", keyvalue[1], 1);
//		if(error == "536870942")
		if(keyvalue[1].localeCompare("536870942")== 0)
		{
						document.getElementById("regstatus").value = "email=" + ppp.getAKTLocal("email") + " already used" ;
								
		}
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
				
			}
			break;
		}
	}	
	return error;
}
 */
 
function pingError(actions){	
	
}

function regEmailError(actions){	
	var error = ppp.getAKTLocal("servererror");
	document.getElementById("email").value = ppp.getAKTLocal("email");
	document.getElementById("cell").value = ppp.getAKTLocal("phone");
	console.log("920 error="+ error + " =" + errorCodes[error]);
 	setDOMStyle("regerror", 'table-row');
}

function regError(actions){		
}

function registerFinal08(){
		var aktapiid = "STCppp01";
//		var local = '192.168.2.221';
//	   var local = '207.81.189.121';
	   var localsocket = '12312';
//		ppp.setAKTLocal("server",local); 				// ***** register server
//	   ppp.setAKTLocal("socket",localsocket); 
		AKTPPP01(aktapiid); // *****  perform first ping and then wait for response
		var server 	= ppp.getAKTLocal("server");
		var port		= ppp.getAKTLocal("socket");
	   console.log("712 local server =" + server);		// ***** input parameter
	   console.log("713 ping sent");
	   console.log("714 local server =" + server + " port=" + port);	
	   document.getElementById('regstatus').value 			= "Please wait";
}
	
function AKTPPP01(aktapiid){
	var variables 	= [], values = [];
	variables[0] 	= "AKTRequestID";
	variables[1] 	= "PING";
	variables[2] 	= "AKTAPIID";
	values[0] 		= "GR8PPP01"
    var pingTo    = ppp.pingData();
	values[1] 		= pingTo;
	values[2] 		= aktapiid;
	var server;
	var port;
		server 	= ppp.getAKTLocal("server");
		port		= ppp.getAKTLocal("socket");
	   console.log("720 server=" + server + " port=" + port);
	sendToWebSocket(variables, values, server, port);
	   document.getElementById('regstatus').value 			= "Pinging";

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
   console.log("739 pong=" + pong);
   var pingTo             = ppp.secondPing(pong);  // *****  compute the final ping
   var emailRaw           = document.getElementById("email").value;
   var email              = emailRaw.toLowerCase();
   var phone              = document.getElementById("cell").value;
   var pppdec             = document.getElementById("pppcheck").value;
   var pppeMail           = ppp.pingUserData(email);
   var pppPhone           = ppp.pingUserData(phone);
   var pppCheck           = ppp.pingUserData(pppdec);
//   document.getElementById("email03").value     = pppeMail;
//   document.getElementById("phone03").value     = pppPhone;
   console.log("750 email=" + email + " phone=" + phone);
   ppp.setAKTLocal("email", email, 8);                  // *****  save email for later
   ppp.setAKTLocal("phone", phone, 8);                  // *****  save phone for later
	console.log("753 pong=" + pong);
   if(x=validateEmail(email)){
	   values[0]  			= "GR8PPP03";
	   values[1]    		= pingTo;
	   values[2]    		= pppeMail;
	   values[3]    		= pppPhone;
	   values[4]    		= pppCheck;
	   values[5] 			= aktapiid;
		var server 			= ppp.getAKTLocal("server");
		var port				= ppp.getAKTLocal("socket");
	   document.getElementById('regstatus').value 			= "Please wait";
	   sendToWebSocket(variables,values, server, port);
//-->|AKTRequestID=GR8PPP04|PONG=Q|KPPP=Kppp|AKTAPIID=aktapiid|
	   document.getElementById('regstatus').value 			= "Checking email";
   } 
}

function STCRegisterFinal(){
	  var kfn                = "ZecureIT.uky";
	  var emailRaw           = ppp.getAKTLocal("email");
	  var phone              = ppp.getAKTLocal("phone");
	  var email              = emailRaw.toLowerCase();
	  var username           = document.getElementById("username").value;
	  var pass               = document.getElementById("pass1").value;
	  var cm                 = AKTCM;
	  console.log("790 email=" + email + " cell=" + phone);
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
		  var pbraw  = getRandomKey(32);
		  var hexnorm 	= AKT.HEXFormat(pbraw);
		  var pb 		= AKTSha256.fromHex(hexnorm);	
	  var qn1 = document.getElementById("Q1").value;  // *****  exclude the first question selected
	  var an1 = document.getElementById("Q1Answer").value;  // *****  exclude the first question selected
	  var qn2 = document.getElementById("Q2").value;  // *****  exclude the first question selected
	  var an2 = document.getElementById("Q2Answer").value;  // *****  exclude the first question selected
	  var sec = document.getElementById("SecLevel").value;
	  var ks     = makeKS(pb, an1, an2);  // *****  ks is text encrypted
	  console.log("1035 ks=" + ks );
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
		var server 	= ppp.getAKTLocal("server");
		var port	= ppp.getAKTLocal("socket");
	    sendToWebSocket(variables,values, server, port);
		//|AKTRequestID=AKTReg02|PONG=NAK| AKTAPIID="GR8Reg01"|
	   document.getElementById('regstatus').value 			= "Registering";
	  
}
 function setupAKTServer(server, port) {
	 ppp.setAKTLocal("regserver", server, 8);
	 ppp.setAKTLocal("regsocket", port, 8);
		var server = "port=" +  ppp.getAKTLocal("regsocket") + "!server=" + ppp.getAKTLocal("regserver");
		console.log("130 server=" + server);
 }
	

