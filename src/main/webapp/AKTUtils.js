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
				console.log("14 left=" + left + " right=" + right);
			}
		}
		return retvar;
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
		  console.log("38 K5=" + hexK5 );
		  console.log("39 KA=" + KA );
	    var aesAKT               = new AKTaes();
	    aesAKT.setEDC(true);
	    aesAKT.initialize(k5);
	    var pb                  = aesAKT.decryptText(KA);
	    var hexpb		 = AKT.HEXFormat(pb);
		ppp.setAKTLocal("pb", pb, 8);  // *****  set time for 8 hours, saved as hex
		var pbB64 = AKTBase64.encode(pb);
	    return pbB64;
	}
	function makeK5Uni(username, password){
		var uniU = getUnicodeString(username);
		var uniP = getUnicodeString(password);
	    var cm                   = AKTCM;
	    var k5                   = cm.makeK5(uniU, uniP);
		var K5B64 = AKTBase64.encode(k5);
		return K5B64;
	}
	
	function getPBUsingK5Uni(KA, K5UniB64) {
		var k5 = AKTBase64.decode(K5UniB64);
	    var aesAKT               = new AKTaes();
	    aesAKT.setEDC(true);
	    aesAKT.initialize(k5);
	    var pb                  = aesAKT.decryptText(KA);
	    var hexpb		 = AKT.HEXFormat(pb);
		var pbB64 = AKTBase64.encode(pb);
		ppp.setAKTLocal("pb", pb, 8);  // *****  set time for 8 hours, saved as hex
	    return pbB64;
	}

	function makePBU5andPB5K(pb){
		  var pbu5   	= AKTSha1.GetHash(pb);		// *****  pbu5 is sha1 to be consistent with u5
		  var pbu5B64 	= AKTBase64.encode(pbu5);
		  var revWord = "";
		  var pbrev 	= reverse(pb);
		  revWord += pbrev;
		  var bitArray   = sjcl.hash.sha256.hash(revWord);
		  var pb5kHex    = sjcl.codec.hex.fromBits(bitArray); 
		  var pb5k		 = AKTSha256.fromHex(pb5kHex);
		  var pb5kB64 = AKTBase64.encode(pb5k);
		  return "U5=" + pbu5B64 + ";" + "K5=" + pb5kB64;	// *****  use key value pairs
		}	

	function makeKS(pb, ans1In, ans2In) {
	    var ans1 = ans1In.toLowerCase().trim();
	    var ans2 = ans2In.toLowerCase().trim();
//		  console.log("88 ans1=" + ans1 + " ans2=" + ans2 );
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
//		  console.log("110 bufrev=" + prtrev );
	    var bitArray   = sjcl.hash.sha256.hash(bufrev); // ***** bitData is an object
	    var hash = sjcl.codec.hex.fromBits(bitArray);
//		  console.log("113 hash=" + hash );
//	    var key  = AKTSha256.fromHex(hash);
//	    var key  = AKTSha256.fromHex(bufrev);
//	    var keyprt = AKT.HEXFormat(key);
//		  console.log("746 key=" + keyprt );

//		    sha256     = AKTSha256;
//		    var serverHex   	= sha256.hasher(bufrev);
//			  console.log("750 serverHex=" + serverHex );
	    var serverHash		= AKT.fromHex(hash);
	    var aesAKT               = new AKTaes();
	    aesAKT.setEDC(true);
//	    aesAKT.initialize(key);
//	    aesAKT.initialize(hash);
	    aesAKT.initialize(serverHash);
	    var ks           = aesAKT.encryptText(pb);
//		  console.log("1279 ks=" + ks );
		return (ks);
		}
	
	function makeKSWeb(pb, ans1In, ans2In) {
		var bufHash = getAnswerKey(ans1In, ans2In);
	    var aesAKT               = new AKTaes();
	    aesAKT.setEDC(true);
	    aesAKT.initialize(bufHash);
	    var ks           = aesAKT.encryptText(pb);
	    console.log("155 ks=" + ks);
		return (ks);
	}
	
	function decryptKSWeb(ks, ans1In, ans2In) {
		var bufHash = getAnswerKey(ans1In, ans2In);
	    var aesAKT               = new AKTaes();
	    aesAKT.setEDC(true);
	    aesAKT.initialize(bufHash);
	    var pb           = aesAKT.decryptText(ks);
	    console.log("155 ks=" + ks);
		return (ks);
	}
	
	function getAnswerKey(ans1In, ans2In){
	    var ans1 = ans1In.toLowerCase().trim();
	    var ans2 = ans2In.toLowerCase().trim();
//		  console.log("88 ans1=" + ans1 + " ans2=" + ans2 );
		var buffer = "";
	    var buf = [];
		for (i = 0; i < 20; i++){
			if(i < ans1.length)
	  		   buf[i] = ans1.charCodeAt(i);
			else
		  	   buf[i] += 0xca;
		}
		var l = ans2.length; var m = 0;
		for (i = 0; i < l; i++){
			buf[20 -i -1] = ans2.charCodeAt(i);
		}
		console.log("147 buf=" + buf);
	    var bitArray   = sjcl.hash.sha256.hash(buf); // ***** bitData is an object
	    var hash = sjcl.codec.hex.fromBits(bitArray);
	    var bufHash		= AKT.fromHex(hash);
	    return bufHash;
		
	}
	
	function getPBCredentialsUsingKA(){
		var k5UniB64 	= ppp.getAKTLocal("k5unib64");
		var KA 			= ppp.getAKTLocal("KA");
		var pbB64 		= getPBUsingK5Uni(KA, k5UniB64);
		var pb			= AKTBase64.decode(pbB64);
		var pbcred		=makePBU5andPB5K(pb);
		var creds= pbcred.split(";");
		var pbu5B64		= creds[0].split("=")[1];
		var pb5kB64		= creds[1].split("=")[1];
		var pbu5		= AKTBase64.decode(pbu5B64);
		var pb5k		= AKTBase64.decode(pb5kB64);
		ppp.setAKTLocal("pb5k", pb5k, 8);
		ppp.setAKTLocal("pbu5", pbu5, 8);
		ppp.setAKTLocal("pb", pb, 8);
	}

	function decryptText(data, key){
		var aesAKT  = new AKTaes();
		aesAKT.setEDC(true);
		aesAKT.initialize(key);
		var decrypted   = aesAKT.decryptText(data);
		return decrypted;
	}

	function encryptText(data, key){
		var aesAKT  = new AKTaes();
		aesAKT.setEDC(true);
		aesAKT.initialize(key);
		var encrypted   = aesAKT.encryptText(data);
		return encrypted;
	}

	function decryptRaw(data, key){
		if((data.length %16 ) != 0)
			return null;
		var aesAKT  = new AKTaes();
		aesAKT.setEDC(true);
		aesAKT.initialize(key);
		var dec   = aesAKT.decryptRaw(data);
		var decrypted = "";
		var l = dec.length;
		for(i=0; i<l; i++){
			decrypted += String.fromCharCode(dec[i]);
		}
		return decrypted;
	}

	function encryptRaw(data, key){
		if((data.length %16 ) != 0)
			return null;
		var aesAKT  = new AKTaes();
		aesAKT.setEDC(true);
		aesAKT.initialize(key);
		var enc   = aesAKT.encryptRaw(data);
		var l = enc.length;
		var encrypted = "";
		for(i=0; i<l; i++){
			encrypted += String.fromCharCode(enc[i]);
		}
		return encrypted;
	}
	
	function setCompositeSession(Session, key){
//		var key		= ppp.getAKTLocal("compositekey");
		var session = decryptText(Session, key);
		ppp.setAKTLocal("session", session,1);
		var pb5k 	= ppp.getAKTLocal("pb5k");
		var key		= ppp.getAKTLocal("session");
		var composite = pb5k.concat(key);
		var bitArray   		= sjcl.hash.sha256.hash(composite);
		var pb5kHex    		= sjcl.codec.hex.fromBits(bitArray); 
		var compositeKey	= AKTSha256.fromHex(pb5kHex);
		var comprt			= AKT.HEXFormat(compositeKey);
		console.log("204 utils composite=" + comprt);
		ppp.setAKTLocal("compositekey", compositeKey, 1);
	}

	function validateEmail(email) {
		  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		  return re.test(email);
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
		
	function reverse (s) {
		var j = s.length-1;
		var o = '';
		for (var i 	= s.length - 1 ; i >= 0; o += s[i--]) { }
	    var hexrev 	= AKT.HEXFormat(o);
	    var srev 	= AKT.HEXFormat(s);
		return o;
		}

	function toHexFromASCIIArray(abyteArray) {
		  return Array.from(abyteArray, function(abyte) {
			    return ('0' + (abyte & 0xFF).toString(16)).slice(-2);
			  }).join('')
	}
	
	function stringToByteArray(str){
	    var pb = [];
	    for(var i=0;i<str.length; i++){
	    	var code = str.charCodeAt(i);
	    	pb = pb.concat([code]);
	    }
		return pb;
	}

	function getUnicodeString(chx){
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
		
	function makeU5andK5(username, pass) {
		var cm                 = AKTCM;
		var k5                 = cm.makeK5(username, pass);
	    var aesAKT               = new AKTaes();
	    aesAKT.setEDC(true);
	    aesAKT.initialize(k5);
		var u5          = cm.makeU5(username);
		var up 			= new Array(2);
		up[0] 			= u5;
		up[1] 			= k5;
		console.log("180 u5l=" + u5.length + " k5l=" + k5.length);
		return up;
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

	function makeCompositeKey(){
		  var session 	= ppp.getAKTLocal("session");
		  var pb5kB64	= ppp.getAKTLocal("pb5k");
		  var pb5k		= AKTBase64.decode(pb5kB64);
		  var composite = "";
		  composite += pb5k + session;
		  var bitArray  = sjcl.hash.sha256.hash(composite); // ***** bitData is an object
		  var pb5khex 	= sjcl.codec.hex.fromBits(bitArray);
		  var key	  	= AKTSha256.fromHex(pb5khex);
		  return key;
	}


