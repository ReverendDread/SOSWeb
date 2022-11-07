function makePublicKey(){
	var ctx 	= new CTX("SECP256K1");
	var test 	= "abcdefghijklmnopqrstuvwxyz123456";
    var pbHex   = "47fefa0975dcddecd009a0f31b3b323faa472f3d961d3c377aaf99c6f8d5542c";
//
// *****  convert a hex string to ascii string and then to byteArray
//    
    var pbS		= AKTSha256.fromHex(pbHex);
	var pb = stringToByteArray(pbS);
	console.log("12 pb=", AKT.HEXFormat(String.fromCharCode(...pb)));

//
// *****  create a BIG output to byteArray and then make a hex string
//    
    var r 		= new ctx.BIG(0);
    r.rcopy(ctx.ROM_CURVE.CURVE_Order);
    var rb = [];
    r.toBytes(rb);
    var chkr  = AKT.HEXFormat(rb);
    console.log("9 chkr=", chkr);
    console.log(typeof(chkr), " ",typeof(rb));
    
//
// *****  put the ECP generator into an ecp then output to a byte array and hex format
//    
	var G = ctx.ECP.generator();
	var GP = [];
	G.toBytes(GP,true);
	var prtG = AKT.HEXFormat(String.fromCharCode(...GP));
	console.log("19 prtG=", prtG);
	
//
// *****  generate 32 byte random string needs to be byte array for BIGs
//    
	var keyS = getRandomKey(32);
	var prtkey = AKT.HEXFormat(keyS);
	console.log("22 key=", prtkey);
	var key = stringToByteArray(keyS);
	
//
// *****  make a BIG from a 32 byte array
//    
	var q = new ctx.BIG(0);
	q = ctx.BIG.fromBytes(key);
//	q = ctx.BIG.fromBytes(pb);
//    q.mod(r);
    var x = [];
	q.toBytes(x);
	var prtX = AKT.HEXFormat(String.fromCharCode(...x));
	console.log("29 prtX=", prtX);
	
//
// *****  Generate public key from G and q and output to byte array
//    
	var W=[], WP;
	WP = G.mul(q);
	var i = ctx.ECDH.PUBLIC_KEY_VALIDATE(W);
	if(i != 0){
		console.log("34 public key invalid i=", i);
	}
	WP.toBytes(W, false);  // ***** false will output full public key true will be compressed
	var hex = toHexString(W)
	var prtrev = AKT.HEXFormat(String.fromCharCode(...W)); // *****  W is byte array
	console.log("40 W=", hex);
	console.log("41 W=", prtrev);
	
//
// *****  Hash test using Miracl and SLJC
//    
	console.log("69 hash=", hashToHex(W)); // *****  need to pass in byte array
	console.log("70 hash=", hashToHex(String.fromCharCode(...W)));
	
	var toHash = String.fromCharCode(...W);
	var bitArray   = sjcl.hash.sha256.hash(toHash); // ***** bitData is an object
    var pb5khex = sjcl.codec.hex.fromBits(bitArray);
	console.log("76 hash=",pb5khex);
	var ice = iceBergKey(pbHex, hex);
	
	
}

function toHexString(byteArray) {
	  return Array.from(byteArray, function(byte) {
	    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
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
function hashToHex(W){
	var w ;
	console.log("95 type=", typeof(W));
	var x = typeof(W);
	if(x === "string"){
		var toHash = stringToByteArray(W);
		console.log("100 W=", AKT.HEXFormat(String.fromCharCode(...toHash)));
		w = hashit(toHash);
	}
	else{
		w = hashit(W);
	}
	return w;
}
function hashit(W){
	var ctx 	= new CTX("SECP256K1");
	var res =  new ctx.HASH256();
	for(i=0; i<W.length; i++){
		res.process(W[i]);
	}
	var h = [];
	h = res.hash();
	var hex = AKT.HEXFormat(String.fromCharCode(...h));
	return hex;	
}
function iceBergKey(privHex, pubKeyHex){
	var ctx 	= new CTX("SECP256K1");
    var priv		= AKTSha256.fromHex(privHex); // ***** should check for 32 bytes
    console.log("124 pub=", pubKeyHex);
    var pub			= AKTSha256.fromHex(pubKeyHex);
    console.log(" type=", typeof(pub));
    var pubxy = [];
    pubxy = stringToByteArray(pub);
    var x = [], y =[];
    for(var i = 0; i < 32; i++){
    	x[i] = pubxy[i+1];
    	y[i] = pubxy[i+ 33];
    }
    console.log("130 x=",  AKT.HEXFormat(String.fromCharCode(...x)));
    console.log("131 y=",  AKT.HEXFormat(String.fromCharCode(...y)));
	var q = new ctx.BIG(0);
	q = ctx.BIG.fromBytes(priv);
    var xp		= new ctx.BIG(0);
    var yp		= new ctx.BIG(0);
	xp = ctx.BIG.fromBytes(x);
	yp = ctx.BIG.fromBytes(y);
	var G = new ctx.ECP() ;
	G.setxy(xp, yp);
	var GP = [];
	G.toBytes(GP,true);
	var prtG = AKT.HEXFormat(String.fromCharCode(...GP));
	console.log("19 prtG=", prtG);
	
	return prtG;
}
