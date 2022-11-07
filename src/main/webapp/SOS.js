	var ctx = new CTX('SECP256K1');
    var serPubKey  = "04e0e0ca37d6bf7d18309501b44805027707d25dd11d4f408b9319f40a11d516711b4a6a51b67a2a3691224343fb364c76ce37255dcbef1eeed8771778fd5a95c5";
	var localPrivateKey = "";
	var toSend 			= "";
	
function iceBerg(privHex, pubHex){  // *****  input as hex, public key will be 04xxx...yyyy
	console.log("42 privHex=" + privHex + "<br>");
	var priv = AKT.fromHex(privHex);
	var privBytes = AKT.getBytesFromString(priv);
	var xHex = pubHex.substring(2,66);
	var yHex = pubHex.substring(66, pubHex.lenght);
	var x    = AKT.fromHex(xHex);
	var y	 = AKT.fromHex(yHex);
	var xBytes = AKT.getBytesFromString(x);
	var yBytes = AKT.getBytesFromString(y);
//	console.log("13 xHex=" + xHex + " l=" + xHex.length + "<br>" + typeof(x));
//	console.log("14 yHex=" + yHex + " l=" + yHex.length + "<br>");
	
	var xB = ctx.BIG.fromBytes(xBytes);
	var yB = ctx.BIG.fromBytes(yBytes);
	var xBO = [];
	var yBO = [];
	xB.toBytes(xBO);
	yB.toBytes(yBO);
//	console.log("23 xBO= 0x"+ctx.ECDH.bytestostring(xBO)+ "<br>");
//	console.log("24 yBO= 0x"+ctx.ECDH.bytestostring(yBO)+ "<br>");
	
	var xss = [];
	xB.toBytes(xss);
	var P = new ctx.ECP();
	P.setxy(xB,yB);
	var Ps= [];
	P.toBytes(Ps, false);
//	console.log("32 ice public key= 0x"+ctx.ECDH.bytestostring(Ps)+ "<br>");
	var pBig = ctx.BIG.fromBytes(privBytes);
    var WP = P.mul(pBig);
    var W = [];
    WP.toBytes(W,false); 
    var P = AKT.getStringFromBytes(W);
    var publicKey = AKT.HEXFormat(P);
//	console.log("38 gar public key= 0x" + ctx.ECDH.bytestostring(W)+ "<br>");
	
	var seed = publicKey.substring(2, publicKey.length);
//	console.log("39 gar public key= 0x" + seed+ "<br>");
	var bitArray = sjcl.hash.sha256.hash(seed); // ***** bitData is an object
    var keyHex	 = sjcl.codec.hex.fromBits(bitArray);
    var keyBytes = AKTSha256.fromHex(keyHex);
    var keyB64	 = AKTBase64.encode(keyBytes);
	return keyHex;
}

function iceBergEncryptText(keyHex, data){
//	var data = AKT.fromHex(dataHex);
	var key = AKT.fromHex(keyHex);
    var aesAKT          = new AKTaes();
    aesAKT.setEDC(true);
    aesAKT.initialize(key);
    var enc = aesAKT.encryptText(data);
    return enc;
}

function iceBergDecryptText(keyHex, data){
	var key = AKT.fromHex(keyHex);
    var aesAKT          = new AKTaes();
    aesAKT.setEDC(true);
    aesAKT.initialize(key);
    var dec = aesAKT.decryptText(data);
//    var decHex = AKT.HEXFormat(dec);
    return dec;
}

function makePrivateKey(){
	var r  = new ctx.BIG(0);
    r.rcopy(ctx.ROM_CURVE.CURVE_Order);
	var priv = getRandomKey(32);
	var privBytes = AKT.getBytesFromString(priv);
	var Xf = ctx.BIG.fromBytes(privBytes);
    var sx = [];
    Xf.mod(r);	// *****  this will make sure public key is valid
    Xf.toBytes(sx);
    var P = AKT.getStringFromBytes(sx);
    var privateKey = AKT.HEXFormat(P);
	return privateKey;
	
}

function makePublicKey(privateKey){		// *****  private key is hex String
	var ctx = new CTX('SECP256K1');
	var G = ctx.ECP.generator();
	var r  = new ctx.BIG(0);
    r.rcopy(ctx.ROM_CURVE.CURVE_Order);
	var X = AKT.fromHex(privateKey);
	var privBytes = AKT.getBytesFromString(X);
	var Xf = ctx.BIG.fromBytes(privBytes);
    var sx = [];
    Xf.mod(r);
    Xf.toBytes(sx);
//	console.log("128 sx= 0x"+ctx.ECDH.bytestostring(sx)+ "<br>");
    var Kf = G.mul(Xf);
    var W = [];
    Kf.toBytes(W,false); 
    var WStr = AKT.getStringFromBytes(W);
    var publicKey = AKT.HEXFormat(WStr);
	return publicKey;
}

function compressPublicKey(pubHex){			// ***** pubHex of the form 04hex
	var xHex = pubHex.substring(2,66);
	var yHex = pubHex.substring(66, pubHex.lenght);
	var x    = AKT.fromHex(xHex);
	var y	 = AKT.fromHex(yHex);
	var xBytes = AKT.getBytesFromString(x);
	var yBytes = AKT.getBytesFromString(y);
	var ctx = new CTX('SECP256K1');
	var xB = ctx.BIG.fromBytes(xBytes);
	var yB = ctx.BIG.fromBytes(yBytes);
	var xBO = [];
	var yBO = [];
	xB.toBytes(xBO);
	yB.toBytes(yBO);
//	console.log("66 xBO= 0x"+ctx.ECDH.bytestostring(xBO)+ "<br>");
//	console.log("67 yBO= 0x"+ctx.ECDH.bytestostring(yBO)+ "<br>");
	
	var xss = [];
	xB.toBytes(xss);
	var P = new ctx.ECP();
	P.setxy(xB,yB);
	var Ps= [];
	P.toBytes(Ps, true);  // *****  this will output the public key in compressed format
	var str = AKT.getStringFromBytes(Ps);
	var hexstr = AKT.HEXFormat(str);
	return hexstr;
}

function makeAnonEmail(email){
	var emaill = email.toLowerCase();
	var bitArray = sjcl.hash.sha256.hash(emaill); // ***** bitData is an object
    var keyHex	 = sjcl.codec.hex.fromBits(bitArray);
    var keyBytes = AKTSha256.fromHex(keyHex);
    var keyB64	 = AKTBase64.encode(keyBytes);
    var anonEmail = keyB64 + "@akt.com";
    return anonEmail;
}

function mineCredentialsPB( u,  p){
      var pbHex = "";
	  var cm                 = AKTCM;
	  var k5                 = cm.makeK5(u, p);
	  var u5                 = cm.makeU5(u);
	  var u5B64              = AKTBase64.encode(u5);
	  var k5B64              = AKTBase64.encode(k5); 
	  console.log("152 u=" + u + " p=" + p + " U5=" + u5B64);
      var seed = [];
      for(let i=0; i<40; i++)
      	seed.push(0x00);
      console.log("154 types u, u5, seed=" + typeof(u) + " " + typeof(u5) + " " + typeof(seed) + " ");
      for(let i=0; i<20; i++){
            seed[i] 	= u5.charCodeAt(i);
            seed[i+20] 	= k5.charCodeAt(i);
      }
      var seedStr = AKT.getStringFromBytes(seed);
      var seedHex = AKT.HEXFormat(seedStr);
      console.log("160 seed=" + seedHex);
        
//        byte[] hash =SHA2.AKTsha256(seed);
	  var bitArray  = sjcl.hash.sha256.hash(seed); // ***** bitData is an object
	  var pb5khex 	= sjcl.codec.hex.fromBits(bitArray);
	  var key	  	= AKT.fromHex(pb5khex);
	  var hash 		= AKT.getBytesFromString(key);
        
        
//        BIG x = BIG.fromBytes(hash);

	var x = ctx.BIG.fromBytes(hash);
	var y = ctx.BIG.fromBytes(hash);
    var count = 0;
    var start = [];
    var ystart = [];
    x.toBytes(start);
    
      var stStr = AKT.getStringFromBytes(start);
      var stHex = AKT.HEXFormat(stStr);
      console.log("180 start=" + stHex);
    
        var done = false;
        var startHex = "";
        var hashHex  = "";
        var hashed	 = "";
        while(!done){
//            if(hash[0] == -82){
			var hashStart = hashHex.substring(0,2);
//			if(count < 10) console.log(" 200 hashStart=" + hashStart);
            if(	(hashStart.localeCompare("AE") == 0) || (hashStart.localeCompare("ae") == 0)) {
                done = true;
                pbHex = startHex;
            } else{
                if(count++ > 1000)
                    done = true;
                else {
                    x.inc(1);
                    x.toBytes(start);
                    var START 		= AKT.getStringFromBytes(start);
                    startHex 		= AKT.HEXFormat(START);
		  			var bitArray  	= sjcl.hash.sha256.hash(start); // ***** bitData is an object
		  			hashHex 		= sjcl.codec.hex.fromBits(bitArray);
		  			hashed	  		= AKT.fromHex(hashHex);
		  			hash 			= AKT.getBytesFromString(hashed);
                }
            }
        }  // ***** while !done
        console.log("203 count=" + count);
        if(count >=1000)
            return null;

        return pbHex;
    }


